var Controller = require('../core/controller.js');

/**
 * 定制商品控制器
 */
class Customized_products extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 选择的模板那路径模板
			tpl: './customized_products/',
			// 选择的服务
			service: 'customized_products',
			// 互动
			interact: [undefined],
			// 注册get API路由
			get_api: ["get_hits_list",],
		}, config));
	}
}
/**
 * 重写增加方法
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Customized_products.prototype.add = async function(ctx) {
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
 * 协同过滤算法
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Customized_products.prototype.get_hits_list = async function(ctx) {
	var query = ctx.request.query;
	if(ctx.request.url.indexOf("user_id") != -1){
		if(query['user_id'] == null || query['user_id'] == ''){
			return this.get_list(ctx);
		}else{
			//查询该用户常点击
			let hitsSource = "SELECT COUNT( hits_id ) AS hits_count, source_id FROM hits WHERE source_table = 'customized_products' AND user_id = "
					+query['user_id']+" GROUP BY source_id";
			let hitsSourceList = await $.mysql.run(hitsSource);
			hitsSourceList = Array(hitsSourceList)[0];
			//判断是否为空,代表当前用户暂无点击数据，那么取其他用户的最常点击
			if (!hitsSourceList || hitsSourceList.length<=0){
				hitsSource = "SELECT COUNT( hits_id ) AS hits_count, source_id FROM hits WHERE source_table = 'customized_products' GROUP BY source_id";
				hitsSourceList = await $.mysql.run(hitsSource);
				hitsSourceList = Array(hitsSourceList)[0];
			}
			//二次处理-如果依旧为空则取添加时间前12条数据
			if (!hitsSourceList || hitsSourceList.length<=0){
				let sql = "SELECT * FROM customized_products ORDER BY create_time DESC LIMIT 0,12";
				let list = await $.mysql.run(sql);
				list = Array(list)[0];
				let count = list.length;
				return {
					result: {
						list,
						count
					}
				}
			}else {
				//对用户点击量进行排序取得最大值
				let max = 0;
				let maxSourceId = 0;
				for (let i=0;i<hitsSourceList.length;i++){
					let hitsCount = parseInt(hitsSourceList[i].hits_count);
					if (hitsCount > max){
						max = hitsCount;
						maxSourceId = parseInt(hitsSourceList[i].source_id);
					}
				}
				//查询该用户点击最大值的种类
				let typeSql = "SELECT product_category FROM customized_products WHERE customized_products_id = " + maxSourceId;
				let typeList = await $.mysql.run(typeSql);
				typeList = Array(typeList)[0];
				//如果为空则取添加时间前12条数据
				if (!typeList || typeList.length<=0){
					let sql = "SELECT * FROM customized_products ORDER BY create_time DESC LIMIT 0,12";
					let list = await $.mysql.run(sql);
					list = Array(list)[0];
					let count = list.length;
					return {
						result: {
							list,
							count
						}
					}
				}else {
					let typeName = typeList[0].product_category.toString();
					//查询该种类的数据
					let sql = "SELECT * FROM customized_products WHERE product_category = '"+typeName+"'" ;
					let resultList = await $.mysql.run(sql);
					resultList = Array(resultList)[0];
					//如果为空则取添加时间前12条数据
					if (!resultList || resultList.length<=0){
						sql = "SELECT * FROM customized_products ORDER BY create_time DESC LIMIT 0,12";
						let list = await $.mysql.run(sql);
						list = Array(list)[0];
						let count = list.length;
						return {
							result: {
								list,
								count
							}
						}
					}else {
						//对结果排序-冒泡排序
						for (let i = resultList.length - 1; i > 0; i--) {
							// 是否发生交换
							let swapped = false;
							for (let j = 0; j < i; j++) {
								let leftMap = resultList[j];
								let rightMap = resultList[j + 1];
								if (parseInt(leftMap.hits)<parseInt(rightMap.hits)){
									let temp = rightMap;
									rightMap = leftMap;
									leftMap = temp;
									swapped = true;
								}
							}
							if (!swapped) {
								// 没有发生交换，则说明数组已有序,停止冒泡
								break;
							}
						}
						//判断是否有12条-如果不足则计算其他类型和用户当前点击最多的余弦相似度，依次往下取得数据
						if (resultList.length<12) {
							let typeCosSql = "SELECT product_category FROM customized_products WHERE product_category <> '" + typeName + "' GROUP BY product_category";
							let typeCosList = await $.mysql.run(typeCosSql);
							typeCosList = Array(typeCosList)[0];
							if (typeCosList && typeCosList.length > 0) {
								for (let i = 0; i < typeCosList.length; i++) {
									typeCosList[i]["cosSim"] = similar(typeName, typeCosList[i]["product_category"]);
								}
								//冒泡根据相似度排序
								for (let i = typeCosList.length - 1; i > 0; i--) {
									// 是否发生交换
									let swapped = false;
									for (let j = 0; j < i; j++) {
										let leftMap = typeCosList[j];
										let rightMap = typeCosList[j + 1];
										if (parseInt(leftMap.cosSim) < parseInt(rightMap.cosSim)) {
											let temp = rightMap;
											rightMap = leftMap;
											leftMap = temp;
											swapped = true;
										}
									}
									if (!swapped) {
										// 没有发生交换，则说明数组已有序,停止冒泡
										break;
									}
								}
								//逐条加入数据
								for (let i = 0; i < typeCosList.length; i++) {
									sql = "SELECT * FROM customized_products WHERE product_category = '" + typeCosList[i]["product_category"] + "' ORDER BY create_time DESC LIMIT 0," + (12 - resultList.length);
									let list = await $.mysql.run(sql);
									list = Array(list)[0];
									if (list && list.length > 0) {
										resultList.push(...list);
									}
								}
							}
						}
						let count = resultList.length;
						return {
							result: {
								"list":resultList,
								count
							}
						}
					}
				}
			}
		}
	}else{
		return this.get_list(ctx);
	}
}

/**
 * 计算余弦相似度
 */
function similar(s, t, f) {
	if (!s || !t) {
		return 0
	}
	if(s === t){
		return 100;
	}
	var l = s.length > t.length ? s.length : t.length
	var n = s.length
	var m = t.length
	var d = []
	f = f || 2
	var min = function (a, b, c) {
		return a < b ? (a < c ? a : c) : (b < c ? b : c)
	}
	var i, j, si, tj, cost
	if (n === 0) return m
	if (m === 0) return n
	for (i = 0; i <= n; i++) {
		d[i] = []
		d[i][0] = i
	}
	for (j = 0; j <= m; j++) {
		d[0][j] = j
	}
	for (i = 1; i <= n; i++) {
		si = s.charAt(i - 1)
		for (j = 1; j <= m; j++) {
			tj = t.charAt(j - 1)
			if (si === tj) {
				cost = 0
			} else {
				cost = 1
			}
			d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
		}
	}
	let res = (1 - d[n][m] / l) *100
	return res.toFixed(f)
}


module.exports = Customized_products;
