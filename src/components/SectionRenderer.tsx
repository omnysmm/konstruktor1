import { Template } from '../types';

interface Props {
  template: Template;
  onSectionClick?: (sectionId: string) => void;
  selectedSection?: string | null;
  isEditMode?: boolean;
}

export function SectionRenderer({ template, onSectionClick, selectedSection, isEditMode = false }: Props) {
  const { colors, sections } = template;

  const renderHero = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: colors.text }}>
          {content.title}
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-80" style={{ color: colors.text }}>
          {content.subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            style={{ backgroundColor: colors.accent, color: '#fff' }}
          >
            {content.ctaText}
          </button>
          <button className="px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all hover:opacity-80"
            style={{ borderColor: colors.text + '40', color: colors.text }}
          >
            {content.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );

  const renderStats = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`py-16 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.background }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.items?.map((item: any, i: number) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.primary }}>
                {item.value}
              </div>
              <div className="text-sm opacity-70" style={{ color: colors.text }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderCategories = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`py-20 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.background }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>{content.title}</h2>
          <p className="text-lg opacity-70" style={{ color: colors.text }}>{content.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items?.map((item: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1"
              style={{ borderColor: colors.primary + '20', backgroundColor: colors.background }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text }}>{item.name}</h3>
              <p className="text-sm opacity-60" style={{ color: colors.text }}>{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderProducts = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`py-20 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.background }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>{content.title}</h2>
          <p className="text-lg opacity-70" style={{ color: colors.text }}>{content.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items?.map((item: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1"
              style={{ borderColor: colors.primary + '20', backgroundColor: '#fff' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-500">★</span>
                  <span style={{ color: colors.text }}>{item.rating}</span>
                  <span className="opacity-50">({item.reviews})</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: colors.text }}>{item.name}</h3>
              <p className="text-sm opacity-60 mb-2" style={{ color: colors.text }}>{item.developer}</p>
              <p className="text-sm opacity-70 mb-4" style={{ color: colors.text }}>{item.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags?.map((tag: string, j: number) => (
                  <span
                    key={j}
                    className="px-2 py-0.5 text-xs rounded-full"
                    style={{ backgroundColor: colors.primary + '15', color: colors.primary }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold" style={{ color: colors.primary }}>{item.price}</span>
                <button
                  className="px-4 py-1.5 text-sm font-medium rounded-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: colors.primary }}
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderDevelopers = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`py-20 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.primary + '08' }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>{content.title}</h2>
          <p className="text-lg opacity-70" style={{ color: colors.text }}>{content.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items?.map((item: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-2xl text-center bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-3">{item.avatar}</div>
              <h3 className="font-semibold mb-1" style={{ color: colors.text }}>{item.name}</h3>
              <p className="text-sm opacity-60 mb-2" style={{ color: colors.text }}>
                {item.products} продуктов
              </p>
              <div className="flex items-center justify-center gap-1 text-sm">
                <span className="text-yellow-500">★</span>
                <span style={{ color: colors.text }}>{item.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderPricing = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`py-20 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.background }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>{content.title}</h2>
          <p className="text-lg opacity-70" style={{ color: colors.text }}>{content.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.plans?.map((plan: any, i: number) => (
            <div
              key={i}
              className={`p-8 rounded-2xl border-2 transition-all ${plan.highlighted ? 'scale-105 shadow-xl' : 'hover:shadow-lg'}`}
              style={{
                borderColor: plan.highlighted ? colors.primary : colors.primary + '20',
                backgroundColor: plan.highlighted ? colors.primary + '08' : '#fff',
              }}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="px-3 py-1 text-xs font-bold text-white rounded-full" style={{ backgroundColor: colors.primary }}>
                    Популярный
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold" style={{ color: colors.primary }}>{plan.price}</span>
                <span className="opacity-60" style={{ color: colors.text }}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features?.map((feature: string, j: number) => (
                  <li key={j} className="flex items-center gap-2 text-sm" style={{ color: colors.text }}>
                    <span style={{ color: colors.primary }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: plan.highlighted ? colors.primary : 'transparent',
                  color: plan.highlighted ? '#fff' : colors.primary,
                  border: plan.highlighted ? 'none' : `2px solid ${colors.primary}`,
                }}
              >
                Выбрать план
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderAbout = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`py-20 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.background }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.text }}>{content.title}</h2>
          <p className="text-lg opacity-70 leading-relaxed" style={{ color: colors.text }}>{content.description}</p>
        </div>
        {content.skills && (
          <div className="space-y-4">
            {content.skills.map((skill: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: colors.text }}>{skill.name}</span>
                  <span className="text-sm opacity-60" style={{ color: colors.text }}>{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.primary + '20' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${skill.level}%`, backgroundColor: colors.primary }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const renderProjects = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`py-20 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.primary + '05' }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>{content.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.items?.map((item: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full mb-2 inline-block"
                    style={{ backgroundColor: colors.accent + '20', color: colors.accent }}>
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold mb-1" style={{ color: colors.text }}>{item.title}</h3>
                  <p className="text-sm opacity-70" style={{ color: colors.text }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderContact = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`py-20 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.background }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>{content.title}</h2>
        <p className="text-lg opacity-70 mb-8" style={{ color: colors.text }}>{content.subtitle}</p>
        <div className="space-y-4">
          {content.email && (
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
              <span className="text-xl">📧</span>
              <span style={{ color: colors.text }}>{content.email}</span>
            </div>
          )}
          {content.phone && (
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
              <span className="text-xl">📞</span>
              <span style={{ color: colors.text }}>{content.phone}</span>
            </div>
          )}
        </div>
        <button
          className="mt-8 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all"
          style={{ backgroundColor: colors.primary }}
        >
          Написать нам
        </button>
      </div>
    </section>
  );

  const renderMenu = (content: Record<string, any>, sectionId: string) => (
    <section
      key={sectionId}
      className={`py-20 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.background }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>{content.title}</h2>
          <p className="text-lg opacity-70" style={{ color: colors.text }}>{content.subtitle}</p>
        </div>
        <div className="space-y-10">
          {content.categories?.map((cat: any, i: number) => (
            <div key={i}>
              <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: colors.primary, borderColor: colors.primary + '20' }}>
                {cat.name}
              </h3>
              <div className="space-y-4">
                {cat.items?.map((item: any, j: number) => (
                  <div key={j} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold" style={{ color: colors.text }}>{item.name}</h4>
                      <p className="text-sm opacity-60" style={{ color: colors.text }}>{item.description}</p>
                    </div>
                    <span className="font-bold whitespace-nowrap ml-4" style={{ color: colors.primary }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFooter = (content: Record<string, any>, sectionId: string) => (
    <footer
      key={sectionId}
      className={`py-16 ${isEditMode ? 'cursor-pointer' : ''} ${selectedSection === sectionId ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      style={{ backgroundColor: colors.primary }}
      onClick={() => isEditMode && onSectionClick?.(sectionId)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">{content.companyName}</h3>
            <p className="text-white/60 text-sm">{content.description}</p>
          </div>
          {content.links?.map((link: any, i: number) => (
            <div key={i}>
              <h4 className="font-semibold text-white mb-3">{link.title}</h4>
              <ul className="space-y-2">
                {link.items?.map((item: string, j: number) => (
                  <li key={j}>
                    <span className="text-white/60 text-sm hover:text-white cursor-pointer transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">© 2026 {content.companyName}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );

  const renderSection = (section: Template['sections'][0]) => {
    switch (section.type) {
      case 'hero': return renderHero(section.content, section.id);
      case 'stats': return renderStats(section.content, section.id);
      case 'categories': return renderCategories(section.content, section.id);
      case 'products': return renderProducts(section.content, section.id);
      case 'developers': return renderDevelopers(section.content, section.id);
      case 'pricing': return renderPricing(section.content, section.id);
      case 'about': return renderAbout(section.content, section.id);
      case 'projects': return renderProjects(section.content, section.id);
      case 'contact': return renderContact(section.content, section.id);
      case 'menu': return renderMenu(section.content, section.id);
      case 'footer': return renderFooter(section.content, section.id);
      default: return null;
    }
  };

  return <div>{sections.map(renderSection)}</div>;
}
