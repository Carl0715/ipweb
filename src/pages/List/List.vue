<template>
    <div>
        <Header></Header>
        <div class="conent_box">
            <div class="content_list">
                <div class="title_box">
                    <div class="left-lable">
                        <h3>{{title}}</h3>
                    </div>
                </div>
                <ul class="content index-onelist" v-scroll='loadMorelist'>
                    <li class="" 
                    v-for="(item,index) of videoListall" 
                    :key="index"
                    >
                        <div @click="GoDetails(item.id)" class="one-img">
                            <img  v-lazy="item.img"  alt="">
                            <div class="img-shade"></div>
                            <i class="play"></i>
                            <i class="vip" v-if="item.is_vip==1"></i>
                            <i class="time" v-if="item.timelong!=null">{{item.timelong}}</i>
                        </div>
                        <div class="two-title">
                            <p @click="GoDetails(item.id)">{{item.title}}</p>
                            <ul class="label">
                                <li v-for="(temp,i) in item.tags" :key="i">{{temp.title}}</li>
                            </ul>   
                        </div>                                                                                     
                    </li>   
                 <my-item  :lists="videoListall" :isshow="isshow" :loading="loading" :showone='showone' /> 
                </ul>
            </div>
        </div>
        <Gotop></Gotop>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/pages/header/Header"
import Footer from "@/pages/footer/Footer"
import Gotop from "@/pages/header/Gotop"
import MyItem from "@/pages/header/MyItem"
import axios from "axios"
const qs = require('qs');
export default {
    name:'list',
    data(){
        return{
            title:'',
            videoListall:[],
            top_tags:[],
            page:2,
            blank:true,
            loading:false,
            isshow:true,
            showone:true,
            flag_t:false,
            busy :false
        }
    },
    mounted(){

    },
    deactivated(){
        this.busy = false;
    },
    activated(){
        this.busy = true;
        this.title = this.$route.query.tit;
        axios.post('/index/index/index_top_list', 
        qs.stringify({
            page:2,
            page_size:16
        })).then((res) => {
            var data = res.data;
            if(data.code==1){  
                if(this.title=='当前最热'){
                    this.videoListall = data.list.hot_list;
                }else if(this.title=='精选视频'){
                    this.videoListall = data.list.choiceness;
                }else if(this.title=='最新资源'){
                    this.getNewVideolist();
                }
            }
        }).catch((error) => {
                    console.log(error);
        });
    },
    directives: {
        scroll: {
            bind: function (el, binding){
            window.addEventListener('scroll', function() {
                if(document.documentElement.scrollTop + document.documentElement.clientHeight  >= document.documentElement.scrollHeight) {
                let loadData = binding.value
                loadData()
                }
            })
            }
        }
    },
    methods:{
        getNewVideolist(){
            axios.post('/index/index/video_list', 
                qs.stringify(
                    {page:2,is_vip:0,category:"",tags_num:5}
                ) 
            ).then((res) => {
               var data = res.data;
               window.scrollTop=0;
                if(data.code==1){
                    this.videoListall = data.list;
                    this.top_tags = data.top_tags;
                }
            }).catch((error) => {
                     console.log(error);
            });
        },
        //下拉刷新
        async loadMorelist(){
            if(this.busy){
                if(!this.loading){
                this.loading = true;
                this.showone = false;
                // 请求下一页数据
                if(this.title=='最新资源'){
                    axios.post('/index/index/video_list', 
                        qs.stringify(
                            {page:this.page++,is_vip:0,category:"",tags_num:5}
                        ) 
                    ).then((res) => {
                    var data = res.data.list;
                        if(data.length>0){
                            this.videoListall = this.videoListall.concat(data);
                            this.loading = false
                        }else{
                            this.isshow = false;
                        }  
                    }).catch((error) => {
                            console.log(error);
                    });
                }else{
                    axios.post('/index/index/index_top_list', 
                        qs.stringify({page_size:15,page:this.page++}) 
                        ).then((res) => {
                            var data = res.data; 
                            if(this.title=='当前最热'){
                                if(data.list.hot_list.length>0){
                                    this.videoListall = this.videoListall.concat(data.list.hot_list);
                                    this.loading = false
                                }else{
                                    this.isshow = false;
                                }   
                            }else if(this.title=='精选视频'){
                                if(data.list.choiceness.length>0){
                                    this.videoListall = this.videoListall.concat(data.list.choiceness);
                                    this.loading = false
                                }else{
                                    this.isshow = false;
                                }  
                            }
                        }).catch((error) => {
                                console.log(error);
                        });
                    }
                }
            }
         },
    
    },
    components:{
        Header,
        Footer,
        Gotop,
        MyItem
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/common.scss';

</style>
