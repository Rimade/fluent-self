/**
 * Проставляет SEO-теги в <head> всех страниц (видны краулерам без JS)
 * node scripts/apply-seo-head.js
 */
const fs = require('fs');
const path = require('path');

const { listSiteHtml, seoKey, pageCanonical } = require('./lib/pages');

const ROOT = path.join(__dirname, '..');
const BASE = (process.env.SITE_URL || 'https://fluentself.ru').replace(/\/$/, '');

const seoSrc = fs.readFileSync(path.join(ROOT, 'js', 'seo-data.js'), 'utf8');
const match = seoSrc.match(/pages:\s*(\{[\s\S]*?\n\t\}),/);
const pages = eval(`(${match[1]})`);

function canonical(filePath) {
	return pageCanonical(BASE, filePath);
}

function headBlock(filePath, meta) {
	const robots = meta.robots || 'index, follow';
	const ogImage = `${BASE}/assets/brand/fluent-self-cover.png`;
	const url = canonical(filePath);
	const keywords = meta.keywords ? `  <meta name="keywords" content="${meta.keywords}">\n` : '';

	return `  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
${keywords}  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${url}">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:site_name" content="Fluent Self">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${ogImage}">`;
}

for (const rel of listSiteHtml(ROOT)) {
	const meta = pages[seoKey(rel)];
	if (!meta) continue;

	let html = fs.readFileSync(path.join(ROOT, rel), 'utf8');
	html = html.replace(/<title>[\s\S]*?<\/title>\s*/i, '');
	html = html.replace(/<meta name="description"[^>]*>\s*/gi, '');
	html = html.replace(/<meta name="keywords"[^>]*>\s*/gi, '');
	html = html.replace(/<meta name="robots"[^>]*>\s*/gi, '');
	html = html.replace(/<link rel="canonical"[^>]*>\s*/gi, '');
	html = html.replace(/<link rel="sitemap"[^>]*>\s*/gi, '');
	html = html.replace(/<meta property="og:[^"]+"[^>]*>\s*/gi, '');
	html = html.replace(/<meta name="twitter:[^"]+"[^>]*>\s*/gi, '');

	html = html.replace(/(<meta name="viewport"[^>]*>)/i, `$1\n${headBlock(rel, meta)}`);

	if (!html.includes('js/seo-data.js')) {
		const jsPrefix = rel.startsWith('pages/') ? '../js/' : 'js/';
		html = html.replace(
			new RegExp(`<script src="${jsPrefix.replace('/', '\\/')}config\\.js"><\\/script>`),
			`<script src="${jsPrefix}seo-data.js"></script>\n  <script src="${jsPrefix}config.js"></script>`,
		);
	}

	fs.writeFileSync(path.join(ROOT, rel), html, 'utf8');
	console.log('  seo head:', rel);
}

console.log('Done.');
