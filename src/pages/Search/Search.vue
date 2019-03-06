<template>
    <div>
        <Header ref="getAdList"></Header>
        <div class="conent_box">
            <div class="content_list">
                <div class="title_box">
                    <div class="left-lable">
                        <h3>关于"{{title}}"的影片</h3>
                    </div>
                </div>
                <ul class="content index-onelist" v-if="videolist==1">
                    <li class="" 
                    v-for="(item,index) of videoListall" 
                    :key="index"
                    >
                        <div @click="GoDetails(item.id,item.url)" class="one-img">
                            <img  v-lazy="item.img"  alt="">
                            <div class="img-shade" v-if="item.tags"></div>
                            <i class="play" v-if="item.tags"></i>
                            <i class="vip" v-if="item.is_vip==1"></i>
                            <i class="time" v-if="item.timelong!=null">{{item.timelong}}</i>
                        </div>
                        <div class="two-title">
                            <p @click="GoDetails(item.id,item.url)">{{item.title}}</p>
                            <ul class="label">
                                <li v-for="(temp,i) in item.tags" :key="i" tag="li" @click="searchTags(temp.id,temp.title)">{{temp.title}}</li>
                            </ul>   
                        </div>                                                                                     
                    </li>   
                </ul>
                <div class="nolist" v-else-if="videolist==2">
                    <img :src="imgUrl" alt="">
                    <p>抱歉，未搜所到相关内容～</p>
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
import {baseURL} from "@/util/api.js"
import axios from "axios"
const qs = require('qs');
export default {
    name:"searchs",
    data(){
        return{
            videoListall :[],
            imgUrl:require("../../assets/image/advicing/no-search.png"),
            videolist:0,
            title:'',
            tid:''
        }
    },
    mounted(){
        // console.log(this.$route.query)
        // if(this.$route.query.title){
        //     this.getSearchlist();
        // }else if(this.$route.query.id){
        //     this.getTagsList();
        // }
    },
    activated(){ 
        if(this.$route.query.title){
            this.getSearchlist();
        }else if(this.$route.query.id){
            this.getTagsList();
        }
    },
    methods:{
        getSearchlist() {
            this.title = '';
            this.videoListall = [];
            var tags = this.$route.query.title;
            this.title = tags;
            axios.post('/index/index/search', 
                qs.stringify({key:tags,page:1}) 
                ).then((res) => {
                    var data = res.data.list;
                    this.videoListall = data;
                if(data.length>=1){
                    this.videolist = 1;
                }else{
                    this.videolist = 2;
                }
                }).catch((error) => {
                    console.log(error);
                    this.videolist = 2
            });
        },
        getTagsList(){
            this.title = '';
            this.tid = '';
            this.videoListall = [];
            this.title = this.$route.query.tit;
            this.tid = this.$route.query.id;
            axios.post('/index/index/search', 
                qs.stringify({tid:this.tid,page:1}) 
                ).then((res) => {
                    var data = res.data.list;
           
                    this.videoListall = data;
                    if(data.length>=1){
                        this.videolist = 1;
                    }else{
                        this.videolist = 2;
                    }
                }).catch((error) => {
                    console.log(error);
            });
        },
        getListol(val){
            this.title = val;
           this.videoListall = [];
            this.$router.push({
                path:"Search",
                query:{
                    "title":val
            }})
            axios.post('/index/index/search', 
                qs.stringify({key:val,page:1}) 
                ).then((res) => {
                    var data = res.data.list;
                
                    this.videoListall = data;
                    if(data.length>=1){
                        this.videolist = 1;
                    }else{
                        this.videolist = 2;
                    }
                }).catch((error) => {
                    console.log(error);
            });
        },
        //搜索
        searchTags(id,text){
            this.title = text;
            this.$router.push({
                path:'Search',
                query:{
                    "id":id,
                    "tit":text
                }
            })
            this.videoListall = [];
            axios.post('/index/index/search', 
                qs.stringify({tid:id,page:1}) 
                ).then((res) => {
                    var data = res.data.list;
                  
                    this.videoListall = data;
                    if(data.length>=1){
                        this.videolist = 1;
                    }else{
                        this.videolist = 2;
                    }
                }).catch((error) => {
                    console.log(error);
            });
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
        Content,
        Gotop
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/common.scss';
        .nolist{
            width: 1200px;
            margin: 0 auto;
            height: 374px;
            img{
                display: block;
                width: 243px;
                height: 224px;
                margin: 0 auto;
                margin-top: 150px;
            }
            p{
                text-align: center;
                height: 40px;
                line-height: 40px;
            }
        }
</style>
