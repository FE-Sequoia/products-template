const AlipaySdk = require('alipay-sdk').default;
const alipaySdk = new AlipaySdk({
    //AppId
    appId: '',
    //签名算法
    signType: 'RSA2',
    //支付宝网关
    gateway: '',
    //支付宝公钥
    alipayPublicKey:"",
    //应用私钥
    privateKey: ""
});

module.exports = alipaySdk;