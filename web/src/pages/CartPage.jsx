import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink } from '../lib/whatsapp';
import './CartPage.css';

const formatMoney = (amount, currency) => `${amount} ${currency === 'SAR' ? 'ر.س' : currency}`;

const buildOrderMessage = (items, totalPrice) => {
  const lines = items.map(i => `- ${i.title_ar} × ${i.qty} = ${formatMoney(i.qty * i.price, i.currency)}`);
  return ['طلب جديد من موقع ريواتك:', '', ...lines, '', `الإجمالي: ${formatMoney(totalPrice, items[0]?.currency || 'SAR')}`].join(
    '\n'
  );
};

const CartPage = () => {
  const { items, removeItem, updateQty, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <h1>السلة</h1>
          <p className="cart-page__empty">سلتك فارغة حالياً.</p>
          <Link to="/products" className="cart-page__browse">
            تصفح المنتجات ←
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        <h1>السلة</h1>

        <div className="cart-page__list">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__image">
                {item.image ? <img src={item.image} alt={item.title_ar} /> : <div className="cart-item__image-placeholder" />}
              </div>
              <div className="cart-item__info">
                <h3>{item.title_ar}</h3>
                <span className="cart-item__unit-price num">{formatMoney(item.price, item.currency)} / قطعة</span>
              </div>
              <div className="cart-item__qty">
                <button type="button" onClick={() => updateQty(item.id, item.qty - 1)} aria-label="إنقاص الكمية">
                  −
                </button>
                <span className="num">{item.qty}</span>
                <button type="button" onClick={() => updateQty(item.id, item.qty + 1)} aria-label="زيادة الكمية">
                  +
                </button>
              </div>
              <div className="cart-item__subtotal num">{formatMoney(item.qty * item.price, item.currency)}</div>
              <button type="button" className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label="إزالة المنتج">
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-page__summary">
          <span>الإجمالي</span>
          <span className="cart-page__total num">{formatMoney(totalPrice, items[0]?.currency || 'SAR')}</span>
        </div>

        <div className="cart-page__actions">
          <Link to="/products" className="cart-page__continue">
            متابعة التسوق
          </Link>
          <a
            className="cart-page__checkout"
            href={buildWhatsAppLink(buildOrderMessage(items, totalPrice))}
            target="_blank"
            rel="noopener noreferrer"
          >
            إتمام الطلب عبر واتساب
          </a>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
