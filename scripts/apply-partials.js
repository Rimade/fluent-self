/**
 * Извлекает chrome/footer/icons из index.html и подключает partials на всех страницах.
 * node scripts/apply-partials.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PARTIALS = path.join(ROOT, 'partials');

function extractPartials(html) {
	const chromeStart = html.indexOf('<a href="#main-content"');
	const mainStart = html.indexOf('<div id="main-content"');
	const footerStart = html.indexOf('<footer');
	const footerEnd = html.indexOf('</footer>') + '</footer>'.length;
	const svgStart = html.indexOf('<svg aria-hidden="true"');
	const svgEnd = html.indexOf('</svg>', svgStart) + '</svg>'.length;

	if (chromeStart < 0 || mainStart < 0 || footerStart < 0 || svgStart < 0) {
		throw new Error('Could not find partial markers in index.html');
	}

	fs.mkdirSync(PARTIALS, { recursive: true });
	fs.writeFileSync(path.join(PARTIALS, 'chrome.html'), html.slice(chromeStart, mainStart).trim() + '\n', 'utf8');
	fs.writeFileSync(path.join(PARTIALS, 'footer.html'), html.slice(footerStart, footerEnd).trim() + '\n', 'utf8');
	fs.writeFileSync(path.join(PARTIALS, 'icons.svg'), html.slice(svgStart, svgEnd).trim() + '\n', 'utf8');
	console.log('  extracted partials/');
}

function patchPage(html) {
	let out = html;

	if (!out.includes('id="site-chrome"')) {
		const hadChrome = /<a href="#main-content"[\s\S]*?(?=<div id="main-content"|<main id="main-content")/.test(out);
		if (hadChrome) {
			out = out.replace(
				/<a href="#main-content"[\s\S]*?(?=<div id="main-content"|<main id="main-content")/,
				'<div id="site-chrome"></div>\n\n  ',
			);
		}
	}

	const usesPartials = out.includes('id="site-chrome"');

	if (usesPartials && !out.includes('partials-pending')) {
		out = out.replace(
			/<head>/,
			'<head>\n  <style>html.partials-pending body{opacity:0}html.partials-ready body{opacity:1;transition:opacity .2s ease}</style>\n  <script>document.documentElement.classList.add("partials-pending")</script>',
		);
	}

	out = out.replace(/<footer[\s\S]*?<\/footer>/, '<div id="site-footer"></div>');
	out = out.replace(/<svg aria-hidden="true"[\s\S]*?<\/svg>/, '<div id="site-icons"></div>');

	out = out.replace(/\s*<script src="https:\/\/cdn\.jsdelivr\.net\/combine[^>]*><\/script>\s*/g, '\n');
	out = out.replace(/\s*<script src="assets\/js\/index\.min\.js"><\/script>\s*/g, '\n');

	if (usesPartials && !out.includes('js/layout.js')) {
		out = out.replace(
			/<script src="js\/telegram\.js"><\/script>/,
			'<script src="js/telegram.js"></script>\n  <script src="js/layout.js"></script>',
		);
	}

	// Отзывы на главной → placeholder
	if (out.includes('data-behavior="siema"') && !out.includes('data-site-reviews')) {
		out = out.replace(
			/<div class="">\s*<div class="py-75">\s*<div class="fz-xs uppercase tracking-wide text-center ff-graphik">Отзывы о нас<\/div>[\s\S]*?(?=<footer|<div id="site-footer")/,
			'<div class="fs-reviews-wrap" data-site-reviews></div>\n\n    ',
		);
	}

	return out;
}

const indexPath = path.join(ROOT, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
if (indexHtml.includes('<a href="#main-content"') && indexHtml.includes('<footer')) {
	extractPartials(indexHtml);
} else {
	console.log('  skip extract (partials already in use)');
}

for (const file of fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !f.startsWith('_ref'))) {
	const p = path.join(ROOT, file);
	const next = patchPage(fs.readFileSync(p, 'utf8'));
	fs.writeFileSync(p, next, 'utf8');
	console.log('  patched', file);
}

console.log('Done.');
