"use client"
import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializamos Lenis con configuración "Premium"
    const lenis = new Lenis({
      duration: 1.2, // Duración de la inercia (más alto = más "pesado")
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave
      orientation: 'vertical', 
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    // Loop de animación (requestAnimationFrame)
    // Esto conecta Lenis con el refresco de pantalla del navegador
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Limpieza al desmontar
    return () => {
      lenis.destroy()
    }
  }, [])

  return <div className="lenis-wrapper">{children}</div>
}