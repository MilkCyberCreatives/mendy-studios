// src/lib/seo.ts
export const SITE = {
  name: "Mendy Studios",
  domain: "mendy-studios.co.za", // TODO: set your custom domain when live
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mendy-studios.vercel.app",
  email: "booking@mendystudios.co.za",
  phone: "+27 71 234 5678", // TODO
  logo: "/mendy-studios-logo.svg",
  logoWhite: "/mendy-studios-logo-white.svg",
  address: {
    street: "Midrand",
    locality: "Midrand",
    region: "Gauteng",
    postalCode: "1685",
    country: "ZA",
  },
  geo: {
    lat: -26.007, // TODO: approximate Midrand
    lng: 28.126,  // TODO
  },
  socials: {
    facebook: "https://www.facebook.com/MendyStudios",
    instagram: "https://www.instagram.com/mendystudios",
    linkedin: "https://www.linkedin.com/company/mendystudios",
    whatsapp: "https://wa.me/27731085107",
    youtube: "https://www.youtube.com/@mendystudios",
  },
  // Pages you have
  routes: ["/", "/about", "/services", "/gallery", "/contact"],
  // Primary keywords to weave into content/titles
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
  ],
};
