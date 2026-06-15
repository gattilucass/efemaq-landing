import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Guardia técnica por WhatsApp para administradoras | EFEMAQ",
  description:
    "Sistema comercial de EFEMAQ para ordenar guardias técnicas, reclamos y consultas por WhatsApp con registro automático, derivación humana y flujos adaptables por administradora.",
  openGraph: {
    title: "Guardia técnica por WhatsApp para administradoras | EFEMAQ",
    description:
      "Ordena WhatsApp, separa consultas de urgencias y registra cada incidente edilicio con trazabilidad operativa.",
    type: "website",
    locale: "es_AR",
    siteName: "EFEMAQ",
    url: "https://www.efemaq.com.ar/guardia-tecnica-whatsapp",
  },
}

export default function GuardiaTecnicaWhatsAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
