/**
 * Fluent Self — UI-компоненты
 */
(function () {
	const cfg = window.SITE_CONFIG || {};
	const kidsUrl = cfg.kidsSite || 'https://fluentselfkids.ru';

	initAdultHero();
	initHeroCta();
	hideCelebritiesBlock();
	injectPillarsSection();
	injectKidsBanner();
	initHeaderScroll();
	injectPageCta();
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

	function hideCelebritiesBlock() {
		document.querySelectorAll('[data-behavior="studentSwiper"]').forEach((el) => {
			const block = el.closest('.border-Y');
			if (block) block.setAttribute('data-site-hide-celebrities', '');
		});
		const desktop = document.querySelector('.scrolling-box.--top');
		if (desktop) desktop.setAttribute('data-site-hide-celebrities', '');
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
						'<article class="fs-pillar">' +
						'<span class="fs-pillar__num ff-graphik">0' +
						(i + 1) +
						'</span>' +
						'<h3 class="fs-pillar__title">' +
						p.title +
						'</h3>' +
						'<p class="fs-pillar__text">' +
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
			'<div class="container">' +
			'<div class="fs-page-cta__inner">' +
			'<div><p class="fs-page-cta__label ff-graphik tracking-wide">Первый шаг</p>' +
			'<h2 class="fs-page-cta__title">Запишитесь на бесплатный пробный урок</h2>' +
			'<p class="fs-page-cta__text">Познакомьтесь со школой, преподавателем и форматом занятий — без обязательств.</p></div>' +
			'<a href="order.html" class="fs-hero-cta__btn fs-hero-cta__btn--fill ff-graphik tracking-wide">Записаться</a>' +
			'</div></div>';
		footer.insertAdjacentElement('beforebegin', cta);
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
