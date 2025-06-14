
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'neural' | 'data' | 'energy';
  phase: number;
}

const AdvancedParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number, type: Particle['type'] = 'energy'): Particle => {
      const colors = {
        neural: '#00D4FF',
        data: '#8B5CF6', 
        energy: '#EC4899'
      };

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        life: 300,
        maxLife: 300,
        color: colors[type],
        type,
        phase: Math.random() * Math.PI * 2
      };
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 60; i++) {
        const types: Particle['type'][] = ['neural', 'data', 'energy'];
        const type = types[Math.floor(Math.random() * types.length)];
        particlesRef.current.push(
          createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            type
          )
        );
      }
    };

    const updateParticles = () => {
      const time = Date.now() * 0.001;
      
      particlesRef.current.forEach((particle, index) => {
        // Smooth orbital movement
        particle.phase += 0.01;
        particle.vx += Math.sin(time + particle.phase) * 0.002;
        particle.vy += Math.cos(time + particle.phase) * 0.002;
        
        // Apply velocity with damping for smoother movement
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Gentle mouse attraction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.0005;
          particle.vx += dx * force;
          particle.vy += dy * force;
        }

        // Smooth boundary wrapping
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;

        // Smooth life cycle
        particle.life -= 0.2;
        if (particle.life <= 0) {
          const types: Particle['type'][] = ['neural', 'data', 'energy'];
          const type = types[Math.floor(Math.random() * types.length)];
          particlesRef.current[index] = createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            type
          );
        }
      });
    };

    const drawConnections = () => {
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.15;
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, `rgba(0, 212, 255, ${opacity})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
    };

    const drawParticles = () => {
      const time = Date.now() * 0.002;
      
      particlesRef.current.forEach(particle => {
        const opacity = (particle.life / particle.maxLife) * 0.8;
        const pulse = Math.sin(time + particle.phase) * 0.3 + 0.7;
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Smooth glow effect
        const glowSize = particle.size * pulse * 2;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = glowSize * 2;
        
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Subtle ring for neural type
        if (particle.type === 'neural') {
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = opacity * 0.5;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * pulse * 1.8, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.restore();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateParticles();
      drawConnections();
      drawParticles();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default AdvancedParticleSystem;
