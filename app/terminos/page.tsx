"use client"

import React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="pt-2">
      <h2 className="text-xl font-manrope font-bold text-white mt-10 mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-gray-300 font-inter text-sm md:text-base leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function BulletList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-2 text-gray-300 font-inter text-sm md:text-base leading-relaxed">
      {children}
    </ul>
  )
}

export default function TerminosPage() {
  return (
    <div className="w-full bg-[#111111] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <header className="mb-10">
          <p className="text-gray-500 font-inter text-sm mb-3">
            Última actualización: 2026
          </p>

          <h1 className="text-4xl md:text-5xl font-manrope font-bold text-white mb-6">
            Términos y Condiciones
          </h1>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 shadow-2xl shadow-black/20">
            <div className="space-y-5 text-gray-300 font-inter text-sm md:text-base leading-relaxed">
              <p>
                Estos Términos y Condiciones regulan el acceso y uso del sitio
                web de EFEMAQ, sus canales de contacto y los servicios
                informativos, comerciales, operativos y de asistencia ofrecidos
                por la empresa.
              </p>

              <p>
                Al utilizar el sitio web, comunicarse con EFEMAQ o solicitar
                servicios por cualquier canal, la persona usuaria acepta estos
                Términos y Condiciones, junto con la Política de Privacidad
                vigente.
              </p>
            </div>
          </div>
        </header>

        <article className="space-y-2">
          <Section title="1. Identificación">
            <p>
              EFEMAQ presta servicios de mantenimiento, instalaciones,
              reparaciones, asistencia operativa y gestión de urgencias o
              emergencias edilicias para consorcios, administraciones, empresas y
              particulares.
            </p>

            <div className="rounded-xl border border-white/10 bg-black/20 p-5 space-y-2">
              <p className="text-white font-semibold">Canales de contacto:</p>
              <p>
                Sitio web:{" "}
                <a
                  href="https://www.efemaq.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:text-gray-200 transition-colors break-words"
                >
                  https://www.efemaq.com.ar
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@efemaq.com.ar"
                  className="text-white underline underline-offset-4 hover:text-gray-200 transition-colors break-words"
                >
                  info@efemaq.com.ar
                </a>
              </p>
              <p>
                Domicilio y datos identificatorios disponibles para requerimientos
                legales o regulatorios a través de{" "}
                <a
                  href="mailto:info@efemaq.com.ar"
                  className="text-white underline underline-offset-4 hover:text-gray-200 transition-colors break-words"
                >
                  info@efemaq.com.ar
                </a>
                .
              </p>
            </div>
          </Section>

          <Section title="2. Uso del sitio web">
            <p>
              El sitio web de EFEMAQ tiene finalidad informativa, institucional y
              comercial. Su contenido puede incluir descripción de servicios,
              datos de contacto, formularios, información general y canales de
              comunicación.
            </p>

            <p>
              La información publicada no constituye una oferta irrevocable ni
              garantiza disponibilidad inmediata de servicios, precios, turnos,
              materiales o técnicos, salvo confirmación expresa de EFEMAQ por un
              canal oficial.
            </p>
          </Section>

          <Section title="3. Servicios">
            <p>
              EFEMAQ ofrece servicios vinculados a mantenimiento edilicio,
              instalaciones eléctricas, refrigeración, gas, agua, pintura, obra
              seca, reparaciones, asistencia técnica y coordinación de
              emergencias, entre otros.
            </p>

            <p>
              El alcance, precio, plazo, modalidad y condiciones de cada servicio
              serán definidos en presupuestos, propuestas, acuerdos comerciales,
              órdenes de trabajo, contratos o comunicaciones específicas con cada
              cliente.
            </p>
          </Section>

          <Section title="4. Canales digitales y WhatsApp">
            <p>
              EFEMAQ puede atender consultas y solicitudes por WhatsApp, correo
              electrónico, teléfono, formularios web, Chatwoot u otros canales
              digitales.
            </p>

            <p>
              El uso de WhatsApp u otros canales de mensajería puede incluir
              respuestas automatizadas, clasificación de solicitudes, derivación a
              operadores humanos y registro de conversaciones para continuidad
              operativa.
            </p>

            <p>
              La persona usuaria se compromete a brindar información clara,
              verdadera y suficiente para permitir la correcta evaluación de la
              solicitud. EFEMAQ no será responsable por demoras, errores o
              imposibilidad de atención derivados de información falsa,
              incompleta, ambigua o desactualizada.
            </p>
          </Section>

          <Section title="5. Emergencias y urgencias">
            <p>
              Los canales de EFEMAQ pueden utilizarse para informar urgencias o
              emergencias edilicias vinculadas a servicios prestados o
              administrados por EFEMAQ o sus clientes.
            </p>

            <p>
              Sin perjuicio de ello, los canales digitales no reemplazan servicios
              públicos de emergencia, bomberos, policía, defensa civil,
              emergencias médicas, empresas de servicios públicos ni autoridades
              competentes.
            </p>

            <p>
              Ante situaciones que impliquen riesgo inmediato para la vida, salud,
              integridad física, incendio, explosión, fuga grave de gas,
              electrocución, derrumbe, inundación severa o cualquier otro peligro
              inminente, la persona usuaria debe comunicarse de inmediato con los
              servicios de emergencia correspondientes.
            </p>

            <p>
              EFEMAQ procurará gestionar las solicitudes recibidas con diligencia,
              pero no garantiza disponibilidad permanente de técnicos, materiales,
              proveedores, acceso al inmueble, autorizaciones de terceros ni
              resolución inmediata de todos los incidentes.
            </p>
          </Section>

          <Section title="6. Automatización e inteligencia artificial">
            <p>
              EFEMAQ puede utilizar sistemas automatizados, reglas de negocio o
              inteligencia artificial para asistir en la atención inicial, ordenar
              información, clasificar incidentes, sugerir respuestas, generar
              resúmenes y derivar casos.
            </p>

            <p>
              Estos sistemas son herramientas de soporte operativo. No sustituyen
              necesariamente el criterio técnico profesional ni la intervención
              humana cuando corresponda.
            </p>

            <p>
              EFEMAQ podrá modificar, suspender o limitar automatizaciones cuando
              lo considere necesario por razones de seguridad, calidad,
              cumplimiento normativo o mejora del servicio.
            </p>
          </Section>

          <Section title="7. Presupuestos, contratación y pagos">
            <p>
              Los presupuestos emitidos por EFEMAQ tendrán la validez, alcance y
              condiciones que se indiquen en cada caso.
            </p>

            <p>
              Salvo indicación expresa, los precios pueden variar por
              disponibilidad de materiales, cambios de alcance, urgencia, horarios
              especiales, condiciones del inmueble, impuestos, costos de traslado,
              mano de obra, proveedores externos o causas ajenas a EFEMAQ.
            </p>

            <p>
              La contratación de servicios puede requerir aceptación expresa del
              presupuesto, pago previo, seña, orden de compra, autorización de la
              administración, aprobación del consorcio o firma de contrato, según
              corresponda.
            </p>
          </Section>

          <Section title="8. Responsabilidades de la persona usuaria o cliente">
            <p>La persona usuaria o cliente debe:</p>

            <BulletList>
              <li>brindar información verdadera, completa y actualizada;</li>
              <li>facilitar el acceso al inmueble cuando sea necesario;</li>
              <li>
                informar riesgos, antecedentes, restricciones, horarios,
                autorizaciones y datos relevantes;
              </li>
              <li>
                obtener permisos de administradores, consorcios, propietarios,
                inquilinos o terceros cuando corresponda;
              </li>
              <li>
                no utilizar los canales de EFEMAQ para fines abusivos,
                fraudulentos, ilegales, ofensivos o ajenos al servicio;
              </li>
              <li>
                no enviar datos sensibles, documentos, claves, datos bancarios
                completos u otra información innecesaria para la prestación del
                servicio.
              </li>
            </BulletList>
          </Section>

          <Section title="9. Limitación de responsabilidad">
            <p>
              EFEMAQ no será responsable por daños, perjuicios, demoras,
              imposibilidad de atención o fallas derivadas de:
            </p>

            <BulletList>
              <li>
                información incorrecta, incompleta o tardía provista por la persona
                usuaria, cliente o terceros;
              </li>
              <li>falta de acceso al inmueble o ausencia de autorizaciones necesarias;</li>
              <li>
                fallas, cortes o restricciones de servicios de terceros como
                internet, telefonía, WhatsApp, Meta, hosting, energía, gas, agua u
                otros proveedores;
              </li>
              <li>
                caso fortuito, fuerza mayor, condiciones climáticas, medidas
                gubernamentales, conflictos gremiales, restricciones de circulación
                o eventos fuera de control razonable;
              </li>
              <li>
                decisiones, omisiones o demoras de administraciones, consorcios,
                propietarios, proveedores externos, empresas de servicios públicos o
                autoridades competentes.
              </li>
            </BulletList>

            <p>
              Nada de lo establecido en estos Términos limita derechos
              irrenunciables que correspondan a consumidores o usuarios conforme a
              la normativa aplicable.
            </p>
          </Section>

          <Section title="10. Propiedad intelectual">
            <p>
              El contenido del sitio web, incluyendo textos, marcas, nombres
              comerciales, logos, diseños, imágenes, gráficos, código, documentos
              y materiales, pertenece a EFEMAQ o se utiliza con autorización.
            </p>

            <p>
              No se permite copiar, reproducir, distribuir, modificar, explotar
              comercialmente o utilizar dichos contenidos sin autorización previa y
              por escrito de EFEMAQ, salvo usos permitidos por la ley.
            </p>
          </Section>

          <Section title="11. Datos personales">
            <p>
              El tratamiento de datos personales se rige por la Política de
              Privacidad publicada en:
            </p>

            <p>
              <a
                href="/privacidad"
                className="text-white underline underline-offset-4 hover:text-gray-200 transition-colors break-words"
              >
                https://www.efemaq.com.ar/privacidad
              </a>
            </p>

            <p>
              Al utilizar los canales de EFEMAQ, la persona usuaria declara
              conocer que sus datos pueden ser tratados para responder consultas,
              prestar servicios, gestionar incidentes, automatizar atención,
              conservar registros y cumplir obligaciones legales u operativas.
            </p>
          </Section>

          <Section title="12. Comunicaciones">
            <p>
              EFEMAQ podrá comunicarse con la persona usuaria o cliente por los
              canales informados, incluyendo WhatsApp, teléfono, correo
              electrónico u otros medios razonables, para responder solicitudes,
              coordinar servicios, enviar información operativa, realizar
              seguimiento o cumplir obligaciones vinculadas al servicio.
            </p>

            <p>
              La persona usuaria podrá solicitar dejar de recibir comunicaciones
              no esenciales por los canales disponibles.
            </p>
          </Section>

          <Section title="13. Enlaces a terceros">
            <p>
              El sitio web o las comunicaciones de EFEMAQ pueden incluir enlaces a
              sitios o servicios de terceros. EFEMAQ no controla ni garantiza el
              contenido, disponibilidad, seguridad o políticas de privacidad de
              dichos sitios externos.
            </p>
          </Section>

          <Section title="14. Modificaciones">
            <p>
              EFEMAQ podrá modificar estos Términos y Condiciones cuando lo
              considere necesario por cambios legales, comerciales, tecnológicos u
              operativos.
            </p>

            <p>
              La versión vigente será la publicada en el sitio web. El uso
              posterior del sitio o de los servicios implicará la aceptación de la
              versión vigente, salvo derechos que no puedan ser renunciados
              conforme a la ley aplicable.
            </p>
          </Section>

          <Section title="15. Ley aplicable y jurisdicción">
            <p>
              Estos Términos se rigen por las leyes de la República Argentina.
            </p>

            <p>
              Ante cualquier controversia, las partes procurarán resolverla de
              buena fe por los canales de contacto disponibles. Cuando corresponda,
              serán aplicables los mecanismos de defensa del consumidor y la
              jurisdicción competente conforme a la normativa vigente.
            </p>
          </Section>

          <Section title="16. Contacto">
            <p>
              Por consultas sobre estos Términos y Condiciones, escribir a:
            </p>

            <p>
              <a
                href="mailto:info@efemaq.com.ar"
                className="text-white underline underline-offset-4 hover:text-gray-200 transition-colors break-words"
              >
                info@efemaq.com.ar
              </a>
            </p>
          </Section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
