import './globals.css';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import MainHeader from '../components/MainHeader';
import StructuredData from '../components/StructuredData';
import {
  SITE,
  absoluteUrl,
  getLocalBusinessSchema,
  getOrganizationSchema,
  getWebsiteSchema,
} from '../lib/seo';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const GlobalUXEffects = dynamic(() => import('../components/GlobalUXEffects'), { ssr: false });
const MarketingScripts = dynamic(() => import('../components/MarketingScripts'), { ssr: false });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Mendy Studios | Professional Photography & Videography in Gauteng',
    template: `%s | ${SITE.name}`,
  },
  description:
    'Mendy Studios offers professional photography and videography services in Gauteng, South Africa. Specialising in weddings, portraits, events, and corporate shoots.',
  applicationName: SITE.name,
  keywords: SITE.keywords,
  category: 'Photography',
  referrer: 'origin-when-cross-origin',
  creator: SITE.name,
  publisher: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  alternates: {
    canonical: absoluteUrl('/'),
  },
  icons: {
    icon: '/mendy-studios-logo.svg',
    shortcut: '/mendy-studios-logo.svg',
    apple: '/mendy-studios-logo.svg',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Mendy Studios | Professional Photography & Videography in Gauteng',
    description:
      'Premium photography and videography services in Gauteng, Johannesburg, and Pretoria.',
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: '/images/og/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mendy Studios Photography & Videography',
      },
    ],
    locale: SITE.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mendy Studios | Photography & Videography',
    description: 'Professional photography and videography services across Gauteng.',
    images: ['/images/og/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || undefined,
      'yandex-verification':
        process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || undefined,
      'p:domain_verify':
        process.env.NEXT_PUBLIC_PINTEREST_SITE_VERIFICATION || undefined,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0b0b',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-ZA">
      <body className={`${inter.className} bg-black text-white`}>
        <MarketingScripts />
        <GlobalUXEffects />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MainHeader />
        <StructuredData id="schema-organization" data={getOrganizationSchema()} />
        <StructuredData id="schema-local-business" data={getLocalBusinessSchema()} />
        <StructuredData id="schema-website" data={getWebsiteSchema()} />
        <main id="main-content" className="site-main">
          {children}
        </main>
      </body>
    </html>
  );
}
