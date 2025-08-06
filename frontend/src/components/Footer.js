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
    <footer className="relative bg-card border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Prabashwara</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Exploring mathematics, science, and technology through continuous learning and curiosity.
            </p>
            <div className="text-muted-foreground text-sm">
              <p>support@mail.com</p>
              <p>📞 000</p>
            </div>

            {/* Social Links with Icons */}
            <div className="flex items-center gap-4 mt-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105"
                title="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm hover:translate-x-1 transform duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Back to Top */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Navigation</h4>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 group transform hover:scale-105"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-2 group-hover:text-primary transition-all duration-300" />
              <span className="text-sm group-hover:text-primary">Back to Top</span>
            </button>
            <div className="text-sm text-muted-foreground">
              <p>Click to smoothly scroll back to the top of the page</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © Copyright 2024. All right reserved | Built with ❤️ using React & FastAPI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;