import { projectFiles } from './projectFiles';

// TemplateCard.tsx
projectFiles['src/components/TemplateCard.tsx'] = `import { Template } from '../types';

interface Props {
  template: Template;
  onSelect: (template: Template) => void;
  onEdit: (id: string) => void;
  onDownload: (template: Template) => void;
  isActive: boolean;
}

export function TemplateCard({ template, onSelect, onEdit, onDownload, isActive }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div
        className="h-48 relative overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, ' + template.colors.primary + ', ' + template.colors.secondary + ')' }}
      >
        <span className="text-6xl">{template.thumbnail}</span>
        {isActive && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            ✓ Активен
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{template.description}</p>
        <div className="flex gap-2">
          <button onClick={() => onSelect(template)} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg">
            👁️ Предпросмотр
          </button>
          <button onClick={() => onDownload(template)} className="px-3 py-2.5 bg-green-100 text-green-700 text-sm rounded-lg">⬇️</button>
          <button onClick={() => onEdit(template.id)} className="px-3 py-2.5 bg-gray-100 text-gray-700 text-sm rounded-lg">✏️</button>
        </div>
      </div>
    </div>
  );
}
`;
