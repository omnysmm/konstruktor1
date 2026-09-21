import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function PricingPlans() {
  const { isAuthenticated } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Стартер',
      monthlyPrice: 990,
      yearlyPrice: 9900,
      description: 'Для тех, кто начинает',
      features: [
        '10 постов/мес',
        '10000 символов озвучки',
        '5 видео/мес',
        '10 треков/мес',
        '10 статей/мес',
        '2 видеомонтажа/мес',
        'Базовая поддержка',
      ],
      highlighted: false,
      cta: 'Начать',
    },
    {
      id: 'pro',
      name: 'Про',
      monthlyPrice: 2990,
      yearlyPrice: 29900,
      description: 'Для профессионалов',
      features: [
        '100 постов/мес',
        '100000 символов озвучки',
        '30 видео/мес',
        '50 треков/мес',
        '50 статей/мес',
        '20 видеомонтажей/мес',
        'Автопубликация',
        'Приоритетная поддержка',
        'Все AI функции',
      ],
      highlighted: true,
      cta: 'Выбрать Про',
    },
    {
      id: 'business',
      name: 'Бизнес',
      monthlyPrice: 9990,
      yearlyPrice: 99900,
      description: 'Для команд и бизнеса',
      features: [
        'Безлимитные посты',
        'Безлимитная озвучка',
        'Безлимитные видео',
        'Безлимитные треки',
        'Безлимитные статьи',
        'Безлимитный видеомонтаж',
        'API доступ',
        'Приоритет 24/7',
        'Кастомные шаблоны',
        'Командная работа',
      ],
      highlighted: false,
      cta: 'Связаться',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Тарифные планы</h2>
        <p className="text-gray-600 mb-6">Выберите подходящий тариф для ваших задач</p>
        
        <div className="inline-flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setBillingPeriod('monthly')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${billingPeriod === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>
            Ежемесячно
          </button>
          <button onClick={() => setBillingPeriod('yearly')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${billingPeriod === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>
            Ежегодно <span className="text-green-600 text-xs ml-1">-20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`rounded-2xl border-2 p-6 transition-all ${
              plan.highlighted
                ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {plan.highlighted && (
              <div className="text-center mb-4">
                <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">ПОПУЛЯРНЫЙ</span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">
                  {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-500">₽{billingPeriod === 'monthly' ? '/мес' : '/год'}</span>
              </div>
              {billingPeriod === 'yearly' && (
                <div className="text-xs text-green-600 mt-2">
                  Экономия {(plan.monthlyPrice * 12 - plan.yearlyPrice).toLocaleString()} ₽
                </div>
              )}
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
              plan.highlighted
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-4xl mx-auto">
        <h3 className="font-semibold text-lg mb-4 text-center">Способы оплаты</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg">
            <span className="text-2xl">💰</span>
            <span className="text-sm font-medium">Яндекс.Оплата</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <span className="text-2xl">💳</span>
            <span className="text-sm font-medium">Банковские карты</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
            <span className="text-2xl">📱</span>
            <span className="text-sm font-medium">СБП</span>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Безопасная оплата через Яндекс.Оплату. Поддержка всех популярных способов оплаты.
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🎁</div>
          <div className="flex-1">
            <div className="text-lg font-bold">48 часов бесплатно!</div>
            <div className="text-sm opacity-90">Попробуйте все функции без ограничений. Регистрация не требует оплаты.</div>
          </div>
          {!isAuthenticated && (
            <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50">
              Начать бесплатно
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
