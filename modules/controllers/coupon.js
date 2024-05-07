var Controller = require("../core/controller.js");

/**
 * 优惠券
 */
class Coupon extends Controller {
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
          tpl: "./coupon/",
          // 选择的服务
          service: "coupon",
        },
        config
      )
    );
  }
}

module.exports = Coupon;
