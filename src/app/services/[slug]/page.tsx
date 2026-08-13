import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FooterSection from '../../../components/FooterSection';
import PageBreadcrumb from '../../../components/PageBreadcrumb';
import StructuredData from '../../../components/StructuredData';
import { services, getServiceBySlug } from '../../../content/services';
import { stories } from '../../../content/stories';
import {
  createPageMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  absoluteUrl,
  SITE,
} from '../../../lib/seo';

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: 'Service Not Found',
      path: '/services',
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    images: [service.image],
    keywords: service.tags,
  });
}

function getServiceSchema(service: (typeof services)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: `${SITE.name} ${service.title}`,
    description: service.summary,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
    },
    areaServed: ['Johannesburg', 'Pretoria', 'Midrand', 'Gauteng', 'South Africa'],
    url: absoluteUrl(`/services/${service.slug}`),
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedStories = stories
    .filter((story) => story.tags.some((tag) => service.tags.includes(tag)))
    .slice(0, 3);

  return (
    <>
      <StructuredData
        id="schema-service-breadcrumb"
        data={
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ])
        }
      />
      <StructuredData id="schema-service-detail" data={getServiceSchema(service)} />
      <StructuredData id="schema-service-faq" data={getFAQSchema(service.faqs)} />

      <article data-reveal className="bg-black text-white">
        <section className="px-6 py-14 md:py-16 border-b border-white/10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <PageBreadcrumb
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: service.title },
                ]}
              />
              <h1 className="mt-1 text-4xl font-bold md:text-5xl">{service.title}</h1>
              <p className="mt-2 text-lg text-gray-300">{service.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-lg bg-[#F26722] text-white hover:bg-[#d9571d] transition"
                >
                  Book This Service
                </Link>
                <a
                  href={SITE.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-500 transition"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:py-14 border-b border-white/10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
              <p className="text-gray-300 leading-relaxed mt-4">
                We work across Midrand, Johannesburg, and Pretoria with a structured workflow that protects quality, timeline, and communication from start to finish.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">What You Get</h2>
              <ul className="space-y-3">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="bg-white/5 border border-white/10 rounded-lg p-3 text-gray-200">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:py-14 border-b border-white/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-5">Coverage</h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-2 rounded bg-white/10">Johannesburg</span>
              <span className="px-3 py-2 rounded bg-white/10">Pretoria</span>
              <span className="px-3 py-2 rounded bg-white/10">Midrand</span>
              <span className="px-3 py-2 rounded bg-white/10">Gauteng</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:py-14 border-b border-white/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-5">Common Questions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-medium text-white">{faq.question}</h3>
                  <p className="text-gray-300 mt-2 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:py-14">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between gap-4 mb-5">
              <h2 className="text-2xl font-semibold">Related Stories</h2>
              <Link href="/stories" className="text-sm text-[#F26722] hover:underline">
                View all stories
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedStories.length > 0 ? (
                relatedStories.map((story) => (
                  <Link
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                  >
                    <h3 className="font-medium text-white">{story.title}</h3>
                    <p className="text-sm text-gray-300 mt-2">{story.description}</p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-300">New related stories are coming soon.</p>
              )}
            </div>
          </div>
        </section>
      </article>

      <FooterSection />
    </>
  );
}
