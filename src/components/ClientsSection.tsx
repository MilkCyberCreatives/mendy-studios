'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const clients = [
  { id: 1, name: 'Softlife M', logo: '/images/clients/client1.png' },
  { id: 2, name: 'EventPro Studios', logo: '/images/clients/client2.png' },
  { id: 3, name: 'Royal Moments', logo: '/images/clients/client3.png' },
  { id: 4, name: 'Busi Weddings', logo: '/images/clients/client4.png' },
  { id: 5, name: 'Lightspeed Co.', logo: '/images/clients/client5.png' },
  { id: 6, name: 'Corporate Media', logo: '/images/clients/client6.png' },
  { id: 7, name: 'Kopano Visuals', logo: '/images/clients/client7.png' },
  { id: 8, name: 'Visionary Films', logo: '/images/clients/client8.png' },
];

export default function ClientsSection() {
  return (
    <section className="bg-black/95 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Our <span className="text-[#F26722]">Clients</span>
        </motion.h2>
        <motion.p
          className="text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          We’re trusted by brands, studios, and individuals across South Africa.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 items-center justify-center">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={160}
                height={80}
                className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
