import React from 'react';
import { User, BookOpen, Code, Calculator, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight, slideInFromTop, scaleIn } from '../utils/motion';

const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen py-20 bg-black">
      {/* Blurred Stars Background */}
      <div className="absolute inset-0">
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
          <motion.div
            variants={slideInFromTop}
            className="mb-8 py-2 px-4 border border-purple-500/50 rounded-full backdrop-blur-sm bg-black/20 inline-block"
          >
            <span className="text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-sm flex items-center justify-center">
                <Calculator className="w-3 h-3 text-white" />
              </div>
              Mathematics Student Portfolio
            </span>
          </motion.div>
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
          className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center"
        >
          {/* Profile Section */}
          <motion.div 
            variants={slideInFromLeft(0.3)}
            className="flex flex-col items-center lg:items-start"
          >
            {/* Profile Photo Card */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 bg-card border border-border rounded-2xl mb-6 sm:mb-8 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center relative">
                {/* Placeholder for actual photo */}
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-muted rounded-full flex items-center justify-center border-4 border-background shadow-inner">
                  <User className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground/50" />
                </div>
                
                {/* Photo overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              </div>
            </div>
            
            <div className="text-center lg:text-left px-4 lg:px-0">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
                Mathematics Student
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                I study advanced mathematics, physics, chemistry, programming, networking, 
                and cryptography-like subjects. I appreciate both because encountering new ideas
                and concepts helps me learn, change, and learn something new every day.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                For me, becoming a better version of myself means constantly working and improving.
              </p>
              
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-primary-foreground px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Contact me
              </button>
            </div>
          </motion.div>

          {/* Skills and Interests */}
          <motion.div 
            variants={slideInFromRight(0.5)}
            className="space-y-6 sm:space-y-8"
          >
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
              <div className="flex items-center mb-3 sm:mb-4">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-3" />
                <h4 className="text-lg sm:text-xl font-semibold text-foreground">Academic Focus</h4>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Mathematics (Pure & Applied)</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Physics & Chemistry</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Advanced Level Sciences</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
              <div className="flex items-center mb-3 sm:mb-4">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-3" />
                <h4 className="text-lg sm:text-xl font-semibold text-foreground">Technical Skills</h4>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Programming & Development</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Networking & Systems</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Cryptography & Security</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
              <div className="flex items-center mb-3 sm:mb-4">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-3" />
                <h4 className="text-lg sm:text-xl font-semibold text-foreground">Philosophy</h4>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
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