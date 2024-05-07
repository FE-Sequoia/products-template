var Service = require('../core/service.js');

/**
 * 物流
 */
class Logistics_delivery extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "logistics_delivery",
			// 分页大小
			size: 10
		}, config));
	}
}

module.exports = {
	Logistics_delivery
};
