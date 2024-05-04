<template>
	<el-main class="bg edit_wrap vip_level">
		<el-form ref="form" :model="form" status-icon label-width="70px">
			<el-row class="row_e">

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="等级名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-col>

        <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
          <el-form-item label="折扣数" prop="discount">
            <el-input-number v-model="form.discount" :precision="2" :step="0.01" :min="0.01" :max="1"></el-input-number>
          </el-form-item>
        </el-col>

			</el-row>
			
			<el-col :xs="24" :sm="24" :lg="24" class="el_form_btn_warp">
				<el-form-item>
					<el-col :xs="24" :sm="12" :lg="12" class="el_form_btn el_form_btn_1">
						<el-button style="width: 100%; float: left;" type="primary" @click="submit()">提交</el-button>
					</el-col>
					<el-col :xs="24" :sm="12" :lg="12" class="el_form_btn el_form_btn_2">
						<el-button style="width: 100%; float: right;" @click="cancel()">取消</el-button>
					</el-col>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "vip_level_id",
				url_add: "~/api/vip_level/add?",
				url_set: "~/api/vip_level/set?",
				url_get_obj: "~/api/vip_level/get_obj?",
				url_upload: "~/api/vip_level/upload?",

				query: {
          vip_level_id: 0,
				},

				form: {
          vip_level_id: 0,
					name: "",
          discount: 0.8
				}
			}
		},
		methods: {
      /**
       * 提交前验证
       * @param params
       */
      submit_check(params) {
        if (params.name === "") {
          return "等级名称不能为空";
        }
        return null
      },
		},
		created() {}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
