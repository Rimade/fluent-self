const fs = require('fs');
const ROOT = __dirname + '/..';

for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith('.html') && !x.startsWith('_ref'))) {
	let h = fs.readFileSync(`${ROOT}/${f}`, 'utf8');
	let ch = false;
	if (!h.includes('js/content.js') && h.includes('js/config.js')) {
		h = h.replace(
			/<script src="js\/config\.js"><\/script>/,
			'<script src="js/config.js"></script>\n  <script src="js/content.js"></script>',
		);
		ch = true;
	}
	if (ch) {
		fs.writeFileSync(`${ROOT}/${f}`, h);
		console.log('patched', f);
	}
}
