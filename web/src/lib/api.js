const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const getCategories = () => request('/api/categories');

export const getProducts = category =>
  request(category ? `/api/products?category=${encodeURIComponent(category)}` : '/api/products');

export const getProduct = id => request(`/api/products/${encodeURIComponent(id)}`);
