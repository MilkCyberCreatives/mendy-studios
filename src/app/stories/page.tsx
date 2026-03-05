import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import FooterSection from '../../components/FooterSection';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import StructuredData from '../../components/StructuredData';
import { stories } from '../../content/stories';
import { absoluteUrl, createPageMetadata, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Stories',
  description:
    'Stories from Mendy Studios with practical guidance on photography, videography, and production planning in Gauteng.',
  path: '/stories',
  keywords: ['stories', 'photography tips', 'videography tips', 'Gauteng creative studio'],
});

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

const storiesItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Mendy Studios Stories',
  itemListElement: stories.map((story, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: absoluteUrl(`/stories/${story.slug}`),
    name: story.title,
  })),
};

export default function StoriesPage() {
  return (
    <>
      <StructuredData
        id="schema-stories-breadcrumb"
        data={
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Stories', path: '/stories' },
          ])
        }
      />
      <StructuredData id="schema-stories-list" data={storiesItemListSchema} />

      <section data-reveal className="relative isolate overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/gallery-hero.jpg"
            alt="Mendy Studios stories background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/78" />
          <div className="absolute inset-0 bg-black/8" />
        </div>

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-center gap-6 px-6 pb-12 pt-32">
          <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Stories' }]} />

          <span className="inline-flex w-fit rounded-full border border-[#F26722]/45 bg-[#F26722]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F9A26E]">
            Mendy Studios Journal
          </span>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Stories and Practical Guides</h1>
            <p className="mt-4 max-w-3xl text-gray-200">
              Planning guides, production insights, and practical ideas from Mendy Studios for
              better shoots and stronger visual storytelling.
            </p>
          </div>
        </div>
      </section>

      <section data-reveal className="bg-black px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">Latest Stories</h2>
              <p className="mt-2 max-w-2xl text-gray-300">
                Read concise field-tested advice to help you plan your next event, campaign, or
                portrait session with confidence.
              </p>
            </div>
            <Link
              href="/contact"
              className="hover-lift hover-glow hover-shine inline-flex items-center gap-2 rounded-full border border-[#F26722]/55 bg-[#F26722] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d9561b]"
            >
              Plan Your Shoot
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stories.map((story) => (
              <article
                key={story.slug}
                className="hover-lift hover-glow overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <Link href={`/stories/${story.slug}`} className="block h-full">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <p className="text-xs text-gray-400">
                      {formatDate(story.publishedAt)} &middot; {story.readMinutes} min read
                    </p>
                    <h2 className="text-xl font-semibold text-white">{story.title}</h2>
                    <p className="text-sm text-gray-300">{story.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/12 bg-white/6 px-2 py-1 text-xs text-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#F9A26E]">
                      Read story
                      <FaArrowRight className="text-[10px]" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
