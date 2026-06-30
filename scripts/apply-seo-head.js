/**
 * Проставляет SEO-теги в <head> всех страниц (видны краулерам без JS)
 * node scripts/apply-seo-head.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = (process.env.SITE_URL || 'https://fluentself.ru').replace(/\/$/, '');

const seoSrc = fs.readFileSync(path.join(ROOT, 'js', 'seo-data.js'), 'utf8');
const match = seoSrc.match(/pages:\s*(\{[\s\S]*?\n\t\}),/);
const pages = eval(`(${match[1]})`);

function canonical(file) {
	return file === 'index.html' ? `${BASE}/` : `${BASE}/${file}`;
}

function headBlock(file, meta) {
	const robots = meta.robots || 'index, follow';
	const ogImage = `${BASE}/assets/brand/fluent-self-cover.png`;
	const url = canonical(file);
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

for (const file of fs
	.readdirSync(ROOT)
	.filter((f) => f.endsWith('.html') && !f.startsWith('_ref'))) {
	const meta = pages[file];
	if (!meta) continue;

	let html = fs.readFileSync(path.join(ROOT, file), 'utf8');
	html = html.replace(/<title>[\s\S]*?<\/title>\s*/i, '');
	html = html.replace(/<meta name="description"[^>]*>\s*/gi, '');
	html = html.replace(/<meta name="keywords"[^>]*>\s*/gi, '');
	html = html.replace(/<meta name="robots"[^>]*>\s*/gi, '');
	html = html.replace(/<link rel="canonical"[^>]*>\s*/gi, '');
	html = html.replace(/<link rel="sitemap"[^>]*>\s*/gi, '');
	html = html.replace(/<meta property="og:[^"]+"[^>]*>\s*/gi, '');
	html = html.replace(/<meta name="twitter:[^"]+"[^>]*>\s*/gi, '');

	html = html.replace(/(<meta name="viewport"[^>]*>)/i, `$1\n${headBlock(file, meta)}`);

	if (!html.includes('js/seo-data.js')) {
		html = html.replace(
			/<script src="js\/config\.js"><\/script>/,
			'<script src="js/seo-data.js"></script>\n  <script src="js/config.js"></script>',
		);
	}

	fs.writeFileSync(path.join(ROOT, file), html, 'utf8');
	console.log('  seo head:', file);
}

console.log('Done.');
