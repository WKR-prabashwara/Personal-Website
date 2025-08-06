import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Auto-play when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Attempt to auto-play (might be blocked by browser policy)
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play was prevented by browser policy');
          setIsPlaying(false);
        }
      };
      
      playAudio();
    }
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          await audio.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Playback failed:', error);
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
              isActive ? 'animate-pulse' : ''
            }`}
            style={{
              height: isActive ? `${12 + Math.sin(Date.now() * 0.01 + index) * 8}px` : '4px',
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
      {/* Audio element - Interstellar music placeholder */}
      <audio
        ref={audioRef}
        loop
        className="hidden"
        preload="auto"
      >
        {/* Placeholder for space music - replace with actual Interstellar music file */}
        <source src="/space-music.mp3" type="audio/mpeg" />
        {/* Fallback silence for demonstration */}
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS2fLLeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQcBTiS" type="audio/wav" />
      </audio>

      {/* Music Player UI */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
        {/* Waving Bars */}
        <div className="bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full p-3">
          <WavingBars isActive={isPlaying && !isMuted} />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;