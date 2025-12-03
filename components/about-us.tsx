"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  PenTool,
  HardHat,
  Ear
} from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function AboutUs() {
  const containerRef = useRef<HTMLElement>(null)

  // --- CONFIG SCROLL ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  })

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  })

  // --- ANIMACIONES ---
  const parallaxImg = useTransform(smoothScroll, [0, 1], [0, 80])
  
  // Textos Columna Derecha
  const titleY = useTransform(smoothScroll, [0, 0.2], [40, 0])
  const titleOp = useTransform(smoothScroll, [0, 0.25], [0, 1])
  
  const textY = useTransform(smoothScroll, [0.1, 0.3], [40, 0])
  const textOp = useTransform(smoothScroll, [0.1, 0.35], [0, 1])
  
  const statsY = useTransform(smoothScroll, [0.2, 0.4], [40, 0])
  const statsOp = useTransform(smoothScroll, [0.2, 0.45], [0, 1])
  
  const ctaY = useTransform(smoothScroll, [0.3, 0.5], [40, 0])
  const ctaOp = useTransform(smoothScroll, [0.3, 0.55], [0, 1])

  // Subrayado técnico
  const lineDraw = useTransform(smoothScroll, [0.15, 0.35], [0, 1])

  // --- ANIMACIÓN FRASE CENTRAL Y FIRMA ---
  const quoteContainerY = useTransform(smoothScroll, [0.6, 0.8], [50, 0])
  const quoteContainerOp = useTransform(smoothScroll, [0.6, 0.8], [0, 1])
  const signatureDraw = useTransform(smoothScroll, [0.75, 0.95], [0, 1])

  return (
    <section 
    id="about-us"
        ref={containerRef} 
        className="relative w-full py-24 lg:py-32 px-6 overflow-hidden bg-[#0a0a0a]"
    >
        {/* FONDO SUTIL */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
               className="absolute inset-0 opacity-[0.1]" 
               style={{ 
                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                   backgroundSize: '40px 40px' 
               }} 
            />
            {/* Glow ambiental derecho */}
            <div className="absolute top-1/4 right-[-5%] w-[500px] h-[500px] bg-[#006262] opacity-[0.06] blur-[100px] rounded-full" />
            {/* Glow ambiental central-abajo para la frase */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00dfdf] opacity-[0.03] blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
            
            {/* GRID PRINCIPAL (IMAGEN + TEXTO) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
                
                {/* [COLUMNA IZQ - IMAGEN PARALLAX] */}
                <div className="relative lg:sticky lg:top-32 h-fit w-full">
                    <motion.div style={{ y: parallaxImg }} className="relative">
                        
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#101010] shadow-2xl group">
                             {/* Esquinas Técnicas */}
                             <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00dfdf]/30 rounded-tl-xl z-20" />
                             <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00dfdf]/30 rounded-br-xl z-20" />

                             <Image
                               src="/efemaq-team-professional-office.jpg"
                               alt="Ingenieros de EFEMAQ analizando planos"
                               fill
                               className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 ease-out"
                             />
                             
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                             
                             {/* Badge Flotante */}
                             <div className="absolute bottom-8 left-8 right-8">
                                 <div className="bg-[#0a0a0a]/80 backdrop-blur-lg border border-white/10 p-5 rounded-xl flex items-center justify-between shadow-lg">
                                     <div>
                                         <p className="text-white font-manrope font-bold text-base">Departamento Técnico</p>
                                         <p className="text-[#00dfdf] text-[10px] font-manrope font-bold tracking-[0.2em] uppercase mt-1">
                                            Certificación ISO
                                         </p>
                                     </div>
                                     <div className="w-12 h-12 rounded-full bg-[#00dfdf] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,223,223,0.3)]">
                                        <PenTool size={20} strokeWidth={2.5} />
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </motion.div>
                </div>

                {/* [COLUMNA DER - RELATO] */}
                <div className="flex flex-col space-y-12 pt-4">
                    
                    {/* 1. HEADER */}
                    <motion.div style={{ y: titleY, opacity: titleOp }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#00dfdf] animate-pulse" />
                             <span className="text-[10px] font-manrope font-bold text-gray-300 tracking-widest uppercase">
                                 ADN EFEMAQ
                             </span>
                        </div>
                        
                        <h2 className="font-manrope text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
                            No es improvisación.<br />
                            <motion.span 
                                className="text-transparent bg-clip-text bg-gradient-to-r from-[#006262] via-[#00dfdf] to-[#006262] bg-[length:200%_auto]"
                                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            >
                                Es ingeniería.
                            </motion.span>
                        </h2>
                    </motion.div>

                    {/* 2. TEXTO + SUBRAYADO */}
                    <motion.div style={{ y: textY, opacity: textOp }} className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-manrope font-medium text-gray-200 leading-snug">
                            Transformamos el mantenimiento en una{' '}
                            <span className="relative inline-block text-white font-bold">
                                ciencia exacta
                                {/* Línea Recta y Precisa */}
                                <svg className="absolute w-full h-2 -bottom-1 left-0 overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <motion.path 
                                        d="M 0 5 L 100 5" 
                                        fill="none" 
                                        stroke="#00dfdf" 
                                        strokeWidth="2" 
                                        strokeLinecap="square"
                                        style={{ pathLength: lineDraw }}
                                    />
                                </svg>
                            </span>
                            .
                        </h3>
                        <div className="pl-6 border-l-2 border-[#00dfdf]/20 space-y-4">
                            <p className="font-inter text-lg text-gray-400 leading-relaxed">
                                Terminamos con la era de los "parches" y soluciones temporales. En EFEMAQ, cada intervención sigue un <strong>protocolo estricto</strong> de diagnóstico, ejecución y control de calidad.
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. STATS */}
                    <motion.div 
                        style={{ y: statsY, opacity: statsOp }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="p-5 rounded-xl bg-[#151515] border border-white/5 hover:border-[#00dfdf]/30 transition-all group">
                            <Award className="w-6 h-6 text-gray-500 mb-3 group-hover:text-[#00dfdf] transition-colors" />
                            <div className="text-3xl font-manrope font-bold text-white">+15</div>
                            <p className="text-gray-500 text-xs font-inter mt-1">Años de trayectoria.</p>
                        </div>
                        <div className="p-5 rounded-xl bg-[#151515] border border-white/5 hover:border-[#00dfdf]/30 transition-all group">
                            <ShieldCheck className="w-6 h-6 text-gray-500 mb-3 group-hover:text-[#00dfdf] transition-colors" />
                            <div className="text-3xl font-manrope font-bold text-white">100%</div>
                            <p className="text-gray-500 text-xs font-inter mt-1">Trabajos con garantía.</p>
                        </div>
                    </motion.div>

                    {/* 4. CTA TALENTO */}
                    <motion.div style={{ y: ctaY, opacity: ctaOp }} className="pt-2">
                        <div className="p-1 rounded-xl bg-gradient-to-r from-[#00dfdf]/20 to-transparent">
                            <Button 
                                className="w-full h-20 bg-[#0a0a0a] hover:bg-[#111] border border-[#00dfdf]/30 hover:border-[#00dfdf] text-white group relative overflow-hidden rounded-lg transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-[#00dfdf]/5 group-hover:bg-[#00dfdf]/10 transition-colors" />
                                <div className="relative flex items-center justify-between w-full px-4 md:px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#00dfdf] flex items-center justify-center text-black shrink-0">
                                            <HardHat size={22} strokeWidth={2.5} />
                                        </div>
                                        <div className="text-left">
                                            <span className="block font-manrope font-bold text-lg leading-tight group-hover:text-[#00dfdf] transition-colors">
                                                Sumate al equipo de expertos
                                            </span>
                                            <span className="block text-xs text-gray-400 mt-1 font-inter text-wrap max-w-[200px] md:max-w-none">
                                                Buscamos técnicos de élite.
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-gray-500 group-hover:text-[#00dfdf] group-hover:translate-x-1 transition-all shrink-0" />
                                </div>
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* --- BLOQUE FRASE CENTRAL + FIRMA REALISTA --- */}
            <motion.div 
                style={{ y: quoteContainerY, opacity: quoteContainerOp }}
                className="relative w-full border-t border-white/10 pt-20 flex flex-col items-center text-center"
            >
                <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#00dfdf]/10 border border-[#00dfdf]/30 flex items-center justify-center text-[#00dfdf]">
                        <Ear size={24} />
                    </div>
                </div>

                {/* TAMAÑO DE TEXTO REDUCIDO Y OPTIMIZADO */}
                <blockquote className="font-manrope font-medium text-xl md:text-2xl text-white leading-snug max-w-3xl mx-auto mb-10 px-4">
                    "La tranquilidad no se logra con un mensaje de 'ya voy'. Se logra con un sistema que te dice quién va, cuándo llega y te muestra cómo quedó. 
                    <br className="hidden md:block" />
                    <span className="text-gray-500 mt-2 block text-lg md:text-xl">
                        Pero sobre todo, se logra <strong className="text-[#00dfdf]">escuchando y entendiendo</strong> tu visión."
                    </span>
                </blockquote>

               {/* FIRMA "Fernando" (Rediseño: Realista, trazo continuo y detallado) */}
                <div className="flex flex-col items-center gap-2 mt-6">
                    <svg width="240" height="80" viewBox="0 0 240 80" fill="none" className="overflow-visible">
                        
                        {/* 1. CUERPO DE LA F (Trazo vertical con carácter) */}
                        <motion.path 
                            d="M 55 10 C 45 8, 35 20, 40 40 C 42 55, 38 65, 35 70" 
                            stroke="#00dfdf" 
                            strokeWidth="2" 
                            fill="none"
                            strokeLinecap="round"
                            style={{ pathLength: signatureDraw }}
                        />
                        
                        {/* 2. NOMBRE COMPLETO (Un solo trazo fluido desde el cruce de la F) */}
                        {/* Cruza la F -> rulo de la 'e' -> garabatos de 'rnando' más chicos y rápidos */}
                        <motion.path 
                            d="M 20 38 C 35 36, 55 36, 60 38 C 65 30, 72 30, 70 40 C 75 35, 80 42, 85 40 C 90 38, 95 42, 100 40 C 105 35, 110 30, 112 45 C 118 40, 125 40, 130 42 C 135 38, 140 45, 150 40" 
                            stroke="#00dfdf" 
                            strokeWidth="2" 
                            fill="none"
                            strokeLinecap="round"
                            style={{ pathLength: signatureDraw }}
                        />

                        {/* 3. RÚBRICA FINAL (Subrayado rápido y corto) */}
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