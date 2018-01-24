<template>
	<div>
		<h1>Create A Path</h1>
		<a class="ui button" @click="openWhatDoYouWannaLearnModal">What do you wanna learn?</a>

		<div class="ui selection dropdown" ref="preferDropdown">
			<input type="hidden" name="country">
			<i class="dropdown icon"></i>
			<div class="default text">What would you prefer</div>
			<div class="menu">
				<div class="item"><i class="icon book" ></i>Book</div>
				<div class="item"><i class="icon file text"></i>Lesson</div>
				<div class="item"><i class="icon video play"></i>Video</div>
			</div>
		</div>

		<app-timeline v-if="path != undefined" :expandTimeline="false" pathId="-1" class="timelines" :path="path"></app-timeline>
	</div>
</template>

<script>
import Timeline from '../components/Timeline';

export default {
	components: {
		'app-timeline': Timeline
	},
	data() {
		return {
			path: undefined
		};
	},
	methods: {
		openWhatDoYouWannaLearnModal() {
			this.$root.$emit("openWhatDoYouWannaLearnModal", true);
		}
	},
	mounted() {
		this.$root.$on('createPath', (data) => {
			this.getAxios().post("/pf", {
				request: {
					subject: data.subject,
					start_topic: data.topics[0],
					end_topic: data.topics[data.topics.length - 1],
					known_topics: []
				}
			})
			.then((response) => {
				var path = [];

				if(response.data.resource != undefined) {
					path.push(response.data.resource);
				}
				else if(response.data.path != undefined) {
					path = response.data.path;
				}

				var paths = this.storage.getPaths();

				var canMove = true;

				for(var i = 0; i < paths.length; i++) {
					if(paths[i][0].name == path[0].name) {
						canMove = false;
						break;
					}
				}

				if(canMove) {
					paths.push(path);

					this.storage.savePaths(paths);

					this.path = path;
				}
			})
			.catch(() => {

			});
		});

		$(this.$refs.preferDropdown).dropdown();
	}
}
</script>

<style scoped lang="scss">
.timelines {
	margin-top: 30px;
}
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


