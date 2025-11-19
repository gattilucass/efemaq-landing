"use client"

import { motion } from "framer-motion"

const painPoints = [
  {
    title: "Filtraciones Recurrentes",
    description: "Solucionamos la causa, no el síntoma. Se terminó el arreglo de 'parche' que dura dos semanas.",
  },
  {
    title: "Mala Gestión de Proveedores",
    description: "Dejás de lidiar con 5 personas. Un solo punto de contacto, un solo responsable: EFEMAQ.",
  },
  {
    title: "Falta de Seguimiento",
    description:
      "Con nuestro sistema, sabés en qué estado está tu pedido 24/7. Transparencia total, cero incertidumbre.",
  },
]

export default function PainPointsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section 
      className="w-full px-4 py-16 md:py-20 flex items-center" 
      style={{ backgroundColor: "#111111" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <motion.h2
          className="font-manrope text-4xl md:text-5xl font-bold text-center mb-10 md:mb-14"
          style={{ color: "#FAFAFA" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Dejamos de ser un 'parche'.
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 md:p-8 rounded-xl group"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(0, 98, 98, 0.1)",
                borderColor: "rgba(0, 98, 98, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 className="font-manrope text-xl md:text-2xl font-bold mb-3" style={{ color: "#006262" }}>
                {point.title}
              </motion.h3>
              <p className="font-inter text-base leading-relaxed" style={{ color: "#E0E0E0" }}>
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
