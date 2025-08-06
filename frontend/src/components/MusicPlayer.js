import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Waves } from 'lucide-react';

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
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

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      
      // Try to start playing when user first interacts with the page
      const startAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log('Autoplay prevented, will start on first user interaction');
        }
      };

      // Auto-start after a short delay
      setTimeout(startAudio, 1000);

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  // Handle user click to start audio if autoplay failed
  const handleStart = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        if (audio.paused) {
          await audio.play();
        }
      } catch (error) {
        console.log('Error starting audio:', error);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
      
      // If audio isn't playing and user interacts, try to start it
      if (audio.paused) {
        handleStart();
      }
    }
  };

  // Animated bars component
  const WavingBars = ({ isActive }) => {
    const bars = Array.from({ length: 4 }, (_, i) => i);
    
    return (
      <div className="flex items-center gap-1 h-4">
        {bars.map((_, index) => (
          <div
            key={index}
            className={`w-1 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full transition-all duration-300 ${
              isActive ? 'animate-bounce' : ''
            }`}
            style={{
              height: isActive ? `${8 + (index % 2) * 6}px` : '4px',
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
        {/* Fallback: Generate a simple ambient tone */}
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS" type="audio/wav" />
      </audio>

      {/* Music Player UI - Simplified */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
        {/* Waving Bars - Clickable to start audio */}
        <button
          onClick={handleStart}
          className="bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full p-3 transition-all duration-300 hover:bg-purple-600/20 transform hover:scale-105 group"
          title="Click to start music"
        >
          <WavingBars isActive={isPlaying && !isMuted} />
        </button>

        {/* Mute/Unmute Button - Speaker Icon */}
        <button
          onClick={toggleMute}
          className="w-12 h-12 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105 group"
          title={isMuted ? 'Unmute Music' : 'Mute Music'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white group-hover:text-purple-300" />
          ) : (
            <Volume2 className="w-5 h-5 text-white group-hover:text-purple-300" />
          )}
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;