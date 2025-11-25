"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { 
  SearchX, 
  FileSearch, 
  UserX, 
  ShieldCheck, 
  AlertTriangle,
  BadgeCheck
} from 'lucide-react'

// --- DATA ---
const PAIN_POINTS = [
  {
    id: 1,
    pain: {
      title: "Diagnóstico Ciego",
      desc: "Reparaciones basadas en 'creo que es acá'. Parches que fallan a las semanas.",
      icon: SearchX,
      color: "#ef4444"
    },
    solution: {
      title: "Ingeniería Forense",
      desc: "Utilizamos termografía y ensayos no destructivos. Atacamos la causa raíz, no el síntoma.",
      icon: FileSearch,
      color: "#00dfdf"
    }
  },
  {
    id: 2,
    pain: {
      title: "Proveedores Fantasma",
      desc: "Técnicos que no llegan, presupuestos que cambian y nadie se hace cargo.",
      icon: UserX,
      color: "#f59e0b"
    },
    solution: {
      title: "Trazabilidad Total",
      desc: "Un solo responsable: EFEMAQ. Seguimiento en tiempo real y personal asegurado.",
      icon: ShieldCheck,
      color: "#10b981"
    }
  },
  {
    id: 3,
    pain: {
      title: "Garantía de Palabra",
      desc: "Promesas vacías que desaparecen cuando surge un nuevo problema.",
      icon: AlertTriangle,
      color: "#ef4444"
    },
    solution: {
      title: "Certificación Escrita",
      desc: "Cada trabajo incluye documentación técnica y garantía legal por contrato.",
      icon: BadgeCheck,
      color: "#00dfdf"
    }
  }
]

export default function PainPointsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // --- SCROLL PHYSICS ---
  // Usamos un offset extendido para dar tiempo al dibujo final sin que se vaya la sección
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
  // Header
  const headerY = useTransform(smoothProgress, [0, 0.1], [30, 0])
  const headerOp = useTransform(smoothProgress, [0, 0.1], [0, 1])

  // Línea Vertical: Se dibuja hasta llegar justo arriba del sello (aprox 90% del recorrido)
  const lineDraw = useTransform(smoothProgress, [0, 0.9], ["0%", "100%"])
  
  // Sello Final: Se dibuja cuando la línea termina (90% -> 100%)
  const boxDraw = useTransform(smoothProgress, [0.9, 1], [0, 1])
  const contentOp = useTransform(smoothProgress, [0.92, 1], [0, 1])
  const glowOp = useTransform(smoothProgress, [0.95, 1], [0, 0.5])

  return (
    <section ref={containerRef} className="relative w-full pt-12 pb-32 overflow-hidden bg-[#0a0a0a]">
      
      {/* --- FONDO --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
             className="absolute inset-0 opacity-[0.08]" 
             style={{ 
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                 backgroundSize: '40px 40px' 
             }} 
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#006262] opacity-[0.05] blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        
        {/* HEADER */}
        <motion.div style={{ y: headerY, opacity: headerOp }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md shadow-lg shadow-black/20">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#00dfdf] animate-pulse" />
                 <span className="text-[10px] font-manrope font-bold text-gray-300 tracking-widest uppercase">
                     El Cambio de Paradigma
                 </span>
            </div>
            
            <h2 className="font-manrope text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                La diferencia entre <br className="hidden md:block" />
                <span className="text-red-500">gastar</span> e <span className="text-[#00dfdf]">invertir</span>.
            </h2>
            
            <p className="font-inter text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed font-medium">
                Dejamos atrás la incertidumbre del modelo tradicional para ofrecerte un{' '}
                <span className="relative inline-block px-1 text-[#00dfdf]">
                    sistema predecible,
                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#00dfdf]/50" />
                </span>{' '}
                técnico y transparente.
            </p>
        </motion.div>

        {/* --- ESTRUCTURA CENTRAL --- */}
        <div className="relative flex flex-col items-center">
            
            {/* NODO INICIAL */}
            <div className="w-3 h-3 rounded-full bg-[#00dfdf] shadow-[0_0_10px_#00dfdf] mb-0 relative z-20 animate-pulse" />

            {/* LÍNEA DE FONDO (Guía) */}
            <div className="absolute top-1.5 bottom-24 left-1/2 w-px bg-white/5 -translate-x-1/2 hidden md:block" />

            {/* LÍNEA ACTIVA (Animada) */}
            {/* Termina antes del sello final (bottom-24 es el espacio reservado para el sello) */}
            <div className="absolute top-1.5 bottom-[6rem] left-1/2 w-px -translate-x-1/2 hidden md:block overflow-hidden">
                <motion.div 
                    style={{ height: lineDraw }} 
                    className="w-full h-full bg-gradient-to-b from-[#00dfdf] via-[#10b981] to-[#00dfdf] shadow-[0_0_8px_#00dfdf] will-change-transform"
                />
            </div>

            {/* CARDS STACK */}
            <div className="space-y-12 md:space-y-20 w-full mb-12 relative z-10">
                {PAIN_POINTS.map((item, index) => (
                    <ComparisonCard key={item.id} item={item} index={index} />
                ))}
            </div>

            {/* --- SELLO FINAL "THE SEAL" --- */}
            <div className="relative z-20 mt-4 h-24 w-64 flex items-center justify-center">
                
                {/* Borde que se dibuja */}
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                    <motion.rect 
                        width="100%" 
                        height="100%" 
                        rx="12" 
                        ry="12"
                        fill="none" 
                        stroke="#00dfdf" 
                        strokeWidth="1.5"
                        strokeDasharray="8 4" // Linea punteada tecnica
                        strokeLinecap="round"
                        style={{ pathLength: boxDraw, opacity: boxDraw }}
                    />
                </svg>

                {/* Contenido del Sello */}
                <motion.div 
                    style={{ opacity: contentOp }}
                    className="flex flex-col items-center gap-2"
                >
                    <BadgeCheck className="text-[#00dfdf] w-6 h-6" />
                    <span className="font-manrope font-bold text-white text-sm tracking-widest uppercase">
                        Tranquilidad Asegurada
                    </span>
                </motion.div>

                {/* Glow interno al completarse */}
                <motion.div 
                    style={{ opacity: glowOp }}
                    className="absolute inset-0 bg-[#00dfdf]/10 blur-xl rounded-xl -z-10" 
                />
            </div>

        </div>

      </div>
    </section>
  )
}

// --- SUB-COMPONENT: COMPARISON CARD (Stabilized) ---
function ComparisonCard({ item, index }: { item: any, index: number }) {
    const cardRef = useRef(null)
    
    // Scrubbing suave y estable
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"]
    })

    const opacity = useTransform(scrollYProgress, [0.5, 0.9], [0.2, 1])
    const scale = useTransform(scrollYProgress, [0.5, 0.9], [0.95, 1])
    const xLeft = useTransform(scrollYProgress, [0.4, 0.9], [-30, 0])
    const xRight = useTransform(scrollYProgress, [0.4, 0.9], [30, 0])
    
    return (
        <div ref={cardRef} className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center group will-change-transform">
            
            {/* Conector Central */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex">
                <motion.div 
                    style={{ scale, opacity }}
                    className="w-3 h-3 rounded-full bg-[#0a0a0a] border border-[#00dfdf] shadow-[0_0_10px_#00dfdf]"
                />
            </div>

            {/* Problema (Izq) */}
            <motion.div style={{ opacity, x: xLeft }} className="relative flex flex-col items-end text-right">
                <div className="p-5 rounded-xl bg-[#121212]/80 border border-white/5 w-full hover:bg-[#161616] hover:border-red-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-end gap-2 mb-2 opacity-80">
                        <span className="text-[10px] font-manrope font-bold text-red-400 uppercase tracking-wider">Problema</span>
                        <item.pain.icon size={14} className="text-red-500" />
                    </div>
                    <h3 className="text-lg font-manrope font-bold text-gray-200 mb-1">{item.pain.title}</h3>
                    <p className="text-sm font-inter text-gray-500 leading-snug">{item.pain.desc}</p>
                </div>
            </motion.div>

            {/* Solución (Der) */}
            <motion.div style={{ opacity, x: xRight }} className="relative flex flex-col items-start">
                <div className="relative w-full group/card">
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