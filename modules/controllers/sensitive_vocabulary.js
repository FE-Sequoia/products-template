var Controller = require('../core/controller.js');

/**
 * 敏感词汇控制器
 */
class Sensitive_vocabulary extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 选择的模板那路径模板
			tpl: './sensitive_vocabulary/',
			// 选择的服务
			service: 'sensitive_vocabulary',
			// 互动
			interact: [undefined],
		}, config));
	}
}

module.exports = Sensitive_vocabulary;
