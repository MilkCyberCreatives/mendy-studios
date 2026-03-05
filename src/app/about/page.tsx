import type { Metadata } from 'next';
import AboutHero from '../../components/about/AboutHero';
import AboutIntro from '../../components/about/AboutIntro';
import WhyChooseUs from '../../components/about/WhyChooseUs';
import FooterSection from '../../components/FooterSection';
import StructuredData from '../../components/StructuredData';
import { createPageMetadata, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description:
    'Learn about Mendy Studios, a Midrand-based photography and videography studio serving Gauteng and South Africa.',
  path: '/about',
  keywords: ['about Mendy Studios', 'Midrand photography studio', 'South African videography team'],
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        id="schema-about-breadcrumb"
        data={
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ])
        }
      />
      <AboutHero />
      <AboutIntro />
      <WhyChooseUs />
      <FooterSection />
    </>
  );
}
