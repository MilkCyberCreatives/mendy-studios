'use client';

import React from 'react';
import MainHeader from '../../components/MainHeader';
import GalleryHero from '../../components/gallery/GalleryHero';
import GalleryGrid from '../../components/gallery/GalleryGrid';
import FooterSection from '../../components/FooterSection';

export default function GalleryPage() {
  return (
    <>
      <MainHeader />
      <GalleryHero />
      <GalleryGrid />
      <FooterSection />
    </>
  );
}
