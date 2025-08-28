'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about/hero-bg.jpg')" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Overlay Text Only */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-3">
          The Story Behind <span className="text-[#F26722]">Mendy Studios</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg">
          A lens focused on passion, precision, and powerful storytelling.
        </p>
      </motion.div>
    </section>
  );
}
