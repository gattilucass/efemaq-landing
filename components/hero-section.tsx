"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { 
  ArrowRight, 
  Wrench,
  ArrowDown
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // "start" alinea el tope del elemento con el tope de la pantalla
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Variantes simples para entrada de texto (Fade Up)
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
        transition: { duration: 0.8 } 
    }
  };

  return (
    // Sección estática de pantalla completa
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
        {/* --- BACKGROUND LAYER (VIDEO + OSCURIDAD) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
             {mounted && (
                 <motion.div 
                    className="w-full h-full" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1.5 }}
                 >
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
                            <source src={isMobile ? "/hero-video-cel.mp4" : "/hero-video.mp4"} type="video/mp4" />
                        </video>
                        
                        {/* CAPA DE OSCURIDAD UNIFORME Y FUERTE */}
                        {/* Esto garantiza el contraste sin manchar los botones con viñetas raras */}
                        <div className="absolute inset-0 bg-black/80" /> 
                    </div>
                 </motion.div>
             )}
             
             {/* GRID SUTIL (Casi invisible, solo textura) */}
             <div 
                className="absolute inset-0 opacity-[0.1]" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                    backgroundSize: '40px 40px' 
                }} 
             />
        </div>

        {/* --- ZÓCALO DE CONTENIDO (Z-10, ESTÁTICO, SIN ANIMACIONES RARAS) --- */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-16 pointer-events-auto
             items-center text-center
             md:items-start md:text-left
             md:justify-end md:bottom-20
             md:w-[60vw] lg:w-[50vw]
             ">
            
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={containerVariants}
                className="flex flex-col items-center md:items-start w-full"
            >
                
                {/* Badge */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-lg">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00dfdf] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00dfdf]"></span>
                    </span>
                    <span className="text-xs font-manrope font-bold text-white tracking-widest uppercase">
                      Mantenimiento Integral
                    </span>
                </motion.div>

                {/* H1 */}
                <motion.h1 variants={itemVariants} className="font-manrope font-extrabold text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl
                    text-[clamp(2.5rem,5vw,4.5rem)]
                ">
                    Soluciones integrales<br />
                    <motion.span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#006262] via-[#00dfdf] to-[#006262] bg-[length:200%_auto]"
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        para tus activos.
                    </motion.span>
                </motion.h1>

                {/* Subtitle (Con ajustes de línea solicitados) */}
                <motion.p variants={itemVariants} className="font-inter text-gray-100 leading-relaxed max-w-xl md:border-l-4 border-[#00dfdf]/30 md:pl-6 mb-10 mx-auto md:mx-0 drop-shadow-lg
                    text-[clamp(1rem,1.2vw,1.25rem)]
                ">
                    Electricidad, refrigeración, carpintería metálica, <span className="whitespace-nowrap">obra seca</span>, pintura, remodelaciones en general y más, <strong className="text-white font-bold"><span className="whitespace-nowrap">en un solo lugar.</span></strong>
                </motion.p>

                {/* CTA Buttons - BLANCOS PUROS Y SIN OSCURIDAD */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto items-center md:items-start justify-center md:justify-start">
                     {/* Botón Principal: BLANCO ABSOLUTO */}
                     <a 
                        href="#process-section" 
                        onClick={(e) => handleScrollTo(e, "process-section")}
                        className="group relative inline-flex h-14 sm:h-16 items-center justify-center px-8 sm:px-10 bg-white hover:bg-gray-200 rounded-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
                        // Estilo inline forzado para evitar herencia de opacidad
                        style={{ backgroundColor: '#ffffff', color: '#000000', opacity: 1 }}
                     >
                        <span className="relative z-10 font-manrope font-extrabold text-black text-base sm:text-lg tracking-wide flex items-center gap-3">
                            Ver el Proceso <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                     </a>
                     
                     {/* Botón Secundario: GLASS LUMINOSO */}
                     <a 
                        href="#cta-section" 
                        onClick={(e) => handleScrollTo(e, "cta-section")}
                        className="group inline-flex h-14 sm:h-16 items-center justify-center px-8 sm:px-10 bg-white/10 border border-white/50 hover:border-white text-white font-manrope font-bold text-base sm:text-lg rounded-lg backdrop-blur-md transition-all hover:bg-white/20 w-full sm:w-auto"
                        style={{ color: '#ffffff', opacity: 1 }}
                     >
                        <span className="flex items-center gap-2">
                            <Wrench size={20} className="text-[#00dfdf] group-hover:rotate-12 transition-transform" /> 
                            Hablar con un técnico
                        </span>
                     </a>
                </motion.div>
            </motion.div>
        </div>

        {/* --- SCROLL INDICATOR --- */}
        <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-3 z-20 pointer-events-none"
        >
             <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-white drop-shadow-md animate-pulse">Desliza</span>
             <ArrowDown className="text-[#00dfdf] animate-bounce w-5 h-5" />
        </motion.div>

    </section>
  );
}