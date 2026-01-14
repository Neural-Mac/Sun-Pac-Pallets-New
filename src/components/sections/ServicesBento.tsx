"use client";

import { motion } from "motion/react";
import { 
  Ruler, 
  ThermometerSun, 
  TreePine, 
  Cog, 
  ArrowUpRight 
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Custom Load Engineering",
    copy: "We don't guess. We design pallets specific to your SKU dimensions and weight distribution. Reduce wood waste, optimize shipping costs.",
    icon: Ruler,
    colSpan: "md:col-span-2",
    hasGrid: true,
  },
  {
    id: 2,
    title: "ISPM-15 Certified",
    copy: "Export-ready. Heat treated to core temperature of 56°C for 30 minutes. Stamped and compliant for international shipping.",
    icon: ThermometerSun,
    colSpan: "md:col-span-1",
    accent: "text-[var(--color-brand-accent)]",
  },
  {
    id: 3,
    title: "Virgin Lumber Only",
    copy: "No scrap. No recycled rot. We source premium spruce/pine/fir to ensure structural integrity for heavy loads.",
    icon: TreePine,
    colSpan: "md:col-span-1",
  },
  {
    id: 4,
    title: "High-Volume Production",
    copy: "Automated cutting and nailing lines capability. Scalable production for enterprise supply chains.",
    icon: Cog,
    colSpan: "md:col-span-2",
  },
];

export function ServicesBento() {
  return (
    <section className="py-24 bg-[var(--color-surface-dark)] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-adamina text-3xl md:text-4xl text-white mb-4">
            The Manifest
          </h2>
          <div className="h-1 w-20 bg-[var(--color-gold-dark)]" />
        </div>

        {/* Bento Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { 
                  y: 0, 
                  opacity: 1,
                  transition: { duration: 0.5, ease: "easeOut" }
                }
              }}
              className={`
                group relative p-8 rounded-sm bg-white/5 border border-[#a39603]/20 
                hover:border-[var(--color-brand-accent)] hover:-translate-y-1 
                transition-all duration-300 ${service.colSpan}
                overflow-hidden
              `}
            >
              {/* Background Grid Pattern for Card 1 */}
              {service.hasGrid && (
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-sm bg-white/5 ${service.accent || "text-white"}`}>
                      <service.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--color-gold-dark)] group-hover:text-[var(--color-brand-accent)] transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                  
                  <h3 className="font-adamina text-xl text-white mb-3 group-hover:text-[var(--color-brand-accent)] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="font-poppins text-sm text-gray-300 leading-relaxed">
                    {service.copy}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
