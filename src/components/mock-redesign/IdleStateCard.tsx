"use client";

import React from "react";
import { ClipboardList, ArrowRight } from "lucide-react";

interface IdleStateCardProps {
  title: string;
  subtitle: string;
  steps?: string;
  icon?: React.ReactNode;
  backgroundImage?: string;
  onActivate: () => void;
  isEmbedded?: boolean;
}

/**
 * IdleStateCard
 * 
 * Pro Max idle state component with:
 * - Shockwave hover glow
 * - Ken Burns background animation
 * - Breathing conic gradient border
 * - Scanner shimmer effect
 * - White flash on hover
 */
export const IdleStateCard = ({ 
  title,
  subtitle,
  steps = "3 Simple Steps",
  icon,
  backgroundImage = "/images/obsidian-pallet.jpg",
  onActivate,
  isEmbedded = true
}: IdleStateCardProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div 
        onClick={onActivate}
        className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-sm transition-all duration-300 ease-out group bg-clip-padding cursor-pointer ${isEmbedded ? 'bg-[#0A0A0A]' : ''} p-12`}
        style={{
          boxShadow: isEmbedded 
            ? `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)` 
            : 'none'
        }}
      >
        {/* HOVER SHOCKWAVE: Massive Shadow & Flash */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm pointer-events-none z-20"
          style={{ boxShadow: '0 0 100px rgba(255, 234, 5, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)' }}
        ></div>
        
        {/* White Flash on Hover */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:animate-[flash_0.5s_ease-out] pointer-events-none z-30"></div>

        {/* Breathing Gradient Border - Accelerates on Hover */}
        {isEmbedded && (
          <div className="absolute inset-0 pointer-events-none rounded-sm overflow-hidden p-[3px]">
            <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#FFEA05_330deg,transparent_360deg)] animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] opacity-70 group-hover:opacity-100 group-hover:brightness-150 transition-all duration-300"></div>
            {/* Ken Burns Background */}
            <div className="absolute inset-[3px] rounded-[1px] overflow-hidden bg-[#0A0A0A]">
              <div 
                className="w-full h-full animate-[ken-burns_12s_ease-in-out_infinite] group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: `url('${backgroundImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Scanner Effect - High Frequency on Hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 group-hover:via-white/20 to-transparent skew-x-12 animate-[shimmer-slow_6s_infinite_linear] group-hover:animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Dark Overlay - Recedes on Hover */}
        <div className="absolute inset-[3px] bg-black/60 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-black/30 z-0 rounded-[1px]"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-10">
          {/* Pulsing Icon */}
          <button 
            className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl relative cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-[#ffea05] focus:ring-offset-2 focus:ring-offset-black ring-4 ring-[#ffea05]/20 animate-pulse" 
            onClick={(e) => { e.stopPropagation(); onActivate(); }}
            aria-label={`Start ${title}`}
          >
            {/* Inner Ring */}
            <div className="absolute inset-0 rounded-full border border-[#ffea05]/50 animate-[pulse_3s_infinite]"></div>
            {icon || <ClipboardList size={48} className="text-[#ffea05] drop-shadow-[0_0_10px_rgba(255,234,5,0.5)]" />}
          </button>

          <div className="space-y-6 max-w-sm mx-auto">
            <h3 className="font-serif text-3xl font-bold text-white leading-tight drop-shadow-lg">
              {title}
            </h3>
            <div className="flex flex-col gap-3">
              <span className="text-[#FFEA05] text-xs font-bold uppercase tracking-[0.2em] drop-shadow-md">{steps}</span>
              <p className="font-sans text-sm text-gray-200 font-medium drop-shadow-md leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onActivate(); }}
            className="mt-2 bg-[#ffea05] text-black px-8 py-3.5 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,234,5,0.3)] flex items-center gap-2"
          >
            Start My Quote <ArrowRight size={18} />
          </button>
        </div>
      </div>         
    </div>
  );
};

export default IdleStateCard;
