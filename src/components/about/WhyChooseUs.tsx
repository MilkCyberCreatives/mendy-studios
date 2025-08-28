'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCameraRetro, FaVideo, FaUserCheck, FaStar, FaClock, FaThumbsUp } from 'react-icons/fa';

const features = [
  {
    icon: <FaCameraRetro size={28} className="text-[#F26722]" />,
    title: 'High-End Photography',
    description: 'Capturing crisp, professional images with a sharp creative eye.'
  },
  {
    icon: <FaVideo size={28} className="text-[#F26722]" />,
    title: 'Cinematic Videography',
    description: 'Producing cinematic-quality videos tailored to your brand or event.'
  },
  {
    icon: <FaUserCheck size={28} className="text-[#F26722]" />,
    title: 'Professional Service',
    description: 'A corporate-oriented approach that values excellence and reliability.'
  },
  {
    icon: <FaStar size={28} className="text-[#F26722]" />,
    title: 'Creative Direction',
    description: 'Combining storytelling with design-thinking for unique visual output.'
  },
  {
    icon: <FaClock size={28} className="text-[#F26722]" />,
    title: 'Timely Delivery',
    description: 'We pride ourselves in respecting your time and delivering on schedule.'
  },
  {
    icon: <FaThumbsUp size={28} className="text-[#F26722]" />,
    title: 'Client Satisfaction',
    description: 'Our work speaks for itself, and our clients love the results.'
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span className="text-[#F26722]">Mendy Studios</span>
        </motion.h2>
        <p className="text-gray-300 mb-12">
          Here’s what sets us apart from the rest.
        </p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 p-6 rounded-lg border border-white/10 shadow-md hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
