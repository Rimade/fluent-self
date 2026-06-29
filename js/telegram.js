async function sendLeadToTelegram(data) {
	const cfg = window.SITE_CONFIG?.telegram;
	if (!cfg?.enabled || !cfg.botToken || !cfg.chatId) {
		return { ok: false, reason: 'telegram_disabled' };
	}

	const site = window.SITE_CONFIG?.name || 'Fluent Self';
	const lines = [
		`📩 <b>Новая заявка — ${site}</b>`,
		'',
		`<b>Имя:</b> ${escapeHtml(data.name || '—')}`,
		`<b>Email:</b> ${escapeHtml(data.email || '—')}`,
		`<b>Телефон:</b> ${escapeHtml(data.phone || '—')}`,
	];

	if (data.course) lines.push(`<b>Курс:</b> ${escapeHtml(data.course)}`);
	if (data.formType) lines.push(`<b>Тип:</b> ${escapeHtml(data.formType)}`);

	lines.push('', `<i>${new Date().toLocaleString('ru-RU')}</i>`);

	try {
		const res = await fetch(`https://api.telegram.org/bot${cfg.botToken}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ chat_id: cfg.chatId, text: lines.join('\n'), parse_mode: 'HTML' }),
		});
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			return { ok: false, reason: body.description || 'api_error' };
		}
		return { ok: true };
	} catch {
		return { ok: false, reason: 'network_error' };
	}
}

function escapeHtml(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildLeadMailtoBody(data) {
	const site = window.SITE_CONFIG?.name || 'Fluent Self';
	return [
		`Заявка с сайта — ${site}`,
		'',
		`Имя: ${data.name || '—'}`,
		`Email: ${data.email || '—'}`,
		`Телефон: ${data.phone || '—'}`,
		data.course ? `Курс: ${data.course}` : '',
	].filter(Boolean).join('\n');
}

if (typeof window !== 'undefined') {
	window.sendLeadToTelegram = sendLeadToTelegram;
	window.buildLeadMailtoBody = buildLeadMailtoBody;
}
