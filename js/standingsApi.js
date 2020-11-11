/* eslint-disable no-console */
const baseUrl = "https://api.football-data.org/v2";
const xAuthToken = "9ceba8d90eb44e9b980b2aacb587d684";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
	if (response.status !== 200) {
		console.error(`Error : ${response.status}`);
		// Method reject() akan membuat blok catch terpanggil
		return Promise.reject(new Error(response.statusText));
	}
	// Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
	return Promise.resolve(response);
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
	return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(err) {
	// Parameter error berasal dari Promise.reject()
	console.error(`Error : ${err}`);
}

// Fetch Function
function fetchApi(url) {
	const newurl = url.toString();
	return fetch(newurl, {
		method: "GET",
		headers: {
			"X-Auth-Token": xAuthToken,
		},
	});
}

function teamsListBuilder(data) {
	// Objek/array JavaScript dari response.json() masuk lewat data.
	// Menyusun komponen card artikel secara dinamis
	let teamsHTML = "";
	data.forEach(function (team) {
		teamsHTML += `
			<a href="teamDetails.html?id=${team.team.id}" class="card horizontal sticky-action valign-wrapper" style="padding: 1rem;">
				<div class="col s1"><span class="card-title">${team.position}</span></div>
				<div class="col s11 valign-wrapper"> 
					<div class="card-image waves-effect waves-block waves-light hide-on-small-and-down">
						<img src="${team.team.crestUrl}" style="height: 10vw; width: 10vw;" alt="Logo of ${team.team.name}" 
						onError="this.onerror=null;this.src='/img/epl-club-alt.png';"/>
					</div>
					<div style="padding-left: 2vw;">
						<span class="card-title">${team.team.name}</span>
					</div>
				</div>
			</a>
			`;
	});
	return teamsHTML;
}

// Blok kode untuk melakukan request data json
// eslint-disable-next-line no-unused-vars
function getStandings() {
	const url = `${baseUrl}/competitions/2021/standings`;
	if ("caches" in window) {
		caches.match(url).then(function (response) {
			if (response) {
				response.json().then((data) => {
					const teamsHTML = teamsListBuilder(data.standings[0].table);
					// Sisipkan komponen card ke dalam elemen dengan id #teams
					document.getElementById("teams").innerHTML = teamsHTML;
				});
			}
		});
	}

	fetchApi(url)
		.then(status)
		.then(json)
		.then(function (data) {
			const teamsHTML = teamsListBuilder(data.standings[0].table);
			document.getElementById("teams").innerHTML = teamsHTML;
		})
		.catch(error);
}
