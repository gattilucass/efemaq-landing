"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion"
import Image from "next/image"
import { 
  Check, 
  Zap, 
  Droplets, 
  Flame, 
  DoorOpen, 
  Camera, 
  Send, 
  MoreHorizontal, 
  Plus,
  Signal, 
  Wifi, 
  BatteryMedium,
  ArrowRight,
  ArrowDown
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export default function BotSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => setMounted(true), [])

  // --- 1. CONFIG SCROLL ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: isMobile ? 120 : 60,
    damping: isMobile ? 30 : 25, 
    restDelta: 0.001
  })

  // --- 2. LÓGICA DE CHAT (CINTA DESLIZANTE DESDE ABAJO) ---
  // AJUSTE SOLICITADO: En PC (isMobile false) arrancamos con menos desplazamiento (130 en vez de 280)
  // para que se vean los mensajes anteriores ("Hola", "Soy Maqui") desde el principio.
  // En Móvil mantenemos 280 para que no tape el espacio reducido.
  const chatInitialOffset = isMobile ? 500 : 130
  const chatScrollY = useTransform(smoothScroll, [0, 0.95], [chatInitialOffset, 0]) 
  
  const opacityGotera = useTransform(smoothScroll, [100, 0.10], [0, 1])
  const opacityFoto = useTransform(smoothScroll, [100, 0.10], [0, 1])
  const opacityFinal = useTransform(smoothScroll, [0.55, 0.7], [0, 1])

 // --- 3. ANIMACIONES UI ---
  
  // Texto Principal Móvil:
  // CORRECCIÓN: 
  // 1. textY: Ahora la bajada ocurre del 0% al 15% del scroll (más lento y suave).
  // 2. textOpacity: Se va desvaneciendo del 10% al 20% (dura un poco más visible).
  // 3. textScale: Eliminado el efecto de achicarse ([1, 1]).
  const textOpacity = useTransform(smoothScroll, isMobile ? [0.10, 0.15] : [0, 1], isMobile ? [1, 0] : [1, 1])
  
  const textY = useTransform(
      smoothScroll, 
      isMobile ? [0, 0.15] : [0, 1], // Rango más amplio para que la bajada se sienta natural
      isMobile ? [-80, 0] : [0, 0]   // Baja desde -80px hasta el centro
  )
  
  // Forzamos escala 1 siempre en móvil para que no se "achique"
  const textScale = useTransform(smoothScroll, [0, 1], [1, 1])

  // Celular
  const phoneOpacity = useTransform(smoothScroll, isMobile ? [0.15, 0.25] : [0, 1], isMobile ? [0, 1] : [1, 1])
  const phoneY = useTransform(smoothScroll, isMobile ? [0.15, 0.25] : [0, 1], isMobile ? [50, 0] : [0, 0])
  
  // Flecha Desktop
  const arrowOpacity = useTransform(smoothScroll, [0, 0.1], [0, 1])

  const scrollToCTA = () => {
    const element = document.getElementById("cta-section");
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
        id="bot-section" 
        ref={containerRef} 
        className="relative w-full h-[240vh] bg-[#0a0a0a]"
    >
      
      {/* FONDO */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 opacity-[0.08]" 
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
         <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
      </div>

      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center z-10 px-4 md:px-8">

        {/* --- GRID PRINCIPAL --- */}
        <div className="max-w-6xl w-full h-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center justify-center relative mx-auto">
            
          {/* --- COLUMNA IZQUIERDA: TEXTO --- */}
            <motion.div 
                style={{ opacity: textOpacity, scale: textScale, y: textY }}
                className={`flex flex-col items-center lg:items-end text-center lg:text-right w-full lg:pr-8
                           ${isMobile ? "absolute inset-0 justify-center z-20 h-full pointer-events-none" : "relative h-full justify-center pointer-events-auto"}
                `}
            >
                 <div className="flex flex-col items-center lg:items-start w-full max-w-lg lg:mr-0 lg:ml-auto text-center lg:text-left pb-10 lg:pb-0">
                     
                     {/* Badge (OCULTO EN MÓVIL AQUÍ, VISIBLE EN PC) */}
                     <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md mb-6 shrink-0">
                         <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                         </div>
                         <span className="text-[10px] md:text-xs font-manrope font-bold text-emerald-400 tracking-widest uppercase">
                             ATENCIÓN 24/7
                         </span>
                     </div>

                     <h2 className="font-manrope text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 shrink-0">
                        Reportar un incidente <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfdf] to-emerald-400">
                            nunca fue tan rápido. ⚡
                        </span>
                     </h2>

                     <p className="font-inter text-base md:text-lg text-gray-300 leading-relaxed mb-8 border-l-0 lg:border-l-2 lg:border-[#00dfdf]/30 lg:pl-6 shrink-0">
                        Olvidate de mails que nadie responde. Nuestro Bot recibe pedidos, identifica usuarios y asigna prioridades en tiempo real las 24 horas los 365 días del año.
                     </p>

                     {/* Features */}
                     <div className="space-y-4 mb-8 w-full hidden sm:block shrink-0">
                        {[
                            { icon: Zap, title: "Respuesta Inmediata", text: "Sin esperas, disponible 24/7" },
                            { icon: Camera, title: "Registro Fotográfico", text: "Evidencia visual directa al ticket" },
                            { icon: Check, title: "Número de Ticket", text: "Seguimiento automático por WhatsApp" }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                 <div className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#00dfdf]/20 group-hover:border-[#00dfdf]/40 transition-colors shrink-0">
                                     <feature.icon size={16} className="text-gray-300 group-hover:text-[#00dfdf]" />
                                 </div>
                                 <div className="text-left">
                                     <h4 className="text-white font-manrope font-bold text-sm">{feature.title}</h4>
                                     <p className="text-gray-500 text-xs font-inter leading-relaxed">{feature.text}</p>
                                 </div>
                            </div>
                        ))}
                     </div>

                     {/* CTA BUTTON */}
                     <div className="mb-4 lg:mb-0 pt-1 lg:pl- pointer-events-auto shrink-0 z-30 relative">
                        <Button 
                            onClick={scrollToCTA}
                            className="h-15 !px-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#00dfdf] font-manrope font-bold text-lg rounded-full backdrop-blur-md transition-all hover:scale-105 group"
                        >
                            Quiero probarlo
                            <ArrowRight className="ml2 w-9 h-9 group-hover:translate-x-1 transition-transform" />
                        </Button>
                     </div>

                      {/* FLECHA SVG EXTERNA (PC ONLY) */}
                     <motion.div 
                        style={{ opacity: arrowOpacity }}
                        className="absolute hidden lg:block right-[-30px] top-[60%] w-[180px] h-[120px] pointer-events-none z-30"
                     >
                        <Image 
                            src="/flecha.svg" 
                            alt="Flecha" 
                            width={180} 
                            height={120} 
                            className="object-contain"
                        />
                     </motion.div>

                 </div>
            </motion.div>

            {/* INDICADOR "DESLIZA" PARA MÓVIL */}
            <motion.div 
                style={{ opacity: textY }}
                className="lg:hidden flex flex-col items-center gap-2 absolute bottom-28 left-1/2 -translate-x-1/2 animate-pulse w-full pointer-events-none"
            >
                <span className="text-[#00dfdf] text-xs font-bold uppercase tracking-widest">Deslizá para ver demo</span>
                <ArrowDown className="text-[#00dfdf]" size={20} />
            </motion.div>

           {/* --- COLUMNA DERECHA: CELULAR --- */}
            <motion.div 
                style={{ opacity: phoneOpacity, y: phoneY }}
                className="relative w-full h-full flex flex-col items-center justify-center lg:justify-center lg:items-start lg:pl-10 z-10 pointer-events-none lg:pointer-events-auto"
            >
                 {/* BADGE MÓVIL */}
                 <div className="lg:hidden mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md shadow-lg shadow-black/20">
                     <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                     </div>
                     <span className="text-[10px] font-manrope font-bold text-emerald-400 tracking-widest uppercase">
                         ATENCIÓN 24/7
                     </span>
                 </div>

                 {/* Contenedor Celular: Altura AJUSTADA para evitar desproporción */}
                 {/* h-[60vh] es mucho más seguro en pantallas chicas. max-h-[600px] evita que se estire demasiado. */}
                 <div className="relative w-auto h-[70vh] md:h-[700px] aspect-[9/19] bg-[#050505] rounded-[2.5rem] border-[6px] border-[#181818] shadow-2xl overflow-hidden ring-1 ring-white/10 flex flex-col will-change-transform mx-auto lg:mx-0">
                     {/* STATUS BAR */}
                     <div className="absolute top-0 w-full px-6 pt-3 pb-2 flex justify-between items-center z-50 text-white/90 bg-[#111]/95 backdrop-blur-sm">
                         <span className="text-[10px] font-manrope font-bold tracking-wide">9:41</span>
                         <div className="flex items-center gap-1">
                            <Signal size={12} strokeWidth={2.5} />
                            <Wifi size={12} strokeWidth={2.5} />
                            <BatteryMedium size={14} strokeWidth={2.5} />
                         </div>
                     </div>
                     
                     {/* HEADER APP */}
                     <div className="absolute top-0 w-full h-23 bg-[#111]/95 backdrop-blur-xl border-b border-white/5 z-40 flex items-end pb-3 px-5 shadow-sm">
                         <div className="flex items-center gap-3 w-full">
                             <div className="w-8 h-8 rounded-full bg-white/5 p-0.5 border border-white/10 flex items-center justify-center shadow-lg overflow-hidden relative">
                                 <Image 
                                    src="/logo.jpg" 
                                    alt="EFEMAQ" 
                                    fill
                                    className="object-cover"
                                 />
                             </div>
                             <div className="flex-1">
                                 <h3 className="text-white font-manrope font-bold text-sm tracking-tight">EFEMAQ</h3>
                                 <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="relative flex h-1.5 w-1.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                    </span>
                                    <p className="text-gray-400 text-[10px] font-inter font-medium">En línea</p>
                                 </div>
                             </div>
                             <MoreHorizontal size={18} className="text-gray-500" />
                         </div>
                     </div>

                     {/* --- CHAT AREA --- */}
                     <div className="flex-1 bg-[#0a0a0a] relative overflow-hidden flex flex-col font-inter pt-20">
                        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0a0a0a] to-transparent z-20" />

                        {/* CONTENEDOR DE MENSAJES */}
                        <motion.div 
                            className="absolute bottom-16 left-0 w-full flex flex-col px-4 gap-3 z-10 pb-4" 
                            style={{ y: chatScrollY }}
                        >
                             
                             {/* --- MENSAJES FIJOS --- */}
                             <div className="w-full flex justify-end">
                                 <div className="px-4 py-2 rounded-2xl rounded-tr-sm bg-[#006262] text-white text-xs shadow-md">
                                     Hola
                                 </div>
                             </div>

                             <div className="w-full flex justify-start gap-2 items-end">
                                 <div className="w-6 h-6 rounded-full border border-white/10 overflow-hidden relative shrink-0 mb-1">
                                    <Image src="/logo.jpg" alt="Bot" fill className="object-cover" />
                                 </div>
                                 <div className="flex flex-col gap-2 max-w-[85%]">
                                     <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1a1a1a] border border-white/5 text-gray-200 text-xs">
                                        Hola, soy Maqui tu asistente virtual, elegí una opción para registrar tu solicitud.
                                     </div>
                                     <div className="grid grid-cols-2 gap-2">
                                         {[{ l: "Agua", i: Droplets, c: "text-blue-400" }, { l: "Eléctrico", i: Zap, c: "text-yellow-400" }, { l: "Gas", i: Flame, c: "text-orange-400" }, { l: "Accesos", i: DoorOpen, c: "text-purple-400" }].map((opt, i) => (
                                              <div key={i} className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#1a1a1a] border border-white/5 transition-colors"><opt.i size={14} className={opt.c} /><span className="text-[9px] text-gray-300 font-medium mt-1">{opt.l}</span></div>
                                          ))}
                                     </div>
                                 </div>
                             </div>

                             <div className="w-full flex justify-end">
                                 <div className="px-4 py-2 rounded-2xl rounded-tr-sm bg-[#006262] text-white text-xs shadow-md">
                                     Agua / Desagües
                                 </div>
                             </div>

                             <div className="w-full flex justify-start gap-2 items-end">
                                 <div className="w-6 h-6 rounded-full border border-white/10 overflow-hidden relative shrink-0 mb-1">
                                    <Image src="/logo.jpg" alt="Bot" fill className="object-cover" />
                                 </div>
                                 <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1a1a1a] border border-white/5 text-gray-200 text-xs">
                                    Te pido una descripción y una imagen para cargar la solicitud.
                                 </div>
                             </div>

                             {/* --- MENSAJES NUEVOS --- */}
                             <motion.div style={{ opacity: opacityGotera }} className="w-full flex justify-end">
                                 <div className="px-4 py-2 rounded-2xl rounded-tr-sm bg-[#006262] text-white text-xs shadow-md">
                                    Hay una gotera en el hall de ingreso
                                 </div>
                             </motion.div>

                             <motion.div style={{ opacity: opacityFoto }} className="w-full flex justify-end">
                                 <div className="w-40 h-28 rounded-xl bg-[#1a1a1a] border-2 border-white/10 flex items-center justify-center relative overflow-hidden shadow-md">
                                     <div className="relative w-full h-full">
                                        <Image 
                                            src="/filtracion.png" 
                                            alt="Gotera"
                                            fill
                                            className="object-cover opacity-80"
                                        />
                                     </div>
                                     <div className="absolute bottom-1.5 right-1.5 bg-black/60 p-1 rounded-full backdrop-blur-sm"><Check size={10} className="text-emerald-400" /></div>
                                 </div>
                             </motion.div>

                             <motion.div style={{ opacity: opacityFinal }} className="w-full flex justify-start gap-2 items-end">
                                 <div className="w-6 h-6 rounded-full border border-white/10 overflow-hidden relative shrink-0 mb-1">
                                    <Image src="/logo.jpg" alt="Bot" fill className="object-cover" />
                                 </div>
                                 <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#0a2215] border-l-2 border-l-emerald-500 text-gray-200 text-xs shadow-xl shadow-emerald-900/20 leading-relaxed">
                                    ¡Recibido! Ticket <strong className="text-white">#4590</strong> generado. <br/> El técnico va en camino. 🚀
                                 </div>
                             </motion.div>
                             
                        </motion.div>
                     </div>

                     {/* Footer Input (Sticky al fondo) */}
                     <div className="absolute bottom-0 w-full h-14 bg-[#151515] border-t border-white/5 z-30 flex items-center px-4 gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center text-gray-400 shrink-0">
                             <Plus size={16} />
                          </div>
                          <div className="flex-1 h-8 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center px-4 text-xs text-gray-500 font-inter">Escribí un mensaje...</div>
                          <div className="w-8 h-8 rounded-full bg-[#006262] flex items-center justify-center text-white shadow-lg shadow-[#006262]/30 shrink-0">
                              <Send size={14} className="-ml-0.5 mt-0.5" /> 
                          </div>
                     </div>

                 </div>
            </motion.div>
        
        </div>
      </div>
    </section>
  )
}