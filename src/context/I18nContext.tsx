import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en';
type Currency = 'RUB' | 'USD' | 'CNY';

interface I18nContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    'dashboard': 'Панель управления',
    'statistics': 'Статистика',
    'payments': 'Платежи',
    'users': 'Пользователи',
    'templates': 'Шаблоны',
    'settings': 'Настройки',
    'total_users': 'Всего пользователей',
    'active_subscriptions': 'Активных подписок',
    'revenue': 'Доход',
    'new_users_today': 'Новых пользователей сегодня',
    'recent_payments': 'Последние платежи',
    'user_registrations': 'Регистрации пользователей',
    'payment_methods': 'Способы оплаты',
    'delivery_services': 'Сервисы доставки',
    'language': 'Язык',
    'currency': 'Валюта',
    'email_reports': 'Отчёты на почту',
    'schedule': 'Расписание',
    'generate_template': 'Создать шаблон',
    'ai_prompt': 'AI промпт',
    'generate': 'Сгенерировать',
    'categories': 'Категории',
    'all_templates': 'Все шаблоны',
    'marketplace': 'Маркетплейс',
    'portfolio': 'Портфолио',
    'restaurant': 'Ресторан',
    'fitness': 'Фитнес',
    'agency': 'Агентство',
    'ecommerce': 'E-commerce',
    'blog': 'Блог',
    'education': 'Образование',
    'medical': 'Медицина',
    'real_estate': 'Недвижимость',
    'travel': 'Путешествия',
    'daily': 'Ежедневно',
    'weekly': 'Еженедельно',
    'monthly': 'Ежемесячно',
    'send_report': 'Отправить отчёт',
    'email': 'Email',
    'save': 'Сохранить',
    'cancel': 'Отмена',
  },
  en: {
    'dashboard': 'Dashboard',
    'statistics': 'Statistics',
    'payments': 'Payments',
    'users': 'Users',
    'templates': 'Templates',
    'settings': 'Settings',
    'total_users': 'Total Users',
    'active_subscriptions': 'Active Subscriptions',
    'revenue': 'Revenue',
    'new_users_today': 'New Users Today',
    'recent_payments': 'Recent Payments',
    'user_registrations': 'User Registrations',
    'payment_methods': 'Payment Methods',
    'delivery_services': 'Delivery Services',
    'language': 'Language',
    'currency': 'Currency',
    'email_reports': 'Email Reports',
    'schedule': 'Schedule',
    'generate_template': 'Generate Template',
    'ai_prompt': 'AI Prompt',
    'generate': 'Generate',
    'categories': 'Categories',
    'all_templates': 'All Templates',
    'marketplace': 'Marketplace',
    'portfolio': 'Portfolio',
    'restaurant': 'Restaurant',
    'fitness': 'Fitness',
    'agency': 'Agency',
    'ecommerce': 'E-commerce',
    'blog': 'Blog',
    'education': 'Education',
    'medical': 'Medical',
    'real_estate': 'Real Estate',
    'travel': 'Travel',
    'daily': 'Daily',
    'weekly': 'Weekly',
    'monthly': 'Monthly',
    'send_report': 'Send Report',
    'email': 'Email',
    'save': 'Save',
    'cancel': 'Cancel',
  },
};

const currencyRates: Record<Currency, number> = {
  RUB: 1,
  USD: 0.011,
  CNY: 0.08,
};

const currencySymbols: Record<Currency, string> = {
  RUB: '₽',
  USD: '$',
  CNY: '¥',
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');
  const [currency, setCurrency] = useState<Currency>('RUB');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const formatPrice = (price: number): string => {
    const converted = price * currencyRates[currency];
    const symbol = currencySymbols[currency];
    return `${converted.toFixed(2)} ${symbol}`;
  };

  return (
    <I18nContext.Provider value={{ language, currency, setLanguage, setCurrency, t, formatPrice }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
