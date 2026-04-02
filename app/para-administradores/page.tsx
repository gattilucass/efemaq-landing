"use client"

import React from 'react'
import Navbar from "@/components/navbar"
import AdminSection from "@/components/admin-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"

export default function AdminPage() {
  return (
    <div className="w-full bg-[#111111]">
      <Navbar />
      {/* Al estar sola, le damos un padding top extra interno o dejamos que el componente lo maneje */}
      <div className="min-h-screen">
        <AdminSection />
      </div>
      {/* Agregamos el CTA aquí también para cerrar la venta en esta página */}
      <CTASection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}