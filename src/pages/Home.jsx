import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { useMagneticHover } from '../hooks/useMagneticHover';
import './Home.css';

const roles = ['SOFTWARE ENGINEER', 'MACHINE LEARNING ENGINEER'];

const Home = () => {
  const [isMobile] = useState(() => window.matchMedia("(max-width: 768px)").matches);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState(roles[0]);
  
  // Magnetic button refs
  const btn1Ref = useMagneticHover(0.2);
  const btn2Ref = useMagneticHover(0.2);

  // Typing effect — disabled on mobile to prevent layout reflow heartbeat
  useEffect(() => {
    if (isMobile) return; // Static text on mobile

    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, isMobile]);

  return (
    <section id="home" className="home-section">
      <div className="home-content fade-in-up">
        <p className="greeting text-mono text-accent">HELLO WORLD, I'M</p>
        
        <h1 className="name-title glowing-text">
          <span className="first-name">KUSHAN</span><br />
          <span className="last-name" data-text="SHAH">SHAH</span>
        </h1>
        
        <div className="role-container fade-in-up delay-1">
          <h2 className="role-text text-mono typing-text">
            {displayText}<span className="typing-cursor">|</span>
          </h2>
        </div>
        
        <p className="description text-muted fade-in-up delay-2">
          I am a B.Tech Computer Science student specializing in building predictive models, optimizing data pipelines, and exploring the frontiers of artificial intelligence.
        </p>
        
        <div className="cta-container fade-in-up delay-3">
          <a href="#projects" ref={btn1Ref} className="btn-primary custom-btn magnetic-btn">
            VIEW WORK
          </a>
          <a href="#contact" ref={btn2Ref} className="btn-secondary custom-btn magnetic-btn">
            CONTACT ME
          </a>
        </div>
      </div>

      <div className="scroll-indicator fade-in-up delay-4">
        <span className="text-mono">SCROLL</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Home;
