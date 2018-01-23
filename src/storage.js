module.exports = {
	getName() {
		if(window.localStorage.getItem("name") != undefined) {
			return window.localStorage.getItem("name");
		}
		return "";
	},
	getJwtToken() {
		if(window.localStorage.getItem("token") != undefined) {
			return window.localStorage.getItem("token");
		}
		return false;
	},
	saveName(name) {
		window.localStorage.setItem("name", name);
	},
	getKnowledge() {
		if(window.localStorage.getItem("knowledge") != undefined) {
			return JSON.parse(window.localStorage.getItem("knowledge"));
		}
		return [];
	},
	saveKnowledge(knowledge) {
		window.localStorage.setItem("knowledge", JSON.stringify(knowledge));
	},
	deleteKnowledge() {
		window.localStorage.removeItem("knowledge");
	},
	deleteJwtToken() {
		window.localStorage.removeItem("token");
	},
	saveJwtToken(token) {
		window.localStorage.setItem("token", token);
	},
	getIsLoggedIn() {
		return window.localStorage.getItem("token") != undefined;
	},
	deleteAll() {
		window.localStorage.clear();
	},
	savePaths(paths) {
		window.localStorage.setItem("paths", JSON.stringify(paths));
	},
	getPaths() {
		if(window.localStorage.getItem("paths") != undefined) {
			return JSON.parse(window.localStorage.getItem("paths"));
		}
		return [];
	},
	deletePaths() {
		window.localStorage.removeItem("paths");
	},
}