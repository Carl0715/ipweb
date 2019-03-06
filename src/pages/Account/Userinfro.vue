<template>
<div class="Gbox-content">
    <div class="Gbox-top">
        <ul class="ul-left">
            <li>
                <span class="name">用户名:</span>
                <span class="nameRight">{{username}}</span>
            </li>
            <li>
                <span class="name">用户等级:</span>
                <span class="nameRight">{{level}}</span>
                 <router-link class="goUp" :to="{path:'/vip'}" tag="a" exact >升级</router-link>
            </li>
            <li>
                <span class="name">拥有金币:</span>
                <span class="nameRight">{{this.getmoney}}金币</span>
                <div>
                    <i class="question"></i>
                     <router-link class="Amoney" :to="{path:'/Offer'}" tag="a" exact >关于金币</router-link>         
                </div>
            </li>
        </ul>
        <ul class="ul-right">
            <li>
                <span class="name">累计观看:</span>
                <span class="nameRight">{{watch_num}}</span>
            </li>
            <li>
                <span class="name">{{level=='VIP'?'到期时间:':'注册时间:'}}</span>
                <span class="nameRight">{{dateTime}}</span>
            </li>
        </ul>
    </div>
    <div class="Gbox-bottom">
        <div class="toLink">
            <span >专属分享链接:</span>
            <p>{{urlMsg}}</p>
            <el-button type="primary" class="copy" v-clipboard:copy="urlMsg" v-clipboard:success="suc">复制链接</el-button>
            <el-button type="primary" class="procu" @click="downs()">生成二维码</el-button>
        </div>
        <ul class="text">
            <li>独乐乐不如众乐乐！</li>
            <li>使用您的专属分享链接或二维码把本站分享给朋友，将获得金币奖励！</li>
            <li>金币可用于观看VIP级别的精彩视频！</li>
            <li>分享专属链接到<span class="span1">微信、QQ好友、朋友圈、论坛</span>会得到更多点击哟</li>
            <li>每个朋友的点击系统会奖励<span class="span2">1个金币</span>，每个朋友通过你的专属链接注册系统会奖励<span class="span2">6个金币</span></li>
        </ul>
    </div>
</div>
</template>

<script>
import {mapGetters,mapActions} from "Vuex"
import {getCookie,delCookie} from '@/util/util.js'
import Axios from 'axios';
const qs = require('qs');
export default {
    name:'userinfro',
    data(){
        return{
            watch_num:0,            //观看数量
            level:'',               //等级
            dateTime:'',            //注册时间
            gold:0,                  //金币数量
            urlMsg:'',
            authkey:'',
            codeimg:"",
        }
    },
    mounted(){
        //获取个人信息
        this.authkey = getCookie('mykey');
        Axios.post('/index/index/get_user_info',
                    qs.stringify({
                        authkey:this.authkey
                    })).then((res)=>{
                        if(res.data.code==1){
                            var data = res.data.data;
                            this.watch_num = data.cumulative_watch==0?0:data.cumulative_watch+'部';
                            this.level = data.level;
                            this.dateTime = data.time;
                            this.gold = data.gold;
                            var defaultUrl = window.location.host;
                            this.urlMsg = defaultUrl+data.promotion;
                            this.codeimg =res.data.qrcode_url;
                            this.$store.dispatch('money', data.gold);
                        }else if(res.data.code==2){
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            })
                            this.$store.dispatch("gosucc",'false');
                            delCookie("username");
                            delCookie("mykey");
                            delCookie("code");
                            this.$router.push({ path:'/'});
                            this.$router.go(0);
                        }
                    })
    },
    methods:{

        downs(){
            var alink = document.createElement("a");
            alink.href = this.codeimg;
            alink.download = "推广二维码"; //图片名
            alink.click()
        }, 
        //复制成功提示
        suc(){
            this.$message({
                message: '复制成功',
                type: 'success'
            });
        },
    },
    computed:{
        ...mapGetters([
            'username',
            'getmoney'
        ]),
        ...mapActions([
            'money',
            'gosucc'
        ])
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/account.scss';
</style>
