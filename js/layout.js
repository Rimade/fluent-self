/**
 * Fluent Self — загрузка partials и бандла firstuk
 */
(function () {
	const PARTIALS = {
		'site-chrome': 'partials/chrome.html',
		'site-footer': 'partials/footer.html',
		'site-icons': 'partials/icons.svg',
	};

	async function loadPartials() {
		await Promise.all(
			Object.entries(PARTIALS).map(async ([id, file]) => {
				const el = document.getElementById(id);
				if (!el) return;
				try {
					const res = await fetch(file);
					if (res.ok) el.innerHTML = await res.text();
				} catch (e) {
					console.warn('Partial load failed:', file, e);
				}
			}),
		);

		revealPage();
		document.dispatchEvent(new CustomEvent('partials:ready'));
		loadAppBundle();
	}

	function revealPage() {
		document.documentElement.classList.remove('partials-pending');
		requestAnimationFrame(() => {
			document.documentElement.classList.add('partials-ready');
		});
	}

	function loadAppBundle() {
		if (window.__fsBundleLoaded) return;
		window.__fsBundleLoaded = true;

		const vendor = document.createElement('script');
		vendor.src = 'https://cdn.jsdelivr.net/combine/npm/es6-tween@5,npm/typeit@6,npm/swiper@4';
		vendor.onload = () => {
			const app = document.createElement('script');
			app.src = 'assets/js/index.min.js';
			document.body.appendChild(app);
		};
		document.body.appendChild(vendor);
	}

	if (document.getElementById('site-chrome')) {
		loadPartials().catch(() => revealPage());
	} else {
		revealPage();
		loadAppBundle();
	}
})();
