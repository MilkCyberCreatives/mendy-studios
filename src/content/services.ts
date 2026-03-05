export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  highlights: string[];
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    slug: 'photography',
    title: 'Photography',
    summary:
      'Professional photography coverage for weddings, portraits, events, and commercial sessions across Gauteng.',
    description:
      'Our photography service is designed for clients who need sharp, professional, story-driven visuals. We cover private and corporate moments with a production-ready approach that protects quality from planning to delivery.',
    image: '/images/gallery/gallery31.jpg',
    tags: ['Photography', 'Weddings', 'Events', 'Portraits'],
    highlights: [
      'Wedding and engagement photography coverage',
      'Portrait sessions for individuals, couples, and families',
      'Corporate events, conferences, and team profile shoots',
      'Edited high-resolution image delivery',
    ],
    faqs: [
      {
        question: 'Which areas do you cover for photography services?',
        answer:
          'We cover Midrand, Johannesburg, Pretoria, and surrounding Gauteng areas, with travel options available by request.',
      },
      {
        question: 'Do you provide edited photos?',
        answer:
          'Yes. All final delivered photos are professionally edited for color, exposure, and consistency.',
      },
    ],
  },
  {
    slug: 'videography',
    title: 'Videography',
    summary:
      'Cinematic video production for weddings, events, social campaigns, and business content.',
    description:
      'We produce cinematic video assets with a clear production process, from concept alignment and shot planning to final edit delivery. This service is ideal for brands and clients who need emotionally strong and commercially usable video output.',
    image: '/images/gallery/gallery45.jpg',
    tags: ['Videography', 'Cinematic', 'Corporate', 'Events'],
    highlights: [
      'Event and wedding video coverage',
      'Brand and campaign content production',
      'Multi-angle production options',
      'Final delivery optimized for web and social platforms',
    ],
    faqs: [
      {
        question: 'Can video output be optimized for social media?',
        answer:
          'Yes. We can prepare edit formats and exports for social platforms, websites, and campaign use.',
      },
      {
        question: 'Do you cover both private and business events?',
        answer: 'Yes. We provide videography for both personal milestones and corporate productions.',
      },
    ],
  },
  {
    slug: 'streaming',
    title: 'Streaming Services',
    summary:
      'Reliable multi-camera livestream solutions for events, memorials, churches, and business sessions.',
    description:
      'Our streaming service is built for clients who need stable, professionally directed live broadcasts. We manage camera positioning, switching, and stream output so your audience experiences the event clearly and in real time.',
    image: '/images/gallery/gallery12.jpg',
    tags: ['Livestream', 'Events', 'Church', 'Funerals'],
    highlights: [
      'Multi-camera livestream setup',
      'Live direction and switching support',
      'Platform-ready stream output',
      'Professional audio and visual quality checks',
    ],
    faqs: [
      {
        question: 'Which streaming platforms can be used?',
        answer:
          'We support the major social and web streaming destinations depending on your event requirements.',
      },
      {
        question: 'Can streaming be used for private events?',
        answer:
          'Yes. We support private and public event streaming workflows.',
      },
    ],
  },
  {
    slug: 'editing',
    title: 'Video Editing',
    summary:
      'Professional post-production editing for highlight reels, corporate videos, and social content.',
    description:
      'Our video editing service focuses on pacing, sound clarity, and visual consistency. We transform raw footage into polished outputs that match your brand tone, event style, and publishing requirements.',
    image: '/images/gallery/gallery48.jpg',
    tags: ['Editing', 'Post Production', 'Highlights'],
    highlights: [
      'Cinematic editing and scene pacing',
      'Audio balancing and cleanup',
      'Color correction and consistency',
      'Delivery in platform-specific formats',
    ],
    faqs: [
      {
        question: 'Can you edit footage we captured ourselves?',
        answer: 'Yes. We can work with supplied footage if file quality and structure are suitable.',
      },
      {
        question: 'Do you offer short-form and long-form edits?',
        answer:
          'Yes. We produce short social clips and longer narrative edits depending on your goals.',
      },
    ],
  },
  {
    slug: 'studio',
    title: 'Studio Sessions',
    summary:
      'Controlled studio photography sessions for portraits, lifestyle, and business branding visuals.',
    description:
      'Studio sessions are ideal for clients who need controlled lighting and polished results. We tailor each session setup to your visual objectives so final images are ready for print, web, and profile usage.',
    image: '/images/gallery/gallery22.jpg',
    tags: ['Studio', 'Portraits', 'Branding'],
    highlights: [
      'Lighting-controlled portrait sessions',
      'Brand and personal profile image creation',
      'Flexible setup for solo and group shoots',
      'Professional post-processing and delivery',
    ],
    faqs: [
      {
        question: 'Are studio sessions suitable for business profiles?',
        answer:
          'Yes. Studio sessions are highly effective for executive profiles and brand team imagery.',
      },
      {
        question: 'Can we bring outfit changes and props?',
        answer: 'Yes. Multiple outfit changes and selected props can be included by arrangement.',
      },
    ],
  },
  {
    slug: 'prints',
    title: 'Photo Albums & Prints',
    summary:
      'Premium print products including albums, canvases, and framed memories designed for long-term value.',
    description:
      'Our print and album service helps clients preserve their most important memories beyond digital delivery. We provide high-quality print options that are suitable for personal keepsakes, gifts, and professional presentation.',
    image: '/images/gallery/gallery50.jpg',
    tags: ['Albums', 'Prints', 'Canvases'],
    highlights: [
      'Custom photo album design options',
      'Canvas and framed print selections',
      'Professional print-ready image preparation',
      'Durable finish options for long-term preservation',
    ],
    faqs: [
      {
        question: 'Can albums be customized?',
        answer:
          'Yes. Album design and layout can be customized to match event style and preference.',
      },
      {
        question: 'Do you provide both digital and print delivery?',
        answer: 'Yes. Print options can be added alongside digital image delivery packages.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
