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
    <section data-reveal className="bg-black py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          Our <span className="text-[#F26722]">Gallery</span>
        </motion.h2>
        <motion.p
          className="text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A curated showcase of moments we&apos;ve captured at Mendy Studios.
        </motion.p>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, index) => {
            const shapeClass =
              img.shape === 'portrait'
                ? 'h-[420px]'
                : img.shape === 'square'
                ? 'h-[300px]'
                : 'h-[250px]';

            return (
              <motion.button
                key={img.id}
                type="button"
                aria-label={`Open gallery image ${img.id}`}
                className={`relative w-full overflow-hidden rounded-2xl border border-white/10 break-inside-avoid transition-transform duration-300 hover:scale-[1.03] ${shapeClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                viewport={{ once: true }}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={`/images/gallery/${img.file}`}
                  alt={`Gallery ${img.id}`}
                  fill
                  className="object-cover rounded-2xl"
                  quality={58}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null ? (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image preview"
          >
            <div className="relative max-w-5xl w-full h-[90vh]">
              <Image
                src={`/images/gallery/${images[selectedIndex].file}`}
                alt="Full preview"
                fill
                className="object-contain"
                quality={72}
                sizes="100vw"
              />

              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 text-white text-3xl bg-black/60 p-2 rounded-full"
                aria-label="Close image preview"
              >
                <IoClose />
              </button>

              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/50 p-2 rounded-full hover:bg-white hover:text-black"
                aria-label="Previous image"
              >
                <IoChevronBack />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/50 p-2 rounded-full hover:bg-white hover:text-black"
                aria-label="Next image"
              >
                <IoChevronForward />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
