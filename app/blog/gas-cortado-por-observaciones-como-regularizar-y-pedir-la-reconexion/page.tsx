"use client"

import React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Clock,
  Shield,
  ChevronDown,
  Flame,
  AlertTriangle,
  ClipboardCheck,
  UserCheck,
  Search,
  MessageSquare,
  ShieldAlert,
  Ban,
  Wrench,
  CheckCircle2,
  CircleAlert,
  ListChecks,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"

/* ─── FAQ Data ─── */
const faqs = [
  {
    q: "¿Si me dejaron un F-1022 ya sé todo lo que tengo que reparar?",
    a: "No necesariamente. MetroGAS aclara que el F-1022 informa anomalías detectadas en el momento de la visita, pero no constituye la lista completa de todos los trabajos a realizar. Por eso conviene hacer una revisión integral.",
  },
  {
    q: "¿Puede reparar la instalación cualquier técnico?",
    a: "No. ENARGAS establece que toda modificación, reparación o nueva instalación de gas debe ser realizada por un instalador matriculado habilitado por la distribuidora de la zona.",
  },
  {
    q: "¿La reconexión la hace el gasista?",
    a: "No de forma autónoma. El matriculado repara, adecúa la instalación y presenta la documentación técnica. Pero la inspección final y la rehabilitación formal del servicio dependen exclusivamente de la distribuidora.",
  },
  {
    q: "¿El trámite es igual en todo el país?",
    a: "No. El marco técnico de seguridad (NAG-200, ENARGAS) es nacional, pero cada distribuidora —MetroGAS, Camuzzi, ECOGAS, Naturgy, etc.— administra sus propios formularios, portales y circuitos de inspección.",
  },
  {
    q: "¿Qué pasa si la empresa demora la rehabilitación aun cuando ya presentaron todo?",
    a: "Según ENARGAS, la distribuidora debe inspeccionar y rehabilitar dentro de los 4 días hábiles desde la presentación del formulario por parte del gasista matriculado. Si no ocurre, podés iniciar un reclamo ante el organismo regulador.",
  },
]

/* ─── Pasos de reconexión ─── */
const pasosReconexion = [
  {
    icon: Ban,
    num: "1",
    title: "La distribuidora deja una observación o clausura por seguridad",
    text: "En MetroGAS, esto suele quedar documentado con el formulario F-1022, que notifica anomalías en la instalación interna. Otras distribuidoras usan sus propios documentos, pero la lógica es la misma: el corte queda registrado formalmente.",
  },
  {
    icon: UserCheck,
    num: "2",
    title: "Interviene un instalador matriculado",
    text: "El profesional revisa la instalación completa —no solo lo que figura en el documento de observación—, identifica fallas adicionales y ejecuta las reparaciones necesarias para llevar todo a norma.",
  },
  {
    icon: ClipboardCheck,
    num: "3",
    title: "El matriculado presenta la documentación y pide inspección",
    text: "Acá aparecen las diferencias operativas según la zona. MetroGAS usa formularios 3.5, 3.4A, 3.3 y/o plano. ECOGAS requiere el F-0173 de terminación de trabajos. Camuzzi canaliza todo vía su Oficina Virtual. Los formularios cambian, el criterio no.",
  },
  {
    icon: Search,
    num: "4",
    title: "La distribuidora inspecciona",
    text: "Si la verificación se aprueba, el suministro queda apto para habilitarse. Si no, puede quedar una nueva observación hasta que la instalación cumpla con las condiciones reglamentarias de seguridad.",
  },
  {
    icon: CheckCircle2,
    num: "5",
    title: "Recién ahí se rehabilita el servicio",
    text: "La reconexión válida es la que queda aprobada dentro del circuito oficial. No alcanza con \"haber reparado\". Tiene que existir aceptación técnica de la distribuidora y restitución formal del suministro.",
  },
]

/* ─── Pasos finales del usuario ─── */
const pasosUsuario = [
  {
    icon: CircleAlert,
    title: "Identificar si el corte fue por seguridad o por deuda",
    text: "No es el mismo circuito. Si hubo deficiencias normativas, el camino es técnico y reglamentario, no solo administrativo.",
  },
  {
    icon: UserCheck,
    title: "Contactar a un instalador matriculado",
    text: "La revisión y reparación deben estar a cargo de un profesional habilitado por la distribuidora correspondiente.",
  },
  {
    icon: ListChecks,
    title: "Pedir una revisión integral de la instalación",
    text: "No alcanza con arreglar el punto más evidente. Hay que revisar artefactos, ventilaciones, conductos, cañerías, medidor, llaves y evacuación de gases.",
  },
  {
    icon: ClipboardCheck,
    title: "Presentar el trámite correcto según la distribuidora",
    text: "Formularios, portales y canales varían. La gestión debe hacerse con el circuito específico de la prestadora de tu zona.",
  },
  {
    icon: ShieldAlert,
    title: "Esperar la inspección oficial — no reconectar por cuenta propia",
    text: "La rehabilitación válida es la que aprueba y ejecuta la distribuidora. Cualquier otra reconexión es clandestina y peligrosa.",
  },
]

/* ─── Fallas comunes ─── */
const fallasComunes = [
  "Pérdidas de gas en cañerías, conexiones o válvulas",
  "Ventilaciones insuficientes, obstruidas o mal dimensionadas",
  "Conductos de evacuación de gases de combustión en mal estado o sin tiraje",
  "Artefactos de cámara abierta en baños, dormitorios o pasos comunicados con ellos",
  "Llama amarilla en quemadores (combustión incompleta)",
  "Artefactos instalados en ubicaciones que no corresponden",
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

export default function GasCortadoBlogPage() {
  const whatsappLink =
    "https://wa.me/5491126547271?text=Hola%20EFEMAQ,%20necesito%20asesoramiento%20para%20regularizar%20mi%20instalación%20de%20gas."
  const mailLink =
    "mailto:info@efemaq.com.ar?subject=Evaluación%20técnica%20instalación%20de%20gas"

  return (
    <div className="w-full bg-[#111111] min-h-screen flex flex-col">
      <Navbar />

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#006262] opacity-[0.07] blur-[140px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs font-inter text-gray-500 mb-8">
              <Link href="/" className="hover:text-[#00dfdf] transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#00dfdf] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-gray-400">Gas cortado</span>
            </nav>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/20 mb-6">
              <Flame size={14} className="text-[#00dfdf]" />
              <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                Instalaciones de gas
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-manrope text-3xl md:text-[2.65rem] font-extrabold text-white leading-[1.15] tracking-tight mb-6">
              <strong className="text-white">Gas cortado</strong> por observaciones: cómo regularizar la instalación y pedir la{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfdf] to-[#10b981]">
                reconexión del servicio
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="font-inter text-[17px] md:text-lg text-gray-400 leading-relaxed max-w-4xl">
              Si te cortaron el gas por observaciones o <strong className="text-gray-200">deficiencias normativas</strong>, el problema no se resuelve con una reparación informal ni reabriendo el suministro por cuenta propia. En Argentina, la <strong className="text-gray-200">rehabilitación del suministro</strong> requiere intervención de un <strong className="text-gray-200">instalador matriculado</strong>, adecuación de la instalación y una <strong className="text-gray-200">inspección</strong> de la <strong className="text-gray-200">distribuidora</strong>, bajo el marco de <strong className="text-gray-200">ENARGAS</strong> y la <strong className="text-gray-200">NAG-200</strong>.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 mt-8 text-xs font-inter text-gray-500">
              <span className="flex items-center gap-1.5"><Clock size={13} /> 14 min de lectura</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1.5"><FileText size={13} /> Guía técnica</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span>Actualizado 2025</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SUMMARY BOX
      ════════════════════════════════════════════════════════════ */}
      <section className="w-full px-6 md:px-10">
        <FadeIn>
          <div className="max-w-5xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 mb-16">
            <h2 className="font-manrope text-sm font-bold text-[#00dfdf] tracking-widest uppercase mb-6">
              Lo que necesitás saber
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: ShieldAlert, label: "Qué significa el corte", value: "Clausura por seguridad: la instalación no cumple condiciones reglamentarias para operar" },
                { icon: UserCheck, label: "Quién puede reparar", value: "Únicamente un instalador matriculado habilitado por la distribuidora de tu zona" },
                { icon: ClipboardCheck, label: "Cómo se pide la inspección", value: "El matriculado presenta formularios técnicos y solicita la verificación a la distribuidora" },
                { icon: FileText, label: "Qué cambia según zona", value: "El marco de seguridad es nacional (ENARGAS / NAG-200), pero los formularios y portales varían por distribuidora" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-lg bg-[#00dfdf]/5 border border-[#00dfdf]/10 shrink-0">
                    <item.icon size={16} className="text-[#00dfdf]" />
                  </div>
                  <div>
                    <span className="block text-xs font-manrope font-bold text-gray-500 uppercase tracking-wider mb-1">{item.label}</span>
                    <span className="block text-sm font-inter text-gray-300 leading-relaxed">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CONTENIDO PRINCIPAL
      ════════════════════════════════════════════════════════════ */}
      <main className="w-full px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto">

          {/* ── INTRO ── */}
          <FadeIn>
            <div className="mb-14">
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-5">
                Cuando una <strong className="text-white">distribuidora</strong> corta el suministro por cuestiones técnicas, no está señalando un detalle menor: está diciendo que la instalación dejó de reunir las condiciones mínimas para seguir funcionando de manera segura. En el caso de MetroGAS, por ejemplo, ese corte suele quedar asentado en el <strong className="text-white">formulario F-1022</strong>, que documenta anomalías encontradas en la instalación interna. Lo que muchos no saben es que la propia empresa aclara que ese documento no necesariamente enumera todo lo que hay que corregir, con lo cual la revisión posterior tiene que ser integral y no limitarse al punto señalado.
              </p>
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-6">
                A nivel nacional, la referencia técnica obligatoria es la <strong className="text-white">NAG-200</strong>, el reglamento que regula las instalaciones domiciliarias de gas. Esa norma fija requisitos para diseño, construcción, pruebas, habilitación, <strong className="text-white">seguridad</strong> y conservación de instalaciones internas abastecidas por red. Entre otras cosas, deja en claro que una instalación puede perder sus condiciones de seguridad si presenta pérdidas, problemas de ventilación, fallas en la evacuación de gases o artefactos de cámara abierta ubicados donde no corresponde.
              </p>

              {/* Bloque destacado */}
              <div className="relative bg-[#00dfdf]/[0.03] border-l-2 border-[#00dfdf] rounded-r-xl px-6 py-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#00dfdf] mt-0.5 shrink-0" />
                  <p className="font-inter text-[15px] md:text-base text-gray-300 leading-relaxed">
                    <strong className="text-white">Punto clave:</strong> si el servicio fue cortado por <strong className="text-white">seguridad</strong>, el camino correcto no es improvisar ni buscar una salida rápida. El circuito válido es: revisión por <strong className="text-white">instalador matriculado</strong>, adecuación completa de la instalación, presentación de la documentación técnica correspondiente y aprobación de la <strong className="text-white">distribuidora</strong> antes de cualquier <strong className="text-white">reconexión</strong>. Tanto las distribuidoras como <strong className="text-white">ENARGAS</strong> son categóricos en esto.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── IMAGEN PLACEHOLDER 1 ── */}
          <FadeIn>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-14 bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
              <div className="text-center px-6">
                <Flame size={48} className="text-[#00dfdf] opacity-30 mx-auto mb-4" />
                <p className="text-xs font-inter text-gray-500 max-w-md">
                  Técnico matriculado inspeccionando calefón, gabinete de medidores o instalación interna de gas. Reemplazar con imagen real — estética profesional, realista.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── H2: Qué significa que te cortaron el gas ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué significa que te cortaron el gas &ldquo;por observaciones&rdquo;
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  No es lo mismo un corte por falta de pago que una clausura por <strong className="text-white">deficiencias normativas</strong>. En el segundo caso, la <strong className="text-white">distribuidora</strong> interrumpe el suministro porque encontró condiciones que comprometen la <strong className="text-white">seguridad</strong> de la instalación. MetroGAS lo dice sin rodeos: el suministro se clausura cuando las instalaciones no cumplen con las normas técnicas vigentes. ECOGAS, por su parte, indica que cuando el servicio fue interrumpido por inconveniente técnico, debe intervenir un <strong className="text-white">instalador matriculado</strong> y la obra interna debe revisarse y reacondicionarse antes de aprobar la <strong className="text-white">rehabilitación del suministro</strong>.
                </p>
                <p>
                  Para quien está del otro lado del problema, esto redefine la situación por completo. No se trata de &ldquo;volver a prender&rdquo; un artefacto o cambiar una pieza suelta. El punto es verificar si la instalación interna conserva condiciones reglamentarias, corregir todo lo que no cumple y dejar la instalación lista para que la <strong className="text-white">distribuidora</strong> la apruebe. La <strong className="text-white">NAG-200</strong> es terminante: cualquier trabajo sobre una instalación de gas solo debe ser ejecutado, ampliado, reparado o modificado por un <strong className="text-white">instalador matriculado</strong>.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Quién puede reparar ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Quién puede reparar una instalación observada y quién no
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  Este es probablemente el punto más importante de toda la guía. La instalación interna de gas es propiedad del usuario, pero eso no significa que pueda repararla cualquiera. Toda modificación, reparación o nueva instalación tiene que pasar por un <strong className="text-white">instalador matriculado</strong>. <strong className="text-white">ENARGAS</strong> lo aclara directamente en sus preguntas frecuentes y explica además que las distribuidoras de cada zona son las que otorgan las matrículas a estos profesionales.
                </p>
                <p>
                  En la práctica, esto descarta tres opciones que mucha gente considera por urgencia: el plomero generalista sin matrícula, el técnico &ldquo;de confianza&rdquo; que no está habilitado por la <strong className="text-white">distribuidora</strong>, y la intervención directa del propio usuario. Más allá del riesgo obvio para la <strong className="text-white">seguridad</strong>, hay un problema operativo concreto: si la reparación no la hace un matriculado, la <strong className="text-white">distribuidora</strong> no tiene razón para aceptar la instalación en la inspección posterior. MetroGAS incluso advierte que la <strong className="text-white">reconexión</strong> sin intervención de la empresa no solo es riesgosa sino que se considera una conexión clandestina.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Fallas más comunes ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Fallas más comunes que pueden generar observaciones o corte
              </h2>
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-8">
                Cada instalación tiene sus particularidades, pero la <strong className="text-white">NAG-200</strong> y <strong className="text-white">ENARGAS</strong> identifican situaciones recurrentes que comprometen la <strong className="text-white">seguridad</strong> y pueden derivar en clausura:
              </p>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-7">
                <div className="space-y-3">
                  {fallasComunes.map((falla, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00dfdf] mt-2.5 shrink-0" />
                      <span className="font-inter text-[15px] md:text-base text-gray-300 leading-relaxed">{falla}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mt-6">
                Por eso, cuando hay un corte o clausura, resolver solo &ldquo;lo que parece roto&rdquo; no alcanza. Lo que corresponde es una evaluación integral de toda la instalación vinculada al servicio.
              </p>
            </section>
          </FadeIn>

          {/* ── H2: Proceso de reconexión ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Cómo es el proceso de <strong>reconexión</strong>, paso a paso
              </h2>
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-8">
                Los formularios y canales cambian según la <strong className="text-white">distribuidora</strong>, pero la lógica de fondo en Argentina es bastante consistente:
              </p>

              <div className="space-y-4">
                {pasosReconexion.map((paso, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-[#0a0a0a] border border-white/5 rounded-xl px-5 py-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00dfdf]/10 border border-[#00dfdf]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <paso.icon size={18} className="text-[#00dfdf]" />
                    </div>
                    <div>
                      <h3 className="font-manrope text-base md:text-lg font-bold text-white mb-1">
                        <span className="text-[#00dfdf] mr-1.5">{paso.num}.</span>
                        {paso.title}
                      </h3>
                      <p className="font-inter text-[15px] md:text-base text-gray-400 leading-relaxed">
                        {paso.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Qué cambia según distribuidora ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué cambia según la distribuidora y por qué importa saberlo
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  Es fundamental tener esto claro: el marco de <strong className="text-white">seguridad</strong> es nacional, pero el trámite operativo no es idéntico en todo el país. La <strong className="text-white">NAG-200</strong> y el control general dependen de <strong className="text-white">ENARGAS</strong>, pero cada <strong className="text-white">distribuidora</strong> administra sus propios canales, portales, formularios y tiempos de inspección. Así que el criterio técnico se mantiene, pero la gestión concreta puede variar mucho entre MetroGAS, Camuzzi, ECOGAS, Naturgy u otras prestadoras.
                </p>
                <p>
                  Este detalle explica varios errores que se repiten seguido: usar formularios que no corresponden a tu zona, creer que el corte se resuelve con una reparación aislada sin <strong className="text-white">inspección</strong>, o asumir que lo que aplica en Buenos Aires funciona igual en Córdoba o en la Patagonia. Conocer las reglas de tu <strong className="text-white">distribuidora</strong> es tan importante como conocer la norma general.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Antes de pedir inspección ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué revisar antes de pedir la inspección (casas, locales y edificios)
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  Uno de los consejos más valiosos que podemos dar es este: no conviene pedir la <strong className="text-white">inspección</strong> apenas se arregla &ldquo;lo urgente&rdquo;. Lo razonable es verificar toda la instalación afectada al servicio, porque si la <strong className="text-white">distribuidora</strong> encuentra otros incumplimientos durante la visita, la <strong className="text-white">rehabilitación del suministro</strong> no avanza. MetroGAS lo dice directamente para edificios: recomienda revisar todas las instalaciones —no solo las observadas en el F-1022— antes de la visita de rehabilitación. Y aclara que, si en un edificio algún suministro individual no cumple norma al momento de la visita, ese suministro no va a ser rehabilitado.
                </p>
                <p>
                  Para casas y locales, el criterio es exactamente el mismo. Antes de solicitar la <strong className="text-white">inspección</strong>, conviene que el <strong className="text-white">instalador matriculado</strong> revise a fondo artefactos, ventilaciones, conductos, cañerías, medidor, llaves, evacuación de gases y estado general. <strong className="text-white">ENARGAS</strong> insiste en la revisión anual por gasista matriculado y en el cumplimiento de condiciones de ubicación, ventilación y evacuación para prevenir accidentes.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── IMAGEN PLACEHOLDER 2 ── */}
          <FadeIn>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-14 bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
              <div className="text-center px-6">
                <Wrench size={48} className="text-[#00dfdf] opacity-30 mx-auto mb-4" />
                <p className="text-xs font-inter text-gray-500 max-w-md">
                  Revisión técnica de calefón, medidor o conducto de evacuación. Reemplazar con imagen real — estética profesional y realista.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── H2: Plazos y demoras ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Cuánto puede tardar la rehabilitación y qué hacer si hay demoras
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  Una vez que el <strong className="text-white">instalador matriculado</strong> presenta la solicitud de inspección, hay un plazo de referencia regulatorio para reclamar si la empresa se demora. Según <strong className="text-white">ENARGAS</strong>, en casos de rehabilitación por defecto en la instalación interna, la <strong className="text-white">distribuidora</strong> debe realizar la inspección y —si corresponde— rehabilitar el servicio en condiciones de seguridad dentro de los cuatro días hábiles desde la presentación del formulario por parte del matriculado. Si la empresa no responde o la respuesta no es satisfactoria, se puede escalar con un reclamo formal ante el organismo regulador.
                </p>
                <p>
                  Este dato es especialmente útil porque les da a los usuarios una herramienta concreta: no solo saben cómo regularizar, sino que también conocen el mecanismo formal para reclamar si el proceso se traba una vez cumplidos todos los requisitos técnicos.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Errores más comunes ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Los errores más comunes cuando alguien quiere recuperar el gas rápido
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  El primer error es contratar a alguien sin matrícula para &ldquo;zafar&rdquo; de la urgencia. Eso puede agravar el problema técnico y dejar al usuario sin posibilidad real de <strong className="text-white">rehabilitación del suministro</strong>. <strong className="text-white">ENARGAS</strong> no deja margen: las reparaciones y modificaciones las tiene que hacer un <strong className="text-white">instalador matriculado</strong>.
                </p>
                <p>
                  El segundo error es asumir que el documento de observación cubre todas las fallas. MetroGAS lo dice sin vueltas: el <strong className="text-white">formulario F-1022</strong> no constituye la lista completa de todos los trabajos a realizar. Si el matriculado no hace una revisión integral, es bastante habitual llegar a la <strong className="text-white">inspección</strong> y que aparezcan fallas adicionales que nadie había corregido.
                </p>
                <p>
                  El tercer error es intentar una <strong className="text-white">reconexión</strong> no autorizada. Más allá del riesgo evidente para la <strong className="text-white">seguridad</strong>, la <strong className="text-white">distribuidora</strong> advierte que restituir el servicio sin su intervención constituye una conexión clandestina. En esto no hay zona gris.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Qué debería hacer hoy ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué debería hacer hoy alguien que tiene el <strong>gas cortado</strong>
              </h2>

              <div className="space-y-4 mb-8">
                {pasosUsuario.map((paso, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-[#0a0a0a] border border-white/5 rounded-xl px-5 py-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00dfdf]/10 border border-[#00dfdf]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <paso.icon size={18} className="text-[#00dfdf]" />
                    </div>
                    <div>
                      <h3 className="font-manrope text-base md:text-lg font-bold text-white mb-1">
                        {paso.title}
                      </h3>
                      <p className="font-inter text-[15px] md:text-base text-gray-400 leading-relaxed">
                        {paso.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* ════════════════════════════════════════════════════════════
              FAQ
          ════════════════════════════════════════════════════════════ */}
          <FadeIn>
            <section className="mb-16">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                Preguntas frecuentes sobre gas cortado por observaciones
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden transition-colors hover:border-[#00dfdf]/20"
                  >
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-5 list-none">
                      <span className="font-manrope text-sm md:text-base font-semibold text-white pr-4">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className="text-[#00dfdf] shrink-0 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="px-6 pb-5">
                      <p className="font-inter text-[15px] text-gray-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* ════════════════════════════════════════════════════════════
              CTA FINAL
          ════════════════════════════════════════════════════════════ */}
          <FadeIn>
            <section className="relative rounded-2xl overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#006262]/20 via-[#0a0a0a] to-[#006262]/10 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#00dfdf] opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

              <div className="relative border border-[#00dfdf]/20 rounded-2xl px-6 md:px-12 py-10 md:py-14 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/20 mb-6">
                  <Shield size={14} className="text-[#00dfdf]" />
                  <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                    Regularización integral
                  </span>
                </div>

                <h2 className="font-manrope text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4">
                  ¿Tenés el gas cortado por observaciones?
                </h2>
                <p className="font-inter text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-4">
                  En EFEMAQ acompañamos casos de regularización de instalaciones de gas con una mirada técnica y operativa, articulando la revisión, el orden del trabajo y el circuito correcto para avanzar hacia la <strong className="text-gray-200">rehabilitación del suministro</strong>.
                </p>
                <p className="font-inter text-sm text-gray-500 max-w-xl mx-auto mb-3">
                  <strong className="text-white">Seguridad</strong>, criterio técnico y proceso correcto. Si te cortaron el gas en una casa, local o edificio, no lo tomes como una reparación menor.
                </p>
                <p className="font-inter text-xs text-gray-600 max-w-lg mx-auto mb-8">
                  Trabajamos principalmente en Buenos Aires: CABA, Zona Oeste, Zona Norte y Zona Sur.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button className="h-14 px-8 bg-[#00dfdf] hover:bg-[#00c4c4] text-black font-manrope font-extrabold text-base rounded-xl shadow-[0_0_20px_rgba(0,223,223,0.2)] hover:shadow-[0_0_40px_rgba(0,223,223,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
                      <MessageSquare className="w-5 h-5 fill-black" />
                      <span>Pedir evaluación técnica</span>
                      <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                  <a href={mailLink}>
                    <Button className="h-14 px-8 bg-transparent hover:bg-white/5 border border-white/10 hover:border-[#00dfdf]/30 text-white hover:text-[#00dfdf] font-manrope font-bold text-base rounded-xl transition-all duration-300 flex items-center gap-3 group">
                      Solicitar por email
                    </Button>
                  </a>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Volver */}
          <FadeIn>
            <div className="flex justify-center pt-4 pb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-inter text-gray-500 hover:text-[#00dfdf] transition-colors"
              >
                <ArrowLeft size={14} />
                Volver al blog
              </Link>
            </div>
          </FadeIn>

        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
