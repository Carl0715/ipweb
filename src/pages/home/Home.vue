<template>
    <div >
        <Header></Header>
        <div class="right_swipper">
                <div class="block" id="index-banner">
                <el-carousel height="450px"  :interval="3000" >
                    <el-carousel-item v-for="(item,index) in this.BaennerList" :key="index">
                        <a :href="item.source_url" target="_blank"><img :src="item.source_img" alt=""></a>
                    </el-carousel-item>
                </el-carousel>
            </div>       
        </div> 
        <div class="advertising_box">
            <div class="advertising_content">
                <ul class="content_list"  v-if="toplist.length!=0">
                    <li  v-for="(item,index) of toplist" :key="index" @click="Gotoadurl(item.id,item.url)">
                        <a target="_blank"  :href="item.url">
                            <img :src="item.img" alt="">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="conent_box">
            <div class="content_list">
                <div class="title_box">
                    <div class="left-lable">
                         <h3>当前最热</h3>
                        <ul v-for="(temp,i) of top_tags" :key="i">
                            <li @click="searchforTag(temp.id,temp.title)"><span>{{temp.title}}</span><i v-if="i<4">/</i></li>
                        </ul>
                    </div>
                    <router-link :to="{path:'List',query: { tit: '当前最热' }}" tag="div" exact class="add-more"><i class="add"></i><span>更多热门视频</span></router-link>
                </div>
               <ul class="content index-onelist">
                    <li class="" 
                    v-for="(item,index) of hot_list" :key="index"
                    >
                        <div @click="item.title!=null?GoDetails(item.id,item.url):Gotoadurl(item.id,item.url)" class="one-img">
                            <img  v-lazy="item.img"  alt="">
                            <div class="img-shade" v-if="item.tags"></div>
                            <i class="play" v-if="item.tags"></i>
                            <i class="vip" v-if="item.is_vip==1"></i>
                            <i class="time" v-if="item.timelong!=null">{{item.timelong}}</i>
                        </div>
                        <div class="two-title">
                            <p v-if="!item.company" @click="GoDetails(item.id,item.url)">{{item.title}}</p>
                            <p class="company" v-if="item.company">{{item.company}}</p>
                            <ul class="label" v-if="!item.company">
                                <li v-for="(temp,i) in item.tags" :key="i" @click="searchforTag(temp.id,temp.title)">{{temp.title}}</li>
                            </ul>   
                        </div>                                                                               
                    </li>   
                
                </ul>
            
            </div>
           
        <!-- 第二个 -->
          <div class="content_list">
                <div class="title_box">
                    <div class="left-lable">
                        <h3>精选视频</h3>
                        <ul v-for="(temp,i) of top_tags" :key="i">
                            <li @click="searchforTag(temp.id,temp.title)"><span>{{temp.title}}</span><i v-if="i<4">/</i></li>
                        </ul>
                    </div>
                   <router-link  :to="{path:'List',query: { tit: '精选视频' }}" tag="a" exact class="add-more"><i class="add"></i><span>更多精选视频</span></router-link>
                </div>
                <ul class="content index-onelist">
                    <li class="" 
                    v-for="(item,index) of choiceness" :key="index"
                    >
                        <div  @click="item.title!=null?GoDetails(item.id,item.url):Gotoadurl(item.id,item.url)" class="one-img">
                            <img  v-lazy="item.img"  alt="">
                            <div class="img-shade" v-if="item.tags"></div>
                            <i class="play" v-if="item.tags"></i>
                            <i class="vip" v-if="item.is_vip==1"></i>
                            <i class="time" v-if="item.timelong!=null">{{item.timelong}}</i>
                        </div>
                        <div class="two-title">
                            <p v-if="!item.company" @click="GoDetails(item.id,item.url)">{{item.title}}</p>
                            <p class="company" v-if="item.company">{{item.company}}</p>
                            <ul class="label" v-if="!item.company">
                                <li v-for="(temp,i) in item.tags" :key="i" @click="searchforTag(temp.id,temp.title)">{{temp.title}}</li>
                            </ul>   
                        </div>                                                                               
                    </li>   
                
                </ul>
            
            </div>
           
        <!-- 第三个 -->
          <div class="content_list">
                <div class="title_box">
                    <div class="left-lable">
                         <h3>最新资源</h3>
                        <ul v-for="(temp,i) of top_tags" :key="i">
                            <li @click="searchforTag(temp.id,temp.title)"><span>{{temp.title}}</span><i v-if="i<4">/</i></li>
                        </ul>
                    </div>
                   <router-link  :to="{path:'List',query: { tit: '最新资源' }}" tag="a" exact class="add-more"><i class="add"></i><span>更多热门视频</span></router-link>
                </div>
                <ul class="content index-twolist" v-scroll="loadMore">
                    <li class="" 
                    v-for="(item,index) of videoListtwo" 
                    :key="index"
                    >
                        <div  @click="item.title!=null?GoDetails(item.id,item.url):Gotoadurl(item.id,item.url)" class="one-img">
                            <img  v-lazy="item.img"  alt="">
                            <div class="img-shade" v-if="item.tags"></div>
                            <i class="play" v-if="item.tags"></i>
                            <i class="vip" v-if="item.is_vip==1"></i>
                            <i class="time" v-if="item.timelong!=null">{{item.timelong}}</i>
                        </div>
                        <div class="two-title">
                            <p v-if="!item.company" @click="GoDetails(item.id,item.url)">{{item.title}}</p>
                            <p class="company" v-if="item.company">{{item.company}}</p>
                            <ul class="label" v-if="!item.company">
                                <li v-for="(temp,i) in item.tags" :key="i" @click="searchforTag(temp.id,temp.title)">{{temp.title}}</li>
                            </ul>   
                        </div>     
                                                                                                             
                    </li>   
                     <my-item :lists="videoListtwo" :isshow="isshow" :loading="loading" />    
                </ul>
            </div>
        <Gotop></Gotop>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
 import Header from "@/pages/header/Header"
 import Footer from "@/pages/footer/Footer"
 import MyItem from "@/pages/header/MyItem"
 import Gotop from "@/pages/header/Gotop"
 import {getCookie} from '@/util/util.js'
 import axios from "axios"
 import { mapGetters, mapActions } from 'Vuex'
import { CheckboxButton } from 'element-ui';
const qs = require('qs');
export default {
    name:"home",
    data(){
        return{
            videoList :[],
            videoListtwo :[],
            footerlists:[],
            page:2,
            loading: false,
            isshow:true,
            shows:-1,
            choiceness:[],
            hot_list:[],
            top_tags:[],
            BaennerList:[],
            toplist:[],
            busy:false,
            mykey:''
        }
    },
    created(){
        this.mykey = getCookie('mykey')
        if(this.$route.query.uid){
            axios.post('/index/index/promotion',
                qs.stringify({
                    id:this.$route.query.uid
                })).then((res)=>{
                    console.log(res)
                    if(res.data.code==1){
                        this.$store.dispatch('setuid',this.$route.query.uid)
                    }
                })
        }
    },
    directives: {
        scroll: {
            bind: function (el, binding){
            window.addEventListener('scroll', function() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop + document.documentElement.clientHeight  >= document.documentElement.scrollHeight) {
                let loadData = binding.value
                loadData()
                }
            })
            }
        }
    },
    deactivated(){
        this.busy = false;
    },
    activated(){
        this.busy = true;
        this.getVideolist();
        this.getNewVideolist();  
        this.getindexBanner();
    },
    mounted(){
        
    },
    methods:{
        // 首页banner
        getindexBanner(){
            axios.post('/index/index/banner', 
             qs.stringify({
                 authkey:this.mykey
             })).then((res) => {
                var data = res.data;
                this.BaennerList =data.list;
                if(data.ad==null){
                    this.toplist = []
                }else{
                    this.toplist =data.ad;   
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        scrollToTop() { 
        　　var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        },
        showgame(index){
             this.shows=index;
        },
        hidegame(index){
            this.shows=!index;
        },

        //搜索
        searchforTag(id,tle){
            this.$router.push({
                path:"Search",
                query:{
                    "id":id,
                    "tit":tle
                }
            })
        },

        // 下拉加载请求数据
        async loadMore(){
            if(this.busy){
                if(!this.loading){
                this.loading = true
                    // 请求下一页数据
                axios.post('/index/index/video_list', 
                        qs.stringify(
                            {page:this.page++,is_vip:0,category:"",tags_num:5,authkey:this.mykey}
                        ) 
                    ).then((res) => {
                        if(res.data.list.length>0){
                            var data = res.data.list;
                            this.videoListtwo = this.videoListtwo.concat(data);
                            //  videoListtwo = this.map(item=>{
                            //      console.log(item)
                            //     item.shows = true;
                            //     return item;
                            // }) 
                            this.loading = false;
                        }else{
                            this.isshow = false;
                        }   
                    }).catch((error) => {
                        console.log(error);
                    });
                this.loading = false
                }
        }
  },



        getVideolist(){
            const that = this;
            axios.post('/index/index/index_top_list', 
            qs.stringify(
                    {page:1,page_size:11,authkey:this.mykey}
                ) 
            ).then((res) => {
               var data = res.data;
                if(data.code==1){  
                     this.choiceness = data.list.choiceness;
                     this.hot_list = data.list.hot_list;
                }
              
            }).catch((error) => {
                     console.log(error);
            });
        },
        getNewVideolist(){
            axios.post('/index/index/video_list', 
                qs.stringify(
                    {page:1,is_vip:0,category:"",tags_num:5,authkey:this.mykey}
                ) 
            ).then((res) => {
               var data = res.data;
               window.scrollTop=0;
                if(data.code==1){
                     this.videoListtwo = data.list;
                     this.top_tags = data.top_tags;  
                }
            }).catch((error) => {
                     console.log(error);
            });
        },
        //点击广告次数
        Gotoadurl(id,url){
            axios.post('/index/index/adv_click_history',
                qs.stringify({
                    id:id
                })).then((res)=>{
                    // console.log(res)
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
    computed:{
        ...mapGetters([  
            'other_uid'
        ]),
        ...mapActions({
            setuid:'setuid'
        })
    },
    components:{
        Header,
        Footer,
        MyItem,
        Gotop
    },
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/video-js.css";
@import "../../assets/styles/common.scss";
 .myVideo-dimensions {
    width: 290px !important;
    height: 160px !important;
}
.video-js {
    width: 290px !important;
    height: 160px !important;
}

// 轮播
 .right_swipper{
                width: 100%;
                height: 450px;
                .block{
                    width: 100%;
                    height: 450px;
                    a{
                        display: block;
                        width: 100%;
                        height: 450px;
                        img{
                            display: block;
                            width: 100%;
                            height: 450px;
                        }
                    }
                    
                }

            }
// 广告样式
.advertising_box{
        padding: 10px 0;
        width: 100%;
        .advertising_content{
            width: 1200px;
            overflow: hidden;
            margin: 0 auto;
            .content_list{
                width: 1200px;
                overflow: hidden;
                padding-top: 9px;
                li{
                    float: left;
                    width: 292px;
                    height: 70px;
                    border: solid 1px #3d3d4e;
                    margin-right: 10px;
                    cursor: pointer;
                    a{
                        display: block;
                        width: 290px;
                        height: 68px;
                        img{
                            display: block;
                            width: 290px;
                            height: 68px;
                        }
                    }
                    &:nth-child(4n){
                        margin-right: 0;
                    }
                }
            }
        }
    }
// 广告样式
     .video_content{
                width: 290px;
                height: 160px;
                position: absolute;
                left: 0;
                top: 0;
               
                a{
                    display: block;
                    width: 60px;
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



</style>

