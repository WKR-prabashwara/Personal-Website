import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Search, BookOpen, Star, Bookmark, TrendingUp, Clock } from 'lucide-react';
import BlogReadingModal from './BlogReadingModal';

const BlogSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredSlide, setFeaturedSlide] = useState(0);

  // Mock blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Complex Numbers in Mathematics",
      shortDescription: "Exploring the fascinating world of imaginary and complex numbers and their applications in advanced mathematics and physics.",
      image: "/api/placeholder/400/250",
      date: "2024-01-15",
      readTime: "5 min read",
      tags: ["Mathematics", "Complex Numbers", "Theory"],
      featured: true,
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: "Introduction to Cryptographic Algorithms", 
      shortDescription: "A comprehensive beginner's guide to encryption, security protocols, and the mathematics behind modern cryptography.",
      image: "/api/placeholder/400/250", 
      date: "2024-01-10",
      readTime: "8 min read",
      tags: ["Cryptography", "Security", "Algorithms"],
      featured: true,
      views: 987,
      likes: 67
    },
    {
      id: 3,
      title: "Physics in Everyday Life",
      shortDescription: "Discover how fundamental physical laws and principles govern our daily experiences and interactions with the world.", 
      image: "/api/placeholder/400/250",
      date: "2024-01-05",
      readTime: "6 min read",
      tags: ["Physics", "Applications", "Science"],
      featured: false,
      views: 756,
      likes: 45
    },
    {
      id: 4,
      title: "Programming Logic and Problem Solving",
      shortDescription: "Building strong foundations in computational thinking, algorithm design, and systematic problem-solving approaches.",
      image: "/api/placeholder/400/250",
      date: "2023-12-28", 
      readTime: "7 min read",
      tags: ["Programming", "Logic", "Problem Solving"],
      featured: false,
      views: 634,
      likes: 52
    },
    {
      id: 5,
      title: "Advanced Mathematical Modeling",
      shortDescription: "Exploring sophisticated mathematical models used in physics, engineering, and real-world problem solving.",
      image: "/api/placeholder/400/250",
      date: "2023-12-20", 
      readTime: "9 min read",
      tags: ["Mathematics", "Modeling", "Applications"],
      featured: false,
      views: 543,
      likes: 38
    },
    {
      id: 6,
      title: "Network Theory and Graph Mathematics",
      shortDescription: "Understanding the mathematical foundations of network theory and its applications in computer science.",
      image: "/api/placeholder/400/250",
      date: "2023-12-15", 
      readTime: "6 min read",
      tags: ["Networking", "Graph Theory", "Mathematics"],
      featured: false,
      views: 421,
      likes: 29
    }
  ];

  // Featured posts for swiping section
  const featuredPosts = blogPosts.filter(post => post.featured);

  // Auto-swipe featured posts
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 4000); // Auto swipe every 4 seconds

    return () => clearInterval(interval);
  }, [featuredPosts.length]);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const postsPerSlide = 3;
  const totalSlides = Math.ceil(filteredPosts.length / postsPerSlide);

  const handleSlideChange = (direction) => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    } else {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing to my blog updates!');
      setEmail('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentSlide(0);
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const getCurrentPosts = () => {
    const startIndex = currentSlide * postsPerSlide;
    return filteredPosts.slice(startIndex, startIndex + postsPerSlide);
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    setCurrentSlide(0);
  };

  return (
    <section id="blog" className="relative min-h-screen py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary/8 rounded-full animate-pulse blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 7}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mb-8 py-2 px-4 border border-purple-500/50 rounded-full backdrop-blur-sm bg-black/20 inline-block">
            <span className="text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              <BookOpen className="inline w-4 h-4 mr-2" />
              Mathematics Student Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Read a Lot,
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Dive into my blog for insights, stories, and ideas. From in-depth articles to quick reads, 
            explore a range of topics and stay informed on what interests you.
          </p>
        </div>

        {/* Featured Posts Swiping Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              Featured Posts
            </h3>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Auto-swiping every 4s</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-border">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${featuredSlide * 100}%)` }}
            >
              {featuredPosts.map((post, index) => (
                <div key={post.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-8 p-8 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Bookmark className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">Featured Article</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {post.shortDescription}
                      </p>

                      <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {post.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {post.likes} likes
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag, tagIndex) => (
                          <button
                            key={tagIndex}
                            onClick={() => handleTagClick(tag)}
                            className="px-3 py-1 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary text-sm rounded-full transition-all cursor-pointer"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => handleReadMore(post)}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl flex items-center justify-center relative overflow-hidden group">
                      <BookOpen className="w-12 h-12 text-primary/40" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Posts Indicators */}
            <div className="flex justify-center gap-2 pb-6">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setFeaturedSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === featuredSlide ? 'bg-primary scale-125' : 'bg-border hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Blog Search */}
        <div className="mb-12">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blog posts..."
                className="w-full pl-12 pr-20 py-3 bg-card border-2 border-border rounded-full focus:outline-none focus:ring-0 focus:border-primary text-foreground placeholder-muted-foreground transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full hover:bg-primary/90 transition-all text-sm"
              >
                Search
              </button>
            </form>
          </div>
          
          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-center mt-4">
              <p className="text-muted-foreground">
                {filteredPosts.length === 0 
                  ? `No results found for "${searchQuery}"` 
                  : `Found ${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'} for "${searchQuery}"`
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-primary hover:text-primary/80 transition-colors text-sm ml-2"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* All Blog Posts Carousel */}
        {filteredPosts.length > 0 ? (
          <div className="relative mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">All Articles</h3>
            </div>

            <div className="overflow-hidden rounded-2xl">
              <div className="grid md:grid-cols-3 gap-8">
                {getCurrentPosts().map((post) => (
                  <div
                    key={post.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center relative overflow-hidden">
                      <BookOpen className="w-8 h-8 text-primary/40" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-white">
                          <ArrowRight className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.shortDescription}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => handleTagClick(tag)}
                            className="px-2 py-1 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs rounded-full transition-all cursor-pointer"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => handleReadMore(post)}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group/btn w-full justify-between"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            {totalSlides > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => handleSlideChange('prev')}
                  className="p-3 bg-card border border-border rounded-full hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => handleSlideChange('next')}
                  className="p-3 bg-card border border-border rounded-full hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No blog posts match your search criteria.</p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div id="newsletter-section" className="bg-card border border-border rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Get news about blog posts,
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay up to date with my latest articles and insights. Get notified when I publish new content 
            about mathematics, science, programming, and technology.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:ring-0 focus:border-primary text-foreground placeholder-muted-foreground transition-all"
              required
            />
            <button
              type="submit"
              className="bg-foreground text-background px-8 py-3 rounded-lg hover:bg-foreground/90 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Blog Reading Modal */}
      <BlogReadingModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default BlogSection;