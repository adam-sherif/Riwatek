import AccordionGallery from './react-bits/AccordionGallery';
import './Categories.css';

// Pulled from the Rain Bird category structure we scraped earlier — swap
// `image` for real product/category photography once available, and
// `link` for the matching category route once the backend is wired up.
const CATEGORY_ITEMS = [
  { image: '/media/categories/controllers.jpg', label: 'وحدات التحكم', link: '#' },
  { image: '/media/categories/sprinklers.jpg', label: 'الرشاشات', link: '#' },
  { image: '/media/categories/valves.jpg', label: 'الصمامات وصناديق الصمامات', link: '#' },
  { image: '/media/categories/pipes.jpg', label: 'الأنابيب والفيتنجات', link: '#' },
  { image: '/media/categories/accessories.jpg', label: 'الملحقات', link: '#' }
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
