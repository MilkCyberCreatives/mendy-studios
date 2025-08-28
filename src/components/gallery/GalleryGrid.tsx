'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const TOTAL_IMAGES = 53;
const INITIAL_COUNT = 12;
const LOAD_COUNT = 12;

// Generate gallery image paths
const allGalleryImages = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/images/gallery/gallery${i + 1}.jpg`);

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GalleryGrid() {
  const shuffledImages = useMemo(() => shuffleArray(allGalleryImages), []);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [index, setIndex] = useState(-1); // Lightbox index

  const visibleImages = shuffledImages.slice(0, visibleCount);

  return (
    <section className="bg-black py-20 px-4 md:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Captured Moments
        </h2>

        {/* Pinterest Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {visibleImages.map((src, i) => (
            <motion.div
              key={i}
              className="w-full overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleCount(prev => prev + LOAD_COUNT)}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-200 transition"
            >
              Load More
            </motion.button>
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
          thumbnails={{
            border: 0,
            padding: 4,
            width: 100,
            height: 70,
          }}
        />
      </div>
    </section>
  );
}
