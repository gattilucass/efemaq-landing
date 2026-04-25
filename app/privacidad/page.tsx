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

export default function PrivacidadPage() {
  return (
    <div className="w-full bg-[#111111] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <header className="mb-10">
          <p className="text-gray-500 font-inter text-sm mb-3">
            Última actualización: 2026
          </p>

          <h1 className="text-4xl md:text-5xl font-manrope font-bold text-white mb-6">
            Política de Privacidad
          </h1>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 shadow-2xl shadow-black/20">
            <div className="space-y-5 text-gray-300 font-inter text-sm md:text-base leading-relaxed">
              <p>
                En EFEMAQ nos comprometemos a proteger la privacidad y los datos
                personales de las personas que visitan nuestro sitio web, se
                comunican con nosotros, solicitan presupuestos, utilizan nuestros
                canales de atención o interactúan con nuestros servicios de
                mantenimiento, asistencia y gestión de emergencias edilicias.
              </p>

              <p>
                Esta Política de Privacidad explica qué datos podemos recolectar,
                para qué los utilizamos, con quiénes podemos compartirlos, durante
                cuánto tiempo los conservamos y cómo pueden ejercerse los derechos
                sobre esos datos.
              </p>
            </div>
          </div>
        </header>

        <article className="space-y-2">
          <Section title="1. Responsable del tratamiento">
            <p>
              El responsable del tratamiento de los datos personales es EFEMAQ.
            </p>

            <div className="rounded-xl border border-white/10 bg-black/20 p-5 space-y-2">
              <p className="text-white font-semibold">Datos de contacto:</p>
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

          <Section title="2. Alcance">
            <p>Esta Política aplica a los datos tratados a través de:</p>

            <BulletList>
              <li>el sitio web de EFEMAQ;</li>
              <li>formularios de contacto, presupuestos y consultas comerciales;</li>
              <li>
                comunicaciones por teléfono, correo electrónico, WhatsApp y otros
                canales digitales;
              </li>
              <li>
                conversaciones gestionadas mediante WhatsApp Business, WhatsApp
                Business Platform, Chatwoot, n8n u otras herramientas de atención;
              </li>
              <li>
                servicios de mantenimiento, urgencias, emergencias edilicias,
                coordinación operativa y seguimiento de incidentes;
              </li>
              <li>
                comunicaciones con clientes, administraciones, consorcios,
                proveedores, técnicos y usuarios finales.
              </li>
            </BulletList>
          </Section>

          <Section title="3. Datos que podemos recolectar">
            <p>
              Según el canal utilizado y la finalidad de la interacción, podemos
              tratar las siguientes categorías de datos:
            </p>

            <BulletList>
              <li>
                <strong className="text-white">Datos identificatorios:</strong>{" "}
                nombre, apellido, razón social, cargo o relación con el inmueble.
              </li>
              <li>
                <strong className="text-white">Datos de contacto:</strong>{" "}
                teléfono, número de WhatsApp, correo electrónico, domicilio o
                dirección del servicio.
              </li>
              <li>
                <strong className="text-white">Datos vinculados al servicio:</strong>{" "}
                edificio, unidad funcional, consorcio, administración, tipo de
                incidente, descripción del problema, urgencia, fotos, audios,
                videos, documentos o cualquier información enviada voluntariamente
                por la persona usuaria.
              </li>
              <li>
                <strong className="text-white">Datos de conversación:</strong>{" "}
                mensajes enviados y recibidos, fecha y hora, estado de la
                conversación, historial de atención, derivaciones a operadores
                humanos y respuestas brindadas.
              </li>
              <li>
                <strong className="text-white">Datos técnicos:</strong> dirección
                IP, navegador, dispositivo, cookies, logs, identificadores
                técnicos, eventos de entrega de mensajes y datos necesarios para
                seguridad, auditoría y funcionamiento de los sistemas.
              </li>
              <li>
                <strong className="text-white">
                  Datos generados por automatización:
                </strong>{" "}
                clasificación de consultas, detección de urgencia, resumen
                operativo, etiquetas internas, estado del caso y sugerencias de
                respuesta.
              </li>
            </BulletList>

            <p>
              EFEMAQ no solicita deliberadamente datos sensibles que no sean
              necesarios para prestar el servicio. Si una persona los envía
              voluntariamente dentro de una conversación, serán utilizados solo en
              la medida estrictamente necesaria para gestionar la solicitud,
              emergencia o reclamo correspondiente.
            </p>
          </Section>

          <Section title="4. Finalidades del tratamiento">
            <p>Los datos personales pueden ser utilizados para:</p>

            <BulletList>
              <li>responder consultas, solicitudes de presupuesto y comunicaciones comerciales;</li>
              <li>prestar servicios de mantenimiento, asistencia, urgencias y emergencias edilicias;</li>
              <li>registrar, clasificar, derivar y hacer seguimiento de incidentes;</li>
              <li>coordinar visitas técnicas, proveedores, administraciones y responsables operativos;</li>
              <li>atender conversaciones por WhatsApp, correo electrónico, teléfono u otros canales;</li>
              <li>automatizar respuestas iniciales, detectar urgencias y ordenar la información recibida;</li>
              <li>derivar conversaciones a operadores humanos cuando corresponda;</li>
              <li>generar registros internos, reportes operativos, auditorías y trazabilidad del servicio;</li>
              <li>mejorar la calidad, seguridad y eficiencia de los procesos de atención;</li>
              <li>cumplir obligaciones legales, contables, fiscales, contractuales o regulatorias;</li>
              <li>
                prevenir abuso, fraude, uso indebido, incidentes de seguridad o
                incumplimientos de políticas aplicables.
              </li>
            </BulletList>
          </Section>

          <Section title="5. Automatización e inteligencia artificial">
            <p>
              EFEMAQ puede utilizar herramientas de automatización, reglas de
              negocio y sistemas de inteligencia artificial para asistir en la
              recepción, clasificación, resumen y priorización de mensajes o
              incidentes.
            </p>

            <p>
              Estas herramientas tienen finalidad operativa y de soporte. No
              reemplazan necesariamente la intervención humana en situaciones que
              requieran criterio técnico, validación, decisión comercial,
              aprobación del cliente o manejo de emergencia.
            </p>

            <p>
              Las respuestas automatizadas pueden estar sujetas a revisión humana.
              EFEMAQ podrá derivar una conversación a un operador humano cuando el
              caso lo requiera, cuando se detecte una urgencia, cuando exista
              ambigüedad o cuando la persona usuaria lo solicite por los canales
              disponibles.
            </p>
          </Section>

          <Section title="6. Base legal y consentimiento">
            <p>
              El tratamiento de datos se realiza conforme a la Ley 25.326 de
              Protección de Datos Personales, sus normas complementarias y demás
              normativa aplicable en la República Argentina.
            </p>

            <p>
              Al utilizar el sitio web, completar formularios, comunicarse con
              EFEMAQ o enviar mensajes por WhatsApp u otros canales, la persona
              usuaria facilita voluntariamente sus datos para las finalidades
              informadas en esta Política.
            </p>

            <p>
              Cuando el tratamiento sea necesario para responder una consulta,
              prestar un servicio solicitado, gestionar una emergencia, ejecutar
              una relación contractual o cumplir obligaciones legales, EFEMAQ podrá
              tratar los datos en la medida necesaria para esas finalidades.
            </p>
          </Section>

          <Section title="7. WhatsApp y canales de mensajería">
            <p>
              Cuando una persona se comunica con EFEMAQ por WhatsApp, sus mensajes
              pueden ser procesados mediante herramientas oficiales de WhatsApp
              Business, WhatsApp Business Platform, Meta, Chatwoot, n8n y otros
              proveedores tecnológicos utilizados para la atención.
            </p>

            <p>
              EFEMAQ utiliza estos canales para responder consultas, coordinar
              servicios, gestionar incidentes y brindar asistencia. Las
              comunicaciones pueden quedar registradas para trazabilidad, calidad
              de servicio, auditoría, seguridad y continuidad operativa.
            </p>

            <p>
              La persona usuaria puede solicitar dejar de recibir comunicaciones no
              esenciales o pedir la baja del canal escribiendo por WhatsApp o a{" "}
              <a
                href="mailto:info@efemaq.com.ar"
                className="text-white underline underline-offset-4 hover:text-gray-200 transition-colors"
              >
                info@efemaq.com.ar
              </a>
              , sin perjuicio de comunicaciones necesarias para servicios en
              curso, obligaciones legales o gestiones ya solicitadas.
            </p>
          </Section>

          <Section title="8. Terceros y proveedores tecnológicos">
            <p>
              Para prestar sus servicios, EFEMAQ puede utilizar proveedores
              externos que actúan como encargados o subencargados de tratamiento,
              incluyendo servicios de hosting, mensajería, automatización, CRM,
              correo electrónico, almacenamiento, analítica, inteligencia
              artificial, soporte técnico y seguridad.
            </p>

            <p>
              Entre dichos proveedores pueden encontrarse, según la configuración
              vigente, Meta/WhatsApp, Chatwoot, n8n, servicios de infraestructura
              cloud, correo electrónico, hojas de cálculo, APIs de inteligencia
              artificial y otros proveedores necesarios para la operación.
            </p>

            <p>
              EFEMAQ no vende datos personales. Los datos solo se comparten cuando
              es necesario para prestar el servicio, cumplir obligaciones legales,
              proteger derechos, prevenir abusos o atender requerimientos de
              autoridad competente.
            </p>
          </Section>

          <Section title="9. Transferencias internacionales">
            <p>
              Algunos proveedores tecnológicos utilizados por EFEMAQ pueden alojar
              o procesar información fuera de la República Argentina. En esos
              casos, EFEMAQ procurará utilizar proveedores reconocidos y medidas
              razonables de protección, seguridad y confidencialidad acordes a la
              finalidad del tratamiento.
            </p>
          </Section>

          <Section title="10. Conservación de datos">
            <p>
              Los datos se conservarán durante el tiempo necesario para cumplir las
              finalidades informadas, prestar el servicio, mantener trazabilidad
              operativa, atender reclamos, cumplir obligaciones legales o conservar
              evidencia de comunicaciones relevantes.
            </p>

            <p>
              Los registros de conversaciones, incidentes y servicios podrán
              conservarse mientras exista una relación comercial, contractual u
              operativa con el cliente, y posteriormente durante los plazos
              necesarios para fines legales, contables, de auditoría, defensa de
              derechos o mejora del servicio.
            </p>
          </Section>

          <Section title="11. Seguridad">
            <p>
              EFEMAQ adopta medidas técnicas y organizativas razonables para
              proteger los datos contra acceso no autorizado, pérdida, alteración,
              uso indebido o divulgación indebida.
            </p>

            <p>
              Estas medidas pueden incluir controles de acceso, credenciales,
              registros de actividad, separación de ambientes, restricciones
              operativas, copias de seguridad y políticas internas de
              confidencialidad.
            </p>

            <p>
              Ningún sistema es absolutamente infalible. Ante incidentes de
              seguridad relevantes, EFEMAQ procurará actuar con diligencia, mitigar
              impactos y realizar las comunicaciones que correspondan conforme a la
              normativa aplicable.
            </p>
          </Section>

          <Section title="12. Derechos de las personas titulares de datos">
            <p>
              Las personas titulares de datos pueden solicitar el acceso,
              rectificación, actualización o supresión de sus datos personales,
              conforme a la Ley 25.326 y normativa complementaria.
            </p>

            <div className="rounded-xl border border-white/10 bg-black/20 p-5 space-y-2">
              <p>Para ejercer estos derechos, pueden comunicarse a:</p>
              <p>
                <a
                  href="mailto:info@efemaq.com.ar"
                  className="text-white underline underline-offset-4 hover:text-gray-200 transition-colors break-words"
                >
                  info@efemaq.com.ar
                </a>
              </p>
            </div>

            <p>
              La solicitud deberá permitir acreditar la identidad de la persona
              solicitante y describir claramente el pedido.
            </p>

            <p>
              La Agencia de Acceso a la Información Pública, órgano de control de
              la Ley 25.326, tiene atribución para atender denuncias y reclamos
              vinculados con el incumplimiento de las normas de protección de datos
              personales.
            </p>

            <p>
              Sitio de la AAIP:{" "}
              <a
                href="https://www.argentina.gob.ar/aaip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-gray-200 transition-colors break-words"
              >
                https://www.argentina.gob.ar/aaip
              </a>
            </p>
          </Section>

          <Section title="13. Cookies y tecnologías similares">
            <p>
              El sitio web puede utilizar cookies o tecnologías similares para
              mejorar la navegación, recordar preferencias, analizar tráfico, medir
              rendimiento y mejorar la experiencia de uso.
            </p>

            <p>
              La persona usuaria puede configurar su navegador para rechazar o
              eliminar cookies. Algunas funcionalidades del sitio podrían verse
              afectadas.
            </p>
          </Section>

          <Section title="14. Menores de edad">
            <p>
              Los servicios de EFEMAQ no están dirigidos específicamente a menores
              de edad. Si una comunicación involucra a menores o datos de menores
              en el marco de un incidente edilicio, esos datos serán tratados solo
              en la medida necesaria para atender la situación informada.
            </p>
          </Section>

          <Section title="15. Cambios en esta Política">
            <p>
              EFEMAQ podrá actualizar esta Política de Privacidad cuando sea
              necesario por cambios legales, operativos, tecnológicos o
              comerciales.
            </p>

            <p>
              La versión vigente será la publicada en el sitio web. Cuando los
              cambios sean sustanciales, EFEMAQ podrá adoptar medidas razonables
              para informarlos por los canales disponibles.
            </p>
          </Section>

          <Section title="16. Contacto">
            <p>
              Por consultas sobre esta Política o sobre el tratamiento de datos
              personales, escribir a:
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
