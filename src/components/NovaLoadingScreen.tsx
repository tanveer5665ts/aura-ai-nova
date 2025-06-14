
import React from "react";
import { LoaderCircle, Star, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Aurora/nebula animated background layer
const Aurora: React.FC = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    {/* Multiple blurred gradient blobs to simulate aurora/nebula */}
    <div className="absolute left-1/5 top-[-18%] w-[85vw] h-[34vh] bg-gradient-to-r from-cosmic-cyan/30 via-cosmic-purple/35 to-cosmic-pink/25 blur-2xl animate-[pulse_18s_ease-in-out_infinite] rounded-3xl" />
    <div className="absolute right-[-12vw] bottom-[-7vh] w-[55vw] h-[28vh] bg-gradient-to-l from-cosmic-purple/30 via-cosmic-pink/30 to-cosmic-cyan/10 blur-3xl opacity-60 animate-[pulse_32s_ease-in-out_infinite] rounded-full" style={{ animationDelay: "3s" }} />
    <div className="absolute left-[-14vw] bottom-[12vh] w-[36vw] h-[20vh] bg-gradient-to-br from-cosmic-cyan/25 via-cosmic-purple/10 to-cosmic-pink/20 blur-2xl opacity-40 animate-[pulse_22s_ease-in-out_infinite] rounded-full" style={{ animationDelay: "7s" }} />
  </div>
);

// Simple animated SVG starfield background (no dep)
const Starfield: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full z-1"
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

// Shooting star SVG animation
const ShootingStar: React.FC = () => (
  <svg className="absolute z-20 left-[60vw] top-[16vh] pointer-events-none" width="96" height="16">
    <g>
      <rect x="0" y="6" width="86" height="4"
        fill="url(#shooting-star-gradient)" 
        opacity="0.52"
        className="animate-[shootingstar_2.2s_linear_infinite]"
      />
      <circle cx="88" cy="8" r="7" fill="#fff" opacity="0.7">
        <animate attributeName="r" values="7;4;7" dur="1.1s" repeatCount="indefinite" />
      </circle>
    </g>
    <defs>
      <linearGradient id="shooting-star-gradient" x1="0" y1="8" x2="96" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" stopOpacity="0.7" />
        <stop offset="0.2" stopColor="#c8f5fd" stopOpacity="0.31" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <style>
      {`
        @keyframes shootingstar {
          0% { transform: translateX(-30vw) scaleX(1) scaleY(1); opacity:0 }
          6% { opacity:1 }
          50% { transform: translateX(0vw) scaleX(1.1) scaleY(1.05); opacity:1 }
          100% { transform: translateX(50vw) scaleX(1) scaleY(1); opacity:0 }
        }
      `}
    </style>
  </svg>
);

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
    {/* Animated pulsating cosmic orb base */}
    <div className="absolute w-40 h-40 rounded-full bg-cosmic-cyan/20 blur-3xl animate-pulse-slow -z-1" />
    <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-cosmic-cyan/10 via-cosmic-purple/20 to-cosmic-pink/10 blur-2xl animate-glossy-shine -z-1" />
    {/* Animated extra shimmering ring */}
    <div className="absolute w-52 h-52 rounded-full border-4 border-cosmic-cyan/15 animate-glossy-sweep-fast pointer-events-none" />
    {/* Glowing neon animated border for logo */}
    <div className="absolute w-48 h-48 rounded-full border-4 border-cosmic-cyan/30 blur-lg opacity-60 animate-[spin_6s_linear_infinite, pulse_3s_ease-in-out_infinite] pointer-events-none" />
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

// Enhanced shimmering cosmic text
const CosmicText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="block text-[2.3rem] md:text-[3.1rem] font-black drop-shadow-xl tracking-wide bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-pink bg-clip-text text-transparent px-2 py-1 rounded-xl cosmic-text relative overflow-hidden">
    <span className="relative z-10">{children}</span>
    {/* Animated shimmer-glow overlay */}
    <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shimmer pointer-events-none"
      style={{ mixBlendMode: "screen" }} />
  </span>
);

// Main loading screen component
const NovaLoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-blue-900">
    <Aurora />
    <Starfield />
    <GlossyParticles />
    <ShootingStar />

    {/* Centered container with neon border glow */}
    <div className="mb-9 relative z-10 flex flex-col items-center justify-center px-8 py-8 rounded-3xl bg-black/30 shadow-2xl border-2 border-cosmic-cyan/20">
      {/* Neon edge */}
      <div className="absolute -inset-2 rounded-[2.5rem] border-4 border-cosmic-cyan/25 blur-2xl pointer-events-none animate-pulse opacity-50 z-0" />

      {/* Nova animated logo */}
      <div className="mb-6 relative z-20 flex items-center justify-center">
        <NovaLogo />
      </div>

      {/* Main shimmering text */}
      <div className="mb-3 relative z-30">
        <CosmicText>Nova is waking up…</CosmicText>
      </div>

      {/* Animated cosmic "loading" bar */}
      <div className="relative z-10 mb-2 w-72 flex flex-col items-center">
        <Skeleton className="w-full h-6 bg-gradient-to-r from-slate-800/80 via-cosmic-cyan/40 to-blue-900/70 shadow-cosmic-cyan/25 rounded-xl overflow-hidden">
          {/* Neon plasma shimmer */}
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
