import Image from 'next/image';
import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa';
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
    <section data-reveal className="relative min-h-screen overflow-hidden bg-black text-white">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,103,34,0.28),transparent_35%),radial-gradient(circle_at_86%_10%,rgba(255,255,255,0.12),transparent_32%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end gap-6 px-6 pb-16 pt-32">
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Motion' }]} className="mb-auto" />

        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F26722]/50 bg-[#F26722]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F9A26E]">
          <FaPlayCircle />
          Motion Intro
        </span>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Full-screen motion reel the moment your audience lands.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
            Host your hero video on Cloudflare Stream for fast startup, adaptive delivery, and
            minimal impact on site performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="#motion-reels"
            className="hover-lift hover-glow hover-shine inline-flex items-center gap-2 rounded-full bg-[#F26722] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d9561b]"
          >
            Explore More Reels
          </Link>
          {!hasStreamVideo ? (
            <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs text-gray-200">
              Set `NEXT_PUBLIC_MOTION_STREAM_VIDEO_ID` to show your uploaded video.
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
