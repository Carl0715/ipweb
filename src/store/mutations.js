import * as types from './mutation-type.js'
import { setCookie, getCookie } from '@/util/util.js'
const mutations = {
    [types.SET_TOPLIST](state, toplist) {
        state.toplist = toplist;
        // localStorage.setItem('footerlist', JSON.stringify(footerlist));
    },
    [types.SET_ADLISTONE](state, adListone) {
        state.adListone = adListone
    },
    [types.SET_ADLISTTWO](state, adListtwo) {
        state.adListtwo = adListtwo
    },
    [types.DETAILSADVICONG](state, DetailsAdvicing) {
        state.DetailsAdvicing = DetailsAdvicing
    },
    [types.BANNERLIST](state, BaennerList) {
        state.BaennerList = BaennerList
    },

    [types.SET_LEFTNAV](state, leftnav) {
        state.leftnav = leftnav
    },
    [types.SET_COUNTADD](state, n) {
        state.count += n
    },
    [types.SET_COUNTREDUCE](state) {
        state.count--
    },
    [types.LOGINSUCC](state, loginSuss) {
        setCookie('loginSuss', loginSuss, 1);
        state.loginSuss = loginSuss
    },
    [types.USERNAME](state, username) {
        setCookie('username', username, 1);
        state.username = username
    },
    [types.SIGNIN](state, SignIn) {
        setCookie('SignIn', String(SignIn), 1);
        // localStorage.setItem('SignIn', JSON.stringify(SignIn));
        state.SignIn = SignIn
    },
    [types.GETMONEY](state, getmoney) {
        setCookie('getmoney', getmoney, 1);
        // localStorage.setItem('SignIn', JSON.stringify(SignIn));
        state.getmoney = getmoney
    },
    [types.SYSTEMMSG](state, systemMsg) {
        setCookie('systemMsg', systemMsg, 1);
        // localStorage.setItem('SignIn', JSON.stringify(SignIn));
        state.systemMsg = systemMsg
    },
    [types.NEW_PLACEHOLDER](state, new_placeholder) {
        setCookie('email', new_placeholder, 1);
        // localStorage.setItem('SignIn', JSON.stringify(SignIn));
        state.new_placeholder = new_placeholder
    },

    [types.UID](state, other_uid) {
        setCookie('uid', other_uid, 1);
        // localStorage.setItem('SignIn', JSON.stringify(SignIn));
        state.other_uid = other_uid
    },


}

export default mutations