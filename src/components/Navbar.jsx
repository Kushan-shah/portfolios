import React, { useState, useEffect } from 'react';
import { Target, Rocket, Mail, Github, BookOpen, Award, Briefcase, FileDown, User } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { href: '#about', icon: User, label: 'ABOUT' },
  { href: '#skills', icon: Target, label: 'SKILLS' },
  { href: '#projects', icon: Rocket, label: 'PROJECTS' },
  { href: '#training', icon: Briefcase, label: 'TRAINING' },
  { href: '#education', icon: BookOpen, label: 'EDUCATION' },
  { href: '#certifications', icon: Award, label: 'CERTS' },
  { href: '#contact', icon: Mail, label: 'CONTACT' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'training', 'education', 'certifications', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <a href="#home" className="nav-logo">
          <span className="logo-letter">K</span>
          <span className="logo-dot"></span>
        </a>
        
        <ul className="nav-links">
          {navItems.map(({ href, icon: Icon, label }) => (
            <li key={label}>
              <a href={href} className={activeSection === href.slice(1) ? 'active' : ''}>
                <Icon size={14} className="nav-icon" />
                {label}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="nav-divider"></div>

        <div className="nav-socials">
          <a href="/images/CV.pdf" download="Kushan_Shah_CV.pdf" className="nav-cv-btn" aria-label="Download CV">
            <FileDown size={14} />
            <span>CV</span>
          </a>
          <a href="https://github.com/Kushan-shah" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
