<template>
	<div>
			<el-form-item v-if="$check_register_field('add','seller_id','/mall_seller/view')" label="卖家编号" prop="seller_id">
				<el-input id="seller_id" v-model="form['seller_id']" placeholder="请输入卖家编号"></el-input>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','seller_name','/mall_seller/view')" label="卖家姓名" prop="seller_name">
				<el-input id="seller_name" v-model="form['seller_name']" placeholder="请输入卖家姓名"></el-input>
				</el-form-item>
	
	</div>
</template>

<script>
	import mixin from "@/mixins/component.js";

	export default {
		mixins: [mixin],
		props:{

			form:{
				type: Object,
				default: function(){
					return {
							"seller_id":  '' ,
								"seller_name":  '' ,
						}
				}
			},

		},
		data() {
			return {
				field: "mall_seller_id",
				url_add: "~/api/mall_seller/add?",
				url_set: "~/api/mall_seller/set?",
				url_upload: "~/api/mall_seller/upload?",

						rules: {
					"seller_id": [    {required: true,message: '卖家编号不能为空'},  ],
					"seller_name": [    {required: true,message: '卖家姓名不能为空'},  ],
				}

			}
		},
		methods: {

	
	
	

	
	
	

		},
		created() {
				}
	}
</script>
