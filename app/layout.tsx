import type React from "react"
import type { Metadata } from "next"
import { Manrope, Inter } from "next/font/google"
import "./globals.css"
import SmoothScroller from "@/components/smooth-scroller"

const _manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "EFEMAQ - Sistema 360° de Mantenimiento",
  description: "El sistema integral de mantenimiento y seguimiento para edificios, locales y hogares.",
  icons: {
    icon: [
      { url: "/EFEMAQ-13.svg", type: "image/svg+xml" },
    ],
    
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`dark ${_manrope.variable} ${_inter.variable}`}>
      <body className="font-inter antialiased bg-[#111111] text-white">
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  )
}