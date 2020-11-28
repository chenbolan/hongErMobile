// var baseUrl = "http://111.229.109.20:80";
var frontBaseUrl = "https://fairsroom.com";
//var upLoadShowUrl= frontBaseUrl+"/download/";//显示图片，视频等使用
var upLoadShowUrl= "https://exhibitionplatform.oss-cn-hongkong.aliyuncs.com/";

var common_pageSize = 10;
var common_pageList = [10, 25, 50, 100];
$(function () {
	var ht = window.location.href;
	if(ht.indexOf("index.html")>-1||ht.indexOf("register.html")>-1||ht.indexOf("login.html")>-1 ||ht.indexOf("resetPassword.html")>-1 ||ht.indexOf("forgetPassword.html")>-1){

	}else{
		isLogin();
	}
	getLanguage("zh_CN");
	//
   //window.location.href="../login.html"
});
function isLogin(){
	$.ajax({
		cache: true,
		type: "POST",
		url: frontBaseUrl+'/pc/isCustomerLogin',
		xhrFields: {
			withCredentials: true
		},
		data: "",
		async: true,
		success: function (data) {
			if(data.code!=200){
				if(util.readCookie("userName") != '' && util.readCookie("userName") != 'undefined' && util.readCookie("userName") != null){
					return;
				}else {
					alert("please login firstly");
					window.location.href="/front"

				}


			}
		}
	});

}


function getUrlParams(url){
	var theRequest = {};
	if(url.indexOf("?") != -1){
		var str = url.substr(1);
		var strs =  str.split("&");
		for(var i = 0; i < strs.length; i++){
			var sArry = strs[i].split("=");
			theRequest[sArry[0]] = decodeURIComponent(sArry[1]);
		}
	}
	//decodeURIComponent  decodeURI  encodeURIComponent encodeURI
	//return theRequest;java.net.URLDecoder.decode("%E6%8D%A2%E4%B9","UTF-8")
	return JSON.parse(JSON.stringify(theRequest));
}

function datetimeFormat(longTypeDate){
	if(longTypeDate==null || longTypeDate == ""){
		return "";
	}
	var datetimeType = "";
	var date = new Date();
	date.setTime(longTypeDate);
	datetimeType+= date.getFullYear();  //年
	datetimeType+= "-" + getMonth(date); //月
	datetimeType += "-" + getDay(date);  //日
	return datetimeType;
}
function datetimeFormat1(longTypeDate){

	var dateTypeDate = "";
	if(longTypeDate==null  || longTypeDate == ""){
		return "-";
	}
	var date = new Date();
	date.setTime(longTypeDate);
	dateTypeDate += date.getFullYear();   //年
	dateTypeDate += "-" + getMonth(date); //月
	dateTypeDate += "-" + getDay(date);   //日
	dateTypeDate += " " + getHours(date);   //时
	dateTypeDate += ":" + getMinutes(date);     //分
	dateTypeDate += ":" + getSeconds(date);     //分
	return dateTypeDate;
}

function getMonth(date){
	var month = "";
	month = date.getMonth() + 1; //getMonth()得到的月份是0-11
	if(month<10){
		month = "0" + month;
	}
	return month;
}
//返回01-30的日期
function getDay(date){
	var day = "";
	day = date.getDate();
	if(day<10){
		day = "0" + day;
	}
	return day;
}
//小时
function getHours(date){
	var hours = "";
	hours = date.getHours();
	if(hours<10){
		hours = "0" + hours;
	}
	return hours;
}
//分
function getMinutes(date){
	var minute = "";
	minute = date.getMinutes();
	if(minute<10){
		minute = "0" + minute;
	}
	return minute;
}
//秒
function getSeconds(date) {
	var second = "";
	second = date.getSeconds();
	if (second < 10) {
		second = "0" + second;
	}
	return second;
}

function getLanguage(lang){
	$.ajax({
		cache: true,
		type: "POST",
		url: frontBaseUrl+'/front/language?lang='+lang,
		async: false,
		error: function (request) {
			layer.alert("Connection error");
		},
		success: function (data) {
			var result = data;
			for (var val in result) {
				$("#"+val).html(result[val]);
			}
		}
	});
}

function getLanguageArray(lang){
	var array;
	$.ajax({
		cache: true,
		type: "POST",
		url: frontBaseUrl+'/front/language?lang='+lang,
		async: false,
		error: function (request) {
			layer.alert("Connection error");
		},
		success: function (data) {
			array = data;
		}
	});
	return array;
}