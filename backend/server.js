const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data - Crypto currencies
const cryptoCurrencies = [
  {
    id: 'BTC',
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    symbol: 'ETH',
  },
  {
    id: 'XRP',
    name: 'XRP',
    symbol: 'XRP',
  },
  {
    id: 'BCH',
    name: 'Bitcoin Cash',
    symbol: 'BCH',
  },
  {
    id: 'LTC',
    name: 'Litecoin',
    symbol: 'LTC',
  },
  {
    id: 'EOS',
    name: 'EOS',
    symbol: 'EOS',
  },
  {
    id: 'BNB',
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  {
    id: 'LINK',
    name: 'Chainlink',
    symbol: 'LINK',
  },
  {
    id: 'NEO',
    name: 'NEO',
    symbol: 'NEO',
  },
  {
    id: 'ETC',
    name: 'Ethereum Classic',
    symbol: 'ETC',
  },
  {
    id: 'ONT',
    name: 'Ontology',
    symbol: 'ONT',
  },
  {
    id: 'CRO',
    name: 'Crypto.com Chain',
    symbol: 'CRO',
  },
  {
    id: 'CUC',
    name: 'Cucumber',
    symbol: 'CUC',
  },
  {
    id: 'USDC',
    name: 'USD Coin',
    symbol: 'USDC',
  },
];

// Mock data - Fiat currencies
const fiatCurrencies = [
  {
    id: 'SGD',
    name: 'Singapore Dollar',
    symbol: '$',
    code: 'SGD',
  },
  {
    id: 'EUR',
    name: 'Euro',
    symbol: '€',
    code: 'EUR',
  },
  {
    id: 'GBP',
    name: 'British Pound',
    symbol: '£',
    code: 'GBP',
  },
  {
    id: 'HKD',
    name: 'Hong Kong Dollar',
    symbol: '$',
    code: 'HKD',
  },
  {
    id: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    code: 'JPY',
  },
  {
    id: 'AUD',
    name: 'Australian Dollar',
    symbol: '$',
    code: 'AUD',
  },
  {
    id: 'USD',
    name: 'United States Dollar',
    symbol: '$',
    code: 'USD',
  },
];

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Currency API Mock Service',
    version: '1.0.0',
    endpoints: {
      crypto: '/api/currencies/crypto',
      fiat: '/api/currencies/fiat',
      all: '/api/currencies/all',
    },
  });
});

// Get crypto currencies
app.get('/api/currencies/crypto', (req, res) => {
  res.json({
    success: true,
    data: cryptoCurrencies,
    count: cryptoCurrencies.length,
  });
});

// Get fiat currencies
app.get('/api/currencies/fiat', (req, res) => {
  res.json({
    success: true,
    data: fiatCurrencies,
    count: fiatCurrencies.length,
  });
});

// Get all currencies
app.get('/api/currencies/all', (req, res) => {
  res.json({
    success: true,
    data: {
      crypto: cryptoCurrencies,
      fiat: fiatCurrencies,
    },
    count: {
      crypto: cryptoCurrencies.length,
      fiat: fiatCurrencies.length,
      total: cryptoCurrencies.length + fiatCurrencies.length,
    },
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Mock API Server running on port ${PORT}`);
  console.log(`📊 Architecture: ${process.arch}`);
  console.log(`🖥️  Platform: ${process.platform}`);
  console.log(`📡 Endpoints available:`);
  console.log(`   - GET http://localhost:${PORT}/api/currencies/crypto`);
  console.log(`   - GET http://localhost:${PORT}/api/currencies/fiat`);
  console.log(`   - GET http://localhost:${PORT}/api/currencies/all`);
});

module.exports = app;
