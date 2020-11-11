/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const dbPromised = idb.open("epl_update", 1, function (upgradeDb) {
	const teamObjectStore = upgradeDb.createObjectStore("teams", {
		keyPath: "id",
	});
	teamObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
	dbPromised
		.then(function (db) {
			const tx = db.transaction("teams", "readwrite");
			const store = tx.objectStore("teams");
			store.put(team);
			return tx.complete;
		})
		.then(function () {
			console.log("Successfully saved!");
			const modal = document.querySelector("#popup");
			modal.innerHTML = `
			<div class="modal-content">
				<h4>Success</h4>
				<p>The team has been successfully added as favorite</p>
			</div>
			<div class="modal-footer">
				<a href="teamDetails.html?id=${team.id}&saved=true" class="modal-close waves-effect waves-green btn-flat">OK</a>
			</div>
			`;
		})
		.catch(function () {
			console.log("Failure in saving");
			const modal = document.querySelector("#popup");
			modal.innerHTML = `
			<div class="modal-content">
				<h4>Failed</h4>
				<p>The team has been failed to be added as favorite</p>
			</div>
			<div class="modal-footer">
				<a href="" class="modal-close waves-effect waves-green btn-flat">OK</a>
			</div>
			`;
		});
}

function getAll() {
	return new Promise(function (resolve, reject) {
		dbPromised
			.then(function (db) {
				const tx = db.transaction("teams", "readonly");
				const store = tx.objectStore("teams");
				console.log(store.getAll());

				return store.getAll();
			})
			.then(function (teams) {
				resolve(teams);
			});
	});
}

function getById(id) {
	return new Promise(function (resolve, reject) {
		dbPromised
			.then(function (db) {
				// eslint-disable-next-line no-param-reassign
				id = parseInt(id, 10);
				const tx = db.transaction("teams", "readonly");
				const store = tx.objectStore("teams");
				return store.get(id);
			})
			.then(function (team) {
				resolve(team);
				console.dir(team);
			});
	});
}

function deleteById(id) {
	return new Promise(function (resolve, reject) {
		dbPromised
			.then(function (db) {
				// eslint-disable-next-line no-param-reassign
				id = parseInt(id, 10);
				const tx = db.transaction("teams", "readwrite");
				const store = tx.objectStore("teams");
				store.delete(id);
				return tx.complete;
			})
			.then(function () {
				const modal = document.querySelector("#popup");
				modal.innerHTML = `
					<div class="modal-content">
						<h4>Success</h4>
						<p>The team has been successfully removed from favorite</p>
					</div>
					<div class="modal-footer">
						<a href="." class="modal-close waves-effect waves-green btn-flat">OK</a>
					</div>
					`;
				
			})
			.then(() => deleteTeamNotification())
			.catch(function (){
				console.log("Failure in removing team");
				const modal = document.querySelector("#popup");
				modal.innerHTML = `
				<div class="modal-content">
					<h4>Failed</h4>
					<p>The team has been failed to be removed from favorite</p>
				</div>
				<div class="modal-footer">
					<a href="." class="modal-close waves-effect waves-green btn-flat">OK</a>
				</div>
				`;
			});
	});
}
