# Mock API Server

Реальный backend сервер для разработки, который предоставляет API для продуктов.

## Запуск

```bash
# Запустить только API сервер
pnpm dev:api

# Запустить API + Nuxt приложение одновременно
pnpm dev:all
```

## API Endpoints

### GET /api/products

Получить список продуктов с пагинацией

**Query параметры:**

- `page` (number, default: 1) - номер страницы
- `pageSize` (number, default: 20) - количество продуктов на странице

**Пример:**

```bash
GET http://localhost:3001/api/products?page=1&pageSize=20
```

**Ответ:**

```json
{
  "products": [...],
  "total": 100,
  "page": 1,
  "pageSize": 20
}
```

### GET /api/products/:id

Получить детали продукта по ID

**Пример:**

```bash
GET http://localhost:3001/api/products/product-001
```

**Ответ:**

```json
{
  "id": "product-001",
  "photo": "...",
  "name": "...",
  "attributes": [...],
  "offers": [...]
}
```

### GET /health

Health check endpoint

**Пример:**

```bash
GET http://localhost:3001/health
```

## Конфигурация

Сервер запускается на порту `3001` по умолчанию. Можно изменить через переменную окружения:

```bash
PORT=3001 pnpm dev:api
```

## CORS

Сервер настроен на работу с `http://localhost:3000` (Nuxt dev server). Если нужно изменить, обновите `mockApi/src/server.ts`.
