'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { TbBrandThreads } from 'react-icons/tb';
import { trackEvent } from '../lib/marketing';
import { SITE } from '../lib/seo';

export default function HeroSection() {
  const heroVideoId = 'PciVJ33gp58';
  const heroVideoSrc = `https://www.youtube.com/embed/${heroVideoId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${heroVideoId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`;

  const imageAnimations = {
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <section data-reveal className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
        <iframe
          src={heroVideoSrc}
          title="Mendy Studios hero background video"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="h-full w-full flex items-center justify-center px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-2 gap-3 md:gap-4 relative">
              <div className="flex flex-col gap-3 md:gap-4">
                <motion.div {...imageAnimations} transition={{ delay: 0.2, duration: 0.7 }}>
                  <Image
                    src="/images/hero1.jpg"
                    alt="Photo 1"
                    width={400}
                    height={500}
                    className="rounded-xl shadow-lg object-cover aspect-[3/4] w-full"
                    priority
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
                <motion.div {...imageAnimations} transition={{ delay: 0.5, duration: 0.7 }}>
                  <Image
                    src="/images/hero4.jpg"
                    alt="Photo 4"
                    width={400}
                    height={500}
                    className="rounded-xl shadow-lg object-cover aspect-square w-full"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col gap-3 md:gap-4 pt-8 md:pt-12">
                <motion.div {...imageAnimations} transition={{ delay: 0.3, duration: 0.7 }}>
                  <Image
                    src="/images/hero2.jpg"
                    alt="Photo 2"
                    width={400}
                    height={500}
                    className="rounded-xl shadow-lg object-cover aspect-square w-full"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
                <motion.div {...imageAnimations} transition={{ delay: 0.4, duration: 0.7 }}>
                  <Image
                    src="/images/hero3.jpg"
                    alt="Photo 3"
                    width={400}
                    height={500}
                    className="rounded-xl shadow-lg object-cover aspect-[3/4] w-full"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
              </div>
            </div>
          </div>

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

            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center md:justify-start">
                <Link href="/gallery" passHref>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg whitespace-nowrap transform hover:-translate-y-1"
                    onClick={() => trackEvent('cta_click', { location: 'hero', target: 'gallery' })}
                  >
                    View Portfolio
                  </motion.button>
                </Link>

                <Link href="/motion" passHref>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.68 }}
                    className="px-8 py-3 border border-white/30 bg-black/35 text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 shadow-lg whitespace-nowrap transform hover:-translate-y-1"
                    onClick={() => trackEvent('cta_click', { location: 'hero', target: 'motion' })}
                  >
                    Watch Motion Reels
                  </motion.button>
                </Link>
              </div>

              <motion.div
                className="mt-5 flex gap-4 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <a
                  href={SITE.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-300"
                  aria-label="Facebook"
                  onClick={() => trackEvent('social_click', { platform: 'facebook', location: 'hero' })}
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://x.com/mendystudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-black transition-colors duration-300"
                  aria-label="X (Twitter)"
                  onClick={() => trackEvent('social_click', { platform: 'x', location: 'hero' })}
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-500 transition-colors duration-300"
                  aria-label="Instagram"
                  onClick={() => trackEvent('social_click', { platform: 'instagram', location: 'hero' })}
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-500 transition-colors duration-300"
                  aria-label="LinkedIn"
                  onClick={() => trackEvent('social_click', { platform: 'linkedin', location: 'hero' })}
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://www.threads.com/@mendystudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400 transition-colors duration-300"
                  aria-label="Threads"
                  onClick={() => trackEvent('social_click', { platform: 'threads', location: 'hero' })}
                >
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
