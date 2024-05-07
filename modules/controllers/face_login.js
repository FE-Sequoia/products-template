var Controller = require("../core/controller.js");
var fs = require("fs");
const md5 = require("md5");

/**
 * 人脸识别登陆
 */
class Face_login extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./face_login/",
					// 选择的服务
					service: "user",
				},
				config
			)
		);
	}
}

/**
 * 人脸识别登陆
 * @param {Object} ctx http请求上下文
 */
Face_login.prototype.api = async function(ctx) {
	var body = ctx.request.body;
	var obj = await this.service.get_obj({
		username: body.username
	},{like:false});

	// const client = require('../core/baiduAi.js');

	// let avatarImg = obj.avatar.substr(obj.avatar.lastIndexOf('/')+1)  //截取文件名称和后缀   输出：香菜.png
	// let faceImg = body.face_image.substr(body.face_image.lastIndexOf('/')+1)  //截取文件名称和后缀   输出：香菜.png

	// let result = await client.match([{
	// 	image: new Buffer(fs.readFileSync('./static/upload/'+avatarImg)).toString('base64'),
	// 	image_type: 'BASE64'
	// },{
	// 	image: new Buffer(fs.readFileSync('./static/upload/'+faceImg)).toString('base64'),
	// 	image_type: 'BASE64'
	// }]);

	var date = Date.parse(new Date());
	var token = md5(obj.user_id + "_" + date);
	await $.services["access_token"].add({
		token,
		info: JSON.stringify(obj),
		user_id:obj.user_id
	});
	obj.token = token;
	return {
		result: {obj}
	};
	// if(result.error_msg==='SUCCESS'){
	// 	if (result.result.score >= 60 ){
	// 		ctx.session.user = obj;
	// 		var date = Date.parse(new Date());
	// 		var token = md5(obj.user_id + "_" + date);
	// 		await $.services["access_token"].add({
	// 			token,
	// 			info: JSON.stringify(obj),
	// 			user_id:obj.user_id
	// 		});
	// 		obj.token = token;
	// 		return {
	// 			result: {obj}
	// 		};
	// 	}else {
	// 		return {
	// 			error: {
	// 				code: 30000,
	// 				message: "人脸识别错误"
	// 			},
	// 		};
	// 	}
	// }else {
	// 	return {
	// 		error: {
	// 			code: 30000,
	// 			message: "人脸识别错误"
	// 		},
	// 	};
	// }
};
module.exports = Face_login;
