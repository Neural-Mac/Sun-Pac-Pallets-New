"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Ruler, 
  ThermometerSun, 
  Trees, 
  Scissors, 
  CheckCircle2, 
  PlayCircle,
  Menu,
  X,
  ChevronDown, 
  Package,
  Truck,
  Scale,
  Sparkles,
  Volume2,
  Cpu,
  Upload, 
  FileText,
  ClipboardList, 
  ArrowLeft,
  Leaf,
  DollarSign,
  ShieldCheck,
  Hammer,
  MoveRight,
  MapPin,
  Factory,
  Globe,
  Feather,
  Recycle,
  BarChart3,
  Phone,
  Clock,
  Mail
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

// --- STYLES & CONFIGURATION ---
const HexCodes = {
  surfaceDark: '#202020',
  surfaceCard: '#2a2a2a',
  accentYellow: '#ffea05',
  goldDark: '#827703',
  goldLight: '#a39603',
  white: '#ffffff',
  accentGreen: '#22c55e' 
};

// --- AUDIT PITCH MODAL ---
const AuditPitchModal = ({ onClose, onQualify, onStandard }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#1a1a1a] w-full max-w-lg rounded-xl border border-[#a39603] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-[#a39603]/30 bg-[#202020]">
          <div className="flex justify-between items-start">
             <div>
                <h3 className="font-serif text-2xl text-white mb-2">Unlock Engineering Insights</h3>
                <p className="text-gray-400 text-sm">See if you qualify for a free pallet optimization audit.</p>
             </div>
             <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20}/></button>
          </div>
        </div>

        {/* Value Props */}
        <div className="p-6 space-y-6">
           <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#252525] p-3 rounded border border-gray-700 text-center flex flex-col items-center h-full">
                 <div className="w-10 h-10 rounded-full bg-[#ffea05]/10 flex items-center justify-center mb-3 text-[#ffea05]"><DollarSign size={20}/></div>
                 <span className="block text-[10px] text-[#ffea05] font-bold uppercase mb-1">Cost Reduction</span>
                 <p className="text-[9px] text-gray-400 leading-tight">Reduce wood waste & shipping weight.</p>
              </div>
              <div className="bg-[#252525] p-3 rounded border border-gray-700 text-center flex flex-col items-center h-full">
                 <div className="w-10 h-10 rounded-full bg-[#ffea05]/10 flex items-center justify-center mb-3 text-[#ffea05]"><Leaf size={20}/></div>
                 <span className="block text-[10px] text-[#ffea05] font-bold uppercase mb-1">Sustainability</span>
                 <p className="text-[9px] text-gray-400 leading-tight">Lower carbon footprint with optimized material.</p>
              </div>
              <div className="bg-[#252525] p-3 rounded border border-gray-700 text-center flex flex-col items-center h-full">
                 <div className="w-10 h-10 rounded-full bg-[#ffea05]/10 flex items-center justify-center mb-3 text-[#ffea05]"><ShieldCheck size={20}/></div>
                 <span className="block text-[10px] text-[#ffea05] font-bold uppercase mb-1">Damage Control</span>
                 <p className="text-[9px] text-gray-400 leading-tight">Custom load path analysis to prevent loss.</p>
              </div>
           </div>

           {/* The Gate */}
           <div className="bg-[#202020] border border-[#a39603]/50 rounded p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffea05] to-transparent opacity-50"></div>
              <span className="block text-[#ffea05] font-bold uppercase tracking-widest text-[10px] mb-4">Qualification Check</span>
              <h4 className="text-white text-lg font-serif mb-6">Do you ship 500+ pallets per month?</h4>
              
              <div className="flex gap-3">
                 <button 
                   onClick={onStandard}
                   className="flex-1 py-3 rounded border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-all text-sm font-bold"
                 >
                   No, Standard Quote
                 </button>
                 <button 
                   onClick={onQualify}
                   className="flex-1 py-3 rounded bg-[#ffea05] text-black font-bold hover:bg-white transition-all text-sm shadow-[0_0_15px_rgba(255,234,5,0.3)]"
                 >
                   Yes, I Qualify
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// --- PROCESS TIMELINE COMPONENT ---
const ProcessTimeline = () => {
  const steps = [
    { 
      id: 1, 
      title: "Sustainable Sourcing", 
      desc: "Premium SPF lumber from certified mills.",
      icon: <Trees size={24} />,
      img: "https://images.unsplash.com/photo-1610555356070-d0efb6505f81?auto=format&fit=crop&q=80&w=300"
    },
    { 
      id: 2, 
      title: "Automated Cutting", 
      desc: "High-precision saws for exact dimensions.",
      icon: <Scissors size={24} />,
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=300"
    },
    { 
      id: 3, 
      title: "Assembly & Heat Treat", 
      desc: "Automated nailing & ISPM-15 kiln drying.",
      icon: <Hammer size={24} />,
      img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=300"
    },
    { 
      id: 4, 
      title: "Fast Delivery", 
      desc: "Quick turnaround for GTA partners.",
      icon: <Truck size={24} />,
      img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <section className="py-24 bg-[#202020] border-t border-[#a39603]/10 overflow-hidden relative">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#a39603]/5 to-transparent pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                <span className="text-[#a39603] font-bold tracking-widest text-xs uppercase mb-2 block">Our Process</span>
                <h2 className="font-serif text-4xl text-white">Engineered for Speed</h2>
             </div>
             <p className="text-gray-400 text-sm max-w-md">
                From raw timber to your loading dock, our automated lines ensure consistency and scale that manual shops can't match.
             </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
             {/* Connecting Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gray-800 -z-10"></div>

             {steps.map((step, index) => (
                <div key={step.id} className="relative group">
                   {/* Icon Bubble */}
                   <div className="w-24 h-24 bg-[#2a2a2a] border border-gray-700 rounded-full flex items-center justify-center mb-6 z-10 relative group-hover:border-[#ffea05] group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <div className="text-gray-400 group-hover:text-[#ffea05] transition-colors">
                         {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#202020] border border-gray-700 rounded-full flex items-center justify-center text-[10px] font-mono text-gray-500">
                         {step.id}
                      </div>
                   </div>

                   {/* Content */}
                   <div className="pr-4">
                      <h3 className="font-serif text-lg text-white mb-2 group-hover:text-[#ffea05] transition-colors">{step.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">{step.desc}</p>
                      
                      {/* Image Reveal on Hover */}
                      <div className="h-32 w-full rounded-sm overflow-hidden opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                         <img src={step.img} alt={step.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

// --- SUSTAINABILITY & EFFICIENCY SECTION (Option 3 Replaced) ---
const SustainabilitySection = () => {
  return (
    <section className="relative bg-[#151515] overflow-hidden border-t border-gray-800 py-24">
       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Visual Graphic */}
          <div className="relative group">
             <div className="relative z-10 bg-[#202020] border border-gray-700 rounded-sm p-8 shadow-2xl">
                {/* Abstract Pallet Wireframe Graphic */}
                <div className="w-full aspect-[4/3] border border-gray-600 relative overflow-hidden flex items-center justify-center bg-[#1a1a1a]">
                   {/* Green Energy Flow Animation */}
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.15)_0%,_transparent_50%)] animate-pulse"></div>
                   
                   {/* Simplified Pallet Icon/Graphic */}
                   <div className="relative z-20 text-center">
                      <div className="border-2 border-gray-500 w-32 h-4 mb-2 mx-auto bg-gray-600"></div>
                      <div className="flex justify-between w-32 mx-auto mb-2">
                         <div className="w-4 h-12 bg-[#ffea05] opacity-80"></div>
                         <div className="w-4 h-12 bg-[#ffea05] opacity-80"></div>
                         <div className="w-4 h-12 bg-[#ffea05] opacity-80"></div>
                      </div>
                      <div className="border-2 border-gray-500 w-32 h-4 mx-auto bg-gray-600"></div>
                      
                      {/* Floating Stats */}
                      <div className="absolute -right-12 -top-8 bg-black/80 border border-green-500/50 px-3 py-1 rounded text-[10px] text-green-400 font-mono shadow-lg flex items-center gap-1">
                         <Feather size={10} /> -15% WEIGHT
                      </div>
                      <div className="absolute -left-12 -bottom-4 bg-black/80 border border-[#ffea05]/50 px-3 py-1 rounded text-[10px] text-[#ffea05] font-mono shadow-lg flex items-center gap-1">
                         <BarChart3 size={10} /> OPTIMIZED LOAD
                      </div>
                   </div>
                </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-green-500/30 rounded-tl-3xl -z-10"></div>
             <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#ffea05]/30 rounded-br-3xl -z-10"></div>
          </div>

          {/* RIGHT: Content */}
          <div>
             <div className="flex items-center gap-2 mb-4 text-green-500">
                <Leaf size={18} />
                <span className="font-bold tracking-widest text-xs uppercase">Sustainable Engineering</span>
             </div>
             <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
                Efficiency <br/> by <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Design.</span>
             </h2>
             <p className="text-gray-400 text-sm leading-relaxed mb-8">
                We don't just build pallets; we engineer them to do more with less. By customizing the design to your exact load requirements, we reduce unnecessary wood volume without compromising strength.
             </p>

             <div className="space-y-6">
                <div className="flex gap-4 group">
                   <div className="w-10 h-10 rounded bg-green-900/20 border border-green-500/30 flex items-center justify-center shrink-0 group-hover:border-green-500 transition-colors">
                      <Feather size={20} className="text-green-500" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-sm mb-1 group-hover:text-green-400 transition-colors">Weight Reduction</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Lighter pallets mean lower shipping costs and reduced fuel consumption for every mile traveled.</p>
                   </div>
                </div>
                
                <div className="flex gap-4 group">
                   <div className="w-10 h-10 rounded bg-[#ffea05]/10 border border-[#ffea05]/30 flex items-center justify-center shrink-0 group-hover:border-[#ffea05] transition-colors">
                      <Trees size={20} className="text-[#ffea05]" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-sm mb-1 group-hover:text-[#ffea05] transition-colors">Material Optimization</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Custom engineering reduces overall wood waste by calculating the exact board footage needed.</p>
                   </div>
                </div>

                <div className="flex gap-4 group">
                   <div className="w-10 h-10 rounded bg-gray-800 border border-gray-600 flex items-center justify-center shrink-0 group-hover:border-white transition-colors">
                      <ShieldCheck size={20} className="text-white" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-sm mb-1 group-hover:text-white transition-colors">Engineered Durability</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Built right the first time to extend lifecycle and reduce replacement frequency.</p>
                   </div>
                </div>
             </div>
          </div>

       </div>
    </section>
  );
};

// --- INDUSTRIAL FOOTER SECTION ---
const IndustrialFooter = () => {
   const [subject, setSubject] = useState('');
   const [customSubject, setCustomSubject] = useState('');
   const [isCustomInput, setIsCustomInput] = useState(false);

   return (
      <footer className="bg-[#151515] border-t border-gray-800 relative">
         {/* Footer Grid */}
         <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-start">
            
            {/* LEFT: Quick Contact Form */}
            <div className="bg-[#202020] border border-gray-700 rounded-sm p-8 shadow-2xl relative overflow-hidden">
               {/* Accent Bar */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffea05] to-[#a39603]"></div>
               
               <h3 className="font-serif text-2xl text-white mb-6">Quick Inquiry</h3>
               
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <input type="text" placeholder="Name" className="w-full bg-[#151515] border border-gray-700 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-[#ffea05] transition-colors" />
                     <input type="email" placeholder="Email" className="w-full bg-[#151515] border border-gray-700 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-[#ffea05] transition-colors" />
                  </div>
                  
                  {!isCustomInput ? (
                     <select 
                       className="w-full bg-[#151515] border border-gray-700 rounded-sm p-3 text-sm text-gray-400 focus:outline-none focus:border-[#ffea05] transition-colors"
                       value={subject}
                       onChange={(e) => {
                          if (e.target.value === 'Custom') {
                             setIsCustomInput(true);
                             setSubject('Custom');
                          } else {
                             setSubject(e.target.value);
                          }
                       }}
                     >
                        <option value="">Select Subject...</option>
                        <option value="New Order Request">New Order Request</option>
                        <option value="Wood Cutting">Wood Cutting</option>
                        <option value="Custom">Custom (Type your own)</option>
                        <option value="Logistics / Shipping">Logistics / Shipping</option>
                        <option value="Billing Inquiry">Billing Inquiry</option>
                        <option value="General Support">General Support</option>
                     </select>
                  ) : (
                     <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Enter your specific subject..." 
                          className="w-full bg-[#151515] border border-[#ffea05] rounded-sm p-3 text-sm text-white focus:outline-none animate-in fade-in zoom-in-95"
                          value={customSubject}
                          onChange={(e) => setCustomSubject(e.target.value)}
                          autoFocus
                        />
                        <button 
                           onClick={() => {
                              setIsCustomInput(false);
                              setSubject('');
                              setCustomSubject('');
                           }}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                           title="Back to list"
                        >
                           <X size={16} />
                        </button>
                     </div>
                  )}

                  <textarea placeholder="How can we help?" rows="4" className="w-full bg-[#151515] border border-gray-700 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-[#ffea05] resize-none transition-colors"></textarea>
                  
                  {/* File Upload Drop Zone */}
                  <div className="border border-dashed border-gray-600 rounded-sm p-4 text-center hover:bg-[#252525] transition-colors cursor-pointer group">
                     <Upload size={20} className="mx-auto text-gray-500 mb-2 group-hover:text-[#ffea05]" />
                     <span className="text-xs text-gray-400 group-hover:text-white">Drag & drop files or click to upload</span>
                  </div>

                  <button className="w-full bg-[#ffea05] text-black font-bold py-3 rounded-sm hover:bg-white transition-colors shadow-lg">
                     Send Message
                  </button>
               </div>
            </div>

            {/* RIGHT: HQ & Map Info */}
            <div className="flex flex-col justify-between h-full">
               <div>
                  <span className="text-[#a39603] font-bold tracking-widest text-xs uppercase mb-2 block">Production Site</span>


                  <div className="space-y-8">
                     <div className="flex gap-4 group">
                        <div className="w-12 h-12 bg-[#2a2a2a] rounded flex items-center justify-center text-[#ffea05] shrink-0 border border-gray-700 group-hover:border-[#ffea05] transition-colors">
                           <MapPin size={24} />
                        </div>
                        <div>
                           <span className="block text-gray-400 text-xs uppercase tracking-wide mb-1">Facility Address</span>
                           <p className="text-white text-lg font-medium leading-relaxed">
                              8999 Concession Rd 5<br/>
                              Uxbridge, ON L9P 1R1
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-4 group">
                        <div className="w-12 h-12 bg-[#2a2a2a] rounded flex items-center justify-center text-[#ffea05] shrink-0 border border-gray-700 group-hover:border-[#ffea05] transition-colors">
                           <Phone size={24} />
                        </div>
                        <div>
                           <span className="block text-gray-400 text-xs uppercase tracking-wide mb-1">Dispatch & Sales</span>
                           <p className="text-white text-lg font-medium hover:text-[#ffea05] cursor-pointer transition-colors">
                              647-794-0848
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-4 group">
                        <div className="w-12 h-12 bg-[#2a2a2a] rounded flex items-center justify-center text-[#ffea05] shrink-0 border border-gray-700 group-hover:border-[#ffea05] transition-colors">
                           <Clock size={24} />
                        </div>
                        <div>
                           <span className="block text-gray-400 text-xs uppercase tracking-wide mb-1">Operating Hours</span>
                           <p className="text-white text-sm">
                              <span className="text-white font-bold block">Mon - Fri:</span> 7:00 AM - 5:00 PM EST
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Simple Map Graphic/Texture at Bottom Right */}
               <div className="mt-12 opacity-20">
                  <div className="w-full h-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Ontario_in_Canada.svg/1200px-Ontario_in_Canada.svg.png')] bg-cover bg-center grayscale contrast-200 rounded border border-white/20"></div>
               </div>
            </div>

         </div>

         {/* Bottom Bar */}
         <div className="border-t border-gray-800 bg-[#111] py-6">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
               <p>© 2026 SUN PAC PALLETS. ALL RIGHTS RESERVED.</p>
               <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-[#ffea05]">PRIVACY POLICY</a>
                  <a href="#" className="hover:text-[#ffea05]">TERMS OF SERVICE</a>
                  <a href="#" className="hover:text-[#ffea05]">SITEMAP</a>
               </div>
            </div>
         </div>
      </footer>
   );
};

// --- REUSABLE FORM COMPONENT (WIZARD MODE - COMPACT) ---
const PalletConfigurationForm = ({ isEmbedded = false, onClose, initialAuditState = false }: { isEmbedded?: boolean; onClose?: () => void; initialAuditState?: boolean }) => {
  // Wizard State
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Form State
  const [formData, setFormData] = useState({
    type: 'Standard GMA', 
    heatTreated: true, 
    customSize: '', 
    entryType: '4-way', 
    customSpec: {
      topDeck: { count: '', thick: '', width: '', length: '' },
      bottomDeck: { count: '', thick: '', width: '', length: '' },
      stringers: { count: '', thick: '', width: '', length: '' },
    },
    category: '',
    customWeight: '',
    quantity: '', 
    frequency: '',
    notes: '',
    auditRequested: false, 
    contact: { name: '', company: '', phone: '', email: '' },
    fileName: '' 
  });

  const [showAdvancedSpecs, setShowAdvancedSpecs] = useState(false);
  const [flashAudit, setFlashAudit] = useState(false); // For gold flash effect
  
  // AI State
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  // Update form if initialAuditState changes
  useEffect(() => {
    if (initialAuditState) {
        setFormData(prev => ({ 
            ...prev, 
            quantity: '500+', 
            auditRequested: true,
            frequency: '5+' 
        }));
    }
  }, [initialAuditState]);

  // Flash effect when 500+ is selected manually
  useEffect(() => {
    if (formData.quantity === '500+') {
       setFlashAudit(true);
       setTimeout(() => setFlashAudit(false), 1000); // Remove flash class after 1s
    }
  }, [formData.quantity]);

  // Helper to safely play audio
  const playAudio = (base64Audio: string) => {
    if (!base64Audio) return;
    const audioData = atob(base64Audio);
    const arrayBuffer = new ArrayBuffer(audioData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < audioData.length; i++) {
      uint8Array[i] = audioData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  const handleSpecChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      customSpec: {
        ...prev.customSpec,
        [section]: { ...prev.customSpec[section], [field]: value }
      }
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  // Handle Type Change with Auto-Expand logic
  const handleTypeChange = (newType) => {
    setFormData(prev => ({ ...prev, type: newType }));
    if (newType === 'Custom') {
      setShowAdvancedSpecs(true);
    }
  };

  const runEngineeringAnalysis = async (e) => {
    e.stopPropagation(); 
    if (!formData.category && !formData.customWeight && !formData.notes) {
      setError("Please add Load Category or Notes first.");
      return;
    }
    setIsAnalyzing(true);
    setError('');
    setAiAnalysis('');
    setAudioUrl(null);

    const apiKey = ""; 
    const systemPrompt = "You are a Senior Logistics Engineer at Sun Pac Pallets. Analyze the user's pallet requirements. Output a concise, technical assessment with these headers: 'RECOMMENDED MATERIAL', 'STRUCTURAL RISK', and 'OPTIMIZATION TIP'. Keep it professional, industrial, and brief.";
    
    let specDetails = "Standard GMA";
    if (formData.type === 'Custom') {
      specDetails = `Custom Spec: ${formData.customSize} ${formData.entryType}`;
    }
    
    const userQuery = `Project Specs - Type: ${specDetails}, Heat Treated: ${formData.heatTreated}, Load: ${formData.category || 'Unspecified'} (${formData.customWeight || 'N/A'} lbs), Notes: ${formData.notes || 'None'}.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        }
      );

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setAiAnalysis(text);
        generateAudioBrief(text);
      }
    } catch (err) {
      console.error(err);
      setError("Analysis system offline.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateAudioBrief = async (textToRead) => {
    const apiKey = ""; 
    const cleanText = textToRead.replace(/\*\*/g, '').replace(/\*/g, '');
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Briefing: " + cleanText }] }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Fenrir" } } }
            }
          })
        }
      );
      const data = await response.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
        setAudioUrl(data.candidates[0].content.parts[0].inlineData.data);
      }
    } catch (err) {
      console.error("TTS Error:", err);
    }
  };

  // Wizard Navigation Handlers
  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Progress Bar Calculation
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className={`flex flex-col h-full bg-[#202020] text-white ${isEmbedded ? 'bg-transparent' : ''}`}>
      
      {/* Header */}
      <div className={`p-3 border-b border-gray-700 flex justify-between items-center ${isEmbedded ? 'bg-black/60' : 'bg-[#252525]'} shrink-0`}>
        <div className="flex flex-col w-full mr-4">
          <div className="flex justify-between items-center mb-1">
             <h3 className="font-serif text-md text-white">Build Your Quote</h3>
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

      {/* Step Content */}
      <div className="p-3 overflow-y-auto custom-scrollbar grow flex flex-col gap-3">
        
        {/* STEP 1: TYPE & DIMENSIONS */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="flex justify-between items-start">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">01. Pallet Specs</label>
                {/* ISPM-15 Toggle - Compact Header Location */}
                <div 
                   className="flex items-center gap-2 cursor-pointer group" 
                   onClick={() => setFormData({...formData, heatTreated: !formData.heatTreated})}
                 >
                    <span className={`text-[10px] font-bold ${formData.heatTreated ? 'text-[#ffea05]' : 'text-gray-500'}`}>ISPM-15 Heat Treated</span>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${formData.heatTreated ? 'bg-[#ffea05]' : 'bg-gray-600'}`}>
                       <div className={`absolute top-0.5 w-3 h-3 bg-black rounded-full transition-all ${formData.heatTreated ? 'left-4.5' : 'left-0.5'}`}></div>
                    </div>
                 </div>
             </div>

             <div className="grid grid-cols-2 gap-2">
                  {['Standard GMA', 'Custom'].map((type) => (
                    <button 
                      key={type} 
                      onClick={() => handleTypeChange(type)}
                      className={`p-3 rounded-sm text-left transition-all border ${formData.type === type ? 'border-[#ffea05] bg-[#ffea05]/10 text-white' : 'border-gray-600 bg-black/20 text-gray-300 hover:bg-black/40'}`}
                    >
                      <span className="block font-bold text-xs mb-0.5">{type === 'Standard GMA' ? 'Standard GMA' : 'Custom Spec'}</span>
                      <span className="block text-[9px] text-gray-500">{type === 'Standard GMA' ? '48" x 40" 4-Way' : 'Any Size / Design'}</span>
                    </button>
                  ))}
             </div>

             {/* STANDARD GMA INFO CARD */}
             {formData.type === 'Standard GMA' && (
                <div className="bg-black/20 border border-gray-700/50 p-3 rounded-sm animate-in fade-in zoom-in-95 duration-200">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Configuration Summary</span>
                      <div className="flex items-center gap-1 text-[9px] text-[#ffea05] bg-[#ffea05]/10 px-1.5 py-0.5 rounded border border-[#ffea05]/20 animate-pulse">
                         <CheckCircle2 size={10} />
                         <span>READY TO SHIP</span>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-black/30 rounded border border-gray-700/30">
                         <span className="block text-gray-500 text-[9px] uppercase">Dims</span>
                         <span className="block text-white text-xs font-bold font-mono">48x40</span>
                      </div>
                      <div className="text-center p-2 bg-black/30 rounded border border-gray-700/30">
                         <span className="block text-gray-500 text-[9px] uppercase">Entry</span>
                         <span className="block text-white text-xs font-bold font-mono">4-WAY</span>
                      </div>
                      <div className="text-center p-2 bg-black/30 rounded border border-gray-700/30">
                         <span className="block text-gray-500 text-[9px] uppercase">Grade</span>
                         <span className="block text-white text-xs font-bold font-mono">NEW</span>
                      </div>
                   </div>
                   <div className="mt-2 text-[9px] text-gray-500 text-center italic">
                      Standard Grocery Manufacturers Association spec. Suitable for 95% of retail supply chains.
                   </div>
                </div>
             )}

             {/* Custom Inputs */}
             {formData.type === 'Custom' && (
               <div className="space-y-2 pt-2 border-t border-gray-700/50">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-gray-500 uppercase font-bold mb-1 block">Dimensions</label>
                      <input type="text" placeholder="e.g. 48x48" className="input-compact" value={formData.customSize} onChange={(e) => setFormData({...formData, customSize: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[9px] text-gray-500 uppercase font-bold mb-1 block">Entry</label>
                      <select className="input-compact" value={formData.entryType} onChange={(e) => setFormData({...formData, entryType: e.target.value})}>
                          <option value="4-way">4-Way</option>
                          <option value="2-way">2-Way</option>
                          <option value="Any">Any</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Advanced Toggle */}
                  <button 
                    onClick={() => setShowAdvancedSpecs(!showAdvancedSpecs)}
                    className="text-[9px] text-[#ffea05] hover:underline flex items-center gap-1 mt-1 w-full justify-end"
                  >
                    {showAdvancedSpecs ? 'Hide Specs' : 'Show Specs'}
                  </button>

                  {/* TABLE LAYOUT FOR SPECS */}
                  {showAdvancedSpecs && (
                    <div className="bg-black/20 p-2 rounded-sm border border-gray-700/50">
                      {/* Grid Header */}
                      <div className="grid grid-cols-5 gap-1 mb-2 text-[9px] font-bold text-gray-500 uppercase text-center">
                         <div className="text-left pl-1">Component</div>
                         <div>Count</div>
                         <div>Thick</div>
                         <div>Width</div>
                         <div>Length</div>
                      </div>

                      {/* Top Boards */}
                      <div className="grid grid-cols-5 gap-1 mb-2 items-center">
                         <div className="text-[9px] text-gray-300 font-bold uppercase text-left pl-1 truncate">Top Boards</div>
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.topDeck.count} onChange={(e) => handleSpecChange('topDeck', 'count', e.target.value)} />
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.topDeck.thick} onChange={(e) => handleSpecChange('topDeck', 'thick', e.target.value)} />
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.topDeck.width} onChange={(e) => handleSpecChange('topDeck', 'width', e.target.value)} />
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.topDeck.length} onChange={(e) => handleSpecChange('topDeck', 'length', e.target.value)} />
                      </div>

                      {/* Bottom Boards */}
                      <div className="grid grid-cols-5 gap-1 mb-2 items-center">
                         <div className="text-[9px] text-gray-300 font-bold uppercase text-left pl-1 truncate">Btm Boards</div>
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.bottomDeck.count} onChange={(e) => handleSpecChange('bottomDeck', 'count', e.target.value)} />
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.bottomDeck.thick} onChange={(e) => handleSpecChange('bottomDeck', 'thick', e.target.value)} />
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.bottomDeck.width} onChange={(e) => handleSpecChange('bottomDeck', 'width', e.target.value)} />
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.bottomDeck.length} onChange={(e) => handleSpecChange('bottomDeck', 'length', e.target.value)} />
                      </div>

                      {/* Stringers */}
                      <div className="grid grid-cols-5 gap-1 items-center">
                         <div className="text-[9px] text-gray-300 font-bold uppercase text-left pl-1 truncate">Stringers</div>
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.stringers.count} onChange={(e) => handleSpecChange('stringers', 'count', e.target.value)} />
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.stringers.thick} onChange={(e) => handleSpecChange('stringers', 'thick', e.target.value)} />
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.stringers.width} onChange={(e) => handleSpecChange('stringers', 'width', e.target.value)} />
                         <input className="input-compact text-center h-6 p-0" value={formData.customSpec.stringers.length} onChange={(e) => handleSpecChange('stringers', 'length', e.target.value)} />
                      </div>
                    </div>
                  )}
               </div>
             )}
          </div>
        )}

        {/* STEP 2: LOAD & QUANTITY */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
             <div>
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">02. Load Details</label>
               <div className="grid grid-cols-4 gap-2 mb-2">
                  {[
                    { name: 'General Retail', icon: <Package size={14} /> },
                    { name: 'Heavy Machinery', icon: <Truck size={14} /> },
                    { name: 'Food / Pharma', icon: <ThermometerSun size={14} /> },
                    { name: 'Other', icon: <Scale size={14} /> }
                  ].map((cat) => (
                    <button 
                      key={cat.name}
                      onClick={() => setFormData({...formData, category: cat.name})}
                      className={`flex flex-col items-center justify-center p-2 rounded-sm border transition-all h-16 ${formData.category === cat.name ? 'border-[#ffea05] bg-[#ffea05]/10 text-white' : 'border-gray-600 bg-black/20 text-gray-400 hover:bg-black/40'}`}
                    >
                        {cat.icon}
                        <span className="text-[9px] font-medium mt-1 text-center leading-none">{cat.name.split(' ')[0]}</span>
                    </button>
                  ))}
               </div>
               <input type="number" placeholder="Max Load Weight (lbs) - Optional" className="input-compact" value={formData.customWeight} onChange={(e) => setFormData({...formData, customWeight: e.target.value})} />
             </div>

             <div>
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Volume</label>
               <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[9px] text-gray-500 block mb-1">QTY PER ORDER</span>
                    <select className="input-compact" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})}>
                        <option value="">Select Qty</option>
                        <option value="100-250">100 - 250</option>
                        <option value="200-500">200 - 500</option>
                        <option value="500+">500+</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block mb-1">FREQUENCY (MONTHLY)</span>
                    <select className="input-compact" value={formData.frequency} onChange={(e) => setFormData({...formData, frequency: e.target.value})}>
                        <option value="">Select Freq</option>
                        <option value="One time">One time</option>
                        <option value="2-3x">2-3x</option>
                        <option value="4-5x">4-5x</option>
                        <option value="5+">5+</option>
                    </select>
                  </div>
               </div>
             </div>

             {/* Audit Request Toggle - Shows up if Qualified OR manually selected in modal */}
             {(formData.quantity === '500+' || formData.auditRequested) && (
               <div 
                 className={`flex items-center justify-between border p-2 rounded-sm cursor-pointer animate-in fade-in slide-in-from-top-1 transition-all duration-500 ${flashAudit ? 'bg-[#ffea05]/30 border-[#ffea05] shadow-[0_0_15px_#ffea05]' : 'border-[#ffea05]/50 bg-[#ffea05]/5 shadow-[0_0_10px_rgba(255,234,5,0.1)]'}`}
                 onClick={() => setFormData({...formData, auditRequested: !formData.auditRequested})}
               >
                  <div className="flex items-center gap-2">
                     <div className={`w-3 h-3 rounded-full border border-[#ffea05] ${formData.auditRequested ? 'bg-[#ffea05]' : 'bg-transparent'}`}></div>
                     <span className="text-[10px] font-bold text-[#ffea05] uppercase tracking-wide">
                        {formData.auditRequested ? 'Audit Included' : 'Include Free Optimization Audit'}
                     </span>
                  </div>
                  <Sparkles size={12} className="text-[#ffea05]" />
               </div>
             )}

             {/* AI Analysis Button */}
             <div className="pt-1">
                <button 
                  onClick={runEngineeringAnalysis}
                  className="w-full border border-gray-700 bg-black/30 p-1.5 rounded-sm flex items-center justify-center gap-2 text-[#ffea05] text-[10px] hover:bg-black/50 transition-colors"
                >
                  <Sparkles size={12} /> 
                  {isAnalyzing ? 'Running...' : 'Check Specs (AI)'}
                </button>
                {aiAnalysis && (
                   <div className="mt-2 p-2 bg-black/40 rounded border border-gray-700 text-[9px] text-gray-300 font-mono leading-tight">
                      {aiAnalysis}
                   </div>
                )}
             </div>
          </div>
        )}

        {/* STEP 3: CONTACT */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
             <div>
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">03. Contact Info</label>
               <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                     <input type="text" placeholder="Your Name" className="input-compact" value={formData.contact.name} onChange={(e) => handleContactChange('name', e.target.value)} />
                     <input type="text" placeholder="Company" className="input-compact" value={formData.contact.company} onChange={(e) => handleContactChange('company', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                     <input type="email" placeholder="Email" className="input-compact" value={formData.contact.email} onChange={(e) => handleContactChange('email', e.target.value)} />
                     <input type="tel" placeholder="Phone" className="input-compact" value={formData.contact.phone} onChange={(e) => handleContactChange('phone', e.target.value)} />
                  </div>
               </div>
             </div>

             <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Notes & Files</label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Forklift access, moisture content, etc." 
                  rows="2" 
                  className="input-compact resize-none mb-2"
                ></textarea>
                
                <div className="border border-dashed border-gray-600 rounded-sm p-2 text-center hover:bg-black/30 transition-colors cursor-pointer relative">
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFormData({...formData, fileName: e.target.files && e.target.files[0] ? e.target.files[0].name : ''})} />
                   <div className="flex items-center justify-center gap-2 text-gray-500">
                      {formData.fileName ? (
                         <>
                           <FileText size={14} className="text-[#ffea05]" />
                           <span className="text-[10px] text-[#ffea05] truncate">{formData.fileName}</span>
                         </>
                      ) : (
                         <>
                           <Upload size={14} />
                           <span className="text-[10px]">Upload Spec Sheet (Optional)</span>
                         </>
                      )}
                   </div>
                </div>
             </div>
          </div>
        )}

      </div>

      {/* Footer / Navigation */}
      <div className={`p-3 border-t border-gray-700 ${isEmbedded ? 'bg-transparent' : 'bg-[#252525]'} shrink-0 flex gap-2`}>
        {step > 1 && (
          <button 
            onClick={prevStep}
            className="px-3 py-2 rounded-sm border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
        )}
        
        {step < totalSteps ? (
          <button 
            onClick={nextStep}
            className={`flex-1 btn-primary py-2 rounded-sm text-xs font-bold flex items-center justify-center gap-2 ${step < totalSteps ? 'animate-pulse' : ''}`} // Beacon effect
          >
            Next <ArrowRight size={14} />
          </button>
        ) : (
          <button 
            className="flex-1 btn-primary py-2 rounded-sm text-xs font-bold flex items-center justify-center gap-2"
          >
            Submit Request <CheckCircle2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [heroConsoleActive, setHeroConsoleActive] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false); 
  const [isAuditQualified, setIsAuditQualified] = useState(false); 

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

  const scrollToHeroQualified = () => {
    setHeroConsoleActive(true);
    const heroSection = document.getElementById('hero-console');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans text-white selection:bg-[#ffea05] selection:text-black" style={{ backgroundColor: HexCodes.surfaceDark }}>
      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Adamina&family=Poppins:wght@300;400;500;700&display=swap');
        .font-serif { font-family: 'Adamina', serif; }
        .font-sans { font-family: 'Poppins', sans-serif; }
        .technical-grid {
          background-size: 40px 40px;
          background-image:
            linear-gradient(to right, rgba(163, 150, 3, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(163, 150, 3, 0.05) 1px, transparent 1px);
        }
        .btn-primary {
          background-color: ${HexCodes.accentYellow};
          color: #000000;
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 234, 5, 0.3);
        }
        .btn-outline {
          border: 1px solid ${HexCodes.goldLight};
          color: ${HexCodes.white};
          transition: all 0.2s ease;
        }
        .btn-outline:hover {
          background-color: rgba(163, 150, 3, 0.1);
          border-color: ${HexCodes.accentYellow};
        }
        .input-compact {
          background-color: #151515; border: 1px solid #333; color: white;
          border-radius: 0.25rem; padding: 0.5rem; font-size: 0.85rem; width: 100%; transition: border-color 0.2s;
        }
        .input-compact:focus { outline: none; border-color: ${HexCodes.accentYellow}; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
        @keyframes border-breathe {
          0% { border-color: rgba(163, 150, 3, 0.3); }
          50% { border-color: rgba(255, 234, 5, 0.8); }
          100% { border-color: rgba(163, 150, 3, 0.3); }
        }
        .animate-border-breathe {
           animation: border-breathe 3s infinite ease-in-out;
        }
        /* Tooltip Styles */
        .tooltip-group:hover .tooltip-content {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-[#202020]/90 backdrop-blur-md border-b border-[#a39603]/30' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <a href="/" className="hover:opacity-80 transition-opacity">
               <Logo />
            </a>
            <div>
              <span className="font-serif text-xl tracking-tight block leading-none text-white"><a href="/">Sun Pac Pallets</a></span>
              <span className="font-sans text-[10px] tracking-widest text-[#a39603] uppercase font-bold block mt-1">Pallet Engineering</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-[#ffea05] transition-colors">Home</a>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#ffea05] transition-colors py-2">
                Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-0 w-56 bg-[#1a1a1a] border border-[#a39603]/30 shadow-2xl rounded-sm overflow-hidden opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                <a href="#" className="block px-5 py-3 hover:bg-[#a39603]/10 hover:text-[#ffea05] border-b border-white/5">New Pallets</a>
                <a href="#" className="block px-5 py-3 hover:bg-[#a39603]/10 hover:text-[#ffea05] border-b border-white/5">Custom Pallets</a>
                <a href="#" className="block px-5 py-3 hover:bg-[#a39603]/10 hover:text-[#ffea05] border-b border-white/5">Heat Treated Pallets</a>
                <a href="/wood-cutting" className="block px-5 py-3 hover:bg-[#a39603]/10 hover:text-[#ffea05]">Wood Cutting</a>
              </div>
            </div>
            <a href="#" className="hover:text-[#ffea05] transition-colors">Contact Us</a>
            <button onClick={() => setModalOpen(true)} className="btn-primary px-6 py-2.5 rounded-sm flex items-center gap-2 shadow-[0_0_15px_rgba(255,234,5,0.2)] hover:shadow-[0_0_25px_rgba(255,234,5,0.4)]">
              Request Quote <ArrowRight size={16} />
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 technical-grid pointer-events-none opacity-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          
          {/* Left Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#a39603]/50 bg-[#a39603]/10 text-[#ffea05] text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ffea05]"></span>
              Now Accepting New Contracts for 2026
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl leading-[1.1]">
              Precision Wood <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Packaging.</span>
            </h1>
            <p className="font-sans text-gray-400 text-base leading-relaxed max-w-xl">
              We engineer custom, heat-treated pallets for high-value logistics. 
              New wood only. No scrap. No compromises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setModalOpen(true)} className="btn-primary px-8 py-3 rounded-sm text-lg flex items-center justify-center gap-2">
                Request Quote <ArrowRight size={20} />
              </button>
              
              {/* Free Design Audit Button - Opens Modal */}
              <div className="relative tooltip-group">
                <button 
                  onClick={() => setShowAuditModal(true)} // Open Audit Modal
                  className="btn-outline px-8 py-3 rounded-sm text-lg flex items-center justify-center gap-2 group w-full"
                >
                  <PlayCircle size={20} className="group-hover:text-[#ffea05] transition-colors" />
                  Free Design Audit
                </button>
                {/* Tooltip Content */}
                <div className="tooltip-content absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-[#1a1a1a] border border-[#ffea05] p-3 rounded-sm shadow-xl opacity-0 invisible transition-all duration-300 z-50 text-center pointer-events-none">
                   <span className="block text-[#ffea05] font-bold text-xs uppercase tracking-wide mb-1">Unlock Engineering Insights</span>
                   <span className="block text-gray-300 text-[10px] leading-tight">See if you qualify for a free pallet optimization audit.</span>
                   <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] border-b border-r border-[#ffea05] rotate-45"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 font-mono pt-2">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} color={HexCodes.goldLight} /> ISPM-15 Certified</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} color={HexCodes.goldLight} /> 48hr Prototype</span>
            </div>
          </div>

          {/* Right Column: THE CLEAN QUOTE BUILDER CARD */}
          <div id="hero-console" className="relative h-[450px] w-full max-w-lg mx-auto lg:ml-auto scroll-mt-24">
             <div className={`
                relative w-full h-full rounded-xl border border-gray-600 shadow-2xl overflow-hidden transition-all duration-500
                bg-cover bg-center animate-border-breathe
             `}
             style={{ 
               backgroundImage: !heroConsoleActive ? "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')" : 'none',
               backgroundColor: heroConsoleActive ? '#202020' : 'transparent'
             }}
             >
                {/* 1. FIX: Minimal Dark Overlay for Maximum Visibility */}
                {!heroConsoleActive && <div className="absolute inset-0 bg-black/10"></div>}
                
                {/* 2. FIX: Restored Yellow Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ffea05] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ffea05] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ffea05] pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ffea05] pointer-events-none"></div>

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col">
                   
                   {/* State 1: Idle (Inviting Card) */}
                   {!heroConsoleActive && (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-6 cursor-pointer p-8 hover:bg-black/10 transition-colors" onClick={() => setHeroConsoleActive(true)}>
                         <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-lg group relative">
                            <div className="absolute inset-0 rounded-full border border-[#ffea05] animate-ping opacity-20"></div>
                            <ClipboardList size={40} className="text-[#ffea05]" />
                         </div>
                         <div className="text-center space-y-2">
                            <span className="block font-serif text-white text-2xl font-medium drop-shadow-md">Build Your Pallet Quote</span>
                            <span className="block font-sans text-white text-sm drop-shadow-md">Configure specs, load, and quantity in 3 simple steps.</span>
                         </div>
                         <button className="btn-primary px-8 py-3 rounded-md text-sm font-bold shadow-lg">
                            Start Configuration
                         </button>
                      </div>
                   )}

                   {/* State 2: Active (Wizard) */}
                   {heroConsoleActive && (
                      <div className="w-full h-full animate-in fade-in zoom-in-95 duration-300 flex flex-col">
                         {/* We pass a new prop to check if we are in 'audit' mode, effectively controlled by state */}
                         <PalletConfigurationForm 
                            isEmbedded={true} 
                            onClose={() => setHeroConsoleActive(false)} 
                            initialAuditState={isAuditQualified} // Pass qualification state
                         />
                      </div>
                   )}
                </div>
             </div>
          </div>

        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#1a1a1a] relative border-t border-[#a39603]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-serif text-4xl mb-4">Tactical Capabilities</h2>
            <p className="font-sans text-gray-400 max-w-2xl">
              We specialize in custom specification. Every pallet is engineered to reduce 
              shipping weight while maximizing load stability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#202020] border border-[#a39603]/20 p-8 rounded-sm hover:border-[#ffea05] hover:-translate-y-1 transition-all group cursor-default">
              <div className="w-12 h-12 bg-[#a39603]/10 rounded-sm flex items-center justify-center mb-6 text-[#ffea05]">
                <Ruler size={24} />
              </div>
              <h3 className="font-serif text-2xl mb-3 group-hover:text-[#ffea05] transition-colors">Custom Load Engineering</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We don't guess. We design pallets specific to your SKU dimensions and weight distribution. 
                Using our proprietary modeling, we reduce wood waste and optimize shipping costs by up to 15%.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-500">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#ffea05]"></div>CAD DESIGN</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#ffea05]"></div>WEIGHT OPTIMIZATION</li>
              </ul>
            </div>
            <div className="md:col-span-1 bg-[#202020] border border-[#a39603]/20 p-8 rounded-sm hover:border-[#ffea05] hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-[#ffea05] rounded-sm flex items-center justify-center mb-6 text-black">
                <ThermometerSun size={24} />
              </div>
              <h3 className="font-serif text-xl mb-3">ISPM-15 Certified</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Export-ready. Heat treated to core temperature of 56°C for 30 minutes. 
                Stamped and fully compliant for international shipping.
              </p>
            </div>
            <div className="md:col-span-1 bg-[#202020] border border-[#a39603]/20 p-8 rounded-sm hover:border-[#ffea05] hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-[#a39603]/10 rounded-sm flex items-center justify-center mb-6 text-[#ffea05]">
                <Trees size={24} />
              </div>
              <h3 className="font-serif text-xl mb-3">Virgin Lumber Only</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                No scrap. No recycled rot. We source premium spruce, pine, and fir 
                to ensure structural integrity for heavy loads.
              </p>
            </div>
            <div className="md:col-span-2 bg-[#202020] border border-[#a39603]/20 p-8 rounded-sm hover:border-[#ffea05] hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-[#a39603]/10 rounded-sm flex items-center justify-center mb-6 text-[#ffea05]">
                <Scissors size={24} />
              </div>
              <h3 className="font-serif text-2xl mb-3 group-hover:text-[#ffea05] transition-colors">High-Volume Production</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Automated cutting and nailing lines capability. Scalable production for enterprise supply chains. 
              </p>
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#ffea05] w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Process Timeline Section */}
      <ProcessTimeline />

      {/* NEW: Sustainability Section */}
      <SustainabilitySection />

      {/* NEW: Industrial Footer (Replaces generic) */}
      <IndustrialFooter />

      {/* Configurator Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <div className="relative bg-[#202020] w-full max-w-xl rounded-sm border border-[#a39603] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
             {/* Uses the same shared form component */}
             <PalletConfigurationForm onClose={() => setModalOpen(false)} />
          </div>
        </div>
      )}

      {/* NEW: Audit Pitch Modal */}
      {showAuditModal && (
        <AuditPitchModal 
          onClose={() => setShowAuditModal(false)}
          onStandard={() => {
             setShowAuditModal(false);
             setIsAuditQualified(false);
             scrollToHero();
          }}
          onQualify={() => {
             setShowAuditModal(false);
             setIsAuditQualified(true); // Flag as qualified
             scrollToHeroQualified(); // Scroll to hero
          }}
        />
      )}
      
    </div>
  );
};

export default App;