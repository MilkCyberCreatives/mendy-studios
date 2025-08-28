'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCameraRetro,
  FaFilm,
  FaBroadcastTower,
  FaEdit,
  FaHome,
  FaImages,
} from 'react-icons/fa';
import Link from 'next/link';

const services = [
  {
    title: 'Photography',
    icon: <FaCameraRetro size={28} className="text-[#F26722]" />,
    desc: 'Weddings, events, portraits, and studio photography sessions tailored for every moment.',
    link: '/services/photography',
  },
  {
    title: 'Videography',
    icon: <FaFilm size={28} className="text-[#F26722]" />,
    desc: 'Professional video coverage for weddings, music videos, events, and business content.',
    link: '/services/videography',
  },
  {
    title: 'Streaming Services',
    icon: <FaBroadcastTower size={28} className="text-[#F26722]" />,
    desc: 'Multi-camera livestreams for funerals, church events, and social platforms with overlays.',
    link: '/services/streaming',
  },
  {
    title: 'Video Editing',
    icon: <FaEdit size={28} className="text-[#F26722]" />,
    desc: 'Cinematic editing, audio enhancement, highlight reels, and branded content creation.',
    link: '/services/editing',
  },
  {
    title: 'Studio Sessions',
    icon: <FaHome size={28} className="text-[#F26722]" />,
    desc: 'Indoor photo shoots with props and lighting – ideal for branding or lifestyle shots.',
    link: '/services/studio',
  },
  {
    title: 'Photo Albums & Prints',
    icon: <FaImages size={28} className="text-[#F26722]" />,
    desc: 'Beautifully crafted photo albums, canvases, and print packages to preserve your memories.',
    link: '/services/prints',
  },
];

export default function ServiceGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="bg-gradient-to-b from-neutral-900 to-black p-6 rounded-xl shadow hover:shadow-lg transition h-full flex flex-col justify-between">
            <div>
              <div className="mb-3">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-300 text-sm">{service.desc}</p>
            </div>

            <div className="mt-4">
              <Link href={service.link}>
                <span className="text-sm text-[#F26722] hover:underline transition">
                  Learn more →
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
