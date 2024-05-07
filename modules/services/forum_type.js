var Service = require("../core/service.js");

/**
 * 论坛类型
 */
class Forum_type extends Service {
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
          table: "forum_type",
          // 分页大小
          size: 10,
        },
        config
      )
    );
  }
}

module.exports = {
  Forum_type
};
