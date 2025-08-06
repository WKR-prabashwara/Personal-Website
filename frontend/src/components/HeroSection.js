import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  scaleIn
} from '../utils/motion';
import StarBackground from './StarBackground';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const scrolled = Math.max(0, -rect.top);
          const progress = Math.min(scrolled / sectionHeight, 1);
          
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Black Hole Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[1] rotate-180"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      {/* Star Background */}
      <StarBackground />
      
      {/* Content Overlay */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-foreground px-6"
        style={{ 
          opacity: scrollProgress < 0.7 ? 1 - (scrollProgress * 1.2) : 0,
          transform: `translateY(${scrollProgress * 30}px) scale(${1 - scrollProgress * 0.1})`,
        }}
      >
        {/* Welcome Badge */}
        <motion.div
          variants={slideInFromTop}
          className="mb-8 py-2 px-4 border border-purple-500/50 rounded-full backdrop-blur-sm bg-black/20"
        >
          <span className="text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ✨ Mathematics Student Portfolio
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wider">
            <span className="text-white">Rivibibu</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Prabashwara
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center mb-8"
        >
          Exploring the cosmos through science, mathematics, and imagination
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={slideInFromLeft(1)}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            <span className="flex items-center justify-center">
              Explore My Work
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="bg-transparent text-white px-8 py-4 rounded-full border-2 border-white/30 hover:border-purple-400 hover:bg-white/5 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            Get In Touch
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        variants={scaleIn(1.5)}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center text-white/70">
          <p className="mb-2 text-sm">Scroll to explore</p>
          <div className="w-px h-12 bg-white/20 relative">
            <div 
              className="absolute top-0 w-px bg-gradient-to-b from-purple-400 to-cyan-400 transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="mt-2 animate-bounce">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;