# Fluent Self — школа иностранных языков (взрослые)

Pixel-perfect клон [firstuk.school](https://firstuk.school/) под бренд **Fluent Self**.
Детские курсы — отдельный сайт [Fluent Self kids](https://fluentselfkids.ru).

## Быстрый старт

```bash
cd fluent-self
cp js/config.example.js js/config.js   # заполнить контакты
npx serve .
```

## Структура

```
index.html                    — главная
kursy-dlya-vzroslyh.html      — курсы для взрослых
kursy-dlya-detej.html         — дети (клон; в меню можно вести на kids-сайт)
korporativnoe-obuchenie.html  — бизнес
about.html, contacts.html, order.html, events.html, photo.html
assets/css/index.min.css      — стили firstuk (адаптированы)
assets/js/index.min.js        — поведение (menu, swiper, typeit, scroll)
js/config.js                  — контакты, Telegram (gitignore)
js/site.js                    — подстановка контактов + форма
scripts/build-site.js         — пересборка из _ref-*.html
```

## Пересборка из референса

Если обновили `_ref-*.html` с firstuk:

```bash
node scripts/build-site.js
```

## Деплой (Reg.ru, второй сайт на Host-0)

1. Залить папку `fluent-self` в корень домена
2. Создать `js/config.js` на сервере
3. `siteUrl` в config — ваш новый домен

## Отличия от firstuk

| | firstuk | Fluent Self |
|---|---------|-------------|
| Бренд | First UK School | Fluent Self |
| Дети в меню | локальная страница | ссылка на fluentselfkids.ru (опционально) |
| Форма | их backend | Telegram / mailto |
| Фото | их CDN | пока firstuk CDN (можно заменить) |
| Footer | Redo | ссылка на Fluent Self kids |

## Документация

- [docs/ANALYSIS-firstuk.md](docs/ANALYSIS-firstuk.md)
- [docs/PLAN.md](docs/PLAN.md)
