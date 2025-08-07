import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Preloader from "./components/Preloader";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import TimelineSection from "./components/TimelineSection";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import SEOHead from "./components/SEOHead";
import analyticsService from "./services/analyticsService";

// Lazy load heavy components
const BlogSection = lazy(() => import("./components/BlogSection"));
const ContactSection = lazy(() => import("./components/ContactSection"));
const AdminApp = lazy(() => import("./components/AdminApp"));

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen bg-black flex items-center justify-center px-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
      <p className="text-gray-300 mb-6">We apologize for the inconvenience. Please try refreshing the page.</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
        aria-label="Retry loading the application"
      >
        Try again
      </button>
    </div>
  </div>
);

// Loading Component with better performance
const LoadingSpinner = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
      <p className="text-white">Loading...</p>
    </div>
  </div>
);

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
  const [loading, setLoading] = useState(false); // Disabled preloader for better performance

  const handlePreloaderComplete = () => {
    setLoading(false);
    // Track initial page load completion
    analyticsService.trackEvent('Performance', 'preloader_complete', 'initial_load');
  };

  return (
    <div className="App">
      <SEOHead />
      
      {/* Skip to main content for accessibility */}
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded z-50"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      {!loading && (
        <>
          <Navigation />
          <main id="main">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <TimelineSection />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingSpinner />}>
                <BlogSection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingSpinner />}>
                <ContactSection />
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
          <MusicPlayer />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AnalyticsWrapper>
              <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route 
                  path="/admin" 
                  element={
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <Suspense fallback={<LoadingSpinner />}>
                        <AdminApp />
                      </Suspense>
                    </ErrorBoundary>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnalyticsWrapper>
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;