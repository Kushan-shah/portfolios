import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './components/About';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Training from './components/Training';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import './App.css';

function App() {
  const cursorRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const progressRef = useRef(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = cursorTrailRef.current;
    const progress = progressRef.current;
    if (!cursor || !trail) return;

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
    };

    const animateTrail = () => {
      if (window.matchMedia("(max-width: 768px)").matches) return; // Disable on mobile
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;
      trail.style.transform = `translate(${trailX - 200}px, ${trailY - 200}px)`;
      requestAnimationFrame(animateTrail);
    };

    // Scroll progress bar
    const handleScroll = () => {
      if (progress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = `${scrollPercent}%`;
      }
      setShowTopBtn(window.scrollY > 600);
    };

    // Hover expansion for interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, .nav-btn, .carousel-card, .dot, .verify-btn, .project-card, .marquee-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animateTrail();
    setTimeout(addHoverListeners, 1500);

    // --- Scroll-Driven Reveal ---
    const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
    setTimeout(() => {
      document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => revealObserver.observe(el));
    }, 800);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      // Calculate mouse position as percentages
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <div className="app-container">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-track">
        <div className="scroll-progress-fill" ref={progressRef}></div>
      </div>

      {/* Custom Cursor */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="cursor-glow-trail" ref={cursorTrailRef}></div>

      <ParticleBackground />
      <Navbar />
      <main className="content-wrapper">
        <Home />
        <div className="section-divider"><div className="divider-line"></div><span className="divider-label text-mono">00</span><div className="divider-line"></div></div>
        <About />
        <Stats />
        <div className="section-divider"><div className="divider-line"></div><span className="divider-label text-mono">01</span><div className="divider-line"></div></div>
        <Skills />
        <div className="section-divider"><div className="divider-line"></div><span className="divider-label text-mono">02</span><div className="divider-line"></div></div>
        <Projects />
        <div className="section-divider"><div className="divider-line"></div><span className="divider-label text-mono">03</span><div className="divider-line"></div></div>
        <Training />
        <div className="section-divider"><div className="divider-line"></div><span className="divider-label text-mono">04</span><div className="divider-line"></div></div>
        <Education />
        <div className="section-divider"><div className="divider-line"></div><span className="divider-label text-mono">05</span><div className="divider-line"></div></div>
        <Certifications />
        <div className="section-divider"><div className="divider-line"></div><span className="divider-label text-mono">06</span><div className="divider-line"></div></div>
        <Achievements />
        <div className="section-divider"><div className="divider-line"></div><span className="divider-label text-mono">07</span><div className="divider-line"></div></div>
        <Contact />
      </main>

      {/* Floating Back-to-Top */}
      {showTopBtn && (
        <button 
          className="back-to-top text-mono"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

export default App;
