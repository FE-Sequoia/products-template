var Controller = require("../core/controller.js");

/**
 * 试卷
 */
class Subject_exam extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./subject_exam/",
					// 选择的服务
					service: "subject_exam",
				},
				config
			)
		);
	}
}

module.exports = Subject_exam;
