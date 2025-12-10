"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { 
  Home, 
  Clock, 
  ShieldX, 
  SearchX, 
  UserCheck, 
  ShieldCheck, 
  Wrench,
  ArrowUp,
  ArrowRight,
  CheckCircle2,
  Store
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

// --- DATA ---
const PARTICULAR_PAIN_POINTS = [
  {
    id: 1,
    pain: { title: "Incertidumbre Total", desc: "Técnicos desconocidos. ¿Quien entra a mi casa o local? ¿Será de confianza? ¿Si algo falla lo voy a encontrar luego de que ya le pagué?", icon: ShieldX, color: "#ef4444" },
    solution: { title: "Personal Verificado", desc: "Equipo certificado y de confianza, más la garantía Efemaq para un mantenimiento seguro y bien hecho.", icon: UserCheck, color: "#10b981" }
  },
  {
    id: 2,
    pain: { title: "Diagnóstico Ciego", desc: "El famoso 'hay que romper para ver'. Arreglos que duran dos días, vuelven a fallar y generan suciedad.", icon: SearchX, color: "#f59e0b" },
    solution: { title: "Tecnología Aplicada", desc: "Usamos equipos de tecnología avanzada para diagnosticar y trabajar por lo que la prolijidad y la limpieza estan aseguradas.", icon: Wrench, color: "#10b981" }
  },
  {
    id: 3,
    pain: { title: "Esperas Innecesarias", desc: "Llamas a un plomero hoy y te da un turno con suerte para el mes que viene. Mientras tanto tu casa o tu negocio se transforman en un caos.", icon: Clock, color: "#ef4444" },
    solution: { title: "Respuesta Inmediata", desc: "Guardia activa 24/7. ¿No baja la persiana del local? ¿Brota agua del piso? Resolvemos urgencias como estas y más en tiempo récord.", icon: ShieldCheck, color: "#10b981" }
  }
]

export default function ParticularSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  // --- SCROLL RESET NUCLEAR ---
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setIsReady(true);
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
    <div className={`transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <section id="particular-section" ref={containerRef} className="relative w-full pt-32 pb-32 overflow-hidden bg-[#0a0a0a]">
        
        {/* FONDO */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 0)', backgroundSize: '60px 60px' }} />
            <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#10b981] opacity-[0.05] blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
            
            {/* HEADER */}
            <motion.div style={{ y: headerY, opacity: headerOp }} className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 mb-6 backdrop-blur-md shadow-lg shadow-emerald-900/20">
                    <Store size={14} className="text-[#10b981]" />
                    <span className="text-[10px] font-manrope font-bold text-[#10b981] tracking-widest uppercase">Hogares & Comercios</span>
                </div>
                <h2 className="font-manrope text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                    Tu casa es tu espacio, <br className="hidden md:block" />
                    <span className="text-[#10b981]">nosotros lo cuidamos.</span>
                </h2>
                <p className="font-inter text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-medium">
                    Seguridad, compromiso, limpieza y garantía. El servicio técnico que tu familia o negocio merecen, 
                    <span className="relative inline-block px-1 text-[#10b981]">sin sorpresas ni costos ocultos.<span className="absolute bottom-0 left-0 w-full h-px bg-[#10b981]/50" /></span>
                </p>
            </motion.div>

            {/* TIMELINE */}
            <div className="relative flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981] mb-0 relative z-20 animate-pulse" />
                <div className="absolute top-3 bottom-24 left-1/2 w-px bg-white/5 -translate-x-1/2 hidden md:block" />
                <div className="absolute top-3 bottom-[6rem] left-1/2 w-px -translate-x-1/2 hidden md:block overflow-hidden">
                    <motion.div style={{ height: lineDraw }} className="w-full h-full bg-gradient-to-b from-[#10b981] via-[#10b981] to-transparent shadow-[0_0_8px_#10b981] will-change-transform" />
                </div>

                <div className="space-y-12 md:space-y-20 w-full mb-12 relative z-10 pt-16">
                    {PARTICULAR_PAIN_POINTS.map((item, index) => (<ComparisonCard key={item.id} item={item} />))}
                </div>

                {/* SELLO */}
                <div className="relative z-20 mt-4 h-24 w-64 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <motion.rect width="100%" height="100%" rx="12" ry="12" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="8 4" strokeLinecap="round" style={{ pathLength: boxDraw, opacity: boxDraw }} />
                    </svg>
                    <motion.div style={{ opacity: contentOp }} className="flex flex-col items-center gap-2">
                        <CheckCircle2 className="text-[#10b981] w-6 h-6" />
                        <span className="font-manrope font-bold text-white text-sm tracking-widest uppercase">Tranquilidad Asegurada</span>
                    </motion.div>
                    <motion.div style={{ opacity: glowOp }} className="absolute inset-0 bg-[#10b981]/10 blur-xl rounded-xl -z-10" />
                </div>
            </div>

            {/* CTA FINAL */}
            <div className="mt-20 flex flex-col items-center gap-6 border-t border-white/10 pt-16">
                <h3 className="text-2xl md:text-3xl font-manrope font-bold text-white text-center px-4">¿Tenés algo para arreglar hoy?</h3>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center px-6">
                    <Button onClick={scrollToCTA} className="h-14 px-10 bg-[#10b981] hover:bg-[#0da071] text-black font-manrope font-bold text-lg rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] group transition-all hover:scale-105 w-full sm:w-auto">
                        Pedir Técnico Ahora <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Link href="/#audience-funnel" className="w-full sm:w-auto">
                        <Button variant="ghost" className="h-14 px-8 text-white border border-white/10 hover:bg-white/5 hover:text-[#10b981] rounded-full font-manrope font-medium transition-all w-full">
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
                <motion.div style={{ scale, opacity }} className="w-3 h-3 rounded-full bg-[#0a0a0a] border border-[#10b981] shadow-[0_0_10px_#10b981]" />
            </div>
            <motion.div style={{ opacity, x: xLeft }} className="relative flex flex-col items-end text-right">
                <div className="p-5 rounded-xl bg-[#121212]/80 border border-white/5 w-full md:max-w-md hover:bg-[#161616] hover:border-red-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-end gap-2 mb-2 opacity-80">
                        <span className="text-[10px] font-manrope font-bold text-red-400 uppercase tracking-wider">El Problema</span>
                        <item.pain.icon size={14} className="text-red-500" />
                    </div>
                    <h3 className="text-lg font-manrope font-bold text-gray-200 mb-1">{item.pain.title}</h3>
                    <p className="text-sm font-inter text-gray-500 leading-snug">{item.pain.desc}</p>
                </div>
            </motion.div>
            <motion.div style={{ opacity, x: xRight }} className="relative flex flex-col items-start text-left md:pl-8">
                <div className="relative w-full md:max-w-md group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#10b981]/20 to-[#00dfdf]/20 rounded-xl blur opacity-0 group-hover/card:opacity-100 transition duration-500" />
                    <div className="relative bg-[#0a1812] p-6 rounded-xl border border-[#10b981]/20 shadow-xl overflow-hidden h-full transition-transform duration-500 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/20 shadow-inner"><item.solution.icon size={14} className="text-[#10b981]" /></div>
                            <span className="text-[10px] font-manrope font-bold text-[#10b981] uppercase tracking-wider">Solución EFEMAQ</span>
                        </div>
                        <h3 className="text-xl font-manrope font-extrabold text-white mb-2">{item.solution.title}</h3>
                        <p className="text-sm font-inter text-gray-300 leading-snug">{item.solution.desc}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}