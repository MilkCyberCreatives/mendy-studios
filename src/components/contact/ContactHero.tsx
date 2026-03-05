'use client';

import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import { trackLead } from '../../lib/marketing';
import { SITE } from '../../lib/seo';
import PageBreadcrumb from '../PageBreadcrumb';

export default function ContactHero() {
  return (
    <section data-reveal className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/contact-bg.jpg"
          alt="Mendy Studios contact background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,103,34,0.25),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(255,255,255,0.12),transparent_30%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-center gap-8 px-6 pb-14 pt-32">
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F26722]/45 bg-[#F26722]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#F9A26E]">
          Contact Mendy Studios
        </span>

        <div className="max-w-4xl space-y-5">
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Let&apos;s build visuals your audience will remember.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
            Tell us what you need and we&apos;ll map out the best photo or video approach for your
            event, campaign, or brand story.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-gray-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2">
            <FaCheckCircle className="text-[#F26722]" />
            Midrand based, Gauteng-wide coverage
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2">
            <FaCheckCircle className="text-[#F26722]" />
            Response in under 24 hours
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2">
            <FaCheckCircle className="text-[#F26722]" />
            Photo and video packages available
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={SITE.phoneHref}
            className="hover-lift hover-glow hover-shine rounded-full bg-[#F26722] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d9561b]"
            onClick={() => trackLead('phone', 'contact_hero')}
          >
            Call {SITE.phone}
          </a>
          <a
            href={SITE.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift hover-glow rounded-full border border-white/30 bg-black/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#F26722] hover:text-[#F26722]"
            onClick={() => trackLead('whatsapp', 'contact_hero')}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
