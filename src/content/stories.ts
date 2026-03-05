export type Story = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  tags: string[];
  readMinutes: number;
  paragraphs: string[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
  relatedLocations: string[];
};

export const stories: Story[] = [
  {
    slug: 'wedding-photography-planning-gauteng',
    title: 'Wedding Photography Planning in Gauteng',
    description:
      'A practical planning guide for couples booking wedding photography and videography across Gauteng.',
    publishedAt: '2026-01-12',
    updatedAt: '2026-01-12',
    coverImage: '/images/gallery/gallery41.jpg',
    tags: ['Weddings', 'Gauteng', 'Planning'],
    readMinutes: 6,
    relatedServices: ['photography', 'videography', 'prints'],
    relatedLocations: ['johannesburg', 'pretoria', 'midrand'],
    paragraphs: [
      'Great wedding visuals begin long before the wedding day. A strong timeline, clear priorities, and a reliable shot list help your team capture every important moment without stress.',
      'When you book your photographer and videographer early, you secure better availability and enough pre-production time. This gives space for location planning, lighting checks, and style alignment before the event.',
      'For Gauteng weddings, always plan with transport buffers between ceremony and reception venues. This protects your portrait session time and keeps the final gallery balanced between candid emotion and polished hero shots.',
      'Share family group lists and key cultural moments in advance. That preparation improves speed on the day and reduces missed moments, especially with large family structures and multi-location celebrations.',
    ],
    faqs: [
      {
        question: 'How early should a wedding photo and video team be booked in Gauteng?',
        answer:
          'For peak dates, book at least 6 to 12 months in advance so planning and availability are secure.',
      },
      {
        question: 'What is the most important timeline item for wedding coverage?',
        answer:
          'Protect portrait and golden-hour time blocks so the final gallery includes both emotional and cinematic visuals.',
      },
    ],
  },
  {
    slug: 'corporate-content-shoot-day-checklist',
    title: 'Corporate Content Shoot-Day Checklist',
    description:
      'A checklist for brands that need efficient, professional photo and video production for campaigns and social channels.',
    publishedAt: '2026-01-26',
    updatedAt: '2026-01-26',
    coverImage: '/images/gallery/gallery44.jpg',
    tags: ['Corporate', 'Branding', 'Video'],
    readMinutes: 5,
    relatedServices: ['videography', 'editing', 'photography'],
    relatedLocations: ['johannesburg', 'pretoria'],
    paragraphs: [
      'Corporate production runs best when goals are specific. Define exactly what content is needed for websites, paid ads, social media, and internal communications before the cameras roll.',
      'Build a structured call sheet with scenes, speaking points, and time allocations. This keeps teams aligned and makes output quality more consistent across departments and campaign channels.',
      'Prepare locations for sound and lighting. Background noise, poor room acoustics, and mixed lighting quickly reduce production quality and increase editing time.',
      'Assign one internal contact to approve priorities and keep decisions moving. That single point of contact helps production stay on schedule and protects budget efficiency.',
    ],
    faqs: [
      {
        question: 'Why are call sheets important for business shoots?',
        answer:
          'They align teams, reduce delays, and improve output consistency by mapping scenes, people, and timing clearly.',
      },
      {
        question: 'What causes avoidable delays on corporate shoot day?',
        answer:
          'Unclear approvals, poor location prep, and no single decision-maker are common causes of lost production time.',
      },
    ],
  },
  {
    slug: 'portrait-session-prep-for-best-results',
    title: 'Portrait Session Prep for the Best Results',
    description:
      'Simple preparation steps that improve confidence, consistency, and final image quality for portrait sessions.',
    publishedAt: '2026-02-05',
    updatedAt: '2026-02-05',
    coverImage: '/images/gallery/gallery24.jpg',
    tags: ['Portraits', 'Studio', 'Lifestyle'],
    readMinutes: 4,
    relatedServices: ['studio', 'photography'],
    relatedLocations: ['midrand', 'johannesburg'],
    paragraphs: [
      'Portrait sessions are strongest when wardrobe, location, and mood all match the intended use of the images. A little preparation creates more confidence and cleaner visual storytelling.',
      'Choose outfits that fit comfortably and avoid busy patterns. Solid tones and complementary layers photograph more consistently across indoor and outdoor lighting changes.',
      'Bring references for expression and posing style. This gives direction without making the session rigid, helping the photographer balance natural moments with polished hero frames.',
      'Plan around rest and hydration. Good energy shows clearly on camera and helps the session move faster with better expression variety.',
    ],
    faqs: [
      {
        question: 'What should clients bring to a portrait session?',
        answer:
          'Bring outfit options, basic grooming essentials, and reference examples of the style or mood you prefer.',
      },
      {
        question: 'How can someone look more natural in portraits?',
        answer:
          'Arrive early, relax into conversation, and follow paced posing guidance rather than forcing expressions.',
      },
    ],
  },
  {
    slug: 'johannesburg-event-photography-venue-checklist',
    title: 'Johannesburg Event Photography Venue Checklist',
    description:
      'A practical checklist for choosing event-ready venues and planning photography flow in Johannesburg.',
    publishedAt: '2026-02-12',
    updatedAt: '2026-02-12',
    coverImage: '/images/gallery/gallery36.jpg',
    tags: ['Johannesburg', 'Events', 'Photography'],
    readMinutes: 5,
    relatedServices: ['photography', 'videography'],
    relatedLocations: ['johannesburg'],
    paragraphs: [
      'Venue quality directly impacts event imagery. Before confirming any venue, check the natural light timeline, ceiling height, and available backup lighting options.',
      'Evaluate movement flow between reception, stage, and speaker zones. Efficient access improves coverage quality, especially when timelines are tight.',
      'Ask venues about setup restrictions and vendor access windows. Early access allows better camera and audio planning before guest arrival.',
      'Always include contingency plans for weather and power interruptions to protect critical moments and avoid output gaps.',
    ],
    faqs: [
      {
        question: 'Why does venue layout matter for event photography?',
        answer:
          'Layout determines movement speed, framing options, and overall coverage consistency during peak moments.',
      },
      {
        question: 'What is the top risk to avoid for event visuals?',
        answer: 'Poor lighting planning is a major risk and should be addressed before the event day.',
      },
    ],
  },
  {
    slug: 'pretoria-corporate-video-content-guide',
    title: 'Pretoria Corporate Video Content Guide',
    description:
      'How Pretoria businesses can plan efficient and repeatable video content production workflows.',
    publishedAt: '2026-02-15',
    updatedAt: '2026-02-15',
    coverImage: '/images/gallery/gallery47.jpg',
    tags: ['Pretoria', 'Corporate', 'Video'],
    readMinutes: 6,
    relatedServices: ['videography', 'editing'],
    relatedLocations: ['pretoria'],
    paragraphs: [
      'Corporate video works best when each clip has one clear objective. Separate awareness, trust, and conversion content to simplify production and measurement.',
      'Batch production days reduce cost and improve consistency across campaigns. Plan shot lists by team, location, and theme to maximize output per hour.',
      'Use consistent audio environments and brand framing to reduce editing complexity. This also improves recognition across channels.',
      'Track output performance and refresh underperforming content quarterly to keep campaigns relevant and efficient.',
    ],
    faqs: [
      {
        question: 'How often should business video content be refreshed?',
        answer:
          'Most brands benefit from quarterly refresh cycles with monthly distribution planning.',
      },
      {
        question: 'Is batch video production better for budget control?',
        answer: 'Yes. Batch production usually reduces cost per final asset and improves planning accuracy.',
      },
    ],
  },
  {
    slug: 'midrand-studio-shoot-planning-guide',
    title: 'Midrand Studio Shoot Planning Guide',
    description:
      'A local planning guide for clients preparing studio portrait or branding sessions in Midrand.',
    publishedAt: '2026-02-18',
    updatedAt: '2026-02-18',
    coverImage: '/images/gallery/gallery18.jpg',
    tags: ['Midrand', 'Studio', 'Planning'],
    readMinutes: 5,
    relatedServices: ['studio', 'photography', 'prints'],
    relatedLocations: ['midrand'],
    paragraphs: [
      'Studio results improve when styling and brief alignment are done before the session day. Prepare wardrobe sets, visual references, and output objectives in advance.',
      'Choose one hero look and two secondary looks to keep the session efficient without losing variety.',
      'If images are for business use, map each shot to a channel such as website, profile, campaign, or print.',
      'Post-session delivery moves faster when selection priorities are clear and revision rounds are planned upfront.',
    ],
    faqs: [
      {
        question: 'How many looks should a studio session include?',
        answer:
          'A focused plan with one hero look and two supporting looks is usually efficient and flexible.',
      },
      {
        question: 'Can studio images be used for both web and print?',
        answer: 'Yes. We can prepare delivery formats for both digital and print use cases.',
      },
    ],
  },
];

export function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug);
}
