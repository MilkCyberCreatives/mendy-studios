import Link from 'next/link';

const trustPoints = [
  {
    title: 'Founder-Led Direction',
    description:
      'Mendy Studios is led by professional photographer Ndomiso with a clear focus on quality and consistency.',
  },
  {
    title: 'Structured Production Workflow',
    description:
      'Each project follows planning, capture, edit, and delivery stages to protect quality and deadlines.',
  },
  {
    title: 'Regional Service Depth',
    description:
      'Strong operational coverage across Johannesburg, Pretoria, Midrand, and broader Gauteng.',
  },
  {
    title: 'Commercial and Private Experience',
    description:
      'We support both personal milestones and business content requirements with professional standards.',
  },
];

export default function TrustSignalsSection() {
  return (
    <section data-reveal className="py-24 px-6 bg-[#090909] text-white border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Why Clients Trust Mendy Studios</h2>
          <p className="text-gray-300 mt-4">
            We combine creative execution with a professional process designed for dependable results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {trustPoints.map((point) => (
            <article key={point.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-xl font-semibold">{point.title}</h3>
              <p className="text-gray-300 mt-2 text-sm">{point.description}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link href="/about" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            About the Team
          </Link>
          <Link href="/services" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            Explore Services
          </Link>
          <Link href="/contact" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            Book a Session
          </Link>
          <Link href="/stories" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            Read Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
