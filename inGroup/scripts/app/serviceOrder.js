/**
 * Created by Eden on 2017/4/15.
 */

var ServiceOrder = {
    pageTitle: function () {
        DoctorInfo.getPagerTitle("选择套餐");
    },
    oldX:0,
    temp: {
        orgLi: '<li data-val="">全部医院</li>{{#list}}<li data-val="{{id}}">{{text}}</li>{{/list}}',
        teamLi: '<li data-val="">全部团队</li>{{#list}}<li data-val="{{id}}">{{text}}</li>{{/list}}',
        serviceLi: '<li data-val="">全部类型</li>{{#list}}<li data-val="{{id}}">{{text}}</li>{{/list}}',
        list: '{{#list}}<li data-upId="{{upId}}" data-id="{{productId}}">' +
        '                       <div class="li-container clear">' +
        '                            <a class="serveLi clear"  >' +
        '                                <div class="serveLi-sel">' +
        '                                    <i class="icon-isSel iconfont {{^isSelected}} icon-yuanquan1{{/isSelected}}{{#isSelected}} icon-gouxuan2{{/isSelected}}"></i>' +
        '                                </div>' +
        '                                <div class="serveLi-cont" >' +
        '                                    <p class="serveTypeName">{{productName}}</p>' +
        '                                    <div class="serceClass clear">' +
        '                                        <div class="serceClassName">{{serviceTypeName}}&nbsp;<span class="name">{{productTypeName}}</span></div>' +
        '                                        <div class="serveClassPrice">' +
        '                                            <span class="price">{{billWayNum}}{{billWayName}}<em class="priceNumber">{{salePrice}}</em>元</span>&nbsp;/&nbsp;<span class="oldPriceNumber">剩余{{productNum}}</span>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                    <p class="provider">{{orgName}}&nbsp;/&nbsp;{{provider}}</p>' +
        '                                </div>' +
        '     {{#isTop}} <div class="stick cancel-stick">{{#showTop}}<div class="sticked"></div>{{/showTop}}取消置顶</div>{{/isTop}}{{^isTop}}<div class="stick select-stick">置顶</div>{{/isTop}}                         ' +
        '                            </a>' +
        '                        </div>' +
        '</li>{{/list}}',
        listLoading: '<li class="liListLoading"><div class="loading"><img src="Content/images/loading.gif" /><span>数据加载中...</span></div></li>',
        noMore: '<li><div class="cardLiEnd">没有更多服务了</div></li>',
        orderLoading: '<div class="orderLoading divOrderloading"><img src="Content/images/loading.gif"></div>'
    },
    data: {
        doctorUserId: null,
        type:"dropSearch",
        list: [],   //默认或下拉筛选
        inputSearchList:[], //input 筛选
        areaTree: [],
        orgList: [],
        teamList: [],
        serviceTypeList: [],
        total: 0,
        loading: false,
        currentShowTop:null,
        showTop:true,  //显示置顶
        showTopNum:null,
        search: { doctorUserId:null,keyWord: "", areaId:"",orgIds:[],teamStaffs:[], serviceTypeId: "", source:"ams", hasService:"Y", startRow: 0, rows: 10},
        inputSearch:{ doctorUserId:null, keyWord: "", areaId:"",orgIds:[],teamStaffs:[], serviceTypeId: "", source:"ams", hasService:"Y", startRow: 0, rows: 10},
        //    keyWord:关键字, areaId:区域id, orgIds:机构id, teamStaffs:团队id, serviceTypeId:服务类型
        selectedProductId:null,

    },
    getServiceTypeNameById: function (id) {
        var  item = _.find(ServiceOrder.data.serviceTypeList, {id: id});
        return item ? item.text : "";
    },
    getSearch: function () {
        $(".divList").html("");
        ServiceOrder.data.search.startRow = 0;
        ServiceOrder.data.search.orgGroupCode = "ALL";
        $(".divContent").append(ServiceOrder.temp.orderLoading);
        var  searchCont;
        if(ServiceOrder.data.type == "dropSearch") {
            searchCont = ServiceOrder.data.search;
        }else{
            searchCont = ServiceOrder.data.inputSearch;
        }
        if(ServiceOrder.data.showTop){ServiceOrder.data.showTopNum=0}
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=userServicePoService&method=getUserServiceByPageForOrderH5&flag=2", searchCont, function (data) {
            ServiceOrder.data.loading = false;
            $(".divOrderloading").remove();
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var  result = data.return_msg.result;
                var  dataList;
                if(ServiceOrder.data.type =='dropSearch'){
                    ServiceOrder.data.list = result.list;
                    dataList = ServiceOrder.data.list;

                }else if(ServiceOrder.data.type =='inputSearch'){
                    ServiceOrder.data.inputSearchList = result.list;
                    dataList = ServiceOrder.data.inputSearchList;
                }
                ServiceOrder.data.total = result.count;
                var  txtServiceType = $(".txtServiceType").html();
                dataList.map(function (i) {
                    i.showTop = ServiceOrder.data.showTop;
                    if( i.topLevel > 0 ){
                        i.isTop = true;
                        if(ServiceOrder.data.showTop){ServiceOrder.data.showTopNum++}
                    }else {
                        i.isTop = false;
                    }
                    (i.productNum && i.productNum>0) ? i.productNum : i.productNum = 0;
                    return i;
                });
                $(".divList").html(Mustache.to_html(ServiceOrder.temp.list, {
                    list: dataList, serviceTypeName: function () {
                        return ServiceOrder.getServiceTypeNameById(this.classify);
                    }, serverCategory: function () {
                        return txtServiceType;
                    }
                }));
                // console.log(ServiceOrder.data.showTop,ServiceOrder.data.showTopNum)
            }
        });
    },
    getAreaList: function () {

        var search = {
            doctorUserId: ServiceOrder.data.doctorUserId,
            areaId: "0",
            hasService: "Y",
            source:"ams"
        };
        Common.request('uniqueComservice2/base.do?do=httpInterface&module=userServicePoService&method=getAreaListByAreaIdAndUser&flag=2', search, function (data) {
            var  tree = Common.setTreeNode(data.return_msg.result.list[0].childAreaVoList);
            tree.unshift({id: '', text: '全部区域'});
            ServiceOrder.data.areaTree = tree;
            $('#ulAreaId').treeview({
                levels: 1,
                data: tree,
                selectedBackColor: '#fff',
                selectedColor: '#333',
                onNodeSelected: function (event, data) {
                    $('.ulAreaId').slideUp(false);
                    $(".divMask").remove();
                    $(".textAreaId").html(data.text);
                    ServiceOrder.data.search.areaId = data.id;
                    $(".textOrgId").text("医院");
                    ServiceOrder.data.search.orgIds = [];
                    $(".textTeamId").text("团队");
                    ServiceOrder.data.search.teamStaffs = [];
                    ServiceOrder.getOrgList(ServiceOrder.data.search.areaId);
                    ServiceOrder.getTeamList(ServiceOrder.data.search.areaId,ServiceOrder.data.search.orgIds);
                    ServiceOrder.data.showTop = false;
                    ServiceOrder.getSearch();
                }
            });
        });
    },
    getOrgList: function (areaId) {
        var  search = {
            doctorUserId: ServiceOrder.data.doctorUserId,
            areaId: parseInt(areaId),
            orgGroupCode: "ALL",
            hasService:"Y",
            source: "ams"
        };
        Common.request('uniqueComservice2/base.do?do=httpInterface&module=orgService&method=getOrgListByAreaIdAndUser&flag=2', search, function (data) {
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var  result = data.return_msg.result;
                var  orgList = [];
                _.map(result, function (s) {
                    if (s.orgName) {
                        orgList.push({id: s.orgId, text: s.orgName})
                    }
                });
                ServiceOrder.data.orgList = orgList;
                $(".ulOrgId").html(Mustache.to_html(ServiceOrder.temp.orgLi, {list: orgList})).find("li").click(function () {
                    $(".textOrgId").html($(this).html());
                    var orgId = $(this).attr("data-val");
                    orgId? ServiceOrder.data.search.orgIds = [orgId]: ServiceOrder.data.search.orgIds = [];
                    $(".textTeamId").text("团队");
                    ServiceOrder.data.search.teamStaffs = [];
                    Common.showMask(!1);
                    $(".ulOrgId").slideUp("fast");
                    ServiceOrder.getTeamList(ServiceOrder.data.search.areaId,ServiceOrder.data.search.orgIds);
                    ServiceOrder.data.showTop = false;
                    ServiceOrder.getSearch();
                });
            }
        });
    },
    getTeamList: function (areaId, orgId) {
        var  search = {
            doctorUserId: ServiceOrder.data.doctorUserId,
            areaId: parseInt(areaId),
            orgId: parseInt(orgId),
            hasService: "Y",
            source:"ams"
        };
        Common.request('uniqueComservice2/base.do?do=httpInterface&module=orgTeamService&method=getTeamStaffListByUser&flag=2', search, function (data) {
            var  result = data.return_msg.result;
            var  teamList = [];
            _.map(result, function (s) {
                if (s.teamStaffName) {
                    teamList.push({id: s.teamStaffId, text: s.teamStaffName})
                }
            });
            ServiceOrder.data.teamList = teamList;
            $(".ulTeamId").html(Mustache.to_html(ServiceOrder.temp.teamLi, {list: teamList})).find("li").click(function () {
                $(".textTeamId").html($(this).html());
                var  teamStaffId = $(this).attr("data-val");
                teamStaffId ?  ServiceOrder.data.search.teamStaffs = [teamStaffId] : ServiceOrder.data.search.teamStaffs = [];
                Common.showMask(!1);
                $(".ulTeamId").slideUp("fast");
                ServiceOrder.data.showTop = false;
                ServiceOrder.getSearch();
            });

        })
    },
    getServeType: function () {
        Common.request("uniqueComservice2/base.do?do=httpInterface&module=userServicePoService&method=getServiceType&flag=2", {}, function (data) {
            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                var  serviceTypeIdList = data.return_msg.result;
                _.map(serviceTypeIdList, function (s) {
                    s.id = s.typeId;
                    s.text = s.typeName;
                });
                ServiceOrder.data.serviceTypeList = serviceTypeIdList;
                $(".ulServiceTypeId").html(Mustache.to_html(ServiceOrder.temp.serviceLi, {list: serviceTypeIdList})).find("li").click(function () {
                    $(".txtServiceTypeId").html($(this).html());
                    ServiceOrder.data.search.serviceTypeId = $(this).attr("data-val");
                    Common.showMask(!1);
                    $(".ulServiceTypeId").slideUp("fast");
                    ServiceOrder.data.showTop = false;
                    ServiceOrder.getSearch();
                });
            }
        });
    },
    setData: function () {
        //区域
        ServiceOrder.data.doctorUserId = ServiceOrder.data.search.doctorUserId = ServiceOrder.data.inputSearch.doctorUserId = DoctorInfo.getDoctorUserId();

        ServiceOrder.getAreaList();

        //医院  传入区域id:areaId
        ServiceOrder.getOrgList();

        //获取团队 医院ID:orgId
        ServiceOrder.getTeamList();

        //服务类型
        ServiceOrder.getServeType();

        ServiceOrder.getSearch();

    },
    setAction: function () {
        $(".btnAreaId").click(function () {
            $(".ulAreaId").slideDown("fast");
            Common.showMask(!0, function () {
                $(".ulAreaId").slideUp("fast");
            });
        });

        $(".btnOrgId").click(function () {
            $(".ulOrgId").slideDown("fast");
            Common.showMask(!0, function () {
                $(".ulOrgId").slideUp("fast");
            });
        });

        $(".btnTeamId").click(function () {
            $(".ulTeamId").slideDown("fast");
            Common.showMask(!0, function () {
                $(".ulTeamId").slideUp("fast");
            });
        });

        $(".btnServiceTypeId").click(function () {
            $(".ulServiceTypeId").slideDown("fast");
            Common.showMask(!0, function () {
                $(".ulServiceTypeId").slideUp("fast");
            });
        });

        //下拉
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight == scrollHeight) {
                if (!ServiceOrder.data.loading) {
                    ServiceOrder.data.loading = true;
                    ServiceOrder.data.total != 0 && $(".divList").append(ServiceOrder.temp.listLoading);
                    ServiceOrder.data.search.startRow += ServiceOrder.data.search.rows;
                    if (ServiceOrder.data.search.startRow < ServiceOrder.data.total) {
                        //topLevel 不为0为置顶，数值大在上
                        var  searchCont ;
                        if(ServiceOrder.data.type == "dropSearch"){
                            searchCont = ServiceOrder.data.search;
                        }else{
                            searchCont = ServiceOrder.data.inputSearch;
                        }
                        Common.request("uniqueComservice2/base.do?do=httpInterface&module=userServicePoService&method=getUserServiceByPageForOrderH5&flag=2", searchCont, function (data) {
                            ServiceOrder.data.loading = false;
                            $(".liListLoading").remove();
                            if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                                var result = data.return_msg.result;
                                var  dataList;
                                if(ServiceOrder.data.type =='dropSearch'){
                                    ServiceOrder.data.list = ServiceOrder.data.list.concat(result.list);
                                }else if(ServiceOrder.data.type =='inputSearch'){
                                    ServiceOrder.data.inputSearchList = ServiceOrder.data.inputSearchList.concat(result.list);
                                }
                                dataList = result.list;
                                ServiceOrder.data.total = result.count;
                                var txtServiceType = $(".txtServiceType").html();
                                var isSelected = ServiceOrder.data.selectedProductId ? true : false;
                                dataList.map(function (i) {
                                    i.isSelected = isSelected,
                                    i.showTop = ServiceOrder.data.showTop;
                                    i.topLevel > 0 ? i.isTop = true : i.isTop = false;
                                    (i.productNum && i.productNum>0) ? i.productNum : i.productNum = 0;
                                    return i;
                                });
                                $(".divList").append(Mustache.to_html(ServiceOrder.temp.list, {
                                    list: dataList, serviceTypeName: function () {
                                        return ServiceOrder.getServiceTypeNameById(this.classify);
                                    }, serverCategory: function () {
                                        return txtServiceType;
                                    }
                                }));
                            }
                        });
                    }
                    else if (ServiceOrder.data.total != 0) {
                        $(".liListLoading").remove();
                        $(".divList").append(ServiceOrder.temp.noMore);
                    }
                }
            }
        });
        //文本搜索输
        $(".serveSearch-input").on("focus", function () {
            $(".selCont").hide();
            $(".serveSearch").removeClass("noInput");
            if( ServiceOrder.data.type != "inputSearch"){
                $(".divList").html("");
                ServiceOrder.data.type= "inputSearch";
                ServiceOrder.data.currentShowTop = ServiceOrder.data.showTop;
                ServiceOrder.data.showTop = false;
            }
        });
        $(".serveSearch-input").on("input propertychange", function () {
            var  searchText = _.trim($(this).val());
            if(searchText){
                $(".icon-iconshanchu").show();
            }else{
                $(".icon-iconshanchu").hide();
            }
            ServiceOrder.data.inputSearch.keyWord= searchText;
            ServiceOrder.getSearch();
        });
        $(".icon-iconshanchu").click(function(){
            $(".serveSearch-input").val("");
            $(".serveSearch-input").focus();
        });
        //文本框关闭
        $(".search-cancel").click(function () {
            $(".serveSearch-input").val("");
            $(".icon-iconshanchu").hide();
            $(".serveSearch").addClass("noInput");
            ServiceOrder.data.type= "dropSearch";
            ServiceOrder.data.showTop = ServiceOrder.data.currentShowTop;
            ServiceOrder.getSearch();
            $(".selCont").show();
        });

        

        //滑动模块
        var  $this, width,left,maxLeft,minLeft,startX,startY,endX,endY,distanceX,distanceY;
        $(".divList").on("touchstart",".serveLi", function (e) {
            $this =  $(this);
            var activeLi = $this.closest("li").siblings("li").find(".serveLi");
            TweenMax.to(activeLi, 0.5, { x: 0, onComplete: function () { activeLi.removeClass("active") } });
            $this.addClass("active");
             width = $this.find('.stick').width();
             left = $this.position().left;
             maxLeft = 0;
             minLeft = -width;
             startX = e.originalEvent.changedTouches[0].screenX;
             startY = e.originalEvent.changedTouches[0].screenY;

        });
        $(".divList").on("touchmove",".serveLi", function(e){
            // var $this =  $(this);
            //获取滑动屏幕时的X
            endX = e.originalEvent.changedTouches[0].screenX;
            endY = e.originalEvent.changedTouches[0].screenY;
            //获取滑动距离
            distanceX = endX-startX;
            distanceY = endY-startY;
            //判断滑动方向
            // (Math.abs(distanceX) && distanceX>0)
            if(Math.abs(distanceX)>Math.abs(distanceY)+10){

                if(left+distanceX >=maxLeft){
                    TweenMax.to($this,0.5,{x:0});
                    // $this.css("left",0);
                }else if(left+distanceX <= minLeft){
                    // $this.css("left",-width);
                    TweenMax.to($this,0.5,{x:-width});
                } else{
                    // $this.css("left",left+distanceX);
                    TweenMax.to($this,0.5,{x:left+distanceX});
                }
            }
        });
        $(".divList").on("touchend",".serveLi", function (e) {
            // var $this =  $(this);
            if(Math.abs(distanceX)>Math.abs(distanceY)+10){
                if(Math.abs(distanceX)>=width/2){
                    if (distanceX <= 0){
                        TweenMax.to($this,0.5,{x:-width});
                    }else {
                        TweenMax.to($this,0.5,{x:0});
                    }
                }else {
                    if (distanceX <= 0){
                        TweenMax.to($this,0.5,{x:0});
                    }else {
                        TweenMax.to($this,0.5,{x:-width});
                    }
                }
            }else {
                TweenMax.to($this,0.5,{x:0});
            }
            // width= 0;
            // left= 0;
            // maxLeft = 0;
            // minLeft = 0;
            // startX = 0;
            // startY = 0;
            // endX = 0;
            // endY = 0;
            // distanceX = 0;
            // distanceY = 0;
        });


        //置顶/取消置顶 功能
        $(".divList").on("click",".select-stick", function (e) {
            if(ServiceOrder.data.showTopNum < 5){
                var  data = {
                    productUpId:parseInt($(this).closest("li").attr("data-upId")),
                    doctorUserId:ServiceOrder.data.search.doctorUserId
                };
                Common.request("uniqueComservice2/base.do?do=httpInterface&module=userServicePoService&method=setServiceTop&flag=2",data , function (data) {
                    if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                        ServiceOrder.data.showTopNum++;
                        ServiceOrder.getSearch();
                    }
                });
            }else {
                Common.showFormAlert(!0, "最多只能置顶5项哦~");
            }
            return false;
        });
        $(".divList").on("click",".cancel-stick", function (e) {
            var  data = {
                productUpId:$(this).closest("li").attr("data-upId"),
                doctorUserId:ServiceOrder.data.search.doctorUserId
            };
            Common.request("uniqueComservice2/base.do?do=httpInterface&module=userServicePoService&method=cancelServiceTop&flag=2", data, function (data) {
                if (data && data.return_msg && data.return_msg.business_code == "SUCCESS") {
                    ServiceOrder.data.showTopNum--;
                    ServiceOrder.getSearch();
                }
            });
            return false;
        });

        //套餐选择
        $(".divList").on("click",".icon-isSel", function (e) {
            var  $this = $(this);
            if($this.hasClass("active")){
                $(".icon-isSel").removeClass().addClass("icon-isSel iconfont icon-yuanquan1");
                $(".serveBtn").fadeOut();
                ServiceOrder.data.selectedProductId = "";
            }else {
                $(".icon-isSel").removeClass("active icon-yuanquan1 icon-gouxuan2").addClass("icon-gouxuan2");
                $(this).removeClass("icon-yuanquan1 icon-gouxuan2").addClass("active icon-gouxuan2");
                $(".serveBtn").fadeIn();
                ServiceOrder.data.selectedProductId = $(this).closest("li").attr("data-upId");
            }
            return false;
        });

        //提交
        $(".btn-selected").click(function() {
            window.location.href = 'login.html?upId='+ServiceOrder.data.selectedProductId;
        });

        //套餐点击进入详情页面
        $(".divList").on("click",".li-container", function (e) {
            var  li = $(this).closest("li");
            ServiceOrder.data.selectedProductId = li.attr("data-upId");
            var  href = "pay.html?show=serveShow&upId="+li.attr("data-upId")+"&productId="+li.attr("data-id");
            window.location.href = href;
        })
    },
    Init: function () {
        if (DoctorInfo.check()) {
            ServiceOrder.setData();
            ServiceOrder.setAction();
            ServiceOrder.pageTitle();
        }
        else {
            $("body").html("请在手机中打开");
        }
    }
};

$(function () {
    ServiceOrder.Init();
});




