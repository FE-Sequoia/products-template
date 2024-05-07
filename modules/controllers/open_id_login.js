const md5 = require("md5");
var Controller = require("../core/controller.js");

/**
 * 登录
 */
class Open_id_login extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./open_id_login/",
					// 选择的服务
					service: "user",
				},
				config
			)
		);
	}
}

/**
 * 登录API
 * @param {Object} ctx
 */
Open_id_login.prototype.api = async function(ctx) {
	let body = ctx.request.body;
	let obj = await $.services["user"].get_obj({
		open_id: body.open_id
	},{like:false});
	if (obj) {
		let group = await $.services["user_group"].get_obj({
			name:obj.user_group
		})
		if (group){
			if (group.name!=="管理员"){
				let sql = "select examine_state from "+ group.source_table +" WHERE user_id = " + obj.user_id;
				let userExamine = await $.mysql.run(sql);
				if (userExamine && userExamine.length > 0 && userExamine[0].examine_state!=="已通过"){
					return {
						error: {
							code: 70000,
							message: "该用户审核未通过"
						},
					};
				}
			}
			if (obj.state!==1){
				return {
					error: {
						code: 70000,
						message: "用户非可用状态，不能登录"
					},
				};
			}
			ctx.session.user = obj;
			let date = Date.parse(new Date());
			let token = md5(obj.user_id + "_" + date);
			await $.services["access_token"].add({
				token,
				info: JSON.stringify(obj),
				user_id:obj.user_id
			});
			obj.token = token;
			return {
				result: {obj}
			};
		}else {
			return {
				error: {
					code: 70000,
					message: "用户组不存在"
				},
			};
		}
	} else {
		let obj = await $.services["user"].get_obj({
			username: body.username
		}, {like: false});
		if (obj) {
			let group = await $.services["user_group"].get_obj({
				name:obj.user_group
			})
			if (group){
				if (group.name!=="管理员"){
					let sql = "select examine_state from "+ group.source_table +" WHERE user_id = " + obj.user_id;
					let userExamine = await $.mysql.run(sql);
					if (userExamine && userExamine.length > 0 && userExamine[0].examine_state!=="已通过"){
						return {
							error: {
								code: 70000,
								message: "该用户审核未通过"
							},
						};
					}
				}
				if (obj.state!==1){
					return {
						error: {
							code: 70000,
							message: "用户非可用状态，不能登录"
						},
					};
				}
				let password = md5(body.password);
				if (password === obj.password) {
					await $.services["user"].set({
						username:body.username
					}, {
						open_id:body.open_id
					});
					ctx.session.user = obj;
					let date = Date.parse(new Date());
					let token = md5(obj.user_id + "_" + date);
					await $.services["access_token"].add({
						token,
						info: JSON.stringify(obj),
						user_id:obj.user_id
					});
					obj.token = token;
					return {
						result: {obj}
					};
				} else {
					return {
						error: {
							code: 70000,
							message: "密码错误"
						},
					};
				}
			}else {
				return {
					error: {
						code: 70000,
						message: "用户组不存在"
					},
				};
			}
		} else {
			return {
				error: {
					code: 70000,
					message: "账户不存在"
				}
			};
		}
	}
};

module.exports = Open_id_login;
