// /src/app/layout.js or layout.tsx depending on your setup

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './globals.css';
import { Inter } from 'next/font/google';
import MainHeader from '../components/MainHeader';

const inter = Inter({ subsets: ['latin'] });

// Metadata must be exported ONCE only
export const metadata = {
  title: 'Mendy Studios',
  description: 'Professional Photography & Videography',
  icons: {
    icon: '/mendy-studios-logo.svg', // Uses your public folder icon
  },
};

// Fixed function definition
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* This head tag is optional in case you want to insert anything extra like OG tags */}
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
