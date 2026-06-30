/**
 * Fluent Self — конфиг, SEO, формы, cookie, a11y
 */
(function () {
	const cfg = window.SITE_CONFIG;
	if (!cfg) return;

	const seoPages = window.SEO_DATA?.pages || {};
	const PAGE_META = Object.fromEntries(
		Object.entries(seoPages).map(([k, v]) => [k, { title: v.title, description: v.description }]),
	);

	const page = (() => {
		let segment = location.pathname.split('/').filter(Boolean).pop();
		if (!segment) return 'index.html';
		if (!segment.includes('.')) return `${segment}.html`;
		return segment;
	})();
	const meta = PAGE_META[page] || PAGE_META['index.html'];
	const seoPage = seoPages[page] || seoPages['index.html'];
	const siteUrl = (cfg.siteUrl || window.SEO_DATA?.defaultSiteUrl || '').replace(/\/$/, '');

	document.title = meta.title;
	setMeta('description', meta.description);
	if (seoPage?.keywords) setMeta('keywords', seoPage.keywords);
	setMeta('robots', seoPage?.robots || 'index, follow');
	setMeta('og:locale', window.SEO_DATA?.locale || 'ru_RU', 'property');
	setMeta('og:site_name', cfg.name || 'Fluent Self', 'property');
	setMeta('og:title', meta.title, 'property');
	setMeta('og:description', meta.description, 'property');
	setMeta('twitter:title', meta.title);
	setMeta('twitter:description', meta.description);

	if (siteUrl) {
		const url = page === 'index.html' ? `${siteUrl}/` : `${siteUrl}/${page}`;
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
			: `${siteUrl}/${cfg.ogImage.replace(/^\//, '')}`;
		setMeta('og:image', img, 'property');
		setMeta('twitter:image', img);
	}

	injectVerificationMeta(cfg);

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
		injectJsonLd(seoPage, siteUrl);
		injectAnalytics(cfg);
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

		document.querySelectorAll('.fs-header__phone, .fs-mobile-menu__phone').forEach((a) => {
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

	function injectVerificationMeta(c) {
		if (c.verification?.yandex) setMeta('yandex-verification', c.verification.yandex);
		if (c.verification?.google) setMeta('google-site-verification', c.verification.google);
	}

	function injectAnalytics(c) {
		const ymId = String(c.metrika?.yandexId || '').trim();
		if (ymId && /^\d+$/.test(ymId) && !document.getElementById('yandex-metrika')) {
			window.ym =
				window.ym ||
				function () {
					(window.ym.a = window.ym.a || []).push(arguments);
				};
			window.ym.l = Date.now();
			const s = document.createElement('script');
			s.id = 'yandex-metrika';
			s.async = true;
			s.src = 'https://mc.yandex.ru/metrika/tag.js';
			document.head.appendChild(s);
			window.ym(Number(ymId), 'init', {
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
				webvisor: true,
			});
		}

		const gaId = String(c.analytics?.googleId || '').trim();
		if (gaId && gaId.startsWith('G-') && !document.getElementById('google-gtag')) {
			const g = document.createElement('script');
			g.id = 'google-gtag';
			g.async = true;
			g.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
			document.head.appendChild(g);
			window.dataLayer = window.dataLayer || [];
			window.gtag = function gtag() {
				window.dataLayer.push(arguments);
			};
			window.gtag('js', new Date());
			window.gtag('config', gaId);
		}
	}

	function injectJsonLd(seoPage, siteUrl) {
		if (!cfg.address) return;

		const image = cfg.ogImage
			? cfg.ogImage.startsWith('http')
				? cfg.ogImage
				: `${siteUrl}/${cfg.ogImage.replace(/^\//, '')}`
			: undefined;

		const sameAs = Object.values(cfg.social || {}).filter((u) => u && u !== '#');

		const school = {
			'@context': 'https://schema.org',
			'@type': 'LanguageSchool',
			'@id': siteUrl ? `${siteUrl}/#school` : undefined,
			name: cfg.name,
			description: meta.description,
			telephone: cfg.phone,
			email: cfg.email,
			url: siteUrl || undefined,
			image,
			logo: image,
			sameAs: sameAs.length ? sameAs : undefined,
			openingHours: cfg.hours || undefined,
			address: {
				'@type': 'PostalAddress',
				streetAddress: cfg.address,
				addressLocality: cfg.city || 'Москва',
				addressCountry: 'RU',
			},
		};

		const website = siteUrl
			? {
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					'@id': `${siteUrl}/#website`,
					url: siteUrl,
					name: cfg.name,
					description: seoPages['index.html']?.description,
					inLanguage: 'ru-RU',
					publisher: { '@id': `${siteUrl}/#school` },
				}
			: null;

		const crumbs = seoPage?.breadcrumb;
		const breadcrumb =
			crumbs?.length && siteUrl
				? {
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: crumbs.map((c, i) => ({
							'@type': 'ListItem',
							position: i + 1,
							name: c.name,
							item: c.path === 'index.html' ? `${siteUrl}/` : `${siteUrl}/${c.path}`,
						})),
					}
				: null;

		[school, website, breadcrumb].filter(Boolean).forEach((data) => {
			const script = document.createElement('script');
			script.type = 'application/ld+json';
			script.textContent = JSON.stringify(data);
			document.head.appendChild(script);
		});
	}
})();
