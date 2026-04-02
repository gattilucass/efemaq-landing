import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog EFEMAQ | Mantenimiento de edificios, casas y locales — guías prácticas",
  description:
    "Guías claras sobre fachadas, tanques de agua, gas, electricidad, pintura, climatización y más. Todo lo que necesitás saber para mantener tu propiedad en condiciones, explicado de forma simple. Buenos Aires y alrededores.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
