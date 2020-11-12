/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');
 
if (workbox){
	console.log('Workbox berhasil dimuat');
	workbox.precaching.precacheAndRoute([
		{ url: '/EPL-Update-PWA/', revision: '1' },
		{ url: '/EPL-Update-PWA/nav.html', revision: '1' },
		{ url: '/EPL-Update-PWA/index.html', revision: '1' },
		{ url: '/EPL-Update-PWA/teamDetails.html', revision: '1' },
		{ url: '/EPL-Update-PWA/pages/home.html', revision: '1' },
		{ url: '/EPL-Update-PWA/pages/about.html', revision: '1' },
		{ url: '/EPL-Update-PWA/pages/favorites.html', revision: '1' },
		{ url: '/EPL-Update-PWA/js/materialize.min.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/nav.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/notification.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/pageLoader.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/register_sw.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/saved.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/standingsApi.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/teamDetails.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/teamDetailsApi.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/db.js', revision: '1' },
		{ url: '/EPL-Update-PWA/js/idb.js', revision: '1' },
		{ url: '/EPL-Update-PWA/css/materialize.min.css', revision: '1' },
		{ url: '/EPL-Update-PWA/css/styles.css', revision: '1' },
		{ url: '/EPL-Update-PWA/css/arrow.css', revision: '1' },
		{ url: '/EPL-Update-PWA/img/bg-landing.jpg', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/logo-512x512.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/android-icon-192x192-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/apple-icon-180x180-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/apple-icon-152x152-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/apple-icon-144x144-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/apple-icon-120x120-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/apple-icon-114x114-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/favicon-96x96-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/apple-icon-76x76-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/apple-icon-72x72-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/apple-icon-60x60-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/apple-icon-57x57-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/favicon-32x32-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/icon/favicon-16x16-dunplab-manifest-20202.png', revision: '1' },
		{ url: '/EPL-Update-PWA/img/epl-club-alt.png', revision: '1' },
		{ url: 'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap', revision: '1' },
		{ url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
		{ url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css', revision: '1' },
		{ url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff2', revision: '1' },
		{ url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-solid-900.woff2', revision: '1' },
		{ url: '/EPL-Update-PWA/manifest.json', revision: '1' },
	],
	{
		ignoreURLParametersMatching: [/.*/]
	});
	workbox.routing.registerRoute(
		new RegExp('/EPL-Update-PWA/pages/'),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'epl-update-pages',
		})
	);
	workbox.routing.registerRoute(
		new RegExp('https://api.football-data.org/v2'),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'api',
		})
	);
	workbox.routing.registerRoute(
		new RegExp('/EPL-Update-PWA/teamDetails.html'),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'epl-team-details',
		})
	);
}
else{
	console.log('Workbox gagal dimuat');
	const CACHE_NAME = 'eplupdate';
	const urlsToCache = [
		'/EPL-Update-PWA/',
		'/EPL-Update-PWA/nav.html',
		'/EPL-Update-PWA/index.html',
		'/EPL-Update-PWA/teamDetails.html',
		'/EPL-Update-PWA/pages/home.html',
		'/EPL-Update-PWA/pages/about.html',
		'/EPL-Update-PWA/pages/favorites.html',
		'/EPL-Update-PWA/js/materialize.min.js',
		'/EPL-Update-PWA/js/nav.js',
		'/EPL-Update-PWA/js/notification.js',
		'/EPL-Update-PWA/js/pageLoader.js',
		'/EPL-Update-PWA/js/register_sw.js',
		'/EPL-Update-PWA/js/saved.js',
		'/EPL-Update-PWA/js/standingsApi.js',
		'/EPL-Update-PWA/js/teamDetails.js',
		'/EPL-Update-PWA/js/teamDetailsApi.js',
		'/EPL-Update-PWA/js/db.js',
		'/EPL-Update-PWA/js/idb.js',
		'/EPL-Update-PWA/css/materialize.min.css',
		'/EPL-Update-PWA/css/styles.css',
		'/EPL-Update-PWA/css/arrow.css',
		'/EPL-Update-PWA/img/bg-landing.jpg',
		'/EPL-Update-PWA/img/icon/logo-512x512.png',
		'/EPL-Update-PWA/img/icon/android-icon-192x192-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/apple-icon-180x180-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/apple-icon-152x152-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/apple-icon-144x144-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/apple-icon-120x120-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/apple-icon-114x114-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/favicon-96x96-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/apple-icon-76x76-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/apple-icon-72x72-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/apple-icon-60x60-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/apple-icon-57x57-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/favicon-32x32-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/icon/favicon-16x16-dunplab-manifest-20202.png',
		'/EPL-Update-PWA/img/epl-club-alt.png',
		'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
		'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff2',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-solid-900.woff2',
		'/EPL-Update-PWA/manifest.json',
	];

	self.addEventListener('install', (event) => {
		event.waitUntil(
			caches.open(CACHE_NAME)
				.then((cache) => cache.addAll(urlsToCache)),
		);
	});

	self.addEventListener('activate', (event) => {
		event.waitUntil(
			caches.keys()
				.then((cacheNames) => Promise.all(
					cacheNames.map((cacheName) => {
						if (cacheName != CACHE_NAME) {
							console.log(`ServiceWorker: cache ${cacheName} dihapus`);
							return caches.delete(cacheName);
						}
					}),
				)),
		);
	});

	self.addEventListener('fetch', function(event) {
		const baseUrl = 'https://api.football-data.org/v2';


		if (event.request.url.indexOf(baseUrl) > -1) {
			event.respondWith(
				caches.open(CACHE_NAME).then(function(cache) {
					return fetch(event.request).then(function(response) {
						cache.put(event.request.url, response.clone());
						return response;
					})
				})
			);
		} else {
			event.respondWith(
				caches.match(event.request, { ignoreSearch: true }).then(function(response) {
					return response || fetch (event.request);
				})
			)
		}
	});
}

self.addEventListener('push', function (event) {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	const options = {
		body,
		icon: '/EPL-Update-PWA/img/icon-512x512.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});