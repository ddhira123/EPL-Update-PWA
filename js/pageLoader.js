/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function () {
	// Load page content
	let page = window.location.hash.substr(1);
	if (page === "" || page === "#") page = "home";
	loadPage(page);
});


function loadPage(page) {
	const xhttp = new XMLHttpRequest();

	if(page === "home"){
		document.getElementById("body-content").classList.remove("container");
	} else {
		document.getElementById("body-content").classList.add("container");
	}
    
    document.getElementById("body-content").style.display = "none";
    document.getElementById("preloader").classList.add("active");
	setTimeout(() => {
		document.getElementById("preloader").classList.remove("active");
		document.getElementById("body-content").style.display = "";
	}, 2000);

	xhttp.onreadystatechange = function () {
		if (this.readyState === 4) {
			const content = document.querySelector("#body-content");
			if (this.status === 200) {
				content.innerHTML = xhttp.responseText;
				if (page === "home") {
					getStandings();
				} else if (page === "favorites") {
					getSavedTeams();
				}
			} else if (this.status === 404) {
				content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
			} else {
				content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
			}
		}
	};
	xhttp.open("GET", `pages/${  page  }.html`, true);
	xhttp.send();
}