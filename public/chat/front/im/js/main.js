/**
 * 主要业务逻辑相关
 */

var userName = util.readCookie("userName");
$.ajax({
    cache : true,
    type : "POST",
    // url : '/front/getUserToken?userName='+userName,//登录之后把userName放入cookie中
    url : `${window.requestUrl}/front/getUserToken?userName=${userName}`,//登录之后把userName放入cookie中
    data : {},
    xhrFields : {
        withCredentials : true
    },
    async : false,
    error : function(request) {
        layer.alert("Connection error");
    },
    success : function(data) {
        if (data.code == 200) {
            util.setCookie("uid",data.data.accid);
            util.setCookie("sdktoken",data.data.token);
            util.setCookie("nickName",data.data.nick);
            util.setCookie("nick",data.data.nick);
            $('#userName').text(data.data.nick);

        } else {

        }
    }
});
var userUID = readCookie("uid")
/**
 * 实例化
 * @see module/base/js
 */
var yunXin
// 等待私有化配置请求完毕
if (CONFIG.usePrivateEnv === 1) {
    function waitPrivateConf() {
        if (CONFIG.privateConf || CONFIG.usePrivateEnv === 2) {
            yunXin = new YX(userUID)
        } else {
            setTimeout(waitPrivateConf, 1000)
        }
    }
    waitPrivateConf()
} else {
    yunXin = new YX(userUID)
}





