<template>
	<div class="ui modal" ref="loginModal">
		<p class="header">Log in</p>
		<div class="content">
			<div class="description">
				<div class="ui container">
					<div class="ui grid">
						<div class="ui row">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<div class="ui fluid labeled input">
								<div class="ui label">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
									<input type="text" ref="inputEmail" />
								</div>
							</div>
						</div>
						<div class="ui row">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<div class="ui fluid labeled input">
									<div class="ui label">Password: </div>
									<input type="password" ref="inputPassword"/>
								</div>
							</div>
						</div>
						<div class="ui row" v-show="loginDone || loginError">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<div class="ui message" v-show="loginDone">
									<p>Success</p>
								</div>
								<div class="ui message" v-show="loginError">
									<p>Error</p>
								</div>
							</div>
						</div>
						<div class="ui row" v-show="showLoader">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<div class="ui inverted dimmer active">
									<div class="ui inverted loader"></div>
								</div>
							</div>
						</div>
						<div class="ui row">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<a class="ui button positive" @click="login">
									Log in
								</a>
								<a class="ui button deny" @click="closeModal">
									Back
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import constants from "../constants";

export default {
	data() {
		return {
			loginDone: false,
			loginError: false,
			showLoader: false
		};
	},
	methods: {
		closeModal(e) {
			$(this.$refs.loginModal).modal('hide');
		},
		login(e) {
			var email = this.$refs.inputEmail.value;
			var password = this.$refs.inputPassword.value;

			if(email != "" && password != "") {
				this.showLoader = true;
				$(this.$refs.loginModal).modal('refresh');

				this.getAxios().post("/auth/local",
					{email: email, password: password})
					.then((response) => {
						if(response.data != undefined) {
							this.storage.saveJwtToken(response.data.token);

							return true;
						}
						return false;
					})
					.then((move) => {
						if(move) {
							return this.getAxios().get("/users/profile")
								.then((response) => {
									if(response.data != undefined && response.data.user != undefined) {
										this.storage.saveName(response.data.user.name);
										this.loginDone = true;

										setTimeout(() => {
											this.loginDone = false;
											this.loginError = false;
											this.showLoader = false;

											this.reloadPage();
										}, 500);
									}
								});
						}

						this.showLoader = false;
						this.$refs.inputEmail.value = "";
						this.$refs.inputPassword.value = "";

						return false;
					})
					.catch(() => {
						this.loginError = false;
						this.showLoader = false;
					});
			}

		}
	},
	mounted() {
		this.$root.$on('openLoginModal', (data) => {
			$(this.$refs.loginModal).modal('show');
		});
	}
}
</script>

<style scoped lang="scss">
.dimmer.active {
	padding: 10px 0;
}

@media screen and (max-width: 767px) {
	.ui.modal {
		.ui.container {
			margin: 0 !important;
		}

		.ui.centered.column {
			margin: 0px !important;
			padding: 10px !important;
		}
	}
}
</style>


