import { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { Template } from '../types';

interface TemplateGeneratorProps {
  onTemplateGenerated: (template: Template) => void;
}

export function TemplateGenerator({ onTemplateGenerated }: TemplateGeneratorProps) {
  const { t } = useI18n();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [category, setCategory] = useState('Маркетплейс');

  const categories = [
    'Маркетплейс',
    'Портфолио',
    'Ресторан',
    'Фитнес',
    'Агентство',
    'E-commerce',
    'Блог',
    'Образование',
    'Медицина',
    'Недвижимость',
    'Путешествия',
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Имитация AI генерации
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Генерация шаблона на основе промпта
    const colors = generateRandomColors();
    const newTemplate: Template = {
      id: `ai-generated-${Date.now()}`,
      name: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
      category,
      description: `AI-сгенерированный шаблон: ${prompt}`,
      thumbnail: getCategoryEmoji(category),
      colors,
      sections: generateSections(prompt, category, colors),
    };

    onTemplateGenerated(newTemplate);
    setIsGenerating(false);
    setPrompt('');
  };

  const generateRandomColors = () => {
    const palettes = [
      { primary: '#6366f1', secondary: '#8b5cf6', accent: '#06b6d4', background: '#0f172a', text: '#f8fafc' },
      { primary: '#059669', secondary: '#10b981', accent: '#f59e0b', background: '#f0fdf4', text: '#064e3b' },
      { primary: '#dc2626', secondary: '#ef4444', accent: '#fbbf24', background: '#fef2f2', text: '#7f1d1d' },
      { primary: '#7c3aed', secondary: '#a855f7', accent: '#ec4899', background: '#faf5ff', text: '#5b21b6' },
      { primary: '#0891b2', secondary: '#06b6d4', accent: '#f97316', background: '#ecfeff', text: '#164e63' },
    ];
    return palettes[Math.floor(Math.random() * palettes.length)];
  };

  const getCategoryEmoji = (cat: string): string => {
    const emojis: Record<string, string> = {
      'Маркетплейс': '🛒',
      'Портфолио': '💼',
      'Ресторан': '🍽️',
      'Фитнес': '💪',
      'Агентство': '🚀',
      'E-commerce': '🛍️',
      'Блог': '📝',
      'Образование': '🎓',
      'Медицина': '🏥',
      'Недвижимость': '🏠',
      'Путешествия': '✈️',
    };
    return emojis[cat] || '✨';
  };

  const generateSections = (prompt: string, category: string, colors: Template['colors']) => {
    const sections: any[] = [
      {
        id: 'hero',
        type: 'hero',
        editable: true,
        content: {
          title: prompt.slice(0, 40),
          subtitle: `Создано с помощью AI на основе запроса: "${prompt}"`,
          ctaText: 'Начать',
          ctaSecondary: 'Подробнее',
        },
      },
    ];

    // Добавляем секции в зависимости от категории
    if (category === 'Маркетплейс' || category === 'E-commerce') {
      sections.push({
        id: 'categories',
        type: 'categories',
        editable: true,
        content: {
          title: 'Категории',
          subtitle: 'Выберите интересующую категорию',
          items: [
            { icon: '📦', name: 'Товары', count: '1000+' },
            { icon: '🎁', name: 'Акции', count: '50+' },
            { icon: '⭐', name: 'Популярное', count: '200+' },
          ],
        },
      });
      sections.push({
        id: 'pricing',
        type: 'pricing',
        editable: true,
        content: {
          title: 'Тарифы',
          subtitle: 'Выберите подходящий план',
          plans: [
            { name: 'Базовый', price: '990', period: '/мес', features: ['5 товаров', 'Базовая поддержка'], highlighted: false },
            { name: 'Про', price: '2990', period: '/мес', features: ['50 товаров', 'Приоритетная поддержка'], highlighted: true },
            { name: 'Бизнес', price: '9990', period: '/мес', features: ['Безлимит', '24/7 поддержка'], highlighted: false },
          ],
        },
      });
    } else if (category === 'Портфолио') {
      sections.push({
        id: 'about',
        type: 'about',
        editable: true,
        content: {
          title: 'Обо мне',
          description: prompt,
          skills: [
            { name: 'Навык 1', level: 90 },
            { name: 'Навык 2', level: 85 },
            { name: 'Навык 3', level: 80 },
          ],
        },
      });
      sections.push({
        id: 'projects',
        type: 'projects',
        editable: true,
        content: {
          title: 'Проекты',
          items: [
            { title: 'Проект 1', category: 'Web', description: 'Описание проекта', icon: '💻' },
            { title: 'Проект 2', category: 'Mobile', description: 'Описание проекта', icon: '📱' },
          ],
        },
      });
    } else if (category === 'Ресторан') {
      sections.push({
        id: 'menu',
        type: 'menu',
        editable: true,
        content: {
          title: 'Меню',
          subtitle: 'Наши лучшие блюда',
          categories: [
            {
              name: 'Закуски',
              items: [
                { name: 'Блюдо 1', price: '450 ₽', description: 'Описание блюда' },
                { name: 'Блюдо 2', price: '550 ₽', description: 'Описание блюда' },
              ],
            },
          ],
        },
      });
    } else if (category === 'Фитнес') {
      sections.push({
        id: 'categories',
        type: 'categories',
        editable: true,
        content: {
          title: 'Программы тренировок',
          subtitle: 'Выберите подходящую программу',
          items: [
            { icon: '🏋️', name: 'Силовые', count: '10 программ' },
            { icon: '🧘', name: 'Йога', count: '8 программ' },
            { icon: '🏃', name: 'Кардио', count: '12 программ' },
          ],
        },
      });
      sections.push({
        id: 'pricing',
        type: 'pricing',
        editable: true,
        content: {
          title: 'Абонементы',
          subtitle: 'Выберите формат',
          plans: [
            { name: 'Разовое', price: '500', period: '/занятие', features: ['Одно посещение'], highlighted: false },
            { name: 'Месячный', price: '3900', period: '/мес', features: ['Безлимит', 'Тренер'], highlighted: true },
          ],
        },
      });
    } else {
      // Универсальные секции для других категорий
      sections.push({
        id: 'categories',
        type: 'categories',
        editable: true,
        content: {
          title: 'Услуги',
          subtitle: 'Что мы предлагаем',
          items: [
            { icon: '✨', name: 'Услуга 1', count: 'Подробнее' },
            { icon: '🎯', name: 'Услуга 2', count: 'Подробнее' },
            { icon: '🚀', name: 'Услуга 3', count: 'Подробнее' },
          ],
        },
      });
    }

    sections.push({
      id: 'footer',
      type: 'footer',
      editable: true,
      content: {
        companyName: prompt.slice(0, 20),
        description: 'AI-сгенерированный сайт',
        links: [
          { title: 'Навигация', items: ['Главная', 'О нас', 'Контакты'] },
        ],
      },
    });

    return sections;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🤖</span>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t('generate_template')}</h3>
          <p className="text-sm text-gray-500">Создайте уникальный шаблон с помощью AI</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('ai_prompt')}</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опишите, какой сайт вы хотите создать. Например: 'Сайт для кофейни с меню и онлайн-заказом'"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={4}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Генерация...</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>{t('generate')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
