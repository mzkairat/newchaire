const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Load config (edit config.json to change your USDT wallet) ──
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const USDT_WALLET = config.USDT_WALLET;

// Product pricing
const PRODUCTS = {
  'aeron-a': { name: 'Aeron Chair - Size A (Small)', price: 485 },
  'aeron-b': { name: 'Aeron Chair - Size B (Medium)', price: 535 },
  'aeron-c': { name: 'Aeron Chair - Size C (Large)', price: 585 },
};

// POST /api/order — receive order & return payment info
app.post('/api/order', (req, res) => {
  const { firstName, lastName, email, address, city, state, zip, country, productId, quantity } = req.body;

  if (!firstName || !lastName || !email || !address || !city || !country || !productId) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
  }

  const product = PRODUCTS[productId];
  if (!product) return res.status(400).json({ success: false, message: 'Invalid product.' });

  const qty = parseInt(quantity) || 1;
  const total = product.price * qty;
  const orderId = 'ORD-' + Date.now();

  // Save order to local JSON file
  const order = {
    orderId,
    date: new Date().toISOString(),
    customer: { firstName, lastName, email, address, city, state, zip, country },
    product: { id: productId, name: product.name, price: product.price, quantity: qty, total },
    paymentStatus: 'pending',
    walletAddress: USDT_WALLET,
    amountUSDT: total,
  };

  const ordersFile = path.join(__dirname, 'orders.json');
  let orders = [];
  if (fs.existsSync(ordersFile)) {
    try { orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8')); } catch (e) { orders = []; }
  }
  orders.push(order);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

  // Return payment instructions to client
  res.json({
    success: true,
    orderId,
    total,
    walletAddress: USDT_WALLET,
    network: 'TRC20 (Tron)',
    message: `Please send exactly ${total} USDT to the wallet below. Your order will be processed after payment confirmation.`,
  });
});

// GET /api/orders — admin view (simple, no auth for now)
app.get('/api/orders', (req, res) => {
  const ordersFile = path.join(__dirname, 'orders.json');
  if (!fs.existsSync(ordersFile)) return res.json([]);
  try {
    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    res.json(orders);
  } catch (e) {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
