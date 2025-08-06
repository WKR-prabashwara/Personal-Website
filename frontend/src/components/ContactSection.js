import React, { useState } from 'react';
import { Mail, MapPin, Clock, Phone } from 'lucide-react';
import GoogleStyleMap from './GoogleStyleMap';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative min-h-screen py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-20">
          {/* Animated particles */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-primary rounded-full animate-pulse"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            CONTACT US
          </h2>
          <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We align leaders around a shared purpose and strategic story that catalyzes their business and brand to take action.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gray-800 text-white rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Address */}
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white/80">ADDRESS:</h3>
                <p className="text-sm">121 Rock Street, 21 Avenue,</p>
                <p className="text-sm">New York, NY 92103-9000</p>
              </div>

              {/* Email */}
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white/80">EMAIL:</h3>
                <p className="text-sm underline">hello@company.com</p>
                <p className="text-sm underline">support@company.com</p>
              </div>
            </div>

            {/* Phone & Contact Us */}
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white/80">CALL US:</h3>
                <p className="text-sm">1 (234) 567-891</p>
                <p className="text-sm">1 (234) 987-654</p>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4 text-white/80">CONTACT US</h3>
                <p className="text-sm text-white/70 mb-6">Contact us for a quote. Help or to join the team.</p>
                
                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-sm">f</span>
                  </a>
                  <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-sm">t</span>
                  </a>
                  <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-sm">i</span>
                  </a>
                  <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-sm">p</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Google Style Map */}
          <div className="h-96 lg:h-full min-h-[400px]">
            <GoogleStyleMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;