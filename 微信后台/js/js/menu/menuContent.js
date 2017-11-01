/**
 * Created by EdenLiang on 2016/12/21.
 */
var MenuContent = {
    Data: {
        Item: {},
        EditItem: {},
        IsSub: false,
        I: 0,
        Err: {}
    },
    Temp: {
        Menu: '<div class="pe_hd"><p class="main-tip"><span>{{name}}</span><a class="btnDelItem">删除菜单</a></p></div><p class="hint">已添加子菜单，仅可设置菜单名称</p><div class="menu_name"><span class="mn_name">菜单名称</span><div class="mn_r"><input class="getName txtMenuName" type="text" value="{{editName}}" placeholder="菜单名称">{{#errName}}<p class="error">{{errName}}</p>{{/errName}}<p class="error2">字数不超过4个汉字或8个字母</p></div></div>',
        Item: '<div class="pe_hd"><p class="child-tip"><span>{{name}}</span><a class="btnDelItem">删除{{#isSub}}子{{/isSub}}菜单</a></p></div><div class="menu_name"><span class="mn_name">菜单名称</span><div class="mn_r"><input class="getName txtMenuName" value="{{editName}}" type="text" placeholder="菜单名称">{{#errName}}<p class="error">{{errName}}</p>{{/errName}}<p class="error2">{{#isSub}}字数不超过8个汉字或16个字母{{/isSub}}{{^isSub}}字数不超过4个汉字或8个字母{{/isSub}}</p></div></div><div class="menu_conent"><span class="mc">菜单内容</span><label><input type="radio" data-type="click" class="selType" name="select" {{#isViewLimited}}checked{{/isViewLimited}}>发送消息</label><label><input type="radio" data-type="view" class="selType" name="select" {{#isView}}checked{{/isView}}>跳转网页</label><div class="mc_cont">{{#isViewLimited}}{{#ViewLimitedItem}}{{#ViewLimitedItem.single}}<div><div class="card_list" style="width:300px"><a class="cl_cont" href="{{ViewLimitedItem.first.url}}" target="_blank"><p class="cl_hd">{{ViewLimitedItem.first.title}}</p><div class="cl_hdPic" style="background-image: url({{ViewLimitedItem.first.thumbLink}})"></div><p class="cl_des">{{ViewLimitedItem.first.description}}</p><hr><p class="cl_ft">阅读全文<span>&gt;</span></p></a></div><a class="btnCancelViewLimited" style="vertical-align: bottom;display: inline-block;margin-bottom: 12px;padding-left: 10px;color: #459ae9;">删除</a></div>{{/ViewLimitedItem.single}}{{^ViewLimitedItem.single}}<div><div class="card_list" style="width:300px"><div class="cl_cont2"><a class="cl_top" href="{{ViewLimitedItem.first.url}}" target="_blank"><div class="cltPic" style="background-image:url({{ViewLimitedItem.first.thumbLink}})"></div><p class="cltWord">{{ViewLimitedItem.first.title}}</p></a>{{#ViewLimitedItem.itemList}}<div class="cl_ct"><a class="tow" href="{{url}}" target="_blank"><p><span>{{title}}</span></p><div class="pic" style="background-image:url({{thumbLink}})"></div></a></div>{{/ViewLimitedItem.itemList}}</div></div><a class="btnCancelViewLimited" style="vertical-align: bottom;display: inline-block;margin-bottom: 12px;padding-left: 10px;color: #459ae9;">删除</a></div>{{/ViewLimitedItem.single}}{{/ViewLimitedItem}}{{^ViewLimitedItem}}<a class="mc_cont_letter btnShowCard"><i class="icon36_common"></i><p>从素材库中选择</p></a>{{/ViewLimitedItem}}{{/isViewLimited}}{{#isView}}<div class="mc_cont_url"><p class="url_word">订阅者点击该菜单会跳转到以下链接</p><span class="url_address">页面地址</span><input type="text" value="{{url}}" class="url_link txtView"></div>{{/isView}}</div></div>'
    },
    EditName: function (obj) {
        var val = _.trim($(obj).val());
        var length = 8;
        if (MenuContent.Data.IsSub) {
            length = 16;
        }
        MenuContent.Data.EditItem.name = val;
        if (val) {
            if (val.replace(/[^\x00-\xff]/g, "01").length <= length) {
                MenuContent.Data.Err.name = "";
                MenuContent.Data.Item.name = val;
                Menu.EditItem();
            }
            else {
                MenuContent.Data.Err.name = "字数超过上限";
            }
        }
        else {
            MenuContent.Data.Err.name = "请输入菜单名称";
        }
        MenuContent.SetContent();
    },
    EditView: function (obj) {
        var val = _.trim($(obj).val());
        MenuContent.Data.Item.url = val;
        MenuContent.Data.Item.type = "view";
        MenuContent.SetContent();
    },
    EditViewLimited: function (id) {
        MenuContent.Data.Item.key = id;
        MenuContent.SetContent();
    },
    ChangeType: function (obj) {
        MenuContent.Data.Item.type = $(obj).attr("data-type");
        MenuContent.SetContent();
    },
    DelItem: function () {
        if (MenuContent.Data.IsSub) {
            Menu.DelItem(MenuContent.Data.I, MenuContent.Data.Item.subi);
        }
        else
            Menu.DelItem(MenuContent.Data.I);
        $(".divMenuContent").html("");
    },
    SetMenu: function () {
        var item = MenuContent.Data.Item;
        var EditItem = MenuContent.Data.EditItem;
        $(".divMenuContent").html(Mustache.to_html(MenuContent.Temp.Menu, {
            name: item.name,
            editName: EditItem.name,
            errName: MenuContent.Data.Err["name"]
        }));
        $(".txtMenuName").blur(function () {
            MenuContent.EditName(this);
        });
        $(".btnDelItem").click(function () {
            MenuContent.DelItem();
        });
    },
    SetItem: function () {
        var item = MenuContent.Data.Item;
        var EditItem = MenuContent.Data.EditItem;
        var ViewLimitedItem = null;
        if (MenuContent.Data.Item.key) {
            var ViewLimitedItem = {};
            var itemHelp = _.find(Menu.Data.List, function (n) {
                return n.mediaId == MenuContent.Data.Item.key;
            });
            if (itemHelp) {
                ViewLimitedItem = _.cloneDeep(itemHelp);
                ViewLimitedItem.single = ViewLimitedItem.newsItems.length == 1 ? true : false;
                ViewLimitedItem.first = ViewLimitedItem.newsItems[0];
                ViewLimitedItem.itemList = _.filter(ViewLimitedItem.newsItems, function (n, i) {
                    return i != 0;
                });
            }
        }
        $(".divMenuContent").html(Mustache.to_html(MenuContent.Temp.Item, {
            name: item.name,
            editName: EditItem.name,
            errName: MenuContent.Data.Err["name"],
            isSub: MenuContent.Data.IsSub,
            isView: MenuContent.Data.Item.type == "view",
            url: item.url ? item.url : "",
            isViewLimited: MenuContent.Data.Item.type == "click",
            ViewLimitedItem: ViewLimitedItem
        }));

        $(".txtMenuName").blur(function () {
            MenuContent.EditName(this);
        });
        $(".btnDelItem").click(function () {
            MenuContent.DelItem();
        });
        $(".txtView").blur(function () {
            MenuContent.EditView(this);
        });
        $(".selType").click(function () {
            MenuContent.ChangeType(this);
        });
        $(".btnShowCard").click(function () {
            CardList.GetList(MenuContent.Data.Item.key ? MenuContent.Data.Item.key : "");
        });
        $(".btnCancelViewLimited").click(function () {
            MenuContent.Data.Item.key = "";
            MenuContent.SetContent();
        })
    },
    SetContent: function () {
        if (!MenuContent.Data.IsSub && MenuContent.Data.Item.sub_button && MenuContent.Data.Item.sub_button.length > 0) {
            MenuContent.SetMenu();
        }
        else {
            MenuContent.SetItem();
        }
    },
    Init: function (data) {
        //利用对象引用
        $.extend(MenuContent.Data, data, {Err: {}});
        MenuContent.Data.EditItem.name = MenuContent.Data.Item.name;
        MenuContent.SetContent();
    }
};