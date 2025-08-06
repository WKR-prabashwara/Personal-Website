import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

// Main Portfolio Component
const Portfolio = () => {
  const [loading, setLoading] = useState(false); // Enable preloader

  const handlePreloaderComplete = () => {
    setLoading(false);
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
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<AdminApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;