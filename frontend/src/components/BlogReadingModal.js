import React, { useEffect } from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';

const BlogReadingModal = ({ post, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card/90 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium">Rivibibu Prabashwara</p>
              <p className="text-muted-foreground text-sm">Mathematics Student</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-10 h-10 bg-secondary hover:bg-secondary/80 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
            <div className="text-6xl opacity-30">📝</div>
          </div>

          <div className="p-8">
            {/* Article Meta */}
            <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary text-foreground text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {post.shortDescription}
              </p>

              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <h2 className="text-2xl font-semibold text-foreground mb-4">Key Concepts</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Understanding fundamental principles</li>
                <li>Practical applications and examples</li>
                <li>Advanced techniques and methods</li>
                <li>Real-world problem solving</li>
              </ul>

              <h2 className="text-2xl font-semibold text-foreground mb-4">Mathematical Foundations</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>

              <div className="bg-secondary/50 border border-border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Key Formula</h3>
                <p className="text-muted-foreground text-center font-mono">
                  E = mc²
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-foreground mb-4">Conclusion</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
              </p>
            </div>

            {/* Article Footer */}
            <div className="border-t border-border pt-6 mt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    RP
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Rivibibu Prabashwara</p>
                    <p className="text-muted-foreground text-sm">Mathematics Student & Researcher</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">Published on</p>
                  <p className="text-foreground">{post.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogReadingModal;