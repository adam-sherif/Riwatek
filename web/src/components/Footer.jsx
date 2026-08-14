import { buildWhatsAppLink } from '../lib/whatsapp';
import './Footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="container site-footer__inner">
      <div>
        <span className="site-footer__brand">ريواتك — WATER SOLUTIONS</span>
        <p>موزّع أنظمة ري ومياه بالجملة، المملكة العربية السعودية.</p>
      </div>
      <nav className="site-footer__links" aria-label="روابط الفوتر">
        <a href="/">الرئيسية</a>
        <a href="/products">المنتجات</a>
        <a href="/#value">لماذا ريواتك</a>
        <a href={buildWhatsAppLink('مرحباً، أرغب في التواصل مع ريواتك.')} target="_blank" rel="noopener noreferrer">
          تواصل معنا
        </a>
      </nav>
      <p className="site-footer__copy">© {new Date().getFullYear()} ريواتك. جميع الحقوق محفوظة.</p>
    </div>
  </footer>
);

export default Footer;
