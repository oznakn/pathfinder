<template>
	<div class="ui modal" ref="signupModal">
		<p class="header">Sign Up</p>
		<div class="content">
			<div class="description">
				<div class="ui container">
					<div class="ui grid">
						<div class="ui row">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<div class="ui fluid labeled input">
									<div class="ui label">Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
									<input type="text" ref="inputName"/>
								</div>
							</div>
						</div>
						<div class="ui row">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<div class="ui fluid labeled input">
									<div class="ui label">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
									<input type="text" ref="inputEmail"/>
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
						<div class="ui row" v-show="showLoader">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<div class="ui inverted active dimmer">
									<div class="ui inverted loader"></div>
								</div>
							</div>
						</div>
						<div class="ui row" v-show="signupDone || signupError">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<div classs="ui message" v-show="signupDone">
									<p>Success</p>
								</div>
								<div classs="ui message" v-show="signupError">
									<p>Error</p>
								</div>
							</div>
						</div>

						<div class="ui row">
							<div class="ui eight wide computer sixteen wide mobile centered column">
								<a class="ui button positive" @click="signup">
									Sign Up
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
			signupDone: false,
			signupError: false,
			showLoader: false
		};
	},
	methods: {
		closeModal(e) {
			$(this.$refs.signupModal).modal('hide');
		},
		signup(e) {
			var name = this.$refs.inputName.value;
			var email = this.$refs.inputEmail.value;
			var password = this.$refs.inputPassword.value;

			if(name != "" && email != "" && password != "") {
				this.showLoader = true;
				$(this.$refs.signupModal).modal('refresh');

				this.getAxios().post("/users/register",
					{name: name, email: email, password: password})
					.then((response) => {

						if(response != undefined) {
							this.signupDone = true;

							setTimeout(() => {
								this.$refs.inputName.value = "";
								this.$refs.inputEmail.value = "";
								this.$refs.inputPassword.value = "";
								this.signupDone = false;
								this.signupError= false;
								this.showLoader = false;

								this.$root.$emit("openLoginModal", true);
							}, 500);
						}
						else {
							this.showLoader = false;
						}
					})
					.catch(() => {
						this.showLoader = false;
						this.signupError = true;
					});
			}

		}
	},
	mounted() {
		this.$root.$on("openSignupModal", (data) => {
			$(this.$refs.signupModal).modal('show');
		});
	}
}
</script>

<style scoped lang="scss">
.dimmer.active {
	padding: 10px 0;
	margin: 10px 0;
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


