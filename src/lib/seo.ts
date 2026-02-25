// src/lib/seo.ts
import type { Metadata } from "next";

const DEFAULT_TITLE =
  "Mendy Studios | Professional Photography & Videography in Gauteng";
const DEFAULT_DESCRIPTION =
  "Mendy Studios offers professional photography and videography services in Gauteng, South Africa, including weddings, portraits, events, and corporate shoots.";
const DEFAULT_OG_IMAGE = "/images/og/og-image.jpg";

export const SITE = {
  name: "Mendy Studios",
  legalName: "Mendy Studios",
  domain: "mendystudios.co.za",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.mendystudios.co.za",
  email: "info@mendystudios.co.za",
  phone: "+27 73 278 5349",
  phoneHref: "tel:+27732785349",
  logo: "/mendy-studios-logo.svg",
  logoWhite: "/mendy-studios-logo-white.svg",
  locale: "en_ZA",
  country: "South Africa",
  currency: "ZAR",
  address: {
    street: "Midrand",
    locality: "Midrand",
    region: "Gauteng",
    postalCode: "1685",
    country: "ZA",
  },
  geo: {
    lat: -25.99918,
    lng: 28.12629,
  },
  socials: {
    facebook: "https://www.facebook.com/MendyStudios",
    instagram: "https://www.instagram.com/mendystudios",
    linkedin: "https://www.linkedin.com/company/mendystudios",
    whatsapp: "https://wa.me/27732785349",
    youtube: "https://www.youtube.com/@mendystudios",
  },
  routes: ["/", "/about", "/services", "/gallery", "/motion", "/stories", "/locations", "/contact"],
  keywords: [
    "photographer Johannesburg",
    "wedding photographer Johannesburg",
    "videographer Johannesburg",
    "photographer Pretoria",
    "wedding videographer Gauteng",
    "event photographer Johannesburg",
    "corporate photographer Johannesburg",
    "portrait photographer Johannesburg",
    "product photography Johannesburg",
    "studio photography Johannesburg",
    "engagement photographer Johannesburg",
    "maternity photographer Johannesburg",
    "newborn photographer Johannesburg",
    "family photographer Johannesburg",
    "drone photographer Gauteng",
    "affordable photographer Johannesburg",
    "photographer near me",
    "videographer near me",
    "South Africa photography studio",
    "Gauteng photography and videography",
  ],
} as const;

export type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  images?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}

function socialTitle(title?: string) {
  if (!title) {
    return DEFAULT_TITLE;
  }
  return title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
}

export function createPageMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    path = "/",
    keywords = [],
    images = [DEFAULT_OG_IMAGE],
    type = "website",
    noIndex = false,
  } = options;

  const canonical = absoluteUrl(path);

  return {
    title: title || DEFAULT_TITLE,
    description,
    keywords: [...SITE.keywords, ...keywords],
    alternates: {
      canonical,
      languages: {
        "en-ZA": canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: socialTitle(title),
      description,
      url: canonical,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      images: images.map((image) => ({
        url: absoluteUrl(image),
        width: 1200,
        height: 630,
        alt: `${SITE.name} photography and videography`,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle(title),
      description,
      images: images.map((image) => absoluteUrl(image)),
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    logo: absoluteUrl(SITE.logo),
    sameAs: Object.values(SITE.socials),
    areaServed: ["Gauteng", "South Africa"],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${absoluteUrl("/")}#localbusiness`,
    name: SITE.legalName,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: [
      "Johannesburg",
      "Pretoria",
      "Midrand",
      "Sandton",
      "Centurion",
      "Randburg",
      "Soweto",
      "Gauteng",
      "South Africa",
    ],
    priceRange: "$$",
    sameAs: Object.values(SITE.socials),
    paymentAccepted: ["Cash", "EFT", "Card"],
    currenciesAccepted: SITE.currency,
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en-ZA",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/stories?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type FaqItem = {
  question: string;
  answer: string;
};

export function getFAQSchema(faqItems: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

type StorySchemaInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  keywords?: string[];
};

export function getStorySchema(story: StorySchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.description,
    datePublished: story.publishedAt,
    dateModified: story.updatedAt || story.publishedAt,
    mainEntityOfPage: absoluteUrl(story.path),
    image: absoluteUrl(story.image || DEFAULT_OG_IMAGE),
    author: {
      "@type": "Organization",
      name: SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE.logo),
      },
    },
    keywords: story.keywords || SITE.keywords.slice(0, 10),
    inLanguage: "en-ZA",
  };
}

export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Photography and Videography",
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: ["Gauteng", "South Africa"],
    availableChannel: [
      {
        "@type": "ServiceChannel",
        serviceLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: SITE.address.locality,
            addressRegion: SITE.address.region,
            addressCountry: "ZA",
          },
        },
      },
    ],
  };
}

export function getBookingProcessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to book Mendy Studios",
    description: "Simple process to book photography or videography services.",
    totalTime: "P7D",
    step: [
      {
        "@type": "HowToStep",
        name: "Share your project details",
        text: "Send your event type, preferred date, and location through the contact form, phone, or WhatsApp.",
      },
      {
        "@type": "HowToStep",
        name: "Receive package guidance",
        text: "We confirm availability and recommend the best package for your goals.",
      },
      {
        "@type": "HowToStep",
        name: "Confirm booking",
        text: "Approve the scope and secure your date.",
      },
      {
        "@type": "HowToStep",
        name: "Production and delivery",
        text: "We capture, edit, and deliver polished visuals according to the agreed timeline.",
      },
    ],
  };
}
