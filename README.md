# Marketplace Mockup

Веб-приложение маркетплейса, реализованное на Nuxt 3 с TypeScript. Прототип включает главную страницу с каталогом товаров и страницу деталей продукта с предложениями от различных продавцов.

## Технологии

### Основной стек

- **Nuxt 3** (v4.2.1) - Vue.js фреймворк с SSR/SSG поддержкой
- **TypeScript** (v5.9.3) - строгая типизация
- **Vue 3** (v3.5.22) - прогрессивный JavaScript фреймворк
- **Vite** - быстрый сборщик и dev-сервер
- **Tailwind CSS** (v4.0.0) - utility-first CSS фреймворк

### UI компоненты

- **shadcn-nuxt** (v2.3.2) - коллекция переиспользуемых UI компонентов
- **reka-ui** (v2.6.0) - примитивы для построения UI компонентов
- **lucide-vue-next** - иконки
- **class-variance-authority** - управление вариантами компонентов

### Утилиты

- **date-fns** (v4.1.0) - работа с датами
- **axios** (v1.13.2) - HTTP клиент
- **@vueuse/core** - коллекция Vue композаблов

### Инструменты разработки

- **ESLint** (@nuxt/eslint) - линтинг кода
- **Prettier** - форматирование кода
- **TypeScript** - проверка типов
- **rollup-plugin-visualizer** - анализ размера бандла

## Архитектура проекта

Проект использует **Feature-Sliced Design (FSD)** архитектуру для организации кода:

```
src/
├── app/                    # Инициализация приложения
│   ├── index.css          # Глобальные стили
│   └── layout/            # Layout компоненты
│       └── DefaultLayout.vue
├── pages/                  # Страницы (роутинг)
│   ├── index.vue          # Главная страница
│   └── products/
│       └── [id].vue       # Страница деталей продукта
├── widgets/               # Крупные UI блоки
│   ├── header/
│   │   └── Header.vue
│   └── footer/
│       └── Footer.vue
├── entity/                # Бизнес-сущности
│   └── product/
│       ├── api/           # API для работы с продуктами
│       ├── model/         # Типы и модели данных
│       ├── ui/            # UI компоненты сущности
│       └── helpers/       # Вспомогательные функции
├── shared/                # Переиспользуемый код
│   ├── api/               # Базовые API утилиты
│   ├── components/        # Общие компоненты
│   │   ├── ui/           # UI компоненты (shadcn)
│   │   ├── ErrorBoundary.vue
│   │   ├── ErrorDisplay.vue
│   │   └── StarRating.vue
│   └── lib/               # Утилиты
└── error.vue              # Кастомная страница ошибок
```

## Функциональность

### Главная страница

- Отображение списка товаров в виде карточек
- Бесконечный скроллинг для загрузки товаров
- Skeleton loading состояния
- Адаптивная сетка (1-5 колонок в зависимости от размера экрана)
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
  - Breadcrumb навигация
- Список предложений от продавцов с возможностью сортировки:
  - По цене (по умолчанию)
  - По дате доставки
- Каждое предложение содержит:
  - Название продавца
  - Рейтинг продавца
  - Цена у продавца
  - Дата доставки

### Страница ошибок

Кастомная страница обработки ошибок (`error.vue`) поддерживает:

- **400** - Неверный запрос
- **401** - Требуется авторизация
- **403** - Доступ запрещен
- **404** - Страница не найдена
- **408** - Превышено время ожидания
- **429** - Слишком много запросов
- **500** - Внутренняя ошибка сервера
- **502** - Ошибка шлюза
- **503** - Сервис недоступен
- **504** - Превышено время ожидания шлюза

Для каждого типа ошибки отображается соответствующее сообщение, цветовая схема и доступные действия.

## API Endpoints

Приложение включает mock backend API:

- `GET /api/products` - получение списка товаров с пагинацией
  - Query параметры:
    - `page` - номер страницы (по умолчанию: 1)
    - `pageSize` - размер страницы (по умолчанию: 20)
  - Ответ: `{ products: ProductListItem[], total: number, page: number, pageSize: number }`

- `GET /api/products/[id]` - получение деталей продукта
  - Ответ: `ProductDetail`

- `GET /health` - health check endpoint

## Установка и запуск

### Требования

- **Node.js** 20+ (рекомендуется LTS версия)
- **pnpm** (рекомендуется) или npm/yarn
- **Docker** и **Docker Compose** (для запуска через Docker)

### Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
# API конфигурация
NUXT_PUBLIC_API_BASE=http://localhost:3001/api

# Mock API настройки
MOCK_API_PORT=3001
MOCK_API_CORS_ORIGIN=http://localhost:3000

# Окружение
NODE_ENV=development
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

# Просмотр логов
docker-compose -f docker-compose.dev.yml logs -f
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

# Просмотр логов
docker-compose logs -f
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

#### Production сборка

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

#### Анализ размера бандла

Для анализа размера бандла после сборки:

```bash
# Установите переменную окружения и соберите проект
ANALYZE=true pnpm build

# Откройте dist/bundle-visualizer.html в браузере
```

## Скрипты

### Основные команды

- `pnpm dev` - запуск dev сервера Nuxt
- `pnpm dev:api` - запуск mock API сервера
- `pnpm dev:all` - запуск обоих серверов одновременно
- `pnpm build` - production сборка
- `pnpm preview` - предпросмотр production сборки
- `pnpm generate` - генерация статического сайта (SSG)

### Качество кода

- `pnpm lint` - проверка кода линтером
- `pnpm lint:fix` - автоматическое исправление ошибок линтера
- `pnpm typecheck` - проверка типов TypeScript
- `pnpm format` - форматирование кода с помощью Prettier
- `pnpm format:check` - проверка форматирования без изменений

### Утилиты

- `pnpm clean` - очистка сгенерированных файлов (.nuxt, .output)
- `pnpm postinstall` - подготовка Nuxt после установки зависимостей

## CI/CD

### GitHub Actions

Пример конфигурации для GitHub Actions (`.github/workflows/ci.yml`):

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm typecheck

      - name: Format check
        run: pnpm format:check

      - name: Build
        run: pnpm build
        env:
          NODE_ENV: production

  docker-build:
    runs-on: ubuntu-latest
    needs: lint-and-test

    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build Docker image
        run: docker build -t marketplace:latest -f Dockerfile .

      - name: Test Docker image
        run: docker run --rm marketplace:latest npm run typecheck
```

### GitLab CI

Пример конфигурации для GitLab CI (`.gitlab-ci.yml`):

```yaml
stages:
  - lint
  - build
  - test

variables:
  NODE_VERSION: '20'

lint:
  stage: lint
  image: node:${NODE_VERSION}
  before_script:
    - npm install -g pnpm
    - pnpm install --frozen-lockfile
  script:
    - pnpm lint
    - pnpm typecheck
    - pnpm format:check

build:
  stage: build
  image: node:${NODE_VERSION}
  before_script:
    - npm install -g pnpm
    - pnpm install --frozen-lockfile
  script:
    - pnpm build
  artifacts:
    paths:
      - .output/
    expire_in: 1 week

docker-build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -f Dockerfile .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  only:
    - main
```

### Настройка CI/CD

1. **GitHub Actions**: Создайте папку `.github/workflows/` и добавьте файл `ci.yml`
2. **GitLab CI**: Добавьте файл `.gitlab-ci.yml` в корень проекта
3. **Настройте секреты** для Docker registry (если используется)
4. **Настройте переменные окружения** в настройках репозитория

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

### Производительность

- **Бесконечный скроллинг**: Реализован с использованием Intersection Observer API
- **Code splitting**: Автоматическое разделение кода на чанки
- **Lazy loading**: Ленивая загрузка компонентов и изображений
- **CSS optimization**: Минификация и оптимизация CSS
- **Bundle analysis**: Инструменты для анализа размера бандла

### UX/UI

- **Адаптивный дизайн**: Используется Tailwind CSS с responsive grid
- **Skeleton loading**: Показ скелетонов во время загрузки
- **Error handling**: Кастомная страница ошибок с понятными сообщениями
- **SEO оптимизация**: Мета-теги, структурированные данные (JSON-LD)
- **Accessibility**: Семантическая разметка и ARIA атрибуты

### Разработка

- **TypeScript**: Полная типизация всех компонентов и API
- **Feature-Sliced Design**: Организация кода по слоям
- **Component auto-import**: Автоматический импорт компонентов
- **Hot Module Replacement**: Быстрая перезагрузка при изменениях
- **ESLint + Prettier**: Единый стиль кода

### Production

- **SSR/SSG**: Поддержка серверного рендеринга и статической генерации
- **Nginx**: Оптимизированная конфигурация для production
- **Docker**: Контейнеризация для легкого деплоя
- **Compression**: Gzip/Brotli сжатие статических файлов
- **Caching**: Настройка кэширования для статических ресурсов

## Дополнительная информация

### Изображения

- Для генерации изображений используются placeholder сервисы (picsum.photos)
- Все изображения оптимизируются при сборке

### Локализация

- Форматирование дат доставки на русском языке
- Все тексты интерфейса на русском языке

### Рейтинги

- Рейтинги отображаются в виде звёзд (0-5)
- Поддержка половинных значений

### Согласованность данных

- Все данные генерируются случайным образом, но согласованы между списком и деталями
- Кэширование данных в памяти для обеспечения консистентности

## Структура файлов проекта

```
market_template_ts/
├── .github/                 # GitHub Actions workflows (если используется)
├── .nuxt/                   # Сгенерированные файлы Nuxt (не коммитится)
├── dist/                    # Production сборка (не коммитится)
├── mockApi/                 # Mock API сервер
│   ├── src/
│   │   ├── data/           # Генератор тестовых данных
│   │   ├── routes/         # API роуты
│   │   └── server.ts       # Express сервер
│   └── tsconfig.json
├── node_modules/            # Зависимости (не коммитится)
├── public/                  # Статические файлы
│   ├── favicon.*           # Иконки сайта
│   ├── robots.txt          # Правила для поисковых роботов
│   └── site.webmanifest    # Web App Manifest
├── src/                     # Исходный код приложения
│   ├── app/                # Инициализация приложения
│   ├── entity/             # Бизнес-сущности
│   ├── pages/              # Страницы (роутинг)
│   ├── shared/            # Переиспользуемый код
│   ├── widgets/            # Крупные UI блоки
│   ├── app.vue             # Корневой компонент
│   └── error.vue           # Страница ошибок
├── .env                    # Переменные окружения (не коммитится)
├── .env.example            # Пример переменных окружения
├── .gitignore              # Игнорируемые файлы Git
├── components.json         # Конфигурация shadcn-nuxt
├── docker-compose.yml      # Docker Compose для production
├── docker-compose.dev.yml  # Docker Compose для разработки
├── Dockerfile              # Dockerfile для production
├── Dockerfile.dev          # Dockerfile для разработки
├── eslint.config.ts        # Конфигурация ESLint
├── nginx.conf              # Конфигурация Nginx
├── nuxt.config.ts          # Конфигурация Nuxt
├── package.json            # Зависимости и скрипты
├── pnpm-lock.yaml          # Lock файл pnpm
├── README.md               # Документация
└── tsconfig.json           # Конфигурация TypeScript
```

## Автор

Erkutbek Turdubaev
