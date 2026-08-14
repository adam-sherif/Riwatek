import AccordionGallery from './react-bits/AccordionGallery';
import './Categories.css';

// Real cover photos, one representative product per category, pulled from
// the actual scraped data (server/data/products.json) — not placeholders.
// Only categories that currently have real products are listed; "pipes" and
// "accessories" will be added here once real products exist for them,
// rather than showing a blank/broken tile.
const CATEGORY_ITEMS = [
  {
    image: 'https://cdn.salla.sa/xlgpQ/a018a4da-5b59-4b27-923a-8c506a4b20d8-500x500-cbWsj2HAjRY7UTtyeYztlD5FesobkGkhlIwNw6Jk.webp',
    label: 'وحدات التحكم',
    link: '/products?category=controllers'
  },
  {
    image: 'https://cdn.salla.sa/xlgpQ/38534c26-d42b-4956-baf0-591ca0b03965-500x500-faEtyJvl1gAZhzxBweuADL9nFZE0XXIfnmAynj7P.webp',
    label: 'الرشاشات والفوهات',
    link: '/products?category=sprinklers'
  },
  {
    image: 'https://cdn.salla.sa/xlgpQ/1de2d3a0-b5c4-41a6-af3a-18bf43837896-500x500-ZLJlAzW4q0dLVAcQX66pvnsvb1aqzqyCiNJ7lkfk.jpg',
    label: 'الصمامات',
    link: '/products?category=valves'
  }
];

const Categories = () => (
  <section id="categories" className="categories">
    <div className="container">
      <div className="categories__head">
        <span className="eyebrow">CATALOG</span>
        <h2 className="categories__title">تصفّح فئات المنتجات</h2>
        <p className="categories__desc">
          مجموعة متكاملة من أنظمة الري والمياه — اضغط أو مرّر على أي فئة لعرضها.
        </p>
      </div>
    </div>

    {/* Full-bleed on mobile so the panels get real width; the component's
        own 520px breakpoint stacks them into a vertical list automatically. */}
    <div className="categories__gallery-wrap">
      <AccordionGallery
        items={CATEGORY_ITEMS}
        defaultIndex={0}
        height={420}
        gap={8}
        radius={18}
        expandRatio={0.5}
        accentColor="#8fd3ec"
        overlayColor="#0b2230"
        trigger="hover"
      />
    </div>
  </section>
);

export default Categories;
