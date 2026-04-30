const USDT_WALLET = process.env.USDT_WALLET || 'TPBkTi6MJiUCr9Tshb3U3MY8Ebu1GH9hti';

const PRODUCTS = {
    'aeron-a': { name: 'Aeron Chair - Size A (Small)', price: 485 },
    'aeron-b': { name: 'Aeron Chair - Size B (Medium)', price: 535 },
    'aeron-c': { name: 'Aeron Chair - Size C (Large)', price: 585 },
};

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') {
          return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
          const { firstName, lastName, email, address, city, state, zip, country, productId, quantity } = req.body;

      if (!firstName || !lastName || !email || !address || !city || !country || !productId) {
              return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
      }

      const product = PRODUCTS[productId];
          if (!product) {
                  return res.status(400).json({ success: false, message: 'Invalid product.' });
          }

      const qty = parseInt(quantity) || 1;
          const total = product.price * qty;
          const orderId = 'ORD-' + Date.now();

      return res.status(200).json({
              success: true,
              orderId,
              total,
              walletAddress: USDT_WALLET,
              network: 'TRC20 (Tron)',
      });

    } catch (err) {
          return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};
