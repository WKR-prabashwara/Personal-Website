import React from 'react';
import { ExternalLink, Github, Calendar, Sparkles, Calculator, Microscope, Shield } from 'lucide-react';

const ProjectsSection = () => {
  // Mock projects data with better accessibility
  const projects = [
    {
      id: 1,
      title: "Mathematical Modeling Project",
      description: "Exploring complex mathematical models and their real-world applications in physics and engineering",
      date: "Coming Soon",
      status: "planned",
      technologies: ["Mathematics", "Python", "Data Analysis"],
      image: "/api/placeholder/400/200",
      ariaLabel: "Mathematical modeling project - exploring complex models and applications"
    },
    {
      id: 2,
      title: "Cryptography Research",
      description: "In-depth study of encryption algorithms and secure communication protocols with practical implementations",
      date: "In Progress",
      status: "development",
      technologies: ["Cryptography", "Security", "Algorithms"],
      image: "/api/placeholder/400/200",
      ariaLabel: "Cryptography research project - studying encryption and security"
    },
    {
      id: 3,
      title: "Physics Simulation",
      description: "Interactive simulations of physical phenomena and fundamental laws using computational methods",
      date: "Planning Phase",
      status: "planned",
      technologies: ["Physics", "Simulation", "Programming"],
      image: "/api/placeholder/400/200",
      ariaLabel: "Physics simulation project - interactive simulations of physical phenomena"
    }
  ];

  const futureAreas = [
    {
      icon: Calculator,
      title: "Pure Mathematics",
      description: "Advanced mathematical theories and proofs"
    },
    {
      icon: Microscope,
      title: "Applied Physics", 
      description: "Real-world applications of physical principles"
    },
    {
      icon: Shield,
      title: "Cryptographic Systems",
      description: "Secure communication and encryption methods"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'development':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'planned':
        return 'Planned';
      case 'development':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const handleProjectAction = (action, projectTitle) => {
    const message = action === 'details' 
      ? `Project details for "${projectTitle}" will be available soon!`
      : `Research paper for "${projectTitle}" - Coming soon!`;
    
    alert(message);
    
    // Track interaction
    if (typeof gtag === 'function') {
      gtag('event', 'project_interaction', {
        action: action,
        project_title: projectTitle
      });
    }
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-20 bg-black"
      aria-labelledby="projects-heading"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
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
        {/* Header */}
        <header className="text-center mb-16">
          <div className="mb-8 py-2 px-4 border border-purple-500/50 rounded-full backdrop-blur-sm bg-black/20 inline-block">
            <span className="text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-sm flex items-center justify-center">
                <Calculator className="w-3 h-3 text-white" aria-hidden="true" />
              </div>
              <span>Mathematics Student Portfolio</span>
            </span>
          </div>
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Projects & Research,
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            While I haven't completed any major projects yet, here are the exciting research areas 
            and projects I'm planning to explore. These represent my academic interests and future goals.
          </p>
        </header>

        {/* Planned Projects Grid */}
        <section aria-labelledby="planned-projects-heading">
          <h3 id="planned-projects-heading" className="sr-only">Planned Projects</h3>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="bg-card border border-border rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
                aria-labelledby={`project-title-${project.id}`}
              >
                {/* Project Image Placeholder */}
                <div 
                  className="aspect-video bg-muted rounded-lg mb-4 sm:mb-6 flex items-center justify-center"
                  role="img"
                  aria-label={project.ariaLabel}
                >
                  <Calculator className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" aria-hidden="true" />
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {/* Title and Status */}
                  <header className="flex items-start justify-between gap-2">
                    <h4 id={`project-title-${project.id}`} className="text-lg sm:text-xl font-semibold text-foreground leading-tight">
                      {project.title}
                    </h4>
                    <span 
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(project.status)}`}
                      aria-label={`Project status: ${getStatusText(project.status)}`}
                    >
                      {getStatusText(project.status)}
                    </span>
                  </header>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Date */}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                    <time>{project.date}</time>
                  </div>
                  
                  {/* Technologies */}
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
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:pt-4">
                    <button 
                      onClick={() => handleProjectAction('details', project.title)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                      aria-label={`View details for ${project.title}`}
                      type="button"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      <span>View Details</span>
                    </button>
                    <button 
                      onClick={() => handleProjectAction('research', project.title)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-black"
                      aria-label={`View research paper for ${project.title}`}
                      type="button"
                    >
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <span>Research Paper</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Future Work Section */}
        <section className="mt-16" aria-labelledby="future-work-heading">
          <div className="bg-card border border-border rounded-2xl p-8">
            <header className="text-center mb-8">
              <h3 id="future-work-heading" className="text-2xl font-semibold text-foreground mb-4">
                Future Research Areas
              </h3>
              <p className="text-muted-foreground">
                Areas of study that fascinate me and drive my academic curiosity
              </p>
            </header>
            
            <div className="grid md:grid-cols-3 gap-6">
              {futureAreas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <article key={index} className="p-4 text-center">
                    <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h4 className="font-semibold text-foreground mb-2">{area.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {area.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProjectsSection;