<template lang="html">
	<div class="ui modal" ref="addKnownSubjectModal">
		<p class="header">Add Known-Subjects</p>
		<div class="content">
			<div class="description">
				<div class="ui container">
					<div class="ui search selection dropdown" ref="typesDropdown">
						<input type="hidden" name="country">
						<i class="dropdown icon"></i>
						<div class="default text">Select Item</div>
						<div class="menu">
							<div class="item" v-for="(item, index) in types" :key="index">{{ item }}</div>
						</div>
					</div>

					<div v-show="filteredSubjects.length > 0" class="ui search selection dropdown" ref="subjectsDropdown">
						<input type="hidden" name="country">
						<i class="dropdown icon"></i>
						<div class="default text">Select Item</div>
						<div class="menu">
							<div class="item" v-for="(item, index) in filteredSubjects" :key="index">{{ item.name }}</div>
						</div>
					</div>

					<div class="checkbox-wrapper" v-show="topics.length > 0">
						<div class="ui checkbox" v-for="(item, index) in topics" ref="checkboxes">
							<input type="checkbox" :name="item">
							<label>{{ item }}</label>
						</div>

						<a class="ui button" @click="toggleAllCheckboxes">Toggle All</a>
					</div>
				</div>
			</div>
		</div>
		<div class="actions">
			<a class="ui button positive" @click="addKnownSubject">
				Save
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
			types: [],
			subjects: [],
			filteredSubjects: [],
			selectedType: undefined,
			selectedSubject: undefined,
			topics: [],
			selectedTopics: []
		};
	},
	methods: {
		addKnownSubject() {
			for(var i = 0; i < this.topics.length; i++) {
				if($(this.$refs.checkboxes[i]).find("input")[0].checked) {
					this.selectedTopics.push(this.topics[i]);
				}
			}

			this.$root.$emit("addKnownSubject", {
				type: this.selectedType,
				subject: this.selectedSubject,
				topics: this.selectedTopics
			});

			$(this.$refs.typesDropdown).dropdown('clear');
			$(this.$refs.subjectsDropdown).dropdown('clear');
		},
		toggleAllCheckboxes() {
			this.$refs.checkboxes.forEach((item) => {
				$(item).checkbox('toggle');
			});
		}
	},
	created() {
	},
	mounted() {
		if(this.isLoggedIn) {
			this.getAxios().get("/pf/subjects")
				.then((response) => {
					if(response != undefined && response.data != undefined && response.data.subjects != undefined) {
						this.subjects = response.data.subjects;

						for(var subject of this.subjects) {
							if(this.types.indexOf(subject.type) == -1) {
								this.types.push(subject.type);
							}
						}

						$(this.$refs.addKnownSubjectModal).modal('refresh');
					}
				});
		}

		$(this.$refs.typesDropdown).dropdown({
			onChange: (a, name, c) => {
				this.selectedType = name;
				this.filteredSubjects = this._.filter(this.subjects, {type: name});
				$(this.$refs.addKnownSubjectModal).modal('refresh');
			}
		});

		$(this.$refs.subjectsDropdown).dropdown({
			onChange: (a, name, c) => {
				this.selectedSubject = name;

				var item = this._.find(this.subjects, {name: name});

				if(item != undefined) {
					this.topics = item.topics;
				}

				setTimeout(() => {
					this.$refs.checkboxes.forEach((item) => {
						$(item).checkbox('check');
					});

					$(this.$refs.addKnownSubjectModal).modal('refresh');
				}, 100);
			}
		});

		var me = this;
		this.$root.$on("openAddKnownSubjectModal", (data) => {
			$(this.$refs.addKnownSubjectModal)
				.modal({
					'onHidden': () => {

						me.filteredSubjects = [];
						me.selectedType     = undefined;
						me.selectedSubject  = undefined;
						me.topics           = [];
						me.selectedTopics   = [];
					}
				})
				.modal('show');
		});
	}
}
</script>

<style scoped lang="scss">
.ui.checkbox {
	display: block;
	margin: 8px 0;
}

.checkbox-wrapper {
	margin: 20px 0;
}

.ui.button {
	margin-top: 15px;
}
</style>


