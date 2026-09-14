import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { projectFiles } from '../data/projectFiles';
import '../data/projectFilesSrc';
import '../data/projectFilesTemplates';
import '../data/projectFilesComponents';
import '../data/projectFilesApp';

export function DownloadProject() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      const files = Object.entries(projectFiles);
      const total = files.length;

      for (let i = 0; i < files.length; i++) {
        const [path, content] = files[i];
        zip.file(path, content);
        setProgress(Math.round(((i + 1) / total) * 100));
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'sitebuilder-pro.zip');
      
      setTimeout(() => {
        setIsDownloading(false);
        setIsOpen(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Error creating ZIP:', error);
      setIsDownloading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 z-40 flex items-center gap-2"
      >
        <span>📦</span>
        <span>Скачать проект</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Скачать проект</h2>
              <p className="text-gray-600">
                Скачайте весь исходный код проекта SiteBuilder Pro в виде ZIP-архива
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Что включено:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Все исходные файлы (React, TypeScript, Tailwind)</li>
                <li>✓ 5 готовых шаблонов сайтов</li>
                <li>✓ Визуальный редактор</li>
                <li>✓ Конфигурация (package.json, vite.config, tsconfig)</li>
                <li>✓ README с инструкциями</li>
              </ul>
            </div>

            {isDownloading ? (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Создание архива...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg"
                >
                  ⬇️ Скачать ZIP архив
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Отмена
                </button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Как запустить:</h3>
              <div className="bg-gray-900 rounded-lg p-3 text-sm text-green-400 font-mono">
                <div>npm install</div>
                <div>npm run dev</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
