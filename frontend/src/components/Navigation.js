import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import analyticsService from '../services/analyticsService';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      analyticsService.trackEvent('Navigation', 'section_click', sectionId);
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

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md border-purple-500/20' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Make responsive and clickable to home */}
          <div 
            className="text-foreground text-xl md:text-2xl font-bold cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => scrollToSection('home')}
          >
            <span className="block sm:hidden">P.</span>
            <span className="hidden sm:block">Prabashwara.</span>
          </div>
          
          {/* Desktop Navigation - More minimalist dock-style */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="bg-background/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/10">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative text-muted-foreground hover:text-foreground transition-all duration-300 focus:outline-none focus:text-foreground group text-sm font-medium hover:-translate-y-0.5"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Subscribe button - Fix shake issue with better animation */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={scrollToNewsletter}
              className="relative bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background overflow-hidden group hover:scale-102"
            >
              <span className="relative z-10">Subscribe</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              className="text-foreground focus:outline-none transform transition-transform duration-200 hover:scale-110"
              onClick={toggleMobileMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden mt-4 pb-4 transition-all duration-300 ${
            isMenuOpen ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-4'
          }`}
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleMobileNavClick(item.id)}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 text-left focus:outline-none focus:text-foreground hover:translate-x-2"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                scrollToNewsletter();
                setIsMenuOpen(false);
              }}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 w-fit focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;