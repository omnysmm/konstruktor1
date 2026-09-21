import { useState } from 'react';

export function ArticleWithImages() {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [imageCount, setImageCount] = useState(3);
  const [imageStyle, setImageStyle] = useState('photorealistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [article, setArticle] = useState<any>(null);

  const generate = async () => {
    if (!title.trim() || !topic.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setArticle({
      title,
      content: `# ${title}\n\nВведение в ${topic.toLowerCase()}.\n\n![${title}](https://via.placeholder.com/800x400)\n\n## Основные аспекты\n\n${topic} - это важная тема.\n\n![Детали](https://via.placeholder.com/800x400)\n\n## Заключение\n\n${topic} - это захватывающая область.`,
      images: Array.from({ length: imageCount }, (_, i) => `https://via.placeholder.com/800x400/6366f1/ffffff?text=Image+${i + 1}`),
      wordCount: 150,
    });
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI Статьи с Изображениями</h2>
        <p className="text-sm text-gray-500">Создавайте статьи с уникальными изображениями</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Параметры</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Тема *</label>
              <textarea value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg" rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Изображений</label>
                <select value={imageCount} onChange={(e) => setImageCount(parseInt(e.target.value))} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                  <option value={1}>1</option>
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Стиль</label>
                <select value={imageStyle} onChange={(e) => setImageStyle(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                  <option value="photorealistic">Фотореалистичный</option>
                  <option value="illustration">Иллюстрация</option>
                  <option value="3d">3D рендер</option>
                </select>
              </div>
            </div>
            <button
              onClick={generate}
              disabled={!title.trim() || !topic.trim() || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isGenerating ? 'Создание...' : '📝 Создать статью'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Результат</h3>
          {article ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Заголовок:</span>
                  <span className="text-sm">{article.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Слов:</span>
                  <span className="text-sm">{article.wordCount}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm font-medium">Изображений:</span>
                  <span className="text-sm">{article.images.length}</span>
                </div>
              </div>
              <div className="prose max-w-none bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                {article.content.split('\n').map((line: string, idx: number) => {
                  if (line.startsWith('# ')) return <h1 key={idx} className="text-2xl font-bold mb-3">{line.slice(2)}</h1>;
                  if (line.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold mt-4 mb-2">{line.slice(3)}</h2>;
                  if (line.startsWith('![')) {
                    const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                    if (match) return <img key={idx} src={match[2]} alt={match[1]} className="w-full rounded-lg my-4" />;
                  }
                  if (!line) return <br key={idx} />;
                  return <p key={idx} className="mb-2">{line}</p>;
                })}
              </div>
              <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">📥 Экспорт в Markdown</button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">📝</div>
              <p>Введите заголовок и тему</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
