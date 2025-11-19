"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { Search, HardHat, CheckCircle2, ArrowDown, Activity } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // --- 1. CONFIGURACIÓN DEL SCROLL ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothY = useSpring(scrollYProgress, {
    mass: 0.6,
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // --- 2. TRANSFORMACIONES ---

  // SCANNER LINE
  const scanLineTop = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const scanColor = useTransform(smoothY, [0.1, 0.4, 0.75], ["#f59e0b", "#00dfdf", "#10b981"]);
  
  // Textos Cápsula
  const showT1 = useTransform(smoothY, [0, 0.25], [1, 0]);       
  const showT2 = useTransform(smoothY, [0.3, 0.35, 0.6, 0.65], [0, 1, 1, 0]); 
  const showT3 = useTransform(smoothY, [0.65, 0.7], [0, 1]); 

  // CARDS
  const c1Op = useTransform(smoothY, [0.02, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
  const c1Y = useTransform(smoothY, [0.02, 0.3], [40, -40]);

  const c2Op = useTransform(smoothY, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const c2Y = useTransform(smoothY, [0.35, 0.65], [40, -40]);

  const c3Op = useTransform(smoothY, [0.7, 0.75, 0.99, 1], [0, 1, 1, 1]); 
  const c3Y = useTransform(smoothY, [0.7, 0.85], [40, 0]); 

  // UI GLOBAL (Desaparece al final)
  const contentY = useTransform(smoothY, [0, 1], [0, -20]); 
  const contentOpacity = useTransform(smoothY, [0.9, 0.98], [1, 0]); 
  const contentScale = useTransform(smoothY, [0, 0.7], [1, 1.05]);

  // FONDO
  const overlayOpacity = useTransform(smoothY, [0, 1], [0.75, 0.95]); 
  const videoScale = useTransform(smoothY, [0, 1], [1, 1.15]);

  // --- 3. ANIMACIÓN DE ENTRADA RÁPIDA ---
  const entryContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, 
        delayChildren: 0.1,    
      }
    }
  };

  const entryItem: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
      
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* --- LAYER 0: VIDEO --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
             {mounted && (
                 <motion.div className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <motion.div style={{ scale: videoScale }} className="w-full h-full">
                        <video className="w-full h-full object-cover" autoPlay muted loop playsInline style={{ opacity: 0.6 }} poster="/hero-poster.jpg">
                            <source src="/hero-video.mp4" type="video/mp4" />
                        </video>
                    </motion.div>
                 </motion.div>
             )}
             <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-[#050505]" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        {/* --- LAYER 1: SCANNER LINE + CAPSULA --- */}
        {/* Agregué 'opacity: contentOpacity' para que se vaya sutilmente al llegar al fondo */}
        <motion.div 
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ opacity: contentOpacity }}
        >
             <motion.div 
                style={{ top: scanLineTop }} 
                className="absolute left-0 w-full h-px z-30 flex justify-end pr-6 md:pr-16"
             >
                 {/* Línea */}
                 <motion.div style={{ backgroundColor: scanColor, boxShadow: "0 0 25px 2px var(--tw-shadow-color)" }} className="absolute left-0 bottom-0 w-full h-[1.5px] shadow-current opacity-90" />

                 {/* CÁPSULA MEJORADA */}
                 <motion.div 
                    className="relative -top-5"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                 >
                     {/* Contenedor Glassmorphism con Borde Dinámico */}
                     <motion.div 
                        className="flex items-center gap-3 pl-4 pr-5 h-10 rounded-full bg-[#050505]/80 border backdrop-blur-lg shadow-[0_0_30px_-10px_currentColor]"
                        style={{ borderColor: scanColor, color: scanColor }}
                     >
                         {/* Dot Pulsante */}
                         <div className="relative flex items-center justify-center">
                             <motion.div style={{ backgroundColor: scanColor }} className="w-2 h-2 rounded-full z-10" />
                             <motion.div style={{ backgroundColor: scanColor }} className="absolute inset-0 rounded-full animate-ping opacity-80" />
                         </div>
                         {/* Separador */}
                         <div className="w-px h-4 bg-white/10" />
                         
                         {/* Textos */}
                         <div className="relative w-28 h-full flex items-center">
                             <motion.span style={{ opacity: showT1, color: "#f59e0b" }} className="absolute inset-0 flex items-center text-[10px] font-manrope font-bold tracking-[0.15em] uppercase">
                                 Analizando
                             </motion.span>
                             <motion.span style={{ opacity: showT2, color: "#00dfdf" }} className="absolute inset-0 flex items-center text-[10px] font-manrope font-bold tracking-[0.15em] uppercase">
                                 Procesando
                             </motion.span>
                             <motion.span style={{ opacity: showT3, color: "#10b981" }} className="absolute inset-0 flex items-center text-[10px] font-manrope font-bold tracking-[0.15em] uppercase">
                                 Verificado
                             </motion.span>
                         </div>
                     </motion.div>
                 </motion.div>
             </motion.div>
        </motion.div>

        {/* --- CARDS DE FASES (DISTRIBUCIÓN VERTICAL OK) --- */}
        <div className="absolute inset-y-0 right-4 md:right-[10vw] z-20 pointer-events-none w-[320px] md:w-[400px]">
            
            {/* POSICIÓN 1: ARRIBA */}
            <div className="absolute top-[25vh] w-full perspective-[1000px]">
                <motion.div style={{ opacity: c1Op, y: c1Y, rotateX: 10 }} className="w-full p-6 rounded-2xl bg-[#0e0e0e]/90 border border-white/10 border-l-[6px] border-l-amber-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl origin-top">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-white font-manrope font-extrabold text-xl tracking-tight">Falla Detectada</h4>
                            <p className="text-amber-500 text-xs font-bold font-manrope uppercase tracking-wider mt-1">Escaneo Inicial</p>
                        </div>
                        <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20"><Search className="text-amber-500 w-6 h-6" /></div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2"><div className="h-full w-1/3 bg-amber-500 rounded-full animate-pulse" /></div>
                </motion.div>
            </div>

            {/* POSICIÓN 2: MEDIO */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full perspective-[1000px]">
                <motion.div style={{ opacity: c2Op, y: c2Y, rotateX: 10 }} className="w-full p-6 rounded-2xl bg-[#0e0e0e]/90 border border-white/10 border-l-[6px] border-l-[#00dfdf] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-white font-manrope font-extrabold text-xl tracking-tight">Asignando Técnico</h4>
                            <p className="text-[#00dfdf] text-xs font-bold font-manrope uppercase tracking-wider mt-1">Gestión en Curso</p>
                        </div>
                        <div className="bg-[#00dfdf]/10 p-2.5 rounded-xl border border-[#00dfdf]/20"><HardHat className="text-[#00dfdf] w-6 h-6" /></div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                        <motion.div className="h-full bg-[#00dfdf] rounded-full" initial={{ width: 0 }} whileInView={{ width: "70%" }} transition={{ duration: 1 }} />
                    </div>
                </motion.div>
            </div>

            {/* POSICIÓN 3: ABAJO */}
            <div className="absolute bottom-[25vh] w-full perspective-[1000px]">
                <motion.div style={{ opacity: c3Op, y: c3Y }} className="w-full p-6 rounded-2xl bg-[#050505]/95 border border-emerald-500/30 border-l-[6px] border-l-emerald-500 shadow-[0_0_60px_-10px_rgba(16,185,129,0.15)] backdrop-blur-xl origin-bottom">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                             <h4 className="text-white font-manrope font-extrabold text-xl tracking-tight">Problema Resuelto</h4>
                             <div className="flex items-center gap-1.5 mt-1">
                                <Activity size={14} className="text-emerald-500" />
                                <span className="text-emerald-500 text-xs font-bold font-manrope tracking-widest uppercase">Garantía Activa</span>
                             </div>
                        </div>
                        <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]"><CheckCircle2 className="w-6 h-6" /></div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-dashed border-white/10">
                        <p className="text-xs text-emerald-100/70 font-manrope leading-relaxed">Mantenimiento ejecutado con éxito. Reporte digital enviado y seguimiento 24/7 habilitado.</p>
                    </div>
                </motion.div>
            </div>
        </div>


        {/* --- LAYER 2: ZÓCALO TEXTO --- */}
        <motion.div 
             className="absolute bottom-0 left-0 z-40 w-full max-w-[90vw] md:max-w-3xl px-6 md:px-16 pb-16 md:pb-24 pointer-events-auto"
             style={{ 
                opacity: contentOpacity, 
                y: contentY, 
                scale: contentScale 
             }} 
        >
            <motion.div initial="hidden" animate="visible" variants={entryContainer} className="mb-6">
                {/* Badge */}
                <motion.div variants={entryItem} className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 cursor-default transition-colors hover:border-white/30">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00dfdf] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00dfdf]"></span>
                    </span>
                    <span className="text-[10px] md:text-xs font-inter font-bold text-gray-300 tracking-[0.15em] uppercase">Sistema de Garantía Total</span>
                </motion.div>

                {/* H1 */}
                <motion.h1 variants={entryItem} className="font-manrope font-extrabold text-4xl md:text-5xl lg:text-7xl text-white leading-[1] tracking-tighter mb-5 drop-shadow-2xl">
                    Basta de parches. <br />
                    <motion.span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#006262] via-[#00dfdf] to-[#006262] bg-[length:200%_auto]"
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                        Soluciones 360°
                    </motion.span>
                    .
                </motion.h1>

                {/* Parrafo */}
                <motion.p variants={entryItem} className="font-inter text-base md:text-lg text-gray-400/90 leading-relaxed max-w-lg border-l-2 border-[#00dfdf]/30 pl-5 mb-8">
                    Combinamos <strong className="text-gray-100 font-semibold">mano de obra experta</strong> con <strong className="text-gray-100 font-semibold">seguimiento digital</strong> para tu tranquilidad definitiva.
                </motion.p>

                {/* Botones */}
                <motion.div variants={entryItem} className="flex flex-col sm:flex-row gap-3 pt-1">
                     <a href="#contact" className="inline-flex h-12 items-center justify-center px-8 bg-[#006262] hover:bg-[#004d4d] text-white font-manrope font-bold text-base tracking-wide rounded transition-all shadow-[0_5px_20px_rgba(0,98,98,0.4)] hover:translate-y-[-1px]">
                        Pedí tu Diagnóstico
                     </a>
                     <a href="#system" className="inline-flex h-12 items-center justify-center px-8 bg-transparent border border-white/20 hover:bg-white/5 text-white font-manrope font-medium text-base rounded transition-all">
                        Ver Demo
                     </a>
                </motion.div>
            </motion.div>
        </motion.div>

        {/* SCROLL HINT */}
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
            style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
            className="absolute right-6 bottom-10 hidden md:flex flex-col items-center gap-3 z-40 pointer-events-none"
        >
             <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-white/40 [writing-mode:vertical-lr] rotate-180">Desliza</span>
             <div className="h-14 w-px bg-white/10 overflow-hidden">
                 <motion.div className="w-full bg-[#00dfdf]" animate={{ height: ["0%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
             </div>
        </motion.div>

      </div>
    </section>
  );
}