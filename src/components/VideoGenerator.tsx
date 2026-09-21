import { useState } from 'react';

export function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(30);
  const [resolution, setResolution] = useState('1080p');
  const [style, setStyle] = useState('cinematic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setVideoUrl('demo-video.mp4');
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI Видео Генератор</h2>
        <p className="text-sm text-gray-500">Создавайте видео из текста</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Параметры</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Описание видео *</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Опишите видео..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                rows={6}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Длительность</label>
                <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                  <option value={15}>15 сек</option>
                  <option value={30}>30 сек</option>
                  <option value={60}>1 мин</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Разрешение</label>
                <select value={resolution} onChange={(e) => setResolution(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                  <option value="4k">4K</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Стиль</label>
              <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                <option value="cinematic">Кинематографический</option>
                <option value="animation">Анимация</option>
                <option value="documentary">Документальный</option>
              </select>
            </div>
            <button
              onClick={generate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isGenerating ? 'Генерация...' : '🎬 Создать видео'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Результат</h3>
          {videoUrl ? (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-2">🎬</div>
                  <p>Видео создано</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">▶️ Предпросмотр</button>
                <button className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">📥 Скачать MP4</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🎬</div>
              <p>Опишите видео и нажмите "Создать"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
