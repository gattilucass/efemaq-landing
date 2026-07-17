"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { ArrowRight, CheckCircle2, Loader2, Mail, ShieldCheck } from "lucide-react"

type FormState = {
  nombre: string
  administradora: string
  email: string
  whatsapp: string
  edificios: string
  horario_guardia: string
  privacidad: boolean
}

const EMPTY_FORM: FormState = {
  nombre: "",
  administradora: "",
  email: "",
  whatsapp: "",
  edificios: "",
  horario_guardia: "",
  privacidad: false,
}

const DRAFT_KEY = "efemaq_guardia_lead_draft_v1"

function getAttribution() {
  if (typeof window === "undefined") {
    return { rid: "", utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "" }
  }

  const params = new URLSearchParams(window.location.search)
  return {
    rid: params.get("rid") || "",
    utm_source: params.get("utm_source") || "direct",
    utm_medium: params.get("utm_medium") || "website",
    utm_campaign: params.get("utm_campaign") || "guardia_integral_2026",
    utm_content: params.get("utm_content") || "landing",
  }
}

export default function GuardiaLeadForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const startedRef = useRef(false)
  const startedAtRef = useRef(Date.now())
  const attribution = useMemo(getAttribution, [])

  useEffect(() => {
    try {
      const draft = window.localStorage.getItem(DRAFT_KEY)
      if (draft) setForm({ ...EMPTY_FORM, ...JSON.parse(draft), privacidad: false })
    } catch {
      // El almacenamiento local es una mejora; el formulario funciona sin él.
    }
  }, [])

  useEffect(() => {
    if (status === "success") return
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form))
    } catch {
      // No interrumpir la carga si el navegador bloquea localStorage.
    }
  }, [form, status])

  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    track("guardia_form_start", {
      attributed: Boolean(attribution.rid),
      campaign: attribution.utm_campaign,
      source: attribution.utm_source,
    })
  }

  const update = (field: keyof FormState, value: string | boolean) => {
    markStarted()
    setForm((current) => ({ ...current, [field]: value }))
  }

  const fallbackMailto = useMemo(() => {
    const subject = encodeURIComponent("Reunión por Guardia Integral EFEMAQ")
    const body = encodeURIComponent(
      `Hola Lucas, quiero coordinar una reunión por la Guardia Integral de EFEMAQ.\n\nNombre: ${form.nombre}\nAdministradora: ${form.administradora}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp || "No informado"}\nEdificios: ${form.edificios || "No informado"}\nHorario de interés: ${form.horario_guardia || "No informado"}`,
    )
    return `mailto:lgatti@efemaq.com.ar?subject=${subject}&body=${body}`
  }, [form])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.privacidad || status === "sending") return

    setStatus("sending")
    setErrorMessage("")

    try {
      const response = await fetch("/api/guardia-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...attribution,
          website: honeypot,
          client_submission_id: crypto.randomUUID(),
          form_started_at: new Date(startedAtRef.current).toISOString(),
        }),
      })

      if (!response.ok) throw new Error("integration_unavailable")

      setStatus("success")
      window.localStorage.removeItem(DRAFT_KEY)
      track("guardia_form_complete", {
        attributed: Boolean(attribution.rid),
        campaign: attribution.utm_campaign,
        source: attribution.utm_source,
      })
    } catch {
      setStatus("error")
      setErrorMessage("No pudimos registrar la solicitud en este momento. Conservamos lo que completaste en este navegador.")
      track("guardia_form_error", {
        campaign: attribution.utm_campaign,
        source: attribution.utm_source,
      })
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[28px] border border-emerald-400/20 bg-[#0b1512] p-8 text-center shadow-2xl shadow-black/30 md:p-10" role="status">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="mt-6 font-manrope text-2xl font-extrabold text-white">Solicitud recibida</h3>
        <p className="mx-auto mt-3 max-w-md font-inter text-sm leading-relaxed text-gray-300">
          Lucas va a contactarte para coordinar una reunión virtual con Fernando y revisar la cobertura que necesita tu administradora.
        </p>
        <p className="mt-5 font-inter text-xs text-gray-500">También podés escribir a lgatti@efemaq.com.ar.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} onFocus={markStarted} className="rounded-[28px] border border-white/12 bg-[#0b1010]/95 p-6 shadow-2xl shadow-black/35 md:p-8" noValidate>
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00dfdf]/20 bg-[#00dfdf]/8 text-[#00dfdf]">
          <Mail size={19} />
        </div>
        <div>
          <h3 className="font-manrope text-xl font-extrabold text-white">Coordinar una reunión</h3>
          <p className="mt-1 font-inter text-xs leading-relaxed text-gray-500">Completá los datos y Lucas se ocupa de encontrar un horario.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre y apellido" required>
          <input
            required
            autoComplete="name"
            value={form.nombre}
            onChange={(event) => update("nombre", event.target.value)}
            className={inputClass}
            placeholder="Tu nombre"
          />
        </Field>
        <Field label="Administradora o empresa" required>
          <input
            required
            autoComplete="organization"
            value={form.administradora}
            onChange={(event) => update("administradora", event.target.value)}
            className={inputClass}
            placeholder="Nombre de la administradora"
          />
        </Field>
        <Field label="Email" required>
          <input
            required
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className={inputClass}
            placeholder="nombre@empresa.com.ar"
          />
        </Field>
        <Field label="WhatsApp (opcional)">
          <input
            type="tel"
            autoComplete="tel"
            value={form.whatsapp}
            onChange={(event) => update("whatsapp", event.target.value)}
            className={inputClass}
            placeholder="+54 9 ..."
          />
        </Field>
        <Field label="Cantidad aproximada de edificios">
          <select value={form.edificios} onChange={(event) => update("edificios", event.target.value)} className={inputClass}>
            <option value="">Seleccionar</option>
            <option value="1-10">1 a 10</option>
            <option value="11-30">11 a 30</option>
            <option value="31-100">31 a 100</option>
            <option value="101-300">101 a 300</option>
            <option value="301+">Más de 300</option>
          </select>
        </Field>
        <Field label="Horario de guardia de interés">
          <input
            value={form.horario_guardia}
            onChange={(event) => update("horario_guardia", event.target.value)}
            className={inputClass}
            placeholder="Ej.: noches y fines de semana"
          />
        </Field>
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="guardia-website">Sitio web</label>
        <input id="guardia-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-3.5">
        <input
          required
          type="checkbox"
          checked={form.privacidad}
          onChange={(event) => update("privacidad", event.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/30 accent-[#00dfdf]"
        />
        <span className="font-inter text-[11px] leading-relaxed text-gray-400">
          Acepto que EFEMAQ use estos datos para responder mi consulta y coordinar la reunión, conforme a la{" "}
          <Link href="/privacidad" target="_blank" className="text-gray-200 underline decoration-white/30 underline-offset-2 hover:text-white">
            Política de Privacidad
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/7 p-4" role="alert">
          <p className="font-inter text-xs leading-relaxed text-amber-100">{errorMessage}</p>
          <a href={fallbackMailto} className="mt-2 inline-flex items-center font-manrope text-xs font-bold text-white underline decoration-white/30 underline-offset-4">
            Enviar los datos por email
            <ArrowRight className="ml-1.5" size={14} />
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !form.privacidad}
        className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#00dfdf] px-6 font-manrope text-sm font-extrabold text-black transition hover:bg-[#28eded] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={18} />
            Enviando solicitud
          </>
        ) : (
          <>
            Coordinar reunión de 20 minutos
            <ArrowRight className="ml-2" size={18} />
          </>
        )}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 font-inter text-[10px] text-gray-600">
        <ShieldCheck size={13} />
        Tus datos no se publican ni se incorporan a listas de difusión.
      </div>
    </form>
  )
}

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/25 px-3.5 font-inter text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-[#00dfdf]/50 focus:ring-2 focus:ring-[#00dfdf]/10"

function Field({ children, label, required = false }: { children: React.ReactNode; label: string; required?: boolean }) {
  return (
    <label className="font-manrope text-[11px] font-bold text-gray-300">
      {label}
      {required && <span className="ml-1 text-[#00dfdf]">*</span>}
      {children}
    </label>
  )
}
