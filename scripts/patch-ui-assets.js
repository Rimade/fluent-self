const fs = require('fs');
const path = require('path');
const { listSiteHtml } = require('./lib/pages');

const ROOT = path.join(__dirname, '..');

for (const rel of listSiteHtml(ROOT)) {
	const p = path.join(ROOT, rel);
	let h = fs.readFileSync(p, 'utf8');
	let ch = false;
	const jsPrefix = rel.startsWith('pages/') ? '../js/' : 'js/';
	const cssBrand = rel.startsWith('pages/') ? '../css/brand.css' : 'css/brand.css';
	const cssSite = rel.startsWith('pages/') ? '../css/site.css' : 'css/site.css';
	if (!h.includes('brand.css')) {
		h = h.replace(
			new RegExp(`(<link href="${cssSite.replace('/', '\\/')}" rel="stylesheet">)`),
			`$1\n  <link href="${cssBrand}" rel="stylesheet">`,
		);
		ch = true;
	}
	if (!h.includes('js/ui.js') && h.includes(`${jsPrefix}site.js`)) {
		h = h.replace(
			new RegExp(`(<script src="${jsPrefix.replace('/', '\\/')}site\\.js"><\\/script>)`),
			`$1\n  <script src="${jsPrefix}ui.js"></script>`,
		);
		ch = true;
	}
	if (ch) {
		fs.writeFileSync(p, h);
		console.log('patched', rel);
	}
}
