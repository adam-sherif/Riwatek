// Organization/Store structured data for local SEO (#17). Only fields we
// actually know are included — no invented street address, opening hours,
// or ratings. Add `address` once you give me the real one; search engines
// mostly ignore LocalBusiness schema without it anyway, so this is a
// starting point, not a finished local-SEO listing.
const SITE_URL = 'https://riwatek.com'; // ⚠️ assumed — confirm this is the real production domain

const SeoJsonLd = () => (
  <script
    type="application/ld+json"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'ريواتك',
        alternateName: 'Riwatek',
        url: SITE_URL,
        telephone: '+966503270141',
        areaServed: 'SA',
        description: 'موزّع أنظمة ري ومياه بالجملة في المملكة العربية السعودية.'
        // address: add once confirmed — { "@type": "PostalAddress", ... }
      })
    }}
  />
);

export default SeoJsonLd;
