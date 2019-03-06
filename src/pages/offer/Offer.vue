<template>
    <div>
        <Header ref="getAdList"></Header>
        <div class="box-shade">
             <div class="offer-content">
                <ul class="left-title">
                    <li :class="{active:ins==0}"  @click="changeActive(0)">金币任务</li>
                    <li :class="{active:ins==1}"  @click="changeActive(1)">关于金币</li>
                    <li :class="{active:ins==2}"  @click="changeActive(2)">优惠活动</li>
                </ul>
                <div class="right-content">
                    <ul class="same-list animated" v-show="ins==0 && details!=1"
                        :class="{bounceInRight:ins==0}" 
                    >
                        <li  @click="DetailsShow(0,1)" v-for="(item,idx) in golds" :key="idx">
                            <img :src="item.img" alt="">
                            <p>{{item.activity_name}}</p>
                        </li>
                    </ul>
                    <div class="offer-dtails" 
                         v-show="ins==0 && details==1"
                     >        
                        <h3>分享好友，欢乐加倍，激情满满</h3>
                        <div class="Introduction">
                            <p>独乐乐不如众乐乐,呼朋唤友来看片！</p>
                            <p>欢乐加倍，激情满满！</p>
                            <p>使用您的专属分享链接或二维码把本站分享给朋友，将获得金币奖励！</p>
                            <p>金币可用于观看VIP级别的精彩视频！</p>
                        </div>
                      
                        <p>分享专属链接到<span>微信、</span><span>QQ好友、</span><span>朋友圈、</span><span>论坛</span>会得到更多金币哟</p>
                        <p>个朋友的点击系统会奖励<span>1个金币</span>,每个朋友通过你的专属链接注册系统会奖励<span>6个金币</span></p>
                        <!-- <div class="copy-box">
                            <span>专属分享链接 : </span>
                            <input type="text" name="" id="" readonly="true" v-model="value">
                            <span 
                                v-clipboard:copy="value"  
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            >复制链接</span>
                        </div>
                        <div class="two-code">
                            <img :src="codeimg" alt="">
                            <p @click="downs()">下载二维码</p>
                        </div> -->
                    </div>
                    <div class="about-money animated" v-show="ins==1"
                     :class="{bounceInRight:ins==1}" 
                    >
                        <h3>关于金币</h3>  
                        <div class="same-div">
                            <h4>获取途径</h4>
                            <p>1.金币可通过网站活动获取，根据活动不同可获取不同数额的金币。</p>    
                            <p>2.金币可通过合作游戏网站游戏记录兑换。</p>    
                        </div>             
                        <div class="same-div">
                                <h4>金币用途</h4>
                                <p>1.消费金币可在本网站<span>观看VIP级别的精品、稀有资源。</span></p>    
                                <p>2.金币可<span>兑换</span>合作游戏网站<span>筹码，赢取现金。</span></p>    
                            </div>             
                        </div>
                    <ul class="same-list animated" v-show="ins==2"
                        :class="{bounceInRight:ins==2}"
                    >
                        <li v-for="(item,idx) in discounts" :key="idx">
                            <img :src="item.img" alt="">
                            <p>{{item.activity_name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Gotop></Gotop>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/pages/header/Header"
import Content from "@/pages/header/Content"
import Footer from "@/pages/footer/Footer"
import Gotop from "@/pages/header/Gotop"
import {getCookie} from '@/util/util.js'
import axios from 'axios';
const qs = require('qs');
export default {
    name:"offer",
    data(){
        return{
            ins:0,
            value:"",
            details:0,
            codeimg:"",
            type:1,
            golds:[],//金币任务
            discounts:[],//优惠活动
            gold_intro:[]//关于金币
        }
    },
    created(){

    },
    mounted(){
    },
    activated(){
        this.Offerload()
    },
    methods:{
        
        Offerload(){
            this.details=0;
            this.authkey = getCookie('mykey');
            axios.post('/index/index/activity_list',
                qs.stringify({
                    type:this.type
                })).then((res)=>{
                    if(res.data.code==1){
                        console.log(res.data)
                        this.golds = res.data.list;
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
        },
        changeActive(num){
            this.ins = num;
            this.details = 0;
            this.type = num+1;
            axios.post('/index/index/activity_list',
                qs.stringify({
                    type:this.type
                })).then((res)=>{
                    if(res.data.code==1){
                        if(this.type==1){
                            this.golds = res.data.list;
                            console.log(this.golds)
                        }else if(this.type==2){
                            this.gold_intro = res.data.list;
                            console.log(this.gold_intro)
                        }else{
                            this.discounts = res.data.list;
                            console.log(this.discounts)
                        }
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
        },
        DetailsShow(num,numtwo){
              this.ins = num;
              this.details = 1;
        },
         // 复制成功
        onCopy(e){
        this.$message({
            message: '复制成功',
            type: 'success'
        });
        },
        // 复制失败
        onError(e){
            this.$message({
                message: '复制失败，请重新复制',
                type: 'warning'
            });
        },
        downs(){
            var alink = document.createElement("a");
            alink.href = this.codeimg;
            alink.download = "推广二维码"; //图片名
            alink.click()
        }

    },
    components:{
        Header,
        Footer,
       Gotop
    },
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";
.box-shade{
    width: 100%;
    background-color: #24242e;
    padding-top: 18px;
    min-height: 776px;
    .offer-content{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        .left-title{
            width: 150px;
            height: 503px;
            float: left;
            margin-right: 20px;
            background-color: #3d3d4e;
            li{
                width: 150px;
                height: 50px;             
                line-height: 50px;
                text-align: center;
                color: #ffffff;
                font-size: 18px;
                cursor: pointer;
                &:hover{
                    background-color: #fc2b90;
                }
                &.active{
                    background-color: #fc2b90;
                }
            }
        }
        .right-content{
            float: right;
            width: 1030px;
            min-height: 503px;
            background-color: #24242e;
            .same-list{
                width: 100%;
                overflow: hidden;
                li{
                    width: 330px;
                    height: 240px;
                    float: left;
                    cursor: pointer;
                    background-color: #3d3d4e;                  
                    border: solid 1px #55556e;
                    margin-right: 20px;
                    margin-bottom: 20px;
                    &:nth-child(3n){
                        margin-right: 0;
                    }
                    &:hover{
                        border: solid 1px #fc2b90;
                    }
                    img{
                        display: block;
                        width: 328px;
	                    height: 198px;
                    }
                    p{
                        width: 100%;
                        text-align: -webkit-center;
                        color: #ffffff;
                        height: 40px;
                        line-height: 40px;
                        @include ellipsis();
                    }
                }
            }
            // 金币详情
            .offer-dtails{
                width: 100%;
                min-height: 503px;
                background-color: #3d3d4e;
                color: #ffffff;
                padding-bottom: 56px;
                h3{
                    font-size: 24px;
                    line-height: 52px;
                    height: 52px;
                    text-align: center;
                    padding-top: 10px;
                }
                .Introduction{
                    width: 100%;
                    text-align: center;
                    padding-top: 30px;
                    padding-bottom: 15px;
                    p{
                        color: #ffffff;
                        opacity: 0.5;
                        line-height: 26px;
                        height: 26px;
                    }
                }
                & > p {
                    font-size: 18px;
                    line-height: 36px;
                    height: 36px;
                    text-align: center;
                    &:nth-child(3) span{
                        color: #3eff0a;
                    }
                    &:nth-child(4) span{
                        color: #fa8b42;
                    }
                }
                .copy-box{
                    width: 100%;
                    text-align: center;
                    font-size: 0;
                    padding-top: 30px;
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        text-align: center;
                        color: #ffffff;
                        font-size: 18px;
                        &:nth-child(3){
                            width: 136px;
                            height: 50px;
                            background-color: #292a30;
                            line-height: 50px;
                            cursor: pointer;
                        }
                    }
                    input{
                        display: inline-block;
                        vertical-align: middle;
                        padding-left: 10px;
                        width: 600px;
                        height: 50px;
                        background-color: #efefef;
                        box-shadow: inset 0px 0px 4px 1px 
                            rgba(4, 0, 0, 0.52);
                        font-size: 16px;
                        border: 0;
                        margin-left: 10px;
                        &::placeholder{
                            color: #5f5d5d;
                        }
                    }
                }
                .two-code{
                    width: 160px;
                    height: 190px;
                    background-color: #292a30;
                    margin: 30px auto 0 auto;
                    padding-top: 10px;
                    img{
                        display: block;
                        width: 140px;
                        height: 140px;
                        margin: 0 auto;
                    }
                    p{
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        color: #ffffff;
                        cursor: pointer;
                    }
                }
            }
            .about-money{
                width: 100%;
                min-height: 503px;
                background-color: #3d3d4e;
                color: #ffffff;
                h3{
                    font-size: 24px;
                    height: 52px;
                    line-height: 52px;
                    text-align: center;
                }
                .same-div{
                    width: 100%;
                    margin-top: 70px;
                    padding-left: 76px;
                    h4{
                        font-size: 20px;
                        line-height: 36px;
                        height: 36px;
                    }
                    p{
                        font-size: 16px;
                        height: 30px;
                        line-height: 30px;
                        span{
                            color: #fa8b42;
                        }
                    }
                }
            }
        }
    }
}

</style>

