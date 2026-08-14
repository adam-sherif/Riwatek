import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ValueProps from '../components/ValueProps';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';

const HomePage = () => {
  const { hash } = useLocation();

  usePageMeta({
    title: null, // uses the default site title/description on the homepage
    description: 'ريواتك — موزّع أنظمة ري ومياه بالجملة للمقاولين والموزعين في المملكة العربية السعودية.'
  });

  // React Router doesn't scroll to in-page anchors on navigation by itself
  // (e.g. arriving from /products via a "/#value" link), so do it manually
  // once the section elements exist.
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  return (
    <main>
      <Hero />
      <Categories />
      <ValueProps />
      <FAQ />
      <CTASection />
    </main>
  );
};

export default HomePage;
