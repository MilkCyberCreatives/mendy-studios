'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/zoom.css';

const GalleryGrid = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = [
    'weddings1.jpg',
    'weddings2.jpg',
    'ceremonies1.jpg',
    'ceremonies2.jpg',
    'parties1.jpg',
    'parties2.jpg',
  ];

  const slides = images.map((img) => ({
    src: `/images/gallery/${img}`,
  }));

  const handleClick = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Our Gallery</h2>
        <p className="text-gray-600 mb-10">Browse moments we've captured</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              className="cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleClick(i)}
            >
              <Image
                src={`/images/gallery/${img}`}
                alt={`Gallery ${i + 1}`}
                width={600}
                height={400}
                className="object-cover w-full h-60 transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Zoom, Thumbnails]}
        />
      </div>
    </section>
  );
};

export default GalleryGrid;
