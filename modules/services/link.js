var Service = require('../core/service.js');

/**
 * 友情链接
 */
class Link extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "link",
			// 分页大小
			size: 5
		}, config));
	}
}

module.exports = {
	Link
};
