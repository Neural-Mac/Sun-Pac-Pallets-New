import React, { useState } from 'react';
import { X, PlayCircle, Settings, Box, Activity, CheckCircle2, Lock, ArrowRight, AlertCircle, ExternalLink } from 'lucide-react';

interface MachineryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuoteRequest?: (machineId: string) => void;
}

type MachineStatus = 'online' | 'coming_soon' | 'maintenance';

interface Machine {
  id: string;
  name: string;
  subtitle: string;
  status: MachineStatus;
  videoId?: string;
  startSeconds?: number;
  endSeconds?: number;
  specs?: { label: string; value: string; icon: any }[];
  description?: string;
}

const machines: Machine[] = [
  {
    id: 'notching',
    name: 'Go Fast 2NX Notcher',
    subtitle: 'High-Volume Stringer Production',
    status: 'online',
    videoId: 'im3PYiEUbOo', // Updated per user request
    startSeconds: 5,
    specs: [
      { label: 'Production Capacity', value: '4,000 Stringers / Hour', icon: Activity },
      { label: 'Power System', value: 'Dual 20HP Motors', icon: Settings },
      { label: 'Feed System', value: 'Precision Cogged Chain', icon: Box },
      { label: 'Accuracy', value: '±0.031" Tolerance', icon: CheckCircle2 },
    ],
    description: "The workhorse of our operation. The Go Fast 2NX Double Head Notcher creates precision notches for 4-way stringer pallets at industrial speeds, ensuring consistent quality for high-volume orders."
  },
  {
    id: 'resawing',
    name: 'Wood-Mizer HR120',
    subtitle: 'Precision Horizontal Resaw',
    status: 'online',
    videoId: 'wZ7FZlUd8LQ', // Verified User Selection
    startSeconds: 50, // 0:50
    endSeconds: 138,  // 2:18
    specs: [
      { label: 'Blade Technology', value: 'Thin-Kerf (Low Waste)', icon: Activity },
      { label: 'Feed Rate', value: '0-60 FPM Variable', icon: Activity },
      { label: 'Accuracy', value: 'Digital Setworks Control', icon: Settings },
      { label: 'Capacity', value: '16" Width / 12" Thickness', icon: Box },
    ],
    description: "Maximize yield with thin-kerf technology. The HR120 allows us to recover more lumber from every cant, reducing material costs and environmental impact while maintaining strict dimensional sizing."
  },
  {
    id: 'rip-saw',
    name: 'Gang Rip Saw',
    subtitle: 'Multi-Blade Processing',
    status: 'coming_soon'
  },
  {
    id: 'heat-treat',
    name: 'Kiln Chamber',
    subtitle: 'ISPM-15 Heat Treatment',
    status: 'coming_soon'
  }
];

const MachineryModal = ({ isOpen, onClose, onQuoteRequest }: MachineryModalProps) => {
  const [activeTab, setActiveTab] = useState<string>('notching');
  const activeMachine = machines.find(m => m.id === activeTab) || machines[0];

  // Helper to construct properly clipped YouTube URL
  const getEmbedUrl = (machine: Machine) => {
     let url = `https://www.youtube.com/embed/${machine.videoId}?rel=0&modestbranding=1`;
     if (machine.startSeconds) url += `&start=${machine.startSeconds}`;
     if (machine.endSeconds) url += `&end=${machine.endSeconds}`;
     return url;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl bg-[#111] border border-[#FFEA05]/20 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[800px] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* Sidebar / Tabs (DESKTOP ONLY) */}
        <div className="hidden md:flex w-80 bg-[#0A0A0A] border-r border-white/10 flex-col z-20">
          <div className="p-6 border-b border-white/10 shrink-0">
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <Settings className="text-[#FFEA05]" size={20} />
              Production Line
            </h2>
            <p className="text-white/40 text-xs mt-1 font-mono">INDUSTRIAL GRADE EQUIPMENT</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {machines.map((machine) => (
              <button
                key={machine.id}
                onClick={() => setActiveTab(machine.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 group relative overflow-hidden flex items-start justify-between ${
                  activeTab === machine.id 
                    ? 'bg-[#1A1A1A] border-[#FFEA05]/50 text-white shadow-[0_0_20px_-5px_rgba(255,234,5,0.1)]' 
                    : 'bg-transparent border-transparent text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeTab === machine.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFEA05]" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-bold tracking-wide uppercase mb-1 flex items-center gap-2">
                    {machine.name}
                    {machine.status === 'coming_soon' && <Lock size={12} className="opacity-50" />}
                  </div>
                  <div className="text-xs opacity-70 truncate max-w-[180px]">{machine.subtitle}</div>
                </div>
                {machine.status === 'coming_soon' && (
                   <span className="text-[9px] font-mono border border-white/10 px-1 py-0.5 rounded text-white/30 uppercase">Soon</span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-white/10 bg-[#080808] shrink-0">
            <div className="flex items-center gap-3 text-white/60 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>System Status: </span>
              <span className="text-green-500 font-bold tracking-wider">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#111] relative overflow-hidden">
          
          {activeMachine.status === 'online' ? (
            <>
              {/* Video Area (Fixed Height - Clean Embed) */}
              <div className="relative h-[35vh] md:h-[55%] bg-black group shrink-0">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={getEmbedUrl(activeMachine)}
                  title={activeMachine.name}
                  id="machinery-video-player"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
                 {/* Non-Blocking Fallback Link (Top Right Corner) */}
                 <div className="absolute top-4 right-12 md:right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                    <a 
                      href={`https://www.youtube.com/watch?v=${activeMachine.videoId}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-black/50 hover:bg-black text-white/50 hover:text-white text-[9px] font-bold uppercase px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm transition-all"
                    >
                      <ExternalLink size={10} /> Open in YouTube
                    </a>
                 </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#111] via-transparent to-transparent" />
              </div>

              {/* MOBILE TABS (SCROLLABLE) */}
              <div className="md:hidden shrink-0 bg-[#0A0A0A] border-b border-white/10 overflow-x-auto whitespace-nowrap hide-scrollbar flex items-center px-4 gap-3 h-14">
                  {machines.map((machine) => (
                      <button
                        key={machine.id}
                        onClick={() => setActiveTab(machine.id)}
                        className={`flex flex-col items-center justify-center h-full px-2 border-b-2 transition-all ${
                            activeTab === machine.id 
                            ? 'border-[#FFEA05] text-white' 
                            : 'border-transparent text-white/40'
                        }`}
                      >
                         <span className="text-[10px] font-bold uppercase tracking-wider">{machine.name}</span>
                      </button>
                  ))}
              </div>

              {/* Flex Container for Specs + Footer */}
              <div className="flex-1 flex flex-col min-h-0 relative z-10">
                  
                  {/* Scrollable Specs Area */}
                  <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mb-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">{activeMachine.name}</h3>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFEA05]/10 border border-[#FFEA05]/20 text-[#FFEA05] text-[10px] font-bold uppercase tracking-widest">
                          <Activity size={12} /> Active Unit
                        </div>
                      </div>
                      <p className="text-white/60 max-w-2xl text-xs md:text-sm leading-relaxed">
                        {activeMachine.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {activeMachine.specs?.map((spec, idx) => (
                        <div key={idx} className="bg-[#1A1A1A] border border-white/5 p-3 rounded-lg hover:border-[#FFEA05]/20 transition-colors group/card">
                          <div className="flex items-center gap-2 mb-1.5 text-[#FFEA05]/80 group-hover/card:text-[#FFEA05]">
                            <spec.icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                            <span className="text-[8px] md:text-[9px] font-mono tracking-widest uppercase">{spec.label}</span>
                          </div>
                          <div className="text-white font-bold text-xs md:text-sm">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* STICKY FOOTER CTA (Always Visible) */}
                  <div className="p-4 md:p-5 border-t border-white/10 bg-[#151515] shrink-0 flex justify-between items-center z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                       <div className="text-xs text-gray-500 hidden md:block italic">
                         *Specifications verified for 2026 production fleet.
                       </div>
                       <button 
                         onClick={() => { onClose(); onQuoteRequest?.(activeMachine.id); }}
                         className="w-full md:w-auto bg-[#FFEA05] text-black hover:bg-white px-6 md:px-8 py-3 rounded-sm font-bold text-xs md:text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,234,5,0.2)] flex items-center justify-center gap-2"
                       >
                         Get a Quote <ArrowRight size={16} />
                       </button>
                  </div>
              </div>
            </>
          ) : (
            /* COMING SOON STATE */
            <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden p-6 md:p-12 text-center">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10" 
                     style={{ backgroundImage: 'radial-gradient(#FFEA05 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>
                
                 {/* MOBILE TABS (For navigation even on Coming Soon) */}
                 <div className="md:hidden absolute top-0 left-0 right-0 h-14 bg-[#0A0A0A]/80 border-b border-white/10 overflow-x-auto whitespace-nowrap hide-scrollbar flex items-center px-4 gap-3 z-30 backdrop-blur-md">
                     {machines.map((machine) => (
                         <button
                           key={machine.id}
                           onClick={() => setActiveTab(machine.id)}
                           className={`flex flex-col items-center justify-center h-full px-2 border-b-2 transition-all ${
                               activeTab === machine.id 
                               ? 'border-[#FFEA05] text-white' 
                               : 'border-transparent text-white/40'
                           }`}
                         >
                            <span className="text-[10px] font-bold uppercase tracking-wider">{machine.name}</span>
                         </button>
                     ))}
                 </div>

                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 animate-pulse mt-14 md:mt-0">
                    <Lock className="text-gray-600 w-8 h-8 md:w-12 md:h-12" />
                </div>
                
                <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2 opacity-50">{activeMachine.name}</h3>
                <div className="text-[#FFEA05] font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-8 border border-[#FFEA05]/30 px-4 py-2 rounded-full bg-[#FFEA05]/5">
                    Acquisition Pending // Q3 2026
                </div>
                
                <p className="max-w-md text-gray-500 text-xs md:text-sm leading-relaxed">
                    This equipment is currently being integrated into our production workflow. 
                    Full technical specifications and video demonstrations will be available upon commissioning.
                </p>

                <div className="mt-12 flex items-center gap-2 text-gray-600 text-xs font-mono">
                    <AlertCircle size={12} />
                    <span>DATA FEED OFFLINE</span>
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MachineryModal;
