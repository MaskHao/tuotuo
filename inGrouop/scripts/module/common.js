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
    serviceMask: function(bool,func) {
        if (bool) {
            $("body").append(Common.temp.mask);
            func && $(".divMask").on('click touchstart', function () {
                $(".divMask").remove(), func();
            })
        } else $(".divMask").remove();
    },
    checkMobile: function (obj) {
        if (/^1(3|4|5|7|8)\d{9}$/.test(obj))
            return true;
        else
            return false;
    },
    checkIdcard: function (code) {
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var tip = "";
        var pass = true;
        var isNumber =  /^[0-9]+.?[0-9]*$/;

        if(code.length >0 && !isNumber.test(code.substr(-1))){
            var lastCode = (code.substr(-1)).toUpperCase();
            if(code.length == 15){
                code = code.substr(0,14);
                code += lastCode;
            }else if(code.length == 18){
                code = code.substr(0,17);
                code += lastCode;
            }
        }
        if (!code || !/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }

        else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        return pass;
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
    setTreeNode: function (areaList) {
        if (areaList.length > 0) {
            var treeData = areaList.map(function (s) {
                if (s.childAreaVoList.length > 0) {
                    return {
                        text: s.areaName,
                        id: s.areaId.toString(),
                        nodes: Common.setTreeNode(s.childAreaVoList)
                    }
                } else {
                    return {
                        text: s.areaName,
                        id: s.areaId.toString(),
                    }
                }
            });
            return treeData;
        }
        else
            return [];
    },
};



