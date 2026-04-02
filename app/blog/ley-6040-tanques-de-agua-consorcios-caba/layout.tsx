import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ley 6040 en CABA: tanques de agua en consorcios, controles y sanciones | EFEMAQ",
  description:
    "Guía completa para administradores de consorcios sobre la Ley 6040 en CABA: análisis bacteriológico y físico-químico anual, limpieza y desinfección de tanques, sanciones y cómo cumplir sin improvisar.",
  openGraph: {
    title: "Ley 6040 en CABA: tanques de agua en consorcios, controles y sanciones",
    description:
      "Guía completa para administradores de consorcios sobre la Ley 6040 en CABA: análisis bacteriológico y físico-químico anual, limpieza y desinfección de tanques, sanciones y cómo cumplir sin improvisar.",
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
