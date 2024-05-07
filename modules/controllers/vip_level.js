var Controller = require("../core/controller.js");

/**
 * 会员等级
 */
class Vip_level extends Controller {
  /**
   * 构造函数
   * @param {Object} config 配置参数
   */
  constructor(config) {
    // 传参给父类构造函数
    super(
      Object.assign(
        {
          // 选择的模板那路径模板
          tpl: "./vip_level/",
          // 选择的服务
          service: "vip_level",
        },
        config
      )
    );
  }
}

module.exports = Vip_level;
