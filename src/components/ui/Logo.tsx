import React from 'react';

export const Logo = () => {
  return (
    <div className="h-12 w-auto flex items-center justify-center mr-2">
      <div className="border-2 border-[#ffea05] px-2 py-1 bg-black/20 backdrop-blur-sm">
        <span className="font-stencil text-2xl text-[#ffea05] tracking-widest leading-none drop-shadow-[0_0_5px_rgba(255,234,5,0.5)]">
          SPP
        </span>
      </div>
    </div>
  );
};
