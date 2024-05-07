var Service = require('../core/service.js');

/**
 * 题库
 */
class Exam_question_database extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "exam_question_database",
			// 分页大小
			size: 10
		}, config));
	}
}

module.exports = {
	Exam_question_database
};
