import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const preloaderRef = useRef(null);
  const blackHoleRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRef = useRef(null);
  const orbitRingsRef = useRef([]);

  const loadingStages = [
    { progress: 20, text: 'Loading Universe...' },
    { progress: 40, text: 'Mapping Stars...' },
    { progress: 60, text: 'Calculating Orbits...' },
    { progress: 80, text: 'Synchronizing Time...' },
    { progress: 100, text: 'Welcome!' }
  ];

  useEffect(() => {
    // GSAP animations for entrance
    const tl = gsap.timeline();
    
    tl.from(blackHoleRef.current, {
      scale: 0,
      rotation: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8
    }, "-=0.5")
    .from(progressBarRef.current, {
      scaleX: 0,
      duration: 0.6
    }, "-=0.3");

    // Animate orbit rings
    orbitRingsRef.current.forEach((ring, index) => {
      if (ring) {
        gsap.set(ring, { rotation: Math.random() * 360 });
        gsap.to(ring, {
          rotation: "+=360",
          duration: 3 + index * 0.5,
          ease: "none",
          repeat: -1
        });
      }
    });

    // Pulsing black hole center
    gsap.to(blackHoleRef.current?.children[3], {
      scale: 1.1,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

  }, []);

  useEffect(() => {
    let currentStage = 0;
    let progressValue = 0;
    
    const interval = setInterval(() => {
      progressValue += Math.random() * 3 + 1; // Random increment for more natural loading
      
      if (progressValue > 100) progressValue = 100;
      
      setProgress(progressValue);
      
      // Update loading text based on progress
      if (currentStage < loadingStages.length) {
        const stage = loadingStages[currentStage];
        if (progressValue >= stage.progress) {
          setLoadingText(stage.text);
          
          // Animate text change
          if (textRef.current) {
            gsap.fromTo(textRef.current, {
              y: 10,
              opacity: 0.7
            }, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          }
          
          currentStage++;
        }
      }
      
      // Animate progress bar
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: `${progressValue}%`,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      if (progressValue >= 100) {
        clearInterval(interval);
        
        // Short delay before exit
        setTimeout(() => {
          // Exit animations
          const exitTl = gsap.timeline({
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
          
          if (blackHoleRef.current && preloaderRef.current) {
            exitTl.to(blackHoleRef.current, {
              scale: 1.2,
              rotation: "+=180",
              duration: 0.8,
              ease: "power2.inOut"
            })
            .to(preloaderRef.current, {
              opacity: 0,
              scale: 1.1,
              duration: 0.6,
              ease: "power2.inOut"
            }, "-=0.3");
          } else {
            // Fallback if refs are null
            if (onComplete) onComplete();
          }
        }, 500);
      }
    }, 50); // Slightly slower interval

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
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
        <div ref={blackHoleRef} className="relative w-32 h-32 mx-auto mb-12">
          {/* Outer orbit rings */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              ref={el => orbitRingsRef.current[i] = el}
              className="absolute inset-0 rounded-full border border-primary/20"
              style={{
                transform: `scale(${1 + i * 0.15})`,
                borderWidth: `${2 - i * 0.3}px`
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
          <div className="absolute inset-8 rounded-full bg-gradient-radial from-primary/80 via-primary/40 to-black shadow-[0_0_30px_rgba(147,51,234,0.6)]" />
          <div className="absolute inset-10 rounded-full bg-black shadow-inner" />
        </div>
        
        {/* Loading Text */}
        <h2 ref={textRef} className="text-3xl font-bold text-foreground mb-6 tracking-wider">
          {loadingText}
        </h2>
        
        {/* Enhanced Progress Bar */}
        <div className="w-80 h-3 bg-secondary/50 rounded-full mx-auto mb-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent animate-pulse" />
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: '0%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>
        
        {/* Progress Percentage */}
        <p className="text-muted-foreground text-lg font-medium">
          {progress}%
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