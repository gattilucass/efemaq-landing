"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  // --- LÓGICA DE SCROLL ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    
    // Detectar si se scrolleó para cambiar el fondo
    if (latest > 50) {
        setScrolled(true)
    } else {
        setScrolled(false)
    }

    // Ocultar navbar al bajar, mostrar al subir (Solo en Desktop)
    // En móvil a veces es mejor dejarlo fijo o manejarlo con cuidado
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

  // Links de Navegación
  const navLinks = [
    { name: "Servicios", href: "/#horizontal-services" }, // Asumiendo que la sección tiene id="horizontal-services"
    { name: "Nosotros", href: "/#about-us" },             // Asumiendo que tiene id="about-us"
    { name: "Administradores y Empresas", href: "/para-administradores" },
    { name: "Hogares y Comercios", href: "/para-particulares" },
  ]

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si es un ancla (#), manejar scroll suave
    if (href.includes('#')) {
        const targetId = href.split('#')[1]
        const element = document.getElementById(targetId)
        
        if (element) {
            e.preventDefault()
            setMobileMenuOpen(false)
            element.scrollIntoView({ behavior: 'smooth' })
        } else if (pathname !== '/') {
            // Si no estamos en home, dejamos que el link navegue a /#id
            setMobileMenuOpen(false)
        }
    } else {
        setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
            "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
            scrolled || mobileMenuOpen 
                ? "bg-[#050505]/80 backdrop-blur-xl border-white/10 py-3" 
                : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="w-full px-6 md:px-12 max-w-8xl mx-auto">
          <div className="flex items-center justify-between w-full">
            
            {/* ----- LOGO ----- */}
            <Link href="/" className="relative z-50 group" onClick={() => setMobileMenuOpen(false)}>
                <div className="relative w-[140px] h-[40px] md:w-[160px] md:h-[45px]">
                    <Image
                        src="/logo-efemaq.png"
                        alt="EFEMAQ"
                        fill
                        className="object-contain brightness-200 contrast-100 transition-opacity opacity-90 group-hover:opacity-100"
                        priority
                    />
                </div>
            </Link>

            {/* ----- DESKTOP MENU ----- */}
            <div className="hidden md:flex items-center gap-8">
                <ul className="flex items-center gap-6">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link 
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href)}
                                className="text-sm font-manrope font-medium text-gray-300 hover:text-[#00dfdf] transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00dfdf] transition-all group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="h-6 w-px bg-white/10" />

                <Button 
                    onClick={(e) => {
                        // Simular click en link de contacto
                        const element = document.getElementById('cta-section')
                        if (element) element.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="bg-[#00dfdf] hover:bg-[#00c4c4] text-black font-manrope font-bold text-sm px-6 rounded-full transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,223,223,0.3)]"
                >
                    Contacto
                </Button>
            </div>

            {/* ----- MOBILE TOGGLE ----- */}
            <button 
                className="md:hidden relative z-50 p-2 text-white hover:text-[#00dfdf] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ----- MOBILE MENU OVERLAY ----- */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 flex flex-col md:hidden"
            >
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00dfdf] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
                
                <div className="flex flex-col gap-2 mt-4">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + (i * 0.05) }}
                        >
                            <Link
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href)}
                                className="flex items-center justify-between py-4 border-b border-white/5 text-xl font-manrope font-semibold text-gray-200 active:text-[#00dfdf]"
                            >
                                {link.name}
                                <ChevronRight size={16} className="text-[#00dfdf] opacity-50" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-auto mb-10"
                >
                    <Button 
                        onClick={() => {
                            setMobileMenuOpen(false)
                            const element = document.getElementById('cta-section')
                            if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 300)
                        }}
                        className="w-full h-14 bg-[#00dfdf] hover:bg-[#00c4c4] text-black font-manrope font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(0,223,223,0.2)]"
                    >
                        Hablar con un Experto <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 font-inter uppercase tracking-widest">EFEMAQ Mantenimiento Integral</p>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}