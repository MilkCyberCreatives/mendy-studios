import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mendy Studios',
    short_name: 'Mendy Studios',
    description:
      'Professional photography and videography services in Gauteng, South Africa.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0b0b',
    theme_color: '#0b0b0b',
    lang: 'en-ZA',
    icons: [
      {
        src: '/mendy-studios-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
