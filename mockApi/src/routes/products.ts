import { Router } from 'express';
import { generateProductsList, generateProductDetail } from '../data/dataGenerator.js';
import type { ProductsListResponse, ProductDetail } from '@/entity/product/model/types';

const router = Router();

// Кешируем список продуктов, чтобы данные не менялись при каждом запросе
let cachedProducts: ReturnType<typeof generateProductsList> | null = null;

function getCachedProducts() {
  if (!cachedProducts) {
    cachedProducts = generateProductsList(100);
  }
  return cachedProducts;
}

// GET /api/products - список продуктов с пагинацией
router.get('/', (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const allProducts = getCachedProducts();
    const total = allProducts.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const products = allProducts.slice(startIndex, endIndex);

    res.json({
      products,
      total,
      page,
      pageSize,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id/offers - предложения продавцов с сортировкой (должен быть раньше /:id)
router.get('/:id/offers', (req, res) => {
  try {
    const { id } = req.params;
    const sortBy = req.query.sortBy as string | undefined; // 'price' | 'delivery'

    const allProducts = getCachedProducts();
    const detail = generateProductDetail(id, allProducts);

    if (!detail) {
      return res.status(404).json({ error: `Product with id ${id} not found` });
    }

    let offers = detail.offers ? [...detail.offers] : [];

    // Сортируем предложения на бэкенде
    if (sortBy === 'price' || sortBy === 'delivery') {
      if (sortBy === 'price') {
        offers.sort((a, b) => {
          // Сначала по валюте, потом по цене
          if (a.currency !== b.currency) {
            return a.currency.localeCompare(b.currency);
          }
          return a.price - b.price;
        });
      } else if (sortBy === 'delivery') {
        offers.sort((a, b) => {
          const dateA = new Date(a.deliveryDate).getTime();
          const dateB = new Date(b.deliveryDate).getTime();
          return dateA - dateB;
        });
      }
    }

    res.json({ offers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product offers' });
  }
});

// GET /api/products/:id - детали продукта (без offers для SSR)
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const allProducts = getCachedProducts();
    const detail = generateProductDetail(id, allProducts);

    if (!detail) {
      return res.status(404).json({ error: `Product with id ${id} not found` });
    }

    // Возвращаем продукт без offers для SSR
    const { offers, ...productWithoutOffers } = detail;
    res.json(productWithoutOffers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product detail' });
  }
});

export { router as productsRouter };
