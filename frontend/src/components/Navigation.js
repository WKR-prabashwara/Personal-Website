import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import analyticsService from '../services/analyticsService';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      // GSAP animation for navigation background
      gsap.to(navRef.current, {
        backgroundColor: isScrolled ? 'rgba(3, 7, 18, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottomColor: isScrolled ? 'rgba(147, 51, 234, 0.2)' : 'transparent',
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial entrance animations
    const tl = gsap.timeline();
    
    tl.from(logoRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(navItemsRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.7");

  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll with GSAP
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: element,
          offsetY: 80
        },
        ease: "power2.inOut"
      });
      
      // Track navigation click
      analyticsService.trackEvent('Navigation', 'section_click', sectionId);
    }
    setIsMenuOpen(false);
  };

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter-section');
    if (newsletterSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: newsletterSection,
          offsetY: 80
        },
        ease: "power2.inOut"
      });
    } else {
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: blogSection,
            offsetY: 80
          },
          ease: "power2.inOut"
        });
      }
    }
    
    analyticsService.trackEvent('Navigation', 'subscribe_click');
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Opening animation
      gsap.set(mobileMenuRef.current, { display: 'block' });
      gsap.fromTo(mobileMenuRef.current, {
        opacity: 0,
        y: -20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Stagger animation for menu items
      gsap.fromTo(mobileMenuRef.current.children, {
        x: -30,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.1
      });
    } else {
      // Closing animation
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: 'none' });
        }
      });
    }
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            ref={logoRef}
            className="text-foreground text-xl font-bold cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => scrollToSection('home')}
          >
            Prabashwara.
          </div>
          
          {/* Desktop Navigation - Centered nav links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button 
                  key={item.id}
                  ref={el => navItemsRef.current[index] = el}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 focus:outline-none focus:text-foreground group"
                  onMouseEnter={(e) => {
                    gsap.to(e.target, {
                      y: -2,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.target, {
                      y: 0,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Subscribe button - Always on the right */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={scrollToNewsletter}
              className="relative bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background overflow-hidden group"
              onMouseEnter={(e) => {
                gsap.to(e.target, {
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(147, 51, 234, 0.4)",
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, {
                  scale: 1,
                  boxShadow: "0 0 0 rgba(147, 51, 234, 0)",
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
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
          ref={mobileMenuRef}
          className="md:hidden mt-4 pb-4 hidden"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-left focus:outline-none focus:text-foreground transform hover:translate-x-2"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={scrollToNewsletter}
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