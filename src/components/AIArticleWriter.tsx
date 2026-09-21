import { useState } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
  topic: string;
  keywords: string[];
  wordCount: number;
  seoScore: number;
  createdAt: string;
  status: 'draft' | 'published' | 'scheduled';
  publishDate?: string;
  image?: string;
  voice?: string;
  video?: string;
  music?: string;
}

interface GenerationSettings {
  length: 'short' | 'medium' | 'long';
  tone: 'professional' | 'casual' | 'academic' | 'creative';
  style: 'blog' | 'news' | 'tutorial' | 'review';
  includeImages: boolean;
  seoOptimize: boolean;
}

type TabType = 'generate' | 'history' | 'scheduled' | 'social' | 'analytics';

export function AIArticleWriter() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('generate');
  const [settings, setSettings] = useState<GenerationSettings>({
    length: 'medium',
    tone: 'professional',
    style: 'blog',
    includeImages: true,
    seoOptimize: true,
  });

  const generateArticle = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    // Имитация генерации
    await new Promise(resolve => setTimeout(resolve, 3000));

    const wordCounts = { short: 500, medium: 1000, long: 2000 };
    const wordCount = wordCounts[settings.length];

    const newArticle: Article = {
      id: `article-${Date.now()}`,
      title: `${topic}: Полное руководство`,
      content: generateContent(topic, settings),
      topic,
      keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
      wordCount,
      seoScore: Math.floor(Math.random() * 20) + 80,
      createdAt: new Date().toISOString(),
      status: 'draft',
    };

    setArticles([newArticle, ...articles]);
    setIsGenerating(false);
    setTopic('');
    setKeywords('');
  };

  const generateContent = (topic: string, settings: GenerationSettings): string => {
    const tones: Record<string, string> = {
      professional: 'профессиональном',
      casual: 'дружеском',
      academic: 'академическом',
      creative: 'креативном',
    };

    return `# ${topic}: Полное руководство

## Введение

В этой статье мы подробно рассмотрим ${topic.toLowerCase()} в ${tones[settings.tone]} стиле. Это ${settings.style === 'blog' ? 'блог-пост' : settings.style === 'news' ? 'новостная статья' : settings.style === 'tutorial' ? 'обучающее руководство' : 'обзор'} создано с помощью AI и оптимизировано для поисковых систем.

## Основные аспекты

### 1. Что такое ${topic}?

${topic} — это важная тема, которая требует детального рассмотрения. В современном мире понимание ${topic.toLowerCase()} становится всё более критичным для профессионалов и энтузиастов.

### 2. Почему это важно?

Знание ${topic.toLowerCase()} открывает новые возможности и помогает:
- Повысить эффективность работы
- Принимать более обоснованные решения
- Оставаться в курсе последних тенденций
- Развивать профессиональные навыки

### 3. Ключевые преимущества

Преимущества изучения ${topic.toLowerCase()} включают:

**Практическая польза:**
- Применение в реальных проектах
- Улучшение результатов
- Экономия времени и ресурсов

**Профессиональное развитие:**
- Расширение кругозора
- Повышение конкурентоспособности
- Новые карьерные возможности

### 4. Как начать?

Для начала работы с ${topic.toLowerCase()} рекомендуется:

1. **Изучить основы** — начните с фундаментальных концепций
2. **Практиковаться** — применяйте знания на практике
3. **Следить за трендами** — будьте в курсе последних обновлений
4. **Присоединиться к сообществу** — общайтесь с единомышленниками

### 5. Лучшие практики

Следуйте этим рекомендациям для достижения наилучших результатов:

- Начинайте с малого и постепенно усложняйте задачи
- Документируйте свой прогресс
- Не бойтесь экспериментировать
- Ищите обратную связь от экспертов

## Заключение

${topic} — это захватывающая область, которая продолжает развиваться. Следуя рекомендациям из этой статьи, вы сможете успешно освоить ${topic.toLowerCase()} и применять эти знания в своей работе.

## Дополнительные ресурсы

Для углублённого изучения рекомендуем:
- Официальную документацию
- Онлайн-курсы и вебинары
- Профессиональные сообщества
- Книги и статьи экспертов

---

*Эта статья создана с помощью AI Article Writer и оптимизирована для поисковых систем.*
*Ключевые слова: ${keywords || topic}*
*Количество слов: ${settings.length === 'short' ? '~500' : settings.length === 'medium' ? '~1000' : '~2000'}*
`;
  };

  const publishArticle = (articleId: string) => {
    setArticles(articles.map(a =>
      a.id === articleId ? { ...a, status: 'published' as const } : a
    ));
  };

  const scheduleArticle = (articleId: string, date: string) => {
    setArticles(articles.map(a =>
      a.id === articleId ? { ...a, status: 'scheduled' as const, publishDate: date } : a
    ));
  };

  const deleteArticle = (articleId: string) => {
    setArticles(articles.filter(a => a.id !== articleId));
    if (selectedArticle?.id === articleId) {
      setSelectedArticle(null);
    }
  };

  const exportArticle = (article: Article, format: 'md' | 'html' | 'txt') => {
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'md':
        content = article.content;
        filename = `${article.title}.md`;
        mimeType = 'text/markdown';
        break;
      case 'html':
        content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${article.title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    h2 { color: #555; margin-top: 30px; }
    h3 { color: #666; }
    p { line-height: 1.6; }
  </style>
</head>
<body>
${article.content.replace(/^# (.*$)/gm, '<h1>$1</h1>')
  .replace(/^## (.*$)/gm, '<h2>$1</h2>')
  .replace(/^### (.*$)/gm, '<h3>$1</h3>')
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  .replace(/\n\n/g, '</p><p>')}
</body>
</html>`;
        filename = `${article.title}.html`;
        mimeType = 'text/html';
        break;
      case 'txt':
        content = article.content.replace(/[#*]/g, '');
        filename = `${article.title}.txt`;
        mimeType = 'text/plain';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: Article['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'published': return 'bg-green-100 text-green-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
    }
  };

  const getStatusText = (status: Article['status']) => {
    switch (status) {
      case 'draft': return 'Черновик';
      case 'published': return 'Опубликовано';
      case 'scheduled': return 'Запланировано';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Article Writer</h2>
          <p className="text-sm text-gray-500">Генерация SEO-оптимизированных статей</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            ✓ {articles.filter(a => a.status === 'published').length} опубликовано
          </div>
          <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
            📅 {articles.filter(a => a.status === 'scheduled').length} запланировано
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'generate', label: '✨ Создать статью' },
          { id: 'history', label: '📚 История' },
          { id: 'scheduled', label: '📅 Запланированные' },
          { id: 'social', label: '🌐 Соцсети' },
          { id: 'analytics', label: '📊 Аналитика' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Generate Tab */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-4">Параметры генерации</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тема статьи *
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Например: Искусственный интеллект в бизнесе"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ключевые слова (через запятую)
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="AI, бизнес, автоматизация, технологии"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Длина</label>
                    <select
                      value={settings.length}
                      onChange={(e) => setSettings({ ...settings, length: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="short">Короткая (~500 слов)</option>
                      <option value="medium">Средняя (~1000 слов)</option>
                      <option value="long">Длинная (~2000 слов)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тональность</label>
                    <select
                      value={settings.tone}
                      onChange={(e) => setSettings({ ...settings, tone: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="professional">Профессиональная</option>
                      <option value="casual">Дружеская</option>
                      <option value="academic">Академическая</option>
                      <option value="creative">Креативная</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Стиль</label>
                    <select
                      value={settings.style}
                      onChange={(e) => setSettings({ ...settings, style: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="blog">Блог-пост</option>
                      <option value="news">Новостная статья</option>
                      <option value="tutorial">Руководство</option>
                      <option value="review">Обзор</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.seoOptimize}
                        onChange={(e) => setSettings({ ...settings, seoOptimize: e.target.checked })}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <span className="text-sm text-gray-700">SEO-оптимизация</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.includeImages}
                        onChange={(e) => setSettings({ ...settings, includeImages: e.target.checked })}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Включить изображения</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={generateArticle}
                  disabled={!topic.trim() || isGenerating}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Генерация статьи...</span>
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      <span>Сгенерировать статью</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <h3 className="font-semibold text-lg mb-4 text-indigo-900">💡 Советы</h3>
              <ul className="space-y-2 text-sm text-indigo-700">
                <li>• Используйте конкретные темы для лучших результатов</li>
                <li>• Добавляйте ключевые слова для SEO-оптимизации</li>
                <li>• Экспериментируйте с тональностью и стилем</li>
                <li>• Проверяйте SEO-оценку перед публикацией</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-4">📊 Статистика</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Всего статей:</span>
                  <span className="font-semibold">{articles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Опубликовано:</span>
                  <span className="font-semibold text-green-600">{articles.filter(a => a.status === 'published').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Черновики:</span>
                  <span className="font-semibold text-gray-600">{articles.filter(a => a.status === 'draft').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Средний SEO:</span>
                  <span className="font-semibold text-indigo-600">
                    {articles.length > 0 ? Math.round(articles.reduce((sum, a) => sum + a.seoScore, 0) / articles.length) : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {articles.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Нет статей</h3>
              <p className="text-sm">Создайте первую статью во вкладке "Создать статью"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {articles.map(article => (
                <div key={article.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold">{article.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(article.status)}`}>
                          {getStatusText(article.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Тема: {article.topic}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📝 {article.wordCount} слов</span>
                        <span>🎯 SEO: {article.seoScore}/100</span>
                        <span>📅 {new Date(article.createdAt).toLocaleDateString('ru-RU')}</span>
                      </div>
                      {article.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {article.keywords.map((keyword, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                    >
                      Просмотр
                    </button>
                    {article.status === 'draft' && (
                      <>
                        <button
                          onClick={() => publishArticle(article.id)}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                        >
                          Опубликовать
                        </button>
                        <button
                          onClick={() => {
                            const date = prompt('Введите дату публикации (ГГГГ-ММ-ДД):');
                            if (date) scheduleArticle(article.id, date);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          Запланировать
                        </button>
                      </>
                    )}
                    <div className="relative group">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                        Экспорт ▾
                      </button>
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <button
                          onClick={() => exportArticle(article, 'md')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        >
                          Markdown (.md)
                        </button>
                        <button
                          onClick={() => exportArticle(article, 'html')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        >
                          HTML (.html)
                        </button>
                        <button
                          onClick={() => exportArticle(article, 'txt')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        >
                          Text (.txt)
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Удалить статью?')) deleteArticle(article.id);
                      }}
                      className="px-4 py-2 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scheduled Tab */}
      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          {articles.filter(a => a.status === 'scheduled').length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Нет запланированных статей</h3>
              <p className="text-sm">Запланируйте публикацию статьи из вкладки "История"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {articles.filter(a => a.status === 'scheduled').map(article => (
                <div key={article.id} className="bg-white rounded-xl border border-blue-200 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">Тема: {article.topic}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-blue-600 font-medium">📅 {article.publishDate}</span>
                        <span className="text-gray-500">📝 {article.wordCount} слов</span>
                        <span className="text-gray-500">🎯 SEO: {article.seoScore}/100</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => publishArticle(article.id)}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                      >
                        Опубликовать сейчас
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Отменить публикацию?')) {
                            setArticles(articles.map(a =>
                              a.id === article.id ? { ...a, status: 'draft' as const, publishDate: undefined } : a
                            ));
                          }
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
                      >
                        Отменить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Social Tab */}
      {activeTab === 'social' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">🌐 Автопубликация в соцсети</h3>
          <p className="text-sm text-gray-600 mb-4">Публикуйте статьи во все социальные сети одновременно</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Telegram', icon: '📱', connected: true },
              { name: 'ВКонтакте', icon: '🔵', connected: true },
              { name: 'Twitter', icon: '🐦', connected: true },
              { name: 'Instagram', icon: '📷', connected: false },
              { name: 'Facebook', icon: '📘', connected: false },
              { name: 'YouTube', icon: '📺', connected: false },
            ].map(network => (
              <div
                key={network.name}
                className={`p-4 rounded-lg border-2 ${
                  network.connected ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{network.icon}</span>
                  <div>
                    <div className="font-medium">{network.name}</div>
                    <div className="text-xs text-gray-500">
                      {network.connected ? '✓ Подключено' : 'Не подключено'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Настроить автопубликацию
          </button>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
              <div className="text-3xl font-bold mb-2">{articles.length}</div>
              <div className="text-sm opacity-90">Всего статей</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
              <div className="text-3xl font-bold mb-2">{articles.filter(a => a.status === 'published').length}</div>
              <div className="text-sm opacity-90">Опубликовано</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
              <div className="text-3xl font-bold mb-2">
                {articles.length > 0 ? Math.round(articles.reduce((sum, a) => sum + a.seoScore, 0) / articles.length) : 0}
              </div>
              <div className="text-sm opacity-90">Средний SEO</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-4">Статистика по соцсетям</h3>
            <div className="space-y-3">
              {[
                { network: 'Telegram', icon: '📱', publications: 45, likes: 2340, views: 15600 },
                { network: 'ВКонтакте', icon: '🔵', publications: 38, likes: 1890, views: 12400 },
                { network: 'Twitter', icon: '🐦', publications: 52, likes: 3120, views: 24500 },
              ].map(stat => (
                <div key={stat.network} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className="font-semibold">{stat.network}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Публикаций</div>
                      <div className="text-lg font-bold text-indigo-600">{stat.publications}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Лайков</div>
                      <div className="text-lg font-bold text-pink-600">{stat.likes.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Просмотров</div>
                      <div className="text-lg font-bold text-blue-600">{stat.views.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Article Preview Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{selectedArticle.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📝 {selectedArticle.wordCount} слов</span>
                    <span>🎯 SEO: {selectedArticle.seoScore}/100</span>
                    <span className={`px-2 py-1 rounded-full ${getStatusColor(selectedArticle.status)}`}>
                      {getStatusText(selectedArticle.status)}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedArticle(null)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
              </div>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                {selectedArticle.content.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-3xl font-bold mb-4">{line.slice(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-2xl font-bold mt-8 mb-3">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-xl font-semibold mt-6 mb-2">{line.slice(4)}</h3>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={idx} className="ml-6 mb-1">{line.slice(2)}</li>;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={idx} className="font-bold mb-2">{line.slice(2, -2)}</p>;
                  }
                  if (line.trim() === '') {
                    return <br key={idx} />;
                  }
                  return <p key={idx} className="mb-2 text-gray-700 leading-relaxed">{line}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
