import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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

  // Interactive scroll to explore function
  const handleScrollExplore = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Star Background */}
      <StarBackground />
      
      {/* Black Hole Video - Original positioning restored */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rotate-180 absolute top-[-280px] h-full w-full left-0 z-[-10] object-cover"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>
      
      {/* Content Overlay - Better positioned and responsive */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center"
        style={{ 
          opacity: scrollProgress < 0.7 ? 1 - (scrollProgress * 1.2) : 0,
          transform: `translateY(${scrollProgress * 30}px) scale(${1 - scrollProgress * 0.1})`,
        }}
      >
        {/* Welcome Badge - Improved responsive design */}
        <motion.div
          variants={slideInFromTop}
          className="mb-6 sm:mb-8 py-2 px-4 border border-purple-500/50 rounded-full backdrop-blur-sm bg-black/40"
        >
          <span className="text-xs sm:text-sm text-purple-300 flex items-center gap-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.33L10.5 11L15 15.5L20.67 9.83L23.5 12.5L22 14H22L21 13V15L15 21L9 15V9L15 3V1L9 7V9L15 15L21 9Z"/>
            </svg>
            <span className="whitespace-nowrap">Mathematics Student Portfolio</span>
          </span>
        </motion.div>

        {/* Main Title - Improved responsive typography */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-center mb-4 sm:mb-6 max-w-4xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wider leading-tight">
            <span className="text-white">Rivibibu</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Prabashwara.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle - Improved responsive design */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center mb-6 sm:mb-8 px-4"
        >
          Exploring the cosmos through science, mathematics, and imagination
        </motion.p>

        {/* Action Buttons - Improved responsive layout */}
        <motion.div 
          variants={slideInFromLeft(1)}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto"
        >
          <button 
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="group bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black text-sm sm:text-base font-medium"
          >
            <span className="flex items-center justify-center whitespace-nowrap">
              Explore My Work
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="bg-transparent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-white/30 hover:border-purple-400 hover:bg-white/5 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black text-sm sm:text-base font-medium whitespace-nowrap"
          >
            Get In Touch
          </button>
        </motion.div>
      </motion.div>

      {/* Interactive Scroll Indicator - Improved positioning */}
      <motion.div 
        variants={scaleIn(1.5)}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <button 
          onClick={handleScrollExplore}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 cursor-pointer group focus:outline-none"
        >
          <p className="mb-2 text-xs sm:text-sm group-hover:text-purple-300 transition-colors whitespace-nowrap">Scroll to explore</p>
          <div className="w-px h-8 sm:h-12 bg-white/20 relative">
            <div 
              className="absolute top-0 w-px bg-gradient-to-b from-purple-400 to-cyan-400 transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="mt-2 animate-bounce group-hover:animate-pulse">
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-purple-300 transition-colors" />
          </div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;