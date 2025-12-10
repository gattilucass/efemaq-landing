"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  HardHat,
  Ear,
  ClipboardList
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export default function AboutUs() {
  const containerRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // --- CONFIG SCROLL OPTIMIZADA ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  })

  // Física ligera para móvil
  const springConfig = isMobile 
    ? { stiffness: 100, damping: 30, restDelta: 0.01 }
    : { stiffness: 50, damping: 20, restDelta: 0.001 }

  const smoothScroll = useSpring(scrollYProgress, springConfig)

  // --- ANIMACIONES ---
  const parallaxImg = useTransform(smoothScroll, [0, 1], [0, 50]) // Menos recorrido para evitar cortes
  
  // Textos Columna Derecha (Aparición secuencial suave)
  const fadeUpProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  // Animación Frase Final
  const quoteOpacity = useTransform(smoothScroll, [0.6, 0.8], [0, 1])
  const quoteY = useTransform(smoothScroll, [0.6, 0.8], [40, 0])
  const signatureDraw = useTransform(smoothScroll, [0.75, 0.95], [0, 1])

  return (
    <section 
        id="about-us"
        ref={containerRef} 
        // Padding ajustado para que no choque con navbar ni corte en laptops
        className="relative w-full py-20 lg:py-24 px-6 overflow-hidden bg-[#0a0a0a]"
    >
        {/* FONDO SUTIL */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
               className="absolute inset-0 opacity-[0.08]" 
               style={{ 
                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                   backgroundSize: '40px 40px' 
               }} 
            />
            {/* Glows optimizados */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#006262] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00dfdf] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
            
            {/* GRID PRINCIPAL */}
            {/* gap reducido para pantallas chicas (gap-12 en vez de 24) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                
                {/* [COLUMNA IZQ - IMAGEN + OVERLAY] */}
                <div className="relative h-fit w-full">
                    <motion.div style={{ y: !isMobile ? parallaxImg : 0 }} className="relative">
                        
                        {/* Aspect Ratio ajustado para ser más compacto */}
                        <div className="relative w-full aspect-[4/5] md:aspect-[1/1] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#101010] shadow-2xl group">
                             
                             {/* Imagen Técnica */}
                             <Image
                               src="/efemaq-team-professional-office.jpg" // Recomendación: Cambiar por foto de plano/obra/técnico midiendo
                               alt="Ingeniería y Procesos EFEMAQ"
                               fill
                               className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 ease-out"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

                             {/* BADGE SUPERIOR (Protocolos) */}
                             <div className="absolute top-6 left-6 right-6 flex justify-start">
                                 <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3">
                                     <ClipboardList size={16} className="text-[#00dfdf]" />
                                     <span className="text-white font-manrope font-bold text-xs tracking-widest uppercase">
                                         PROTOCOLOS TÉCNICOS
                                     </span>
                                 </div>
                             </div>
                             
                             {/* CTA "SUMATE" (OVERLAY INFERIOR) */}
                             <div className="absolute bottom-0 left-0 w-full p-6">
                                 <div className="bg-[#151515]/90 border border-white/10 p-5 rounded-xl flex items-center justify-between shadow-xl backdrop-blur-md transition-all hover:bg-[#1a1a1a]">
                                     <div className="flex items-center gap-4">
                                         <div className="w-10 h-10 rounded-full bg-[#00dfdf] flex items-center justify-center text-black shrink-0 shadow-[0_0_15px_rgba(0,223,223,0.4)]">
                                            <HardHat size={20} strokeWidth={2.5} />
                                         </div>
                                         <div className="text-left">
                                             <span className="block font-manrope font-bold text-white text-sm md:text-base leading-tight">
                                                 Sumate al equipo
                                             </span>
                                             <span className="block text-[10px] text-gray-400 mt-0.5 font-inter uppercase tracking-wide">
                                                 Buscamos Expertos
                                             </span>
                                         </div>
                                     </div>
                                     <Button 
                                        size="icon"
                                        className="rounded-full bg-white/10 hover:bg-[#00dfdf] hover:text-black text-white transition-all border border-white/10 w-10 h-10"
                                     >
                                        <ArrowRight size={18} />
                                     </Button>
                                 </div>
                             </div>

                        </div>
                    </motion.div>
                </div>

                {/* [COLUMNA DER - RELATO TÉCNICO] */}
                <div className="flex flex-col space-y-10 lg:pl-8">
                    
                    {/* 1. HEADER REFINADO */}
                    <motion.div {...fadeUpProps}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#00dfdf] animate-pulse" />
                             <span className="text-[10px] font-manrope font-bold text-gray-300 tracking-widest uppercase">
                                 TRANSFORMAMOS MANTENIMIENTO EN PRECISIÓN
                             </span>
                        </div>
                        
                        <h2 className="font-manrope text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                            No es improvisación,<br />
                            <span className="text-[#00dfdf]">
                                Es profesionalismo.
                            </span>
                        </h2>
                    </motion.div>

                    {/* 2. TEXTO TÉCNICO */}
                    <motion.div {...fadeUpProps} transition={{ delay: 0.1, duration: 0.8 }} className="space-y-6">
                        <div className="pl-6 border-l-2 border-[#00dfdf]/30 space-y-4">
                            <p className="font-inter text-lg text-gray-300 leading-relaxed">
                                Dejamos atrás las "improvisaciones". Aplicamos un <strong>proceso claro y estandarizado</strong> que define qué hacer, cómo hacerlo y cómo validar el resultado, asegurando soluciones que perduran.
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. STATS (Compactos) */}
                    <motion.div 
                        {...fadeUpProps} 
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="grid grid-cols-2 gap-4 pt-2"
                    >
                        <div className="p-4 rounded-xl bg-[#151515] border border-white/5 hover:border-[#00dfdf]/30 transition-all group">
                            <Award className="w-5 h-5 text-gray-500 mb-2 group-hover:text-[#00dfdf] transition-colors" />
                            <div className="text-2xl font-manrope font-bold text-white">+15 Años</div>
                            <p className="text-gray-500 text-xs font-inter">Trayectoria comprobable</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#151515] border border-white/5 hover:border-[#00dfdf]/30 transition-all group">
                            <ShieldCheck className="w-5 h-5 text-gray-500 mb-2 group-hover:text-[#00dfdf] transition-colors" />
                            <div className="text-2xl font-manrope font-bold text-white">100%</div>
                            <p className="text-gray-500 text-xs font-inter">Garantía escrita</p>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* --- BLOQUE FRASE CENTRAL (Full Width & Centrado) --- */}
            <motion.div 
                style={{ y: quoteY, opacity: quoteOpacity }}
                className="relative w-full border-t border-white/10 pt-16 flex flex-col items-center text-center"
            >
                <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#00dfdf]/10 border border-[#00dfdf]/30 flex items-center justify-center text-[#00dfdf]">
                        <Ear size={24} />
                    </div>
                </div>

                <blockquote className="font-manrope font-medium text-lg md:text-2xl text-white leading-relaxed max-w-4xl mx-auto mb-10 px-4">
                    "La tranquilidad aparece cuando alguien entiende lo que necesitás y actúa con criterio y responsabilidad. No es cuestión de decir 'ya voy', sino de un proceso claro que informa, acompaña y demuestra resultados.
                    <br className="block mt-4" />
                    <span className="text-gray-400 block text-base md:text-xl">
                        Ahí se construye la confianza: con <strong className="text-[#00dfdf]">escucha, claridad y profesionalismo.</strong>"
                    </span>
                </blockquote>

                {/* FIRMA "Fernando" (Rediseño Realista) */}
                <div className="flex flex-col items-center gap-2 mt-2">
                    <svg width="240" height="80" viewBox="0 0 240 80" fill="none" className="overflow-visible">
                        
                        {/* 1. CUERPO DE LA F */}
                        <motion.path 
                            d="M 55 10 C 45 8, 35 20, 40 40 C 42 55, 38 65, 35 70" 
                            stroke="#00dfdf" 
                            strokeWidth="2" 
                            fill="none"
                            strokeLinecap="round"
                            style={{ pathLength: signatureDraw }}
                        />
                        
                        {/* 2. NOMBRE COMPLETO FLUIDO */}
                        <motion.path 
                            d="M 20 38 C 35 36, 55 36, 60 38 C 65 30, 72 30, 70 40 C 75 35, 80 42, 85 40 C 90 38, 95 42, 100 40 C 105 35, 110 30, 112 45 C 118 40, 125 40, 130 42 C 135 38, 140 45, 150 40" 
                            stroke="#00dfdf" 
                            strokeWidth="2" 
                            fill="none"
                            strokeLinecap="round"
                            style={{ pathLength: signatureDraw }}
                        />

                        {/* 3. RÚBRICA FINAL */}
                        <motion.path 
                            d="M 45 60 Q 100 70, 160 55"
                            stroke="#00dfdf" 
                            strokeWidth="1.5" 
                            fill="none"
                            strokeLinecap="round"
                            opacity="0.5"
                            style={{ pathLength: signatureDraw }}
                        />
                    </svg>
                    
                    <div className="mt-1 text-center">
                        <p className="font-manrope font-bold text-white text-sm uppercase tracking-widest">Fernando</p>
                        <p className="text-xs text-gray-500 font-inter">Director General</p>
                    </div>
                </div>

            </motion.div>

        </div>
    </section>
  )
}