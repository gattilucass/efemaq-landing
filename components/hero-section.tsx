"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { 
  Search, 
  FileSearch, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  MousePointer2,
  Activity,
  CheckCircle2
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);

  // --- 1. CONFIGURACIÓN DEL SCROLL ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothY = useSpring(scrollYProgress, {
    mass: 0.8,
    stiffness: 60, 
    damping: 20,
    restDelta: 0.001,
  });

  // --- 2. ZÓCALO DE TEXTO ---
  const contentOpDesktop = useTransform(smoothY, [0, 0.7, 0.8], [1, 1, 0]);
  const contentOpMobile = useTransform(smoothY, [0, 0.15], [1, 0]);
  const finalContentOp = isMobile ? contentOpMobile : contentOpDesktop;

  const contentBlur = useTransform(smoothY, [0.7, 0.85], ["blur(0px)", "blur(10px)"]);
  const contentScale = useTransform(smoothY, [0.7, 0.85], [1, 0.95]);

  // VIDEO & FONDO
  const videoScale = useTransform(smoothY, [0, 1], [1, 1.15]);
  const videoOp = useTransform(smoothY, [0, 0.8], [0.8, 0.4]); 

  // SCANNER
  const scanLineTop = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const scanColor = useTransform(smoothY, 
    [0.1, 0.35, 0.65, 0.9], 
    ["#f59e0b", "#3b82f6", "#00dfdf", "#10b981"] 
  );

  // --- 3. ANIMACIONES DE CARDS ---
  
  // CARD 1: SOLICITUD
  const c1Op = useTransform(smoothY, [0.05, 0.1, 0.18, 0.22], [0, 1, 1, 0]);
  const c1Y  = useTransform(smoothY, [0.05, 0.22], [100, -100]); 
  const c1Scale = useTransform(smoothY, [0.1, 0.18], [0.95, 1]); 

  // CARD 2: DIAGNÓSTICO
  const c2Op = useTransform(smoothY, [0.22, 0.27, 0.38, 0.43], [0, 1, 1, 0]);
  const c2Y  = useTransform(smoothY, [0.22, 0.43], [100, -100]);
  const c2Scale = useTransform(smoothY, [0.27, 0.38], [0.95, 1]);

  // CARD 3: TÉCNICO
  const c3Op = useTransform(smoothY, [0.43, 0.48, 0.60, 0.65], [0, 1, 1, 0]);
  const c3Y  = useTransform(smoothY, [0.43, 0.65], [100, -100]);
  const c3Scale = useTransform(smoothY, [0.48, 0.60], [0.95, 1]);

  // CARD 4: SOLUCIONADO
  const entryStart = 0.70;
  const entrySettle = 0.85;

  const c4Op = useTransform(smoothY, [entryStart, entryStart + 0.1], [0, 1]);
  const c4Y  = useTransform(smoothY, [entryStart, entrySettle], [150, 0]); 
  const c4X = useTransform(smoothY, [entryStart, entrySettle], [0, isMobile ? 0 : "-35vw"]); 
  const c4Scale = useTransform(smoothY, [entryStart, entrySettle], [0.9, 1.05]); 

  // SVG CHECK
  const circleDraw = useTransform(smoothY, [0.70, 0.80], [0, 1]);
  const checkDraw = useTransform(smoothY, [0.75, 0.85], [0, 1]); 

  // --- ENTRADA INICIAL ---
  const entryContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const entryItem: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  // --- HANDLER DE SCROLL SUAVE (FIX BOTONES) ---
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Evita que cambie la URL (#hash)
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[350vh] bg-[#050505]">
      
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col">
        
        {/* --- BACKGROUND LAYER --- */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-[#050505]">
             {mounted && (
                 <motion.div className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                    <motion.div style={{ scale: videoScale, opacity: videoOp }} className="w-full h-full">
                        <video 
                            className="absolute inset-0 w-full h-full object-cover" 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            preload="none"
                        >
                            <source src="/hero-video.mp4" type="video/mp4" />
                        </video>
                    </motion.div>
                 </motion.div>
             )}
             
             <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_130%)]" />
             
             <div 
                className="absolute inset-0 opacity-[0.1]" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                    backgroundSize: '40px 40px' 
                }} 
             />
        </div>

        {/* --- SCANNER LINE --- */}
        <motion.div className="absolute inset-0 z-10 pointer-events-none">
             <motion.div style={{ top: scanLineTop }} className="absolute left-0 w-full h-px z-30 flex justify-end pr-4 md:pr-16">
                 <motion.div 
                    style={{ backgroundColor: scanColor, boxShadow: "0 0 25px 3px var(--tw-shadow-color)" }} 
                    className="absolute left-0 bottom-0 w-full h-[2px] shadow-current" 
                 />
                 <div className="relative -top-4 md:-top-6">
                     <div className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] md:text-[10px] font-mono text-white/70 backdrop-blur-md">
                        EVALUACIÓN EFEMAQ
                     </div>
                 </div>
             </motion.div>
        </motion.div>


        {/* --- CARDS CONTAINER --- */}
        <div className="absolute z-30 pointer-events-none flex items-center justify-center
                        w-full 
                        md:w-[620px] 
                        md:left-auto md:right-[15%] md:translate-x-0
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        "> 
            
            {/* CARD 1 */}
            <div className="absolute w-[90%] md:w-full perspective-1000">
                <motion.div 
                    style={{ opacity: c1Op, y: c1Y, scale: c1Scale, rotateX: 5 }} 
                    className="w-full p-6 md:p-10 rounded-2xl bg-[#0f0f0f]/95 border border-white/10 border-l-[6px] border-l-amber-500 shadow-2xl backdrop-blur-xl will-change-transform"
                >
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h4 className="text-white font-manrope font-extrabold text-2xl md:text-3xl tracking-tight">Solicitud Recibida</h4>
                            <p className="text-amber-500 text-xs md:text-sm font-bold font-manrope uppercase tracking-wider mt-1.5">Escucha Activa</p>
                        </div>
                        <div className="bg-amber-500/10 p-3 md:p-4 rounded-xl border border-amber-500/20"><Search className="text-amber-500 w-6 h-6 md:w-8 md:h-8" /></div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-lg font-inter leading-relaxed">
                        Sistema de guardia 24/7 activado. Validando unidad funcional y prioridad del incidente.
                    </p>
                </motion.div>
            </div>

            {/* CARD 2 */}
            <div className="absolute w-[90%] md:w-full perspective-1000">
                <motion.div 
                    style={{ opacity: c2Op, y: c2Y, scale: c2Scale, rotateX: 5 }} 
                    className="w-full p-6 md:p-10 rounded-2xl bg-[#0f0f0f]/95 border border-white/10 border-l-[6px] border-l-blue-500 shadow-2xl backdrop-blur-xl will-change-transform"
                >
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h4 className="text-white font-manrope font-extrabold text-2xl md:text-3xl tracking-tight">Diagnóstico</h4>
                            <p className="text-blue-500 text-xs md:text-sm font-bold font-manrope uppercase tracking-wider mt-1.5">Ingeniería Aplicada</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 md:p-4 rounded-xl border border-blue-500/20"><FileSearch className="text-blue-500 w-6 h-6 md:w-8 md:h-8" /></div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-lg font-inter leading-relaxed">
                        Análisis de causa raíz. No parchamos síntomas, diseñamos soluciones definitivas.
                    </p>
                </motion.div>
            </div>

            {/* CARD 3 */}
            <div className="absolute w-[90%] md:w-full perspective-1000">
                <motion.div 
                    style={{ opacity: c3Op, y: c3Y, scale: c3Scale, rotateX: 5 }} 
                    className="w-full p-6 md:p-10 rounded-2xl bg-[#0f0f0f]/95 border border-white/10 border-l-[6px] border-l-[#00dfdf] shadow-2xl backdrop-blur-xl will-change-transform"
                >
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h4 className="text-white font-manrope font-extrabold text-2xl md:text-3xl tracking-tight">Técnico Listo</h4>
                            <p className="text-[#00dfdf] text-xs md:text-sm font-bold font-manrope uppercase tracking-wider mt-1.5">En Camino</p>
                        </div>
                        <div className="bg-[#00dfdf]/10 p-3 md:p-4 rounded-xl border border-[#00dfdf]/20"><UserCheck className="text-[#00dfdf] w-6 h-6 md:w-8 md:h-8" /></div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-3 mb-4">
                        <motion.div className="h-full bg-[#00dfdf]" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 0.8 }} />
                    </div>
                    <p className="text-gray-400 text-sm md:text-lg font-inter leading-relaxed">
                        Personal matriculado, con seguro al día y herramientas adecuadas asignado a tu caso.
                    </p>
                </motion.div>
            </div>

        </div>

        {/* --- GRUPO 2: CARD CENTRAL (SOLUCIONADO) --- */}
        <div className="absolute z-30 pointer-events-none flex items-center justify-center
                w-full md:w-[620px]
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        ">
            <div className="absolute w-[95%] md:w-[120%] perspective-1000 origin-center"> 
                <motion.div 
                    style={{ 
                        opacity: c4Op, 
                        y: c4Y,
                        scale: c4Scale 
                    }} 
                    className="w-full p-8 md:p-14 rounded-[2rem] bg-[#050505] border border-emerald-500/50 border-l-[8px] md:border-l-[12px] border-l-emerald-500 shadow-[0_20px_100px_-20px_rgba(16,185,129,0.3)] backdrop-blur-2xl will-change-transform"
                >
                    <div className="flex items-start justify-between gap-6 mb-8">
                        <div className="flex flex-col">
                             <h4 className="text-white font-manrope font-extrabold text-3xl md:text-5xl tracking-tighter drop-shadow-lg">
                                 Solucionado
                             </h4>
                             <div className="flex items-center gap-3 mt-4">
                                <Activity size={24} className="text-emerald-400" />
                                <span className="text-emerald-400 text-sm md:text-base font-bold font-manrope tracking-widest uppercase">Garantía + Reporte</span>
                             </div>
                        </div>
                        
                        <div className="relative size-16 md:size-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
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
                    
                    <div className="mt-4 pt-8 border-t border-dashed border-emerald-500/20">
                        <p className="text-lg md:text-xl text-emerald-100/90 font-inter font-medium leading-relaxed">
                            Cierre de ticket digital con fotos del antes y después. Tu tranquilidad es nuestro activo.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>


        {/* --- ZÓCALO IZQUIERDO --- */}
        <motion.div 
             className="absolute top-0 md:top-auto md:bottom-24 left-0 z-20 w-full max-w-full md:max-w-3xl px-6 md:px-16 pt-32 md:pt-0 pointer-events-auto h-full flex flex-col justify-start md:justify-end"
             style={{ 
                opacity: finalContentOp, 
                filter: contentBlur,
                scale: contentScale
             }}
        >
            <motion.div initial="hidden" animate="visible" variants={entryContainer} className="mb-8 origin-bottom-left">
                
                <motion.div variants={entryItem} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-lg">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00dfdf] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00dfdf]"></span>
                    </span>
                    <span className="text-xs font-manrope font-bold text-gray-200 tracking-widest uppercase">
                      Mantenimiento Inteligente
                    </span>
                </motion.div>

                <motion.h1 variants={entryItem} className="font-manrope font-extrabold text-4xl sm:text-5xl md:text-7xl text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl">
                    Fin de la improvisación.<br />
                    <motion.span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#006262] via-[#00dfdf] to-[#006262] bg-[length:200%_auto]"
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        Sistema 360°
                    </motion.span>
                </motion.h1>

                <motion.p variants={entryItem} className="font-inter text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl md:max-w-2xl border-l-4 border-[#00dfdf]/30 pl-6 mb-10">
                    Combinamos <strong className="text-white font-semibold">ingeniería experta</strong> con <strong className="text-white font-semibold">trazabilidad digital</strong>. Transformamos la gestión de tus bienes.
                </motion.p>

                <motion.div variants={entryItem} className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto pb-8 md:pb-0">
                     {/* BOTONES CON FUNCIONALIDAD DE SCROLL REPARADA */}
                     <a 
                        href="#cta-section" 
                        onClick={(e) => handleScrollTo(e, "cta-section")}
                        className="group relative inline-flex h-14 md:h-16 items-center justify-center px-8 md:px-10 bg-[#00dfdf] overflow-hidden rounded-lg shadow-[0_0_30px_-10px_rgba(0,223,223,0.5)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                     >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 font-manrope font-bold text-[#050505] text-base md:text-lg tracking-wide flex items-center gap-3">
                            Coordinar Visita <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                     </a>
                     
                     <a 
                        href="#bot-section" 
                        onClick={(e) => handleScrollTo(e, "bot-section")}
                        className="group inline-flex h-14 md:h-16 items-center justify-center px-8 md:px-10 bg-white/5 border border-white/10 text-white font-manrope font-bold text-base md:text-lg rounded-lg backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 cursor-pointer"
                     >
                        <span className="flex items-center gap-2">
                            <MousePointer2 size={18} className="text-[#00dfdf] group-hover:-rotate-12 transition-transform" /> 
                            Ver Demo
                        </span>
                     </a>
                </motion.div>
            </motion.div>
        </motion.div>

        {/* --- SCROLL INDICATOR --- */}
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
            style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
            className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-12 flex flex-col items-center gap-3 z-40 pointer-events-none"
        >
             <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-white/40 animate-pulse">Desliza</span>
             <div className="w-px h-12 md:h-16 bg-white/10 relative overflow-hidden">
                <motion.div 
                    className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-transparent via-[#00dfdf] to-transparent"
                    animate={{ top: ["-40%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
             </div>
        </motion.div>

      </div>
    </section>
  );
}