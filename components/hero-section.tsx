"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { 
  ArrowRight, 
  Wrench,
  ArrowDown,
  Search, 
  FileSearch, 
  UserCheck, 
  Activity,
  Mouse
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // --- 1. CONFIGURACIÓN DEL SCROLL ---
  // Altura ajustada: 300vh para que sea dinámico
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = isMobile 
    ? { stiffness: 200, damping: 30, restDelta: 0.01 }
    : { mass: 0.5, stiffness: 80, damping: 20, restDelta: 0.001 };

  const smoothY = useSpring(scrollYProgress, springConfig);

  // --- 2. ANIMACIONES DEL HERO (TEXTO) ---
  const heroOpacity = useTransform(smoothY, [0, 0.05, 0.13], [1, 1, 0]);
  const heroY = useTransform(smoothY, [0.05, 0.15], [0, -200]); 
  
  // Pointer Events: Importante para liberar la pantalla cuando el texto se va
  const heroPointerEvents = useTransform(smoothY, (v) => (v > 0.10 ? "none" : "auto"));

  // --- 3. ANIMACIONES DEL PROCESO (CARDS) ---
  
  // SCANNER LINE (Llega casi al final)
  const scanLineTop = useTransform(smoothY, [0, 0.95], ["0%", "100%"]);
  const scanColor = useTransform(smoothY, 
    [0.1, 0.35, 0.60, 0.85], 
    ["#f59e0b", "#3b82f6", "#00dfdf", "#10b981"] 
  );

  // CARDS FLUIDAS 
  // CORRECCIÓN MÓVIL: Escala segura que no desborda.
  const scaleStart = 0.9;
  const scaleEndMobile = 1.0; 
  const scaleEndDesktop = 1.05;
  const targetScale = isMobile ? scaleEndMobile : scaleEndDesktop;

  // Card 1
  const c1Op = useTransform(smoothY, [0.12, 0.15, 0.25, 0.30], [0, 1, 1, 0]);
  const c1Y  = useTransform(smoothY, [0.10, 0.30], [200, -50]);
  const c1Scale = useTransform(smoothY, [0.10, 0.30], [scaleStart, targetScale]); 

  // Card 2
  const c2Op = useTransform(smoothY, [0.28, 0.32, 0.43, 0.48], [0, 1, 1, 0]);
  const c2Y  = useTransform(smoothY, [0.25, 0.48], [200, -50]);
  const c2Scale = useTransform(smoothY, [0.25, 0.48], [scaleStart, targetScale]);

  // Card 3
  const c3Op = useTransform(smoothY, [0.46, 0.50, 0.60, 0.65], [0, 1, 1, 0]);
  const c3Y  = useTransform(smoothY, [0.43, 0.65], [200, -50]);
  const c3Scale = useTransform(smoothY, [0.43, 0.65], [scaleStart, targetScale]);

  // Card 4 (CORRECCIÓN SCROLL MUERTO)
  // Ahora termina su recorrido en 0.95 (casi al final de la sección), eliminando la pausa.
  const c4Op = useTransform(smoothY, [0.63, 0.68], [0, 1]);
  const c4Y  = useTransform(smoothY, [0.60, 0.95], [200, 0]); // Viaje largo hasta el final
  const c4Scale = useTransform(smoothY, [0.60, 0.95], [scaleStart, 1.0]);

  // Animaciones internas SVG (Sincronizadas con el nuevo final)
  const circleDraw = useTransform(smoothY, [0.63, 0.95], [0, 1]);
  const checkDraw = useTransform(smoothY, [0.65, 0.95], [0, 1]); 
  
  const nextSectionHintOp = useTransform(smoothY, [0.85, 0.95], [0, 1]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#050505]">
      
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center">
        
        {/* --- 1. BACKGROUND LAYER (Video) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
             {mounted && (
                 <div className="w-full h-full relative">
                        <video 
                            className="absolute inset-0 w-full h-full object-cover scale-105" 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            preload="none"
                            key={isMobile ? "mobile-v" : "desktop-v"}
                        >
                            <source src={isMobile ? "/celular-final-1.mp4" : "/desktop-final-1.mp4"} type="video/mp4" />
                        </video>
                        
                        {/* Capa oscura */}
                        <div className="absolute inset-0 bg-black/80 pointer-events-none" /> 
                 </div>
             )}
             
             {/* Grid Sutil */}
             <div 
                className="absolute inset-0 opacity-[0.1]" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                    backgroundSize: '40px 40px' 
                }} 
             />
        </div>

        {/* --- 2. SCANNER LINE --- */}
        <motion.div className="absolute inset-0 z-20 pointer-events-none will-change-transform">
             <motion.div style={{ top: scanLineTop }} className="absolute left-0 w-full h-px z-30 flex justify-end pr-4 md:pr-16">
                 <motion.div 
                    style={{ backgroundColor: scanColor, boxShadow: "0 0 25px 3px var(--tw-shadow-color)" }} 
                    className="absolute left-0 bottom-0 w-full h-[2px] shadow-current" 
                 />
                 <div className="relative -top-4 md:-top-6">
                     <div className="px-3 py-1 rounded bg-black/80 border border-white/10 text-[11px] md:text-[12px] font-manrope font-bold text-white/90 backdrop-blur-md tracking-widest shadow-lg">
                        SISTEMA EFEMAQ
                     </div>
                 </div>
             </motion.div>
        </motion.div>

        {/* --- 3. CARDS CONTAINER --- */}
        {/* CORRECCIÓN MÓVIL: w-[85vw] (Margen lateral seguro) */}
        <div className="absolute z-20 pointer-events-none flex items-center justify-center 
                        w-[95vw] md:w-[55vw] max-w-[800px] 
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"> 
            
            {/* CARD A */}
            <div className="absolute w-full perspective-1000">
                <motion.div 
                    style={{ opacity: c1Op, y: c1Y, scale: c1Scale, rotateX: 5 }} 
                    className="w-full p-6 md:p-10 lg:p-12 rounded-2xl bg-[#0f0f0f]/95 md:bg-[#0f0f0f]/90 border border-white/10 border-l-[6px] border-l-amber-500 shadow-2xl md:backdrop-blur-xl will-change-transform"
                >
                    <div className="flex items-center justify-between mb-3 md:mb-5">
                        <div className="pr-4">
                            <h4 className="text-white font-manrope font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight">Solicitud Recibida</h4>
                            <p className="text-amber-500 text-xs md:text-sm font-bold font-manrope uppercase tracking-wider mt-1.5">Relevamiento Inicial</p>
                        </div>
                        <div className="bg-amber-500/10 p-2 md:p-4 rounded-xl border border-amber-500/20 shrink-0"><Search className="text-amber-500 w-6 h-6 md:w-10 md:h-10" /></div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-lg font-inter leading-relaxed">
                        Respuesta 24/7. Identificación del origen y criticidad para orientar la propuesta de solución eficiente.
                    </p>
                </motion.div>
            </div>

            {/* CARD B */}
            <div className="absolute w-full perspective-1000">
                <motion.div 
                    style={{ opacity: c2Op, y: c2Y, scale: c2Scale, rotateX: 5 }} 
                    className="w-full p-6 md:p-10 lg:p-12 rounded-2xl bg-[#0f0f0f]/95 md:bg-[#0f0f0f]/90 border border-white/10 border-l-[6px] border-l-blue-500 shadow-2xl md:backdrop-blur-xl will-change-transform"
                >
                    <div className="flex items-center justify-between mb-3 md:mb-5">
                        <div className="pr-4">
                            <h4 className="text-white font-manrope font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight">Diagnóstico Profesional</h4>
                            <p className="text-blue-500 text-xs md:text-sm font-bold font-manrope uppercase tracking-wider mt-1.5">Análisis bajo normas técnicas</p>
                        </div>
                        <div className="bg-blue-500/10 p-2 md:p-4 rounded-xl border border-blue-500/20 shrink-0"><FileSearch className="text-blue-500 w-6 h-6 md:w-10 md:h-10" /></div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-lg font-inter leading-relaxed">
                        Plan de acción definido según criterios de viabilidad, seguridad y optimización de recursos para una resolución efectiva y duradera.
                    </p>
                </motion.div>
            </div>

            {/* CARD C */}
            <div className="absolute w-full perspective-1000">
                <motion.div 
                    style={{ opacity: c3Op, y: c3Y, scale: c3Scale, rotateX: 5 }} 
                    className="w-full p-6 md:p-10 lg:p-12 rounded-2xl bg-[#0f0f0f]/95 md:bg-[#0f0f0f]/90 border border-white/10 border-l-[6px] border-l-[#00dfdf] shadow-2xl md:backdrop-blur-xl will-change-transform"
                >
                    <div className="flex items-center justify-between mb-3 md:mb-5">
                        <div className="pr-4">
                            <h4 className="text-white font-manrope font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight">Técnico Asignado</h4>
                            <p className="text-[#00dfdf] text-xs md:text-sm font-bold font-manrope uppercase tracking-wider mt-1.5">Movilización Inmediata</p>
                        </div>
                        <div className="bg-[#00dfdf]/10 p-2 md:p-4 rounded-xl border border-[#00dfdf]/20 shrink-0"><UserCheck className="text-[#00dfdf] w-6 h-6 md:w-10 md:h-10" /></div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-lg font-inter leading-relaxed">
                        Profesional habilitado, con equipamiento adecuado y cumplimiento normativo, asignado al servicio.
                    </p>
                </motion.div>
            </div>

            {/* CARD D */}
            <div className="absolute w-full perspective-1000"> 
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

        {/* INDICADORES FINALES */}
        <motion.div 
            style={{ opacity: heroOpacity }}
            className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-3 z-30 pointer-events-none"
        >
             <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-white drop-shadow-md animate-pulse">Desliza</span>
             <ArrowDown className="text-[#00dfdf] animate-bounce w-5 h-5" />
        </motion.div>

        <motion.div 
            style={{ opacity: nextSectionHintOp }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
        >
            <span className="text-[#00dfdf] text-[10px] font-manrope font-bold uppercase tracking-widest whitespace-nowrap animate-pulse">
                Descubrí más
            </span>
            <div className="flex flex-col items-center gap-1">
                <Mouse className="text-[#00dfdf] w-5 h-5" />
                <ArrowDown className="text-[#00dfdf] w-3 h-3" />
            </div>
        </motion.div>

      </div>

      {/* 🎯 ZÓCALO FUERA DEL STICKY (TEXTO + BOTONES) */}
      <motion.div 
           style={{ 
              opacity: heroOpacity,
              y: heroY,
              // CORRECCIÓN: Usamos el transform para apagar clicks cuando se va, 
              // pero mientras está visible, dejamos que el usuario interactúe.
              pointerEvents: heroPointerEvents as any
           }}
           // CORRECCIÓN: Z-index 60 es suficiente para estar sobre Cards (z-20) pero bajo Navbar (z-100)
           className="fixed inset-0 z-[20] flex items-center justify-center md:items-end md:justify-start md:pb-24 md:px-16 pointer-events-none"
      >
         <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
            className="flex flex-col items-center w-full max-w-[90vw] md:max-w-[60vw] lg:max-w-[50vw] md:items-start pointer-events-auto px-6 md:px-0"
         >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00dfdf] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00dfdf]"></span>
                </span>
                <span className="text-xs font-manrope font-bold text-white tracking-widest uppercase">
                  Mantenimiento Total
                </span>
            </motion.div>

            {/* H1 */}
            <motion.h1 variants={itemVariants} className="font-manrope font-extrabold text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl text-[clamp(2.5rem,5vw,4.5rem)] text-center md:text-left">
                Soluciones integrales<br />
                <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#006262] via-[#00dfdf] to-[#006262] bg-[length:200%_auto]"
                    animate={{ backgroundPosition: ["0% center", "200% center"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    para tus activos.
                </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="font-inter text-gray-100 leading-relaxed max-w-xl md:border-l-4 border-[#00dfdf]/30 md:pl-6 mb-10 drop-shadow-lg text-[clamp(1rem,1.2vw,1.25rem)] text-center md:text-left">
                Electricidad, refrigeración, carpintería metálica, <span className="whitespace-nowrap">obra seca</span>, pintura, remodelaciones en general y más, <strong className="text-white font-bold"><span className="whitespace-nowrap">en un solo lugar.</span></strong>
            </motion.p>

            {/* BUTTONS */}
            <motion.div 
               variants={itemVariants}
               className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto items-center"
            >
                 <a 
                    href="#horizontal-services" 
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' });
                    }}
                    className="group relative inline-flex h-14 sm:h-16 items-center justify-center px-6 sm:px-10 bg-white hover:bg-gray-200 rounded-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
                 >
                    <span className="relative z-10 font-manrope font-extrabold text-black text-base sm:text-lg tracking-wide flex items-center gap-3">
                        Ver el Proceso <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                 </a>
                 
                 <a 
                    href="#cta-section" 
                    onClick={(e) => handleScrollTo(e, "cta-section")}
                    className="group inline-flex h-14 sm:h-16 items-center justify-center px-6 sm:px-10 bg-white/10 border border-white/50 hover:border-white text-white font-manrope font-bold text-base sm:text-lg rounded-lg backdrop-blur-md transition-all hover:bg-white/20 w-full sm:w-auto"
                 >
                    <span className="flex items-center gap-2">
                        <Wrench size={20} className="text-[#00dfdf] group-hover:rotate-12 transition-transform" /> 
                        Hablar con un técnico
                    </span>
                 </a>
            </motion.div>
         </motion.div>
      </motion.div>
    </section>
  );
}