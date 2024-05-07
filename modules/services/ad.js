var Service = require('../core/service.js');

/**
 * 广告
 */
class Ad extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "ad",
			// 分页大小
			size: 10
		}, config));
	}
}

module.exports = {
	Ad
};
