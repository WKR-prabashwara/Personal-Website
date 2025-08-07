import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long')
});

const ContactSection = () => {
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      await axios.post(`${backendUrl}/api/contact`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });
      
      setSubmitStatus('success');
      reset(); // Clear form on success
      
      // Track successful form submission
      if (typeof gtag === 'function') {
        gtag('event', 'form_submit', {
          form_name: 'contact_form',
          success: true
        });
      }
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      
      // Track failed form submission
      if (typeof gtag === 'function') {
        gtag('event', 'form_submit', {
          form_name: 'contact_form',
          success: false,
          error: error.message
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-20 bg-black"
      aria-labelledby="contact-heading"
    >
      {/* Background particles */}
      <div className="absolute inset-0" aria-hidden="true">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8 py-2 px-4 border border-purple-500/50 rounded-full backdrop-blur-sm bg-black/20 inline-block">
            <span className="text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-sm flex items-center justify-center">
                <Mail className="w-3 h-3 text-white" aria-hidden="true" />
              </div>
              <span>Mathematics Student Portfolio</span>
            </span>
          </div>
          <h2 id="contact-heading" className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's work <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">together</span>,
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Have a question or an idea? Reach out to me! I'd love to hear from you and
            explore how we can collaborate to solve your needs together.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
          {/* Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Send me a message
            </h3>
            
            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3" role="alert">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-300 text-sm">
                  Thank you! Your message has been sent successfully. I'll get back to you soon.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3" role="alert">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">
                  Sorry, there was an error sending your message. Please try again or contact me directly.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  placeholder="Your Name"
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-sm sm:text-base ${
                    errors.name ? 'border-red-500/50' : 'border-gray-600/50'
                  }`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-400" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Your Email"
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-sm sm:text-base ${
                    errors.email ? 'border-red-500/50' : 'border-gray-600/50'
                  }`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-400" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  {...register('message')}
                  placeholder="Your Message"
                  rows="5"
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none text-sm sm:text-base ${
                    errors.message ? 'border-red-500/50' : 'border-gray-600/50'
                  }`}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-400" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map and Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Map Section */}
            <div 
              className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6 sm:p-8 text-center min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
              role="img"
              aria-label="Location map placeholder for Colombo, Sri Lanka"
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10" aria-hidden="true">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-purple-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${Math.random() * 4 + 2}px`,
                      height: `${Math.random() * 4 + 2}px`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">My Living Area</h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">Interactive map coming soon</p>
                <p className="text-purple-300 text-sm">📍 Colombo, Sri Lanka</p>
                <p className="text-gray-400 text-xs mt-2">Google Maps integration will be added soon</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                Contact Information
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-purple-300" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Email</p>
                    <a 
                      href="mailto:rivibibu@example.com" 
                      className="text-white text-sm sm:text-base hover:text-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                    >
                      rivibibu@example.com
                    </a>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6">
                  <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                    Connect with me on social platforms
                  </p>
                  <div className="flex gap-3" role="list">
                    <a 
                      href="https://github.com/rivibibu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
                      aria-label="Visit my GitHub profile"
                    >
                      <Github className="w-4 h-4 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </a>
                    <a 
                      href="https://linkedin.com/in/rivibibu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
                      aria-label="Visit my LinkedIn profile"
                    >
                      <Linkedin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </a>
                    <a 
                      href="https://twitter.com/rivibibu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
                      aria-label="Visit my X (Twitter) profile"
                    >
                      <Twitter className="w-4 h-4 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;