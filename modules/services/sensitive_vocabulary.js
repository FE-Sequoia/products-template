var Service = require('../core/service.js');

/**
 * 敏感词汇服务
 */
class Sensitive_vocabulary extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "sensitive_vocabulary",
			// 分页大小
			size: 1
		}, config));
	}
}

module.exports = {
	Sensitive_vocabulary
};
