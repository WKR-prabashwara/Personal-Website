import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  // Interactive back to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-card border-t border-border py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">Prabashwara</h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Exploring mathematics, science, and technology through continuous learning and curiosity.
            </p>
            <div className="text-muted-foreground text-xs sm:text-sm">
              <p>support@mail.com</p>
              <p>📞 000</p>
            </div>

            {/* Social Links with Icons */}
            <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105"
                title="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105"
                title="X (Twitter)"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm hover:translate-x-1 transform duration-300 text-left relative z-10 cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Back to Top */}
          <div className="space-y-3 sm:space-y-4 md:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Navigation</h4>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 group transform hover:scale-105 relative z-10 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-2 group-hover:text-primary transition-all duration-300" />
              <span className="text-xs sm:text-sm group-hover:text-primary">Back to Top</span>
            </button>
            <div className="text-xs sm:text-sm text-muted-foreground">
              <p>Click to smoothly scroll back to the top of the page</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-muted-foreground text-xs sm:text-sm">
              © Copyright {new Date().getFullYear()}. All rights reserved | Built with ❤️ using React & FastAPI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;