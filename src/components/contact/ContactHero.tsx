'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center bg-cover bg-center bg-[url('/images/contact-bg.jpg')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center text-white px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We don&apos;t just take pictures — we capture unforgettable memories.
        </p>
      </motion.div>
    </section>
  );
}
