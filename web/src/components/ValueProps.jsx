import './ValueProps.css';

const VALUES = [
  {
    title: 'أسعار جملة حقيقية',
    desc: 'تسعير مباشر للمقاولين والموزعين بدون وسطاء، مع خصومات على الكميات الكبيرة.'
  },
  {
    title: 'منتجات أصلية معتمدة',
    desc: 'نتعامل مع علامات ري وموردين معتمدين — لا بدائل تقليد، ولا خسارة في الجودة.'
  },
  {
    title: 'شحن لجميع مدن المملكة',
    desc: 'من جدة ومكة والمدينة إلى باقي المناطق، مع تنسيق شحن مناسب لطلبات الجملة.'
  }
];

const ValueProps = () => (
  <section id="value" className="value-props">
    <div className="container value-props__grid">
      {VALUES.map(v => (
        <div key={v.title} className="value-props__card">
          <span className="value-props__dot" aria-hidden="true" />
          <h3>{v.title}</h3>
          <p>{v.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ValueProps;
