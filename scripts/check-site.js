/**
 * Быстрая проверка всех страниц (HTML + опционально Playwright).
 * node scripts/check-site.js
 * node scripts/check-site.js --browser
 */
const fs = require('fs');
const path = require('path');

const { listSiteHtml, seoKey, pageCanonical } = require('./lib/pages');

const ROOT = path.join(__dirname, '..');
const BASE = process.env.SITE_URL || 'http://localhost:3456';
const useBrowser = process.argv.includes('--browser');

const PAGES = listSiteHtml(ROOT);

async function fetchText(url) {
	const res = await fetch(url, { redirect: 'follow' });
	const text = await res.text();
	return { status: res.status, text, url: res.url };
}

async function checkHtml() {
	console.log('\n=== HTML structure ===\n');
	const issues = [];

	for (const page of PAGES) {
		const { status, text } = await fetchText(`${BASE}/${page}`);
		const usesPartials = text.includes('id="site-chrome"');
		const row = {
			page,
			status,
			partials: usesPartials,
			layout: text.includes('layout.js'),
			content: text.includes('content.js'),
			footerSlot: text.includes('id="site-footer"'),
			firstuk: /firstuk\.school/i.test(text),
			brokenPending: text.includes('partials-pending') && !usesPartials,
		};
		console.log(
			`${row.status === 200 ? '✓' : '✗'} ${page} | partials:${row.partials} content:${row.content} firstuk:${row.firstuk}`,
		);
		if (row.status !== 200) issues.push(`${page}: HTTP ${row.status}`);
		if (row.firstuk) issues.push(`${page}: contains firstuk.school`);
		if (row.brokenPending) issues.push(`${page}: partials-pending without site-chrome`);
		if (usesPartials && !row.layout) issues.push(`${page}: missing layout.js`);
		if (seoKey(page) !== 'privacy.html' && !row.content) issues.push(`${page}: missing content.js`);
	}

	return issues;
}

async function checkBrowser() {
	let playwright;
	try {
		playwright = require('playwright');
	} catch {
		console.log('\n=== Browser (skipped: playwright not installed) ===\n');
		return [];
	}

	console.log('\n=== Browser runtime ===\n');
	const browser = await playwright.chromium.launch();
	const page = await browser.newPage();
	const issues = [];
	const consoleErrors = [];

	page.on('console', (msg) => {
		if (msg.type() === 'error') consoleErrors.push(msg.text());
	});
	page.on('pageerror', (err) => consoleErrors.push(err.message));

	const checks = {
		'index.html': async () => {
			const n = await page.locator('[data-site-reviews] .fs-review-card').count();
			if (n < 5) issues.push(`index: expected >=5 review cards, got ${n}`);
			if (!(await page.locator('[data-reviews-track]').count()))
				issues.push('index: missing reviews track');
			if (!(await page.locator('.fs-hero-title').count())) issues.push('index: missing hero title');
			if (!(await page.locator('.fs-pillars').count())) issues.push('index: missing pillars');
		},
		'events.html': async () => {
			if (!(await page.locator('.fs-events-upcoming').count()))
				issues.push('events: missing upcoming block');
		},
		'order.html': async () => {
			const opts = await page.locator('[data-site-form-courses] select option').count();
			if (opts < 5) issues.push(`order: expected course options, got ${opts}`);
		},
		'kursy-dlya-detej.html': async () => {
			if (!(await page.locator('.fs-kids-notice').count()))
				issues.push('kids page: missing notice');
		},
		'privacy.html': async () => {
			const opacity = await page.evaluate(() => getComputedStyle(document.body).opacity);
			if (opacity === '0') issues.push('privacy: body opacity 0');
		},
	};

	for (const file of PAGES) {
		consoleErrors.length = 0;
		const url = `${BASE}/${file}`;
		await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });

		const common = await page.evaluate(() => ({
			partialsReady: document.documentElement.classList.contains('partials-ready'),
			menu: !!document.querySelector('[data-behavior="menu"]'),
			footer: !!document.querySelector('footer'),
			title: document.title,
			path: location.pathname,
		}));

		const usesPartials = seoKey(file) !== 'privacy.html';
		const ok =
			common.title.length > 5 &&
			(!usesPartials || (common.menu && common.footer && common.partialsReady));

		console.log(
			`${ok ? '✓' : '✗'} ${file} | title: "${common.title.slice(0, 50)}" | menu:${common.menu} footer:${common.footer}`,
		);

		if (usesPartials && !common.menu) issues.push(`${file}: menu not loaded`);
		if (usesPartials && !common.footer) issues.push(`${file}: footer not loaded`);
		if (usesPartials && !common.partialsReady) issues.push(`${file}: partials-ready class missing`);

		if (checks[seoKey(file)]) await checks[seoKey(file)]();

		for (const err of consoleErrors) {
			if (!err.includes('favicon')) issues.push(`${file} console: ${err.slice(0, 120)}`);
		}
	}

	await browser.close();
	return issues;
}

(async () => {
	const all = [...(await checkHtml())];
	if (useBrowser) all.push(...(await checkBrowser()));

	console.log('\n=== Summary ===\n');
	if (!all.length) {
		console.log('All checks passed.');
		process.exit(0);
	}
	all.forEach((i) => console.log('✗', i));
	process.exit(1);
})();
