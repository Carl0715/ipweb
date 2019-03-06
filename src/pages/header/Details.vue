<template>
    <div>
        <Header ref="getAdList"></Header>
    
        <div class="conent_box">
            <ul class="Breadcrumbs">
                <router-link class="same-li" :to="{path:'/'}" tag="li" exact><span>爱啪网站</span><b>></b></router-link>
                <router-link class="same-li"  :to="{path:this.getrouters}" tag="li" exact><span>{{this.navName}}</span><b>></b></router-link>
                <li>{{title}}</li>
            </ul>
            <div class="video_boc">

                <div class="left_video" :style="style">
                    <div class="video_name">
                        <h4 class="title-name"> {{title}}</h4>
                    </div>
                    <div class="video_content" :style="style2">
                        <video  id="my-video"    class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto"  
                            :poster="source_img"
                            
                            v-html="this.source"
                            :style="style3">    
                           <!-- <source  id="source"  ref='videomeme' >  -->
                          <!-- <source  id="source"  ref='video'  type="application/x-mpegURL"> -->
                        <!-- <source  id="source"  :src="url"  type="application/x-mpegURL"> -->
                        </video>
                        
                        <a href="http://www.5008008.com" class="left-www" target="_blank">
                            <p> 下载app送8元</p>
                            <p>网址5008008.com</p>
                        </a>
                        <div class="details-shade" v-if="this.loginsuccess==true"></div>

                        <div class="visitor" v-if="this.MemberVideo==0">
                            <p>游客你好，今天已在本站观看 10 部影片，如需观看更多，</p>
                            <p>请<span @click="clickLogin(1)">登录</span>或<span  @click="clickLogin(2)">免费注册</span>为我们的会员，享受更多惊喜！</p>
                            <ul class="title-box">
                                <li></li>
                                <li>VIP会员尊享</li>
                                <li></li>
                            </ul>
                            <ul class="Introduction-box">
                                <li><i></i><span>全站免费</span></li>
                                <li><i></i><span>高清视频</span></li>
                                <li><i></i><span>播放流畅</span></li>
                            </ul>
                        </div>


                        <div class="visitor " v-if="this.MemberVideo==1">
                            <p>对不起，此视频仅对会员开放</p>
                            <p>请<span @click="clickLogin(2)"> 注册</span>为本站会员 或<span  @click="clickLogin(1)"> 登录</span></p>
                            <ul class="title-box">
                                <li></li>
                                <li>VIP会员尊享</li>
                                <li></li>
                            </ul>
                            <ul class="Introduction-box">
                                <li><i></i><span>全站免费</span></li>
                                <li><i></i><span>高清视频</span></li>
                                <li><i></i><span>播放流畅</span></li>
                            </ul>
                        </div>


                        <div class="visitor Member-video" v-if="this.MemberVideo==2">
                            <router-link class="govip" :to="{path:'/vip'}" tag="div" exact >开通VIP会员全站免费看</router-link>
                            <p class="Member-cz" @click="tovip">非会员需支付<span> {{video_price}}金币</span>观看此片></p>
                            <ul class="title-box">
                                <li></li>
                                <li>VIP会员尊享</li>
                                <li></li>
                            </ul>
                            <ul class="Introduction-box">
                                <li><i></i><span>全站免费</span></li>
                                <li><i></i><span>高清视频</span></li>
                                <li><i></i><span>播放流畅</span></li>
                            </ul>
                        </div>


                        <div class="visitor visitor-tip" v-if="this.MemberVideo==3">
                            <p class="member">对不起，此视频为收费视频，非会员需支付{{video_price}}金币观看</p>
                            <p class="member">开通本站VIP，免费畅看全站视频，更有专属VIP服务器，看片更爽！</p>
                            <div class="btn">
                                <el-button type="primary" @click="paymoney" class="paymoney">金币观看</el-button>
                                <el-button type="primary" @click="getVip" class="openvip">立即开通</el-button>
                            </div>
                            <ul class="title-box">
                                <li></li>
                                <li>VIP会员尊享</li>
                                <li></li>
                            </ul>
                            <ul class="Introduction-box">
                                <li><i></i><span>全站免费</span></li>
                                <li><i></i><span>高清视频</span></li>
                                <li><i></i><span>播放流畅</span></li>
                            </ul>
                        </div>


                        <div class="visitor visitor-tip" v-if="this.MemberVideo==4">
                            <p class="member">非VIP会员观看本视频需消费 {{video_price}} 金币</p>
                            <p class="member">确认支付 {{video_price}} 金币观看本视频</p>
                            <div class="btn">
                                <el-button type="primary" @click="getVip" class="openvip">VIP免费观看</el-button>
                                <el-button type="primary" @click="paygold" class="paymoney">金币观看</el-button>
                            </div>
                            <ul class="title-box">
                                <li></li>
                                <li>VIP会员尊享</li>
                                <li></li>
                            </ul>
                            <ul class="Introduction-box">
                                <li><i></i><span>全站免费</span></li>
                                <li><i></i><span>高清视频</span></li>
                                <li><i></i><span>播放流畅</span></li>
                            </ul>
                        </div>

                        <div class="visitor visitor-money" v-if="this.MemberVideo==5">
                            <p class="member" @click="earnmoney">对不起，您当前所持有的金币不足，点击赚取金币</p>
                            <div class="btn">
                                <el-button type="primary" @click="getVip" class="openvip">开通VIP</el-button>
                                <el-button type="primary" @click="earnmoney" class="paymoney">赚取金币</el-button>
                            </div>
                            <ul class="title-box">
                                <li></li>
                                <li>VIP会员尊享</li>
                                <li></li>
                            </ul>
                            <ul class="Introduction-box">
                                <li><i></i><span>全站免费</span></li>
                                <li><i></i><span>高清视频</span></li>
                                <li><i></i><span>播放流畅</span></li>
                            </ul>
                        </div>




                    </div>
                
                    <div class="typeof_box">
                        <p class="dis">
                            <i class="lookPeople"></i>
                            <span><b>{{lookPeople}}</b>已观看</span>
                        </p>
                        <ul class="typeof_list">
                            <a href="javascript:;" title="请收藏本站" class="collection" :class="{active:Selected==0}"  @click="collections()"><i class="coll-i"></i><span>{{collection}}</span></a>
                            <a  href="javascript:;" title="点赞此片" class="goodvideo" :class="{active:SelectedGood==0}"  @click="goodvideos()"><i class="good-i"></i><span>{{goodvideo}}</span></a>
                            <a  href="javascript:;" 
                            title="分享此片" 
                            class="share" 
                             v-clipboard:copy="this.urlhistory"  
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            
                            ><i class="shade-i"></i><span>分享</span></a>
                        </ul>
                    </div>
                </div>
                <div class="right_swipper" v-if="BaennerList.length!=0">
                    <div class="block">
                        <el-carousel  height="497px" :interval="3000" >
                            <el-carousel-item v-for="(item,index) in BaennerList" :key="index" @click="Gotoadurl(item.id,item.url)">
                                <a :href="item.url" target="_blank"><img :src="item.img" alt=""></a>
                            </el-carousel-item>
                        </el-carousel>
                    </div>       
                </div>
            </div>
            <div class="label-box">
                <ul class="label-list">
                    <li v-for="(item,index) in listTag" :key="index" @click="searchforTag(item.id,item.title)">{{item.title}}</li>
                </ul>
            </div>
            <div class="content_list">
                <div class="title_box">
                    <h3><span>猜你喜欢</span></h3>
                </div>
                <ul class="pic_list content" >
                    <li class="" 
                        v-for="(item,index) of LikeList" 
                        :key="index"
                        >
                        <div @click="GoDetails(item.id,item.url)" class="one-img">
                            <img  v-lazy="item.img"  alt="">
                            <div class="img-shade"></div>
                            <i class="play"></i>
                            <i class="vip" v-if="item.is_vip==1"></i>
                            <i class="time" v-if="item.timelong!=null">{{item.timelong}}</i>
                        </div>
                        <div class="two-title">
                            <p @click="GoDetails(item.id,item.url)">{{item.title}}</p>
                            <ul class="label">
                                <li v-for="(temp,i) in item.tags" :key="i"  @click="searchforTag(temp.id,temp.title)">{{temp.title}}</li>
                            </ul>   
                        </div>                                                                                        
                     </li>   
                    <!-- <my-item :lists="LikeList" :isshow="isshow" :loading="loading" :showone="showone"/>     -->
                </ul>
                
            </div>            
        </div>
        <Footer></Footer>
        <Login ref="logins"></Login>
    </div>
</template>


<script>
import Header from "@/pages/header/Header"
import Footer from "@/pages/footer/Footer"
import Login from "@/pages/header/Login"
import MyItem from "@/pages/header/MyItem"
import $ from 'jquery'
import axios from "axios"
import {baseURL} from "@/util/api.js"
import {getCookie,delCookie} from '@/util/util.js'
import { mapGetters , mapActions} from 'Vuex'
import videojs from 'video.js'
import 'videojs-contrib-hls'
 const qs = require('qs');
export default {
    name:"Detailss",
    data(){
        return{
            data:{},
            video_price:0,
            LikeList:[],/*猜你喜欢列表 */
            BaennerList:[],/*banner列表 */
            url:"",/*播放地址 */
            tag:"",/*标签*/
            title:"",/* 影片名字 */
            loveId:0,/*影片id */
            getrouters:"/WebRecommended",/*跳转到详情页的路由名称 */
            navName:"站长推荐",/*跳转到详情页的导航名字 */
            lookPeople:0,/*观看人数 */
            collection:0,/*收藏人数 */
            goodvideo:0,/*点赞人数 */
            share:1551,/*分享人数 */
            Selected:-1,/*小图标选中状态判断 */
            SelectedGood:-1,/*小图标点赞选中状态判断 */
            SelectedShade:-1,/*小图标分享选中状态判断 */
            loginsuccess:false,/*弹出登录对话框 */
            loading: false,/*是否显示loading */
            isshow:true,/*是否显示加载 */
            showone:false,/*是否显示加载提示文字 */
            videosss:true,/*播放器是否显示 */
            listTag:false,/*标签列表 */
            source:Element,/*播放器插入标签 */
            MemberVideo:-1,/*判断是否是会员 */
            urlhistory:"",/*获取地址栏地址 */
            source_img:'',
            width:'1200px',
            width2:'1200px !important',
            height:'650px',
            height2:'540px',
            height3:'540px !important',
            style:{},
            style2:{},
            style3:{},
            src:''
        }
    },
    computed:{
        ...mapGetters([
            'DetailsAdvicing',
            'getmoney'
        ]),
        ...mapActions([
            'gosucc',
            'money'
        ])
        // player() {
        //     return this.$refs.videoPlayer.player
        // }
    },
    activated(){
        this.getParams();
    },
    mounted(){
        // this.getParams();
    },
  
    methods:{
         // 复制成功
        onCopy(e){
            this.$message({
                message: '复制成功',
                type: 'success'
            });
        },
        searchforTag(id,tle){
            this.$router.push({
                path:"Search",
                query:{
                    "id":id,
                    "tit":tle
                }
            })
        },
        // 复制失败
        onError(e){
            this.$message({
                message: '复制失败，请重新复制',
                type: 'warning'
            });
        },
         clickLogin(num){
             this.$refs.logins.login(num);
        },
        tovip(){
            this.MemberVideo = 3;
        },
        paymoney(){
            this.MemberVideo=4;
        },
        //支付金币看片
        paygold(){
            var authkey =getCookie("mykey");
            axios.post('/index/index/use_gold_watch',
                qs.stringify({
                    id:this.loveId,
                    authkey:authkey
                })).then((res)=>{
                    if(res.data.code==1){
                        this.$store.dispatch("money",res.data.money);
                        this.MemberVideo = -1;
                        this.videosss=true;
                        this.url = this.data.video_info.video;
                        this.title = this.data.video_info.title;
                        this.source=`<source  id="source"  src="${this.data.video_info.video}"  type="application/x-mpegURL">`
                            this.$nextTick(() => {
                            let u = this.data.video_info.video
                            $("#source").attr('src', u)
                            let myPlayer = videojs('#my-video')  // 初始化视频
                            myPlayer.src(u)  //重置video的src
                            myPlayer.load(u)  //使video重新加载
                            this.myPlayer = myPlayer
                            myPlayer.on('pause',function(){
                                console.log('guygjh')
                            }) 
                            var that = this;
                            myPlayer.on('play',function(){
                                axios.post('/index/index/watch_video',
                                    qs.stringify({
                                        id:that.loveId,
                                        authkey:authkey
                                    })).then((res)=>{
                                        console.log(res)
                                    })
                            })
                            })
                        this.loginsuccess = false;
                    }else{
                        
                        this.MemberVideo=5
                    }
                })
        },
        earnmoney(){
            this.$router.push({ path:'/Offer'});
        },
        getVip(){
            this.$router.push({ path:'/Vip'});
        },
        // 收藏影片
        collections(){
            var authkey =getCookie("mykey");
            if(this.Selected == -1 ){
                axios.post('/index/index/like_and_collect', 
                 qs.stringify({id:this.loveId,authkey:authkey,type:1}) 
                ).then((res) => {
                var data = res.data;
                console.log(data)
                if(data.code==1 ){
                    this.collection++;
                     this.Selected = 0;
                    this.$message({
                        message: '恭喜你，收藏成功',
                        type: 'success'
                    });
                }else if(data.code==2){
                    this.$message({
                        message: '请登录',
                        type: 'success'
                    });
                }
                }).catch((error) => {
                    console.log(error);
            });
            }else{ 
                 axios.post('/index/index/cancel_like_and_collect', 
                 qs.stringify({id:this.loveId,authkey:authkey,type:1}) 
                ).then((res) => {
                var data = res.data;
                if(data.code==1){
                     this.Selected = -1;  
                     this.collection--;
                    this.$message.error('取消收藏');
                }else if(data.code==2){
                    this.$message({
                        message: '请登录',
                        type: 'success'
                    });
                }
            
                }).catch((error) => {
                    console.log(error);
            });
            }  
        },
        // 点赞影片
        goodvideos(){
            var authkey =getCookie("mykey");
            if(this.SelectedGood == -1 ){
                axios.post('/index/index/like_and_collect', 
                 qs.stringify({id:this.loveId,authkey:authkey,type:2}) 
                ).then((res) => {
                var data = res.data;
                
                if(data.code==1 ){
                    this.SelectedGood = 0;
                    this.goodvideo++;
                    this.$message({
                        message: '点赞成功',
                        type: 'success'
                    });
                }else if(data.code==2){
                    this.$message({
                        message: '请登录',
                        type: 'success'
                    });
                }
                }).catch((error) => {
                    console.log(error);
            });
            }else{ 
                this.$message({
                    message: '已点赞成功',
                    type: 'success'
                });    
            }
        },
      
      
        
          // 获取参数
        getParams(){
                this.loveId = Base64.decode(this.$route.query.id); 
                this.getrouters = this.$route.query.beforeUrl;
                this.getMaybeLike(this.loveId);
                this.urlhistory = window.location.href;
                 if(this.getrouters == "/"){
                     this.navName = "首页"
                 }
                 if(this.getrouters == "/WebRecommended"){
                     this.navName = "站长推荐"
                 }
                 if(this.getrouters == "/Domesticseries"){
                     this.navName = "国产精品"
                 }
                 if(this.getrouters == "/JapanandSouthKorea"){
                     this.navName = "日韩精品"
                 }
                 if(this.getrouters == "/EuropeanAmerican"){
                     this.navName = "欧美精品"
                 }
                 if(this.getrouters == "/Account"){
                     this.navName = "个人中心"
                 }
                
        },
          // 猜你喜欢
        getMaybeLike(loveIds){
             var authkey =getCookie("mykey");
             axios.post('/index/index/video_detail', 
                 qs.stringify({id:loveIds,authkey:authkey}) 
                ).then((res) => {
                var data = res.data;
                this.data = data;
                this.LikeList = data.list;
                if(data.ad==null){
                    this.BaennerList = [];
                    if(this.BaennerList.length==0){
                        this.style = {width:'1200px',height:'650px'};
                        this.style2 = {width:'1200px',height:'540px'};
                        this.style3 = {width:'1200px !important',height:'540px !important'};
                    }
                }else{
                    this.BaennerList = data.ad;
                }
                if(data.code!=12 && data.code!=2 ){
                 
                    if( data.video_info.is_collect==1){
                        this.Selected = 0;
                    }else{
                        this.Selected = -1;
                    }

                    if( data.video_info.is_like==1){
                        this.SelectedGood = 0;
                    }else{
                            this.SelectedGood = -1;
                    }
                }
               
                if(data.code==1 ){
                    this.videosss=true;
                    this.url = data.video_info.video;
                    this.title = data.video_info.title;
                    this.source=`<source  id="source"  src="${data.video_info.video}"  type="application/x-mpegURL">`

                      this.$nextTick(() => {
                        let u = data.video_info.video
                        $("#source").attr('src', u)
                        let myPlayer = videojs('#my-video')  // 初始化视频
                        myPlayer.src(u)  //重置video的src
                        myPlayer.load(u)  //使video重新加载
                        this.myPlayer = myPlayer
                        myPlayer.on('pause',function(){
                            console.log('guygjh')
                        })
                        myPlayer.on('play',function(){
                            axios.post('/index/index/watch_video',
                                qs.stringify({
                                    id:loveIds,
                                    authkey:authkey
                                })).then((res)=>{
                                    console.log(res)
                                })
                        })
                        })
                    this.loginsuccess = false;
                    this.source_img = data.video_info.source_img;
                    this.collection = data.video_info.collection;
                    this.lookPeople = data.video_info.hits;
                    this.goodvideo = data.video_info.fabulous;
                    this.listTag = data.video_info.tags;
   
                }else if(data.code==12){
                     this.loginsuccess = true;
                     this.MemberVideo = 1;
                     this.title = data.video_info.title;
                     this.video_price = data.video_price;
                     this.collection = data.video_info.collection;
                     this.source_img = data.video_info.source_img;
                     this.lookPeople = data.video_info.hits;
                     this.goodvideo = data.video_info.fabulous;
                     this.listTag = data.video_info.tags;
                }else if(data.code==16){
                    this.loginsuccess = true;
                    this.MemberVideo = 2;
                    this.title = data.video_info.title;
                    this.LikeList = data.list;
                    this.BaennerList = data.ad;
                    this.video_price = data.video_price;
                    this.source_img = data.video_info.source_img;
                    this.collection = data.video_info.collection;
                    this.lookPeople = data.video_info.hits;
                    this.goodvideo = data.video_info.fabulous;
                    this.listTag = data.video_info.tags;

                }else if(data.code==18){
                     this.loginsuccess = true;
                     this.MemberVideo = 0;
                     this.title = data.video_info.title;
                     this.video_price = data.video_price;
                     this.source_img = data.video_info.source_img;
                     this.collection = data.video_info.collection;
                     this.lookPeople = data.video_info.hits;
                     this.goodvideo = data.video_info.fabulous;
                     this.listTag = data.video_info.tags;
                }else if(data.code==2){
                    this.$message({
                        message: '登录信息已过期',
                        type: 'warning'
                    })
                    this.$store.dispatch("gosucc",'false');
                    delCookie("username");
                    delCookie("mykey");
                    delCookie("code");
                    this.$router.push({ path:'/'});
                    this.$router.go(0);
                }
                }).catch((error) => {
                    console.log(error);
                    console.log(52)
            });
        }, 
       
        //点击广告次数
        Gotoadurl(id,url){
            axios.post('/index/index/adv_click_history',
                qs.stringify({
                    id:id
                })).then((res)=>{
                    if(res.data.code==1){
                        window.open(url);
                    }
                })
        },
        // 跳转视频页面
        GoDetails(id,url){
                if(id){
                     var id = Base64.encode(id);  
                        var beforeUrl = this.$route.path;
                        let routeData = this.$router.resolve({
                        path:"Details",
                        query:{
                            "id":id ,
                            'beforeUrl':beforeUrl,  
                        }
                    });
                    window.open(routeData.href, '_blank');
                }else{
                    window.open(url)
                }  
        },
    },
    components:{
        Header,
        Footer,
        Login,
        MyItem,
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";
// @import "../../assets/styles/video-js.css";
@import "../../assets/styles/common.scss";
    .content_list{
        width: 100%;
        .title_box{
            width: 1200px;
            margin: 0 auto;
            h3{
                color: #ffffff;
                font-size: 26px;
                height: 30px;
                line-height: 30px;
            }
        }
    }
    .conent_box {
        width: 100%;
        .label-box{
            width: 100%;
            padding-top: 10px;
            .label-list{
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;
                li{
                    float: left;
                    line-height: 20px;
                    height: 20px;
                    padding: 0 7px;
                    margin-left: 10px;
                    margin-bottom: 10px;
                    background-color: #3d3d4f;
	                border-radius: 2px;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    &:hover{
                        color: #e82c87;
                    }
                }
            }
        }
        .Breadcrumbs{
            width: 1200px;
            margin: 10px auto 0 auto;
            height: 30px;
            overflow: hidden;
            li{
                float: left;
                height: 30px;
                line-height: 30px;
                color: #ffffff;
	            opacity: 0.5;
                b{
                    padding: 0 5px;
                }
                 &.same-li{
                    cursor: pointer;
                 }
                &.same-li:hover{
                    color: #fc2b90;
                    opacity: 1;
                }
            }
        }
        .video_boc{
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            .left_video{
                float: left;
                width: 825px;
                // height: 438px;
                background-color: #2e2e2e;
                .video_name{
                    width: 100%;
                    height: 48px;
                    line-height: 48px;
                    overflow: hidden;
                    background-color: #24242e;
                    h4{
                        display: block;
                        line-height: 48px;
                        font-size: 18px;
                        color: #fff;
                    }
                }
            }
            .video_content{
                width: 825px;
                height: 438px;
                background-color: #333333;
                position: relative;
                .details-shade{
                     width: 825px;
                    height: 438px;
                    position:absolute;
                    left:0px;
                    top:0px;
                    background:rgba(0, 0, 0, 0.5);
                    z-index: 300;
                }

                .visitor{
                    width: 400px;
                    height: 230px;
                    background-color: #24242e;
                    border-radius: 8px;
                    position: absolute;
                    left: 50%;
                    top:50%;
                    margin-left: -200px;
                    margin-top: -115px;
                     z-index: 301;
                     padding-top: 40px;
                      .govip{
                            width: 220px;
                            height: 36px;
                            background-color: #d91a76;
                            border-radius: 4px;
                            color: #ffffff;
                            line-height: 36px;
                            margin: 0 auto;
                            text-align: center;
                            cursor: pointer;
                        }
                    
                     &>p{
                         color: #ffffff;
                         height: 35px;
                         line-height: 35px;
                         text-align: center;
                         span{
                             color: #fc2b90;
                             cursor: pointer;
                             padding: 0 4px;
                         }
                     }
                     .title-box{
                         width: 180px;
                         margin: 20px auto 10px auto;
                         overflow: hidden;
                         font-size: 0;
                         li{
                            @include inlineBlock();
                             line-height: 12px;
                             
                             text-align: center;
                             &:nth-child(2n-1){
                                 width: 26%;
                                 height: 1px;
                                 background-color: #4e4e56;
                             }
                             &:nth-child(2n){
                                 width: 48%;
                                 color: #505058;
                                 font-size: 12px;
                             }
                         }
                     }
                     .Introduction-box{
                         width: 180px;
                         margin: 0 auto;
                         overflow: hidden;
                         li{
                             float: left;
                             width: 33%;
                             i{
                                 display: block;
                                 margin: 0 auto;
                             }
                             span{
                                 display: block;
                                 text-align: center;
                                color: #505058;
                                 font-size: 10px;
                                 line-height: 35px;
                                 height: 35px;
                             }
                             &:nth-child(1) i{
                                 width: 22px;
                                 height: 22px;
                                 background: url("/static/image/index/free.png") center center no-repeat; 
                             }
                             &:nth-child(2) i{
                                 width: 30px;
                                 height: 19px;
                                 margin-top: 3px;
                                 background: url("/static/image/index/hd-icon.png") center center no-repeat; 
                             }
                             &:nth-child(3) i{
                                width: 22px;
                                height: 19px;
                                margin-top: 3px;
                                 background: url("/static/image/index/video-icon.png") center center no-repeat; 
                             }
                         }
                     }
                }
                .visitor-tip{
                    width: 500px;
                    height: 260px;
                    background-color: #24242e;
                    border-radius: 8px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -250px;
                    margin-top: -130px;
                    z-index: 301;
                    padding-top: 15px;
                    .btn{
                        width: 100%;
                        height: 60px;
                        padding-top: 10px;
                        margin-top: 10px;
                        .paymoney{
                            display: block;
                            float: right;
                            margin-right: 130px;
                            background: #fc2b90;
                            border: 0;
                        }
                        .openvip{
                            float: left;
                            margin-left: 130px;
                            background: #fc2b90;
                            border: 0;
                        }
                    }
                }
                .visitor-money{
                    width: 400px;
                    height: 230px;
                    background-color: #24242e;
                    border-radius: 8px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -200px;
                    margin-top: -115px;
                    z-index: 301;
                    padding-top: 20px;
                    .member{
                        cursor: pointer;
                    }
                    .btn{
                        width: 100%;
                        height: 60px;
                        padding-top: 10px;
                        margin-top: 10px;
                        .paymoney{
                            display: block;
                            float: right;
                            margin-right: 90px;
                            background: #fc2b90;
                            border: 0;
                        }
                        .openvip{
                            float: left;
                            margin-left: 90px;
                            background: #fc2b90;
                            border: 0;
                        }
                    }
                }


                .Member-video{
                    padding-top: 25px;
                    .Member-cz{
                        height: 54px;
                        line-height: 54px;
                        cursor: pointer;
                    }
                }
                a{
                    display: block;
                    width: 160px;
                    height: 40px;
                    border-radius: 5px;
                    color: rgba(255, 255, 255, 0.7);
                    padding-left: 5px;
                }
                .left-www{
                    position: absolute;
                    left: 20px;
                    top:8px;
                }
                .right-www{
                    position: absolute;
                    right: 20px;
                    bottom:8px;
                }
               
            }
             .typeof_box{
                width: 100%;
                height: 60px;
                padding-left: 12px;
                color: #6e6e70;
                overflow: hidden;
                .dis{
                   display: block;
                   float: left;
                    .lookPeople{
                       @include inlineBlock();
                        width: 20px;
                        height: 12px;
                        background: url("/static/image/index/look.png") center center no-repeat;
                        margin-right: 10px;
                    }
                    span{
                        @include inlineBlock();
                        height: 60px;
                        line-height: 60px;
                    }
                }
                .typeof_list{
                    float: right;
                   a{
                        display: block;
                        float: left;
                        margin-right: 9px;
                        height: 60px;
                        cursor: pointer;
                        color: #6e6e70;
                        i{
                             @include inlineBlock();
                             margin-right: 8px;
                        }
                        span{
                            @include inlineBlock(); 
                            line-height: 60px;
                            min-width: 50px;
                        }
                         &.collection i{
                                width: 18px;
                                height: 17px;
                                background: url("/static/image/index/collection.png") center center no-repeat;
                            }
                            &.goodvideo i{
                                width: 16px;
                                height: 16px;
                                background: url("/static/image/index/like.png") center center no-repeat;
                            }
                            &.share i{
                                width: 18px;
                                height: 15px;
                                background: url("/static/image/index/icon-share.png") center center no-repeat;
                            }
                             &.share:hover i{
                                  background: url("/static/image/index/icon-share-hover.png") center center no-repeat;
                             }
                             &.share:hover span{
                                 color: #fc2b90;
                             }
                            // 小图标hover
                            &.active{
                                 color: #fc2b90;
                            }
                            &.active .coll-i{
                                background: url("/static/image/index/collection-hover.png") center center no-repeat;
                            }
                            &.active .good-i{
                                 background: url("/static/image/index/like-hover.png") center center no-repeat;
                            }
                            &.active .shade-i{
                                background: url("/static/image/index/icon-share-hover.png") center center no-repeat;
                            }
                    }
                }
            }
            .right_swipper{
                float: right;
                width: 365px;
                height: 497px;
                background-color: #333333;
                margin-top: 48px;
                .block{
                    width: 365px;
                    height: 497px;
                    background-color: #333333;
                    a{
                        display: block;
                        width: 365px;
                        height: 497px;
                        img{
                            display: block;
                            width: 365px;
                            height: 497px;
                        }
                    }
                }

            }

        }
        
    }


.myVideo-dimensions {
    width: 825px !important;
    height: 438px !important;
}
.video-js {
    width: 825px !important;
    height: 438px !important;
}
</style>

