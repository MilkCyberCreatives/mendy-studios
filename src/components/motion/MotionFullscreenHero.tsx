'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import PageBreadcrumb from '../PageBreadcrumb';

type MotionFullscreenHeroProps = {
  streamVideoId?: string;
};

function getCloudflareEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: 'true',
    muted: 'true',
    loop: 'true',
    controls: 'false',
    preload: 'true',
  });

  return `https://iframe.videodelivery.net/${videoId}?${params.toString()}`;
}

export default function MotionFullscreenHero({ streamVideoId }: MotionFullscreenHeroProps) {
  const hasStreamVideo = Boolean(streamVideoId);

  return (
    <section data-reveal className="relative min-h-[60vh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {hasStreamVideo ? (
          <iframe
            src={getCloudflareEmbedUrl(streamVideoId!)}
            title="Mendy Studios Motion Intro"
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <Image
            src="/images/services/services-hero-bg.jpg"
            alt="Mendy Studios motion background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative mx-auto flex min-h-[54vh] max-w-7xl flex-col justify-center gap-1.5 px-6 pb-8 pt-24">
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Motion' }]} />

        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <h1 className="max-w-[12ch] text-3xl font-semibold leading-[1.05] sm:max-w-[14ch] md:max-w-none md:text-4xl">
            Cinematic motion reels for brands, events, and stories.
          </h1>
          <p className="mt-2 max-w-[31ch] text-sm leading-relaxed text-gray-200 md:max-w-2xl md:text-base">
            Autoplay video storytelling across Midrand, Johannesburg, Pretoria, and Gauteng.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
