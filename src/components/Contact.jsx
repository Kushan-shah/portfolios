import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, ArrowUpRight, Code, Github, Send, CheckCircle, User, AtSign, FileText, MessageSquare } from 'lucide-react';
import './Contact.css';

// ====================================================================
// 🔧 EMAILJS CONFIGURATION — Replace these with your actual values
// Follow the setup guide below to get these credentials:
//
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Go to "Email Services" → Add Service → Choose "Gmail"
//    - Connect your Google account → Copy the SERVICE ID
// 3. Go to "Email Templates" → Create New Template
//    - Set From Name: {{from_name}}
//    - Set Subject: {{subject}}
//    - Set Content/Body: 
//        Name: {{from_name}}
//        Email: {{reply_to}}
//        Subject: {{subject}}
//        Message: {{message}}
//    - Copy the TEMPLATE ID
// 4. Go to "Account" → Copy your PUBLIC KEY
// ====================================================================
const EMAILJS_SERVICE_ID = 'service_uchfxo6';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_4ryxtqk'; // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY = '5Qw_wdtPMUFat07Wh';    // e.g. 'aBcDeFgHiJkLmN'

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focused, setFocused] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field) => {
    if (!formData[field]) setFocused({ ...focused, [field]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    // EmailJS template params — these map to {{variable}} in your template
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSending(false);
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFocused({});
      })
      .catch((err) => {
        setSending(false);
        setError('Failed to send. Please try again or email me directly.');
        console.error('EmailJS Error:', err);
        setTimeout(() => setError(''), 5000);
      });
  };

  const isActive = (field) => focused[field] || formData[field];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <p className="section-subtitle text-mono scroll-reveal">(. CONTACT )</p>

        {/* Hero Row: Title left, Form right */}
        <div className="contact-hero scroll-reveal">
          <div className="contact-hero-left">
            <h2 className="contact-title">
              Let's Build<br />
              <span className="text-muted">Something Cool</span><br />
              Together.
            </h2>
            <p className="contact-description">
              Have a project in mind or just want to say hello? Drop me a message and I'll get back to you as soon as possible.
            </p>
            <div className="contact-cta-row">
              <div className="availability">
                <span className="status-dot"></span>
                <span className="text-mono">Open to opportunities</span>
              </div>
            </div>
          </div>

          <div className="contact-hero-right">
            <div className={`contact-form-container ${sending ? 'form-sending' : ''} ${sent ? 'form-sent' : ''}`}>
              {/* Animated corner accents */}
              <div className="form-corner form-corner-tl"></div>
              <div className="form-corner form-corner-tr"></div>
              <div className="form-corner form-corner-bl"></div>
              <div className="form-corner form-corner-br"></div>

              <h3 className="form-heading">
                <Send size={22} className="form-heading-icon" />
                Get in Touch
              </h3>
              <p className="form-subtext text-mono">Fill in the details and I'll respond promptly</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className={`form-group ${isActive('name') ? 'active' : ''}`}>
                    <span className="field-icon"><User size={16} /></span>
                    <input
                      type="text" name="name" required className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                    />
                    <label className="floating-label">Your Name</label>
                    <span className="focus-bar"></span>
                  </div>
                  <div className={`form-group ${isActive('email') ? 'active' : ''}`}>
                    <span className="field-icon"><AtSign size={16} /></span>
                    <input
                      type="email" name="email" required className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                    />
                    <label className="floating-label">Your Email</label>
                    <span className="focus-bar"></span>
                  </div>
                </div>

                <div className={`form-group ${isActive('subject') ? 'active' : ''}`}>
                  <span className="field-icon"><FileText size={16} /></span>
                  <input
                    type="text" name="subject" required className="form-input"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={() => handleBlur('subject')}
                  />
                  <label className="floating-label">Subject</label>
                  <span className="focus-bar"></span>
                </div>

                <div className={`form-group textarea-group ${isActive('message') ? 'active' : ''}`}>
                  <span className="field-icon textarea-icon"><MessageSquare size={16} /></span>
                  <textarea
                    name="message" rows="5" required className="form-input"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                  ></textarea>
                  <label className="floating-label">Your Message</label>
                  <span className="focus-bar"></span>
                  <span className="char-count text-mono">{formData.message.length}/500</span>
                </div>

                <button type="submit" className={`submit-btn text-mono ${sending ? 'btn-sending' : ''} ${sent ? 'btn-sent' : ''}`} disabled={sending}>
                  {sent ? (
                    <><CheckCircle size={18} /> MESSAGE SENT</>
                  ) : sending ? (
                    <><span className="btn-spinner"></span> SENDING...</>
                  ) : (
                    <><Send size={16} /> SEND MESSAGE</>
                  )}
                </button>
                {error && <p className="form-error text-mono">{error}</p>}
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="contact-divider"></div>

        {/* Contact Info Grid below */}
        <div className="contact-grid scroll-reveal">
          <div className="contact-column">
            <h4 className="column-title text-mono">CONNECT</h4>
            <ul className="contact-links">
              <li>
                <a href="mailto:kushanshah169@gmail.com">
                  <Mail size={16} /> kushanshah169@gmail.com
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/kushan-shah-X" target="_blank" rel="noreferrer">
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} className="arrow-icon" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Kushan-shah" target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub <ArrowUpRight size={14} className="arrow-icon" />
                </a>
              </li>
            </ul>
          </div>

          <div className="contact-column">
            <h4 className="column-title text-mono">CODING PLATFORMS</h4>
            <ul className="contact-links">
              <li>
                <a href="https://leetcode.com/u/Z8Adx1KT2T/" target="_blank" rel="noreferrer">
                  <Code size={16} /> LeetCode <ArrowUpRight size={14} className="arrow-icon" />
                </a>
              </li>
              <li>
                <a href="https://www.geeksforgeeks.org/profile/businesk21j?tab=activity" target="_blank" rel="noreferrer">
                  <Code size={16} /> GeeksforGeeks <ArrowUpRight size={14} className="arrow-icon" />
                </a>
              </li>
            </ul>
          </div>

          <div className="contact-column">
            <h4 className="column-title text-mono">LOCATION & PHONE</h4>
            <div className="location-info">
              <p>Phagwara, Punjab</p>
              <p className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Mob: +91-8360831496
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
