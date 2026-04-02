import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ley 257 y Ley 6116 en CABA: fachadas y balcones en consorcios | EFEMAQ",
  description:
    "Guía completa para administradores de consorcios sobre la Ley 257 en CABA: qué incluye la inspección de fachadas y balcones, cada cuánto debe certificarse, cómo se tramita y qué hacer si el informe detecta riesgo.",
  openGraph: {
    title: "Ley 257 y Ley 6116 en CABA: fachadas y balcones en consorcios",
    description:
      "Guía completa para administradores de consorcios sobre la Ley 257 en CABA: qué incluye la inspección de fachadas y balcones, cada cuánto debe certificarse, cómo se tramita y qué hacer si el informe detecta riesgo.",
    type: "article",
    locale: "es_AR",
    siteName: "EFEMAQ",
  },
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
