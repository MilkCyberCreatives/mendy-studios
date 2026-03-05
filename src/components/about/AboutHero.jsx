'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageBreadcrumb from '../PageBreadcrumb';

export default function AboutHero() {
  return (
    <section data-reveal className="relative min-h-[60vh] w-full overflow-hidden text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/about/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center gap-6 px-6 pb-12 pt-32">
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-bold mb-3 md:text-5xl">
            The Story Behind <span className="text-[#F26722]">Mendy Studios</span>
          </h1>
          <p className="text-base text-gray-200 md:text-lg">
            A lens focused on passion, precision, and powerful storytelling.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
