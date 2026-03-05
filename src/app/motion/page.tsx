import type { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowRight, FaBolt } from 'react-icons/fa';
import FooterSection from '../../components/FooterSection';
import StructuredData from '../../components/StructuredData';
import MotionFullscreenHero from '../../components/motion/MotionFullscreenHero';
import MotionVideoCard from '../../components/motion/MotionVideoCard';
import { motionVideos } from '../../content/motion-videos';
import { absoluteUrl, createPageMetadata, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Motion',
  description:
    'Explore motion reels and cinematic video highlights by Mendy Studios for brands, events, and storytelling projects.',
  path: '/motion',
  keywords: [
    'video production Midrand',
    'motion reels Gauteng',
    'cinematic videography Johannesburg',
  ],
  type: 'website',
});

const featuredVideo = motionVideos.find((video) => video.featured) || motionVideos[0];
const standardVideos = motionVideos.filter((video) => video.id !== featuredVideo.id);
const streamVideoId = process.env.NEXT_PUBLIC_MOTION_STREAM_VIDEO_ID;

const motionListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Mendy Studios Motion Portfolio',
  itemListElement: motionVideos.map((video, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'VideoObject',
      name: video.title,
      description: video.description,
      thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
      url: absoluteUrl(`/motion#video-${video.id}`),
      publisher: {
        '@type': 'Organization',
        name: 'Mendy Studios',
      },
    },
  })),
};

export default function MotionPage() {
  return (
    <>
      <StructuredData
        id="schema-motion-breadcrumb"
        data={
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Motion', path: '/motion' },
          ])
        }
      />
      <StructuredData id="schema-motion-videos" data={motionListSchema} />

      <MotionFullscreenHero streamVideoId={streamVideoId} />

      <section id="motion-reels" data-reveal className="bg-black px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F26722]/45 bg-[#F26722]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F9A26E]">
                <FaBolt />
                Motion Portfolio
              </span>
              <h2 className="text-3xl font-semibold md:text-4xl">More Motion Projects</h2>
              <p className="max-w-2xl text-gray-300 leading-relaxed">
                Click any project card to load and play instantly. Videos are lazy-loaded to keep this
                page and your full site fast.
              </p>
            </div>
            <Link
              href="/contact"
              className="hover-lift hover-glow hover-shine inline-flex items-center gap-2 rounded-full border border-[#F26722]/60 bg-[#F26722] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d9561b]"
            >
              Book a Motion Project
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div id={`video-${featuredVideo.id}`} className="md:col-span-2 xl:col-span-3">
              <MotionVideoCard video={featuredVideo} featured />
            </div>
            {standardVideos.map((video) => (
              <div key={video.id} id={`video-${video.id}`}>
                <MotionVideoCard video={video} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
