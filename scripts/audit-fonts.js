/**
 * Аудит: нет ли GraphikLC / Times New Roman в рабочих CSS (вне комментариев).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const files = ['assets/css/index.min.css', 'css/brand.css', 'css/site.css'];

function stripComments(css) {
	return css.replace(/\/\*[\s\S]*?\*\//g, ' ');
}

const bad = [/GraphikLC/gi, /Times New Roman/gi];

let failed = false;
for (const rel of files) {
	const full = path.join(root, rel);
	if (!fs.existsSync(full)) {
		console.log('MISSING', rel);
		failed = true;
		continue;
	}
	const raw = fs.readFileSync(full, 'utf8');
	const css = stripComments(raw);
	const hits = [];
	for (const re of bad) {
		const m = css.match(re);
		if (m) hits.push({ pattern: String(re), count: m.length });
	}
	const families = [...new Set((css.match(/font-family:[^;}{]+/g) || []).map((s) => s.trim()))];
	console.log('\n==', rel, '==');
	if (hits.length) {
		failed = true;
		console.log('BAD:', hits);
	} else {
		console.log('OK: no GraphikLC / Times New Roman');
	}
	console.log('font-family samples:', families.slice(0, 25));
}

console.log(failed ? '\nFAIL' : '\nPASS');
process.exit(failed ? 1 : 0);
