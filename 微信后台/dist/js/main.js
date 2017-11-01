var menuList; //主菜单列表
var itemList; //子菜单名称，只能支持向下拖动

/*
 * 添加主菜单
 * */
function addMenu(e) {
    var mainMenu = $(".pre_menu_list");

    //显示
    $(".editor_inner").css("display", "block");
    $(".tool_bar").css("display", "block");
    $(".m_sort").css("display", "block");

    //菜单排序按钮
    var aList = $.find(".pre_menu_link");
    if (aList.length > 1) {
        $("#orderBt").attr("onclick", "menuSort()");
    }

    //所有的主菜单失焦，添加的高亮显示
    $('.pre_menu_link').removeClass("active");
    $('.pre_menu_list .active').removeClass('active');
    $(e).addClass("active");
    $(e).parent().addClass('js-menu');
    $(e).attr("onclick", "chooseMenu(this)"); //覆盖生成菜单事件，不再生成菜单
    $(e).children(".icon14_menu_add").remove();
    if ($(e).children("span").length == 0) {
        $(e).append($("<span>菜单名称</span>"));
    }


    //设置子菜单  “+”
    $('.sub_pre_menu_box').css('display', 'none');
    var menuBox = $(e).parent().find(".sub_pre_menu_box");
    $(menuBox[0]).css("display", "block");

    // $(e).parent().find(".sub_pre_menu_box").css("display", "block");
    //刚点击“+”生成的主菜单时候没如果没有子菜单样式，则会生成下列子菜单
    if (menuBox.length == 0) {
        var div = $("<div class='sub_pre_menu_box'>" +
            "<ul class='sub_pre_menu_list'>" +
            "<li>" +
            "<a onclick='addItem(this)' title='最多添加5个子菜单' draggable='false'>" +
            "<span class='sub_pre_menu_inner'><i class='icon14_menu_add'></i></span>" +
            "</a>" +
            "</li>" +
            "</ul>" +
            "<i class='arrow arrow_out'></i>" +
            "<i class='arrow arrow_in'></i>" +
            "</div>");
        $(e).parent().append(div);
    }


    //设置宽度
    var menu = $(".pre_menu_item");//所有的菜单系列列表
    if (menu.length >= 3) {
        return;
    }
    var width = eval(100 / (menu.length + 1)) + "%";
    for (var i = 0; i < menu.length; i++) {
        menu[i].style.width = width;
    }

    //之后“+”主菜单
    var li = $("<li class='pre_menu_item dads-children dad-draggable-area' data-dad-id='" + eval(menu.length + 1) + "' data-dad-position='" + eval(menu.length + 1) + "' style='width:" + width + "'>" +
        "<a onclick='addMenu(this)' class='pre_menu_link' draggable='false'><i class='icon14_menu_add'></i></a>" +
        "</li>");
    $(mainMenu[0]).append(li);


}

/*
 * 添加子菜单
 * */
function addItem(e) {
    /* 子菜单列表 */
    var itemList = $(e).parent().parent().find("li");
    var M = $(e).parent().parent().parent().parent().children();
    $('.pre_menu_list .active').removeClass('active');

    if (itemList.length >= 1 && $(M).find(".icon_menu_dot").length == 0) {
        var i = $("<i class='icon_menu_dot'></i>");
        $($(M)[0]).children().before(i);
    }

    if (itemList.length < 5) {
        //添加子菜单
        var li = $("<li class='select current dads-children dad-draggable-area' data-dad-id='" + itemList.length + "' data-dad-position='" + itemList.length + "'>" +
            "<a onclick='chooseItem(this)' class='active' draggable='false'>" +
            "<span class='sub_pre_menu_inner'>" +
            "<i class='icon20_common sort_gray'></i>" +
            "<span class='js_l2Title'>子菜单名称</span>" +
            "</span>" +
            "</a>" +
            "</li>");
        $(e).parent().before(li);

    } else if (itemList.length == 5) {
        if ($(e).attr("title") != "") {
            var span = $(e).children("span");
            $(span).children("i").removeClass("icon14_menu_add").addClass("icon20_common sort_gray");
            var i = $("<span class='js_l2Title'>子菜单名称</span>");
            $(span).append(i);
            $(e).removeAttr("title");
            $(e).parent().addClass("select current dads-children dad-draggable-area");
            $(e).parent().attr("data-dad-id", itemList.length);
            $(e).parent().attr("data-dad-position", itemList.length);
            // $('.pre_menu_list .active').removeClass('active');
            $(e).addClass('active');
            $(e).attr("onclick", "chooseItem(this)");
        }
    }
}

/*
 * 选中当前主菜单
 * */
function chooseMenu(e) {
    //变更当前标签
    //所有菜单失焦
    $('.pre_menu_list .active').removeClass('active');
    /*设置激活标标签*/
    $(e).addClass("active");
    $(".sub_pre_menu_box").css('display', 'none');
    $(e).next().css("display", "block");
    //当主菜单有子菜单时候只改名不添加事件
    if ($(e).parent().find('.current').length > 0) {

        $('.hint').css('display', 'block');
        $('.menu_conent').css('display', 'none');
    } else {
        $('.hint').css('display', 'none');
        $('.menu_conent').css('display', 'block');
    }
    /*内容区header改变*/
    $('.main-tip').css('display', 'block')
        .siblings().css('display', 'none');

    /*赋值内容参数*/
    var name = $(e).children("span")[0].innerHTML;
    var type = $(e).attr("rel");
    var datahref = $(e).attr("data-href");
    $(".getName").val(name);
    //根据不同类型赋值
    switch (type) {
        case "view" :
            $(".url_link").val(datahref);
            break;
        case "view_limited" :
            break;
        case "click" :
            break;
    }

}

/*
 * 选中当前子菜单
 * */
function chooseItem(e) {
    /* 所有的高亮都取消 */
    $('.pre_menu_list .active').removeClass('active');
    $(e).addClass("active");
    /* 提示框消失 */
    $('.hint').css('display', 'none');
    $('.child-tip').css('display', 'block')
        .siblings().css('display', 'none');
    $('.menu_conent').css('display', 'block');

    /*赋值内容参数*/
    var name = $(e).children("span")[0].innerHTML;
    var type = $(e).attr("rel");
    var datahref = $(e).attr("data-href");
    $(".getName").val(name);
    //根据不同类型赋值
    switch (type) {
        case "view" :
            $(".url_link").val(datahref);
            break;
        case "view_limited" :
            break;
        case "click" :
            break;
    }
}

/*
 * 菜单排序
 * */
function menuSort() {
    $("#orderBt").css("display", "none");
    $("#orderDis").css("display", "inline-block");
    menuList = $(".pre_menu_list").dad(); //开启主菜单排序
    // itemList = $(".sub_pre_menu_list").dad(); //开启子菜单排序
    menuList.activate();
    // itemList.activate();
}

/*
 * 完成排序
 * */
function submitMenuSort() {
    $("#orderBt").css("display", "inline-block");
    $("#orderDis").css("display", "none");
    menuList.deactivate(); //禁止主菜单排序功能
    // itemList.deactivate(); //禁止子菜单排序功能
}

/*
 * 功能选择发送图文 or URL
 * */
function chooseMc(code) {
    $(".mc_cont_letter").css("display", "none");
    $(".mc_cont_url").css("display", "none");
    switch (code) {
        case "sendMsg" :
            $(".mc_cont_letter").css("display", "block");
            break;
        case "reToUrl" :
            $(".mc_cont_url").css("display", "block");
            break;
    }
}

/*
 * 输入验证
 * */
function checkName(e) {
    var name = $(this).val();

    $(".active").children("span").val(name);


    if (name.length == 0) {
        $("#mn_errorMsg").css("display", "block");
    } else {
        $("#mn_errorMsg").css("display", "none");
    }


}

/*
 * 开启素材
 * */
function showList() {
    $(".material_library").css("display", "inline-block");

    //素材中的瀑布流样式
    var options = {
        srcNode: '.card_list',
        margin: '10px 20px',
        width: '300px',
        max_width: '',
        resizable: true,
        transition: 'all 0.5s ease'
    };
    $('.ml_bd_cont .card').gridify(options);
}

/*
 * 关闭素材
 * */
function closePop() {
    $(".material_library").css("display", "none");
}

/*
 * 根据参数渲染界面
 * */
function renderHtml(json) {
    console.log(json);

    var width = eval(100 / (json.button.length == 3 ? json.button.length : eval(json.button.length + 1))) + "%";//主菜单宽度

    var ul = $("#mainMenu");
    //清除ul标签下所有元素
    ul.empty();

    for (var i = 0; i < json.button.length; i++) {
        //判断是否有子菜单
        if (json.button[i].sub_button.length > 0) {
            //生成主菜单
            var li = $("<li class='pre_menu_item dads-children dad-draggable-area js-menu' data-dad-id='" + i + "' data-dad-position='" + i + "' style='width:" + width + ";'>" +
                "<a onclick='chooseMenu(this)' class='pre_menu_link' draggable='false' data-href='" + json.button[i].url + "' rel='" + json.button[i].type + "' >" +
                "<i class='icon_menu_dot'></i><span>" + json.button[i].name + "</span>" + "</a>" +
                "</li>");

            var li_div = $("<div class='sub_pre_menu_box' style='display: none'></div>");
            var li_div_ul = $("<ul class='sub_pre_menu_list'></ul>");
            var div_i = $("<i class='arrow arrow_out'></i><i class='arrow arrow_in'></i>");

            //编辑子菜单
            for (var j = 0; j < json.button[i].sub_button.length; j++) {
                //生成子菜单添加栏
                var ul_li = $("<li class='select current dads-children dad-draggable-area' data-dad-id='" + j + "' data-dad-position='" + j + "'>" +
                    "<a onclick='chooseItem(this)' draggable='false' data-href='" + json.button[i].sub_button[j].url + "' rel='" + json.button[i].sub_button[j].type + "'>" +
                    "<span class='sub_pre_menu_inner'>" + json.button[i].sub_button[j].name + "</span>" +
                    "</a></li>");

                li_div_ul.append(ul_li);
            }

            //判断子菜单模块是否到5个
            if (json.button[i].sub_button.length < 5) {
                //生成子菜单添加栏
                var ul_li = $("<li><a onclick='addItem(this)' title='最多添加5个子菜单' draggable='false'>" +
                    "<span class='sub_pre_menu_inner'><i class='icon14_menu_add'></i></span>" +
                    "</a></li>");

                li_div_ul.append(ul_li);
            }

            li_div.append(li_div_ul);
            li_div.append(div_i);

            li.append(li_div);
            ul.append(li);

        }
        else {
            //生成主菜单
            var li = $("<li class='pre_menu_item dads-children dad-draggable-area js-menu' data-dad-id='" + i + "' data-dad-position='" + i + "' style='width:" + width + ";'>" +
                "<a onclick='chooseMenu(this)' class='pre_menu_link' draggable='false' data-href='" + json.button[i].url + "' rel='" + json.button[i].type + "' >" +
                "<span>" + json.button[i].name + "</span>" + "</a>" +
                "</li>");

            //生成子菜单添加栏
            var div = $("<div class='sub_pre_menu_box' style='display: none'>" +
                "<ul class='sub_pre_menu_list'><li>" +
                "<a onclick='addItem(this)' title='最多添加5个子菜单' draggable='false'>" +
                "<span class='sub_pre_menu_inner'><i class='icon14_menu_add'></i></span>" +
                "</a></li></ul><i class='arrow arrow_out'></i><i class='arrow arrow_in'></i></div>");

            li.append(div);
            ul.append(li);

        }
    }

    //如果总数小于3个菜单的话，则添加添加菜单
    if (json.button.length < 3) {
        //生成主菜单添加栏
        var li = $("<li class='pre_menu_item dads-children dad-draggable-area' data-dad-id='" + eval(json.button.length + 1) + "' data-dad-position='" + eval(json.button.length + 1) + "' style='width:" + width + ";'>" +
            "<a onclick='addMenu(this)' class='pre_menu_link' draggable='false' >" +
            "<i class='icon14_menu_add'></i>" + "</a>" +
            "</li>");

        ul.append(li);
    }

    if (json.button.length > 0) {
        //显示
        $(".editor_inner").css("display", "block");
        $(".tool_bar").css("display", "block");
        $(".m_sort").css("display", "block");

        if (json.button.length > 1) {
            //菜单排序按钮
            var aList = $.find(".pre_menu_link");
            if (aList.length > 1) {
                $("#orderBt").attr("onclick", "menuSort()");
            }
        }
    }


}

$(function () {
    window.onbeforeunload = function(){
        return "系统可能不会保存您做做的更改！";
    }
    //菜单列表
    var menuList = [];

    //删除菜单
    $('.delMenu').on('click', function () {

        //子菜单按钮删除
        if ($('.active').parent().hasClass('current')) {
            var $parent = $('.active').closest('.sub_pre_menu_list');  //子菜单父级
            var $childLength = $parent.find('.current').length;        //子菜单个数
            if ($childLength == 5) {                      //判断是否为5个的时候删除子菜单
                $('.active').parent().remove();         //删除该子菜单
                //增添一个“+”的子菜单
                var $li = $("<li>" +
                    "<a onclick='addItem(this)' title='最多添加5个子菜单' draggable='false'>" +
                    "<span class='sub_pre_menu_inner'><i class='icon14_menu_add'></i></span>" +
                    "</a>" +
                    "</li>");
                $parent.append($li);
            } else {
                $('.active').parent().remove();
            }
        }
        //主菜单删除
        if ($('.active').parent().hasClass('pre_menu_item')) {
            var $menuOld = $(".js-menu");//删除前有名字菜单系列
            var $number = $menuOld.length; //有功能的菜单个数
            var $menu = $('.active').parent();


            $menu.remove();
            //有名字的菜单已满的时候，删除情况
            if ($number == 3) {
                var $data_dad_id = $menu.attr('data-dad-id');
                var $data_dad_position = $menu.attr('data-dad-position');
                var width = eval(100 / 3) + "%";
                var $li = $("<li class='pre_menu_item dads-children dad-draggable-area' data-dad-id='" + $data_dad_id + "' data-dad-position='" + $data_dad_position + "' style='width:" + width + "'>" +
                    "<a onclick='addMenu(this)' class='pre_menu_link' draggable='false'><i class='icon14_menu_add'></i></a>" +
                    "</li>");
                $('.pre_menu_item').parent().append($li);
            }
            //如果有两个有功能的菜单，删除后，宽度发生改变，各占50%
            else if ($number == 2) {
                $('.active').parent().remove();
                // 列表
                $('.pre_menu_item').css('width', '50%');
            }
            //如果只有一个有功能的菜单，删除后，后面的“+”菜单中名字要添加上
            else if ($menuOld.length == 1) {
                $('.active').parent().remove();
                $(".pre_menu_item").css("width", "100%");
                var $lastMenu = $(".pre_menu_item").find('.pre_menu_link');
                $lastMenu.append("<span>菜单名称</span>");
                $lastMenu.addClass('active');
                $('.editor_inner').css('display', 'none');
                $('.tool_bar').css('display', 'none');
            }
        }

    });

    //命名
    $('.getName').on('blur', function () {
        var nickName = $(this).val();
        var objReg = /^([A-z]{1,8}|[\u4e00-\u9fa5]{1,4})$/;
        /* 先判断是否为空或者空字符串，在判断是否符合要求 */
        if (nickName.replace(/(^s*)|(s*$)/g, "").length != 0) {
            $('.error').css('display', 'none');
            if (objReg.test(nickName)) {
                $('.active').children('span').html(nickName);
                $('.error2').css('color', '#000');
            } else {
                $('.error2').css('color', '#f00');
            }
        } else {
            $('.error').css('display', 'block');
        }
    });

    //url赋予
    $('.url_link').on('blur', function () {
        var URL = $(this).val();
        $(".active").attr("data-href", URL);
        $(".active").attr("rel", "view");
    });

    //选中的时候
    var index = null;
    $(".card .card_list").on("click", function () {
        console.log($(this).index());
        $(".mask").css({"display": "none"});
        $(this).find('.mask').css({"display": "block"});
        index = $(this).clone();
        return index;
    });

    $(".ml_ft .btn_success").on("click", function () {
        console.log(index);
        if (index != null) {
            $(this).closest(".material_library").css({"display": "none"});
            //将获取的消息赋给菜单内容中的发送消息框
            var $add = $(".mc_cont").children(".mc_cont_letter");
            $(".mc_cont").children(".mc_cont_letter").remove();
            index.css({"left": "0", "top": "0"});
            $(".mc_cont").append(index);
            var $height = index.height() + "px";
            var $cancel = $("<a class='cancel' href='javascript:;' style='top:" + $height + "' >删除</a>");
            $(".mc_cont").append(index);
            $(".mc_cont").append($cancel);
            $(".cancel").on("click", function () {
                $(this).siblings(".card_list").remove();
                $(this).remove();
                $(".mc_cont").append($add);
            });
        } else {
            console.log("0");
        }
    });

    //保存
    $('#save').click(function () {
        var  postData = []; //创建菜单入参

        //获取可活动的父级菜单
        var $menuList = $('.js-menu');
        for (var i = 0; i < $menuList.length; i++) {

            var $mainA = $($menuList[i]).children("a")[0];  //获取主菜单名称
            var $mainName = $($mainA).children("span")[0].innerHTML;

            var $box = $($menuList[i]).children("div")[0]; //子菜单父级
            var $child = $($box).find('.current');  //子菜单

            //判断是否含有子菜单
            if ($child.length > 0) {
                var sub_button = [];

                for (var j = 0; j < $child.length; j++) {
                    var $childrenA = $($child[j]).children("a")[0];  //获取子菜单A标签
                    var childrenName = $childrenA.children[0].innerHTML; //获取子菜单名称
                    var childrenType = $($childrenA).attr("rel"); //类型
                    //判断链接类型
                    switch (childrenType) {
                        case "view":
                            sub_button.push({type: "view", name: childrenName, url: $($childrenA).attr("data-href")});
                            break;
                        case "click":
                            sub_button.push({type: "click", name: childrenName, media_id: ""});
                            break;
                        case "view_limited":
                            sub_button.push({type: "view_limited", name: childrenName, key: ""});
                            break;
                    }
                }
                postData.push({name: $mainName, sub_button: sub_button});

            }
            else {
                var type = $($mainA).attr("rel"); //主菜单类型

                switch (type) {
                    case "view":
                        postData.push({type: "view", name: $mainName, url: $($mainA).attr("data-href")});
                        break;
                    case "click":
                        postData.push({type: "click", name: $mainName, media_id: ""});
                        break;
                    case "view_limited":
                        postData.push({type: "view_limited", name: $mainName, key: ""});
                        break;
                }
            }
        }

        var dataJson = {button: postData};

        //保存本地缓存
        Storage.Set('menu', dataJson, true);

        alert('保存成功')

    });

    //发布
    $('#submit').click(function () {

        //将本地保存的菜单进行发布
        var json = Storage.Get('menu', true);

        //调用接口
        $.ajax({
            url: "http://182.92.8.118:8081/menu/crete",
            data: JSON.stringify(json),
            type: "POST",
            dataType: "Json",
            async: false,
            contentType: 'application/json',
            success: function (obj) {
                console.log(obj);
                if (obj.code == 2000) {
                    alert('操作成功');
                } else {
                    alert("错误代码：" + obj.message);
                }
            }
        });
    });

    //获取当前菜单信息
    $.ajax({
        url: "http://182.92.8.118:8081/menu/get",
        type: "GET",
        dataType: "Json",
        async: false,
        contentType: 'application/json',
        success: function (obj) {
            if (obj.code == 2000) {
                Storage.Set('menu', obj.data.menu); //设置本地缓存
                menuList = obj.data.menu;
            } else {
                alert("错误代码：" + obj.message);
            }
        }
    });

    /*预览*/
    $('#preview').click(function () {
        //将本地保存的菜单进行发布
        var json = Storage.Get('menu', true);

        //渲染页面
    });

    //根据JSON数据进行渲染
    renderHtml(menuList);

});
