import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategories, getProducts } from '../lib/api';
import { usePageMeta } from '../lib/usePageMeta';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import './ProductsPage.css';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  const activeCategory = searchParams.get('category') || 'all';
  const setActiveCategory = slug => {
    setSearchParams(slug === 'all' ? {} : { category: slug });
  };

  usePageMeta({
    title: 'كل المنتجات',
    description: 'تصفح كتالوج ريواتك الكامل لمنتجات الري والمياه بالجملة — وحدات تحكم، رشاشات، صمامات، وأنابيب.'
  });

  useEffect(() => {
    let cancelled = false;

    Promise.all([getProducts(), getCategories()])
      .then(([productsRes, categoriesRes]) => {
        if (cancelled) return;
        setProducts(productsRes);
        setCategories(categoriesRes);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Only show category tabs for categories that actually have products —
  // no point letting someone filter into an empty grid.
  const categoriesWithStock = useMemo(() => {
    const present = new Set(products.map(p => p.category));
    return categories.filter(c => present.has(c.slug));
  }, [products, categories]);

  const visibleProducts = useMemo(
    () => (activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory)),
    [products, activeCategory]
  );

  return (
    <main className="products-page">
      <div className="container">
        <Breadcrumbs items={[{ label: 'الرئيسية', to: '/' }, { label: 'المنتجات' }]} />

        <div className="products-page__head">
          <span className="eyebrow">CATALOG</span>
          <h1>كل المنتجات</h1>
          <p>أسعار وحدة للقطعة الواحدة — أسعار الجملة حسب الكمية عند التواصل مع فريق المبيعات.</p>
        </div>

        {status === 'ready' && categoriesWithStock.length > 1 && (
          <div className="products-page__filters" role="tablist" aria-label="تصفية حسب الفئة">
            <button
              type="button"
              className={activeCategory === 'all' ? 'is-active' : ''}
              onClick={() => setActiveCategory('all')}
            >
              الكل ({products.length})
            </button>
            {categoriesWithStock.map(cat => (
              <button
                key={cat.slug}
                type="button"
                className={activeCategory === cat.slug ? 'is-active' : ''}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name_ar} ({products.filter(p => p.category === cat.slug).length})
              </button>
            ))}
          </div>
        )}

        {status === 'loading' && <p className="products-page__status">جارِ تحميل المنتجات…</p>}

        {status === 'error' && (
          <p className="products-page__status products-page__status--error">
            تعذّر تحميل المنتجات. تأكد من تشغيل الخادم (server) على المنفذ 4000 ثم أعد المحاولة.
          </p>
        )}

        {status === 'ready' && visibleProducts.length === 0 && (
          <p className="products-page__status">لا توجد منتجات في هذه الفئة بعد.</p>
        )}

        {status === 'ready' && visibleProducts.length > 0 && (
          <div className="products-page__grid">
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
