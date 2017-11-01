var FriendPay = {
    temp: {
        serviceDetail:
        '<div class="fp-hd"> ' +
        '<p class="hd-title">支付费用</p> ' +
        '<p class="hd-money">{{orderMoney}} <span class="unit">元</span></p> ' +
        '</div> ' +
        '<div class="fp-bd"> ' +
        '<p class="service-name">{{serviceName}}</p> ' +
        '<div class="service-msg"> ' +
        '<span class="service-title">姓名:</span> ' +
        '<span class="service-cont">{{userName}}</span> ' +
        '</div> ' +
        '<div class="service-msg"> ' +
        '<span class="service-title">服务期限:</span> ' +
        '<span class="service-cont">{{billWayNum}}{{billWayName}}</span> ' +
        '</div> ' +
        '<div class="service-msg"> ' +
        '<span class="service-title">服&nbsp;务&nbsp;者&nbsp;:</span>' +
        '<span class="service-cont">{{providerName}}</span>' +
        '</div> ' +
        '</div> ' +
        '<div class="fp-ft">' +
        '<p class="pay-way">选择支付方式</p> ' +
        '<div class="pay-btn"> ' +
        '<a class="btn btn-zhiFuBao">' +
        ' <i class="iconfont icon-zhifubao "></i> ' +
        '<span>支付宝</span> ' +
        '</a> ' +
        '<a class="btn btn-weiXin"> ' +
        '<i class="iconfont icon-wechat "></i>' +
        '<span>微信</span> ' +
        '</a> ' +
        '</div> ' +
        '<div class="pay-time"></div> ' +
        '<div class="pay-msg"></div> ' +
        '</div>',
        info: '<div class="pay-info">请在30分钟内付款，订单将在30分钟后失效</div>',
        disabled: '<div class="pay-disabled">该订单在30分钟内未完成支付，已失效 <br/>请重新下单</div>',
        hasPayed: '<div class="pay-hasPayed">该订单已完成付款，请无重复下单</div>',
        error: '<div class="error"><img src="Content/images/404.png" height="340" width="358"/></div>'
    },
    data: {

        //appId: 'wxd70733f58bdc00f0',    //测试为wxd70733f58bdc00f0
        //calltype: '5',    //测试为5
        // config_url:'http://www.joyjk.cn/',  //测试地址

        appId: 'wx64bd4428594e2e0d',    //正式为wx64bd4428594e2e0d
        calltype: '17',    // 正式为17
        config_url:'http://www.juyuejk.com/',  //正式地址
        orderId: null,
        sourceCode: null,
        serviceStartDate: null,
        payStatus: true,
        details: {}
    },


    //检查订单状态 支付按钮是否置灰
    orderState: function (callFunction) {
        var searchData = {orderId: FriendPay.data.orderId};
        Common.request('uniqueComservice2/base.do?do=httpInterface&module=orderService&method=checkOrderStatusUpgrade&flag=2', searchData, function (data) {
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var payStatus = data.return_msg.result.status;
                FriendPay.data.payStatus = payStatus === '1' ? true : false;

                switch (payStatus) {
                    case  '1':
                        $(".pay-msg").html(FriendPay.temp.info);
                        callFunction && callFunction();
                        return true;
                    case '2':
                        $(".pay-btn .btn").addClass('disabled');
                        $(".pay-time").hide();
                        $(".pay-msg").html(FriendPay.temp.disabled);
                        return false;
                    default:
                        $(".pay-btn .btn").addClass('disabled');
                        $(".pay-time").hide();
                        $(".pay-msg").html(FriendPay.temp.hasPayed);
                        return false;
                }
            } else {
                Common.showFormAlert(true, data.err_msg);
            }
        });
    },

    setData: function () {
        FriendPay.data.orderId = Common.getQueryString('orderId');
        FriendPay.data.sourceCode = Common.getQueryString('sourceCode');
        var searchData = {orderId: FriendPay.data.orderId};
        //订单详情
        Common.request('uniqueComservice2/base.do?do=httpInterface&module=orderService&method=getMcOrder&flag=2', searchData, function (data) {
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var result = data.return_msg.result.userService;
                FriendPay.data.details = result;
                FriendPay.data.serviceStartDate = result.orderTime;
                $(".friendPay").html(Mustache.to_html(FriendPay.temp.serviceDetail, result));

                //判断订单状态 -->是否可继续支付
                FriendPay.orderState(function () {
                    if (FriendPay.data.payStatus) {
                        //可支付截止时间
                        var deadTime = moment(FriendPay.data.serviceStartDate).add(30, 'm');
                        //当前时间超过截止时间
                        if (moment().isAfter(deadTime)) {
                            $(".pay-btn .btn").addClass('disabled');
                            $(".pay-time").hide();
                            $(".pay-msg").html(FriendPay.temp.disabled);
                        } else {
                            $(".pay-msg").html(FriendPay.temp.info);
                            FriendPay.setDeadLine(deadTime);
                        }
                    }
                });
            } else {
                $(".friendPay").html(FriendPay.temp.error);
            }
        });
    },

    //订单时间显示
    setDeadLine: function (deadTime) {
        function getTime() {
            var nowTime = moment();
            var timeDiff = deadTime.diff(nowTime);
            if (timeDiff > 0) {
                var m = Math.floor(timeDiff / 1000 / 60 % 60);
                var s = Math.floor(timeDiff / 1000 % 60);
                $(".pay-time").html('<span>支付剩余时间</span><span class="time">' + m + '分' + s + '秒</span>');
                if (m <= 0 && s <= 0) {
                    $(".pay-btn .btn").addClass("disabled");
                    $(".pay-time").hide();
                    $(".pay-msg").html(FriendPay.temp.disabled);
                    clearInterval(timeShow);
                    FriendPay.data.payStatus = false;
                }
            }
        }

        var timeShow = setInterval(getTime, 1000);
    },

    setAction: function () {
        $(".friendPay").on("click", '.btn-zhiFuBao', function () {
            if (FriendPay.data.payStatus) {
                FriendPay.data.payStatus = false;
                FriendPay.orderState(function () {
                    var searchData = {
                        orderId: FriendPay.data.orderId,
                        payWayCode: 'ZFB',
                        payType: 'wap',
                        returnUrl: window.location.href,
                        extra: {
                            tradeType: 'APP',
                            ip: returnCitySN.cip,
                            showUrl: window.location.href
                        }
                    };
                    Common.request('uniqueComservice2/base.do?do=httpInterface&module=orderService&method=choosePayWayUpgrade&flag=2', searchData, function (data) {
                        if (data && data.return_msg && data.return_msg.business_code === "SUCCESS") {
                            var urlData = data.return_msg.result.jsonParam;
                            var urlString = '';
                            for (var key in urlData) {
                                urlString += key + '=' + encodeURIComponent(urlData[key]) + '&';
                            }
                            var zfb_href = 'https://mapi.alipay.com/gateway.do?' + urlString.slice(0, -1);
                            if (Common.isWeiXin()) {
                                window.location.href = FriendPay.data.config_url + 'jy/html/friendPay/friendPay-ZFB.html?ZFBURL=' + encodeURIComponent(zfb_href);
                            } else {
                                window.location.href = zfb_href;
                            }
                        }
                    })

                })
            }
        });
        $(".friendPay").on("click", '.btn-weiXin', function () {
            if (FriendPay.data.payStatus) {
                FriendPay.data.payStatus = false;
                FriendPay.orderState(function () {
                    var redirect_uri = encodeURIComponent(FriendPay.data.config_url + 'jy/html/friendPay/friendPay.html?orderId=' + FriendPay.data.orderId + '&sourceCode=' + FriendPay.data.sourceCode);
                    //跳转获取code
                    if(Common.isWeiXin()){
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + FriendPay.data.appId + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                    }else{
                        Common.showFormAlert(true, '请使用微信扫一扫完成付款流程');
                    }

                });
            }

        });
    },

    hasCallBack: function () {
        var wxCode = Common.getQueryString('code');
        if (wxCode) {
            Common.WXrequest('wechat/oauth', {code: wxCode}, function (data) {
                if (data.data) {
                    var openId = data.data.openid;
                    var searchData = {
                        orderId: FriendPay.data.orderId,
                        payWayCode: 'WXZF',
                        payType: 'wap',
                        calltype: FriendPay.data.calltype,
                        returnUrl: window.location.href,
                        extra: {
                            openId: openId,
                            tradeType: 'JSAPI',
                            ip: returnCitySN.cip,
                            showUrl: window.location.href
                        }
                    };
                    Common.request('uniqueComservice2/base.do?do=httpInterface&module=orderService&method=choosePayWayUpgrade&flag=2', searchData, function (data) {
                        if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                            var urlData = data.return_msg.result.jsonParam;
                            if (Common.isWeiXin()) {
                                function onBridgeReady() {
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId": urlData.appId,     //公众号名称，由商户传入
                                            "timeStamp": urlData.timeStamp,         //时间戳，自1970年以来的秒数
                                            "nonceStr": urlData.nonceStr, //随机串
                                            "package": urlData.package,
                                            "signType": urlData.signType,         //微信签名方式：
                                            "paySign": urlData.paySign //微信签名
                                        },
                                        function (res) {
                                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                        }
                                    );
                                }

                                if (typeof WeixinJSBridge == "undefined") {
                                    if (document.addEventListener) {
                                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                    } else if (document.attachEvent) {
                                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                    }
                                } else {
                                    onBridgeReady();
                                }
                            } else {
                                Common.showFormAlert(true, '请在微信中打开');
                            }

                        } else {
                            Common.showFormAlert(true, data.err_msg);
                        }
                    })
                } else {
                    $(".friendPay").html(FriendPay.temp.error);
                }
            })
        }
    },
    Init: function () {
        FriendPay.setData();
        FriendPay.setAction();
        FriendPay.hasCallBack();
    }
};
$(function () {
    FriendPay.Init();
});

