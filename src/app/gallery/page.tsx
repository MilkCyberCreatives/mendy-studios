import type { Metadata } from 'next';
import GalleryHero from '../../components/gallery/GalleryHero';
import GalleryGrid from '../../components/gallery/GalleryGrid';
import FooterSection from '../../components/FooterSection';
import StructuredData from '../../components/StructuredData';
import { createPageMetadata, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Gallery',
  description:
    'Browse the Mendy Studios gallery featuring weddings, portraits, events, and studio projects captured across Gauteng.',
  path: '/gallery',
  keywords: ['Mendy Studios gallery', 'wedding gallery Gauteng', 'event photography portfolio'],
});

export default function GalleryPage() {
  return (
    <>
      <StructuredData
        id="schema-gallery-breadcrumb"
        data={
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/gallery' },
          ])
        }
      />
      <GalleryHero />
      <GalleryGrid />
      <FooterSection />
    </>
  );
}
