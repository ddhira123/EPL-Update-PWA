/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js',
);

if (workbox) {
	console.log('Workbox berhasil dimuat');
} else {
	console.log('Workbox gagal dimuat');
}

workbox.precaching.precacheAndRoute(
	[
		{ url: '/', revision: '1' },
		{ url: '/nav.html', revision: '1' },
		{ url: '/index.html', revision: '1' },
		{ url: '/teamDetails.html', revision: '1' },
		{ url: '/pages/home.html', revision: '1' },
		{ url: '/pages/about.html', revision: '1' },
		{ url: '/pages/favorites.html', revision: '1' },
		{ url: '/js/materialize.min.js', revision: '1' },
		{ url: '/js/nav.js', revision: '1' },
		{ url: '/js/notification.js', revision: '1' },
		{ url: '/js/pageLoader.js', revision: '1' },
		{ url: '/js/register_sw.js', revision: '1' },
		{ url: '/js/saved.js', revision: '1' },
		{ url: '/js/standingsApi.js', revision: '1' },
		{ url: '/js/teamDetails.js', revision: '1' },
		{ url: '/js/teamDetailsApi.js', revision: '1' },
		{ url: '/js/db.js', revision: '1' },
		{ url: '/js/idb.js', revision: '1' },
		{ url: '/css/materialize.min.css', revision: '1' },
		{ url: '/css/styles.css', revision: '1' },
		{ url: '/css/arrow.css', revision: '1' },
		{ url: '/img/bg-landing.jpg', revision: '1' },
		{ url: '/img/icon/logo-512x512.png', revision: '1' },
		{
			url: '/img/icon/android-icon-192x192-dunplab-manifest-20202.png',
			revision: '1',
		},
		{
			url: '/img/icon/favicon-16x16-dunplab-manifest-20202.png',
			revision: '1',
		},
		{ url: '/img/epl-club-alt.png', revision: '1' },
		{
			url:
				'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
			revision: '1',
		},
		{
			url:
				'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
			revision: '1',
		},
		{
			url:
				'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css',
			revision: '1',
		},
		{
			url:
				'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff2',
			revision: '1',
		},
		{
			url:
				'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-solid-900.woff2',
			revision: '1',
		},
		{ url: '/manifest.json', revision: '1' },
	],
	{
		ignoreURLParametersMatching: [/.*/],
	},
);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'epl-update-pages',
	}),
);

workbox.routing.registerRoute(
	new RegExp('https://api.football-data.org/v2'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'api',
		plugins: [
			new workbox.cacheableResponse.CacheableResponsePlugin({
				statuses: [200],
			}),
			new workbox.expiration.ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	}),
);

workbox.routing.registerRoute(
	new RegExp('/teamDetails.html'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'epl-team-details',
	}),
);

self.addEventListener('push', function (event) {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	const options = {
		body,
		icon: '/img/icon-512x512.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options),
	);
});
