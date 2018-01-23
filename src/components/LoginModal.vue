<template>
	<div class="ui modal" ref="loginModal">
		<p class="header">Log in</p>
		<div class="content">
			<div class="description">
				<div class="ui container">
					<div class="ui grid">
						<div class="ui centered row">
							<div class="ui eight wide column">
								<div class="ui fluid labeled input">
								<div class="ui label">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
									<input type="text" ref="inputEmail" />
								</div>
							</div>
						</div>
						<div class="ui centered row">
							<div class="ui eight wide column">
								<div class="ui fluid labeled input">
									<div class="ui label">Password: </div>
									<input type="password" ref="inputPassword"/>
								</div>
							</div>
						</div>
						<div class="ui centered row">
							<div class="ui eight wide column">
								<div class="ui message" v-show="loginDone">
									<p>Success</p>
								</div>
								<div class="ui message" v-show="loginError">
									<p>Error</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="actions">
			<a class="ui button positive" @click="login">
				Log in
			</a>
			<a class="ui button deny">
				Back
			</a>
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
			loginError: false
		};
	},
	methods: {
		login(e) {
			var email = this.$refs.inputEmail.value;
			var password = this.$refs.inputPassword.value;

			if(email != "" && password != "") {
				this.getAxios().post("/auth/local",
					{email: email, password: password})
					.then((response) => {
						console.log(response);

						if(response.data != undefined) {
							this.saveJwtToken(response.data.token);

							return true;
						}
						return false;
					})
					.then((move) => {
						if(move) {
							return this.getAxios().get("/users/profile")
								.then((response) => {
									console.log(response);

									if(response.data != undefined && response.data.user != undefined) {
										this.saveName(response.data.user.name);
										this.loginDone = true;

										setTimeout(() => {
											this.loginDone = false;
											this.loginError = false;

											this.reloadPage();
										}, 1500);
									}
								});
						}

						this.$refs.inputEmail.value = "";
						this.$refs.inputPassword.value = "";

						return false;
					})
					.catch(() => {
						this.loginError = false;
					});
			}

		}
	},
	mounted() {
		this.$root.$on('openLoginModal', (data) => {
			console.log('openLoginModal');
			$(this.$refs.loginModal).modal('show');
		});
	}
}
</script>

<style scoped lang="scss">
</style>


