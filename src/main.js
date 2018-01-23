import '../node_modules/semantic-ui-css/semantic.min.js';

import Vue from 'vue';
import axios from 'axios';
import lodash from 'lodash';
import vueLodash from 'vue-lodash';

import App from './App.vue';
import constants from './constants';

Vue.use(vueLodash, lodash);

Vue.mixin({
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
		deleteJwtToken() {
			window.localStorage.removeItem("token");
		},
		saveJwtToken(token) {
			window.localStorage.setItem("token", token);
		},
		getIsLoggedIn() {
			return window.localStorage.getItem("token") != undefined;
		}
	}
});

var vue = new Vue({
	el: '#app',
	render (h) {
		return h(App);
	}
});