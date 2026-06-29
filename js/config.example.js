/**
 * Fluent Self — локальные настройки (не коммитить с секретами)
 */
const SITE_CONFIG = {
	name: 'Fluent Self',
	tagline: 'Школа иностранных языков для взрослых',
	phone: '+7 (499) 398-55-95',
	phoneHref: 'tel:+74993985595',
	email: 'info@fluentself.ru',
	address: 'г. Москва, ул. Примерная, д. 1',
	hours: 'каждый день с 10:00 - 20:00',
	whatsapp: 'https://wa.me/74993985595',
	kidsSite: 'https://fluentselfkids.ru',
	social: { vk: '#', telegram: '#', instagram: '#' },
	telegram: { botToken: '', chatId: '', enabled: false },
	siteUrl: '',
	year: 2026,
	map: {
		yandexEmbed: 'https://yandex.ru/map-widget/v1/?ll=37.617635%2C55.755814&z=14&l=map',
	},
	legal: { name: 'ИП — уточняется', inn: '' },
};

if (typeof window !== 'undefined') window.SITE_CONFIG = SITE_CONFIG;
