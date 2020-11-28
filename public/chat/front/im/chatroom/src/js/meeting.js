
var hasLogined1 = false;
var isPublished = false;
var currentAccount;     //当前登陆的账号
var Netcall;    //SDK引入
var netcall;    //实例化对象
var inCalling = false;
var containerUserArray = [null,null,null,null];
var currentChannelid;
var nim;
var remoteContainerMaxFlag1 = false;
var remoteContainerMaxFlag2 = false;
var remoteContainerMaxFlag3 = false;
var remoteContainerMaxFlag4 = false;






window.onload = function () {
    $('#LocalContainer1').hover(function(){
        timer = setTimeout(function(){
            zoomRemoteContainer0();
        },3000);
    },function(){
        //这里去clear
        clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
    });
    function  zoomRemoteContainer0() {
        $('#LocalContainer1').off('mouseenter').unbind('mouseleave');
        reset();
        $('#LocalContainer1').find("div").last().css({
            "width": "100%",
            "margin-top": "50px"
        });
        layer.open({
            type: 1,
            shade: true,
            title: false, //不显示标题
            area: ['95%', '95%'],
            content: $('#LocalContainer1'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            cancel: function(){
                    $('#LocalContainer1').find("div").last().css({
                        "width": "619px",
                        "margin-top": "0px"
                    });
                $('#LocalContainer1').hover(function(){
                    timer = setTimeout(function(){
                        zoomRemoteContainer0();
                    },3000);
                },function(){
                    //这里去clear
                    clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
                });
            }
        });
    }


    $('#Remotecontainer_1').hover(function(){
        timer = setTimeout(function(){
            zoomRemoteContainer1();
        },3000);
    },function(){
        //这里去clear
        clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
    });
     function  zoomRemoteContainer1() {
         $('#Remotecontainer_1').off('mouseenter').unbind('mouseleave');
         reset();
        $("#xiaMai1").css({
            "display": "none"
        })
        var width0 = $('#Remotecontainer_1').find("div").last();
        var heigth = $(width0).height();
        $('#Remotecontainer_1').css({
            "max-width": "100%",
            "width": "100%"
        });
        $('#Remotecontainer_1').find("div").last().css({
            "width": "100%",
            "height": "580px",

        });
        $('#Remotecontainer_1').find("video").last().css({
            "height": "580px",
        });
        layer.open({
            type: 1,
            shade: true,
            title: false, //不显示标题
            area: ['95%', '95%'],
            content: $('#Remotecontainer_1'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            cancel: function(){
                $('#Remotecontainer_1').hover(function(){
                    timer = setTimeout(function(){
                        zoomRemoteContainer1();
                    },3000);
                },function(){
                    //这里去clear
                    clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
                });
                    $("#xiaMai1").css({
                        "display": ""
                    })
                    $('#Remotecontainer_1').css({
                        "max-width": "25%",
                        "width": ""
                    });
                    $('#Remotecontainer_1').find("div").last().css({
                        "width": "155px",
                        "height": "155px",

                    });
                    $('#Remotecontainer_1').find("video").last().css({
                        "height": "auto",
                    });

            }
        });
    };



    $('#Remotecontainer_2').hover(function(){
        timer = setTimeout(function(){
            zoomRemoteContainer2();
        },3000);
    },function(){
        //这里去clear
        clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
    });
    function  zoomRemoteContainer2() {
        $('#Remotecontainer_2').off('mouseenter').unbind('mouseleave');
        reset();
        $("#xiaMai2").css({
            "display": "none"
        })
        var width0 = $('#Remotecontainer_2').find("div").last();
        var heigth = $(width0).height();
        $('#Remotecontainer_2').css({
            "max-width": "100%",
            "width": "100%"
        });
        $('#Remotecontainer_2').find("div").last().css({
            "width": "100%",
            "height": "580px",
        });
        $('#Remotecontainer_2').find("video").last().css({
            "height": "580px",
        });
        layer.open({
            type: 1,
            shade: true,
            title: false, //不显示标题
            area: ['95%', '95%'],
            content: $('#Remotecontainer_2'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            cancel: function(){
                $('#Remotecontainer_2').hover(function(){
                    timer = setTimeout(function(){
                        zoomRemoteContainer2();
                    },3000);
                },function(){
                    //这里去clear
                    clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
                });
                $("#xiaMai2").css({
                    "display": ""
                })
                $('#Remotecontainer_2').css({
                    "max-width": "25%",
                    "width": ""
                });
                $('#Remotecontainer_2').find("div").last().css({
                    "width": "155px",
                    "height": "155px"
                });
                $('#Remotecontainer_2').find("video").last().css({
                    "height": "auto",
                });

            }
        });
    };

    $('#Remotecontainer_3').hover(function(){
        timer = setTimeout(function(){
            zoomRemoteContainer3();
        },3000);
    },function(){
        //这里去clear
        clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
    });
    function  zoomRemoteContainer3() {
        $('#Remotecontainer_3').off('mouseenter').unbind('mouseleave');
        reset();
        $("#xiaMai3").css({
            "display": "none"
        })
        var width0 = $('#Remotecontainer_3').find("div").last();
        var heigth = $(width0).height();
        $('#Remotecontainer_3').css({
            "max-width": "100%",
            "width": "100%"
        });
        $('#Remotecontainer_3').find("div").last().css({
            "width": "100%",
            "height": "580px",
        });
        $('#Remotecontainer_3').find("video").last().css({
            "height": "580px",
        });
        layer.open({
            type: 1,
            shade: true,
            title: false, //不显示标题
            area: ['95%', '95%'],
            content: $('#Remotecontainer_3'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            cancel: function(){
                $('#Remotecontainer_3').hover(function(){
                    timer = setTimeout(function(){
                        zoomRemoteContainer3();
                    },3000);
                },function(){
                    //这里去clear
                    clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
                });
                $("#xiaMai3").css({
                    "display": ""
                })
                $('#Remotecontainer_3').css({
                    "max-width": "25%",
                    "width": ""
                });
                $('#Remotecontainer_3').find("div").last().css({
                    "width": "155px",
                    "height": "155px"
                });
                $('#Remotecontainer_3').find("video").last().css({
                    "height": "auto",
                });

            }
        });
    };


    $('#Remotecontainer_4').hover(function(){
        timer = setTimeout(function(){
            zoomRemoteContainer4();
        },3000);
    },function(){
        //这里去clear
        clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
    });
    function  zoomRemoteContainer4() {
        $('#Remotecontainer_4').off('mouseenter').unbind('mouseleave');
        reset();
        $("#xiaMai4").css({
            "display": "none"
        })
        var width0 = $('#Remotecontainer_4').find("div").last();
        var heigth = $(width0).height();
        $('#Remotecontainer_4').css({
            "max-width": "100%",
            "width": "100%"
        });
        $('#Remotecontainer_4').find("div").last().css({
            "width": "100%",
            "height": "580px",
        });
        $('#Remotecontainer_4').find("video").last().css({
            "height": "580px",
        });
        layer.open({
            type: 1,
            shade: true,
            title: false, //不显示标题
            area: ['95%', '95%'],
            content: $('#Remotecontainer_4'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            cancel: function(){
                $('#Remotecontainer_4').hover(function(){
                    timer = setTimeout(function(){
                        zoomRemoteContainer4();
                    },3000);
                },function(){
                    //这里去clear
                    clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
                });
                $("#xiaMai4").css({
                    "display": ""
                })
                $('#Remotecontainer_4').css({
                    "max-width": "25%",
                    "width": ""
                });
                $('#Remotecontainer_4').find("div").last().css({
                    "width": "155px",
                    "height": "155px"
                });
                $('#Remotecontainer_4').find("video").last().css({
                    "height": "auto",
                });

            }
        });
    };

    var url = location.search;
    getLanguage("zh_CN");//en_US
    var params = getUrlParams(url);
    var id = params.id;
    console.log("房间id="+id);
    $.ajax({
        cache: true,
        type: "POST",
        url: '/front/getPullUrl?chatRoomId=' + id,//登录之后把userName放入cookie中
        data: {},
        xhrFields: {
            withCredentials: true
        },
        async: false,
        error: function (request) {
            layer.alert("Connection error");
        },
        success: function (data) {
            if (data.code == 200) {
                setCookie("pushRtmpUrl", data.data.pushUrl);
                setCookie("accid", data.data.accid);
                setCookie("token", data.data.token);
                setCookie("channelCid",data.data.channelCid);
                setCookie("channelChannelName",data.data.channelChannelName);
                console.log(data.data.channelChannelName);
                var startCallBtn = document.getElementById("startCallBtn");
                var hangupBtn = document.getElementById("hangupBtn");
                var xiaMai1 = document.getElementById("xiaMai1");
                var xiaMai2 = document.getElementById("xiaMai2");
                var xiaMai3 = document.getElementById("xiaMai3");
                var xiaMai4 = document.getElementById("xiaMai4");
                var shareScreeBtn = document.getElementById("shareScreeBtn");
                var closeScreeBtn = document.getElementById("closeScreeBtn");
                var remoteContainer = document.getElementById('Remotecontainer1');
                nim = NIM.getInstance({
                    appKey:'ff5865f81744d8024f256468dc696272',
                    account: readCookie("accid"),//
                    token: readCookie("token"),//
                    onconnect: onConnect,
                    onwillreconnect: onWillReconnect,
                    ondisconnect: onDisconnect,
                    onerror: onError,
                    onMsg:onMsg,
                    oncustomsysmsg: onCustomSysMsg
                });

                // 点击加入多人房间
                startCallBtn.onclick = function () {
                    // $("#mediaSection").css({"background-color":"#ffffff"});
                    initMeeting(readCookie("channelChannelName"));

                };

                // 点击共享屏幕
                shareScreeBtn.onclick = function () {
                    netcall.startDevice({
                        type: Netcall.DEVICE_TYPE_DESKTOP_CHROME_SCREEN
                    }).catch(function(err) {
                        console.log('启动屏幕共享失败', err)
                    })

                };


                //点击挂断按钮
                xiaMai1.onclick = function () {
                    console.log("点击下麦");
                    if(netcall.channelId){

                        doXiaMai(1);
                        var ui = document.getElementById("xiaMai1");
                        ui.style.display="none";
                    }else {
                        alert("当前没有正在通话");
                    }
                }
                //点击挂断按钮
                xiaMai2.onclick = function () {
                    console.log("点击下麦");
                    if(netcall.channelId){
                        doXiaMai(2);
                        var ui = document.getElementById("xiaMai2");
                        ui.style.display="none";
                    }else {
                        alert("当前没有正在通话");
                    }
                }
                //点击挂断按钮
                xiaMai3.onclick = function () {
                    console.log("点击下麦");
                    if(netcall.channelId){
                        doXiaMai(3);
                        var ui = document.getElementById("xiaMai3");
                        ui.style.display="none";
                    }else {
                        alert("当前没有正在通话");
                    }
                }
                //点击挂断按钮
                xiaMai4.onclick = function () {
                    console.log("点击下麦");
                    if(netcall.channelId){
                        doXiaMai(4);
                        var ui = document.getElementById("xiaMai4");
                        ui.style.display="none";
                    }else {
                        alert("当前没有正在通话");
                    }
                }





                //点击挂断按钮
                hangupBtn.onclick = function () {
                    console.log("点击挂断");
                    if(netcall.channelId){
                        dohangup();
                    }else {
                        alert("当前没有正在通话");
                    }
                }




            }
        }
    });


//绑定dbclick事件
    $("#Remotecontainer_1").dblclick(function(){
        if(!remoteContainerMaxFlag1){
            reset();
            remoteContainerMaxFlag1 = true;
            $('#Remotecontainer_1').find("div").last().css({
                "width": "619px",
                "height": "459px"
            });
            $("#Remotecontainer_1").css({
                "top": "-404px"
            });
            $("#Remotecontainer_2").css({
                "top": "0",
                "position": "relative",
                "left": "0"
            });
            $("#Remotecontainer_3").css({
                "top": "0",
                "position": "relative",
                "left": "0"
            });
            $("#Remotecontainer_4").css({
                "top": "0",
                "position": "relative",
                "left": "0"
            });
            $("#LocalContainer1").css({
                "position": "relative",
                "top": "321px",
                "left": "-464px"
            })

            $('#LocalContainer1').find("div").last().css({
                "width": "155px"
            })
            $("#xiaMai1").css({
                "left": "",
                "top":  "60px"
            })
            $("#xiaMai2").css({
                "left": "",
            })
            $("#xiaMai3").css({
                "left": "",
            })
            $("#xiaMai4").css({
                "left": "",
            })
        }else{
            remoteContainerMaxFlag1 = false;
            reset();
        }
    });

    ///////////////
    $("#Remotecontainer_2").dblclick(function(){
        if(!remoteContainerMaxFlag2){
            reset();
            remoteContainerMaxFlag2 = true;
            $('#Remotecontainer_2').find("div").last().css({
                "width": "619px",
                "height": "459px"
            });
            $("#Remotecontainer_2").css({
                "position": "relative",
                "top": "-410px",
                "left": "-155px"
            });

            $("#Remotecontainer_3").css({
                "top": "0",
                "position": "relative",
                "left": "0"
            });
            $("#Remotecontainer_4").css({
                "top": "0",
                "position": "relative",
                "left": "0"
            });
            $("#LocalContainer1").css({
                "position": "relative",
                "top": "321px",
                "left": "-309px"
            })

            $('#LocalContainer1').find("div").last().css({
                "width": "155px",
            })
            $("#xiaMai1").css({
                "left": "",
                "top":  "35px"
            })
            $("#xiaMai2").css({
                "left": "",
                "top":  "66px"
            })
            $("#xiaMai3").css({
                "left": "",
                "top":  "45px"
            })
        }else{
            remoteContainerMaxFlag2 = false;
            reset();
        }
    });



    $("#Remotecontainer_3").dblclick(function(){
        if(!remoteContainerMaxFlag3){
            reset();
            remoteContainerMaxFlag3 = true;
            $('#Remotecontainer_3').find("div").last().css({
                "width": "619px",
                "height": "459px"
            });
            $("#Remotecontainer_3").css({
                "position": "relative",
                "top": "-410px",
                "left": "-310px"
            });

            $("#Remotecontainer_4").css({
                "top": "0",
                "position": "relative",
                "left": "0"
            });
            $("#LocalContainer1").css({
                "position": "relative",
                "top": "321px",
                "left": "-155px"
            })

            $('#LocalContainer1').find("div").last().css({
                "width": "155px"
            })
            $("#xiaMai1").css({
                "left": "",
                "top":  "35px"
            })
            $("#xiaMai2").css({
                "left": "",
                "top":"45px"
            })
            $("#xiaMai3").css({
                // "left": "10px",
                "top":"66px"
            })
        }else{
            remoteContainerMaxFlag3 = false;
            reset();
        }
    });

    $("#Remotecontainer_4").dblclick(function(){
        if(!remoteContainerMaxFlag4){
            reset();
            remoteContainerMaxFlag4 = true;
            $('#Remotecontainer_4').find("div").last().css({
                "width": "619px",
                "height": "459px"
            });
            $("#Remotecontainer_4").css({
                "position": "relative",
                "top": "-404px",
                "left":"-460px"
            });

            $("#LocalContainer1").css({
                "position": "relative",
                "top": "321px",
                "left": "0"
            })

            $('#LocalContainer1').find("div").last().css({
                "width": "155px"
            })
            $("#xiaMai1").css({
                "left": "",
                "top":  "35px"
            })
            $("#xiaMai2").css({
                "left": "",
            })
            $("#xiaMai4").css({
                "top":  "66px"
            })
        }else{
            remoteContainerMaxFlag4 = false;
            reset();
        }
    });
};

function reset() {

    remoteContainerMaxFlag1 = false;
    remoteContainerMaxFlag2 = false;
    remoteContainerMaxFlag3 = false;
    remoteContainerMaxFlag4 = false;

    $('#Remotecontainer_1').find("div").last().css({
        "width": "155px",
        "height": "155px"
    });
    $('#Remotecontainer_2').find("div").last().css({
        "width": "155px",
        "height": "155px"
    });
    $('#Remotecontainer_3').find("div").last().css({
        "width": "155px",
        "height": "155px"
    });
    $('#Remotecontainer_4').find("div").last().css({
        "width": "155px",
        "height": "155px"
    });
    $("#Remotecontainer_1").css({
        "top": ""
    });
    $("#Remotecontainer_2").css({
        "top": "",
        "position": "",
        "left": ""
    });
    $("#Remotecontainer_3").css({
        "top": "",
        "position": "",
        "left": ""
    });
    $("#Remotecontainer_4").css({
        "top": "",
        "position": "",
        "left": ""
    });

    $("#LocalContainer1").css({
        "position": "",
        "top": "",
        "left": ""
    })

    $('#LocalContainer1').find("div").last().css({
        "width": ""
    })
    $("#xiaMai1").css({
        "left": "0px",
        "top":  "35px"
    })
    $("#xiaMai2").css({
        "left": "",
        "top":"45px"
    })
    $("#xiaMai3").css({
        "left": "",
        "top":"45px"
    })
    $("#xiaMai4").css({
        "left": "",
        "top":"45px"
    })

}


function rejectLink(account) {

    var content ;



            content = {
                type: 'applyLink',
                value: 'no'
            };
        content = JSON.stringify(content);
        var msgId = nim.sendCustomSysMsg({
            scene: 'p2p',
            to: account,
            content: content,
            sendToOnlineUsersOnly: false,
            apnsText: content,
            done: sendCustomSysMsgDone
        });
        console.log('正在发送p2p自定义系统通知, id=' + msgId);



        $("#" + account).remove();


}
function agreeLink(account) {

    var videoNum = $("video").length;
    var content ;
    if(videoNum < 5){

            content = {
                type: 'applyLink',
                value: 'yes'
            };
        content = JSON.stringify(content);
        var msgId = nim.sendCustomSysMsg({
            scene: 'p2p',
            to: account,
            content: content,
            sendToOnlineUsersOnly: false,
            apnsText: content,
            done: sendCustomSysMsgDone
        });
        console.log('正在发送p2p自定义系统通知, id=' + msgId);

    }else{
        alert("连麦人数太多，请稍后操作");
    }
    $("#" + account).remove();

}

function onCustomSysMsg(sysMsg) {
    console.log('收到自定义系统通知', sysMsg);
    var content = sysMsg.content;
    var obj = JSON.parse(content);
    var eventType = obj.type;
    var fromAccount = obj.value;
    var accountDiv = document.getElementById(fromAccount);
    if( accountDiv != null){
        return;
    }else {
        var userName = obj.userName;
        var rowContent = "<div id='" + fromAccount + "'" + " class=\"row\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xl-8 col-lg-8 col-md-8 col-sm-8 \" style=\"height: 30px; text-align: left;\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t<div>\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t\t" + userName +"\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xl-2 col-lg-2 col-md-2 col-sm-2 \" style=\"height: 30px; text-align: center;\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"sendBtn\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t\t<a onclick=\"rejectLink('" + fromAccount + "')\" class=\"u-btn btn\" id=\"rejectLink\" style=\"border-radius: 0px !important;    background: #FFCC00;\n" +
            "    border-radius: 0px !important;\n" +
            "    height: 22px;\n" +
            "    line-height: 10px;\n" +
            "    color: #000000;\">拒绝</a>\n" +
            "\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xl-2 col-lg-2 col-md-2 col-sm-2 \" style=\"height: 30px; text-align: center;\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"sendBtn\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t\t<a onclick=\"agreeLink('" + fromAccount + "')\" class=\"u-btn btn\" id=\"agreeLink\" style=\"border-radius: 0px !important;    background: #0160B0;\n" +
            "    border-radius: 0px !important;\n" +
            "    height: 22px;\n" +
            "    line-height: 10px;\n" +
            "    color: #ffffff;\">同意</a>\n" +
            "\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t\t\t</div>"
        $("#linkListDiv").append(rowContent);
    }


}

function sendCustomSysMsgDone(error, msg) {
    console.log('发送' + msg.scene + '自定义系统通知' + (!error?'成功':'失败') + ', id=' + msg.idClient);
    console.log(error);
    console.log(msg);
}
function onMsg(msg) {
    console.log('收到消息', msg.scene, msg.type, msg);
}
function onConnect() {
    console.log("连接成功");
    hasLogined1 = true;
    currentAccount = nim.account;
}
function onWillReconnect(obj) {
    // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
    console.log('即将重连');
    console.log(obj.retryCount);
    console.log(obj.duration);
}
function onDisconnect(error) {
    // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
    console.log('丢失连接');
    console.log(error);
    if (error) {
        switch (error.code) {
            // 账号或者密码错误, 请跳转到登录页面并提示错误
            case 302:
                alert("账号或密码错误");
                break;
            // 被踢, 请提示错误后跳转到登录页面
            case 'kicked':
                break;
            default:
                break;
        }
    }
    window.location.href = './index.html';
    delCookie("accid");
    delCookie("token");
}
function onError(error) {
    console.log(error);
    alert("登陆异常" + error);
    window.location.href = './index.html';
    delCookie("accid");
    delCookie("token");
}

function initMeeting(channelName) {

    NIM.use(WebRTC);
    this.Netcall = WebRTC;
    this.netcall = Netcall.getInstance({
        nim: nim,
        container: document.getElementById('LocalContainer1'),
        remoteContainer: document.getElementById('Remotecontainer1'),
        // 是否开启日志打印
        debug: true
    });
    console.log("channelId："+channelName)
    startMeeting(channelName);
    netcall.on('streamEnded', function(obj) {
        console.log('媒体流停止了', obj);
        if (obj && obj.type === 'screen') {
            //屏幕共享的媒体流已经停止了，此处做关闭屏幕共享处理
            netcall.stopDevice(Netcall.DEVICE_TYPE_DESKTOP_CHROME_SCREEN).then(() => {
                netcall.startDevice({
                    type: Netcall.DEVICE_TYPE_VIDEO      //这里可以调整为是屏幕共享，还是摄像头
                }).then(()=> {
                    //预览本地画面
                    netcall.startLocalStream(
                        document.getElementById('LocalContainer1')
                    );
                    // 设置本地预览画面大小
                    netcall.setVideoViewSize({
                        width: 744,
                        height: 500,
                        cut:true
                    })
                })

                // alert('屏幕共享关闭成功')
            })
        }

    });

}

function startMeeting(channelName) {
    var flag = false;
    const sessionConfig = {
        videoQuality: Netcall.CHAT_VIDEO_QUALITY_720P,
        videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_10,
        videoEncodeMode: Netcall.CHAT_VIDEO_ENCODEMODE_SCREEN,
        videoBitrate: 0,
        recordVideo: false,
        recordAudio: false,
        highAudio: false,
        bypassRtmp: true,
        liveEnable:true,
        rtmpUrl:readCookie("pushRtmpUrl"),
        rtmpRecord: false,
        splitMode: Netcall.LAYOUT_SPLITCUSTOM,
        layout:'{"version":0,"set_host_as_main":false,"host_area":{"adaption":1,"position_x":0,"position_y":0,"width_rate":10000,"height_rate":7500},"special_show_mode":false,"n_host_area_number":4,"main_width":1200,"main_height":1200,"background":{"rgb_r":0,"rgb_g":0,"rgb_b":0},"n_host_area_0":{"position_x":0,"position_y":7500,"width_rate":2500,"height_rate":2500,"adaption":1},"n_host_area_1":{"position_x":2500,"position_y":7500,"width_rate":2500,"height_rate":2500,"adaption":1},"n_host_area_2":{"position_x":5000,"position_y":7500,"width_rate":2500,"height_rate":2500,"adaption":1},"n_host_area_3":{"position_x":7500,"position_y":7500,"width_rate":2500,"height_rate":2500,"adaption":1}}'

    };
    console.log("进入房间参数："+JSON.stringify(sessionConfig))
    netcall.joinChannel({
            channelName: channelName, //必填
            type: Netcall.NETCALL_TYPE_VIDEO,
            liveEnable: true, //开启互动直播
            sessionConfig: sessionConfig
        }).catch(function (err) {
            if (err.event.event.code === 404 && !flag){
                netcall.createChannel({
                    channelName: channelName,
                    custom: '自定义数据',
                    webrtcEnable: true,
                    rtmpConf: ''
                }).then(function(obj) {
                    startMeeting(channelName);
                    flag = true;
                })
            }
            console.log(12343,err);
        }).then(function(obj) {
            currentChannelid = obj.channelId;
            startConnect();
        });
}

function startConnect() {
    const netcall = this.netcall;
    //展示本地画面左上角的accid
    // showName(0,null);
    // 连接媒体网关
    netcall.startRtc().then(function() {
        // 开启麦克风
        return netcall.startDevice({
            type: Netcall.DEVICE_TYPE_AUDIO_IN
        }).catch(function(err) {
            console.log('启动麦克风失败');
            console.error(err)
        })
    }).then(function() {
        // 设置采集音量
        netcall.setCaptureVolume(100);
        // 开启摄像头
        return netcall.startDevice({
            type: Netcall.DEVICE_TYPE_VIDEO      //这里可以调整为是屏幕共享，还是摄像头
            // type: Netcall.DEVICE_TYPE_DESKTOP_CHROME_SCREEN
        }).catch(function(err) {
                console.log('启动摄像头失败');
                console.error(err)
        })
    }).then(function() {
            inCalling = true; //标记当前正在通话
            //预览本地画面
            netcall.startLocalStream(
                document.getElementById('LocalContainer1')
            );
            // 设置本地预览画面大小
            netcall.setVideoViewSize({
                width: 744,
                height: 500,
                cut:true
            })
        }).catch(function(err) {
                console.log('发生错误');
                console.log(err);
                dohangup();

            });

    netcall.on('joinChannel', function(obj) {
        console.log('user joinchannel', obj);
    });

    netcall.on('leaveChannel',function (obj) {
        reset();
        if (obj.channelId === currentChannelid){
            for (var i = 1;i < 5;i++){
                if (obj.account === containerUserArray[i - 1]){
                    containerUserArray[i - 1] = null;
                    $("#xiaMai"+ i).css("display","none");
                    // cleanName(i);
                    $("#Remotecontainer_" + i).css("height","155px");
                }
            }  
        } 
    });
// 在回调里监听对方加入通话，并显示对方的视频画面
    netcall.on('remoteTrack', function(obj) {
        console.log('user join', obj);
        var i = 1;
        while (containerUserArray[i - 1] != null){
            if (i === 5){
                return;
            }
            if (containerUserArray[i - 1] === obj.account){
                startPlay(obj,i);
                console.log("开始播放画面 ",obj.account,' ',i);
                return;
            }
            i++;
        }
        containerUserArray[i-1] = obj.account;
        if (i < 5){
            startPlay(obj,i);
            console.log("开始播放画面 ",obj.account,' ',i)
        }
    })
}

function startPlay(obj,num) {
    document.getElementById('Remotecontainer_'+num +'_id').value=obj.account;
    var ui = document.getElementById("xiaMai"+num);
    ui.style.display="";
    // showName(num,obj);
    // 播放对方声音
    netcall.startDevice({
        type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT
    }).catch(function(err) {
        console.log('播放对方的声音失败');
        console.error(err)
    });

    // 预览对方视频画面
    netcall.startRemoteStream({
        account: obj.account,
        node: document.getElementById('Remotecontainer_'+num)
    });
    // 设置对方预览画面大小
    netcall.setVideoViewRemoteSize({
        account: obj.account,
        width: 155,
        height: 155,
        cut:true
    })
}

function dohangup() {
    if (netcall){
        netcall.leaveChannel().then(function(obj) {
            currentChannelid = null;
            inCalling = false;
            // cleanName(0);
            // cleanName(1);
            // cleanName(2);
            // cleanName(3);
            // cleanName(4);
        });
    }
}


function doXiaMai(num) {
    reset();
    if (netcall){
        var hostAccid = document.getElementById('Remotecontainer_'+num +'_id').value;
        var fromAccount = readCookie("accid");
        var userName = readCookie("userName");
        console.info("fromAccount:" + fromAccount);
        console.info("hostAccid:" + hostAccid);
        var content = {
            type: 'xiaMai',
            value: fromAccount,
            userName:userName
        };
        content = JSON.stringify(content);
        var msgId = nim.sendCustomSysMsg({
            scene: 'p2p',
            to: hostAccid,
            content: content,
            sendToOnlineUsersOnly: false,
            apnsText: content,
            done: sendCustomSysMsgDone
        });
        console.log('正在发送p2p自定义系统通知, id=' + msgId);
    }
}



// function showName(num,obj) {
//     var currentName;
//     if (num === 0){
//         currentName = document.getElementById('Localcontainer_0_name');
//         currentName.style.display = 'block';
//         currentName.innerText = currentAccount;
//         return;
//     }
//     currentName = document.getElementById('Remotecontainer_'+(num)+'_name');
//     currentName.style.display = 'block';
//     currentName.innerText = obj.account;
// }

// function cleanName(num) {
//     var currentName;
//     if (num === 0){
//         currentName = document.getElementById('Localcontainer_0_name');
//         currentName.style.display = 'none';
//         currentName.innerText = '';
//         return;
//     }
//     currentName = document.getElementById('Remotecontainer_'+(num)+'_name');
//     currentName.style.display = 'none';
//     currentName.innerText = '';
// }


