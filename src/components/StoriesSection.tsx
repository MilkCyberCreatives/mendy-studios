import Link from 'next/link';
import Image from 'next/image';
import { stories } from '../content/stories';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export default function StoriesSection() {
  const featuredStories = stories.slice(0, 3);

  return (
    <section data-reveal className="py-24 px-6 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Stories</h2>
            <p className="text-gray-400 mt-2">
              Insights from recent work, planning tips, and production advice.
            </p>
          </div>
          <Link href="/stories" className="text-[#F26722] hover:underline text-sm font-medium">
            View all stories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <article
              key={story.slug}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <Link href={`/stories/${story.slug}`} className="block">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    fill
                    className="object-cover"
                    quality={62}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400">{formatDate(story.publishedAt)}</p>
                  <h3 className="text-lg font-semibold text-white mt-2">{story.title}</h3>
                  <p className="text-sm text-gray-300 mt-2">{story.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
