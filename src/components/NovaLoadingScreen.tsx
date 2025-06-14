
import React from "react";
import { LoaderCircle, Star, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Simple animated SVG starfield background (no dep)
const Starfield: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full z-0"
    style={{ pointerEvents: "none" }}
    width="100%" height="100%"
    preserveAspectRatio="none"
  >
    {[...Array(65)].map((_, i) => (
      <circle
        key={i}
        cx={Math.random() * 1600}
        cy={Math.random() * 1000}
        r={Math.random() * 0.8 + 0.7}
        fill="#fff"
        fillOpacity={Math.random() * 0.3 + 0.3}
      >
        <animate
          attributeName="opacity"
          values="1;0.2;1"
          dur={`${2 + Math.random() * 5}s`}
          repeatCount="indefinite"
          begin={`${i * 0.14}s`}
        />
      </circle>
    ))}
    {/* A few vibrant colored ones */}
    {[...Array(5)].map((_, i) => (
      <circle
        key={`c${i}`}
        cx={Math.random() * 1600}
        cy={Math.random() * 1000}
        r={Math.random() * 1.1 + 1.7}
        fill={["#00d4ff", "#8b5cf6", "#ec4899", "#93c5fd", "#fda4af"][i]}
        fillOpacity="0.83"
      >
        <animate
          attributeName="r"
          values="1.5;2.5;1.5"
          dur={`${1.6 + i * 0.7}s`}
          repeatCount="indefinite"
        />
      </circle>
    ))}
  </svg>
);

// Floating glossy particle layers
const GlossyParticles: React.FC = () => (
  <div className="absolute inset-0 z-10 pointer-events-none">
    {[...Array(7)].map((_, i) => (
      <span
        key={i}
        className={`absolute rounded-full blur-2xl opacity-25 animate-glossy-particle`}
        style={{
          left: `${Math.random() * 93}%`,
          top: `${Math.random() * 80}%`,
          width: `${60 + Math.random() * 90}px`,
          height: `${60 + Math.random() * 90}px`,
          background: `radial-gradient(ellipse at center, ${
            i % 2
              ? "#00d4ffd0, #8b5cf666"
              : "#ec489966, #00d4ff22"
          } 75%, transparent 100%)`,
          zIndex: 10,
          animationDelay: `${i * 0.5}s`,
        }}
      />
    ))}
  </div>
);

const NovaLogo: React.FC = () => (
  <div className="relative flex items-center justify-center">
    {/* Large cosmic orb with animated pulsing glow */}
    <div className="absolute w-40 h-40 rounded-full bg-cosmic-cyan/20 blur-3xl animate-pulse -z-1" />
    <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-cosmic-cyan/10 via-cosmic-purple/20 to-cosmic-pink/10 blur-2xl animate-glossy-shine -z-1" />
    {/* Extra shimmering ring */}
    <div className="absolute w-52 h-52 rounded-full border-4 border-cosmic-cyan/15 animate-glossy-sweep-fast pointer-events-none" />
    {/* Nova "star" icon with shimmer */}
    <Star size={84} className="text-cosmic-cyan drop-shadow-xl opacity-90 animate-spin-slow" strokeWidth={1.8} />
    <LoaderCircle
      size={68}
      className="absolute animate-spin-slow text-cosmic-pink drop-shadow-lg"
      strokeWidth={2}
      style={{ animationDuration: "5s", animationDirection: "reverse" }}
    />
    <Sparkles
      size={44}
      className="absolute text-cosmic-purple animate-glossy-shine"
      strokeWidth={2}
      style={{ top: 0, left: "65%", filter: "blur(0px)" }}
    />
  </div>
);

const CosmicText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="block text-[2.3rem] md:text-[3.1rem] font-black drop-shadow-xl tracking-wide bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-pink bg-clip-text text-transparent px-2 py-1 rounded-xl cosmic-text animate-cosmic-flow">
    {children}
  </span>
);

const NovaLoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-blue-900">
    {/* Animated starfield background */}
    <Starfield />
    <GlossyParticles />

    {/* Nova animated logo */}
    <div className="mb-9 relative z-10 flex items-center justify-center">
      <NovaLogo />
    </div>

    {/* Main shimmering text */}
    <div className="mb-3 relative z-10">
      <CosmicText>Nova is waking up…</CosmicText>
    </div>

    {/* Animated cosmic "loading" bar */}
    <div className="relative z-10 mb-2 w-72 flex flex-col items-center">
      <Skeleton className="w-full h-6 bg-gradient-to-r from-slate-800/80 via-cosmic-cyan/40 to-blue-900/70 shadow-cosmic-cyan/25 rounded-xl overflow-hidden">
        {/* Simulate a neon plasma flow */}
        <div className="absolute inset-0 rounded-xl h-6 bg-gradient-to-r from-transparent via-cosmic-cyan/40 to-transparent animate-shimmer opacity-70" />
      </Skeleton>
    </div>

    {/* Subline with animated dots */}
    <div className="mb-2 relative z-10">
      <p className="text-sm md:text-base text-cosmic-cyan font-mono opacity-75 flex items-center gap-2">
        <span>Connecting to the AI Core</span>
        <span className="animate-pulse">.</span>
        <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
        <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
      </p>
    </div>
    {/* Subtle bottom nebula and fade overlay */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
      style={{
        width: "200vw",
        height: "30vh",
        background:
          "radial-gradient(ellipse at top, #9a6ded55 10%, #12285f00 65%)",
        opacity: 0.56,
        zIndex: 3
      }}
    />
    {/* Smoother fade-to-black for bottom */}
    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none z-40" />
  </div>
);

export default NovaLoadingScreen;
