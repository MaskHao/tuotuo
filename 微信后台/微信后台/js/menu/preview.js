/**
 * Created by EdenLiang on 2016/12/21.
 */
var Preview = {
    Data: {
        Button: [],
        List: []
    },
    Temp: {
        Content: '<div class="preview divPreview"><div class="pw_cont"><div class="pw_hd"><strong class="nickname">聚悦健康</strong></div><div class="pw_bd divPreviewCardContent"></div><div class="pw_ft"><ul class="pre_menu_list divPreviewMenu"></ul></div><a class="btn btn_default btnPreviewExit">退出预览</a></div></div>',
        PreviewItem: '{{#itemList}}<li class="pre_menu_item" style="width: {{itemWidth}}%;"><a class="pre_menu_link btnPreviewItem {{#active}}active{{/active}}" data-i="{{i}}"><i class="icon_menu_dot"></i><span>{{name}}</span></a><div class="sub_pre_menu_box" {{^showSub}}style="display: none;"{{/showSub}}><ul class="sub_pre_menu_list">{{#sub_button}}<li><a class="btnPreviewShowItem {{#subActive}}active{{/subActive}}" data-type={{type}} data-i="{{i}}" data-subi="{{subi}}"><span class="sub_pre_menu_inner ">{{name}}</span></a></li>{{/sub_button}}</ul><i class="arrow arrow_out"></i><i class="arrow arrow_in"></i></div></li>{{/itemList}}',
        Card: '{{#single}}<div data-id="{{mediaId}}" class="card_list"><a class="cl_cont" href="{{first.url}}" target="_blank"><p class="cl_hd">{{first.title}}</p><div class="cl_hdPic" style="background-image: url({{first.thumbUrl}})"></div><p class="cl_des">{{first.description}}</p><hr><p class="cl_ft">阅读全文<span>&gt;</span></p></a></div>{{/single}}{{^single}}<div data-id="{{mediaId}}" class="card_list"><div class="cl_cont2"><a class="cl_top" href="{{first.url}}" target="_blank"><div class="cltPic" style="background-image:url({{first.thumbUrl}})"></div><p class="cltWord">{{first.title}}</p></a>{{#itemList}}<div class="cl_ct"><a class="tow" href="{{url}}" target="_blank"><span>{{title}}</span><div class="pic" style="background-image:url({{thumbUrl}})"></div></a></div>{{/itemList}}</div></div>{{/single}}'
    },
    DoPreview: function (obj) {
        if (obj.type == "view" && obj.url) {
            window.open(obj.url);
        }
        else if (obj.type == "click") {
            var ViewLimitedItem = null;
            if (obj.key) {
                var ViewLimitedItem = _.find(Preview.Data.List, function (n) {
                    return n.mediaId == obj.key;
                });
            }
            if (ViewLimitedItem)
                $(".divPreviewCardContent").append(Mustache.to_html(Preview.Temp.Card, ViewLimitedItem));
        }
    },
    ShowPreviewSubItem: function (obj) {
        var index = $(obj).attr("data-i");
        var subIndex = $(obj).attr("data-subi");
        if (Preview.Data.Button[index] && Preview.Data.Button[index].sub_button[subIndex]) {
            Preview.DoPreview(Preview.Data.Button[index].sub_button[subIndex]);
            Preview.Data.Button[index].active = false;
            Preview.Data.Button[index].showSub = false;
            Preview.SetPreviewMenu();
        }
    },
    ShowPreviewItem: function (obj) {
        var index = $(obj).attr("data-i");
        if (Preview.Data.Button[index]) {
            if (Preview.Data.Button[index].sub_button && Preview.Data.Button[index].sub_button.length > 0) {
                _.map(Preview.Data.Button, function (n, i) {
                    if (i == index) {
                        n.active = n.active ? false : true;
                        n.showSub = n.showSub ? false : true;
                    }
                    else {
                        n.active = false;
                        n.showSub = false;
                    }
                    _.map(Preview.Data.Button[index].sub_button, function (subn) {
                        subn.subActive = false;
                        return subn;
                    });
                    return n;
                });
                Preview.SetPreviewMenu();
            }
            else {
                Preview.DoPreview(Preview.Data.Button[index]);
            }
        }
    },
    SetPreviewMenu: function () {
        var list = Preview.Data.Button;
        var length = list.length;
        $(".divPreviewMenu").html(Mustache.to_html(Preview.Temp.PreviewItem, {itemList: list, itemWidth: 100 / length}))
        $(".btnPreviewItem").click(function () {
            Preview.ShowPreviewItem(this);
        })
        $(".btnPreviewShowItem").click(function () {
            Preview.ShowPreviewSubItem(this);
        });
    },
    SetContent: function () {
        $(".divPreview").remove();
        $("body").append(Preview.Temp.Content);
        $(".btnPreviewExit").click(function () {
            $(".divPreview").remove();
        });
        Preview.SetPreviewMenu();
    },
    Init: function (button, list) {
        $.extend(Preview.Data, {Button: _.cloneDeep(button), List: list});
        _.map(Preview.Data.Button, function (n, i) {
            n.active = false;
            n.showSub = false;
            return n;
        });
        Preview.SetContent();
    }
};
