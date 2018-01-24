<template>
	<div>
		<h1>Welcome back, {{ storage.getName() }}</h1>
		<router-link to="/my-paths"><h3>{{ this.title }}</h3></router-link>

		<table class="ui unstackable celled table">
			<thead>
				<tr>
					<th>{{ getMonthString(new Date().getDay()) }}</th>
					<th>{{ getMonthString(new Date().getDay() + 1) }}</th>
					<th>{{ getMonthString(new Date().getDay() + 2) }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="paths != undefined && paths[selectedType] != undefined && paths[selectedType].resources[0] != undefined">
					<td>{{ paths[selectedType].resources[0].contents[0] }}</td>
					<td>{{ paths[selectedType].resources[0].contents[1] }}</td>
					<td>{{ paths[selectedType].resources[0].contents[2] }}</td>
				</tr>
				<tr>
				</tr>
				<tr>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3">
						<div class="ui right floated pagination menu">
							<a @click="selectType(index)" :class="{item: true, active: selectedType == index}" v-for="(item, index) in paths" :key="index">{{ item.type }}</a>
						</div>
					</th>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selectedType: 0,
			paths: []
		};
	},
	computed: {
		title() {
			return this.paths[this.selectedType] == undefined ? "" : this.paths[this.selectedType].type;
		}
	},
	methods: {
		selectType(type) {
			this.selectedType = type;
		}
	},
	created() {
		var paths = this.storage.getPaths();
		var progresses = this.storage.getProgresses();

		for(var path of paths) {
			var newPath = {type: path[0].subject.name};
			newPath.resources = path;

			newPath.totalDuration = 0;
			newPath.totalContentCount = 0;

			for(var res of newPath.resources) {
				newPath.totalDuration += res.duration;
				newPath.totalContentCount += res.contents.length;
			}

			newPath.perDuration = Math.floor(newPath.totalDuration / newPath.totalContentCount);

			this.paths.push(newPath);
		}

		console.log("PATHS", this.paths);
	}
}
</script>

<style lang="scss" scoped>

</style>

