'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  const imageAnimations = {
    initial: { opacity: 0, scale: 0.8, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Content Area */}
      <div className="h-full w-full flex items-center justify-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="z-10"
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
              Photography that Speaks.
            </h1>
            <p className="text-gray-200 text-lg mb-6">
              Mendy Studios transforms your vision into powerful visuals.
            </p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition shadow-lg"
            >
              View Portfolio
            </motion.button>
          </motion.div>

          {/* Right: Image Collage */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              {...imageAnimations}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <Image
                src="/images/hero1.jpg"
                alt="Photo 1"
                width={400}
                height={400}
                className="rounded-xl shadow-lg object-cover aspect-[3/4] w-full"
              />
            </motion.div>

            <motion.div
              {...imageAnimations}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <Image
                src="/images/hero2.jpg"
                alt="Photo 2"
                width={400}
                height={400}
                className="rounded-xl shadow-lg object-cover aspect-square w-full"
              />
            </motion.div>

            <motion.div
              {...imageAnimations}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <Image
                src="/images/hero3.jpg"
                alt="Photo 3"
                width={400}
                height={400}
                className="rounded-xl shadow-lg object-cover aspect-square w-full"
              />
            </motion.div>

            <motion.div
              {...imageAnimations}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <Image
                src="/images/hero4.jpg"
                alt="Photo 4"
                width={400}
                height={400}
                className="rounded-xl shadow-lg object-cover aspect-[3/4] w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
