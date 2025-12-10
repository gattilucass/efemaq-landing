"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Search, 
  FileSearch, 
  UserCheck, 
  Activity,
  ArrowDown
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // --- CONFIGURACIÓN DEL SCROLL ---
  // Altura reducida a 300vh para mayor velocidad y dinamismo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end end"],
  });

  const springConfig = isMobile 
    ? { stiffness: 200, damping: 30, restDelta: 0.01 }
    : { mass: 0.5, stiffness: 80, damping: 20, restDelta: 0.001 };

  const smoothY = useSpring(scrollYProgress, springConfig);

  // --- SCANNER LINE ---
  const scanLineTop = useTransform(smoothY, [0, 0.9], ["0%", "100%"]);
  const scanColor = useTransform(smoothY, 
    [0.1, 0.35, 0.65, 0.9], 
    ["#f59e0b", "#3b82f6", "#00dfdf", "#10b981"] 
  );

  // --- ANIMACIONES DE CARDS (Escala Segura: Max 1.0) ---
  
  // Card 1 (Ámbar)
  const c1Op = useTransform(smoothY, [0.02, 0.15, 0.25, 0.30], [0, 1, 1, 0]);
  const c1Y  = useTransform(smoothY, [0.10, 0.30], [50, -100]); 
  // CORRECCIÓN: Termina en 1.0 para respetar márgenes
  const c1Scale = useTransform(smoothY, [0.15, 0.25], [0.8, 0.9]); 

  // Card 2 (Azul)
  const c2Op = useTransform(smoothY, [0.30, 0.45, 0.50, 0.55], [0, 1, 1, 0]);
  const c2Y  = useTransform(smoothY, [0.30, 0.55], [100, -100]);
  const c2Scale = useTransform(smoothY, [0.30, 0.50], [0.8, 0.9]);

  // Card 3 (Teal)
  const c3Op = useTransform(smoothY, [0.55, 0.75, 0.75, 0.80], [0, 1, 1, 0]);
  const c3Y  = useTransform(smoothY, [0.55, 0.80], [100, -100]);
  const c3Scale = useTransform(smoothY, [0.55, 0.75], [0.8, 0.9]);

  // Card 4 (Solución Final)
  const entryStart = 0.80;
  const entrySettle = 0.90;
  
  const c4Op = useTransform(smoothY, [entryStart, entryStart + 0.1], [0, 1]);
  const c4Y  = useTransform(smoothY, [entryStart, entrySettle], [150, 0]); 
  const c4Scale = useTransform(smoothY, [entryStart, entrySettle], [0.9, 1]); 

  const circleDraw = useTransform(smoothY, [0.80, 0.90], [0, 1]);
  const checkDraw = useTransform(smoothY, [0.82, 0.90], [0, 1]); 

  // Indicador Final
  const nextSectionHintOp = useTransform(smoothY, [0.9, 0.98], [0, 1]);

  return (
    <section id="process-section" ref={containerRef} className="relative w-full h-[300vh] bg-[#050505]">
      
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* --- BACKGROUND LAYER --- */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-[#0a0a0a]">
             <div 
                className="absolute inset-0 opacity-[0.08]" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                    backgroundSize: '40px 40px' 
                }} 
             />
             <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#006262] opacity-[0.1] blur-[120px] rounded-full" />
             <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#00dfdf] opacity-[0.08] blur-[120px] rounded-full" />
        </div>

        {/* --- SCANNER LINE --- */}
        <motion.div className="absolute inset-0 z-10 pointer-events-none will-change-transform">
             <motion.div style={{ top: scanLineTop }} className="absolute left-0 w-full h-px z-30 flex justify-end pr-4 md:pr-16">
                 <motion.div 
                    style={{ backgroundColor: scanColor, boxShadow: "0 0 25px 3px var(--tw-shadow-color)" }} 
                    className="absolute left-0 bottom-0 w-full h-[2px] shadow-current" 
                 />
                 <div className="relative -top-4 md:-top-6">
                     <div className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] md:text-[10px] font-manrope font-bold text-white/70 backdrop-blur-md">
                        SISTEMA EFEMAQ
                     </div>
                 </div>
             </motion.div>
        </motion.div>


        {/* --- CARDS CONTAINER --- */}
        <div className="absolute z-20 pointer-events-none flex items-center justify-center
                        w-full 
                        /* MÓVIL: 90vw (Margen seguro a los costados) */
                        /* PC: Aumentado a max-w-[800px] y 55vw para que sean más grandes */
                        w-[90vw] md:w-[55vw] max-w-[800px]
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        "> 
            
            {/* CARD A (Solicitud) */}
            <div className="absolute w-full perspective-1000">
                <motion.div 
                    style={{ opacity: c1Op, y: c1Y, scale: c1Scale, rotateX: 5 }} 
                    className="w-full p-5 md:p-10 lg:p-12 rounded-2xl bg-[#0f0f0f]/95 md:bg-[#0f0f0f]/90 border border-white/10 border-l-[6px] border-l-amber-500 shadow-2xl md:backdrop-blur-xl will-change-transform"
                >
                    <div className="flex items-center justify-between mb-3 md:mb-5">
                        <div className="pr-4">
                            <h4 className="text-white font-manrope font-extrabold text-xl sm:text-2xl md:text-4xl tracking-tight">Solicitud Recibida</h4>
                            <p className="text-amber-500 text-xs md:text-sm font-bold font-manrope uppercase tracking-wider mt-1">Relevamiento Inicial</p>
                        </div>
                        <div className="bg-amber-500/10 p-2 md:p-4 rounded-xl border border-amber-500/20 shrink-0"><Search className="text-amber-500 w-6 h-6 md:w-10 md:h-10" /></div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-xl font-inter leading-relaxed">
                        Respuesta 24/7. Identificación del origen y criticidad para orientar la propuesta de solución eficiente.
                    </p>
                </motion.div>
            </div>

            {/* CARD B (Diagnóstico) */}
            <div className="absolute w-full perspective-1000">
                <motion.div 
                    style={{ opacity: c2Op, y: c2Y, scale: c2Scale, rotateX: 5 }} 
                    className="w-full p-5 md:p-10 lg:p-12 rounded-2xl bg-[#0f0f0f]/95 md:bg-[#0f0f0f]/90 border border-white/10 border-l-[6px] border-l-blue-500 shadow-2xl md:backdrop-blur-xl will-change-transform"
                >
                    <div className="flex items-center justify-between mb-3 md:mb-5">
                        <div className="pr-4">
                            <h4 className="text-white font-manrope font-extrabold text-xl sm:text-2xl md:text-4xl tracking-tight">Diagnóstico Profesional</h4>
                            <p className="text-blue-500 text-xs md:text-sm font-bold font-manrope uppercase tracking-wider mt-1">Análisis bajo normas técnicas</p>
                        </div>
                        <div className="bg-blue-500/10 p-2 md:p-4 rounded-xl border border-blue-500/20 shrink-0"><FileSearch className="text-blue-500 w-6 h-6 md:w-10 md:h-10" /></div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-xl font-inter leading-relaxed">
                        Plan de acción definido según criterios de viabilidad, seguridad y optimización de recursos para una resolución efectiva y duradera.
                    </p>
                </motion.div>
            </div>

            {/* CARD C (Técnico) */}
            <div className="absolute w-full perspective-1000">
                <motion.div 
                    style={{ opacity: c3Op, y: c3Y, scale: c3Scale, rotateX: 5 }} 
                    className="w-full p-5 md:p-10 lg:p-12 rounded-2xl bg-[#0f0f0f]/95 md:bg-[#0f0f0f]/90 border border-white/10 border-l-[6px] border-l-[#00dfdf] shadow-2xl md:backdrop-blur-xl will-change-transform"
                >
                    <div className="flex items-center justify-between mb-3 md:mb-5">
                        <div className="pr-4">
                            <h4 className="text-white font-manrope font-extrabold text-xl sm:text-2xl md:text-4xl tracking-tight">Técnico Asignado</h4>
                            <p className="text-[#00dfdf] text-xs md:text-sm font-bold font-manrope uppercase tracking-wider mt-1">Movilización Inmediata</p>
                        </div>
                        <div className="bg-[#00dfdf]/10 p-2 md:p-4 rounded-xl border border-[#00dfdf]/20 shrink-0"><UserCheck className="text-[#00dfdf] w-6 h-6 md:w-10 md:h-10" /></div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-xl font-inter leading-relaxed">
                        Profesional habilitado, con equipamiento adecuado y cumplimiento normativo, asignado al servicio.
                    </p>
                </motion.div>
            </div>

        </div>

        {/* --- CARD D: SOLUCIÓN FINAL --- */}
        <div className="absolute z-20 pointer-events-none flex items-center justify-center
                w-full 
                w-[90vw] md:w-[55vw] max-w-[800px]
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        ">
            <div className="absolute w-[95%] md:w-full perspective-1000 origin-center"> 
                <motion.div 
                    style={{ 
                        opacity: c4Op, 
                        y: c4Y,
                        scale: c4Scale 
                    }} 
                    className="w-full p-6 md:p-14 rounded-[2rem] bg-[#050505] border border-emerald-500/50 border-l-[8px] md:border-l-[12px] border-l-emerald-500 shadow-[0_20px_100px_-20px_rgba(16,185,129,0.3)] md:backdrop-blur-2xl will-change-transform"
                >
                    <div className="flex items-start justify-between gap-4 md:gap-6 mb-4 md:mb-8">
                        <div className="flex flex-col">
                             <h4 className="text-white font-manrope font-extrabold text-2xl md:text-4xl lg:text-5xl tracking-tighter drop-shadow-lg">
                                 Solución Ejecutada
                             </h4>
                             <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-4">
                                <Activity size={24} className="text-emerald-400" />
                                <span className="text-emerald-400 text-xs md:text-base font-bold font-manrope tracking-widest uppercase">Garantía + Reporte Digital</span>
                             </div>
                        </div>
                        
                        <div className="relative size-14 md:size-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                             <motion.div 
                                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} 
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-emerald-500 blur-2xl opacity-30 rounded-full" 
                             />
                             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 z-10 w-8 h-8 md:w-12 md:h-12">
                                <motion.path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" style={{ pathLength: circleDraw }} />
                                <motion.path d="M22 4 12 14.01l-3-3" style={{ pathLength: checkDraw }} />
                             </svg>
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-4 md:pt-8 border-t border-dashed border-emerald-500/20">
                        <p className="text-base md:text-xl text-emerald-100/90 font-inter font-medium leading-relaxed">
                            Cierre documentado con evidencia visual y certificación del servicio para asegurar trazabilidad y seguimiento.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
        
        {/* --- INDICADOR FINAL "SIGUIENTE PASO" --- */}
        <motion.div 
            style={{ opacity: nextSectionHintOp }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
        >
            <span className="text-[#00dfdf] text-[10px] font-manrope font-bold uppercase tracking-widest whitespace-nowrap animate-pulse">
                Siguiente Paso
            </span>
            <div className="w-px h-16 bg-white/10 relative overflow-hidden">
                <motion.div 
                    className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-transparent via-[#00dfdf] to-transparent"
                    animate={{ top: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </motion.div>

      </div>
    </section>
  );
}