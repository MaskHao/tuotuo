/**
 * Created by Eden on 2017/4/17.
 */
var Pay = {
    pageTitle: function () {
        var pageName = Common.getQueryString("show");
        if (pageName == "serveShow") {
            Pay.data.isPay = false;
            DoctorInfo.getPagerTitle("服务详情");
        } else {
            Pay.data.isPay = true;
            DoctorInfo.getPagerTitle("服务订购");
        }
    },
    temp: {
        baseService: '{{#list}}<li><span class="bc-name">{{productName}}</span><span class="bc-num "><em>{{billWayNum}}</em>{{billWayName}}</span></li>{{/list}}',
        incrementService: '{{#list}}<label>' +
        '<div class="label-con">' +
        '<span class="productName">{{productName}}</span>' +
        '{{#showCheck}}<div data-val="{{upDetId}}" class="selectCheck btnCheckIncrementService"><i class="iconfont {{^check}}icon-yuanquan1{{/check}}{{#check}}icon-gouxuan2{{/check}} btnICheckIncrementService"></i></div>{{/showCheck}}' +
        '<span class="billWay"><em>{{billWayNum}}</em>{{billWayName}}</span>' +
        '</div>' +

        '</label>{{/list}}',
        payList: '{{#list}}<div class="sub"><a data-payWayCode="{{payWayCode}}" class="sub-filing btn {{color}} btn-lg btnPay" href="javascript:void(0)">{{name}}</a></div>{{/list}}',
        cashPay: '<div class="poup divCashOrPosPay"><div class="poup-cont poup-pay tran"><p class="p-hd">温馨提示</p><p class="p-ct"><span class="userName">{{doctorName}}</span>，你将为<span class="payName">{{userName}}</span>用户申请{{payWay}}支付，金额为 <span class="priceNum"> <em>{{money}}</em>元</span>。</p><textarea class="poup-remark" placeholder="备注..."></textarea><div class="sub"><a class="btn btn-color1 btn-next btnCashOrPosSubmit" href="javascript:void(0)">确定</a><a class="btn btn-cancel btnCashOrPosSubmit" href="javascript:void(0)">取消</a></div></div></div>',
        needList: '{{#list}}<div class="item-content"><div class="item-inner"><span class="item-title">{{#red}}<em class="mustInput">*</em>{{/red}}{{msgItemName}}</span><span class="item-title">{{msgItemDataTypeName}}</span><span class="item-title mastIn-input"><input data-isrequired="{{isRequired}}" data-msgitemid="{{msgItemId}}" data-msgitemdatatype="{{msgItemDataType}}" type="{{inputType}}" class="txtNeedRequire">{{unitName}}</span></div></div>{{/list}}'
    },
    data: {
        isPay: false,
        result: {},
        baseServiceList: [],
        incrementServiceList: [],
        money: 0,
        start: null,
        end: null,
        needList: [],
        loadingNeed: true,
        payWayCode: "",
        needMsgData: [],
        info: {}
    },

    payNeed: function () {
        if (!Pay.data.loadingNeed && Pay.data.needList.length > 0) {
            $(".divPayContent").hide();
            $(".divNeedContent").show();

            $(".btnNeedNext").click(function () {
                var list = _.map($(".txtNeedRequire"), function (s) {
                    var item = $(s);
                    return {
                        isRequired: item.attr("data-isrequired"),
                        msgItemId: item.attr("data-msgitemid"),
                        msgItemDataType: item.attr("data-msgitemdatatype"),
                        val: _.trim(item.val())
                    };
                });
                var pass = !_.some(list, function (s) {
                    return s.val == "" && s.isRequired == "1";
                });
                if (pass) {
                    Pay.data.needMsgData = _.map(list, function (s) {
                        return {msgItemId: s.msgItemId, msgValue: s.val};
                    });
                    Pay.pay();
                } else {
                    Common.showFormAlert(true, "请填写完整")
                }
            })
        }
        else
            Pay.pay();
    },


    getOrderBusinessDets: function () {
        var orderBusinessDets = [];
        _.forEach(Pay.data.baseServiceList, function (s) {
            orderBusinessDets.push({upDetId: s.upDetId, status: 1});
        });
        _.forEach(Pay.data.incrementServiceList, function (s) {
            if (s.check) orderBusinessDets.push({upDetId: s.upDetId, status: 1});
        });
        return orderBusinessDets;
    },
    pay: function () {
        Common.addCookie("status", "zhifupay");
        //loading
        $(".page").append(Common.temp.loading);
        if (Pay.data.payWayCode == "")
            Pay.payComfirm();
        else if (Pay.data.payWayCode == "XJ")
            Pay.PayByCash();
        else if(Pay.data.payWayCode == "POS"){
            Pay.PayByPos();
        }
        else
            Pay.paySomeWay();
    },

    //第三方支付
    paySomeWay: function () {
        var obj = {
            upId: Pay.data.info.upId,
            userId: Pay.data.info.userId,
            operatorUserId: Pay.data.info.doctorUserId,
            orderTypeCode: "SERVICE",
            serviceStartDate: Common.formatDate(new Date(Pay.data.start), "yyyy-MM-dd"),
            serviceEndDate: Common.formatDate(new Date(Pay.data.end), "yyyy-MM-dd"),
            sourceCode: Pay.data.info.sourceCode,
            orderBusinessDets: JSON.stringify(Pay.getOrderBusinessDets()),
            needMsgData: JSON.stringify(Pay.data.needMsgData),
            payWayCode: Pay.data.payWayCode,
            calltype: "18"
        };
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=orderService&method=placeOrderUpgrade&flag=2", obj, function (data) {
            $(".pageLoading").remove();
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var result = data.return_msg.result;
                window.location.href = "zhifuPay.html?orderId=" + result.orderId + "&payWayName=" + result.payResult.jsonParam + "&payUrl=" + result.payResult.payUrl + "&serviceName=" + encodeURI(encodeURI(result.orderName)) + "&orderMoney=" + result.orderMoney;
            } else {
                if (data.err_msg)
                    Common.showFormAlert(true, data.err_msg);
                else
                    Common.showFormAlert(true, data.return_msg.business_message);
            }
        });
    },

    CashOrPos: function (payWay, payCode){
        $(".pageLoading").hide();
        $("body").append(Mustache.to_html(Pay.temp.cashPay, {
            doctorName: Pay.data.info.doctorUserName,
            userName: Pay.data.info.userName,
            money: Pay.data.money,
            payWay: payWay
        }));
        var textarea = $(".poup-remark");
        autosize(textarea);
        $(".btnCashOrPosSubmit").unbind("click").click(function () {
            $(".divCashOrPosPay").remove();
        });
        $(".btnCashOrPosSubmit").unbind("click").click(function () {
            $(".btnCashOrPosSubmit").unbind("click");
            $(".pageLoading").show();
            var obj = {
                upId: Pay.data.info.upId,
                userId: Pay.data.info.userId,
                operatorUserId: Pay.data.info.doctorUserId,
                orderTypeCode: "SERVICE",
                serviceStartDate: Common.formatDate(new Date(Pay.data.start), "yyyy-MM-dd"),
                serviceEndDate: Common.formatDate(new Date(Pay.data.end), "yyyy-MM-dd"),
                sourceCode: Pay.data.info.sourceCode,
                orderBusinessDets: JSON.stringify(Pay.getOrderBusinessDets()),
                needMsgData: JSON.stringify(Pay.data.needMsgData),
                payWayCode: payCode
            };
            //下单
            Common.request("uniqueComservice2/base.do?do=httpInterface&module=orderService&method=placeOrderUpgrade&flag=2", obj, function (data) {
                if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                    var poup_rmark = _.trim($(".poup-remark").val());
                    var orderIdNumber = data.return_msg.result.orderId;
                    var upRmark = {
                        registrantId: Pay.data.info.doctorUserId,
                        orderId: orderIdNumber.toString(),
                        mark: poup_rmark
                    };
                    //更新订单备注
                    Common.request("uniqueComservice2/base.do?do=httpInterface&module=FastInGroupService&method=updateMcOrder&flag=2", upRmark, function () {
                        $(".pageLoading").remove();
                        if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                            window.location.href = "paySuccess.html?orderId=" + orderIdNumber;
                        }
                    })
                }
                else {
                    $(".pageLoading").remove();
                    if (data.err_msg)

                        Common.showFormAlert(true, data.err_msg);
                    else
                        Common.showFormAlert(true, data.return_msg.business_message);
                }
                $(".divCashOrPosPay").remove();
            });
        })
    },

    //刷卡
    PayByPos: function() {
        Pay.CashOrPos('刷卡', 'POS');
    },

    //现金支付
    PayByCash: function () {
        Pay.CashOrPos('现金', Pay.data.payWayCode);
    },
    //免费
    payComfirm: function () {
        var obj = {
            upId: Pay.data.info.upId,
            userId: Pay.data.info.userId,
            operatorUserId: Pay.data.info.doctorUserId,
            orderTypeCode: "SERVICE",
            serviceStartDate: Common.formatDate(new Date(Pay.data.start), "yyyy-MM-dd"),
            serviceEndDate: Common.formatDate(new Date(Pay.data.end), "yyyy-MM-dd"),
            sourceCode: Pay.data.info.sourceCode,
            orderBusinessDets: JSON.stringify(Pay.getOrderBusinessDets()),
            needMsgData: JSON.stringify(Pay.data.needMsgData),

        };
        //服务购买下单
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=orderService&method=placeOrderUpgrade&flag=2", obj, function (data) {
            $(".pageLoading").remove();
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                window.location.href = "paySuccess.html?orderId=" + data.return_msg.result.orderId;
            }
            else {
                if (data.err_msg)
                    Common.showFormAlert(true, data.err_msg);
                else
                    Common.showFormAlert(true, data.return_msg.business_message);
            }
        });
    },
    setData: function () {
        var upId = Common.getQueryString("upId"), productId = Common.getQueryString("productId"),
            userId = Common.getCookie("userId"), userName = Common.getCookie("userName"),
            idCard = Common.getCookie("idCard");
        var doctorUserId = DoctorInfo.getDoctorUserId(), doctorUserName = DoctorInfo.getDoctorUserName(),
            sourceCode = DoctorInfo.getSourceCode();
        // if (!upId || !productId || !userId || !userName || !idCard) {
        //     window.location.href = "login.html";
        // }
        // else {
        Pay.data.info = {
            upId: upId,
            productId: productId,
            userId: userId,
            userName: userName,
            idCard: idCard,
            doctorUserId: doctorUserId,
            doctorUserName: doctorUserName,
            sourceCode: sourceCode
        };
        var search = {upId: upId, userId: userId, calltype: "18", orgGroupCode: "ALL"};
        //获取必填项
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=orderService&method=getNeedMsgs&flag=2", {productIds: [productId]}, function (data) {
            Pay.data.loadingNeed = false;
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var result = data.return_msg.result;
                if (result.length > 0) {
                    Pay.data.needList = _.map(result, function (s) {
                        var msgItemDataTypeName = "";
                        var inputType = "";
                        switch (s.msgItemDataType) {
                            case 1:
                                msgItemDataTypeName = "数字";
                                inputType = "number";
                                break;
                            case  2:
                                msgItemDataTypeName = "数字";
                                inputType = "number";
                                break;
                            case 3:
                                msgItemDataTypeName = "时间";
                                inputType = "text";
                                break;
                            case 4:
                                msgItemDataTypeName = "文字";
                                inputType = "text";
                                break;
                        }
                        return {
                            red: s.isRequired == 1,
                            isRequired: s.isRequired,
                            msgItemId: s.msgItemId,
                            msgItemName: s.msgItemName,
                            unitName: s.unitName,
                            msgItemDataType: s.msgItemDataType,
                            msgItemDataTypeName: msgItemDataTypeName,
                            inputType: inputType
                        }
                    });
                    $(".divNeedList").append(Mustache.to_html(Pay.temp.needList, {list: Pay.data.needList}));
                    _.forEach($(".txtNeedRequire"), function (s) {
                        if ($(s).attr("data-msgItemDataType") === "3") {
                            $(s).mobiscroll().date({
                                theme: 'mobiscroll', display: 'bottom', lang: 'zh', showLabel: true, rows: 4
                            });
                        }
                    });
                }
            }
        });
        //订单详情
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=orderService&method=prePlaceOrder&flag=2", search, function (data) {
                if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                    Pay.data.result = data.return_msg.result;
                    Pay.data.baseServiceList = _.cloneDeep(data.return_msg.result.data.isMustYes);
                    _.forEach(Pay.data.baseServiceList, function (i) {
                        i.billWayNum = i.billWayNum != 0 ? i.billWayNum : '';
                    });
                    Pay.data.incrementServiceList = _.cloneDeep(data.return_msg.result.data.isMustNo);
                    $(".divBaseService").html(Mustache.to_html(Pay.temp.baseService, {list: Pay.data.baseServiceList}));
                    _.map(Pay.data.incrementServiceList, function (s) {
                        s.check = false;
                        s.upDetId = s.upDetId.toString();
                    });

                    //判断是否为详情页面，详情页面则自选服务只能查看不能点击
                    var template = Pay.data.result.data.isMustNo;
                    var showUserSelectService = template.length > 0 ? true : false;

                    if (showUserSelectService) {
                        var showIcon = Pay.data.isPay;
                        _.forEach(Pay.data.result.data.isMustNo, function (i) {
                            i.showCheck = showIcon;
                            i.billWayNum = i.billWayNum != 0 ? i.billWayNum : '';
                        });
                        $(".divIncrementService").html(Mustache.to_html(Pay.temp.incrementService, {list: Pay.data.result.data.isMustNo})).find(".btnCheckIncrementService").click(function () {
                            var upDetId = $(this).attr("data-val"),
                                item = _.find(Pay.data.incrementServiceList, {'upDetId': upDetId});
                            if (item) {
                                if (item.check) {
                                    Pay.data.money = Common.subNum(Pay.data.money, item.salePrice);
                                    $(this).find(".btnICheckIncrementService").removeClass("icon-gouxuan2").addClass("icon-yuanquan1");
                                }
                                else {
                                    Pay.data.money = Common.addNum(Pay.data.money, item.salePrice);
                                    $(this).find(".btnICheckIncrementService").removeClass("icon-yuanquan1").addClass("icon-gouxuan2");
                                }
                                $(".divEmMoney").html(Pay.data.money);
                                if (Pay.data.money == 0) {
                                    $(".divConfirm").show();
                                    $(".divPay").hide();
                                } else {
                                    $(".divConfirm").hide();
                                    $(".divPay").show();
                                }
                                _.map(Pay.data.incrementServiceList, function (s) {
                                    s.upDetId == upDetId && (s.check = !item.check);
                                })
                            }
                        });
                    } else {
                        $(".userSelectService").hide();
                    }

                    _.forEach(Pay.data.baseServiceList, function (s) {
                        Pay.data.money = Common.addNum(Pay.data.money, s.salePrice);
                    });
                    $(".divEmMoney").html(Pay.data.money);
                    //判断支付界面还是详情界面
                    if (Pay.data.isPay) {
                        if (Pay.data.money == 0) {
                            $(".divConfirm").show();
                            $(".divPay").hide();
                        } else {
                            $(".divConfirm").hide();
                            $(".divPay").show();
                        }
                    } else {
                        $(".selectService").show();
                    }

                    var type = Common.getTypebyUnit(Pay.data.result.data.comboBillWayName);
                    Pay.data.start = new Date().getTime();
                    Pay.data.end = parseInt(moment(Pay.data.start).add(Pay.data.result.data.comboBillWayNum, type).add(-1, 'day').format('x'));
                    $(".txtStartTime").text(Common.formatDate(new Date(Pay.data.start), 'yyyy/MM/dd'));
                    $(".txtEndTime").text(Common.formatDate(new Date(Pay.data.end), 'yyyy/MM/dd'));


                    //时间插件
                    $('.txtStartTime').mobiscroll().date({
                        theme: 'mobiscroll',
                        display: 'bottom',
                        lang: 'zh',
                        showLabel: true,
                        rows: 4,
                        endYear: (new Date()).getFullYear() + 20,
                        onClose: function (event, inst) {
                            if (inst == "set") {
                                Pay.data.start = new Date(event).getTime();
                                Pay.data.end = parseInt(moment(Pay.data.start).add(Pay.data.result.data.comboBillWayNum, type).add(-1, 'day').format('x'));
                                $(".txtStartTime").text(Common.formatDate(new Date(Pay.data.start), 'yyyy/MM/dd'));
                                $(".txtEndTime").text(moment(Pay.data.end).format('YYYY/MM/DD'));
                            }
                        }
                    });

                    var payList = _.map(Pay.data.result.payWayList, function (s) {
                        var color = "btn-color2";
                        if (s.payWayName.indexOf('支付宝') > -1)
                            color = "btn-color1";
                        else if (s.payWayName.indexOf('微信') > -1)
                            color = "btn-color3";
                        return {payWayCode: s.payWayCode, name: s.payWayName, color: color};
                    });
                    //增添POS
                    payList.push({payWayCode:'POS',name: '刷卡', color:'btn-color4' });
                    $(".divPay").append(Mustache.to_html(Pay.temp.payList, {list: payList}));

                    $(".btnPay").click(function () {
                        var payWayCode = $(this).attr("data-payWayCode");
                        Pay.data.payWayCode = payWayCode;
                        Pay.payNeed();
                    });
                    $(".btnPayByCash").click(function () {
                        var payWayCode = $(this).attr("data-payWayCode");
                        Pay.data.payWayCode = payWayCode;
                        Pay.payNeed();
                    });

                    $(".btnPayComfirm").click(function () {
                        Pay.payNeed();
                    })

                    $(".selectService").click(function () {
                        window.location.href = "login.html?upId=" + upId;
                    })
                }
            }
        );
        //个人信息
        if (Pay.data.isPay) {
            $(".spanIdCard").html(idCard);
            $(".spanUserName").html(userName);
        } else {
            $(".pageType").hide();
        }

        // }
    },
    init: function () {
        if (DoctorInfo.check()) {
            Pay.pageTitle();
            Pay.setData();
        }
        else {
            $("body").html("请在手机中打开");
        }
    }
};

$(function () {
    Pay.init();
});
