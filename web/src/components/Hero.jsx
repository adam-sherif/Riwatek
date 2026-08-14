import MaskedHeading from './react-bits/MaskedHeading';
import './Hero.css';

const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero__bg" aria-hidden="true" />
    <div className="container hero__inner">
      <span className="eyebrow">RIWATEK · WHOLESALE IRRIGATION &amp; WATER SYSTEMS</span>

      {/* Signature element: the headline is literally cut from irrigation
          water footage — the one piece of "water solutions" made visible,
          not just described. Everything else on the page stays quiet. */}
      <MaskedHeading
        text="نروي أرض المملكة"
        tag="h1"
        mediaType="image"
        src="/media/hero-irrigation.jpg"
        fillScale={1.3}
        parallax={30}
        drift={14}
        reveal="wipe"
        trigger="mount"
        duration={1.3}
        textScale={0.135}
        weight={800}
        className="hero__heading"
      />

      <p className="hero__subhead">
        نورّد أنظمة ري ومياه أصلية بأسعار الجملة للمقاولين وموزعي القطاع الزراعي
        والتجاري في جميع مدن المملكة — من وحدات التحكم إلى الرشاشات والصمامات.
      </p>

      <div className="hero__actions">
        <a href="#categories" className="hero__primary">
          تصفح الكتالوج
        </a>
        <a href="#cta" className="hero__secondary">
          اطلب عرض سعر بالجملة ←
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
