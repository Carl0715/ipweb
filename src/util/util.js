import axios from "axios"
import baseURLs from "@/util/api.js"
const qs = require('qs');

//获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    // exdate.setDate(exdate.getDate() + expiredays);
    exdate.setTime(exdate.getTime() + expiredays * 4 * 60 * 60 * 1000);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};


//邮箱验证正则
export function isEmail(str) {
    var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
};

// 用户名正则表达式
export function isUsername(str) {
    var reg = /[a-zA-Z\d+]{6,16}/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
};



export function getHeadList() {
    axios.post(this.baseURL.baseURL + '/index/index/getadvs',
        qs.stringify({ site_id: 1 })
    ).then((res) => {
        window.scrollTo(0, 0);
        var data = res.data;
        resolve(data)
    }).catch((error) => {
        console.log(error);
    });
}