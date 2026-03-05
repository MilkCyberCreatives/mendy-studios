'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageBreadcrumb from '../PageBreadcrumb';

export default function GalleryHero() {
  return (
    <section data-reveal className="relative min-h-[60vh] overflow-hidden text-white">
      <Image
        src="/images/gallery/gallery-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(242,103,34,0.2),transparent_35%),radial-gradient(circle_at_88%_8%,rgba(255,255,255,0.1),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center gap-6 px-6 pb-12 pt-32">
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]} />

        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-[#F26722]">Gallery</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Explore some of the unforgettable moments we&apos;ve captured from weddings to studio
            shoots and everything in between.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
