/* eslint-disable no-unused-vars */
function saveTeamNotification() {
	const title = "Team Saved";
	const options = {
		body:
			"Congratulations, your team has been successfully added to favorites!",
		icon: "/EPL-Update-PWA/img/icon/android-icon-192x192-dunplab-manifest-20202.png",
		badge: "/EPL-Update-PWA/img/icon/logo-512x512.png",
		tag: "message-group-1",
		renotify: true,
	};
	if (Notification.permission === "granted") {
		navigator.serviceWorker.ready.then(function (regis) {
			regis.showNotification(title, options);
		});
	} else {
		console.error("Fitur Notifikasi tidak diizinkan");
	}
}

function deleteTeamNotification() {
	const title = "Team Deleted";
	const options = {
		body:
			"Congratulations, your team has been successfully removed from favorites!",
		icon: "/EPL-Update-PWA/img/icon/android-icon-192x192-dunplab-manifest-20202.png",
		badge: "/EPL-Update-PWA/img/icon/logo-512x512.png",
		tag: "message-group-1",
		renotify: true,
	};
	if (Notification.permission === "granted") {
		navigator.serviceWorker.ready.then(function (regis) {
			regis.showNotification(title, options);
		});
	} else {
		console.error("Fitur Notifikasi tidak diizinkan");
	}
}
