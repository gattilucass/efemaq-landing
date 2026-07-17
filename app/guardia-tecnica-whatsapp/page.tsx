"use client"

import {
  ArrowRight,
  Building2,
  Check,
  ClipboardCheck,
  Clock3,
  Droplets,
  Flame,
  Headphones,
  KeyRound,
  MessageCircle,
  MoonStar,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRoundCheck,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

import Footer from "@/components/footer"
import GuardiaLeadForm from "@/components/guardia-lead-form"
import Navbar from "@/components/navbar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const PILLARS = [
  {
    icon: Clock3,
    title: "Atención 24/7",
    text: "El canal está disponible todo el día. La cobertura humana se activa en los horarios acordados con cada administradora.",
  },
  {
    icon: UserRoundCheck,
    title: "Soporte humano",
    text: "Los casos que requieren asistencia inmediata son evaluados y gestionados por una persona de guardia.",
  },
  {
    icon: SlidersHorizontal,
    title: "Parametrizable",
    text: "Edificios, horarios, criticidad, responsables y proveedores se configuran según la operación de cada cartera.",
  },
]

const SETTINGS = [
  "Días y horarios de cobertura",
  "Edificios y domicilios habilitados",
  "Consultas administrativas y urgencias",
  "Criterios de criticidad",
  "Responsables y escalamiento",
  "Proveedores propios, de EFEMAQ o mixtos",
]

const TRADES = [
  { icon: Droplets, label: "Agua y desagües" },
  { icon: Wrench, label: "Destapaciones" },
  { icon: Zap, label: "Electricidad" },
  { icon: Flame, label: "Gas" },
  { icon: KeyRound, label: "Cerraduras y puertas" },
  { icon: Building2, label: "Ascensores" },
]

const FAQ = [
  {
    q: "¿El bot está disponible las 24 horas?",
    a: "Sí. El canal puede recibir mensajes las 24 horas, todos los días. La atención humana se organiza dentro del horario de cobertura que EFEMAQ acuerda con cada administradora.",
  },
  {
    q: "¿Hay una persona detrás de la atención?",
    a: "Sí. La automatización reúne y ordena la información, pero los casos que requieren asistencia inmediata son evaluados y gestionados con criterio humano.",
  },
  {
    q: "¿La configuración es igual para todas las administradoras?",
    a: "No. Se define un flujo propio para cada administradora: horarios, edificios, responsables, criterios de urgencia, proveedores y forma de seguimiento.",
  },
  {
    q: "¿Tenemos que reemplazar a nuestros proveedores?",
    a: "No. EFEMAQ puede coordinar proveedores propios, asociados, los habituales de la administradora o una modalidad combinada.",
  },
  {
    q: "¿Se adapta a carteras chicas y grandes?",
    a: "Sí. El flujo se ajusta según la cantidad de edificios, responsables, horarios, categorías y la forma real de trabajo de cada cliente.",
  },
  {
    q: "¿Se puede usar fuera de Buenos Aires?",
    a: "Sí. La recepción, evaluación y coordinación no dependen de una visita de Fernando. La modalidad de resolución se acuerda según la ubicación y la red disponible.",
  },
]

export default function GuardiaTecnicaWhatsAppPage() {
  const scrollToForm = () => {
    document.getElementById("coordinar-reunion")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#060909] text-white selection:bg-[#00dfdf] selection:text-black">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/5 bg-[radial-gradient(circle_at_78%_25%,rgba(0,223,223,.12),transparent_28%),linear-gradient(180deg,#061010_0%,#060909_100%)] pb-20 pt-32 md:pb-28 md:pt-40">
          <BackgroundGrid />
          <div className="relative z-10 mx-auto grid max-w-[1240px] gap-14 px-6 md:px-10 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00dfdf]/30 bg-[#00dfdf]/8 px-4 py-2 font-manrope text-[10px] font-extrabold uppercase tracking-[.19em] text-[#8ff7f1]">
                <UsersRound size={14} />
                Para administradores de consorcios
              </div>

              <h1 className="max-w-3xl font-manrope text-[42px] font-extrabold leading-[1.04] tracking-[-.035em] text-white sm:text-5xl md:text-[62px]">
                Guardia técnica por WhatsApp, <span className="text-[#00dfdf]">simple y ordenada.</span>
              </h1>

              <p className="mt-7 max-w-2xl font-inter text-sm font-semibold uppercase leading-[1.8] tracking-[.035em] text-gray-300 md:text-[15px]">
                Atención fuera de horario administrativo. Diferenciación de consultas y urgencias. Soporte humano para resolver los casos que requieran asistencia inmediata. Todo sin dejar la comodidad de escribir por WhatsApp.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <Tag icon={Headphones}>Soporte humano</Tag>
                <Tag icon={MoonStar}>Atención fuera de horario</Tag>
                <Tag icon={Settings2}>Flujo parametrizable</Tag>
              </div>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group inline-flex min-h-14 items-center justify-center rounded-full bg-[#00dfdf] px-7 font-manrope text-sm font-extrabold text-black shadow-[0_0_35px_rgba(0,223,223,.16)] transition hover:bg-[#2af1ed]"
                >
                  Coordinar una reunión de 20 minutos
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                </button>
                <p className="max-w-[230px] font-inter text-xs leading-relaxed text-gray-500">
                  Lucas coordina el encuentro. Fernando presenta la cobertura.
                </p>
              </div>
            </div>

            <FadeIn delay={0.08}>
              <OperationalPanel />
            </FadeIn>
          </div>
        </section>

        <section className="border-b border-white/5 bg-[#070b0b] py-10">
          <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-5 px-6 text-center md:flex-row md:text-left">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#00dfdf]/20 bg-[#00dfdf]/8">
                <Building2 className="text-[#00dfdf]" size={23} />
              </div>
              <div>
                <p className="font-manrope text-lg font-extrabold text-white">Experiencia real en una cartera de cientos de edificios</p>
                <p className="mt-1 font-inter text-sm text-gray-400">El modelo ya funciona para una administradora sin depender de atención presencial de Fernando.</p>
              </div>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/8 px-4 py-2 font-manrope text-xs font-bold text-emerald-300">
              Operación activa
            </span>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#080d0d] py-20 md:py-28">
          <BackgroundGrid subtle />
          <div className="relative z-10 mx-auto max-w-[1160px] px-6 md:px-10">
            <div className="mx-auto max-w-[950px] text-center">
              <p className="font-manrope text-[11px] font-extrabold uppercase tracking-[.22em] text-[#00dfdf]">El resultado</p>
              <h2 className="mt-5 font-manrope text-4xl font-extrabold leading-tight text-white md:text-[54px]">
                Apagá el teléfono el viernes a la noche. Volvé a prenderlo el lunes a la mañana.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl font-inter text-base leading-relaxed text-gray-400 md:text-lg">
                Durante la cobertura acordada, EFEMAQ recibe los mensajes, diferencia consultas de urgencias y sostiene la guardia con soporte humano cuando el caso necesita asistencia inmediata.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {PILLARS.map((pillar, index) => (
                <FadeIn key={pillar.title} delay={index * 0.07}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00dfdf]/20 bg-[#00dfdf]/8 text-[#00dfdf]">
                      <pillar.icon size={22} />
                    </div>
                    <h3 className="mt-6 font-manrope text-xl font-extrabold text-white">{pillar.title}</h3>
                    <p className="mt-3 font-inter text-sm leading-relaxed text-gray-400">{pillar.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#060909] py-20 md:py-28">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-6 md:px-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <div>
              <p className="font-manrope text-[11px] font-extrabold uppercase tracking-[.22em] text-[#00dfdf]">Un servicio, una configuración propia</p>
              <h2 className="mt-4 font-manrope text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Un flujo para cada administradora.
              </h2>
              <p className="mt-5 max-w-xl font-inter text-base leading-relaxed text-gray-400 md:text-lg">
                EFEMAQ adapta la guardia a la operación real de cada cliente. La administradora define la cobertura y los criterios; nosotros configuramos y sostenemos la atención.
              </p>
              <div className="mt-8 rounded-2xl border border-[#00dfdf]/20 bg-[#00dfdf]/7 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 shrink-0 text-[#00dfdf]" size={21} />
                  <p className="font-inter text-sm leading-relaxed text-gray-300">
                    El bot puede estar disponible 24/7. El soporte humano se organiza en el horario acordado, con los responsables y proveedores definidos para esa cartera.
                  </p>
                </div>
              </div>
            </div>

            <FadeIn>
              <div className="rounded-[30px] border border-white/10 bg-[#0b1111] p-5 shadow-2xl shadow-black/30 md:p-7">
                <div className="flex items-center justify-between border-b border-white/8 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00dfdf]/10 text-[#00dfdf]">
                      <Settings2 size={20} />
                    </div>
                    <div>
                      <p className="font-manrope text-sm font-extrabold text-white">Configuración de guardia</p>
                      <p className="font-inter text-xs text-gray-500">Administradora · cartera · cobertura</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 font-manrope text-[10px] font-bold text-emerald-300">A medida</span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SETTINGS.map((setting) => (
                    <div key={setting} className="flex min-h-20 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00dfdf]/10 text-[#00dfdf]">
                        <Check size={14} />
                      </div>
                      <p className="font-inter text-xs font-medium leading-relaxed text-gray-300">{setting}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="relative bg-[radial-gradient(circle_at_50%_0%,rgba(0,223,223,.08),transparent_34%),#080d0d] py-20 md:py-28">
          <div className="mx-auto max-w-[1160px] px-6 md:px-10">
            <SectionHeader
              eyebrow="Soporte 24/7"
              title="WhatsApp sigue siendo el canal. EFEMAQ se ocupa de la guardia."
              text="El consorcista escribe como siempre. La solución recibe el mensaje a cualquier hora, aplica la configuración de esa administradora y suma soporte humano para los casos que necesitan intervención."
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
              <div className="rounded-3xl border border-white/10 bg-[#0b1010] p-7 md:p-9">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00dfdf]/20 bg-[#00dfdf]/8 text-[#00dfdf]">
                    <MessageCircle size={25} />
                  </div>
                  <div>
                    <p className="font-manrope text-lg font-extrabold text-white">Disponible para recibir 24/7</p>
                    <p className="mt-1 font-inter text-sm text-gray-500">Sin cambiar el hábito de escribir por WhatsApp</p>
                  </div>
                </div>
                <div className="mt-7 rounded-2xl border border-white/8 bg-black/20 p-5">
                  <p className="font-inter text-xs font-semibold uppercase tracking-[.12em] text-gray-600">Mensaje recibido</p>
                  <p className="mt-3 font-inter text-base leading-relaxed text-gray-200">“Hay una pérdida de agua en el palier del sexto piso.”</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Status>Edificio identificado</Status>
                    <Status>Urgencia diferenciada</Status>
                    <Status>Guardia humana notificada</Status>
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <CompactBenefit icon={Headphones} title="Criterio humano" text="Una persona evalúa y conduce los casos que requieren asistencia inmediata." />
                <CompactBenefit icon={ClipboardCheck} title="Seguimiento y respaldo" text="La gestión mantiene contexto, novedades y un registro para la administradora." />
                <CompactBenefit icon={Sparkles} title="Sin carga extra" text="El administrador no tiene que vigilar el teléfono durante la cobertura delegada." />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#070909] py-20 md:py-28">
          <div className="mx-auto max-w-[1160px] px-6 md:px-10">
            <SectionHeader
              eyebrow="Asistencia integral"
              title="Una guardia preparada para los pedidos reales del edificio."
              text="La modalidad de resolución se define según el caso, la ubicación y los proveedores disponibles para cada administradora."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TRADES.map((trade, index) => (
                <FadeIn key={trade.label} delay={(index % 3) * 0.05}>
                  <div className="flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00dfdf]/8 text-[#00dfdf]">
                      <trade.icon size={21} />
                    </div>
                    <p className="font-manrope text-sm font-bold leading-snug text-gray-200">{trade.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <p className="mt-5 text-center font-inter text-sm text-gray-500">También se atienden vidrios, aberturas y otros pedidos de asistencia.</p>
          </div>
        </section>

        <section className="bg-[#090d0d] py-20 md:py-28">
          <div className="mx-auto max-w-[980px] px-6 md:px-10">
            <SectionHeader
              eyebrow="Preguntas frecuentes"
              title="Lo importante antes de coordinar."
              text="La cobertura se conversa y se configura de acuerdo con la cartera de cada administradora."
            />
            <FadeIn className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] px-6 md:px-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((item, index) => (
                  <AccordionItem key={item.q} value={`faq-${index}`} className="border-white/10">
                    <AccordionTrigger className="py-6 text-left font-manrope text-base font-bold text-white hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-3xl pb-6 font-inter text-sm leading-relaxed text-gray-400">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/5 bg-[radial-gradient(circle_at_15%_20%,rgba(0,223,223,.13),transparent_28%),linear-gradient(180deg,#071010,#050707)] py-20 md:py-28">
          <BackgroundGrid />
          <div id="coordinar-reunion" className="relative z-10 mx-auto grid max-w-[1180px] scroll-mt-28 gap-10 px-6 md:px-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <FadeIn>
              <p className="font-manrope text-[11px] font-extrabold uppercase tracking-[.22em] text-[#00dfdf]">Próximo paso</p>
              <h2 className="mt-4 font-manrope text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Definamos la guardia de tu administradora.
              </h2>
              <p className="mt-5 max-w-xl font-inter text-base leading-relaxed text-gray-300 md:text-lg">
                En 20 minutos revisamos edificios, horarios, incidentes habituales y proveedores. Con esa información, Fernando puede presentar una cobertura a medida.
              </p>

              <div className="mt-8 space-y-4">
                {["Atención disponible 24/7.", "Soporte humano durante la cobertura acordada.", "Configuración propia para cada administradora."].map((item) => (
                  <div key={item} className="flex items-center gap-3 font-inter text-sm text-gray-300">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00dfdf]/10">
                      <Check size={15} className="text-[#00dfdf]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <GuardiaLeadForm />
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer showWhatsapp={false} />
    </div>
  )
}

function OperationalPanel() {
  return (
    <div className="relative mx-auto w-full max-w-[660px] rounded-[30px] border border-white/12 bg-[#0a0f0f]/95 p-5 shadow-[0_30px_80px_rgba(0,0,0,.38)] md:p-7">
      <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#00dfdf]/20 bg-[#00dfdf]/8 text-[#00dfdf]">
            <Headphones size={21} />
          </div>
          <div>
            <p className="font-manrope text-sm font-extrabold text-white">Panel operativo</p>
            <p className="font-inter text-xs text-gray-500">Guardia de administradora</p>
          </div>
        </div>
        <span className="w-fit rounded-full bg-emerald-400/10 px-3 py-1.5 font-manrope text-[10px] font-bold text-emerald-300">Cobertura activa</span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1.04fr_.96fr]">
        <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[10px] font-semibold uppercase tracking-[.14em] text-gray-600">WhatsApp</p>
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)]" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-[#075e58] px-4 py-3 font-inter text-xs leading-relaxed text-white">
              Se rompió un caño en el palier y está bajando agua.
            </div>
            <div className="max-w-[91%] rounded-2xl rounded-bl-sm bg-[#222a2a] px-4 py-3 font-inter text-xs leading-relaxed text-gray-200">
              Recibido. Voy a validar el edificio y pedirte una foto para registrar el caso.
            </div>
            <div className="ml-auto w-fit rounded-full bg-[#00dfdf]/10 px-3 py-2 font-inter text-[10px] font-semibold text-[#8ff7f1]">
              Edificio validado · evidencia recibida
            </div>
          </div>
        </div>

        <div className="grid content-start gap-3">
          <PanelRow label="Disponibilidad" value="Canal 24/7" />
          <PanelRow label="Clasificación" value="Urgencia de guardia" />
          <PanelRow label="Configuración" value="Protocolo del cliente" />
          <PanelRow label="Atención" value="Soporte humano activo" accent />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-[#00dfdf]/15 bg-[#00dfdf]/6 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-inter text-xs text-gray-300">Viernes 18:00 → lunes 08:00</span>
        <span className="font-manrope text-[10px] font-extrabold uppercase tracking-[.12em] text-[#00dfdf]">EFEMAQ de guardia</span>
      </div>
    </div>
  )
}

function PanelRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border px-4 py-3.5 ${accent ? "border-[#00dfdf]/25 bg-[#00dfdf]/8" : "border-white/8 bg-white/[0.025]"}`}>
      <p className="font-inter text-[9px] font-semibold uppercase tracking-[.13em] text-gray-600">{label}</p>
      <p className={`mt-1.5 font-manrope text-xs font-bold ${accent ? "text-[#8ff7f1]" : "text-gray-200"}`}>{value}</p>
    </div>
  )
}

function Tag({ icon: Icon, children }: { icon: typeof Headphones; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 font-manrope text-[11px] font-bold text-gray-300">
      <Icon size={14} className="text-[#00dfdf]" />
      {children}
    </span>
  )
}

function Status({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-[#00dfdf]/15 bg-[#00dfdf]/7 px-3 py-1.5 font-manrope text-[10px] font-bold text-[#8ff7f1]">{children}</span>
}

function CompactBenefit({ icon: Icon, title, text }: { icon: typeof Headphones; title: string; text: string }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00dfdf]/8 text-[#00dfdf]">
        <Icon size={21} />
      </div>
      <div>
        <h3 className="font-manrope text-base font-extrabold text-white">{title}</h3>
        <p className="mt-2 font-inter text-xs leading-relaxed text-gray-400">{text}</p>
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="font-manrope text-[11px] font-extrabold uppercase tracking-[.22em] text-[#00dfdf]">{eyebrow}</p>
      <h2 className="mt-4 font-manrope text-4xl font-extrabold leading-tight text-white md:text-5xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-3xl font-inter text-base leading-relaxed text-gray-400 md:text-lg">{text}</p>
    </div>
  )
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function BackgroundGrid({ subtle = false }: { subtle?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${subtle ? "opacity-[0.022]" : "opacity-[0.042]"}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  )
}
