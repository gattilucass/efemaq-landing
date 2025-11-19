"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ClipboardCheck, HardHat, Siren, Bot } from "lucide-react"

const services = [
  {
    icon: ClipboardCheck,
    title: "Mantenimiento Preventivo y Predictivo",
    description: "Anticipamos problemas antes que ocurran con nuestros sistemas de monitoreo avanzado.",
  },
  {
    icon: HardHat,
    title: "Soluciones Definitivas (Obras y Refacciones)",
    description: "Soluciones integrales de renovación y reparación adaptadas a tus necesidades.",
  },
  {
    icon: Siren,
    title: "Gestión de Siniestros y Urgencias",
    description: "Respuesta rápida a emergencias con nuestro sistema de soporte 24/7.",
  },
  {
    icon: Bot,
    title: "Seguimiento y Sistema 360°",
    description: "Seguimiento completo y gestión integrada a través de nuestro Bot EFEMAQ.",
  },
]

export default function HorizontalServices() {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const translateX = useTransform(scrollYProgress, [0, 1], [0, -scrollRange])

  useEffect(() => {
    const updateScrollRange = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth
        const clientWidth = containerRef.current.clientWidth
        setScrollRange(scrollWidth - clientWidth)
      }
    }

    const timer = setTimeout(() => {
      updateScrollRange()
    }, 0)

    window.addEventListener("resize", updateScrollRange)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", updateScrollRange)
    }
  }, [])

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#111111",
        height: `calc(100vh + ${scrollRange}px)`,
      }}
      className="relative w-full"
    >
      <div
        className="sticky left-0 w-full h-screen overflow-hidden flex items-center"
        style={{
          backgroundColor: "#111111",
          top: 0,
          zIndex: 10,
        }}
      >
        <div className="w-full">
          <motion.h2
            className="font-manrope text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 px-4"
            style={{ color: "#FAFAFA" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Un Sistema. Todas las Soluciones.
          </motion.h2>

          <div className="overflow-hidden w-full">
            <motion.div
              ref={containerRef}
              className="flex gap-6 md:gap-8 px-6 md:px-8 pb-8"
              style={{
                x: translateX,
              }}
            >
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-[85vw] md:w-[550px] p-8 md:p-10 rounded-2xl"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                    whileHover={{
                      y: -8,
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <motion.div
                      className="mb-6"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Icon size={56} color="#006262" />
                    </motion.div>
                    <h3 className="font-manrope text-2xl md:text-3xl font-bold mb-3" style={{ color: "#FAFAFA" }}>
                      {service.title}
                    </h3>
                    <p className="font-inter text-base md:text-lg leading-relaxed" style={{ color: "#E0E0E0" }}>
                      {service.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center gap-1 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-1">
              {services.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full"
                  style={{
                    width: 8,
                    backgroundColor: "#BDC3C7",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
