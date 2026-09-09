import type { Metadata } from 'next';
import ContactHero from '../../components/contact/ContactHero';
import ContactDetailsSection from '../../components/contact/ContactDetailsSection';
import FooterSection from '../../components/FooterSection';
import StructuredData from '../../components/StructuredData';
import { createPageMetadata, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact Mendy Studios in Midrand for photography, videography, and creative production services across Gauteng.',
  path: '/contact',
  keywords: ['contact Mendy Studios', 'book photographer Gauteng', 'Midrand videography contact'],
});

export default function ContactPage() {
  return (
    <>
      <StructuredData
        id="schema-contact-breadcrumb"
        data={
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ])
        }
      />

      <ContactHero />
      <ContactDetailsSection />
      <FooterSection />
    </>
  );
}
