/**
 * Created by WillWang on 2017/4/19.
 */
var zhifuPay = {
    pageTitle: function () {
        DoctorInfo.getPagerTitle("服务订购");
    },
    orderShow: {
        temp: ' <div class="card" class="{{orderId}}"> <div class="item-content"> <div class="item-inner"> <span class="item-title">姓名:</span> <span class="item-title userName">{{userName}}</span> </div> <div class="item-inner"> <span class="item-title">服务:</span> <span class="item-title serveName">{{serviceName}}</span> </div> <div class="item-inner"> <span class="item-title">金额:</span> <span class="Price"><span class="item-title priceNum">{{orderMoney}}</span>元</span> </div> </div> <div class="zhifuPic"></div> <div class="zhihfuPay-ft">用<span>{{payWayName}}</span>扫一扫付钱</div></div>'


    },
    //是否为支付还是返回状态
    zhifupayStatus:function (){
        $(".page").append(Common.temp.loading);
        var payStatus = Common.getCookie("status");
        if(payStatus == "zhifupay"){
            zhifuPay.orderDetls();
            zhifuPay.orderStatus();
        }else if (payStatus == "login"){
            window.location.href = "login.html";
        }

    },
    //渲染页面
    orderDetls: function () {
        $(".pageLoading").remove();
        var payWayName = Common.getQueryString("payWayName");
        if (payWayName.indexOf("ZFB") > -1) {
            payWayName = "支付宝";
        } else {
            payWayName = "微信";
        }
        var detals = {
            orderId: Common.getQueryString("orderId"),
            userName: Common.getCookie("userName"),
            serviceName: decodeURI(Common.getQueryString("serviceName")),
            orderMoney: Common.getQueryString("orderMoney"),
            payWayName: payWayName,
            payUrl: Common.getQueryString("payUrl"),
        };
        $(".content").html(Mustache.to_html(zhifuPay.orderShow.temp, detals)).find(".zhifuPic").qrcode({text: detals.payUrl});
    },
    //循环查询订单
    orderStatus: function () {
        var order = Common.getQueryString("orderId");
        var search = {orderId: order};
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=orderService&method=checkOrderStatusUpgrade&flag=2", search, function (data) {
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var status = data.return_msg.result.status;
                //待支付&&支付成功交易中
                if (status == 1 || status == 3) {

                    setTimeout(zhifuPay.orderStatus, 3000);
                }
                //支付过期
                else if (status == 2) {
                    Common.showFormAlert(true, "订单过期，请重新支付");
                    window.location.href = "pay.html";
                }
                else if (status == 5) {
                    Common.addCookie("status", "login");
                    window.location.replace ("paySuccess.html?orderId=" + order);
                    Common.showFormAlert(true, "订单完成");


                }
            }
        })
    },
    init: function () {
        if (DoctorInfo.check()) {
            zhifuPay.pageTitle();
            zhifuPay.zhifupayStatus();
        }
        else {
            $("body").html("请在手机中打开");
        }
    }
};
$(function () {
    zhifuPay.init();
});