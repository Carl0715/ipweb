<template>
    <div>
        <Header ref="getAdList"></Header>
        <div class="Gbox">
             <div class="Gbox-left">
                 <div class="person">个人中心</div>
                 <ul class="Gbox-ul">
                    <li  v-for="(item,index) in personData" :key="index" :class="{active:index == itemImdex}" @click="change(index)">
                        <i :style="{background:'url('+(item.img)+')',width:item.width,height:item.height,top:item.top,left:item.left}"></i>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
             </div>
            <component :is='currentView'></component>
        </div>
        <Gotop></Gotop>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/pages/header/Header"
import Content from "@/pages/header/Content"
import Footer from "@/pages/footer/Footer"
import {mapGetters,mapActions} from "Vuex"
import {isUsername,isEmail,getCookie} from '@/util/util.js'
import MyItem from "@/pages/header/MyItem"
import Userinfro from "@/pages/Account/Userinfro"
import safety from "@/pages/Account/safety"
import MoneyCont from "@/pages/Account/MoneyCont"
import WatchCont from "@/pages/Account/WatchCont"
import MineCont from "@/pages/Account/MineCont"
import Systemsm from "@/pages/Account/Systemsm"
import Gotop from "@/pages/header/Gotop"
import Axios from 'axios'
const qs = require('qs')
export default {
    name:"account",
    data(){
        return{
            //左边导航
            personData:[
                {img:'/static/image/person/person1.png',name:"基本资料",width:"19px",height:"17px",top:"12px",left:"38px",class:""},
                {img:'/static/image/person/person4.png',name:"安全中心",width:"14px",height:"16px",top:"12px",left:"39px",class:""},
                {img:'/static/image/person/person5.png',name:"金币记录",width:"12px",height:"16px",top:"12px",left:"40px",class:""},
                {img:'/static/image/person/person3.png',name:"观看记录",width:"18px",height:"18px",top:"11px",left:"37px",class:""},
                {img:'/static/image/person/person2.png',name:"收藏中心",width:"18px",height:"17px",top:"12px",left:"37px",class:""},
                {img:'/static/image/person/person6.png',name:"系统消息",width:"18px",height:"22px",top:"10px",left:"38px",class:""},
            ],
            num:0,
            itemImdex:0,
            //金币记录
            authkey:'',//key值
            arr:[Userinfro,safety,MoneyCont,WatchCont,MineCont,Systemsm]
        }
    },
    // directives: {
    //     scroll: {
    //         bind: function (el, binding){
    //         window.addEventListener('scroll', function() {
    //             if(document.documentElement.scrollTop + document.documentElement.clientHeight  >= document.documentElement.scrollHeight) {
    //             let loadData = binding.value
    //             loadData()
    //             }
    //         })
    //         }
    //     }
    // },
    activated(){
        //获取个人信息
        var authkey = this.authkey = getCookie('mykey');
        this.islogin();
    },
    methods:{
        change(idx){
            this.num=idx;
            this.itemImdex=idx;
        },
        islogin(){
            var key = getCookie("mykey");
            if(!key){
                this.$store.dispatch('gosucc', 'false');
                this.$router.push({ path:"/"});
            }
                if(this.$route.query.num){
                    if(this.$route.query.num==5){
                        this.num=5;
                        this.itemImdex=5;
                    }
                }else{
                    this.num=0;
                    this.itemImdex=0;
                }
        }
    },
    computed:{
        ...mapGetters([
            'username'
        ]),
        ...mapActions({
                gosucc:'gosucc',
             }),
        currentView(){
            return this.arr[this.num]
        }

    },
    components:{
        Header,
        Footer,
        Userinfro,
        safety,
        MoneyCont,
        WatchCont,
        MineCont,
        Systemsm,
        Gotop
       
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/mixins.scss';
@import '../../assets/styles/account.scss';
</style>


