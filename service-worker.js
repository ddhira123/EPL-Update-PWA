/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'eplupdate';
const urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/teamDetails.html',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/favorites.html',
	'/js/materialize.min.js',
	'/js/nav.js',
	'/js/notification.js',
	'/js/pageLoader.js',
	'/js/register_sw.js',
	'/js/saved.js',
	'/js/standingsApi.js',
	'/js/teamDetails.js',
	'/js/teamDetailsApi.js',
	'/js/db.js',
	'/js/idb.js',
	'/css/materialize.min.css',
	'/css/styles.css',
	'/css/arrow.css',
	'/img/bg-landing.jpg',
	'/img/icon/logo-512x512.png',
	'/img/icon/android-icon-192x192-dunplab-manifest-20202.png',
	'/img/icon/apple-icon-180x180-dunplab-manifest-20202.png',
	'/img/icon/apple-icon-152x152-dunplab-manifest-20202.png',
	'/img/icon/apple-icon-144x144-dunplab-manifest-20202.png',
	'/img/icon/apple-icon-120x120-dunplab-manifest-20202.png',
	'/img/icon/apple-icon-114x114-dunplab-manifest-20202.png',
	'/img/icon/favicon-96x96-dunplab-manifest-20202.png',
	'/img/icon/apple-icon-76x76-dunplab-manifest-20202.png',
	'/img/icon/apple-icon-72x72-dunplab-manifest-20202.png',
	'/img/icon/apple-icon-60x60-dunplab-manifest-20202.png',
	'/img/icon/apple-icon-57x57-dunplab-manifest-20202.png',
	'/img/icon/favicon-32x32-dunplab-manifest-20202.png',
	'/img/icon/favicon-16x16-dunplab-manifest-20202.png',
	'/img/epl-club-alt.png',
	'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
	'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
	'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff2',
	'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-solid-900.woff2',
	'/manifest.json',
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

self.addEventListener('push', function (event) {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	const options = {
		body,
		icon: 'img/icon-512x512.png',
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