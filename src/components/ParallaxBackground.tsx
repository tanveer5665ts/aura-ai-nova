
import React, { useRef, useEffect, useState } from "react";

const LAYERS = [
  { color: "from-cyan-500/15 to-purple-500/10", blur: "blur-3xl", speed: 0.03, size: "w-[140vw] h-[80vh]", z: 0, top: "top-0 left-0" },
  { color: "from-pink-500/10 to-blue-400/10", blur: "blur-2xl", speed: 0.07, size: "w-[100vw] h-[60vh]", z: 1, top: "top-16 right-10" },
  { color: "from-white/10 to-cyan-400/15", blur: "blur-xl", speed: 0.13, size: "w-[80vw] h-[48vh]", z: 2, top: "top-1/3 left-1/3" },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => typeof window === "undefined" ? false : window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}

/**
 * Parallax background for desktop/laptop only.
 */
const ParallaxBackground: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    // Center effect on desktop load if no interaction
    setMouse({ x: 0.5, y: 0.5 });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          className={
            `absolute ${layer.size} rounded-full 
             bg-gradient-to-br ${layer.color} ${layer.blur}
             opacity-80 mix-blend-screen transition-ultra`
          }
          style={{
            zIndex: layer.z,
            transition: "transform 0.3s cubic-bezier(.55,.09,.68,.53)",
            transform: `translate3d(${(mouse.x - 0.5) * 80 * layer.speed}vw, ${(mouse.y - 0.5) * 40 * layer.speed}vh, 0)`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;
