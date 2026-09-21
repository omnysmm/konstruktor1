import { useState } from 'react';
import { useI18n } from '../context/I18nContext';

type SortOption = 'name-asc' | 'name-desc' | 'sections-asc' | 'sections-desc' | 'category';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  categories: string[];
  totalCount: number;
  filteredCount: number;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  totalCount,
  filteredCount,
}: SearchAndFiltersProps) {
  const { t } = useI18n();
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'name-asc', label: 'По имени (А-Я)', icon: '🔤' },
    { value: 'name-desc', label: 'По имени (Я-А)', icon: '🔤' },
    { value: 'sections-asc', label: 'По кол-ву секций ↑', icon: '📊' },
    { value: 'sections-desc', label: 'По кол-ву секций ↓', icon: '📊' },
    { value: 'category', label: 'По категории', icon: '📁' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск по названию или описанию шаблона..."
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showFilters
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>🎛️</span>
            <span>Фильтры</span>
            {showFilters && <span className="text-xs">▼</span>}
          </button>

          <div className="text-sm text-gray-500">
            Показано <span className="font-semibold text-gray-900">{filteredCount}</span> из{' '}
            <span className="font-semibold text-gray-900">{totalCount}</span> шаблонов
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:border-gray-300 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            {sortOptions.find(o => o.value === sortBy)?.icon}
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            ▼
          </div>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="pt-4 border-t border-gray-100 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📁 Категория
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'Все' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-3">
              <div className="text-2xl font-bold text-indigo-600">{totalCount}</div>
              <div className="text-xs text-indigo-700">Всего шаблонов</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
              <div className="text-xs text-purple-700">Категорий</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{filteredCount}</div>
              <div className="text-xs text-green-700">Найдено</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((filteredCount / totalCount) * 100)}%
              </div>
              <div className="text-xs text-orange-700">Совпадений</div>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchQuery || filterCategory !== 'all') && (
            <button
              onClick={() => {
                onSearchChange('');
                onCategoryChange('all');
              }}
              className="w-full px-4 py-2 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
            >
              🗑️ Сбросить все фильтры
            </button>
          )}
        </div>
      )}
    </div>
  );
}
