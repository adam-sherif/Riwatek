import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProduct } from '../lib/api';
import { useCart } from '../context/CartContext';
import { usePageMeta } from '../lib/usePageMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | notfound | error
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    getProduct(id)
      .then(res => {
        if (cancelled) return;
        setProduct(res);
        setStatus('ready');
      })
      .catch(err => {
        if (cancelled) return;
        setStatus(err.message.includes('404') ? 'notfound' : 'error');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToCart = () => {
    addItem(product, qty);
    navigate('/cart');
  };

  // Real per-product title/description (#11, #12) — this is the one page
  // where the meta actually differs per URL in a way that matters for SEO,
  // since each product is its own indexable page.
  usePageMeta({
    title: product?.title_ar,
    description: product
      ? `${product.title_ar} — ${product.price} ${product.currency === 'SAR' ? 'ر.س' : product.currency} للقطعة الواحدة. أسعار الجملة عند التواصل مع ريواتك.`
      : undefined,
    image: product?.image
  });

  if (status === 'loading') {
    return (
      <main className="product-page">
        <div className="container">
          <p className="product-page__status">جارِ تحميل المنتج…</p>
        </div>
      </main>
    );
  }

  if (status === 'notfound') {
    return (
      <main className="product-page">
        <div className="container">
          <p className="product-page__status">هذا المنتج غير موجود.</p>
          <Link to="/products" className="product-page__back">
            ← العودة إلى كل المنتجات
          </Link>
        </div>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="product-page">
        <div className="container">
          <p className="product-page__status product-page__status--error">
            تعذّر تحميل المنتج. تأكد من تشغيل الخادم (server) على المنفذ 4000.
          </p>
        </div>
      </main>
    );
  }

  const CATEGORY_LABELS = {
    controllers: 'وحدات التحكم',
    sprinklers: 'الرشاشات والفوهات',
    valves: 'الصمامات',
    pipes: 'الأنابيب والفيتنجات',
    accessories: 'الملحقات'
  };

  return (
    <main className="product-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', to: '/' },
            { label: 'المنتجات', to: '/products' },
            ...(CATEGORY_LABELS[product.category]
              ? [{ label: CATEGORY_LABELS[product.category], to: `/products?category=${product.category}` }]
              : []),
            { label: product.title_ar }
          ]}
        />
      </div>
      <div className="container product-page__grid">
        <div className="product-page__image-wrap">
          {product.image ? (
            <img src={product.image} alt={product.title_ar} />
          ) : (
            <div className="product-page__image-placeholder" aria-hidden="true" />
          )}
        </div>

        <div className="product-page__info">
          <Link to="/products" className="product-page__back">
            ← كل المنتجات
          </Link>

          <h1>{product.title_ar}</h1>

          <p className="product-page__desc">
            {product.description_ar || 'الوصف التفصيلي لهذا المنتج غير متوفر حالياً — تواصل معنا للمزيد من التفاصيل.'}
          </p>

          <div className="product-page__price num">
            {product.price} {product.currency === 'SAR' ? 'ر.س' : product.currency}
          </div>

          <div className="product-page__qty">
            <label htmlFor="qty">الكمية</label>
            <div className="product-page__qty-control">
              <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="إنقاص الكمية">
                −
              </button>
              <input
                id="qty"
                type="number"
                min="1"
                value={qty}
                onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))}
              />
              <button type="button" onClick={() => setQty(q => q + 1)} aria-label="زيادة الكمية">
                +
              </button>
            </div>
          </div>

          <button type="button" className="product-page__add-btn" onClick={handleAddToCart}>
            أضف إلى السلة
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
