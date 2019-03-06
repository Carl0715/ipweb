import { getCookie } from '@/util/util.js'

const state = {
    toplist: [],
    adListone: [],
    adListtwo: [],
    DetailsAdvicing: [],
    BaennerList: [],
    leftnav: [],
    loginSuss: getCookie("loginSuss") || 'false',
    username: getCookie("username") || "username",
    SignIn: getCookie("SignIn") || "签到",
    getmoney: getCookie("getmoney") || 0,
    systemMsg: getCookie("systemMsg") || 0,
    new_placeholder: getCookie("email") || '',
    uid:getCookie("uid") || '',
    // loginSuss: JSON.parse(localStorage.getItem("loginSuss")) || false,
    // username: JSON.parse(localStorage.getItem("username")) || "username",
    // SignIn: JSON.parse(localStorage.getItem("SignIn")) || "签到",
    count: 0,

}

export default state