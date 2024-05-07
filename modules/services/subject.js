var Service = require('../core/service.js');

/**
 * 科目
 */
class Subject extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "subject",
			// 分页大小
			size: 10
		}, config));
	}
}

module.exports = {
	Subject
};
