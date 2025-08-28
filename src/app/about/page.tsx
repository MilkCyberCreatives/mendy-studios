'use client';

import React from 'react';
import MainHeader from '../../components/MainHeader';
import AboutHero from '../../components/about/AboutHero';
import AboutIntro from '../../components/about/AboutIntro';
import WhyChooseUs from '../../components/about/WhyChooseUs';
import FooterSection from '../../components/FooterSection';

export default function AboutPage() {
  return (
    <>
      <MainHeader />
      <AboutHero />
      <AboutIntro />
      <WhyChooseUs />
      <FooterSection />
    </>
  );
}


// src/app/about/page.tsx
// 'use client';

// import React from 'react';
// import MainHeader from '@/components/MainHeader';
// import AboutHero from '@/components/about/AboutHero';
// import AboutIntro from '@/components/about/AboutIntro';
// import FooterSection from '@/components/FooterSection';

// export default function AboutPage() {
//   return (
//     <>
//       <MainHeader />
//       <AboutHero />
//       <AboutIntro />
//       <FooterSection />
//     </>
//   );
// }
