import type { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowRight, FaBolt, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import FooterSection from '../../components/FooterSection';
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
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Motion', path: '/motion' },
  ]);

  return (
    <>
      <script
        id="schema-motion-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        id="schema-motion-videos"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(motionListSchema) }}
      />

      <section data-reveal className="relative overflow-hidden bg-[#050505] pb-16 pt-32 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#F26722]/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6">
          <div className="max-w-4xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F26722]/45 bg-[#F26722]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F9A26E]">
              <FaBolt />
              Motion Portfolio
            </span>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Cinematic motion that makes your brand impossible to ignore.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              A curated stream of Mendy Studios video work across campaigns, live events, interviews,
              and storytelling edits. Every frame is crafted for impact and clean delivery on modern
              screens.
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-gray-200">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                <FaCheckCircle className="text-[#F26722]" />
                Color-graded delivery
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                <FaCheckCircle className="text-[#F26722]" />
                Social-ready exports
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                <FaRegClock className="text-[#F26722]" />
                Fast turnaround workflows
              </span>
            </div>
          </div>

          <div id={`video-${featuredVideo.id}`}>
            <MotionVideoCard video={featuredVideo} featured />
          </div>
        </div>
      </section>

      <section data-reveal className="bg-black px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold md:text-4xl">More Motion Projects</h2>
              <p className="max-w-2xl text-gray-300">
                Click any project card to load and play instantly. Videos are lazy-loaded to keep this
                page and your full site fast.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#F26722]/60 bg-[#F26722] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d9561b]"
            >
              Book a Motion Project
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
