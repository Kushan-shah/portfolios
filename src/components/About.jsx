import React, { useState, useRef } from 'react';
import { MapPin, GraduationCap, Sparkles, Code2, Download, Terminal, Brain, Layers, Coffee } from 'lucide-react';
import './About.css';

const About = () => {
  const imageRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Mouse-tracking tilt effect for image
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const techIcons = [
    { label: 'React', color: '#61dafb' },
    { label: 'Python', color: '#3776ab' },
    { label: 'Java', color: '#f89820' },
    { label: 'Node', color: '#68a063' },
    { label: 'AWS', color: '#ff9900' },
    { label: 'ML', color: '#a252ff' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <p className="section-subtitle text-mono scroll-reveal">(. ABOUT ME )</p>

        <div className="about-content scroll-reveal">
          {/* Left: Profile Image with effects */}
          <div className="about-visual">
            <div
              className="about-image-wrapper"
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* Decorative grid behind image */}
              <div className="image-grid-bg"></div>

              <div className="about-image-ring">
                <img
                  src="/images/profile.jpg"
                  alt="Kushan Shah"
                  className="about-image"
                />
              </div>

              {/* Glow effect */}
              <div className="about-image-glow"></div>
            </div>

            {/* Floating tech badges */}
            <div className="floating-badge badge-1"><Code2 size={16} /></div>
            <div className="floating-badge badge-2"><Brain size={16} /></div>
            <div className="floating-badge badge-3"><Terminal size={16} /></div>
            <div className="floating-badge badge-4"><Layers size={16} /></div>
          </div>

          {/* Right: Text content */}
          <div className="about-text">
            <h2 className="about-title">
              Passionate about building<br />
              <span className="text-gradient">intelligent solutions</span>
            </h2>

            <div className="about-paragraphs">
              <p className="about-description">
                I'm <strong>Kushan Shah</strong>, a B.Tech Computer Science student at Lovely Professional University with a deep passion for crafting elegant software and intelligent systems that solve real-world problems.
              </p>

              <p className="about-description">
                My expertise spans across full-stack development, machine learning, and cloud deployment. I love transforming complex ideas into clean, scalable code — from building RESTful APIs with Spring Boot to training neural networks with TensorFlow.
              </p>

              <p className="about-description">
                <Coffee size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px', color: 'var(--accent)' }} />
                When I'm not coding, you'll find me solving DSA problems on LeetCode or exploring the latest in AI research.
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="tech-stack-section">
              <span className="tech-section-label text-mono">TECH I WORK WITH</span>
              <div className="tech-pills">
                {techIcons.map((tech, i) => (
                  <span key={i} className="tech-pill" style={{ '--pill-color': tech.color }}>
                    <span className="pill-dot" style={{ background: tech.color }}></span>
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlight cards */}
            <div className="about-highlights">
              <div className="highlight-card">
                <div className="highlight-icon"><MapPin size={18} /></div>
                <div>
                  <span className="highlight-label text-mono">BASED IN</span>
                  <span className="highlight-value">Phagwara, Punjab</span>
                </div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon"><GraduationCap size={18} /></div>
                <div>
                  <span className="highlight-label text-mono">STUDYING</span>
                  <span className="highlight-value">B.Tech CSE @ LPU</span>
                </div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon"><Sparkles size={18} /></div>
                <div>
                  <span className="highlight-label text-mono">FOCUS</span>
                  <span className="highlight-value">Full-Stack & ML</span>
                </div>
              </div>
            </div>

            {/* Download CV Button */}
            <a href="/images/CV.pdf" download="Kushan_Shah_CV.pdf" className="about-cv-btn">
              <Download size={16} />
              <span className="text-mono">DOWNLOAD RESUME</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
