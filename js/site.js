/**
 * Fluent Self — конфиг, SEO, формы, cookie, a11y
 */
(function () {
	const cfg = window.SITE_CONFIG;
	if (!cfg) return;

	const PAGE_META = {
		'index.html': {
			title: 'Fluent Self — школа иностранных языков для взрослых',
			description:
				'Изучение английского, немецкого, французского и других языков. Группы до 6 человек, носители языка, бесплатный пробный урок.',
		},
		'about.html': {
			title: 'О школе — Fluent Self',
			description:
				'Коммуникативная методика, уютные классы и индивидуальный подход к каждому студенту.',
		},
		'kursy-dlya-vzroslyh.html': {
			title: 'Курсы для взрослых — Fluent Self',
			description:
				'Английский, немецкий, китайский, французский и другие языки. Групповые и индивидуальные занятия.',
		},
		'kursy-dlya-detej.html': {
			title: 'Курсы для детей — Fluent Self kids',
			description: 'Английский для детей от 3 до 16 лет — на отдельном сайте Fluent Self kids.',
		},
		'korporativnoe-obuchenie.html': {
			title: 'Корпоративное обучение — Fluent Self',
			description: 'Деловой английский и языковые программы для компаний.',
		},
		'contacts.html': {
			title: 'Контакты и адреса — Fluent Self',
			description: 'Адрес школы, график работы, телефон и карта проезда.',
		},
		'order.html': {
			title: 'Запись на пробный урок — Fluent Self',
			description: 'Бесплатный пробный урок — заполните форму, мы свяжемся с вами.',
		},
		'events.html': {
			title: 'Мероприятия — Fluent Self',
			description: 'Языковые клубы, встречи и события школы Fluent Self.',
		},
		'photo.html': {
			title: 'Фотографии — Fluent Self',
			description: 'Интерьеры школы и атмосфера занятий Fluent Self.',
		},
	};

	const page = location.pathname.split('/').pop() || 'index.html';
	const meta = PAGE_META[page] || PAGE_META['index.html'];

	document.title = meta.title;
	setMeta('description', meta.description);
	setMeta('og:title', meta.title, 'property');
	setMeta('og:description', meta.description, 'property');
	setMeta('twitter:title', meta.title);
	setMeta('twitter:description', meta.description);

	if (cfg.siteUrl) {
		const url = cfg.siteUrl.replace(/\/$/, '') + location.pathname.replace(/index\.html$/, '');
		setMeta('og:url', url, 'property');
		let link = document.querySelector('link[rel="canonical"]');
		if (!link) {
			link = document.createElement('link');
			link.rel = 'canonical';
			document.head.appendChild(link);
		}
		link.href = url;
	}

	if (cfg.ogImage) {
		const img = cfg.ogImage.startsWith('http')
			? cfg.ogImage
			: `${(cfg.siteUrl || '').replace(/\/$/, '')}/${cfg.ogImage.replace(/^\//, '')}`;
		setMeta('og:image', img, 'property');
		setMeta('twitter:image', img);
	}

	if (cfg.brandCover) {
		document.querySelectorAll('[data-site-brand-cover]').forEach((el) => {
			el.style.backgroundImage = `url(${cfg.brandCover})`;
		});
	}

	const touchIcon = document.querySelector('link[rel="apple-touch-icon"]');
	if (!touchIcon && cfg.ogImage) {
		const link = document.createElement('link');
		link.rel = 'apple-touch-icon';
		link.href = cfg.ogImage;
		document.head.appendChild(link);
	}

	function bootDomFeatures() {
		applyContacts();
		initForms();
		initAccessibility();
		initCookie();
		initContactButtons();
		injectJsonLd();
	}

	if (document.getElementById('site-chrome')) {
		document.addEventListener('partials:ready', bootDomFeatures);
	} else {
		bootDomFeatures();
	}

	function setMeta(name, content, attr = 'name') {
		if (!content) return;
		let el = document.querySelector(`meta[${attr}="${name}"]`);
		if (!el) {
			el = document.createElement('meta');
			el.setAttribute(attr, name);
			document.head.appendChild(el);
		}
		el.content = content;
	}

	function applyContacts() {
		document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
			a.textContent = cfg.phone;
			a.href = cfg.phoneHref;
		});

		document.querySelectorAll('a[href*="whatsapp.com"], a[href*="wa.me"]').forEach((a) => {
			if (cfg.whatsapp) a.href = cfg.whatsapp;
			else {
				const digits = (cfg.phone || '').replace(/\D/g, '');
				if (digits) a.href = `https://api.whatsapp.com/send?phone=${digits}`;
			}
			a.classList.add('whatsapp-float');
			a.setAttribute('aria-label', 'Написать в WhatsApp');
		});

		document.querySelectorAll('[data-site-address]').forEach((el) => {
			el.textContent = cfg.address;
		});

		document.querySelectorAll('[data-site-hours]').forEach((el) => {
			el.textContent = cfg.hours;
		});

		document.querySelectorAll('[data-site-legal]').forEach((el) => {
			const parts = [cfg.legal?.name, cfg.legal?.inn && `ИНН ${cfg.legal.inn}`].filter(Boolean);
			el.innerHTML = parts.join('<br />') || 'ИП — данные уточняются';
		});

		document.querySelectorAll('[data-site-year]').forEach((el) => {
			el.textContent = `© ${cfg.name}, ${cfg.year || new Date().getFullYear()}`;
		});

		document.querySelectorAll('iframe[src*="yandex"]').forEach((iframe) => {
			if (cfg.map?.yandexEmbed) iframe.src = cfg.map.yandexEmbed;
			iframe.title = `Карта — ${cfg.name}`;
			iframe.loading = 'lazy';
		});

		const mapHost = document.querySelector('[data-site-map]');
		if (mapHost && cfg.map?.yandexEmbed) {
			mapHost.innerHTML = `<iframe src="${cfg.map.yandexEmbed}" title="Карта — ${cfg.name}" loading="lazy" allowfullscreen></iframe>`;
		}

		applySocial();
		patchFooterText();
	}

	function patchFooterText() {
		document.querySelectorAll('footer').forEach((footer) => {
			const walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT);
			const nodes = [];
			while (walker.nextNode()) nodes.push(walker.currentNode);
			nodes.forEach((node) => {
				if (node.textContent.includes('Москва, Мосфильмовская')) {
					node.textContent = cfg.address;
				}
				if (/График работы:/.test(node.textContent) && node.nextSibling?.textContent) {
					/* hours block handled via data-site-hours if present */
				}
			});
			const hoursBlock = footer.querySelector('[data-site-hours]');
			if (!hoursBlock) {
				footer.innerHTML = footer.innerHTML.replace(
					/(График работы:<br \/>)\s*[^<]+/,
					`$1\n${cfg.hours}`,
				);
			}
		});

		document.querySelectorAll('.adresses-item .fz-md.uppercase').forEach((el) => {
			if (el.textContent.includes('Мосфильмовская')) el.textContent = cfg.address;
		});
	}

	function applySocial() {
		const social = cfg.social || {};
		const map = {
			Facebook: social.facebook,
			Instagram: social.instagram,
			Vkontakte: social.vk,
			VK: social.vk,
			Telegram: social.telegram,
		};

		document.querySelectorAll('footer a').forEach((a) => {
			const label = a.textContent.trim();
			const url = map[label];
			if (url === undefined) return;
			if (!url || url === '#') {
				a.hidden = true;
			} else {
				a.href = url;
				a.removeAttribute('hidden');
			}
		});
	}

	function initForms() {
		document.querySelectorAll('[data-site-form="trial"]').forEach((form) => {
			if (form.dataset.siteFormReady) return;
			form.dataset.siteFormReady = '1';

			const msg = document.createElement('p');
			msg.className = 'form-message';
			msg.hidden = true;
			msg.setAttribute('role', 'status');
			form.appendChild(msg);

			const submitBtn = form.querySelector('button[type="submit"], .button-fill');
			const setMsg = (text, type) => {
				msg.hidden = !text;
				msg.textContent = text || '';
				msg.className = `form-message${type ? ` form-message--${type}` : ''}`;
			};

			form.addEventListener('submit', async (e) => {
				e.preventDefault();
				setMsg('');

				const fd = new FormData(form);
				const name = String(fd.get('name') || '').trim();
				const email = String(fd.get('email') || '').trim();
				const phone = String(fd.get('phone') || '').trim();
				const course = String(fd.get('course') || '').trim();

				if (name.length < 2) {
					setMsg('Укажите имя и фамилию.', 'error');
					return;
				}
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
					setMsg('Укажите корректный e-mail.', 'error');
					return;
				}
				if (phone.replace(/\D/g, '').length < 10) {
					setMsg('Укажите номер телефона.', 'error');
					return;
				}

				if (submitBtn) submitBtn.disabled = true;
				setMsg('Отправляем…');

				const payload = { name, email, phone, course, formType: 'Пробный урок' };
				const tg = window.sendLeadToTelegram
					? await window.sendLeadToTelegram(payload)
					: { ok: false };

				if (tg.ok) {
					setMsg('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
					form.reset();
					if (submitBtn) submitBtn.disabled = false;
					return;
				}

				if (cfg.email) {
					const subject = encodeURIComponent('Запись на пробный урок — Fluent Self');
					const body = encodeURIComponent(window.buildLeadMailtoBody?.(payload) || '');
					window.location.href = `mailto:${cfg.email}?subject=${subject}&body=${body}`;
					setMsg('Откроется почтовый клиент для отправки заявки.', 'success');
				} else {
					setMsg('Не удалось отправить заявку. Позвоните нам или напишите в WhatsApp.', 'error');
				}
				if (submitBtn) submitBtn.disabled = false;
			});
		});
	}

	function initAccessibility() {
		const burger = document.querySelector('[data-behavior="mmenu"]');
		const panel = document.querySelector('[data-mmenu-container]');
		if (burger) {
			burger.setAttribute('aria-label', 'Открыть меню');
			burger.setAttribute('aria-expanded', 'false');
			burger.addEventListener('click', () => {
				const open = document.body.classList.contains('body--menu-active');
				burger.setAttribute('aria-expanded', open ? 'true' : 'false');
			});
		}
		if (panel) panel.setAttribute('role', 'navigation');

		document.querySelectorAll('img:not([alt])').forEach((img, i) => {
			img.alt = img.closest('.slider-portrait, .scrolling-box-img') ? 'Фото студента' : '';
			if (i > 2) img.loading = 'lazy';
			img.decoding = 'async';
		});

		document.querySelectorAll('.main-logo svg').forEach((svg) => {
			svg.setAttribute(
				'viewBox',
				svg.getAttribute('viewBox') || svg.getAttribute('viewbox') || '0 0 220 20',
			);
			svg.removeAttribute('viewbox');
			svg.setAttribute('aria-hidden', 'true');
		});
	}

	function initContactButtons() {
		document.querySelectorAll('footer button').forEach((btn) => {
			if (!/Свяжитесь/i.test(btn.textContent)) return;
			btn.type = 'button';
			btn.setAttribute('aria-label', 'Связаться с нами');
			btn.addEventListener('click', () => {
				window.location.href = cfg.phoneHref || 'order.html';
			});
		});
	}

	function initCookie() {
		if (localStorage.getItem('fs-cookie-ok')) return;
		const bar = document.createElement('div');
		bar.className = 'site-cookie';
		bar.innerHTML = `
      <div class="site-cookie__inner">
        <p>Мы используем cookie для работы сайта. Продолжая, вы соглашаетесь с <a href="privacy.html" class="link link-green">политикой конфиденциальности</a>.</p>
        <div class="site-cookie__actions">
          <button type="button" class="site-cookie__btn site-cookie__btn--accept" data-cookie-accept>Принять</button>
        </div>
      </div>`;
		document.body.appendChild(bar);
		requestAnimationFrame(() => bar.classList.add('is-visible'));
		bar.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
			localStorage.setItem('fs-cookie-ok', '1');
			bar.classList.remove('is-visible');
			setTimeout(() => bar.remove(), 300);
		});
	}

	function injectJsonLd() {
		if (!cfg.address) return;
		const data = {
			'@context': 'https://schema.org',
			'@type': 'LanguageSchool',
			name: cfg.name,
			description: meta.description,
			telephone: cfg.phone,
			email: cfg.email,
			url: cfg.siteUrl || undefined,
			address: {
				'@type': 'PostalAddress',
				streetAddress: cfg.address,
				addressLocality: cfg.city || 'Москва',
				addressCountry: 'RU',
			},
		};
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(data);
		document.head.appendChild(script);
	}
})();
