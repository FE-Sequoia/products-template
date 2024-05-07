var Service = require('../core/service.js');

/**
 * 小说阅读
 */
class Novel_chapters extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "novel_chapters",
			// 分页大小
			size: 10
		}, config));
	}
}

module.exports = {
	Novel_chapters
};
