"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { 
  ArrowRight, 
  MessageSquare, 
  Mail, 
  CheckCircle2,
  Clock,
  ShieldCheck
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
  const scaleBg = useTransform(smoothProgress, [0, 1], [1, 1.1])
  const cardY = useTransform(smoothProgress, [0, 1], [80, 0])
  const cardOp = useTransform(smoothProgress, [0, 0.8], [0, 1])
  
  // Glow "Breathing"
  const glowOp = useTransform(smoothProgress, [0.5, 1], [0.2, 0.6])

  // Links funcionales
  const whatsappLink = "https://wa.me/5491112345678?text=Hola%20EFEMAQ,%20quisiera%20asesoramiento%20sobre%20mantenimiento.";
  const mailLink = "mailto:contacto@efemaq.com.ar?subject=Solicitud%20de%20Presupuesto";

  return (
    <section 
        id="cta-section" 
        ref={containerRef} 
        className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] py-20"
    >
      
      {/* --- FONDO ATMOSFÉRICO --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
             className="absolute inset-0 opacity-[0.06]" 
             style={{ 
                 scale: scaleBg,
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                 backgroundSize: '50px 50px' 
             }} 
          />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
          
          {/* Foco Central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00dfdf] opacity-[0.04] blur-[120px] rounded-full" />
      </div>

      {/* CONTENEDOR PRINCIPAL (Ancho reducido a 3xl para ser más compacto) */}
      <div className="relative z-10 w-full max-w-3xl px-4">
        
        {/* --- CARD CENTRAL "THE NEXUS" --- */}
        <motion.div 
            style={{ y: cardY, opacity: cardOp }}
            className="relative"
        >
            {/* Aura de Energía */}
            <motion.div 
                style={{ opacity: glowOp }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-[2px] bg-gradient-to-br from-[#00dfdf] via-[#10b981] to-[#00dfdf] rounded-[2.5rem] blur-xl -z-10" 
            />

            <div className="relative bg-[#0f0f0f]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 text-center shadow-2xl overflow-hidden group">
                
                {/* LOGO EFEMAQ (Visibilidad Corregida) */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none select-none">
                    <Image 
                        src="/logo-efemaq.png" 
                        alt="EFEMAQ" 
                        width={140} 
                        height={50} 
                        className="object-contain brightness-200 contrast-200" // Filtro para resaltar sobre fondo oscuro
                    />
                </div>

                {/* Decoración Interna */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00dfdf]/30 to-transparent" />
                
                {/* HEADER & COPY */}
                <div className="relative z-10 mb-10 mt-12"> {/* mt-12 para dar espacio al logo */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/20 mb-6 shadow-[0_0_15px_rgba(0,223,223,0.05)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00dfdf] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00dfdf]"></span>
                        </span>
                        <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                            Solución Definitiva
                        </span>
                    </div>

                    <h2 className="font-manrope text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-xl">
                        Dejá de gastar en "arreglos". <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfdf] to-[#10b981]">
                            Invertí en soluciones.
                        </span>
                    </h2>

                    <div className="max-w-xl mx-auto">
                        <p className="font-inter text-base md:text-lg text-gray-400 leading-relaxed">
                            No somos "un técnico más". Somos la <strong>solución experta</strong> que tu propiedad necesita para dejar de tener problemas recurrentes y empezar a ganar valor.
                        </p>
                    </div>
                </div>

                {/* ACCIONES (BOTONES FUNCIONALES) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 relative z-10 px-4">
                    {/* BTN 1: WHATSAPP (Principal - "Charlemos") */}
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button 
                            className="h-14 px-8 bg-[#00dfdf] hover:bg-[#00c4c4] text-black font-manrope font-extrabold text-lg rounded-xl shadow-[0_0_20px_rgba(0,223,223,0.2)] hover:shadow-[0_0_40px_rgba(0,223,223,0.3)] hover:-translate-y-1 transition-all duration-300 w-full flex items-center justify-center gap-3 group"
                        >
                            <MessageSquare className="w-5 h-5 transition-transform group-hover:-rotate-12 fill-black" />
                            <span>Charlemos</span>
                            <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </a>

                    {/* BTN 2: MAIL (Secundario) */}
                    <a href={mailLink} className="w-full sm:w-auto">
                        <Button 
                            className="h-14 px-8 bg-transparent hover:bg-white/5 border border-white/10 hover:border-[#00dfdf]/30 text-white hover:text-[#00dfdf] font-manrope font-bold text-lg rounded-xl backdrop-blur-md transition-all duration-300 w-full flex items-center justify-center gap-3 group"
                        >
                            <Mail className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span>Solicitar Relevamiento</span>
                        </Button>
                    </a>
                </div>

                {/* TRUST INDICATORS (Footer Sólido & Responsive Horizontal) */}
                <div className="pt-8 border-t border-white/5 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        
                        {/* Item 1 */}
                        <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-3 group p-2 md:p-0 rounded-lg hover:bg-white/5 md:hover:bg-transparent transition-colors">
                            <div className="p-2 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/10 group-hover:border-[#00dfdf]/30 transition-colors shrink-0">
                                <Clock size={18} className="text-[#00dfdf]" />
                            </div>
                            <span className="text-sm font-manrope font-semibold text-gray-400 group-hover:text-white transition-colors">
                                Respuesta &lt; 24hs
                            </span>
                        </div>

                        {/* Item 2 */}
                        <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-3 group p-2 md:p-0 rounded-lg hover:bg-white/5 md:hover:bg-transparent transition-colors">
                            <div className="p-2 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/10 group-hover:border-[#00dfdf]/30 transition-colors shrink-0">
                                <ShieldCheck size={18} className="text-[#00dfdf]" />
                            </div>
                            <span className="text-sm font-manrope font-semibold text-gray-400 group-hover:text-white transition-colors">
                                Soporte Humano Directo
                            </span>
                        </div>

                        {/* Item 3 */}
                        <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-3 group p-2 md:p-0 rounded-lg hover:bg-white/5 md:hover:bg-transparent transition-colors">
                            <div className="p-2 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/10 group-hover:border-[#00dfdf]/30 transition-colors shrink-0">
                                <CheckCircle2 size={18} className="text-[#00dfdf]" />
                            </div>
                            <span className="text-sm font-manrope font-semibold text-gray-400 group-hover:text-white transition-colors">
                                Garantía por Contrato
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </motion.div>

      </div>
    </section>
  )
}