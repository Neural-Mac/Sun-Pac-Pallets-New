"use client";

import React from "react";

/**
 * DarkIndustrialTheme
 * 
 * Pro Max theme wrapper providing:
 * - CSS custom properties for consistent theming
 * - Background texture with fractal noise
 * - Selection styling
 * - Touch optimization for mobile
 */
export const DarkIndustrialTheme = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen font-sans antialiased text-gray-200 selection:bg-[#FFEA05] selection:text-black"
      style={
        {
          "--color-brand": "#FFEA05", // Safety Yellow
          "--color-surface": "#202020",
          "--color-surface-dark": "#151515",
          "--color-text-muted": "#9CA3AF",
          "--font-serif": "'Playfair Display', serif",
          "--font-sans": "'Inter', sans-serif",
          backgroundColor: "#111111",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          // Native Touch Feel
          touchAction: "manipulation", 
          WebkitTapHighlightColor: "transparent"
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default DarkIndustrialTheme;
