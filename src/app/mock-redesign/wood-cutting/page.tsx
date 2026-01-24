'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowRight, CheckCircle2, X, ChevronDown, ChevronRight,
  Ruler, Factory, Scissors, Layers, Check,
  Phone, Mail, MapPin, ArrowLeft,
  Trees, Truck, Settings, Hammer, ClipboardList
} from 'lucide-react';
import { DarkIndustrialTheme, IndustrialNavbar } from '@/components/mock-redesign';
import '../animations.css';

// --- HEX CODE CONSTANTS ---
const HexCodes = {
  brand: '#FFEA05',
  surfaceDark: '#202020',
  surfaceCard: '#2a2a2a',
  white: '#ffffff',
  freshPine: '#f4e4bc',
  burntWood: '#1a1a1a'
};

// --- SAWDUST PARTICLES ---
const SawdustParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="sawdust-particle absolute rounded-full bg-[#f4e4bc] opacity-20"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// --- TECHNICAL CONSOLE CARD ---
const TechnicalConsole = ({ title, subtitle, description, icon: Icon, image }: any) => (
  <div className="group relative w-full h-[500px] cursor-pointer">
    <div className="relative w-full h-full bg-[#0A0A0A] border border-[#FFEA05]/20 rounded-sm overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#FFEA05] hover:shadow-[0_0_40px_rgba(255,234,5,0.2)]">
      {/* Technical Grid */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `radial-gradient(${HexCodes.brand} 1px, transparent 1px)`, 
        backgroundSize: '20px 20px' 
      }}></div>

      {/* Hero Image */}
      <div className="h-64 relative overflow-hidden border-b border-[#FFEA05]/20">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-90 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url('${image}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent transition-opacity duration-500 group-hover:opacity-50"></div>
        
        {/* Icon */}
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center ring-2 ring-[#ffea05]/30 animate-pulse">
            <Icon size={24} className="text-[#FFEA05]" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#FFEA05] tracking-widest uppercase opacity-80">
          SPEC_V.2026 // {title.toUpperCase()}
        </div>
        
        {/* Scanner Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-[shimmer-slow_6s_infinite_linear] group-hover:animate-[shimmer_2s_infinite] group-hover:via-white/20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="font-black text-2xl text-white mb-1 uppercase tracking-tight group-hover:text-[#FFEA05] transition-colors">{title}</h3>
        {subtitle && <p className="text-[#FFEA05] font-mono text-xs uppercase tracking-wider mb-3">{subtitle}</p>}
        <div className="w-12 h-[2px] bg-[#FFEA05] mb-4"></div>
        <p className="font-sans text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

// --- MILLING PROCESS TIMELINE ---
const MillingProcessTimeline = () => {
  const steps = [
    { 
      id: "01", title: "Submit Specs", subtitle: "Define Your Cut",
      desc: "Upload dimensions, species, and quantity. Our system calculates optimal yield.",
      icon: <Ruler size={24} />,
      bgImage: "/images/wood-cutting/sawmill-hero.png"
    },
    { 
      id: "02", title: "Engineering Review", subtitle: "Precision Planning",
      desc: "Our team analyzes grain direction, moisture content, and kerf optimization.",
      icon: <Settings size={24} />,
      bgImage: "/images/wood-cutting/resawing-process.png"
    },
    { 
      id: "03", title: "Production", subtitle: "Automated Fleet",
      desc: "High-volume processing on our calibrated band resaws and gang rippers.",
      icon: <Scissors size={24} />,
      bgImage: "/images/wood-cutting/ripping-station.png"
    },
    { 
      id: "04", title: "Delivery", subtitle: "North American Fleet",
      desc: "Rapid deployment to your facility. Full truckload or LTL options available.",
      icon: <Truck size={24} />,
      bgImage: "/images/wood-cutting/notching-hero.png"
    },
  ];

  return (
    <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" 
        style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#FFEA05] font-mono text-xs tracking-widest uppercase mb-2 block">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            FROM SPEC <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">
              TO DELIVERY
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.id} className="group relative h-[450px] overflow-hidden border border-[#333] bg-[#111] hover:border-[#FFEA05] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,234,5,0.15)] cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-20 md:group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0 transform group-hover:scale-110 ease-out"
                style={{ backgroundImage: `url('${step.bgImage}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95 group-hover:via-black/40 transition-all duration-500"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <div className="mb-auto opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-4xl font-bold text-[#333] group-hover:text-[#FFEA05] transition-colors">
                    {step.id}
                  </span>
                </div>

                <div className="transform transition-transform duration-500">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FFEA05] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-[#FFEA05] mb-3 uppercase tracking-wide">
                    {step.subtitle}
                  </p>
                  
                  <div className="max-h-0 group-hover:max-h-[300px] transition-[max-height] duration-700 ease-in-out overflow-hidden">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <p className="text-white font-bold text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- EQUIPMENT SECTION ---
const EquipmentSection = () => {
  const equipment = [
    { name: "Go Fast 2NX", spec: "1,000/hr", detail: "Stringer Notcher", icon: <Scissors size={32} /> },
    { name: "Wood-Mizer HR120", spec: "Thin-Kerf", detail: "Band Resaw", icon: <Layers size={32} /> },
    { name: "Precision Trim Saws", spec: "0.01mm", detail: "Dimensional Accuracy", icon: <Ruler size={32} /> },
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[linear-gradient(to_right,rgba(0,0,0,1),transparent),url('/images/wood-cutting/ripping-station.png')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="text-[#FFEA05] font-mono text-xs uppercase tracking-[0.2em] mb-4 block animate-pulse">
            ● Equipment Fleet
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-[0.9] mb-8">
            Industrial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Capabilities</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {equipment.map((item, idx) => (
            <div key={idx} className="group bg-[#111] border border-white/10 p-6 hover:border-[#FFEA05] transition-all duration-300 cursor-pointer hover:shadow-[0_0_25px_rgba(255,234,5,0.1)]">
              <div className="w-16 h-16 rounded-sm bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#FFEA05]/10 transition-all text-[#FFEA05]">
                {item.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#FFEA05] transition-colors">{item.name}</h3>
              <p className="text-2xl font-black text-[#FFEA05] font-mono mb-1">{item.spec}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wide">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- INDUSTRIES SECTION (Enhanced) ---
const IndustriesSection = () => {
  const industries = [
    { name: "Pallet Manufacturers", desc: "Stringers, deck boards, blocks", icon: <Layers size={28} /> },
    { name: "Crate & Box Builders", desc: "Custom panels, cleats, frames", icon: <Factory size={28} /> },
    { name: "Furniture Components", desc: "Dressed lumber, precise dimensions", icon: <Hammer size={28} /> },
    { name: "Construction Lumber", desc: "Framing, blocking, supports", icon: <Trees size={28} /> },
    { name: "Other Industries", desc: "Custom cuts for any application", icon: <Settings size={28} /> },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#111] via-[#0a0a0a] to-[#111] border-y border-white/5 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,234,5,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,234,5,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#FFEA05] font-mono text-xs tracking-widest uppercase mb-4 block">Who We Serve</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFEA05] to-[#ebd700]">Power</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {industries.map((ind, idx) => (
            <div key={idx} className="group relative text-center p-8 bg-[#0a0a0a] border border-white/5 hover:border-[#FFEA05] transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,234,5,0.15)] overflow-hidden">
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFEA05]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FFEA05]/20 group-hover:border-[#FFEA05] transition-all duration-500 group-hover:scale-110">
                  <div className="text-gray-500 group-hover:text-[#FFEA05] transition-colors duration-500">{ind.icon}</div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#FFEA05] transition-colors">{ind.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">{ind.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- WOOD CUTTING QUOTE FORM (Pro Max Wizard) ---
const WoodCuttingQuoteForm = React.forwardRef(({ isEmbedded = false, onClose, onOpen }: { isEmbedded?: boolean; onClose?: () => void; onOpen?: () => void }, ref) => {
  const [step, setStep] = useState(1);
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [quoteId, setQuoteId] = useState('');
  const totalSteps = 3;
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');

  const [formData, setFormData] = useState({
    serviceType: 'Notching',
    materialSource: 'Provided by Sun Pac',
    species: 'SPF',
    dimensions: [{ length: '', width: '', thickness: '' }],
    quantity: '',
    cutPattern: '',
    contact: { name: '', company: '', email: '', phone: '' }
  });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerHeight(entry.contentRect.height);
    });
    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, [step, started]);

  React.useImperativeHandle(ref, () => ({
    start: () => { setStarted(true); onOpen?.(); setStep(1); },
    isStarted: () => started,
    close: () => { setStarted(false); setStep(1); onClose?.(); }
  }));

  const generateQuoteId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `#SPP-MILL-${year}-${random}`;
  };

  const handleNext = () => {
    if (step === 3) { setQuoteId(generateQuoteId()); setStep(4); }
    else setStep((prev) => prev < 3 ? prev + 1 : 4);
  };
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  // IDLE STATE (Exact Home Page Pattern)
  if (!started) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div 
            onClick={() => { setStarted(true); onOpen?.(); }}
            className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-sm transition-all duration-300 ease-out group bg-clip-padding cursor-pointer ${isEmbedded ? 'bg-[#0A0A0A]' : ''} p-12`}
            style={{
                boxShadow: isEmbedded 
                    ? `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)` 
                    : 'none'
            }}
        >
            {/* HOVER SHOCKWAVE: Massive Shadow & Flash */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm pointer-events-none z-20"
                 style={{ boxShadow: '0 0 100px rgba(255, 234, 5, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)' }}></div>
            
            {/* White Flash on Hover */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:animate-[flash_0.5s_ease-out] pointer-events-none z-30"></div>

            {/* Breathing Gradient Border - TURBO on Hover */}
            {isEmbedded && (
                <div className="absolute inset-0 pointer-events-none rounded-sm overflow-hidden p-[3px]">
                    <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#FFEA05_330deg,transparent_360deg)] animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] opacity-70 group-hover:opacity-100 group-hover:brightness-150 transition-all duration-300"></div>
                    {/* Cinematic Background Image Container */}
                    <div className="absolute inset-[3px] rounded-[1px] overflow-hidden bg-[#0A0A0A]">
                        <div 
                            className="w-full h-full animate-[ken-burns_12s_ease-in-out_infinite] group-hover:scale-110 transition-transform duration-700"
                            style={{
                                backgroundImage: "url('/images/wood-cutting/obsidian-sawmill.png')",
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
           {/* Pulsing Icon - UPDATED to ClipboardList */}
           <button 
             className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl relative cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-[#ffea05] focus:ring-offset-2 focus:ring-offset-black ring-4 ring-[#ffea05]/20 animate-pulse" 
             onClick={(e) => { e.stopPropagation(); setStarted(true); onOpen?.(); }}
             aria-label="Start Milling Configuration"
           >
                {/* Inner Ring */}
               <div className="absolute inset-0 rounded-full border border-[#ffea05]/50 animate-[pulse_3s_infinite]"></div>
               <ClipboardList size={48} className="text-[#ffea05] drop-shadow-[0_0_10px_rgba(255,234,5,0.5)]" />
           </button>

           <div className="space-y-6 max-w-sm mx-auto">
               <h3 className="font-serif text-3xl font-bold text-white leading-tight drop-shadow-lg">
                  Build Your Milling Quote
               </h3>
               <div className="flex flex-col gap-3">
                   <span className="text-[#FFEA05] text-xs font-bold uppercase tracking-[0.2em] drop-shadow-md">3 Simple Steps</span>
                   <p className="font-sans text-sm text-gray-200 font-medium drop-shadow-md leading-relaxed flex items-center justify-center gap-3">
                      <span>Select Service</span>
                      <span className="text-[#FFEA05] text-xl font-light">›</span>
                      <span>Dimensions</span>
                      <span className="text-[#FFEA05] text-xl font-light">›</span>
                      <span>Submit</span>
                   </p>
               </div>
           </div>

           <button 
             onClick={(e) => { e.stopPropagation(); setStarted(true); onOpen?.(); }}
             className="mt-2 bg-[#ffea05] text-black px-8 py-3.5 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,234,5,0.3)] flex items-center gap-2"
           >
              Start My Quote <ArrowRight size={18} />
           </button>
          </div>

       </div>         
    </div>
    );
  }

  // WIZARD STATE (PORTAL)
  if (!mounted) return <div className="w-full h-full min-h-[500px] opacity-0 pointer-events-none" />;

  return (
    <>
      <div className="w-full h-full min-h-[500px] opacity-0 pointer-events-none" />
      {createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#121212] backdrop-blur-xl border border-white/20 rounded-sm shadow-[0_0_100px_rgba(255,234,5,0.2)] overflow-hidden"
            style={{ height: containerHeight === 'auto' ? 'auto' : containerHeight }}
          >
            <div ref={contentRef} className="flex flex-col">
              {/* Header */}
              <div className="relative border-b border-white/5 bg-[#000000]/40 backdrop-blur-md">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-[#FFEA05] rounded-sm"></div>
                    <div className="w-1.5 h-6 bg-[#FFEA05] rounded-sm"></div>
                    <span className="text-white font-bold font-serif tracking-wide text-lg">Milling Quote</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      {['SERVICE', 'SPECS', 'CONTACT'].map((label, i) => (
                        <div key={label} className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold tracking-widest transition-colors duration-500 ${step === i + 1 ? 'text-[#FFEA05]' : 'text-gray-700'}`}>{label}</span>
                          {i < 2 && <ChevronRight size={12} className={`text-[#FFEA05] transition-all ${step > i ? 'opacity-100' : 'opacity-30'}`} strokeWidth={3} />}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setStarted(false); setStep(1); onClose?.(); }} className="text-gray-500 hover:text-white">
                      <X size={18} />
                    </button>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full">
                  <div className="h-full bg-[#FFEA05] transition-all duration-500 shadow-[0_0_10px_rgba(255,234,5,0.5)]" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>
              </div>

              {/* Body - Removed overflow-y-auto to stop scroll logic on Final Page */}
              <div className="w-full p-6 relative z-10">
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <label className="text-[10px] font-bold text-[#FFEA05] uppercase tracking-wider block">01. Service Scope</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Notching', 'Resawing', 'Trimming', '2 or More'].map((service) => (
                        <button key={service} onClick={() => setFormData({...formData, serviceType: service})}
                          className={`p-4 rounded-sm text-left border transition-all relative ${formData.serviceType === service ? 'border-[#FFEA05] bg-[#FFEA05]/10 text-white' : 'border-white/10 bg-[#111] text-gray-400 hover:border-[#FFEA05]/50'}`}>
                          {formData.serviceType === service && <div className="absolute top-2 right-2 w-5 h-5 bg-[#FFEA05] rounded-full flex items-center justify-center"><Check size={12} className="text-black" /></div>}
                          <span className="text-sm font-bold block">{service}</span>
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
                      {['Provided by Sun Pac', 'Customer Wood (Labor Only)'].map((src) => (
                        <button key={src} onClick={() => setFormData({...formData, materialSource: src})}
                          className={`p-3 rounded-sm text-left border flex items-center gap-2 transition-all ${formData.materialSource === src ? 'border-[#FFEA05] bg-[#FFEA05]/10 text-white' : 'border-white/10 bg-[#111] text-gray-400'}`}>
                          <div className={`w-3 h-3 rounded-full border border-[#FFEA05] ${formData.materialSource === src ? 'bg-[#FFEA05]' : ''}`}></div>
                          <span className="text-xs font-bold">{src === 'Provided by Sun Pac' ? 'Sun Pac Supplies' : 'Customer Wood'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <label className="text-[10px] font-bold text-[#FFEA05] uppercase tracking-wider block">02. Specifications</label>
                    <div className="space-y-3">
                      {formData.dimensions.map((dim, idx) => (
                        <div key={idx} className="grid grid-cols-3 gap-2">
                          <div><span className="text-[9px] text-gray-500 block">LENGTH</span><input type="text" placeholder='48"' className="input-compact" value={dim.length} onChange={(e) => { const newDims = [...formData.dimensions]; newDims[idx].length = e.target.value; setFormData({...formData, dimensions: newDims}); }} /></div>
                          <div><span className="text-[9px] text-gray-500 block">WIDTH</span><input type="text" placeholder='3.5"' className="input-compact" value={dim.width} onChange={(e) => { const newDims = [...formData.dimensions]; newDims[idx].width = e.target.value; setFormData({...formData, dimensions: newDims}); }} /></div>
                          <div><span className="text-[9px] text-gray-500 block">THICK</span><input type="text" placeholder='1.5"' className="input-compact" value={dim.thickness} onChange={(e) => { const newDims = [...formData.dimensions]; newDims[idx].thickness = e.target.value; setFormData({...formData, dimensions: newDims}); }} /></div>
                        </div>
                      ))}
                      <button onClick={() => setFormData({...formData, dimensions: [...formData.dimensions, { length: '', width: '', thickness: '' }]})} className="text-[10px] font-bold text-[#FFEA05] hover:text-white">+ Add Size</button>
                    </div>
                    <div><span className="text-[10px] text-gray-400 block mb-1">PROCESSING NOTES</span><textarea className="input-compact resize-none" rows={3} placeholder="Describe the cut..." value={formData.cutPattern} onChange={(e) => setFormData({...formData, cutPattern: e.target.value})}></textarea></div>
                    <div><span className="text-[10px] text-gray-400 block mb-1">QUANTITY</span><input type="text" placeholder="E.g. Truck Loads or pcs" className="input-compact" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} /></div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <label className="text-[10px] font-bold text-[#FFEA05] uppercase tracking-wider block">03. Contact Info</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Full Name" className="input-compact" value={formData.contact.name} onChange={(e) => setFormData({...formData, contact: {...formData.contact, name: e.target.value}})} />
                      <input type="text" placeholder="Company" className="input-compact" value={formData.contact.company} onChange={(e) => setFormData({...formData, contact: {...formData.contact, company: e.target.value}})} />
                      <input type="email" placeholder="Email" className="input-compact" value={formData.contact.email} onChange={(e) => setFormData({...formData, contact: {...formData.contact, email: e.target.value}})} />
                      <input type="tel" placeholder="Phone" className="input-compact" value={formData.contact.phone} onChange={(e) => setFormData({...formData, contact: {...formData.contact, phone: e.target.value}})} />
                    </div>
                  </div>
                )}

                {step === 4 && (
                 <div className="animate-in zoom-in-95 fade-in duration-500 flex flex-col items-center text-center p-4 sm:p-6 pb-8">
                    
                    {/* Visual Anchor: Golden Check */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#FFEA05]/10 border border-[#FFEA05] flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(255,234,5,0.2)] animate-[pulse_3s_infinite]">
                        <Check size={24} className="text-[#FFEA05] sm:hidden" strokeWidth={3} />
                        <Check size={32} className="text-[#FFEA05] hidden sm:block" strokeWidth={3} />
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#FFEA05] mb-3 sm:mb-4 drop-shadow-[0_2px_10px_rgba(255,234,5,0.3)]">
                        Quote Request Received
                    </h2>

                    <p className="text-white text-xs sm:text-sm md:text-base max-w-lg mb-4 sm:mb-8 leading-relaxed opacity-90">
                        Thank you for the opportunity. We're reviewing your specs manually. <br className="hidden sm:block"/>
                        A member of our team will contact you shortly.
                    </p>

                    {/* The Ticket / Reference Box */}
                    <div className="bg-[#111] border border-white/10 rounded-sm p-4 sm:p-6 w-full max-w-md mb-4 sm:mb-8 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FFEA05]"></div>
                        <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Your Reference Ticket</p>
                        <p className="text-xl sm:text-2xl font-mono text-white tracking-widest">{quoteId}</p>
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#FFEA05]/5 rounded-full blur-xl group-hover:bg-[#FFEA05]/10 transition-colors"></div>
                    </div>

                    {/* Contact Grid - "Wood Shop Style" (Copied from Home Page) */}
                    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-forwards">
                        <div className="flex flex-col items-center gap-3 group">
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFEA05] shadow-[0_0_15px_rgba(255,234,5,0.1)] group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-[0_0_25px_rgba(255,234,5,0.4)] transition-all duration-300">
                                <Phone size={24} className="animate-[pulse_3s_ease-in-out_infinite]" />
                            </div>
                            <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Call</p>
                            <div className="text-base md:text-lg text-white text-center font-medium leading-relaxed">
                                <span className="block group-hover:text-[#FFEA05] transition-colors"><span className="text-gray-500 text-sm mr-2">General:</span>647-617-9511</span>
                                <span className="block group-hover:text-[#FFEA05] transition-colors"><span className="text-gray-500 text-sm mr-2">Sales:</span>647-951-3080</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 group">
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFEA05] shadow-[0_0_15px_rgba(255,234,5,0.1)] group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-[0_0_25px_rgba(255,234,5,0.4)] transition-all duration-300">
                                <Mail size={24} className="animate-[pulse_3s_ease-in-out_infinite] delay-700" />
                            </div>
                            <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Email</p>
                            <a href="mailto:sales@sunpacpallets.com" className="text-base md:text-lg text-white group-hover:text-[#FFEA05] transition-colors font-medium break-all">
                                sales@sunpacpallets.com
                            </a>
                        </div>

                        <div className="flex flex-col items-center gap-3 group">
                             <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFEA05] shadow-[0_0_15px_rgba(255,234,5,0.1)] group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-[0_0_25px_rgba(255,234,5,0.4)] transition-all duration-300">
                                <MapPin size={24} className="animate-[pulse_3s_ease-in-out_infinite] delay-1000" />
                            </div>
                            <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Production Facility</p>
                            <p className="text-base md:text-lg text-white text-center leading-relaxed font-medium group-hover:text-[#FFEA05] transition-colors">
                                8999 Concession Rd 5<br/>
                                Uxbridge, Ontario L9P 1R1
                            </p>
                        </div>
                    </div>

                    <button onClick={() => window.location.reload()} className="mt-8 text-gray-500 text-xs hover:text-white flex items-center gap-2 uppercase tracking-widest"><ArrowLeft size={12} /> Return</button>
                  </div>
                )}
              </div>

              {/* Footer */}
              {step !== 4 && (
                <div className="p-4 bg-[#000]/60 border-t border-white/5 flex gap-2">
                  {step > 1 && <button onClick={handleBack} className="p-2 rounded-sm border border-white/10 text-gray-400 hover:text-white"><ArrowLeft size={16} /></button>}
                  <button onClick={handleNext} disabled={step === 3 && !formData.contact.email}
                    className={`flex-1 font-bold text-xs rounded-sm py-3 flex items-center justify-center gap-2 transition-all ${step === 3 && !formData.contact.email ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#FFEA05] text-black hover:bg-white shadow-[0_0_15px_rgba(255,234,5,0.2)]'}`}>
                    {step === 3 ? 'Submit Request' : 'Next Step'} {step !== 3 && <ArrowRight size={14} />} {step === 3 && <CheckCircle2 size={14} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
});
WoodCuttingQuoteForm.displayName = 'WoodCuttingQuoteForm';

// --- FOOTER (Full Home Page Pattern) ---
const Footer = ({ onRequestQuote }: { onRequestQuote: () => void }) => {
  const [isCustomSubject, setIsCustomSubject] = useState(false);
  const [customSubjectValue, setCustomSubjectValue] = useState('');

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'custom') {
      setIsCustomSubject(true);
      setCustomSubjectValue('');
    }
  };

  // Business hours status
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isOpen = day >= 1 && day <= 6 && hour >= 7 && hour < 16;
  const status = { isOpen, text: isOpen ? 'ACCEPTING ORDERS' : 'CLOSED' };

  return (
    <footer id="contact" className="bg-[#080808] border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,234,5,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,234,5,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12">
        
        {/* Column 1: Quick Inquiry Form (Span 5) */}
        <div className="lg:col-span-5">
          <div className="bg-[#111] border-l-4 border-[#FFEA05] p-8 shadow-2xl relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFEA05]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="font-serif text-2xl text-white mb-2 relative z-10">Quick Inquiry</h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-6 relative z-10">Wood Cutting Division</p>

            <form className="space-y-4 relative z-10">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" className="w-full bg-[#050505] border border-white/10 text-white px-3 py-2.5 focus:border-[#FFEA05] focus:outline-none placeholder-gray-600 text-sm" placeholder="NAME" />
                <input type="email" className="w-full bg-[#050505] border border-white/10 text-white px-3 py-2.5 focus:border-[#FFEA05] focus:outline-none placeholder-gray-600 text-sm" placeholder="EMAIL" />
              </div>
              
              <div className="relative">
                {isCustomSubject ? (
                  <div className="flex items-center gap-2">
                    <input type="text" value={customSubjectValue} onChange={(e) => setCustomSubjectValue(e.target.value)} className="flex-1 bg-[#050505] border border-[#FFEA05] text-white px-3 py-2.5 focus:outline-none text-sm" placeholder="TYPE YOUR SUBJECT..." autoFocus />
                    <button type="button" onClick={() => { setIsCustomSubject(false); setCustomSubjectValue(''); }} className="p-2.5 bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <select className="w-full bg-[#050505] border border-white/10 text-white px-3 py-2.5 focus:border-[#FFEA05] focus:outline-none appearance-none text-gray-300 cursor-pointer text-sm" onChange={handleSubjectChange} defaultValue="">
                      <option value="" disabled>SELECT SUBJECT...</option>
                      <option value="cutting">Wood Cutting Inquiry</option>
                      <option value="quote">Custom Quote Request</option>
                      <option value="logistics">Logistics / Shipping</option>
                      <option value="custom" className="text-[#FFEA05] font-bold">» Custom (Type your own)</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown size={12} />
                    </div>
                  </div>
                )}
              </div>

              <textarea rows={3} className="w-full bg-[#050505] border border-white/10 text-white px-3 py-2.5 focus:border-[#FFEA05] focus:outline-none resize-none placeholder-gray-600 text-sm" placeholder="MESSAGE DETAILS..."></textarea>

              <button className="w-full bg-[#FFEA05] hover:bg-[#ebd700] text-black font-black uppercase tracking-[0.1em] py-3 text-xs transition-all flex items-center justify-center gap-2">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Column 2: Dense Info Grid (Span 7) */}
        <div className="lg:col-span-7 flex flex-col h-full justify-between">
          
          {/* Top Section: 2x2 Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">
            
            {/* 1. Production Site */}
            <div>
              <h4 className="flex items-center gap-2 text-[#FFEA05] text-[10px] font-bold uppercase tracking-widest mb-3">
                <div className="w-1.5 h-1.5 bg-[#FFEA05] rounded-full"></div> Production Facility
              </h4>
              <div className="text-gray-300 font-mono text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                <span className="text-white block font-bold text-base">Uxbridge, ON</span>
                8999 Concession Rd 5<br/>
                L9P 1R1
              </div>
            </div>

            {/* 2. Operational Hours */}
            <div>
              <h4 className="flex items-center gap-2 text-[#FFEA05] text-[10px] font-bold uppercase tracking-widest mb-3">
                <div className="w-1.5 h-1.5 bg-[#FFEA05] rounded-full animate-pulse"></div> Hours of Operations
              </h4>
              <div className="text-gray-300 font-mono text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                <span className="text-white block font-bold text-base">MON - SAT</span>
                7:00am - 4:00pm
              </div>
            </div>

            {/* 3. Contact Us */}
            <div>
              <h4 className="flex items-center gap-2 text-[#FFEA05] text-[10px] font-bold uppercase tracking-widest mb-3">
                <div className="w-1.5 h-1.5 bg-[#FFEA05] rounded-full"></div> Contact Us
              </h4>
              <div className="flex flex-col gap-3 border-l-2 border-white/10 pl-4">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">General</div>
                  <a href="tel:6476179511" className="text-white hover:text-[#FFEA05] transition-colors font-mono tracking-tight text-lg font-bold">647-617-9511</a>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">Sales</div>
                  <a href="tel:6479513080" className="text-white hover:text-[#FFEA05] transition-colors font-mono tracking-tight text-lg font-bold">647-951-3080</a>
                </div>
                <div>
                  <a href="mailto:sales@sunpacpallets.com" className="text-gray-400 hover:text-white transition-colors text-xs border-b border-gray-700 hover:border-white pb-0.5">sales@sunpacpallets.com</a>
                </div>
              </div>
            </div>

            {/* 4. Service Area */}
            <div>
              <h4 className="flex items-center gap-2 text-[#FFEA05] text-[10px] font-bold uppercase tracking-widest mb-3">
                <div className="w-1.5 h-1.5 bg-[#FFEA05] rounded-full"></div> Service Area
              </h4>
              <div className="border-l-2 border-white/10 pl-4">
                <div className="flex flex-col gap-1 text-[11px] uppercase font-bold text-gray-400">
                  <span className="text-white">Ontario</span>
                  <span>Canada Wide</span>
                  <span>USA / Cross Border</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: "Start Project" CTA Module */}
          <div 
            onClick={onRequestQuote}
            className="mt-auto bg-[#1a1a1a] border border-white/10 p-6 flex items-center justify-between cursor-pointer group hover:border-[#FFEA05] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#FFEA05]/10 to-transparent transform skew-x-12 translate-x-12 group-hover:translate-x-0 transition-transform duration-500"></div>
            
            <div className="flex items-center gap-6 relative z-10">
              {/* Saw Icon Block */}
              <div className="w-12 h-12 bg-[#000] border border-white/20 flex items-center justify-center group-hover:border-[#FFEA05] transition-colors">
                <Scissors size={20} className="text-gray-500 group-hover:text-[#FFEA05] transition-colors" />
              </div>
              
              <div>
                <div className="text-white font-bold text-xl tracking-tight group-hover:text-[#FFEA05] transition-colors">Start a Milling Quote</div>
                <div className="text-gray-500 text-xs uppercase tracking-wider group-hover:text-white transition-colors">
                  Quote Engine <span className={`ml-2 ${status.isOpen ? 'text-[#FFEA05]' : 'text-red-500'}`}>● {status.text}</span>
                </div>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FFEA05] group-hover:text-black transition-all">
              <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>

        </div>

      </div>

      {/* Footer Bottom Line */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 font-mono uppercase">
        <div>
          Sun Pac Pallets Inc. © 2026 // Wood Cutting Division
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Protocol</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
          <span className="text-[#FFEA05]/50 flex items-center gap-1">
            <div className="w-1 h-1 bg-[#FFEA05] rounded-full"></div> All Systems Normal
          </span>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN PAGE ---
const WoodCuttingPage = () => {
  const [isQuoteActive, setIsQuoteActive] = useState(false);
  const calculatorRef = useRef<{ start: () => void; isStarted: () => boolean; close: () => void }>(null);

  useEffect(() => {
    if (isQuoteActive) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isQuoteActive]);

  const handleRequestQuote = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    calculatorRef.current?.start();
    setIsQuoteActive(true);
  };

  return (
    <DarkIndustrialTheme>
      <SawdustParticles />
      <IndustrialNavbar onRequestQuote={handleRequestQuote} isQuoteActive={isQuoteActive} currentPage="wood-cutting" />
      
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFEA05]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
          <div className="space-y-8 relative z-20">
            <div className="inline-flex items-center gap-2 border border-[#FFEA05]/30 bg-[#FFEA05]/10 text-[#FFEA05] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse-shadow">
              <span className="w-2 h-2 bg-[#FFEA05] rounded-full animate-pulse"></span>
              Precision Milling Division
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight">
              <span className="font-serif italic font-light opacity-80 block mb-2 text-gray-300">Custom</span>
              <span className="uppercase">Wood<br/>Processing.</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-lg leading-relaxed border-l-[3px] border-[#FFEA05] pl-8">
              From rough lumber to precision components.<br/>
              <span className="text-white font-bold">0.01mm accuracy. 50k bd.ft daily capacity.</span>
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={handleRequestQuote} 
                className="bg-[#FFEA05] text-black px-10 py-5 rounded-sm font-black text-sm uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,234,5,0.2)] flex items-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Milling Quote <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              </button>
              
              <a 
                href="#services" 
                className="border border-white/20 hover:border-[#FFEA05] text-white px-10 py-5 rounded-sm font-black text-sm uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center gap-3 group backdrop-blur-md"
              >
                View Capabilities <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </div>
          </div>
          
          {/* Quote Console */}
          <div className={`transition-all duration-500 ${isQuoteActive ? 'fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none' : 'relative'}`}>
            <div className={`transition-all duration-500 ${isQuoteActive ? 'w-full h-full md:h-auto md:max-w-4xl pointer-events-auto' : 'w-full h-[550px]'}`}>
              <div className="relative w-full h-full rounded-sm border border-[#FFEA05]/30 shadow-2xl overflow-hidden bg-[#202020] animate-border-breathe">
                <div className="beam-h top-0 left-0"></div>
                <div className="beam-v top-0 right-0" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FFEA05]"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#FFEA05]"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#FFEA05]"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FFEA05]"></div>
                <WoodCuttingQuoteForm ref={calculatorRef} isEmbedded={true} onClose={() => setIsQuoteActive(false)} onOpen={() => setIsQuoteActive(true)} />
              </div>
            </div>
          </div>
        </div>
        {isQuoteActive && <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm" onClick={() => { calculatorRef.current?.close(); setIsQuoteActive(false); }}></div>}
      </section>

      {/* Service Grid */}
      <section className="py-20 bg-[#151515]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#FFEA05] font-mono text-xs tracking-widest uppercase mb-2 block">Our Services</span>
            <h2 className="text-4xl font-black text-white uppercase">Precision Milling</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TechnicalConsole title="Precision Notching" subtitle="Go Fast 2NX Notcher" description="Automated stringer notching for true 4-way pallet entry. High-speed production with clean, consistent cuts." icon={Scissors} image="/images/wood-cutting/notching-hero.png" />
            <TechnicalConsole title="Resawing" subtitle="Wood-Mizer HR120 Resaw" description="Thin-kerf band resawing to maximize lumber yield. Converting cants and heavy timbers into precise boards." icon={Layers} image="/images/wood-cutting/resawing-process.png" />
            <TechnicalConsole title="Trimming" subtitle="Precision Trim Saws" description="Dimensional accuracy trimming for length and width. Clean end-cuts for export-grade components." icon={Ruler} image="/images/wood-cutting/ripping-station.png" />
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-[#202020] border-y border-[#FFEA05]/30 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#FFEA05]/20">
          <div><div className="text-3xl font-black text-[#FFEA05] mb-1">0.01<span className="text-sm">mm</span></div><div className="text-xs text-gray-400 uppercase tracking-widest">Tolerance</div></div>
          <div><div className="text-3xl font-black text-[#FFEA05] mb-1">50<span className="text-sm">k</span></div><div className="text-xs text-gray-400 uppercase tracking-widest">Bd. Ft. Daily</div></div>
          <div><div className="text-3xl font-black text-[#FFEA05] mb-1">SYP</div><div className="text-xs text-gray-400 uppercase tracking-widest">+ Hardwoods</div></div>
          <div><div className="text-3xl font-black text-[#FFEA05] mb-1">48<span className="text-sm">hr</span></div><div className="text-xs text-gray-400 uppercase tracking-widest">Turnaround</div></div>
        </div>
      </section>

      <IndustriesSection />
      <Footer onRequestQuote={handleRequestQuote} />
    </DarkIndustrialTheme>
  );
};

export default WoodCuttingPage;
