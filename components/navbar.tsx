"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
// 1. Importamos los hooks de scroll y animación
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

// 2. Definimos las variantes para el SUBRAYADO (sin 'ease' para evitar el bug)
const underlineVariants = {
  rest: { 
    scaleX: 0, 
    opacity: 0 
  },
  hover: { 
    scaleX: 1, 
    opacity: 1,
    transition: { duration: 0.3 } // Arreglado: Sin 'ease'
  }
};

// 3. Definimos las variantes para el TEXTO (la animación de scale)
const textVariants = {
  rest: { 
    scale: 1 
  },
  hover: { 
    scale: 1.1, // Se agranda un 10%
    transition: { duration: 0.2 }
  }
};


export default function Navbar() {
  // 4. Creamos un estado para saber si el navbar está oculto
  const [hidden, setHidden] = useState(false);
  
  // 5. Traemos el valor 'y' del scroll de la página
  const { scrollY } = useScroll();

  // 6. Este hook "escucha" los cambios en el scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious(); // El valor anterior del scroll

    // --- ARREGLO ACÁ ---
    // 7. Chequeamos que 'previous' NO sea 'undefined' antes de comparar
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } 
    // Si scrolleamos para ARRIBA, lo mostramos de nuevo.
    else {
      setHidden(false);
    }
  });

  return (
    // 8. Usamos 'animate' y 'variants' para la animación de OCULTAR/MOSTRAR
    <motion.nav
      variants={{
        visible: { y: 0 }, // Estado visible (en la posición 0)
        hidden: { y: "-100%" } // Estado oculto (se va para arriba)
      }}
      animate={hidden ? "hidden" : "visible"} // Elige la variante según el estado
      transition={{ duration: 0.35, ease: "easeInOut" }} // Animación suave al ocultarse
      
      // El 'glassmorphism'
      className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/5"
    >
      <div className="w-full px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* ----- LOGO ----- */}
          <Link href="/" legacyBehavior>
            <a className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Image
                  src="/logo-efemaq.png"
                  alt="Logo EFEMAQ"
                  width={140}
                  height={40}
                  priority
                />
              </motion.div>
            </a>
          </Link>

          {/* ----- LINKS DE NAVEGACIÓN (CON ANIMACIÓN DOBLE) ----- */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            
            {/* Link 1: Servicios */}
            <Link href="/servicios" legacyBehavior>
              <motion.a 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                initial="rest"
                whileHover="hover"
                animate="rest" 
              >
                <motion.span 
                  className="relative inline-block" 
                  variants={textVariants} 
                >
                  Servicios
                  <motion.div 
                    className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-[#006262]"
                    variants={underlineVariants} 
                  />
                </motion.span>
              </motion.a>
            </Link>

            {/* Link 2: Quiénes Somos */}
            <Link href="/quienes-somos" legacyBehavior>
              <motion.a 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.span 
                  className="relative inline-block"
                  variants={textVariants}
                >
                  Quiénes Somos
                  <motion.div 
                    className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-[#006262]"
                    variants={underlineVariants}
                  />
                </motion.span>
              </motion.a>
            </Link>

            {/* Link 3: Admins */}
            <Link href="/para-administradores" legacyBehavior>
              <motion.a 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.span 
                  className="relative inline-block"
                  variants={textVariants}
                >
                  Admins
                  <motion.div 
                    className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-[#006262]"
                    variants={underlineVariants}
                  />
                </motion.span>
              </motion.a>
            </Link>

            {/* Link 4: Particulares */}
            <Link href="/para-particulares" legacyBehavior>
              <motion.a 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.span 
                  className="relative inline-block"
                  variants={textVariants}
                >
                  Particulares
                  <motion.div 
                    className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-[#006262]"
                    variants={underlineVariants}
                  />
                </motion.span>
              </motion.a>
            </Link>
          </div>

          {/* ----- BOTÓN DE CONTACTO ----- */}
          <div className="hidden md:block">
            <Button 
              className="bg-[#006262] text-white hover:bg-[#004a4a] transition-all duration-300"
            >
              Contacto
            </Button>
          </div>

        </div>
      </div>
    </motion.nav>
  )
}