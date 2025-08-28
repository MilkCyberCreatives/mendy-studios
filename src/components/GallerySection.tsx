'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';

const images = [
  { id: 6, file: 'gallery6.jpg', shape: 'portrait' },
  { id: 5, file: 'gallery5.jpg', shape: 'square' },
  { id: 4, file: 'gallery4.jpg', shape: 'landscape' },
  { id: 3, file: 'gallery3.jpg', shape: 'portrait' },
  { id: 2, file: 'gallery2.jpg', shape: 'square' },
  { id: 1, file: 'gallery1.jpg', shape: 'landscape' },
];

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="bg-gradient-to-b from-black via-[#0d0d0d] to-black py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Our <span className="text-[#F26722]">Gallery</span>
        </motion.h2>
        <motion.p
          className="text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          A curated showcase of moments we’ve captured at Mendy Studios.
        </motion.p>

        {/* Image grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, index) => {
            const shapeClass =
              img.shape === 'portrait'
                ? 'h-[420px]'
                : img.shape === 'square'
                ? 'h-[300px]'
                : 'h-[250px]';

            return (
              <motion.div
                key={img.id}
                className={`relative overflow-hidden rounded-2xl shadow-md break-inside-avoid transition-transform duration-300 hover:scale-[1.03] cursor-pointer ${shapeClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={`/images/gallery/${img.file}`}
                  alt={`Gallery ${img.id}`}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-5xl w-full h-[90vh]">
              <Image
                src={`/images/gallery/${images[selectedIndex].file}`}
                alt="Full preview"
                fill
                className="object-contain"
              />
              {/* Close button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 text-white text-3xl bg-black/60 p-2 rounded-full"
              >
                <IoClose />
              </button>

              {/* Left arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black/50 p-2 rounded-full hover:bg-white hover:text-black"
              >
                <IoChevronBack />
              </button>

              {/* Right arrow */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black/50 p-2 rounded-full hover:bg-white hover:text-black"
              >
                <IoChevronForward />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
