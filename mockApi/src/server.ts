import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.js';

const app = express();
const PORT = process.env.MOCK_API_PORT!;

// Получаем CORS origin из .env
const corsOrigin = process.env.MOCK_API_CORS_ORIGIN || process.env.CORS_ORIGIN!;
const corsOrigins = corsOrigin.split(',').map((origin) => origin.trim());

// Middleware
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});
