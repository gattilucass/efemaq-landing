export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness", // O "GeneralContractor"
    "name": "EFEMAQ",
    "image": "https://www.efemaq.com.ar/opengraph-image.png", // Tu imagen
    "description": "Servicio integral de mantenimiento para edificios, locales y hogares.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Buenos Aires", // Ajustar ciudad
      "addressRegion": "Buenos Aires", // Ajustar región
      "addressCountry": "AR"
    },
    "url": "https://www.efemaq.com.ar",
    "telephone": "+5491126547271", // Tu número real
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}