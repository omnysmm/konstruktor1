import { useState } from 'react';

export function SocialPublisher() {
  const [content, setContent] = useState('');
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [publishMode, setPublishMode] = useState<'now' | 'schedule'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [publications, setPublications] = useState<any[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const networks = [
    { id: 'telegram', name: 'Telegram', icon: '📱', color: 'bg-blue-500', connected: true },
    { id: 'vk', name: 'ВКонтакте', icon: '🔵', color: 'bg-blue-600', connected: true },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-sky-500', connected: true },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-gradient-to-br from-purple-500 to-pink-500', connected: false },
    { id: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-red-600', connected: false },
  ];

  const toggleNetwork = (id: string) => {
    const network = networks.find(n => n.id === id);
    if (!network?.connected) return;
    setSelectedNetworks(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
  };

  const handlePublish = async () => {
    if (!content.trim() || selectedNetworks.length === 0) return;
    setIsPublishing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setPublications([{
      id: `pub-${Date.now()}`,
      content: content.slice(0, 100),
      networks: selectedNetworks,
      status: publishMode === 'now' ? 'published' : 'scheduled',
      date: publishMode === 'now' ? new Date().toISOString() : `${scheduledDate}T${scheduledTime}`,
    }, ...publications]);

    setIsPublishing(false);
    setContent('');
    setSelectedNetworks([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Автопубликация</h2>
        <p className="text-sm text-gray-500">Публикуйте во все соцсети одновременно</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Создание публикации</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Контент *</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Текст поста..." className="w-full px-4 py-3 border border-gray-200 rounded-lg" rows={6} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Соцсети ({networks.filter(n => n.connected).length} подключено)</label>
              <div className="grid grid-cols-2 gap-2">
                {networks.map(network => (
                  <button
                    key={network.id}
                    onClick={() => toggleNetwork(network.id)}
                    disabled={!network.connected}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      selectedNetworks.includes(network.id) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                    } ${!network.connected ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className={`w-8 h-8 ${network.color} rounded-lg flex items-center justify-center text-white text-sm`}>{network.icon}</div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{network.name}</div>
                      <div className="text-xs text-gray-500">{network.connected ? '✓' : 'Не подключено'}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Режим</label>
              <div className="flex gap-2">
                <button onClick={() => setPublishMode('now')} className={`flex-1 py-2 rounded-lg text-sm ${publishMode === 'now' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Сейчас</button>
                <button onClick={() => setPublishMode('schedule')} className={`flex-1 py-2 rounded-lg text-sm ${publishMode === 'schedule' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>По расписанию</button>
              </div>
            </div>

            {publishMode === 'schedule' && (
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg" />
                <input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg" />
              </div>
            )}

            <button
              onClick={handlePublish}
              disabled={!content.trim() || selectedNetworks.length === 0 || isPublishing}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isPublishing ? 'Публикация...' : `🚀 ${publishMode === 'now' ? 'Опубликовать' : 'Запланировать'}`}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">История ({publications.length})</h3>
          {publications.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">📤</div>
              <p>Здесь будут ваши публикации</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {publications.map(pub => (
                <div key={pub.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${pub.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {pub.status === 'published' ? '✓ Опубликовано' : '📅 Запланировано'}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(pub.date).toLocaleString('ru-RU')}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{pub.content}...</p>
                  <div className="flex flex-wrap gap-1">
                    {pub.networks.map((netId: string) => {
                      const net = networks.find(n => n.id === netId);
                      return net ? <span key={netId} className="text-xs px-2 py-1 bg-white rounded">{net.icon} {net.name}</span> : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
