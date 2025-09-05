// src/components/StructuredData.tsx
"use client";

import Script from "next/script";
import { SITE } from "../lib/seo";

type Props = {
  type: "org" | "local" | "website" | "faq";
  faqItems?: { question: string; answer: string }[];
};

export default function StructuredData({ type, faqItems }: Props) {
  const sameAs = Object.values(SITE.socials).filter(Boolean);

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    image: SITE.logo,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      "Johannesburg",
      "Pretoria",
      "Sandton",
      "Midrand",
      "Centurion",
      "Randburg",
      "Soweto",
      "Roodepoort",
      "East Rand",
      "West Rand",
      "Gauteng",
      "South Africa",
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity:
      faqItems?.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })) || [],
  };

  const map: Record<Props["type"], any> = {
    org,
    local: localBusiness,
    website,
    faq,
  };

  return (
    <Script
      id={`jsonld-${type}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(map[type]) }}
    />
  );
}
