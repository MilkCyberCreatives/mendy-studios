import type { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowRight, FaBolt } from 'react-icons/fa';
import FooterSection from '../../components/FooterSection';
import StructuredData from '../../components/StructuredData';
import MotionFullscreenHero from '../../components/motion/MotionFullscreenHero';
import MotionVideoCard from '../../components/motion/MotionVideoCard';
import { motionVideos } from '../../content/motion-videos';
import {
  SITE,
  absoluteUrl,
  createPageMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
} from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Motion Videography Portfolio in Gauteng',
  description:
    'Explore autoplay motion reels and cinematic videography by Mendy Studios for brands, events, and storytelling projects across Midrand, Johannesburg, Pretoria, and Gauteng.',
  path: '/motion',
  keywords: [
    'motion videography Gauteng',
    'video production Midrand',
    'event videographer Johannesburg',
    'brand video production Pretoria',
    'cinematic videography Gauteng',
  ],
  type: 'website',
});

const featuredVideo = motionVideos.find((video) => video.featured) || motionVideos[0];
const standardVideos = motionVideos.filter((video) => video.id !== featuredVideo.id);
const streamVideoId = process.env.NEXT_PUBLIC_MOTION_STREAM_VIDEO_ID;

function toIsoDuration(duration: string) {
  const [minutes, seconds] = duration.split(':').map(Number);

  if (Number.isNaN(minutes) || Number.isNaN(seconds)) {
    return undefined;
  }

  return `PT${minutes}M${seconds}S`;
}

const motionVideoObjects = motionVideos.map((video) => ({
  '@type': 'VideoObject',
  '@id': absoluteUrl(`/motion#video-${video.id}`),
  name: video.title,
  description: video.description,
  thumbnailUrl: [`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`],
  embedUrl: `https://www.youtube.com/embed/${video.id}`,
  contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
  url: absoluteUrl(`/motion#video-${video.id}`),
  duration: toIsoDuration(video.duration),
  genre: video.category,
  inLanguage: 'en-ZA',
  isFamilyFriendly: true,
  keywords: [video.category, ...SITE.keywords.slice(0, 4)],
  contentLocation: {
    '@type': 'Place',
    name: 'Gauteng, South Africa',
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: 'Mendy Studios',
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(SITE.logo),
    },
  },
  potentialAction: {
    '@type': 'WatchAction',
    target: [
      absoluteUrl(`/motion#video-${video.id}`),
      `https://www.youtube.com/watch?v=${video.id}`,
    ],
  },
}));

const motionCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${absoluteUrl('/motion')}#webpage`,
  name: 'Mendy Studios Motion Portfolio',
  description:
    'Autoplay motion reels and cinematic video storytelling from Mendy Studios for brands, events, and corporate campaigns in Gauteng.',
  url: absoluteUrl('/motion'),
  inLanguage: 'en-ZA',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
  },
  about: {
    '@type': 'Service',
    name: 'Motion videography and brand storytelling',
    provider: {
      '@type': 'Organization',
      '@id': `${absoluteUrl('/')}#organization`,
    },
    areaServed: ['Midrand', 'Johannesburg', 'Pretoria', 'Gauteng', 'South Africa'],
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: motionVideoObjects.map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: video,
    })),
  },
};

const motionFaqSchema = getFAQSchema([
  {
    question: 'What types of motion projects does Mendy Studios produce?',
    answer:
      'Mendy Studios produces event highlights, corporate videos, brand films, and cinematic reels for campaigns, launches, and storytelling projects.',
  },
  {
    question: 'Where does Mendy Studios offer motion videography services?',
    answer:
      'Mendy Studios is based in Midrand and serves Johannesburg, Pretoria, Gauteng, and selected projects across South Africa.',
  },
  {
    question: 'Can I book both photography and motion coverage for the same project?',
    answer:
      'Yes, Mendy Studios can combine photography and motion videography coverage for events, campaigns, and branded productions.',
  },
]);

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
      <StructuredData id="schema-motion-collection" data={motionCollectionSchema} />
      <StructuredData id="schema-motion-videos" data={motionVideoObjects} />
      <StructuredData id="schema-motion-faq" data={motionFaqSchema} />

      <MotionFullscreenHero streamVideoId={streamVideoId} />

      <section id="motion-reels" data-reveal className="bg-black px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F26722]/45 bg-[#F26722]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F9A26E]">
                <FaBolt />
                Motion Portfolio
              </span>
              <h2 className="text-3xl font-semibold md:text-4xl">Autoplay Motion Projects</h2>
              <p className="max-w-2xl text-gray-300 leading-relaxed">
                Browse cinematic event reels, corporate storytelling, and brand-led edits that begin
                playing automatically while keeping the page performant.
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
