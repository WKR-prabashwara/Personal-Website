import React from 'react';
import { ExternalLink, Github, Calendar, Sparkles, Calculator, Microscope, Shield } from 'lucide-react';

const ProjectsSection = () => {
  // Mock projects data
  const projects = [
    {
      id: 1,
      title: "Mathematical Modeling Project",
      description: "Exploring complex mathematical models and their real-world applications",
      date: "Coming Soon",
      status: "planned",
      technologies: ["Mathematics", "Python", "Data Analysis"],
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "Cryptography Research",
      description: "Study of encryption algorithms and secure communication protocols",
      date: "In Progress",
      status: "development",
      technologies: ["Cryptography", "Security", "Algorithms"],
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      title: "Physics Simulation",
      description: "Interactive simulations of physical phenomena and laws",
      date: "Planning Phase",
      status: "planned",
      technologies: ["Physics", "Simulation", "Programming"],
      image: "/api/placeholder/400/200"
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary/15 rounded-full animate-pulse blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mb-8 py-2 px-4 border border-purple-500/50 rounded-full backdrop-blur-sm bg-black/20 inline-block">
            <span className="text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center">
              <Sparkles className="inline w-4 h-4 mr-2" />
              Mathematics Student Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Projects & Research,
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            I didn't do any project or research, but I think to do. So add test parts.
          </p>
        </div>

        {/* Planned Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video bg-muted rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
                <Calculator className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-tight">{project.title}</h3>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    project.status === 'planned' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : project.status === 'development'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {project.status === 'planned' ? 'Planned' : project.status === 'development' ? 'In Progress' : 'Completed'}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  {project.date}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-secondary text-foreground text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:pt-4">
                  <button 
                    onClick={() => alert("Coming Soon - Project details will be available soon!")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Details
                  </button>
                  <button 
                    onClick={() => alert("Research Paper - Coming soon!")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    Research Paper
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Work Section */}
        <div className="mt-16 text-center">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Future Research Areas
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-4">
                <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Pure Mathematics</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced mathematical theories and proofs
                </p>
              </div>
              <div className="p-4">
                <Microscope className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Applied Physics</h4>
                <p className="text-sm text-muted-foreground">
                  Real-world applications of physical principles
                </p>
              </div>
              <div className="p-4">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Cryptographic Systems</h4>
                <p className="text-sm text-muted-foreground">
                  Secure communication and encryption methods
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;