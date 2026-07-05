// Minimal .env loader (no dotenv package needed)
(function loadEnv() {
  const fs2 = require('fs'), path2 = require('path');
  const envFile = path2.join(__dirname, '.env');
  if (!fs2.existsSync(envFile)) return;
  fs2.readFileSync(envFile, 'utf8').split('\n').forEach(line => {
    const [key, ...val] = line.trim().split('=');
    if (key && !key.startsWith('#') && val.length) process.env[key.trim()] = val.join('=').trim();
  });
})();
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const http = require('http');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;
const USDT_WALLET = process.env.USDT_WALLET || 'TLGKLmdZTgXRivF41X4DJiLGWA8Rrf7v49';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2024';
const DB_FILE = path.join(__dirname, 'orders.json');

// ── JSON "database" ───────────────────────────────────────────────────────────
function readDB() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
  catch { return []; }
}
function writeDB(orders) {
  fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2));
}
if (!fs.existsSync(DB_FILE)) writeDB([]);

// ── Products ──────────────────────────────────────────────────────────────────
const PRODUCTS = {
  'tiktok-usa':     { id: 'tiktok-usa',     name: 'TikTok Monetized Account (USA 🇺🇸)',     price: 150 },
  'tiktok-france':  { id: 'tiktok-france',  name: 'TikTok Monetized Account (France 🇫🇷)',  price: 90  },
  'tiktok-germany': { id: 'tiktok-germany', name: 'TikTok Monetized Account (Germany 🇩🇪)', price: 90  },
  'tiktok-italy':   { id: 'tiktok-italy',   name: 'TikTok Monetized Account (Italy 🇮🇹)',   price: 90  },
  'tiktok-uk':      { id: 'tiktok-uk',      name: 'TikTok Monetized Account (UK 🇬🇧)',      price: 90  },
  'facebook-page':  { id: 'facebook-page',  name: 'Facebook Monetized Page (Global 🌍)',     price: 190 },
};

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Admin Auth ────────────────────────────────────────────────────────────────
function requireAdmin(req, res, next) {
  if (req.headers['x-admin-token'] === ADMIN_PASSWORD) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// ── API ───────────────────────────────────────────────────────────────────────

// GET /api/products
app.get('/api/products', (req, res) => {
  res.json(Object.values(PRODUCTS));
});

// POST /api/order
app.post('/api/order', (req, res) => {
  const { name, email, productId } = req.body;
  if (!name || !email || !productId) return res.status(400).json({ error: 'Missing fields' });
  const product = PRODUCTS[productId];
  if (!product) return res.status(400).json({ error: 'Invalid product' });

  const id = crypto.randomBytes(6).toString('hex').toUpperCase();
  const order = {
    id,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    status: 'pending',
    created_at: new Date().toISOString(),
  };
  const orders = readDB();
  orders.unshift(order);
  writeDB(orders);
  res.json({ orderId: id });
});

// GET /api/order/:id
app.get('/api/order/:id', (req, res) => {
  const orders = readDB();
  const order = orders.find(o => o.id === req.params.id.toUpperCase());
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ ...order, wallet: USDT_WALLET });
});

// GET /api/order/:id/status
app.get('/api/order/:id/status', (req, res) => {
  const orders = readDB();
  const order = orders.find(o => o.id === req.params.id.toUpperCase());
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ status: order.status });
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) res.json({ token: ADMIN_PASSWORD });
  else res.status(401).json({ error: 'Wrong password' });
});

// GET /api/admin/orders
app.get('/api/admin/orders', requireAdmin, (req, res) => {
  res.json(readDB());
});

// PATCH /api/admin/order/:id/confirm
app.patch('/api/admin/order/:id/confirm', requireAdmin, (req, res) => {
  const id = req.params.id.toUpperCase();
  const orders = readDB();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  orders[idx].status = 'confirmed';
  writeDB(orders);
  console.log(`[✓ CONFIRMED] Order ${id} — ${orders[idx].product_name} — ${orders[idx].email}`);
  res.json({ message: 'Confirmed' });
});

// PATCH /api/admin/order/:id/reject
app.patch('/api/admin/order/:id/reject', requireAdmin, (req, res) => {
  const id = req.params.id.toUpperCase();
  const orders = readDB();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  orders[idx].status = 'rejected';
  writeDB(orders);
  res.json({ message: 'Rejected' });
});

// DELETE /api/admin/order/:id
app.delete('/api/admin/order/:id', requireAdmin, (req, res) => {
  const id = req.params.id.toUpperCase();
  const orders = readDB().filter(o => o.id !== id);
  writeDB(orders);
  res.json({ message: 'Deleted' });
});

// Catch-all (Express 5 requires named wildcard)
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running  →  http://localhost:${PORT}`);
  console.log(`🔐 Admin panel     →  http://localhost:${PORT}/admin.html`);
  console.log(`🔑 Admin password  →  ${ADMIN_PASSWORD}\n`);
});
