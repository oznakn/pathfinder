<template>
	<div>
		<div class="ui menu blue inverted borderless fixed top">
			<div class="ui container">
				<a class="item" href="/">PathFinder</a>
				<a class="item" v-show="isLoggedIn" href="/my-paths">My Paths</a>

				<div class="menu right">
					<a class="item" v-show="isLoggedIn" href="/create-path">Create Path</a>
					<a class="item" v-show="isLoggedIn" href="/profile">{{ getName() }}</a>
					<a class="item" v-show="isLoggedIn" @click="logOut">Log out</a>
					<a class="item" v-show="!isLoggedIn" @click="openLoginModal">Log in</a>
					<a class="item" v-show="!isLoggedIn" @click="openSignupModal">Sign up</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["isLoggedIn"],
	data () {
		return {
		};
	},
	methods: {
		logOut(e) {
			this.deleteJwtToken();
			this.reloadPage();
		},
		openLoginModal(e) {
			this.$root.$emit("openLoginModal", true);
		},
		openSignupModal(e) {
			this.$root.$emit("openSignupModal", true);
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
