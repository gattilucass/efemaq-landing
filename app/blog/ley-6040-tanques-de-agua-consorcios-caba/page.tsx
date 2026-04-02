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
  Droplets,
  AlertTriangle,
  ClipboardCheck,
  CalendarClock,
  FlaskConical,
  ShieldAlert,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  Search,
  Wrench,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"

/* ─── FAQ Data ─── */
const faqs = [
  {
    q: "¿La limpieza del tanque de agua sigue siendo obligatoria cada 6 meses en CABA?",
    a: "No con la Ley 6040. El viejo esquema de limpieza semestral automática (Ordenanza 45.593) fue derogado. Hoy la obligación central es el análisis bacteriológico y físico-químico anual, más el control periódico de las instalaciones. La limpieza y desinfección pasa a ser obligatoria solo cuando el resultado del análisis no cumple con los estándares del ERAS — y ahí el plazo es de 15 días corridos.",
  },
  {
    q: "¿Quién es responsable del cumplimiento: el consorcio o el administrador?",
    a: "Ambos. La ley menciona al consorcio de propietarios y/o al administrador como sujetos obligados. Eso incluye definir el plan de mantenimiento, controlar las instalaciones, hacer el análisis anual y actuar cuando el agua no cumple los estándares.",
  },
  {
    q: "¿Hace falta dejar constancia en el Libro de Actas?",
    a: "Sí. La Ley 6040 establece que la periodicidad del plan de limpieza, mantenimiento y desinfección debe constar en el Libro de Actas de Asamblea. No documentarlo es un incumplimiento en sí mismo.",
  },
  {
    q: "¿Qué pasa si el análisis del agua sale mal?",
    a: "Si el resultado no se ajusta a los estándares del ERAS, el consorcio tiene que proceder a la limpieza y desinfección de los tanques dentro de los 15 días corridos. No hacerlo dentro de ese plazo expone al edificio a multas más severas.",
  },
  {
    q: "¿Cuánto pueden salir las multas por incumplir la Ley 6040?",
    a: "De 500 a 2.000 unidades fijas (~$400.000–$1.600.000 ARS) por omitir el análisis anual o la limpieza. De 1.000 a 3.000 u.f. (~$800.000–$2.400.000 ARS) si no se limpia tras detectar agua fuera de norma. Y de 2.500 a 5.000 u.f. (~$2.000.000–$4.000.000 ARS) por falsear documentación. Referencia: segundo semestre 2025.",
  },
]

/* ─── Sanciones Data ─── */
const sanciones = [
  {
    infraccion: "Omitir limpieza/desinfección y/o análisis anual",
    multa: "500 – 2.000 u.f.",
    ars: "~$400.000 – $1.600.000",
  },
  {
    infraccion: "No limpiar tras detectar mala calidad del agua",
    multa: "1.000 – 3.000 u.f.",
    ars: "~$800.000 – $2.400.000",
  },
  {
    infraccion: "Falsear o alterar datos o documentación",
    multa: "2.500 – 5.000 u.f.",
    ars: "~$2.000.000 – $4.000.000",
  },
]

/* ─── Pasos del administrador ─── */
const pasosAdmin = [
  {
    icon: FlaskConical,
    title: "Confirmar si el análisis anual del agua está al día",
    text: "Lo primero es saber si el consorcio ya hizo el análisis bacteriológico y físico-químico del período vigente. Si no existe, ya hay un incumplimiento potencial frente a la Ley 6040.",
  },
  {
    icon: BookOpen,
    title: "Verificar que el plan de mantenimiento esté asentado en actas",
    text: "La ley exige que la periodicidad de limpieza, mantenimiento y desinfección conste en el Libro de Actas de Asamblea. Sin esa constancia, el consorcio pierde respaldo documental y queda expuesto.",
  },
  {
    icon: Search,
    title: "Revisar el estado real de los tanques y las instalaciones",
    text: "No alcanza con que \"salga agua\". La obligación incluye controlar tapas, cierres, hermeticidad y condiciones generales de conservación del sistema, no solo la calidad del agua.",
  },
  {
    icon: Wrench,
    title: "Limpiar y desinfectar si el análisis muestra desvíos",
    text: "Cuando el resultado no cumple los estándares del ERAS, el plazo es concreto: 15 días corridos para completar la limpieza y desinfección de los tanques. No hay margen para demorar.",
  },
  {
    icon: ClipboardCheck,
    title: "Documentar cada paso del proceso",
    text: "La ley sanciona específicamente el falseamiento o alteración de documentación. Guardar análisis, registros de intervención y actas de asamblea no es una formalidad: es parte del cumplimiento normativo.",
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

export default function Ley6040BlogPage() {
  const whatsappLink =
    "https://wa.me/5491126547271?text=Hola%20EFEMAQ,%20necesito%20asesoramiento%20sobre%20tanques%20de%20agua%20y%20Ley%206040."
  const mailLink =
    "mailto:info@efemaq.com.ar?subject=Evaluación%20técnica%20tanques%20de%20agua%20-%20Ley%206040"

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
              <Link href="/" className="hover:text-[#00dfdf] transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#00dfdf] transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-400">Ley 6040</span>
            </nav>
          </FadeIn>

          {/* Tag */}
          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/20 mb-6">
              <Droplets size={14} className="text-[#00dfdf]" />
              <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                Normativa CABA
              </span>
            </div>
          </FadeIn>

          {/* H1 */}
          <FadeIn delay={0.1}>
            <h1 className="font-manrope text-3xl md:text-[2.65rem] font-extrabold text-white leading-[1.15] tracking-tight mb-6">
              <strong className="text-white">Ley 6040</strong> en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfdf] to-[#10b981]">
                CABA
              </span>
              : qué deben hacer los <strong className="text-white">consorcios</strong> con los{" "}
              <strong className="text-white">tanques de agua</strong> para cumplir y evitar sanciones
            </h1>
          </FadeIn>

          {/* Bajada */}
          <FadeIn delay={0.15}>
            <p className="font-inter text-[17px] md:text-lg text-gray-400 leading-relaxed max-w-4xl">
              Si administrás un edificio en la Ciudad de Buenos Aires, el control de los <strong className="text-gray-200">tanques de agua</strong> no es opcional: es una obligación que tiene plazos, multas y un régimen sancionatorio específico. La <strong className="text-gray-200">Ley 6040</strong> cambió las reglas del juego para los <strong className="text-gray-200">consorcios</strong>, y muchos <strong className="text-gray-200">administradores</strong> todavía trabajan con criterios del sistema anterior. Esta guía explica qué exige hoy la norma, cuándo corresponde hacer el <strong className="text-gray-200">análisis del agua</strong>, cuándo limpiar y qué pasa si no se cumple.
            </p>
          </FadeIn>

          {/* Meta info */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 mt-8 text-xs font-inter text-gray-500">
              <span className="flex items-center gap-1.5">
                <Clock size={13} /> 12 min de lectura
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1.5">
                <FileText size={13} /> Guía técnica
              </span>
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
                {
                  icon: FileText,
                  label: "Qué exige la ley",
                  value:
                    "Control periódico de instalaciones, análisis anual del agua y limpieza correctiva si no cumple estándares",
                },
                {
                  icon: CalendarClock,
                  label: "Cuándo analizar",
                  value:
                    "Análisis bacteriológico y físico-químico como mínimo una vez al año",
                },
                {
                  icon: Wrench,
                  label: "Cuándo limpiar",
                  value:
                    "Dentro de los 15 días corridos si el resultado no cumple estándares del ERAS",
                },
                {
                  icon: ShieldAlert,
                  label: "Qué multas existen",
                  value:
                    "De 500 a 5.000 unidades fijas según la infracción (Ley 451)",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-lg bg-[#00dfdf]/5 border border-[#00dfdf]/10 shrink-0">
                    <item.icon size={16} className="text-[#00dfdf]" />
                  </div>
                  <div>
                    <span className="block text-xs font-manrope font-bold text-gray-500 uppercase tracking-wider mb-1">
                      {item.label}
                    </span>
                    <span className="block text-sm font-inter text-gray-300 leading-relaxed">
                      {item.value}
                    </span>
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
                Durante años, la lógica fue simple: cada seis meses se vaciaba el tanque, se limpiaba y se desinfectaba. Así funcionaban todos los edificios en CABA. Pero la <strong className="text-white">Ley 6040</strong> cambió ese criterio. Hoy, el eje ya no es una limpieza automática en intervalos fijos, sino un sistema que se apoya en tres pilares: control periódico de las instalaciones, <strong className="text-white">análisis bacteriológico y físico-químico</strong> del agua al menos una vez al año, y <strong className="text-white">limpieza y desinfección</strong> obligatoria solo cuando los resultados no cumplen con los estándares del ERAS.
              </p>
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-6">
                Para cualquier <strong className="text-white">administrador</strong>, esto redefine la conversación. Ya no se trata de &ldquo;hacer la limpieza del tanque para quedarse tranquilo&rdquo;. Se trata de gestionar un componente crítico del edificio con criterio técnico, documentación seria y capacidad de reacción. Porque cuando el <strong className="text-white">consorcio</strong> no controla, no analiza o actúa fuera de término, el problema pasa de ser operativo a ser también legal, económico y sanitario.
              </p>

              {/* Bloque destacado */}
              <div className="relative bg-[#00dfdf]/[0.03] border-l-2 border-[#00dfdf] rounded-r-xl px-6 py-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#00dfdf] mt-0.5 shrink-0" />
                  <p className="font-inter text-[15px] md:text-base text-gray-300 leading-relaxed">
                    <strong className="text-white">Punto clave:</strong> en CABA, el <strong className="text-white">consorcio</strong> debe controlar periódicamente las instalaciones, realizar al menos una vez al año un <strong className="text-white">análisis bacteriológico y físico-químico</strong> del agua, y si el resultado no cumple con los estándares del <strong className="text-white">ERAS</strong>, debe realizar la <strong className="text-white">limpieza y desinfección</strong> dentro de los 15 días corridos.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── IMAGEN PLACEHOLDER 1 ── */}
          <FadeIn>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-14 bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
              <div className="text-center px-6">
                <Droplets size={48} className="text-[#00dfdf] opacity-30 mx-auto mb-4" />
                <p className="text-xs font-inter text-gray-500 max-w-md">
                  Sala técnica o tanque de agua de edificio en contexto real. Reemplazar con imagen real — estética corporativa, limpia, profesional.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── H2: Qué cambió con la Ley 6040 ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué cambió con la <strong>Ley 6040</strong> y por qué muchos consorcios todavía están desactualizados
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  La <strong className="text-white">Ley 6040</strong> fue sancionada en 2018 y hoy está consolidada en el Digesto Jurídico de CABA. Regula la <strong className="text-white">limpieza y desinfección de tanques de agua</strong> en inmuebles sometidos al régimen de propiedad horizontal, con un objetivo claro: garantizar que el agua almacenada sea apta para consumo humano.
                </p>
                <p>
                  El cambio más importante respecto al régimen anterior fue de enfoque. La vieja Ordenanza 45.593 —que la <strong className="text-white">Ley 6040</strong> derogó expresamente— obligaba a vaciar y limpiar <strong className="text-white">tanques</strong> de forma automática y generalizada. El modelo actual es distinto: se basa en el <strong className="text-white">análisis</strong> anual del agua, el control periódico de las instalaciones y la intervención correctiva cuando los resultados lo justifican. Es un sistema que prioriza datos sobre costumbre.
                </p>
                <p>
                  ¿Por qué sigue habiendo tanta confusión? Porque muchos proveedores, administraciones e incluso consorcistas repiten criterios del sistema viejo. Siguen hablando de &ldquo;limpieza semestral obligatoria&rdquo; cuando esa obligación ya no existe en esos términos. La referencia normativa correcta hoy es la <strong className="text-white">Ley 6040</strong>, y conviene tenerlo claro para no pagar intervenciones innecesarias ni quedar expuesto por cumplir con una norma que ya no rige.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Qué obligaciones tiene el consorcio ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué obligaciones concretas tiene hoy el consorcio
              </h2>
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-8">
                La <strong className="text-white">Ley 6040</strong> no pide una sola acción puntual: pide un esquema de gestión. El <strong className="text-white">consorcio</strong> y/o su <strong className="text-white">administrador</strong> deben definir un plan de limpieza, mantenimiento y desinfección de los <strong className="text-white">tanques de agua</strong>, y esa periodicidad tiene que quedar asentada en el <strong className="text-white">Libro de Actas</strong> de Asamblea. No es opcional.
              </p>

              {/* Obligaciones como cards */}
              <div className="space-y-6">
                {/* Obligación 1 */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-7">
                  <h3 className="font-manrope text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#00dfdf]/10 border border-[#00dfdf]/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-manrope font-bold text-[#00dfdf]">1</span>
                    </span>
                    Controlar y revisar periódicamente las instalaciones
                  </h3>
                  <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] pl-11">
                    No alcanza con que el agua &ldquo;salga bien&rdquo; en un momento dado. La ley exige revisar periódicamente las instalaciones para mantener la hermeticidad y garantizar condiciones aptas para consumo humano. Eso significa chequear tapas, cierres, estado general del sistema, protección contra contaminación y condiciones de conservación del conjunto — no solo el líquido.
                  </p>
                </div>

                {/* Obligación 2 */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-7">
                  <h3 className="font-manrope text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#00dfdf]/10 border border-[#00dfdf]/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-manrope font-bold text-[#00dfdf]">2</span>
                    </span>
                    Realizar un análisis bacteriológico y físico-químico al menos una vez al año
                  </h3>
                  <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] pl-11">
                    Esta es la obligación más concreta de la <strong className="text-white">Ley 6040</strong>. El <strong className="text-white">consorcio</strong> debe hacer un <strong className="text-white">análisis bacteriológico y físico-químico</strong> del agua de los tanques como mínimo una vez al año. Aunque no haya problemas visibles, aunque nadie se haya quejado: el análisis tiene que existir. Sin ese respaldo, el edificio ya está en incumplimiento.
                  </p>
                </div>

                {/* Obligación 3 */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-7">
                  <h3 className="font-manrope text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#00dfdf]/10 border border-[#00dfdf]/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-manrope font-bold text-[#00dfdf]">3</span>
                    </span>
                    Limpiar y desinfectar si el resultado no cumple con los estándares
                  </h3>
                  <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] pl-11">
                    Si el <strong className="text-white">análisis</strong> arroja resultados fuera de norma, la ley no deja margen de interpretación. Cuando la calidad del agua no se ajusta a los estándares del <strong className="text-white">ERAS</strong> (o del organismo que lo reemplace), el <strong className="text-white">consorcio</strong> o su <strong className="text-white">administrador</strong> tiene que ejecutar la <strong className="text-white">limpieza y desinfección</strong> de los tanques en un plazo máximo de 15 días corridos. No cumplir ese plazo agrava la infracción y sube la multa.
                  </p>
                </div>

                {/* Obligación 4 */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-7">
                  <h3 className="font-manrope text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#00dfdf]/10 border border-[#00dfdf]/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-manrope font-bold text-[#00dfdf]">4</span>
                    </span>
                    Definir una política propia de mantenimiento, no improvisar
                  </h3>
                  <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] pl-11">
                    La <strong className="text-white">Ley 6040</strong> también le da al <strong className="text-white">consorcio</strong> la potestad de definir su propio plan de mantenimiento, siempre que quede registrado en el <strong className="text-white">Libro de Actas</strong>. Esto es clave: el análisis anual es un piso obligatorio, pero el edificio puede decidir una frecuencia mayor de intervención si su historial, sus instalaciones o un criterio preventivo así lo justifican. Es una herramienta de gestión, no solo una exigencia.
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Impacto en expensas ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Por qué este tema impacta directo en expensas, presupuesto y riesgo operativo
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  Este tema no es solo sanitario — también pega directo en el bolsillo del <strong className="text-white">consorcio</strong>. Cuando se sancionó la <strong className="text-white">Ley 6040</strong>, la Ciudad reconoció que el modelo anterior forzaba vaciados semestrales generalizados, generando un impacto económico innecesario en los edificios y un desperdicio enorme de agua potable. La nueva norma busca que las decisiones de intervención estén respaldadas por datos, no por inercia.
                </p>
                <p>
                  ¿Qué significa esto para el <strong className="text-white">administrador</strong>? Que el objetivo no es gastar menos a cualquier precio, sino gastar con criterio. Un edificio que hace su <strong className="text-white">análisis</strong> anual, documenta los resultados y decide en función del estado real del agua queda mucho mejor posicionado. Evita dos extremos igual de costosos: pagar limpiezas innecesarias por rutina, o llegar tarde y tener que resolver una emergencia sanitaria sin margen para planificar ni negociar.
                </p>
                <p>
                  La mejor estrategia no es &ldquo;limpiar por costumbre&rdquo; ni &ldquo;esperar a que alguien se queje&rdquo;. Es construir un circuito de trazabilidad técnica: plan aprobado, revisión periódica, análisis documentado e intervención correctiva cuando corresponda. Frente a propietarios, consejo o asamblea, ese enfoque siempre es más fácil de defender.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Sanciones ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué sanciones puede enfrentar un consorcio si no cumple
              </h2>
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-8">
                Las sanciones no son simbólicas. La <strong className="text-white">Ley 6040</strong> modificó el régimen de la Ley 451 e incorporó multas expresadas en <strong className="text-white">unidades fijas</strong> que escalan según la gravedad de la infracción:
              </p>

              {/* Tabla de sanciones */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden mb-3">
                {/* Header — columnas fijas para garantizar alineación */}
                <div className="grid grid-cols-[1fr_132px_148px] items-center bg-[#00dfdf]/5 border-b border-white/10">
                  <div className="px-5 py-3 text-xs font-manrope font-bold text-[#00dfdf] uppercase tracking-wider">
                    Infracción
                  </div>
                  <div className="px-4 py-3 text-xs font-manrope font-bold text-[#00dfdf] uppercase tracking-wider text-center">
                    Unidades fijas
                  </div>
                  <div className="px-5 py-3 text-xs font-manrope font-bold text-[#00dfdf] uppercase tracking-wider text-right">
                    Ref. en ARS
                  </div>
                </div>
                {sanciones.map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[1fr_132px_148px] items-center border-b border-white/5 last:border-b-0 ${
                      i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                    }`}
                  >
                    <div className="px-5 py-4 font-inter text-sm text-gray-300 leading-snug">
                      {row.infraccion}
                    </div>
                    <div className="px-4 py-4 font-inter text-sm text-white font-semibold text-center">
                      {row.multa}
                    </div>
                    <div className="px-5 py-4 font-inter text-xs text-gray-400 text-right leading-snug">
                      {row.ars}
                    </div>
                  </div>
                ))}
              </div>
              {/* Nota al pie */}
              <p className="font-inter text-xs text-gray-600 leading-relaxed mb-8">
                * 1 unidad fija = $798,51 ARS (vigente desde sep. 2025, Ley 451 CABA). Se actualiza semestralmente. Montos en ARS son de referencia.
              </p>

              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                Con estos montos sobre la mesa, trabajar con documentación seria, resultados verificables y proveedores que entiendan el peso legal de lo que firman ya no es una opción: es una necesidad para cualquier <strong className="text-white">administrador</strong> profesional.
              </p>
            </section>
          </FadeIn>

          {/* ── H2: Qué debería pedir un administrador ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué debería pedir un administrador para gestionar bien este tema
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  La ley fija las obligaciones generales, pero en la práctica un <strong className="text-white">administrador</strong> necesita armar una carpeta técnica mínima para tener respaldo real. Eso incluye: el <strong className="text-white">análisis</strong> anual vigente, un registro de la revisión del sistema de <strong className="text-white">tanques</strong>, los comprobantes de <strong className="text-white">limpieza y desinfección</strong> cuando se haya ejecutado, y la periodicidad definida en el <strong className="text-white">Libro de Actas</strong> de Asamblea. Este circuito documental es coherente con lo que la <strong className="text-white">Ley 6040</strong> exige y con el enfoque que el GCBA recomienda en su manual consorcial.
                </p>
                <p>
                  Tener esto ordenado también protege al edificio puertas adentro. Cuando aparece un reclamo de copropietarios, una auditoría o una emergencia, contar con documentación clara permite justificar cada decisión: por qué se intervino, por qué todavía no correspondía intervenir, y con qué datos se tomó esa decisión. Eso elimina discusiones estériles y le da al <strong className="text-white">administrador</strong> un respaldo objetivo frente a la asamblea.
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
                  Intervención profesional sobre tanque o sala de bombas, enfoque técnico y realista. Reemplazar con imagen real.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── H2: Qué errores cometen ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué errores cometen muchos consorcios al gestionar sus tanques de agua
              </h2>
              <div className="space-y-5 font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85]">
                <p>
                  El primero: confundir costumbre con cumplimiento. Que un edificio &ldquo;siempre lo haya hecho así&rdquo; no significa que hoy esté bien parado. La <strong className="text-white">Ley 6040</strong> exige plan documentado, <strong className="text-white">análisis</strong> anual y respuesta frente a resultados fuera de norma. Repetir una rutina sin datos ni criterio técnico no es cumplir — es improvisar con apariencia de orden.
                </p>
                <p>
                  El segundo: pensar que con una limpieza cada tanto el tema está resuelto. La norma habla de control periódico de las instalaciones y de asegurar la hermeticidad del sistema. Si el <strong className="text-white">tanque</strong> se limpió pero las tapas están en mal estado, los cierres no sellan o hay exposición a contaminantes, el edificio no resolvió nada de fondo.
                </p>
                <p>
                  El tercero: esperar a que aparezca un conflicto para actuar. Cuando el <strong className="text-white">consorcio</strong> reacciona recién después de un resultado adverso, un reclamo vecinal o una intimación, el margen para decidir se achica y los costos se multiplican. Gestionar preventivamente —revisando, analizando y documentando a tiempo— siempre sale más barato y genera menos desgaste que resolver urgencias sobre la marcha.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* ── H2: Qué debería hacer hoy un administrador ── */}
          <FadeIn>
            <section className="mb-14">
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                Qué debería hacer hoy un <strong>administrador</strong> de consorcio
              </h2>
              <p className="font-inter text-[17px] md:text-lg text-gray-300 leading-[1.85] mb-8">
                El camino más ordenado pasa por cinco acciones concretas:
              </p>

              {/* Pasos con íconos */}
              <div className="space-y-4 mb-8">
                {pasosAdmin.map((paso, i) => (
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
                Preguntas frecuentes sobre tanques de agua y Ley 6040 en CABA
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
                  ¿Tu consorcio necesita ordenar el cumplimiento de la Ley 6040?
                </h2>
                <p className="font-inter text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-4">
                  En EFEMAQ trabajamos con <strong className="text-gray-200">administradores</strong> y edificios para ordenar el control de <strong className="text-gray-200">tanques de agua</strong> con criterio técnico, respaldo documental y una lógica clara de mantenimiento preventivo.
                </p>
                <p className="font-inter text-sm text-gray-500 max-w-xl mx-auto mb-8">
                  Si administrás un edificio en <strong className="text-gray-300">CABA</strong> y necesitás poner al día el cumplimiento de la <strong className="text-gray-300">Ley 6040</strong>, en EFEMAQ te ayudamos a transformar la obligación legal en una gestión profesional: análisis, documentación, intervención y trazabilidad completa.
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
