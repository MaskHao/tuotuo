/**
 * Created by Eden on 2017/4/15.
 */

var Common = {
    temp: {
        mask: '<div class="mask divMask"></div>',
        formAlert: '<div class="poup divPoup"><div class="poup-alert tran">{{msg}}</div></div>',
        loading: '<div class="pageLoading"><img src="Content/images/loading.gif"></div>'
    },
    data: {
        role: ["require", "email", "idcard", "mobile"],
        formAlertTime: null
    },
    showFormAlert: function (bool, msg) {
        $(".divPoup").remove();
        if (Common.data.formAlertTime) {
            window.clearInterval(Common.data.formAlertTime);
            Common.data.formAlertTime = null;
        }
        if (bool) {
            $("body").append(Mustache.to_html(Common.temp.formAlert, {msg: msg}));
            Common.data.formAlertTime = setTimeout(function () {
                Common.showFormAlert(false);
            }, 2000);
        }
    },
    formatDate: function (time, fmt) {
        var o = {
            "M+": time.getMonth() + 1, //月份
            "d+": time.getDate(), //日
            "h+": time.getHours(), //小时
            "m+": time.getMinutes(), //分
            "s+": time.getSeconds(), //秒
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度
            "S": time.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    getDaybyUnit: function (str) {
        var day = 1;
        switch (str) {
            case "年":
                day = 365;
                break;
            case "季":
                day = 90;
                break;
            case "月":
                day = 30;
                break;
            case "日":
                day = 1;
                break;
        }
        return day;
    },
    getTypebyUnit: function (str) {
        var type = 'days';
        switch (str) {
            case "年":
                type = 'years';
                break;
            case "季":
                type = 'quarters';
                break;
            case "月":
                type = 'months';
                break;
            case "日":
                type = 'days';
                break;
        }
        return type;
    },
    showMask: function (bool, func) {
        if (bool) {
            $("body").append(Common.temp.mask);
            func && $(".divMask").click(function () {
                $(".divMask").remove(), func();
            })
        } else $(".divMask").remove();
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    request: function (url, data, call, type) {
        return $.ajax({
            url: CONFIG.BASEURL + url,
            data: JSON.stringify(data),
            type: type ? type : "post",
            dataType: "json",
            contentType: "multipart/form-data",
            success: function (data) {
                call && call(data);
            }
        })
    },
    WXrequest: function (url, data, call, type) {
        return $.ajax({
            url: CONFIG.WXURL + url,
            data: JSON.stringify(data),
            type: type ? type : "post",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                call && call(data);
            }
        })
    },
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    otherRequest: function (url, data, call, type) {
        return $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: type ? type : 'post',
            dateType: 'json',
            contentType: "application/json",
            success: function (data) {
                call && call(data);
            }
        })
    },
    addNum: function (num1, num2) {
        var baseNum, baseNum1, baseNum2;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
    },
    subNum: function (num1, num2) {
        var baseNum, baseNum1, baseNum2;
        var precision;// 精度
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    },
    addCookie: function (name, val, time) {
        var str = name + "=" + escape(val);
        if (time > 0) {
            var date = new Date();
            var ms = time * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
    },
    getCookie: function (name) {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == name) {
                return unescape(temp[1]);
            }
        }
    },
    delCookie: function (name) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toGMTString();
    },

};



