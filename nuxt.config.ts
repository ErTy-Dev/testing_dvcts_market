import { defineNuxtConfig } from 'nuxt/config';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

/**
 * ENV:
 *  - ANALYZE=true    -> создаст dist/bundle-visualizer.html
 *  - NODE_ENV=production
 */

const shouldAnalyze = process.env.ANALYZE === 'true';
const isProd = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
  modules: [
    'shadcn-nuxt',
    // Временно отключаем @nuxt/eslint для диагностики проблемы со сборкой
    '@nuxt/eslint',
  ],

  // Указываем srcDir для правильной работы алиасов
  srcDir: 'src',

  // Настройка dev сервера (для preview тоже)
  devServer: {
    port: 3000,
  },

  // Настройка автоматической регистрации компонентов
  // Регистрируем только entity компоненты, shared/ui компоненты импортируются явно
  components: [
    {
      path: '~/entity',
      pathPrefix: false,
    },
    {
      path: '~/widgets',
      pathPrefix: false,
    },
    {
      path: '~/app/layout',
      pathPrefix: false,
    },
  ],

  // Глобальные стили
  css: ['@/app/index.css'],

  // Настройка приложения
  app: {
    // Базовый URL для приложения (если развернуто в подпапке, укажите путь)
    // baseURL: '/',
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'Marketplace - Лучшие предложения и цены',
      titleTemplate: '%s | Marketplace',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Marketplace - онлайн-платформа для покупки товаров. Широкий ассортимент, лучшие цены от проверенных продавцов, быстрая доставка.',
        },
        {
          name: 'keywords',
          content: 'marketplace, магазин, покупки, товары, доставка, цены, продавцы',
        },
        { name: 'author', content: 'Marketplace' },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        { name: 'language', content: 'ru' },
        { name: 'revisit-after', content: '7 days' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Marketplace' },
        { property: 'og:locale', content: 'ru_RU' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@marketplace' },
        // Mobile
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Marketplace' },
        // Theme
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/svg+xml', sizes: '32x32', href: '/favicon-32x32.svg' },
        { rel: 'icon', type: 'image/svg+xml', sizes: '16x16', href: '/favicon-16x16.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.svg' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  // Runtime config для переменных окружения
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  // Используем дефолтный vite builder (ничего указывать не обязательно),
  // но пробрасываем тонкую настройку vite через поле `vite`.
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      // Дедуплируем Vue-библиотеки в монорепозиториях, если нужно
      dedupe: ['vue', 'vue-router', 'pinia'],
    },

    plugins: [
      tailwindcss(),
      tsconfigPaths(), // подхватит алиасы из tsconfig.json
      // compression плагин генерирует .br и .gz артефакты во время build
      // Временно отключаем для ускорения сборки и устранения зависаний
      // ...(isProd
      //   ? [
      //       compress({
      //         verbose: false,
      //         // сохраняем оригиналы файлов, чтобы сервер мог отдавать и не-suffixed
      //         deleteOriginFile: false,
      //         // порог — генерировать только для больших файлов (в байтах)
      //         filter: (file) => /\.(js|css|html|svg|json)$/i.test(file),
      //         threshold: 1024, // минимальный размер файла для компрессии
      //       }) as any,
      //     ]
      //   : []),
      // анализатор: включи ANALYZE=true при запуске билда, чтобы открыть отчет
      ...(shouldAnalyze
        ? [
            // visualizer — rollup plugin, генерирует html в dist
            visualizer({
              filename: path.resolve(process.cwd(), 'dist', 'bundle-visualizer.html'),
              open: false,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],

    // Опции препроцессинга зависимостей (ускоряет dev cold start)
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
      },
      // если есть тяжёлые модули, можно явно указать include
      // include: ['some-slow-lib'],
    },

    build: {
      // Целевой синтаксис (если поддержка старых браузеров нужна — добавь legacy builder)
      target: 'es2020',
      // кладём ассеты в папку assets в dist — можно убрать, дефолт уже 'assets'
      assetsDir: 'assets',
      // Базовый путь для статических ресурсов (если развернуто в подпапке)
      // publicPath: '/',
      // CSS code splitting - отключаем для лучшей загрузки SSR
      cssCodeSplit: false,

      minify: true,

      sourcemap: !isProd,

      rollupOptions: {
        output: {
          // cache-friendly имена файлов
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            // Используем originalFileNames для определения типа по расширению
            // names - актуальное свойство (вместо устаревшего name)
            const fileName = assetInfo.originalFileNames?.[0] || assetInfo.names?.[0] || '';
            if (!fileName) return 'assets/[name]-[hash][extname]';
            if (/\.(css)$/.test(fileName)) return 'assets/css/[name]-[hash][extname]';
            if (/\.(png|jpe?g|svg|webp|gif|avif)$/.test(fileName))
              return 'assets/images/[name]-[hash][extname]';
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },

    // мелкие оптимизации HMR/Logging
    server: {
      hmr: {
        overlay: true,
      },
    },

    // Лог уровень vite
    logLevel: 'info',
  },

  // Nuxt-specific performance flags
  nitro: {
    //TODO: думаю на будущее надо сделать чтобы с окружения бралось
    // Используем 'node-server' для SSR с nginx
    preset: 'vercel',
    // Если деплоишь на environments, где поддерживается precompress,
    // Nitro умеет отдавать precompressed при правильной конфигурации.
    compressPublicAssets: false, // мы генерим .br/.gz сами, поэтому false
    // В node-server режиме Nitro автоматически обслуживает статические файлы из .output/public/_nuxt
    // Не нужно явно указывать publicAssets, Nitro использует стандартное поведение
    publicAssets: [
      {
        baseURL: '/_nuxt/',
        dir: path.resolve(process.cwd(), '.nuxt/dist/client'),
      },
    ],
  },

  // Настройка route rules для SSG страницы деталей
  // Временно отключаем для диагностики проблемы со сборкой
  routeRules: {
    '/products/**': {
      // Временно отключаем prerender для ускорения сборки
      // prerender: true,
      ssr: true,
      // Убеждаемся, что CSS загружается синхронно
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './src/shared/components/ui',
  },

  // Дополнительные рекомендации:
  // - В CI используйте NODE_ENV=production и ANALYZE=true если нужен отчет.
  // - Используйте pnpm/npm ci с frozen lockfile.
});
