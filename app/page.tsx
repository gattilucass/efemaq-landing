"use client"
import React from 'react'

import Navbar from "../components/navbar"
import HeroSection from "../components/hero-section"
import AudienceFunnel from "../components/audience-funnel"
// Quitamos AdminSection y ParticularSection de aquí porque ahora tienen sus propias páginas
import BotSection from "../components/bot-section"
import HorizontalServices from "../components/horizontal-services"
import CTASection from "../components/cta-section"
import Footer from "../components/footer"
import FloatingWhatsApp from "../components/floating-whatsapp"
import AboutUs from "../components/about-us"

export default function Home() {
  return (
    <div className="w-full bg-[#111111]">
      <Navbar />
      <HeroSection />
      <AudienceFunnel />
      
      {/* Si el usuario NO elige camino, sigue el flujo natural hacia el Bot */}
      <BotSection />
      
      <AboutUs />
      <HorizontalServices />
      <CTASection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}