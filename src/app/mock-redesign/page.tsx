"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Settings,
  Leaf,
  Truck,
  Box,
  BarChart3,
  Phone,
  MapPin,
  Clock,
  PlayCircle,
  ChevronRight,
  ShieldCheck,
  Check,
  Scissors,
  Hammer,
  ArrowLeft,
  Sparkles,
  FileText,
  Upload,
  Ruler,
  ClipboardList,
  Package,
  Scale,
  ThermometerSun,
  Trees,
  ChevronDown
} from "lucide-react";
import { ProcessTimeline } from "./ProcessTimeline";

// --- MOCK THEME WRAPPER (DARK INDUSTRIAL) ---
const DarkIndustrialTheme = ({ children }: { children: React.ReactNode }) => {
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
          // Phase 3.1: Global Native Feel (Touch & Tap)
          touchAction: "manipulation", 
          WebkitTapHighlightColor: "transparent"
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};



// --- CALCULATOR COMPONENT (Ported & Styled) ---
const PalletQuoteCalculator = React.forwardRef(({ isEmbedded = false }: { isEmbedded?: boolean }, ref) => {
  const [step, setStep] = useState(1);
  const [started, setStarted] = useState(false); // NEW: Controls Idle vs Wizard state
  const totalSteps = 3;


  const [formData, setFormData] = useState({
    size: 'Standard 48x40',
    type: 'Standard GMA',
    material: 'New Lumber',
    quantity: '200-500',
    frequency: 'Monthly',
    loadWeight: '1500-2500 lbs',
    category: '',
    customSpec: {
        topDeck: { count: '', thick: '', width: '', length: '' },
        bottomDeck: { count: '', thick: '', width: '', length: '' },
        stringers: { count: '', thick: '', width: '', length: '' },
    },
    heatTreated: true,
    customSize: '',
    entryType: '4-way',
    customWeight: '',
    notes: '',
    fileName: '',
    contact: { name: '', company: '', email: '', phone: '' },
    maxLoadWeight: '',
    includeAudit: true
  });

  // Expose start function to parent via ref
  React.useImperativeHandle(ref, () => ({
    start: (isQualified: boolean) => {
      setStarted(true);
      setStep(1); // Always start at the beginning for a natural flow
      if (isQualified) {
        setFormData(prev => ({ 
            ...prev, 
            includeAudit: true 
        }));
        // We'll use a ref or state to track pre-qualification
        setPreQualified(true);
      } else {
        setPreQualified(false);
      }
    }
  }));
  
  const [preQualified, setPreQualified] = useState(false);


  const [showAdvancedSpecs, setShowAdvancedSpecs] = useState(false);

  const handleNext = () => {
    // Pro Max Logic: Auto-fill if pre-qualified when moving to Step 2
    if (step === 1 && preQualified) {
         setFormData(prev => ({
             ...prev,
             quantity: '500+',
             frequency: '5+', // Assumption for high volume
             includeAudit: true
         }));
         // Ideally show a toast here, but for now we'll let the UI speak for itself
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleTypeChange = (newType: string) => {
      setFormData(prev => ({ ...prev, type: newType }));
      if (newType === 'Custom') setShowAdvancedSpecs(true);
  };
  const handleSpecChange = (section: keyof typeof formData.customSpec, field: keyof typeof formData.customSpec.topDeck, value: string) => {
    setFormData(prev => ({
      ...prev,
      customSpec: {
        ...prev.customSpec,
        [section]: { ...prev.customSpec[section], [field]: value }
      }
    }));
  };

  // Fluid Height Transition Logic
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');

  // Fix: Scroll to top of form on step change (Mobile)
  useEffect(() => {
      if (step > 1 && contentRef.current) {
          contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }, [step]);

  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, [step, started]);
  
  const loadCategories = [
    { name: 'Food & Bev', icon: <Leaf size={20} /> },
    { name: 'Industrial', icon: <Settings size={20} /> },
    { name: 'Pharma', icon: <ShieldCheck size={20} /> },
    { name: 'Other', icon: <Scale size={20} /> }
  ];

  // IDLE STATE (Landing View)
  if (!started) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div 
            onClick={() => setStarted(true)}
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

            {/* Breathing Gradient Border - TURBO on Hover (Relaxed to 2s) */}
            {isEmbedded && (
                <div className="absolute inset-0 pointer-events-none rounded-sm overflow-hidden p-[3px]">
                    <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#FFEA05_330deg,transparent_360deg)] animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] opacity-70 group-hover:opacity-100 group-hover:brightness-150 transition-all duration-300"></div>
                    {/* Cinematic Background Image Container */}
                    <div className="absolute inset-[3px] rounded-[1px] overflow-hidden bg-[#0A0A0A]">
                        <div 
                            className="w-full h-full animate-[ken-burns_12s_ease-in-out_infinite] group-hover:scale-110 transition-transform duration-700"
                            style={{
                                backgroundImage: "url('/images/obsidian-pallet.jpg')",
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
             onClick={(e) => { e.stopPropagation(); setStarted(true); }}
             aria-label="Start Pallet Configuration"
           >
                {/* Inner Ring */}
               <div className="absolute inset-0 rounded-full border border-[#ffea05]/50 animate-[pulse_3s_infinite]"></div>
               <ClipboardList size={48} className="text-[#ffea05] drop-shadow-[0_0_10px_rgba(255,234,5,0.5)]" />
           </button>

           <div className="space-y-3 max-w-xs mx-auto">
               <h3 className="font-serif text-3xl font-bold text-white leading-tight drop-shadow-lg">
                  Build Your <br/> Pallet Quote
               </h3>
               <p className="font-sans text-sm text-gray-200 font-medium drop-shadow-md leading-relaxed">
                  Configure specs, load, and quantity in 3 simple steps.
               </p>
           </div>

           <button 
             onClick={(e) => { e.stopPropagation(); setStarted(true); }}
             className="mt-2 bg-[#ffea05] text-black px-8 py-3.5 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,234,5,0.3)] flex items-center gap-2"
           >
              Start Configuration <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </div>
    );
  }

  // WIZARD STATE
  return (
    <div 
        className={`flex flex-col ${isEmbedded ? 'bg-[#121212]/80 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 rounded-sm shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] relative overflow-hidden transition-[height] duration-500 ease-in-out' : ''}`}
        style={{ height: containerHeight }}
    >
       <div ref={contentRef} className="flex flex-col">
       {/* Header */}
       <div className="relative border-b border-white/5 bg-[#000000]/40 backdrop-blur-md">
          <div className="flex items-center justify-between p-4 relative z-10">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-6 bg-[#FFEA05] rounded-sm"></div>
               <div className="w-1.5 h-6 bg-[#FFEA05] rounded-sm"></div>
               <span className="text-white font-bold font-serif tracking-wide text-lg">Build Your Quote</span>
            </div>
            <button 
               onClick={() => { setStarted(false); setStep(1); }} 
               className="text-gray-500 hover:text-white transition-colors"
               aria-label="Exit Configuration"
            >
               <X size={18} />
            </button>
            <div className="absolute top-4 right-12 text-[10px] text-[#ffea05] font-bold font-mono tracking-widest drop-shadow-[0_0_5px_rgba(255,234,5,0.5)]">STEP {step} / 3</div>
          </div>
          
          {/* Progress Bar (Yellow Line) */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full">
            <div 
               className="h-full bg-[#FFEA05] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,234,5,0.5)]"
               style={{ width: `${(step / 3) * 100}%` }}
            >
               <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-r from-transparent to-white/50 animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
       </div>         
       {/* Body */}
        <div className="w-full p-4 relative z-10">
           
           {/* STEP 1: SPECS */}
           {step === 1 && (
             <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                     <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">Pallet Standard</label>
                     <button 
                        className="flex items-center gap-2 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#ffea05] rounded px-1 -ml-1 transition-colors" 
                        onClick={() => setFormData({...formData, heatTreated: !formData.heatTreated})}
                        aria-pressed={formData.heatTreated}
                      >
                         <span className={`text-[10px] font-bold ${formData.heatTreated ? 'text-[#ffea05]' : 'text-gray-400 group-hover:text-white transition-colors'}`}>ISPM-15 Heat Treated</span>
                         <div className={`w-8 h-4 rounded-full relative transition-colors ${formData.heatTreated ? 'bg-[#ffea05]' : 'bg-gray-700'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-black rounded-full transition-all ${formData.heatTreated ? 'left-4.5' : 'left-0.5'}`}></div>
                         </div>
                      </button>
                  </div>
                  
                   <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Standard GMA', 'Custom'].map((type) => (
                        <button 
                          key={type}
                          onClick={() => handleTypeChange(type)}
                        className={`p-2 rounded-sm border text-left transition-all active:scale-[0.98] ${formData.type === type ? 'border-[#FFEA05] bg-[#FFEA05]/10 text-white' : 'border-gray-600 bg-black/40 text-gray-300 hover:border-gray-400 hover:text-white'}`}
                        >
                           <span className="block text-xs font-bold">{type}</span>
                           <span className="text-[9px] opacity-70 block">{type === 'Standard GMA' ? '48x40 | Grocery' : 'Any Size/Spec'}</span>
                        </button>
                      ))}
                   </div>
                 </div>

               {/* STANDARD GMA INFO */}
               {formData.type === 'Standard GMA' && (
                 <div className="bg-black/20 border border-gray-700/50 p-3 rounded-sm">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Config Summary</span>
                          <p className="text-[9px] text-gray-500 italic leading-tight max-w-[200px]">Standard Grocery Manufacturers Association spec. Suitable for 95% of retail supply chains.</p>
                       </div>
                       <div className="flex items-center gap-1 text-[9px] text-[#ffea05] bg-[#ffea05]/10 px-1.5 py-0.5 rounded border border-[#ffea05]/20 animate-pulse shrink-0">
                          <CheckCircle2 size={10} />
                          <span>READY TO SHIP</span>
                       </div>
                    </div>
                     <div className="grid grid-cols-3 gap-2">
                         {['48x40', '4-WAY', 'NEW'].map((val, i) => (
                             <div key={i} className="text-center p-2 bg-black/40 rounded border border-gray-600">
                                 <span className="block text-white text-xs font-bold font-mono">{val}</span>
                             </div>
                         ))}
                    </div>
                 </div>
               )}

               {/* CUSTOM SPECS */}
               {formData.type === 'Custom' && (
                   <div className="space-y-3 pt-2 border-t border-gray-800">
                    <div className="grid grid-cols-2 gap-2">
                         <div>
                            <span className="text-[9px] text-gray-500 block mb-1 uppercase font-bold">Dimensions</span>
                            <input type="text" placeholder="e.g. 48x48" className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-sm p-2" value={formData.customSize} onChange={(e) => setFormData({...formData, customSize: e.target.value})} />
                         </div>
                         <div>
                            <span className="text-[9px] text-gray-500 block mb-1 uppercase font-bold">Entry</span>
                            <select className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-sm p-2" value={formData.entryType} onChange={(e) => setFormData({...formData, entryType: e.target.value})}>
                               <option value="4-way">4-Way</option>
                               <option value="2-way">2-Way</option>
                               <option value="any">Any</option>
                            </select>
                         </div>
                      </div>
                      <button onClick={() => setShowAdvancedSpecs(!showAdvancedSpecs)} className="text-[10px] text-[#ffea05] w-full text-right hover:underline">
                         {showAdvancedSpecs ? '- Hide Advanced Specs' : '+ Show Advanced Specs'}
                      </button>
                      
                      {showAdvancedSpecs && (
                          <div className="bg-black/30 p-2 rounded border border-gray-800 space-y-2">
                             <div className="grid grid-cols-5 gap-1 text-center mb-1 pb-1 border-b border-gray-800">
                                <span className="text-[8px] text-gray-600 font-bold uppercase col-span-1">Comp</span>
                                <span className="text-[8px] text-gray-600 font-bold uppercase">Count</span>
                                <span className="text-[8px] text-gray-600 font-bold uppercase">Thick (in)</span>
                                <span className="text-[8px] text-gray-600 font-bold uppercase">Width (in)</span>
                                <span className="text-[8px] text-gray-600 font-bold uppercase">Length (in)</span>
                             </div>
                             {[{id: 'topDeck', label: 'Top Board'}, {id: 'bottomDeck', label: 'Bottom Board'}, {id: 'stringers', label: 'Stringers'}].map((sec) => (
                                 <div key={sec.id} className="grid grid-cols-5 gap-1 items-center">
                                     <span className="text-[9px] text-gray-500 uppercase font-bold col-span-1">{sec.label}</span>
                                     {['count', 'thick', 'width', 'length'].map(f => (
                                         <input key={f} placeholder={f === 'count' ? '#' : 'in'} className="bg-[#000] border border-gray-700 text-white text-[9px] p-1 text-center rounded-sm" 
                                            value={formData.customSpec[sec.id as keyof typeof formData.customSpec][f]} 
                                            onChange={(e) => handleSpecChange(sec.id, f, e.target.value)} 
                                         />
                                     ))}
                                 </div>
                             ))}
                          </div>
                      )}
                   </div>
               )}


             </div>
           )}

          {/* STEP 2: LOAD */}
          {step === 2 && (
             <div className="space-y-3 animate-in slide-in-from-right-4 fade-in duration-300">
                <div>
                   <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Industry / Load</label>
                   <div className="grid grid-cols-4 gap-2">
                      {loadCategories.map((cat) => (
                         <button
                           key={cat.name}
                           onClick={() => setFormData({...formData, category: cat.name})}
                           className={`flex flex-col items-center justify-center p-1 rounded-sm border h-14 transition-all active:scale-[0.98] ${formData.category === cat.name ? 'border-[#FFEA05] bg-[#FFEA05]/10 text-white' : 'border-gray-600 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                         >
                            {React.cloneElement(cat.icon as React.ReactElement, { size: 16 })}
                            <span className="text-[9px] font-bold mt-1 text-center leading-tight">{cat.name}</span>
                         </button>
                      ))}
                   </div>
                    <div className="mt-2">
                       <label className="text-[9px] font-bold text-gray-300 uppercase tracking-wider block mb-1">Max Load Weight (lbs) - Optional</label>
                       <input 
                         type="text" 
                         placeholder="e.g. 2500" 
                         className="w-full bg-[#111] border border-gray-600 text-white text-base md:text-xs rounded-sm p-2 focus:border-[#FFEA05] focus:outline-none"
                         value={formData.maxLoadWeight}
                         onChange={(e) => setFormData({...formData, maxLoadWeight: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-2">
                    <div>
                       <label className="text-[9px] font-bold text-gray-300 uppercase tracking-wider block mb-1">Qty (Per Order)</label>
                       <select 
                          className="w-full bg-[#111] border border-gray-600 text-white text-base md:text-xs rounded-sm p-1.5 focus:border-[#FFEA05] focus:outline-none"
                          value={formData.quantity}
                          onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                       >
                          <option>100 - 250</option>
                          <option>250 - 500</option>
                          <option>500+</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-[9px] font-bold text-gray-300 uppercase tracking-wider block mb-1">Frequency (Monthly)</label>
                       <select 
                          className="w-full bg-[#111] border border-gray-600 text-white text-base md:text-xs rounded-sm p-1.5 focus:border-[#FFEA05] focus:outline-none"
                          value={formData.frequency}
                          onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                       >
                          <option>One Time</option>
                          <option>2-3x</option>
                          <option>4-5x</option>
                          <option>5+</option>
                       </select>
                    </div>
                 </div>
                 
                 {formData.quantity === '500+' && (
                     <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <button 
                           onClick={() => setFormData({...formData, includeAudit: !formData.includeAudit})}
                           className={`w-full flex items-center gap-2 p-2 rounded-sm border transition-all animate-pulse ${formData.includeAudit ? 'border-[#FFEA05]/50 bg-[#FFEA05]/10' : 'border-gray-700 bg-transparent opacity-60 hover:opacity-100'}`}
                        >
                           <div className={`w-3 h-3 rounded-full border border-[#FFEA05] shadow-[0_0_5px_#ffea05] transition-colors flex items-center justify-center ${formData.includeAudit ? 'bg-[#FFEA05]' : 'bg-transparent'}`}>
                              {formData.includeAudit && <CheckCircle2 size={8} className="text-black" />}
                           </div>
                           <span className={`text-[9px] font-bold uppercase tracking-wide flex-1 text-left ${formData.includeAudit ? 'text-[#FFEA05]' : 'text-gray-400'}`}>Include Free Engineering Audit</span>
                           {formData.includeAudit && <Sparkles size={10} className="text-[#FFEA05]" />}
                        </button>
                     </div>
                 )}
             </div>
           )}

          {/* STEP 3: CONTACT */}
          {step === 3 && (
             <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                {/* Contact Info */}
                <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">03. Contact Info</label>
                   <div className="grid grid-cols-2 gap-3">
                       {['name', 'company', 'email', 'phone'].map((field) => (
                           <div key={field} className="relative group">
                               <input 
                                  type={field === 'email' ? 'email' : 'text'} 
                                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
                                  value={formData.contact[field as keyof typeof formData.contact]}
                                  onChange={(e) => setFormData({...formData, contact: {...formData.contact, [field]: e.target.value}})}
                                  className="w-full bg-[#0A0A0A] border border-gray-700 text-white text-base md:text-sm rounded-sm p-3 focus:border-[#FFEA05] focus:shadow-[0_0_20px_rgba(255,234,5,0.15)] focus:outline-none placeholder:text-gray-600 transition-all" 
                                />
                                {formData.contact[field as keyof typeof formData.contact].length > 2 && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FFEA05] animate-in zoom-in spin-in-90 duration-300">
                                        <Check size={14} />
                                    </div>
                                )}
                           </div>
                       ))}
                   </div>
                </div>

                {/* Notes & Files */}
                <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">Notes & Files</label>
                   <div className="space-y-3">
                      <textarea 
                        placeholder="Forklift access, moisture content, etc." 
                        rows={3} 
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="w-full bg-[#0A0A0A] border border-gray-700 text-white text-sm rounded-sm p-3 focus:border-[#FFEA05] focus:outline-none placeholder:text-gray-600 resize-none" 
                      />
                      
                      <button 
                        className={`w-full border border-dashed rounded-sm p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group focus:outline-none focus:border-[#FFEA05] focus:ring-1 focus:ring-[#FFEA05]/50 ${formData.fileName ? 'border-[#FFEA05] bg-[#FFEA05]/10' : 'border-gray-700 hover:border-[#FFEA05] bg-[#0A0A0A]'}`}
                        onClick={() => setFormData({...formData, fileName: 'specs_v1.pdf'})}
                        aria-label={formData.fileName ? `File uploaded: ${formData.fileName}` : 'Upload Spec Sheet'}
                      >
                         <Upload size={16} className={`transition-colors ${formData.fileName ? 'text-[#FFEA05]' : 'text-gray-500 group-hover:text-[#FFEA05]'}`} />
                         <span className={`text-xs transition-colors ${formData.fileName ? 'text-[#FFEA05]' : 'text-gray-500 group-hover:text-white'}`}>
                            {formData.fileName || 'Upload Spec Sheet (Optional)'}
                         </span>
                      </button>
                   </div>
                </div>
             </div>
           )}
        </div>

       {/* Footer */}
       <div className="p-3 bg-[#000000]/60 backdrop-blur-md border-t border-white/5 flex gap-2 relative z-10">
          {step > 1 && (
             <button onClick={handleBack} className="p-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <ArrowLeft size={16} />
             </button>
          )}
          <button onClick={handleNext} className={`flex-1 bg-[#FFEA05] text-black font-bold text-xs rounded-sm py-2 hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,234,5,0.2)] hover:shadow-[0_0_20px_rgba(255,234,5,0.5)] relative overflow-hidden group ${step === 3 && formData.contact.name && formData.contact.email ? 'ring-2 ring-white/50' : ''}`}>
             {/* Shimmer Effect for Ready State */}
             {(step < 3 || (step === 3 && formData.contact.name && formData.contact.email)) && (
                 <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"></div>
             )}
             <span className="relative z-10 flex items-center gap-2">
                {step === 3 ? 'Submit Quote Request' : 'Next Step'} {step !== 3 && <ArrowRight size={14} />} {step === 3 && <CheckCircle2 size={14} />}
             </span>
          </button>
       </div>
    </div>
  </div>
  );
});

PalletQuoteCalculator.displayName = 'PalletQuoteCalculator';
const AuditModal = ({ isOpen, onClose, onQualify }: { isOpen: boolean, onClose: () => void, onQualify: (qualified: boolean) => void }) => {
    if (!isOpen) return null;

    const valueProps = [
        { 
            title: "Cost Reduction", 
            desc: "Our engineering team identifies over-spec'd designs, typically reducing lumber volume by 12-18% while maintaining safety factors.", 
            icon: <Scale className="text-[#FFEA05]" size={32} />,
            size: "col-span-2 row-span-1"
        },
        { 
            title: "Sustainability", 
            desc: "Sourced from certified Canadian Mills. Optimized for ESG reporting.", 
            icon: <Trees className="text-[#22c55e]" size={32} />,
            size: "col-span-1 row-span-1 bg-[#22c55e]/5 border border-[#22c55e]/20 hover:bg-[#22c55e]/10 hover:border-[#22c55e]/50 transition-all duration-300"
        },
        { 
            title: "Damage Control", 
            desc: "Physics-based load path analysis to prevent product damage during high-intensity logistics.", 
            icon: <ShieldCheck className="text-[#FFEA05]" size={32} />,
            size: "col-span-1 row-span-1 bg-[#222]/30"
        },
        { 
            title: "Volume Qualification", 
            desc: "Do you ship 500+ pallets per month?", 
            icon: <Package className="text-[#FFEA05]" size={32} />,
            size: "col-span-2 row-span-1 bg-gradient-to-r from-[#FFEA05]/10 via-transparent to-transparent border border-[#FFEA05]/30 hover:border-[#FFEA05] relative overflow-hidden group/vol"
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 md:p-6 border-b border-white/5 flex justify-between items-start bg-[#151515] shrink-0">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black font-sans uppercase tracking-tight text-white mb-1">Free Design Audit</h2>
                        <p className="text-gray-400 font-medium text-xs md:text-sm max-w-lg">Optimize your supply chain with engineering-grade pallet specifications.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-all transform hover:rotate-90">
                        <X size={20} />
                    </button>
                </div>

                {/* Bento Grid */}
                <div className="p-4 md:p-6 grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 overflow-y-auto">
                    {valueProps.map((prop, idx) => (
                        <div key={idx} className={`p-4 md:p-5 border border-white/5 rounded-sm flex flex-col gap-3 group hover:border-[#FFEA05]/30 transition-all ${prop.size} bg-[#181818]/50`}>
                            <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center group-hover:bg-[#FFEA05]/10 transition-all shrink-0">
                                {React.cloneElement(prop.icon as React.ReactElement, { size: 20 })}
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wide group-hover:text-[#FFEA05] transition-colors">{prop.title}</h3>
                                <p className="text-gray-500 text-[11px] leading-snug">{prop.desc}</p>
                            </div>
                            {/* Pro Max Glow Effect */}
                            {idx === 3 && <div className="absolute inset-0 bg-[#FFEA05]/5 animate-pulse rounded-sm pointer-events-none"></div>}
                        </div>
                    ))}
                </div>

                {/* Footer / Actions */}
                <div className="p-4 md:p-6 bg-[#151515] border-t border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
                    <div className="text-center md:text-left">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block mb-1">Select Your Path</span>
                        <p className="text-[10px] text-gray-400">Qualifying customers receive a full Pallet Analysis and Report.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button 
                            onClick={() => onQualify(false)}
                            className="flex-1 md:flex-none px-6 py-3 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all"
                        >
                            No, Standard Quote
                        </button>
                        <button 
                            onClick={() => onQualify(true)}
                            className="flex-1 md:flex-none px-6 py-3 bg-[#FFEA05] text-black font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(255,234,5,0.2)]"
                        >
                            Yes, I Qualify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- REST OF THE PAGE ---

interface NavbarProps {
    onRequestQuote: () => void;
}

const Navbar = ({ onRequestQuote }: NavbarProps) => {
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

    // Pro Max: Lock Scroll on Mobile Menu Open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    // Pro Max: Uppercase styling for industrial feel
    const navLinkStyle = "text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all relative group h-full flex items-center";
    
    // Pro Max: Scanner Animation for CTA
    const scanAnimation = "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-[1.5s] overflow-hidden relative";

    const services = [
        { name: "New Pallets", href: "#" },
        { name: "Custom Pallets", href: "#" },
        { name: "Heat Treated Pallets", href: "#" },
        { name: "Wood Cutting", href: "#" }
    ];

    return (
        <>
            <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${isScrolled ? 'top-2' : 'top-4'}`}>
                <div className={`max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center rounded-sm transition-all duration-300 border backdrop-blur-md shadow-2xl ${isScrolled ? 'bg-black/80 border-white/20' : 'bg-white/5 border-white/10'}`}>
                    {/* LOGO SECTION - PRO MAX UPGRADE */}
                    <div className="flex items-center gap-3 md:gap-5 group cursor-pointer relative z-50">
                        {/* "SPP" Industrial Monogram */}
                        <div className="relative w-10 h-10 md:w-12 md:h-12 bg-[#FFEA05] rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(255,234,5,0.15)] group-hover:shadow-[0_0_35px_rgba(255,234,5,0.4)] transition-all duration-500 border border-[#FFEA05]">
                             <span className="font-black text-black text-lg md:text-xl tracking-tighter transform group-hover:scale-110 transition-transform duration-300">SPP</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="font-black text-sm md:text-xl tracking-[0.15em] text-white uppercase group-hover:text-[#FFEA05] transition-colors leading-none mb-1">Sun Pac Pallets</span>
                            <span className="text-[8px] md:text-[9px] font-black tracking-[0.35em] text-[#FFEA05] uppercase opacity-90 leading-none pl-[1px] hidden md:block">Pallet Engineering</span>
                        </div>
                    </div>
                    
                    {/* DESKTOP MENU */}
                    <div className="hidden lg:flex items-center gap-12 h-full">
                        <a href="#" className={navLinkStyle}>
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFEA05] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        
                        {/* SERVICES DROPDOWN */}
                        <div 
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => setIsServicesOpen(true)}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <button className={`${navLinkStyle} ${isServicesOpen ? 'text-white' : ''}`}>
                                Services <ChevronDown size={14} className={`ml-1.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-[#FFEA05]' : 'text-gray-600'}`} />
                            </button>
                            
                            {/* DROPDOWN PANEL */}
                            <div className={`absolute top-full left-0 w-56 pt-2 transition-all duration-300 ${isServicesOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden shadow-2xl ring-1 ring-white/5">
                                    {services.map((item, idx) => (
                                        <a 
                                            key={idx} 
                                            href={item.href} 
                                            className="block px-6 py-4 text-gray-400 hover:text-black hover:bg-[#FFEA05] transition-all border-b border-white/5 last:border-0 font-bold"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <a href="#" className={navLinkStyle}>
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

            {/* MOBILE OBSIDIAN GLASS OVERLAY */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl animate-in slide-in-from-top-10 fade-in duration-300 flex flex-col pt-32 px-6">
                    {/* MENU LINKS */}
                    <div className="flex flex-col gap-6 items-center">
                        <a href="#" className="text-3xl font-black uppercase tracking-tight text-white hover:text-[#FFEA05] transition-colors">Home</a>
                        <div className="w-12 h-[1px] bg-white/10"></div>
                        
                        <div className="flex flex-col gap-4 w-full items-center">
                            <span className="text-sm font-bold text-[#FFEA05] uppercase tracking-widest">Services</span>
                             {services.map((item, idx) => (
                                <a key={idx} href={item.href} className="text-xl font-bold text-gray-400 hover:text-white transition-colors">{item.name}</a>
                            ))}
                        </div>
                        
                        <div className="w-12 h-[1px] bg-white/10 my-2"></div>
                        <a href="#" className="text-3xl font-black uppercase tracking-tight text-white hover:text-[#FFEA05] transition-colors">Contact</a>
                    </div>
                    
                    {/* MOBILE CALL TO ACTION */}
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
                             <a href="tel:6479513080" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white"><Phone size={14}/> Sales</a>
                             <a href="mailto:sales@sunpacpallets.com" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white"><CheckCircle2 size={14}/> Support</a>
                         </div>
                    </div>
                </div>
            )}
        </>
    );
};

interface HeroProps {
    calculatorRef: React.RefObject<{ start: (isQualified: boolean) => void } | null>;
}

const Hero = ({ calculatorRef }: HeroProps) => {
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
    // calculatorRef is now passed as prop

    const handleQualify = (qualified: boolean) => {
        setIsAuditModalOpen(false);
        if (calculatorRef.current) {
            calculatorRef.current.start(qualified);
        }
        // REMOVED: Smooth scroll caused jarring page jumps. User stays in context.
        // document.getElementById('quote-calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (

        <section className="relative pt-32 pb-16 md:pb-24 px-4 md:px-6 overflow-hidden min-h-[90vh] flex items-center">
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFEA05]/5 rounded-full blur-[120px] pointer-events-none"></div>

             <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10 w-full">
                 <div className="space-y-6 md:space-y-8 relative z-20">
                     <div className="inline-flex items-center gap-2 border border-[#FFEA05]/30 bg-[#FFEA05]/10 text-[#FFEA05] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(255,234,5,0.1)] backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700 animate-[pulse-shadow_3s_infinite]">
                         <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFEA05] opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFEA05]"></span>
                         </span>
                         Now Accepting New Customers For 2026
                     </div>
                     
                     <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] md:leading-[0.85] tracking-tight animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both">
                         <span className="font-serif italic font-light opacity-80 block mb-2 text-gray-300 transform -translate-x-1">Precision</span>
                         <span className="font-sans uppercase">Wood <br/> Packaging.</span>
                     </h1>
                     
                     <p className="text-gray-400 text-xl max-w-lg leading-relaxed border-l-[3px] border-[#FFEA05] pl-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both sm:text-lg">
                         We engineer custom, heat-treated pallets for high-value logistics. <br/>
                         <span className="text-white font-bold tracking-tight mt-2 block">New wood only. No scrap. No compromises.</span>
                     </p>

                     <div className="flex flex-wrap gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both relative">
                        <button 
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                calculatorRef.current?.start(false);
                            }}
                            className="bg-[#FFEA05] text-black px-10 py-5 rounded-sm font-black text-sm uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,234,5,0.2)] flex items-center gap-3 group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Request Quote <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                        </button>
                        
                        <div className="relative group/audit">
                            {/* Hover Tooltip */}
                            <div className="absolute bottom-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-80 bg-[#151515] border border-[#FFEA05] p-6 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 pointer-events-none group-hover/audit:opacity-100 group-hover/audit:translate-y-[-10px] transition-all duration-300 z-[60]">
                                <div className="text-center">
                                    <h4 className="text-[#FFEA05] font-black text-sm uppercase tracking-wider mb-2">Unlock Engineering Insights</h4>
                                    <p className="text-gray-300 text-xs leading-relaxed">See if you qualify for a free pallet optimization audit.</p>
                                </div>
                                {/* Tooltip Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-[#151515] border-r border-b border-[#FFEA05] rotate-45 -translate-y-2"></div>
                            </div>

                            <button 
                                onClick={() => setIsAuditModalOpen(true)}
                                className="border border-white/20 hover:border-[#FFEA05] text-white px-10 py-5 rounded-sm font-black text-sm uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center gap-3 group backdrop-blur-md relative overflow-hidden active:scale-95"
                            >
                                 <PlayCircle className="text-[#FFEA05] group-hover:rotate-12 transition-transform duration-500" size={24} /> 
                                 Free Design Audit
                            </button>
                        </div>
                     </div>
                 </div>

                 {/* EMBEDDED CALCULATOR */}
                 <div id="quote-calculator" className="relative animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                    <PalletQuoteCalculator ref={calculatorRef} isEmbedded={true} />
                 </div>
             </div>

             {/* AUDIT MODAL */}
             <AuditModal 
                isOpen={isAuditModalOpen} 
                onClose={() => setIsAuditModalOpen(false)} 
                onQualify={handleQualify}
             />
        </section>
    );
};



const EfficiencySection = () => {
    const [rotation, setRotation] = useState({ x: 20, y: -30 });
    const [isDragging, setIsDragging] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;
        
        setRotation(prev => ({
            x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)), // Invert Y axis natural feel
            y: prev.y + deltaX * 0.5
        }));
        
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: any) => {
        setIsDragging(true);
        if (e.touches && e.touches[0]) {
             const touch = e.touches[0];
             lastMousePos.current = { x: touch.clientX, y: touch.clientY };
        }
    };

    const handleTouchMove = (e: any) => {
        if (!isDragging) return;
        if (e.touches && e.touches[0]) {
            const touch = e.touches[0];
            const deltaX = touch.clientX - lastMousePos.current.x;
            const deltaY = touch.clientY - lastMousePos.current.y;
            
            setRotation(prev => ({
                x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)), 
                y: prev.y + deltaX * 0.5
            }));
            
            lastMousePos.current = { x: touch.clientX, y: touch.clientY };
        }
    };

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Background Map/Grid Trace */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-[linear-gradient(to_right,rgba(0,0,0,1),transparent),url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                
                {/* Text Content */}
                <div>
                     <span className="text-[#00FF94] font-mono text-xs uppercase tracking-[0.2em] mb-4 block animate-pulse">
                        ● Material Efficiency
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-[0.9] mb-8">
                        Optimize <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Your Load</span>
                    </h2>
                    <div className="space-y-8">
                        <div className="border-l-2 border-[#00FF94] pl-6">
                            <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                                100% NEW LUMBER
                                <span className="bg-[#00FF94] text-black text-[10px] px-2 py-0.5 rounded font-mono font-bold">CERTIFIED</span>
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                We never recycle old cores. Every pallet is built from fresh spruce-pine-fir for predictable strength and zero contamination risks.
                            </p>
                        </div>
                         <div className="border-l-2 border-white/10 pl-6 group hover:border-[#FFEA05] transition-colors duration-300">
                            <h4 className="text-white font-bold text-xl mb-2 group-hover:text-[#FFEA05] transition-colors">
                                WEIGHT REDUCTION
                            </h4>
                             <div className="flex items-end gap-3 mb-2">
                                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#00FF94] to-emerald-800 font-mono">
                                    -15%
                                </span>
                                <span className="text-gray-500 font-mono text-sm mb-2">AVG. SAVINGS</span>
                             </div>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                Our PDS (Pallet Design System) analysis identifies structural excesses, trimming fat without compromising static load capacity.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive Visual: 3D Pallet Schematic */}
                <div 
                    className="relative h-[500px] w-full bg-[#111] rounded-lg border border-white/5 overflow-hidden cursor-grab active:cursor-grabbing group select-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseUp}
                >
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,148,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,148,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    
                    {/* Hint Overlay */}
                    <div className="absolute top-4 right-4 z-20 pointer-events-none flex items-center gap-2 opacity-50">
                        <div className="bg-[#00FF94] w-2 h-2 rounded-full animate-pulse"></div>
                        <span className="text-[#00FF94] text-[10px] font-mono uppercase tracking-widest">Hold Click to Rotate</span>
                    </div>

                    {/* Scanner Bar Animation */}
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00FF94] shadow-[0_0_20px_#00FF94] animate-[scan_3s_ease-in-out_infinite] pointer-events-none z-10"></div>

                    {/* 3D Pallet Container */}
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 pointer-events-none" style={{ perspective: '1000px' }}>
                         <div 
                            className="w-full h-full transform-style-3d transition-transform duration-75 ease-out"
                            style={{ 
                                transform: `translate(-50%, -50%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
                            }}
                         >
                            
                            {/* Layer 1: Top Deck (7 Boards with Spacing) */}
                            <div className="absolute inset-0 translate-z-[50px] transform-style-3d">
                                <div className="w-full h-full flex justify-between">
                                    {[...Array(7)].map((_, i) => (
                                        <div key={`top-${i}`} className="h-full w-[9%] bg-[#00FF94]/10 border border-[#00FF94]/50 shadow-[0_0_10px_rgba(0,255,148,0.2)]"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Layer 2: Stringers (3 Beams) */}
                            <div className="absolute inset-0 translate-z-[25px] transform-style-3d">
                                <div className="w-full h-full flex flex-col justify-between">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={`stringer-${i}`} className="w-full h-[15%] bg-emerald-900/60 border border-[#00FF94]/50 shadow-[0_0_10px_rgba(0,255,148,0.1)]"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Layer 3: Bottom Deck (3 Boards) */}
                             <div className="absolute inset-0 translate-z-0 transform-style-3d opacity-80">
                                <div className="w-full h-full flex justify-between gap-1">
                                     <div className="h-full w-[20%] bg-[#00FF94]/10 border border-[#00FF94]/40"></div>
                                     <div className="h-full w-[20%] bg-[#00FF94]/10 border border-[#00FF94]/40"></div>
                                     <div className="h-full w-[20%] bg-[#00FF94]/10 border border-[#00FF94]/40"></div>
                                </div>
                            </div>

                         </div>
                    </div>

                    {/* Data Points (Static Overlay) */}
                    <div className="absolute top-1/3 left-10 bg-black/80 backdrop-blur border-l-2 border-[#00FF94] px-4 py-2 pointer-events-none">
                        <div className="text-[10px] text-[#00FF94] font-mono mb-1">STATIC LOAD</div>
                        <div className="text-white font-bold">2,500 LBS</div>
                    </div>
                     <div className="absolute bottom-1/3 right-10 bg-black/80 backdrop-blur border-r-2 border-[#00FF94] px-4 py-2 text-right pointer-events-none">
                        <div className="text-[10px] text-[#00FF94] font-mono mb-1">MATERIAL</div>
                        <div className="text-white font-bold">SPF KD-HT</div>
                    </div>

                </div>
            </div>
        </section>
    );
};


const Footer = ({ onRequestQuote }: { onRequestQuote: () => void }) => {
    const [isCustomSubject, setIsCustomSubject] = useState(false);
    const [subject, setSubject] = useState("");
    const [status, setStatus] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: "CHECKING..." });
    
    // Industrial "Select" implementation
    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "custom") {
            setIsCustomSubject(true);
            setSubject("");
        } else {
            setSubject(e.target.value);
        }
    };

    // Real-time Operation Status Logic
    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            const day = now.getDay(); // 0 = Sun, 6 = Sat
            const hour = now.getHours();
            
            // Mon(1) - Sat(6), 7am - 4pm (16:00)
            const isOpenDay = day >= 1 && day <= 6;
            const isOpenHour = hour >= 7 && hour < 16;
            
            if (isOpenDay && isOpenHour) {
                setStatus({ isOpen: true, text: "ONLINE" });
            } else {
                // Determine next opening
                let nextDay = "TOMORROW";
                if (day === 6 && hour >= 16) nextDay = "MONDAY"; // Sat after close -> Mon
                if (day === 0) nextDay = "TOMORROW"; // Sun -> Mon
                
                setStatus({ isOpen: false, text: `OFFLINE • OPENS ${nextDay} 7AM` });
            }
        };
        
        checkStatus();
        const interval = setInterval(checkStatus, 60000); // Update every min
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="bg-[#080808] border-t border-white/10 pt-20 pb-12 relative overflow-hidden text-sm">
             {/* Tech Grid Background (Subtle) */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,234,5,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,234,5,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-16 items-start">
                
                {/* Column 1: Compact Inquiry Form (Span 5) */}
                <div className="lg:col-span-5">
                    <div className="bg-[#111] border-l-4 border-[#FFEA05] p-6 shadow-2xl relative group">
                        <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#FFEA05]/20 rounded-tr-xl group-hover:border-[#FFEA05] transition-colors duration-500"></div>
                        
                        <div className="mb-6">
                            <h3 className="text-2xl font-serif text-white tracking-tight">Quick Inquiry</h3>
                            <p className="text-gray-500 text-xs mt-1">Direct channel to engineering sales support.</p>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <input type="text" className="w-full bg-[#050505] border border-white/10 text-white px-3 py-2.5 focus:border-[#FFEA05] focus:outline-none transition-colors rounded-none placeholder-gray-600 text-sm" placeholder="NAME" />
                                </div>
                                <div>
                                    <input type="email" className="w-full bg-[#050505] border border-white/10 text-white px-3 py-2.5 focus:border-[#FFEA05] focus:outline-none transition-colors rounded-none placeholder-gray-600 text-sm" placeholder="EMAIL" />
                                </div>
                            </div>
                            
                            <div className="relative">
                                {isCustomSubject ? (
                                    <div className="relative animate-in fade-in zoom-in-95 duration-200">
                                        <input 
                                            type="text" 
                                            className="w-full bg-[#050505] border border-[#FFEA05] text-white px-3 py-2.5 focus:outline-none rounded-none placeholder-gray-500"
                                            placeholder="Type specific subject..."
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            autoFocus
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => { setIsCustomSubject(false); setSubject(""); }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FFEA05]"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                         <select 
                                            className="w-full bg-[#050505] border border-white/10 text-white px-3 py-2.5 focus:border-[#FFEA05] focus:outline-none transition-colors appearance-none rounded-none text-gray-300 cursor-pointer"
                                            onChange={handleSubjectChange}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>SELECT SUBJECT...</option>
                                            <option value="quote">New Order Request</option>
                                            <option value="cutting">Wood Cutting Service</option>
                                            <option value="logistics">Logistics / Shipping</option>
                                            <option value="billing">Billing Inquiry</option>
                                            <option value="custom" className="text-[#FFEA05] font-bold">» Custom (Type your own)</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <ArrowRight size={12} className="rotate-90" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <textarea rows={3} className="w-full bg-[#050505] border border-white/10 text-white px-3 py-2.5 focus:border-[#FFEA05] focus:outline-none transition-colors resize-none rounded-none placeholder-gray-600 text-base md:text-sm" placeholder="MESSAGE DETAILS..."></textarea>

                            {/* Compact File Upload */}
                            <div className="border border-dashed border-white/10 bg-white/5 py-4 text-center hover:border-[#FFEA05] hover:bg-[#FFEA05]/5 transition-all cursor-pointer">
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest group-hover:text-[#FFEA05] transition-colors flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border border-current flex items-center justify-center rounded-sm">+</div> Attach File
                                </span>
                            </div>

                            <button className="w-full bg-[#FFEA05] hover:bg-[#ebd700] text-black font-black uppercase tracking-[0.1em] py-3 text-xs transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(255,234,5,0.2)]">
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
                            {/* Animated Pallet Icon Block */}
                            <div className="w-12 h-12 bg-[#000] border border-white/20 flex items-center justify-center group-hover:border-[#FFEA05] transition-colors relative">
                                {/* Simulated Pallet Icon using DIVs */}
                                <div className="w-6 h-1 bg-gray-500 group-hover:bg-[#FFEA05] absolute top-[18px]"></div>
                                <div className="w-6 h-1 bg-gray-500 group-hover:bg-[#FFEA05] absolute bottom-[18px]"></div>
                                <div className="w-1 h-3 bg-gray-600 group-hover:bg-[#FFEA05]/80 absolute left-[12px]"></div>
                                <div className="w-1 h-3 bg-gray-600 group-hover:bg-[#FFEA05]/80 absolute right-[12px]"></div>
                                <div className="w-1 h-3 bg-gray-600 group-hover:bg-[#FFEA05]/80 absolute"></div>
                            </div>
                            
                            <div>
                                <div className="text-white font-bold text-xl tracking-tight group-hover:text-[#FFEA05] transition-colors">Start a Configuration</div>
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
                     Sun Pac Pallets Inc. © 2026 // EST. 2002
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

export default function MockRedesignPage() {
  const calculatorRef = useRef<{ start: (isQualified: boolean) => void }>(null);

  const handleRequestQuote = () => {
      // 1. Scroll to top immediately
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // 2. Start calculator (defaults to Step 1)
      if (calculatorRef.current) {
          calculatorRef.current.start(false);
      }
  };

  return (
    <DarkIndustrialTheme>
      <Navbar onRequestQuote={handleRequestQuote} />
      <Hero calculatorRef={calculatorRef} />
      <ProcessTimeline />
      <EfficiencySection />
      <Footer onRequestQuote={handleRequestQuote} />
    </DarkIndustrialTheme>
  );
}
