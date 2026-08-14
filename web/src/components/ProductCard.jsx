import { Link } from 'react-router-dom';
import './ProductCard.css';

const STOCK_LABEL = {
  in_stock: 'متوفر',
  low_stock: 'كمية محدودة',
  out_of_stock: 'غير متوفر حالياً',
  unknown: null // scraper couldn't confirm this — don't claim a status we don't know
};

const ProductCard = ({ product }) => {
  const stockLabel = STOCK_LABEL[product.stock_status];

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        {product.image ? (
          <img src={product.image} alt={product.title_ar} loading="lazy" />
        ) : (
          <div className="product-card__image-placeholder" aria-hidden="true" />
        )}
        {stockLabel && (
          <span className={`product-card__stock product-card__stock--${product.stock_status}`}>{stockLabel}</span>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.title_ar}</h3>
        {product.description_ar && <p className="product-card__desc">{product.description_ar}</p>}

        <div className="product-card__footer">
          <span className="product-card__price num">
            {product.price} {product.currency === 'SAR' ? 'ر.س' : product.currency}
          </span>
          <Link className="product-card__cta" to={`/products/${product.id}`}>
            اطلب الآن
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
