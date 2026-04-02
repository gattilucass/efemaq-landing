import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gas cortado por observaciones: cómo regularizar y pedir la reconexión | EFEMAQ",
  description:
    "Guía completa para casas, locales y edificios: qué hacer si te cortaron el gas por observaciones, quién puede reparar, cómo pedir la inspección y qué cambia según la distribuidora.",
  openGraph: {
    title: "Gas cortado por observaciones: cómo regularizar y pedir la reconexión",
    description:
      "Guía completa para casas, locales y edificios: qué hacer si te cortaron el gas por observaciones, quién puede reparar, cómo pedir la inspección y qué cambia según la distribuidora.",
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
