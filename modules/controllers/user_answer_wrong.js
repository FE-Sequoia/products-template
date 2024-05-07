var Controller = require("../core/controller.js");

/**
 * 错题
 */
class User_answer_wrong extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./user_answer_wrong/",
					// 选择的服务
					service: "user_answer_wrong",
				},
				config
			)
		);
	}
}

module.exports = User_answer_wrong;
