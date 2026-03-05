import type { Metadata } from 'next';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceGrid from '../../components/services/ServiceGrid';
import CtaBooking from '../../components/services/CtaBooking';
import FooterSection from '../../components/FooterSection';
import StructuredData from '../../components/StructuredData';
import {
  createPageMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
} from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Services',
  description:
    'Explore Mendy Studios photography, videography, streaming, editing, and studio session services in Gauteng.',
  path: '/services',
  keywords: ['photography services Gauteng', 'videography services Midrand', 'studio sessions Johannesburg'],
});

const servicesFaqSchema = getFAQSchema([
  {
    question: 'Does Mendy Studios provide both photography and videography?',
    answer:
      'Yes, Mendy Studios provides professional photography and videography services for personal and corporate projects.',
  },
  {
    question: 'Are services available outside Midrand?',
    answer:
      'Yes, services are available across Gauteng and can be arranged for broader South African locations.',
  },
]);

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        id="schema-services-breadcrumb"
        data={
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ])
        }
      />
      <StructuredData id="schema-services-core" data={getServiceSchema()} />
      <StructuredData id="schema-services-faq" data={servicesFaqSchema} />

      <ServiceHero />

      <section data-reveal className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover the wide range of professional photography and videography services we offer to make your moments unforgettable.
          </p>
          <ServiceGrid />
        </div>
      </section>

      <CtaBooking />
      <FooterSection />
    </>
  );
}
