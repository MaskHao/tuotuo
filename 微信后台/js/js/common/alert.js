/**
 * Created by EdenLiang on 2016/12/26.
 */

var Alert = {
    DefSet: {
        error: false,
        time: 0
    },
    Temp: {
        Alert: '<div class="publish_alert divAlertContent" style="display: none"><div class="pa_cont {{#error}}pa_error{{/error}}"><div class="pa_hd"><a class="pa_closed btnCloseAlert">X</a></div><div class="pa_bd">{{message}}</div></div></div>'
    },
    Remove: function () {
        $(".divAlertContent").fadeOut("normal", function () {
            $(".divAlertContent").remove();
        })
    },
    Init: function (options) {
        var def = {};
        $.extend(def, Alert.DefSet, options);
        $("body").append(Mustache.to_html(Alert.Temp.Alert, def));
        $(".divAlertContent").fadeIn("normal", function () {
            Alert.DefSet.time = setTimeout(Alert.Remove, 2000);
        });
        $(".btnCloseAlert").click(function () {
            if (Alert.DefSet.time) {
                clearTimeout(Alert.DefSet.time);
            }
            Alert.Remove();
        })
    }
}

