"use client"

import React from 'react'
import Navbar from "@/components/navbar"
import ParticularSection from "@/components/particular-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"

export default function ParticularPage() {
  return (
    <div className="w-full bg-[#111111]">
      <Navbar />
      <div className="min-h-screen">
        <ParticularSection />
      </div>
      <CTASection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}