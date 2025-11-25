"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Hammer, 
  FileSearch, 
  ShieldAlert,
  Briefcase,
  Home
} from 'lucide-react'
import { Button } from "@/components/ui/button"

// --- DATA DE SERVICIOS ---
const SERVICES = [
  {
    id: "01",
    title: "Auditoría & Diagnóstico",
    subtitle: "El primer paso real.",
    description: "Antes de tocar un ladrillo, entendemos la patología. Utilizamos termografía e inspección técnica para atacar la causa raíz.",
    features: ["Informes Técnicos", "Termografía Infrarroja", "Detección de Fugas", "Plan de Inversión"],
    icon: FileSearch,
    color: "#00dfdf", // Teal
    image: "/efemaq-team-professional-office.jpg" 
  },
  {
    id: "02",
    title: "Mantenimiento Preventivo",
    subtitle: "Evitar es mejor que arreglar.",
    description: "Un plan sistemático para bombas, tableros y estructuras. Mantenemos tu edificio operativo y seguro.",
    features: ["Abonos Mensuales", "Rutinas de Control", "Limpieza de Tanques", "Pruebas de Sistemas"],
    icon: ShieldAlert,
    color: "#10b981", // Emerald
    image: "/modern-office-building-maintenance.jpg" 
  },
  {
    id: "03",
    title: "Obras y Reformas",
    subtitle: "Soluciones definitivas.",
    description: "Ejecución de obras de envergadura con personal propio. Desde impermeabilizaciones hasta refacciones estéticas.",
    features: ["Impermeabilización", "Albañilería General", "Pintura de Altura", "Instalaciones Sanitarias"],
    icon: Hammer,
    color: "#f59e0b", // Amber
    image: "/modern-office-building-maintenance.jpg"
  },
  {
    id: "04",
    title: "Urgencias 24/7",
    subtitle: "Respuesta inmediata.",
    description: "Cuando pasa algo grave, no hay burocracia. Nuestro sistema de guardia garantiza presencia técnica récord.",
    features: ["Guardia Eléctrica", "Plomería de Urgencia", "Destapaciones", "Riesgo Estructural"],
    icon: Zap,
    color: "#ef4444", // Red
    image: "/efemaq-team-professional-office.jpg"
  },
]

export default function HorizontalServices() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  // --- SCROLL PHYSICS ---
  // Altura reducida a 300vh para un scroll más ágil
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  })

  // --- TRANSFORMACIÓN HORIZONTAL (LÓGICA LOCK) ---
  // Mapeamos el scroll vertical [0 -> 0.85] al movimiento horizontal ["0%" -> "-55%"]
  // Del 0.85 al 1.0, el valor se queda en "-55%", creando el efecto de "fijado" en el centro.
  // El valor -55% está calculado aprox para centrar la última card ancha.
  const x = useTransform(smoothProgress, [0, 0.85], ["0%", "-55%"])
  
  // Barra de Progreso (Sigue llenándose hasta el final)
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={targetRef} className="relative h-[350vh] bg-[#0a0a0a]">
      
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* --- FONDO (Grid System + Glows) --- */}
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
        <motion.div style={{ x }} className="flex gap-12 px-8 md:px-20 relative z-10 items-center h-full">
            
            {/* HEADER INTEGRADO (Inicio del carril) */}
            <div className="w-[85vw] md:w-[500px] shrink-0 h-[70vh] flex flex-col justify-center pr-12 pl-4">
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
                    <h2 className="text-5xl md:text-6xl font-manrope font-extrabold text-white leading-[0.95] tracking-tight">
                        Soluciones <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            punta a punta.
                        </span>
                    </h2>
                 </div>

                 <p className="font-inter text-xl text-gray-400 leading-relaxed max-w-sm">
                    Un ecosistema de mantenimiento diseñado para cubrir cada etapa de la vida útil de tu propiedad.
                 </p>
                 
                 <div className="mt-12 flex items-center gap-3 text-[#00dfdf] animate-pulse">
                    <ArrowRight className="w-5 h-5" />
                    <span className="text-xs font-manrope font-bold uppercase tracking-[0.3em]">Desliza</span>
                 </div>
            </div>

            {/* CARDS DE SERVICIOS */}
            {SERVICES.map((service, index) => (
                <ServiceCard key={service.id} data={service} index={index} />
            ))}

            {/* FINAL CARD "A MEDIDA" (Se detiene en el centro) */}
            <div className="w-[90vw] md:w-[50vw] shrink-0 h-[65vh] flex items-center justify-center relative">
                {/* Floating Wrapper */}
                <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full"
                >
                    <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-12 text-center relative overflow-hidden group">
                        
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,223,223,0.05),transparent_60%)]" />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00dfdf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10 max-w-xl">
                            <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#00dfdf]/10 text-[#00dfdf] mb-6">
                                <Briefcase size={28} />
                            </div>
                            
                            <h3 className="text-3xl md:text-5xl font-manrope font-extrabold text-white mb-4 tracking-tight">
                                ¿Necesitás algo a medida?
                            </h3>
                            <p className="text-gray-400 text-lg mb-8 font-inter leading-relaxed">
                                Diseñamos planes específicos para <span className="text-white font-medium">consorcios</span>, <span className="text-white font-medium">casas particulares</span> y <span className="text-white font-medium">negocios</span>.
                            </p>
                            
                            <div className="flex justify-center">
                                <Button className="h-14 px-12 bg-[#00dfdf] hover:bg-[#00bkbk] text-black font-manrope font-bold text-lg rounded-full shadow-[0_0_30px_rgba(0,223,223,0.3)] transition-all hover:scale-105">
                                    Pedir Presupuesto
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ESPACIADOR FINAL INVISIBLE (Buffer) */}
            {/* Un pequeño margen extra a la derecha para asegurar que el centrado no se corte en pantallas muy anchas */}
            <div className="w-[10vw] shrink-0" />

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

// --- SUB-COMPONENTE: CARD FLOTANTE ---
function ServiceCard({ data, index }: { data: any, index: number }) {
    // Efecto de flotación escalonado
    const floatDuration = 6 + index
    
    return (
        <motion.div 
            className="group relative w-[85vw] md:w-[500px] h-[65vh] shrink-0 perspective-1000"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className="relative w-full h-full rounded-[2rem] bg-[#121212] border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-[#00dfdf]/40 group-hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)]">
                
                {/* --- LAYOUT INTERNO --- */}
                <div className="absolute inset-0 flex flex-col">
                    
                    {/* 1. IMAGEN */}
                    <div className="relative h-[45%] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121212] z-10" />
                        
                        <Image 
                            src={data.image} 
                            alt={data.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" 
                        />
                        
                        {/* Icono Flotante (Sin número) */}
                        <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <data.icon size={20} color={data.color} />
                        </div>
                    </div>

                    {/* 2. CONTENIDO */}
                    <div className="flex-1 p-8 flex flex-col relative z-20 bg-[#121212]">
                        
                        <div className="mb-auto">
                            <h4 
                                className="text-xs font-manrope font-bold uppercase tracking-widest mb-3" 
                                style={{ color: data.color }}
                            >
                                {data.subtitle}
                            </h4>
                            
                            <h3 className="text-3xl font-manrope font-bold text-white mb-4 leading-tight group-hover:text-[#00dfdf] transition-colors duration-300">
                                {data.title}
                            </h3>
                            
                            <p className="text-gray-400 font-inter text-sm md:text-base leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        {/* Features List */}
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
            </div>
        </motion.div>
    )
}