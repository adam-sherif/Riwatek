import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta';
import './NotFoundPage.css';

const NotFoundPage = () => {
  usePageMeta({
    title: 'الصفحة غير موجودة',
    description: 'الصفحة التي تبحث عنها غير موجودة على موقع ريواتك.'
  });

  return (
    <main className="not-found">
      <div className="container not-found__inner">
        <span className="not-found__code num">404</span>
        <h1>هذه الصفحة غير موجودة</h1>
        <p>الرابط الذي اتبعته قد يكون قديماً أو غير صحيح.</p>
        <div className="not-found__actions">
          <Link to="/" className="not-found__primary">
            العودة إلى الرئيسية
          </Link>
          <Link to="/products" className="not-found__secondary">
            تصفح المنتجات
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
