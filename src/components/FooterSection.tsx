'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FooterSection() {
  return (
    <footer className="relative bg-black py-20 px-6 text-gray-300 overflow-hidden">
      {/* Background Gradient Light Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-black to-[#0d0d0d] opacity-90 z-0" />

      {/* Glowing Top Border */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[2px] w-[80%] bg-gradient-to-r from-transparent via-[#F26722] to-transparent animate-pulse z-10" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="mendy-studios-logo-white.svg"
            alt="Mendy Studios"
            width={160}
            height={60}
            className="mb-3"
          />
        </motion.div>

        {/* About */}
        <motion.p
          className="text-gray-400 max-w-2xl text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Mendy Studios is a Midrand-based photography & videography brand that captures life’s most important moments with elegance and clarity. We don’t just shoot—we tell stories.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="flex space-x-5 text-xl mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="https://facebook.com/mendystudios" target="_blank" className="hover:text-[#F26722] transition-all">
            <FaFacebookF />
          </Link>
          <Link href="https://instagram.com/mendystudios" target="_blank" className="hover:text-[#F26722] transition-all">
            <FaInstagram />
          </Link>
          <Link href="https://youtube.com/@mendystudios" target="_blank" className="hover:text-[#F26722] transition-all">
            <FaYoutube />
          </Link>
        </motion.div>

        {/* Links */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/services" className="hover:text-white">Services</Link>
          <Link href="/gallery" className="hover:text-white">Gallery</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </motion.div>

        {/* Scroll to Top */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-8 bg-[#F26722] text-white p-3 rounded-full shadow-xl hover:bg-[#d6551c] transition-all"
        >
          <FaArrowUp />
        </motion.button>
      </div>

      {/* Copyright & Credit */}
      <div className="text-center text-gray-500 text-xs mt-10 relative z-10 space-y-2">
        <div>
          &copy; {new Date().getFullYear()} Mendy Studios. All rights reserved.
        </div>
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
