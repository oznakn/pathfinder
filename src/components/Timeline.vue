<template>
	<div>
		<div class="timeline" v-if="path != undefined">
			<h3 v-if="path.length > 0">{{ path[0].subject.name }}</h3>
			<i v-if="addDeleteButton" class="icon close" @click="deletePath()" />

			<div>
				<div class="timeline-bar"></div>

				<div class="timeline-items">
					<div class="timeline-item" v-for="(item, index2) in path" :key="index2">
						<i></i>
						<a :href="item.link" target="_blank">{{ item.name }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['path', 'addDeleteButton', 'pathId'],
	data() {
		return {

		};
	},
	methods: {
		deletePath() {
			var paths = this.storage.getPaths();

			paths.splice(this.pathId, 1);

			this.path = undefined;

			this.storage.savePaths(paths);
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


