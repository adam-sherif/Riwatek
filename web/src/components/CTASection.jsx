import SpecularButton from './react-bits/SpecularButton';
import { buildWhatsAppLink } from '../lib/whatsapp';
import './CTASection.css';

const CTASection = () => (
  <section id="cta" className="cta-section">
    <div className="container cta-section__inner">
      <h2>جاهز تطلب بالجملة؟</h2>
      <p>أرسل لنا احتياجك من منتجات الري والمياه عبر واتساب، وفريقنا يرجعلك بعرض سعر بسرعة.</p>

      {/* The one WebGL-driven moment on the page besides the header glass —
          reserved for the single highest-intent action so it doesn't compete
          with itself. */}
      <SpecularButton
        size="lg"
        radius={999}
        baseColor="#123448"
        lineColor="#8fd3ec"
        textColor="#ffffff"
        intensity={1.1}
        proximity={260}
        autoAnimate
        speed={0.25}
        onClick={() => {
          window.open(buildWhatsAppLink('مرحباً، أرغب في طلب عرض سعر بالجملة من ريواتك.'), '_blank', 'noopener');
        }}
      >
        تواصل مع فريق المبيعات عبر واتساب
      </SpecularButton>
    </div>
  </section>
);

export default CTASection;
