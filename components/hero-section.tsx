"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { Search, HardHat, CheckCircle2, ArrowRight, Activity, MousePointer2 } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // --- 1. CONFIGURACIÓN DEL SCROLL (400VH) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothY = useSpring(scrollYProgress, {
    mass: 0.8,
    stiffness: 70, 
    damping: 25,
    restDelta: 0.001,
  });

  // --- 2. ZÓCALO IZQUIERDO ---
  const contentScale = useTransform(smoothY, [0, 0.7], [1, 0.9]);
  const contentY = useTransform(smoothY, [0, 0.7], [0, -100]); 
  const contentOpacity = useTransform(smoothY, [0.6, 0.7], [1, 0]); 

  // VIDEO
  const overlayOpacity = useTransform(smoothY, [0, 1], [0.75, 0.98]); 
  const videoScale = useTransform(smoothY, [0, 1], [1, 1.1]);

  // SCANNER
  const scanLineTop = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const scanColor = useTransform(smoothY, [0.1, 0.4, 0.75], ["#f59e0b", "#00dfdf", "#10b981"]);
  const showT1 = useTransform(smoothY, [0, 0.25], [1, 0]);       
  const showT2 = useTransform(smoothY, [0.3, 0.35, 0.6, 0.65], [0, 1, 1, 0]); 
  const showT3 = useTransform(smoothY, [0.65, 0.7], [0, 1]); 

  // --- 3. ANIMACIONES DE CARDS ---

  // CARD 1 (Problema)
  const c1Op = useTransform(smoothY, [0.05, 0.1, 0.28, 0.33], [0, 1, 1, 0]);
  const c1Y  = useTransform(smoothY, [0.05, 0.33], [150, -150]); 
  const c1Scale = useTransform(smoothY, [0.1, 0.3], [0.95, 1]); 

  // CARD 2 (Gestión)
  const c2Op = useTransform(smoothY, [0.33, 0.38, 0.62, 0.67], [0, 1, 1, 0]);
  const c2Y  = useTransform(smoothY, [0.33, 0.67], [150, -150]);
  const c2Scale = useTransform(smoothY, [0.35, 0.6], [0.95, 1]);

  // --- CARD 3 (EL CLÍMAX - VALORES A MODIFICAR) ---
  
  // Entrada:
  const c3Op = useTransform(smoothY, [0.67, 0.72, 0.98, 1], [0, 1, 1, 0]);
  
  // Y: Viaje vertical
  const c3Y  = useTransform(smoothY, [0.67, 0.8, 0.95], [150, 0, 0]); 
  
  // X: CENTRADO (ACÁ MODIFICAS SI QUIERES MAS O MENOS AL CENTRO)
  // Si pones un número más negativo (ej: -500) se va más a la izquierda.
  // Si pones un número menos negativo (ej: -300) se queda más a la derecha.
  // Ahora está en -420px, debería ser el punto justo.
  const c3X = useTransform(smoothY, [0.67, 0.9], [0, -420]); // <--- TOCÁ ACÁ EL SEGUNDO NÚMERO PARA MOVER IZQ/DER
  
  // Scale (ACÁ MODIFICAS EL TAMAÑO FINAL)
  // Antes estaba en 1.25. Ahora lo bajé a 1.05 (crece muy poquito).
  const c3Scale = useTransform(smoothY, [0.67, 0.9], [0.95, 1.05]); // <--- TOCÁ EL 1.05 SI QUERÉS MAS GRANDE O CHICO

  // --- 4. ANIMACIÓN SVG (SIN PAUSAS) ---
  const circleDraw = useTransform(smoothY, [0.68, 0.78], [0, 1]);
  const checkDraw = useTransform(smoothY, [0.76, 0.85], [0, 1]);
  const checkGlow = useTransform(smoothY, [0.83, 0.9], [0, 1]);

  
  // --- ENTRADA ---
  const entryContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  };
  const entryItem: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
      
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none">
             {mounted && (
                 <motion.div className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <motion.div style={{ scale: videoScale }} className="w-full h-full">
                        <video className="w-full h-full object-cover" autoPlay muted loop playsInline style={{ opacity: 0.5 }} poster="/hero-poster.jpg">
                            <source src="/hero-video.mp4" type="video/mp4" />
                        </video>
                    </motion.div>
                 </motion.div>
             )}
             <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-[#020202]" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_120%)]" />
        </div>

        {/* SCANNER */}
        <motion.div className="absolute inset-0 z-20 pointer-events-none" style={{ opacity: contentOpacity }}>
             <motion.div style={{ top: scanLineTop }} className="absolute left-0 w-full h-px z-30 flex justify-end pr-6 md:pr-16">
                 <motion.div style={{ backgroundColor: scanColor, boxShadow: "0 0 25px 2px var(--tw-shadow-color)" }} className="absolute left-0 bottom-0 w-full h-[1.5px] shadow-current opacity-90" />
                 <motion.div className="relative -top-5" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
                     <motion.div 
                        className="flex items-center gap-3 pl-4 pr-5 h-10 rounded-full bg-[#050505]/80 border backdrop-blur-lg shadow-[0_0_30px_-10px_currentColor]"
                        style={{ borderColor: scanColor, color: scanColor } as any}
                     >
                         <div className="relative flex items-center justify-center">
                             <motion.div style={{ backgroundColor: scanColor }} className="w-2 h-2 rounded-full z-10" />
                             <motion.div style={{ backgroundColor: scanColor }} className="absolute inset-0 rounded-full animate-ping opacity-80" />
                         </div>
                         <div className="w-px h-4 bg-white/10" />
                         <div className="relative w-28 h-full flex items-center overflow-hidden">
                             <motion.span style={{ opacity: showT1, color: "#f59e0b" }} className="absolute inset-0 flex items-center text-[10px] font-manrope font-bold tracking-[0.15em] uppercase">Analizando</motion.span>
                             <motion.span style={{ opacity: showT2, color: "#00dfdf" }} className="absolute inset-0 flex items-center text-[10px] font-manrope font-bold tracking-[0.15em] uppercase">Procesando</motion.span>
                             <motion.span style={{ opacity: showT3, color: "#10b981" }} className="absolute inset-0 flex items-center text-[10px] font-manrope font-bold tracking-[0.15em] uppercase">Verificado</motion.span>
                         </div>
                     </motion.div>
                 </motion.div>
             </motion.div>
        </motion.div>


        {/* --- CARDS CONTAINER --- */}
        <div className="absolute inset-y-0 right-4 md:right-[10vw] z-20 pointer-events-none w-[340px] md:w-[450px] flex items-center justify-center"> 
            
            {/* C1 */}
            <div className="absolute w-full perspective-[1000px]">
                <motion.div style={{ opacity: c1Op, y: c1Y, scale: 0.95, rotateX: 5 }} className="w-full p-8 rounded-2xl bg-[#0e0e0e]/95 border border-white/10 border-l-[6px] border-l-amber-500 shadow-2xl backdrop-blur-xl origin-center">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-white font-manrope font-extrabold text-2xl tracking-tight">Incidente Reportado</h4>
                            <p className="text-amber-500 text-xs font-bold font-manrope uppercase tracking-wider mt-1">Ticket Entrante</p>
                        </div>
                        <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20"><Search className="text-amber-500 w-8 h-8" /></div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2"><div className="h-full w-1/3 bg-amber-500 rounded-full animate-pulse" /></div>
                </motion.div>
            </div>

            {/* C2 */}
            <div className="absolute w-full perspective-[1000px]">
                <motion.div style={{ opacity: c2Op, y: c2Y, scale: 0.95, rotateX: 5 }} className="w-full p-8 rounded-2xl bg-[#0e0e0e]/95 border border-white/10 border-l-[6px] border-l-[#00dfdf] shadow-2xl backdrop-blur-xl origin-center">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-white font-manrope font-extrabold text-2xl tracking-tight">Asignando Técnico</h4>
                            <p className="text-[#00dfdf] text-xs font-bold font-manrope uppercase tracking-wider mt-1">Logística & Materiales</p>
                        </div>
                        <div className="bg-[#00dfdf]/10 p-3 rounded-xl border border-[#00dfdf]/20"><HardHat className="text-[#00dfdf] w-8 h-8" /></div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                        <motion.div className="h-full bg-[#00dfdf] rounded-full" initial={{ width: 0 }} whileInView={{ width: "70%" }} transition={{ duration: 1 }} />
                    </div>
                </motion.div>
            </div>

            {/* C3 - SOLUCIÓN FINAL */}
            <div className="absolute w-full perspective-[1000px]"> 
                <motion.div 
                    style={{ 
                        opacity: c3Op, 
                        y: c3Y, 
                        x: c3X, 
                        scale: c3Scale 
                    }} 
                    className="w-full p-10 rounded-3xl bg-[#050505]/95 border border-emerald-500/40 border-l-[10px] border-l-emerald-500 shadow-[0_0_120px_-30px_rgba(16,185,129,0.25)] backdrop-blur-2xl origin-center"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-col">
                             <h4 className="text-white font-manrope font-extrabold text-4xl tracking-tight drop-shadow-lg">Problema Resuelto</h4>
                             <div className="flex items-center gap-2 mt-2">
                                <Activity size={18} className="text-emerald-400 animate-pulse" />
                                <span className="text-emerald-400 text-sm font-bold font-manrope tracking-widest uppercase">Garantía Activa</span>
                             </div>
                        </div>
                        
                        {/* ICONO SVG ANIMADO INMEDIATO */}
                        <div className="relative size-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center overflow-hidden">
                             <motion.div style={{ opacity: checkGlow }} className="absolute inset-0 bg-emerald-500 blur-xl opacity-20" />
                             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 z-10">
                                <motion.path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" style={{ pathLength: circleDraw }} />
                                <motion.path d="M22 4 12 14.01l-3-3" style={{ pathLength: checkDraw }} />
                             </svg>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-dashed border-emerald-500/20">
                        <p className="text-xl text-emerald-100 font-manrope font-medium leading-relaxed tracking-tight">
                            Mantenimiento ejecutado con éxito. Reporte digital enviado y seguimiento 24/7 habilitado.
                        </p>
                    </div>
                </motion.div>
            </div>

        </div>


        {/* ZÓCALO IZQUIERDO */}
        <motion.div 
             className="absolute bottom-0 left-0 z-40 w-full max-w-[90vw] md:max-w-3xl px-6 md:px-16 pb-12 md:pb-24 pointer-events-auto"
             style={{ 
                opacity: contentOpacity, 
                y: contentY, 
                scale: contentScale 
             }}
        >
            <motion.div initial="hidden" animate="visible" variants={entryContainer} className="mb-8 origin-bottom-left">
                <motion.div variants={entryItem} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00dfdf] shadow-[0_0_8px_#00dfdf] animate-pulse" />
                    <span className="text-xs font-manrope font-bold text-gray-200 tracking-widest uppercase">
                      Sistema de Garantía Total
                    </span>
                </motion.div>

                <motion.h1 variants={entryItem} className="font-manrope font-extrabold text-5xl md:text-7xl text-white leading-[0.95] tracking-tighter mb-6 drop-shadow-2xl">
                    Fin de la improvisación.<br />
                    <motion.span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#006262] via-[#00dfdf] to-[#006262] bg-[length:200%_auto]"
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        Sistema 360°
                    </motion.span>
                </motion.h1>

                <motion.p variants={entryItem} className="font-inter text-lg md:text-xl text-gray-400/90 leading-relaxed max-w-2xl border-l-4 border-[#00dfdf]/20 pl-6 mb-10">
                    Combinamos <strong className="text-white font-medium">mano de obra experta</strong> con <strong className="text-white font-medium">seguimiento digital</strong>. Transformamos la gestión de tu edificio.
                </motion.p>

                <motion.div variants={entryItem} className="flex flex-col sm:flex-row gap-5 pt-2">
                     <a href="#contact" className="group relative inline-flex h-16 items-center justify-center px-10 bg-[#006262] overflow-hidden rounded-lg shadow-[0_10px_40px_-10px_rgba(0,98,98,0.5)] transition-all hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(0,98,98,0.6)] active:scale-95">
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                        <span className="relative z-10 font-manrope font-bold text-white text-lg tracking-wide flex items-center gap-3">
                            Coordinar Visita <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                     </a>
                     <a href="#system" className="group inline-flex h-16 items-center justify-center px-10 bg-white/5 border border-white/10 text-white font-manrope font-bold text-lg rounded-lg backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5">
                        <span className="flex items-center gap-2">
                            <MousePointer2 size={18} className="text-[#00dfdf] group-hover:rotate-12 transition-transform" /> 
                            Ver Demo
                        </span>
                     </a>
                </motion.div>
            </motion.div>
        </motion.div>

        {/* SCROLL HINT */}
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
            className="absolute right-8 bottom-12 hidden md:flex flex-col items-center gap-4 z-40 pointer-events-none"
        >
             <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/40 [writing-mode:vertical-lr] rotate-180">Iniciar</span>
             <div className="h-14 w-px bg-white/10 overflow-hidden">
                 <motion.div className="w-full bg-[#00dfdf]" animate={{ height: ["0%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
             </div>
        </motion.div>

      </div>
    </section>
  );
}