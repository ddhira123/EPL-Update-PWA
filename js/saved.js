/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function getSavedTeams() {
	getAll().then((teams) => {
		let teamsHTML = "";
		teams.forEach((team) => {
			teamsHTML += `
        <div class="col s12 m6 l4" >
          <div class="card center flat">
            <a href="teamDetails.html?id=${team.id}&saved=true">
              <div class=" card-content">                   
                <img src="${team.crestUrl}" style="max-width:200px; max-height:200px" 
                alt="Logo of ${team.name}" onError="this.onerror=null;this.src='/img/epl-club-alt.png';"/>                 
                <h4>${team.name}</h4>
                <p>Founded in ${team.founded}</p>
                <p>Address: ${team.address}</p>
                <p>Website: ${team.website}</p>
                <p>Venue: ${team.venue}</p>
              </div>
            </a>
          </div>
        </div>`;
		});
		if(teams.length !== 0){
			document.getElementById("no-fav-data").style.display = "none";
			document.querySelector("#favorited").innerHTML = teamsHTML;
		}
	});
}

function deleteSavedTeamById() {
	const urlParams = new URLSearchParams(window.location.search);
	const idParam = urlParams.get("id");
	deleteById(idParam);
}