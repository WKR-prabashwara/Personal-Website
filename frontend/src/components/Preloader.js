import React, { useEffect, useState } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let progressValue = 0;
    const totalDuration = 5000; // 5 seconds total
    const intervalTime = 50; // Update every 50ms
    const increment = 100 / (totalDuration / intervalTime); // Calculate increment for 5 seconds
    
    const interval = setInterval(() => {
      progressValue += increment;
      
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(100);
        clearInterval(interval);
        
        // Exit after reaching 100%
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 300);
        
      } else {
        setProgress(progressValue);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isExiting) return null; // Quick exit instead of fade

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden">
      {/* Simple animated background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Simple spinner */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-r-transparent animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Loading Portfolio...
        </h2>
        
        {/* Simple Progress Bar */}
        <div className="w-64 h-2 bg-secondary/50 rounded-full mx-auto mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress Percentage */}
        <p className="text-muted-foreground text-sm">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default Preloader;