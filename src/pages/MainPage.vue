<template>
	<div class="main">
		<div v-show="!isLoggedIn">
			<h1 class="welcome-title">Welcome to {{ appTitle }}</h1>
			<div class="ui grid">
				<div class="ui row">
					<div class="ten wide centered column">
						<a class="ui green massive button" @click="openLoginModal">Log In</a>
						<a class="ui blue massive button" @click="openSignupModal">Sign Up</a>
					</div>
				</div>
			</div>
		</div>
		<div v-show="isLoggedIn">
			<h1>Welcome back, {{ this.getName() }}</h1>
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
	props: ["isLoggedIn"],
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
		for(var path of this.paths) {
			if(this.types.indexOf(path.type) == -1) {
				this.types.push(path.type);
			}
		}
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

.main {
	margin-top: 60px;
}

a.massive.button {
	margin-bottom: 20px;
}

@media screen and (max-width: 767px) {
	.main {
		overflow: scroll;
	}
}
</style>


