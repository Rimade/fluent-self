/**
 * Генерация sitemap.xml
 * SITE_URL=https://fluentself.ru node scripts/generate-sitemap.js
 */
const fs = require('fs');
const path = require('path');

const { pageCanonical } = require('./lib/pages');

const ROOT = path.join(__dirname, '..');
const BASE = (process.env.SITE_URL || 'https://fluentself.ru').replace(/\/$/, '');

const seoSrc = fs.readFileSync(path.join(ROOT, 'js', 'seo-data.js'), 'utf8');
const match = seoSrc.match(/pages:\s*(\{[\s\S]*?\n\t\}),/);
if (!match) throw new Error('Could not parse seo-data.js pages');
const pages = eval(`(${match[1]})`);

const today = new Date().toISOString().slice(0, 10);

const urls = Object.entries(pages)
	.map(([file, meta]) => {
		const loc = pageCanonical(BASE, file === 'index.html' ? 'index.html' : `pages/${file}`);
		return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${meta.changefreq || 'monthly'}</changefreq>
    <priority>${meta.priority || '0.5'}</priority>
  </url>`;
	})
	.join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
console.log('Wrote sitemap.xml for', BASE);
