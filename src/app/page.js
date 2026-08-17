import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection';
import StoriesSection from '../components/StoriesSection';
import TrustSignalsSection from '../components/TrustSignalsSection';
import StructuredData from '../components/StructuredData';
import {
  createPageMetadata,
  getBreadcrumbSchema,
  getServiceSchema,
} from '../lib/seo';

const AboutSection = dynamic(() => import('../components/AboutSection'));
const GallerySection = dynamic(() => import('../components/GallerySection'));
const ServicesSection = dynamic(() => import('../components/ServicesSection'));
const ContactCTASection = dynamic(() => import('../components/ContactCTASection'));
const ClientsSection = dynamic(() => import('../components/ClientsSection'));
const FooterSection = dynamic(() => import('../components/FooterSection'));

export const metadata = createPageMetadata({
  title: 'Professional Photography & Videography in Gauteng',
  description:
    'Professional photography and videography in Gauteng for weddings, portraits, events, and corporate projects.',
  path: '/',
  keywords: [
    'photographer Gauteng',
    'videographer Johannesburg',
    'wedding photography South Africa',
  ],
});

export default function Home() {
  return (
    <>
      <StructuredData
        id="schema-home-breadcrumb"
        data={getBreadcrumbSchema([{ name: 'Home', path: '/' }])}
      />
      <StructuredData id="schema-home-services" data={getServiceSchema()} />

      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ServicesSection />
      <StoriesSection />
      <TrustSignalsSection />
      <ContactCTASection />
      <ClientsSection />
      <FooterSection />
    </>
  );
}
