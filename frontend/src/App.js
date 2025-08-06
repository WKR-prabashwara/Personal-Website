import React, { useState, useEffect } from "react";
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

function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <ThemeProvider>
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
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;