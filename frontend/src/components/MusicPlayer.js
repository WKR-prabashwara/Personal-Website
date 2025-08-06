import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Waves } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.volume = 0.3;
          await audio.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Audio playback error:', error);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
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
      >
        {/* You can add your music file here */}
        <source src="/space-music.mp3" type="audio/mpeg" />
        {/* Fallback: Empty audio for demonstration */}
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS" type="audio/wav" />
      </audio>

      {/* Music Player UI */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
        {/* Wave Icon to Start Music */}
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105 group"
          title={isPlaying ? 'Pause Music' : 'Start Music'}
        >
          <Waves className={`w-5 h-5 text-white transition-all duration-300 ${isPlaying ? 'text-purple-400' : 'text-white'} group-hover:text-purple-300`} />
        </button>

        {/* Waving Bars - Only show when playing */}
        {isPlaying && (
          <div className="bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full p-3 transition-all duration-300">
            <WavingBars isActive={isPlaying && !isMuted} />
          </div>
        )}

        {/* Mute Button - Only show when playing */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105"
            title={isMuted ? 'Unmute Music' : 'Mute Music'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;