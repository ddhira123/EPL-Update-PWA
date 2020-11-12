/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
document.addEventListener("DOMContentLoaded", function () {
	// Activate sidebar nav
	const elems = document.querySelectorAll(".sidenav");
	M.Sidenav.init(elems);
	loadNav();
});

function loadNav() {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4) {
			if (this.status !== 200) return;

			// Muat daftar tautan menu
			document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
				// eslint-disable-next-line no-param-reassign
				elm.innerHTML = xhttp.responseText;
			});

			// Daftarkan event listener untuk setiap tautan menu
			document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
				elm.addEventListener("click", function (event) {
					// Tutup sidenav
					const sidenav = document.querySelector(".sidenav");
					M.Sidenav.getInstance(sidenav).close();

					// Muat konten halaman yang dipanggil
					const page = event.target.getAttribute("href").substr(1);
					loadPage(page);
				});
			});
		}
	};
	xhttp.open("GET", "nav.html", true);
	xhttp.send();
}