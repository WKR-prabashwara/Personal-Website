import React, { useState } from 'react';
import { ChevronDown, Calendar, ExternalLink } from 'lucide-react';

const TimelineSection = () => {
  const [showMore, setShowMore] = useState(false);

  // Mock timeline data
  const timelineEvents = [
    {
      id: 1,
      year: "2010",
      title: "Started Primary Education",
      description: "Began formal education with focus on basic mathematics and sciences.",
      image: "/api/placeholder/300/200",
      tags: ["Education", "Foundation"],
      dateRange: "2010 - 2015"
    },
    {
      id: 2,
      year: "2012", 
      title: "Mathematics Excellence",
      description: "Achieved outstanding results in mathematics competitions at school level.",
      image: "/api/placeholder/300/200", 
      tags: ["Achievement", "Mathematics"],
      dateRange: "2012"
    },
    {
      id: 3,
      year: "2013",
      title: "Science Stream Selection", 
      description: "Chose science stream focusing on mathematics, physics, and chemistry.",
      image: "/api/placeholder/300/200",
      tags: ["Education", "Career Path"], 
      dateRange: "2013"
    },
    {
      id: 4,
      year: "2016",
      title: "Advanced Level Entry",
      description: "Successfully entered Advanced Level studies with focus on mathematics and sciences.",
      image: "/api/placeholder/300/200",
      tags: ["Education", "Milestone"],
      dateRange: "2016 - Present"
    },
    {
      id: 5,
      year: "2017", 
      title: "Programming Discovery",
      description: "Discovered programming and computational mathematics. Started learning Python.",
      image: "/api/placeholder/300/200",
      tags: ["Technology", "Skill Development"],
      dateRange: "2017"
    },
    {
      id: 6,
      year: "2018",
      title: "Research Interests", 
      description: "Developed interests in cryptography, advanced mathematics, and theoretical physics.",
      image: "/api/placeholder/300/200",
      tags: ["Research", "Specialization"], 
      dateRange: "2018"
    }
  ];

  const visibleEvents = showMore ? timelineEvents : timelineEvents.slice(0, 3);

  return (
    <section id="timeline" className="relative min-h-screen py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary/10 rounded-full animate-pulse blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            On the way,
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            A look back on the past decade of my educational and personal growth journey
          </p>
        </div>

        {/* Timeline with Central Axis */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/80 to-primary"></div>

          <div className="space-y-12">
            {visibleEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Year Circle on Timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center text-primary-foreground font-bold text-sm z-10">
                  {event.year}
                </div>

                {/* Timeline Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                  <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {/* Card Image */}
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
                      <div className="text-4xl opacity-30">
                        {event.tags.includes('Education') ? '📚' : 
                         event.tags.includes('Achievement') ? '🏆' :
                         event.tags.includes('Technology') ? '💻' :
                         event.tags.includes('Research') ? '🔬' : '📅'}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{event.dateRange}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                        {event.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-secondary text-foreground text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group text-sm">
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show More Button */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-6 mb-8">
            <p className="text-muted-foreground mb-4 text-sm">
              Timeline section showing {showMore ? 'all' : '3'} cards. Click to {showMore ? 'show less' : 'see more milestones'}.
            </p>
            <button
              onClick={() => setShowMore(!showMore)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;