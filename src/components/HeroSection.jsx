'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { TbBrandThreads } from 'react-icons/tb';
import { trackEvent } from '../lib/marketing';
import { SITE } from '../lib/seo';

export default function HeroSection() {
  const heroVideoId = 'PciVJ33gp58';
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const heroVideoSrc = useMemo(() => {
    const heroVideoParams = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      controls: '0',
      loop: '1',
      playlist: heroVideoId,
      start: '6',
      playsinline: '1',
      rel: '0',
      modestbranding: '1',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      cc_load_policy: '0',
      vq: 'small',
    });

    return `https://www.youtube-nocookie.com/embed/${heroVideoId}?${heroVideoParams.toString()}`;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(connection?.saveData);
    const slowConnection = typeof connection?.effectiveType === 'string'
      ? /(2g|slow-2g)/i.test(connection.effectiveType)
      : false;

    if (mediaQuery.matches || saveData || slowConnection || !isDesktop) {
      return;
    }

    let idleId;
    let timeoutId;
    let scheduled = false;

    const loadVideo = () => setShouldLoadVideo(true);
    const scheduleVideo = () => {
      if (scheduled) {
        return;
      }

      scheduled = true;
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(loadVideo, { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(loadVideo, 1800);
      }
    };

    if (document.readyState === 'complete') {
      scheduleVideo();
    } else {
      window.addEventListener('load', scheduleVideo, { once: true });
    }

    return () => {
      window.removeEventListener('load', scheduleVideo);
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const tileAnimation = (delay, offsetY = 18) => ({
    initial: { opacity: 0, y: offsetY, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      delay,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section data-reveal className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden md:h-[calc(100vh-5.75rem)]">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={68}
          className="object-cover"
          aria-hidden="true"
        />
        {shouldLoadVideo ? (
          <iframe
            src={heroVideoSrc}
            title="Mendy Studios hero background video"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="flex h-full w-full items-center justify-center px-6 py-8 md:px-12 md:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="order-1 z-10 flex flex-col items-center text-center md:order-1 md:items-start md:text-left"
          >
            <h1 className="mb-3 max-w-[12ch] text-3xl font-bold leading-[1.05] text-white sm:text-4xl md:max-w-none md:text-5xl lg:text-6xl">
              Photography & Videography that sells the story.
            </h1>
            <p className="mb-5 max-w-[26ch] text-base text-gray-200 sm:text-lg md:max-w-md md:text-xl">
              Mendy Studios transforms your vision into powerful visuals.
            </p>

            <div className="w-full">
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/gallery"
                    className="block w-full whitespace-nowrap rounded-lg bg-white px-6 py-3 text-center font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 sm:w-auto sm:px-8"
                    onClick={() => trackEvent('cta_click', { location: 'hero', target: 'gallery' })}
                  >
                    View Portfolio
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.68 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/motion"
                    className="block w-full whitespace-nowrap rounded-lg border border-white/30 bg-black/35 px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black sm:w-auto sm:px-8"
                    onClick={() => trackEvent('cta_click', { location: 'hero', target: 'motion' })}
                  >
                    Watch Motion Reels
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="mt-4 flex gap-4 justify-center md:justify-start"
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

          <div className="order-2 mx-auto w-full max-w-[320px] md:order-2 md:max-w-none">
            <div className="relative grid grid-cols-2 gap-3 md:gap-4">
              <div className="flex flex-col gap-3 md:gap-4">
                <motion.div {...tileAnimation(0.12)}>
                  <Image
                    src="/images/hero1.jpg"
                    alt="Photo 1"
                    width={400}
                    height={500}
                    className="rounded-xl object-cover aspect-[3/4] w-full"
                    quality={60}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
                <motion.div {...tileAnimation(0.22)}>
                  <Image
                    src="/images/hero4.jpg"
                    alt="Photo 4"
                    width={400}
                    height={500}
                    className="rounded-xl object-cover aspect-square w-full"
                    quality={60}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col gap-3 md:gap-4 pt-8 md:pt-12">
                <motion.div {...tileAnimation(0.18)}>
                  <Image
                    src="/images/hero2.jpg"
                    alt="Photo 2"
                    width={400}
                    height={500}
                    className="rounded-xl object-cover aspect-square w-full"
                    quality={60}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
                <motion.div {...tileAnimation(0.28)}>
                  <Image
                    src="/images/hero3.jpg"
                    alt="Photo 3"
                    width={400}
                    height={500}
                    className="rounded-xl object-cover aspect-[3/4] w-full"
                    quality={60}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
