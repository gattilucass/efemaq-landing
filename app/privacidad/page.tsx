"use client"

import React from 'react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacidadPage() {
  return (
    <div className="w-full bg-[#111111] min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-manrope font-bold text-white mb-8">Política de Privacidad</h1>
        
        <div className="space-y-6 text-gray-300 font-inter text-sm md:text-base leading-relaxed">
          <p>En EFEMAQ, nos comprometemos a proteger su privacidad y sus datos personales.</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Recolección de Datos</h2>
          <p>Podemos recolectar información personal como nombre, correo electrónico y número de teléfono cuando usted completa nuestros formularios de contacto o solicita un presupuesto.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Uso de la Información</h2>
          <p>Utilizamos su información únicamente para responder a sus consultas, brindar los servicios solicitados y mejorar su experiencia en nuestro sitio web.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Protección de Datos</h2>
          <p>Implementamos medidas de seguridad para proteger sus datos contra acceso no autorizado, alteración o divulgación.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Cookies</h2>
          <p>Este sitio puede utilizar cookies para mejorar la navegación y analizar el tráfico del sitio. Usted puede configurar su navegador para rechazar las cookies.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Contacto</h2>
          <p>Si tiene preguntas sobre esta política de privacidad, puede contactarnos a través de info@efemaq.com.ar.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}