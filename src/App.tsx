import { useState, useCallback, useMemo } from 'react';
import { Template, TemplateSection, EditingState } from './types';
import { templates } from './templates';
import { extendedTemplates } from './extendedTemplates';
import { kitchenTemplates } from './kitchenTemplates';
import { bloggersTemplates } from './bloggersTemplates';
import { aiTemplates } from './aiTemplates';
import { TemplateEditor } from './components/TemplateEditor';
import { TemplateCard } from './components/TemplateCard';
import { SectionRenderer } from './components/SectionRenderer';
import { DownloadProject } from './components/DownloadProject';
import { PaymentModal } from './components/PaymentModal';
import { AdminDashboard } from './components/AdminDashboard';
import { TemplateGenerator } from './components/TemplateGenerator';
import { SearchAndFilters } from './components/SearchAndFilters';
import { PaymentProvider, usePayment } from './context/PaymentContext';
import { I18nProvider, useI18n } from './context/I18nContext';
import { exportTemplateToHTML, downloadHTML } from './utils/exportHTML';

type View = 'home' | 'preview' | 'editor';

function AppContent() {
  const [view, setView] = useState<'home' | 'preview' | 'editor' | 'admin'>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editingState, setEditingState] = useState<EditingState>({
    selectedSection: null,
    selectedElement: null,
    isEditing: false,
  });
  const [activeTemplates, setActiveTemplates] = useState<Record<string, Template>>({});
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'sections-asc' | 'sections-desc' | 'category'>('name-asc');
  const [customTemplates, setCustomTemplates] = useState<Template[]>([]);
  const { isOpen, planData, closePayment } = usePayment();
  const { t } = useI18n();

  // Объединяем все шаблоны
  const allTemplates = [...extendedTemplates, ...kitchenTemplates, ...bloggersTemplates, ...aiTemplates, ...customTemplates];

  const categories = ['all', ...Array.from(new Set(allTemplates.map(t => t.category)))];

  // Фильтрация и сортировка шаблонов
  const filteredTemplates = useMemo(() => {
    let result = allTemplates;

    // Фильтр по категории
    if (filterCategory !== 'all') {
      result = result.filter(t => t.category === filterCategory);
    }

    // Фильтр по поисковому запросу
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    // Сортировка
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name, 'ru');
        case 'name-desc':
          return b.name.localeCompare(a.name, 'ru');
        case 'sections-asc':
          return a.sections.length - b.sections.length;
        case 'sections-desc':
          return b.sections.length - a.sections.length;
        case 'category':
          return a.category.localeCompare(b.category, 'ru');
        default:
          return 0;
      }
    });

    return result;
  }, [allTemplates, filterCategory, searchQuery, sortBy]);

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

  const handleDownloadTemplate = useCallback((template: Template) => {
    const html = exportTemplateToHTML(template);
    const filename = `${template.name.replace(/\s+/g, '-').toLowerCase()}.html`;
    downloadHTML(html, filename);
  }, []);

  const handleTemplateGenerated = useCallback((template: Template) => {
    setCustomTemplates(prev => [...prev, template]);
    setActiveTemplates(prev => ({ ...prev, [template.id]: template }));
    setSelectedTemplate(template);
    setView('preview');
  }, []);

  // Админ-панель
  if (view === 'admin') {
    return <AdminDashboard />;
  }

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
                onClick={() => handleDownloadTemplate(selectedTemplate)}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
              >
                <span>⬇️</span>
                <span>Скачать HTML</span>
              </button>
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
        {/* Payment Modal */}
        {isOpen && planData && (
          <PaymentModal
            isOpen={isOpen}
            onClose={closePayment}
            planName={planData.planName}
            amount={planData.amount}
            period={planData.period}
            features={planData.features}
          />
        )}
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
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl mb-4">💰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Платёжная система</h3>
            <p className="text-gray-600">Встроенная оплата через Yandex Pay, банковские карты и СБП для монетизации вашего сайта</p>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Выберите шаблон</h2>
          <p className="text-lg text-gray-600">Профессиональные шаблоны для любого типа бизнеса</p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterCategory={filterCategory}
          onCategoryChange={setFilterCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
          totalCount={allTemplates.length}
          filteredCount={filteredTemplates.length}
        />

        {/* Template Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleSelectTemplate}
                onEdit={handleEditTemplate}
                onDownload={handleDownloadTemplate}
                isActive={!!activeTemplates[template.id]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить поисковый запрос или сбросить фильтры
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('all');
              }}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </section>

      {/* Payment Integration Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm mb-4">
                <span>💰</span>
                <span>Платёжная система</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Принимайте платежи на вашем сайте</h2>
              <p className="text-white/80 mb-6">
                Интегрированная платёжная система Yandex Pay позволяет принимать оплату банковскими картами, через СБП и Yandex Pay прямо на вашем сайте.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">💳</span>
                  <span>Банковские карты Visa, Mastercard, МИР</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">💰</span>
                  <span>Yandex Pay — быстрая оплата через Яндекс</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">📱</span>
                  <span>СБП — оплата по QR-коду</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">💰</div>
                <h3 className="text-xl font-bold">Yandex Pay</h3>
                <p className="text-white/70 text-sm">Оплата в один клик</p>
              </div>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm">Тариф Стартер</span>
                  <span className="font-bold">$0</span>
                </div>
                <div className="bg-white/20 rounded-lg p-3 flex justify-between items-center border border-white/30">
                  <span className="text-sm font-medium">Тариф Про</span>
                  <span className="font-bold">$49/мес</span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm">Тариф Бизнес</span>
                  <span className="font-bold">$199/мес</span>
                </div>
              </div>
              <button className="w-full mt-4 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-500 transition-colors">
                💰 Оплатить через Yandex Pay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Template Generator */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <TemplateGenerator onTemplateGenerated={handleTemplateGenerated} />
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🗺️</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Яндекс Карты</h3>
                <p className="text-sm text-gray-500">Интеграция с картами для вашего бизнеса</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-4">
              <div className="flex items-center justify-center h-48 bg-white rounded-lg border border-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-16 h-16 border-2 border-blue-400 rounded"></div>
                  <div className="absolute top-20 right-8 w-24 h-1 bg-blue-400 rounded"></div>
                  <div className="absolute bottom-8 left-12 w-32 h-1 bg-blue-400 rounded"></div>
                  <div className="absolute bottom-16 right-16 w-20 h-20 border-2 border-green-400 rounded-full"></div>
                </div>
                <div className="text-center z-10">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="text-sm font-medium text-gray-700">Яндекс Карты</p>
                  <p className="text-xs text-gray-500">Интерактивная карта</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                <span className="text-sm text-gray-700">Показывать карту на сайте</span>
              </label>
              <label className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                <span className="text-sm text-gray-700">Маркеры филиалов</span>
              </label>
              <label className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                <span className="text-sm text-gray-700">Построение маршрутов</span>
              </label>
            </div>
          </div>
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

      {/* Download Project Button */}
      <DownloadProject />

      {/* Admin Panel Button */}
      <button
        onClick={() => setView('admin')}
        className="fixed bottom-6 left-6 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 z-40 flex items-center gap-2"
      >
        <span>⚙️</span>
        <span>{t('dashboard')}</span>
      </button>
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <PaymentProvider>
        <AppContent />
      </PaymentProvider>
    </I18nProvider>
  );
}

export default App;
