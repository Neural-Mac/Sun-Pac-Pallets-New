'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Menu, X, PlayCircle, ChevronDown, Ruler, Factory, Scissors, Layers } from 'lucide-react';

const HexCodes = {
  surfaceDark: '#202020',
  surfaceCard: '#2a2a2a',
  accentYellow: '#ffea05',
  goldDark: '#827703',
  goldLight: '#a39603',
  white: '#ffffff',
  accentGreen: '#22c55e',
  freshPine: '#f4e4bc',
  heartwood: '#8b5a2b',
  burntWood: '#1a1a1a'
};

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

// --- TECHNICAL CONSOLE CARD COMPONENT ---
const TechnicalConsole = ({ title, description, icon: Icon, stats, image }: any) => {
  return (
    <div className="group relative w-full h-[500px] perspective-1000">
      <div className="relative w-full h-full duration-500 preserve-3d group-hover:my-rotate-y-180">
        
        {/* FRONT: The Technical Visual */}
        <div className="absolute inset-0 bg-[#202020] border border-[#a39603]/30 rounded-xl overflow-hidden shadow-2xl backface-hidden flex flex-col">
           {/* Technical Grid Overlay */}
           <div className="absolute inset-0 opacity-20" style={{ 
               backgroundImage: `radial-gradient(${HexCodes.goldDark} 1px, transparent 1px)`, 
               backgroundSize: '20px 20px' 
           }}></div>

           {/* Hero Image Area */}
           <div className="h-64 relative overflow-hidden border-b border-[#a39603]/30">
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 opacity-60 mix-blend-overlay group-hover:opacity-100 group-hover:mix-blend-normal group-hover:brightness-110" style={{ backgroundImage: `url('${image}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#202020] to-transparent transition-opacity duration-500 group-hover:opacity-30"></div>
              
              {/* Technical Overlay Graphics */}
              <div className="absolute top-4 right-4 animate-subtle-pulse">
                 <Icon size={48} className="text-[#ffea05] opacity-80" />
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-xs text-[#ffea05] tracking-widest">
                 SPEC_V.2026 // {title.toUpperCase()}
              </div>
              
              {/* Animated Beams */}
              <div className="beam-h top-0 left-0" style={{ animationDelay: '0s' }}></div>
              <div className="beam-v top-0 right-0" style={{ animationDelay: '1.5s' }}></div>
           </div>

           {/* Content Area */}
           <div className="p-6 relative z-10 flex-1 flex flex-col justify-between">
              <div>
                  <h3 className="font-serif text-2xl text-white mb-2">{title}</h3>
                  <div className="w-12 h-1 bg-[#ffea05] mb-4"></div>
                  <p className="font-sans text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// --- WOOD CUTTING QUOTE FORM COMPONENT ---
const WoodCuttingQuoteForm = ({ onClose, isEmbedded = false }: { onClose?: () => void, isEmbedded?: boolean }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    const [formData, setFormData] = useState({
        serviceType: 'Notching', // Notching, Resawing, Ripping, Grooving, Custom
        materialSource: 'Provided by Sun Pac', // Provided by Sun Pac, Customer Supplied
        species: 'SYP',
        dimensions: { length: '', width: '', thickness: '' },
        quantity: '',
        cutPattern: '',
        contact: { name: '', company: '', email: '', phone: '' }
    });

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const progressPercentage = (step / totalSteps) * 100;

    return (
        <div className={`flex flex-col h-full bg-[#202020] text-white ${isEmbedded ? 'bg-transparent' : 'rounded-sm overflow-hidden'}`}>
             {/* Header */}
            <div className={`p-4 border-b border-gray-700 flex justify-between items-center ${isEmbedded ? 'bg-black/60' : 'bg-[#252525]'} shrink-0`}>
                <div className="flex flex-col w-full mr-4">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif text-md text-white">Milling Quote Builder</h3>
                        <span className="text-[#a39603] text-[10px] font-mono">STEP {step} / {totalSteps}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#ffea05] transition-all duration-500 ease-out" 
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-gray-400 hover:text-white shrink-0">
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Content Scroller */}
            <div className="p-4 overflow-y-auto custom-scrollbar grow flex flex-col gap-4">
                
                {/* STEP 1: SERVICE & MATERIAL */}
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                         <label className="text-lg font-stencil text-[#ffea05] tracking-wider block mb-2 hot-brand">01. Service Scope</label>
                         
                         <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Primary Processing</span>
                            <div className="grid grid-cols-2 gap-2">
                                {['Notching', 'Resawing', 'Ripping', 'Grooving'].map((service) => (
                                    <button
                                        key={service}
                                        onClick={() => setFormData({...formData, serviceType: service})}
                                        className={`p-3 rounded-sm text-center transition-all border ${formData.serviceType === service ? 'border-[#ffea05] bg-[#ffea05]/10 text-white' : 'border-gray-600 bg-black/20 text-gray-400 hover:bg-black/40'}`}
                                    >
                                        <span className="text-xs font-bold block">{service}</span>
                                    </button>
                                ))}
                            </div>
                         </div>

                         <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Material Source</span>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setFormData({...formData, materialSource: 'Provided by Sun Pac'})}
                                    className={`p-3 rounded-sm text-left transition-all border flex items-center gap-2 ${formData.materialSource === 'Provided by Sun Pac' ? 'border-[#ffea05] bg-[#ffea05]/10 text-white' : 'border-gray-600 bg-black/20 text-gray-400 hover:bg-black/40'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full border border-[#ffea05] flex items-center justify-center ${formData.materialSource === 'Provided by Sun Pac' ? 'bg-[#ffea05]' : 'bg-transparent'}`}></div>
                                    <span className="text-[10px] font-bold">Sun Pac Supplies</span>
                                </button>
                                <button
                                    onClick={() => setFormData({...formData, materialSource: 'Customer Supplied'})}
                                    className={`p-3 rounded-sm text-left transition-all border flex items-center gap-2 ${formData.materialSource === 'Customer Supplied' ? 'border-[#ffea05] bg-[#ffea05]/10 text-white' : 'border-gray-600 bg-black/20 text-gray-400 hover:bg-black/40'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full border border-[#ffea05] flex items-center justify-center ${formData.materialSource === 'Customer Supplied' ? 'bg-[#ffea05]' : 'bg-transparent'}`}></div>
                                    <span className="text-[10px] font-bold">Customer Supplied</span>
                                </button>
                            </div>
                         </div>

                         {formData.materialSource === 'Provided by Sun Pac' && (
                             <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Wood Species</span>
                                <select 
                                    className="input-compact"
                                    value={formData.species}
                                    onChange={(e) => setFormData({...formData, species: e.target.value})}
                                >
                                    <option value="SYP">Southern Yellow Pine (SYP)</option>
                                    <option value="SPF">Spruce-Pine-Fir (SPF)</option>
                                    <option value="Hardwood">Mixed Hardwood</option>
                                    <option value="Plywood">Plywood / OSB</option>
                                </select>
                             </div>
                         )}
                    </div>
                )}

                {/* STEP 2: SPECS */}
                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <label className="text-lg font-stencil text-[#ffea05] tracking-wider block mb-2 hot-brand">02. Specifications</label>
                        
                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Finished Dimensions</span>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <span className="text-[9px] text-gray-500 block">LENGTH</span>
                                    <input type="text" placeholder='48"' className="input-compact" value={formData.dimensions.length} onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, length: e.target.value}})} />
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-500 block">WIDTH</span>
                                    <input type="text" placeholder='3.5"' className="input-compact" value={formData.dimensions.width} onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, width: e.target.value}})} />
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-500 block">THICK</span>
                                    <input type="text" placeholder='1.5"' className="input-compact" value={formData.dimensions.thickness} onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, thickness: e.target.value}})} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Processing Notes / Pattern</span>
                            <textarea 
                                className="input-compact resize-none" 
                                rows={3}
                                placeholder="Describe the cut. E.g. 'Notch at 9-inch centers', 'Rip to exact width', 'Smooth 4 sides'..."
                                value={formData.cutPattern}
                                onChange={(e) => setFormData({...formData, cutPattern: e.target.value})}
                            ></textarea>
                        </div>

                        <div>
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Quantity Needed</span>
                             <input type="text" placeholder="e.g. 5,000 linear ft or 2,000 pcs" className="input-compact" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
                        </div>
                    </div>
                )}

                {/* STEP 3: CONTACT */}
                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <label className="text-lg font-stencil text-[#ffea05] tracking-wider block mb-2 hot-brand">03. Project Details</label>
                        
                        <div className="space-y-2">
                            <input type="text" placeholder="Your Name" className="input-compact" value={formData.contact.name} onChange={(e) => setFormData({...formData, contact: {...formData.contact, name: e.target.value}})} />
                            <input type="text" placeholder="Company Name" className="input-compact" value={formData.contact.company} onChange={(e) => setFormData({...formData, contact: {...formData.contact, company: e.target.value}})} />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="email" placeholder="Email" className="input-compact" value={formData.contact.email} onChange={(e) => setFormData({...formData, contact: {...formData.contact, email: e.target.value}})} />
                                <input type="tel" placeholder="Phone" className="input-compact" value={formData.contact.phone} onChange={(e) => setFormData({...formData, contact: {...formData.contact, phone: e.target.value}})} />
                            </div>
                        </div>

                        <div className="p-3 bg-[#a39603]/10 border border-[#a39603]/30 rounded-sm">
                            <span className="text-[10px] font-bold text-[#ffea05] uppercase block mb-1">Production Estimate</span>
                            <p className="text-gray-400 text-xs">
                                Based on your specs, our engineering team will provide a per-unit cost and lead time estimate within 24 hours.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Navigation */}
            <div className={`p-4 border-t border-gray-700 ${isEmbedded ? 'bg-transparent' : 'bg-[#252525]'} shrink-0 flex gap-2`}>
                {step > 1 && (
                    <button 
                        onClick={prevStep}
                        className="px-3 py-2 rounded-sm border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-colors"
                    >
                        <ChevronDown size={16} className="rotate-90" />
                    </button>
                )}
                
                {step < totalSteps ? (
                    <button 
                         onClick={nextStep}
                         className="flex-1 btn-primary py-2 rounded-sm text-xs font-bold flex items-center justify-center gap-2"
                    >
                        Next Step <ArrowRight size={14} />
                    </button>
                ) : (
                    <button 
                        className="flex-1 btn-primary py-2 rounded-sm text-xs font-bold flex items-center justify-center gap-2"
                        onClick={onClose}
                    >
                        Submit Request <CheckCircle2 size={14} />
                    </button>
                )}
            </div>
        </div>
    );
};

const WoodCuttingPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // UI States
    const [heroConsoleActive, setHeroConsoleActive] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToHero = () => {
        setHeroConsoleActive(true);
        const heroSection = document.getElementById('hero-console');
        if (heroSection) {
             heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen font-sans text-white selection:bg-[#ffea05] selection:text-black wood-grain" style={{ backgroundColor: HexCodes.burntWood }}>
            <SawdustParticles />
            
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Adamina&family=Poppins:wght@300;400;500;700&family=Black+Ops+One&display=swap');
                .font-serif { font-family: 'Adamina', serif; }
                .font-sans { font-family: 'Poppins', sans-serif; }
                .font-stencil { font-family: 'Black Ops One', system-ui; letter-spacing: 0.1em; }
                
                .wood-grain {
                  background-color: #1a1a1a;
                  background-image: repeating-linear-gradient(
                    45deg,
                    rgba(255, 255, 255, 0.02) 0px,
                    rgba(255, 255, 255, 0.02) 1px,
                    transparent 1px,
                    transparent 8px
                  ),
                  radial-gradient(circle at 50% 50%, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 1));
                }
                
                /* Reusing styles from page.tsx for consistency */
                .hot-brand { text-shadow: 0 0 2px rgba(255, 72, 0, 0.6), 0 0 5px rgba(255, 136, 0, 0.4); }
                .btn-primary { background-color: ${HexCodes.accentYellow}; color: #000000; font-weight: 700; transition: all 0.2s ease; }
                .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(255, 234, 5, 0.3); }
                .input-compact {
                   background-color: #151515; border: 1px solid #333; color: white;
                   border-radius: 0.25rem; padding: 0.5rem; font-size: 0.85rem; width: 100%; transition: border-color 0.2s;
                }
                .input-compact:focus { outline: none; border-color: ${HexCodes.accentYellow}; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }

                @keyframes float {
                  0% { transform: translateY(0) translateX(0); opacity: 0; }
                  10% { opacity: 0.2; }
                  90% { opacity: 0.2; }
                  100% { transform: translateY(100px) translateX(20px); opacity: 0; }
                }
                .sawdust-particle {
                  animation: float infinite linear;
                }

                @keyframes beam-h { 0% { left: -100%; opacity: 0; } 50% { opacity: 0.6; } 100% { left: 100%; opacity: 0; } }
                @keyframes beam-v { 0% { top: -100%; opacity: 0; } 50% { opacity: 0.6; } 100% { top: 100%; opacity: 0; } }
                .beam-h { position: absolute; height: 2px; width: 100%; background: linear-gradient(90deg, transparent, #ffea05, transparent); animation: beam-h 4s linear infinite; box-shadow: 0 0 10px rgba(255, 234, 5, 0.4); }
                .beam-v { position: absolute; width: 2px; height: 100%; background: linear-gradient(180deg, transparent, #ffea05, transparent); animation: beam-v 4s linear infinite; box-shadow: 0 0 10px rgba(255, 234, 5, 0.4); }
                
                @keyframes subtle-pulse {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.8; transform: scale(1.02); }
                }
                .animate-subtle-pulse {
                   animation: subtle-pulse 3s infinite ease-in-out;
                }

                .btn-wood {
                    background: linear-gradient(to bottom, #f4e4bc, #e8d090);
                    color: #3e2723;
                    border: 1px solid #8b5a2b;
                    text-shadow: 0 1px 0 rgba(255,255,255,0.4);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                .btn-wood:hover {
                    background: linear-gradient(to bottom, #fff5d7, #f4e4bc);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
                }
                .animate-border-breathe {
                     animation: border-breathe 3s infinite ease-in-out;
                }
                @keyframes border-breathe {
                  0% { border-color: rgba(163, 150, 3, 0.3); }
                  50% { border-color: rgba(255, 234, 5, 0.8); }
                  100% { border-color: rgba(163, 150, 3, 0.3); }
                }
            `}</style>
            
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-[#202020]/90 backdrop-blur-md border-b border-[#a39603]/30' : 'py-6 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-auto flex items-center justify-center mr-2">
                             <div className="border-2 border-[#ffea05] px-2 py-1 bg-black/20 backdrop-blur-sm">
                                <span className="font-stencil text-2xl text-[#ffea05] tracking-widest leading-none drop-shadow-[0_0_5px_rgba(255,234,5,0.5)]">SPP</span>
                             </div>
                        </div>
                        <div>
                            <span className="font-serif text-xl tracking-tight block leading-none text-white"><a href="/mock">Sun Pac Pallets</a></span>
                            <span className="font-sans text-[10px] tracking-widest text-[#a39603] uppercase font-bold block mt-1">Pallet Engineering</span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                        <a href="/mock" className="hover:text-[#ffea05] transition-colors">Home</a>
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-[#ffea05] transition-colors py-2">
                                Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                            </button>
                            <div className="absolute top-full left-0 mt-0 w-56 bg-[#1a1a1a] border border-[#a39603]/30 shadow-2xl rounded-sm overflow-hidden opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                                <a href="#" className="block px-5 py-3 hover:bg-[#a39603]/10 hover:text-[#ffea05] border-b border-white/5">New Pallets</a>
                                <a href="#" className="block px-5 py-3 hover:bg-[#a39603]/10 hover:text-[#ffea05] border-b border-white/5">Custom Pallets</a>
                                <a href="#" className="block px-5 py-3 hover:bg-[#a39603]/10 hover:text-[#ffea05] border-b border-white/5">Heat Treated Pallets</a>
                                <a href="/mock/wood-cutting" className="block px-5 py-3 hover:bg-[#a39603]/10 hover:text-[#ffea05]">Wood Cutting</a>
                            </div>
                        </div>
                        <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="hover:text-[#ffea05] transition-colors">Contact Us</button>
                        <button onClick={scrollToHero} className="btn-wood px-6 py-2.5 rounded-sm flex items-center gap-2 shadow-[0_0_15px_rgba(255,234,5,0.2)] hover:shadow-[0_0_25px_rgba(255,234,5,0.4)] font-bold text-sm text-[#3e2723] hover:text-[#3e2723]">
                            Request Quote
                        </button>
                    </div>
                    <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
                
                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-[#202020] border-b border-[#a39603]/30 p-4 md:hidden flex flex-col gap-4 shadow-2xl">
                        <a href="/mock" className="text-gray-300 hover:text-[#ffea05]">Home</a>
                        <a href="/mock/wood-cutting" className="text-[#ffea05] font-bold">Wood Cutting</a>
                        <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="text-gray-300 hover:text-[#ffea05] text-left">Contact Us</button>
                        <button onClick={scrollToHero} className="btn-wood py-3 text-center rounded-sm font-bold text-[#3e2723]">Request Quote</button>
                    </div>
                )}
            </nav>

            <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
                
                {/* HERO SECTION Split */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    <div className="text-left animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full border border-[#a39603]/50 bg-[#a39603]/10 text-[#ffea05] text-xs font-bold tracking-wider uppercase">
                             Precision Milling Division
                        </div>
                        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-[1.1]">
                            Custom Wood <br />
                            <span className="text-[#ffea05]">Processing</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-xl mb-8 leading-relaxed">
                            From rough lumber to precision components. We handle high-volume notching, ripping, and resawing with 0.01mm accuracy.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <button onClick={scrollToHero} className="btn-wood px-8 py-3 rounded-sm text-lg flex items-center justify-center gap-2 font-bold shadow-xl hover:scale-105 transition-transform">
                                Start Milling Quote <ArrowRight size={20} />
                            </button>
                            <button className="px-8 py-3 rounded-sm text-lg border border-[#a39603] text-[#ffea05] hover:bg-[#a39603]/10 transition-colors font-medium">
                                View Capabilities
                            </button>
                        </div>
                    </div>

                    {/* HERO CONSOLE (Form Integration) */}
                    <div id="hero-console" className="relative h-[550px] w-full max-w-lg mx-auto scroll-mt-32">
                        <div className={`
                            relative w-full h-full rounded-xl border border-gray-600 shadow-2xl overflow-hidden transition-all duration-500
                            bg-[#202020] animate-border-breathe
                         `}>
                             {/* Decorative Beams (Always Visible) */}
                             <div className="beam-h top-0 left-0" style={{ animationDelay: '0s' }}></div>
                             <div className="beam-v top-0 right-0" style={{ animationDelay: '1s' }}></div>
                             <div className="beam-h bottom-0 left-0" style={{ animationDelay: '2s' }}></div>
                             <div className="beam-v top-0 left-0" style={{ animationDelay: '3s' }}></div>
                             
                             {/* Corner Accents */}
                             <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ffea05]"></div>
                             <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ffea05]"></div>
                             <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#ffea05]"></div>
                             <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ffea05]"></div>

                             {/* CONTENT SWITCHER */}
                             {!heroConsoleActive ? (
                                 /* IDLE STATE */
                                 <div className="w-full h-full relative" onClick={() => setHeroConsoleActive(true)}>
                                    <div className="absolute inset-0 bg-[url('/mock/sawmill-warehouse-bright.png')] bg-cover bg-center opacity-70 mix-blend-normal"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#202020] to-transparent"></div>
                                    
                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center cursor-pointer group">
                                         <div className="w-24 h-24 rounded-full bg-[#ffea05]/10 border border-[#ffea05] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(255,234,5,0.1)] animate-pulse">
                                             <Scissors size={40} className="text-[#ffea05]" />
                                         </div>
                                         <h3 className="text-3xl font-serif text-white mb-2 hot-brand group-hover:text-[#ffea05] transition-colors">Start Quote</h3>
                                         <p className="text-gray-400 max-w-xs text-sm mb-8">Calculate costs for notching, ripping, and custom milling orders instantly.</p>
                                         <span className="text-[#ffea05] text-xs font-bold uppercase tracking-widest border-b border-[#ffea05] pb-1">Click to Configure</span>
                                    </div>
                                 </div>
                             ) : (
                                 /* ACTIVE STATE: THE FORM */
                                 <WoodCuttingQuoteForm isEmbedded={true} onClose={() => setHeroConsoleActive(false)} />
                             )}
                        </div>
                    </div>
                </div>

                {/* Service Grid - Technical Consoles */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <TechnicalConsole 
                        title="Precision Notching" 
                        description="Automated stringer notching for true 4-way pallet entry. We ensure clean, consistent cuts that optimize forklift handling and reduce product damage."
                        icon={Scissors}
                        image="/mock/notching.png"
                    />
                    <TechnicalConsole 
                        title="Resawing & Yield" 
                        description="Maximizing lumber yield through thin-kerf band resawing. We convert large cants into precise board components (deck boards, stringers) with minimal waste."
                        icon={Layers}
                        image="/mock/resawing.png"
                    />
                    <TechnicalConsole 
                        title="Ripping & Dressing" 
                        description="Gang-ripping for width accuracy and surface dressing for clean, smooth components. Ideal for high-value crates and export-grade packaging."
                        icon={Factory}
                        image="/mock/ripping.png"
                    />
                    <TechnicalConsole 
                        title="Cut-to-Size Grooving" 
                        description="Custom dados, banding grooves, and specialized profiles. We mill to your exact spec for interlocking crates, strapping channels, and unique assembly requirements."
                        icon={Ruler}
                        image="/mock/grooving.png"
                    />
                </div>

                {/* Metrics / Capabilities Banner */}
                <div className="bg-[#202020] border-y border-[#a39603]/30 py-12">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#a39603]/20">
                      <div>
                          <div className="text-3xl font-stencil text-[#ffea05] mb-1">0.01<span className="text-sm">mm</span></div>
                          <div className="text-xs text-gray-400 uppercase tracking-widest">Tolerance</div>
                      </div>
                      <div>
                          <div className="text-3xl font-stencil text-[#ffea05] mb-1">50<span className="text-sm">k</span></div>
                          <div className="text-xs text-gray-400 uppercase tracking-widest">Bd. Ft. Daily</div>
                      </div>
                      <div>
                          <div className="text-3xl font-stencil text-[#ffea05] mb-1">SYP</div>
                          <div className="text-xs text-gray-400 uppercase tracking-widest">+ Hardwoods</div>
                      </div>
                      <div>
                          <div className="text-3xl font-stencil text-[#ffea05] mb-1">48<span className="text-sm">hr</span></div>
                          <div className="text-xs text-gray-400 uppercase tracking-widest">Turnaround</div>
                      </div>
                   </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-serif text-white mb-8">Ready to Optimize Your Lumber Supply?</h2>
                    <button 
                        onClick={() => setModalOpen(true)}
                        className="btn-wood px-10 py-4 rounded-sm text-xl font-bold inline-flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform"
                    >
                        Get Milling Estimate <ArrowRight size={24} />
                    </button>
                    <p className="mt-4 text-gray-500 text-sm">Industrial volume discounts available for recurring orders.</p>
                </div>

            </div>

            {/* Quote Modal (Bottom Button Trigger) */}
            {modalOpen && (
                 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
                    <div className="relative bg-[#202020] w-full max-w-xl rounded-sm border border-[#a39603] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <WoodCuttingQuoteForm onClose={() => setModalOpen(false)} />
                    </div>
                 </div>
            )}
        </div>
    );
};

export default WoodCuttingPage;
