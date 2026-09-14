import { useState, useCallback } from 'react';
import { Template, TemplateSection, EditingState } from './types';
import { templates } from './templates';
import { TemplateEditor } from './components/TemplateEditor';
import { TemplateCard } from './components/TemplateCard';
import { SectionRenderer } from './components/SectionRenderer';

type View = 'home' | 'preview' | 'editor';

function App() {
  const [view, setView] = useState<View>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editingState, setEditingState] = useState<EditingState>({
    selectedSection: null,
    selectedElement: null,
    isEditing: false,
  });
  const [activeTemplates, setActiveTemplates] = useState<Record<string, Template>>({});
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = filterCategory === 'all'
    ? templates
    : templates.filter(t => t.category === filterCategory);

  const handleSelectTemplate = useCallback((template: Template) => {
    const cloned = JSON.parse(JSON.stringify(template));
    setActiveTemplates(prev => ({ ...prev, [template.id]: cloned }));
    setSelectedTemplate(cloned);
    setView('preview');
  }, []);

  const handleEditTemplate = useCallback((templateId: string) => {
    const template = activeTemplates[templateId] || templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(JSON.parse(JSON.stringify(template)));
      setView('editor');
      setEditingState({ selectedSection: null, selectedElement: null, isEditing: false });
    }
  }, [activeTemplates]);

  const handleUpdateSection = useCallback((sectionId: string, newContent: Record<string, any>) => {
    if (!selectedTemplate) return;
    const updated = {
      ...selectedTemplate,
      sections: selectedTemplate.sections.map(s =>
        s.id === sectionId ? { ...s, content: newContent } : s
      ),
    };
    setSelectedTemplate(updated);
    setActiveTemplates(prev => ({ ...prev, [selectedTemplate.id]: updated }));
  }, [selectedTemplate]);

  const handleAddSection = useCallback((section: TemplateSection) => {
    if (!selectedTemplate) return;
    const updated = {
      ...selectedTemplate,
      sections: [...selectedTemplate.sections, section],
    };
    setSelectedTemplate(updated);
    setActiveTemplates(prev => ({ ...prev, [selectedTemplate.id]: updated }));
  }, [selectedTemplate]);

  const handleDeleteSection = useCallback((sectionId: string) => {
    if (!selectedTemplate) return;
    const updated = {
      ...selectedTemplate,
      sections: selectedTemplate.sections.filter(s => s.id !== sectionId),
    };
    setSelectedTemplate(updated);
    setActiveTemplates(prev => ({ ...prev, [selectedTemplate.id]: updated }));
  }, [selectedTemplate]);

  const handleUpdateColors = useCallback((colors: Template['colors']) => {
    if (!selectedTemplate) return;
    const updated = { ...selectedTemplate, colors };
    setSelectedTemplate(updated);
    setActiveTemplates(prev => ({ ...prev, [selectedTemplate.id]: updated }));
  }, [selectedTemplate]);

  if (view === 'editor' && selectedTemplate) {
    return (
      <TemplateEditor
        template={selectedTemplate}
        editingState={editingState}
        setEditingState={setEditingState}
        onUpdateSection={handleUpdateSection}
        onAddSection={handleAddSection}
        onDeleteSection={handleDeleteSection}
        onUpdateColors={handleUpdateColors}
        onBack={() => setView('preview')}
        onHome={() => { setView('home'); setSelectedTemplate(null); }}
      />
    );
  }

  if (view === 'preview' && selectedTemplate) {
    return (
      <div className="min-h-screen">
        {/* Preview Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView('home')}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ← Назад
              </button>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm font-medium text-gray-700">{selectedTemplate.name}</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Предпросмотр</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditTemplate(selectedTemplate.id)}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                ✏️ Редактировать
              </button>
            </div>
          </div>
        </div>
        <div className="pt-14">
          <SectionRenderer template={selectedTemplate} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
            <span>✨</span>
            <span>Конструктор сайтов нового поколения</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            SiteBuilder <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Pro</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Создавайте потрясающие сайты за минуты. Выберите шаблон, настройте под себя и запустите. Включая маркетплейс AI-продуктов.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#templates" className="px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Выбрать шаблон
            </a>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              Как это работает
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Готовые шаблоны</h3>
            <p className="text-gray-600">Профессионально разработанные шаблоны для разных ниш: от маркетплейса AI до ресторана</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl mb-4">✏️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Визуальный редактор</h3>
            <p className="text-gray-600">Редактируйте все элементы прямо в браузере. Меняйте тексты, цвета и структуру без кода</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-2xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Мгновенный запуск</h3>
            <p className="text-gray-600">Выберите шаблон, настройте и опубликуйте. Ваш сайт готов за считанные минуты</p>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Выберите шаблон</h2>
          <p className="text-lg text-gray-600">Профессиональные шаблоны для любого типа бизнеса</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat === 'all' ? 'Все шаблоны' : cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleSelectTemplate}
              onEdit={handleEditTemplate}
              isActive={!!activeTemplates[template.id]}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">SiteBuilder <span className="text-indigo-400">Pro</span></div>
          <p className="text-gray-400 mb-6">Конструктор сайтов с готовыми шаблонами и визуальным редактором</p>
          <div className="flex gap-6 justify-center text-gray-400">
            <span className="hover:text-white cursor-pointer transition-colors">О проекте</span>
            <span className="hover:text-white cursor-pointer transition-colors">Документация</span>
            <span className="hover:text-white cursor-pointer transition-colors">Поддержка</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
