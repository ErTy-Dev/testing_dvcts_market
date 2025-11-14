// Генератор тестовых данных для продуктов
import type {
  ProductListItem,
  ProductDetail,
  ProductAttribute,
  SellerOffer,
  Currency,
} from '@/entity/product/model/types';
import { format, addDays, startOfWeek } from 'date-fns';

const currencies: Currency[] = ['RUR', 'USD', 'EUR'];
const productNames = [
  'Lorem ipsum dolor sit amet',
  'Consectetur adipiscing elit',
  'Sed do eiusmod tempor',
  'Incididunt ut labore',
  'Et dolore magna aliqua',
  'Ut enim ad minim veniam',
  'Quis nostrud exercitation',
  'Ullamco laboris nisi',
  'Ut aliquip ex ea commodo',
  'Duis aute irure dolor',
];

const attributeKeys = [
  'Цвет',
  'Размер',
  'Объём постоянной памяти',
  'Процессор',
  'Оперативная память',
  'Экран',
  'Камера',
  'Батарея',
  'Вес',
  'Материал',
];

const attributeValues = [
  'красный',
  'синий',
  'чёрный',
  'белый',
  '256GB',
  '512GB',
  '1TB',
  '128GB',
  '8GB',
  '16GB',
  '32GB',
  '64GB',
];

const sellerNames = [
  'TechStore',
  'ElectroMarket',
  'DigitalShop',
  'GadgetWorld',
  'SmartBuy',
  'TechZone',
  'ElectroHub',
  'DeviceStore',
];

// Генерируем случайное число в диапазоне
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерируем случайный элемент из массива
function randomItem<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)];
}

// Генерируем ID продукта
function generateProductId(index: number): string {
  return `product-${String(index + 1).padStart(3, '0')}`;
}

// Генерируем дату доставки (в пределах текущей недели)
export function generateDeliveryDate(): string {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Понедельник
  const daysOffset = randomInt(0, 6); // 0-6 дней от начала недели
  const deliveryDate = addDays(weekStart, daysOffset);
  return format(deliveryDate, 'yyyy-MM-dd');
}

// Генерируем один продукт
function generateProduct(index: number): ProductListItem {
  return {
    id: generateProductId(index),
    photo: `https://picsum.photos/300/200?random=${index}`,
    name: randomItem(productNames),
    price: randomInt(100, 10000) + Math.random(),
    currency: randomItem(currencies),
    stock: randomInt(0, 100),
    deliveryDate: generateDeliveryDate(),
  };
}

// Генерируем список продуктов
export function generateProductsList(count: number = 100): ProductListItem[] {
  const products: ProductListItem[] = [];

  for (let i = 0; i < count; i++) {
    products.push(generateProduct(i));
  }

  return products;
}

// Генерируем атрибуты продукта
function generateAttributes(): ProductAttribute[] {
  const count = randomInt(3, 6);
  const attributes: ProductAttribute[] = [];
  const usedKeys = new Set<string>();

  for (let i = 0; i < count; i++) {
    let key = randomItem(attributeKeys);
    while (usedKeys.has(key)) {
      key = randomItem(attributeKeys);
    }
    usedKeys.add(key);

    attributes.push({
      key,
      value: randomItem(attributeValues),
    });
  }

  return attributes;
}

// Генерируем предложения продавцов
function generateSellerOffers(
  productId: string,
  basePrice: number,
  currency: Currency
): SellerOffer[] {
  const count = randomInt(3, 8);
  const offers: SellerOffer[] = [];

  for (let i = 0; i < count; i++) {
    const priceVariation = randomInt(-20, 20) / 100; // ±20%
    const price = basePrice * (1 + priceVariation);

    offers.push({
      id: `offer-${productId}-${i + 1}`,
      sellerName: randomItem(sellerNames),
      rating: randomInt(30, 50) / 10, // 3.0 - 5.0
      price: Math.max(1, price),
      currency,
      deliveryDate: generateDeliveryDate(),
    });
  }

  // Сортируем по цене
  return offers.sort((a, b) => a.price - b.price);
}

// Генерируем детали продукта
export function generateProductDetail(
  productId: string,
  productList: ProductListItem[]
): ProductDetail | null {
  const product = productList.find((p) => p.id === productId);
  if (!product) {
    return null;
  }

  return {
    id: product.id,
    photo: `https://picsum.photos/600/600?random=${product.id}`,
    name: product.name,
    attributes: generateAttributes(),
    offers: generateSellerOffers(product.id, product.price, product.currency),
  };
}
