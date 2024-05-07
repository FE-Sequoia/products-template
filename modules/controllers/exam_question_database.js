var Controller = require("../core/controller.js");

/**
 * 题库
 */
class Exam_question_database extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./exam_question_database/",
					// 选择的服务
					service: "exam_question_database",
				},
				config
			)
		);
	}
}

module.exports = Exam_question_database;
