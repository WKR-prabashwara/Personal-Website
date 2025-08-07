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

  // Unified scroll function with better error handling and accessibility
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.error(`Section with id '${sectionId}' not found`);
      return;
    }
    
    try {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      analyticsService.trackEvent('Navigation', 'section_click', sectionId);
      setActiveSection(sectionId);
      
      // Announce navigation for screen readers
      const announcement = `Navigating to ${sectionId} section`;
      const srAnnouncement = document.createElement('div');
      srAnnouncement.setAttribute('aria-live', 'polite');
      srAnnouncement.setAttribute('aria-atomic', 'true');
      srAnnouncement.className = 'sr-only';
      srAnnouncement.textContent = announcement;
      document.body.appendChild(srAnnouncement);
      setTimeout(() => document.body.removeChild(srAnnouncement), 1000);
      
    } catch (error) {
      console.error('Navigation scroll error:', error);
      // Fallback scroll method
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: rect.top + scrollTop,
        behavior: 'smooth'
      });
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

  // Keyboard navigation handler
  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
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
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              className="text-white text-lg sm:text-xl md:text-2xl font-bold cursor-pointer transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-1"
              onClick={() => scrollToSection('home')}
              onKeyPress={(e) => handleKeyPress(e, () => scrollToSection('home'))}
              aria-label="Go to home section - Rivibibu Prabashwara"
              type="button"
            >
              <span className="hidden sm:block">Prabashwara.</span>
              <span className="block sm:hidden">Pr.</span>
            </button>
            
            {/* Desktop Navigation - Enhanced accessibility */}
            <div className="hidden md:flex items-center">
              <nav className="bg-black/80 backdrop-blur-sm rounded-full px-3 lg:px-4 py-2 border border-purple-500/30 shadow-lg">
                <ul className="flex items-center space-x-0.5 lg:space-x-1" role="list">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    
                    return (
                      <li key={item.id} role="listitem">
                        <button 
                          onClick={() => scrollToSection(item.id)}
                          onKeyPress={(e) => handleKeyPress(e, () => scrollToSection(item.id))}
                          className={`relative flex items-center space-x-1.5 lg:space-x-2 px-2.5 lg:px-3 py-1.5 rounded-full transition-all duration-300 text-sm lg:text-base font-medium focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black ${
                            isActive 
                              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-sm scale-105' 
                              : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                          aria-label={`Navigate to ${item.label} section`}
                          type="button"
                        >
                          <Icon className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" aria-hidden="true" />
                          <span className="whitespace-nowrap">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            
            {/* Subscribe button */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={scrollToNewsletter}
                onKeyPress={(e) => handleKeyPress(e, scrollToNewsletter)}
                className="relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 lg:px-4 py-2 rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black overflow-hidden group hover:scale-105 text-sm lg:text-base font-medium shadow-lg"
                aria-label="Subscribe to blog updates"
                type="button"
              >
                <span className="relative z-10 whitespace-nowrap">Subscribe</span>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <nav 
                className="bg-black/80 backdrop-blur-sm rounded-full px-2.5 py-2 border border-purple-500/30 shadow-lg"
                aria-label="Mobile navigation"
              >
                <ul className="flex items-center space-x-0.5" role="list">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    
                    return (
                      <li key={item.id} role="listitem">
                        <button 
                          onClick={() => scrollToSection(item.id)}
                          onKeyPress={(e) => handleKeyPress(e, () => scrollToSection(item.id))}
                          className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black ${
                            isActive 
                              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-sm scale-110' 
                              : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-110'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                          aria-label={`Navigate to ${item.label} section`}
                          title={item.label}
                          type="button"
                        >
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;