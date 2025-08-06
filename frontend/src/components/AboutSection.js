import React from 'react';
import { User, BookOpen, Code, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight, slideInFromTop, scaleIn } from '../utils/motion';

const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen py-20">
      {/* Blurred Stars Background */}
      <div className="absolute inset-0 bg-background">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary/20 rounded-full animate-pulse blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={slideInFromTop}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            About me,
          </motion.h2>
          <motion.p 
            variants={slideInFromTop}
            className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            My name is Rivibibu Prabashwara, and I'm currently studying in an advanced level in science stream.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Profile Section */}
          <motion.div 
            variants={slideInFromLeft(0.3)}
            className="flex flex-col items-center lg:items-start"
          >
            {/* Profile Photo Card */}
            <div className="w-80 h-80 bg-card border border-border rounded-2xl mb-8 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center relative">
                {/* Placeholder for actual photo */}
                <div className="w-64 h-64 bg-muted rounded-full flex items-center justify-center border-4 border-background shadow-inner">
                  <User className="w-32 h-32 text-muted-foreground/50" />
                </div>
                
                {/* Photo overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Mathematics Student
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I study advanced mathematics, physics, chemistry, programming, networking, 
                and cryptography-like subjects. I appreciate both because encountering new ideas
                and concepts helps me learn, change, and learn something new every day.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                For me, becoming a better version of myself means constantly working and improving.
              </p>
              
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                Contact me
              </button>
            </div>
          </motion.div>

          {/* Skills and Interests */}
          <motion.div 
            variants={slideInFromRight(0.5)}
            className="space-y-8"
          >
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Calculator className="w-6 h-6 text-primary mr-3" />
                <h4 className="text-xl font-semibold text-foreground">Academic Focus</h4>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Mathematics (Pure & Applied)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Physics & Chemistry
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Advanced Level Sciences
                </li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Code className="w-6 h-6 text-primary mr-3" />
                <h4 className="text-xl font-semibold text-foreground">Technical Skills</h4>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Programming & Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Networking & Systems
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Cryptography & Security
                </li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-primary mr-3" />
                <h4 className="text-xl font-semibold text-foreground">Philosophy</h4>
              </div>
              <p className="text-muted-foreground">
                I believe in continuous learning and improvement. Every day brings new opportunities 
                to discover, understand, and grow both intellectually and personally.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;