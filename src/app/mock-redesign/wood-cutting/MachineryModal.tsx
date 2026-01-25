import React, { useState } from 'react';
import { X, PlayCircle, Settings, Box, Activity, CheckCircle2 } from 'lucide-react';

interface MachineryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const machines = [
  {
    id: 'notching',
    name: 'Go Fast 2NX Notcher',
    subtitle: 'High-Volume Stringer Production',
    videoId: 'R96R8CdfmPk', // Official Go Fast Demo
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
    videoId: 'JmYI-H9h-3E', // Official Wood-Mizer Demo
    specs: [
      { label: 'Blade Technology', value: 'Thin-Kerf (Low Waste)', icon: Activity },
      { label: 'Feed Rate', value: '0-60 FPM Variable', icon: Activity },
      { label: 'Accuracy', value: 'Digital Setworks Control', icon: Settings },
      { label: 'Capacity', value: '16" Width / 12" Thickness', icon: Box },
    ],
    description: "Maximize yield with thin-kerf technology. The HR120 allows us to recover more lumber from every cant, reducing material costs and environmental impact while maintaining strict dimensional sizing."
  }
];

const MachineryModal = ({ isOpen, onClose }: MachineryModalProps) => {
  const [activeTab, setActiveTab] = useState<'notching' | 'resawing'>('notching');
  const activeMachine = machines.find(m => m.id === activeTab) || machines[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl bg-[#111] border border-[#FFEA05]/20 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[800px] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* Sidebar / Tabs */}
        <div className="w-full md:w-80 bg-[#0A0A0A] border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10">
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
                onClick={() => setActiveTab(machine.id as any)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 group relative overflow-hidden ${
                  activeTab === machine.id 
                    ? 'bg-[#1A1A1A] border-[#FFEA05]/50 text-white shadow-[0_0_20px_-5px_rgba(255,234,5,0.1)]' 
                    : 'bg-transparent border-transparent text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeTab === machine.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFEA05]" />
                )}
                <div className="text-sm font-bold tracking-wide uppercase mb-1">{machine.name}</div>
                <div className="text-xs opacity-70 truncate">{machine.subtitle}</div>
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-white/10 bg-[#080808]">
            <div className="flex items-center gap-3 text-white/60 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Equipment Status: </span>
              <span className="text-green-500 font-bold tracking-wider">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#111] relative">
          
          {/* Video Area (60% height) */}
          <div className="relative h-[40%] md:h-[60%] bg-black group">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${activeMachine.videoId}?autoplay=1&mute=1&rel=0&loop=1&playlist=${activeMachine.videoId}`}
              title={activeMachine.name}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#111] via-transparent to-transparent" />
          </div>

          {/* Specs Panel (40% height) */}
          <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-3xl font-serif text-white mb-2">{activeMachine.name}</h3>
              <p className="text-white/60 max-w-2xl text-sm leading-relaxed">
                {activeMachine.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-auto">
              {activeMachine.specs.map((spec, idx) => (
                <div key={idx} className="bg-[#1A1A1A] border border-white/5 p-4 rounded-lg hover:border-[#FFEA05]/20 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-[#FFEA05]/80">
                    <spec.icon size={16} />
                    <span className="text-[10px] font-mono tracking-widest uppercase">{spec.label}</span>
                  </div>
                  <div className="text-white font-bold text-sm md:text-base">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MachineryModal;
