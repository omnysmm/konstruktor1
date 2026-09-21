import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PaymentProvider } from './context/PaymentContext';
import { I18nProvider } from './context/I18nContext';
import { ProfileProvider } from './context/ProfileContext';
import { TrialProvider, useTrial } from './context/TrialContext';
import { PostGenerator } from './components/PostGenerator';
import { VoiceSynthesizer } from './components/VoiceSynthesizer';
import { VideoGenerator } from './components/VideoGenerator';
import { MusicGenerator } from './components/MusicGenerator';
import { ArticleWithImages } from './components/ArticleWithImages';
import { VideoEditor } from './components/VideoEditor';
import { SocialPublisher } from './components/SocialPublisher';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { UserDashboard } from './components/UserDashboard';
import { PricingPlans } from './components/PricingPlans';

type View = 'home' | 'post-generator' | 'voice-synthesizer' | 'video-generator' | 'music-generator' | 'article-with-images' | 'video-editor' | 'social-publisher' | 'analytics' | 'pricing' | 'dashboard' | 'admin';

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

  const renderServiceView = (title: string, gradient: string, children: React.ReactNode) => (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => setView('home')} className="text-sm text-gray-600 hover:text-gray-900">← Назад</button>
          <span className={`font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{title}</span>
          <div className="w-16"></div>
        </div>
      </div>
      <div className="pt-20 p-4 md:p-8 max-w-6xl mx-auto">{children}</div>
    </div>
  );

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
          <UserDashboard />
        </div>
      </div>
    );
  }

  if (view === 'post-generator') return renderServiceView('AI Генератор Постов', 'from-indigo-600 to-purple-600', <PostGenerator />);
  if (view === 'voice-synthesizer') return renderServiceView('AI Озвучка', 'from-pink-600 to-purple-600', <VoiceSynthesizer />);
  if (view === 'video-generator') return renderServiceView('AI Видео', 'from-red-600 to-orange-600', <VideoGenerator />);
  if (view === 'music-generator') return renderServiceView('AI Музыка', 'from-purple-600 to-pink-600', <MusicGenerator />);
  if (view === 'article-with-images') return renderServiceView('AI Статьи', 'from-green-600 to-emerald-600', <ArticleWithImages />);
  if (view === 'video-editor') return renderServiceView('AI Видеомонтаж', 'from-cyan-600 to-blue-600', <VideoEditor />);
  if (view === 'social-publisher') return renderServiceView('Автопубликация', 'from-indigo-600 to-purple-600', <SocialPublisher />);
  if (view === 'analytics') return renderServiceView('Аналитика', 'from-indigo-600 to-purple-600', <AnalyticsDashboard />);
  if (view === 'pricing') return renderServiceView('Тарифы', 'from-indigo-600 to-purple-600', <PricingPlans />);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">BlogMaker</span>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button onClick={() => setView('dashboard')} className="px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg hover:bg-indigo-200">👤 Кабинет</button>
            )}
            {isAuthenticated ? (
              <>
                {isAdmin && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">👑</span>}
                <span className="text-sm text-gray-600">{user?.username}</span>
                <button onClick={logout} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200">Выйти</button>
              </>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">🔐 Войти</button>
            )}
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Blog<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Maker</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">AI-платформа для создания и продвижения контента</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setView('pricing')} className="px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 shadow-lg">Начать бесплатно</button>
            <button onClick={() => isAuthenticated ? setView('dashboard') : setShowLoginModal(true)} className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20">Личный кабинет</button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Выберите тип продвижения</h2>
          <p className="text-lg text-gray-600">AI-инструменты для создания и продвижения контента</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { view: 'post-generator' as View, icon: '✍️', title: 'Генерация постов', desc: 'Создавайте уникальные посты' },
            { view: 'voice-synthesizer' as View, icon: '🎙️', title: 'Озвучка', desc: 'Синтез речи на 50+ языках' },
            { view: 'video-generator' as View, icon: '🎬', title: 'Генерация видео', desc: 'Создавайте видео из текста' },
            { view: 'music-generator' as View, icon: '🎵', title: 'Генерация музыки', desc: 'Создавайте музыку и песни' },
            { view: 'article-with-images' as View, icon: '📝', title: 'Статьи с изображениями', desc: 'Статьи с авто-созданием картинок' },
            { view: 'video-editor' as View, icon: '🎞️', title: 'Видеомонтаж', desc: 'Автомонтаж загруженных роликов' },
            { view: 'social-publisher' as View, icon: '🚀', title: 'Автопубликация', desc: 'Публикация во все соцсети' },
            { view: 'analytics' as View, icon: '📊', title: 'Аналитика', desc: 'Статистика публикаций' },
            { view: 'pricing' as View, icon: '💎', title: 'Тарифы', desc: 'Выберите план' },
          ].map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className="group p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-indigo-500 transition-all text-left"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">Blog<span className="text-indigo-400">Maker</span></div>
          <p className="text-gray-400 mb-6">AI-платформа для создания и продвижения контента</p>
        </div>
      </footer>

      {isAdmin && (
        <button onClick={() => setView('admin')} className="fixed bottom-6 left-6 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-full shadow-lg z-40">⚙️ Админ</button>
      )}

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
