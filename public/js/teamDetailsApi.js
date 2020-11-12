/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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

function parseMonth(m) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return months[m];
}

function teamDetailsBuilder(data) {
	const teamHTML = `
        <div class="card flat">
            <div class="card-content row" style="width: 80%">
                <div class="col s12 l3 center-align">                   
					<img src="${data.crestUrl}" alt="image" style="max-width:200px; max-height:200px;" 
					alt="Logo of ${data.name}" onError="this.onerror=null;this.src='/img/epl-club-alt.png';"/> 
                </div>
                <div class="col l1"></div>        
                <div class="col l8 hide-on-med-and-down">        
                    <h3>${data.name}</h3>
                    <p style="font-size: 1.25rem;">Founded in ${data.founded}</p>
                    <p style="font-size: 1.25rem;">Address: ${data.address}</p>
                    <p style="font-size: 1.25rem;">Website: <a href="${data.website}">${data.website}</a></p>
                    <p style="font-size: 1.25rem;">Venue: ${data.venue}</p>
                </div>
                <div class="col center s12 show-on-medium-and-down hide-on-med-and-up">        
                    <h3>${data.name}</h3>
                    <p style="font-size: 1.25rem;">Founded in ${data.founded}</p>
                    <p style="font-size: 1.25rem;">Address: ${data.address}</p>
                    <p style="font-size: 1.25rem;">Website: <a href="${data.website}">${data.website}</a></p>
                    <p style="font-size: 1.25rem;">Venue: ${data.venue}</p>
                </div>
            </div>
        </div>
        `;
	return teamHTML;
}

function teamMemberListBuilder(members) {
	let membersListHTML = "";
	let pos = "";
	members.forEach(function (member) {
		if (pos !== member.position) {
			pos = member.position;
			membersListHTML += `
                <div><h3>${pos !== null ? `${member.position}(s)` : "Coach(es)"}</h3></div>
                <div class="divider"></div>
            `;
		}
		const date = new Date(member.dateOfBirth);
		membersListHTML += `
            <div class="card col s12 m5">
                <div class="card-content team-member">
                    <div class="card-title">${member.name}</div>
                    <p style="font-size: 1.25rem;">Role: ${member.role}</p>
            `;
		if(member.position !== null){
			membersListHTML += `<p style="font-size: 1.25rem;">Position: ${member.position !== null ? member.position : "-"}</p>`;
		}
		membersListHTML += `
                    <p style="font-size: 1.25rem;">Birthday: ${date.getDate()} ${parseMonth(date.getUTCMonth())} ${date.getFullYear()}</p>
                    <p style="font-size: 1.25rem;">Nationality: ${member.nationality}</p>
                </div>
            </div>
        `;
	});
	return membersListHTML;
}

// Get Single Team & Team Members
function getTeamDetailsById() {
	return new Promise(function (resolve, reject) {
		const urlParams = new URLSearchParams(window.location.search);
		const idParams = urlParams.get("id");
		// from cache
		if ("caches" in window) {
			caches.match(`${baseUrl}/teams/${idParams}`).then(function (response) {
				if (response) {
					response.json().then(function (data) {
						const teamHTML = teamDetailsBuilder(data);
						const membersHTML = teamMemberListBuilder(data.squad);
						document.querySelector("#team-detail").innerHTML = teamHTML;
						document.querySelector("#members").innerHTML = membersHTML;
						resolve(data);
					});
				}
			});
		}
		// from server

		fetchApi(`${baseUrl}/teams/${idParams}`)
			.then(status)
			.then(json)
			.then(function (data) {
				const teamHTML = teamDetailsBuilder(data);
				const membersHTML = teamMemberListBuilder(data.squad);
				document.querySelector("#team-detail").innerHTML = teamHTML;
				document.querySelector("#members").innerHTML = membersHTML;
				resolve(data);
			})
			.catch(error);
	});
}

// Get all saved Team members from single Team from IDB
function getSavedTeamDetailsById() {
	const urlParams = new URLSearchParams(window.location.search);
	const idParam = urlParams.get("id");
	console.log(`id parameters: ${idParam}`);
	getById(idParam).then(function (data) {
		console.log(data);
		const teamHTML = teamDetailsBuilder(data);
		const membersHTML = teamMemberListBuilder(data.squad);
		document.querySelector("#team-detail").innerHTML = teamHTML;
		document.querySelector("#members").innerHTML = membersHTML;
	});
}
