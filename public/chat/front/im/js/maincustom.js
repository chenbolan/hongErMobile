/**
 * 主要业务逻辑相关
 */

var pid = window.parent.document.getElementById("userIdp").value;
var sdktoken = "",
    userUID = "",
    that = this;
$.ajax({
    cache : true,
    type : "POST",
    url : '/customservice/getCustomseToken?pid='+pid,
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
            sdktoken = data.data.token;
            userUID = data.data.accid;
            setCookie("uid",data.data.accid);
            setCookie("sdktoken",data.data.token);
            setCookie("nickName",data.data.accid);
            setCookie("nick",data.data.accid);
        } else {
            layer.alert(data.message);
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





