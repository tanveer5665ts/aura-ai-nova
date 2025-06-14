
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkleOffset: number;
}

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars: Star[] = [];
      const numStars = 200;

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          speed: Math.random() * 0.2 + 0.05,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleOffset: Math.random() * Math.PI * 2
        });
      }

      starsRef.current = stars;
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth nebula gradient background with gentle color shifts
      const time = Date.now() * 0.0001;
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100, 
        canvas.height / 2 + Math.cos(time * 0.7) * 80, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      
      gradient.addColorStop(0, `rgba(139, 92, 246, ${0.08 + Math.sin(time * 2) * 0.03})`);
      gradient.addColorStop(0.3, `rgba(0, 212, 255, ${0.04 + Math.sin(time * 1.5) * 0.02})`);
      gradient.addColorStop(0.7, `rgba(236, 72, 153, ${0.02 + Math.sin(time * 1.8) * 0.01})`);
      gradient.addColorStop(1, 'rgba(11, 20, 38, 1)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate and draw stars with smooth movements
      starsRef.current.forEach((star, index) => {
        // Gentle vertical movement
        star.y -= star.speed;
        
        // Subtle horizontal drift
        star.x += Math.sin(time + star.twinkleOffset) * 0.1;
        
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }

        // Smooth boundaries
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;

        // Smooth twinkle effect
        const twinkle = Math.sin(time * 3 + star.twinkleOffset) * 0.3 + 0.7;
        const finalOpacity = star.opacity * twinkle;

        // Draw star with smooth glow
        ctx.save();
        ctx.globalAlpha = finalOpacity;
        
        const glowIntensity = star.size * (1 + twinkle * 0.5);
        ctx.shadowColor = '#00D4FF';
        ctx.shadowBlur = glowIntensity * 3;
        
        ctx.fillStyle = '#00D4FF';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * twinkle, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createStars();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #0B1426 0%, #1A2332 50%, #2D3748 100%)' }}
    />
  );
};

export default StarField;
