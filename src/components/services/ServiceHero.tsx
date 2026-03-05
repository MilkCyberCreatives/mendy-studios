'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageBreadcrumb from '../PageBreadcrumb';

export default function ServiceHero() {
  return (
    <section data-reveal className="relative min-h-[60vh] w-full overflow-hidden bg-black text-white">
      <Image
        src="/images/services/services-hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(242,103,34,0.16),transparent_35%),radial-gradient(circle_at_84%_10%,rgba(255,255,255,0.08),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col justify-center gap-6 px-6 pb-12 pt-32">
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />

        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Services <span className="text-[#F26722]">We Offer</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Explore a wide range of high-end photography and videography solutions tailored to
            your special moments.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

