import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Auto-play when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set volume to a reasonable level
      audio.volume = 0.3;
      
      // Attempt to auto-play
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play was prevented by browser policy');
          // Try to play after user interaction
          const handleUserInteraction = async () => {
            try {
              await audio.play();
              setIsPlaying(true);
              document.removeEventListener('click', handleUserInteraction);
              document.removeEventListener('keydown', handleUserInteraction);
            } catch (e) {
              console.log('Could not start playback');
            }
          };
          
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('keydown', handleUserInteraction);
        }
      };
      
      playAudio();
    }
  }, []);

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
      {/* Audio element - Space/ambient music */}
      <audio
        ref={audioRef}
        loop
        className="hidden"
        preload="auto"
      >
        {/* Placeholder for space music - replace with actual music file */}
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

        {/* Only Mute Button - No Play Button */}
        <div className="flex items-center">
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
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;