import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GlassSurface from './react-bits/GlassSurface';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink } from '../lib/whatsapp';
import './Header.css';

const NAV_LINKS = [
  { label: 'الرئيسية', to: '/' },
  { label: 'المنتجات', to: '/products' },
  { label: 'لماذا ريواتك', to: '/#value' }
];

const WHATSAPP_HREF = buildWhatsAppLink('مرحباً، أرغب في التواصل مع ريواتك.');

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__inner container">
        {/* GlassSurface gives the header its frosted-water look — the one
            "glass" moment on the page, so the rest of the UI stays flat. */}
        <GlassSurface
          width="100%"
          height={64}
          borderRadius={18}
          backgroundOpacity={0.14}
          saturation={1.6}
          brightness={62}
          blur={9}
          className="site-header__glass"
        >
          <div className="site-header__row">
            <Link to="/" className="site-header__brand" aria-label="ريواتك — الصفحة الرئيسية">
              <span className="site-header__brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 30" width="22" height="27">
                  <path
                    d="M12 1c4 7 8 12.5 8 17.5A8 8 0 1 1 4 18.5C4 13.5 8 7 12 1Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <span className="site-header__brand-text">
                <span className="site-header__brand-name">ريواتك</span>
                <span className="site-header__brand-sub">WATER SOLUTIONS</span>
              </span>
            </Link>

            <nav className="site-header__nav" aria-label="التنقل الرئيسي">
              {NAV_LINKS.map(link => (
                <Link key={link.to} to={link.to} className="site-header__link">
                  {link.label}
                </Link>
              ))}
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="site-header__link">
                تواصل معنا
              </a>
            </nav>

            <div className="site-header__actions">
              <Link to="/cart" className="site-header__cart" aria-label="السلة">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="20" r="1.4" />
                  <circle cx="18" cy="20" r="1.4" />
                  <path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {totalCount > 0 && <span className="site-header__cart-badge">{totalCount}</span>}
              </Link>

              <Link to="/products" className="site-header__cta">
                اطلب عرض سعر
              </Link>

              <button
                type="button"
                className="site-header__toggle"
                aria-expanded={open}
                aria-label="فتح قائمة التنقل"
                onClick={() => setOpen(o => !o)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </GlassSurface>

        {open && (
          <div className="site-header__mobile-menu">
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              تواصل معنا
            </a>
            <Link to="/products" className="site-header__mobile-cta" onClick={() => setOpen(false)}>
              اطلب عرض سعر
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
