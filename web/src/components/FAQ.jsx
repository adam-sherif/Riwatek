import './FAQ.css';

// Only the last item ("كيف أطلب بالجملة؟") is something I actually know is
// true from what's already built into the site. The others are real
// questions a wholesale buyer would ask, but the answers are business
// policy I don't know — marked clearly so they don't get published as-is.
const FAQ_ITEMS = [
  {
    q: 'ما الحد الأدنى لكمية الطلب بالجملة؟',
    a: '[يُرجى تعبئة الإجابة الفعلية — الحد الأدنى للطلب حسب سياسة ريواتك]'
  },
  {
    q: 'هل الأسعار المعروضة شاملة ضريبة القيمة المضافة؟',
    a: '[يُرجى تعبئة الإجابة الفعلية]'
  },
  {
    q: 'كم تستغرق مدة الشحن داخل المملكة؟',
    a: '[يُرجى تعبئة الإجابة الفعلية — مدة الشحن الفعلية حسب المدينة]'
  },
  {
    q: 'هل يمكن إرجاع أو استبدال المنتج؟',
    a: '[يُرجى تعبئة الإجابة الفعلية — سياسة الإرجاع والاستبدال]'
  },
  {
    q: 'كيف أطلب عرض سعر بالجملة؟',
    a: 'تواصل معنا مباشرة عبر واتساب من أي زر "تواصل معنا" أو "اطلب عرض سعر" في الموقع، وأرسل لنا احتياجك وسيرد عليك فريق المبيعات.'
  }
];

const FAQ = () => (
  <section id="faq" className="faq">
    <div className="container">
      <span className="eyebrow">FAQ</span>
      <h2>الأسئلة الشائعة</h2>
      <div className="faq__list">
        {FAQ_ITEMS.map(item => (
          <details key={item.q} className="faq__item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </div>

    {/* schema.org FAQPage markup for #17 local/rich-result SEO — search
        engines can only show this as a rich result once the bracketed
        placeholder answers above are replaced with real copy. */}
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        })
      }}
    />
  </section>
);

export default FAQ;
