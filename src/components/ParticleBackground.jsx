import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouse = { x: -1000, y: -1000 };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Stars ---
    const starCount = 180;
    const stars = [];

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.2;
        this.baseOpacity = Math.random() * 0.6 + 0.15;
        this.opacity = this.baseOpacity;
        this.speed = Math.random() * 0.15 + 0.02;
        // Twinkle
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }
      
      update(time) {
        // Slow upward drift
        this.y -= this.speed;
        if (this.y < -5) {
          this.y = canvas.height + 5;
          this.x = Math.random() * canvas.width;
        }

        // Twinkle
        this.opacity = this.baseOpacity + Math.sin(time * this.twinkleSpeed + this.twinklePhase) * 0.25;
        this.opacity = Math.max(0.05, Math.min(0.9, this.opacity));

        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 3;
          this.y += (dy / dist) * force * 3;
        }
      }
      
      draw() {
        // Glow
        ctx.shadowBlur = this.size * 6;
        ctx.shadowColor = `rgba(94, 235, 216, ${this.opacity * 0.4})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // --- Shooting Stars ---
    const shootingStars = [];

    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width * 1.5;
        this.y = -10;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 8 + 4;
        this.opacity = 1;
        this.angle = (Math.PI / 4) + (Math.random() * 0.3 - 0.15); // ~45 degrees
        this.active = false;
        this.trail = [];
      }

      activate() {
        this.reset();
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.active = true;
      }

      update() {
        if (!this.active) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.008;

        if (this.opacity <= 0 || this.y > canvas.height || this.x > canvas.width) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(94, 235, 216, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    }

    for (let i = 0; i < 3; i++) {
      shootingStars.push(new ShootingStar());
    }

    // Trigger shooting stars at random intervals
    const triggerShootingStar = () => {
      if (window.matchMedia("(max-width: 768px)").matches) return; // Disable on mobile
      const inactive = shootingStars.find(s => !s.active);
      if (inactive) inactive.activate();
      setTimeout(triggerShootingStar, Math.random() * 4000 + 2000);
    };
    triggerShootingStar();

    // --- Constellation Lines ---
    const drawConstellations = () => {
      const connectionDistance = 100;
      ctx.lineWidth = 0.3;

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(94, 235, 216, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // --- Animate ---
    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      // Draw constellation lines first (behind stars)
      drawConstellations();
      
      // Stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].update(time);
        stars[i].draw();
      }

      // Shooting stars
      for (let i = 0; i < shootingStars.length; i++) {
        shootingStars[i].update();
        shootingStars[i].draw();
      }
      
      if (!window.matchMedia("(max-width: 768px)").matches) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground;
