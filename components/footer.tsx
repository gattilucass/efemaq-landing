"use client"

import { useState, useEffect } from "react"
import { motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Mail, 
  Linkedin, 
  Facebook, 
  Instagram,
  MapPin,
  ChevronDown
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useIsMobile } from "@/hooks/use-mobile"

// --- ICONO WHATSAPP CUSTOM (Ajustado: Burbuja +Grande, Teléfono +Chico y Centrado) ---
const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Burbuja: Radio aumentado levemente (de 9 a 9.5) para dar más aire */}
    <path d="M3 21l1.9-4.4a9.5 10 0 1 1 3.4 2.9L3 21" />
    
    {/* Auricular: Reducido al 90% (scale 0.9) y movido a la derecha (1.2) para centrar exacto */}
    <path 
      d="M16.5 14.5c-.5-.5-1.5-.5-2 0l-.5.5c-.3.3-.8.4-1.2.1-1.2-.8-2.2-1.8-3-3-.3-.4-.2-.9.1-1.2l.5-.5c.5-.5.5-1.5 0-2l-1-1c-.5-.5-1.5-.5-2 0l-.5.5c-1 1-1 3 .5 5.5 1.5 2.5 4 5 6.5 6.5 2.5 1.5 4.5 1.5 5.5.5l.5-.5c.5-.5.5-1.5 0-2l-1-1z" 
      transform="scale(0.8) translate(1.4, 0.3)" 
    />
  </svg>
)

export default function Footer() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // SOLUCIÓN ESTABILIDAD: Esperamos a que el componente esté montado en el cliente
  // para evitar conflictos de hidratación que hacen desaparecer el contenido.
  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  }

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61581694802296", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/efemaq.ar/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/efemaq-soluciones/", label: "LinkedIn" },
  ]

  // Contenido de las columnas
  const exploreLinks = (
    <ul className="space-y-3 pl-1 md:pl-0">
      {['Inicio', 'Administradores', 'Particulares', 'Nosotros'].map((item) => (
        <li key={item}>
          <Link 
            href={item === 'Inicio' ? '/' : item === 'Administradores' ? '/para-administradores' : item === 'Particulares' ? '/para-particulares' : '#'} 
            // En móvil centramos los links, en desktop a la izquierda
            className="font-inter text-sm text-gray-400 hover:text-[#00dfdf] transition-colors flex items-center justify-center md:justify-start gap-2 group w-full md:w-fit"
          >
            <span className="w-1 h-1 rounded-full bg-[#00dfdf] opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
            {item}
          </Link>
        </li>
      ))}
    </ul>
  )

  const servicesLinks = (
    <ul className="space-y-3 pl-1 md:pl-0">
      {['Mantenimiento', 'Electricidad & Iluminación', 'Refrigeración', 'Pintura e impermeabilización', 'Obra seca & remodelaciones', 'Plomería & Gas'].map((item) => (
        <li key={item}>
          <span className="font-inter text-sm text-gray-400 hover:text-[#00dfdf] transition-colors cursor-default block w-full md:w-fit text-center md:text-left">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )

  const contactContent = (
    // Centrado en móvil (items-center), izquierda en PC (md:items-start)
    <div className="space-y-4 pl-1 md:pl-0 flex flex-col items-center md:items-start">
      <a href="mailto:info@efemaq.com.ar" className="flex items-center md:items-start gap-3 group">
        <div className="mt-0.5 text-[#00dfdf] opacity-80 group-hover:opacity-100 transition-opacity"><Mail size={18} /></div>
        <div>
           <span className="block font-inter text-sm text-gray-300 group-hover:text-white transition-colors">info@efemaq.com.ar</span>
        </div>
      </a>
      
      <a href="https://wa.me/5491126547271" target="_blank" rel="noopener noreferrer" className="flex items-center md:items-start gap-3 group">
        {/* REEMPLAZO POR ICONO WHATSAPP CUSTOM */}
        <div className="mt-0.5 text-[#00dfdf] opacity-80 group-hover:opacity-100 transition-opacity">
            <WhatsAppIcon size={18} />
        </div>
         <div>
           <span className="block font-inter text-sm text-gray-300 group-hover:text-white transition-colors">+54 9 11 2654-7271</span>
        </div>
      </a>

      <div className="flex items-center md:items-start gap-3">
         <div className="mt-0.5 text-[#00dfdf] opacity-80"><MapPin size={18} /></div>
         <div>
           <span className="block font-inter text-sm text-gray-400">Buenos Aires, Argentina</span>
        </div>
      </div>
    </div>
  )

  // Si no está montado, no renderizamos nada para evitar el error visual de hidratación
  if (!mounted) return null

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10 pt-12 md:pt-16 pb-8 overflow-hidden font-sans">
      
      {/* Glow Ambiental Inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00dfdf] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* --- GRID PRINCIPAL --- */}
        {/* text-center para móvil, md:text-left para escritorio */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12 text-center md:text-left">
          
          {/* COL 1: MARCA (Siempre visible) */}
          {/* items-center para móvil, md:items-start para escritorio */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <div className="mb-5">
              <Image 
                src="/logo-efemaq.png" 
                alt="EFEMAQ" 
                width={140} 
                height={45} 
                // mx-auto para centrar logo en móvil, md:mx-0 para izquierda en pc
                className="object-contain brightness-200 contrast-125 mx-auto md:mx-0" 
              />
            </div>
            
            <p className="font-manrope font-bold text-base text-white mb-2 tracking-tight">
              El trabajo bien hecho, <span className="text-[#00dfdf]">siempre.</span>
            </p>
            <p className="font-inter text-sm text-gray-400 leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
              Soluciones integrales de mantenimiento técnico. Sistema total aplicado a tu tranquilidad.
            </p>

            {/* REDES SOCIALES */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#00dfdf] hover:border-[#00dfdf] hover:scale-105 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="group-hover:stroke-black transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* COLUMNAS COLAPSABLES EN MÓVIL / VISIBLES EN PC */}
          {isMobile ? (
            <div className="col-span-1 w-full">
              <Accordion type="single" collapsible className="w-full border-none">
                
                <AccordionItem value="explore" className="border-b border-white/10">
                  <AccordionTrigger className="font-manrope font-bold text-white text-base py-4 hover:no-underline">
                    Explorar
                  </AccordionTrigger>
                  <AccordionContent>{exploreLinks}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="services" className="border-b border-white/10">
                  <AccordionTrigger className="font-manrope font-bold text-white text-base py-4 hover:no-underline">
                    Servicios
                  </AccordionTrigger>
                  <AccordionContent>{servicesLinks}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="contact" className="border-none">
                  <AccordionTrigger className="font-manrope font-bold text-white text-base py-4 hover:no-underline">
                    Contacto
                  </AccordionTrigger>
                  <AccordionContent>{contactContent}</AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>
          ) : (
            <>
              {/* PC: COL 2 EXPLORAR */}
              <motion.div variants={itemVariants}>
                <h4 className="font-manrope font-bold text-white mb-5 text-lg">Explorar</h4>
                {exploreLinks}
              </motion.div>

              {/* PC: COL 3 SERVICIOS */}
              <motion.div variants={itemVariants}>
                <h4 className="font-manrope font-bold text-white mb-5 text-lg">Servicios</h4>
                {servicesLinks}
              </motion.div>

              {/* PC: COL 4 CONTACTO */}
              <motion.div variants={itemVariants}>
                <h4 className="font-manrope font-bold text-white mb-5 text-lg">Contacto</h4>
                {contactContent}
              </motion.div>
            </>
          )}

        </div>

        {/* --- BOTTOM BAR --- */}
        <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
            <p className="font-inter text-xs text-gray-500">
              &copy; {new Date().getFullYear()} EFEMAQ. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center gap-6">
               <Link href="/terminos" className="font-inter text-xs text-gray-500 hover:text-white transition-colors">
                 Términos y Condiciones
               </Link>
               <Link href="/privacidad" className="font-inter text-xs text-gray-500 hover:text-white transition-colors">
                 Política de Privacidad
               </Link>
            </div>
        </motion.div>

      </motion.div>
    </footer>
  )
}