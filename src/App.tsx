import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PaymentProvider } from './context/PaymentContext';
import { I18nProvider } from './context/I18nContext';
import { ProfileProvider } from './context/ProfileContext';
import { TrialProvider, useTrial } from './context/TrialContext';
import { AIArticleWriter } from './components/AIArticleWriter';

type View = 'home' | 'article-writer' | 'dashboard' | 'pricing' | 'admin';

function AppContent() {
  const [view, setView] = useState<View>('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, isAdmin, user, logout, login } = useAuth();
  const { isTrialActive, hoursRemaining, startTrial } = useTrial();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginForm.username, loginForm.password);
    if (success) {
      setShowLoginModal(false);
      setLoginForm({ username: '', password: '' });
      startTrial();
    } else {
      alert('Неверный логин или пароль');
    }
  };

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => setView('home')} className="text-sm text-gray-600 hover:text-gray-900">← Назад</button>
            <span className="font-bold text-gray-900">Админ-панель</span>
            <div className="w-16"></div>
          </div>
        </div>
        <div className="pt-20 p-8">
          <h1 className="text-3xl font-bold mb-8">Статистика платформы</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-3xl font-bold text-indigo-600">15,847</div>
              <div className="text-sm text-gray-500">Пользователей</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-3xl font-bold text-green-600">3,421</div>
              <div className="text-sm text-gray-500">Подписок</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-3xl font-bold text-purple-600">₽2.8M</div>
              <div className="text-sm text-gray-500">Доход</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-3xl font-bold text-pink-600">127</div>
              <div className="text-sm text-gray-500">Новых сегодня</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => setView('home')} className="text-sm text-gray-600 hover:text-gray-900">← Назад</button>
            <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Личный кабинет</span>
            <button onClick={logout} className="text-sm text-gray-600 hover:text-gray-900">Выйти</button>
          </div>
        </div>
        <div className="pt-20 p-8 max-w-5xl mx-auto">
          {isTrialActive && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white mb-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🎉</div>
                <div className="flex-1">
                  <div className="text-lg font-bold">Тестовый период активен!</div>
                  <div className="text-sm opacity-90">Осталось {hoursRemaining} часов полноценного функционала</div>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.username[0].toUpperCase()}
              </div>
              <div>
                <div className="text-xl font-bold">{user?.username}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
                {user?.role === 'admin' && (
                  <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">👑 Администратор</span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-semibold text-lg mb-4">Использование за месяц</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">45</div>
                <div className="text-xs text-indigo-700">Постов создано</div>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">120</div>
                <div className="text-xs text-pink-700">Озвучек</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">8</div>
                <div className="text-xs text-red-700">Видео создано</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">15</div>
                <div className="text-xs text-purple-700">Треков создано</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-xs text-green-700">Статей создано</div>
              </div>
              <div className="p-4 bg-cyan-50 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600">3</div>
                <div className="text-xs text-cyan-700">Видео смонтировано</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'article-writer') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => setView('home')} className="text-sm text-gray-600 hover:text-gray-900">← Назад</button>
            <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Article Writer</span>
            <div className="w-16"></div>
          </div>
        </div>
        <div className="pt-20 p-4 md:p-8 max-w-7xl mx-auto">
          <AIArticleWriter />
        </div>
      </div>
    );
  }

  if (view === 'pricing') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => setView('home')} className="text-sm text-gray-600 hover:text-gray-900">← Назад</button>
            <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Тарифы</span>
            <div className="w-16"></div>
          </div>
        </div>
        <div className="pt-20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Тарифные планы</h2>
            <p className="text-gray-600">Выберите подходящий тариф</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Стартер', price: 990, period: '/мес',
                features: ['10 постов/мес', '10000 символов озвучки', '5 видео/мес', '10 треков/мес', '10 статей/мес'],
              },
              {
                name: 'Про', price: 2990, period: '/мес', highlighted: true,
                features: ['100 постов/мес', '100000 символов озвучки', '30 видео/мес', '50 треков/мес', '50 статей/мес', 'Автопубликация'],
              },
              {
                name: 'Бизнес', price: 9990, period: '/мес',
                features: ['Безлимит', 'API доступ', 'Приоритет 24/7', 'Кастомные шаблоны'],
              },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl border-2 p-6 ${plan.highlighted ? 'border-indigo-500 bg-indigo-50 shadow-xl' : 'border-gray-200 bg-white'}`}>
                {plan.highlighted && <div className="text-center mb-4"><span className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-full">ПОПУЛЯРНЫЙ</span></div>}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold">{plan.price} ₽<span className="text-sm font-normal text-gray-500">{plan.period}</span></div>
                </div>
                <div className="space-y-2 mb-6">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span><span>{f}</span></div>
                  ))}
                </div>
                <button className={`w-full py-3 rounded-lg font-semibold ${plan.highlighted ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  Выбрать
                </button>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white max-w-3xl mx-auto mt-8">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎁</div>
              <div>
                <div className="text-lg font-bold">48 часов бесплатно!</div>
                <div className="text-sm opacity-90">Попробуйте все функции без ограничений</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            BlogMaker
          </span>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button onClick={() => setView('dashboard')} className="px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg hover:bg-indigo-200">
                👤 Кабинет
              </button>
            )}
            {isAuthenticated ? (
              <>
                {isAdmin && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">👑</span>}
                <span className="text-sm text-gray-600">{user?.username}</span>
                <button onClick={logout} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200">Выйти</button>
              </>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
                🔐 Войти
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Blog<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Maker</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            AI-платформа для создания и продвижения контента
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setView('pricing')} className="px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 shadow-lg">
              Начать бесплатно
            </button>
            <button onClick={() => isAuthenticated ? setView('dashboard') : setShowLoginModal(true)} className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20">
              Личный кабинет
            </button>
          </div>
        </div>
      </header>

      {/* AI Services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Выберите тип продвижения</h2>
          <p className="text-lg text-gray-600">AI-инструменты для создания и продвижения контента</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => setView('article-writer')}
            className="group p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-indigo-500 transition-all text-left"
          >
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Article Writer</h3>
            <p className="text-sm text-gray-600">Генерация SEO-оптимизированных статей с автопубликацией</p>
          </button>

          <button
            onClick={() => alert('Скоро будет доступно')}
            className="group p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-pink-500 transition-all text-left"
          >
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Озвучка</h3>
            <p className="text-sm text-gray-600">Синтез речи на 50+ языках</p>
          </button>

          <button
            onClick={() => alert('Скоро будет доступно')}
            className="group p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 transition-all text-left"
          >
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Видео</h3>
            <p className="text-sm text-gray-600">Генерация видео из текста</p>
          </button>

          <button
            onClick={() => alert('Скоро будет доступно')}
            className="group p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-purple-500 transition-all text-left"
          >
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Музыка</h3>
            <p className="text-sm text-gray-600">Создание музыки и песен</p>
          </button>

          <button
            onClick={() => alert('Скоро будет доступно')}
            className="group p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-green-500 transition-all text-left"
          >
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Статьи</h3>
            <p className="text-sm text-gray-600">Статьи с авто-созданием картинок</p>
          </button>

          <button
            onClick={() => alert('Скоро будет доступно')}
            className="group p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-cyan-500 transition-all text-left"
          >
            <div className="text-4xl mb-4">🎞️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Видеомонтаж</h3>
            <p className="text-sm text-gray-600">Автомонтаж загруженных роликов</p>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">Blog<span className="text-indigo-400">Maker</span></div>
          <p className="text-gray-400 mb-6">AI-платформа для создания и продвижения контента</p>
        </div>
      </footer>

      {isAdmin && (
        <button onClick={() => setView('admin')} className="fixed bottom-6 left-6 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-full shadow-lg z-40">
          ⚙️ Админ
        </button>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">Вход в систему</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Логин</label>
                <input type="text" value={loginForm.username} onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Пароль</label>
                <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Войти</button>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-700">💡 Демо: <code>admin</code> / <code>admin</code></p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <TrialProvider>
          <I18nProvider>
            <PaymentProvider>
              <AppContent />
            </PaymentProvider>
          </I18nProvider>
        </TrialProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
