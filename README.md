# Mathematics Student Portfolio

A modern, interactive portfolio website for Rivibibu Prabashwara, showcasing academic achievements, projects, and research in mathematics, physics, and computer science.

![Portfolio Preview](https://via.placeholder.com/800x400/9333EA/FFFFFF?text=Mathematics+Student+Portfolio)

## 🌟 Features

### 🎨 Modern UI/UX
- **Cosmic Theme**: Black hole animation with space-inspired visuals
- **Dock-Style Navigation**: macOS-inspired navigation with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Sleek dark theme with purple/cyan gradient accents

### 🎵 Interactive Audio
- **Ambient Background Music**: Auto-playing space-themed audio
- **Visual Audio Controls**: Animated wave bars and mute/unmute functionality
- **Smart Playback**: Handles browser autoplay restrictions gracefully

### 📊 Analytics Dashboard
- **Visitor Tracking**: Real-time visitor statistics and behavior analysis
- **Location Data**: Geographic visitor distribution
- **Dev Tools Detection**: Security monitoring with admin notifications
- **WebSocket Integration**: Real-time data updates

### 📱 Responsive Navigation
- **Desktop**: Full dock with icons and labels integrated in header
- **Mobile**: Compact icon-only dock for optimal mobile experience
- **Active States**: Visual feedback for current section
- **Smooth Scrolling**: Enhanced navigation experience with GSAP animations

### 📝 Content Sections
- **About**: Personal introduction and academic background
- **Experience**: Skills visualization with progress bars
- **Projects**: Showcase of academic and research projects
- **Blog**: Articles and insights on mathematics and technology
- **Contact**: Interactive contact form and social media links

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable SVG icons
- **GSAP**: Advanced animations for enhanced user experience

### Backend
- **FastAPI**: High-performance Python web framework
- **MongoDB**: NoSQL database for flexible data storage
- **WebSocket**: Real-time communication for analytics
- **Python**: Backend logic and API endpoints

### Development Tools
- **Yarn**: Package management
- **Supervisor**: Process management for development
- **Hot Reload**: Development server with live reloading

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v4.4 or higher)
- **Yarn** package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/mathematics-portfolio.git
cd mathematics-portfolio
```

2. **Install Frontend Dependencies**
```bash
cd frontend
yarn install
```

3. **Install Backend Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

4. **Environment Setup**
```bash
# Frontend (.env)
REACT_APP_BACKEND_URL=http://localhost:8001

# Backend (.env)
MONGO_URL=mongodb://localhost:27017/portfolio
```

5. **Start Development Servers**
```bash
# Start all services
sudo supervisorctl start all

# Or start individually
sudo supervisorctl start frontend
sudo supervisorctl start backend
```

6. **Access the Application**
- **Portfolio**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## 📁 Project Structure

```
mathematics-portfolio/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navigation.js
│   │   │   ├── HeroSection.js
│   │   │   ├── AboutSection.js
│   │   │   ├── ExperienceSection.js
│   │   │   ├── ProjectsSection.js
│   │   │   ├── BlogSection.js
│   │   │   ├── ContactSection.js
│   │   │   ├── MusicPlayer.js
│   │   │   └── Preloader.js
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API and analytics services
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main application component
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
├── backend/                 # FastAPI backend
│   ├── server.py           # Main FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Backend environment variables
├── tests/                  # Test files
├── scripts/               # Utility scripts
└── README.md              # Project documentation
```

## 🎨 Design Features

### Color Palette
- **Primary**: Purple to Cyan gradient (`#9333EA` to `#06B6D4`)
- **Background**: Deep black (`#000000`)
- **Text**: White and gray variations
- **Accents**: Purple borders and glows

### Typography
- **Headings**: Bold, modern sans-serif
- **Body**: Clean, readable typography
- **Code**: Monospace for technical content

### Animations
- **Page Load**: 5-second preloader with progress indication
- **Navigation**: Smooth section transitions with GSAP
- **Interactive Elements**: Hover effects and micro-interactions
- **Background**: Cosmic particles and space-themed animations

## 🔧 Configuration

### Audio Settings
```javascript
// MusicPlayer.js
audio.volume = 0.3;  // 30% volume
// Auto-play with fallback for browser restrictions
```

### Animation Timing
```javascript
// Preloader.js
const totalDuration = 5000; // 5 seconds
```

### Navigation Sections
```javascript
// Navigation.js
const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail }
];
```

## 📈 Analytics Features

### Visitor Tracking
- Page views and session duration
- Geographic location data
- Device and browser information
- Most visited sections

### Security Monitoring
- Developer tools detection
- Real-time admin notifications
- Suspicious activity logging

### Performance Metrics
- Page load times
- User interaction patterns
- Content engagement analytics

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add some amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

## 📝 Recent Updates

### Version 2.0 - UI/UX Overhaul
- ✅ **Dock-Style Navigation**: Integrated smaller dock in header
- ✅ **Audio System**: Fixed autoplay with interactive controls
- ✅ **Text Visibility**: Optimized for black hole animation
- ✅ **Section Icons**: Added themed icons to portfolio badges
- ✅ **Background Consistency**: Unified black backgrounds across sections
- ✅ **Mobile Optimization**: Icon-only navigation for mobile devices

### Version 1.0 - Initial Release
- 🎯 **Analytics Dashboard**: Comprehensive visitor tracking
- 🎨 **GSAP Animations**: Enhanced user interactions
- 🔄 **Preloader**: Animated loading experience
- 📱 **Responsive Design**: Mobile-first approach

## 🐛 Known Issues

- Audio autoplay may be blocked by some browsers (fallback available)
- Admin dashboard requires manual navigation to `/admin`
- Mobile navigation shows icons only (by design)

## 🔮 Roadmap

- [ ] **Project Galleries**: Image carousels for project showcases
- [ ] **Blog CMS**: Content management system for blog posts
- [ ] **Contact Form Backend**: Email integration for contact form
- [ ] **SEO Optimization**: Meta tags and structured data
- [ ] **Performance**: Code splitting and lazy loading
- [ ] **Accessibility**: WCAG compliance improvements

## 📧 Contact

**Rivibibu Prabashwara**
- Portfolio: [https://your-portfolio.com](https://your-portfolio.com)
- Email: support@mail.com
- GitHub: [@your-username](https://github.com/your-username)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for mathematics, science, and technology**

*Exploring the cosmos through science, mathematics, and imagination*
