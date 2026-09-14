import { useState } from 'react';
import { useI18n } from '../context/I18nContext';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
}

interface TemplatePricing {
  id: string;
  name: string;
  category: string;
  oneTimePrice: number;
  subscriptionPrice: number;
}

export function PricingManagement() {
  const { t, currency } = useI18n();
  
  const [subscriptionPlans, setSubscriptionPlans] = useState<PricingPlan[]>([
    {
      id: '1',
      name: 'Стартер',
      price: 990,
      period: '/мес',
      features: ['5 шаблонов', 'Базовая поддержка', '100 генераций/мес'],
      highlighted: false,
    },
    {
      id: '2',
      name: 'Про',
      price: 2990,
      period: '/мес',
      features: ['Все шаблоны', 'Приоритетная поддержка', '1000 генераций/мес', 'API доступ'],
      highlighted: true,
    },
    {
      id: '3',
      name: 'Бизнес',
      price: 9990,
      period: '/мес',
      features: ['Все шаблоны', '24/7 поддержка', 'Безлимит генераций', 'On-premise'],
      highlighted: false,
    },
  ]);

  const [templatePrices, setTemplatePrices] = useState<TemplatePricing[]>([
    { id: '1', name: 'AI Marketplace', category: 'Маркетплейс', oneTimePrice: 4990, subscriptionPrice: 990 },
    { id: '2', name: 'Recipe Blog', category: 'Кухня', oneTimePrice: 2990, subscriptionPrice: 490 },
    { id: '3', name: 'Personal Blog', category: 'Блогеры', oneTimePrice: 1990, subscriptionPrice: 290 },
    { id: '4', name: 'AI Content Studio', category: 'AI', oneTimePrice: 7990, subscriptionPrice: 1490 },
  ]);

  const [paymentMethods, setPaymentMethods] = useState({
    yandexPay: true,
    card: true,
    sbp: true,
    applePay: true,
    googlePay: true,
    crypto: false,
  });

  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);

  const updatePlan = (id: string, field: keyof PricingPlan, value: any) => {
    setSubscriptionPlans(plans =>
      plans.map(p => p.id === id ? { ...p, [field]: value } : p)
    );
  };

  const updateTemplatePrice = (id: string, field: keyof TemplatePricing, value: any) => {
    setTemplatePrices(templates =>
      templates.map(t => t.id === id ? { ...t, [field]: value } : t)
    );
  };

  const addFeature = (planId: string) => {
    setSubscriptionPlans(plans =>
      plans.map(p => p.id === planId ? { ...p, features: [...p.features, 'Новая функция'] } : p)
    );
  };

  const removeFeature = (planId: string, featureIndex: number) => {
    setSubscriptionPlans(plans =>
      plans.map(p => p.id === planId ? { ...p, features: p.features.filter((_, i) => i !== featureIndex) } : p)
    );
  };

  const updateFeature = (planId: string, featureIndex: number, value: string) => {
    setSubscriptionPlans(plans =>
      plans.map(p => p.id === planId ? { ...p, features: p.features.map((f, i) => i === featureIndex ? value : f) } : p)
    );
  };

  return (
    <div className="space-y-6">
      {/* Subscription Plans */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">💎 Тарифы подписок</h3>
            <p className="text-sm text-gray-500">Управление ценами и функциями подписок</p>
          </div>
          <button
            onClick={() => {
              const newPlan: PricingPlan = {
                id: Date.now().toString(),
                name: 'Новый тариф',
                price: 0,
                period: '/мес',
                features: ['Функция 1'],
                highlighted: false,
              };
              setSubscriptionPlans([...subscriptionPlans, newPlan]);
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
          >
            + Добавить тариф
          </button>
        </div>

        <div className="space-y-4">
          {subscriptionPlans.map(plan => (
            <div key={plan.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => updatePlan(plan.id, 'name', e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg font-medium"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={plan.highlighted}
                      onChange={(e) => updatePlan(plan.id, 'highlighted', e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span className="text-sm text-gray-600">Выделенный</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => updatePlan(plan.id, 'price', Number(e.target.value))}
                    className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-right font-mono"
                  />
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Функции:</span>
                  <button
                    onClick={() => addFeature(plan.id)}
                    className="text-xs text-indigo-600 hover:text-indigo-700"
                  >
                    + Добавить
                  </button>
                </div>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(plan.id, idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-200 rounded text-sm"
                    />
                    <button
                      onClick={() => removeFeature(plan.id, idx)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Prices */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">🛒 Цены шаблонов</h3>
            <p className="text-sm text-gray-500">Управление ценами за покупку шаблонов</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Шаблон</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Разовая покупка</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Подписка</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {templatePrices.map(template => (
                <tr key={template.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{template.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{template.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={template.oneTimePrice}
                        onChange={(e) => updateTemplatePrice(template.id, 'oneTimePrice', Number(e.target.value))}
                        className="w-24 px-2 py-1 border border-gray-200 rounded text-sm text-right font-mono"
                      />
                      <span className="text-xs text-gray-500">₽</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={template.subscriptionPrice}
                        onChange={(e) => updateTemplatePrice(template.id, 'subscriptionPrice', Number(e.target.value))}
                        className="w-24 px-2 py-1 border border-gray-200 rounded text-sm text-right font-mono"
                      />
                      <span className="text-xs text-gray-500">₽/мес</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 Способы оплаты</h3>
        <p className="text-sm text-gray-500 mb-6">Включите или отключите способы оплаты</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={paymentMethods.yandexPay}
              onChange={(e) => setPaymentMethods({ ...paymentMethods, yandexPay: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">💰 Yandex Pay</div>
              <div className="text-xs text-gray-500">Быстрая оплата через Яндекс</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={paymentMethods.card}
              onChange={(e) => setPaymentMethods({ ...paymentMethods, card: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">💳 Банковские карты</div>
              <div className="text-xs text-gray-500">Visa, Mastercard, МИР</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={paymentMethods.sbp}
              onChange={(e) => setPaymentMethods({ ...paymentMethods, sbp: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">📱 СБП</div>
              <div className="text-xs text-gray-500">Система быстрых платежей</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={paymentMethods.applePay}
              onChange={(e) => setPaymentMethods({ ...paymentMethods, applePay: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">🍎 Apple Pay</div>
              <div className="text-xs text-gray-500">Оплата для устройств Apple</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={paymentMethods.googlePay}
              onChange={(e) => setPaymentMethods({ ...paymentMethods, googlePay: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">🤖 Google Pay</div>
              <div className="text-xs text-gray-500">Оплата для Android</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={paymentMethods.crypto}
              onChange={(e) => setPaymentMethods({ ...paymentMethods, crypto: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">₿ Криптовалюта</div>
              <div className="text-xs text-gray-500">Bitcoin, Ethereum, USDT</div>
            </div>
          </label>
        </div>

        <button className="mt-6 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}
