'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { TbBrandThreads } from 'react-icons/tb';

export default function HeroSection() {
  const imageAnimations = {
    initial: { opacity: 0, scale: 0.8, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-20 md:pt-28">
      {/* Full Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Content Area */}
      <div className="h-full w-full flex items-center justify-center px-6 md:px-12 py-10 md:py-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          
          {/* Images - First on mobile, second on desktop */}
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-2 gap-3 md:gap-4 relative">
              {/* Column 1 */}
              <div className="flex flex-col gap-3 md:gap-4">
                <motion.div {...imageAnimations} transition={{ delay: 0.2, duration: 0.7 }}>
                  <Image
                    src="/images/hero1.jpg"
                    alt="Photo 1"
                    width={400}
                    height={400}
                    className="rounded-xl shadow-lg object-cover aspect-[3/4] w-full"
                  />
                </motion.div>
                <motion.div {...imageAnimations} transition={{ delay: 0.5, duration: 0.7 }} className="md:-mt-6">
                  <Image
                    src="/images/hero4.jpg"
                    alt="Photo 4"
                    width={400}
                    height={400}
                    className="rounded-xl shadow-lg object-cover aspect-[3/3] w-full"
                  />
                </motion.div>
              </div>
              
              {/* Column 2 */}
              <div className="flex flex-col gap-3 md:gap-4 pt-8 md:pt-12">
                <motion.div {...imageAnimations} transition={{ delay: 0.3, duration: 0.7 }}>
                  <Image
                    src="/images/hero2.jpg"
                    alt="Photo 2"
                    width={400}
                    height={400}
                    className="rounded-xl shadow-lg object-cover aspect-square w-full"
                  />
                </motion.div>
                <motion.div {...imageAnimations} transition={{ delay: 0.4, duration: 0.7 }}>
                  <Image
                    src="/images/hero3.jpg"
                    alt="Photo 3"
                    width={400}
                    height={400}
                    className="rounded-xl shadow-lg object-cover aspect-square w-full"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Text Content - Second on mobile, first on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="order-2 md:order-1 z-10 text-center md:text-left flex flex-col items-center md:items-start"
          >
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
              Photography that Speaks.
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-6 max-w-md">
              Mendy Studios transforms your vision into powerful visuals.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center md:justify-start w-full">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg whitespace-nowrap transform hover:-translate-y-1"
              >
                View Portfolio
              </motion.button>
              
              {/* Social Media Icons */}
              <motion.div 
                className="flex gap-4 justify-center md:justify-start mt-4 sm:mt-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <a href="#" className="text-white hover:text-blue-400 transition-colors duration-300" aria-label="Facebook">
                  <FaFacebookF size={20} />
                </a>
                <a href="#" className="text-white hover:text-black transition-colors duration-300" aria-label="X (Twitter)">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-white hover:text-pink-500 transition-colors duration-300" aria-label="Instagram">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-white hover:text-blue-500 transition-colors duration-300" aria-label="LinkedIn">
                  <FaLinkedinIn size={20} />
                </a>
                <a href="#" className="text-white hover:text-gray-400 transition-colors duration-300" aria-label="Threads">
                  <TbBrandThreads size={20} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
