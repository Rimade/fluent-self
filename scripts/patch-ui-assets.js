const fs = require('fs');
const ROOT = __dirname + '/..';

for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith('.html') && !x.startsWith('_ref'))) {
	let h = fs.readFileSync(`${ROOT}/${f}`, 'utf8');
	let ch = false;
	if (!h.includes('brand.css')) {
		h = h.replace(
			/(<link href="css\/site\.css" rel="stylesheet">)/,
			'$1\n  <link href="css/brand.css" rel="stylesheet">',
		);
		ch = true;
	}
	if (!h.includes('js/ui.js') && h.includes('js/site.js')) {
		h = h.replace(
			/(<script src="js\/site\.js"><\/script>)/,
			'$1\n  <script src="js/ui.js"></script>',
		);
		ch = true;
	}
	if (ch) {
		fs.writeFileSync(`${ROOT}/${f}`, h);
		console.log('patched', f);
	}
}
