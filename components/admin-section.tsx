"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { 
  Building2, 
  FileWarning, 
  TrendingUp, 
  Users, 
  Bot, 
  BadgeCheck,
  ArrowUp,
  ArrowRight,
  Briefcase
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

// --- DATA ---
const ADMIN_PAIN_POINTS = [
  {
    id: 1,
    pain: { title: "Gestión Fragmentada", desc: "Lidiar con plomeros, electricistas y albañiles por separado. Tiempos muertos, responsabilidades cruzadas y falta de control.", icon: Users, color: "#ef4444" },
    solution: { title: "Facility Management", desc: "Unificamos todos los gremios bajo una sola coordinación: Efemaq. Resolvemos desde un cambio de luces hasta refacciones profundas de fachadas y lobbys.", icon: Briefcase, color: "#00dfdf" }
  },
  {
    id: 2,
    pain: { title: "Riesgo & Compliance", desc: "Proveedores sin papeles, seguros vencidos o facturación informal. Un accidente puede convertirse en un problema serio.", icon: FileWarning, color: "#f59e0b" },
    solution: { title: "Blindaje Legal", desc: "Personal idóneo y asegurado, matriculado y con cumplimiento de normas de HyS. Presupuesto y Factura detallados en cada trabajo.", icon: BadgeCheck, color: "#10b981" }
  },
  {
    id: 3,
    pain: { title: "Costos Ocultos", desc: "Presupuestos que se inflan, reparaciones mal hechas que se pagan dos veces y falta de previsión.", icon: TrendingUp, color: "#ef4444" },
    solution: { title: "Eficiencia Operativa", desc: "Abonos de mantenimiento preventivo y obras con precio cerrado. Auditoría técnica para optimizar el gasto del edificio.", icon: Building2, color: "#00dfdf" }
  }
]

export default function AdminSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  // --- SCROLL LOCK NUCLEAR ---
  useEffect(() => {
    // 1. Desactivar memoria del navegador
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // 2. Forzar subida instantánea
    window.scrollTo(0, 0);
    
    // 3. Mostrar contenido solo cuando estamos seguros que está arriba
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setIsReady(true); // Recién acá mostramos el contenido
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end end"] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })

  const headerY = useTransform(smoothProgress, [0, 0.1], [30, 0])
  const headerOp = useTransform(smoothProgress, [0, 0.1], [0, 1])
  const lineDraw = useTransform(smoothProgress, [0.1, 0.85], ["0%", "100%"])
  const boxDraw = useTransform(smoothProgress, [0.7, 0.9], [0, 1])
  const contentOp = useTransform(smoothProgress, [0.75, 0.95], [0, 1])
  const glowOp = useTransform(smoothProgress, [0.8, 1], [0, 0.6])

  const scrollToCTA = () => {
    const element = document.getElementById("cta-section");
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Opacidad 0 inicial para evitar el "flicker" del footer
    <div className={`transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <section id="admin-section" ref={containerRef} className="relative w-full pt-32 pb-12 overflow-hidden bg-[#0a0a0a]">
        
        {/* FONDO */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-[#006262] opacity-[0.05] blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
            
            {/* HEADER */}
            <motion.div style={{ y: headerY, opacity: headerOp }} className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md shadow-lg shadow-black/20">
                    <Building2 size={14} className="text-[#00dfdf]" />
                    <span className="text-[10px] font-manrope font-bold text-gray-300 tracking-widest uppercase">Administradores & Empresas</span>
                </div>
                <h2 className="font-manrope text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                    Centralizá la operación, <br className="hidden md:block" />
                    <span className="text-[#00dfdf]">eliminá el riesgo.</span>
                </h2>
                <p className="font-inter text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-medium">
                    Soluciones técnicas integrales para consorcios, oficinas y cadenas de locales. <br className="hidden md:block" />
                    Transformamos el mantenimiento en una <span className="relative inline-block px-1 text-[#00dfdf]">estrategia de valor.<span className="absolute bottom-0 left-0 w-full h-px bg-[#00dfdf]/50" /></span>
                </p>
            </motion.div>

            {/* TIMELINE */}
            <div className="relative flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#00dfdf] shadow-[0_0_10px_#00dfdf] mb-0 relative z-20 animate-pulse" />
                <div className="absolute top-3 bottom-24 left-1/2 w-px bg-white/5 -translate-x-1/2 hidden md:block" />
                <div className="absolute top-3 bottom-[6rem] left-1/2 w-px -translate-x-1/2 hidden md:block overflow-hidden">
                    <motion.div style={{ height: lineDraw }} className="w-full h-full bg-gradient-to-b from-[#00dfdf] via-[#10b981] to-[#00dfdf] shadow-[0_0_8px_#00dfdf] will-change-transform" />
                </div>

                <div className="space-y-12 md:space-y-20 w-full mb-12 relative z-10 pt-16">
                    {ADMIN_PAIN_POINTS.map((item, index) => (<ComparisonCard key={item.id} item={item} />))}
                </div>

                {/* SELLO */}
                <div className="relative z-20 mt-4 h-24 w-64 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <motion.rect width="100%" height="100%" rx="12" ry="12" fill="none" stroke="#00dfdf" strokeWidth="1.5" strokeDasharray="8 4" strokeLinecap="round" style={{ pathLength: boxDraw, opacity: boxDraw }} />
                    </svg>
                    <motion.div style={{ opacity: contentOp }} className="flex flex-col items-center gap-2">
                        <BadgeCheck className="text-[#00dfdf] w-6 h-6" />
                        <span className="font-manrope font-bold text-white text-sm tracking-widest uppercase">Tranquilidad Asegurada</span>
                    </motion.div>
                    <motion.div style={{ opacity: glowOp }} className="absolute inset-0 bg-[#00dfdf]/10 blur-xl rounded-xl -z-10" />
                </div>
            </div>

         {/* CTA FINAL */}
            <div className="mt-10 flex flex-col items-center gap-6 border-t border-white/10 pt-12">
                <h3 className="text-2xl md:text-3xl font-manrope font-bold text-white text-center px-4">¿Tu edificio o empresa necesita un cambio?</h3>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center px-6">
                    
                    {/* Botón Principal: Forzamos !px-12 para despegar el texto de los bordes */}
                    <Button 
                        onClick={scrollToCTA} 
                        className="h-14 !px-8 bg-[#00dfdf] hover:bg-[#00c4c4] text-black font-manrope font-bold text-lg rounded-full shadow-[0_0_20px_rgba(0,223,223,0.3)] group transition-all hover:scale-105 w-full sm:w-auto"
                    >
                        Cotizar Solución Corporativa <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Link href="/#audience-funnel" className="w-full sm:w-auto">
                        {/* Botón Volver: Forzamos !px-10 */}
                        <Button 
                            variant="ghost" 
                            className="h-14 !px-8 text-white border border-white/10 hover:bg-white/5 hover:text-[#00dfdf] rounded-full font-manrope font-medium transition-all w-full"
                        >
                            <ArrowUp className="mr-2 w-4 h-4" /> Volver
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
        </section>
    </div>
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
                        <span className="text-[10px] font-manrope font-bold text-red-400 uppercase tracking-wider">El Desafío</span>
                        <item.pain.icon size={14} className="text-red-500" />
                    </div>
                    <h3 className="text-lg font-manrope font-bold text-gray-200 mb-1">{item.pain.title}</h3>
                    <p className="text-sm font-inter text-balance text-gray-500 leading-snug">{item.pain.desc}</p>
                </div>
            </motion.div>
            <motion.div style={{ opacity, x: xRight }} className="relative flex flex-col items-start text-left md:pl-8">
                <div className="relative w-full md:max-w-md group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00dfdf]/20 to-[#10b981]/20 rounded-xl blur opacity-0 group-hover/card:opacity-100 transition duration-500" />
                    <div className="relative bg-[#0f1c1c] p-6 rounded-xl border border-[#00dfdf]/20 shadow-xl overflow-hidden h-full transition-transform duration-500 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#00dfdf]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-[#00dfdf]/10 flex items-center justify-center border border-[#00dfdf]/20 shadow-inner"><item.solution.icon size={14} className="text-[#00dfdf]" /></div>
                            <span className="text-[10px] font-manrope font-bold text-[#00dfdf] uppercase tracking-wider">Solución Efemaq</span>
                        </div>
                        <h3 className="text-xl font-manrope font-extrabold text-white mb-2">{item.solution.title}</h3>
                        <p className="text-sm font-inter text-balance text-gray-300 leading-snug">{item.solution.desc}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}