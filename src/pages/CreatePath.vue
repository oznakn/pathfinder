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
		<div class="ui checkbox one-fit-all-checkbox">
			<input type="checkbox">
			<label>Pick just one resource</label>
		</div>

		<app-timeline v-for="(path, index) in paths" :key="index" :expandTimeline="false" pathId="-1" class="timelines" :path="path"></app-timeline>
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
			paths: []
		};
	},
	methods: {
		openWhatDoYouWannaLearnModal() {
			this.$root.$emit("openWhatDoYouWannaLearnModal", true);
		}
	},
	mounted() {
		this.$root.$on('createPath', (data) => {
			var checked = $('.one-fit-all-checkbox').checkbox('is checked');
			var prefer = $(this.$refs.preferDropdown).dropdown("get value") || "Lesson";
			console.log(prefer);

			this.getAxios().post("/pf", {
				request: {
					subject: data.subject,
					start_topic: data.topics[0],
					end_topic: data.topics[data.topics.length - 1],
					known_topics: [],
					one_fits_all: checked,
					pref_type: prefer
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
					path[0].contents = data.topics;

					paths.push(path);

					this.storage.savePaths(paths);

					this.paths = [path];
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


