import { Template } from '../types';

interface Props {
  template: Template;
  onSelect: (template: Template) => void;
  onEdit: (id: string) => void;
  isActive: boolean;
}

export function TemplateCard({ template, onSelect, onEdit, isActive }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Preview Area */}
      <div
        className="h-48 relative overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})` }}
      >
        <span className="text-6xl">{template.thumbnail}</span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
        {isActive && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            ✓ Активен
          </div>
        )}
        <div className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {template.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{template.description}</p>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 mb-4">
          {Object.entries(template.colors).map(([key, color]) => (
            <div
              key={key}
              className="w-5 h-5 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
              title={key}
            />
          ))}
          <span className="text-xs text-gray-400 ml-2">{template.sections.length} секций</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onSelect(template)}
            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            👁️ Предпросмотр
          </button>
          <button
            onClick={() => onEdit(template.id)}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            ✏️
          </button>
        </div>
      </div>
    </div>
  );
}
