import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = 0.3;
    
    const handleCanPlay = () => {
      setIsInitialized(true);
      setAudioError(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e) => {
      console.warn('Audio playback error:', e);
      setIsPlaying(false);
      setAudioError(true);
    };

    const handleLoadedData = () => {
      setAudioError(false);
    };

    // Event listeners
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadeddata', handleLoadedData);
    
    // User interaction detection
    const enableUserInteraction = () => {
      setHasUserInteracted(true);
      document.removeEventListener('click', enableUserInteraction);
      document.removeEventListener('keydown', enableUserInteraction);
      document.removeEventListener('touchstart', enableUserInteraction);
    };

    document.addEventListener('click', enableUserInteraction, { passive: true });
    document.addEventListener('keydown', enableUserInteraction, { passive: true });
    document.addEventListener('touchstart', enableUserInteraction, { passive: true });

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadeddata', handleLoadedData);
      document.removeEventListener('click', enableUserInteraction);
      document.removeEventListener('keydown', enableUserInteraction);
      document.removeEventListener('touchstart', enableUserInteraction);
    };
  }, []);

  // Auto-start audio after user interaction (with error handling)
  useEffect(() => {
    if (hasUserInteracted && isInitialized && !isPlaying && !audioError) {
      const timer = setTimeout(() => {
        handleStart();
      }, 2000); // Increased delay for better UX
      return () => clearTimeout(timer);
    }
  }, [hasUserInteracted, isInitialized, isPlaying, audioError]);

  // Handle audio playback control
  const handleStart = async () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;
    
    try {
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } else {
        audio.pause();
      }
    } catch (error) {
      console.warn('Audio control error:', error);
      setAudioError(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;
    
    try {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
      
      // If audio isn't playing and user wants to unmute, try to start it
      if (audio.paused && hasUserInteracted && !isMuted) {
        handleStart();
      }
    } catch (error) {
      console.warn('Audio mute toggle error:', error);
    }
  };

  // Keyboard control
  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  // Animated bars component with better performance
  const WavingBars = React.memo(({ isActive }) => {
    const bars = Array.from({ length: 4 }, (_, i) => i);
    
    return (
      <div className="flex items-center gap-1 h-3 sm:h-4" role="img" aria-label={isActive ? "Music playing" : "Music paused"}>
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
            aria-hidden="true"
          />
        ))}
      </div>
    );
  });

  WavingBars.displayName = 'WavingBars';

  // Don't render if there's a persistent error
  if (audioError && !hasUserInteracted) {
    return null;
  }

  return (
    <>
      {/* Audio element with fallback sources */}
      <audio
        ref={audioRef}
        loop
        className="hidden"
        preload="metadata"
        muted={false}
        crossOrigin="anonymous"
      >
        <source src="/space-music.mp3" type="audio/mpeg" />
        <source src="/space-music.ogg" type="audio/ogg" />
        <p>Your browser does not support the audio element.</p>
      </audio>

      {/* Music Player UI */}
      <div 
        className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 flex items-center gap-2 sm:gap-3"
        role="region"
        aria-label="Background music controls"
      >
        {/* Play/Pause Button with Wave Visualization */}
        <button
          onClick={handleStart}
          onKeyPress={(e) => handleKeyPress(e, handleStart)}
          disabled={audioError}
          className="bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full p-2 sm:p-3 transition-all duration-300 hover:bg-purple-600/20 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          title={audioError ? "Audio not available" : (isPlaying ? "Pause music" : "Play music")}
          type="button"
        >
          {audioError ? (
            <div className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400">
              <VolumeX className="w-full h-full" aria-hidden="true" />
            </div>
          ) : isPlaying ? (
            <WavingBars isActive={!isMuted} />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-purple-300 transition-colors" aria-hidden="true" />
          )}
        </button>

        {/* Mute/Unmute Button */}
        {!audioError && (
          <button
            onClick={toggleMute}
            onKeyPress={(e) => handleKeyPress(e, toggleMute)}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black"
            aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
            title={isMuted ? 'Unmute Music' : 'Mute Music'}
            type="button"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-purple-300 transition-colors" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-purple-300 transition-colors" aria-hidden="true" />
            )}
          </button>
        )}

        {/* Audio Status Indicator for Screen Readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {audioError ? "Background music is not available" : 
           isPlaying ? (isMuted ? "Background music is playing but muted" : "Background music is playing") : 
           "Background music is paused"}
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;