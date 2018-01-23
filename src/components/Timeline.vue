<template>
	<div class="timeline">
		<div class="timeline-bar"></div>

		<div class="timeline-items">
			<div class="timeline-item" v-for="(item, index) in timelineItems" :key="index">
				<i></i>
				<a :href="item.url" target="_blank">{{ item.name }}</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['timelineItems'],
	data() {
		return {

		};
	},
	methods() {

	}
}
</script>

<style scoped lang="scss">
.timeline {
	min-height: 30px;
	position: relative;
	left: 40px;

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


