
import React from "react";
import { LoaderCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const NovaLoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-blue-900 animate-fade-in">
    <div className="mb-8">
      {/* Glow orb with spinning icon */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full bg-cosmic-cyan/20 blur-2xl animate-pulse" />
        <LoaderCircle size={80} className="text-cosmic-cyan animate-spin-slow z-10" />
      </div>
    </div>
    <div className="mb-2">
      <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-pink bg-clip-text text-transparent tracking-wide drop-shadow">
        Nova is waking up...
      </span>
    </div>
    <Skeleton className="w-72 h-6 mb-3 bg-slate-700/60" />
    <p className="text-sm text-cosmic-cyan font-mono opacity-70">“Connecting to the AI core”</p>
  </div>
);

export default NovaLoadingScreen;
