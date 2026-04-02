"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Droplets, Flame, Building2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"

/* ─── Blog entries registry ─── */
const blogPosts = [
  {
    slug: "ley-257-fachadas-balcones-caba-consorcios",
    title: "Fachadas y balcones en edificios: qué hay que certificar, cada cuánto y cómo hacerlo bien",
    description:
      "Si tu edificio tiene más de 15 años, probablemente le corresponda una inspección técnica de fachada. Te explicamos el proceso completo de forma simple: qué se revisa, quién lo hace, cada cuánto toca y qué pasa si aparecen problemas. Sin vueltas.",
    tag: "Fachadas y balcones",
    tagIcon: Building2,
  },
  {
    slug: "ley-6040-tanques-de-agua-consorcios-caba",
    title: "Tanques de agua en edificios: qué se exige hoy, qué cambió y cómo ponerse al día",
    description:
      "La vieja limpieza semestral automática ya no rige. Hoy el control de tanques pasa por un análisis anual del agua, revisión de instalaciones y acción rápida si algo no cumple. Te contamos cómo funciona el nuevo esquema y cómo evitar multas.",
    tag: "Tanques de agua",
    tagIcon: Droplets,
  },
  {
    slug: "gas-cortado-por-observaciones-como-regularizar-y-pedir-la-reconexion",
    title: "Te cortaron el gas por observaciones: qué hacer para regularizar y recuperar el servicio",
    description:
      "Cuando el corte es por seguridad, no alcanza con llamar a un técnico cualquiera. Acá te explicamos quién puede reparar, qué documentación necesitás, cómo pedir la inspección y qué cambia según tu distribuidora. Paso a paso, sin tecnicismos.",
    tag: "Instalaciones de gas",
    tagIcon: Flame,
  },
]

/* ─── Fade-in wrapper ─── */
const FadeIn = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
)

export default function BlogIndexPage() {
  return (
    <div className="w-full bg-[#111111] min-h-screen flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative w-full pt-28 md:pt-36 pb-12 md:pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#006262] opacity-[0.06] blur-[140px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs font-inter text-gray-500 mb-8">
              <Link href="/" className="hover:text-[#00dfdf] transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-gray-400">Blog</span>
            </nav>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/20 mb-6">
              <FileText size={14} className="text-[#00dfdf]" />
              <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                Blog EFEMAQ
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-manrope text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Todo sobre el{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfdf] to-[#10b981]">
                mantenimiento
              </span>{" "}
              de tu propiedad
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="font-inter text-[17px] md:text-lg text-gray-400 leading-relaxed max-w-3xl">
              Guías prácticas sobre fachadas, tanques de agua, gas, electricidad, pintura, climatización y más. Te explicamos qué necesitás saber, qué conviene hacer y cómo resolverlo sin complicaciones — ya sea para tu edificio, tu casa o tu local.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── LISTADO DE POSTS ── */}
      <main className="w-full px-6 md:px-10 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-5">
            {blogPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={0.05 * i}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <article className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-[#00dfdf]/25 hover:bg-[#0a0a0a]/80">
                    {/* Hover glow */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#00dfdf]/0 to-[#00dfdf]/0 group-hover:from-[#00dfdf]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      {/* Tag */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/15">
                          <post.tagIcon size={12} className="text-[#00dfdf]" />
                          <span className="text-[10px] font-manrope font-bold text-[#00dfdf] uppercase tracking-wider">
                            {post.tag}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="font-manrope text-xl md:text-2xl font-bold text-white leading-snug mb-3 group-hover:text-[#00dfdf] transition-colors duration-300">
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="font-inter text-[15px] md:text-base text-gray-400 leading-relaxed mb-5 max-w-3xl">
                        {post.description}
                      </p>

                      {/* Read more */}
                      <span className="inline-flex items-center gap-2 text-sm font-manrope font-semibold text-[#00dfdf] group-hover:gap-3 transition-all duration-300">
                        Leer artículo
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* More content teaser */}
          <FadeIn delay={0.2}>
            <div className="mt-14 text-center">
              <p className="font-inter text-sm text-gray-600">
                Próximamente: aires acondicionados, tableros eléctricos, pintura, remodelaciones y más.
              </p>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
