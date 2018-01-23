import '../node_modules/semantic-ui-css/semantic.min.js';

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import lodash from 'lodash';
import vueLodash from 'vue-lodash';

import App from './App.vue';
import constants from './constants';
import routes from './routes';

Vue.use(vueLodash, lodash);
Vue.use(VueRouter);

Vue.mixin({
	data() {
		return {
			appTitle: 'Pathpal'
		};
	},
	methods: {
		getAxios() {
			if(this.getIsLoggedIn()) {
				return axios.create({
					baseURL: constants.SERVER,
					headers: {'Authorization': this.getJwtToken()}
				});
			}
			else {
				return axios.create({
					baseURL: constants.SERVER
				});
			}
		},
		getName() {
			if(window.localStorage.getItem("name") != undefined) {
				return window.localStorage.getItem("name");
			}
			return "";
		},
		reloadPage() {
			window.location.reload();
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
			window.localStorage.setItem("knowledge", knowledge);
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
		getMonthString(number) {
			switch(number) {
				case 0: return "Sunday";
				case 1: return "Monday";
				case 2: return "Tuesday";
				case 3: return "Wednesday";
				case 4: return "Thursday";
				case 5: return "Friday";
				case 6: return "Saturday";
			}
		}
	}
});

var router = new VueRouter({
	routes: routes
});

var vue = new Vue({
	el: '#app',
	router: router,
	render: (h) => h(App)
});