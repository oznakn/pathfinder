<template>
	<div class="main">
		<div v-show="!isLoggedIn" class="main-no-login">
			<img class="background-image" src="../assets/learning.png"/>
			<img class="logo-image" src="../assets/logo.png"/>
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
		<div v-show="isLoggedIn">
			<h1>Welcome back, {{ storage.getName() }}</h1>
			<h2>{{ this.title }}</h2>
			<table class="ui unstackable celled table">
				<thead>
					<tr>
						<th>{{ getMonthString(new Date().getDay()) }}</th>
						<th>{{ getMonthString(new Date().getDay() + 1) }}</th>
						<th>{{ getMonthString(new Date().getDay() + 2) }}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>First</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th colspan="3">
							<div class="ui right floated pagination menu">
								<a @click="selectType(index)" :class="{item: true, active: selectedType == index}" v-for="(item, index) in types" :key="index">{{ item }}</a>
							</div>
						</th>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selectedType: 0,
			paths: [
				{type: "C++"},
				{type: "Python"},
				{type: "Java"},
				{type: "C++"},
				{type: "Arduino"},
			],
			types: []
		};
	},
	methods: {
		openLoginModal(e) {
			this.$root.$emit("openLoginModal", true);
		},
		openSignupModal(e) {
			this.$root.$emit("openSignupModal", true);
		},
		selectType(type) {
			this.selectedType = type;
		}
	},
	computed: {
		title() {
			return this.types[this.selectedType] || "";
		}
	},
	mounted() {
		if(this.isLoggedIn) {
			for(var path of this.paths) {
				if(this.types.indexOf(path.type) == -1) {
					this.types.push(path.type);
				}
			}
		}

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
	top: 10vh;
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