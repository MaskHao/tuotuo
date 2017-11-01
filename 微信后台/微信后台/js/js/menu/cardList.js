/**
 * Created by EdenLiang on 2016/12/21.
 */
var CardList = {
    Data: {
        List: [],
        BaseList: [],
        MediaId: "",
        ScrollTop:0,
        Search: {title: ""}
    },
    Temp: {
        Content: '<div class="material_library"><div class="ml_cont"><div class="ml_hd"><span>选择素材</span><a class="pop_closed btnCloseCard"></a></div><div class="ml_bd"><div class="ml_bd_fn"><div class="fn_serch"><input type="text" placeholder="标题" class="msg_serch txtCardListSearch" value="{{title}}"><a class="serch"><i class="icon16_common serchImg"></i></a></div></div><div class="ml_bd_cont divSearchContent"></div></div><div class="ml_ft"><a class="btn btn_success btnSubmitCard">确定</a><a class="btn btn_default btnCloseCard">取消</a></div></div></div>',
        Card: '<div class="card cardList">{{#list}}{{#single}}<div data-id="{{mediaId}}" class="card_list btnSelectCard"><a class="cl_cont"><p class="cl_hd">{{first.title}}</p><div class="cl_hdPic" style="background-image: url({{first.thumbLink}})"></div><p class="cl_des">{{first.description}}</p><hr><p class="cl_ft">阅读全文<span>&gt;</span></p></a>{{#select}}<div class="mask" style="display: block"><i class="icon_card_selected"></i></div>{{/select}}</div>{{/single}}{{^single}}<div data-id="{{mediaId}}" class="card_list btnSelectCard"><div class="cl_cont2"><a class="cl_top"><div class="cltPic" style="background-image:url({{first.thumbLink}})"></div><p class="cltWord">{{first.title}}</p></a>{{#itemList}}<div class="cl_ct"><a class="tow"><p><span>{{title}}</span></p><div class="pic" style="background-image:url({{thumbLink}})"></div></a></div>{{/itemList}}</div>{{#select}}<div class="mask" style="display: block"><i class="icon_card_selected"></i></div>{{/select}}</div>{{/single}}{{/list}}</div>'
    },
    GetList: function (mediaId) {
        CardList.Data.MediaId = mediaId;
        $(".divCardList").html(Mustache.to_html(CardList.Temp.Content, CardList.Data.Search));
        $(".btnCloseCard").click(function () {
            $(".divCardList").html("");
        });
        $(".btnSubmitCard").click(function () {
            $(".divCardList").html("");
            MenuContent.EditViewLimited(CardList.Data.MediaId);
        });
        $(".txtCardListSearch").keyup(function () {
            CardList.Data.Search.title = $(this).val();
            CardList.SetCardList();
        });
        CardList.SetCardList();
    },
    SetCardList: function () {
        var title = _.trim(CardList.Data.Search.title);
        if (title)
            CardList.Data.List = _.filter(CardList.Data.BaseList, function (n) {
                return _.some(n.newsItems, function (s) {
                    return s.title.indexOf(title) != -1;
                });
            });
        else
            CardList.Data.List = _.cloneDeep(CardList.Data.BaseList);
        _.map(CardList.Data.List, function (n) {
            n.select = n.mediaId == CardList.Data.MediaId;
            return n;
        });
        $(".divSearchContent").html(Mustache.to_html(CardList.Temp.Card, {
            list: CardList.Data.List
        }));
        var options = {
            srcNode: '.card_list',
            margin: '10px 20px',
            width: '300px',
            max_width: '',
            resizable: true,
            transition: 'none'
        };
        $('.ml_bd_cont .card').gridify(options);
        $(".cardList").scrollTop(CardList.Data.ScrollTop);
        $(".btnSelectCard").click(function () {
            CardList.Data.ScrollTop = $(".cardList").scrollTop();
            var mediaId = $(this).attr("data-id");
            CardList.GetList(mediaId);
        });
    },
    Init: function (list) {
        $.extend(CardList.Data, {List: _.cloneDeep(list), BaseList: _.cloneDeep(list)});
    }
};