import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      
      const handleCanPlay = () => {
        setIsInitialized(true);
      };

      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      const handleError = (e) => {
        console.log('Audio error:', e);
        setIsPlaying(false);
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('error', handleError);
      
      // Enable user interaction detection
      const enableUserInteraction = () => {
        setHasUserInteracted(true);
        document.removeEventListener('click', enableUserInteraction);
        document.removeEventListener('keydown', enableUserInteraction);
      };

      document.addEventListener('click', enableUserInteraction);
      document.addEventListener('keydown', enableUserInteraction);

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('error', handleError);
        document.removeEventListener('click', enableUserInteraction);
        document.removeEventListener('keydown', enableUserInteraction);
      };
    }
  }, []);

  // Auto-start audio after user interaction
  useEffect(() => {
    if (hasUserInteracted && isInitialized && !isPlaying) {
      const timer = setTimeout(() => {
        handleStart();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasUserInteracted, isInitialized]);

  // Handle user click to start audio
  const handleStart = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        if (audio.paused) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        console.log('Error controlling audio:', error);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
      
      // If audio isn't playing and user interacts, try to start it
      if (audio.paused && hasUserInteracted) {
        handleStart();
      }
    }
  };

  // Animated bars component
  const WavingBars = ({ isActive }) => {
    const bars = Array.from({ length: 4 }, (_, i) => i);
    
    return (
      <div className="flex items-center gap-1 h-3 sm:h-4">
        {bars.map((_, index) => (
          <div
            key={index}
            className={`w-0.5 sm:w-1 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full transition-all duration-300 ${
              isActive ? 'animate-bounce' : ''
            }`}
            style={{
              height: isActive ? `${6 + (index % 2) * 4}px` : '3px',
              animationDelay: `${index * 0.1}s`,
              animationDuration: `${0.6 + index * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Audio element - Space/ambient music */}
      <audio
        ref={audioRef}
        loop
        className="hidden"
        preload="auto"
        muted={false}
      >
        <source src="/space-music.mp3" type="audio/mpeg" />
        {/* Fallback: No audio available */}
      </audio>

      {/* Music Player UI - Enhanced responsive design */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 flex items-center gap-2 sm:gap-3">
        {/* Waving Bars - Clickable to control audio */}
        <button
          onClick={handleStart}
          className="bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full p-2 sm:p-3 transition-all duration-300 hover:bg-purple-600/20 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black"
          title={isPlaying ? "Pause music" : "Play music"}
        >
          <WavingBars isActive={isPlaying && !isMuted} />
        </button>

        {/* Mute/Unmute Button - Speaker Icon */}
        <button
          onClick={toggleMute}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black"
          title={isMuted ? 'Unmute Music' : 'Mute Music'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-purple-300 transition-colors" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-purple-300 transition-colors" />
          )}
        </button>

        {/* Play/Pause Button */}
        {hasUserInteracted && (
          <button
            onClick={handleStart}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-cyan-300 transition-colors" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-cyan-300 transition-colors ml-0.5" />
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;