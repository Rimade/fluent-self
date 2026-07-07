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

		const slides = reviews
			.map(
				(r) =>
					'<div class="swiper-slide"><div class="review-name text-center fz-norm ff-italic text-center">' +
					r.name +
					'</div></div>',
			)
			.join('');

		const texts = reviews
			.map(
				(r) =>
					'<div class="col-12 sm:col-11 md:col-8 text-center kt-block review-text" data-siema-item hidden>' +
					r.text +
					'</div>',
			)
			.join('');

		host.className = 'fs-reviews-wrap overflow-hidden';
		host.innerHTML =
			'<div class="py-75"><div class="fz-xs uppercase tracking-wide text-center ff-graphik">Отзывы о нас</div></div>' +
			'<div class="overflow-hidden fs-reviews"><div data-behavior="siema">' +
			'<div class="swiper-wrapper flex flex-no-wrap">' +
			slides +
			'</div></div>' +
			'<div class="container"><div class="row justify-center pt-25 pb-50">' +
			texts +
			'</div></div></div>';
	}

	function renderEventsPage() {
		const host = document.querySelector('[data-site-events]');
		const data = window.SITE_CONTENT?.events;
		if (!host || !data) return;

		const upcoming = (data.upcoming || [])
			.map(
				(e) =>
					'<article class="fs-events-upcoming"><div class="container"><div class="row"><div class="col-12 sm:col-10">' +
					'<h2 class="fs-events-upcoming__title fz-lg uppercase">' +
					e.title +
					'</h2><p class="fs-events-upcoming__text fz-norm">' +
					e.text +
					'</p><dl class="fs-events-meta">' +
					'<div><dt class="ff-graphik fz-caps tracking-wide">Когда</dt><dd>' +
					e.date +
					'</dd></div><div><dt class="ff-graphik fz-caps tracking-wide">Во сколько</dt><dd>' +
					e.time +
					'</dd></div></dl>' +
					'<a href="' +
					pageHref('order.html') +
					'" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Записаться</a>' +
					'</div></div></div></article>',
			)
			.join('');

		const past = (data.past || [])
			.map(
				(e) =>
					'<div class="container fs-events-past__row bordered-row"><div class="row pt-45 pb-65">' +
					'<div class="col-12 sm:col-6 mb-15 sm:mb-no"><h3 class="fz-lg uppercase">' +
					e.title +
					'</h3></div><div class="col-12 sm:col-6"><p class="fz-sm-text">' +
					e.text +
					'</p></div></div></div>',
			)
			.join('');

		host.innerHTML =
			upcoming +
			'<section class="fs-events-past" aria-labelledby="fs-events-past-title">' +
			'<div class="container"><h2 id="fs-events-past-title" class="fs-events-past__heading fz-lg uppercase sm:text-center">Форматы встреч</h2></div>' +
			past +
			'<p class="fs-events-past__note container">Расписание обновляется — следите за анонсами или запишитесь на пробный урок.</p></section>';
	}

	function renderPhotosPage() {
		const host = document.querySelector('[data-site-photo-page]');
		const data = window.SITE_CONTENT?.photos;
		if (!host || !data?.items?.length) return;

		const asset = (src) => {
			if (!src || src.startsWith('http') || src.startsWith('/')) return src;
			return window.FS_PATHS?.asset(src) || src;
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
					'<img src="' +
					asset(p.src) +
					'" alt="' +
					p.alt +
					'" loading="' +
					(i < 2 ? 'eager' : 'lazy') +
					'" decoding="async" style="object-position:' +
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

		host.innerHTML =
			'<header class="fs-photo-hero" data-site-brand-cover style="background-image:url(/assets/brand/fluent-self-cover.png)">' +
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
			lbImg.src = asset(item.src);
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
		const select = document.querySelector('[data-site-form-courses] select[name="course"]');
		const courses = window.SITE_CONTENT?.trialCourses;
		if (!select || !courses?.length) return;
		select.innerHTML =
			'<option value="" selected>Выберите курс</option>' +
			courses.map((c) => '<option value="' + c.value + '">' + c.label + '</option>').join('');
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
