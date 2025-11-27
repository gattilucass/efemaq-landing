"use client"

import { motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Facebook, 
  Instagram,
  MapPin
} from 'lucide-react'

export default function Footer() {
  // Tipado estricto para evitar errores de TS
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
    { icon: Linkedin, href: "https://www.instagram.com/efemaq.ar/", label: "LinkedIn" },
  ]

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10 pt-16 pb-8 overflow-hidden font-sans">
      
      {/* Glow Ambiental Inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00dfdf] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* --- GRID PRINCIPAL (Horizontal en PC) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12 text-left">
          
          {/* COL 1: MARCA */}
          <motion.div variants={itemVariants} className="flex flex-col items-start">
            <div className="mb-5">
              <Image 
                src="/logo-efemaq.png" 
                alt="EFEMAQ" 
                width={140} 
                height={45} 
                className="object-contain brightness-200 contrast-125" 
              />
            </div>
            
            <p className="font-manrope font-bold text-base text-white mb-2 tracking-tight">
              El trabajo bien hecho, <span className="text-[#00dfdf]">siempre.</span>
            </p>
            <p className="font-inter text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Soluciones integrales de mantenimiento técnico. Ingeniería aplicada a tu tranquilidad.
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

          {/* COL 2: EXPLORAR */}
          <motion.div variants={itemVariants}>
            <h4 className="font-manrope font-bold text-white mb-5 text-lg">Explorar</h4>
            <ul className="space-y-3">
              {['Inicio', 'Administradores', 'Particulares', 'Nosotros'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Inicio' ? '/' : item === 'Administradores' ? '/para-administradores' : item === 'Particulares' ? '/para-particulares' : '#'} 
                    className="font-inter text-sm text-gray-400 hover:text-[#00dfdf] transition-colors flex items-center gap-2 group w-fit"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00dfdf] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COL 3: SERVICIOS */}
          <motion.div variants={itemVariants}>
            <h4 className="font-manrope font-bold text-white mb-5 text-lg">Servicios</h4>
            <ul className="space-y-3">
              {['Mantenimiento Preventivo', 'Auditoría Técnica', 'Urgencias 24hs', 'Obras y Reformas'].map((item) => (
                <li key={item}>
                  <span className="font-inter text-sm text-gray-400 hover:text-[#00dfdf] transition-colors cursor-default block w-fit">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COL 4: CONTACTO */}
          <motion.div variants={itemVariants}>
            <h4 className="font-manrope font-bold text-white mb-5 text-lg">Contacto</h4>
            <div className="space-y-4">
              <a href="mailto:hola@efemaq.com.ar" className="flex items-start gap-3 group">
                <div className="mt-0.5 text-[#00dfdf] opacity-80 group-hover:opacity-100 transition-opacity"><Mail size={18} /></div>
                <div>
                   <span className="block font-inter text-sm text-gray-300 group-hover:text-white transition-colors">hola@efemaq.com.ar</span>
                   <span className="text-xs text-gray-500">Área Comercial</span>
                </div>
              </a>
              
              <a href="https://wa.me/5491126547271" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <div className="mt-0.5 text-[#00dfdf] opacity-80 group-hover:opacity-100 transition-opacity"><Phone size={18} /></div>
                 <div>
                   <span className="block font-inter text-sm text-gray-300 group-hover:text-white transition-colors">+54 9 11 2654-7271</span>
                   <span className="text-xs text-gray-500">Guardia 24hs</span>
                </div>
              </a>

              <div className="flex items-start gap-3">
                 <div className="mt-0.5 text-[#00dfdf] opacity-80"><MapPin size={18} /></div>
                 <div>
                   <span className="block font-inter text-sm text-gray-400">Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>
          </motion.div>

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
               <a href="#" className="font-inter text-xs text-gray-500 hover:text-white transition-colors">Términos y Condiciones</a>
               <a href="#" className="font-inter text-xs text-gray-500 hover:text-white transition-colors">Política de Privacidad</a>
            </div>
        </motion.div>

      </motion.div>
    </footer>
  )
}