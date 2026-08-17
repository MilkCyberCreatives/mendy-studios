'use client';

import { useRef } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { trackEvent } from '../../lib/marketing';
import type { MotionVideo } from '../../content/motion-videos';

type MotionVideoCardProps = {
  video: MotionVideo;
  featured?: boolean;
};

function getEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: videoId,
    controls: '1',
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function getWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function getThumbnailUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export default function MotionVideoCard({ video, featured = false }: MotionVideoCardProps) {
  const hasTrackedPlayback = useRef(false);

  const handleVideoLoad = () => {
    if (hasTrackedPlayback.current) {
      return;
    }

    hasTrackedPlayback.current = true;
    trackEvent('video_play', {
      page: 'motion',
      video_id: video.id,
      video_title: video.title,
      placement: featured ? 'featured' : 'grid',
    });
  };

  return (
    <article
      className={`hover-lift hover-glow group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="relative aspect-video bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${getThumbnailUrl(video.id)}')` }}
        />
        <iframe
          src={getEmbedUrl(video.id)}
          title={video.title}
          loading={featured ? 'eager' : 'lazy'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          onLoad={handleVideoLoad}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="space-y-3 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#F9A26E]">
            {video.category}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">
            {video.duration}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white">{video.title}</h3>
        <p className="text-sm leading-relaxed text-gray-300">{video.description}</p>

        <a
          href={getWatchUrl(video.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#F26722] transition hover:text-[#ffb084]"
          onClick={() =>
            trackEvent('video_external_click', {
              page: 'motion',
              video_id: video.id,
              video_title: video.title,
            })
          }
        >
          Open on YouTube
          <FaExternalLinkAlt className="text-xs" />
        </a>
      </div>
    </article>
  );
}
