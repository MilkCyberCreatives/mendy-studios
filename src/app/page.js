import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import GallerySection from '../components/GallerySection';
import ServicesSection from '../components/ServicesSection'; 
// import ContactSection from '../components/ContactSection';
import ContactCTASection from '../components/ContactCTASection';
import ClientsSection from '../components/ClientsSection';
import FooterSection from '../components/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ServicesSection />
      {/* <ContactSection /> */}
      <ContactCTASection />
      <ClientsSection />
      <FooterSection />
    </main>
  );
}
