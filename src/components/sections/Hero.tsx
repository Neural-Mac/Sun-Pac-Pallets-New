"use client";

import { motion } from "motion/react";
import { PlayCircle } from "lucide-react";
import { Button } from "../ui/Button";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative min-h-[90vh] w-full bg-[var(--color-surface-dark)] overflow-hidden flex items-center">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full relative z-10 pt-20 lg:pt-0">
        
        {/* Left Column: Logic */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center text-left"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-adamina text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] text-white mb-6"
          >
            Precision <br />
            <span className="text-white">Wood Packaging.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="font-poppins text-lg md:text-xl text-white/80 max-w-lg mb-10 leading-relaxed font-light"
          >
            We engineer custom, heat-treated pallets for high-value logistics. 
            <span className="text-white font-medium ml-1">New wood only. No scrap. No compromises.</span>
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button className="w-full sm:w-auto h-14 text-base">
              Start Your Project
            </Button>
            <Button variant="outline" className="w-full sm:w-auto h-14 text-base group">
              <PlayCircle className="mr-2 h-5 w-5 text-[var(--color-gold-light)] group-hover:text-[var(--color-brand-accent)] transition-colors" />
              Free Design Audit
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "circOut" }}
          className="relative h-[50vh] lg:h-[75vh] w-full hidden lg:block"
        >
          {/* Decorative "Engineer" Overlay - Crosshairs */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-gold-dark)]/50 z-20" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-gold-dark)]/50 z-20" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-gold-dark)]/50 z-20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-gold-dark)]/50 z-20" />

          {/* Grid Lines */}
          <div className="absolute inset-0 z-20 opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-px bg-[var(--color-gold-dark)]" />
            <div className="absolute top-0 left-1/2 h-full w-px bg-[var(--color-gold-dark)]" />
            <div className="absolute inset-0 border border-[var(--color-gold-dark)]/30 m-4" />
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-full bg-[#2a2a2a] relative overflow-hidden rounded-sm group">
            {/* Placeholder Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[var(--color-gold-dark)] text-xs uppercase tracking-widest opacity-50">
                [ Hero Image: High-Speed Production / Fresh Lumber ]
              </span>
            </div>
            
            {/* Subtle sheen effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>

          {/* Technical Badge */}
          <div className="absolute bottom-8 right-8 z-30 bg-[#202020]/90 backdrop-blur border border-[var(--color-gold-dark)] p-4 shadow-2xl">
            <div className="text-[10px] text-[var(--color-brand-accent)] uppercase tracking-widest mb-1">
              Capacity
            </div>
            <div className="text-2xl font-mono text-white">4,500 LBS</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
