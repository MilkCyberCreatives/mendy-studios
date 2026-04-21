'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import PageBreadcrumb from '../PageBreadcrumb';

export default function ContactHero() {
  return (
    <section data-reveal className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/contact/contact-hero-bg.jpg"
          alt="Mendy Studios contact background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative mx-auto flex min-h-[54vh] max-w-7xl flex-col justify-center gap-1.5 px-6 pb-8 pt-24">
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="max-w-[11ch] text-3xl font-semibold leading-[1.05] sm:max-w-[13ch] md:max-w-none md:text-4xl">
            Let&apos;s build visuals your audience will remember.
          </h1>
          <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-gray-200 md:max-w-2xl md:text-base">
            Tell us what you need and we&apos;ll shape the right photo or video plan for your project.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
