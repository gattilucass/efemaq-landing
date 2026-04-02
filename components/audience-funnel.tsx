"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion"
import { 
  Building2, 
  Home, 
  ArrowRight, 
  ChevronDown, 
  Store, 
  Loader2 
} from 'lucide-react'
import { useIsMobile } from "@/hooks/use-mobile"

export default function AudienceFunnel() {
  const containerRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  
  // Estado para manejar cual botón está cargando
  const [loadingPath, setLoadingPath] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // --- CONFIG SCROLL OPTIMIZADA ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Física ligera para móvil (Linear) vs Pesada para PC (Spring)
  const springConfig = isMobile 
    ? { stiffness: 200, damping: 30, restDelta: 0.01 }
    : { stiffness: 40, damping: 20, restDelta: 0.001 }

  const smoothScroll = useSpring(scrollYProgress, springConfig)

  // --- TRANSFORMACIONES ---
  const titleY = useTransform(smoothScroll, [0.2, 1], [0, -100])
  const titleOpacity = useTransform(smoothScroll, [0.6, 0.9], [1, 0])
  const cardsY = useTransform(smoothScroll, [0, 1], [100, -100])
  
  const bridgeOpacity = useTransform(smoothScroll, [0.25, 0.5], [0, 1]) 
  const bridgeY = useTransform(smoothScroll, [0.25, 0.5], [100, 0]) 
  const lineGrow = useTransform(smoothScroll, [0.4, 0.8], ["0%", "100%"]) 

  // Animación de flotación (CSS Keyframes preferible en móvil, pero mantenemos framer optimizado)
  const floatingTransition = { 
    duration: 6, 
    repeat: Number.POSITIVE_INFINITY, 
    ease: "easeInOut" 
  } as const

  // --- LÓGICA DE NAVEGACIÓN ---
  const handleNavigation = (path: string) => {
    if (loadingPath) return;
    setLoadingPath(path);
    router.push(path);
  };

  return (
    <section 
        id="audience-funnel"
        ref={containerRef} 
        className="relative w-full pt-24 pb-64 md:pt-32 md:pb-72 px-4 overflow-hidden bg-[#0a0a0a]"
    >
      
      {/* FONDO OPTIMIZADO */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
         <div 
            className="absolute inset-0 opacity-[0.05] md:opacity-[0.1]" 
            style={{ 
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                backgroundSize: '40px 40px' 
            }} 
         />
         {/* Glow estático para evitar repaints costosos */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#006262] opacity-10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none will-change-transform" />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* --- HEADER --- */}
        <motion.div 
            className="flex flex-col items-center text-center mb-16 relative z-30 will-change-transform"
            style={{ opacity: titleOpacity, y: titleY }}
        >
            <div className="flex items-center gap-3 px-4 py-1.5 mb-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg shadow-[#006262]/10">
                 <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00dfdf] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00dfdf]"></span>
                 </span>
                 {/* CAMBIO SOLICITADO: "Acceso al Sistema" -> "Explorar" */}
                 <span className="text-[10px] md:text-xs font-manrope text-white tracking-widest uppercase font-bold">
                    Explorar
                 </span>
            </div>

            <h2 className="font-manrope text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight z-30 leading-tight text-white">
                <motion.span 
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00dfdf] via-white to-[#00dfdf] bg-[length:200%_auto]"
                    animate={{ backgroundPosition: ["0% center", "200% center"] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                    ¿Qué solución buscás?
                </motion.span>
                
                <motion.div 
                    className="h-1 mt-3 mx-auto bg-gradient-to-r from-transparent via-[#00dfdf] to-transparent rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "140px", opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                />
            </h2>
        </motion.div>


        {/* --- CARDS (Optimizadas con will-change) --- */}
        <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full px-2 lg:px-8 items-stretch will-change-transform"
            style={{ y: cardsY }}
        >
            
            {/* CARD 1 (ADMINS & EMPRESAS) */}
            <motion.div 
                animate={!isMobile ? { y: [0, -10, 0] } : undefined} // Desactivar flotación en móvil si es muy pesado
                transition={floatingTransition} 
                className="h-full"
            >
                <div
                    onClick={() => handleNavigation("/para-administradores")}
                    className={`group h-full relative flex flex-col overflow-hidden rounded-2xl bg-[#121212] border transition-all duration-300 shadow-2xl cursor-pointer
                        ${loadingPath === "/para-administradores" ? "border-[#00dfdf] scale-[0.98] opacity-80" : "border-white/10 hover:border-[#00dfdf]/60 hover:shadow-[#00dfdf]/10"}
                    `}
                >
                     <div className="p-8 md:p-10 flex flex-col h-full relative z-30">
                        <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-xl bg-[#006262]/20 border border-[#006262]/40 group-hover:scale-105 transition-transform duration-300">
                           <Building2 size={32} className="text-[#00dfdf]" />
                        </div>
                        
                        <h3 className="font-manrope text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-[#00dfdf] transition-colors">
                            Administradores & Empresas
                        </h3>
                        <p className="font-inter text-lg text-gray-400 leading-relaxed mb-8 flex-1 border-l-2 border-[#006262]/30 pl-4">
                           Soluciones de Facility Management. Centralizá tickets, historial técnico y compliance de proveedores.
                        </p>

                        <div className="mt-auto w-full">
                           <div className="flex items-center justify-between py-5 px-6 rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#00dfdf] group-hover:border-[#00dfdf] transition-all duration-300">
                               <span className="font-manrope font-bold text-white group-hover:text-black text-base tracking-wide flex items-center gap-2">
                                   {loadingPath === "/para-administradores" ? "Iniciando..." : "Soluciones Corporativas"}
                               </span>
                               <div className={`bg-white/10 rounded-full p-1 group-hover:bg-black/20 transition-transform ${loadingPath === "/para-administradores" ? "animate-spin" : ""}`}>
                                  {loadingPath === "/para-administradores" ? (
                                      <Loader2 size={18} className="text-white group-hover:text-black" />
                                  ) : (
                                      <ArrowRight size={18} className="text-white group-hover:text-black" />
                                  )}
                               </div>
                           </div>
                        </div>
                     </div>
                     {/* Gradiente estático en lugar de animado para performance */}
                     <div className="absolute inset-0 bg-gradient-to-b from-[#00dfdf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
            </motion.div>


            {/* CARD 2 (PARTICULAR) */}
            <motion.div 
                animate={!isMobile ? { y: [0, -12, 0] } : undefined} 
                transition={{ ...floatingTransition, delay: 0.8 }} 
                className="h-full"
            >
                <div
                    onClick={() => handleNavigation("/para-particulares")}
                    className={`group h-full relative flex flex-col overflow-hidden rounded-2xl bg-[#121212] border transition-all duration-300 shadow-2xl cursor-pointer
                        ${loadingPath === "/para-particulares" ? "border-[#00dfdf] scale-[0.98] opacity-80" : "border-white/10 hover:border-[#00dfdf]/60 hover:shadow-[#00dfdf]/10"}
                    `}
                >
                     <div className="p-8 md:p-10 flex flex-col h-full relative z-30">
                        <div className="mb-6 flex gap-4">
                            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[#006262]/20 border border-[#006262]/40 group-hover:scale-105 transition-transform duration-300">
                                <Home size={28} className="text-[#00dfdf]" />
                            </div>
                            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[#006262]/10 border border-[#006262]/30 group-hover:scale-105 transition-transform duration-300 delay-75">
                                <Store size={28} className="text-[#00dfdf]/70 group-hover:text-[#00dfdf] transition-colors" />
                            </div>
                        </div>

                        <h3 className="font-manrope text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-[#00dfdf] transition-colors">
                            Hogares & Comercios
                        </h3>
                        <p className="font-inter text-lg text-gray-400 leading-relaxed mb-8 flex-1 border-l-2 border-[#006262]/30 pl-4">
                           Mantenimiento preventivo y correctivo. Diagnósticos claros y efectivos, personal verificado, garantía y seguimiento.
                        </p>

                         <div className="mt-auto w-full">
                           <div className="flex items-center justify-between py-5 px-6 rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#00dfdf] group-hover:border-[#00dfdf] transition-all duration-300">
                               <span className="font-manrope font-bold text-white group-hover:text-black text-base tracking-wide">
                                    {loadingPath === "/para-particulares" ? "Iniciando..." : "Soluciones Residenciales"}
                               </span>
                               <div className={`bg-white/10 rounded-full p-1 group-hover:bg-black/20 transition-transform ${loadingPath === "/para-particulares" ? "animate-spin" : ""}`}>
                                  {loadingPath === "/para-particulares" ? (
                                      <Loader2 size={18} className="text-white group-hover:text-black" />
                                  ) : (
                                      <ArrowRight size={18} className="text-white group-hover:text-black" />
                                  )}
                               </div>
                           </div>
                        </div>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-b from-[#00dfdf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
            </motion.div>

        </motion.div>

      </div>

      {/* --- CONNECTOR AL BOT (LIMPIO) --- */}
      <motion.div 
          className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end z-0 pointer-events-none will-change-transform"
          style={{ opacity: bridgeOpacity, y: bridgeY }}
      >
          <div className="flex flex-col items-center gap-3 mb-2">
               {/* ELIMINADO EL BADGE "EXPLORAR/PRÓXIMO PASO" AQUÍ */}
               
               <h4 className="text-white font-manrope text-xl md:text-2xl font-medium text-center px-4">
                  El motor de todo esto es <span className="text-[#00dfdf] font-bold">invisible</span>.
               </h4>
               <ChevronDown className="text-white/30 animate-bounce mt-2" size={24} />
          </div>
          
          <div className="w-px h-[120px] bg-white/10 relative overflow-hidden">
               <motion.div 
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00dfdf] via-[#00dfdf] to-transparent"
                  style={{ height: lineGrow }}
               />
          </div>
      </motion.div>

    </section>
  )
}