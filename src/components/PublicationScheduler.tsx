import { useState } from 'react';

interface PublicationSchedule {
  id: string;
  templateId: string;
  platform: 'telegram' | 'vk' | 'instagram' | 'youtube' | 'tiktok' | 'blog';
  contentType: 'article' | 'video' | 'image' | 'audio' | 'post';
  schedule: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom';
  customTime?: string;
  customDays?: string[];
  status: 'active' | 'paused' | 'draft';
  lastPublished?: string;
  nextPublication?: string;
}

interface PublicationSchedulerProps {
  templateId: string;
  onScheduleCreate: (schedule: Omit<PublicationSchedule, 'id'>) => void;
}

export function PublicationScheduler({ templateId, onScheduleCreate }: PublicationSchedulerProps) {
  const [schedules, setSchedules] = useState<PublicationSchedule[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    platform: 'telegram' as PublicationSchedule['platform'],
    contentType: 'article' as PublicationSchedule['contentType'],
    schedule: 'daily' as PublicationSchedule['schedule'],
    customTime: '09:00',
    customDays: ['mon', 'wed', 'fri'],
    status: 'active' as PublicationSchedule['status'],
  });

  const platforms = [
    { value: 'telegram', label: 'Telegram', icon: '📱' },
    { value: 'vk', label: 'ВКонтакте', icon: '🔵' },
    { value: 'instagram', label: 'Instagram', icon: '📷' },
    { value: 'youtube', label: 'YouTube', icon: '📺' },
    { value: 'tiktok', label: 'TikTok', icon: '🎵' },
    { value: 'blog', label: 'Блог', icon: '📝' },
  ];

  const contentTypes = [
    { value: 'article', label: 'Статья', icon: '📄' },
    { value: 'video', label: 'Видео', icon: '🎬' },
    { value: 'image', label: 'Изображение', icon: '🖼️' },
    { value: 'audio', label: 'Аудио', icon: '🎵' },
    { value: 'post', label: 'Пост', icon: '💬' },
  ];

  const schedules_list = [
    { value: 'hourly', label: 'Каждый час' },
    { value: 'daily', label: 'Ежедневно' },
    { value: 'weekly', label: 'Еженедельно' },
    { value: 'monthly', label: 'Ежемесячно' },
    { value: 'custom', label: 'По расписанию' },
  ];

  const daysOfWeek = [
    { value: 'mon', label: 'Пн' },
    { value: 'tue', label: 'Вт' },
    { value: 'wed', label: 'Ср' },
    { value: 'thu', label: 'Чт' },
    { value: 'fri', label: 'Пт' },
    { value: 'sat', label: 'Сб' },
    { value: 'sun', label: 'Вс' },
  ];

  const handleCreate = () => {
    onScheduleCreate({
      templateId,
      ...newSchedule,
    });
    setIsCreating(false);
    setNewSchedule({
      platform: 'telegram',
      contentType: 'article',
      schedule: 'daily',
      customTime: '09:00',
      customDays: ['mon', 'wed', 'fri'],
      status: 'active',
    });
  };

  const toggleDay = (day: string) => {
    setNewSchedule(prev => ({
      ...prev,
      customDays: prev.customDays?.includes(day)
        ? prev.customDays.filter(d => d !== day)
        : [...(prev.customDays || []), day],
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">📅 Расписание публикаций</h3>
          <p className="text-sm text-gray-500">Автоматическая публикация контента</p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {isCreating ? 'Отмена' : '+ Создать'}
        </button>
      </div>

      {isCreating && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Платформа</label>
            <div className="grid grid-cols-3 gap-2">
              {platforms.map(platform => (
                <button
                  key={platform.value}
                  onClick={() => setNewSchedule(prev => ({ ...prev, platform: platform.value as any }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    newSchedule.platform === platform.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{platform.icon}</div>
                  <div className="text-xs font-medium">{platform.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Тип контента</label>
            <div className="grid grid-cols-5 gap-2">
              {contentTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setNewSchedule(prev => ({ ...prev, contentType: type.value as any }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    newSchedule.contentType === type.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-xs font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Частота публикации</label>
            <select
              value={newSchedule.schedule}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, schedule: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {schedules_list.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {newSchedule.schedule === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Время публикации</label>
                <input
                  type="time"
                  value={newSchedule.customTime}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, customTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Дни недели</label>
                <div className="flex gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day.value}
                      onClick={() => toggleDay(day.value)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        newSchedule.customDays?.includes(day.value)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleCreate}
            className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            ✓ Создать расписание
          </button>
        </div>
      )}

      {schedules.length === 0 && !isCreating ? (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">📅</div>
          <p className="text-sm">Нет активных расписаний</p>
          <p className="text-xs mt-1">Создайте расписание для автоматической публикации</p>
        </div>
      ) : (
        <div className="space-y-3">
          {schedules.map(schedule => (
            <div key={schedule.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {platforms.find(p => p.value === schedule.platform)?.icon}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {platforms.find(p => p.value === schedule.platform)?.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {contentTypes.find(t => t.value === schedule.contentType)?.label} •{' '}
                      {schedules_list.find(s => s.value === schedule.schedule)?.label}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  schedule.status === 'active' ? 'bg-green-100 text-green-700' :
                  schedule.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {schedule.status === 'active' ? 'Активно' : schedule.status === 'paused' ? 'Пауза' : 'Черновик'}
                </span>
              </div>
              {schedule.lastPublished && (
                <div className="text-xs text-gray-500 mt-2">
                  Последняя публикация: {schedule.lastPublished}
                </div>
              )}
              {schedule.nextPublication && (
                <div className="text-xs text-gray-500">
                  Следующая: {schedule.nextPublication}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
