'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { trackEvent } from '../lib/marketing';

export default function FooterSection() {
  return (
    <footer data-reveal className="relative bg-black py-20 px-6 text-gray-300 overflow-hidden">
      <div className="absolute inset-0 bg-black/90 z-0" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-[80%] bg-[#F26722]/70 z-10" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/mendy-studios-logo-white.svg"
            alt="Mendy Studios"
            width={160}
            height={60}
            className="mb-3"
          />
        </motion.div>

        <motion.p
          className="text-gray-400 max-w-2xl text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Mendy Studios is a Midrand-based photography & videography brand that captures life&apos;s most important moments with elegance and clarity. We don&apos;t just shoot-we tell stories.
        </motion.p>

        <motion.div
          className="flex space-x-5 text-xl mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="https://facebook.com/mendystudios"
            target="_blank"
            className="hover:text-[#F26722] transition-all"
            onClick={() => trackEvent('social_click', { platform: 'facebook', location: 'footer' })}
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://instagram.com/mendystudios"
            target="_blank"
            className="hover:text-[#F26722] transition-all"
            onClick={() => trackEvent('social_click', { platform: 'instagram', location: 'footer' })}
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://youtube.com/@mendystudios"
            target="_blank"
            className="hover:text-[#F26722] transition-all"
            onClick={() => trackEvent('social_click', { platform: 'youtube', location: 'footer' })}
          >
            <FaYoutube />
          </Link>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/services" className="hover:text-white">Services</Link>
          <Link href="/motion" className="hover:text-white">Motion</Link>
          <Link href="/gallery" className="hover:text-white">Gallery</Link>
          <Link href="/stories" className="hover:text-white">Stories</Link>
          <Link href="/faqs" className="hover:text-white">FAQs</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-8 bg-[#F26722] text-white p-3 rounded-full hover:bg-[#d6551c] transition-all"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </motion.button>
      </div>

      <div className="text-center text-gray-500 text-xs mt-10 relative z-10 space-y-2">
        <div>&copy; {new Date().getFullYear()} Mendy Studios. All rights reserved.</div>
        <div>
          Developed and Designed by{' '}
          <Link
            href="https://www.milkcybercreatives.co.za"
            target="_blank"
            className="text-[#F26722] hover:underline"
          >
            Milk Cyber Creatives
          </Link>
        </div>
      </div>
    </footer>
  );
}
