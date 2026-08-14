import { useEffect, useState } from 'react';
import GlassSurface from './react-bits/GlassSurface';
import './Header.css';

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'المنتجات', href: '#categories' },
  { label: 'لماذا ريواتك', href: '#value' },
  { label: 'تواصل معنا', href: '#cta' }
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <a href="#hero" className="site-header__brand" aria-label="ريواتك — الصفحة الرئيسية">
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
            </a>

            <nav className="site-header__nav" aria-label="التنقل الرئيسي">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} className="site-header__link">
                  {link.label}
                </a>
              ))}
            </nav>

            <a href="#cta" className="site-header__cta">
              اطلب عرض سعر
            </a>

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
        </GlassSurface>

        {open && (
          <div className="site-header__mobile-menu">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#cta" className="site-header__mobile-cta" onClick={() => setOpen(false)}>
              اطلب عرض سعر
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
