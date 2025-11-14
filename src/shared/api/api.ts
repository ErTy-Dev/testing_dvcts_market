// Конфигурация axios для API
import axios from 'axios';

let apiInstance: ReturnType<typeof axios.create> | null = null;

export function createApiClient() {
  if (apiInstance) {
    return apiInstance;
  }

  const config = useRuntimeConfig();
  const baseURL = config.public?.apiBase as string;

  apiInstance = axios.create({
    baseURL,
  });

  return apiInstance;
}
