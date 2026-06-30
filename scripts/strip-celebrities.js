const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'index.html');
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
const start = lines.findIndex((l) => l.includes('sm:hidden border-Y py-75'));
const end = lines.findIndex((l, i) => i > start && l.trim() === '<div class="pt-70">');
if (start < 0 || end < 0) {
	console.error('markers not found', start, end);
	process.exit(1);
}
lines.splice(start, end - start);
fs.writeFileSync(file, lines.join('\n'));
console.log('removed celebrity block, lines', start + 1, '–', end);
