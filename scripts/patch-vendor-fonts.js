/**
 * Заменяет legacy Times New Roman / GraphikLC в assets/css/index.min.css
 * на Source Sans 3 / Cormorant Garamond.
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'assets', 'css', 'index.min.css');
let css = fs.readFileSync(file, 'utf8');

const before = {
	graphik: (css.match(/GraphikLC-Medium/g) || []).length,
	times: (css.match(/Times New Roman/g) || []).length,
};

css = css.replace(
	/font-family:GraphikLC-Medium/g,
	"font-family:'Source Sans 3',system-ui,sans-serif",
);

css = css.replace(
	/\.ff-italic\{font-family:'Times New Roman', Times, serif\}/g,
	".ff-italic{font-family:'Cormorant Garamond',Georgia,serif}",
);

css = css.replace(
	/\.ff-main,body,html\{font-family:'Times New Roman', Times, serif\}/g,
	".ff-main,body,html{font-family:'Source Sans 3',system-ui,sans-serif}",
);

// Остальные явные Times (если есть) → Source Sans
css = css.replace(
	/font-family:'Times New Roman', Times, serif/g,
	"font-family:'Source Sans 3',system-ui,sans-serif",
);

// Убираем мёртвые @font-face legacy (в т.ч. после rename family → Source Sans, но src ещё Graphik)
css = css.replace(/@font-face\{font-family:'Times New Roman', Times, serif;[^}]*\}/g, '');
css = css.replace(/@font-face\{font-family:GraphikLC-Medium;[^}]*\}/g, '');
css = css.replace(/@font-face\{[^}]*GraphikLC[^}]*\}/g, '');

const after = {
	graphik: (css.match(/GraphikLC/g) || []).length,
	times: (css.match(/Times New Roman/g) || []).length,
	sourceSans: (css.match(/Source Sans 3/g) || []).length,
	cormorant: (css.match(/Cormorant Garamond/g) || []).length,
};

fs.writeFileSync(file, css);
console.log('Patched', path.relative(path.join(__dirname, '..'), file));
console.log({ before, after });
