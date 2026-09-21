import { useState } from 'react';

interface VideoClip {
  id: string;
  name: string;
  duration: number;
  thumbnail: string;
}

export function VideoEditor() {
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [editMode, setEditMode] = useState<'manual' | 'auto'>('manual');
  const [isEditing, setIsEditing] = useState(false);
  const [editedVideo, setEditedVideo] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newClips: VideoClip[] = Array.from(files).map((file, idx) => ({
      id: `clip-${Date.now()}-${idx}`,
      name: file.name,
      duration: Math.floor(Math.random() * 30) + 10,
      thumbnail: `https://via.placeholder.com/320x180/0891b2/ffffff?text=Clip+${idx + 1}`,
    }));

    setClips([...clips, ...newClips]);
  };

  const removeClip = (id: string) => {
    setClips(clips.filter(c => c.id !== id));
  };

  const moveClip = (id: string, direction: 'up' | 'down') => {
    const index = clips.findIndex(c => c.id === id);
    if (index === -1) return;

    const newClips = [...clips];
    if (direction === 'up' && index > 0) {
      [newClips[index], newClips[index - 1]] = [newClips[index - 1], newClips[index]];
    } else if (direction === 'down' && index < clips.length - 1) {
      [newClips[index], newClips[index + 1]] = [newClips[index + 1], newClips[index]];
    }
    setClips(newClips);
  };

  const handleEdit = async () => {
    if (clips.length === 0) return;

    setIsEditing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    let finalClips = clips;
    if (editMode === 'auto') {
      finalClips = [...clips].sort((a, b) => b.duration - a.duration);
    }

    setEditedVideo({
      id: `video-${Date.now()}`,
      clips: finalClips,
      totalDuration: finalClips.reduce((sum, c) => sum + c.duration, 0),
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI Видеомонтаж</h2>
        <p className="text-sm text-gray-500">Монтируйте видео вручную или автоматически</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Загрузка и управление</h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input type="file" accept="video/*" multiple onChange={handleUpload} className="hidden" id="video-upload" />
              <label htmlFor="video-upload" className="cursor-pointer">
                <div className="text-4xl mb-2">📁</div>
                <p className="text-gray-600 mb-2">Нажмите для загрузки видео</p>
                <p className="text-xs text-gray-400">MP4, MOV, AVI</p>
              </label>
            </div>

            {clips.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Режим монтажа:</span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditMode('manual')} className={`px-3 py-1 rounded text-sm ${editMode === 'manual' ? 'bg-cyan-600 text-white' : 'bg-gray-100'}`}>Ручной</button>
                    <button onClick={() => setEditMode('auto')} className={`px-3 py-1 rounded text-sm ${editMode === 'auto' ? 'bg-cyan-600 text-white' : 'bg-gray-100'}`}>Авто</button>
                  </div>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {clips.map((clip, idx) => (
                    <div key={clip.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-500 w-6">{idx + 1}</span>
                      <img src={clip.thumbnail} alt={clip.name} className="w-16 h-10 object-cover rounded" />
                      <div className="flex-1">
                        <div className="text-sm font-medium truncate">{clip.name}</div>
                        <div className="text-xs text-gray-500">{clip.duration} сек</div>
                      </div>
                      {editMode === 'manual' && (
                        <div className="flex gap-1">
                          <button onClick={() => moveClip(clip.id, 'up')} disabled={idx === 0} className="w-6 h-6 bg-gray-200 rounded text-xs disabled:opacity-50">↑</button>
                          <button onClick={() => moveClip(clip.id, 'down')} disabled={idx === clips.length - 1} className="w-6 h-6 bg-gray-200 rounded text-xs disabled:opacity-50">↓</button>
                          <button onClick={() => removeClip(clip.id)} className="w-6 h-6 bg-red-100 text-red-700 rounded text-xs">✕</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleEdit}
                  disabled={isEditing}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 mt-4"
                >
                  {isEditing ? 'Монтаж...' : '🎞️ Смонтировать видео'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Результат</h3>
          {editedVideo ? (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-2">🎬</div>
                  <p>Видео смонтировано</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Клипов:</span>
                    <span className="text-sm">{editedVideo.clips.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Длительность:</span>
                    <span className="text-sm">{editedVideo.totalDuration} сек</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">📥 Скачать MP4</button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🎞️</div>
              <p>Загрузите видео и смонтируйте</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
