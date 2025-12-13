"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionTemplate} from "framer-motion"
import Image from "next/image"
import { 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  HardHat,
  Ear,
  ClipboardList
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export default function AboutUs() {
  const containerRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  const mailLink = "mailto:info@efemaq.com.ar?subject=Solicitud%20de%20Presupuesto";
  const sumateLink = "mailto:tecnicos@efemaq.com.ar?subject=Quiero%20sumarme%20al%20equipo";

  // --- CONFIG SCROLL OPTIMIZADA ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  })

  // Física ligera para móvil
  const springConfig = isMobile 
    ? { stiffness: 100, damping: 30, restDelta: 0.01 }
    : { stiffness: 50, damping: 20, restDelta: 0.001 }

  const smoothScroll = useSpring(scrollYProgress, springConfig)

  // --- ANIMACIONES ---
  const parallaxImg = useTransform(smoothScroll, [0, 1], [0, 50]) // Menos recorrido para evitar cortes
  
  // Textos Columna Derecha (Aparición secuencial suave)
  const fadeUpProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.8, }
  }

  // Animación Frase Final
  const quoteOpacity = useTransform(smoothScroll, [0.6, 0.8], [0, 1])
  const quoteY = useTransform(smoothScroll, [0.6, 0.8], [40, 0])
  const signatureDraw = useTransform(smoothScroll, [0.75, 0.95], [0, 1])

  // --- LÓGICA DE MÁSCARA PARA FIRMA REAL ---
    // Convierte el progreso del scroll (0.75 a 0.95) en un porcentaje de 0 a 100.
    const maskProgress = useTransform(smoothScroll, [0.75, 0.95], [0, 100]);
    
    // Crea un gradiente dinámico que sirve de máscara de recorte.
    // Se mueve de izquierda a derecha, revelando el contenido.
    const maskImageValue = useMotionTemplate`linear-gradient(to right, black ${maskProgress}%, transparent ${maskProgress}%)`;

  return (
    <section 
        id="about-us"
        ref={containerRef} 
        // Padding ajustado para que no choque con navbar ni corte en laptops
        className="relative w-full py-20 lg:py-20 px-4 overflow-hidden bg-[#0a0a0a]"
    >
        {/* FONDO SUTIL */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
               className="absolute inset-0 opacity-[0.08]" 
               style={{ 
                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)', 
                   backgroundSize: '40px 40px' 
               }} 
            />
            {/* Glows optimizados */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#006262] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-50 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#00dfdf] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-30 max-w-6xl mx-auto">
            
            {/* GRID PRINCIPAL */}
            {/* gap reducido para pantallas chicas (gap-12 en vez de 24) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                
                {/* [COLUMNA IZQ - IMAGEN + OVERLAY] */}
                <div className="relative h-fit w-full">
                    <motion.div style={{ y: !isMobile ? parallaxImg : 0 }} className="relative">
                        
                        {/* Aspect Ratio ajustado para ser más compacto */}
                        <div className="relative w-full aspect-[4/5] md:aspect-[1/1] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#101010] shadow-2xl group">
                             
                             {/* Imagen Técnica */}
                             <Image
                               src="/trabaja.png"
                               alt="Ingeniería y Procesos EFEMAQ"
                               fill
                               className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 ease-out"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

                             {/* BADGE SUPERIOR (Protocolos) */}
                             <div className="absolute top-6 left-6 right-6 flex justify-start">
                                 <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3">
                                     <ClipboardList size={16} className="text-[#00dfdf]" />
                                     <span className="text-white font-manrope font-bold text-xs tracking-widest uppercase">
                                         PROTOCOLOS TÉCNICOS
                                     </span>
                                 </div>
                             </div>
                                {/* CTA "SUMATE" (OVERLAY INFERIOR) */}
                                                        {/* CORRECCIÓN 2: Enlace funcional mailto */}
                                                        <a href={sumateLink} className="absolute bottom-0 left-0 w-full p-6 block cursor-pointer z-30">
                                                            <div className="bg-[#151515]/90 border border-white/10 p-5 rounded-xl flex items-center justify-between shadow-xl backdrop-blur-md transition-all hover:bg-[#1a1a1a] group">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-10 h-10 rounded-full bg-[#00dfdf] flex items-center justify-center text-black shrink-0 shadow-[0_0_15px_rgba(0,223,223,0.4)]">
                                                                       <HardHat size={20} strokeWidth={2.5} />
                                                                    </div>
                                                                    <div className="text-left">
                                                                        <span className="block font-manrope font-bold text-white text-sm md:text-base leading-tight group-hover:text-[#00dfdf] transition-colors">
                                                                            Sumate al equipo
                                                                        </span>
                                                                        <span className="block text-[10px] text-gray-400 mt-0.5 font-inter uppercase tracking-wide">
                                                                            Buscamos Expertos
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <Button 
                                                                   size="icon"
                                                                   className="rounded-full bg-white/10 group-hover:bg-[#00dfdf] group-hover:text-black text-white transition-all border border-white/10 w-10 h-10 pointer-events-none" // pointer-events-none para que el click lo capture el <a> padre
                                                                >
                                                                   <ArrowRight size={18} />
                                                                </Button>
                                                            </div>
                                                        </a>
                           
                                                   </div>
                                               </motion.div>
                                           </div>

                {/* [COLUMNA DER - RELATO TÉCNICO] */}
                <div className="flex flex-col space-y-10 lg:pl-8">
                    
                    {/* 1. HEADER REFINADO */}
                    <motion.div {...fadeUpProps}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#00dfdf] animate-pulse" />
                             <span className="text-[10px] font-manrope font-bold text-gray-300 tracking-widest uppercase">
                                 TRANSFORMAMOS MANTENIMIENTO EN PRECISIÓN
                             </span>
                        </div>
                        
                        <h2 className="font-manrope text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                            No es improvisación,<br />
                            <span className="text-[#00dfdf]">
                                Es profesionalismo.
                            </span>
                        </h2>
                    </motion.div>

                    {/* 2. TEXTO TÉCNICO */}
                    <motion.div {...fadeUpProps} transition={{ delay: 0.1, duration: 0.8 }} className="space-y-6">
                        <div className="pl-6 border-l-2 border-[#00dfdf]/30 space-y-4">
                            <p className="font-inter text-lg text-gray-300 leading-relaxed">
                                Dejamos atrás la era de los "parches". Aplicamos un <strong>proceso claro y estandarizado</strong> que define qué hacer, cómo hacerlo y cómo validar el resultado, asegurando soluciones que perduran.
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. STATS (Compactos) */}
                    <motion.div 
                        {...fadeUpProps} 
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="grid grid-cols-2 gap-4 pt-2"
                    >
                        <div className="p-4 rounded-xl bg-[#151515] border border-white/5 hover:border-[#00dfdf]/30 transition-all group">
                            <Award className="w-5 h-5 text-gray-500 mb-2 group-hover:text-[#00dfdf] transition-colors" />
                            <div className="text-2xl font-manrope font-bold text-white">+15 Años</div>
                            <p className="text-gray-500 text-xs font-inter">Trayectoria comprobable</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#151515] border border-white/5 hover:border-[#00dfdf]/30 transition-all group">
                            <ShieldCheck className="w-5 h-5 text-gray-500 mb-2 group-hover:text-[#00dfdf] transition-colors" />
                            <div className="text-2xl font-manrope font-bold text-white">100%</div>
                            <p className="text-gray-500 text-xs font-inter">Trabajo garantizado</p>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* --- BLOQUE FRASE CENTRAL (Full Width & Centrado & Compacto) --- */}
            <motion.div 
                style={{ y: quoteY, opacity: quoteOpacity }}
                // PT REDUCIDO A 8
                className="relative w-full border-t border-white/10 pt-8 flex flex-col items-center text-center"
            >
                <div className="mb-3 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#00dfdf]/10 border border-[#00dfdf]/30 flex items-center justify-center text-[#00dfdf]">
                        <Ear size={24} />
                    </div>
                </div>

                <blockquote className="font-manrope font-medium text-lg md:text-2xl text-white leading-relaxed max-w-5xl mx-auto mb-0 px-3">
                    "La tranquilidad aparece cuando alguien entiende lo que necesitás y actúa con criterio y responsabilidad. No es cuestión de decir 'ya voy', sino de un proceso claro que informa, acompaña y demuestra resultados.
                    <br className="block mt-4" />
                    
                    {/* TAMAÑO IGUALADO A LA PARTE DE ARRIBA (text-lg md:text-2xl) */}
                    <span className="text-gray-400 block text-lg md:text-2xl mt-1">
                        Ahí se construye la confianza: con <strong className="text-[#00dfdf]">escucha, claridad y profesionalismo.</strong>"
                    </span>
                </blockquote>

                {/* FIRMA REAL (Espaciado Compacto con Margen Negativo) */}
                <div className="flex flex-col items-center gap-0 -mt-2 relative z-30">
                    
                    {/* Contenedor de la firma + Animación de Máscara (Un poquito más lenta: 1.5s) */}
                    <motion.div 
                        className="relative w-[260px] h-[160px]"
                        style={{ 
                            WebkitMaskImage: maskImageValue,
                            maskImage: maskImageValue,
                            // Transición suavizada un poco más
                            transition: "all 0.5s ease-out" 
                        }}
                    >
                        <svg 
                            viewBox="0 0 900 678" 
                            className="w-full h-full text-[#00dfdf] fill-current"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <g transform="translate(0,678) scale(0.1,-0.1)">
                                <path d="M2560 4743 c-115 -52 -169 -83 -219 -127 -93 -80 -157 -165 -212 -276 -28 -58 -56 -113 -60 -122 -5 -10 -9 -23 -9 -29 0 -6 -6 -25 -14 -42 -18 -40 -44 -126 -56 -180 -5 -23 -19 -87 -31 -142 -20 -91 -22 -126 -20 -404 0 -182 5 -317 11 -336 6 -18 15 -81 20 -141 10 -128 28 -252 40 -274 4 -8 11 -35 15 -60 6 -44 25 -104 50 -165 7 -16 21 -59 31 -94 21 -69 60 -121 93 -121 27 0 71 49 71 79 0 13 -13 45 -29 70 -29 47 -45 87 -76 196 -10 33 -22 71 -27 84 -4 12 -11 50 -15 84 l-6 60 24 -8 c13 -4 71 -10 129 -12 87 -4 120 -1 185 17 138 38 126 40 163 -38 58 -124 139 -180 247 -173 61 4 167 93 200 168 13 29 26 53 29 53 3 0 19 -20 35 -44 40 -57 87 -86 140 -86 54 0 77 12 121 62 l36 40 27 -40 c102 -154 252 -126 338 64 17 37 35 64 44 64 8 0 15 -4 15 -9 0 -18 94 -101 127 -112 21 -7 54 -9 82 -4 64 10 90 9 138 -4 67 -17 174 12 274 76 25 16 26 16 68 -26 72 -72 140 -88 223 -52 25 10 60 37 80 60 32 38 68 54 68 32 0 -19 54 -73 93 -92 57 -30 97 -19 162 42 56 53 69 58 97 32 15 -13 23 -14 43 -5 31 14 31 18 -1 111 -26 74 -26 78 -13 161 21 127 19 263 -4 288 -28 31 -71 46 -95 33 -43 -23 -53 -71 -53 -237 1 -178 -11 -224 -62 -251 -30 -15 -32 -15 -53 10 -31 36 -40 131 -25 263 14 120 7 146 -46 177 -65 37 -102 -16 -110 -162 -5 -75 -13 -111 -36 -166 -42 -101 -70 -135 -111 -135 -59 0 -71 26 -71 150 0 97 -2 111 -22 137 -13 15 -39 52 -59 81 -93 136 -205 166 -319 88 -91 -63 -155 -171 -155 -263 0 -19 -7 -48 -16 -65 -12 -22 -15 -46 -11 -80 8 -63 -8 -71 -49 -24 -39 45 -64 137 -64 234 0 55 -5 76 -23 103 -33 49 -70 64 -119 50 -33 -10 -42 -20 -59 -59 -14 -32 -19 -58 -15 -84 12 -76 -41 -258 -87 -296 -23 -19 -47 -3 -70 47 -18 40 -21 63 -19 168 2 116 1 123 -23 151 -31 36 -66 46 -111 32 -49 -16 -64 -52 -64 -150 0 -77 -14 -145 -46 -217 -7 -18 -18 -33 -22 -33 -37 0 -70 119 -76 275 -5 122 -17 160 -57 181 -40 20 -72 17 -96 -8 -18 -20 -21 -41 -26 -143 -4 -98 -11 -137 -37 -215 -38 -116 -47 -136 -83 -172 -47 -47 -109 -31 -154 39 -35 53 -30 79 22 125 33 29 58 66 89 132 87 181 85 278 -6 367 -38 37 -59 49 -93 54 -96 15 -157 -36 -200 -165 -15 -43 -19 -88 -19 -210 l-1 -155 -40 -13 c-22 -8 -81 -16 -132 -19 -102 -7 -158 8 -200 53 -12 13 -29 24 -36 24 -8 0 -24 8 -36 18 -19 15 -23 34 -33 147 -23 279 -11 549 32 700 11 39 24 89 30 113 6 23 14 50 19 60 5 9 23 55 41 102 64 167 159 296 295 399 78 60 90 66 164 85 83 21 83 21 158 -16 72 -35 88 -30 78 27 -12 65 -93 105 -208 104 -43 0 -86 -7 -107 -16z m200 -1383 c33 -17 42 -69 24 -129 -18 -63 -82 -153 -104 -148 -31 6 -6 229 31 273 14 17 24 17 49 4z m1637 -132 c33 -31 31 -100 -3 -173 -84 -176 -213 -88 -144 98 11 29 29 63 40 75 27 29 76 29 107 0z"/>
                                <path d="M6083 3903 c-53 -57 -87 -177 -98 -344 -11 -160 -20 -173 -70 -88 -44 75 -100 112 -178 117 -56 4 -68 1 -117 -28 -98 -57 -150 -120 -201 -243 -77 -183 -77 -395 -2 -495 84 -112 288 -90 451 50 18 15 37 28 43 28 6 0 24 9 39 20 l29 21 15 -23 c8 -13 18 -35 21 -50 10 -39 85 -105 136 -118 47 -13 179 -7 261 11 38 9 57 21 92 60 38 42 49 49 81 49 73 0 210 43 268 84 64 46 83 128 51 213 -9 23 -14 48 -11 56 3 7 40 26 84 42 43 15 83 32 89 37 6 4 31 19 55 31 34 18 45 30 47 52 l4 28 -54 -6 c-29 -3 -102 -15 -163 -26 -142 -26 -171 -26 -222 3 -55 32 -125 53 -198 60 -116 11 -185 -25 -185 -95 0 -116 132 -183 318 -160 78 10 88 9 100 -6 32 -44 4 -101 -64 -129 -51 -21 -150 -29 -182 -15 -15 7 -38 18 -52 25 -14 6 -38 33 -55 58 -46 72 -106 90 -144 42 -28 -35 -28 -107 -1 -152 25 -40 25 -64 2 -85 -25 -22 -88 -22 -111 1 -39 37 -51 69 -59 161 -7 78 -5 105 11 165 29 109 47 187 52 231 39 320 44 375 38 393 -20 58 -78 69 -120 25z m-311 -505 c42 -45 56 -76 68 -154 15 -89 0 -168 -42 -218 -39 -47 -146 -100 -207 -100 -43 -1 -47 1 -64 34 -15 29 -17 49 -12 120 11 142 56 245 138 315 51 44 80 44 119 3z"/>
                            </g>
                        </svg>
                    </motion.div>
                    
                    {/* MARGEN NEGATIVO FUERTE (-mt-6) para pegarlo a la firma visualmente */}
                    <div className="-mt-10 text-center"> 
                        <p className="font-manrope font-bold text-white text-sm uppercase tracking-widest">Fernando</p>
                        <p className="text-xs text-gray-500 font-inter">Director General</p>
                    </div>
                </div>

            </motion.div>

        </div>
    </section>
  )
}