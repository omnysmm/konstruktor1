import { useState } from 'react';

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('month');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('all');

  const generateDailyStats = (days: number) => {
    const stats = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      stats.push({
        date: date.toISOString().split('T')[0],
        publications: Math.floor(Math.random() * 5) + 1,
        likes: Math.floor(Math.random() * 500) + 100,
        views: Math.floor(Math.random() * 5000) + 1000,
      });
    }
    return stats;
  };

  const networkStats = [
    { network: 'Telegram', icon: '📱', color: 'bg-blue-500', publications: 45, likes: 2340, views: 15600, followers: 1250 },
    { network: 'ВКонтакте', icon: '🔵', color: 'bg-blue-600', publications: 38, likes: 1890, views: 12400, followers: 980 },
    { network: 'Twitter', icon: '🐦', color: 'bg-sky-500', publications: 52, likes: 3120, views: 24500, followers: 2100 },
    { network: 'Instagram', icon: '📷', color: 'bg-gradient-to-br from-purple-500 to-pink-500', publications: 28, likes: 4560, views: 32100, followers: 3400 },
    { network: 'YouTube', icon: '📺', color: 'bg-red-600', publications: 12, likes: 890, views: 45600, followers: 890 },
  ];

  const dailyStats = selectedPeriod === 'week' ? generateDailyStats(7) : generateDailyStats(30);
  const filteredNetworkStats = selectedNetwork === 'all' ? networkStats : networkStats.filter(n => n.network.toLowerCase().includes(selectedNetwork.toLowerCase()));

  const totalStats = {
    publications: filteredNetworkStats.reduce((sum, n) => sum + n.publications, 0),
    likes: filteredNetworkStats.reduce((sum, n) => sum + n.likes, 0),
    views: filteredNetworkStats.reduce((sum, n) => sum + n.views, 0),
    followers: filteredNetworkStats.reduce((sum, n) => sum + n.followers, 0),
  };

  const maxViews = Math.max(...dailyStats.map(d => d.views));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Аналитика</h2>
          <p className="text-sm text-gray-500">Статистика публикаций и вовлеченности</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setSelectedPeriod('week')} className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedPeriod === 'week' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Неделя</button>
          <button onClick={() => setSelectedPeriod('month')} className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedPeriod === 'month' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Месяц</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
          <div className="text-3xl font-bold mb-2">{totalStats.publications}</div>
          <div className="text-sm opacity-90">Публикаций</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-xl p-6 text-white">
          <div className="text-3xl font-bold mb-2">{totalStats.likes.toLocaleString()}</div>
          <div className="text-sm opacity-90">Лайков</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
          <div className="text-3xl font-bold mb-2">{totalStats.views.toLocaleString()}</div>
          <div className="text-sm opacity-90">Просмотров</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <div className="text-3xl font-bold mb-2">{totalStats.followers.toLocaleString()}</div>
          <div className="text-sm opacity-90">Подписчиков</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">Публикации по дням</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {dailyStats.map((stat, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t-lg transition-all hover:from-indigo-700 hover:to-purple-500 relative group"
                style={{ height: `${(stat.publications / 5) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {stat.publications} публ.
                </div>
              </div>
              {(selectedPeriod === 'week' || idx % 5 === 0) && (
                <span className="text-xs text-gray-400">{new Date(stat.date).getDate()}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Статистика по соцсетям</h3>
          <select value={selectedNetwork} onChange={(e) => setSelectedNetwork(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="all">Все сети</option>
            {networkStats.map(n => <option key={n.network} value={n.network}>{n.network}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          {filteredNetworkStats.map(stat => (
            <div key={stat.network} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white`}>{stat.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{stat.network}</div>
                  <div className="text-xs text-gray-500">{stat.followers.toLocaleString()} подписчиков</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Публикаций</div>
                  <div className="text-lg font-bold text-indigo-600">{stat.publications}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Лайков</div>
                  <div className="text-lg font-bold text-pink-600">{stat.likes.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Просмотров</div>
                  <div className="text-lg font-bold text-blue-600">{stat.views.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
