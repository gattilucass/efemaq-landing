"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { 
  Bot, 
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
  BatteryMedium 
} from 'lucide-react'

export default function BotSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // --- 1. CONFIG SCROLL: 800VH ---
  // Un scroll muy largo permite animaciones muy suaves y espaciadas.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Física muy amortiguada para evitar el "efecto golpe"
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30, 
    restDelta: 0.0001
  })

  // --- 2. ANIMACIÓN FADE-IN-UP ---
  // Lógica: Altura 0 -> Altura Real. 
  // Al mismo tiempo: Y (Desplazamiento) y Opacidad.
  // Alturas: Reducidas drásticamente para juntar las burbujas (apretadas).
  
  const createFluidMsg = (start: number, end: number, heightPx: number) => {
    const h = useTransform(smoothScroll, [start, end], [0, heightPx])
    const op = useTransform(smoothScroll, [start, start + 0.05], [0, 1])
    const y = useTransform(smoothScroll, [start, end], [20, 0])
    // Filtro Blur para suavizar el "borde duro"
    const blur = useTransform(smoothScroll, [start, end], ["blur(8px)", "blur(0px)"])

    return { height: h, opacity: op, y, filter: blur }
  }

  // --- TIMELINE RECALIBRADO (Distribución uniforme 0.0 -> 0.9) ---
  
  // M1 Hola: Aparece casi al instante
  const m1 = createFluidMsg(0.02, 0.06, 40) 

  // M2 Dirección: Un poco más de altura por ser 3 líneas
  const m2 = createFluidMsg(0.09, 0.15, 85) 

  // M3 Botón Sí
  const m3 = createFluidMsg(0.17, 0.23, 40) 

  // M4 Qué incidente?
  const m4 = createFluidMsg(0.25, 0.31, 50) 

  // M5 GRID (Este era el que trababa todo). 
  // Le damos altura justa y buen margen de scroll
  const m5 = createFluidMsg(0.33, 0.42, 120) 

  // M6 Selección Agua
  const m6 = createFluidMsg(0.45, 0.51, 40) 

  // M7 Pedido Foto
  const m7 = createFluidMsg(0.53, 0.60, 50) 

  // M8 Upload Foto (Altura de imagen + margen)
  const m8 = createFluidMsg(0.63, 0.72, 110) 

  // M9 RECIBIDO (Anchor)
  // Termina en 0.85. Queda un 15% del scroll libre para leer estático.
  const m9 = createFluidMsg(0.75, 0.85, 90) 

  
  // UI Copy
  const textOpacity = useTransform(smoothScroll, [0, 0.15], [0, 1])
  const textY = useTransform(smoothScroll, [0, 0.15], [30, 0])
  
  const arrowDraw = useTransform(smoothScroll, [0.05, 0.25], [0, 1])
  const arrowTipOpacity = useTransform(smoothScroll, [0.22, 0.25], [0, 1])

  return (
    <section ref={containerRef} className="relative w-full h-[900vh] bg-[#0a0a0a]">
      
      {/* FONDO */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 opacity-[0.15]" 
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center z-10 px-4">

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-4">
            
            {/* --- IZQUIERDA --- */}
            <motion.div 
                style={{ opacity: textOpacity, y: textY }}
                className="flex flex-col order-2 lg:order-1 relative z-20"
            >
                 <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md mb-6">
                     <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                     </div>
                     <span className="text-[11px] font-manrope font-bold text-emerald-400 tracking-widest uppercase">Sistema Live</span>
                 </div>

                 <h2 className="font-manrope text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                    Reportar un incidente <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfdf] to-emerald-400">
                        nunca fue tan rápido. ⚡
                    </span>
                 </h2>

                 <p className="font-inter text-lg text-gray-400 leading-relaxed mb-10 max-w-md border-l-2 border-[#00dfdf]/30 pl-6">
                    Olvidate de mails que nadie lee. Nuestro <strong>Bot Maqui</strong> gestiona reclamos, identifica tu unidad y asigna prioridades en tiempo real.
                 </p>

                 <div className="space-y-6 mb-12">
                    {[
                        { icon: Zap, title: "Respuesta Inmediata", text: "Sin esperas, disponible 24/7" },
                        { icon: Camera, title: "Registro Fotográfico", text: "Evidencia visual directa al ticket" },
                        { icon: Check, title: "Número de Ticket", text: "Seguimiento automático por WhatsApp" }
                    ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                             <div className="mt-1 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#00dfdf]/20 group-hover:border-[#00dfdf]/40 transition-colors">
                                 <feature.icon size={18} className="text-gray-300 group-hover:text-[#00dfdf]" />
                             </div>
                             <div>
                                 <h4 className="text-white font-manrope font-bold text-sm">{feature.title}</h4>
                                 <p className="text-gray-500 text-xs font-inter leading-relaxed">{feature.text}</p>
                             </div>
                        </div>
                    ))}
                 </div>

                 {/* FLECHA + CTA */}
                 <div className="relative hidden lg:flex items-center">
                    <div className="flex items-center gap-4 group cursor-default">
                        <span className="text-[#00dfdf] font-manrope font-bold text-xl">
                            Mirá cómo funciona
                        </span>
                        
                        <svg className="w-48 h-24 pointer-events-none overflow-visible" viewBox="0 0 180 80">
                            <motion.path
                                d="M 0 40 C 30 40, 40 10, 60 30 C 75 50, 65 70, 55 50 C 45 35, 70 30, 90 40 S 140 40, 165 40" 
                                fill="none"
                                stroke="#00dfdf"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{ pathLength: arrowDraw, opacity: arrowDraw }}
                            />
                             <motion.path
                                d="M 155 35 L 165 40 L 155 45"
                                fill="none"
                                stroke="#00dfdf"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ opacity: arrowTipOpacity }} 
                             />
                        </svg>
                    </div>
                 </div>
            </motion.div>


            {/* --- DERECHA: CELULAR --- */}
            <motion.div 
                className="relative h-[680px] md:h-[780px] w-full max-w-[400px] mx-auto lg:mr-0 order-1 lg:order-2 perspective-1000"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                 <div className="relative h-full w-full bg-[#050505] rounded-[3rem] border-[8px] border-[#181818] shadow-2xl overflow-hidden ring-1 ring-white/10 flex flex-col">
                     
                     {/* STATUS BAR */}
                     <div className="absolute top-0 w-full px-7 pt-4 pb-2 flex justify-between items-center z-50 pointer-events-none text-white/90">
                         <span className="text-xs font-manrope font-bold tracking-wide">9:41</span>
                         <div className="flex items-center gap-1.5">
                            <Signal size={14} strokeWidth={2.5} />
                            <Wifi size={14} strokeWidth={2.5} />
                            <BatteryMedium size={16} strokeWidth={2.5} />
                         </div>
                     </div>
                     {/* ISLA */}
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-50 pointer-events-none" />

                     {/* HEADER APP */}
                     <div className="h-28 bg-[#111]/90 backdrop-blur-xl border-b border-white/5 z-40 flex items-end pb-4 px-6 shadow-sm shrink-0">
                         <div className="flex items-center gap-3 w-full">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00dfdf] to-[#006262] flex items-center justify-center shadow-lg">
                                 <Bot size={22} className="text-white" />
                             </div>
                             <div className="flex-1">
                                 <h3 className="text-white font-manrope font-bold text-sm tracking-tight">Bot Maqui</h3>
                                 <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="relative flex h-1.5 w-1.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                    </span>
                                    <p className="text-gray-400 text-[10px] font-inter font-medium">En línea</p>
                                 </div>
                             </div>
                             <MoreHorizontal size={20} className="text-gray-500" />
                         </div>
                     </div>

                     {/* --- CHAT AREA --- */}
                     <div className="flex-1 bg-[#0a0a0a] relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

                        {/* KEY CHANGE: Removed gap from container. Gap is handled by message height. */}
                        <div className="absolute bottom-0 w-full flex flex-col justify-end px-4 pb-4 z-10">
                             
                             {/* M1 Hola */}
                             <motion.div style={{ height: m1.height, opacity: m1.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m1.y, filter: m1.filter }} className="w-full flex justify-end pb-2"> {/* pb-2 = spacing visual */}
                                     <div className="px-4 py-2 rounded-2xl rounded-tr-sm bg-[#006262] text-white text-xs font-inter shadow-md">Hola 👋</div>
                                 </motion.div>
                             </motion.div>

                             {/* M2 Bot Address */}
                             <motion.div style={{ height: m2.height, opacity: m2.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m2.y, filter: m2.filter }} className="w-full flex justify-start gap-2 items-end pb-2">
                                     <div className="w-7 h-7 rounded-full bg-[#222] border border-white/10 flex items-center justify-center shrink-0 mb-1"><Bot size={14} className="text-[#00dfdf]" /></div>
                                     <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1a1a1a] border border-white/5 text-gray-200 text-xs font-inter leading-relaxed">
                                        Detecté que querés reportar en: <br/><strong className="text-white">Av. de Mayo 1234</strong>. ¿Correcto?
                                     </div>
                                 </motion.div>
                             </motion.div>

                             {/* M3 Si */}
                             <motion.div style={{ height: m3.height, opacity: m3.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m3.y, filter: m3.filter }} className="w-full flex justify-end pb-2">
                                     <div className="px-4 py-2 rounded-2xl rounded-tr-sm bg-[#006262] text-white text-xs font-inter shadow-md">Sí, es esa</div>
                                 </motion.div>
                             </motion.div>

                             {/* M4 Incidente? */}
                             <motion.div style={{ height: m4.height, opacity: m4.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m4.y, filter: m4.filter }} className="w-full flex justify-start gap-2 items-end pb-2">
                                     <div className="w-7 h-7 rounded-full bg-[#222] border border-white/10 flex items-center justify-center shrink-0 mb-1"><Bot size={14} className="text-[#00dfdf]" /></div>
                                     <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1a1a1a] border border-white/5 text-gray-200 text-xs font-inter">Perfecto. ¿Qué incidente es?</div>
                                 </motion.div>
                             </motion.div>

                             {/* M5 Grid */}
                             <motion.div style={{ height: m5.height, opacity: m5.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                  <motion.div style={{ y: m5.y, filter: m5.filter }} className="pl-9 w-full grid grid-cols-2 gap-2 pb-2">
                                      {[{ l: "Agua", i: Droplets, c: "text-blue-400" }, { l: "Eléctrico", i: Zap, c: "text-yellow-400" }, { l: "Gas", i: Flame, c: "text-orange-400" }, { l: "Accesos", i: DoorOpen, c: "text-purple-400" }].map((opt, i) => (
                                          <div key={i} className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-white/20 transition-colors cursor-pointer"><opt.i size={16} className={opt.c} /><span className="text-[10px] text-gray-300 font-medium mt-1">{opt.l}</span></div>
                                      ))}
                                  </motion.div>
                             </motion.div>

                             {/* M6 Agua */}
                             <motion.div style={{ height: m6.height, opacity: m6.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m6.y, filter: m6.filter }} className="w-full flex justify-end pb-2">
                                     <div className="px-4 py-2 rounded-2xl rounded-tr-sm bg-[#006262] text-white text-xs font-inter shadow-md flex items-center gap-2">
                                        <Droplets size={12} className="text-white" /> Pérdida de agua
                                     </div>
                                 </motion.div>
                             </motion.div>

                             {/* M7 Foto */}
                             <motion.div style={{ height: m7.height, opacity: m7.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m7.y, filter: m7.filter }} className="w-full flex justify-start gap-2 items-end pb-2">
                                     <div className="w-7 h-7 rounded-full bg-[#222] border border-white/10 flex items-center justify-center shrink-0 mb-1"><Bot size={14} className="text-[#00dfdf]" /></div>
                                     <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1a1a1a] border border-white/5 text-gray-200 text-xs font-inter">Por favor enviame una foto. 📸</div>
                                 </motion.div>
                             </motion.div>

                             {/* M8 Upload */}
                             <motion.div style={{ height: m8.height, opacity: m8.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m8.y, filter: m8.filter }} className="w-full flex justify-end pb-2">
                                     <div className="w-32 h-24 rounded-xl bg-[#1a1a1a] border-2 border-white/10 flex items-center justify-center relative overflow-hidden shadow-md group">
                                         <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent)] group-hover:bg-white/5 transition-colors" />
                                         <div className="flex flex-col items-center gap-1 text-gray-500"><Camera size={18} /><span className="text-[9px] font-mono">IMG_2025.jpg</span></div>
                                         <div className="absolute bottom-1.5 right-1.5 bg-emerald-500/20 p-1 rounded-full"><Check size={8} className="text-emerald-400" /></div>
                                     </div>
                                 </motion.div>
                             </motion.div>

                             {/* M9 FINAL RECIBIDO (Padding extra y altura para no cortarse) */}
                             <motion.div style={{ height: m9.height, opacity: m9.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m9.y, filter: m9.filter }} className="w-full flex justify-start gap-2 items-end pb-6"> {/* pb-6 = se separa del input */}
                                     <div className="w-7 h-7 rounded-full bg-[#222] border border-white/10 flex items-center justify-center shrink-0 mb-1"><Bot size={14} className="text-emerald-400" /></div>
                                     <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#0a2215] border-l-2 border-l-emerald-500 text-gray-200 text-xs font-inter shadow-xl shadow-emerald-900/20 leading-relaxed">
                                        ¡Recibido! Caso <strong className="text-white">#4590</strong> generado. <br/> Un técnico fue notificado. 🚀
                                     </div>
                                 </motion.div>
                             </motion.div>

                             <div className="h-1 shrink-0" />
                        </div>
                     </div>

                     {/* Footer Input (Clean) */}
                     <div className="h-20 bg-[#151515] border-t border-white/5 z-30 flex items-center px-4 gap-3 shrink-0 relative">
                          <div className="w-9 h-9 rounded-full bg-[#222] hover:bg-[#333] flex items-center justify-center text-gray-400 transition-colors cursor-pointer shrink-0">
                             <Plus size={20} />
                          </div>
                          <div className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center px-4 text-xs text-gray-500 font-inter hover:border-white/20 transition-colors">Escribí un mensaje...</div>
                          {/* Send Icon Centered Visually */}
                          <div className="w-10 h-10 rounded-full bg-[#006262] flex items-center justify-center text-white shadow-lg shadow-[#006262]/30 hover:scale-105 transition-transform cursor-pointer shrink-0">
                              <Send size={18} className="-ml-0.5 mt-0.5" /> {/* Ajuste fino de iconos svg que no suelen estar centrados por su caja */}
                          </div>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full z-40 pointer-events-none" />
                     </div>

                 </div>
            </motion.div>
        
        </div>
      </div>
    </section>
  )
}