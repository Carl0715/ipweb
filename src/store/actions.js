import * as types from './mutation-type.js'

export const gosucc = function({ commit }, succtype) {
    commit(types.LOGINSUCC, succtype)
}

export const user = function({ commit }, username) {
    commit(types.USERNAME, username)
}

export const sign = function({ commit }, SignIn) {
    commit(types.SIGNIN, SignIn)
}

export const money = function({ commit }, getmoney) {
    commit(types.GETMONEY, getmoney)
}
export const msg = function({ commit }, systemMsg) {
    commit(types.SYSTEMMSG, systemMsg)
}
export const placeholder = function({ commit }, new_placeholder) {
    commit(types.NEW_PLACEHOLDER, new_placeholder)
}
export const setuid = function({ commit }, other_uid) {
    commit(types.UID, other_uid)
}





















export const setadd = function({ commit }) {
    commit(types.SET_COUNTADD, 10)
}
export const setreduce = function({ commit }) {
    commit(types.SET_COUNTREDUCE)
}

// [types.SET_COUNTREDUCE](state) {
//     state.count-- 
// },