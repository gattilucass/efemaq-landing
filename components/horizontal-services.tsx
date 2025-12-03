"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  Zap, 
  Hammer, 
  FileSearch, 
  ShieldAlert,
  Briefcase,
  ClipboardList // Nuevo icono para el botón
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

// --- DATA DE SERVICIOS (SEO OPTIMIZED) ---
const SERVICES = [
  {
    id: "01",
    title: "Auditoría & Diagnóstico",
    subtitle: "Detección de Fallas",
    description: "Encontramos el problema real antes de romper. Usamos tecnología para ver lo que el ojo no ve: fugas, recalentamiento eléctrico y humedades.",
    features: ["Informes Técnicos Certificados", "Detección de Fugas y Calor", "Revisión de Consumo Eléctrico", "Plan de Inversión"],
    icon: FileSearch,
    color: "#00dfdf", // Teal
    image: "/efemaq-team-professional-office.jpg" 
  },
  {
    id: "02",
    title: "Mantenimiento Preventivo",
    subtitle: "Aires, Bombas y Tableros",
    description: "Evitá las urgencias. Rutinas mensuales para cuidar los equipos críticos de tu edificio: grupos electrógenos, aire acondicionado y bombas de agua.",
    features: ["Limpieza de Aires Acondicionados", "Ajuste de Tableros Eléctricos", "Control de Bombas de Agua", "Pruebas de Seguridad"],
    icon: ShieldAlert,
    color: "#10b981", // Emerald
    image: "/modern-office-building-maintenance.jpg" 
  },
  {
    id: "03",
    title: "Obras y Reformas",
    subtitle: "Albañilería y Pintura",
    description: "Renovamos tus espacios con calidad. Desde arreglar una filtración en la terraza hasta pintar el hall de entrada o remodelar una oficina.",
    features: ["Impermeabilización de Techos", "Pintura de Altura y Fachadas", "Reparaciones de Albañilería", "Instalaciones Sanitarias"],
    icon: Hammer,
    color: "#f59e0b", // Amber
    image: "/modern-office-building-maintenance.jpg"
  },
  {
    id: "04",
    title: "Urgencias 24/7",
    subtitle: "Guardia Técnica Activa",
    description: "Cuando pasa algo grave, estamos ahí. Cortes de luz totales, caños rotos o fallas críticas que no pueden esperar a mañana.",
    features: ["Electricistas de Guardia", "Plomería de Urgencia", "Reparación de Aires", "Riesgo Eléctrico/Gas"],
    icon: Zap,
    color: "#ef4444", // Red
    image: "/efemaq-team-professional-office.jpg"
  },
]

export default function HorizontalServices() {
  const targetRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  
  // --- SCROLL PHYSICS ---
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  })

  // --- TRANSFORMACIÓN HORIZONTAL (AJUSTE FINO MÓVIL) ---
  // Móvil: Reducido a -79% para que la última card (90vw) frene exactamente en el centro
  // en lugar de irse hacia la izquierda.
  const xRange = isMobile ? ["0%", "-81%"] : ["0%", "-55%"]
  
  const x = useTransform(smoothProgress, [0, 1], xRange)
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  const indicatorOp = useTransform(smoothProgress, [0, 0.1], [1, 0])

  return (
    <section id="horizontal-services" ref={targetRef} className="relative h-[400vh] bg-[#0a0a0a]">
      
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* --- FONDO --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
               className="absolute inset-0 opacity-[0.08]" 
               style={{ 
                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                   backgroundSize: '40px 40px' 
               }} 
            />
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#006262] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
        </div>

        {/* --- HORIZONTAL TRACK --- */}
        {/* Padding derecho ajustado para dar aire al final */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-12 px-6 md:px-20 relative z-10 items-center h-full will-change-transform pr-4 md:pr-12">
            
            {/* HEADER INTEGRADO */}
            <div className="w-[85vw] md:w-[500px] shrink-0 h-[70vh] flex flex-col justify-center pr-4 md:pr-12 pl-2 md:pl-4">
                 <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#00dfdf] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00dfdf]"></span>
                        </div>
                        <span className="text-[#00dfdf] font-manrope font-bold text-xs tracking-[0.25em] uppercase">
                            Nuestros Servicios
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-manrope font-extrabold text-white leading-[1] md:leading-[0.95] tracking-tight">
                        Soluciones <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            punta a punta.
                        </span>
                    </h2>
                 </div>

                 <p className="font-inter text-lg md:text-xl text-gray-400 leading-relaxed max-w-sm">
                    Un equipo completo de electricistas, plomeros y técnicos en refrigeración listos para cuidar tu propiedad.
                 </p>
                 
                 {/* INDICADOR SCROLL */}
                 <motion.div style={{ opacity: indicatorOp }} className="mt-12 flex items-center gap-3 text-[#00dfdf] animate-pulse">
                    {isMobile ? (
                        <>
                            <ArrowDown className="w-5 h-5" />
                            <span className="text-xs font-manrope font-bold uppercase tracking-[0.2em]">Desliza hacia abajo</span>
                        </>
                    ) : (
                        <>
                            <ArrowRight className="w-5 h-5" />
                            <span className="text-xs font-manrope font-bold uppercase tracking-[0.3em]">Desliza</span>
                        </>
                    )}
                 </motion.div>
            </div>

            {/* CARDS */}
            {SERVICES.map((service, index) => (
                <ServiceCard key={service.id} data={service} index={index} />
            ))}

            {/* FINAL CARD "A MEDIDA" (CTA CENTRADO) */}
            <div className="w-[90vw] md:w-[50vw] shrink-0 h-[65vh] flex items-center justify-center relative">
                <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full"
                >
                    <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden group">
                        
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,223,223,0.05),transparent_60%)]" />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00dfdf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10 max-w-xl">
                            <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#00dfdf]/10 text-[#00dfdf] mb-6">
                                <Briefcase size={28} />
                            </div>
                            
                            <h3 className="text-3xl md:text-5xl font-manrope font-extrabold text-white mb-4 tracking-tight">
                                ¿Necesitás algo a medida?
                            </h3>
                            <p className="text-gray-400 text-base md:text-lg mb-8 font-inter leading-relaxed">
                                Diseñamos planes específicos para <span className="text-white font-medium">consorcios grandes</span>, <span className="text-white font-medium">cadenas de locales</span> y <span className="text-white font-medium">casas particulares</span>.
                            </p>
                            
                            <div className="flex justify-center">
                                {/* BOTÓN REDISEÑADO (Blanco Sólido) */}
                                <Button className="h-16 px-10 bg-white hover:bg-gray-200 text-[#050505] font-manrope font-extrabold text-lg rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 group flex items-center gap-3">
                                    <ClipboardList className="w-5 h-5 text-[#00dfdf]" />
                                    Pedir Presupuesto
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* BUFFER FINAL */}
            <div className="w-[5vw] shrink-0" />

        </motion.div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-12 left-8 right-8 md:left-20 md:right-20 h-[2px] bg-white/5 rounded-full overflow-hidden z-20">
            <motion.div 
                style={{ width: progressWidth }} 
                className="h-full bg-gradient-to-r from-[#00dfdf] to-[#10b981] shadow-[0_0_15px_#00dfdf]"
            />
        </div>

      </div>
    </section>
  )
}

function ServiceCard({ data, index }: { data: any, index: number }) {
    const floatDuration = 6 + index
    
    return (
        <motion.div 
            className="group relative w-[85vw] md:w-[500px] h-[65vh] shrink-0 perspective-1000"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className="relative w-full h-full rounded-[2rem] bg-[#121212] border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-[#00dfdf]/40 group-hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)]">
                
                {/* 1. IMAGEN */}
                <div className="relative h-[45%] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121212] z-10" />
                    
                    <Image 
                        src={data.image} 
                        alt={data.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" 
                    />
                    
                    <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <data.icon size={20} color={data.color} />
                    </div>
                </div>

                {/* 2. CONTENIDO */}
                <div className="flex-1 p-6 md:p-8 flex flex-col relative z-20 bg-[#121212]">
                    
                    <div className="mb-auto">
                        <h4 
                            className="text-xs font-manrope font-bold uppercase tracking-widest mb-3" 
                            style={{ color: data.color }}
                        >
                            {data.subtitle}
                        </h4>
                        
                        <h3 className="text-2xl md:text-3xl font-manrope font-bold text-white mb-4 leading-tight group-hover:text-[#00dfdf] transition-colors duration-300">
                            {data.title}
                        </h3>
                        
                        <p className="text-gray-400 font-inter text-sm md:text-base leading-relaxed">
                            {data.description}
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5">
                        <div className="grid grid-cols-1 gap-2">
                            {data.features.slice(0, 3).map((feat: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                                    <CheckCircle2 size={14} className="text-[#00dfdf] shrink-0" />
                                    {feat}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}