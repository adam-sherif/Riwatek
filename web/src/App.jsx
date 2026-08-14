import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ValueProps from './components/ValueProps';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <ValueProps />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default App;
