/**
 * Fluent Self — UI-компоненты
 */
(function () {
	const cfg = window.SITE_CONFIG || {};
	const kidsUrl = cfg.kidsSite || 'https://fluentselfkids.ru';

	initAdultHero();
	initHeroCta();
	purgeCelebrities();
	replaceFirstukMedia();
	injectPillarsSection();
	injectKidsBanner();
	initHeaderScroll();
	injectPageCta();
	initKidsPageNotice();
	dedupeReviews();
	renderEventsPage();
	populateTrialCourses();
	updateThemeColor();

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

	function initHeroCta() {
		const hero = document.querySelector('.home-hero');
		const typeitHost = hero?.querySelector('[data-behavior="typeit"]');
		if (!hero || !typeitHost || hero.querySelector('.fs-hero-cta')) return;

		const wrap = document.createElement('div');
		wrap.className = 'fs-hero-cta';
		wrap.innerHTML =
			'<a href="order.html" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Бесплатный пробный урок</a>' +
			'<a href="kursy-dlya-vzroslyh.html" class="fs-hero-cta__btn fs-hero-cta__btn--outline ff-graphik tracking-wide">Смотреть курсы</a>' +
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
		const cover = cfg.brandCover || 'assets/brand/fluent-self-cover.png';
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
			{ title: 'Коммуникативный подход', text: 'Говорим с первого занятия — без зубрёжки правил в отрыве от живой речи.' },
			{ title: 'Группы до 6 человек', text: 'Преподаватель успевает уделить внимание каждому и подстроить темп.' },
			{ title: 'Носители языка', text: 'Погружение в среду помогает преодолеть барьер и улучшить произношение.' },
			{ title: 'Пробный урок бесплатно', text: 'Познакомьтесь со школой и форматом занятий без обязательств.' },
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
		const anchor =
			document.querySelector('.ralax[data-site-brand-cover]') ||
			document.querySelector('.courses-on-home') ||
			document.querySelector('.courses');
		if (!anchor) return;

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

	function initHeaderScroll() {
		const menu = document.querySelector('[data-behavior="menu"]');
		if (!menu) return;
		const onScroll = () => menu.classList.toggle('is-scrolled', window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
	}

	function injectPageCta() {
		if (document.querySelector('.fs-page-cta')) return;
		const main = document.querySelector('[data-menu-page]');
		const footer = main?.querySelector('footer');
		if (!main || !footer) return;

		const page = location.pathname.split('/').pop() || 'index.html';
		if (page === 'index.html' || page === 'order.html' || page === 'contacts.html') return;

		const cta = document.createElement('section');
		cta.className = 'fs-page-cta';
		cta.innerHTML =
			'<div class="container"><div class="fs-page-cta__inner"><div>' +
			'<p class="fs-page-cta__label ff-graphik tracking-wide">Первый шаг</p>' +
			'<h2 class="fs-page-cta__title">Запишитесь на бесплатный пробный урок</h2>' +
			'<p class="fs-page-cta__text">Познакомьтесь со школой, преподавателем и форматом занятий — без обязательств.</p></div>' +
			'<a href="order.html" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Записаться</a></div></div>';
		footer.insertAdjacentElement('beforebegin', cta);
	}

	function initKidsPageNotice() {
		if (!location.pathname.includes('kursy-dlya-detej')) return;
		const main = document.querySelector('[data-menu-page]');
		if (!main || main.querySelector('.fs-kids-notice')) return;

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

	function dedupeReviews() {
		const siema = document.querySelector('[data-behavior="siema"]');
		if (!siema) return;
		siema.closest('.overflow-hidden')?.classList.add('fs-reviews');

		const seen = new Set();
		siema.querySelectorAll('.swiper-slide .review-name').forEach((el) => {
			const key = el.textContent.trim();
			if (seen.has(key)) el.closest('.swiper-slide')?.remove();
			else seen.add(key);
		});

		const seenText = new Set();
		siema.parentElement?.querySelectorAll('[data-siema-item].review-text').forEach((el) => {
			const key = el.textContent.trim().slice(0, 80);
			if (seenText.has(key)) el.remove();
			else seenText.add(key);
		});
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
					'<a href="order.html" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Записаться</a>' +
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
