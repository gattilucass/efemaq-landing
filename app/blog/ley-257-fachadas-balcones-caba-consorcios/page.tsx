"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, FileText, Clock, Shield, CheckCircle2, ChevronDown, Building2, Scale, AlertTriangle, ClipboardCheck, CalendarClock, HardHat, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"

/* ─── METADATA (handled via generateMetadata in layout or head) ─── */

/* ─── FAQ Data ─── */
const faqs = [
  {
    q: "¿La Ley 257 incluye balcones o solo el frente del edificio?",
    a: "Incluye mucho más que el frente. La norma abarca expresamente balcones, terrazas, azoteas, barandas, carteles, revestimientos, cerramientos, conductos e instalaciones. Además, aclara que el listado no es taxativo: cualquier elemento expuesto que pueda comprometer la seguridad debe evaluarse.",
  },
  {
    q: "¿El administrador del consorcio puede iniciar el trámite de certificación?",
    a: "Sí. La página oficial del trámite indica que tanto propietarios como administradores pueden dar inicio al proceso y presentar el informe técnico para obtener el Certificado de Conservación.",
  },
  {
    q: "¿La certificación de fachadas la firma cualquier técnico?",
    a: "No. Tiene que intervenir un profesional habilitado por su consejo profesional. La página oficial menciona específicamente CPAU, CPIC y CPII como los organismos que validan la encomienda.",
  },
  {
    q: "¿El trámite de certificación es presencial?",
    a: "No. Hoy se gestiona de forma online, a través del portal de Conservación y Mantenimiento de Instalaciones y Fachadas, con usuario miBA nivel 3.",
  },
  {
    q: "¿Todos los edificios tienen la misma frecuencia de certificación?",
    a: "No. La frecuencia depende de la antigüedad del edificio: va desde cada 15 años para inmuebles de 15 a 25 años, hasta cada 4 años para edificios de más de 70 años. Por eso es clave que el administrador verifique qué plazo le corresponde a su consorcio.",
  },
]

/* ─── Periodicidad Data ─── */
const periodicidad = [
  { rango: "15 a 25 años", frecuencia: "Cada 15 años" },
  { rango: "Más de 25 a 35 años", frecuencia: "Cada 12 años" },
  { rango: "Más de 35 a 45 años", frecuencia: "Cada 10 años" },
  { rango: "Más de 45 a 55 años", frecuencia: "Cada 9 años" },
  { rango: "Más de 55 a 70 años", frecuencia: "Cada 5 años" },
  { rango: "Más de 70 años", frecuencia: "Cada 4 años" },
]

/* ─── Pasos del administrador ─── */
const pasos = [
  "Chequear la antigüedad del edificio y confirmar cuándo vence el último Certificado de Conservación presentado.",
  "Determinar si corresponde certificación completa o si el inmueble encuadra en algún supuesto de eximición — siempre con respaldo técnico, no por suposición.",
  "Contratar un profesional habilitado (CPAU, CPIC o CPII) para que haga la inspección de fachadas, balcones y elementos expuestos.",
  "Iniciar el trámite online en el portal de Instalaciones y Fachadas con usuario miBA nivel 3.",
  "Si el informe detecta patologías o riesgo, convertir el diagnóstico en un plan de obra concreto: alcance, prioridades, presupuesto y tiempos.",
]

/* ─── Fade-in wrapper ─── */
const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
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

export default function Ley257BlogPage() {
  const whatsappLink =
    "https://wa.me/5491126547271?text=Hola%20EFEMAQ,%20necesito%20asesoramiento%20sobre%20certificación%20de%20fachadas%20Ley%20257."
  const mailLink =
    "mailto:info@efemaq.com.ar?subject=Evaluación%20técnica%20de%20fachada%20-%20Ley%20257"

  return (
    <div className="w-full bg-[#111111] min-h-screen flex flex-col">
      <Navbar />

      {/* ════════════════════════════════════════════════════════════
          HERO TÉCNICO
      ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#006262] opacity-[0.07] blur-[140px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
          {/* Breadcrumb */}
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs font-inter text-gray-500 mb-8">
              <Link href="/" className="hover:text-[#00dfdf] transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#00dfdf] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-gray-400">Ley 257</span>
            </nav>
          </FadeIn>

          {/* Tag */}
          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/20 mb-6">
              <Scale size={14} className="text-[#00dfdf]" />
              <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                Normativa CABA
              </span>
            </div>
          </FadeIn>

          {/* H1 */}
          <FadeIn delay={0.1}>
            <h1 className="font-manrope text-3xl md:text-[2.65rem] font-extrabold text-white leading-[1.15] tracking-tight mb-6">
              Ley 257 y Ley 6116 en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfdf] to-[#10b981]">CABA</span>: cómo cumplir con el{" "}
              <strong className="text-white">Certificado de Conservación</strong> de{" "}
              <strong className="text-white">Fachadas</strong> y{" "}
              <strong className="text-white">Balcones</strong> en consorcios
            </h1>
          </FadeIn>

          {/* Bajada */}
          <FadeIn delay={0.15}>
            <p className="font-inter text-[17px] md:text-lg text-gray-400 leading-relaxed max-w-4xl">
              Si administrás un <strong className="text-gray-200">consorcio</strong> en la Ciudad de Buenos Aires, mantener las <strong className="text-gray-200">fachadas</strong> y los <strong className="text-gray-200">balcones</strong> en condiciones no es solo una cuestión estética: es una obligación legal con plazos definidos, trámite formal y consecuencias concretas si no se cumple. La <strong className="text-gray-200">Ley 257</strong> exige acreditar el estado de conservación de esos elementos mediante una <strong className="text-gray-200">certificación técnica</strong>, y la frecuencia depende de la antigüedad del edificio.
            </p>
          </FadeIn>

          {/* Meta info */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 mt-8 text-xs font-inter text-gray-500">
              <span className="flex items-center gap-1.5"><Clock size={13} /> 10 min de lectura</span>
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
              Resumen de la norma
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: FileText, label: "Qué exige", value: "Certificado de Conservación de fachadas, balcones y elementos expuestos" },
                { icon: CalendarClock, label: "Cada cuánto", value: "Según antigüedad: de cada 4 a cada 15 años" },
                { icon: HardHat, label: "Quién firma", value: "Profesional habilitado (CPAU, CPIC, CPII)" },
                { icon: ClipboardCheck, label: "Cómo se tramita", value: "Online vía portal miBA nivel 3 + validación del consejo profesional" },
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
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-6">
                Un frente que se deteriora no genera solo un problema visual. Genera desprendimientos, intimaciones del Gobierno de la Ciudad, obras de urgencia y gastos extraordinarios que podrían haberse evitado con anticipación. Lo mismo pasa con <strong className="text-white">balcones</strong>, barandas y revestimientos expuestos al espacio público. Por eso la <strong className="text-white">Ley 257</strong> en <strong className="text-white">CABA</strong> no debería leerse como un trámite más: para cualquier <strong className="text-white">administrador</strong>, es una herramienta de gestión preventiva que protege al edificio, a los vecinos y al propio consorcio.
              </p>

              {/* Bloque destacado */}
              <div className="relative bg-[#00dfdf]/[0.03] border-l-2 border-[#00dfdf] rounded-r-xl px-6 py-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#00dfdf] mt-0.5 shrink-0" />
                  <p className="font-inter text-[15px] md:text-base text-gray-300 leading-relaxed">
                    <strong className="text-white">Punto clave:</strong> la obligación no se limita al &ldquo;frente lindo&rdquo; del edificio. La norma toma una definición más amplia y exige evaluar todos los elementos que puedan comprometer la seguridad y el estado de conservación edilicia.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── IMAGEN PLACEHOLDER 1 ── */}
          <FadeIn>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-14 bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
              <div className="text-center px-6">
                <Building2 size={48} className="text-[#00dfdf] opacity-30 mx-auto mb-4" />
                <p className="text-xs font-inter text-gray-500 max-w-md">
                  Inspector técnico observando balcones y frente de edificio en CABA. Reemplazar con imagen real — estética corporativa, realista.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── H2: Qué exige la Ley 257 ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué exige la Ley 257 para <strong>fachadas</strong> y <strong>balcones</strong> en CABA
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  La norma define &ldquo;fachada&rdquo; de forma bastante más amplia de lo que la mayoría imagina. No se limita al frente visible desde la calle: abarca todo lo que linda con la Línea Oficial, incluyendo frente, contrafrente y laterales que dan al espacio público. Y obliga al propietario a mantener el inmueble —o cualquiera de sus partes— en condiciones de uso, funcionamiento, seguridad, higiene, salubridad y estética.
                </p>
                <p>
                  Cuando un <strong className="text-white">consorcio</strong> piensa en &ldquo;cumplir con la <strong className="text-white">Ley 257</strong>&rdquo;, muchas veces se queda con la idea de una revisión superficial del frente. Pero la obligación va más allá. La ley menciona expresamente <strong className="text-white">balcones</strong>, terrazas, azoteas, barandas, balaustres, marquesinas, toldos, antepechos, muretes, carteles, maceteros, revestimientos, cerramientos, conductos e instalaciones. Y aclara algo importante: el listado no es taxativo. Es decir, puede haber otros elementos que también necesiten verificación.
                </p>
                <p>
                  ¿Qué implica esto en la práctica? Que el <strong className="text-white">Certificado de Conservación</strong> no es un sello burocrático. Es una <strong className="text-white">inspección técnica</strong> con criterio de riesgo, orientada a detectar patologías visibles, fijaciones deterioradas, deformaciones, revestimientos inestables, elementos sueltos o cualquier condición que pueda derivar en un incidente. La propia ley indica que la verificación debe incluir fijaciones, niveles, escuadra y estado de cargas de cada componente.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Cada cuánto tiempo ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Cada cuánto tiempo debe certificarse una fachada
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-8">
                <p>
                  Un error que se repite mucho en <strong className="text-white">consorcios</strong>: asumir que todos los edificios certifican con la misma frecuencia. No funciona así. La vigencia del <strong className="text-white">Certificado de Conservación</strong> está atada a la antigüedad del inmueble, y las diferencias son grandes. El esquema oficial vigente es el siguiente:
                </p>
              </div>

              {/* Tabla de periodicidad */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden mb-8">
                <div className="grid grid-cols-2 bg-[#00dfdf]/5 border-b border-white/10">
                  <div className="px-5 py-3 text-xs font-manrope font-bold text-[#00dfdf] uppercase tracking-wider">
                    Antigüedad del edificio
                  </div>
                  <div className="px-5 py-3 text-xs font-manrope font-bold text-[#00dfdf] uppercase tracking-wider">
                    Frecuencia de certificación
                  </div>
                </div>
                {periodicidad.map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 border-b border-white/5 last:border-b-0 ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}`}
                  >
                    <div className="px-5 py-4 font-inter text-sm text-gray-300">{row.rango}</div>
                    <div className="px-5 py-4 font-inter text-sm text-white font-medium">{row.frecuencia}</div>
                  </div>
                ))}
              </div>

              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                Para cualquier <strong className="text-white">administrador</strong>, esto tiene una consecuencia directa: no alcanza con saber que el edificio &ldquo;alguna vez cumplió&rdquo;. Hay que tener claro cuándo vence el certificado vigente, qué antigüedad toma la autoridad de control y con cuánta anticipación conviene activar el relevamiento. Arrancar tarde significa quedar atado a tiempos ajustados, profesionales sin disponibilidad y decisiones improvisadas.
              </p>
            </section>
          </FadeIn>

          {/* ── H2: Quién puede emitir el informe ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Quién puede emitir el informe y cómo se tramita el certificado
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  Esto no lo puede resolver internamente el <strong className="text-white">consorcio</strong> ni improvisarse con una recorrida informal. La <strong className="text-white">Ley 257</strong> exige que un <strong className="text-white">profesional habilitado</strong> de la construcción inspeccione el inmueble y confeccione el Informe Técnico. Ese profesional tiene que estar matriculado en su respectivo consejo: la página oficial del trámite menciona expresamente CPAU, CPIC y CPII.
                </p>
                <p>
                  El circuito tiene pasos claros. Primero, el <strong className="text-white">administrador</strong> o propietario inicia el proceso desde el portal de Conservación y Mantenimiento de Instalaciones y Fachadas, con usuario miBA nivel 3. Después designa al profesional. El profesional ingresa al portal de <strong className="text-white">fachadas</strong>, carga el relevamiento y confecciona el informe técnico. Cuando el consejo profesional valida la encomienda, se emite el <strong className="text-white">Certificado de Conservación</strong> con <strong className="text-white">código QR</strong>, listo para descarga.
                </p>
                <p>
                  No es solo &ldquo;hacer una visita al edificio&rdquo;. El proceso completo combina <strong className="text-white">inspección técnica</strong> en campo, intervención de un profesional habilitado, carga formal en plataforma, validación del consejo y emisión del certificado. Saltarse cualquiera de esos eslabones deja al <strong className="text-white">consorcio</strong> sin el respaldo documental que la norma exige.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Eximición ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                <strong>Eximición</strong>: cuándo puede existir y por qué no debe presumirse
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  La <strong className="text-white">Ley 257</strong> contempla supuestos de <strong className="text-white">eximición</strong>. La página del trámite informa que existen solicitudes tanto por característica edilicia como por antigüedad. Pero hay un detalle que muchos pasan por alto: la eximición no se presume. Hay que tramitarla formalmente y queda sujeta al análisis de la autoridad competente.
                </p>
                <p>
                  Lo que no conviene hacer es dar por sentado que &ldquo;al edificio seguro no le corresponde&rdquo; y quedarse sin hacer nada. El camino correcto para un <strong className="text-white">consorcio</strong> es verificar —con respaldo técnico— si el inmueble encuadra o no en los supuestos de <strong className="text-white">eximición</strong>, y si corresponde, gestionarla por la vía formal. Decidir eso sin criterio profesional puede dejar al <strong className="text-white">administrador</strong> expuesto a observaciones que se podrían haber evitado.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Qué pasa si detecta patologías ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué pasa si el informe detecta patologías o riesgo
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  Acá es donde la <strong className="text-white">certificación de fachadas</strong> muestra su verdadero valor. Cuando la <strong className="text-white">inspección técnica</strong> detecta fisuras, desprendimientos, corrosión, barandas comprometidas o revestimientos inestables, el problema ya dejó de ser normativo: es una cuestión de seguridad, responsabilidad civil y planificación de obra. La peor respuesta es &ldquo;presentar algo para salir del paso&rdquo;. Lo que necesita el <strong className="text-white">consorcio</strong> es convertir ese diagnóstico en un plan de intervención concreto y priorizado.
                </p>
                <p>
                  Y acá es donde muchos <strong className="text-white">administradores</strong> pierden tiempo y presupuesto. Porque tener un informe que dice &ldquo;hay problemas&rdquo; no resuelve nada si después no hay capacidad de traducirlo en un esquema operativo: qué se repara primero, con qué alcance, a qué costo y en qué plazos. Un <strong className="text-white">Certificado de Conservación</strong> que se integra con un plan de mantenimiento real protege al edificio. Uno que queda archivado como trámite cumplido no sirve para mucho. Este enfoque es consistente con lo que la propia AGC promueve en materia de conservación de <strong className="text-white">fachadas</strong> e instalaciones.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── IMAGEN PLACEHOLDER 2 ── */}
          <FadeIn>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-14 bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
              <div className="text-center px-6">
                <AlertTriangle size={48} className="text-[#00dfdf] opacity-30 mx-auto mb-4" />
                <p className="text-xs font-inter text-gray-500 max-w-md">
                  Detalle técnico de balcón con signos de desgaste, baranda, fisura o desprendimiento superficial. Reemplazar con imagen real — estética profesional y realista.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── H2: Por qué conviene resolverlo antes ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Por qué conviene resolverlo antes de una urgencia
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  Los gastos más grandes en un edificio rara vez vienen del mantenimiento planificado. Vienen de llegar tarde: deterioro visible que ya no puede esperar, reclamos vecinales, riesgo sobre la vía pública, obras que hay que resolver con urgencia. En ese punto, la discusión entre copropietarios ya no es &ldquo;cómo cumplimos bien con la <strong className="text-white">Ley 257</strong>&rdquo; sino &ldquo;cómo resolvemos esto sin frenar la operación del edificio ni votar una derrama extraordinaria&rdquo;.
                </p>
                <p>
                  Anticiparse cambia todo. Un relevamiento hecho a tiempo permite encuadrar al edificio en el esquema de <strong className="text-white">certificación de fachadas</strong> vigente, dejar trazabilidad documental y transformar una urgencia potencial en un trabajo técnicamente ordenado. Para el <strong className="text-white">administrador</strong>, eso reduce fricción con propietarios, evita improvisaciones y genera un respaldo concreto para justificar cada decisión ante la asamblea.
                </p>
                <p>
                  Otro dato que conviene tener presente: la propia <strong className="text-white">Ley 257</strong> aclara que sus obligaciones no excluyen la aplicación de otras penalidades vinculadas con seguridad, bienestar y estética urbana. Es decir, cumplir fuera de término o de manera incompleta no neutraliza el resto del riesgo legal.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Qué debería hacer hoy ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué debería hacer hoy un <strong>administrador</strong> de consorcio
              </h2>
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-8">
                Esperar a que llegue una intimación o a que aparezca un desprendimiento es la peor estrategia. Lo más razonable —y lo que mejor protege al <strong className="text-white">consorcio</strong>— es seguir una secuencia clara:
              </p>

              {/* Pasos */}
              <div className="space-y-4 mb-8">
                {pasos.map((paso, i) => (
                  <div key={i} className="flex items-start gap-4 bg-[#0a0a0a] border border-white/5 rounded-xl px-5 py-4">
                    <div className="w-8 h-8 rounded-full bg-[#00dfdf]/10 border border-[#00dfdf]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-manrope font-bold text-[#00dfdf]">{i + 1}</span>
                    </div>
                    <p className="font-inter text-[15px] md:text-base text-gray-300 leading-relaxed">{paso}</p>
                  </div>
                ))}
              </div>

              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                Esa secuencia no solo ordena el cumplimiento de la <strong className="text-white">Ley 257</strong>: mejora la gestión del edificio en su conjunto. Un frente bien mantenido reduce la exposición normativa, protege el patrimonio común, cuida la imagen del <strong className="text-white">consorcio</strong> y evita esas urgencias que siempre terminan costando el doble.
              </p>
            </section>
          </FadeIn>

          {/* ════════════════════════════════════════════════════════════
              FAQ
          ════════════════════════════════════════════════════════════ */}
          <FadeIn>
            <section className="mb-16">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                Preguntas frecuentes sobre la Ley 257 y fachadas en CABA
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
                      <p className="font-inter text-[15px] text-gray-400 leading-relaxed">{faq.a}</p>
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
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#006262]/20 via-[#0a0a0a] to-[#006262]/10 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#00dfdf] opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

              <div className="relative border border-[#00dfdf]/20 rounded-2xl px-6 md:px-12 py-10 md:py-14 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/20 mb-6">
                  <Shield size={14} className="text-[#00dfdf]" />
                  <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                    Cumplimiento integral
                  </span>
                </div>

                <h2 className="font-manrope text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4">
                  ¿Tu consorcio tiene que cumplir con la Ley 257?
                </h2>
                <p className="font-inter text-base text-gray-400 leading-relaxed max-w-2xl mx-auto mb-4">
                  En EFEMAQ hacemos el relevamiento, coordinamos la <strong className="text-gray-200">inspección técnica</strong> con profesionales habilitados, ordenamos la documentación y te ayudamos a convertir el diagnóstico en un plan de acción concreto para el edificio.
                </p>
                <p className="font-inter text-sm text-gray-500 max-w-xl mx-auto mb-8">
                  Si administrás un edificio en <strong className="text-gray-300">CABA</strong> y necesitás poner al día la <strong className="text-gray-300">certificación de fachadas y balcones</strong>, en EFEMAQ te ayudamos a resolverlo de punta a punta: cumplimiento normativo, diagnóstico técnico y plan de obra.
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
                href="/"
                className="inline-flex items-center gap-2 text-sm font-inter text-gray-500 hover:text-[#00dfdf] transition-colors"
              >
                <ArrowLeft size={14} />
                Volver al inicio
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