import React, { useEffect, useState, useRef } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [isExiting, setIsExiting] = useState(false);

  const loadingStages = [
    { progress: 20, text: 'Loading Universe...' },
    { progress: 40, text: 'Mapping Stars...' },
    { progress: 60, text: 'Calculating Orbits...' },
    { progress: 80, text: 'Synchronizing Time...' },
    { progress: 100, text: 'Welcome!' }
  ];

  useEffect(() => {
    let currentStage = 0;
    let progressValue = 0;
    
    const interval = setInterval(() => {
      progressValue += Math.random() * 3 + 1;
      
      if (progressValue > 100) progressValue = 100;
      
      setProgress(progressValue);
      
      // Update loading text based on progress
      if (currentStage < loadingStages.length) {
        const stage = loadingStages[currentStage];
        if (progressValue >= stage.progress) {
          setLoadingText(stage.text);
          currentStage++;
        }
      }

      if (progressValue >= 100) {
        clearInterval(interval);
        
        // Start exit animation
        setTimeout(() => {
          setIsExiting(true);
          
          // Complete after animation
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden transition-all duration-600 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Enhanced Black Hole Loader */}
        <div className={`relative w-32 h-32 mx-auto mb-12 transition-all duration-800 ${isExiting ? 'scale-120 rotate-180' : ''}`}>
          {/* Outer orbit rings */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-primary/20 animate-spin"
              style={{
                transform: `scale(${1 + i * 0.15})`,
                borderWidth: `${2 - i * 0.3}px`,
                animationDuration: `${3 + i * 0.5}s`,
                animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
              }}
            />
          ))}
          
          {/* Middle rotating ring with particles */}
          <div className="absolute inset-4 rounded-full border-2 border-primary/60 animate-spin">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 45}deg) translate(16px, 0px) translate(-50%, -50%)`
                }}
              />
            ))}
          </div>
          
          {/* Inner spinning ring */}
          <div 
            className="absolute inset-6 rounded-full border-2 border-primary animate-spin"
            style={{ animationDuration: '0.8s' }}
          />
          
          {/* Black hole center with glow */}
          <div className="absolute inset-8 rounded-full bg-gradient-radial from-primary/80 via-primary/40 to-black shadow-[0_0_30px_rgba(147,51,234,0.6)] animate-pulse" />
          <div className="absolute inset-10 rounded-full bg-black shadow-inner" />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-3xl font-bold text-foreground mb-6 tracking-wider transition-all duration-500">
          {loadingText}
        </h2>
        
        {/* Enhanced Progress Bar */}
        <div className="w-80 h-3 bg-secondary/50 rounded-full mx-auto mb-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent animate-pulse" />
          <div 
            className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>
        
        {/* Progress Percentage */}
        <p className="text-muted-foreground text-lg font-medium">
          {Math.round(progress)}%
        </p>
        
        {/* Loading dots animation */}
        <div className="mt-4 flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;