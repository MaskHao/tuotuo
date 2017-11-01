/**
 * Created by Eden on 2017/4/15.
 */

var Login = {
    pageTitle: function () {
        DoctorInfo.getPagerTitle("快速入组");
    },
    temp: {
        li: '{{#list}}<li data-val="{{id}}">{{text}}</li>{{/list}}',
        disease: '{{#list}}<label><div class="number">{{orderIndex}}</div><div class="label-con"><span>{{text}}</span><em data-val="{{illId}}" class="iconfont icon-iconshanchu btnDelDisease"></em></div><div data-val="{{illId}}" class="selectCheck btnCheckDisease"><i class="iconfont {{#confirmed}}icon-gouxuan2{{/confirmed}}{{^confirmed}}icon-yuanquan1{{/confirmed}} btnICheckDisease"></i><span class="selectCheck-con">确诊</span></div></label>{{/list}}',
        success: '<div class="poup divPoup"><div class="poup-cont poup-filing tran"><p class="p-hd">温馨提示</p><p class="p-ct">建档成功，<span class="spanSecond">{{second}}</span>秒后即将跳转至订购界面</p><div class="sub"><a class="btn btn-color1 btn-next" href="javascript:void(0)">继续登记</a></div></div></div>',
        registered:'<div class="poup divPoup"><div class="poup-cont poup-filing tran"><p class="p-hd">温馨提示</p><p class="p-ct">您已注册过，<span class="spanSecond">{{second}}</span>秒后即将跳转至订购界面</p><div class="sub"><a class="btn btn-color1 btn-next" href="javascript:void(0)">继续登记</a></div></div></div>',
        selectedService:'<div class="serveLi-cont"> <p class="serveTypeName">{{productName}}</p> <div class="serceClass clear"> <div class="serceClassName">{{classifyName}}&nbsp;<span class="name">{{productTypeName}}</span> </div> <div class="serveClassPrice"> <span class="price">{{billWayNum}}{{billWayName}}<em class="priceNumber">{{salePrice}}</em>元</span>&nbsp;/&nbsp;<span class="oldPriceNumber">剩余{{productNum}}</span> </div> </div> <p class="provider">{{orgName}}&nbsp;/&nbsp;{{provider}}</p></div>',
    },
    data: {
        disease: [],
        queryIllNamePost: null,
        sendTimeHtml: 0,
        sendTime: null,
        // second: 3,
        upId:null,
        productId:null
    },
    checkItem: function (obj) {
        var pass = true, role = $(obj).attr("data-role"), val = _.trim($(obj).val());
        if (role.indexOf("require") > -1) {
            !val && (pass = !1);
        }
        if (role.indexOf("idcard") > -1) {
            val !='' ? (!Common.checkIdcard(val) && (pass = !1)) : '';
        }
        if (role.indexOf("mobile") > -1) {
            !Common.checkMobile(val) && (pass = !1);
        }
        if (role.indexOf("blocId") > -1) {
            !Common.checkMobile(val) && (pass = !1);
        }
        if (role.indexOf("blocRank") > -1) {
            !Common.checkMobile(val) && (pass = !1);
        }
        //排除身份证检查
        pass ? $(obj).parents(".item-content").removeClass("borderError") : $(obj).parents(".item-content").addClass("borderError");

    },
    jump: function () {
        window.location.href = "pay.html?upId=" + Login.data.upId + "&productId=" + Login.data.productId;
    },


    //判断是否为已购买服务用户 ,已购买:提示  未购买:跳转购买页面
    hasService: function (userId,upId) {
        Common.request("/uniqueComservice2/base.do?do=httpInterface&module=orderService&method=prePlaceOrder&flag=2 ", {userId:userId.toString(),upId:upId, calltype: "18" ,orgGroupCode:"ALL"}, function (data) {
            $(".pageLoading").remove();
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var isBuy = data.return_msg.result.service_status;
                //是否购买
                switch (parseInt(isBuy)){
                    case 0:
                    case 3:
                        Login.jump();
                        break;
                    case 1:
                        Common.showFormAlert(true, "您已注册，且已购买过服务!");
                        break;
                    case 2:
                        Common.showFormAlert(true, "您已注册，当前服务不能订购，请联系客服!");
                        break;
                    default:
                        return;
                }
            }else{
                Common.showFormAlert(true, data.err_msg);
            }
        })
    },

    hasSelectedProduct :function (userId, info){
        if(Login.data.upId){
            Login.hasService(userId,Login.data.upId);
        }else {
            $(".pageLoading").remove();
            Common.showFormAlert(true,info);
        }
    },

    getObj: function () {
        var obj = {};
        var txtField = $(".txtField");
        _.forEach(txtField, function (s) {
            obj[$(s).attr("data-field")] = $(s).val();
        });
        if (Login.data.disease && Login.data.disease.length > 0) {
            obj.illDisease = _.map(Login.data.disease, function (s) {
                return {illId: s.illId, orderIndex: s.orderIndex, confirmed: s.confirmed ? "1" : "0", text: s.text};
            });
        } else {
            obj.illDisease = [];
        }
        obj.operatorId = DoctorInfo.getDoctorUserId();
        obj.registerType = 6;
        return obj;
    },

    submit: function () {
        var obj = Login.getObj(), pass = !0;

        _.forEach($(".txtField"), function (s) {
            if ($(s).attr("data-role")) {
                Login.checkItem(s);
            }
        });
        if (!obj.userName || !obj.mobile || !obj.randomCode || !Common.checkMobile(obj.mobile)|| (obj.idCard && !Common.checkIdcard(obj.idCard))) {
            Common.showFormAlert(!0, "填写有误，请检查");
        }
        //判断是否为集团用户
        else if (obj.userType == 2 && obj.blocId == "") {
            Common.showFormAlert(!0, "所属集团不能为空！");
        }else if(obj.userType == 2 && obj.blocRank == ""){
            Common.showFormAlert(!0, "客户类型不能为空！");
        }
        else {
            obj.userType == 1 ? obj.blocId = '0':obj.blocId;
            obj.blocRank = obj.blocRank == "" ?  0: parseInt(obj.blocRank);
            $(".userType").removeClass("borderError");
            Common.addCookie("userName", obj.userName, 2);
            Common.addCookie("mobile", obj.mobile, 2);
            Common.addCookie("idCard", obj.idCard, 2);
            $(".login").append(Common.temp.loading);
            Common.request("uniqueComservice2/base.do?do=httpInterface&module=FastInGroupService&method=addArchive&flag=2", obj, function (data) {

                //注册成功
                if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                    var result = data.return_msg.result;
                    Common.addCookie("userId", result.userId, 2);
                    Login.hasSelectedProduct(result.userId, "注册成功!");
                }
                //注册失败
                else {
                    var  result = data.return_msg.result;
                    Common.addCookie("userId", result.userId, 2);
                    //失败原因为手机号码已被注册 或 身份证已被注册
                    if(result.status == -2 || result.status == -1){
                        Login.hasSelectedProduct(result.userId,result.statusInfo );
                    }
                    else {
                        $(".pageLoading").remove();
                        Common.showFormAlert(true, result.statusInfo);
                    }
                }
            });
        }
    },


    setDrp: function (data, name) {
        var drp = $(".drp" + name), ul = $(".ul" + name), txt = $(".txt" + name), hd = $(".hd" + name);
        if(hd.val()){
            var  selected = _.find(data,{id:parseInt(hd.val())});
            txt.html(selected.text);
        }
        drp.click(function () {
            if (name == "userGroup") {
                $(this).parent().removeClass("borderError");
            }
            $(this).find(".iconfont").addClass("selectSlideDown");
            $(this).next(".drpHidden").slideDown("fast");
            Common.showMask(!0, function () {
                drp.find(".iconfont").removeClass("selectSlideDown");
                drp.next(".drpHidden").slideUp("fast");
            });
        });
        ul.html(Mustache.to_html(Login.temp.li, {list: data})).find("li").click(function () {
            var li = $(this);
            li.closest(".item-content").find(".iconfont").removeClass("selectSlideDown");
            txt.html(li.html());
            var value = li.attr("data-val");
            hd.val(value);
            drp.next(".drpHidden").slideUp("fast");
            Common.showMask(!1);
            if(name=="SourceOrgId"){
                Storage.Set('sourceOrgId',value, true);
            }
        });
    },
    setData: function () {
        Common.delCookie("userId");
        Common.delCookie("userName");
        Common.delCookie("mobile");
        Common.delCookie("idCard");
        //用户来源
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=FastInGroupService&method=getUserSourceTypeList&flag=2", {}, function (data) {
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var sourceOrgIdList = data.return_msg.result;
                _.map(sourceOrgIdList, function (s) {
                    s.id = s.sourceId;
                    s.text = s.sourceName;
                });
                Login.setDrp(sourceOrgIdList, "SourceOrgId");
                if (sourceOrgIdList.length > 0) {
                    var  localSourceOrgId =parseInt( Storage.Get("sourceOrgId",true));
                    if(localSourceOrgId){
                        $(".hdSourceOrgId").val(localSourceOrgId);
                        var  SourceOrg = _.find(sourceOrgIdList, function(i) {
                            return i.id == localSourceOrgId
                        })
                        $(".txtSourceOrgId").html(SourceOrg.text)
                    }else{
                        $(".hdSourceOrgId").val(sourceOrgIdList[0].id);
                        $(".txtSourceOrgId").html(sourceOrgIdList[0].text)
                    }
                }
            }
        });
        //获取卡类型
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=FastInGroupService&method=getHealthCardTypeList&flag=2", {}, function (data) {
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var cardTypeList = data.return_msg.result;
                _.map(cardTypeList, function (s) {
                    s.id = s.cardId;
                    s.text = s.cardName;
                });
                Login.setDrp(cardTypeList, "CardType");
            }
        });


        //认证机构
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=FastInGroupService&method=getOrgForSelect&flag=2", {hasJKDACode: "Y"}, function (data) {
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var orgList = data.return_msg.result;
                _.map(orgList, function (s) {
                    s.id = s.orgId;
                    s.text = s.orgName;
                });
                Login.setDrp(orgList, "Org");
            }
        });


        //认证方式 改成写死转台
        var authTypeList = [{"authTypeName":"未认证","authTypeId":1},{"authTypeName":"身份证认证","authTypeId":2},{"authTypeName":"医保卡认证","authTypeId":3}];
        _.map(authTypeList, function (s) {
            s.id = s.authTypeId;
            s.text = s.authTypeName;
        });
        Login.setDrp(authTypeList, "AuthType");
        if (!$(".hdAuthType").val() && authTypeList.length > 0 ) {
            $(".hdAuthType").val(authTypeList[0].id);
            $(".txtAuthType").html(authTypeList[0].text);
        }


        //所属集团
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=orgService&method=getBlocList&flag=2", {}, function (data) {
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var userTypeList = data.return_msg.result;
                _.map(userTypeList, function (s) {
                    s.id = s.blocId;
                    s.text = s.blocName;
                });
                Login.setDrp(userTypeList, "UserGroup");
            }
        });

        //客户等级
        var blocRankList = [{"rankName":"普通","rankId":1},{"rankName":"中层","rankId":2},{"rankName":"VIP","rankId":3}];
        _.map(blocRankList, function (s) {
            s.id = s.rankId;
            s.text = s.rankName;
        });
        Login.setDrp(blocRankList, "UserRank");



        //是否有已选的套餐
        var upId = Common.getQueryString("upId");
        if(upId){
            Login.data.upId = upId;

            Common.request("uniqueComservice2/base.do?do=httpInterface&module=userServicePoService&method=getServiceDetailByUpId&flag=2", {upId:upId, calltype: "18" ,orgGroupCode:"ALL"}, function (data) {
                if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                    Login.data.productId =  data.return_msg.result.productId;
                    var  selectedService = data.return_msg.result;
                    $(".selectedService").show().html(Mustache.to_html(Login.temp.selectedService,selectedService));
                    $(".hdUpId").val(selectedService.upId);
                }
            })
        }else {
            Login.data.upId = null;
        }
    },
    setDisease: function () {
        _.map(Login.data.disease, function (s, i) {
            s.orderIndex = i + 1;
        });
        $(".divDisease").html(Mustache.to_html(Login.temp.disease, {list: Login.data.disease}));
        $(".divDisease").find(".btnDelDisease").click(function () {
            var illId = $(this).attr("data-val");
            Login.data.disease = _.filter(Login.data.disease, function (s) {
                return s.illId != illId;
            });
            Login.setDisease();
        });
        $(".divDisease").find(".btnCheckDisease").click(function () {
            var illId = $(this).attr("data-val"), item = _.find(Login.data.disease, {'illId': illId});

            if (item) {
                if (item.confirmed) {
                    $(this).find(".btnICheckDisease").removeClass("icon-gouxuan2").addClass("icon-yuanquan1");
                }
                else {
                    $(this).find(".btnICheckDisease").removeClass("icon-yuanquan1").addClass("icon-gouxuan2");
                }
                _.map(Login.data.disease, function (s) {
                    s.illId == illId && (s.confirmed = !item.confirmed);
                })
            }
        });

    },
    setAction: function () {
        //疾病实时搜索功能
        $(".txtIll").on("input propertychange",function () {
            var val = _.trim($(this).val());
            if (Login.data.queryIllNamePost && Login.data.queryIllNamePost.readyState == 1) {
                Login.data.queryIllNamePost.abort();
            }
            if (val) {
                var req = {describe: val};
                //获取疾病诊断列表
                Login.data.queryIllNamePost = Common.request("uniqueComservice2/base.do?do=httpInterface&module=FastInGroupService&method=getIllInfoList&flag=2", req, function (data) {
                    if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                        var list = data.return_msg.result;
                        _.map(list, function (s) {
                            s.id = s.illId;
                            s.text = s.illName;
                        });
                        $(".ulIll").html(Mustache.to_html(Login.temp.li, {list: list})).find("li").click(function () {
                            var illId = $(this).attr("data-val"), text = $(this).html();
                            $(".txtIll").val("");
                            if (!_.some(Login.data.disease, {illId: illId})) {
                                Login.data.disease.push({illId: illId, text: text, confirmed: false});
                                Login.setDisease();
                            }
                            $(".drpIll").slideUp("fast");
                            Common.showMask(!1);
                        });
                        $(".drpIll").slideDown("fast");
                        Common.showMask(!0, function () {
                            $(".drpIll").slideUp("fast");
                            $(".txtIll").val("");
                        });
                    }
                });
            }
            else {
                $(".drpIll").slideUp("fast");
                Common.showMask(!1);
            }
        });

        //输入框
        var txtField = $(".txtField");
        _.forEach(txtField, function (s) {
            if ($(s).attr("data-role")) {
                $(s).blur(function () {
                    Login.checkItem(this);
                })
            }
        });

        //用户标识
        $(".lblUserType").click(function () {
            $(this).find(".iconfont").addClass("icon-gouxuan2").removeClass("icon-yuanquan1");
            $(this).siblings(".lblUserType").find(".iconfont").addClass("icon-yuanquan1").removeClass("icon-gouxuan2");
            var val = $(this).attr("data-val");
            $(".hdUserType").val(val);
            if (val == 1) {
                $(".hdUserGroup").val("");
                $(".hdUserRank").val("");
                $(".txtUserGroup").html("");
                $(".txtUserRank").html("");
                $(".drpUserGroup").parent().hide();
                $(".drpUserRank").parent().hide();
            }
            else {
                $(".drpUserGroup").parent().show();
                $(".drpUserRank").parent().show();
            }
        });

        //查看更多
        $(".btnMore").click(function () {
            if( $(".divMore").is(":visible")){
                $(".divMore").slideUp();
                $(this).find(".iconfont").removeClass("selectSlideDown");
            }else {
                $(".divMore").slideDown();
                $(this).find(".iconfont").addClass("selectSlideDown");
            }
        });

        //提交
        $(".btnSubmit").click(function () {
             var  obj = Login.getObj();
            Login.submit();
        });

        //验证码发送
        $(".btnSend").click(function () {
            if (Login.data.sendTimeHtml == 0) {
                var mobile = _.trim($(".txtMobile").val());
                if (mobile && Common.checkMobile(mobile)) {
                    Common.request("uniqueComservice2/base.do?do=httpInterface&module=user2Service&method=getSendCode&flag=2", {mobile: mobile}, function (data) {
                    });
                    var that = this;
                    Login.data.sendTimeHtml = 61;
                    Login.data.sendTime = setInterval(function () {
                        Login.data.sendTimeHtml--;
                        $(that).html(Login.data.sendTimeHtml + "s");
                        if (Login.data.sendTimeHtml == 0 || Login.data.sendTimeHtml < 0) {
                            Login.data.sendTimeHtml = 0;
                            $(that).html("发送");
                            Login.data.sendTime && window.clearInterval(Login.data.sendTime)
                        }
                    }, 1000)
                }
            }
            return false;
        });

        //选择套餐进行跳转
        $(".serveSelect").click(function(){
            var obj = Login.getObj();
            Storage.Set("loginData",obj,true);
           window.location.href = 'serviceOrder.html';
        })
    },
    localStorageInput: function () {
        var loginData = Storage.Get("loginData",true);
        if(loginData){
            Login.setObj(loginData);
        }
        Storage.Del("loginData");
    },

    setObj: function (loginData) {
        var txtField = $(".txtField");
        _.forEach(txtField, function (s) {
            $(s).val(loginData[$(s).attr("data-field")]);
        });
        Login.data.disease = _.forEach(loginData.illDisease,function(i){ i.confirmed= (i.confirmed==true? true:false);});
        if(Login.data.disease && Login.data.disease.length>0){
            Login.setDisease()
        }
        var  userType = parseInt(loginData.userType);
        if(userType == 2){
            $(".lblUserType").find(".iconfont").removeClass("icon-gouxuan2").addClass("icon-yuanquan1");
            $(".lblUserType").eq(1).find(".iconfont").removeClass("icon-yuanquan1").addClass("icon-gouxuan2");
            $(".drpUserGroup").parent().show();
        }
    },

    init: function () {
        if (DoctorInfo.check()) {
            Login.pageTitle();
            Login.localStorageInput();
            Login.setData();
            Login.setAction();
        }
        else {
            $("body").html("请在手机中打开");
        }
    }
};

$(function () {
    Login.init();
});


