import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"

const optionalText = (max: number) => z.string().trim().max(max).optional().default("")

const EventSchema = z.object({
  event: z.enum(["guardia_landing_visit", "guardia_whatsapp_click"]),
  event_id: z.string().uuid(),
  occurred_at_utc: z.string().datetime(),
  location: z.enum(["page", "hero", "closing", "contact"]),
  rid: z.string().trim().regex(/^[A-Za-z0-9_-]{3,120}$/),
  utm_source: optionalText(100),
  utm_medium: optionalText(100),
  utm_campaign: optionalText(120),
  utm_content: optionalText(120),
})

function clean(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim()
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > 4_096) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 })
  }

  let parsed: z.infer<typeof EventSchema>
  try {
    parsed = EventSchema.parse(await request.json())
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 })
  }

  const occurredAt = Date.parse(parsed.occurred_at_utc)
  if (!Number.isFinite(occurredAt) || Math.abs(Date.now() - occurredAt) > 86_400_000) {
    return NextResponse.json({ ok: false, error: "invalid_timing" }, { status: 400 })
  }

  const webhookUrl = process.env.GUARDIA_LEADS_WEBHOOK_URL
  const webhookToken = process.env.GUARDIA_LEADS_WEBHOOK_TOKEN
  if (!webhookUrl || !webhookToken) {
    return NextResponse.json({ ok: true, forwarded: false }, { status: 202 })
  }

  const payload = {
    event: parsed.event,
    schema_version: 1,
    event_id: parsed.event_id,
    occurred_at_utc: parsed.occurred_at_utc,
    location: parsed.location,
    atribucion: {
      rid: clean(parsed.rid),
      utm_source: clean(parsed.utm_source),
      utm_medium: clean(parsed.utm_medium),
      utm_campaign: clean(parsed.utm_campaign),
      utm_content: clean(parsed.utm_content),
    },
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 3_000)

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${webhookToken}`,
        "Content-Type": "application/json",
        "User-Agent": "EFEMAQ-Guardia-Events/1.0",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    })
    return NextResponse.json({ ok: true, forwarded: response.ok }, { status: 202 })
  } catch {
    return NextResponse.json({ ok: true, forwarded: false }, { status: 202 })
  } finally {
    clearTimeout(timeout)
  }
}
