"use client"

import React, { useMemo, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  FileCheck2,
  MessageSquare,
  MousePointer2,
  PhoneCall,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  Wrench,
  Zap,
} from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const WHATSAPP_LINK =
  "https://wa.me/5491126547271?text=Hola%20EFEMAQ,%20quiero%20ver%20la%20demo%20del%20sistema%20de%20guardia%20t%C3%A9cnica%20por%20WhatsApp."

const HERO_MESSAGES = [
  {
    from: "bot",
    text: "Hola, soy Maqui, tu asistente virtual. Voy a ayudarte a registrar tu solicitud. Primero necesito validar el domicilio.",
  },
  { from: "user", text: "Mitre 1240, piso 6, depto B." },
  {
    from: "bot",
    text: "Domicilio validado. ¿Qué tipo de solicitud querés registrar?",
    options: ["Consulta administrativa", "Guardia técnica"],
  },
  { from: "user", text: "Guardia técnica." },
  {
    from: "bot",
    text: "Seleccioná la categoría del incidente:",
    options: ["Electricidad", "Agua", "Gas", "Ascensor", "Otros"],
  },
  { from: "user", text: "Electricidad." },
  {
    from: "bot",
    text: "Contame qué está pasando y si afecta a tu unidad, a espacios comunes o a todo el edificio. Si tenés foto, podés enviarla.",
  },
  { from: "user", text: "No hay luz en el palier ni en espacios comunes." },
  {
    from: "bot",
    text: "Incidente registrado. El equipo de guardia ya tiene domicilio, categoría y detalle para avanzar.",
  },
]

const SCENARIOS = [
  {
    id: "horario",
    label: "Horario de atención",
    kicker: "Atención humana",
    title: "Durante el día, conversa el equipo",
    status: "Atención normal",
    result: "La conversación queda visible y ordenada para que la administración responda sin perder contexto.",
    panelNote: "Continuar conversación",
    nextStep: "Responder desde la administración",
    owner: "Administración",
    color: "#00dfdf",
    icon: UserCheck,
    messages: [
      { from: "user", text: "Hola, necesito consultar por una liquidación." },
      { from: "agent", text: "Hola, te atiende la administración. ¿Me indicás edificio y unidad?" },
      { from: "user", text: "Edificio San Martín, 4° B." },
      { from: "agent", text: "Perfecto, ya lo veo. Revisamos el caso y te respondemos por acá." },
      { from: "user", text: "Gracias. Quedo atento." },
    ],
  },
  {
    id: "consulta",
    label: "Consulta fuera de horario",
    kicker: "Consulta registrada",
    title: "La consulta no se mezcla con una urgencia",
    status: "Consulta guardada",
    result: "El vecino recibe una respuesta clara y el pedido queda separado para el próximo horario hábil.",
    panelNote: "Consulta guardada",
    nextStep: "Responder en horario de atención",
    owner: "Administración",
    color: "#10b981",
    icon: FileCheck2,
    messages: [
      { from: "bot", text: "Hola, soy Maqui, tu asistente virtual. ¿Tu mensaje es una urgencia técnica o una consulta administrativa?" },
      { from: "user", text: "Consulta administrativa." },
      { from: "bot", text: "Perfecto. Dejame tu consulta y la administración la retoma en horario de atención." },
      { from: "user", text: "Quiero consultar por un pago que figura pendiente." },
      { from: "bot", text: "Recibimos tu consulta. Queda registrada para responderla en horario hábil." },
      { from: "user", text: "Gracias." },
    ],
  },
  {
    id: "guardia",
    label: "Guardia técnica",
    kicker: "Incidente creado",
    title: "El incidente llega listo para operar",
    status: "Incidente creado",
    result: "El sistema reúne domicilio, categoría, detalle y evidencia antes de derivar el caso.",
    panelNote: "Evento listo para operar",
    nextStep: "Asignar seguimiento técnico",
    owner: "Guardia técnica",
    color: "#f59e0b",
    icon: Wrench,
    messages: [
      { from: "bot", text: "Hola, soy Maqui. Primero valido el domicilio para registrar bien la solicitud." },
      { from: "user", text: "Mitre 1240, 6° B." },
      { from: "bot", text: "Domicilio validado. Seleccioná el tipo de incidente:", options: ["Electricidad", "Agua", "Gas", "Ascensor", "Otros"] },
      { from: "user", text: "Electricidad." },
      { from: "bot", text: "Contame qué está pasando. Si tenés una foto, también podés enviarla." },
      { from: "user", text: "No hay luz en espacios comunes." },
      { from: "bot", text: "Perfecto. Incidente registrado para guardia técnica." },
      { from: "bot", text: "El equipo ya cuenta con los datos principales para avanzar." },
    ],
  },
  {
    id: "datos",
    label: "Validación de domicilio",
    kicker: "Domicilio validado",
    title: "Primero se confirma el domicilio",
    status: "Domicilio validado",
    result: "Antes de avanzar, el sistema ordena edificio, unidad y contacto para evitar confusiones.",
    panelNote: "Continuar solicitud",
    nextStep: "Elegir tipo de pedido",
    owner: "Equipo responsable",
    color: "#8b5cf6",
    icon: ShieldCheck,
    messages: [
      { from: "bot", text: "Hola, soy Maqui. Para ayudarte necesito validar primero el domicilio." },
      { from: "user", text: "Belgrano 820, 7° A." },
      { from: "bot", text: "Gracias. Encontré el edificio. ¿Me confirmás apellido o contacto?" },
      { from: "user", text: "Gómez. Mi teléfono termina en 2187." },
      { from: "bot", text: "Domicilio validado. Ya puedo continuar con la solicitud correspondiente." },
      { from: "bot", text: "¿Querés registrar una consulta o activar guardia técnica?", options: ["Consulta", "Guardia técnica"] },
    ],
  },
]

const PAINS = [
  {
    icon: MessageSquare,
    title: "WhatsApp mezclado",
    text: "Consultas, reclamos y urgencias entran por el mismo canal y compiten por atención.",
  },
  {
    icon: Clock,
    title: "Fuera de horario",
    text: "El vecino escribe de noche o fin de semana, y el primer filtro llega tarde.",
  },
  {
    icon: AlertTriangle,
    title: "Sin trazabilidad",
    text: "Fotos, audios y datos quedan en conversaciones largas, difíciles de seguir.",
  },
]

const FLOW_STEPS = [
  { icon: MessageSquare, title: "Mensaje", text: "El vecino escribe por WhatsApp, como ya lo hace hoy." },
  { icon: Clock, title: "Horario", text: "Se distingue atención humana, guardia y fuera de horario." },
  { icon: SlidersHorizontal, title: "Motivo", text: "El pedido se separa entre consulta, reclamo o urgencia." },
  { icon: Building2, title: "Datos", text: "Se reúne edificio, unidad, contacto, detalle y evidencia." },
  { icon: FileCheck2, title: "Registro", text: "El caso queda creado con información útil para operar." },
  { icon: UserCheck, title: "Equipo", text: "Llega al responsable correcto, con contexto y prioridad." },
]

const COMPARISON = [
  {
    manual: "El WhatsApp se llena de pedidos distintos y cuesta separar lo urgente.",
    system: "Cada pedido entra clasificado, con prioridad y responsable claro.",
  },
  {
    manual: "El equipo vuelve a pedir dirección, unidad, detalle y fotos.",
    system: "Maqui reúne los datos clave antes de mover el caso.",
  },
  {
    manual: "La información queda dispersa en chats largos y difíciles de revisar.",
    system: "El incidente queda registrado con contexto para operar y reportar.",
  },
  {
    manual: "Cada persona atiende con su criterio y su disponibilidad.",
    system: "El protocolo se sostiene igual, incluso fuera de horario.",
  },
]

const CONFIG_ITEMS = [
  {
    icon: Clock,
    title: "Horarios",
    text: "Días, franjas de atención, guardias y respuestas fuera de horario.",
  },
  {
    icon: Building2,
    title: "Edificios",
    text: "Consorcios, unidades, responsables y reglas por cliente.",
  },
  {
    icon: SlidersHorizontal,
    title: "Solicitudes",
    text: "Urgencias, reclamos, consultas administrativas y categorías propias.",
  },
  {
    icon: UserCheck,
    title: "Derivación",
    text: "Qué llega a EFEMAQ, qué queda para la administración y qué se informa.",
  },
]

const FAQ = [
  {
    q: "¿Reemplaza al equipo de atención?",
    a: "No. Ordena el ingreso de mensajes, pide datos básicos y deriva mejor. La administración y la guardia siguen teniendo control humano.",
  },
  {
    q: "¿Podemos mantener WhatsApp como canal principal?",
    a: "Sí. La propuesta es aprovechar un canal que los vecinos ya usan y darle estructura para guardias, consultas y seguimiento.",
  },
  {
    q: "¿Qué pasa fuera de horario?",
    a: "El sistema separa consultas de urgencias. Una consulta queda registrada para horario hábil y una urgencia avanza con los datos necesarios.",
  },
  {
    q: "¿Se adapta a administradores chicas y grandes?",
    a: "Sí. El flujo se ajusta según cantidad de edificios, responsables, horarios, categorías y forma real de trabajo de cada cliente.",
  },
  {
    q: "¿Cómo se define el precio final?",
    a: "La referencia inicial es ARS 10.000 por evento de incidente creado. El alcance final se define según volumen, protocolo y operación.",
  },
]

const formatARS = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value)

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function GuardiaTecnicaWhatsAppPage() {
  const [activeScenario, setActiveScenario] = useState(2)
  const [buildings, setBuildings] = useState(25)
  const [monthlyEvents, setMonthlyEvents] = useState(20)

  const scenario = SCENARIOS[activeScenario]
  const monthlyIncidents = useMemo(() => Math.max(1, Math.round(monthlyEvents)), [monthlyEvents])
  const monthlyPrice = monthlyIncidents * 10000

  const scrollToDemo = () => {
    document.getElementById("demo-simulada")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="w-full min-h-screen bg-[#111111] text-white overflow-hidden">
      <Navbar />

      <main>
        <section className="relative min-h-[100svh] pt-20 md:pt-20 xl:pt-[88px] 2xl:pt-28 pb-8 md:pb-8 2xl:pb-16 flex items-center overflow-hidden bg-gradient-to-b from-[#050505] via-[#071010] to-[#080808]">
          <BackgroundGrid />

          <div className="relative z-10 max-w-[1480px] mx-auto px-6 md:px-10 w-full">
            <div className="grid lg:grid-cols-[.82fr_1.18fr] gap-8 lg:gap-8 2xl:gap-14 items-center">
              <FadeIn>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/20 mb-4 2xl:mb-6 backdrop-blur-md">
                    <Sparkles size={14} className="text-[#00dfdf]" />
                    <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                      Nuevo sistema para administradores
                    </span>
                  </div>

                  <h1 className="font-manrope text-4xl md:text-5xl xl:text-[56px] 2xl:text-7xl font-extrabold leading-[1.02] tracking-tight text-white mb-4 2xl:mb-6">
                    Guardia técnica por WhatsApp simple{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfdf] to-[#10b981]">
                      y ordenada desde el primer mensaje.
                    </span>
                  </h1>

                  <p className="font-inter text-base md:text-[17px] 2xl:text-xl text-gray-300 leading-relaxed max-w-2xl mb-5 2xl:mb-8">
                    Atención fuera de horario, diferenciación de consultas y urgencias. Soporte humano para resolver los casos que requieran asistencia inmediata. Todo sin dejar la comodidad de escribir por Whatsapp.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 2xl:mb-9 max-w-2xl">
                    {[
                      "Atención fuera de horario",
                      "Registro automático",
                      "Flujos a medida",
                    ].map((item) => (
                      <div
                        key={item}
                        className="min-h-[52px] 2xl:min-h-[70px] rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-manrope font-semibold text-gray-200 flex items-center"
                      >
                        <CheckCircle2 size={17} className="mr-2 text-[#00dfdf] shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      <Button className="h-[52px] px-6 bg-[#00dfdf] hover:bg-[#00c4c4] text-black font-manrope font-extrabold text-base rounded-full shadow-[0_0_28px_rgba(0,223,223,0.24)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgba(0,223,223,0.34)] active:scale-[0.98] w-full sm:w-auto">
                        Pedir demo a EFEMAQ
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </a>
                    <Button
                      onClick={scrollToDemo}
                      className="h-[52px] px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#00dfdf] font-manrope font-bold text-base rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto"
                    >
                      Ver simulación
                      <MousePointer2 className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.12}>
                <HeroDemo />
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="relative py-12 md:py-14 2xl:py-24 bg-gradient-to-b from-[#080808] via-[#091111] to-[#080808]">
          <BackgroundGrid subtle />
          <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-10">
            <SectionHeader
              eyebrow="El problema"
              title="El WhatsApp de guardia no puede depender de memoria y buena suerte."
              text="Cada mensaje debería llegar con contexto, prioridad y responsable claro."
            />

            <div className="grid md:grid-cols-3 gap-4 md:gap-5 mt-8 2xl:mt-12">
              {PAINS.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.06}>
                  <div className="h-full rounded-2xl border border-white/10 bg-[#111111]/80 p-6 hover:border-red-400/25 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center mb-5">
                      <item.icon className="text-red-300" size={20} />
                    </div>
                    <h3 className="font-manrope text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="font-inter text-sm text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="demo-simulada" className="relative scroll-mt-28 py-6 md:py-6 2xl:py-12 bg-gradient-to-b from-[#080808] via-[#071313] to-[#080808]">
          <BackgroundGrid />
          <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-10">
            <FadeIn className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
                <Zap size={13} className="text-[#00dfdf]" />
                <span className="text-[10px] font-manrope font-bold text-[#00dfdf] uppercase tracking-widest">
                  Cómo funciona
                </span>
              </div>
              <h2 className="font-manrope text-3xl md:text-[34px] 2xl:text-5xl font-extrabold text-white leading-tight mb-2">
                De mensaje suelto a incidente listo.
              </h2>
              <p className="font-inter text-gray-400 text-sm md:text-[15px] 2xl:text-lg leading-relaxed max-w-2xl mx-auto">
                Maqui valida el domicilio, ordena el pedido y deja la información importante preparada para el equipo.
              </p>
            </FadeIn>

            <div className="mt-4 2xl:mt-8 grid lg:grid-cols-[250px_1fr] gap-4 2xl:gap-8 items-start">
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {SCENARIOS.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveScenario(index)}
                    className={`text-left rounded-2xl border p-3 transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                      activeScenario === index
                        ? "border-[#00dfdf]/50 bg-[#00dfdf]/10 shadow-[0_0_24px_rgba(0,223,223,0.08)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl border flex items-center justify-center"
                        style={{
                          color: item.color,
                          borderColor: `${item.color}45`,
                          backgroundColor: `${item.color}14`,
                        }}
                      >
                        <item.icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-manrope text-[13px] font-bold text-white leading-tight">{item.label}</p>
                        <p className="font-inter text-xs text-gray-500">{item.kicker}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid xl:grid-cols-[.94fr_1.06fr] gap-4 2xl:gap-5 items-stretch">
                <WhatsAppMock scenario={scenario} />
                <PanelMock scenario={scenario} />
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-12 md:py-14 2xl:py-24 bg-gradient-to-b from-[#080808] via-[#0a1010] to-[#080808]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <SectionHeader
              eyebrow="Circuito"
              title="Menos ida y vuelta. Más información desde el inicio."
              text="EFEMAQ convierte un mensaje suelto en un caso claro: qué pasa, dónde pasa, quién lo atiende y qué sigue."
            />

            <div className="relative mt-8 2xl:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {FLOW_STEPS.map((step, index) => (
                <FadeIn key={step.title} delay={index * 0.04}>
                  <div
                    className={`group relative h-full min-h-[178px] rounded-2xl border border-white/10 bg-[#111111]/90 p-4 2xl:p-5 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#00dfdf]/35 hover:shadow-[0_18px_55px_rgba(0,223,223,0.08)] ${
                      index % 2 === 1 ? "lg:translate-y-3" : ""
                    }`}
                  >
                    <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-[#00dfdf]/0 blur-2xl transition-colors duration-300 group-hover:bg-[#00dfdf]/10" />
                    {index < FLOW_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute top-[52px] -right-2 w-4 h-px bg-gradient-to-r from-[#00dfdf]/50 to-transparent" />
                    )}
                    <div className="relative flex items-center justify-between mb-4">
                      <span className="text-xs font-manrope font-bold text-[#00dfdf]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.035] flex items-center justify-center text-white group-hover:text-[#00dfdf] transition-colors">
                        <step.icon size={18} />
                      </div>
                    </div>
                    <h3 className="relative font-manrope font-bold text-white mb-2">{step.title}</h3>
                    <p className="relative font-inter text-xs text-gray-400 leading-relaxed">{step.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-12 md:py-14 2xl:py-24 bg-gradient-to-b from-[#080808] via-[#071313] to-[#080808]">
          <BackgroundGrid subtle />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-5 lg:gap-7 items-stretch">
              <FadeIn className="h-full">
                <div className="relative h-full rounded-[2rem] border border-white/10 bg-[#101010] p-6 md:p-7 flex flex-col justify-between overflow-hidden">
                  <div className="absolute -left-16 bottom-6 w-44 h-44 rounded-full bg-[#00dfdf]/10 blur-3xl" />
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dfdf]/5 border border-[#00dfdf]/20 mb-6">
                      <SlidersHorizontal size={14} className="text-[#00dfdf]" />
                      <span className="text-[10px] font-manrope font-bold text-[#00dfdf] tracking-widest uppercase">
                        A medida
                      </span>
                    </div>
                    <h2 className="font-manrope text-3xl md:text-[38px] 2xl:text-5xl font-extrabold text-white leading-tight mb-4">
                      Un flujo propio para cada administradora.
                    </h2>
                    <p className="font-inter text-gray-400 text-sm md:text-base leading-relaxed">
                      No todas las administraciones atienden igual. El sistema se configura según horarios,
                      edificios, responsables y tipo de servicio que quieras ofrecer.
                    </p>
                  </div>

                  <div className="relative mt-6 grid sm:grid-cols-2 gap-3">
                    {[
                      "Horarios y guardias",
                      "Edificios y unidades",
                      "Categorías propias",
                      "Responsables definidos",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl bg-white/[0.035] border border-white/10 px-4 py-3 font-inter text-sm text-gray-300"
                      >
                        <BadgeCheck size={15} className="inline mr-2 text-[#00dfdf]" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-5 rounded-2xl border border-[#00dfdf]/20 bg-[#00dfdf]/[0.055] p-4 2xl:p-5">
                    <p className="font-manrope text-base 2xl:text-lg font-extrabold text-white mb-2">
                      La novedad está en adaptar el circuito, no en imponer uno genérico.
                    </p>
                    <p className="font-inter text-sm text-gray-400 leading-relaxed">
                      EFEMAQ puede armar un piloto chico, medirlo y luego escalarlo a más edificios o reglas.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1} className="h-full">
                <div className="relative h-full rounded-[2rem] border border-white/10 bg-[#101010] p-5 md:p-6 shadow-2xl overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[#00dfdf]/10 blur-3xl" />
                  <div className="relative rounded-2xl border border-[#00dfdf]/20 bg-[#061616] p-4 2xl:p-5 mb-4">
                    <p className="font-manrope text-[10px] font-bold text-[#00dfdf] uppercase tracking-widest mb-2">
                      Configuración por cliente
                    </p>
                    <h3 className="font-manrope text-2xl md:text-3xl font-extrabold text-white leading-tight">
                      Mismo canal, reglas distintas para cada operación.
                    </h3>
                  </div>

                  <div className="relative space-y-3">
                    {CONFIG_ITEMS.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#00dfdf]/25"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl border border-[#00dfdf]/20 bg-[#00dfdf]/10 flex items-center justify-center shrink-0">
                            <item.icon size={17} className="text-[#00dfdf]" />
                          </div>
                          <div>
                            <p className="font-manrope text-base font-extrabold text-white">{item.title}</p>
                            <p className="font-inter text-sm text-gray-400 leading-relaxed mt-0.5">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <p className="font-manrope text-2xl font-extrabold text-white">24/7</p>
                      <p className="font-inter text-xs text-gray-500 mt-1">Respuesta inicial fuera de horario</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <p className="font-manrope text-2xl font-extrabold text-white">Flexible</p>
                      <p className="font-inter text-xs text-gray-500 mt-1">Piloto, escala y reglas por cliente</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="relative py-12 md:py-14 2xl:py-24 bg-gradient-to-b from-[#080808] via-[#0a1010] to-[#080808]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <SectionHeader
              eyebrow="Comparativa"
              title="Del chat manual al sistema EFEMAQ."
              text="No reemplaza al equipo: hace que cada pedido llegue más claro, completo y accionable."
            />

            <div className="relative mt-8 2xl:mt-12 grid md:grid-cols-2 gap-4 md:gap-5">
              {COMPARISON.map((row, index) => (
                <FadeIn key={row.manual} delay={index * 0.04}>
                  <div className="group relative h-full rounded-2xl border border-white/10 bg-[#111111] p-4 md:p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00dfdf]/30">
                    <div className="grid sm:grid-cols-[1fr_38px_1fr] gap-3 h-full items-stretch">
                      <div className="rounded-2xl border border-red-400/10 bg-red-500/[0.04] p-4">
                        <p className="text-[10px] uppercase tracking-widest font-manrope font-bold text-red-300 mb-2">
                          Antes
                        </p>
                        <p className="font-inter text-sm text-gray-400 leading-relaxed">{row.manual}</p>
                      </div>
                      <div className="hidden sm:flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full border border-[#00dfdf]/25 bg-[#00dfdf]/10 flex items-center justify-center text-[#00dfdf] shadow-[0_0_22px_rgba(0,223,223,0.12)] transition-transform duration-300 group-hover:scale-110">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                      <div className="rounded-2xl border border-[#00dfdf]/20 bg-[#00dfdf]/[0.06] p-4">
                        <p className="text-[10px] uppercase tracking-widest font-manrope font-bold text-[#00dfdf] mb-2">
                          Con EFEMAQ
                        </p>
                        <p className="font-inter text-sm text-gray-200 leading-relaxed">{row.system}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-12 md:py-14 2xl:py-24 bg-gradient-to-b from-[#080808] via-[#091111] to-[#080808]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <SectionHeader
              eyebrow="Precio orientativo"
              title="Precio orientativo por incidente creado."
              text="Base inicial: ARS 10.000 por incidente. El alcance se ajusta según volumen, protocolo y operación."
            />

            <div className="mt-8 2xl:mt-12 grid lg:grid-cols-[.92fr_1.08fr] gap-5 lg:gap-7">
              <FadeIn>
                <div className="h-full rounded-[2rem] border border-[#00dfdf]/20 bg-[#071515] p-5 2xl:p-7 shadow-[0_0_50px_rgba(0,223,223,0.08)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#00dfdf]/10 border border-[#00dfdf]/25 flex items-center justify-center">
                      <Calculator className="text-[#00dfdf]" />
                    </div>
                    <div>
                      <p className="font-manrope text-sm font-bold text-[#00dfdf] uppercase tracking-widest">
                        Calculadora simple
                      </p>
                      <p className="font-inter text-xs text-gray-500">Referencia para dimensionar</p>
                    </div>
                  </div>

                  <SliderField
                    label="Edificios administrados"
                    value={buildings}
                    min={5}
                    max={150}
                    step={5}
                    suffix="edificios"
                    onChange={setBuildings}
                  />
                  <SliderField
                    label="Eventos de incidente por mes"
                    value={monthlyEvents}
                    min={1}
                    max={250}
                    step={1}
                    suffix="eventos"
                    onChange={setMonthlyEvents}
                  />

                  <div className="mt-4 rounded-2xl bg-black/30 border border-white/10 p-4">
                    <p className="font-inter text-xs text-gray-400 mb-1.5">Eventos estimados por mes</p>
                    <p className="font-manrope text-3xl font-extrabold text-white mb-2">{monthlyIncidents}</p>
                    <p className="font-inter text-xs text-gray-400 mb-1.5">Inversión orientativa</p>
                    <p className="font-manrope text-3xl md:text-[34px] font-extrabold text-[#00dfdf]">
                      {formatARS(monthlyPrice)}
                    </p>
                    <p className="font-inter text-[11px] text-gray-500 mt-3 leading-relaxed">
                      Estimación no vinculante. No incluye ajustes de alcance, operación especial ni integraciones adicionales.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1} className="h-full">
                <div className="h-full rounded-[2rem] border border-white/10 bg-[#111111] p-5 2xl:p-7 flex flex-col justify-between">
                  <div>
                  <p className="font-manrope text-[10px] font-bold text-[#00dfdf] uppercase tracking-widest mb-3">
                    Lo que compra la administradora
                  </p>
                  <h3 className="font-manrope text-2xl md:text-3xl 2xl:text-4xl font-extrabold text-white leading-tight mb-4">
                    Pagás por incidentes creados, con alcance ajustado al cliente.
                  </h3>
                  <div className="space-y-2.5">
                    {[
                    "Una entrada ordenada para guardias y consultas.",
                    "Un protocolo claro, incluso fuera de horario.",
                    "Un registro útil para operar, revisar y reportar.",
                    "Un piloto controlado antes de escalar.",
                    ].map((item) => (
                      <div key={item} className="flex gap-3">
                        <CheckCircle2 size={18} className="text-[#00dfdf] shrink-0 mt-0.5" />
                        <p className="font-inter text-sm 2xl:text-base text-gray-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-3 gap-3">
                    {[
                      ["Base", "ARS 10.000"],
                      ["Unidad", "por incidente"],
                      ["Ajuste", "caso por caso"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 2xl:p-4">
                        <p className="font-inter text-[11px] text-gray-500 mb-1">{label}</p>
                        <p className="font-manrope text-base font-extrabold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-5">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex">
                      <Button className="h-14 px-6 rounded-full bg-white text-black hover:bg-[#00dfdf] font-manrope font-extrabold transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98]">
                        Conversar implementación
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="relative py-12 md:py-14 2xl:py-24 bg-gradient-to-b from-[#080808] via-[#070b0b] to-[#080808]">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <SectionHeader
              eyebrow="Preguntas frecuentes"
              title="Dudas habituales de una administración."
              text="Las preguntas más comunes antes de ordenar la atención por WhatsApp."
            />

            <FadeIn className="mt-8">
              <Accordion type="single" collapsible className="space-y-3">
                {FAQ.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`faq-${index}`}
                    className="rounded-2xl border border-white/10 bg-[#111111] px-5"
                  >
                    <AccordionTrigger className="font-manrope text-left text-white hover:text-[#00dfdf] hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-inter text-gray-400 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>

        <section id="cta-section" className="relative py-12 md:py-14 2xl:py-24 bg-gradient-to-b from-[#080808] via-[#0a1010] to-[#090909] overflow-hidden">
          <BackgroundGrid />
          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
            <FadeIn>
              <div className="relative overflow-hidden rounded-[2rem] border border-[#00dfdf]/15 bg-[#101010]/80 px-6 py-8 md:px-10 md:py-10 shadow-[0_0_60px_rgba(0,223,223,0.08)]">
                <div className="absolute inset-x-10 -top-24 h-44 rounded-full bg-[#00dfdf]/10 blur-[80px]" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
                    <PhoneCall size={14} className="text-emerald-400" />
                    <span className="text-[10px] font-manrope font-bold text-emerald-300 tracking-widest uppercase">
                      Guardia técnica más clara
                    </span>
                  </div>
                  <h2 className="font-manrope text-3xl md:text-[38px] 2xl:text-5xl font-extrabold text-white leading-tight mb-4">
                    Si tu administradora atiende por WhatsApp, EFEMAQ puede ordenarlo.
                  </h2>
                  <p className="font-inter text-gray-400 text-sm md:text-base 2xl:text-lg leading-relaxed max-w-2xl mx-auto mb-6 2xl:mb-8">
                    Revisamos tu forma actual de atención y armamos un piloto adaptado al volumen, horarios y responsables de cada cliente.
                  </p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <Button className="group h-14 px-8 rounded-full bg-[#00dfdf] hover:bg-[#00c4c4] text-black font-manrope font-extrabold text-lg shadow-[0_0_30px_rgba(0,223,223,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(0,223,223,0.4)] active:scale-[0.98]">
                      <PhoneCall className="mr-2 w-5 h-5" />
                      Hablar por WhatsApp
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

function BackgroundGrid({ subtle = false }: { subtle?: boolean }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div
        className={subtle ? "absolute inset-0 opacity-[0.04]" : "absolute inset-0 opacity-[0.08]"}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[380px] bg-[#006262] opacity-[0.08] blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <FadeIn className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
        <Zap size={13} className="text-[#00dfdf]" />
        <span className="text-[10px] font-manrope font-bold text-[#00dfdf] uppercase tracking-widest">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-manrope text-3xl md:text-[38px] 2xl:text-5xl font-extrabold text-white leading-tight mb-3 2xl:mb-5">
        {title}
      </h2>
      <p className="font-inter text-gray-400 text-sm md:text-base 2xl:text-lg leading-relaxed">{text}</p>
    </FadeIn>
  )
}

function HeroDemo() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-[#00dfdf]/10 blur-[90px] rounded-full opacity-70" />
      <div className="relative grid md:grid-cols-[minmax(280px,340px)_minmax(300px,370px)] gap-4 xl:gap-5 items-center justify-center max-w-[760px] 2xl:max-w-[860px] mx-auto">
        <ConversationPhone
          messages={HERO_MESSAGES}
          title="Maqui"
          subtitle="Asistente virtual EFEMAQ"
          className="h-[520px] md:h-[500px] xl:h-[486px] 2xl:h-[630px] max-w-[318px] 2xl:max-w-[370px]"
          animated={false}
          showInput
        />

        <div className="h-full min-h-[430px] md:min-h-[448px] 2xl:min-h-[580px] rounded-[2rem] border border-white/10 bg-[#101010]/95 backdrop-blur-xl p-4 md:p-5 2xl:p-6 shadow-2xl flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4 mb-4 2xl:mb-6">
            <div>
              <p className="font-manrope text-xs font-bold text-[#00dfdf] uppercase tracking-widest">
                Panel operativo
              </p>
              <h3 className="font-manrope text-2xl 2xl:text-3xl font-extrabold text-white mt-1 leading-tight">
                Incidente listo para derivar
              </h3>
            </div>
            <div className="w-11 h-11 2xl:w-12 2xl:h-12 rounded-2xl border border-amber-400/30 bg-amber-400/10 flex items-center justify-center shrink-0 text-amber-300">
              <Wrench size={20} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 2xl:p-5 mb-4 2xl:mb-5">
            <p className="font-manrope text-base 2xl:text-xl font-extrabold text-white leading-tight mb-2">
              Maqui valida, clasifica y registra antes de mover a la guardia.
            </p>
            <p className="font-inter text-xs 2xl:text-sm text-gray-400 leading-relaxed">
              La administración recibe un caso con domicilio, categoría, detalle y próximo paso claro.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <StatusPill label="Domicilio" value="Mitre 1240 · 6° B" color="#00dfdf" />
            <StatusPill label="Tipo de solicitud" value="Guardia técnica" color="#f59e0b" />
            <StatusPill label="Categoría" value="Electricidad" color="#10b981" />
            <StatusPill label="Resultado" value="Incidente creado" color="#f59e0b" />
          </div>

          <div className="mt-4 rounded-2xl border border-[#00dfdf]/15 bg-[#00dfdf]/[0.045] px-4 py-3 flex items-center gap-3">
            <ShieldCheck size={18} className="text-[#00dfdf] shrink-0" />
            <p className="font-inter text-xs 2xl:text-sm text-gray-300 leading-relaxed">
              La guardia recibe el caso con datos mínimos, prioridad y próximo paso.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

}

function ConversationPhone({
  messages,
  title,
  subtitle,
  className = "",
  style,
  animated = true,
  showInput = false,
}: {
  messages: Array<{ from: string; text: string; options?: string[] }>
  title: string
  subtitle: string
  className?: string
  style?: React.CSSProperties
  animated?: boolean
  showInput?: boolean
}) {
  return (
    <div
      style={style}
      className={`mx-auto w-full rounded-[2.2rem] border-[5px] border-[#1c1c1c] bg-[#050505] overflow-hidden shadow-2xl ring-1 ring-white/10 ${className}`}
    >
      <div className="h-[58px] bg-[#111111] border-b border-white/10 px-4 flex items-end pb-3">
        <div className="flex items-center gap-3 w-full">
          <div className="relative w-9 h-9 rounded-full bg-[#006262] overflow-hidden ring-1 ring-[#00dfdf]/20 shadow-[0_0_22px_rgba(0,223,223,0.18)]">
            <Image src="/logo.jpg" alt="EFEMAQ" fill sizes="36px" className="object-cover" />
          </div>
          <div>
            <p className="font-manrope text-sm font-bold text-white">{title}</p>
            <p className="font-inter text-[10px] text-emerald-400">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="h-[calc(100%-58px)] bg-[#090909] flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 md:p-4 pr-2 flex flex-col gap-2.5 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(0,223,223,0.35)_transparent]">
          <div className="mx-auto rounded-full bg-white/[0.06] border border-white/10 px-3 py-1 font-inter text-[10px] text-gray-500">
            Hoy
          </div>
          {messages.map((message, index) => (
            <ChatBubble
              key={`${message.from}-${index}-${message.text}`}
              message={message}
              index={index}
              animated={animated}
            />
          ))}
        </div>

        {showInput && (
          <div className="border-t border-white/10 bg-[#0f0f0f] px-4 py-3">
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 font-inter text-[11px] text-gray-500">
              Escribir un mensaje...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ChatBubble({
  message,
  index,
  animated,
}: {
  message: { from: string; text: string; options?: string[] }
  index: number
  animated: boolean
}) {
  const bubble = (
    <div className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[12.5px] md:text-[13px] leading-snug whitespace-pre-line ${
          message.from === "user"
            ? "bg-[#006262] text-white rounded-tr-sm"
            : message.from === "system"
              ? "bg-amber-500/10 border border-amber-500/20 text-amber-100"
              : message.from === "agent"
                ? "bg-[#00dfdf]/10 border border-[#00dfdf]/20 text-cyan-50"
                : "bg-[#1b1b1b] border border-white/10 text-gray-200 rounded-tl-sm"
        }`}
      >
        <p>{message.text}</p>
        {message.options && (
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {message.options.map((option) => (
              <div
                key={option}
                className="rounded-xl border border-[#00dfdf]/20 bg-[#00dfdf]/[0.055] px-2.5 py-1.5 font-manrope text-[10.5px] font-bold text-cyan-50"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (!animated) {
    return bubble
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      {bubble}
    </motion.div>
  )
}

function WhatsAppMock({ scenario }: { scenario: (typeof SCENARIOS)[number] }) {
  return (
    <ConversationPhone
      messages={scenario.messages}
      title="Maqui"
      subtitle="Conversación guiada"
      className="h-[470px] 2xl:h-[580px] max-w-xs 2xl:max-w-sm"
      style={{ height: 448, maxWidth: 258 }}
      animated
      showInput
    />
  )
}

function PanelMock({ scenario }: { scenario: (typeof SCENARIOS)[number] }) {
  const statusItems = [
    {
      label: "Canal",
      value: scenario.id === "horario" ? "Atención humana" : "WhatsApp",
    },
    {
      label: "Tipo de pedido",
      value:
        scenario.id === "consulta"
          ? "Consulta"
          : scenario.id === "guardia"
            ? "Guardia"
            : scenario.id === "datos"
              ? "Domicilio"
              : "Atención",
    },
    {
      label: "Datos",
      value: scenario.id === "datos" ? "Confirmados" : "Completos",
    },
    { label: "Próximo paso", value: "Seguimiento" },
  ]

  return (
    <div
      style={{ height: 448 }}
      className="rounded-[2rem] border border-white/10 bg-[#101010] p-4 2xl:p-6 shadow-2xl h-[470px] 2xl:h-[580px] flex flex-col justify-between overflow-hidden"
    >
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <p className="font-manrope font-bold text-white">Resumen para el equipo</p>
          <p className="font-inter text-xs text-gray-500">Datos ordenados para decidir rápido</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-manrope font-bold">
          Online
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-black/25 border border-white/10 p-4 2xl:p-5">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0"
            style={{ color: scenario.color, borderColor: `${scenario.color}45`, backgroundColor: `${scenario.color}14` }}
          >
            <scenario.icon size={20} />
          </div>
          <div>
            <p className="font-manrope text-base 2xl:text-lg font-extrabold text-white leading-tight">{scenario.title}</p>
            <p className="font-inter text-[11px] 2xl:text-xs text-gray-500 leading-relaxed mt-1">{scenario.result}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <StatusPill label="Resultado" value={scenario.status} color={scenario.color} />
          <StatusPill label="Equipo" value={scenario.owner} color="#00dfdf" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {statusItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2"
          >
            <span className="font-inter text-[11px] text-gray-500 block mb-1">
              {item.label}
            </span>
            <span className="text-xs 2xl:text-sm font-manrope font-extrabold text-white leading-tight block">
              {item.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}

function StatusPill({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/10 px-3.5 py-2.5">
      <p className="font-inter text-[11px] text-gray-500 mb-1">{label}</p>
      <p className="font-manrope text-[13px] 2xl:text-sm font-extrabold leading-snug" style={{ color }}>
        {value}
      </p>
    </div>
  )
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix: string
  onChange: (value: number) => void
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-4 mb-2.5">
        <label className="font-manrope text-sm font-bold text-white">{label}</label>
        <span className="font-inter text-sm text-[#00dfdf]">
          {value.toLocaleString("es-AR")} {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[#00dfdf]"
      />
    </div>
  )
}
