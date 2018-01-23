<template>
	<div>
		<h1>Create A Path</h1>
		<a class="ui button" @click="openWhatDoYouWannaLearnModal">What do you wanna learn?</a>
	</div>
</template>

<script>
export default {
	data() {
		return {

		};
	},
	methods: {
		openWhatDoYouWannaLearnModal() {
			this.$root.$emit("openWhatDoYouWannaLearnModal", true);
		}
	},
	mounted() {

	}
}
</script>

<style scoped lang="scss">
.known-subject-wrapper {
	margin-top: 20px;
	margin-left: 20px;
}

h4 > i {
	cursor: pointer;

	&:hover {
		transform: scale(1.3);
	}
}
</style>


