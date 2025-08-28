'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

// ✅ Only import the core Lightbox styles (do not import plugin CSS files on Vercel)
import 'yet-another-react-lightbox/styles.css';

// Create array of 53 image paths
const allGalleryImages = Array.from({ length: 53 }, (_, i) => `/images/gallery/gallery${i + 1}.jpg`);

// Shuffle helper function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GalleryGrid() {
  const visibleImages = useMemo(() => shuffleArray(allGalleryImages).slice(0, 12), []);
  const [index, setIndex] = useState(-1); // Lightbox index

  return (
    <section className="bg-black py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Captured Moments
        </h2>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {visibleImages.map((src, i) => (
            <motion.div
              key={i}
              className="w-full overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setIndex(i)}
            >
              <Image
                src={src}
                alt={`Gallery Image ${i + 1}`}
                width={600}
                height={800}
                className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>

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
