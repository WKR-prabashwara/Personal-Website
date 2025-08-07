import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/rivibibu',
      icon: Github,
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/rivibibu',
      icon: Linkedin,
      ariaLabel: 'Connect with me on LinkedIn'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/rivibibu', 
      icon: Twitter,
      ariaLabel: 'Follow me on X (Twitter)'
    },
    {
      name: 'Email',
      url: 'mailto:rivibibu@example.com',
      icon: Mail,
      ariaLabel: 'Send me an email'
    }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Track scroll to top
    if (typeof gtag === 'function') {
      gtag('event', 'navigation_click', {
        section: 'top',
        source: 'footer'
      });
    }
  };

  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <footer className="relative bg-black border-t border-gray-800/50" role="contentinfo">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-500/5 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <button
              onClick={handleScrollToTop}
              onKeyPress={(e) => handleKeyPress(e, handleScrollToTop)}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-cyan-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-1"
              aria-label="Scroll to top of page - Rivibibu Prabashwara"
              type="button"
            >
              Rivibibu Prabashwara
            </button>
            <p className="mt-4 text-gray-300 leading-relaxed max-w-md">
              Advanced level mathematics and science student exploring the cosmos through 
              research, programming, and continuous learning.
            </p>
            <p className="mt-2 text-gray-400 text-sm">
              Based in Colombo, Sri Lanka 🇱🇰
            </p>
          </div>

          {/* Quick Links */}
          <nav className="space-y-4" aria-labelledby="footer-nav-heading">
            <h3 id="footer-nav-heading" className="text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {[
                { name: 'About', href: '#about', label: 'About section' },
                { name: 'Projects', href: '#projects', label: 'Projects section' },
                { name: 'Blog', href: '#blog', label: 'Blog section' },
                { name: 'Contact', href: '#contact', label: 'Contact section' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded inline-block"
                    aria-label={`Navigate to ${link.label}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3" role="list">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="w-10 h-10 bg-gray-800/50 hover:bg-purple-600 border border-gray-700/50 hover:border-purple-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label={social.ariaLabel}
                    role="listitem"
                  >
                    <IconComponent className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" aria-hidden="true" />
                    {social.name !== 'Email' && (
                      <ExternalLink className="sr-only" aria-hidden="true" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Stay updated with my latest posts</p>
              <button
                onClick={() => {
                  const element = document.getElementById('newsletter-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Subscribe to newsletter"
                type="button"
              >
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm flex items-center gap-1">
              © {currentYear} Rivibibu Prabashwara. Made with 
              <Heart className="w-4 h-4 text-red-500 mx-1" aria-hidden="true" />
              and passion for mathematics.
            </p>

            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm">
              <button
                onClick={() => {
                  alert('Privacy Policy - Coming Soon');
                }}
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                type="button"
              >
                Privacy
              </button>
              <button
                onClick={() => {
                  alert('Terms of Service - Coming Soon');
                }}
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                type="button"
              >
                Terms
              </button>
            </div>
          </div>

          {/* Performance & Accessibility Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              This site is optimized for performance and accessibility.{' '}
              <button
                onClick={() => {
                  window.open('https://web.dev/measure/', '_blank', 'noopener,noreferrer');
                }}
                className="text-purple-400 hover:text-purple-300 underline focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="Check site performance with Google PageSpeed Insights (opens in new tab)"
                type="button"
              >
                Test performance
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Hidden for mobile, shown on larger screens */}
      <button
        onClick={handleScrollToTop}
        onKeyPress={(e) => handleKeyPress(e, handleScrollToTop)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black hidden lg:flex items-center justify-center z-40"
        aria-label="Scroll to top of page"
        title="Back to top"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;