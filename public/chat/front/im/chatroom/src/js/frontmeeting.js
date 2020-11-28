
var hasLogined1 = false;
var isPublished = false;
var currentAccount;     //当前登陆的账号
var Netcall;    //SDK引入
var netcall;    //实例化对象
var inCalling = false;
var containerUserArray = [null,null,null,null];
var currentChannelid;
var nim = null;
var remoteContainerMaxFlag1 = false;
var remoteContainerMaxFlag2 = false;
var remoteContainerMaxFlag3 = false;
var remoteContainerMaxFlag4 = false;
var lacationContainerMaxFlag5 = true;

window.onload = function () {

};

function onCustomSysMsg(sysMsg) {
    console.log('收到自定义系统通知', sysMsg);
    var content = sysMsg.content;
    var obj = JSON.parse(content);
    var eventType = obj.type;
    var isAgree = obj.value;
    if(eventType == 'xiaMai'){
        dohangup();
    }else{
        if(isAgree == 'yes'){

            $("#mediaSection").empty();
            $("#mediaSection").append('<div id="LocalContainer1">\n' +
                '\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t<div id="Remotecontainer1">\n' +
                '\t\t\t\t\t\t\t\t<div id="Remotecontainer_wrap_1">\n' +
                '\t\t\t\t\t\t\t\t\t<div id="Remotecontainer_1" class="Remotecontainer_num">\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t<div id="Remotecontainer_2"  class="Remotecontainer_num">\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t<div id="Remotecontainer_wrap_2">\n' +
                '\t\t\t\t\t\t\t\t\t<div id="Remotecontainer_3"  class="Remotecontainer_num">\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t<div id="Remotecontainer_4"  class="Remotecontainer_num">\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t</div>');


            initMeeting(readCookie("channelChannelName"));

            var LocalContainer1 = document.getElementById("LocalContainer1");
            var Remotecontainer_1 = document.getElementById("Remotecontainer_1");
            var Remotecontainer_2 = document.getElementById("Remotecontainer_2");
            var Remotecontainer_3 = document.getElementById("Remotecontainer_3");
            var Remotecontainer_4 = document.getElementById("Remotecontainer_4");
            $('#LocalContainer1').hover(function(){
                timer = setTimeout(function(){
                    zoomLocalContainer1();
                },3000);
            },function(){
                //这里去clear
                clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
            });
            function zoomLocalContainer1() {
                $('#LocalContainer1').off('mouseenter').unbind('mouseleave');
                reset();
                var width0 = $('#LocalContainer1').find("div").last();
                var heigth = $(width0).height();
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
                        $('#LocalContainer1').hover(function(){
                            timer = setTimeout(function(){
                                zoomLocalContainer1();
                            },3000);
                        },function(){
                            //这里去clear
                            clearTimeout(timer);//如果没停zhi留3秒,直接会被clear掉dao,如果停留超过3秒,也一样会被clear,但是你要做的方法已经被执行了
                        });
                        if(heigth==155){
                            $('#LocalContainer1').find("div").last().css({
                                "width": "155px",
                                "margin-top": "0px"
                            });
                        }else{
                            $('#LocalContainer1').find("div").last().css({
                                "width": "619px"
                            });
                        }
                    }
                });
            };

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
                    "height": "659px",
                });
                $('#Remotecontainer_1').find("video").last().css({
                    "height": "659px",
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
                            "height": "155px"
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
                    "height": "659px",
                });
                $('#Remotecontainer_2').find("video").last().css({
                    "height": "659px",
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
                    "height": "659px",
                });
                $('#Remotecontainer_3').find("video").last().css({
                    "height": "659px",
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
                $("#xiaMai3").css({
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
                    "height": "659px",
                });
                $('#Remotecontainer_4').find("video").last().css({
                    "height": "659px",
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



            //绑定dbclick事件
            $("#Remotecontainer_1").dblclick(function(){
                if(!remoteContainerMaxFlag1){
                    reset();
                    remoteContainerMaxFlag1 = true;
                    lacationContainerMaxFlag5 = false;
                    $("#Remotecontainer_1 div").css({
                        "width": "620px",
                        "height": "459px"
                    });
                    $("#Remotecontainer_1").css({
                        "top": "-400px"
                    });
                    $("#Remotecontainer_2").css({
                        "top": "0px",
                        "position": "relative",
                        "left": "0px"
                    });
                    $("#Remotecontainer_3").css({
                        "top": "0px",
                        "position": "relative",
                        "left": "0px"
                    });
                    $("#Remotecontainer_4").css({
                        "top": "0px",
                        "position": "relative",
                        "left": "0px"
                    });
                    $("#LocalContainer1").css({
                        "position": "relative",
                        "top": "316px",
                        "left": "-467px"
                    })

                    $("#LocalContainer1 div").css({
                        "width": "155px"
                    })
                }else{
                    remoteContainerMaxFlag1 = false;
                    lacationContainerMaxFlag5 = true;
                    reset();
                }
            });

            $("#Remotecontainer_2").dblclick(function(){
                if(!remoteContainerMaxFlag2){
                    reset();
                    remoteContainerMaxFlag2 = true;
                    lacationContainerMaxFlag5 = false;
                    $("#Remotecontainer_2 div").css({
                        "width": "620px",
                        "height": "459px"
                    });
                    $("#Remotecontainer_2").css({
                        "top": "-410px",
                        "left": "-155px",
                        "position": "relative"
                    });

                    $("#Remotecontainer_3").css({
                        "top": "0px",
                        "position": "relative",
                        "left": "0px"
                    });
                    $("#Remotecontainer_4").css({
                        "top": "0px",
                        "position": "relative",
                        "left": "0px"
                    });
                    $("#LocalContainer1").css({
                        "position": "relative",
                        "top": "316px",
                        "left": "-310px"
                    })

                    $("#LocalContainer1 div").css({
                        "width": "155px"
                    })
                }else{
                    remoteContainerMaxFlag2 = false;
                    lacationContainerMaxFlag5 = true;
                    reset();
                }
            });

            $("#Remotecontainer_3").dblclick(function(){
                if(!remoteContainerMaxFlag3){
                    reset();
                    remoteContainerMaxFlag3 = true;
                    lacationContainerMaxFlag5 = false;
                    $("#Remotecontainer_3 div").css({
                        "width": "620px",
                        "height": "459px"
                    });
                    $("#Remotecontainer_3").css({
                        "top": "-410px",
                        "left": "-310px",
                        "position": "relative"
                    });

                    $("#Remotecontainer_4").css({
                        "top": "0px",
                        "position": "relative",
                        "left": "0px"
                    });
                    $("#LocalContainer1").css({
                        "position": "relative",
                        "top": "316px",
                        "left": "-155px"
                    })

                    $("#LocalContainer1 div").css({
                        "width": "155px"
                    })
                }else{
                    remoteContainerMaxFlag3 = false;
                    lacationContainerMaxFlag5 = true;
                    reset();
                }
            });

            $("#Remotecontainer_4").dblclick(function(){
                if(!remoteContainerMaxFlag4){
                    reset();
                    remoteContainerMaxFlag4 = true;
                    lacationContainerMaxFlag5 = false;
                    $("#Remotecontainer_4 div").css({
                        "width": "620px",
                        "height": "459px"
                    });
                    $("#Remotecontainer_4").css({
                        "top": "-410px",
                        "left": "-465px",
                        "position": "relative"
                    });
                    $("#LocalContainer1").css({
                        "position": "relative",
                        "top": "316px",
                        "left": "0px"
                    })

                    $("#LocalContainer1 div").css({
                        "width": "155px"
                    })
                }else{
                    remoteContainerMaxFlag4 = false;
                    lacationContainerMaxFlag5 = true;
                    reset();
                }
            });


            $("#LocalContainer1").dblclick(function(){
                if(!lacationContainerMaxFlag5){
                    reset();
                    lacationContainerMaxFlag5 = true;
                }
            });

        }else{
            alert("主播拒绝连麦");
        }
    }



}

function reset() {
     remoteContainerMaxFlag1 = false;
     remoteContainerMaxFlag2 = false;
     remoteContainerMaxFlag3 = false;
     remoteContainerMaxFlag4 = false;
    lacationContainerMaxFlag5 = true;
    $("#Remotecontainer_1 div").css({
        "width": "155px",
        "height": "155px"
    });
    $("#Remotecontainer_2 div").css({
        "width": "155px",
        "height": "155px"
    });
    $("#Remotecontainer_3 div").css({
        "width": "155px",
        "height": "155px"
    });
    $("#Remotecontainer_4 div").css({
        "width": "155px",
        "height": "155px"
    });
    $("#Remotecontainer_1").css({
        "top": ""
    });
    $("#LocalContainer1").css({
        "position": "",
        "top": "",
        "left": ""
    })

    $("#LocalContainer1 div").css({
        "width": ""
    })

    $("#Remotecontainer_2").css({
        "position": "",
        "top": "",
        "left": ""
    });
    $("#Remotecontainer_3").css({
        "position": "",
        "top": "",
        "left": ""
    });
    $("#Remotecontainer_4").css({
        "position": "",
        "top": "",
        "left": ""
    });

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

function confirmSecret(id,hostAccid) {
    var secret = $("#secretPassword").val();

    if(secret ==null || secret == undefined || secret == ""){
        alert("password can't be empty");
        location.reload();
        return;
    }
    $.ajax({
        cache: true,
        type: "POST",
        // url: '/front/confirmSecret?chatRoomId=' + id + '&secret=' + secret,
        url: `${window.requestUrl}/front/confirmSecret?chatRoomId=${id}&secret=${secret}`,
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
                // var fromAccount = readCookie("accid");
                // var userName = readCookie("userName");
                // var content = {
                //     type: 'applyLink',
                //     value: fromAccount,
                //     userName:userName
                // };
                // content = JSON.stringify(content);
                // var msgId = nim.sendCustomSysMsg({
                //     scene: 'p2p',
                //     to: hostAccid,
                //     content: content,
                //     sendToOnlineUsersOnly: false,
                //     apnsText: content,
                //     done: sendCustomSysMsgDone
                // });
                // console.log('正在发送p2p自定义系统通知, id=' + msgId);
                //initMeeting(readCookie("channelChannelName"));
                //layer.alert("sended");
            }else {
                if(confirm("password is invalid")){

                   // return;
                }else {

                   // return;
                }
                window.opener=null;
                window.open('','_self');
                window.close();
                return;

            }
        }
    });
}

function applyLink(hostAccid) {
    var fromAccount = readCookie("accid");
    var userName = readCookie("userName");
    var secret = readCookie("secret");
    console.info("fromAccount:" + fromAccount);
    console.info("hostAccid:" + hostAccid);
        var content = {
            type: 'applyLink',
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
        //initMeeting(readCookie("channelChannelName"));


}

function sendCustomSysMsgDone(error, msg) {
    console.log('发送' + msg.scene + '自定义系统通知' + (!error?'成功':'失败') + ', id=' + msg.idClient);
    console.log(error);
    console.log(msg);
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
    var param = {
        enableMixVideo:false, // 这里设置为true(布尔型，不是字符串)表示开启混屏
        videoLayout: WebRTC.LAYOUT_TOP_RIGHT, // 混屏时视频画面的布局位置
        videoCompressSize: WebRTC.CHAT_VIDEO_QUALITY_720P // 混屏时视频画面的压缩比例
    };
    netcall.setMixConf(param); //webrtc表示音视频实例名称
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
        bypassRtmp: false,
        liveEnable:true,
        rtmpUrl:"",//readCookie("pushRtmpUrl")
        rtmpRecord: false,
        splitMode: Netcall.LAYOUT_SPLITCUSTOM
    };
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
                height: 495,
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
                    // cleanName(i);
                    $("#Remotecontainer_" + i).css("height","155px");
                    $("#Remotecontainer_" + i).css("width","155px");
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

           window.location.reload();
        });
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



