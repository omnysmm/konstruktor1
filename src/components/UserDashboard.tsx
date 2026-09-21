import { useAuth } from '../context/AuthContext';
import { useTrial } from '../context/TrialContext';

export function UserDashboard() {
  const { user, logout } = useAuth();
  const { isTrialActive, hoursRemaining, trialEnd } = useTrial();

  const mockUsage = {
    postsGenerated: 45,
    voiceSynthesized: 120,
    videosCreated: 8,
    musicGenerated: 15,
    articlesCreated: 12,
    videosEdited: 3,
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Личный кабинет</h2>
          <p className="text-sm text-gray-500">Управление аккаунтом и подпиской</p>
        </div>
        <button onClick={logout} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">Выйти</button>
      </div>

      {isTrialActive && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎉</div>
            <div className="flex-1">
              <div className="text-lg font-bold">Тестовый период активен!</div>
              <div className="text-sm opacity-90">Осталось {hoursRemaining} часов полноценного функционала</div>
              {trialEnd && <div className="text-xs opacity-75 mt-1">до {new Date(trialEnd).toLocaleString('ru-RU')}</div>}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{user.username}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            {user.role === 'admin' && (
              <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">👑 Администратор</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">Использование за месяц</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">{mockUsage.postsGenerated}</div>
            <div className="text-xs text-indigo-700">Постов создано</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
            <div className="text-2xl font-bold text-pink-600">{mockUsage.voiceSynthesized}</div>
            <div className="text-xs text-pink-700">Озвучек</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{mockUsage.videosCreated}</div>
            <div className="text-xs text-red-700">Видео создано</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{mockUsage.musicGenerated}</div>
            <div className="text-xs text-purple-700">Треков создано</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{mockUsage.articlesCreated}</div>
            <div className="text-xs text-green-700">Статей создано</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg">
            <div className="text-2xl font-bold text-cyan-600">{mockUsage.videosEdited}</div>
            <div className="text-xs text-cyan-700">Видео смонтировано</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">Подключенные сервисы</h3>
        <div className="space-y-2">
          {['Telegram', 'ВКонтакте', 'Twitter'].map(service => (
            <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{service === 'Telegram' ? '📱' : service === 'ВКонтакте' ? '🔵' : '🐦'}</span>
                <div>
                  <div className="font-medium text-gray-900">{service}</div>
                  <div className="text-xs text-gray-500">Подключено</div>
                </div>
              </div>
              <span className="text-green-500">✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
