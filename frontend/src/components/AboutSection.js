import React from 'react';
import { User, BookOpen, Code, Calculator, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight, slideInFromTop, scaleIn } from '../utils/motion';

const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen py-16 sm:py-20 bg-black overflow-hidden">
      {/* Enhanced Blurred Stars Background - Better positioned */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400/20 rounded-full animate-pulse blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            variants={slideInFromTop}
            className="mb-6 sm:mb-8 py-2 px-4 border border-purple-500/50 rounded-full backdrop-blur-sm bg-black/20 inline-block"
          >
            <span className="text-xs sm:text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-sm flex items-center justify-center flex-shrink-0">
                <Calculator className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
              </div>
              <span className="whitespace-nowrap">Mathematics Student Portfolio</span>
            </span>
          </motion.div>
          <motion.h2 
            variants={slideInFromTop}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            About me,
          </motion.h2>
          <motion.p 
            variants={slideInFromTop}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-4"
          >
            My name is Rivibibu Prabashwara, and I'm currently studying in an advanced level in science stream.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2 items-center"
        >
          {/* Profile Section - Enhanced responsive design */}
          <motion.div 
            variants={slideInFromLeft(0.3)}
            className="flex flex-col items-center lg:items-start"
          >
            {/* Profile Photo Card - Better responsive sizing */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gray-900/50 border border-purple-500/30 rounded-2xl mb-6 sm:mb-8 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <div className="w-full h-full bg-gradient-to-br from-purple-900/30 via-black/50 to-blue-900/30 flex items-center justify-center relative">
                {/* Placeholder for actual photo */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gray-800/80 rounded-full flex items-center justify-center border-4 border-gray-700/50 shadow-inner">
                  <User className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-400" />
                </div>
                
                {/* Photo overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 border border-purple-500/20 rounded-2xl"></div>
              </div>
            </div>
            
            <div className="text-center lg:text-left px-4 lg:px-0 max-w-md lg:max-w-none">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3 sm:mb-4">
                Mathematics Student
              </h3>
              <p className="text-gray-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                I study advanced mathematics, physics, chemistry, programming, networking, 
                and cryptography-like subjects. I appreciate both because encountering new ideas
                and concepts helps me learn, change, and learn something new every day.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                For me, becoming a better version of myself means constantly working and improving.
              </p>
              
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base font-medium shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black"
              >
                Contact me
              </button>
            </div>
          </motion.div>

          {/* Skills and Interests - Enhanced responsive layout */}
          <motion.div 
            variants={slideInFromRight(0.5)}
            className="space-y-4 sm:space-y-6 lg:space-y-8"
          >
            <div className="bg-gray-900/40 border border-purple-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400 mr-3 flex-shrink-0" />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white">Academic Focus</h4>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Mathematics (Pure & Applied)</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Physics & Chemistry</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Advanced Level Sciences</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/40 border border-purple-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400 mr-3 flex-shrink-0" />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white">Technical Skills</h4>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Programming & Development</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Networking & Systems</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base">Cryptography & Security</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/40 border border-purple-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400 mr-3 flex-shrink-0" />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white">Philosophy</h4>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
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