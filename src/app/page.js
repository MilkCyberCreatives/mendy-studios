import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import GallerySection from '../components/GallerySection';
import ServicesSection from '../components/ServicesSection';
import StoriesSection from '../components/StoriesSection';
import TrustSignalsSection from '../components/TrustSignalsSection';
import ContactCTASection from '../components/ContactCTASection';
import ClientsSection from '../components/ClientsSection';
import FooterSection from '../components/FooterSection';
import StructuredData from '../components/StructuredData';
import {
  createPageMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  getBookingProcessSchema,
  getServiceSchema,
} from '../lib/seo';

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

const homeFaqSchema = getFAQSchema([
  {
    question: 'Where does Mendy Studios provide photography and videography services?',
    answer:
      'Mendy Studios serves Gauteng and surrounding South African regions, including Johannesburg, Pretoria, and Midrand.',
  },
  {
    question: 'What services does Mendy Studios offer?',
    answer:
      'The studio offers photography, videography, streaming, editing, and studio session services for personal and corporate clients.',
  },
]);

export default function Home() {
  return (
    <>
      <StructuredData
        id="schema-home-breadcrumb"
        data={getBreadcrumbSchema([{ name: 'Home', path: '/' }])}
      />
      <StructuredData id="schema-home-services" data={getServiceSchema()} />
      <StructuredData id="schema-home-faq" data={homeFaqSchema} />
      <StructuredData id="schema-home-howto" data={getBookingProcessSchema()} />

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
