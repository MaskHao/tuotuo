/**
 * Created by EdenLiang on 2016/12/21.
 */

var Menu = {
    Data: {
        Button: [],
        List: [],
        SetOrder: false,
        SetSubOrder: false,
        DrakeButton: [],
        DrakeSubButtonObj: {i: 0, DrakeSubButton: []}
    },
    DrakeItem: {},
    DrakeSubItem: {},
    Temp: {
        MenuItem: '{{#itemList}}<li data-i="{{i}}" class="pre_menu_item" style="width: {{itemWidth}}%;"><a class="pre_menu_link btnItem {{#active}}active{{/active}}" data-i="{{i}}"><i class="icon_menu_dot"></i><span>{{name}}</span></a><div class="sub_pre_menu_box" {{^showSub}}style="display: none;"{{/showSub}}><ul data-i="{{i}}" {{#showSub}}id="ulDragSubItem" {{/showSub}}class="sub_pre_menu_list">{{#sub_button}}<li data-subi="{{subi}}"><p class="btnShowItem {{#subActive}}active{{/subActive}}" data-type={{type}} data-i="{{i}}" data-subi="{{subi}}"><span class="sub_pre_menu_inner ">{{name}}</span></p></li>{{/sub_button}}{{#addSub}}<li><a data-i="{{i}}" class="btnAddSubItem"><span class="sub_pre_menu_inner"><i class="icon14_menu_add"></i></span></a></li>{{/addSub}}</ul><i class="arrow arrow_out"></i><i class="arrow arrow_in"></i></div></li>{{/itemList}}{{#addItem}}<li class="pre_menu_item"  style="width:{{itemWidth}}%"><a class="pre_menu_link btnAddItem"><i class="icon14_menu_add"></i></a></li>{{/addItem}}'
    },
    EditItem: function () {
        Menu.SetMenu();
    },
    DelItem: function (index, subIndex) {
        if (!isNaN(subIndex)) {
            Menu.Data.Button[index].sub_button = _.filter(Menu.Data.Button[index].sub_button, function (subn, subi) {
                return subi != subIndex;
            });
            _.map(Menu.Data.Button[index].sub_button, function (subn, subi) {
                subn.subi = subi;
                return subn;
            });
            Menu.Data.Button[index].addSub = Menu.Data.Button[index].sub_button.length > 4 ? false : true;
        }
        else {
            Menu.Data.Button = _.filter(Menu.Data.Button, function (n, i) {
                return i != index;
            });
            _.map(Menu.Data.Button, function (n, i) {
                n.i = i;
                return n;
            });
        }
        Menu.SetMenu();
    },
    AddItem: function () {
        var length = Menu.Data.Button.length;
        _.map(Menu.Data.Button, function (n) {
            n.active = false;
            n.showSub = false;
            return n;
        });
        if (length < 3)
            Menu.Data.Button[length] = {
                name: "菜单名称",
                i: length,
                type: "view",
                active: true,
                addSub: true,
                showSub: true,
                sub_button: []
            };
        MenuContent.Init({Item: Menu.Data.Button[length], IsSub: false, I: length});
        Menu.SetMenu();
    },
    AddSubItem: function (obj) {
        var index = $(obj).attr("data-i");
        if (Menu.Data.Button[index] && Menu.Data.Button[index].sub_button) {
            Menu.Data.Button[index].active = false;
            var length = Menu.Data.Button[index].sub_button.length;
            _.map(Menu.Data.Button[index].sub_button, function (n) {
                n.subActive = false;
                return n;
            });
            if (length < 5) {
                Menu.Data.Button[index].sub_button[length] = {
                    name: "子菜单名称",
                    type: "view",
                    subActive: true,
                    subi: length
                };
            }
            if (length >= 4)
                Menu.Data.Button[index].addSub = false;
            MenuContent.Init({Item: Menu.Data.Button[index].sub_button[length], IsSub: true, I: index});
        }
        Menu.SetMenu();
    },
    HoverSubItem: function () {
        if (Menu.Data.SetOrder) {
            Menu.Data.SetOrder = false;
            _.map(Menu.Data.Button, function (n, i) {
                n.showSub = n.active;
                n.addSub = n.sub_button.length > 4 ? false : true;
                return n;
            });
            Menu.Data.SetSubOrder = true;
            _.map(Menu.Data.Button, function (n, i) {
                if (n.showSub) {
                    n.showSub = !(Menu.Data.SetSubOrder && n.sub_button.length == 0);
                }
                n.addSub = false;
                return n;
            });
            Menu.SetMenu();
        }
    },
    HoverItem: function () {
        if (Menu.Data.SetSubOrder) {
            Menu.Data.SetSubOrder = false;
            _.map(Menu.Data.Button, function (n, i) {
                n.showSub = n.active;
                n.addSub = n.sub_button.length > 4 ? false : true;
                return n;
            });
            Menu.Data.SetOrder = true;
            _.map(Menu.Data.Button, function (n, i) {
                if (n.showSub) {
                    n.showSub = !(Menu.Data.SetOrder && n.sub_button.length == 0);
                }
                n.addSub = false;
                return n;
            });
            Menu.SetMenu();
        }
    },
    ShowItem: function (obj) {
        var index = $(obj).attr("data-i");
        _.map(Menu.Data.Button, function (n, i) {
            if (i == index) {
                n.active = n.active ? false : true;
                n.showSub = (Menu.Data.SetOrder || Menu.Data.SetSubOrder) && n.sub_button.length == 0 ? false : n.showSub ? false : true;
            }
            else {
                n.active = false;
                n.showSub = false;
            }
            _.map(Menu.Data.Button[index].sub_button, function (subn) {
                subn.subActive = false;
                return subn;
            });
            return n;
        });
        MenuContent.Init({Item: Menu.Data.Button[index], IsSub: false, I: index});
        Menu.SetMenu();
    },
    ShowSubItem: function (obj) {
        var index = $(obj).attr("data-i");
        var subIndex = $(obj).attr("data-subi");
        if (Menu.Data.Button[index] && Menu.Data.Button[index].sub_button) {
            Menu.Data.Button[index].active = false;
            _.map(Menu.Data.Button[index].sub_button, function (n, i) {
                n.subActive = (i == subIndex);
                return n;
            });
        }
        MenuContent.Init({Item: Menu.Data.Button[index].sub_button[subIndex], IsSub: true, I: index});
        Menu.SetMenu();
    },
    SetMenu: function () {
        if (Menu.Data.DrakeButton.length > 0) {
            var item = _.cloneDeep(Menu.Data.Button);
            Menu.Data.Button = [];
            _.forEach(Menu.Data.DrakeButton, function (n, index) {
                Menu.Data.Button[index] = _.cloneDeep(item[n]);
                Menu.Data.Button[index].i = index;
            })
            Menu.Data.DrakeButton = [];
        }
        if (Menu.Data.DrakeSubButtonObj.DrakeSubButton.length > 0) {
            var i = Menu.Data.DrakeSubButtonObj.i;
            var subItem = _.cloneDeep(Menu.Data.Button[i].sub_button);
            console.log(Menu.Data.DrakeSubButtonObj);
            _.forEach(Menu.Data.DrakeSubButtonObj.DrakeSubButton, function (n, index) {
                Menu.Data.Button[i].sub_button[index] = _.cloneDeep(subItem[n]);
                Menu.Data.Button[i].sub_button[index].subi = index;
            });
            Menu.Data.DrakeSubButtonObj = {i: 0, DrakeSubButton: []};
        }

        var list = Menu.Data.Button;
        var length = list.length;
        $(".divMenu").html(Mustache.to_html(Menu.Temp.MenuItem, {
            itemList: list,
            addItem: !Menu.Data.SetOrder && !Menu.Data.SetSubOrder && length < 3,
            itemWidth: 100 / (Menu.Data.SetOrder || Menu.Data.SetSubOrder ? length : length == 3 ? 3 : length + 1)
        }));
        Menu.SetAction();
    },
    SetAction: function () {
        $(".btnItem").click(function () {
            Menu.ShowItem(this);
        }).mouseenter(function () {
            Menu.HoverItem();
        });
        $(".btnAddSubItem").click(function () {
            Menu.AddSubItem(this)
        });
        $(".btnAddItem").click(function () {
            Menu.AddItem();
        });
        $(".btnShowItem").click(function () {
            Menu.ShowSubItem(this);
        }).mouseenter(function () {
            Menu.HoverSubItem();
        });
        if (Menu.Data.SetOrder) {
            try {
                Menu.DrakeItem.destroy();
            }
            catch (e) {
            }
            Menu.DrakeItem = dragula([document.querySelector('#ulDragItem')], {direction: "horizontal"}).on("drop", function () {
                var li = $("#ulDragItem").find(".pre_menu_item");
                _.forEach(li, function (n, index) {
                    var i = $(n).attr("data-i");
                    Menu.Data.DrakeButton[index] = parseInt(i);
                });
            });
        }
        else {
            try {
                Menu.DrakeItem.destroy();
            }
            catch (e) {
            }
        }
        if (Menu.Data.SetSubOrder) {
            try {
                Menu.DrakeSubItem.destroy();
            }
            catch (e) {
            }
            Menu.DrakeSubItem = dragula([document.querySelector('#ulDragSubItem')]).on("drop", function () {
                var i = $("#ulDragSubItem").attr("data-i");
                var li = $("#ulDragSubItem").find("li");
                Menu.Data.DrakeSubButtonObj = {i: parseInt(i), DrakeSubButton: []};
                _.forEach(li, function (n, index) {
                    var subi = $(n).attr("data-subi");
                    Menu.Data.DrakeSubButtonObj.DrakeSubButton[index] = parseInt(subi);
                });
            });
        }
        else {
            try {
                Menu.DrakeSubItem.destroy();
            }
            catch (e) {
            }
        }
    },
    Publish: function () {
        var buttonList = [];
        _.forEach(Menu.Data.Button, function (n, i) {
            if (n.sub_button.length > 0) {
                var subList = [];
                _.forEach(n.sub_button, function (subn, subi) {
                    if (subn.type == "view") {
                        subList[subi] = {
                            name: subn.name,
                            type: subn.type,
                            url: subn.url
                        }
                    }
                    else if (subn.type == "click") {
                        subList[subi] = {
                            name: subn.name,
                            type: subn.type,
                            key: subn.key
                        }
                    }
                });
                buttonList[i] = {
                    name: n.name,
                    sub_button: subList
                }
            }
            else {
                if (n.type == "view") {
                    buttonList[i] = {
                        name: n.name,
                        sub_button: [],
                        type: n.type,
                        url: n.url
                    }
                }
                else if (n.type == "click") {
                    buttonList[i] = {
                        name: n.name,
                        sub_button: [],
                        type: n.type,
                        key: n.key
                    }
                }
            }
        });

        $.ajax({
            url: CONFIG.BASEURL + "/menu/crete",
            type: "post",
            dataType: "json",
            data: JSON.stringify({button: buttonList}),
            contentType: 'application/json',
            success: function (data) {
                if (data.code == 2000) {
                    Alert.Init({message: "发布成功"});
                }
                else {
                    Alert.Init({message: "发布失败，请检查", error: true});
                }
            }
        });
    },
    GetMenu: function () {
        $.getJSON(CONFIG.BASEURL + "/menu/get", {}, function (data) {
            if (data.code == 2000)
                if (data.data && data.data.menu && data.data.menu.button) {
                    Menu.Data.Button = data.data.menu.button;
                    _.map(Menu.Data.Button, function (n, i) {
                        n.active = false;
                        n.i = i;
                        n.showSub = false;
                        n.addSub = n.sub_button.length > 4 ? false : true;
                        _.map(n.sub_button, function (subn, subi) {
                            subn.subi = subi;
                            return subn;
                        });
                        return n;
                    });
                }
            Menu.SetMenu();
        })
    },
    GetCardList: function () {
        $.ajax({
            url: CONFIG.BASEURL + "/news/list",
            type: "post",
            dataType: "json",
            data: JSON.stringify({token: ""}),
            contentType: 'application/json',
            success: function (data) {
                if (data.code == 2000) {
                    Menu.Data.List = data.data;
                    Menu.Data.List = _.filter(Menu.Data.List, function (n) {
                        return n.newsItems && n.newsItems.length > 0;
                    })
                    _.map(Menu.Data.List, function (n, i) {
                        n.single = n.newsItems.length == 1 ? true : false;
                        n.first = n.newsItems[0];
                        n.itemList = _.filter(n.newsItems, function (n, i) {
                            return i != 0;
                        });
                        return n;
                    });
                }
                CardList.Init(Menu.Data.List);
            }
        });
    },
    Init: function () {
        Menu.GetMenu();
        Menu.GetCardList();
        $(".btnPublish").click(function () {
            Menu.Publish();
        });
        $(".btnPrevice").click(function () {
            Preview.Init(Menu.Data.Button, Menu.Data.List);
        });
        $(".btnMenuOrder").click(function () {
            // if (Menu.Data.SetSubOrder) {
            //     Menu.Data.SetSubOrder = false;
            //     $(".btnMenuSubOrder").html("菜单子排序");
            //     _.map(Menu.Data.Button, function (n, i) {
            //         n.showSub = n.active;
            //         n.addSub = n.sub_button.length > 4 ? false : true;
            //         return n;
            //     });
            // }
            Menu.Data.SetOrder = !Menu.Data.SetOrder;
            if (Menu.Data.SetOrder) {
                $(".btnMenuOrder").html("完成");
                _.map(Menu.Data.Button, function (n, i) {
                    if (n.showSub) {
                        n.showSub = !(Menu.Data.SetOrder && n.sub_button.length == 0);
                    }
                    n.addSub = false;
                    return n;
                });
            }
            else {
                $(".btnMenuOrder").html("菜单排序");
                _.map(Menu.Data.Button, function (n, i) {
                    n.showSub = n.active;
                    n.addSub = n.sub_button.length > 4 ? false : true;
                    return n;
                });
            }
            Menu.SetMenu();
        });
        // $(".btnMenuSubOrder").click(function () {
        //     if (Menu.Data.SetOrder) {
        //         Menu.Data.SetOrder = false;
        //         $(".btnMenuOrder").html("菜单排序");
        //         _.map(Menu.Data.Button, function (n, i) {
        //             n.showSub = n.active;
        //             n.addSub = n.sub_button.length > 4 ? false : true;
        //             return n;
        //         });
        //     }
        //     Menu.Data.SetSubOrder = !Menu.Data.SetSubOrder;
        //     if (Menu.Data.SetSubOrder) {
        //         $(".btnMenuSubOrder").html("完成");
        //         _.map(Menu.Data.Button, function (n, i) {
        //             if (n.showSub) {
        //                 n.showSub = !(Menu.Data.SetSubOrder && n.sub_button.length == 0);
        //             }
        //             n.addSub = false;
        //             return n;
        //         });
        //     }
        //     else {
        //         $(".btnMenuSubOrder").html("菜单子排序");
        //         _.map(Menu.Data.Button, function (n, i) {
        //             n.showSub = n.active;
        //             n.addSub = n.sub_button.length > 4 ? false : true;
        //             return n;
        //         });
        //     }
        //     Menu.SetMenu();
        // })
    }
};

$(function () {
    Menu.Init();
});





