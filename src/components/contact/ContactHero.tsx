'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="relative h-[60vh] w-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/images/contact/contact-hero-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <motion.div
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Mendy <span className="text-[#F26722]">Studios</span></h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Let's bring your vision to life — reach out to us today.
        </p>
      </motion.div>
    </section>
  );
}
