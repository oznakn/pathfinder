<template>
	<div id="app" :isLoggedIn="isLoggedIn">
		<app-menu :isLoggedIn="isLoggedIn"></app-menu>

		<app-known-subject-modal></app-known-subject-modal>
		<app-login-modal></app-login-modal>
		<app-signup-modal></app-signup-modal>

		<div id="app-content" class="ui container">
			<app-create-path v-if="isLoggedIn && currentPath == '/create-path'"></app-create-path>
			<app-profile     v-else-if="isLoggedIn && currentPath == '/profile'"></app-profile>
			<div v-else >Ozi</div>
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

import CreatePath from './pages/CreatePath.vue';
import Profile from './pages/Profile.vue';

export default {
	components: {
		'app-menu': Menu,
		'app-footer': Footer,
		'app-login-modal': LoginModal,
		'app-signup-modal': SignupModal,
		'app-profile': Profile,
		'app-create-path': CreatePath,
		'app-known-subject-modal': AddKnownSubjectModal
	},
	data () {
		return {
			currentPath: window.location.pathname,
			menus: [
				{name: 'PathFinder', url: '/'},
				{name: 'My Paths', url: '/my-paths'},
			]
		};
	},
	computed: {
		isLoggedIn() {
			return this.getIsLoggedIn();
		}
	},
	created() {

	}
}
</script>

<style scoped lang="scss">
#app {
	margin-top: 100px;
}

#app-content {
	min-height: 85vh;
}
</style>
