<template>
	<div>
		<a class="ui button" @click="openAddKnownSubjectModal">Add Known Subject</a>

		<h1 v-show="knownSubjects.length > 0">Known Subjects</h1>
		<div class="known-subject-wrapper">
			<h4 v-for="(item, index) in knownSubjects" :key="index">
				{{ item.type }} - {{ item.subject }}
			</h4>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			knownSubjects: []
		};
	},
	methods: {
		openAddKnownSubjectModal() {
			this.$root.$emit("openAddKnownSubjectModal", true);
		}
	},
	mounted() {
		this.$root.$on("addKnownSubject", (data) => {
			if(this._.find(this.knownSubjects, {type: data.type, subject: data.subject}) == undefined) {
				this.knownSubjects.push(data);
				console.log(this.knownSubjects);
			}
		});
	}
}
</script>

<style scoped lang="scss">
.known-subject-wrapper {
	margin-top: 20px;
	margin-left: 20px;
}
</style>


