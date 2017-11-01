/**
 * Created by JaminHuang on 2016/12/19.
 */
/*
 * 梁斌
 * localstorage存储类
 */
var Storage = {
    isLocalStorage: window.localStorage ? !0 : !1,
    Set: function (item, value, isJson) {
        if (this.isLocalStorage) try {
            localStorage[item] = isJson ? JSON.stringify(value) : value
        } catch (e) {
            return
        }
    },
    Get: function (item, isJson) {
        if (this.isLocalStorage) try {
            return isJson ? localStorage[item] ? JSON.parse(localStorage[item]) : "" : localStorage[item]
        } catch (e) {
            return
        }
    },
    Del: function (item) {
        this.isLocalStorage && localStorage.removeItem(item)
    },
    Clear: function () {
        this.isLocalStorage && localStorage.clear()
    }
};
