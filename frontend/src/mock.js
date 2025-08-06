// Mock data for Prabashwara's personal website
// This file contains all mock data that will later be replaced with actual backend data

export const mockData = {
  // Personal information
  personal: {
    name: "Rivibibu Prabashwara",
    title: "Mathematics Student",
    subtitle: "Exploring the cosmos through science, art, and imagination",
    email: "raynehalkmal.com",
    location: "Coordinates: -94.713",
    profileImage: "/api/placeholder/300/300",
    bio: "My name is Rivibibu Prabashwara, and I'm currently studying in an advanced level in science stream. I study advanced mathematics, physics, chemistry, programming, networking, and cryptography-like subjects."
  },

  // Navigation items
  navigation: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ],

  // Academic subjects and skills
  subjects: [
    "Mathematics (Pure & Applied)",
    "Physics", 
    "Chemistry",
    "Programming",
    "Networking",
    "Cryptography"
  ],

  // Skills with proficiency levels
  skills: [
    { name: 'Mathematics', level: 90, category: 'academic' },
    { name: 'Physics', level: 85, category: 'academic' },
    { name: 'Chemistry', level: 80, category: 'academic' },
    { name: 'Programming', level: 75, category: 'technical' },
    { name: 'Networking', level: 70, category: 'technical' },
    { name: 'Cryptography', level: 65, category: 'technical' }
  ],

  // Timeline events
  timeline: [
    {
      id: 1,
      title: "Started Advanced Level Studies",
      date: "2023",
      description: "Began studying mathematics, physics, and chemistry at advanced level.",
      type: "education",
      icon: "🎓"
    },
    {
      id: 2,
      title: "Discovered Programming",
      date: "2022", 
      description: "Started learning programming fundamentals and problem-solving techniques.",
      type: "skill",
      icon: "💡"
    },
    {
      id: 3,
      title: "Mathematics Competition",
      date: "2022",
      description: "Participated in regional mathematics competition, developing problem-solving skills.",
      type: "achievement",
      icon: "🏆"
    },
    {
      id: 4,
      title: "Science Stream Selection",
      date: "2021",
      description: "Chose science stream focusing on mathematics and physical sciences.",
      type: "education",
      icon: "🎓"
    },
    {
      id: 5,
      title: "First Programming Project",
      date: "2023",
      description: "Created first simple calculator application using Python.",
      type: "project", 
      icon: "🚀"
    },
    {
      id: 6,
      title: "Cryptography Interest",
      date: "2023",
      description: "Developed interest in cryptography and information security.",
      type: "skill",
      icon: "💡"
    }
  ],

  // Blog posts
  blogPosts: [
    {
      id: 1,
      title: "Understanding Complex Numbers in Mathematics",
      shortDescription: "Exploring the fascinating world of imaginary and complex numbers",
      content: "Complex numbers are fundamental to advanced mathematics...",
      image: "/api/placeholder/400/250",
      date: "2024-01-15",
      readTime: "5 min read",
      tags: ["Mathematics", "Complex Numbers", "Theory"],
      published: true
    },
    {
      id: 2,
      title: "Introduction to Cryptographic Algorithms", 
      shortDescription: "A beginner's guide to encryption and security protocols",
      content: "Cryptography is the science of secure communication...",
      image: "/api/placeholder/400/250", 
      date: "2024-01-10",
      readTime: "8 min read",
      tags: ["Cryptography", "Security", "Algorithms"],
      published: true
    },
    {
      id: 3,
      title: "Physics in Everyday Life",
      shortDescription: "How physical laws govern our daily experiences", 
      content: "Physics is everywhere around us...",
      image: "/api/placeholder/400/250",
      date: "2024-01-05",
      readTime: "6 min read",
      tags: ["Physics", "Applications", "Science"],
      published: true
    },
    {
      id: 4,
      title: "Programming Logic and Problem Solving",
      shortDescription: "Building strong foundations in computational thinking",
      content: "Problem solving is at the heart of programming...",
      image: "/api/placeholder/400/250",
      date: "2023-12-28", 
      readTime: "7 min read",
      tags: ["Programming", "Logic", "Problem Solving"],
      published: true
    }
  ],

  // Projects (planned and future)
  projects: [
    {
      id: 1,
      title: "Mathematical Modeling Project",
      description: "Exploring complex mathematical models and their real-world applications",
      date: "Coming Soon",
      status: "planned",
      technologies: ["Mathematics", "Python", "Data Analysis"],
      image: "/api/placeholder/400/300",
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      id: 2,
      title: "Cryptography Research",
      description: "Study of encryption algorithms and secure communication protocols", 
      date: "In Progress",
      status: "development",
      technologies: ["Cryptography", "Security", "Algorithms"],
      image: "/api/placeholder/400/300",
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      id: 3,
      title: "Physics Simulation",
      description: "Interactive simulations of physical phenomena and laws",
      date: "Planning Phase", 
      status: "planned",
      technologies: ["Physics", "Simulation", "Programming"],
      image: "/api/placeholder/400/300",
      githubUrl: "#",
      liveUrl: "#"
    }
  ],

  // Contact information
  contact: {
    email: "raynehalkmal.com",
    socialHandle: "@prayaslakmal",
    location: "Coordinates: -94.713",
    responseTime: "Usually within 24 hours"
  },

  // Website configuration
  siteConfig: {
    title: "Prabashwara - Mathematics Student",
    description: "Personal website of Rivibibu Prabashwara, exploring mathematics, science, and technology",
    keywords: ["mathematics", "physics", "chemistry", "programming", "cryptography", "student"],
    author: "Rivibibu Prabashwara",
    siteUrl: "https://prabashwara.dev"
  },

  // Theme settings
  themeConfig: {
    defaultTheme: "dark",
    primaryColor: "#8b5cf6", // Purple
    supportedThemes: ["light", "dark"]
  }
};

export default mockData;