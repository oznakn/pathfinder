<template>
	<div>
		<h1 class="name-title">{{ storage.getName() }}</h1>
		<br>
		<h1>Edit Your Knowledge</h1>
		<a class="ui button" @click="openAddKnownSubjectModal">Add Known Subject</a>
		<br>
		<br>
		<h1>Known Subjects</h1>
		<div class="known-subject-wrapper">
			<h4 v-for="(item, index) in knownSubjects" :key="index">
				{{ item.type }} - {{ item.subject }} - {{ getTopicsString(item) }}
				<i class="icon close" @click="removeItem(index)"></i>
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
		},
		removeItem(index) {
			this.knownSubjects.splice(index,1);
			this.saveKnowledgeToDB();
		},
		saveKnowledgeToDB() {
			this.storage.saveKnowledge(this.knownSubjects);
		},
		getTopicsString(item) {
			var result = item.topics.join(' , ');

			if(result.length > 50) {
				result = result.substring(0, 50) + '...';
			}

			return result;
		}
	},
	created() {
		this.knownSubjects = this.storage.getKnowledge();
	},
	mounted() {
		this.$root.$on("addKnownSubject", (data) => {
			if(this._.find(this.knownSubjects, {type: data.type, subject: data.subject}) == undefined) {
				this.knownSubjects.push(data);

				this.saveKnowledgeToDB();
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

h4 > i {
	cursor: pointer;

	&:hover {
		transform: scale(1.3);
	}
}

.name-title {
	text-align: center;
}
</style>


