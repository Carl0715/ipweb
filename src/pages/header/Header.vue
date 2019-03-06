<template>
    <div>
        <header ref="scollElement">
            <div class="top-box">
                 <div class="top-list">
                     <ul class="left-collection">
                         <li @click="collection()">收藏本站</li>
                         <li>地址发布页</li>
                     </ul>
                     <ul class="user-list" v-if="loginSuss=='false'">
                         <li @click="clickLogin(2)">免费注册</li>
                         <li @click="clickLogin(1)">快速登录</li>
                     </ul>
                     <ul class="user-list login-list" v-if="loginSuss=='true' ">
                        <li class="qd" @click="qd()">{{this.SignIn}}</li>
                         <router-link  :to="{path:'/Account'}" tag="li" exact >个人中心</router-link>
                        <li class="msg" @click="goAccount()">
                           <span>提醒</span>
                           <i v-if="this.systemMsg!=0">{{this.systemMsg}}</i>
                        </li>
                        <li class="logout" @click="logout">退出</li>
                     </ul>
                 </div>
            </div>
            <!-- 签到 -->
            <div class="qd-box" v-if="qdShow==true" @click="closeBox"></div>
            <div class="qd-succ animated" :class="{bounceInUp:qdShow==true}"  v-if="qdShow==true">
                <p class="getmoney">恭喜您!,获得<span>+5</span>个色币</p>
                <p class="close"><span >{{this.i}}</span>s后关闭</p>
            </div>
            <!-- 签到 -->
            <div class="all_top">
                <div class="logo_box">
                     <router-link :to="{path:'/'}" tag="a" exact>
                        <img src="/static/image/index/logo.gif" alt="请稍等" class="logo">
                     </router-link>
                </div>
                <div class="search_box">
                    <input type="text" v-model="txt" placeholder="搜索更多精彩" @keyup.enter='searchConent(txt)'>
                    <i class="search_btn" @click="searchConent(txt)" ></i>
                </div> 
                <div class="log_before"></div>         
            </div>
            <div class="nav_all">
                <nav>
                    <ul class="nav_list">
                        <router-link :to="{path:'/'}" tag="li" exact>首页</router-link>
                        <router-link class="" :to="{path:'/WebRecommended'}" tag="li" exact > 站长推荐 </router-link>
                        <router-link class="" :to="{path:'/Domesticseries'}" tag="li" exact >国产精品 </router-link>
                        <router-link class="" :to="{path:'/JapanandSouthKorea'}" tag="li" exact >日韩精品 </router-link>
                        <router-link class="" :to="{path:'/EuropeanAmerican'}" tag="li" exact >欧美精品 </router-link>
                         <router-link class="" :to="{path:'/StockResources'}" tag="li" exact >绝版资源 </router-link>
                         <router-link class="" :to="{path:'/SexyPictures'}" tag="li" exact >性感套图 </router-link>
                         <router-link class="" :to="{path:'/vip'}" tag="li" exact >VIP专区</router-link>
                         <router-link class="" :to="{path:'/Offer'}" tag="li" exact >活动中心</router-link>                     
                    </ul>
                </nav>
            </div>
        </header>
        <Login ref="logins"></Login> 
    </div>
</template>
<script>
import Login from "@/pages/header/Login"
import axios from "axios"
import {getCookie,setCookie,delCookie} from "@/util/util.js"
import {mapGetters,mapActions} from "Vuex"
const qs = require('qs');
export default {
    name:"heademosders",
    components:{
        Login
    },
    data(){
        return{
            ins:0,
            headerList:[],
            show:0,
            login:false,
            BaennerList : [],
            footerlists :[],
            debottomlist :[],
            txt:"",
            showorhide:"",
            qdShow:false,/* 判断签到状态*/
            i:5,
            qdtxt:"签到",
            key:'',
            tip_num:0,
            islogin:""
        }
    },
    computed:{
        ...mapGetters([
            'toplist',
            'loginSuss',
            'SignIn',
            'systemMsg',
           
        ]),
        ...mapActions({
                gosucc:'gosucc',
                sign:'sign',
                money: 'money',
             })
    },
    activated(){

        this.islogin = getCookie("mykey");
    },
 mounted(){
    //  this.$refs.logins.getCodeImg();
    //  console.log(this.loginSuss)
    //  this.loginSuss = this.loginSuss+''
 },
methods:{
    // 跳转个人信息
    goAccount(){
            this.$router.push({ path:"Account",
                query:{
                    "num":5 ,
                }
            });
    },
    closeBox(){
        this.qdShow = false;
    },
    // 签到
    qd(){
        this.key = getCookie("mykey");
                axios.post('/index/index/check_in', 
                    qs.stringify(
                        {authkey:this.key}
                    ) 
                ).then((res) => {
                if(res.data.code==1){
                        this.$store.dispatch('sign', "已签到");
                        this.$store.dispatch('money', res.data.add_gold);
                        this.qdShow = true;
                        var timer = setInterval(()=>{
                            this.i--;
                            if(this.i <= 0 ){
                                this.qdShow = false;                    
                                clearInterval(timer);
                                this.i = 5;   
                            }
                        },1000);
                }else if(res.data.code==8){
                    this.$store.dispatch('sign', "已签到");
                    this.$message({
                            showClose: true,
                            message: res.data.msg
                        });
                }
                
                
                }).catch((error) => {
                    console.log(error);
                });
            
        
    },
        // 退出
    logout(){            
        this.$confirm('是否要退出本网站?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
                axios.post('/index/index/loginout').then((res)=>{
                    this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
                this.$store.dispatch('gosucc', 'false');
                this.$store.dispatch('sign', "签到");
                delCookie("username");
                delCookie("mykey");
                delCookie("code");
                delCookie("email");
                this.$router.push({ path:"/"});
                this.$router.go(0);
            }).catch((err)=>{
                console.log(err)

            })   
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消'
            });          
        });     

    },
    active (num) {
            this.ins=num;
        },
        showgame(num){
            this.show=num;
        },
        hidegame(){
            this.show=0;
        },

        loginShow(){
            this.login=true;
            setCookie("username","zhangsan",2)
        },
        close(){
            this.login=false; 
        } ,

        golist(){
            this.$router.push({name:"home"})
        },
        searchConent(txt){
        if(this.$route.path!='/Search'){
            if(txt =="" || txt == undefined || txt == null){
                this.$alert('请输入搜索内容',  {
                    confirmButtonText: '确定',     
                });
            }else{
                this.$router.push({
                    path:"Search",
                    query:{
                        "title":txt
                }
            });
                this.txt = '';
            }
        }else{
            if(txt =="" || txt == undefined || txt == null){
                this.$alert('请输入搜索内容',  {
                    confirmButtonText: '确定',     
                });
            }else{
                this.$parent.getListol(txt)                       
                this.txt = '';
            }
        }
    },

    //注册登录显示隐藏
    clickLogin(num){
            this.$refs.logins.login(num);
    },
    collection() {
        this.$message({
            showClose: true,
            message: '请按下Ctrl+D收藏本站',
            type:'success'
        });
    },
    
},

}
</script>

<style lang="scss">
@import url("../../assets/styles/reset.css");
@import url("../../assets/styles/animate.min.css");
// 签到
.qd-box{
    position:absolute;
    left:0px;
    top:0px;
    background:rgba(0, 0, 0, 0.7);
    width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
    height:100%;
    opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
    // display:none; 
    z-Index:999;  
}
.qd-succ{
    width: 451px;
    height: 279px;
    position:absolute;
    left: 50%;
    top:50%;
    margin-left: -225px;
    margin-top: -140px;
    z-index: 10000;
    background: url("/static/image/index/qd.png") center center no-repeat;
    padding-top: 185px;
    .getmoney{
        color: #444444;
        font-size: 18px;
        text-align: center;
        line-height: 52px;
        height: 52px;
        span{
            font-size: 24px;  
            color: #fc2b90;
        }
    }
    .close{
        height: 40px;
        line-height: 40px;
        padding-top: 10px;
        text-align: center;
        color: #ffffff;
    }
}
header{
    width: 100%;
    background-color: #292a30;
    .top-box{
        width: 100%;
        height: 40px;
        background-color: #232428;
        .top-list{
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            .left-collection{
                float: left;
                height: 40px;
                li{
                    margin-right: 15px;
                    height: 40px;
                    float: left;
                    line-height: 40px;
                    font-size: 14px;
                    cursor: pointer;
                    color: rgba(254, 254, 254, 0.5);
                    &:hover{
                       color: #fefefe;
                    }
                }
            }
            .user-list{
                float: right;
                height: 40px;
                padding: 14px 5px;
                li{
                    height: 12px;
                    line-height: 12px;
                    font-size: 14px;
                    padding: 0 10px;
                    float: left;
                     cursor: pointer;
                      color: rgba(254, 254, 254, 0.5);
                      &:hover{
                          color: #fc2b90;
                      }
                      &:nth-child(1){
                          border-right: 1px solid rgba(255, 255, 255, 0.5);
                      }
                }
            }
            .login-list{
                li{
                    border-right: 1px solid rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                    &:first-child{
                          border-right:0;
                      }
                    &:last-child{
                          border-right:0;
                      }
                }
                .qd{
                   
                    height: 27px;
                    background-color: #fc2c90;
                    border-radius: 4px;
                    line-height: 27px;
                    color: #fefefe;
                    font-size: 14px;
                    text-align: center;
                    margin-top: -8px;
                    &:hover{
                          color: #fefefe;
                      }
                    }
                .msg{
                    position: relative;
                    span{
                        display: block;
                        width: 100%;
                    }
                    i{
                        position: absolute;
                        left: 29px;
                        top:-13px;
                        display: block;
                        width: 18px;
                        height: 18px;
                        text-align: center;
                        line-height: 18px;
                        background-color: #fc2c90;
                        font-style:normal;
                        font-size: 12px;
                        color: #fff;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
    .all_top{
        width: 1200px;
        height: 70px;
        margin: 0 auto;
        overflow: hidden;
         .logo_box{
            width: 204px; 
          height: 54px;
            float: left;
            margin-left: 3px;
            a{
                display: block;
               width: 204px;
              height: 54px;
                margin-top: 10px;
                .logo{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
}
        }
    }
    .search_box{
        margin-top: 21px;
        float: right;
        width: 250px;
        height: 32px;
        background-color: #ffffff;
        border-radius: 4px;
        position: relative;
        input{
            display: block;
            width: 250px;
            height: 32px;
            background-color: #f5f2e6;
            border-radius: 4px;
            padding-left: 20px;
            padding-right: 50px;
            color: #999999;
        }
        input::-webkit-input-placeholder {
            color: #999999;
        }
        .search_btn{
            display: block;
            width: 18px;
            height: 18px;
            background: url("/static/image/index/search.png") center center no-repeat;
            position: absolute;
            right: 11px;
            top: 7px;
            cursor: pointer;
        }
    }
    .nav_all{
        width: 100%;
        height: 42px;
        background-color: #292a30;
        padding-top: 1px;
        border-top: 1px solid  #393b44;
        nav{
            width: 1200px;
            margin: 0 auto;
            .nav_list{
                width: 100%;
                height: 40px;
                li{
                    float: left;
                    cursor: pointer;
                    width: 102px;
                  height: 40px;
                    line-height: 40px;
                    color: #fefefe;
                    font-size: 17px;
                    text-align: center;
                    margin-right: 30px;
                    &:hover {
                        background-color: #fc2b90;
                    }
                    &:last-child{
                        margin-right: 0;
                    }
                }
                .active{
                     background-color: #fc2b90;
                }
            }
        }
    }
}
</style>