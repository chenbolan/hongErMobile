
var hasLogined1 = false;
var isPublished = false;
var currentAccount;     //当前登陆的账号
var Netcall;    //SDK引入
var netcall;    //实例化对象
var inCalling = false;
var containerUserArray = [null,null,null,null];
var currentChannelid;




window.onload = function () {

    var inputAccid = document.getElementById("oppaccid");       //输入对方的accid框
    var startCallBtn = document.getElementById("startCallBtn");
    var hangupBtn = document.getElementById("hangupBtn");
    var remoteContainer = document.getElementById('Remotecontainer1');

    var logoutBtn = document.getElementById('logoutBtn');

    var defaultValue = "请输入房间的RoomName";

    inputAccid.onclick = function () {
        if(inputAccid.value === defaultValue){
            inputAccid.value='';
            this.style.color='#000'
        }
    };

    inputAccid.onblur = function () {
        console.log(inputAccid.value);
        if(!inputAccid.value || inputAccid.value === ''){
            inputAccid.value = defaultValue;
            this.style.color='#999'
        }
    };

    // 点击加入多人房间
    startCallBtn.onclick = function () {
        console.log(hasLogined1);
        if (hasLogined1){
            if (!inputAccid.value || inputAccid.value === '' || inputAccid.value === defaultValue){
                alert("请输入房间名！");
            } else {
                initMeeting(inputAccid.value);
            }
        } else {
            alert("当前未登陆！");
        }
    };

    //点击挂断按钮
    hangupBtn.onclick = function () {
        console.log("点击挂断");
        if(netcall.channelId){
            dohangup();
        }else {
            alert("当前没有正在通话");
        }
    }

    logoutBtn.onclick = function () {
        console.log('主动登出');
        if (nim){
            nim.disconnect();
        }
        window.location.href = './login.js';
    }

};

var nim = NIM.getInstance({
    appKey:'ff5865f81744d8024f256468dc696272',
    account: readCookie("accid"),
    token: readCookie("token"),
    onconnect: onConnect,
    onwillreconnect: onWillReconnect,
    ondisconnect: onDisconnect,
    onerror: onError,
    onMsg:onMsg
});

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
    startMeeting(channelName);
}

function startMeeting(channelName) {
    var flag = false;
    const sessionConfig = {
        videoQuality: Netcall.CHAT_VIDEO_QUALITY_HIGH,
        videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_15,
        videoEncodeMode: Netcall.CHAT_VIDEO_ENCODEMODE_NORMAL,
        videoBitrate: 0,
        recordVideo: false,
        recordAudio: false,
        highAudio: false,
        bypassRtmp: false,
        rtmpUrl: 'rtmp://p4d52bcb0.live.126.net/live/f183e6679d974675a44343ce96535c2f?wsSecret=59303c31c0a5c01e07f5c13d50e1e73a&wsTime=1589722762',
        rtmpRecord: false,
        splitMode: Netcall.LAYOUT_SPLITLATTICETILE
    };
    netcall.joinChannel({
            channelName: channelName, //必填
            type: Netcall.NETCALL_TYPE_VIDEO,
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
    showName(0,null);
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
        netcall.setCaptureVolume(0);
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
                width: 500,
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
        if (obj.channelId === currentChannelid){
            for (var i = 1;i < 5;i++){
                if (obj.account === containerUserArray[i - 1]){
                    containerUserArray[i - 1] = null;
                    cleanName(i);
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

    showName(num,obj);
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
        width: 245,
        height: 245,
        cut:true
    })
}

function dohangup() {
    if (netcall){
        netcall.leaveChannel().then(function(obj) {
            currentChannelid = null;
            inCalling = false;
            cleanName(0);
            cleanName(1);
            cleanName(2);
            cleanName(3);
            cleanName(4);
        });
    }
}

function showName(num,obj) {
    var currentName;
    if (num === 0){
        currentName = document.getElementById('Localcontainer_0_name');
        currentName.style.display = 'block';
        currentName.innerText = currentAccount;
        return;
    }
    currentName = document.getElementById('Remotecontainer_'+(num)+'_name');
    currentName.style.display = 'block';
    currentName.innerText = obj.account;
}

function cleanName(num) {
    var currentName;
    if (num === 0){
        currentName = document.getElementById('Localcontainer_0_name');
        currentName.style.display = 'none';
        currentName.innerText = '';
        return;
    }
    currentName = document.getElementById('Remotecontainer_'+(num)+'_name');
    currentName.style.display = 'none';
    currentName.innerText = '';
}
