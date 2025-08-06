import React from 'react';
import { Progress } from '../components/ui/progress';

const ExperienceSection = () => {
  const skills = [
    { name: 'Mathematics', level: 90 },
    { name: 'Physics', level: 85 },
    { name: 'Chemistry', level: 80 },
    { name: 'Programming', level: 75 },
    { name: 'Networking', level: 70 },
    { name: 'Cryptography', level: 65 }
  ];

  return (
    <section id="experience" className="relative min-h-screen py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary/10 rounded-full animate-pulse blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            My Experiences,
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
            I like to add skills bars here
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills Section */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-8">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Details */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Current Status</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Academic Level</h4>
                  <p className="text-muted-foreground">
                    Advanced Level Student specializing in Mathematics and Science stream
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Learning Focus</h4>
                  <p className="text-muted-foreground">
                    Currently exploring advanced mathematical concepts, theoretical physics, 
                    and practical applications in programming and cryptography.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Future Goals</h4>
                  <p className="text-muted-foreground">
                    Aspiring to contribute to mathematical research and develop innovative 
                    solutions in technology and science.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Note for Development</h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-muted-foreground text-sm">
                  I have skills about mathematics (pure, applied), physics, chemistry, 
                  programming, networking, cryptography-like subjects, but I have no experiences yet.
                  This section will be updated as I gain more practical experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;