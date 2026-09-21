import { useState } from 'react';

export function VoiceSynthesizer() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('female-1');
  const [speed, setSpeed] = useState(1);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const voices = [
    { id: 'female-1', name: 'Анна', gender: 'Женский' },
    { id: 'female-2', name: 'Мария', gender: 'Женский' },
    { id: 'male-1', name: 'Иван', gender: 'Мужской' },
    { id: 'male-2', name: 'Дмитрий', gender: 'Мужской' },
  ];

  const synthesize = async () => {
    if (!text.trim()) return;
    setIsSynthesizing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAudioUrl('demo-audio.mp3');
    setIsSynthesizing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI Озвучка</h2>
        <p className="text-sm text-gray-500">Синтез речи для ваших текстов</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Параметры озвучки</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Текст для озвучки *</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите текст..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                rows={8}
              />
              <div className="text-xs text-gray-500 mt-1">{text.length} символов</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Голос</label>
              <select value={voice} onChange={(e) => setVoice(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                {voices.map(v => <option key={v.id} value={v.id}>{v.name} ({v.gender})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Скорость: {speed}x</label>
              <input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full" />
            </div>
            <button
              onClick={synthesize}
              disabled={!text.trim() || isSynthesizing}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isSynthesizing ? 'Синтез...' : '🎙️ Озвучить текст'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Результат</h3>
          {audioUrl ? (
            <div className="space-y-4">
              <div className="bg-pink-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Голос:</span>
                  <span className="text-sm">{voices.find(v => v.id === voice)?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Длительность:</span>
                  <span className="text-sm">~{Math.round(text.length * 0.05)} сек</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">▶️ Воспроизвести</button>
                <button className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">📥 Скачать MP3</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🎙️</div>
              <p>Введите текст и нажмите "Озвучить"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
