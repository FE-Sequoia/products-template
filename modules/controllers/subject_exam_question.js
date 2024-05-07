var Controller = require("../core/controller.js");

/**
 * 试题
 */
class Subject_exam_question extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./subject_exam_question/",
					// 选择的服务
					service: "subject_exam_question",
				},
				config
			)
		);
	}
}

module.exports = Subject_exam_question;
