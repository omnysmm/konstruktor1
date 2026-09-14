import { useState } from 'react';
import { Template, TemplateSection, EditingState } from '../types';
import { SectionRenderer } from './SectionRenderer';
import { exportTemplateToHTML, downloadHTML } from '../utils/exportHTML';

interface Props {
  template: Template;
  editingState: EditingState;
  setEditingState: (state: EditingState) => void;
  onUpdateSection: (sectionId: string, newContent: Record<string, any>) => void;
  onAddSection: (section: TemplateSection) => void;
  onDeleteSection: (sectionId: string) => void;
  onUpdateColors: (colors: Template['colors']) => void;
  onBack: () => void;
  onHome: () => void;
}

type EditorTab = 'content' | 'colors' | 'structure';

export function TemplateEditor({
  template,
  editingState,
  setEditingState,
  onUpdateSection,
  onAddSection,
  onDeleteSection,
  onUpdateColors,
  onBack,
  onHome,
}: Props) {
  const [activeTab, setActiveTab] = useState<EditorTab>('content');
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    const html = exportTemplateToHTML(template);
    const filename = `${template.name.replace(/\s+/g, '-').toLowerCase()}.html`;
    downloadHTML(html, filename);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const selectedSectionData = template.sections.find(s => s.id === editingState.selectedSection);

  const handleSectionClick = (sectionId: string) => {
    setEditingState({
      selectedSection: sectionId,
      selectedElement: null,
      isEditing: true,
    });
  };

  const handleContentChange = (field: string, value: any) => {
    if (!selectedSectionData) return;
    const newContent = { ...selectedSectionData.content, [field]: value };
    onUpdateSection(selectedSectionData.id, newContent);
  };

  const handleArrayItemChange = (field: string, index: number, key: string, value: string) => {
    if (!selectedSectionData) return;
    const items = [...(selectedSectionData.content[field] || [])];
    items[index] = { ...items[index], [key]: value };
    const newContent = { ...selectedSectionData.content, [field]: items };
    onUpdateSection(selectedSectionData.id, newContent);
  };

  const handleDeleteArrayItem = (field: string, index: number) => {
    if (!selectedSectionData) return;
    const items = [...(selectedSectionData.content[field] || [])];
    items.splice(index, 1);
    const newContent = { ...selectedSectionData.content, [field]: items };
    onUpdateSection(selectedSectionData.id, newContent);
  };

  const addNewSection = (type: string) => {
    const templates: Record<string, Partial<TemplateSection>> = {
      hero: {
        type: 'hero',
        content: { title: 'Новый заголовок', subtitle: 'Описание секции', ctaText: 'Кнопка 1', ctaSecondary: 'Кнопка 2' },
      },
      categories: {
        type: 'categories',
        content: {
          title: 'Категории',
          subtitle: 'Описание категорий',
          items: [
            { icon: '📌', name: 'Категория 1', count: '10+' },
            { icon: '📌', name: 'Категория 2', count: '20+' },
            { icon: '📌', name: 'Категория 3', count: '30+' },
          ],
        },
      },
      pricing: {
        type: 'pricing',
        content: {
          title: 'Тарифы',
          subtitle: 'Выберите подходящий план',
          plans: [
            { name: 'Базовый', price: '$0', period: '/мес', features: ['Фича 1', 'Фича 2'], highlighted: false },
            { name: 'Про', price: '$29', period: '/мес', features: ['Фича 1', 'Фича 2', 'Фича 3'], highlighted: true },
          ],
        },
      },
      contact: {
        type: 'contact',
        content: { title: 'Контакты', subtitle: 'Свяжитесь с нами', email: 'email@example.com', phone: '+7 (999) 000-00-00' },
      },
      about: {
        type: 'about',
        content: {
          title: 'О нас',
          description: 'Описание компании или проекта',
          skills: [{ name: 'Навык 1', level: 80 }, { name: 'Навык 2', level: 90 }],
        },
      },
      footer: {
        type: 'footer',
        content: {
          companyName: 'Название компании',
          description: 'Описание',
          links: [{ title: 'Ссылки', items: ['Пункт 1', 'Пункт 2'] }],
        },
      },
    };

    const newSection: TemplateSection = {
      id: `section-${Date.now()}`,
      type,
      editable: true,
      content: templates[type]?.content || {},
    };
    onAddSection(newSection);
    setShowAddPanel(false);
  };

  const renderContentEditor = () => {
    if (!selectedSectionData) {
      return (
        <div className="p-6 text-center text-gray-400">
          <div className="text-4xl mb-4">👆</div>
          <p className="text-sm">Кликните на секцию в превью для редактирования</p>
        </div>
      );
    }

    const { content, type } = selectedSectionData;

    return (
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
            {type}
          </span>
          <button
            onClick={() => onDeleteSection(selectedSectionData.id)}
            className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
          >
            🗑️ Удалить
          </button>
        </div>

        {/* Simple text fields */}
        {['title', 'subtitle', 'description', 'ctaText', 'ctaSecondary', 'email', 'phone', 'companyName'].map(field => {
          if (content[field] !== undefined) {
            return (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">{field}</label>
                {field === 'description' || field === 'subtitle' ? (
                  <textarea
                    value={content[field]}
                    onChange={e => handleContentChange(field, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                ) : (
                  <input
                    type="text"
                    value={content[field]}
                    onChange={e => handleContentChange(field, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                )}
              </div>
            );
          }
          return null;
        })}

        {/* Array fields */}
        {['items', 'plans', 'categories', 'links'].map(field => {
          if (content[field] && Array.isArray(content[field])) {
            return (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-600 mb-2 capitalize">{field}</label>
                <div className="space-y-3">
                  {content[field].map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-gray-500">Элемент {idx + 1}</span>
                        <button
                          onClick={() => handleDeleteArrayItem(field, idx)}
                          className="text-xs text-red-400 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </div>
                      {typeof item === 'object' && Object.entries(item).map(([key, val]) => {
                        if (Array.isArray(val)) return null;
                        if (typeof val === 'number' && key === 'level') {
                          return (
                            <div key={key} className="mb-2">
                              <label className="text-xs text-gray-500">{key}</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={val as number}
                                onChange={e => handleArrayItemChange(field, idx, key, e.target.value)}
                                className="w-full"
                              />
                            </div>
                          );
                        }
                        if (key === 'highlighted') {
                          return (
                            <div key={key} className="mb-2">
                              <label className="flex items-center gap-2 text-xs text-gray-500">
                                <input
                                  type="checkbox"
                                  checked={val as boolean}
                                  onChange={e => handleArrayItemChange(field, idx, key, String(e.target.checked))}
                                  className="rounded"
                                />
                                Выделенный
                              </label>
                            </div>
                          );
                        }
                        return (
                          <div key={key} className="mb-2">
                            <label className="text-xs text-gray-500">{key}</label>
                            <input
                              type="text"
                              value={val as string}
                              onChange={e => handleArrayItemChange(field, idx, key, e.target.value)}
                              className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderColorsEditor = () => (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Цветовая схема</h3>
      {Object.entries(template.colors).map(([key, value]) => (
        <div key={key} className="flex items-center gap-3">
          <input
            type="color"
            value={value}
            onChange={e => onUpdateColors({ ...template.colors, [key]: e.target.value })}
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
          />
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-600 capitalize">{key}</label>
            <input
              type="text"
              value={value}
              onChange={e => onUpdateColors({ ...template.colors, [key]: e.target.value })}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded font-mono"
            />
          </div>
        </div>
      ))}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500">💡 Совет: меняйте цвета и сразу видьте результат в превью справа</p>
      </div>
    </div>
  );

  const renderStructureEditor = () => (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Структура страницы</h3>
        <button
          onClick={() => setShowAddPanel(!showAddPanel)}
          className="text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          + Добавить
        </button>
      </div>

      {showAddPanel && (
        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 mb-4">
          <p className="text-xs font-medium text-indigo-700 mb-2">Добавить секцию:</p>
          <div className="grid grid-cols-2 gap-2">
            {['hero', 'categories', 'pricing', 'contact', 'about', 'footer'].map(type => (
              <button
                key={type}
                onClick={() => addNewSection(type)}
                className="px-3 py-2 text-xs bg-white border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors capitalize"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {template.sections.map((section, idx) => (
          <div
            key={section.id}
            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
              editingState.selectedSection === section.id
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleSectionClick(section.id)}
          >
            <span className="text-xs text-gray-400 w-5">{idx + 1}</span>
            <span className="text-xs font-medium text-gray-700 flex-1 capitalize">{section.type}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteSection(section.id); }}
              className="text-xs text-red-400 hover:text-red-600 p-1"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onHome}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            🏠
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={onBack}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ← Предпросмотр
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-800">{template.name}</span>
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Редактор</span>
        </div>
        <div className="flex items-center gap-3">
          {downloadSuccess && (
            <span className="text-xs text-green-600 font-medium animate-pulse">✓ Скачано!</span>
          )}
          <span className="text-xs text-gray-400">Автосохранение ✓</span>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <span>⬇️</span>
            <span>Скачать HTML</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Editor Panel */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {([
              { id: 'content', label: '📝 Контент' },
              { id: 'colors', label: '🎨 Цвета' },
              { id: 'structure', label: '📐 Структура' },
            ] as { id: EditorTab; label: string }[]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-3 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'content' && renderContentEditor()}
            {activeTab === 'colors' && renderColorsEditor()}
            {activeTab === 'structure' && renderStructureEditor()}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto bg-gray-200 p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-full">
            <SectionRenderer
              template={template}
              onSectionClick={handleSectionClick}
              selectedSection={editingState.selectedSection}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
