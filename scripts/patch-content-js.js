const fs = require('fs');
const path = require('path');
const { listSiteHtml } = require('./lib/pages');

const ROOT = path.join(__dirname, '..');

for (const rel of listSiteHtml(ROOT)) {
	const p = path.join(ROOT, rel);
	let h = fs.readFileSync(p, 'utf8');
	let ch = false;
	const jsPrefix = rel.startsWith('pages/') ? '../js/' : 'js/';
	if (!h.includes('js/content.js') && h.includes(`${jsPrefix}config.js`)) {
		h = h.replace(
			new RegExp(`<script src="${jsPrefix.replace('/', '\\/')}config\\.js"><\\/script>`),
			`<script src="${jsPrefix}config.js"></script>\n  <script src="${jsPrefix}content.js"></script>`,
		);
		ch = true;
	}
	if (ch) {
		fs.writeFileSync(p, h);
		console.log('patched', rel);
	}
}
