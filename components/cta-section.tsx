"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { 
  ArrowRight, 
  MessageSquare, 
  FileText, 
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // --- SCROLL PHYSICS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  })

  // --- ANIMACIONES ---
  const scaleBg = useTransform(smoothProgress, [0, 1], [1, 1.15])
  const cardY = useTransform(smoothProgress, [0, 1], [60, 0])
  const cardOp = useTransform(smoothProgress, [0, 0.8], [0, 1])
  
  // Glow dinámico más intenso para el final
  const glowOp = useTransform(smoothProgress, [0.5, 1], [0, 0.8])

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] py-24">
      
      {/* --- FONDO (Grid System + Atmósfera Profunda) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
             className="absolute inset-0 opacity-[0.08]" 
             style={{ 
                 scale: scaleBg,
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                 backgroundSize: '40px 40px' 
             }} 
          />
          {/* Vignette superior e inferior */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
          
          {/* Foco de luz central (Nexus) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#006262] opacity-[0.06] blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6">
        
        {/* --- CARD CENTRAL "THE NEXUS" --- */}
        <motion.div 
            style={{ y: cardY, opacity: cardOp }}
            className="relative px-10"
        >
            {/* Aura de Energía "Breathing" */}
            <motion.div 
                style={{ opacity: glowOp }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-[1px] bg-gradient-to-r from-[#00dfdf] via-[#10b981] to-[#00dfdf] rounded-[2.5rem] blur-lg -z-10" 
            />

            <div className="relative bg-[#0f0f0f]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-14 text-center shadow-2xl overflow-hidden group">
                
                {/* Decoración Interna */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00dfdf]/40 to-transparent" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00dfdf]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {/* HEADER & COPY */}
                <div className="relative z-10 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/10 border border-[#00dfdf]/20 mb-8 shadow-[0_0_15px_rgba(0,223,223,0.1)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00dfdf] animate-pulse" />
                        <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                            Sistema 360°
                        </span>
                    </div>

                    {/* NUEVO HEADLINE: VALOR + POTENCIA */}
                    <h2 className="font-manrope text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1] tracking-tight mb-8 drop-shadow-xl">
                        Tu patrimonio, <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
                            en su máxima potencia.
                        </span>
                    </h2>

                    {/* MINI CARD SUB-HEADLINE */}
                    <div className="max-w-2xl mx-auto bg-white/[0.03] border border-white/5 rounded-2xl p-5 backdrop-blur-md hover:bg-white/[0.05] transition-colors duration-500">
                        <p className="font-inter text-lg text-gray-300 leading-relaxed">
                            Dejá de gestionar problemas y empezá a gestionar soluciones. <br className="hidden sm:block"/>
                            Ingeniería aplicada a <span className="text-white font-semibold">Casas, Negocios y Consorcios</span>.
                        </p>
                    </div>
                </div>

                {/* ACCIONES */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14 relative z-10">
                    {/* BTN 1: CHARLEMOS */}
                    <Button 
                        className="h-16 px-10 bg-[#00dfdf] hover:bg-[#00c4c4] text-black font-manrope font-extrabold text-lg rounded-xl shadow-[0_0_30px_rgba(0,223,223,0.25)] hover:shadow-[0_0_50px_rgba(0,223,223,0.4)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center gap-3 group"
                    >
                        <MessageSquare className="w-5 h-5 transition-transform group-hover:-rotate-12 fill-black" />
                        <span>Hablar con EFEMAQ</span>
                        <ArrowRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    {/* BTN 2: COTIZAR */}
                    <Button 
                        className="h-16 px-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00dfdf]/50 text-white hover:text-[#00dfdf] font-manrope font-bold text-lg rounded-xl backdrop-blur-md transition-all duration-300 w-full sm:w-auto flex items-center gap-3 group"
                    >
                        <FileText className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span>Cotizá tu Mantenimiento</span>
                    </Button>
                </div>

                {/* TRUST INDICATORS (Footer Sólido) */}
                <div className="pt-10 border-t border-white/5 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        
                        {/* Item 1 */}
                        <div className="flex flex-col items-center justify-center gap-3 group cursor-default">
                            <div className="p-2.5 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/10 group-hover:border-[#00dfdf]/30 transition-colors">
                                <Clock size={20} className="text-[#00dfdf]" />
                            </div>
                            <span className="text-sm font-manrope font-bold text-gray-400 group-hover:text-white transition-colors">
                                Respuesta &lt; 24hs
                            </span>
                        </div>

                        {/* Item 2 */}
                        <div className="flex flex-col items-center justify-center gap-3 group cursor-default">
                            <div className="p-2.5 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/10 group-hover:border-[#00dfdf]/30 transition-colors">
                                <Users size={20} className="text-[#00dfdf]" />
                            </div>
                            <span className="text-sm font-manrope font-bold text-gray-400 group-hover:text-white transition-colors">
                                Soporte Humano Directo
                            </span>
                        </div>

                        {/* Item 3 */}
                        <div className="flex flex-col items-center justify-center gap-3 group cursor-default">
                            <div className="p-2.5 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/10 group-hover:border-[#00dfdf]/30 transition-colors">
                                <CheckCircle2 size={20} className="text-[#00dfdf]" />
                            </div>
                            <span className="text-sm font-manrope font-bold text-gray-400 group-hover:text-white transition-colors">
                                Garantía Escrita
                            </span>
                        </div>

                    </div>
                    
                    {/* SLOGAN FIRMA (Restyled) */}
                    <div className="flex flex-col items-center gap-2 opacity-90">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#00dfdf] to-transparent mb-2" />
                        <p className="text-sm md:text-base font-manrope font-bold text-[#00dfdf] uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(0,223,223,0.3)]">
                            El trabajo bien hecho, siempre.
                        </p>
                    </div>
                </div>

            </div>
        </motion.div>

      </div>
    </section>
  )
}