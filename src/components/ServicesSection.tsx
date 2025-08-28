'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaVideo, FaBroadcastTower, FaMagic, FaHome } from 'react-icons/fa';

const services = [
  {
    title: "Photography",
    icon: <FaCamera size={28} />,
    description: "Weddings, events, portraits, and studio photography sessions tailored for every moment.",
  },
  {
    title: "Videography",
    icon: <FaVideo size={28} />,
    description: "Professional video coverage for weddings, music videos, events, and business content.",
  },
  {
    title: "Streaming Services",
    icon: <FaBroadcastTower size={28} />,
    description: "Multi-camera livestreams for funerals, church events, and social platforms with overlays.",
  },
  {
    title: "Video Editing",
    icon: <FaMagic size={28} />,
    description: "Cinematic editing, audio enhancement, highlight reels, and branded content creation.",
  },
  {
    title: "Studio Sessions",
    icon: <FaHome size={28} />,
    description: "Indoor photo shoots with props and lighting – ideal for branding or lifestyle shots.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-gradient-to-b from-[#0d0d0d] to-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Our <span className="text-[#F26722]">Services</span>
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Explore our creative and professional offerings.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-left hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-[#F26722] mb-3">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button className="bg-[#F26722] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#d5521b] transition">
            Book a Session
          </button>
        </motion.div>
      </div>
    </section>
  );
}
