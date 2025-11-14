// API клиент для продуктов
import type { ProductDetail, ProductsListResponse, ProductOffersResponse } from '../model/types';
import { createApiClient } from '@/shared/api/api';

export const useProductApi = () => {
  const api = createApiClient();

  const getProducts = async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<ProductsListResponse> => {
    const response = await api.get<ProductsListResponse>('/api/products', {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  };

  const getProductDetail = async (id: string): Promise<ProductDetail> => {
    const response = await api.get<ProductDetail>(`/api/products/${id}`);
    return response.data;
  };

  const getProductOffers = async (
    id: string,
    sortBy?: 'price' | 'delivery'
  ): Promise<ProductOffersResponse> => {
    const response = await api.get<ProductOffersResponse>(`/api/products/${id}/offers`, {
      params: sortBy ? { sortBy } : undefined,
    });
    return response.data;
  };

  return {
    getProducts,
    getProductDetail,
    getProductOffers,
  };
};
