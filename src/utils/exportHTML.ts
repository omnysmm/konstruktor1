import { Template } from '../types';

export function exportTemplateToHTML(template: Template): string {
  const { colors, sections, name } = template;

  const generateHeroHTML = (content: Record<string, any>) => `
    <section class="hero" style="background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}); min-height: 80vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
      <div class="hero-bg">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
      </div>
      <div class="hero-content">
        <h1 style="color: ${colors.text}; font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; margin-bottom: 1.5rem; line-height: 1.1;">${content.title}</h1>
        <p style="color: ${colors.text}; opacity: 0.85; font-size: clamp(1rem, 2vw, 1.4rem); margin-bottom: 2.5rem; max-width: 700px; margin-left: auto; margin-right: auto;">${content.subtitle}</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="#" class="btn-primary" style="background: ${colors.accent}; color: #fff; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; font-size: 1.1rem; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(0,0,0,0.15);">${content.ctaText}</a>
          <a href="#" class="btn-secondary" style="border: 2px solid ${colors.text}40; color: ${colors.text}; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; font-size: 1.1rem; text-decoration: none; display: inline-block;">${content.ctaSecondary}</a>
        </div>
      </div>
    </section>`;

  const generateStatsHTML = (content: Record<string, any>) => `
    <section style="padding: 4rem 1rem; background: ${colors.background};">
      <div class="container">
        <div class="stats-grid">
          ${(content.items || []).map((item: any) => `
            <div style="text-align: center;">
              <div style="font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; color: ${colors.primary}; margin-bottom: 0.5rem;">${item.value}</div>
              <div style="color: ${colors.text}; opacity: 0.7; font-size: 0.9rem;">${item.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;

  const generateCategoriesHTML = (content: Record<string, any>) => `
    <section style="padding: 5rem 1rem; background: ${colors.background};">
      <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="color: ${colors.text}; font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem;">${content.title}</h2>
          <p style="color: ${colors.text}; opacity: 0.7; font-size: 1.1rem;">${content.subtitle}</p>
        </div>
        <div class="cards-grid">
          ${(content.items || []).map((item: any) => `
            <div class="card" style="border-color: ${colors.primary}20;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">${item.icon}</div>
              <h3 style="color: ${colors.text}; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.25rem;">${item.name}</h3>
              <p style="color: ${colors.text}; opacity: 0.6; font-size: 0.875rem;">${item.count}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;

  const generateProductsHTML = (content: Record<string, any>) => `
    <section style="padding: 5rem 1rem; background: ${colors.background};">
      <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="color: ${colors.text}; font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem;">${content.title}</h2>
          <p style="color: ${colors.text}; opacity: 0.7; font-size: 1.1rem;">${content.subtitle}</p>
        </div>
        <div class="products-grid">
          ${(content.items || []).map((item: any) => `
            <div class="product-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div style="font-size: 2rem;">${item.icon}</div>
                <div style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.875rem;">
                  <span style="color: #f59e0b;">★</span>
                  <span style="color: ${colors.text};">${item.rating}</span>
                  <span style="opacity: 0.5;">(${item.reviews})</span>
                </div>
              </div>
              <h3 style="color: ${colors.text}; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem;">${item.name}</h3>
              <p style="color: ${colors.text}; opacity: 0.6; font-size: 0.875rem; margin-bottom: 0.5rem;">${item.developer}</p>
              <p style="color: ${colors.text}; opacity: 0.7; font-size: 0.875rem; margin-bottom: 1rem;">${item.description}</p>
              <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 1rem;">
                ${(item.tags || []).map((tag: string) => `<span style="padding: 0.125rem 0.5rem; font-size: 0.75rem; border-radius: 9999px; background: ${colors.primary}15; color: ${colors.primary};">${tag}</span>`).join('')}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 700; color: ${colors.primary};">${item.price}</span>
                <a href="#" style="padding: 0.375rem 1rem; font-size: 0.875rem; font-weight: 500; border-radius: 0.5rem; background: ${colors.primary}; color: #fff; text-decoration: none;">Подробнее</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;

  const generateDevelopersHTML = (content: Record<string, any>) => `
    <section style="padding: 5rem 1rem; background: ${colors.primary}08;">
      <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="color: ${colors.text}; font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem;">${content.title}</h2>
          <p style="color: ${colors.text}; opacity: 0.7; font-size: 1.1rem;">${content.subtitle}</p>
        </div>
        <div class="team-grid">
          ${(content.items || []).map((item: any) => `
            <div class="team-card">
              <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">${item.avatar}</div>
              <h3 style="color: ${colors.text}; font-weight: 600; margin-bottom: 0.25rem;">${item.name}</h3>
              <p style="color: ${colors.text}; opacity: 0.6; font-size: 0.875rem; margin-bottom: 0.5rem;">${item.products} продуктов</p>
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.25rem; font-size: 0.875rem;">
                <span style="color: #f59e0b;">★</span>
                <span style="color: ${colors.text};">${item.rating}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;

  const generatePricingHTML = (content: Record<string, any>) => `
    <section style="padding: 5rem 1rem; background: ${colors.background};">
      <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="color: ${colors.text}; font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem;">${content.title}</h2>
          <p style="color: ${colors.text}; opacity: 0.7; font-size: 1.1rem;">${content.subtitle}</p>
        </div>
        <div class="pricing-grid">
          ${(content.plans || []).map((plan: any) => `
            <div class="pricing-card ${plan.highlighted ? 'highlighted' : ''}" style="border-color: ${plan.highlighted ? colors.primary : colors.primary + '20'}; ${plan.highlighted ? `transform: scale(1.05); box-shadow: 0 20px 60px rgba(0,0,0,0.1); background: ${colors.primary}08;` : ''}">
              ${plan.highlighted ? `<div style="text-align: center; margin-bottom: 1rem;"><span style="padding: 0.25rem 0.75rem; font-size: 0.75rem; font-weight: 700; color: #fff; border-radius: 9999px; background: ${colors.primary};">Популярный</span></div>` : ''}
              <h3 style="color: ${colors.text}; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${plan.name}</h3>
              <div style="margin-bottom: 1.5rem;">
                <span style="font-size: 2.5rem; font-weight: 800; color: ${colors.primary};">${plan.price}</span>
                <span style="color: ${colors.text}; opacity: 0.6;">${plan.period}</span>
              </div>
              <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0; display: flex; flex-direction: column; gap: 0.75rem;">
                ${(plan.features || []).map((f: string) => `<li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: ${colors.text};"><span style="color: ${colors.primary};">✓</span>${f}</li>`).join('')}
              </ul>
              <a href="#" style="display: block; width: 100%; padding: 0.75rem; border-radius: 0.75rem; font-weight: 600; text-align: center; text-decoration: none; ${plan.highlighted ? `background: ${colors.primary}; color: #fff;` : `border: 2px solid ${colors.primary}; color: ${colors.primary};`}">Выбрать план</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;

  const generateAboutHTML = (content: Record<string, any>) => `
    <section style="padding: 5rem 1rem; background: ${colors.background};">
      <div class="container" style="max-width: 800px;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="color: ${colors.text}; font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1.5rem;">${content.title}</h2>
          <p style="color: ${colors.text}; opacity: 0.7; font-size: 1.1rem; line-height: 1.7;">${content.description}</p>
        </div>
        ${content.skills ? `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${content.skills.map((skill: any) => `
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span style="font-size: 0.875rem; font-weight: 500; color: ${colors.text};">${skill.name}</span>
                <span style="font-size: 0.875rem; color: ${colors.text}; opacity: 0.6;">${skill.level}%</span>
              </div>
              <div style="height: 0.5rem; border-radius: 9999px; background: ${colors.primary}20; overflow: hidden;">
                <div style="height: 100%; width: ${skill.level}%; border-radius: 9999px; background: ${colors.primary};"></div>
              </div>
            </div>
          `).join('')}
        </div>` : ''}
      </div>
    </section>`;

  const generateProjectsHTML = (content: Record<string, any>) => `
    <section style="padding: 5rem 1rem; background: ${colors.primary}05;">
      <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="color: ${colors.text}; font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem;">${content.title}</h2>
        </div>
        <div class="projects-grid">
          ${(content.items || []).map((item: any) => `
            <div class="project-card">
              <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <div style="font-size: 2rem;">${item.icon}</div>
                <div>
                  <span style="font-size: 0.75rem; font-weight: 500; padding: 0.125rem 0.5rem; border-radius: 9999px; background: ${colors.accent}20; color: ${colors.accent}; display: inline-block; margin-bottom: 0.5rem;">${item.category}</span>
                  <h3 style="color: ${colors.text}; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem;">${item.title}</h3>
                  <p style="color: ${colors.text}; opacity: 0.7; font-size: 0.875rem;">${item.description}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;

  const generateContactHTML = (content: Record<string, any>) => `
    <section style="padding: 5rem 1rem; background: ${colors.background};">
      <div class="container" style="max-width: 600px; text-align: center;">
        <h2 style="color: ${colors.text}; font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem;">${content.title}</h2>
        <p style="color: ${colors.text}; opacity: 0.7; font-size: 1.1rem; margin-bottom: 2rem;">${content.subtitle}</p>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
          ${content.email ? `<div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 1rem; border-radius: 0.75rem; background: #fff; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.05);"><span style="font-size: 1.25rem;">📧</span><span style="color: ${colors.text};">${content.email}</span></div>` : ''}
          ${content.phone ? `<div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 1rem; border-radius: 0.75rem; background: #fff; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.05);"><span style="font-size: 1.25rem;">📞</span><span style="color: ${colors.text};">${content.phone}</span></div>` : ''}
        </div>
        <a href="#" style="display: inline-block; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; color: #fff; background: ${colors.primary}; text-decoration: none; box-shadow: 0 4px 14px rgba(0,0,0,0.15);">Написать нам</a>
      </div>
    </section>`;

  const generateMenuHTML = (content: Record<string, any>) => `
    <section style="padding: 5rem 1rem; background: ${colors.background};">
      <div class="container" style="max-width: 800px;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="color: ${colors.text}; font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem;">${content.title}</h2>
          <p style="color: ${colors.text}; opacity: 0.7; font-size: 1.1rem;">${content.subtitle}</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          ${(content.categories || []).map((cat: any) => `
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: ${colors.primary}; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid ${colors.primary}20;">${cat.name}</h3>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${(cat.items || []).map((item: any) => `
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <h4 style="font-weight: 600; color: ${colors.text};">${item.name}</h4>
                      <p style="font-size: 0.875rem; color: ${colors.text}; opacity: 0.6;">${item.description}</p>
                    </div>
                    <span style="font-weight: 700; color: ${colors.primary}; white-space: nowrap; margin-left: 1rem;">${item.price}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;

  const generateFooterHTML = (content: Record<string, any>) => `
    <footer style="padding: 4rem 1rem; background: ${colors.primary};">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">${content.companyName}</h3>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">${content.description}</p>
          </div>
          ${(content.links || []).map((link: any) => `
            <div>
              <h4 style="font-weight: 600; color: #fff; margin-bottom: 0.75rem;">${link.title}</h4>
              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
                ${(link.items || []).map((item: string) => `<li><span style="color: rgba(255,255,255,0.6); font-size: 0.875rem; cursor: pointer;">${item}</span></li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; text-align: center; margin-top: 3rem;">
          <p style="color: rgba(255,255,255,0.4); font-size: 0.875rem;">© ${new Date().getFullYear()} ${content.companyName}. Все права защищены.</p>
        </div>
      </div>
    </footer>`;

  const sectionRenderers: Record<string, (content: Record<string, any>) => string> = {
    hero: generateHeroHTML,
    stats: generateStatsHTML,
    categories: generateCategoriesHTML,
    products: generateProductsHTML,
    developers: generateDevelopersHTML,
    pricing: generatePricingHTML,
    about: generateAboutHTML,
    projects: generateProjectsHTML,
    contact: generateContactHTML,
    menu: generateMenuHTML,
    footer: generateFooterHTML,
  };

  const sectionsHTML = sections
    .map(s => sectionRenderers[s.type]?.(s.content) || '')
    .join('\n');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; -webkit-font-smoothing: antialiased; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .hero-bg { position: absolute; inset: 0; pointer-events: none; }
    .blob { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.05); filter: blur(60px); }
    .blob-1 { top: 5rem; left: 5rem; width: 16rem; height: 16rem; }
    .blob-2 { bottom: 5rem; right: 5rem; width: 20rem; height: 20rem; }
    .hero-content { position: relative; max-width: 56rem; margin: 0 auto; padding: 5rem 1rem; text-align: center; }
    .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
    .card { padding: 1.5rem; border-radius: 1rem; border: 1px solid; background: #fff; transition: all 0.3s; }
    .card:hover { transform: translateY(-4px); box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .product-card { padding: 1.5rem; border-radius: 1rem; background: #fff; border: 1px solid #e5e7eb; transition: all 0.3s; }
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
    .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
    .team-card { padding: 1.5rem; border-radius: 1rem; background: #fff; border: 1px solid #f3f4f6; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.3s; }
    .team-card:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: center; }
    .pricing-card { padding: 2rem; border-radius: 1rem; border: 2px solid; background: #fff; }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; }
    .project-card { padding: 1.5rem; border-radius: 1rem; background: #fff; border: 1px solid #f3f4f6; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.3s; }
    .project-card:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .pricing-card.highlighted { transform: none; }
    }
    @media (max-width: 480px) {
      .footer-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
${sectionsHTML}
</body>
</html>`;
}

export function downloadHTML(html: string, filename: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
