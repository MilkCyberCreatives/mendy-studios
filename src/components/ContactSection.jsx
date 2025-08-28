'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-black via-[#0e0e0e] to-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch relative z-10">
        {/* Left - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Let’s <span className="text-[#F26722]">Connect</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Whether you’re booking a shoot or just want to say hi, we’re ready to hear from you.
          </p>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-[#F26722] text-xl" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-lg font-medium">+27 72 345 6789</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-[#F26722] text-xl" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg font-medium">info@mendystudios.co.za</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-[#F26722] text-xl" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-lg font-medium">Midrand, Gauteng</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl flex flex-col justify-center"
        >
          <form className="space-y-6 text-white">
            <div className="relative">
              <input
                type="text"
                required
                className="peer w-full bg-transparent border-b border-gray-600 py-3 placeholder-transparent focus:outline-none focus:border-[#F26722]"
                placeholder="Name"
              />
              <label className="absolute left-0 top-3 text-sm text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all">
                Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                required
                className="peer w-full bg-transparent border-b border-gray-600 py-3 placeholder-transparent focus:outline-none focus:border-[#F26722]"
                placeholder="Email"
              />
              <label className="absolute left-0 top-3 text-sm text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all">
                Email
              </label>
            </div>

            <div className="relative">
              <textarea
                required
                rows={5}
                className="peer w-full bg-transparent border-b border-gray-600 py-3 placeholder-transparent focus:outline-none focus:border-[#F26722]"
                placeholder="Message"
              />
              <label className="absolute left-0 top-3 text-sm text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all">
                Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F26722] text-white py-3 rounded-full font-semibold tracking-wide hover:bg-[#d4551f] transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
