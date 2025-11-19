"use client"
import React from 'react'

// Tus componentes (los nombres que ya tenías)
// Corregimos los imports a rutas relativas (../) para solucionar el error
import Navbar from "../components/navbar"
import HeroSection from "../components/hero-section"
import AudienceFunnel from "../components/audience-funnel"
import BotSection from "../components/bot-section"
import HorizontalServices from "../components/horizontal-services"
import PainPointsSection from "../components/pain-points-section"
import CTASection from "../components/cta-section"
import Footer from "../components/footer"
import FloatingWhatsApp from "../components/floating-whatsapp"
import AboutUs from "../components/about-us"

export default function Home() {

  // La página principal está limpia, toda la lógica de scroll
  // está encapsulada en el componente HeroSection.

  return (
    // Sacamos el 'overflow-x-hidden' que rompía el sticky
    <div className="w-full bg-[#111111]">
      <Navbar />
      
      {/* Llamamos al HeroSection de forma simple. */}
      <HeroSection />

      {/* El resto de tu página sigue igual */}
      <AudienceFunnel />
      <BotSection />
      <AboutUs />
      <HorizontalServices />
      <PainPointsSection />
      <CTASection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}