import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta';
import './ThankYouPage.css';

const ThankYouPage = () => {
  usePageMeta({
    title: 'شكراً لطلبك',
    description: 'تم إرسال طلبك إلى فريق ريواتك عبر واتساب.'
  });

  return (
    <main className="thank-you">
      <div className="container thank-you__inner">
        <span className="thank-you__icon" aria-hidden="true">
          ✓
        </span>
        <h1>تم إرسال طلبك</h1>
        <p>
          فتحنا لك محادثة واتساب مع فريق المبيعات وتفاصيل طلبك جاهزة للإرسال — إذا لم تُفتح تلقائياً، تواصل معنا
          مباشرة وسنكمل الطلب معك.
        </p>
        <div className="thank-you__actions">
          <Link to="/products" className="thank-you__primary">
            متابعة التسوق
          </Link>
          <Link to="/" className="thank-you__secondary">
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
