/**
 * Список HTML-страниц сайта (index + pages/*).
 */
const fs = require('fs');
const path = require('path');

function listSiteHtml(root = path.join(__dirname, '..')) {
	const files = ['index.html'];
	const pagesDir = path.join(root, 'pages');
	if (fs.existsSync(pagesDir)) {
		for (const f of fs
			.readdirSync(pagesDir)
			.filter((x) => x.endsWith('.html') && !x.startsWith('_ref'))) {
			files.push(`pages/${f}`);
		}
	}
	return files.sort();
}

function seoKey(filePath) {
	return path.basename(filePath);
}

function pageCanonical(base, filePath) {
	const baseUrl = base.replace(/\/$/, '');
	if (seoKey(filePath) === 'index.html' && !filePath.includes('pages/')) {
		return `${baseUrl}/`;
	}
	return `${baseUrl}/${filePath.replace(/\\/g, '/')}`;
}

module.exports = { listSiteHtml, seoKey, pageCanonical };
