<template>
	<div>
		<div class="timeline" v-if="path != undefined">
			<h3 v-if="path.length > 0">{{ path[0].subject.name }}</h3>
			<i v-if="expandTimeline" class="icon close" @click="deletePath()" />

			<div>
				<div class="timeline-bar"></div>

				<div class="timeline-items">
					<div class="timeline-item" v-for="(item, index2) in path" :key="index2">
						<i class="timeline-close"></i>
						<a :href="item.link" target="_blank">{{ item.name }}</a>

						<i class="icon book" v-if="item.type == 'Book'"></i>
						<i class="icon file text" v-else-if="item.type == 'Lesson'"></i>
						<i class="icon video play" v-else-if="item.type == 'Video'"></i>

						{{ item.duration }}

						<span v-if="item.type == 'Book'"> Sayfa</span>
						<span v-else> Saat</span>

						<i class="icon angle down" v-if="expandTimeline" @click="showCheckboxes = !showCheckboxes"></i>

						<div v-if="expandTimeline" v-show="showCheckboxes">
							<div class="ui violet small indicating progress" :data-value="getProgressValueFromData(item._id)" :data-total="item.contents.length" :item-id="item._id" >
								<div class="bar">
									<div class="progress"></div>
								</div>
							</div>

							<div class="ui checkbox timeline-checkbox" :mustChecked="getCheckboxValueFromData(item._id, index3)" v-for="(content, index3) in item.contents" :key="index3" :item-id="item._id">
								<input type="checkbox" :name="content" >
								<label>{{ content }}</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['path', 'expandTimeline', 'pathId'],
	data() {
		return {
			showCheckboxes: false,
			progresses: {}
		};
	},
	created() {
		this.progresses = this.storage.getProgresses();
	},
	methods: {
		registerProgressBar(bar) {
			this.registeredProgressBars.push(bar);
		},
		deletePath() {
			var paths = this.storage.getPaths();

			paths.splice(this.pathId, 1);

			this.path = undefined;

			this.storage.savePaths(paths);
		},
		getCheckboxValueFromData(itemId, index) {
			if(this.progresses[itemId] == undefined)
					return false;

			return this.progresses[itemId][index] || false;
		},
		getProgressValueFromData(itemId) {
			if(this.progresses[itemId] == undefined)
				return 0;

			return this._.filter(this.progresses[itemId], (a) => a == true).length;
		},
		saveProgressesToStorage() {
			this.storage.saveProgresses(this.progresses);
		},
		getProgressValueFromItem(itemid) {
			let c = 0;

			var me = this;

			$(`.timeline-checkbox[item-id='${itemid}']`).each(function(index) {
				if(me.progresses[itemid] == undefined) {
					me.progresses[itemid] = [];
				}

				if($(this).checkbox("is checked")) {
					c++;
					me.progresses[itemid][index] = true;
				}
				else {
					me.progresses[itemid][index] = false;
				}
			});

			return c;
		},
		changeProgressValue(e) {
			var me = this;

			$(".ui.progress").each(function() {
				var itemid = $(this).attr("item-id");

				$(this).progress("set progress", me.getProgressValueFromItem(itemid));
			});

			this.saveProgressesToStorage();
		}
	},
	mounted() {
		console.log(this.paths);

		var me = this;

		$(".timeline-checkbox").each(function() {

			$(this).checkbox({
				onChange: me.changeProgressValue
			});

			if($(this).attr("mustChecked") === "true") {
				$(this).checkbox("set checked");
				$(this).removeAttr("mustChecked");
			}

		});

		$(".ui.progress").each(function() {
			$(this).progress("set progress", parseInt($(this).attr("data-value")));
			$(this).removeAttr("data-value");
		});
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

		i.timeline-close {
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

		i.icon {
			margin: 0 2px 0 7px;
		}
	}
}

i.icon.angle.down {
	cursor: pointer;
}

.ui.checkbox {
	display: block;
	margin: 7px 0 7px 13px;
}

.ui.progress {
	margin: 10px 0;
}

</style>


