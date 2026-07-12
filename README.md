# Fluent Self — школа иностранных языков (взрослые)

Клон [firstuk.school](https://firstuk.school/) под бренд **Fluent Self**. Дети — [Fluent Self kids](https://fluentselfkids.ru).

## Быстрый старт

```bash
cp js/config.example.js js/config.js
npx serve .
```

## Скрипты

| Команда | Назначение |
|---------|------------|
| `node scripts/build-site.js` | Пересборка из `_ref-*.html` |
| `node scripts/modernize-html.js` | Патч HTML (a11y, SEO, формы) |

## Конфиг `js/config.js`

- Контакты, WhatsApp, карта, соцсети
- `siteUrl` — canonical и Open Graph
- `telegram` — заявки с формы (как на kids-сайте)

## Улучшения (modernize)

- Удалён **polyfill.io** (окно «Вход»)
- `css/site.css` — focus, cookie, адаптивная карта
- `js/site.js` — SEO meta, валидация формы, cookie-баннер
- `js/telegram.js` — отправка заявок
- `sitemap.xml`, `privacy.html`, favicon.svg
- Шрифты: Cormorant Garamond + Source Sans 3 (Google Fonts)

## Деплой Reg.ru

1. Залить файлы в корень домена
2. Создать `js/config.js` на сервере
3. Заполнить `siteUrl` и реальные контакты

## Медиа

Фото пока с CDN firstuk — замените на свои в HTML или скачайте в `assets/media/`.
