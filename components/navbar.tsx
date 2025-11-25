"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

// Variantes para el SUBRAYADO
const underlineVariants = {
  rest: { 
    scaleX: 0, 
    opacity: 0 
  },
  hover: { 
    scaleX: 1, 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

// Variantes para el TEXTO
const textVariants = {
  rest: { 
    scale: 1 
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } 
    else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 h-18 bg-[#050505]/70 backdrop-blur-xl border-b border-white/10 flex items-center"
    >
      <div className="w-full px-6 md:px-16">
        <div className="flex items-center justify-between w-full">
          
          {/* ----- LOGO ----- */}
          <Link href="/" legacyBehavior>
            <a className="flex-shrink-0 relative group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Image
                  src="/logo-efemaq.png"
                  alt="Logo EFEMAQ"
                  width={165}
                  height={50}
                  className="w-[140px] md:w-[165px] h-auto opacity-90 group-hover:opacity-100 transition-opacity"
                  priority
                />
              </motion.div>
            </a>
          </Link>

          {/* ----- LINKS ----- */}
          <div className="hidden md:flex md:items-center md:space-x-10">
            
            {['Servicios', 'Quiénes Somos', 'Admins', 'Particulares'].map((label, i) => {
               // Mapeo simple de rutas
               const routes = ['/servicios', '/quienes-somos', '/para-administradores', '/para-particulares'];
               return (
                <Link key={label} href={routes[i]} legacyBehavior>
                  <motion.a 
                    className="text-gray-200 hover:text-white px-2 py-2 rounded-md text-base font-medium transition-colors cursor-pointer relative"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <motion.span 
                      className="relative inline-block" 
                      variants={textVariants} 
                    >
                      {label}
                      <motion.div 
                        className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#006262]"
                        variants={underlineVariants} 
                      />
                    </motion.span>
                  </motion.a>
                </Link>
               )
            })}
          </div>

          {/* ----- BOTÓN CORREGIDO (DESPEGADO) ----- */}
          <div className="hidden md:block">
            <Button 
              // Cambio Clave: h-12 (48px) asegura que sea más bajo que el navbar (96px), creando el aire.
              // Ya no tiene padding exagerado en Y.
              className="h-12 px-8 bg-[#006262] text-white text-base font-semibold rounded-md hover:bg-[#004a4a] transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,98,98,0.39)] hover:shadow-[0_6px_20px_rgba(0,98,98,0.23)] hover:-translate-y-0.5"
            >
              Contacto
            </Button>
          </div>

        </div>
      </div>
    </motion.nav>
  )
}