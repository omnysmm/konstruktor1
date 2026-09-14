import { useState } from 'react';
import { useI18n } from '../context/I18nContext';

interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  revenue: number;
  newUsersToday: number;
}

interface RecentPayment {
  id: string;
  user: string;
  amount: number;
  method: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
}

export function AdminDashboard() {
  const { t, formatPrice, language, setLanguage, currency, setCurrency } = useI18n();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'payments' | 'templates' | 'settings'>('dashboard');

  // Мок данные
  const stats: DashboardStats = {
    totalUsers: 15847,
    activeSubscriptions: 3421,
    revenue: 2847500,
    newUsersToday: 127,
  };

  const recentPayments: RecentPayment[] = [
    { id: '1', user: 'Иван Петров', amount: 4900, method: 'Yandex Pay', status: 'success', date: '2026-01-15' },
    { id: '2', user: 'Мария Сидорова', amount: 19900, method: 'Карта', status: 'success', date: '2026-01-15' },
    { id: '3', user: 'Алексей Козлов', amount: 3900, method: 'СБП', status: 'pending', date: '2026-01-14' },
    { id: '4', user: 'Елена Волкова', amount: 4900, method: 'Yandex Pay', status: 'success', date: '2026-01-14' },
    { id: '5', user: 'Дмитрий Новиков', amount: 19900, method: 'Карта', status: 'failed', date: '2026-01-13' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('dashboard')}</h1>
              <p className="text-sm text-gray-500">Управление платформой SiteBuilder Pro</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'ru' | 'en')}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="ru">🇷🇺 Русский</option>
                <option value="en">🇬🇧 English</option>
              </select>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'RUB' | 'USD' | 'CNY')}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="RUB">₽ RUB</option>
                <option value="USD">$ USD</option>
                <option value="CNY">¥ CNY</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: t('statistics'), icon: '📊' },
              { id: 'users', label: t('users'), icon: '👥' },
              { id: 'payments', label: t('payments'), icon: '💳' },
              { id: 'templates', label: t('templates'), icon: '🎨' },
              { id: 'settings', label: t('settings'), icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">👥</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{t('total_users')}</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">💎</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8.3%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.activeSubscriptions.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{t('active_subscriptions')}</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">💰</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+15.2%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{formatPrice(stats.revenue)}</div>
                <div className="text-sm text-gray-500">{t('revenue')}</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">📈</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+23.1%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.newUsersToday}</div>
                <div className="text-sm text-gray-500">{t('new_users_today')}</div>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('user_registrations')}</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 95, 70].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all hover:from-indigo-700 hover:to-indigo-500"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-400">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('payment_methods')}</h3>
                <div className="space-y-4">
                  {[
                    { method: 'Yandex Pay', percent: 45, color: 'bg-yellow-400' },
                    { method: 'Банковская карта', percent: 35, color: 'bg-blue-500' },
                    { method: 'СБП', percent: 20, color: 'bg-purple-500' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">{item.method}</span>
                        <span className="text-gray-500">{item.percent}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all`}
                          style={{ width: `${item.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('recent_payments')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Пользователь</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Способ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.user}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{formatPrice(payment.amount)}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{payment.method}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            payment.status === 'success' ? 'bg-green-100 text-green-700' :
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {payment.status === 'success' ? 'Успешно' : payment.status === 'pending' ? 'Ожидание' : 'Ошибка'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{payment.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && <SettingsPanel />}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const { t } = useI18n();
  const [emailReports, setEmailReports] = useState({
    enabled: true,
    email: 'admin@example.com',
    schedule: 'weekly' as 'daily' | 'weekly' | 'monthly',
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('email_reports')}</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={emailReports.enabled}
                onChange={(e) => setEmailReports({ ...emailReports, enabled: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Включить автоматические отчёты</span>
            </label>
          </div>

          {emailReports.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
                <input
                  type="email"
                  value={emailReports.email}
                  onChange={(e) => setEmailReports({ ...emailReports, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('schedule')}</label>
                <select
                  value={emailReports.schedule}
                  onChange={(e) => setEmailReports({ ...emailReports, schedule: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="daily">{t('daily')}</option>
                  <option value="weekly">{t('weekly')}</option>
                  <option value="monthly">{t('monthly')}</option>
                </select>
              </div>

              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
                {t('save')}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('payment_methods')}</h3>
        <div className="space-y-3">
          {['Yandex Pay', 'Банковские карты (Visa, MC, МИР)', 'СБП (Система быстрых платежей)', 'Apple Pay', 'Google Pay', 'Криптовалюта'].map((method, i) => (
            <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input type="checkbox" defaultChecked={i < 3} className="w-4 h-4 text-indigo-600 rounded" />
              <span className="text-sm text-gray-700">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('delivery_services')}</h3>
        <div className="space-y-3">
          {['Яндекс Доставка', 'СДЭК', 'Почта России', 'DPD', 'Boxberry', 'Деловые Линии'].map((service, i) => (
            <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input type="checkbox" defaultChecked={i < 4} className="w-4 h-4 text-indigo-600 rounded" />
              <span className="text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
