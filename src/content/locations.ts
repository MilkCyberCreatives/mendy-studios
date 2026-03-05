export type LocationPage = {
  slug: 'johannesburg' | 'pretoria' | 'midrand';
  name: string;
  title: string;
  summary: string;
  description: string;
  neighborhoods: string[];
  keywords: string[];
  faqs: { question: string; answer: string }[];
};

export const locations: LocationPage[] = [
  {
    slug: 'johannesburg',
    name: 'Johannesburg',
    title: 'Photography & Videography in Johannesburg',
    summary:
      'Professional photography and videography services in Johannesburg for weddings, events, portraits, and business content.',
    description:
      'Mendy Studios supports clients across Johannesburg with structured photo and video production designed for quality, speed, and consistency. We work with private clients, event planners, and companies that need reliable visual output.',
    neighborhoods: ['Sandton', 'Rosebank', 'Randburg', 'Soweto', 'Fourways', 'Bedfordview'],
    keywords: [
      'photographer Johannesburg',
      'videographer Johannesburg',
      'wedding photographer Johannesburg',
      'corporate photography Johannesburg',
    ],
    faqs: [
      {
        question: 'Do you cover all major Johannesburg areas?',
        answer:
          'Yes. We cover central and greater Johannesburg including Sandton, Rosebank, Randburg, Fourways, and surrounding areas.',
      },
      {
        question: 'Can I book both photo and video in Johannesburg?',
        answer:
          'Yes. Combined photography and videography packages are available.',
      },
    ],
  },
  {
    slug: 'pretoria',
    name: 'Pretoria',
    title: 'Photography & Videography in Pretoria',
    summary:
      'Book photography and videography services in Pretoria for personal milestones and corporate productions.',
    description:
      'For Pretoria clients, we provide high-quality visual coverage with a planning-first approach. We work across wedding venues, business environments, and portrait settings with dependable delivery and clear communication.',
    neighborhoods: ['Centurion', 'Hatfield', 'Menlyn', 'Brooklyn', 'Montana', 'Irene'],
    keywords: [
      'photographer Pretoria',
      'videographer Pretoria',
      'event photographer Pretoria',
      'studio photography Pretoria',
    ],
    faqs: [
      {
        question: 'Do you support Pretoria corporate shoots?',
        answer:
          'Yes. We support business shoots, conferences, and branded content production in Pretoria.',
      },
      {
        question: 'How far in advance should Pretoria bookings be made?',
        answer:
          'Book early for peak dates. For major events, 4 to 12 weeks is recommended.',
      },
    ],
  },
  {
    slug: 'midrand',
    name: 'Midrand',
    title: 'Photography & Videography in Midrand',
    summary:
      'Midrand-based photography and videography services with fast coordination and strong production quality.',
    description:
      'As a Midrand-based studio, we provide responsive service for local clients who need efficient planning, sharp visuals, and dependable turnaround. We support private bookings and business production needs.',
    neighborhoods: ['Carlswald', 'Noordwyk', 'Kyalami', 'Waterfall', 'Blue Hills', 'Halfway House'],
    keywords: [
      'photographer Midrand',
      'videographer Midrand',
      'Midrand photography studio',
      'event photography Midrand',
    ],
    faqs: [
      {
        question: 'Is Mendy Studios based in Midrand?',
        answer: 'Yes. Mendy Studios is based in Midrand, Gauteng, South Africa.',
      },
      {
        question: 'Can Midrand clients get urgent bookings?',
        answer:
          'Where schedule allows, we can support urgent local bookings in Midrand and nearby areas.',
      },
    ],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
