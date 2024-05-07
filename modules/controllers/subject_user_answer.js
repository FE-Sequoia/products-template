var Controller = require("../core/controller.js");

/**
 * 答题
 */
class Subject_user_answer extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./subject_user_answer/",
					// 选择的服务
					service: "subject_user_answer",
				},
				config
			)
		);
	}
}

module.exports = Subject_user_answer;
