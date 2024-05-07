var Service = require("../core/service.js");

/**
 * 会员等级
 */
class Vip_level extends Service {
  /**
   * 构造函数
   * @param {Object} config 配置参数
   */
  constructor(config) {
    // 传参给父类构造函数
    super(
      Object.assign(
        {
          // 操作的表
          table: "vip_level",
          // 分页大小
          size: 10,
        },
        config
      )
    );
  }
}

module.exports = {
  Vip_level
};
