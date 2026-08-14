const fetch = globalThis.fetch || require('node-fetch');

const CATEGORY_ID = '800345116';
const STORE_ID = '692774979';
const base = 'https://api.salla.dev/store/v1/products';

async function tryFetch(query) {
  const url = `${base}?${query}`;
  console.log('Requesting', url);
  const res = await fetch(url, { method: 'GET' });
  console.log('Status', res.status);
  const json = await res.text();
  try {
    const obj = JSON.parse(json);
    if (Array.isArray(obj)) console.log('Array length', obj.length);
    else if (obj && Array.isArray(obj.data)) console.log('data length', obj.data.length);
    else if (obj && Array.isArray(obj.products)) console.log('products length', obj.products.length);
    else console.log('Response keys', Object.keys(obj));
  } catch (e) {
    console.log('Non-JSON response or parse error, raw length:', json.length);
  }
}

async function dumpStoreResponse() {
  const q = `source=categories&filterable=1&source_value[]=${CATEGORY_ID}&store_id=${STORE_ID}`;
  const url = `${base}?${q}`;
  console.log('\nDumping full JSON for', url);
  const res = await fetch(url, { method: 'GET' });
  const body = await res.json();
  // print a compact summary
  console.log('Top-level keys:', Object.keys(body));
  if (body && body.data) console.log('data.length =', body.data.length);
  if (body && body.meta) console.log('meta =', body.meta);
  if (body && body.pagination) console.log('pagination =', body.pagination);
  if (body && body.cursor) console.log('cursor =', body.cursor);
  // print first product if present
  const arr = body.data || body.products || (Array.isArray(body) ? body : null);
  if (arr && arr.length > 0) {
    console.log('First product keys:', Object.keys(arr[0]));
    console.log('First product title:', arr[0].title || arr[0].name || arr[0].title_ar || arr[0].title?.ar);
  }
}

(async () => {
  await tryFetch(`source=categories&filterable=1&source_value[]=${CATEGORY_ID}`);
  await tryFetch(`source=categories&filterable=1&source_value[]=${CATEGORY_ID}&store_id=${STORE_ID}`);
  await tryFetch(`source=categories&filterable=1&source_value[]=${CATEGORY_ID}&store_id=${STORE_ID}&lang=ar`);
  await tryFetch(`source=categories&filterable=1&source_value[]=${CATEGORY_ID}&store_id=${STORE_ID}&limit=50`);
  await tryFetch(`source=categories&filterable=1&source_value[]=${CATEGORY_ID}&store_id=${STORE_ID}&limit=100`);
  await tryFetch(`source=categories&filterable=1&source_value[]=${CATEGORY_ID}&store_id=${STORE_ID}&page=2`);
  await tryFetch(`source=categories&filterable=1&source_value[]=${CATEGORY_ID}&store_id=${STORE_ID}&offset=15`);
  await dumpStoreResponse();
})().catch(err=>{console.error(err);process.exit(1)});
