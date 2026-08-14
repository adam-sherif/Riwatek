import { buildWhatsAppLink } from '../lib/whatsapp';
import './StickyMobileCTA.css';

const StickyMobileCTA = () => (
  <a
    className="sticky-cta"
    href={buildWhatsAppLink('مرحباً، أرغب في طلب عرض سعر بالجملة من ريواتك.')}
    target="_blank"
    rel="noopener noreferrer"
  >
    اطلب عبر واتساب
  </a>
);

export default StickyMobileCTA;
