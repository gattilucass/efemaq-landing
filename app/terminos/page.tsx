"use client"

import React from 'react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TerminosPage() {
  return (
    <div className="w-full bg-[#111111] min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-manrope font-bold text-white mb-8">Términos y Condiciones</h1>
        
        <div className="space-y-6 text-gray-300 font-inter text-sm md:text-base leading-relaxed">
          <p>Última actualización: {new Date().getFullYear()}</p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Introducción</h2>
          <p>Bienvenido al sitio web de EFEMAQ. Al acceder y utilizar este sitio, usted acepta cumplir con los siguientes términos y condiciones de uso.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Servicios</h2>
          <p>EFEMAQ ofrece servicios de mantenimiento integral para consorcios, empresas y particulares. La información proporcionada en este sitio web es de carácter informativo y comercial.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Propiedad Intelectual</h2>
          <p>Todo el contenido de este sitio web, incluyendo textos, gráficos, logos e imágenes, es propiedad exclusiva de EFEMAQ y está protegido por las leyes de derechos de autor.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Limitación de Responsabilidad</h2>
          <p>EFEMAQ no se hace responsable por daños directos o indirectos que puedan surgir del uso de la información contenida en este sitio web.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigencia inmediatamente después de su publicación en el sitio.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}