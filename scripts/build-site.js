/**
 * Порт страниц firstuk → Fluent Self
 * node scripts/build-site.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const KIDS_SITE = 'https://fluentselfkids.ru';

const PAGES = [
	['_ref-home.html', 'index.html', 0],
	['_ref-about.html', 'pages/about.html', 0],
	['_ref-adults.html', 'pages/kursy-dlya-vzroslyh.html', 0],
	['_ref-kids.html', 'pages/kursy-dlya-detej.html', 0],
	['_ref-corp.html', 'pages/korporativnoe-obuchenie.html', 0],
	['_ref-contacts.html', 'pages/contacts.html', 0],
	['_ref-order.html', 'pages/order.html', 0],
	['_ref-events.html', 'pages/events.html', 0],
	['_ref-photo.html', 'pages/photo.html', 0],
];

const SPRITE = `<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden" xmlns="http://www.w3.org/2000/svg">
<symbol id="logo" viewBox="0 0 180 20">
  <text x="0" y="15" font-family="Times New Roman, Times, serif" font-size="17" letter-spacing="0.08em" fill="currentColor">FLUENT SELF</text>
</symbol>
<symbol id="arrow" viewBox="0 0 30 7">
  <path d="M0 3.5H24M20 .5L29 3.5L20 6.5" stroke="currentColor" stroke-width="1" fill="none"/>
</symbol>
<symbol id="group" viewBox="0 0 12 12">
  <circle cx="3.5" cy="5" r="2.2" fill="currentColor"/><circle cx="8.5" cy="5" r="2.2" fill="currentColor"/><path d="M1 10c0-2 2.2-3.2 4.5-3.2S10 8 10 10" fill="none" stroke="currentColor" stroke-width=".8"/><path d="M6 10c0-2 2.2-3.2 4.5-3.2" fill="none" stroke="currentColor" stroke-width=".8"/>
</symbol>
<symbol id="single" viewBox="0 0 13 13">
  <circle cx="6.5" cy="4.5" r="2.5" fill="currentColor"/><path d="M2 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" fill="none" stroke="currentColor" stroke-width=".9"/>
</symbol>
</svg>`;

const ROUTE_MAP = {
	'': 'index.html',
	about: 'about.html',
	'kursy-dlya-vzroslyh': 'kursy-dlya-vzroslyh.html',
	'kursy-dlya-detej': 'kursy-dlya-detej.html',
	'korporativnoe-obuchenie': 'korporativnoe-obuchenie.html',
	contacts: 'contacts.html',
	order: 'order.html',
	events: 'events.html',
	photo: 'photo.html',
};

function mapUrl(pathname) {
	const clean = pathname.replace(/^\/+|\/+$/g, '');
	if (!clean) return 'index.html';
	if (ROUTE_MAP[clean]) return ROUTE_MAP[clean];
	// подстраницы языков → запись
	if (clean.startsWith('kursy-dlya-vzroslyh/')) return 'order.html';
	if (clean.startsWith('kursy-dlya-detej/')) return KIDS_SITE;
	return 'index.html';
}

function transform(html) {
	let out = html;

	out = out.replace(
		/https:\/\/firstuk\.school\/assets\/css\/index\.min\.css/g,
		'assets/css/index.min.css',
	);
	out = out.replace(
		/https:\/\/firstuk\.school\/assets\/js\/index\.min\.js/g,
		'assets/js/index.min.js',
	);
	out = out.replace(
		/https:\/\/firstuk\.school\/assets\/icons\/[^"']+/g,
		'assets/icons/favicon.png',
	);

	out = out.replace(/href="https:\/\/firstuk\.school"/g, 'href="index.html"');
	out = out.replace(/<script src="https:\/\/polyfill\.io[^<]+<\/script>\s*/g, '');
	out = out.replace(/lang="ru-RU"/g, 'lang="ru"');
	out = out.replace(/First UK school/gi, 'Fluent Self');
	out = out.replace(/First UK School/gi, 'Fluent Self');
	out = out.replace(/сотруников/g, 'сотрудников');
	out = out.replace(/viewbox=/gi, 'viewBox=');

	out = out.replace(/https:\/\/firstuk\.school\/(?!media\/)([a-z0-9\-/]*)/gi, (_, p) => mapUrl(p));

	out = out.replace(/\(c\) Fluent Self/g, '(c) Fluent Self');
	out = out.replace(
		/Языковая школа для современных людей/g,
		'Школа иностранных языков для взрослых',
	);
	out = out.replace(
		/og:site_name" content="Языковая школа"/g,
		'og:site_name" content="Fluent Self"',
	);
	out = out.replace(/<meta property="og:url" content="[^"]*">/g, '');
	out = out.replace(/https:\/\/www\.instagram\.com\/firstukschool\//g, '#');
	out = out.replace(/https:\/\/www\.facebook\.com\/FukschoolMoscow\//g, '#');
	out = out.replace(/<script src="https:\/\/maps\.googleapis\.com[^<]+<\/script>\s*/g, '');

	out = out.replace(
		/Site by <a[^>]+>Redo<\/a>/g,
		'<a href="' + KIDS_SITE + '" class="link link-green">Fluent Self kids</a>',
	);
	out = out.replace(/ООО «Ферст Юкей Скул»<br \/>\s*ИНН 9705063172/g, 'ИП — данные уточняются');

	out = out.replace(
		/<a href="kursy-dlya-detej\.html"/g,
		`<a href="${KIDS_SITE}" target="_blank" rel="noopener"`,
	);

	out = out.replace(
		/<form action="order" data-behavior="order">/g,
		'<form action="order.html" data-behavior="order" data-site-form="trial">',
	);

	out = out.replace(/<script src="https:\/\/polyfill\.io[^<]+<\/script>\s*/g, '');

	if (!out.includes('css/site.css')) {
		out = out.replace(
			/(<link href="assets\/css\/index\.min\.css" rel="stylesheet">)/,
			'$1\n  <link href="css/site.css" rel="stylesheet">',
		);
	}

	if (!out.includes('id="logo"')) {
		out = out.replace(
			/(<script src="https:\/\/cdn\.jsdelivr\.net\/combine)/,
			`${SPRITE}\n  <script src="js/config.js"></script>\n  <script src="js/telegram.js"></script>\n  <script src="js/site.js"></script>\n  $1`,
		);
	}

	if (!out.includes('href="index.html"><div class="main-logo"')) {
		out = out.replace(
			/<div class="col-6 text-reset">\s*\n?\s*<div class="main-logo">/,
			'<div class="col-6 text-reset"><a href="index.html"><div class="main-logo">',
		);
		out = out.replace(
			/(<div class="main-logo">\s*<svg viewbox="0 0 220 20">\s*<use xlink:href="#logo"><\/use>\s*<\/svg>\s*<\/div>)(\s*\n?\s*<\/a>)?(\s*\n?\s*<\/div>\s*\n?\s*<div class="col-6 sm:hidden">)/,
			'$1</a>$3',
		);
	}

	return out;
}

for (const [src, dest] of PAGES) {
	const srcPath = path.join(ROOT, src);
	if (!fs.existsSync(srcPath)) {
		console.warn('skip', src);
		continue;
	}
	const html = transform(fs.readFileSync(srcPath, 'utf8'));
	fs.writeFileSync(path.join(ROOT, dest), html, 'utf8');
	console.log('  →', dest);
}

// CSS: font paths
const cssPath = path.join(ROOT, 'assets/css/index.min.css');
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(/url\(\/assets\/fonts\//g, 'url(../fonts/');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('  → assets/css/index.min.css (fonts patched)');

console.log('Done.');
