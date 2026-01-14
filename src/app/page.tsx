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
  ChevronRight,
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
  Box // Added Box icon
} from 'lucide-react';

// --- STYLES & CONFIGURATION ---
const HexCodes = {
  surfaceDark: '#202020',
  surfaceCard: '#2a2a2a',
  accentYellow: '#ffea05',
  goldDark: '#827703',
  goldLight: '#a39603',
  white: '#ffffff'
};

// --- TYPES ---
interface SpecDimensions {
  count: string;
  thick: string;
  width: string;
  length: string;
  [key: string]: string;
}

interface CustomSpec {
  topDeck: SpecDimensions;
  bottomDeck: SpecDimensions;
  stringers: SpecDimensions;
  [key: string]: SpecDimensions;
}

interface ContactInfo {
  name: string;
  company: string;
  phone: string;
  email: string;
  [key: string]: string;
}

interface FormData {
  type: string;
  heatTreated: boolean;
  customSize: string;
  entryType: string;
  customSpec: CustomSpec;
  category: string;
  customWeight: string;
  quantity: string;
  frequency: string;
  notes: string;
  contact: ContactInfo;
  fileName: string;
}

interface PalletConfigurationFormProps {
  isEmbedded?: boolean;
  onClose?: () => void;
}

// --- REUSABLE FORM COMPONENT (WIZARD MODE - COMPACT) ---
const PalletConfigurationForm = ({ isEmbedded = false, onClose }: PalletConfigurationFormProps) => {
  // Wizard State
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Form State
  const [formData, setFormData] = useState<FormData>({
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
    contact: { name: '', company: '', phone: '', email: '' },
    fileName: '' 
  });

  const [showAdvancedSpecs, setShowAdvancedSpecs] = useState(false);
  
  // AI State
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

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

  const handleSpecChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      customSpec: {
        ...prev.customSpec,
        [section]: { ...prev.customSpec[section], [field]: value }
      }
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  // Handle Type Change with Auto-Expand logic
  const handleTypeChange = (newType: string) => {
    setFormData(prev => ({ ...prev, type: newType }));
    if (newType === 'Custom') {
      setShowAdvancedSpecs(true);
    }
  };

  const runEngineeringAnalysis = async (e: React.MouseEvent) => {
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

  const generateAudioBrief = async (textToRead: string) => {
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

  return (
    <div className={`flex flex-col h-full bg-[#202020] text-white ${isEmbedded ? 'bg-transparent' : ''}`}>
      
      {/* Header */}
      <div className={`p-3 border-b border-gray-700 flex justify-between items-center ${isEmbedded ? 'bg-black/60' : 'bg-[#252525]'} shrink-0`}>
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-md text-white">
            Build Your Quote <span className="text-[#a39603] text-xs font-sans ml-2">Step {step}/{totalSteps}</span>
          </h3>
          {/* Progress Dots */}
          <div className="flex gap-1">
             {[1, 2, 3].map(s => (
               <div key={s} className={`h-1.5 w-1.5 rounded-full transition-colors ${step >= s ? 'bg-[#ffea05]' : 'bg-gray-700'}`}></div>
             ))}
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white">
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

             {/* STANDARD GMA INFO CARD - Fills the "Naked" Space */}
             {formData.type === 'Standard GMA' && (
                <div className="bg-black/20 border border-gray-700/50 p-3 rounded-sm animate-in fade-in zoom-in-95 duration-200">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Configuration Summary</span>
                      <div className="flex items-center gap-1 text-[9px] text-[#ffea05] bg-[#ffea05]/10 px-1.5 py-0.5 rounded border border-[#ffea05]/20">
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
                  
                  {/* Advanced Specs Table - Auto Shown for Custom */}
                  <div className="bg-black/20 p-2 rounded-sm border border-gray-700/50 mt-1">
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
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Forklift access, moisture content, etc." 
                  rows={2} 
                  className="input-compact resize-none mb-2"
                ></textarea>
                
                <div className="border border-dashed border-gray-600 rounded-sm p-2 text-center hover:bg-black/30 transition-colors cursor-pointer relative">
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, fileName: e.target.files?.[0]?.name || ''})} />
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
            className="flex-1 btn-primary py-2 rounded-sm text-xs font-bold flex items-center justify-center gap-2"
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

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-[#202020]/90 backdrop-blur-md border-b border-[#a39603]/30' : 'py-3 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="SPP_logo_png.png" 
              alt="SPP Logo" 
              className="h-16 w-auto object-contain"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/120x50/ffea05/000000?text=SPP+LOGO"; }}
            />
            <div>
              <span className="font-serif text-xl tracking-tight block leading-none text-white">Sun Pac Pallets</span>
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
                <a href="#" className="block px-5 py-3 hover:bg-[#a39603]/10 hover:text-[#ffea05]">Wood Cutting</a>
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
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 technical-grid pointer-events-none opacity-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Column */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#a39603]/50 bg-[#a39603]/10 text-[#ffea05] text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ffea05]"></span>
              Now Accepting New Contracts for 2026
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl leading-[1.1]">
              Precision Wood <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Packaging.</span>
            </h1>
            <p className="font-sans text-gray-400 text-lg leading-relaxed max-w-xl">
              We engineer custom, heat-treated pallets for high-value logistics. 
              New wood only. No scrap. No compromises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setModalOpen(true)} className="btn-primary px-8 py-4 rounded-sm text-lg flex items-center justify-center gap-2">
                Request Quote <ArrowRight size={20} />
              </button>
              <button className="btn-outline px-8 py-4 rounded-sm text-lg flex items-center justify-center gap-2 group">
                <PlayCircle size={20} className="group-hover:text-[#ffea05] transition-colors" />
                Free Design Audit
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 font-mono pt-4">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} color={HexCodes.goldLight} /> ISPM-15 Certified</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} color={HexCodes.goldLight} /> 48hr Prototype</span>
            </div>
          </div>

          {/* Right Column: THE CLEAN QUOTE BUILDER CARD */}
          <div className="relative h-[500px] w-full max-w-lg mx-auto lg:ml-auto">
             <div className={`
                relative w-full h-full rounded-xl border border-gray-600 shadow-2xl overflow-hidden transition-all duration-500
                bg-cover bg-center animate-border-breathe shadow-inner
             `}
             style={{ 
               backgroundImage: !heroConsoleActive ? "url('facility.jpg')" : 'none',
               backgroundColor: heroConsoleActive ? '#0a0a0a' : 'transparent'
             }}
             >
                {/* Fallback Image if main one fails */}
                {!heroConsoleActive && (
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover -z-10 opacity-0"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      // If local image fails (which it might in preview), show fallback: warehouse.jpg
                      const target = e.currentTarget as HTMLImageElement;
                      const parent = target.parentNode as HTMLElement;
                      if (parent && parent.style.backgroundImage.includes('facility.jpg')) {
                         parent.style.backgroundImage = "url('warehouse.jpg')";
                      }
                    }}
                  />
                )}

                {/* 1. FIX: Minimal Dark Overlay for Maximum Visibility */}
                {!heroConsoleActive && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_rgba(0,0,0,0.6)_100%)]"></div>}
                
                {/* 2. FIX: Restored Yellow Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ffea05] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ffea05] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ffea05] pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ffea05] pointer-events-none"></div>

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col">
                   
                   {/* State 1: Idle (Inviting Card) */}
                   {!heroConsoleActive && (
                      <div className="w-full h-full flex items-center justify-center p-8 group cursor-pointer" onClick={() => setHeroConsoleActive(true)}>
                         <div className="bg-black/30 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-2xl flex flex-col items-center gap-6 max-w-sm mx-auto group-hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-lg relative">
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
                      </div>
                   )}

                   {/* State 2: Active (Wizard) */}
                   {heroConsoleActive && (
                      <div className="w-full h-full animate-in fade-in zoom-in-95 duration-300 flex flex-col">
                         <PalletConfigurationForm isEmbedded={true} onClose={() => setHeroConsoleActive(false)} />
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
      
      {/* Footer */}
      <footer className="bg-[#151515] pt-20 pb-10 border-t border-[#a39603]/20">
         <div className="max-w-7xl mx-auto px-6 text-center md:text-left text-xs text-gray-600 font-mono">
          © 2026 POMELLI LOGISTICS. POWERED BY GOOGLE GEMINI.
        </div>
      </footer>
    </div>
  );
};

export default App;
