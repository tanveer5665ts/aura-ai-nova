
import React from 'react';

/**
 * Animated floating glassy overlay with shimmer
 */
const GlossyOverlay: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-10">
    {/* Slightly angled, slow sweeping shimmer */}
    <div className="absolute left-[-20%] top-1/3 w-[140vw] h-48 rounded-3xl opacity-15 bg-gradient-to-tr from-white/30 via-cyan-400/25 to-purple-400/20 blur-2xl animate-glossy-sweep-fast" />
    <div className="absolute right-[-25%] bottom-12 w-[120vw] h-40 rounded-full opacity-10 bg-gradient-to-tl from-transparent via-white/25 to-pink-400/25 blur-2xl animate-glossy-sweep-slow" />
  </div>
);

export default GlossyOverlay;
