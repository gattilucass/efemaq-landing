"use client"

import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { MessageSquare } from 'lucide-react'

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Solo muestra el botón después de 800px de scroll (Pasando el Hero)
    if (latest > 800) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  })

  const whatsappUrl = "https://wa.me/5491123456789?text=Hola%20EFEMAQ%20vengo%20de%20la%20web"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,98,98,0.4)] bg-[#006262] cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Ondas de pulso suaves (decorativo) */}
          <div className="absolute inset-0 rounded-full border border-[#006262] animate-ping opacity-20" />
          
          <MessageSquare size={28} className="text-white fill-white" />
          
          {/* Tooltip on Hover */}
          <span className="absolute right-full mr-4 px-3 py-1 bg-[#111] border border-white/10 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Contactar Ahora
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}