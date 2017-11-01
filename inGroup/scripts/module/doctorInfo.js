/**
 * Created by Eden on 2017/4/19.
 */

var DoctorInfo = {
    getDoctorUserId: function () {
        return "10303";
        return window.HMDoctorJS.getDoctorUserId();
    },
    getDoctorUserName: function () {
         return "tianqibucuo";
        return window.HMDoctorJS.getDoctorUserName();
    },
    getPagerTitle: function (title) {
        return false;
        window.HMDoctorJS.getPageTitle(title);
    },
    check: function () {
        return true;
        var pass;
        if (window.HMDoctorJS && window.HMDoctorJS.getDoctorUserId && window.HMDoctorJS.getDoctorUserName && window.HMDoctorJS.getPageTitle) {
            pass = true;
        } else {
            pass = false;
        }

        return pass;
    },
    getSourceCode: function () {
        return 'inGroup';
    },
    goAddRecord: function (userId) {
        window.HMDoctorJS.goAddRecord(userId);
    }

};






