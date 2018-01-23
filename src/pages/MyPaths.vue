<template>
	<div>
		<h1>My Paths</h1>

		<div class="ui grid">
			<div class="ui row equal width">
				<div class="column" v-for="(path, index) in paths" :key="index">
					<app-timeline :expandTimeline="true" :path="path"  :pathId="index"></app-timeline>
				</div>
			</div>
		</div>
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
	created() {
		this.paths = this.storage.getPaths();
	},
	methods: {
		deletePath(pathIndex) {
			this.paths.splice(pathIndex, 1);
		}
	},
	mounted() {
		console.log(this.paths);
	}
}
</script>

<style scoped lang="scss">
.icon.close {
	&:hover {
		transform: scale(1.3);
	}
}
.timeline {
	min-height: 30px;
	position: relative;
	left: 40px;

	& > h3 {
		display: inline-block;
		margin-right: 5px;
	}
	& > div {
		position: relative;
	}

	.timeline-bar {
		width: 3px;
		height: 100%;
		background-color: #666;

		position: absolute;
		top: 0;
		bottom: 0;
	}

	.timeline-item {
		position: relative;
		margin-bottom: 30px;
		padding: 10px 20px;

		i {
			border-radius: 50%;
			background-color: white;
			width: 10px;
			height: 10px;

			position: absolute;
			left: -4px;
			top: 50%;
			transform: translateY(-50%);

			border: 1px solid #333;
		}
	}
}
</style>


