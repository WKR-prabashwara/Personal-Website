import React, { useEffect, useState } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Spinning black hole loader */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-spin"></div>
          <div className="absolute inset-4 rounded-full border border-primary animate-spin" style={{ animationDuration: '0.5s' }}></div>
          <div className="absolute inset-6 rounded-full bg-black"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-4">Loading Universe...</h2>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-secondary rounded-full mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-muted-foreground">{progress}%</p>
      </div>
    </div>
  );
};

export default Preloader;