const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'css', 'brand.css');
let text = fs.readFileSync(file, 'utf8');
const start = text.indexOf('/* ——— Contacts ——— */');
const end = text.indexOf('.fs-kids-banner {', start);
if (start < 0 || end < 0) throw new Error('markers not found ' + start + ' ' + end);

const neu = `/* ——— Contacts ——— */

.fs-contacts-hero {
  position: relative;
  padding: calc(var(--fs-header-h) + clamp(1.75rem, 4vw, 2.75rem)) 0 clamp(1.5rem, 3.5vw, 2.25rem);
  background:
    radial-gradient(ellipse 50% 40% at 0% 0%, rgba(90, 127, 118, 0.12), transparent 55%),
    var(--fs-surface);
  border-bottom: 1px solid var(--fs-line);
}

.fs-contacts-hero__grid {
  display: grid;
  gap: 1.5rem 2.5rem;
  align-items: end;
}

@media (min-width: 800px) {
  .fs-contacts-hero__grid {
    grid-template-columns: 1.4fr 0.8fr;
  }
}

.fs-contacts-hero__eyebrow {
  margin: 0 0 0.65rem;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fs-primary-dark);
}

.fs-contacts-hero__title {
  margin: 0;
  font-size: clamp(2.2rem, 6vw, 3.75rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.05;
  color: var(--fs-ink);
}

.fs-contacts-hero__lead {
  margin: 0.85rem 0 0;
  max-width: 32em;
  font-size: clamp(15px, 2vw, 17px);
  line-height: 1.55;
  color: var(--fs-muted);
}

.fs-contacts-hero__quick {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-top: 0.25rem;
}

@media (min-width: 800px) {
  .fs-contacts-hero__quick {
    align-items: flex-end;
    text-align: right;
    border-left: 1px solid var(--fs-line);
    padding-left: 1.75rem;
  }
}

.fs-contacts-hero__phone {
  font-size: clamp(1.15rem, 2.2vw, 1.4rem);
  letter-spacing: 0.02em;
  color: var(--fs-ink);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.fs-contacts-hero__phone:hover {
  color: var(--fs-primary);
  border-color: rgba(90, 127, 118, 0.35);
}

.fs-contacts-hero__hours,
.fs-contacts-hero__metro {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--fs-muted);
}

.fs-contacts-hero__metro {
  font-style: italic;
}

.fs-contacts-map-block {
  padding: 0;
  border-bottom: 1px solid var(--fs-line);
}

.fs-contacts-map {
  position: relative;
  width: 100%;
  height: clamp(18rem, 48vw, 26rem);
  overflow: hidden;
  background: var(--fs-surface-alt);
}

.fs-contacts-map iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  filter: grayscale(0.15) contrast(1.02);
}

.fs-contacts-map__empty {
  margin: 0;
  padding: 2rem;
  color: var(--fs-muted);
  font-style: italic;
}

.fs-contacts-facts {
  padding: clamp(1.75rem, 4vw, 2.75rem) 0;
  border-bottom: 1px solid var(--fs-line);
}

.fs-contacts-facts__grid {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--fs-line);
  margin-bottom: 1.5rem;
}

@media (min-width: 700px) {
  .fs-contacts-facts__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.fs-contacts-fact {
  padding: clamp(1.15rem, 2.5vw, 1.5rem) clamp(0.85rem, 2vw, 1.25rem);
  border-bottom: 1px solid var(--fs-line);
}

@media (min-width: 700px) {
  .fs-contacts-fact {
    border-bottom: none;
  }

  .fs-contacts-fact:not(:last-child) {
    border-right: 1px solid var(--fs-line);
  }
}

.fs-contacts-fact__label {
  margin: 0 0 0.45rem;
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fs-muted);
}

.fs-contacts-fact__value {
  margin: 0;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.4;
  color: var(--fs-ink);
}

.fs-contacts-fact__link {
  display: inline-block;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  line-height: 1.3;
  color: var(--fs-ink);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.fs-contacts-fact__link:hover {
  color: var(--fs-primary);
  border-color: rgba(90, 127, 118, 0.35);
}

.fs-contacts-fact__sub {
  display: block;
  margin-top: 0.4rem;
  font-size: 13px;
  color: var(--fs-muted);
  text-decoration: none;
}

.fs-contacts-fact__sub:hover {
  color: var(--fs-primary);
}

.fs-contacts-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem 0.85rem;
}

.fs-contacts-maps-link {
  margin-left: 0.15rem;
  font-size: 13px;
  font-style: italic;
  color: var(--fs-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--fs-line);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.fs-contacts-maps-link:hover {
  color: var(--fs-primary);
  border-color: var(--fs-primary);
}

.fs-contacts-directions {
  padding: var(--fs-section-y) 0;
}

.fs-contacts-section-head {
  margin-bottom: clamp(1.25rem, 3vw, 1.75rem);
  max-width: 28em;
}

.fs-contacts-section-head__eyebrow {
  margin: 0 0 0.45rem;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fs-primary-dark);
}

.fs-contacts-section-head__title {
  margin: 0;
  font-size: clamp(1.45rem, 3vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  line-height: 1.12;
  color: var(--fs-ink);
}

.fs-contacts-directions__grid {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--fs-line);
  border-bottom: 1px solid var(--fs-line);
}

@media (min-width: 768px) {
  .fs-contacts-directions__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.fs-contacts-way {
  padding: clamp(1.5rem, 3.5vw, 2rem) clamp(1rem, 2.5vw, 1.75rem);
  border-bottom: 1px solid var(--fs-line);
  background: #fdfcfb;
}

@media (min-width: 768px) {
  .fs-contacts-way {
    border-bottom: none;
  }

  .fs-contacts-way:not(:last-child) {
    border-right: 1px solid var(--fs-line);
  }
}

.fs-contacts-way__num {
  display: block;
  margin-bottom: 0.85rem;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--fs-primary-dark);
}

.fs-contacts-way__title {
  margin: 0 0 0.55rem;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fs-ink);
}

.fs-contacts-way__text {
  margin: 0;
  max-width: 34em;
  font-size: 15px;
  line-height: 1.6;
  color: var(--fs-muted);
}

.fs-contacts-outro {
  padding: var(--fs-section-y) 0;
  background: var(--fs-surface-alt);
  border-top: 1px solid var(--fs-line);
}

.fs-contacts-outro__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem 2rem;
}

.fs-contacts-outro__copy {
  max-width: 32em;
}

.fs-contacts-outro__label {
  margin: 0 0 0.55rem;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fs-primary-dark);
}

.fs-contacts-outro__title {
  margin: 0;
  font-size: clamp(1.4rem, 3.2vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.15;
  color: var(--fs-ink);
}

.fs-contacts-outro__text {
  margin: 0.7rem 0 0;
  font-size: 15px;
  line-height: 1.55;
  color: var(--fs-muted);
}

.fs-contacts-outro__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

`;

fs.writeFileSync(file, text.slice(0, start) + neu + text.slice(end));
console.log('patched contacts css');
