import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FooterSection from '../../components/FooterSection';
import StructuredData from '../../components/StructuredData';
import { stories } from '../../content/stories';
import {
  absoluteUrl,
  createPageMetadata,
  getBreadcrumbSchema,
} from '../../lib/seo';

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

      <section data-reveal className="relative py-20 md:py-24 px-6 bg-gradient-to-b from-[#0f0f0f] to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Stories</h1>
          <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
            Planning guides, production insights, and practical ideas from Mendy Studios.
          </p>
        </div>
      </section>

      <section data-reveal className="py-8 md:py-14 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <article
              key={story.slug}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
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
                <div className="p-5">
                  <p className="text-xs text-gray-400">
                    {formatDate(story.publishedAt)} · {story.readMinutes} min read
                  </p>
                  <h2 className="text-xl text-white font-semibold mt-2">{story.title}</h2>
                  <p className="text-gray-300 text-sm mt-2">{story.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <FooterSection />
    </>
  );
}
