"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { 
  Award, 
  ShieldCheck, 
  Users, 
  ChevronRight, 
  PenTool
} from 'lucide-react'

export default function AboutUs() {
  const containerRef = useRef<HTMLElement>(null)

  // --- 1. CONFIG SCROLL COMPACTO ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  })

  // --- 2. PARALLAX ---
  
  // Parallax Imagen (Solo vertical, sin deformar)
  const parallaxY = useTransform(smoothScroll, [0, 1], [0, 40])
  
  // Textos
  const textY = useTransform(smoothScroll, [0.1, 0.4], [50, 0])
  const textOp = useTransform(smoothScroll, [0.1, 0.3], [0, 1])

  const statsY = useTransform(smoothScroll, [0.3, 0.6], [50, 0])
  const statsOp = useTransform(smoothScroll, [0.3, 0.5], [0, 1])

  const quoteY = useTransform(smoothScroll, [0.6, 0.8], [30, 0])
  const quoteOp = useTransform(smoothScroll, [0.6, 0.75], [0, 1])

  // Linea "Parches"
  const lineDraw = useTransform(smoothScroll, [0.2, 0.35], [0, 1])

  return (
    <section 
        ref={containerRef} 
        className="relative w-full py-24 lg:py-32 px-4 overflow-hidden bg-[#0a0a0a]"
    >
        
        {/* FONDO */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
               className="absolute inset-0 opacity-[0.1]" 
               style={{ 
                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                   backgroundSize: '40px 40px' 
               }} 
            />
            <div className="absolute top-1/4 right-0 w-[500px] h-[600px] bg-[#006262] opacity-10 blur-[120px] rounded-full" />
        </div>


        <div className="relative z-10 max-w-7xl mx-auto">
            
            {/* HEADER */}
            <motion.div 
                className="flex flex-col items-start mb-16 lg:mb-20 pl-2 md:pl-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                 <div className="flex items-center gap-3 mb-4">
                     <div className="flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-[#00dfdf] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00dfdf]"></span>
                     </div>
                     <span className="text-xs font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                         ADN EFEMAQ
                     </span>
                 </div>

                 <h2 className="font-manrope text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
                     No es magia.<br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400">Es ingeniería.</span>
                 </h2>
            </motion.div>


            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* [COLUMNA IZQ - IMAGEN] */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0 pl-2 md:pl-8 z-20">
                    
                    {/* Wrapper del Parallax Scroll */}
                    <motion.div style={{ y: parallaxY }}>
                        
                        {/* Wrapper de Flotación Infinita */}
                        <motion.div 
                            animate={{ y: [0, -12, 0] }} 
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative p-2"
                        >
                            {/* EL COMPONENTE DE IMAGEN ("Group" padre para hover) */}
                            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#101010] shadow-2xl group cursor-default">
                                 
                                 {/* Esquinas Decorativas */}
                                 <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00dfdf]/30 transition-colors group-hover:border-[#00dfdf]" />
                                 <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#00dfdf]/30 transition-colors group-hover:border-[#00dfdf]" />
                                 <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#00dfdf]/30 transition-colors group-hover:border-[#00dfdf]" />
                                 <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00dfdf]/30 transition-colors group-hover:border-[#00dfdf]" />

                                 {/* FOTO: Solo Grayscale/Opacity, SIN Scale, SIN Transform */}
                                 <img
                                   src="/efemaq-team-professional-office.jpg"
                                   alt="Equipo EFEMAQ"
                                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 grayscale-[0.2] group-hover:grayscale-0"
                                 />
                                 
                                 {/* Gradiente de texto */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                                 
                                 {/* TEXTO FLOTANTE */}
                                 <div className="absolute bottom-6 left-6 right-6">
                                     <div className="bg-black/40 backdrop-blur-lg border border-white/10 p-4 rounded-xl flex items-center justify-between transition-all group-hover:bg-black/60 group-hover:border-white/20">
                                         <div>
                                             <p className="text-white font-manrope font-bold text-sm mb-0.5">Fernando & Equipo</p>
                                             {/* CORRECCIÓN: group-hover (del padre imagen) activa el color verde aqui */}
                                             <p className="text-gray-400 text-[10px] font-manrope font-bold tracking-widest uppercase group-hover:text-[#00dfdf] transition-colors">
                                                Dirección Técnica
                                             </p>
                                         </div>
                                         {/* Icono tambien se prende */}
                                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00dfdf]/20 transition-colors">
                                            <PenTool className="text-white/70 w-4 h-4 group-hover:text-[#00dfdf] transition-colors" />
                                         </div>
                                     </div>
                                 </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>


                {/* [COLUMNA DER - TEXTO] */}
                <div className="lg:col-span-7 flex flex-col space-y-16 pt-4 lg:pl-8">
                    
                    {/* TEXTO PRINCIPAL */}
                    <motion.div 
                        style={{ y: textY, opacity: textOp }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-manrope font-bold text-white leading-snug">
                            Terminando con la era de los{' '}
                            <span className="relative inline-block text-[#00dfdf]">
                                parches
                                <svg className="absolute w-full h-2 bottom-0 left-0 overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <motion.path 
                                        d="M0 5 Q 50 10 100 5" 
                                        fill="none" 
                                        stroke="#00dfdf" 
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        style={{ pathLength: lineDraw }}
                                    />
                                </svg>
                            </span>
                            .
                        </h3>
                        
                        <div className="space-y-4">
                            <p className="font-inter text-lg text-gray-400 leading-relaxed text-left">
                                EFEMAQ nace de una frustración compartida: llamar a tres "especialistas" distintos para el mismo problema y que, a los dos meses, vuelva a fallar.
                            </p>
                            <p className="font-inter text-lg text-gray-400 leading-relaxed text-left border-l-2 border-[#00dfdf]/30 pl-5">
                                Creamos un sistema donde <strong>la tecnología de seguimiento</strong> se une a la <strong>experiencia en obra</strong>. No solo arreglamos; auditamos, registramos y garantizamos el resultado final.
                            </p>
                        </div>
                    </motion.div>


                    {/* BENTO GRID STATS */}
                    <motion.div 
                        style={{ y: statsY, opacity: statsOp }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                    >
                        {/* Stat 1 */}
                        <div className="p-6 rounded-2xl bg-[#111] border border-white/10 hover:border-[#00dfdf]/40 transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <Award size={28} className="text-gray-600 group-hover:text-[#00dfdf] transition-colors" />
                                <span className="text-xs font-manrope font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#00dfdf] transition-colors">
                                    Experiencia
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1">
                               <span className="text-4xl font-manrope font-extrabold text-white">+15</span>
                               <span className="text-sm text-[#00dfdf] font-bold">Años</span>
                            </div>
                            <p className="text-gray-500 text-sm mt-2 leading-tight font-inter">Trayectoria combinada en obras y mantenimiento integral.</p>
                        </div>

                        {/* Stat 2 */}
                        <div className="p-6 rounded-2xl bg-[#111] border border-white/10 hover:border-[#00dfdf]/40 transition-all group">
                             <div className="flex items-start justify-between mb-4">
                                <ShieldCheck size={28} className="text-gray-600 group-hover:text-[#00dfdf] transition-colors" />
                                <span className="text-xs font-manrope font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#00dfdf] transition-colors">
                                    Soporte
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1">
                               <span className="text-4xl font-manrope font-extrabold text-white">24/7</span>
                               <span className="text-sm text-[#00dfdf] font-bold">Guardia</span>
                            </div>
                            <p className="text-gray-500 text-sm mt-2 leading-tight font-inter">Sistema de tickets automatizado para urgencias reales.</p>
                        </div>

                         {/* Talent CTA */}
                        <div className="sm:col-span-2 p-6 rounded-2xl bg-[#151515] border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-[#1a1a1a] transition-colors shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#00dfdf]/10 flex items-center justify-center text-[#00dfdf]">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base font-manrope group-hover:text-[#00dfdf] transition-colors">¿Querés sumarte al equipo?</h4>
                                    <p className="text-gray-500 text-xs font-inter">Buscamos técnicos certificados.</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-white group-hover:bg-[#00dfdf] group-hover:text-black transition-all">
                                <ChevronRight size={18} />
                            </div>
                        </div>
                    </motion.div>


                    {/* QUOTE FINAL */}
                    <motion.div 
                        style={{ y: quoteY, opacity: quoteOp }}
                        className="pt-4"
                    >
                        <blockquote className="relative pl-6 border-l-2 border-gray-700">
                            <p className="font-inter text-lg text-gray-300 italic leading-relaxed">
                             "La tranquilidad no se logra con un mensaje de 'ya voy', se logra con un sistema que te dice quién va, cuándo llega y te muestra cómo quedó."
                            </p>
                            <footer className="mt-4 flex items-center gap-3">
                                <div className="h-px w-8 bg-[#00dfdf]" />
                                <cite className="font-manrope font-bold text-white text-sm uppercase tracking-widest not-italic">
                                    Fernando
                                </cite>
                                <span className="text-xs text-gray-500 font-inter">Director General</span>
                            </footer>
                        </blockquote>
                    </motion.div>

                </div>

            </div>
        </div>
    </section>
  )
}