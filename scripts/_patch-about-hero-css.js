const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'css', 'brand.css');
let text = fs.readFileSync(file, 'utf8');
const start = text.indexOf('/* ——— About ——— */');
const end = text.indexOf('.fs-about-story {', start);
if (start < 0 || end < 0) throw new Error('markers not found ' + start + ' ' + end);

const neu = `/* ——— About ——— */

.fs-about-hero {
  position: relative;
  min-height: clamp(32rem, 88vh, 46rem);
  padding: calc(var(--fs-header-h) + clamp(1.5rem, 4vw, 2.5rem)) 0 clamp(2rem, 5vw, 3rem);
  overflow: hidden;
  color: #f7f4ef;
  border-bottom: 1px solid var(--fs-line);
}

.fs-about-hero__visual {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.fs-about-hero__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% 40%;
  filter: saturate(0.88) contrast(1.04);
  transform: scale(1.05);
  animation: fs-about-hero-ken 20s ease-in-out infinite alternate;
}

.fs-about-hero__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      105deg,
      rgba(36, 35, 33, 0.88) 0%,
      rgba(36, 35, 33, 0.72) 34%,
      rgba(36, 35, 33, 0.28) 58%,
      rgba(36, 35, 33, 0.12) 100%
    ),
    linear-gradient(180deg, rgba(36, 35, 33, 0.35) 0%, transparent 28%, rgba(36, 35, 33, 0.45) 100%);
  pointer-events: none;
}

.fs-about-hero__grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0.16;
  background-image: radial-gradient(rgba(253, 252, 251, 0.45) 0.55px, transparent 0.55px);
  background-size: 3px 3px;
  pointer-events: none;
  mix-blend-mode: soft-light;
}

.fs-about-hero__inner {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: calc(clamp(32rem, 88vh, 46rem) - var(--fs-header-h) - clamp(3.5rem, 9vw, 5.5rem));
}

.fs-about-hero__copy {
  max-width: 34rem;
}

.fs-about-hero__copy > * {
  animation: fs-about-rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.fs-about-hero__eyebrow {
  margin: 0 0 0.85rem;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(247, 244, 239, 0.72);
  animation-delay: 0.05s;
}

.fs-about-hero__brand {
  margin: 0;
  font-size: clamp(3.1rem, 10vw, 6rem);
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 0.92;
  color: #fdfcfb;
  text-shadow: 0 2px 28px rgba(0, 0, 0, 0.22);
  animation-delay: 0.12s;
}

.fs-about-hero__title {
  margin: 0.85rem 0 0;
  max-width: 16ch;
  font-size: clamp(1.35rem, 3.2vw, 1.9rem);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.01em;
  line-height: 1.25;
  color: rgba(247, 244, 239, 0.88);
  animation-delay: 0.2s;
}

.fs-about-hero__lead {
  margin: 1.2rem 0 0;
  max-width: 30em;
  font-size: clamp(15px, 2vw, 17px);
  line-height: 1.65;
  color: rgba(247, 244, 239, 0.86);
  animation-delay: 0.28s;
}

.fs-about-hero__meta {
  margin: 1.1rem 0 0;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(181, 200, 194, 0.95);
  animation-delay: 0.34s;
}

.fs-about-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.65rem;
  animation-delay: 0.4s;
}

.fs-about-hero .fs-hero-cta__btn--ghost {
  background: rgba(253, 252, 251, 0.08);
  border-color: rgba(253, 252, 251, 0.55);
  color: #fdfcfb;
  backdrop-filter: blur(4px);
}

.no-touch .fs-about-hero .fs-hero-cta__btn--ghost:hover {
  background: rgba(253, 252, 251, 0.16);
  border-color: #fdfcfb;
  color: #fdfcfb;
}

.fs-about-hero__switch {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.75rem;
  margin-top: 1.85rem;
  padding-top: 1.15rem;
  border-top: 1px solid rgba(253, 252, 251, 0.22);
  font-size: 14px;
  color: rgba(247, 244, 239, 0.65);
  animation: fs-about-rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.48s both;
}

.fs-about-hero__switch a {
  color: rgba(253, 252, 251, 0.92);
  text-decoration: none;
  font-style: italic;
  transition: color 0.2s ease;
}

.fs-about-hero__switch a:hover {
  color: #fff;
}

@keyframes fs-about-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fs-about-hero-ken {
  from {
    transform: scale(1.05) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.1) translate3d(-1.4%, 0.8%, 0);
  }
}

`;

fs.writeFileSync(file, text.slice(0, start) + neu + text.slice(end));
console.log('patched about hero css');
