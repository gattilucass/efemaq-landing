"use client"
import { motion } from "framer-motion"
import { Mail, Phone, Linkedin } from 'lucide-react'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.footer
      className="w-full px-8 py-16 border-t"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Column 1 - Logo */}
        <motion.div variants={itemVariants}>
          <h3 className="font-manrope text-2xl font-bold mb-2" style={{ color: "#FAFAFA" }}>
            EFEMAQ
          </h3>
          <p className="font-inter text-sm" style={{ color: "#E0E0E0" }}>
            Soluciones 360° de mantenimiento integral para tu paz mental.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h4 className="font-manrope text-lg font-bold mb-4" style={{ color: "#FAFAFA" }}>
            Navegación
          </h4>
          <div className="space-y-2">
            <motion.a
              href="#"
              className="block font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              Inicio
            </motion.a>
            <motion.a
              href="#admin-section"
              className="block font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              Soy Administrador
            </motion.a>
            <motion.a
              href="#particular-section"
              className="block font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              Soy Particular
            </motion.a>
            <motion.a
              href="#bot-section"
              className="block font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              El Bot 360°
            </motion.a>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h4 className="font-manrope text-lg font-bold mb-4" style={{ color: "#FAFAFA" }}>
            Servicios
          </h4>
          <div className="space-y-2">
            <motion.a
              href="#"
              className="block font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              Mantenimiento Preventivo
            </motion.a>
            <motion.a
              href="#"
              className="block font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              Obras y Refacciones
            </motion.a>
            <motion.a
              href="#"
              className="block font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              Gestión de Siniestros
            </motion.a>
          </div>
        </motion.div>

        {/* Column 4 - Contact */}
        <motion.div variants={itemVariants}>
          <h4 className="font-manrope text-lg font-bold mb-4" style={{ color: "#FAFAFA" }}>
            Contacto
          </h4>
          <div className="space-y-3">
            <motion.a
              href="mailto:hola@efemaq.com.ar"
              className="flex items-center gap-2 font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              <Mail size={16} />
              hola@efemaq.com.ar
            </motion.a>
            <motion.a
              href="tel:+5491123456789"
              className="flex items-center gap-2 font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              <Phone size={16} />
              +54 9 11 XXXX XXXX
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-inter text-sm"
              style={{ color: "#E0E0E0" }}
              whileHover={{ color: "#006262" }}
            >
              <Linkedin size={16} />
              LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="border-t mt-12 pt-8 text-center font-inter text-sm"
        style={{
          borderColor: "rgba(255, 255, 255, 0.1)",
          color: "#BDC3C7",
        }}
      >
        <p>© 2025 EFEMAQ. Todos los derechos reservados.</p>
      </motion.div>
    </motion.footer>
  )
}
