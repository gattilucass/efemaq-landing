"use client"
import React, { useEffect } from 'react'

import Navbar from "../components/navbar"
import HeroSection from "../components/hero-section"
import ProcessSection from "@/components/process-section";
import AudienceFunnel from "../components/audience-funnel"
import BotSection from "../components/bot-section"
import HorizontalServices from "../components/horizontal-services"
import CTASection from "../components/cta-section"
import Footer from "../components/footer"
import FloatingWhatsApp from "../components/floating-whatsapp"
import AboutUs from "../components/about-us"

export default function Home() {

  // --- FIX DE NAVEGACIÓN "VOLVER" ---
  useEffect(() => {
    // 1. Detectar si hay un #hash en la URL (ej: #audience-funnel)
    const hash = window.location.hash;
    
    if (hash) {
      // 2. Encontrar el elemento
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // 3. Forzar scroll (Aumentado a 500ms para seguridad total con el Hero gigante)
        setTimeout(() => {
          element.scrollIntoView({ behavior: "instant", block: "start" });
        }, 500); 
      }
    } else {
      // Si no hay hash, arriba
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="w-full bg-[#111111]">
      <Navbar />
      
      <HeroSection />

      <ProcessSection />

      {/* ID Clave para anclar el regreso */}
      <div id="audience-funnel"> 
        <AudienceFunnel />
      </div>
      
      <BotSection />
      <AboutUs />
      <HorizontalServices />
      <CTASection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}