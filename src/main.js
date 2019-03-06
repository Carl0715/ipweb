// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'Vuex'
import App from './App'
import router from './router'
import axios from "axios"
import "@/assets/styles/reset.css"
import $ from 'jquery'
import baseURL from '@/util/api.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'video.js/dist/video-js.css'
import store from '@/store'
// import VueScroller from 'vue-scroller'
import VueLazyload from 'vue-lazyload'


import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

let Base64 = require('js-base64').Base64;
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// Vue.use(iView);
Vue.prototype.baseURL = baseURL;
axios.defaults.baseURL = process.env.BASE_API;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueLazyload);

router.afterEach( ( transition ) => {
    setTimeout(()=>{
        var _hmt = _hmt || [];
        (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?5e8b267eb481e82133ca3c41c5d5db9d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
        })();
    },0);
} );

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})