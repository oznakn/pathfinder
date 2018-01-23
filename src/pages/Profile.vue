<template>
	<div>
		{{ userData }}
	</div>
</template>

<script>
import axios from "axios";
import constants from "../constants";

export default {
	data() {
		return {
			userData: ""
		};
	},
	created() {
		this.getAxios().get("/users/profile")
			.then((response) => {
				console.log(response);

				if(response.data != undefined && response.data.user != undefined) {
					this.userData = response.data.user.name;
				}
			});
	}
}
</script>

<style scoped lang="scss">
</style>


