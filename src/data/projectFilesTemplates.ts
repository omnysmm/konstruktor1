import { projectFiles } from './projectFiles';

// templates.ts - часть 1 (AI Marketplace + Portfolio)
const templatesPart1 = `import { Template } from './types';

export const templates: Template[] = [
  {
    id: 'ai-marketplace',
    name: 'AI Marketplace',
    category: 'Маркетплейс',
    description: 'Маркетплейс продуктов искусственного интеллекта от разных разработчиков',
    thumbnail: '🤖',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#0f172a',
      text: '#f8fafc',
    },
    sections: [
      {
        id: 'hero',
        type: 'hero',
        editable: true,
        content: {
          title: 'AI Marketplace',
          subtitle: 'Откройте мир искусственного интеллекта. Тысячи AI-решений от лучших разработчиков мира.',
          ctaText: 'Начать бесплатно',
          ctaSecondary: 'Смотреть каталог',
        },
      },
      {
        id: 'stats',
        type: 'stats',
        editable: true,
        content: {
          items: [
            { value: '2,500+', label: 'AI моделей' },
            { value: '850+', label: 'Разработчиков' },
            { value: '150K+', label: 'Пользователей' },
            { value: '99.9%', label: 'Uptime' },
          ],
        },
      },
      {
        id: 'categories',
        type: 'categories',
        editable: true,
        content: {
          title: 'Категории AI продуктов',
          subtitle: 'Найдите идеальное решение для вашей задачи',
          items: [
            { icon: '🧠', name: 'NLP & Текст', count: '450+' },
            { icon: '👁️', name: 'Компьютерное зрение', count: '320+' },
            { icon: '🎵', name: 'Аудио & Речь', count: '280+' },
            { icon: '🎨', name: 'Генерация изображений', count: '390+' },
            { icon: '📊', name: 'Аналитика данных', count: '210+' },
            { icon: '🤖', name: 'Чат-боты', count: '540+' },
          ],
        },
      },
      {
        id: 'products',
        type: 'products',
        editable: true,
        content: {
          title: 'Популярные AI продукты',
          subtitle: 'Лучшие решения от проверенных разработчиков',
          items: [
            {
              name: 'NeuralVision Pro',
              developer: 'DeepTech Labs',
              description: 'Продвинутая система компьютерного зрения для анализа изображений и видео в реальном времени',
              price: 'от $49/мес',
              rating: 4.9,
              reviews: 234,
              tags: ['Computer Vision', 'Real-time'],
              icon: '👁️',
            },
            {
              name: 'TextGenius AI',
              developer: 'LanguageAI Inc.',
              description: 'Генерация и редактирование текстов с помощью GPT-моделей нового поколения',
              price: 'от $29/мес',
              rating: 4.8,
              reviews: 567,
              tags: ['NLP', 'Content'],
              icon: '✍️',
            },
          ],
        },
      },
      {
        id: 'pricing',
        type: 'pricing',
        editable: true,
        content: {
          title: 'Тарифные планы',
          subtitle: 'Выберите подходящий план для вашего бизнеса',
          plans: [
            {
              name: 'Стартер',
              price: '$0',
              period: '/мес',
              features: ['5 AI моделей', '1000 запросов/мес', 'Базовая поддержка', 'API доступ'],
              highlighted: false,
            },
            {
              name: 'Профессионал',
              price: '$49',
              period: '/мес',
              features: ['50 AI моделей', '50000 запросов/мес', 'Приоритетная поддержка', 'Полный API доступ', 'Кастомная настройка', 'Аналитика'],
              highlighted: true,
            },
            {
              name: 'Корпоративный',
              price: '$199',
              period: '/мес',
              features: ['Безлимитные модели', 'Безлимитные запросы', '24/7 поддержка', 'Выделенный сервер', 'SLA 99.99%', 'On-premise'],
              highlighted: false,
            },
          ],
        },
      },
      {
        id: 'footer',
        type: 'footer',
        editable: true,
        content: {
          companyName: 'AI Marketplace',
          description: 'Крупнейшая платформа продуктов искусственного интеллекта',
          links: [
            { title: 'Платформа', items: ['Каталог', 'Разработчикам', 'API', 'Документация'] },
            { title: 'Компания', items: ['О нас', 'Блог', 'Карьера', 'Контакты'] },
            { title: 'Поддержка', items: ['Помощь', 'FAQ', 'Статус', 'Сообщество'] },
          ],
        },
      },
    ],
  },
  {
    id: 'portfolio',
    name: 'Портфолио',
    category: 'Личный сайт',
    description: 'Стильное портфолио для дизайнеров и разработчиков',
    thumbnail: '💼',
    colors: {
      primary: '#1e293b',
      secondary: '#475569',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1e293b',
    },
    sections: [
      {
        id: 'hero',
        type: 'hero',
        editable: true,
        content: {
          title: 'Алексей Петров',
          subtitle: 'Full-Stack разработчик & UI/UX дизайнер с 8+ лет опыта создания цифровых продуктов',
          ctaText: 'Смотреть работы',
          ctaSecondary: 'Связаться',
        },
      },
      {
        id: 'about',
        type: 'about',
        editable: true,
        content: {
          title: 'Обо мне',
          description: 'Создаю современные веб-приложения и интерфейсы, которые решают реальные бизнес-задачи.',
          skills: [
            { name: 'React / Next.js', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'UI/UX Design', level: 85 },
            { name: 'Node.js', level: 80 },
          ],
        },
      },
      {
        id: 'footer',
        type: 'footer',
        editable: true,
        content: {
          companyName: 'Алексей Петров',
          description: 'Full-Stack разработчик & UI/UX дизайнер',
          links: [
            { title: 'Навигация', items: ['Главная', 'Проекты', 'Обо мне', 'Контакты'] },
          ],
        },
      },
    ],
  },
];`;

projectFiles['src/templates.ts'] = templatesPart1;
