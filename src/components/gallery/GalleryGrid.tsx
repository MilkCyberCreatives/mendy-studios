'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5';

const TOTAL_IMAGES = 53;
const INITIAL_COUNT = 12;
const LOAD_COUNT = 12;

const allGalleryImages = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => `/images/gallery/gallery${i + 1}.jpg`
);

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GalleryGrid() {
  const shuffledImages = useMemo(() => shuffleArray(allGalleryImages), []);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [index, setIndex] = useState(-1);

  const visibleImages = shuffledImages.slice(0, visibleCount);

  const showPrevious = () => {
    setIndex((current) => (current - 1 + visibleImages.length) % visibleImages.length);
  };

  const showNext = () => {
    setIndex((current) => (current + 1) % visibleImages.length);
  };

  return (
    <section data-reveal className="bg-black py-24 px-4 md:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Captured Moments</h2>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {visibleImages.map((src, i) => (
            <button
              key={src}
              type="button"
              className="group w-full overflow-hidden rounded-xl break-inside-avoid text-left"
              onClick={() => setIndex(i)}
            >
              <Image
                src={src}
                alt={`Gallery Image ${i + 1}`}
                width={600}
                height={800}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>

        {visibleCount < shuffledImages.length ? (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + LOAD_COUNT)}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Load More
            </button>
          </div>
        ) : null}

        {index >= 0 ? (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full h-[90vh]">
              <Image
                src={visibleImages[index]}
                alt="Full preview"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              <button
                type="button"
                onClick={() => setIndex(-1)}
                className="absolute top-4 right-4 text-white text-3xl bg-black/60 p-2 rounded-full"
                aria-label="Close image preview"
              >
                <IoClose />
              </button>

              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/50 p-2 rounded-full hover:bg-white hover:text-black"
                aria-label="Previous image"
              >
                <IoChevronBack />
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/50 p-2 rounded-full hover:bg-white hover:text-black"
                aria-label="Next image"
              >
                <IoChevronForward />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
