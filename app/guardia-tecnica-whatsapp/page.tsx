"use client"

import {
  ArrowRight,
  Building2,
  Clock3,
  Droplets,
  Flame,
  Headphones,
  KeyRound,
  MessageCircle,F
  MoonStar,
  ShieldCheck,
  SlidersHorizontal,
  UserRoundCheck,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const WHATSAPP_URL =
  "https://wa.me/5491126547271?text=Hola%20EFEMAQ%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20la%20guardia%20t%C3%A9cnica%20para%20administradoras."

const PILLARS = [
  {
    icon: Clock3,
    title: "Atención 24/7",
    text: "Nuestro sistema recibe pedidos y consultas a toda hora, manteniendose siempre disponible el canal de guardia.",
  },
  {
    icon: UserRoundCheck,
    title: "Atención humana",
    text: "Cuando un caso requiere asistencia, una persona evalúa la situación y coordina el próximo paso.",
  },
  {
    icon: SlidersHorizontal,
    title: "A medida",
    text: "Cada administradora define horarios, edificios, criterios y proveedores para su propia operación.",
  },
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
    q: "¿Cómo interviene el soporte humano?",
    a: "Cuando un caso requiere asistencia, la guardia evalúa la información recibida, solicita más datos en caso de requerirlo y coordina la solución necesaria.",
  },
  {
    q: "¿Se configura igual para todas las administradoras?",
    a: "No. Cada administradora cuenta con un flujo propio, definido según sus edificios, horarios, criterios de urgencia, y proveedores.",
  },
  {
    q: "¿Tenemos que reemplazar a nuestros proveedores?",
    a: "No. EFEMAQ puede trabajar con los proveedores habituales de la administradora, con su propia red o con una modalidad combinada.",
  },
  {
    q: "¿Funciona en todo el pais?",
    a: "Sí. Nuestro sistema con desarrollo propio permite gestionar los pedidos de tu consorcio estés donde estés.",
  },
]

export default function GuardiaTecnicaWhatsAppPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#060909] text-white selection:bg-[#00dfdf] selection:text-black">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/5 bg-[radial-gradient(circle_at_78%_25%,rgba(0,223,223,.12),transparent_28%),linear-gradient(180deg,#061010_0%,#060909_100%)] pb-20 pt-32 md:pb-28 md:pt-40">
          <BackgroundGrid />
          <div className="relative z-10 mx-auto grid max-w-[1180px] gap-14 px-6 md:px-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00dfdf]/30 bg-[#00dfdf]/8 px-4 py-2 font-manrope text-[11px] font-extrabold tracking-[.08em] text-[#8ff7f1]">
                <UsersRound size={14} />
                Para administradores de consorcios
              </div>

              <h1 className="max-w-3xl font-manrope text-[42px] font-extrabold leading-[1.04] tracking-[-.035em] text-white sm:text-5xl md:text-[62px]">
                Guardia técnica por WhatsApp, <span className="text-[#00dfdf]">simple y ordenada.</span>
              </h1>

              <p className="mt-7 max-w-2xl font-inter text-base leading-[1.75] text-gray-300 md:text-lg">
                Atención fuera del horario administrativo. Personal técnico calificado. Soporte humano para resolver los casos que requieren asistencia inmediata. Todo, sin dejar la comodidad de escribir por WhatsApp.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <Tag icon={MoonStar}>Atención las 24 hs.</Tag>
                <Tag icon={Headphones}>Soporte humano</Tag>
                <Tag icon={SlidersHorizontal}>Flujo a medida</Tag>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex min-h-14 items-center justify-center rounded-full bg-[#00dfdf] px-7 font-manrope text-sm font-extrabold text-black shadow-[0_0_35px_rgba(0,223,223,.16)] transition hover:bg-[#2af1ed]"
              >
                Consultar por WhatsApp
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </a>
            </div>

            <FadeIn delay={0.08}>
              <PhoneDemo />
            </FadeIn>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#080d0d] py-20 md:py-28">
          <BackgroundGrid subtle />
          <div className="relative z-10 mx-auto max-w-[1160px] px-6 md:px-10">
            <div className="mx-auto max-w-[950px] text-center">
              <p className="font-manrope text-xs font-extrabold tracking-[.08em] text-[#00dfdf]">Asistencia total</p>
              <h2 className="mt-5 font-manrope text-4xl font-extrabold leading-tight text-white md:text-[54px]">
             <span className="text-[#00dfdf]">Guardia activa</span> para tu tranquilidad. Todos los pedidos son atendidos.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl font-inter text-base leading-relaxed text-gray-400 md:text-lg">
                Durante la cobertura acordada, los incidentes siguen siendo recibidos y gestionados aunque el administrador no esté pendiente del teléfono.
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

            <FadeIn className="mt-8">
              <div className="flex flex-col gap-6 rounded-3xl border border-[#00dfdf]/18 bg-[#00dfdf]/[0.055] p-7 md:flex-row md:items-center md:justify-between md:p-9">
                <div className="max-w-2xl">
                  <h3 className="font-manrope text-2xl font-extrabold text-white">Un flujo configurado para tu administradora.</h3>
                  <p className="mt-3 font-inter text-sm leading-relaxed text-gray-300 md:text-base">
                    La cobertura se adapta a la cantidad de edificios, los horarios, los criterios de urgencia y los proveedores de cada cartera.
                  </p>
                </div>
                <div className="flex max-w-sm flex-wrap gap-2 md:justify-end">
                  {['Horarios', 'Edificios', 'Criterios', 'Proveedores'].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-black/15 px-3.5 py-2 font-manrope text-xs font-bold text-gray-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#070909] py-20 md:py-28">
          <div className="mx-auto max-w-[1160px] px-6 md:px-10">
            <SectionHeader
              eyebrow="Cobertura técnica"
              title="Una guardia preparada para todos los pedidos del edificio."
              text="La atención se organiza de acuerdo con el incidente y la cobertura definida para cada administradora, abarcando todos los rubros que sean necesarios."
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
            <p className="mt-5 text-center font-inter text-sm text-gray-500">Las opciones de rubros se parametrizan según la necesidad del consorcio.</p>
          </div>
        </section>

        <section className="bg-[#090d0d] py-20 md:py-28">
          <div className="mx-auto max-w-[980px] px-6 md:px-10">
            <SectionHeader
              eyebrow="Preguntas frecuentes"
              title="Lo importante antes de conversar."
              text="La cobertura se define de acuerdo con la cartera y la forma de trabajo de cada administradora."
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

        <section className="relative overflow-hidden border-t border-white/5 bg-[radial-gradient(circle_at_50%_0%,rgba(0,223,223,.13),transparent_35%),linear-gradient(180deg,#071010,#050707)] py-20 md:py-28">
          <BackgroundGrid />
          <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center md:px-10">
            <FadeIn>
              <p className="font-manrope text-xs font-extrabold tracking-[.08em] text-[#00dfdf]">Próximo paso</p>
              <h2 className="mt-4 font-manrope text-4xl font-extrabold leading-tight text-white md:text-5xl">
               Hablamos de la guardia que necesitas hoy.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl font-inter text-base leading-relaxed text-gray-300 md:text-lg">
                Contanos como se resuelven hoy tus urgencias técnicas y coordinemos una reunión para evaluar una cobertura a tu medida.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[#00dfdf] px-8 font-manrope text-sm font-extrabold text-black shadow-[0_0_35px_rgba(0,223,223,.16)] transition hover:bg-[#2af1ed]"
              >
                Consultar por WhatsApp
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </a>
              <div className="mt-5 flex flex-col items-center justify-center gap-2 font-inter text-xs text-gray-500 sm:flex-row sm:gap-3">
                <a href="mailto:info@efemaq.com.ar" className="transition hover:text-white">info@efemaq.com.ar</a>
                <span className="hidden text-gray-700 sm:inline">·</span>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  +54 9 11 2654-7271
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function PhoneDemo() {
  return (
    <div className="relative mx-auto w-full max-w-[390px]">
      <div className="absolute -inset-8 rounded-full bg-[#00dfdf]/10 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[44px] border-[7px] border-[#172020] bg-[#07100f] p-2 shadow-[0_35px_90px_rgba(0,0,0,.52)]">
        <div className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[#0b1413]">
          <div className="absolute left-1/2 top-2 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-[#050707]" />

          <div className="flex items-center gap-3 border-b border-black/20 bg-[#123d39] px-4 pb-4 pt-10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00dfdf]/15 text-[#9af8f2]">
              <MessageCircle size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-manrope text-sm font-extrabold text-white">Guardia EFEMAQ</p>
              <p className="font-inter text-[11px] text-[#b8d9d5]">Demostración de atención</p>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.75)]" />
          </div>

          <div className="min-h-[590px] space-y-3 bg-[radial-gradient(circle_at_20%_20%,rgba(0,223,223,.035),transparent_32%),#0b1211] px-3.5 py-5">
            <p className="text-center font-inter text-[10px] text-gray-600">Viernes · 21:38</p>
            <ChatBubble sent time="21:38">
              Hola, hay una pérdida de agua en el palier del sexto piso.
            </ChatBubble>
            <ChatBubble time="21:38">
              Hola. Voy a ayudarte a registrar el incidente. ¿Me indicás la dirección, el piso y la unidad?
            </ChatBubble>
            <ChatBubble sent time="21:39">
              Av. Corrientes 1234, 6° B. El agua está llegando al ascensor. Te envío una foto.
            </ChatBubble>
            <ChatBubble time="21:39">
              Gracias. El edificio quedó identificado y el incidente ya fue registrado. El equipo de guardia está evaluando el caso.
            </ChatBubble>
            <ChatBubble time="21:41">
              Confirmamos que requiere asistencia. Estamos coordinando la atención y te vamos a mantener informado por este medio.
            </ChatBubble>

            <div className="mx-auto mt-4 max-w-[92%] rounded-2xl border border-[#00dfdf]/22 bg-[#00dfdf]/10 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2 text-[#9af8f2]">
                <ShieldCheck size={15} />
                <p className="font-manrope text-xs font-extrabold">Técnico asignado</p>
              </div>
              <p className="mt-1 font-inter text-[10px] text-gray-400">Seguimiento en curso · 21:42</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatBubble({ children, sent = false, time }: { children: React.ReactNode; sent?: boolean; time: string }) {
  return (
    <div
      className={`max-w-[91%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
        sent ? "ml-auto rounded-br-sm bg-[#075e58] text-white" : "rounded-bl-sm bg-[#202928] text-gray-100"
      }`}
    >
      <p className="font-inter text-[11px] leading-[1.55]">{children}</p>
      <p className={`mt-1 text-right font-inter text-[9px] ${sent ? "text-[#b8d9d5]" : "text-gray-500"}`}>{time}</p>
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

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="font-manrope text-xs font-extrabold tracking-[.08em] text-[#00dfdf]">{eyebrow}</p>
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
