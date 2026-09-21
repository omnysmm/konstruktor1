// Все исходные файлы проекта для скачивания в ZIP
export const projectFiles: Record<string, string> = {};

// === index.html ===
projectFiles['index.html'] = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SiteBuilder Pro - Конструктор сайтов</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <style>
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
      html.light, html.light body { background: #ffffff; color: #0f172a; }
      html.dark, html.dark body { background: #0f172a; color: #f8fafc; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

// === package.json ===
projectFiles['package.json'] = JSON.stringify({
  name: "sitebuilder-pro",
  private: true,
  type: "module",
  version: "1.0.0",
  scripts: {
    dev: "vite",
    build: "vite build",
    typecheck: "tsc --noEmit"
  },
  dependencies: {
    "file-saver": "^2.0.5",
    "@types/file-saver": "^2.0.7",
    jszip: "^3.10.2",
    react: "^18.2.0",
    "react-dom": "^18.2.0"
  },
  devDependencies: {
    "@tailwindcss/vite": "^4.1.7",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.3.4",
    tailwindcss: "^4.1.7",
    typescript: "^5.7.0",
    vite: "^6.3.5"
  }
}, null, 2);

// === vite.config.js ===
projectFiles['vite.config.js'] = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: { port: 3000 },
  },
});`;

// === tsconfig.json ===
projectFiles['tsconfig.json'] = JSON.stringify({
  compilerOptions: {
    target: "ES2020",
    module: "ESNext",
    lib: ["ES2020", "DOM", "DOM.Iterable"],
    jsx: "react-jsx",
    moduleResolution: "bundler",
    strict: true,
    skipLibCheck: true,
    esModuleInterop: true,
    isolatedModules: true,
    noEmit: true,
    allowImportingTsExtensions: true
  },
  include: ["src"]
}, null, 2);

// === README.md ===
projectFiles['README.md'] = `# SiteBuilder Pro 🚀

Конструктор сайтов с готовыми шаблонами и визуальным редактором.

## Возможности

- 🎨 5 готовых шаблонов (AI Marketplace, Портфолио, Ресторан, Фитнес, Digital-агентство)
- ✏️ Визуальный редактор с live-preview
- 🎨 Настройка цветовой схемы
- 📐 Управление структурой страницы
- ⬇️ Скачивание готового сайта в HTML
- 📦 Скачивание всего проекта в ZIP

## Запуск

\`\`\`bash
npm install
npm run dev
\`\`\`

## Сборка

\`\`\`bash
npm run build
\`\`\`

## Технологии

- React 18
- TypeScript
- Vite
- Tailwind CSS 4
- JSZip (для экспорта)
`;

// === src/index.css ===
projectFiles['src/index.css'] = `@import "tailwindcss";
`;

// === src/main.tsx ===
projectFiles['src/main.tsx'] = `import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
`;
