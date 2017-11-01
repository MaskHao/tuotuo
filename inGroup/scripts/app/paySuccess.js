/**
 * Created by WillWang on 2017/4/18.
 */
var PaySuccess = {
    pageTitle: function () {
        DoctorInfo.getPagerTitle("支付成功");
    },
    temp: {
        orderShow: '<div><div class="item-content"> <div class="item-inner"> <span class="item-title">商品名称:</span> <span class="goodsName">{{order.orderName}}</span> </div> </div> <div class="item-content"> <div class="item-inner"> <span class="item-title">购买数量:</span> <span class="goodsNum">{{order.orderNum}}</span> </div> </div> <div class="goods-Msg clear"> <div class="gm-Pic" style="background-image: url({{userService.imageUrl}})"></div> <div class="gm-ct"> <p class="gm-ct-company">{{userService.orgName}}</p> <p><span>服务期限&nbsp;</span>:<span class="gm-ct-time"><em>{{userService.billWayNum}}{{userService.billWayName}}</em></span></p> <p><span>服务团队&nbsp;</span>:<span class="gm-ct-org">{{userService.providerName}}</span></p> </div> </div> <div class="item-content goodsPrice"> <div class="item-inner"> <span class="item-title goodsPriceName">实付：</span><span class="goodsPriceNum">￥<em>{{order.orderMoney}}</em>元</span> </div> </div> <div class="goods-Order"> <div class="item-content order"> <div class="item-inner"> <span class="item-title">订单编号:</span> <span class="orderNum">{{order.orderNo}}</span> </div> <div class="item-inner"> <span class="item-title">下单时间:</span> <span class="orderTime">{{order.payTime}}</span> </div> <div class="item-inner"> <span class="item-title">订单状态:</span> <span class="orderStyle">{{order.orderStatusName}}</span> </div> </div> <div class="sub clear">  <a href="javascript:;" class="btn btn-goAddRecord btn-normal btn-lg">添加监测数据</a><a href="javascript:;" class="btn btn-return btn-normal btn-lg">返回登记首页</a> </div> </div> <div class="App"> <div class="AppPic" style="background-image:url(Content/images/app.png) "></div> <p class="AppItro">更多功能，尽在聚悦健康APP</p> </div></div>'
    },
    data:{
        userId:null,
    },
    setData: function () {
        var orderId = Common.getQueryString("orderId");
        var search = {orderId: orderId};
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=orderService&method=getMcOrder&flag=2", search, function (data) {
            if (data && data.return_msg && data.return_msg.business_code) {
                var orderDetails = data.return_msg.result;
                PaySuccess.data.userId= orderDetails.userService.userId;
                $(".paySucess").html(Mustache.to_html(PaySuccess.temp.orderShow, orderDetails));
            }
        })
    },
    setAction: function () {
        $(document).on("click", ".btn-return", function () {
            window.location.href = "login.html?timestamp=" + new Date().getTime();
        });
        $(document).on("click", ".btn-goAddRecord", function () {
            DoctorInfo.goAddRecord(PaySuccess.data.userId.toString());
        })
    },

    init: function () {
        if (DoctorInfo.check()) {
            PaySuccess.setData();
            PaySuccess.setAction();
            PaySuccess.pageTitle();
        }
        else {
            $("body").html("请在手机中打开");
        }
    }
};

$(function () {
    PaySuccess.init();
});
