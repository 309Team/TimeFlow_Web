<!-- Form -->
<template>
	<div>

		<el-row>
			<el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true" circle></el-button>
		</el-row>

		<!-- <el-dialog title="选择事项类型" :visible.sync="dialogVisible" width="30%">
			<el-row>
				<el-button>时段事项</el-button>
				<el-button>时刻事项</el-button>
				<el-button>标签事项</el-button>
			</el-row>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog> -->


		<el-dialog title="添加事项" :visible.sync="dialogFormVisible">
			<el-form ref="form" :model="form" label-width="80px">

				<el-form-item label="事项名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>

				<el-form-item label="开始时间">
					<div class="block">
						<span class="demonstration"></span>
						<el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间"
							value-format="yyyy-MM-ddTHH:mm:ss">
						</el-date-picker>
					</div>
				</el-form-item>

				<el-form-item label="结束时间">
					<div class="block">
						<span class="demonstration"></span>
						<el-date-picker v-model="form.overTime" type="datetime" placeholder="选择结束时间"
							value-format="yyyy-MM-ddTHH:mm:ss">
						</el-date-picker>
					</div>
				</el-form-item>

				<el-form-item label="事项注释">
					<el-input type="textarea" v-model="form.text"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">确定</el-button>
					<el-button>取消</el-button>
				</el-form-item>

			</el-form>
		</el-dialog>

	</div>
</template>



<script>
export default {
	data() {
		return {
			dialogVisible: false,
			dialogFormVisible: false,
			form: {
				name: '',
				startTime: '',
				overTime: '',
				text: ''
			},
		};
	},
	methods: {
		onSubmit: function () {
			alert(JSON.stringify(this.form));
		}
	}
};
</script>









