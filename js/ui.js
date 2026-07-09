/**
 * Fluent Self — UI-компоненты
 */
(function () {
	function bootUi() {
		runUi();
	}

	if (document.getElementById('site-chrome')) {
		document.addEventListener('partials:ready', bootUi);
	} else {
		bootUi();
	}

	function runUi() {
		initAdultHero();
		initHeroCta();
		purgeCelebrities();
		replaceFirstukMedia();
		injectPillarsSection();
		injectKidsBanner();
		renderOffersSection();
		renderAdultCoursesPage();
		renderPhotosPage();
		initFsHeader();
		injectPageCta();
		initKidsPageNotice();
		renderReviews();
		renderEventsPage();
		populateTrialCourses();
		updateThemeColor();
	}

	function initAdultHero() {
		const hero = document.querySelector('.home-hero');
		const typeitHost = hero?.querySelector('[data-behavior="typeit"]');
		if (!hero || !typeitHost || hero.querySelector('.fs-hero-title')) return;

		const title = document.createElement('h1');
		title.className = 'fs-hero-title fz-xl-vw uppercase';
		title.textContent = 'Школа иностранных языков';

		const subtitle = document.createElement('p');
		subtitle.className = 'fs-hero-subtitle';
		subtitle.textContent = 'Спокойная атмосфера, живое общение и программы для взрослых';

		typeitHost.before(title);
		title.after(subtitle);
	}

	function pageHref(file) {
		return window.FS_PATHS?.page(file) || file;
	}

	function initHeroCta() {
		const hero = document.querySelector('.home-hero');
		const typeitHost = hero?.querySelector('[data-behavior="typeit"]');
		if (!hero || !typeitHost || hero.querySelector('.fs-hero-cta')) return;

		const wrap = document.createElement('div');
		wrap.className = 'fs-hero-cta';
		wrap.innerHTML =
			'<a href="' +
			pageHref('order.html') +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Бесплатный пробный урок</a>' +
			'<a href="' +
			pageHref('kursy-dlya-vzroslyh.html') +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--outline ff-graphik tracking-wide">Смотреть курсы</a>' +
			'<p class="fs-hero-cta__note">Группы до 6 человек · носители языка · удобный график</p>';
		typeitHost.parentElement?.appendChild(wrap);
	}

	function purgeCelebrities() {
		document.querySelectorAll('[data-behavior="studentSwiper"]').forEach((el) => {
			el.closest('.border-Y')?.remove();
		});
		document.querySelector('.scrolling-box.--top')?.remove();
	}

	function replaceFirstukMedia() {
		const cover = (window.SITE_CONFIG || {}).brandCover || '/assets/brand/fluent-self-cover.png';
		document.querySelectorAll('img[src*="firstuk"]').forEach((img) => {
			img.src = cover;
			img.alt = 'Fluent Self — атмосфера школы';
			img.loading = 'lazy';
		});
		document.querySelectorAll('.page-cover, .ralax').forEach((el) => {
			if (el.style.backgroundImage?.includes('firstuk')) {
				el.setAttribute('data-site-brand-cover', '');
				el.style.backgroundImage = `url(${cover})`;
			}
		});
	}

	function injectPillarsSection() {
		if (document.querySelector('.fs-pillars')) return;
		const hero = document.querySelector('.home-hero');
		if (!hero) return;

		const pillars = [
			{
				title: 'Коммуникативный подход',
				text: 'Говорим с первого занятия — без зубрёжки правил в отрыве от живой речи.',
			},
			{
				title: 'Группы до 6 человек',
				text: 'Преподаватель успевает уделить внимание каждому и подстроить темп.',
			},
			{
				title: 'Носители языка',
				text: 'Погружение в среду помогает преодолеть барьер и улучшить произношение.',
			},
			{
				title: 'Пробный урок бесплатно',
				text: 'Познакомьтесь со школой и форматом занятий без обязательств.',
			},
		];

		const section = document.createElement('section');
		section.className = 'fs-pillars';
		section.setAttribute('aria-labelledby', 'fs-pillars-title');
		section.innerHTML =
			'<div class="container">' +
			'<h2 id="fs-pillars-title" class="fs-section-title ff-graphik tracking-wide">Почему Fluent Self</h2>' +
			'<div class="fs-pillars__grid">' +
			pillars
				.map(
					(p, i) =>
						'<article class="fs-pillar"><span class="fs-pillar__num ff-graphik">0' +
						(i + 1) +
						'</span><h3 class="fs-pillar__title">' +
						p.title +
						'</h3><p class="fs-pillar__text">' +
						p.text +
						'</p></article>',
				)
				.join('') +
			'</div></div>';
		hero.insertAdjacentElement('afterend', section);
	}

	function renderOffersSection() {
		const host = document.querySelector('[data-site-offers]');
		const offers = window.SITE_CONTENT?.offers;
		if (!host || !offers?.length) return;

		const list = offers
			.map((o, i) => {
				const n = String(i + 1).padStart(2, '0');
				return (
					'<button type="button" class="fs-offers__item' +
					(i === 0 ? ' is-active' : '') +
					'" data-offer-index="' +
					i +
					'" aria-pressed="' +
					(i === 0 ? 'true' : 'false') +
					'">' +
					'<span class="fs-offers__item-num ff-graphik tracking-wide">' +
					n +
					'</span>' +
					'<span class="fs-offers__item-title">' +
					o.title +
					'</span>' +
					'<span class="fs-offers__item-mark" aria-hidden="true"></span>' +
					'</button>'
				);
			})
			.join('');

		const first = offers[0];
		host.className = 'fs-offers-wrap';
		host.innerHTML =
			'<section class="fs-offers" aria-labelledby="fs-offers-title">' +
			'<div class="container fs-offers__layout">' +
			'<div class="fs-offers__stage">' +
			'<p class="fs-offers__eyebrow ff-graphik tracking-wide">Что мы можем предложить</p>' +
			'<p class="fs-offers__index ff-graphik" data-offer-index-view>01</p>' +
			'<h2 id="fs-offers-title" class="fs-offers__title" data-offer-title>' +
			first.title +
			'</h2>' +
			'<p class="fs-offers__text" data-offer-text>' +
			first.text +
			'</p>' +
			'<a href="' +
			pageHref('order.html') +
			'" class="fs-offers__cta ff-graphik tracking-wide">Записаться на пробный</a>' +
			'</div>' +
			'<div class="fs-offers__list" role="listbox" aria-label="Преимущества школы">' +
			list +
			'</div></div></section>';

		const stageTitle = host.querySelector('[data-offer-title]');
		const stageText = host.querySelector('[data-offer-text]');
		const stageIndex = host.querySelector('[data-offer-index-view]');
		const items = host.querySelectorAll('.fs-offers__item');
		let current = 0;
		let autoTimer = null;
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const stage = host.querySelector('.fs-offers__stage');

		const setActive = (i) => {
			if (i === current) return;
			current = i;
			const o = offers[i];
			stage?.classList.remove('is-swap');
			void stage?.offsetWidth;
			stage?.classList.add('is-swap');
			stageTitle.textContent = o.title;
			stageText.textContent = o.text;
			stageIndex.textContent = String(i + 1).padStart(2, '0');
			items.forEach((btn, idx) => {
				const on = idx === i;
				btn.classList.toggle('is-active', on);
				btn.setAttribute('aria-pressed', on ? 'true' : 'false');
			});
		};

		const stopAuto = () => {
			if (autoTimer) {
				clearInterval(autoTimer);
				autoTimer = null;
			}
		};

		const restartAuto = () => {
			stopAuto();
			if (reduceMotion) return;
			autoTimer = window.setInterval(() => setActive((current + 1) % offers.length), 4200);
		};

		items.forEach((btn) => {
			btn.addEventListener('click', () => {
				setActive(Number(btn.dataset.offerIndex));
				stopAuto();
			});
			btn.addEventListener('mouseenter', () => {
				if (window.matchMedia('(hover: hover)').matches) {
					setActive(Number(btn.dataset.offerIndex));
					stopAuto();
				}
			});
		});

		host.addEventListener('mouseenter', stopAuto);
		host.addEventListener('mouseleave', restartAuto);
		restartAuto();
	}

	function injectKidsBanner() {
		if (document.querySelector('.fs-kids-banner')) return;
		if (document.querySelector('[data-menu-page][data-skip-kids-banner]')) return;
		const anchor =
			document.querySelector('.ralax[data-site-brand-cover]') ||
			document.querySelector('.courses-on-home') ||
			document.querySelector('.courses');
		if (!anchor) return;

		const kidsUrl = (window.SITE_CONFIG || {}).kidsSite || 'https://fluentselfkids.ru';
		const banner = document.createElement('aside');
		banner.className = 'fs-kids-banner';
		banner.innerHTML =
			'<div class="container"><div class="fs-kids-banner__inner"><div>' +
			'<p class="fs-kids-banner__label ff-graphik tracking-wide">Для детей 3–16 лет</p>' +
			'<h2 class="fs-kids-banner__title">Fluent Self kids</h2>' +
			'<p class="fs-kids-banner__text">Отдельный проект для детей и подростков — со своей методикой и расписанием.</p>' +
			'</div><a href="' +
			kidsUrl +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--outline ff-graphik tracking-wide" target="_blank" rel="noopener">Fluent Self kids</a></div></div>';
		anchor.insertAdjacentElement('afterend', banner);
	}

	function initFsHeader() {
		const header = document.querySelector('[data-fs-header]');
		if (!header) return;

		const main = document.querySelector('[data-menu-page]');
		const overlayPage = !!main?.querySelector('.page-cover, .fs-photo-hero');

		if (overlayPage) {
			header.classList.add('fs-header--overlay');
		} else if (main) {
			main.classList.add('fs-main--offset');
		}

		const syncHeight = () => {
			document.documentElement.style.setProperty('--fs-header-h', `${header.offsetHeight}px`);
		};
		syncHeight();
		window.addEventListener('resize', syncHeight, { passive: true });

		const onScroll = () => header.classList.toggle('fs-header--scrolled', window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		const mobile = header.querySelector('[data-fs-mobile-menu]');
		const openBtn = header.querySelector('[data-fs-menu-open]');

		const setMenuOpen = (open) => {
			header.classList.toggle('fs-header--menu-open', open);
			mobile?.classList.toggle('is-open', open);
			if (mobile) mobile.hidden = !open;
			openBtn?.setAttribute('aria-expanded', open ? 'true' : 'false');
			document.body.style.overflow = open ? 'hidden' : '';
		};

		openBtn?.addEventListener('click', () =>
			setMenuOpen(!header.classList.contains('fs-header--menu-open')),
		);
		mobile?.querySelectorAll('[data-fs-menu-close]').forEach((el) => {
			el.addEventListener('click', () => setMenuOpen(false));
		});

		document.addEventListener('keydown', (e) => {
			if (e.key !== 'Escape') return;
			setMenuOpen(false);
			header.querySelectorAll('.fs-nav-group.is-open').forEach((g) => {
				g.classList.remove('is-open');
				g.querySelector('[data-fs-nav-trigger]')?.setAttribute('aria-expanded', 'false');
			});
		});

		header.querySelectorAll('.fs-nav-group').forEach((group) => {
			const btn = group.querySelector('[data-fs-nav-trigger]');
			let closeTimer = null;

			const setOpen = (open) => {
				group.classList.toggle('is-open', open);
				btn?.setAttribute('aria-expanded', open ? 'true' : 'false');
			};

			const closeOthers = () => {
				header.querySelectorAll('.fs-nav-group.is-open').forEach((g) => {
					if (g === group) return;
					g.classList.remove('is-open');
					g.querySelector('[data-fs-nav-trigger]')?.setAttribute('aria-expanded', 'false');
				});
			};

			const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

			group.addEventListener('mouseenter', () => {
				if (!canHover()) return;
				clearTimeout(closeTimer);
				closeOthers();
				setOpen(true);
			});

			group.addEventListener('mouseleave', () => {
				if (!canHover()) return;
				closeTimer = setTimeout(() => setOpen(false), 220);
			});

			btn?.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				const open = group.classList.contains('is-open');
				closeOthers();
				setOpen(!open);
			});
		});

		document.addEventListener('click', (e) => {
			if (!e.target.closest('.fs-nav-group')) {
				header.querySelectorAll('.fs-nav-group.is-open').forEach((g) => {
					g.classList.remove('is-open');
					g.querySelector('[data-fs-nav-trigger]')?.setAttribute('aria-expanded', 'false');
				});
			}
		});

		const pageKey = (() => {
			let segment = location.pathname.split('/').filter(Boolean).pop();
			if (!segment) return 'index.html';
			return segment.includes('.') ? segment : `${segment}.html`;
		})();

		header.querySelectorAll('[data-nav-page]').forEach((link) => {
			if (link.getAttribute('data-nav-page') === pageKey) link.classList.add('is-active');
		});
	}

	function injectPageCta() {
		if (document.querySelector('.fs-page-cta')) return;
		if (document.querySelector('[data-menu-page][data-skip-page-cta]')) return;
		const main = document.querySelector('[data-menu-page]');
		const footerHost = main?.querySelector('#site-footer, footer');
		if (!main || !footerHost) return;

		const page = location.pathname.split('/').pop() || 'index.html';
		if (page === 'index.html' || page === 'order.html' || page === 'contacts.html') return;

		const cta = document.createElement('section');
		cta.className = 'fs-page-cta';
		cta.innerHTML =
			'<div class="container"><div class="fs-page-cta__inner"><div>' +
			'<p class="fs-page-cta__label ff-graphik tracking-wide">Первый шаг</p>' +
			'<h2 class="fs-page-cta__title">Запишитесь на бесплатный пробный урок</h2>' +
			'<p class="fs-page-cta__text">Познакомьтесь со школой, преподавателем и форматом занятий — без обязательств.</p></div>' +
			'<a href="' +
			pageHref('order.html') +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Записаться</a></div></div>';
		footerHost.insertAdjacentElement('beforebegin', cta);
	}

	function initKidsPageNotice() {
		if (!location.pathname.includes('kursy-dlya-detej')) return;
		const main = document.querySelector('[data-menu-page]');
		if (!main || main.querySelector('.fs-kids-notice')) return;

		const kidsUrl = (window.SITE_CONFIG || {}).kidsSite || 'https://fluentselfkids.ru';
		const notice = document.createElement('div');
		notice.className = 'fs-kids-notice';
		notice.innerHTML =
			'<div class="container"><p class="fs-kids-notice__text">' +
			'Детские программы ведутся на отдельном сайте <strong>Fluent Self kids</strong>. ' +
			'Ниже — краткий обзор; подробности, расписание и запись — там.</p>' +
			'<a href="' +
			kidsUrl +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--outline ff-graphik tracking-wide" target="_blank" rel="noopener">Fluent Self kids</a></div>';
		main.querySelector('.page-cover')?.insertAdjacentElement('afterend', notice);
	}

	function renderReviews() {
		const host = document.querySelector('[data-site-reviews]');
		const reviews = window.SITE_CONTENT?.reviews;
		if (!host || !reviews?.length) return;

		const card = (r, i) => {
			const initials = (r.name || '?')
				.split(/\s+/)
				.map((p) => p[0])
				.filter(Boolean)
				.slice(0, 2)
				.join('')
				.toUpperCase();
			return (
				'<article class="fs-review-card" data-review-index="' +
				i +
				'" tabindex="0">' +
				'<div class="fs-review-card__quote" aria-hidden="true">“</div>' +
				'<p class="fs-review-card__text">' +
				r.text +
				'</p>' +
				'<footer class="fs-review-card__foot">' +
				'<span class="fs-review-card__avatar" aria-hidden="true">' +
				initials +
				'</span>' +
				'<span class="fs-review-card__meta">' +
				'<span class="fs-review-card__name">' +
				r.name +
				'</span>' +
				(r.course
					? '<span class="fs-review-card__course ff-graphik tracking-wide">' + r.course + '</span>'
					: '') +
				'</span></footer></article>'
			);
		};

		const cards = reviews.map(card).join('');

		host.className = 'fs-reviews-wrap';
		host.innerHTML =
			'<section class="fs-reviews" aria-labelledby="fs-reviews-title">' +
			'<div class="container fs-reviews__head">' +
			'<div class="fs-reviews__intro">' +
			'<p class="fs-reviews__eyebrow ff-graphik tracking-wide">Голоса студентов</p>' +
			'<h2 id="fs-reviews-title" class="fs-reviews__title">Отзывы о нас</h2>' +
			'<p class="fs-reviews__lead">Коротко о том, как проходит обучение — без скриптов и шаблонных формулировок.</p>' +
			'</div>' +
			'<div class="fs-reviews__controls">' +
			'<button type="button" class="fs-reviews__nav" data-reviews-prev aria-label="Предыдущий отзыв">' +
			'<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M11 3L5 9l6 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>' +
			'</button>' +
			'<button type="button" class="fs-reviews__nav" data-reviews-next aria-label="Следующий отзыв">' +
			'<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M7 3l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>' +
			'</button>' +
			'</div></div>' +
			'<div class="fs-reviews__viewport" data-reviews-viewport>' +
			'<div class="fs-reviews__track" data-reviews-track>' +
			cards +
			'</div></div>' +
			'<div class="container fs-reviews__hint">' +
			'<span class="ff-graphik tracking-wide">Листайте в сторону · бесконечная лента</span>' +
			'</div></section>';

		initReviewsCarousel(host, reviews.length);
	}

	function initReviewsCarousel(host, count) {
		const viewport = host.querySelector('[data-reviews-viewport]');
		const track = host.querySelector('[data-reviews-track]');
		const prevBtn = host.querySelector('[data-reviews-prev]');
		const nextBtn = host.querySelector('[data-reviews-next]');
		if (!viewport || !track || !count) return;

		const originals = Array.from(track.children);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const duration = reduceMotion ? 0 : 420;
		const copies = 5;
		const mid = Math.floor(copies / 2) * count;

		track.innerHTML = '';
		for (let copy = 0; copy < copies; copy++) {
			originals.forEach((node, i) => {
				const clone = node.cloneNode(true);
				clone.dataset.copy = String(copy);
				clone.dataset.reviewIndex = String(i);
				track.appendChild(clone);
			});
		}

		let index = mid;
		let step = 0;
		let sidePad = 0;
		let animating = false;
		let autoTimer = null;
		let drag = null;
		let settleTimer = 0;

		const loopW = () => count * step;
		const xFor = (i) => sidePad - i * step;

		const forceReflow = () => {
			void track.offsetHeight;
		};

		const readX = () => {
			const t = getComputedStyle(track).transform;
			if (!t || t === 'none') return xFor(index);
			const m = t.match(/matrix(?:3d)?\(([^)]+)\)/);
			if (!m) return xFor(index);
			const parts = m[1].split(',').map(Number);
			return parts.length === 16 ? parts[12] : parts[4];
		};

		const setX = (x, animate) => {
			track.style.transition =
				animate && duration
					? 'transform ' + duration + 'ms cubic-bezier(0.22, 1, 0.36, 1)'
					: 'none';
			track.style.transform = 'translate3d(' + x + 'px,0,0)';
		};

		/** Прыжок на ±N циклов без анимации — картинка та же, индекс в середине */
		const snapLoop = (x) => {
			const loop = loopW();
			if (!loop) return { x, index: Math.round((sidePad - x) / step) };
			let next = x;
			// Держим «логический» индекс примерно в [mid - count, mid + 2*count)
			let i = (sidePad - next) / step;
			while (i < mid - count) {
				next -= loop;
				i += count;
			}
			while (i >= mid + count * 2) {
				next += loop;
				i -= count;
			}
			return { x: next, index: Math.round(i) };
		};

		const hardSnapToIndex = (i) => {
			index = i;
			setX(xFor(index), false);
			forceReflow();
		};

		const settleTo = (targetIndex) => {
			if (!step) return;
			window.clearTimeout(settleTimer);

			// Берём реальную позицию, телепортируем в середину (картинка та же),
			// затем анимируем только короткий шаг к соседней/целевой карточке.
			const now = snapLoop(readX());
			hardSnapToIndex(now.index);

			let target = targetIndex;
			// Цель тоже приводим к той же «полосе», чтобы анимация была короткой
			while (target < now.index - count) target += count;
			while (target > now.index + count) target -= count;

			if (target === now.index) {
				animating = false;
				restartAuto();
				return;
			}

			animating = true;
			index = target;
			setX(xFor(index), true);

			settleTimer = window.setTimeout(() => {
				const after = snapLoop(xFor(index));
				hardSnapToIndex(after.index);
				animating = false;
				restartAuto();
			}, duration + 20);
		};

		const measure = () => {
			const card = track.querySelector('.fs-review-card');
			if (!card) return;
			const styles = getComputedStyle(track);
			const gap = parseFloat(styles.columnGap || styles.gap) || 0;
			const cardW = card.getBoundingClientRect().width;
			step = cardW + gap;
			const vw = viewport.getBoundingClientRect().width;
			const mobile = window.matchMedia('(max-width: 699px)').matches;
			if (mobile) {
				sidePad = Math.max(12, (vw - cardW) / 2);
			} else {
				const head = host.querySelector('.fs-reviews__head');
				const headLeft = head
					? head.getBoundingClientRect().left - viewport.getBoundingClientRect().left
					: 24;
				sidePad = Math.max(16, headLeft);
			}
			const logical = ((index % count) + count) % count;
			hardSnapToIndex(mid + logical);
		};

		const go = (delta) => {
			if (drag || !step) return;
			if (animating) {
				window.clearTimeout(settleTimer);
				const now = snapLoop(readX());
				hardSnapToIndex(now.index);
				animating = false;
			}
			const now = snapLoop(readX());
			hardSnapToIndex(now.index);
			settleTo(now.index + delta);
		};

		const onPointerDown = (e) => {
			if (e.pointerType === 'mouse' && e.button !== 0) return;
			stopAuto();
			window.clearTimeout(settleTimer);

			const now = snapLoop(readX());
			hardSnapToIndex(now.index);
			animating = false;

			drag = {
				id: e.pointerId,
				startX: e.clientX,
				originX: xFor(index),
				baseIndex: index,
			};
			viewport.setPointerCapture?.(e.pointerId);
		};

		const onPointerMove = (e) => {
			if (!drag || e.pointerId !== drag.id || !step) return;
			const dx = e.clientX - drag.startX;
			const snapped = snapLoop(drag.originX + dx);
			// Если snapLoop сдвинул цикл — подтягиваем origin, чтобы не было скачка
			if (Math.abs(snapped.x - (drag.originX + dx)) > 1) {
				drag.originX = snapped.x - dx;
			}
			setX(snapped.x, false);
		};

		const onPointerUp = (e) => {
			if (!drag || e.pointerId !== drag.id || !step) return;
			const dx = e.clientX - drag.startX;
			const originX = drag.originX;
			drag = null;

			const snapped = snapLoop(originX + dx);
			setX(snapped.x, false);
			forceReflow();

			// Цель — ближайшая карточка к фактической позиции после drag
			let target = Math.round((sidePad - snapped.x) / step);
			const from = Math.round((sidePad - originX) / step);
			const threshold = Math.min(56, step * 0.18);
			if (target === from && Math.abs(dx) >= threshold) {
				target += dx < 0 ? 1 : -1;
			}
			settleTo(target);
		};

		const stopAuto = () => {
			if (autoTimer) {
				clearInterval(autoTimer);
				autoTimer = null;
			}
		};

		const restartAuto = () => {
			stopAuto();
			if (reduceMotion || drag) return;
			autoTimer = window.setInterval(() => go(1), 5200);
		};

		prevBtn?.addEventListener('click', () => go(-1));
		nextBtn?.addEventListener('click', () => go(1));
		viewport.addEventListener('pointerdown', onPointerDown);
		viewport.addEventListener('pointermove', onPointerMove);
		viewport.addEventListener('pointerup', onPointerUp);
		viewport.addEventListener('pointercancel', onPointerUp);
		viewport.addEventListener('mouseenter', stopAuto);
		viewport.addEventListener('mouseleave', () => {
			if (!drag) restartAuto();
		});
		host.addEventListener(
			'keydown',
			(e) => {
				if (e.key === 'ArrowLeft') {
					e.preventDefault();
					go(-1);
				}
				if (e.key === 'ArrowRight') {
					e.preventDefault();
					go(1);
				}
			},
			true,
		);

		const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
		ro?.observe(viewport);
		window.addEventListener('resize', measure);
		measure();
		restartAuto();
	}

	function renderAdultCoursesPage() {
		const host = document.querySelector('[data-site-adult-courses]');
		const data = window.SITE_CONTENT?.adultCourses;
		if (!host || !data?.items?.length) return;

		const hero = data.hero || {};
		const filters = data.filters || [{ id: 'all', label: 'Все' }];
		const kidsUrl = (window.SITE_CONFIG || {}).kidsSite || 'https://fluentselfkids.ru';

		const filterHtml = filters
			.map(
				(f, i) =>
					'<button type="button" class="fs-courses-filter' +
					(i === 0 ? ' is-active' : '') +
					'" data-course-filter="' +
					f.id +
					'" aria-pressed="' +
					(i === 0 ? 'true' : 'false') +
					'">' +
					f.label +
					'</button>',
			)
			.join('');

		const cards = data.items
			.map((c, i) => {
				const n = String(i + 1).padStart(2, '0');
				return (
					'<a href="' +
					pageHref('order.html') +
					'" class="fs-course-card fs-course-card--' +
					(c.tone || 'sage') +
					(c.featured ? ' fs-course-card--featured' : '') +
					'" data-course-lang="' +
					(c.lang || 'all') +
					'">' +
					'<span class="fs-course-card__num ff-graphik" aria-hidden="true">' +
					n +
					'</span>' +
					'<span class="fs-course-card__body">' +
					'<span class="fs-course-card__title">' +
					c.title +
					'</span>' +
					'<span class="fs-course-card__text">' +
					c.text +
					'</span>' +
					'<span class="fs-course-card__meta">' +
					'<span class="fs-course-card__pace">' +
					c.meta +
					'</span>' +
					'<span class="fs-course-card__go ff-graphik tracking-wide">Записаться</span>' +
					'</span></span></a>'
				);
			})
			.join('');

		const formats = (data.formats || [])
			.map(
				(f) =>
					'<article class="fs-courses-format"><h3 class="fs-courses-format__title">' +
					f.title +
					'</h3><p class="fs-courses-format__text">' +
					f.text +
					'</p></article>',
			)
			.join('');

		host.className = 'fs-courses-page';
		host.innerHTML =
			'<header class="fs-courses-hero">' +
			'<div class="container fs-courses-hero__grid">' +
			'<div class="fs-courses-hero__copy">' +
			'<p class="fs-courses-hero__eyebrow ff-graphik tracking-wide">' +
			(hero.eyebrow || 'Курсы') +
			'</p>' +
			'<h1 class="fs-courses-hero__title">' +
			(hero.title || 'Курсы для взрослых') +
			'</h1>' +
			'<p class="fs-courses-hero__lead">' +
			(hero.lead || '') +
			'</p>' +
			'<div class="fs-courses-hero__actions">' +
			'<a href="' +
			pageHref('order.html') +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Пробный урок</a>' +
			'<a href="#fs-courses-catalog" class="fs-hero-cta__btn fs-hero-cta__btn--outline ff-graphik tracking-wide">Смотреть курсы</a>' +
			'</div></div>' +
			'<div class="fs-courses-hero__aside">' +
			'<div class="fs-courses-orbit" data-courses-orbit role="group" aria-label="Крутилка языков — можно крутить и выбирать">' +
			'<div class="fs-courses-orbit__ring" data-orbit-ring>' +
			'<button type="button" class="fs-courses-orbit__lang" data-orbit-code="EN" data-orbit-filter="en" data-orbit-name="English" style="--a:0deg">EN</button>' +
			'<button type="button" class="fs-courses-orbit__lang" data-orbit-code="DE" data-orbit-filter="eu" data-orbit-name="Deutsch" style="--a:51deg">DE</button>' +
			'<button type="button" class="fs-courses-orbit__lang" data-orbit-code="FR" data-orbit-filter="eu" data-orbit-name="Français" style="--a:102deg">FR</button>' +
			'<button type="button" class="fs-courses-orbit__lang" data-orbit-code="ES" data-orbit-filter="eu" data-orbit-name="Español" style="--a:154deg">ES</button>' +
			'<button type="button" class="fs-courses-orbit__lang" data-orbit-code="IT" data-orbit-filter="eu" data-orbit-name="Italiano" style="--a:205deg">IT</button>' +
			'<button type="button" class="fs-courses-orbit__lang" data-orbit-code="ZH" data-orbit-filter="asia" data-orbit-name="中文" style="--a:257deg">ZH</button>' +
			'<button type="button" class="fs-courses-orbit__lang" data-orbit-code="AR" data-orbit-filter="asia" data-orbit-name="العربية" style="--a:308deg">AR</button>' +
			'</div>' +
			'<div class="fs-courses-orbit__core">' +
			'<span class="fs-courses-orbit__hint ff-graphik tracking-wide" data-orbit-hint>Крути</span>' +
			'<span class="fs-courses-orbit__code" data-orbit-code-view>EN</span>' +
			'<span class="fs-courses-orbit__name" data-orbit-name-view>English</span>' +
			'</div></div>' +
			'<p class="fs-courses-orbit__tip">Потяни круг · кликни язык</p></div></div>' +
			'<nav class="container fs-courses-hero__switch" aria-label="Другие направления">' +
			'<a href="' +
			kidsUrl +
			'" target="_blank" rel="noopener">Для детей</a>' +
			'<span aria-hidden="true">·</span>' +
			'<a href="' +
			pageHref('korporativnoe-obuchenie.html') +
			'">Для бизнеса</a></nav></header>' +
			'<section class="fs-courses-formats" aria-label="Форматы обучения">' +
			'<div class="container"><div class="fs-courses-formats__grid">' +
			formats +
			'</div></div></section>' +
			'<section class="fs-courses-catalog" id="fs-courses-catalog" aria-labelledby="fs-courses-catalog-title">' +
			'<div class="container">' +
			'<div class="fs-courses-catalog__head">' +
			'<div><p class="fs-courses-catalog__eyebrow ff-graphik tracking-wide">Каталог</p>' +
			'<h2 id="fs-courses-catalog-title" class="fs-courses-catalog__title">Выберите программу</h2></div>' +
			'<div class="fs-courses-filters" role="group" aria-label="Фильтр курсов">' +
			filterHtml +
			'</div></div>' +
			'<div class="fs-courses-grid" data-courses-grid>' +
			cards +
			'</div></div></section>' +
			'<section class="fs-courses-outro">' +
			'<div class="container"><div class="fs-courses-outro__inner">' +
			'<p class="fs-courses-outro__label ff-graphik tracking-wide">Не уверены в уровне</p>' +
			'<h2 class="fs-courses-outro__title">Начните с бесплатного пробного</h2>' +
			'<p class="fs-courses-outro__text">Познакомитесь с преподавателем, форматом и атмосферой — без обязательств.</p>' +
			'<a href="' +
			pageHref('order.html') +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Записаться</a>' +
			'</div></div></section>';

		const grid = host.querySelector('[data-courses-grid]');
		const filterBtns = host.querySelectorAll('[data-course-filter]');

		const applyFilter = (id) => {
			filterBtns.forEach((b) => {
				const on = b.dataset.courseFilter === id;
				b.classList.toggle('is-active', on);
				b.setAttribute('aria-pressed', on ? 'true' : 'false');
			});
			grid?.querySelectorAll('.fs-course-card').forEach((card) => {
				const lang = card.dataset.courseLang;
				const show = id === 'all' || lang === id;
				card.hidden = !show;
				card.classList.toggle('is-hidden', !show);
			});
		};

		filterBtns.forEach((btn) => {
			btn.addEventListener('click', () => applyFilter(btn.dataset.courseFilter));
		});

		initCoursesOrbit(host, applyFilter);
	}

	function initCoursesOrbit(host, applyFilter) {
		const orbit = host.querySelector('[data-courses-orbit]');
		const ring = host.querySelector('[data-orbit-ring]');
		const codeView = host.querySelector('[data-orbit-code-view]');
		const nameView = host.querySelector('[data-orbit-name-view]');
		const hint = host.querySelector('[data-orbit-hint]');
		const langs = host.querySelectorAll('.fs-courses-orbit__lang');
		if (!orbit || !ring || !langs.length) return;

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let angle = 0;
		let velocity = reduceMotion ? 0 : 0.08;
		let dragging = false;
		let lastX = 0;
		let lastY = 0;
		let lastT = 0;
		let raf = 0;
		let activeCode = 'EN';

		const setAngle = (a) => {
			angle = a;
			ring.style.transform = 'rotate(' + angle + 'deg)';
			langs.forEach((el) => {
				el.style.transform =
					'rotate(var(--a)) translateY(calc(-1 * var(--orbit-r))) rotate(calc(-1 * var(--a) - ' +
					angle +
					'deg))';
			});
		};

		const paintLang = (btn, picked) => {
			activeCode = btn.dataset.orbitCode;
			langs.forEach((el) => el.classList.toggle('is-active', el === btn));
			if (codeView) codeView.textContent = btn.dataset.orbitCode;
			if (nameView) nameView.textContent = btn.dataset.orbitName;
			if (hint) hint.textContent = picked ? 'Выбрано' : 'Крути';
			orbit.classList.toggle('is-picked', !!picked);
		};

		const selectLang = (btn, scrollToCatalog) => {
			paintLang(btn, true);
			applyFilter(btn.dataset.orbitFilter || 'all');
			if (scrollToCatalog) {
				host.querySelector('#fs-courses-catalog')?.scrollIntoView({
					behavior: reduceMotion ? 'auto' : 'smooth',
					block: 'start',
				});
			}
		};

		const tick = () => {
			if (!dragging && !reduceMotion) {
				angle += velocity;
				velocity *= 0.995;
				if (Math.abs(velocity) < 0.04) velocity = 0.04 * Math.sign(velocity || 1);
				setAngle(angle);
			}
			raf = requestAnimationFrame(tick);
		};

		const angleFromEvent = (e) => {
			const rect = orbit.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			return (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
		};

		orbit.addEventListener('pointerdown', (e) => {
			if (e.target.closest('.fs-courses-orbit__lang')) return;
			dragging = true;
			orbit.classList.add('is-dragging');
			orbit.setPointerCapture?.(e.pointerId);
			lastX = e.clientX;
			lastY = e.clientY;
			lastT = performance.now();
			velocity = 0;
			orbit.dataset.dragStart = String(angleFromEvent(e) - angle);
		});

		orbit.addEventListener('pointermove', (e) => {
			if (!dragging) {
				// лёгкий tilt к курсору
				const rect = orbit.getBoundingClientRect();
				const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
				const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
				orbit.style.setProperty('--tilt-x', (dy * -6).toFixed(2) + 'deg');
				orbit.style.setProperty('--tilt-y', (dx * 6).toFixed(2) + 'deg');
				return;
			}
			const start = Number(orbit.dataset.dragStart || 0);
			const next = angleFromEvent(e) - start;
			const now = performance.now();
			const dt = Math.max(16, now - lastT);
			velocity = ((next - angle) / dt) * 16;
			angle = next;
			setAngle(angle);
			lastT = now;
			lastX = e.clientX;
			lastY = e.clientY;
		});

		const endDrag = () => {
			if (!dragging) return;
			dragging = false;
			orbit.classList.remove('is-dragging');
			velocity = Math.max(-1.8, Math.min(1.8, velocity));
			if (Math.abs(velocity) < 0.05) velocity = 0.08;
		};

		orbit.addEventListener('pointerup', endDrag);
		orbit.addEventListener('pointercancel', endDrag);
		orbit.addEventListener('pointerleave', () => {
			if (!dragging) {
				orbit.style.setProperty('--tilt-x', '0deg');
				orbit.style.setProperty('--tilt-y', '0deg');
			}
		});

		langs.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.stopPropagation();
				selectLang(btn, true);
			});
		});

		// двойной клик по центру — сброс фильтра
		orbit.querySelector('.fs-courses-orbit__core')?.addEventListener('dblclick', () => {
			langs.forEach((el) => el.classList.remove('is-active'));
			if (codeView) codeView.textContent = 'ALL';
			if (nameView) nameView.textContent = 'Все языки';
			if (hint) hint.textContent = 'Сброс';
			orbit.classList.remove('is-picked');
			applyFilter('all');
		});

		setAngle(0);
		paintLang(langs[0], false);
		if (!reduceMotion) raf = requestAnimationFrame(tick);
	}

	function renderEventsPage() {
		const host = document.querySelector('[data-site-events]');
		const data = window.SITE_CONTENT?.events;
		if (!host || !data) return;

		const hero = data.hero || {};
		const formats = data.formats || data.past || [];

		const upcomingCards = (data.upcoming || [])
			.map((e, i) => {
				const n = String(i + 1).padStart(2, '0');
				return (
					'<article class="fs-events-card' +
					(i === 0 ? ' fs-events-card--featured' : '') +
					'">' +
					'<div class="fs-events-card__top">' +
					'<span class="fs-events-card__tag ff-graphik tracking-wide">' +
					(e.tag || 'Скоро') +
					'</span>' +
					'<span class="fs-events-card__num ff-graphik" aria-hidden="true">' +
					n +
					'</span></div>' +
					'<h2 class="fs-events-card__title">' +
					e.title +
					'</h2>' +
					'<p class="fs-events-card__text">' +
					e.text +
					'</p>' +
					'<dl class="fs-events-card__meta">' +
					'<div><dt class="ff-graphik tracking-wide">Когда</dt><dd>' +
					(e.date || '—') +
					'</dd></div>' +
					'<div><dt class="ff-graphik tracking-wide">Время</dt><dd>' +
					(e.time || '—') +
					'</dd></div>' +
					(e.place
						? '<div><dt class="ff-graphik tracking-wide">Где</dt><dd>' + e.place + '</dd></div>'
						: '') +
					'</dl>' +
					'<div class="fs-events-card__actions">' +
					'<a href="' +
					pageHref('order.html') +
					'" class="fs-events-card__cta ff-graphik tracking-wide">Записаться</a>' +
					'<a href="' +
					pageHref('contacts.html') +
					'" class="fs-events-card__link">Как добраться</a>' +
					'</div></article>'
				);
			})
			.join('');

		const formatCards = formats
			.map((e, i) => {
				const n = String(i + 1).padStart(2, '0');
				return (
					'<article class="fs-events-format">' +
					'<span class="fs-events-format__num ff-graphik" aria-hidden="true">' +
					n +
					'</span>' +
					(e.tag
						? '<span class="fs-events-format__tag ff-graphik tracking-wide">' + e.tag + '</span>'
						: '') +
					'<h3 class="fs-events-format__title">' +
					e.title +
					'</h3>' +
					'<p class="fs-events-format__text">' +
					e.text +
					'</p></article>'
				);
			})
			.join('');

		host.className = 'fs-events-page';
		host.innerHTML =
			'<header class="fs-events-hero">' +
			'<div class="container fs-events-hero__inner">' +
			'<p class="fs-events-hero__eyebrow ff-graphik tracking-wide">' +
			(hero.eyebrow || 'Мероприятия') +
			'</p>' +
			'<h1 class="fs-events-hero__title">' +
			(hero.title || 'Мероприятия') +
			'</h1>' +
			'<p class="fs-events-hero__lead">' +
			(hero.lead || '') +
			'</p></div></header>' +
			'<section class="fs-events-upcoming" aria-labelledby="fs-events-upcoming-title">' +
			'<div class="container">' +
			'<div class="fs-events-section-head">' +
			'<div><p class="fs-events-section-head__eyebrow ff-graphik tracking-wide">Календарь</p>' +
			'<h2 id="fs-events-upcoming-title" class="fs-events-section-head__title">Ближайшие события</h2></div>' +
			'<p class="fs-events-section-head__note">Приходите даже если ещё не учитесь у нас — открытые форматы для всех.</p>' +
			'</div>' +
			'<div class="fs-events-upcoming__grid">' +
			(upcomingCards ||
				'<p class="fs-events-empty">Сейчас нет анонсов — напишите нам, и мы подскажем ближайшую дату.</p>') +
			'</div></div></section>' +
			'<section class="fs-events-formats" aria-labelledby="fs-events-formats-title">' +
			'<div class="container">' +
			'<div class="fs-events-section-head">' +
			'<div><p class="fs-events-section-head__eyebrow ff-graphik tracking-wide">Форматы</p>' +
			'<h2 id="fs-events-formats-title" class="fs-events-section-head__title">Как это бывает</h2></div>' +
			'<p class="fs-events-section-head__note">Регулярные встречи, которые помогают говорить свободнее вне урока.</p>' +
			'</div>' +
			'<div class="fs-events-formats__grid">' +
			formatCards +
			'</div></div></section>' +
			'<section class="fs-events-outro">' +
			'<div class="container"><div class="fs-events-outro__inner">' +
			'<p class="fs-events-outro__label ff-graphik tracking-wide">Хотите прийти</p>' +
			'<h2 class="fs-events-outro__title">Запишитесь — подскажем ближайшую встречу</h2>' +
			'<p class="fs-events-outro__text">Или начните с бесплатного пробного урока: познакомитесь со школой и атмосферой.</p>' +
			'<div class="fs-events-outro__actions">' +
			'<a href="' +
			pageHref('order.html') +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Записаться</a>' +
			'<a href="' +
			pageHref('contacts.html') +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--outline ff-graphik tracking-wide">Контакты</a>' +
			'</div></div></div></section>';
	}

	function renderPhotosPage() {
		const host = document.querySelector('[data-site-photo-page]');
		const data = window.SITE_CONTENT?.photos;
		if (!host || !data?.items?.length) return;

		const asset = (src) => {
			if (!src) return src;
			if (src.startsWith('http')) return src;
			const rel = src.replace(/^\//, '');
			return window.FS_PATHS?.asset(rel) || src;
		};

		const photoAttrs = (local, remote) => {
			const fallback = asset(local);
			if (!remote) return 'src="' + fallback + '"';
			return 'src="' + fallback + '" data-photo-remote="' + asset(remote) + '"';
		};

		const upgradeRemotePhotos = (scope) => {
			(scope || document).querySelectorAll('img[data-photo-remote]').forEach((img) => {
				const remote = img.dataset.photoRemote;
				if (!remote) return;
				const probe = new Image();
				probe.referrerPolicy = 'no-referrer';
				probe.onload = () => {
					img.src = remote;
					img.removeAttribute('data-photo-remote');
				};
				probe.src = remote;
			});
		};

		const hero = data.hero || {};
		const tags = (data.tags || [])
			.map((t) => '<li class="fs-photo-tag ff-graphik tracking-wide">' + t + '</li>')
			.join('');

		const cardHtml = data.items
			.map((p, i) => {
				const layout = p.layout || 'square';
				return (
					'<button type="button" class="fs-photo-card fs-photo-card--' +
					layout +
					' fs-photo-reveal" data-photo-index="' +
					i +
					'" aria-label="Открыть: ' +
					p.caption +
					'">' +
					'<span class="fs-photo-card__frame">' +
					'<img ' +
					photoAttrs(p.src, p.srcRemote) +
					' alt="' +
					p.alt +
					'" loading="' +
					(i < 2 ? 'eager' : 'lazy') +
					'" decoding="async" referrerpolicy="no-referrer" style="object-position:' +
					(p.position || 'center') +
					'">' +
					'<span class="fs-photo-card__veil" aria-hidden="true"></span>' +
					'<span class="fs-photo-card__meta">' +
					'<span class="fs-photo-card__hint ff-graphik tracking-wide">' +
					(p.hint || '') +
					'</span>' +
					'<span class="fs-photo-card__caption">' +
					p.caption +
					'</span>' +
					'</span></span></button>'
				);
			})
			.join('');

		const quoteBlock = data.quote
			? '<blockquote class="fs-photo-quote fs-photo-reveal"><p>' + data.quote + '</p></blockquote>'
			: '';

		const heroFallback = asset(hero.image || '/assets/brand/fluent-self-cover.png');

		host.innerHTML =
			'<header class="fs-photo-hero">' +
			'<img class="fs-photo-hero__bg" ' +
			photoAttrs(hero.image || heroFallback, hero.imageRemote) +
			' alt="" decoding="async" referrerpolicy="no-referrer">' +
			'<div class="fs-photo-hero__grain" aria-hidden="true"></div>' +
			'<div class="container fs-photo-hero__inner">' +
			'<p class="fs-photo-hero__eyebrow ff-graphik tracking-wide">' +
			(hero.eyebrow || 'Фотографии') +
			'</p>' +
			'<h1 class="fs-photo-hero__title">' +
			(hero.title || 'Фотографии') +
			'</h1>' +
			'<p class="fs-photo-hero__lead">' +
			(hero.lead || '') +
			'</p>' +
			'<div class="fs-photo-hero__index" aria-hidden="true">01</div>' +
			'</div>' +
			'<div class="fs-photo-hero__scroll" aria-hidden="true"><span></span></div>' +
			'</header>' +
			'<section class="fs-photo-intro">' +
			'<div class="container fs-photo-intro__grid">' +
			'<p class="fs-photo-intro__text fs-photo-reveal">' +
			data.intro +
			'</p>' +
			'<ul class="fs-photo-tags fs-photo-reveal">' +
			tags +
			'</ul>' +
			'</div></section>' +
			'<section class="fs-photo-mosaic" aria-label="Галерея">' +
			'<div class="container"><div class="fs-photo-mosaic__grid">' +
			cardHtml +
			quoteBlock +
			'</div></div></section>' +
			'<section class="fs-photo-outro">' +
			'<div class="container"><div class="fs-photo-outro__inner fs-photo-reveal">' +
			'<p class="fs-photo-outro__label ff-graphik tracking-wide">Приходите сами</p>' +
			'<h2 class="fs-photo-outro__title">Лучше один раз увидеть атмосферу</h2>' +
			'<p class="fs-photo-outro__text">Запишитесь на бесплатный пробный урок — познакомьтесь со школой, преподавателем и пространством.</p>' +
			'<div class="fs-photo-outro__actions">' +
			'<a href="' +
			pageHref('order.html') +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Записаться</a>' +
			'<a href="' +
			pageHref('contacts.html') +
			'" class="fs-hero-cta__btn fs-hero-cta__btn--outline ff-graphik tracking-wide">Как добраться</a>' +
			'</div></div></div></section>';

		initPhotoGallery(data, asset);
		upgradeRemotePhotos(host);
	}

	function initPhotoGallery(data, asset) {
		const cards = document.querySelectorAll('.fs-photo-card');
		if (!cards.length) return;

		let lightbox = document.querySelector('.fs-photo-lightbox');
		if (!lightbox) {
			lightbox = document.createElement('div');
			lightbox.className = 'fs-photo-lightbox';
			lightbox.hidden = true;
			lightbox.innerHTML =
				'<div class="fs-photo-lightbox__backdrop" data-photo-close tabindex="-1"></div>' +
				'<div class="fs-photo-lightbox__panel" role="dialog" aria-modal="true" aria-label="Просмотр фотографии">' +
				'<button type="button" class="fs-photo-lightbox__close" data-photo-close aria-label="Закрыть">×</button>' +
				'<figure class="fs-photo-lightbox__figure">' +
				'<img class="fs-photo-lightbox__img" alt="">' +
				'<figcaption class="fs-photo-lightbox__caption"></figcaption>' +
				'</figure></div>';
			document.body.appendChild(lightbox);
		}

		const lbImg = lightbox.querySelector('.fs-photo-lightbox__img');
		const lbCap = lightbox.querySelector('.fs-photo-lightbox__caption');

		const openAt = (index) => {
			const item = data.items[index];
			if (!item) return;
			const cardImg = cards[index]?.querySelector('img');
			lbImg.src = cardImg?.currentSrc || asset(item.srcRemote || item.src);
			lbImg.alt = item.alt;
			lbCap.textContent = item.caption;
			lightbox.hidden = false;
			document.body.style.overflow = 'hidden';
			lightbox.querySelector('.fs-photo-lightbox__close')?.focus();
		};

		const closeLb = () => {
			lightbox.hidden = true;
			document.body.style.overflow = '';
		};

		cards.forEach((card) => {
			card.addEventListener('click', () => openAt(Number(card.dataset.photoIndex)));
		});

		lightbox.querySelectorAll('[data-photo-close]').forEach((el) => {
			el.addEventListener('click', closeLb);
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && !lightbox.hidden) closeLb();
		});

		if (!window.__fsPhotoIO) {
			window.__fsPhotoIO = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('is-visible');
							window.__fsPhotoIO.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
			);
		}

		document.querySelectorAll('.fs-photo-reveal:not(.is-visible)').forEach((el) => {
			window.__fsPhotoIO.observe(el);
		});
	}

	function populateTrialCourses() {
		const host = document.querySelector('[data-site-form-courses]');
		const select = host?.querySelector('select[name="course"]');
		const courses = window.SITE_CONTENT?.trialCourses;
		if (!select || !courses?.length) return;

		select.innerHTML =
			'<option value="" selected>Выберите курс</option>' +
			courses.map((c) => '<option value="' + c.value + '">' + c.label + '</option>').join('');

		if (!host.classList.contains('fs-order-form__chips')) return;

		host.querySelectorAll('.fs-order-chip').forEach((el) => el.remove());

		courses.forEach((c, i) => {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'fs-order-chip' + (i === 0 ? ' is-active' : '');
			btn.textContent = c.label;
			btn.dataset.courseValue = c.value;
			btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
			btn.addEventListener('click', () => {
				select.value = c.value;
				host.querySelectorAll('.fs-order-chip').forEach((chip) => {
					const on = chip === btn;
					chip.classList.toggle('is-active', on);
					chip.setAttribute('aria-pressed', on ? 'true' : 'false');
				});
			});
			host.appendChild(btn);
		});

		if (courses[0]) {
			select.value = courses[0].value;
		}
	}

	function updateThemeColor() {
		let meta = document.querySelector('meta[name="theme-color"]');
		if (!meta) {
			meta = document.createElement('meta');
			meta.name = 'theme-color';
			document.head.appendChild(meta);
		}
		meta.content = '#5a7f76';
	}
})();
