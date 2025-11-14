// Типы для продуктов
export type Currency = 'RUR' | 'USD' | 'EUR';

export interface ProductListItem {
  id: string;
  photo: string;
  name: string;
  price: number;
  currency: Currency;
  stock: number;
  deliveryDate: string;
}

export interface ProductAttribute {
  key: string;
  value: string;
}

export interface SellerOffer {
  id: string;
  sellerName: string;
  rating: number;
  price: number;
  currency: Currency;
  deliveryDate: string;
}

export interface ProductDetail {
  id: string;
  photo: string;
  name: string;
  attributes: ProductAttribute[];
  offers?: SellerOffer[]; // Опционально, так как загружается отдельно
}

export interface ProductOffersResponse {
  offers: SellerOffer[];
}

export interface ProductsListResponse {
  products: ProductListItem[];
  total: number;
  page: number;
  pageSize: number;
}
