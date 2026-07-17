import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Guardia técnica por WhatsApp para administradores | EFEMAQ",
  description:
    "Atención 24/7, soporte humano y un flujo parametrizable para cada administradora de consorcios. EFEMAQ cubre la guardia fuera de horario.",
  keywords: [
    "guardia para administradoras de consorcios",
    "guardia técnica de edificios",
    "urgencias de consorcios",
    "mantenimiento de edificios fuera de horario",
    "guardia por WhatsApp",
  ],
  alternates: {
    canonical: "https://www.efemaq.com.ar/guardia-tecnica-whatsapp",
  },
  openGraph: {
    title: "Guardia técnica por WhatsApp para administradores | EFEMAQ",
    description:
      "Apagá el teléfono el viernes a la noche. EFEMAQ sostiene la guardia hasta el lunes a la mañana.",
    type: "website",
    locale: "es_AR",
    siteName: "EFEMAQ",
    url: "https://www.efemaq.com.ar/guardia-tecnica-whatsapp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guardia técnica por WhatsApp | EFEMAQ",
    description: "Atención 24/7, soporte humano y una configuración propia para cada administradora.",
  },
}

export default function GuardiaTecnicaWhatsAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Guardia técnica por WhatsApp EFEMAQ",
    provider: {
      "@type": "Organization",
      name: "EFEMAQ",
      url: "https://www.efemaq.com.ar",
    },
    areaServed: "Argentina",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Administradoras de consorcios",
    },
    description: "Atención 24/7 por WhatsApp, diferenciación de consultas y urgencias, soporte humano y configuración por administradora.",
    url: "https://www.efemaq.com.ar/guardia-tecnica-whatsapp",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  )
}
