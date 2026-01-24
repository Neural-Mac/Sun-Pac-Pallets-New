"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface IndustrialNavbarProps {
  onRequestQuote: () => void;
  isQuoteActive?: boolean;
  currentPage?: 'home' | 'wood-cutting';
}

/**
 * IndustrialNavbar
 * 
 * Pro Max floating navbar with:
 * - "SPP" Industrial Monogram logo
 * - Services dropdown
 * - Mobile glass overlay menu
 * - Scanner animation CTA
 * - Scroll-aware background
 */
export const IndustrialNavbar = ({ 
  onRequestQuote, 
  isQuoteActive = false,
  currentPage = 'home'
}: IndustrialNavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll on mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinkStyle = "text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all relative group h-full flex items-center";
  
  const scanAnimation = "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-[1.5s] overflow-hidden relative";

  const services = [
    { name: "New Pallets", href: "/mock-redesign#" },
    { name: "Custom Pallets", href: "/mock-redesign#" },
    { name: "Heat Treated Pallets", href: "/mock-redesign#" },
    { name: "Wood Cutting", href: "/mock-redesign/wood-cutting" }
  ];

  return (
    <>
      <nav className={`fixed top-4 left-4 right-4 transition-all duration-500 ${isScrolled ? 'top-2' : 'top-4'} ${isQuoteActive ? 'opacity-0 pointer-events-none' : 'z-50'}`}>
        <div className={`max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center rounded-sm transition-all duration-300 border backdrop-blur-md shadow-2xl ${isScrolled ? 'bg-black/80 border-white/20' : 'bg-white/5 border-white/10'}`}>
          
          {/* LOGO - Industrial Monogram */}
          <a 
            href="/mock-redesign"
            className="flex items-center gap-3 md:gap-5 group cursor-pointer relative z-50"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 bg-[#FFEA05] rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(255,234,5,0.15)] group-hover:shadow-[0_0_35px_rgba(255,234,5,0.4)] transition-all duration-500 border border-[#FFEA05]">
              <span className="font-black text-black text-lg md:text-xl tracking-tighter transform group-hover:scale-110 transition-transform duration-300">SPP</span>
            </div>
            
            <div className="flex flex-col">
              <span className="font-black text-sm md:text-xl tracking-[0.15em] text-white uppercase group-hover:text-[#FFEA05] transition-colors leading-none mb-1">Sun Pac Pallets</span>
              <span className="text-[8px] md:text-[9px] font-black tracking-[0.35em] text-[#FFEA05] uppercase opacity-90 leading-none pl-[1px] hidden md:block">Pallet Engineering</span>
            </div>
          </a>
          
          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-12 h-full">
            <a 
              href="/mock-redesign" 
              className={`${navLinkStyle} ${currentPage === 'home' ? 'text-white' : ''}`}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFEA05] transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            {/* SERVICES DROPDOWN */}
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={`${navLinkStyle} ${isServicesOpen || currentPage === 'wood-cutting' ? 'text-white' : ''}`}>
                Services <ChevronDown size={14} className={`ml-1.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-[#FFEA05]' : 'text-gray-600'}`} />
              </button>
              
              {/* DROPDOWN */}
              <div className={`absolute top-full left-0 w-56 pt-2 transition-all duration-300 ${isServicesOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden shadow-2xl ring-1 ring-white/5">
                  {services.map((item, idx) => (
                    <a 
                      key={idx} 
                      href={item.href} 
                      className={`block px-6 py-4 hover:text-black hover:bg-[#FFEA05] transition-all border-b border-white/5 last:border-0 font-bold ${
                        item.href.includes('wood-cutting') && currentPage === 'wood-cutting'
                          ? 'text-[#FFEA05] bg-white/5'
                          : 'text-gray-400'
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href="#contact" className={navLinkStyle}>
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFEA05] transition-all duration-300 group-hover:w-full"></span>
            </a>

            <button 
              onClick={onRequestQuote}
              className={`bg-[#FFEA05] text-black px-8 py-3 rounded-sm font-black text-xs uppercase tracking-[0.15em] hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,234,5,0.3)] ${scanAnimation}`}
            >
              Request Quote
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 relative z-50 hover:text-[#FFEA05] transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE GLASS OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl animate-in slide-in-from-top-10 fade-in duration-300 flex flex-col pt-32 px-6">
          {/* MENU LINKS */}
          <div className="flex flex-col gap-6 items-center">
            <a 
              href="/mock-redesign" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl font-black uppercase tracking-tight hover:text-[#FFEA05] transition-colors ${currentPage === 'home' ? 'text-[#FFEA05]' : 'text-white'}`}
            >
              Home
            </a>
            <div className="w-12 h-[1px] bg-white/10"></div>
            
            <div className="flex flex-col gap-4 w-full items-center">
              <span className="text-sm font-bold text-[#FFEA05] uppercase tracking-widest">Services</span>
              {services.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-bold hover:text-white transition-colors ${
                    item.href.includes('wood-cutting') && currentPage === 'wood-cutting'
                      ? 'text-[#FFEA05]'
                      : 'text-gray-400'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            <div className="w-12 h-[1px] bg-white/10 my-2"></div>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tight text-white hover:text-[#FFEA05] transition-colors"
            >
              Contact
            </a>
          </div>
          
          {/* MOBILE CTA */}
          <div className="mt-auto mb-12 w-full space-y-4">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full bg-[#FFEA05] text-black py-5 rounded-sm font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,234,5,0.2)]"
            >
              Start Configuration
            </button>
            <div className="flex justify-center gap-8 text-gray-500">
              <a href="tel:6479513080" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white">
                <Phone size={14}/> Sales
              </a>
              <a href="mailto:sales@sunpacpallets.com" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white">
                <CheckCircle2 size={14}/> Support
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndustrialNavbar;
