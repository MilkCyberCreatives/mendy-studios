import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FooterSection from '../../components/FooterSection';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import StructuredData from '../../components/StructuredData';
import { locations } from '../../content/locations';
import { createPageMetadata, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Service Areas',
  description:
    'Mendy Studios is based in Midrand and provides photography and videography services across Gauteng and selected South African locations.',
  path: '/areas',
});

export default function AreasPage() {
  return (
    <>
      <StructuredData
        id="schema-areas-breadcrumb"
        data={
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Service Areas', path: '/areas' },
          ])
        }
      />

      <section data-reveal className="relative isolate overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/services/services-hero-bg.jpg"
            alt="Mendy Studios service coverage"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/74" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative mx-auto flex min-h-[54vh] max-w-7xl flex-col justify-center gap-2 px-6 pb-10 pt-28">
          <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Service Areas' }]} />
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Where We Work</h1>
            <p className="mt-2 max-w-3xl text-gray-200">
              Based in Midrand, Mendy Studios supports photography and videography projects across
              Gauteng, with travel available for selected productions elsewhere in South Africa.
            </p>
          </div>
        </div>
      </section>

      <section data-reveal className="bg-black px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {locations.map((location) => (
              <article key={location.slug} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-semibold text-white">{location.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{location.description}</p>
                <p className="mt-4 text-sm text-gray-400">
                  Common coverage areas include {location.neighborhoods.join(', ')}.
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center">
            <p className="text-gray-300">Tell us your date, location, and project requirements and we will confirm coverage.</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-lg bg-[#F26722] px-5 py-2.5 font-semibold text-white transition hover:bg-[#d9571d]"
            >
              Enquire About Your Location
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
