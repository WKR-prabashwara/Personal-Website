import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Preloader from "./components/Preloader";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import TimelineSection from "./components/TimelineSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import AdminApp from "./components/AdminApp";
import analyticsService from "./services/analyticsService";

// Analytics tracking wrapper component
const AnalyticsWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    analyticsService.trackPageView(location.pathname, document.title);
  }, [location]);

  return children;
};

// Main Portfolio Component
const Portfolio = () => {
  const [loading, setLoading] = useState(false); // Enable preloader

  const handlePreloaderComplete = () => {
    setLoading(false);
    // Track initial page load completion
    analyticsService.trackEvent('Performance', 'preloader_complete', 'initial_load');
  };

  return (
    <div className="App">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      {!loading && (
        <>
          <Navigation />
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <TimelineSection />
          <BlogSection />
          <ContactSection />
          <Footer />
          <MusicPlayer />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AnalyticsWrapper>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin" element={<AdminApp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnalyticsWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
