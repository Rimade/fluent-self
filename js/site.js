/**
 * Подстановка контактов + отправка формы пробного урока
 */
(function () {
	const cfg = window.SITE_CONFIG;
	if (!cfg) return;

	document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
		a.textContent = cfg.phone;
		a.href = cfg.phoneHref;
	});

	const wa = document.querySelector('a[href*="whatsapp.com"]');
	if (wa && cfg.whatsapp) wa.href = cfg.whatsapp;
	else if (wa && cfg.phoneHref) {
		const digits = cfg.phone.replace(/\D/g, '');
		wa.href = `https://api.whatsapp.com/send?phone=${digits}`;
	}

	document.querySelectorAll('footer').forEach((footer) => {
		if (cfg.address && footer.innerHTML.includes('Москва')) {
			footer.innerHTML = footer.innerHTML.replace(
				/Москва,[^<]+(<br \/>)/,
				cfg.address.replace(/\n/g, '<br />') + '$1',
			);
		}
		if (cfg.hours) {
			footer.innerHTML = footer.innerHTML.replace(
				/График работы:<br \/>\s*[^<]+/,
				`График работы:<br />\n${cfg.hours}`,
			);
		}
		if (cfg.map?.yandexEmbed) {
			const iframe = footer.querySelector('iframe[src*="yandex"]');
			if (iframe) iframe.src = cfg.map.yandexEmbed;
		}
	});

	document.querySelectorAll('[data-site-form="trial"]').forEach((form) => {
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			const fd = new FormData(form);
			const name = fd.get('name') || '';
			const email = fd.get('email') || '';
			const phone = fd.get('phone') || '';
			const course = fd.get('course') || '';
			const text = `Пробный урок Fluent Self\nИмя: ${name}\nEmail: ${email}\nТел: ${phone}\nКурс: ${course}`;

			if (cfg.telegram?.enabled && cfg.telegram.botToken) {
				try {
					await fetch(
						`https://api.telegram.org/bot${cfg.telegram.botToken}/sendMessage`,
						{
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ chat_id: cfg.telegram.chatId, text }),
						},
					);
					alert('Заявка отправлена! Мы свяжемся с вами.');
					form.reset();
					return;
				} catch (_) {
					/* fallback */
				}
			}

			const subject = encodeURIComponent('Запись на пробный урок — Fluent Self');
			const body = encodeURIComponent(text);
			window.location.href = `mailto:${cfg.email}?subject=${subject}&body=${body}`;
		});
	});
})();
