<template>
	<div id="app">
		<app-menu :selectedMenuItem="selectedMenuItem"></app-menu>

		<app-known-subject-modal v-if="isLoggedIn"></app-known-subject-modal>
		<app-what-do-you-wanna-learn-modal v-if="isLoggedIn"></app-what-do-you-wanna-learn-modal>

		<app-login-modal></app-login-modal>
		<app-signup-modal></app-signup-modal>

		<div id="app-content" class="ui container">
			<router-view></router-view>
		</div>

		<app-footer></app-footer>
	</div>
</template>

<script>
import axios from "axios";

import Menu from './components/Menu.vue';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal.vue';
import SignupModal from './components/SignupModal.vue';
import AddKnownSubjectModal from './components/AddKnownSubjectModal.vue';
import WhatDouYouWannaLearnModal from './components/WhatDouYouWannaLearnModal.vue';

export default {
	components: {
		'app-menu': Menu,
		'app-footer': Footer,
		'app-login-modal': LoginModal,
		'app-signup-modal': SignupModal,
		'app-known-subject-modal': AddKnownSubjectModal,
		'app-what-do-you-wanna-learn-modal': WhatDouYouWannaLearnModal
	},
	data () {
		return {
			selectedMenuItem: 0
		};
	},
	created() {
		this.$root.$on("setSelectedMenuItem", (data) => {
			this.selectedMenuItem = data;
		});

		if(!this.isLoggedIn) {
			this.$router.push('/');
		}
	},
	mounted() {
		if(window.location.pathname == "/my-paths") {
			this.selectedMenuItem = 1;
		}
		else if(window.location.pathname == "/create-path") {
			this.selectedMenuItem = 2;
		}
		else {
			this.selectedMenuItem = 0;
		}
	}
}
</script>

<style scoped lang="scss">
#app {
	background-color: rgba(230, 230, 230, 0.5);
	padding-top: 100px;
	min-height: 100vh;
	padding-bottom: 100px;
}

#app-content {
	min-height: 60vh;
}
</style>

<style lang="scss">
.centered.column {
	text-align: center;
}

body {
	min-height: 100vh;
}
</style>