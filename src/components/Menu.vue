<template>
	<div>
		<div class="ui menu inverted violet borderless fixed top desktop-menu">
			<div class="ui container">
				<router-link class="header item" keydata="0" to="/">
					<div class="ui image">
						<img src="../assets/logo.png" />
					</div>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ appTitle }}
				</router-link>

				<router-link keydata="1" class="item" v-show="isLoggedIn" to="/my-paths">My Paths</router-link>

				<div class="menu right">
					<router-link keydata="2" class="item" v-show="isLoggedIn" to="/create-path">Create Path</router-link>
					<router-link keydata="3" class="item" v-show="isLoggedIn" to="/profile">{{ storage.getName() }}</router-link>
					<a class="item" v-show="isLoggedIn" @click="logOut">Log out</a>
				</div>
			</div>
		</div>

		<div class="ui menu icon fixed top violet inverted borderless mobile-menu">
			<a class="item"><i class="icon sidebar"></i></a>
			<a class="item" h>{{ appTitle }}</a>
		</div>

		<div class="ui large menu left sidebar vertical inverted borderless mobile-menu">
			<router-link to="/" class="item">
				<div class="ui image">
					<img src="../assets/logo.png" />
				</div>
			</router-link>
			<router-link keydata="0" class="header item" to="/">
				{{ appTitle }}
			</router-link>
			<router-link keydata="1" class="item" v-show="isLoggedIn" to="/my-paths">My Paths</router-link>

			<router-link keydata="2" class="item" v-show="isLoggedIn" to="/create-path">Create Path</router-link>
			<router-link keydata="3" class="item" v-show="isLoggedIn" to="/profile">{{ storage.getName() }}</router-link>
			<a class="item" v-show="isLoggedIn" @click="logOut">Log out</a>
		</div>
	</div>
</template>

<script>
export default {
	props: ["selectedMenuItem"],
	data () {
		return {
		};
	},
	methods: {
		logOut(e) {
			this.storage.deleteAll();
			this.reloadPage();
		},
		openLoginModal(e) {
			this.$root.$emit("openLoginModal", true);
		},
		openSignupModal(e) {
			this.$root.$emit("openSignupModal", true);
		}
	},
	mounted() {
		$("[keydata]").removeClass("active");
		if(this.selectedMenuItem != 0) {
			$(`[keydata="${this.selectedMenuItem}"]`).addClass("active");
		}

		$('.mobile-menu:not(.sidebar) > .item').click(() => {
			$('.mobile-menu.sidebar').sidebar('show');
		});
	}
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 767px){
	.desktop-menu {
		display: none;
	}
}

@media screen and (min-width: 768px){
	.mobile-menu {
		display: none;
	}

	.image {
		position: absolute;
	}
}

.align-center {
	text-align: center;
}

.image {
	width: 40px;

	border-radius: 50%;
	border: 0.7px solid #fff;
	padding: 4.5px;
}

</style>
