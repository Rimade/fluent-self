/**
 * Патч всех HTML-страниц: бренд, SEO-заготовки, a11y, контакты
 * node scripts/modernize-html.js
 */
const fs = require('fs');
const path = require('path');

const { listSiteHtml } = require('./lib/pages');

const ROOT = path.join(__dirname, '..');
const KIDS = 'https://medcapital.school';

const PAGES = listSiteHtml(ROOT);

function patch(html, filename) {
	let out = html;

	out = out.replace(/lang="ru-RU"/g, 'lang="ru"');
	out = out.replace(/<meta http-equiv="X-UA-Compatible"[^>]*>\s*/g, '');
	out = out.replace(/<!--\[if lt IE 9\]>[\s\S]*?<!\[endif\]-->\s*/g, '');
	out = out.replace(
		/<!-- Add preloading fonts files -->[\s\S]*?<link rel="preload" href=""[^>]*>\s*/g,
		'',
	);
	out = out.replace(
		/<!--<script type="text\/javascript" src="https:\/\/w842110\.yclients\.com[^]*?<\/script>-->\s*/g,
		'',
	);
	out = out.replace(/\s*<\/script>-->/g, '');
	out = out.replace(/<!--КНОПКА Wharsapp-->/g, '<!-- WhatsApp -->');
	out = out.replace(/<!--конец КНОПКА Wharsapp-->/g, '');

	if (!out.includes('site.css')) {
		out = out.replace(
			/(<link href="assets\/css\/index\.min\.css" rel="stylesheet">)/,
			'$1\n  <link href="css/site.css" rel="stylesheet">',
		);
	}

	if (!out.includes('brand.css')) {
		out = out.replace(
			/(<link href="css\/site\.css" rel="stylesheet">)/,
			'$1\n  <link href="css/brand.css" rel="stylesheet">',
		);
	}

	const fontPreconnect =
		'  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
		'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
		'  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">\n';

	if (!out.includes('fonts.googleapis.com')) {
		out = out.replace(/(<link href="[^"]*brand\.css" rel="stylesheet">)/, fontPreconnect + '$1');
	} else {
		out = out.replace(
			/href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+"/g,
			'href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"',
		);
	}

	if (!out.includes('skip-link')) {
		out = out.replace(
			/<body>/,
			'<body>\n  <a href="#main-content" class="skip-link">Перейти к содержимому</a>',
		);
	}

	out = out.replace(/<div data-menu-page>/g, '<div id="main-content" data-menu-page>');

	out = out.replace(/href="https:\/\/firstuk\.school"/g, 'href="index.html"');
	out = out.replace(/viewbox=/gi, 'viewBox=');

	out = out.replace(/First UK school/gi, 'Fluent Self');
	out = out.replace(/First UK School/gi, 'Fluent Self');
	out = out.replace(/директора школы Залину/gi, 'команду школы');
	out = out.replace(/Залине/g, 'нам');
	out = out.replace(/сотруников/g, 'сотрудников');
	out = out.replace(/преложить/g, 'предложить');
	out = out.replace(/Выберете/g, 'Выберите');
	out = out.replace(/Анлийский/g, 'Английский');

	if (filename === 'index.html') {
		out = out.replace(
			/href="kursy-dlya-detej\.html"/g,
			`href="${KIDS}" target="_blank" rel="noopener"`,
		);
	}

	out = out.replace(
		/<div class="map" data-behavior="gmap"[^>]*>\s*<\/div>/,
		'<div class="map" data-site-map aria-label="Карта проезда"></div>',
	);

	out = out.replace(
		/<input type="text" name="email"/g,
		'<input type="email" name="email" autocomplete="email" required',
	);
	out = out.replace(
		/<input type="text" name="phone"/g,
		'<input type="tel" name="phone" autocomplete="tel" required',
	);
	out = out.replace(
		/<input type="text" name="name"/g,
		'<input type="text" name="name" autocomplete="name" required minlength="2"',
	);

	out = out.replace(
		/<button class="button button-fill ff-graphik tracking-wide">/g,
		'<button type="submit" class="button button-fill ff-graphik tracking-wide">',
	);

	out = out.replace(
		/<link rel="icon" type="image\/png" href="assets\/icons\/favicon\.png" sizes="32x32">/,
		'<link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">',
	);
	out = out.replace(/<link rel="apple-touch-icon" href="assets\/icons\/favicon\.png">/g, '');

	if (!out.includes('js/telegram.js')) {
		out = out.replace(
			/<script src="js\/config\.js"><\/script>/,
			'<script src="js/config.js"></script>\n  <script src="js/telegram.js"></script>',
		);
	}

	if (!out.includes('js/ui.js') && out.includes('js/site.js')) {
		out = out.replace(
			/<script src="js\/site\.js"><\/script>/,
			'<script src="js/site.js"></script>\n  <script src="js/ui.js"></script>',
		);
	}

	if (!out.includes('js/content.js')) {
		out = out.replace(
			/<script src="js\/config\.js"><\/script>/,
			'<script src="js/config.js"></script>\n  <script src="js/content.js"></script>',
		);
	}

	out = out.replace(
		/Москва, Мосфильмовская, дом 88, корп\. 4 ст3 м\. Раменки/g,
		'<span data-site-address>г. Москва, ул. Примерная, д. 1</span>',
	);

	out = out.replace(
		/каждый день с 10:00 - 20:00/g,
		'<span data-site-hours>каждый день с 10:00 - 20:00</span>',
	);

	out = out.replace(
		/ИП — данные уточняются/g,
		'<span data-site-legal>ИП — данные уточняются</span>',
	);

	out = out.replace(/© Fluent Self, \d{4}/g, '<span data-site-year>© Fluent Self, 2026</span>');

	out = out.replace(
		/https:\/\/firstuk\.school\/media\/[^)"']+/g,
		'assets/brand/fluent-self-cover.png',
	);
	out = out.replace(
		/Залина Баширова,\s*<br>\s*директор школы Fisrt UK/gi,
		'Команда Fluent Self,<br>руководство школы',
	);
	out = out.replace(/директора школы Залину/gi, 'команду школы');

	return out;
}

for (const rel of PAGES) {
	const p = path.join(ROOT, rel);
	const next = patch(fs.readFileSync(p, 'utf8'), path.basename(rel));
	fs.writeFileSync(p, next, 'utf8');
	console.log('  patched', rel);
}

console.log('Done.');
