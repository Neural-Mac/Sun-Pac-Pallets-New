"use client";

import React from "react";
import { Trees, Scissors, Hammer, Truck } from "lucide-react";

export const ProcessTimeline = () => {
    // Phase 2: "The Machine Fleet" - Immersive Engineering Experience
    const steps = [
        { 
            id: "01", 
            title: "Sourcing", 
            subtitle: "Premium SPF Lumber",
            desc: "Sourced directly from certified Canadian mills. 100% New Lumber. Zero Scrap.",
            overlay: "GRADE: PREMIUM SPF // ORIGIN: CANADA",
            icon: <Trees size={24} />,
            bg: "bg-cover bg-center",
            bgImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"
        },
        { 
            id: "02", 
            title: "Precision Cutting", 
            subtitle: "Automated Fleet",
            desc: "High-volume dimensional accuracy. Calibrated for millimetre-perfect cuts.",
            specs: ["Go Fast 2NX Notcher", "Wood-Mizer HR120 Resaw", "Precision Trim Saws"],
            icon: <Scissors size={24} />,
            bg: "bg-cover bg-center",
            bgImage: "/images/saw-man-v2.png"
        },
        { 
            id: "03", 
            title: "Assembly", 
            subtitle: "Pneumatic Construction",
            desc: "High-speed assembly using pre-sterilized heat-treated lumber (ISPM-15 compliant).",
            overlay: "FASTENERS: PNEUMATIC // CERT: ISPM-15",
            icon: <Hammer size={24} />,
            bg: "bg-cover bg-center",
            bgImage: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=600"
        },
        { 
            id: "04", 
            title: "Logistics", 
            subtitle: "North American Fleet",
            desc: "Rapid deployment fleet capable of comprehensive North American supply.",
            overlay: "ZONE: NORTH AMERICA // STATUS: ACTIVE",
            icon: <Truck size={24} />,
            bg: "bg-cover bg-center",
            bgImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600"
        },
    ];

    return (
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
            {/* Background Grain */}
            <div className="absolute inset-0 opacity-10" 
                style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[#a39603] font-mono text-xs tracking-widest uppercase mb-2 block">
                        Phase 02 // Production
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                        ENGINEERED <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">
                            FOR PRECISION
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {steps.map((step) => (
                        <div key={step.id} className="group relative h-[450px] overflow-hidden border border-[#333] bg-[#111] hover:border-[#FFEA05] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,234,5,0.15)]">
                            
                            {/* Image Background (Revealed on Hover) */}
                            <div 
                                className={`absolute inset-0 ${step.bg} opacity-40 md:opacity-20 md:group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0 transform group-hover:scale-110 ease-out`}
                                style={{ backgroundImage: `url('${step.bgImage}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95 group-hover:via-black/40 transition-all duration-500"></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                <div className="mb-auto opacity-50 group-hover:opacity-100 transition-opacity">
                                    <span className="font-mono text-4xl font-bold text-[#333] group-hover:text-[#FFEA05] transition-colors relative z-20 drop-shadow-lg">
                                        {step.id}
                                    </span>
                                </div>

                                <div className="transform transition-transform duration-500">
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FFEA05] transition-colors drop-shadow-md whitespace-nowrap truncate">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs font-mono text-[#a39603] mb-3 uppercase tracking-wide group-hover:text-[#FFEA05] transition-colors whitespace-nowrap truncate">
                                        {step.subtitle}
                                    </p>
                                    
                                    {/* Collapsible Details */}
                                    <div className="max-h-0 group-hover:max-h-[300px] transition-[max-height] duration-700 ease-in-out overflow-hidden">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <p className="text-white font-bold text-sm leading-relaxed drop-shadow-md">
                                                {step.desc}
                                            </p>
                                            
                                            {/* Tech Specs */}
                                            {step.specs && (
                                                <div className="mt-4 pt-4 border-t border-[#FFEA05]/20">
                                                    <ul className="space-y-1">
                                                        {step.specs.map((spec, i) => (
                                                            <li key={i} className="text-[10px] text-white font-mono flex items-center gap-2 font-bold">
                                                                <span className="w-1 h-1 bg-[#FFEA05]"></span>
                                                                {spec}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {step.overlay && (
                                                <div className="mt-4 pt-4 border-t border-white/10">
                                                    <p className="text-[10px] font-mono text-gray-300 group-hover:text-white transition-colors">
                                                        {step.overlay}
                                                    </p>
                                                </div>
                                            )}
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
