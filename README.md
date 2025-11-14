# Marketplace Mockup

Веб-приложение маркетплейса, реализованное на Nuxt 3 с TypeScript. Прототип включает главную страницу с каталогом товаров и страницу деталей продукта с предложениями от различных продавцов.

## Технологии

- **Nuxt 3** - Vue.js фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **date-fns** - работа с датами
- **Vite** - сборщик

## Функциональность

### Главная страница

- Отображение списка товаров в виде карточек
- Бесконечный скроллинг для загрузки товаров
- Каждая карточка содержит:
  - Фото товара (миниатюра)
  - Название товара
  - Цена и валюта
  - Рейтинг (звёзды)
  - Остаток на складе
  - Дата доставки

### Страница деталей продукта

- Полная информация о товаре:
  - Фото товара (полное)
  - Название и артикул
  - Рейтинг
  - Атрибуты товара (характеристики)
- Список предложений от продавцов с возможностью сортировки:
  - По цене (по умолчанию)
  - По дате доставки
- Каждое предложение содержит:
  - Название продавца
  - Рейтинг продавца
  - Цена у продавца
  - Дата доставки

## API Endpoints

Приложение включает mock backend API:

- `GET /api/products` - получение списка товаров с пагинацией
  - Query параметры:
    - `page` - номер страницы (по умолчанию: 1)
    - `pageSize` - размер страницы (по умолчанию: 20)
  - Ответ: `{ products: ProductListItem[], total: number, page: number, pageSize: number }`

- `GET /api/products/[id]` - получение деталей продукта
  - Ответ: `ProductDetail`

## Структура проекта

```
market_template_ts/
├── src/
│   ├── components/          # Vue компоненты
│   │   ├── ProductCard.vue
│   │   ├── SellerOfferCard.vue
│   │   └── StarRating.vue
│   ├── composables/         # Vue composables
│   │   ├── useApi.ts
│   │   └── useProducts.ts
│   ├── pages/                # Страницы Nuxt
│   │   ├── index.vue         # Главная страница
│   │   └── products/
│   │       └── [id].vue      # Страница деталей продукта
│   ├── plugins/              # Nuxt plugins
│   │   └── vue-query.client.ts
│   ├── types/                # TypeScript типы
│   │   └── index.ts
│   ├── utils/                # Утилиты
│   │   └── dataGenerator.ts  # Генератор тестовых данных
│   └── app.vue               # Корневой компонент
├── nuxt.config.ts            # Конфигурация Nuxt
├── tailwind.config.js        # Конфигурация Tailwind
├── .env                      # Переменные окружения
├── .env.example              # Пример переменных окружения
└── package.json
```

## Установка и запуск

### Требования

- Node.js 20+
- pnpm (рекомендуется) или npm/yarn
- Docker и Docker Compose (для запуска через Docker)

### Настройка переменных окружения

Создайте файл `.env` в корне проекта на основе `.env.example`:

```env
NUXT_PUBLIC_API_BASE=http://localhost:3001/api
MOCK_API_PORT=3001
MOCK_API_CORS_ORIGIN=http://localhost:3000
```

### Вариант 1: Запуск через Docker (рекомендуется)

#### Разработка (Dev)

Запуск dev сервера и mock API в одном контейнере:

```bash
# Сборка и запуск
docker-compose -f docker-compose.dev.yml up --build

# В фоновом режиме
docker-compose -f docker-compose.dev.yml up -d --build

# Остановка
docker-compose -f docker-compose.dev.yml down
```

**Доступ:**

- Nuxt приложение: `http://localhost:3000`
- Mock API: `http://localhost:3001/api`
- Health check API: `http://localhost:3001/health`

#### Production

Сборка и запуск production версии с nginx:

```bash
# Сборка и запуск
docker-compose up --build

# В фоновом режиме
docker-compose up -d --build

# Остановка
docker-compose down
```

**Доступ:**

- Приложение: `http://localhost:3000`
- Nginx слушает порт 80 внутри контейнера, который проброшен на порт 3000 хоста

### Вариант 2: Локальный запуск (без Docker)

#### Установка зависимостей

```bash
# Используя pnpm (рекомендуется)
pnpm install

# Или используя npm
npm install

# Или используя yarn
yarn install
```

#### Разработка

Запуск dev сервера и mock API одновременно:

```bash
# Запуск обоих серверов (Nuxt + Mock API)
pnpm dev:all

# Или по отдельности в разных терминалах:
pnpm dev        # Nuxt dev server на http://localhost:3000
pnpm dev:api    # Mock API на http://localhost:3001
```

### Production сборка

Сборка приложения для production:

```bash
# pnpm
pnpm build

# npm
npm run build

# yarn
yarn build
```

Предпросмотр production сборки локально:

```bash
# pnpm
pnpm preview

# npm
npm run preview

# yarn
yarn preview
```

## Тестовые данные

Приложение генерирует ~100 тестовых продуктов при первом запуске. Данные включают:

- Случайные названия товаров
- Цены в различных валютах (USD, RUR, EUR)
- Случайные остатки на складе
- Даты доставки в пределах текущей недели
- Атрибуты товаров (характеристики)
- Предложения от различных продавцов (5-15 предложений на товар)

Данные генерируются динамически и кэшируются в памяти сервера для обеспечения согласованности между списком товаров и деталями продукта.

## Особенности реализации

- **Бесконечный скроллинг**: Реализован с использованием Intersection Observer API
- **Сортировка предложений**: Клиентская сортировка по цене или дате доставки
- **Адаптивный дизайн**: Используется Tailwind CSS с responsive grid
- **TypeScript**: Полная типизация всех компонентов и API
- **Production-ready**: Оптимизированная сборка с code splitting

## Дополнительная информация

- Для генерации изображений используются placeholder сервисы (picsum.photos)
- Форматирование дат доставки на русском языке
- Рейтинги отображаются в виде звёзд (0-5)
- Все данные генерируются случайным образом, но согласованы между списком и деталями

## Лицензия

Проект создан в рамках тестового задания.
