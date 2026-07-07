/**
 * Обновляет пути в pages/*.html после переноса из корня.
 * node scripts/patch-pages-paths.js
 */
const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'pages');

for (const file of fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith('.html'))) {
	const p = path.join(PAGES_DIR, file);
	let html = fs.readFileSync(p, 'utf8');

	html = html.replace(/href="assets\//g, 'href="../assets/');
	html = html.replace(/href="css\//g, 'href="../css/');
	html = html.replace(/src="assets\//g, 'src="../assets/');
	html = html.replace(/url\(assets\//g, 'url(../assets/');
	html = html.replace(/src="js\//g, 'src="../js/');
	html = html.replace(/href="index\.html"/g, 'href="../index.html"');
	html = html.replace(
		/https:\/\/fluentself\.ru\/([a-z0-9-]+)\.html/g,
		'https://fluentself.ru/pages/$1.html',
	);

	fs.writeFileSync(p, html, 'utf8');
	console.log('  patched', file);
}

console.log('Done.');
