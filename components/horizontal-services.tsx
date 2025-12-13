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
  ClipboardList 
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

// --- DATA DE SERVICIOS ---
const SERVICES = [
  {
    id: "01",
    title: "Mantenimiento Preventivo",
    subtitle: "Aires, tableros y bombas",
    description: "Evitá las urgencias, rutinas mensuales para cuidar todos los equipos críticos de tu casa, local, tu edificio o tu empresa.",
    features: ["Limpieza de Aires Acondicionados", "Ajuste de Tableros Eléctricos", "Control de Bombas de Agua", "Pruebas de Seguridad."],
    icon: FileSearch,
    color: "#00dfdf", // Teal
    image: "/card2.png" 
  },
  {
    id: "02",
    title: "Remodelaciones y ampliaciones",
    subtitle: "Pintura, obra seca y gas",
    description: "Renovamos tus espacios con calidad. Desde arreglar una filtración en la terraza hasta pintar el hall de entrada o remodelar una oficina.",
    features: ["Impermeabilización de techos", "pintura de altura y fachadas", "Instalaciones sanitarias y gas", "Electricidad y luminotecnia"],
    icon: ShieldAlert,
    color: "#10b981", // Emerald
    image: "/card1.png" 
  },
  {
    id: "03",
    title: "Urgencias 24/7",
    subtitle: "Guardia Técnica Activa",
    description: "Cuando necesites, estamos ahí. Cortes de luz, caños rotos, puertas trabadas o fallas críticas que no pueden esperar a mañana.",
    features: ["Electricistas de Guardia", "Plomería de Urgencia", "Reparación de Aires", "Fugas de Gas"],
    icon: Hammer,
    color: "#f59e0b", // Amber
    image: "/card3.png"
  },
  {
    id: "04",
    title: "Solución garantizada",
    subtitle: "Auditoria y Seguimiento",
    description: "Gestión continua, trazabilidad y transparencia en cada etapa. Sabés qué hicimos, cuándo y cómo. Información clara, verificable y siempre a mano.",
    features: ["Informes técnicos certificados", "Reportes de avances", "Historial de intervenciones", "Control de calidad y verificación final"],
    icon: Zap,
    color: "#ef4444", // Red
    image: "/card4.png"
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

  // --- TRANSFORMACIÓN HORIZONTAL ---
  const xRange = isMobile ? ["0%", "-84%"] : ["0%", "-55%"]
  
  const x = useTransform(smoothProgress, [0, 1], xRange)
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  const indicatorOp = useTransform(smoothProgress, [0, 0.1], [1, 0])

  const scrollToCTA = () => {
    const element = document.getElementById("cta-section");
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Agregamos z-30 al section base por si acaso
    <section id="horizontal-services" ref={targetRef} className="relative h-[400vh] bg-[#0a0a0a] z-30">
      
      {/* STICKY CONTAINER: Z-30 para levantar toda la estructura */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden z-30">
        
        {/* --- FONDO (Z-0 y Z-10 para no molestar) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
               className="absolute inset-0 opacity-[0.08]" 
               style={{ 
                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                   backgroundSize: '40px 40px' 
               }} 
            />
            {/* Gradientes bajados a z-10 para que no tapen nada interactivo */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#006262] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
        </div>

        {/* --- HORIZONTAL TRACK --- */}
        {/* CRUCIAL: Z-40 para igualar la altura del Hero y pelear el foco */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 px-6 md:px-20 relative z-40 items-center h-full will-change-transform pr-4 md:pr-12">
            
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
                   Un equipo completo de electricistas, técnicos en refrigeración, abertureros, pintores, plomeros y más, listos para cuidar tu propiedad.
                 </p>
                 
                 {/* INDICADOR SCROLL */}
                 <motion.div style={{ opacity: indicatorOp }} className="mt-12 flex items-center gap-3 text-[#00dfdf] animate-pulse">
                    {isMobile ? (
                        <>
                            <ArrowDown className="w-5 h-5" />
                            <span className="text-xs font-manrope font-bold uppercase tracking-[0.2em]">Desliza</span>
                        </>
                    ) : (
                        <>
                            <ArrowDown className="w-5 h-5" />
                            <span className="text-xs font-manrope font-bold uppercase tracking-[0.2em]">Desliza</span>
                        </>
                    )}
                 </motion.div>
            </div>

            {/* CARDS */}
            {SERVICES.map((service, index) => (
                <ServiceCard key={service.id} data={service} index={index} />
            ))}

            {/* FINAL CARD "A MEDIDA" */}
            <div className="w-[90vw] md:w-[50vw] shrink-0 h-[65vh] md:h-auto md:max-h-[80vh] flex items-center justify-center relative">
                <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full"
                >
                    <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 md:p-12 text-center relative overflow-hidden group">
                        
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,223,223,0.05),transparent_60%)]" />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00dfdf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-30 max-w-xl">
                            <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#00dfdf]/10 text-[#00dfdf] mb-6">
                                <Briefcase size={28} />
                            </div>
                            
                            <h3 className="text-3xl md:text-5xl font-manrope font-extrabold text-white mb-4 tracking-tight">
                                ¿Necesitás algo a medida?
                            </h3>
                            <p className="text-gray-400 text-base md:text-lg mb-8 font-inter leading-relaxed">
                                Diseñamos planes a medida para <span className="text-white font-medium">consorcios</span>, <span className="text-white font-medium">cadenas de locales,</span> <span className="text-white font-medium">oficinas y hogares</span>.
                            </p>
                            
                            <div className="flex justify-center">
                                <Button 
                                    onClick={scrollToCTA}
                                    className="h-16 px-10 bg-white hover:bg-gray-200 text-[#050505] font-manrope font-extrabold text-lg rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 group flex items-center gap-3"
                                >
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

        {/* PROGRESS BAR (Z-40 para que se vea) */}
        <div className="absolute bottom-12 left-8 right-8 md:left-20 md:right-20 h-[2px] bg-white/5 rounded-full overflow-hidden z-40">
            <motion.div 
                style={{ width: progressWidth }} 
                className="h-full bg-gradient-to-r from-[#00dfdf] to-[#10b981] shadow-[0_0_15px_#00dfdf]"
            />
        </div>

      </div>
    </section>
  )
}

// --- SUB-COMPONENTE: CARD FLOTANTE ---
function ServiceCard({ data, index }: { data: any, index: number }) {
    const floatDuration = 6 + index
    
    return (
        <motion.div 
            className="group relative w-[80vw] md:w-[450px] h-auto max-h-[85vh] shrink-0 perspective-1000 flex flex-col"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className="relative w-full h-full rounded-[2rem] bg-[#121212] border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-[#00dfdf]/40 group-hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)] flex flex-col">
                
                {/* 1. IMAGEN */}
                <div className="relative h-[250px] shrink-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121212] z-30" />
                    
                    <Image 
                        src={data.image} 
                        alt={data.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" 
                    />
                    
                    <div className="absolute top-4 right-4 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <data.icon size={18} color={data.color} />
                    </div>
                </div>

                {/* 2. CONTENIDO */}
                <div className="flex-1 p-6 flex flex-col relative z-30 bg-[#121212] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent hover:scrollbar-thumb-emerald-500/50">
                    
                    <div className="shrink-0">
                        <h4 
                            className="text-[10px] md:text-xs font-manrope font-bold uppercase tracking-widest mb-2" 
                            style={{ color: data.color }}
                        >
                            {data.subtitle}
                        </h4>
                        
                        <h3 className="text-xl md:text-2xl font-manrope font-bold text-white mb-3 leading-tight group-hover:text-[#00dfdf] transition-colors duration-300">
                            {data.title}
                        </h3>
                        
                        <p className="text-gray-400 font-inter text-xs md:text-sm leading-relaxed">
                            {data.description}
                        </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 shrink-0">
                        <div className="grid grid-cols-1 gap-2">
                            {data.features.slice(0, 4).map((feat: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                                    <CheckCircle2 size={12} className="text-[#00dfdf] shrink-0" />
                                    {feat}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="h-1 shrink-0" />

                </div>
            </div>
        </motion.div>
    )
}