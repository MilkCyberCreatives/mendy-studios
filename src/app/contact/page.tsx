import type { Metadata } from 'next';
import ContactHero from '../../components/contact/ContactHero';
import ContactDetailsSection from '../../components/contact/ContactDetailsSection';
import FooterSection from '../../components/FooterSection';
import StructuredData from '../../components/StructuredData';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema } from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact Mendy Studios in Midrand for photography, videography, and creative production services across Gauteng.',
  path: '/contact',
  keywords: ['contact Mendy Studios', 'book photographer Gauteng', 'Midrand videography contact'],
});

const contactFaqSchema = getFAQSchema([
  {
    question: 'How can I contact Mendy Studios?',
    answer:
      'You can contact Mendy Studios by phone, email, WhatsApp, or by sending a message through the contact form.',
  },
  {
    question: 'Where is Mendy Studios based?',
    answer: 'Mendy Studios is based in Midrand, Gauteng, South Africa.',
  },
]);

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
      <StructuredData id="schema-contact-faq" data={contactFaqSchema} />

      <ContactHero />
      <ContactDetailsSection />
      <FooterSection />
    </>
  );
}
