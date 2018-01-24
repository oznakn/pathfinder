<template>
	<div class="main">
		<div v-if="!isLoggedIn" class="main-no-login">
			<img class="background-image" src="../assets/notebook.png"/>
			<div class="overlay"></div>
			<h1 class="welcome-title">Welcome to {{ appTitle }}</h1>
			<div class="ui grid">
				<div class="ui row">
					<div class="ten wide centered column">
						<a class="ui green massive button" @click="openLoginModal">Log In</a>
						<a class="ui blue massive button" @click="openSignupModal">Sign Up</a>
					</div>
				</div>
			</div>

			<h5 class="taken-by">Photos taken from <a href="https://www.pexels.com/" target="_blank">Pexels</a>, under CC0 license</h5>
		</div>
		<app-calendar v-else></app-calendar>
	</div>
</template>

<script>
import Calendar from '../components/Calendar';

export default {
	components: {
		'app-calendar': Calendar
	},
	data() {
		return {

		};
	},
	methods: {
		openLoginModal(e) {
			this.$root.$emit("openLoginModal", true);
		},
		openSignupModal(e) {
			this.$root.$emit("openSignupModal", true);
		}
	},
	mounted() {
		setTimeout(() => {
			$(".background-image").addClass("no-blur");
		}, 250);
	}
}
</script>

<style scoped lang="scss">
.welcome-title {
	margin-bottom: 25px;
}
h1,h2 {
	text-align: center;
}
.column {
	text-align: center;
}

.main-no-login {
	position: fixed;
	top: 130px;
	right: 0;
	left: 0;
	color: white;
}

a.massive.button {
	margin-bottom: 20px;
}

.background-image {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	width: 100%;
    height: 100%;
    object-fit: cover;

	z-index: -40;

	filter: blur(25px);

	transition: 1200ms all ease-in-out;

	&.no-blur {
		filter: blur(0px);
	}
}

.logo-image {
	position: fixed;
	left: 50%;
	right: 0;

	bottom: 10vh;

	min-width: 30px;
	max-width: 120px;
	width: 25vw;

	transform: translateX(-50%);
	z-index: -37;
}

.overlay {
	background-color: rgba(0,0,0,0.3);
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: -35;
}

.taken-by {
	position: fixed;
	right: 10px;
	bottom: 50px;
}

@media screen and (max-width: 767px) {
	.main {
		overflow: scroll;
	}
}
</style>