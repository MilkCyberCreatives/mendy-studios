export type MotionVideo = {
  id: string;
  title: string;
  category: 'Corporate' | 'Events' | 'Brand Film' | 'Highlight Reel';
  description: string;
  duration: string;
  featured?: boolean;
};

export const motionVideos: MotionVideo[] = [
  {
    id: 'bUDBGWlRbzo',
    title: 'Leruo Foundation',
    category: 'Corporate',
    description: 'Event coverage and documentary moments captured with a cinematic edit flow.',
    duration: '2:41',
    featured: true,
  },
  {
    id: 'OhgCOI2DlmU',
    title: 'IC Duke2',
    category: 'Events',
    description: 'Energetic cut built around movement, crowd emotion, and key scene transitions.',
    duration: '2:08',
  },
  {
    id: 'YtpTS-0XuVM',
    title: 'Phumelela Consulting',
    category: 'Corporate',
    description: 'Brand-focused production designed for professional online and campaign use.',
    duration: '3:06',
  },
  {
    id: 'k7kJ7wPmC6M',
    title: 'Minister',
    category: 'Highlight Reel',
    description: 'Story-led sequence with confident pacing, portrait framing, and tonal grading.',
    duration: '1:47',
  },
  {
    id: 'eBhwD1BmYq8',
    title: 'ATW',
    category: 'Brand Film',
    description: 'Stylized visual narrative for social-first publishing and promotional campaigns.',
    duration: '2:29',
  },
  {
    id: 'J2yNvLGQ2eg',
    title: '2 roads gallery on the green 3',
    category: 'Events',
    description: 'Immersive event storytelling with layered scene detail and ambient atmosphere.',
    duration: '2:53',
  },
];
