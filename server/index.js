import express from 'express';
import cors from 'cors';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');

const app = express();
app.use(cors());
app.use(express.json());

const readJSON = async file => JSON.parse(await readFile(path.join(DATA_DIR, file), 'utf-8'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/categories', async (_req, res, next) => {
  try {
    res.json(await readJSON('categories.json'));
  } catch (err) {
    next(err);
  }
});

app.get('/api/products', async (req, res, next) => {
  try {
    const products = await readJSON('products.json');
    const { category } = req.query;
    const filtered = category ? products.filter(p => p.category === category) : products;
    res.json(filtered);
  } catch (err) {
    next(err);
  }
});

app.get('/api/products/:id', async (req, res, next) => {
  try {
    const products = await readJSON('products.json');
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Riwatek API listening on http://localhost:${PORT}`);
});
