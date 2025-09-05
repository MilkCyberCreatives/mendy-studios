// /src/app/layout.js

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './globals.css';
import { Inter } from 'next/font/google';
import MainHeader from '../components/MainHeader';

const inter = Inter({ subsets: ['latin'] });

// ✅ Global Metadata with Open Graph & Twitter Cards
export const metadata = {
  title: 'Mendy Studios | Professional Photography & Videography in Gauteng',
  description:
    'Mendy Studios offers professional photography and videography services in Gauteng, South Africa. Specialising in weddings, portraits, events, and corporate shoots.',

  keywords: [
    'photographer Gauteng',
    'wedding photography Johannesburg',
    'event photography Pretoria',
    'videography Gauteng',
    'corporate photography South Africa',
    'portrait photographer Gauteng',
    'studio photography Johannesburg',
    'professional photographer Gauteng',
    'videographer Pretoria',
    'Mendy Studios'
  ],

  icons: {
    icon: '/mendy-studios-logo.svg',
  },

  openGraph: {
    title: 'Mendy Studios | Professional Photography & Videography',
    description:
      'Premium photography and videography services in Gauteng, Johannesburg, and Pretoria. Capture your moments with Mendy Studios.',
    url: 'https://www.mendystudios.co.za',
    siteName: 'Mendy Studios',
    images: [
      {
        url: '/images/og/og-image.jpg', // 👉 Add this image in public/images/og/
        width: 1200,
        height: 630,
        alt: 'Mendy Studios Photography & Videography',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Mendy Studios | Photography & Videography',
    description:
      'Professional photography and videography services across Gauteng. Weddings, events, corporate shoots, and more.',
    images: ['/images/og/og-image.jpg'],
  },

  metadataBase: new URL('https://www.mendystudios.co.za'),
};

// ✅ Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
