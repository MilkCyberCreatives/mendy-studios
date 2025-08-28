'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GalleryHero() {
  return (
    <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('/images/gallery/gallery-hero.jpg')" }}>
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-[#F26722]">Gallery</span></h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore some of the unforgettable moments we’ve captured—from weddings to studio shoots and everything in between.
        </p>
      </motion.div>
    </section>
  );
}
