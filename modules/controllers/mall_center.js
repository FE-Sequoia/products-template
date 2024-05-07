var Controller = require('../core/controller.js');

/**
 * 商城中心控制器
 */
class Mall_center extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 选择的模板那路径模板
			tpl: './mall_center/',
			// 选择的服务
			service: 'mall_center',
			// 互动
			interact: [undefined],
			// 注册get API路由
			get_api: ["alipay","get_tag_list",],
		}, config));
	}
}
/**
 * 重写增加方法
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Mall_center.prototype.add = async function(ctx) {
	var result = await this.service.add(ctx.request.body, this.config);

	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}

	return {
		result,
	};
}


/**
 * 标签推荐
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Mall_center.prototype.get_tag_list = async function (ctx) {
	var query = ctx.request.query;
	if (!query['page']){
		query.page = 1
	}
	if (!query['size']) {
		query.size = 12
	}
		query.orderby = "goods_id asc"
	if (!query['user_id']) {
		let list = await $.services["goods"].get_list({}, query);
		let count = list.length;
		return {
			result: {
				list,
				count
			}
		}
	} else {
																													let tag_field = "label"
							let tag_field_map = {};
																																																																																																														tag_field_map['注册用户'] = "label"
																																																																																									let user_table_sql = "SELECT t2.source_table,t1.user_group FROM `user` t1 LEFT JOIN user_group t2 ON t1.user_group = t2.`name` WHERE user_id = " + query['user_id'];
		let user_table = await $.mysql.run(user_table_sql);
		user_table = Array(user_table)[0];
		//数据错误直接返回list
		if (!user_table || !user_table[0].source_table) {
			let list = await $.services["goods"].get_list({}, query);
			let count = list.length;
			return {
				result: {
					list,
					count
				}
			}
		} else {
			let user_tag_field = tag_field_map[user_table[0].user_group];
			let user_sql = "SELECT * FROM " + user_table[0].source_table + " WHERE user_id = " + query['user_id']
			let user = await $.mysql.run(user_sql);
			user = Array(user)[0];
			if (!user || !user[0][user_tag_field]) {
				let list = await $.services["goods"].get_list({}, query);
				let count = list.length;
				return {
					result: {
						list,
						count
					}
				}
			}else {
				let tags = user[0][user_tag_field].split(",");
				if (tags.length<=0){
					let list = await $.services["goods"].get_list({}, query);
					let count = list.length;
					return {
						result: {
							list,
							count
						}
					}
				}else {
					let id_arr = [];
					for (let i=0;i<tags.length;i++){
						let product_sql = "SELECT * FROM mall_center WHERE "+tag_field+" = '" + tags[i]+"'"
						let product = await $.mysql.run(product_sql);
						product = Array(product)[0];
						if (product.length>0){
							for (let j = 0; j< product.length ;j ++){
								id_arr.push(product[j].mall_center_id)
							}
						}
					}
					if (id_arr.length>0){
						let goods_sql = "SELECT * FROM goods WHERE source_table = 'mall_center' and source_id in ("+id_arr.toString()+")";
						let goods = await $.mysql.run(goods_sql);
						goods = Array(goods)[0];
						if (goods.length<query.size){
							let other_goods_sql = "SELECT * FROM goods WHERE source_table = 'mall_center' and source_id not in ("+id_arr.toString()+") ORDER BY goods_id ASC LIMIT 0,"+(query.size-goods.length);
							let other_goods_list = await $.mysql.run(other_goods_sql);
							other_goods_list = Array(other_goods_list)[0];
							if (other_goods_list && other_goods_list.length>0){
								goods.push(...other_goods_list);
							}
						}
						let count = goods.length;
						return {
							result: {
								list:goods,
								count
							}
						}
					}else {
						let list = await $.services["goods"].get_list({}, query);
						let count = list.length;
						return {
							result: {
								list,
								count
							}
						}
					}
				}
			}
		}
	}
	}

/**
 * 沙箱支付
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Mall_center.prototype.alipay = async function(ctx) {
	var query = ctx.request.query;
	var {
		goods_name,
		pay_money
	} = query;

	const alipaySdk = require('../core/alipay.js');

	let aliQrcode =  await alipaySdk.exec('alipay.trade.precreate', {
		bizContent: {
			out_trade_no: String(new Date().getTime()),
			total_amount: pay_money,
			subject: goods_name
		}
	});

	return {"result":aliQrcode.qrCode}
}
module.exports = Mall_center;
