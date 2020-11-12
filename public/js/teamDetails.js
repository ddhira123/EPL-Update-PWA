/* eslint-disable no-undef */
/* eslint-disable block-scoped-var */
document.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search);
	const isFormSaved = urlParams.get("saved");
	document.getElementById("preloader").classList.add("active");
	document.getElementById("body-content").style.display = "none";
	setTimeout(() => {
		document.getElementById("preloader").classList.remove("active");
		document.getElementById("body-content").style.display = "";
	}, 1500);
	const btnSave = document.querySelector("#save");
	const btnDelete = document.querySelector("#delete");

	const elems = document.querySelectorAll('.modal');
	M.Modal.init(elems);

	if (isFormSaved) {
		btnSave.style.display = "none";
		getSavedTeamDetailsById();
	} else {
		btnDelete.style.display = "none";
		item = getTeamDetailsById();
	}

	btnSave.onclick = () => {
		item
			.then((team) => {
				saveForLater(team);
			})
			.then(() => {
				saveTeamNotification();
			});
	};

	btnDelete.onclick = () => {
		deleteSavedTeamById();
	};
});


