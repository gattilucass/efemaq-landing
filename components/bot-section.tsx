"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
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
  BatteryMedium 
} from 'lucide-react'

export default function BotSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // --- 1. CONFIG SCROLL: 800VH ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30, 
    restDelta: 0.0001
  })

  // --- 2. ANIMACIÓN FADE-IN-UP ---
  const createFluidMsg = (start: number, end: number, heightPx: number) => {
    const h = useTransform(smoothScroll, [start, end], [0, heightPx])
    const op = useTransform(smoothScroll, [start, start + 0.05], [0, 1])
    const y = useTransform(smoothScroll, [start, end], [20, 0])
    const blur = useTransform(smoothScroll, [start, end], ["blur(8px)", "blur(0px)"])

    return { height: h, opacity: op, y, filter: blur }
  }

  // --- TIMELINE ---
  const m1 = createFluidMsg(0.02, 0.06, 40) 
  const m2 = createFluidMsg(0.09, 0.15, 85) 
  const m3 = createFluidMsg(0.17, 0.23, 40) 
  const m4 = createFluidMsg(0.25, 0.31, 50) 
  const m5 = createFluidMsg(0.33, 0.42, 120) 
  const m6 = createFluidMsg(0.45, 0.51, 40) 
  const m7 = createFluidMsg(0.53, 0.60, 50) 
  const m8 = createFluidMsg(0.63, 0.72, 110) 
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

        {/* LAYOUT FINAL: max-w-5xl y gap-8 para compactar todo al centro */}
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-4">
            
            {/* --- IZQUIERDA --- */}
            <motion.div 
                style={{ opacity: textOpacity, y: textY }}
                className="flex flex-col order-2 lg:order-1 relative z-20 items-start"
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

                 {/* TEXTO AJUSTADO: max-w-lg para llenar más el ancho */}
                 <p className="font-inter text-lg text-gray-400 leading-relaxed mb-10 max-w-lg border-l-2 border-[#00dfdf]/30 pl-6">
                    Olvidate de mails que nadie lee. Nuestro <strong>Bot Maqui</strong> gestiona reclamos, identifica tu unidad y asigna prioridades en tiempo real.
                 </p>

                 <div className="space-y-6 mb-12 w-full">
                    {[
                        { icon: Zap, title: "Respuesta Inmediata", text: "Sin esperas, disponible 24/7" },
                        { icon: Camera, title: "Registro Fotográfico", text: "Evidencia visual directa al ticket" },
                        { icon: Check, title: "Número de Ticket", text: "Seguimiento automático por WhatsApp" }
                    ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                             <div className="mt-1 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#00dfdf]/20 group-hover:border-[#00dfdf]/40 transition-colors shrink-0">
                                 <feature.icon size={18} className="text-gray-300 group-hover:text-[#00dfdf]" />
                             </div>
                             <div>
                                 <h4 className="text-white font-manrope font-bold text-sm">{feature.title}</h4>
                                 <p className="text-gray-500 text-xs font-inter leading-relaxed">{feature.text}</p>
                             </div>
                        </div>
                    ))}
                 </div>

                 {/* FLECHA REFORMADA: Más grande, más cerca, apuntando mejor */}
                 <div className="relative hidden lg:flex items-center z-30 pl-4">
                    <div className="flex items-center gap-1 group cursor-default translate-x-8"> {/* translate para acercar */}
                        <span className="text-[#00dfdf] font-manrope font-bold text-2xl tracking-tight whitespace-nowrap"> {/* Texto más grande */}
                            Mirá cómo funciona
                        </span>
                        
                        {/* SVG Agrandado y rotado levemente hacia el celular */}
                        <svg className="w-60 h-32 pointer-events-none overflow-visible -rotate-6 translate-y-4" viewBox="0 0 180 80">
                            <motion.path
                                d="M 0 40 C 40 40, 50 10, 80 30 C 95 50, 85 70, 75 50 C 65 35, 90 30, 110 40 S 160 40, 185 40" 
                                fill="none"
                                stroke="#00dfdf"
                                strokeWidth="2.5" 
                                strokeLinecap="round"
                                style={{ pathLength: arrowDraw, opacity: arrowDraw }}
                            />
                             <motion.path
                                d="M 175 35 L 185 40 L 175 45"
                                fill="none"
                                stroke="#00dfdf"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ opacity: arrowTipOpacity }} 
                             />
                        </svg>
                    </div>
                 </div>
            </motion.div>


            {/* --- DERECHA: CELULAR (Centrado en su columna) --- */}
            <motion.div 
                className="relative h-[680px] md:h-[780px] w-full max-w-[400px] mx-auto lg:mx-0 order-1 lg:order-2 perspective-1000"
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
                             {/* LOGO EFEMAQ */}
                             <div className="w-10 h-10 rounded-full bg-white/5 p-0.5 border border-white/10 flex items-center justify-center shadow-lg overflow-hidden relative">
                                 <Image 
                                    src="/logo.jpg" 
                                    alt="EFEMAQ Bot Avatar" 
                                    fill
                                    className="object-cover"
                                 />
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

                        <div className="absolute bottom-0 w-full flex flex-col justify-end px-4 pb-4 z-10">
                             
                             {/* M1 Hola */}
                             <motion.div style={{ height: m1.height, opacity: m1.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m1.y, filter: m1.filter }} className="w-full flex justify-end pb-2">
                                     <div className="px-4 py-2 rounded-2xl rounded-tr-sm bg-[#006262] text-white text-xs font-inter shadow-md">Hola 👋</div>
                                 </motion.div>
                             </motion.div>

                             {/* M2 Bot Address */}
                             <motion.div style={{ height: m2.height, opacity: m2.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m2.y, filter: m2.filter }} className="w-full flex justify-start gap-2 items-end pb-2">
                                     <div className="w-7 h-7 rounded-full border border-white/10 overflow-hidden relative shrink-0 mb-1">
                                        <Image src="/logo.jpg" alt="Bot" fill className="object-cover" />
                                     </div>
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
                                     <div className="w-7 h-7 rounded-full border border-white/10 overflow-hidden relative shrink-0 mb-1">
                                        <Image src="/logo.jpg" alt="Bot" fill className="object-cover" />
                                     </div>
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
                                     <div className="w-7 h-7 rounded-full border border-white/10 overflow-hidden relative shrink-0 mb-1">
                                        <Image src="/logo.jpg" alt="Bot" fill className="object-cover" />
                                     </div>
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

                             {/* M9 FINAL RECIBIDO */}
                             <motion.div style={{ height: m9.height, opacity: m9.opacity }} className="origin-bottom shrink-0 w-full flex items-end">
                                 <motion.div style={{ y: m9.y, filter: m9.filter }} className="w-full flex justify-start gap-2 items-end pb-6">
                                     <div className="w-7 h-7 rounded-full border border-white/10 overflow-hidden relative shrink-0 mb-1">
                                        <Image src="/logo.jpg" alt="Bot" fill className="object-cover" />
                                     </div>
                                     <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#0a2215] border-l-2 border-l-emerald-500 text-gray-200 text-xs font-inter shadow-xl shadow-emerald-900/20 leading-relaxed">
                                        ¡Recibido! Caso <strong className="text-white">#4590</strong> generado. <br/> Un técnico fue notificado. 🚀
                                     </div>
                                 </motion.div>
                             </motion.div>

                             <div className="h-1 shrink-0" />
                        </div>
                     </div>

                     {/* Footer Input */}
                     <div className="h-20 bg-[#151515] border-t border-white/5 z-30 flex items-center px-4 gap-3 shrink-0 relative">
                          <div className="w-9 h-9 rounded-full bg-[#222] hover:bg-[#333] flex items-center justify-center text-gray-400 transition-colors cursor-pointer shrink-0">
                             <Plus size={20} />
                          </div>
                          <div className="flex-1 h-10 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center px-4 text-xs text-gray-500 font-inter hover:border-white/20 transition-colors">Escribí un mensaje...</div>
                          <div className="w-10 h-10 rounded-full bg-[#006262] flex items-center justify-center text-white shadow-lg shadow-[#006262]/30 hover:scale-105 transition-transform cursor-pointer shrink-0">
                              <Send size={18} className="-ml-0.5 mt-0.5" /> 
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