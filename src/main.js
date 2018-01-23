import '../node_modules/semantic-ui-css/semantic.min.js';

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import lodash from 'lodash';
import vueLodash from 'vue-lodash';

import App from './App.vue';
import constants from './constants';
import routes from './routes';
import storage from './storage';

Vue.use(vueLodash, lodash);
Vue.use(VueRouter);

Vue.mixin({
	data() {
		return {
			appTitle: 'PathFinder',
			storage: storage
		};
	},
	computed: {
		isLoggedIn() {
			return this.storage.getIsLoggedIn();
		}
	},
	methods: {
		getAxios() {
			if(this.storage.getIsLoggedIn()) {
				return axios.create({
					baseURL: constants.SERVER,
					headers: {'Authorization': this.storage.getJwtToken()}
				});
			}
			else {
				return axios.create({
					baseURL: constants.SERVER
				});
			}
		},
		reloadPage() {
			window.location.reload();
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