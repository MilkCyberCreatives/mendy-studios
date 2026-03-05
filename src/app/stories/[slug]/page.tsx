import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FooterSection from '../../../components/FooterSection';
import StructuredData from '../../../components/StructuredData';
import { getStoryBySlug, stories } from '../../../content/stories';
import { services } from '../../../content/services';
import {
  createPageMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  getStorySchema,
} from '../../../lib/seo';

type StoryPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export function generateMetadata({ params }: StoryPageProps): Metadata {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    return createPageMetadata({
      title: 'Story Not Found',
      path: '/stories',
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: story.title,
    description: story.description,
    path: `/stories/${story.slug}`,
    images: [story.coverImage],
    keywords: story.tags,
    type: 'article',
  });
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export default function StoryDetailPage({ params }: StoryPageProps) {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/stories' },
    { name: story.title, path: `/stories/${story.slug}` },
  ]);

  return (
    <>
      <StructuredData id="schema-story-breadcrumb" data={breadcrumbSchema} />
      <StructuredData
        id="schema-story-post"
        data={
          getStorySchema({
            title: story.title,
            description: story.description,
            path: `/stories/${story.slug}`,
            publishedAt: story.publishedAt,
            updatedAt: story.updatedAt,
            image: story.coverImage,
            keywords: story.tags,
          })
        }
      />
      <StructuredData id="schema-story-faq" data={getFAQSchema(story.faqs)} />

      <article data-reveal className="bg-black text-white px-6 py-14 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/stories" className="text-sm text-[#F26722] hover:underline">
            Back to Stories
          </Link>

          <p className="text-xs text-gray-400 mt-5">{formatDate(story.publishedAt)}</p>
          <p className="text-xs text-gray-500 mt-1">{story.readMinutes} min read</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-3 leading-tight">{story.title}</h1>
          <p className="text-gray-300 mt-4 text-lg">{story.description}</p>

          <div className="relative mt-8 rounded-2xl overflow-hidden border border-white/10 aspect-[16/9]">
            <Image
              src={story.coverImage}
              alt={story.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
            />
          </div>

          <div className="mt-8 space-y-6 text-gray-200 leading-relaxed">
            {story.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold mb-5">Common Questions</h2>
            <div className="space-y-4">
              {story.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-medium text-white">{faq.question}</h3>
                  <p className="text-gray-300 mt-2 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold mb-5">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {story.relatedServices.map((slug) => {
                const service = services.find((item) => item.slug === slug);
                if (!service) {
                  return null;
                }
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                  >
                    <h3 className="font-medium text-white">{service.title}</h3>
                    <p className="text-sm text-gray-300 mt-2">{service.summary}</p>
                  </Link>
                );
              })}
            </div>
          </section>

        </div>
      </article>

      <FooterSection />
    </>
  );
}
