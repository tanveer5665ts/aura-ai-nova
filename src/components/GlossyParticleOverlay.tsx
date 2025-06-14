
import React from "react";

const particles = Array.from({ length: 10 });

const GlossyParticleOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {particles.map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full opacity-30 animate-glossy-particle`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 90}%`,
            width: `${60 + Math.random() * 120}px`,
            height: `${60 + Math.random() * 120}px`,
            background: `radial-gradient(ellipse at center, ${
              i % 2 === 0 ? "#00d4ffaa, #8b5cf699" : "#ec489999, #00d4ff55"
            } 80%, transparent 100%)`,
            filter: "blur(6px)",
            animationDelay: `${i * 0.7}s`,
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
};

export default GlossyParticleOverlay;
