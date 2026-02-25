'use client';

import { useState } from 'react';
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import { trackEvent } from '../../lib/marketing';
import type { MotionVideo } from '../../content/motion-videos';

type MotionVideoCardProps = {
  video: MotionVideo;
  featured?: boolean;
};

function getEmbedUrl(videoId: string, autoplay = false) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  if (autoplay) {
    params.set('autoplay', '1');
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function getWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function getThumbnailUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export default function MotionVideoCard({ video, featured = false }: MotionVideoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadVideo = () => {
    setIsLoaded(true);
    trackEvent('video_play', {
      page: 'motion',
      video_id: video.id,
      video_title: video.title,
      placement: featured ? 'featured' : 'grid',
    });
  };

  return (
    <article
      className={`hover-lift hover-glow group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="relative aspect-video bg-black">
        {isLoaded ? (
          <iframe
            src={getEmbedUrl(video.id, true)}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={handleLoadVideo}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 h-full w-full text-left"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${getThumbnailUrl(video.id)}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/55 text-white backdrop-blur-sm transition group-hover:scale-110 group-hover:border-[#F26722] group-hover:text-[#F26722]">
                <FaPlay className="ml-1 text-lg" />
              </span>
            </div>
          </button>
        )}
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
