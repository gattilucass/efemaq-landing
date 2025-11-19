"use client"
import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <motion.section
      className="min-h-[60vh] w-full px-4 py-20 flex items-center justify-center"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="text-center max-w-3xl">
        <motion.h2
          className="font-manrope text-5xl md:text-6xl font-bold mb-4"
          style={{ color: "#FAFAFA" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tu tranquilidad es nuestro sistema.
        </motion.h2>

        <motion.p
          className="font-inter text-xl mb-8 leading-relaxed"
          style={{ color: "#E0E0E0" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hablemos hoy y olvidate de los problemas mañana.
        </motion.p>

        <motion.button
          className="px-8 py-4 rounded-lg font-inter font-medium text-lg"
          style={{ backgroundColor: "#006262", color: "#111111" }}
          whileHover={{ scale: 1.05, backgroundColor: "#00524d" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Pedí una Cotización 360°
        </motion.button>
      </div>
    </motion.section>
  )
}
