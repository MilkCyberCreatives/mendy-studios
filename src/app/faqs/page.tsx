import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import FooterSection from '../../components/FooterSection';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import StructuredData from '../../components/StructuredData';
import { faqs } from '../../content/faqs';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema } from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'FAQs',
  description:
    'Answers to the most common questions about Mendy Studios photography, videography, bookings, and delivery across Gauteng.',
  path: '/faqs',
  keywords: ['Mendy Studios FAQs', 'photography FAQ Gauteng', 'videography booking questions'],
});

const faqSchema = getFAQSchema(faqs);

export default function FaqPage() {
  return (
    <>
      <StructuredData
        id="schema-faq-breadcrumb"
        data={
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQs', path: '/faqs' },
          ])
        }
      />
      <StructuredData id="schema-faq-page" data={faqSchema} />

      <section data-reveal className="relative isolate overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/services/services-hero-bg.jpg"
            alt="Mendy Studios frequently asked questions background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/74" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative mx-auto flex min-h-[54vh] max-w-7xl flex-col justify-center gap-2 px-6 pb-10 pt-28">
          <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQs' }]} />

          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Frequently Asked Questions</h1>
            <p className="mt-2 max-w-3xl text-gray-200">
              Quick answers about bookings, service coverage, delivery, and the production process
              at Mendy Studios.
            </p>
          </div>
        </div>
      </section>

      <section data-reveal className="bg-black px-6 py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="hover-lift hover-glow group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-white marker:content-none md:text-lg">
                  <span>{item.question}</span>
                  <span className="text-[#F9A26E] transition group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-gray-300 md:text-base">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          <aside className="hover-lift hover-glow h-fit rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 lg:sticky lg:top-28">
            <h2 className="text-2xl font-semibold">Still need help?</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-base">
              If your question is not listed here, send your brief and we will guide you on the
              best photo or video setup for your project.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="hover-lift hover-glow hover-shine inline-flex items-center gap-2 rounded-full border border-[#F26722]/60 bg-[#F26722] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d9561b]"
              >
                Contact Us
                <FaArrowRight className="text-xs" />
              </Link>
              <a
                href="https://wa.me/27732785349"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift inline-flex items-center rounded-full border border-white/25 bg-black/35 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#F26722] hover:text-[#F26722]"
              >
                WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
