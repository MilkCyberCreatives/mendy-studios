'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false });
const Zoom = dynamic(() => import('yet-another-react-lightbox/plugins/zoom'), { ssr: false });
const Thumbnails = dynamic(() => import('yet-another-react-lightbox/plugins/thumbnails'), { ssr: false });

// Generate image paths (assuming you’ve converted to .webp)
const allGalleryImages = Array.from({ length: 53 }, (_, i) => `/images/gallery/gallery${i + 1}-webp.webp`);

// Shuffle helper
function shuffleArray(array: string[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GalleryGrid() {
  const shuffledImages = useMemo(() => shuffleArray(allGalleryImages), []);
  const [visibleCount, setVisibleCount] = useState(12);
  const [index, setIndex] = useState(-1);

  const visibleImages = shuffledImages.slice(0, visibleCount);

  return (
    <section className="bg-black py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Captured Moments</h2>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {visibleImages.map((src, i) => (
            <motion.div
              key={i}
              className="w-full overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              onClick={() => setIndex(i)}
            >
              <Image
                src={src}
                alt={`Gallery Image ${i + 1}`}
                width={600}
                height={800}
                loading="lazy"
                className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < shuffledImages.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
            >
              Load More
            </button>
          </div>
        )}

        {/* Lightbox Viewer */}
        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={index}
          slides={visibleImages.map((src) => ({ src }))}
          plugins={[Zoom, Thumbnails]}
          zoom={{ maxZoomPixelRatio: 2 }}
          thumbnails={{ border: 0, padding: 5, width: 100, height: 70 }}
        />
      </div>
    </section>
  );
}
