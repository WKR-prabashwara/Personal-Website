import React, { useState, useEffect, useRef } from 'react';
import { Home, User, BookOpen, Mail } from 'lucide-react';
import analyticsService from '../services/analyticsService';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      const sections = ['home', 'about', 'blog', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      analyticsService.trackEvent('Navigation', 'section_click', sectionId);
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter-section');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    analyticsService.trackEvent('Navigation', 'subscribe_click');
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <>
      {/* Header with integrated navigation */}
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-lg border-b border-purple-500/30' 
            : 'bg-black/60 backdrop-blur-md border-b border-purple-500/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - Enhanced responsive design */}
            <div 
              className="text-white text-lg sm:text-xl md:text-2xl font-bold cursor-pointer transform hover:scale-105 transition-transform duration-300"
              onClick={() => scrollToSection('home')}
            >
              <span className="hidden sm:block">Prabashwara.</span>
              <span className="block sm:hidden">P.</span>
            </div>
            
            {/* Desktop Navigation - Enhanced responsive dock */}
            <div className="hidden md:flex items-center">
              <div className="bg-black/80 backdrop-blur-sm rounded-full px-3 lg:px-4 py-2 border border-purple-500/30 shadow-lg">
                <div className="flex items-center space-x-0.5 lg:space-x-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    
                    return (
                      <button 
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`relative flex items-center space-x-1.5 lg:space-x-2 px-2.5 lg:px-3 py-1.5 rounded-full transition-all duration-300 text-xs lg:text-sm font-medium ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-sm scale-105' 
                            : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                        }`}
                      >
                        <Icon className="w-3 h-3 lg:w-3.5 lg:h-3.5 flex-shrink-0" />
                        <span className="whitespace-nowrap">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Subscribe button - Enhanced responsive */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={scrollToNewsletter}
                className="relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 lg:px-4 py-2 rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black overflow-hidden group hover:scale-105 text-xs lg:text-sm font-medium shadow-lg"
              >
                <span className="relative z-10 whitespace-nowrap">Subscribe</span>
              </button>
            </div>

            {/* Mobile Navigation - Enhanced icon dock */}
            <div className="md:hidden">
              <div className="bg-black/80 backdrop-blur-sm rounded-full px-2.5 py-2 border border-purple-500/30 shadow-lg">
                <div className="flex items-center space-x-0.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    
                    return (
                      <button 
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-sm scale-110' 
                            : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-110'
                        }`}
                        title={item.label}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;