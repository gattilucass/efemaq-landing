"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { 
  Users, 
  FileWarning, 
  Receipt, 
  Bot, 
  BadgeCheck,
  Building2,
  ArrowUp,
  ArrowRight
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link" // Import Link

// ... [DATA ADMIN_PAIN_POINTS sigue igual] ...
// (Para ahorrar espacio no copio el array de data de nuevo, usá el mismo de la respuesta anterior)
const ADMIN_PAIN_POINTS = [
  {
    id: 1,
    pain: {
      title: "WhatsApp Estallado",
      desc: "Reclamos 24/7 de vecinos furiosos. No tenés trazabilidad de quién fue, cuándo y si se arregló.",
      icon: Users,
      color: "#ef4444"
    },
    solution: {
      title: "Bot de Autogestión",
      desc: "Maqui atiende al vecino, clasifica la urgencia y asigna al técnico. Vos ves el estado en tiempo real.",
      icon: Bot,
      color: "#00dfdf"
    }
  },
  {
    id: 2,
    pain: {
      title: "Proveedores Informales",
      desc: "El 'amigo de confianza' que no hace factura, no tiene seguro y pone en riesgo al consorcio.",
      icon: FileWarning,
      color: "#f59e0b"
    },
    solution: {
      title: "Compliance Total",
      desc: "Técnicos matriculados, Factura A, ART al día y seguro de responsabilidad civil. Cero riesgos.",
      icon: BadgeCheck,
      color: "#10b981"
    }
  },
  {
    id: 3,
    pain: {
      title: "Gastos Imprevisibles",
      desc: "Presupuestos que cambian a mitad de obra y expensas que se disparan sin aviso.",
      icon: Receipt,
      color: "#ef4444"
    },
    solution: {
      title: "Abono Inteligente",
      desc: "Mantenimiento preventivo real con costos fijos. Previsibilidad financiera para tu gestión.",
      icon: Building2,
      color: "#00dfdf"
    }
  }
]

export default function AdminSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // --- SCROLL PHYSICS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  })

  // --- ANIMACIONES ---
  const headerY = useTransform(smoothProgress, [0, 0.1], [30, 0])
  const headerOp = useTransform(smoothProgress, [0, 0.1], [0, 1])
  const lineDraw = useTransform(smoothProgress, [0.1, 0.85], ["0%", "100%"])
  const boxDraw = useTransform(smoothProgress, [0.7, 0.9], [0, 1])
  const contentOp = useTransform(smoothProgress, [0.75, 0.95], [0, 1])
  const glowOp = useTransform(smoothProgress, [0.8, 1], [0, 0.6])

  // Función scroll local para el CTA que está en la misma página (agregado en page.tsx)
  const scrollToCTA = () => {
    const element = document.getElementById("cta-section");
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="admin-section" ref={containerRef} className="relative w-full pt-24 pb-32 overflow-hidden bg-[#0a0a0a]">
      
      {/* ... [FONDO Y HEADER IGUAL AL ANTERIOR] ... */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
             className="absolute inset-0 opacity-[0.08]" 
             style={{ 
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                 backgroundSize: '40px 40px' 
             }} 
          />
          <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-[#006262] opacity-[0.05] blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        
        <motion.div style={{ y: headerY, opacity: headerOp }} className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md shadow-lg shadow-black/20">
                 <Building2 size={14} className="text-[#00dfdf]" />
                 <span className="text-[10px] font-manrope font-bold text-gray-300 tracking-widest uppercase">
                     Soluciones para Consorcios
                 </span>
            </div>
            <h2 className="font-manrope text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Delegá el mantenimiento, <br className="hidden md:block" />
                <span className="text-[#00dfdf]">recuperá tu tiempo.</span>
            </h2>
            <p className="font-inter text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed font-medium">
                Transformamos el caos de reclamos diarios en un sistema 
                <span className="relative inline-block px-1 text-[#00dfdf]">
                     ordenado y digital.
                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#00dfdf]/50" />
                </span>
            </p>
        </motion.div>

        {/* --- ESTRUCTURA CENTRAL (TIMELINE) --- */}
        <div className="relative flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#00dfdf] shadow-[0_0_10px_#00dfdf] mb-0 relative z-20 animate-pulse" />
            <div className="absolute top-3 bottom-24 left-1/2 w-px bg-white/5 -translate-x-1/2 hidden md:block" />
            <div className="absolute top-3 bottom-[6rem] left-1/2 w-px -translate-x-1/2 hidden md:block overflow-hidden">
                <motion.div style={{ height: lineDraw }} className="w-full h-full bg-gradient-to-b from-[#00dfdf] via-[#10b981] to-[#00dfdf] shadow-[0_0_8px_#00dfdf] will-change-transform" />
            </div>

            <div className="space-y-12 md:space-y-20 w-full mb-12 relative z-10 pt-12 md:pt-16">
                {ADMIN_PAIN_POINTS.map((item, index) => (
                    <ComparisonCard key={item.id} item={item} />
                ))}
            </div>

            {/* SELLO FINAL */}
            <div className="relative z-20 mt-4 h-24 w-64 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                    <motion.rect width="100%" height="100%" rx="12" ry="12" fill="none" stroke="#00dfdf" strokeWidth="1.5" strokeDasharray="8 4" strokeLinecap="round" style={{ pathLength: boxDraw, opacity: boxDraw }} />
                </svg>
                <motion.div style={{ opacity: contentOp }} className="flex flex-col items-center gap-2">
                    <BadgeCheck className="text-[#00dfdf] w-6 h-6" />
                    <span className="font-manrope font-bold text-white text-sm tracking-widest uppercase">Edificio Blindado</span>
                </motion.div>
                <motion.div style={{ opacity: glowOp }} className="absolute inset-0 bg-[#00dfdf]/10 blur-xl rounded-xl -z-10" />
            </div>
        </div>

        {/* --- CTA FINAL --- */}
        <div className="mt-20 flex flex-col items-center gap-6 border-t border-white/10 pt-16">
            <h3 className="text-2xl md:text-3xl font-manrope font-bold text-white text-center">
                ¿Listo para modernizar tu administración?
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
                {/* Scroll local al CTA de esta misma pagina */}
                <Button 
                    onClick={scrollToCTA}
                    className="h-14 px-10 bg-[#00dfdf] hover:bg-[#00c4c4] text-black font-manrope font-bold text-lg rounded-full shadow-[0_0_20px_rgba(0,223,223,0.3)] group transition-all hover:scale-105 w-full sm:w-auto"
                >
                    Cotizar tu solución
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                {/* VUELVE AL HOME con ancla */}
                <Link href="/#audience-funnel" className="w-full sm:w-auto">
                    <Button 
                        variant="ghost" 
                        className="h-14 px-8 text-white border border-white/10 hover:bg-white/10 hover:text-[#00dfdf] rounded-full font-manrope font-medium transition-all w-full"
                    >
                        <ArrowUp className="mr-2 w-4 h-4" />
                        Volver
                    </Button>
                </Link>
            </div>
        </div>

      </div>
    </section>
  )
}

function ComparisonCard({ item }: { item: any }) {
    const cardRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "center center"] })
    const opacity = useTransform(scrollYProgress, [0.5, 0.9], [0.2, 1])
    const scale = useTransform(scrollYProgress, [0.5, 0.9], [0.95, 1])
    const xLeft = useTransform(scrollYProgress, [0.4, 0.9], [-30, 0])
    const xRight = useTransform(scrollYProgress, [0.4, 0.9], [30, 0])
    
    return (
        <div ref={cardRef} className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center group will-change-transform">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex">
                <motion.div style={{ scale, opacity }} className="w-3 h-3 rounded-full bg-[#0a0a0a] border border-[#00dfdf] shadow-[0_0_10px_#00dfdf]" />
            </div>
            <motion.div style={{ opacity, x: xLeft }} className="relative flex flex-col items-end text-right">
                <div className="p-5 rounded-xl bg-[#121212]/80 border border-white/5 w-full md:max-w-md hover:bg-[#161616] hover:border-red-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-end gap-2 mb-2 opacity-80">
                        <span className="text-[10px] font-manrope font-bold text-red-400 uppercase tracking-wider">Problema</span>
                        <item.pain.icon size={14} className="text-red-500" />
                    </div>
                    <h3 className="text-lg font-manrope font-bold text-gray-200 mb-1">{item.pain.title}</h3>
                    <p className="text-sm font-inter text-gray-500 leading-snug">{item.pain.desc}</p>
                </div>
            </motion.div>
            <motion.div style={{ opacity, x: xRight }} className="relative flex flex-col items-start text-left md:pl-8">
                <div className="relative w-full md:max-w-md group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00dfdf]/20 to-[#10b981]/20 rounded-xl blur opacity-0 group-hover/card:opacity-100 transition duration-500" />
                    <div className="relative bg-[#0f1c1c] p-6 rounded-xl border border-[#00dfdf]/20 shadow-xl overflow-hidden h-full transition-transform duration-500 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#00dfdf]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-[#00dfdf]/10 flex items-center justify-center border border-[#00dfdf]/20 shadow-inner"><item.solution.icon size={14} className="text-[#00dfdf]" /></div>
                            <span className="text-[10px] font-manrope font-bold text-[#00dfdf] uppercase tracking-wider">Solución EFEMAQ</span>
                        </div>
                        <h3 className="text-xl font-manrope font-extrabold text-white mb-2">{item.solution.title}</h3>
                        <p className="text-sm font-inter text-gray-300 leading-snug">{item.solution.desc}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}