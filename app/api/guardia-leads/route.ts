import { randomUUID } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"

const optionalText = (max: number) => z.string().trim().max(max).optional().default("")

const LeadSchema = z.object({
  nombre: z.string().trim().min(2).max(100),
  administradora: z.string().trim().min(2).max(140),
  email: z.string().trim().email().max(180),
  whatsapp: optionalText(50),
  edificios: optionalText(30),
  horario_guardia: optionalText(160),
  privacidad: z.literal(true),
  website: optionalText(200),
  rid: optionalText(120),
  utm_source: optionalText(100),
  utm_medium: optionalText(100),
  utm_campaign: optionalText(120),
  utm_content: optionalText(120),
  client_submission_id: z.string().uuid(),
  form_started_at: z.string().datetime(),
})

function clean(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim()
}

export async function POST(request: NextRequest) {
  let parsed: z.infer<typeof LeadSchema>

  try {
    parsed = LeadSchema.parse(await request.json())
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 })
  }

  // Los bots reciben una respuesta neutra para no revelar el mecanismo de protección.
  if (parsed.website) return NextResponse.json({ ok: true })

  const startedAt = Date.parse(parsed.form_started_at)
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1_500 || Date.now() - startedAt > 86_400_000) {
    return NextResponse.json({ ok: false, error: "invalid_timing" }, { status: 400 })
  }

  const webhookUrl = process.env.GUARDIA_LEADS_WEBHOOK_URL
  const webhookToken = process.env.GUARDIA_LEADS_WEBHOOK_TOKEN

  if (!webhookUrl || !webhookToken) {
    return NextResponse.json({ ok: false, error: "integration_unavailable" }, { status: 503 })
  }

  const leadId = `web_${randomUUID()}`
  const receivedAtUtc = new Date().toISOString()
  const payload = {
    event: "guardia_lead_created",
    schema_version: 1,
    lead_id: leadId,
    received_at_utc: receivedAtUtc,
    nombre: clean(parsed.nombre),
    administradora: clean(parsed.administradora),
    email: clean(parsed.email).toLowerCase(),
    whatsapp: clean(parsed.whatsapp),
    edificios: clean(parsed.edificios),
    horario_guardia: clean(parsed.horario_guardia),
    privacidad_aceptada: true,
    atribucion: {
      rid: clean(parsed.rid),
      utm_source: clean(parsed.utm_source),
      utm_medium: clean(parsed.utm_medium),
      utm_campaign: clean(parsed.utm_campaign),
      utm_content: clean(parsed.utm_content),
    },
    client_submission_id: parsed.client_submission_id,
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8_000)

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${webhookToken}`,
        "Content-Type": "application/json",
        "User-Agent": "EFEMAQ-Guardia-Leads/1.0",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "integration_unavailable" }, { status: 503 })
    }

    return NextResponse.json({ ok: true, lead_id: leadId, received_at_utc: receivedAtUtc }, { status: 201 })
  } catch {
    return NextResponse.json({ ok: false, error: "integration_unavailable" }, { status: 503 })
  } finally {
    clearTimeout(timeout)
  }
}
