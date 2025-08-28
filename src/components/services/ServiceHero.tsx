'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceHero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/services/services-hero-bg.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Services <span className="text-[#F26722]">We Offer</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore a wide range of high-end photography and videography solutions tailored to your special moments.
        </motion.p>
      </div>
    </section>
  );
}
