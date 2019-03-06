import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Offer from '@/pages/offer/Offer'
import StockResources from '@/pages/StockResources/StockResources'
import WebRecommended from '@/pages/WebRecommended/WebRecommended'
import Animeseries from '@/pages/Animeseries/Animeseries'
import Domesticseries from '@/pages/Domesticseries/Domesticseries'
import EuropeanAmerican from '@/pages/EuropeanAmerican/EuropeanAmerican'
import JapanandSouthKorea from '@/pages/JapanandSouthKorea/JapanandSouthKorea'
import SexyPictures from '@/pages/SexyPictures/SexyPictures'
import Vip from '@/pages/Vip/Vip'
import Details from '@/pages/header/Details'
import Search from '@/pages/Search/Search'
import Account from '@/pages/Account/Account'
import List from '@/pages/List/List'
import Contact from '@/pages/Contact/Contact'
import PictureDetails from '@/pages/PictureDetails/PictureDetails'
Vue.use(Router)

export default new Router({
    // mode: "hash",
    mode: "history",
    linkActiveClass: "active",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 };

        }
    },
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/StockResources', name: 'stockresources', component: StockResources },
        { path: '/WebRecommended', name: 'WebRecommended', component: WebRecommended },
        { path: '/Animeseries', name: 'Animeseries', component: Animeseries },
        { path: '/Domesticseries', name: 'Domesticseries', component: Domesticseries },
        { path: '/EuropeanAmerican', name: 'EuropeanAmerican', component: EuropeanAmerican },
        { path: '/JapanandSouthKorea', name: 'JapanandSouthKorea', component: JapanandSouthKorea },
        { path: '/SexyPictures', name: 'SexyPictures', component: SexyPictures },
        { path: '/Vip', name: 'Vip', component: Vip },
        { path: '/Search', name: 'Search', component: Search },
        { path: '/Details', name: 'Details', component: Details },
        { path: '/Offer', name: 'Offer', component: Offer },
        { path: '/Account', name: 'Account,', component: Account, },
        { path: '/List', name: 'List', component: List },
        { path: '/Contact', name: 'Contact', component: Contact },
        { path: '/PictureDetails', name: 'PictureDetails', component: PictureDetails },
        // { path: '/Account,', name: 'Account,', component: Account, meta: { login_require: false }, },
        { path: '*', redirect: { name: 'home' } }
    ],

})