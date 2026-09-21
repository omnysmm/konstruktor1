import { useState } from 'react';

export function MusicGenerator() {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('electronic');
  const [mood, setMood] = useState('energetic');
  const [duration, setDuration] = useState(60);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAudioUrl('demo-music.mp3');
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI Музыка</h2>
        <p className="text-sm text-gray-500">Создавайте уникальную музыку</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Параметры</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Описание музыки *</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Опишите музыку..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                rows={6}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Жанр</label>
                <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                  <option value="electronic">Электронная</option>
                  <option value="rock">Рок</option>
                  <option value="pop">Поп</option>
                  <option value="jazz">Джаз</option>
                  <option value="classical">Классика</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Настроение</label>
                <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                  <option value="energetic">Энергичное</option>
                  <option value="calm">Спокойное</option>
                  <option value="happy">Веселое</option>
                  <option value="sad">Грустное</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Длительность: {duration} сек</label>
              <input type="range" min="30" max="300" step="30" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-full" />
            </div>
            <button
              onClick={generate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isGenerating ? 'Создание...' : '🎵 Создать музыку'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Результат</h3>
          {audioUrl ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-8 text-white text-center">
                <div className="text-6xl mb-4">🎵</div>
                <p className="text-lg font-semibold">Музыка создана</p>
                <p className="text-sm opacity-90 mt-2">{duration} сек</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">▶️ Воспроизвести</button>
                <button className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">📥 Скачать MP3</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🎵</div>
              <p>Опишите музыку и нажмите "Создать"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
