import { useState } from 'react';

export function PostGenerator() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');

  const generatePost = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const post = `# ${topic}\n\nВведение в ${topic.toLowerCase()}.\n\n## Основные моменты\n\n- Первый ключевой аспект\n- Второй важный момент\n- Третий интересный факт\n\n## Практическое применение\n\n${topic} можно использовать для:\n1. Улучшения процессов\n2. Оптимизации результатов\n3. Повышения эффективности\n\n## Заключение\n\n${topic} - это важная тема для развития.\n\n${keywords && `# ${keywords}`}`;
    
    setGeneratedPost(post);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Генератор постов</h2>
        <p className="text-sm text-gray-500">Создавайте уникальные посты на любую тему</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Параметры</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Тема поста *</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Введите тему"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ключевые слова</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="SEO, маркетинг, контент"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Тональность</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                  <option value="professional">Профессиональная</option>
                  <option value="casual">Дружеская</option>
                  <option value="academic">Академическая</option>
                  <option value="creative">Креативная</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Длина</label>
                <select value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                  <option value="short">Короткий</option>
                  <option value="medium">Средний</option>
                  <option value="long">Длинный</option>
                </select>
              </div>
            </div>
            <button
              onClick={generatePost}
              disabled={!topic.trim() || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Генерация...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Сгенерировать пост</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Результат</h3>
          {generatedPost ? (
            <div className="prose max-w-none bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              {generatedPost.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) return <h1 key={idx} className="text-2xl font-bold mb-3">{line.slice(2)}</h1>;
                if (line.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold mt-4 mb-2">{line.slice(3)}</h2>;
                if (line.startsWith('- ')) return <li key={idx} className="ml-4 mb-1">{line.slice(2)}</li>;
                if (line.match(/^\d+\. /)) return <li key={idx} className="ml-4 mb-1 list-decimal">{line.slice(3)}</li>;
                if (!line) return <br key={idx} />;
                return <p key={idx} className="mb-2">{line}</p>;
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">✍️</div>
              <p>Введите тему и нажмите "Сгенерировать"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
