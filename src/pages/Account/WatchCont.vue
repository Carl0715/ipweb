<template>
<div class="Gbox-content" v-scroll='loadMoreMoney'>
    <h3 class="look-top">近期观看记录</h3>
    <ul class="content index-twolist">
        <li class="" 
            v-for="(item,index) in watchList" 
            :key="index"
            >
                <div @click="GoDetails(item.video_info.id)" class="one-img">
                    <img  v-lazy="item.video_info.img"  alt="">
                    <div class="img-shade"></div>
                    <i class="play"></i>
                    <i class="vip" v-if="item.video_info.is_vip==1"></i>
                    <i class="time" v-if="item.video_info.timelong!=null">{{item.video_info.timelong}}</i>
                </div>
                <div class="two-title">
                    <p @click="GoDetails(item.video_info.id)">{{item.video_info.title}}</p>
                    <ul class="label">
                        <li v-for="(temp,i) in item.video_info.tags" :key="i" @click="searchforTag(temp.id,temp.title)">{{temp.title}}</li>
                    </ul>   
                </div>                                                                                   
        </li>
        <div class="blanktip" v-show="flag_t" v-html="blankVideo"></div>
        <my-item v-show="blank==false" :lists="watchList" :isshow="isshow" :loading="loading" :showone='showone' />    
    </ul>
</div> 
</template>


<script>
import MyItem from "@/pages/header/MyItem"
import {getCookie} from '@/util/util.js'
import Axios from 'axios';
const qs = require('qs');
export default {
    name:'watchcont',
    data(){
        return{
            page:1,
            loading:false,
            isshow:true,
            showone:true,
            // flags:true,
            watchList:[],//观看记录
            blankVideo:'您暂时还没看过片',
            blank:true,
            flag_t:false,
            authkey:''
        }
    },
    // props:{
    //     authkey:String
    // },
    directives: {
        scroll: {
            bind: function (el, binding){
            window.addEventListener('scroll', function() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                if(scrollTop + document.documentElement.clientHeight  >= document.documentElement.scrollHeight) {
                let loadData = binding.value
                loadData()
                }
            })
            }
        }
    },
    mounted(){
        //观看记录
        var authkey = this.authkey = getCookie('mykey');
        Axios.post('/index/index/wathch_history',
                    qs.stringify({
                        authkey:this.authkey,
                        page:1
                    })).then((res)=>{
                        console.log(res.data.list)
                        if(res.data.code==1){
                            if(res.data.list.length){
                                this.blank = false;
                                this.watchList = res.data.list;
                                if(this.watchList.length>=16){
                                    this.loading = true;
                                    setTimeout(()=>{
                                        this.showone=true;
                                    },3000)
                                }else{
                                    // this.flags = false;
                                    this.isshow = false;
                                    this.showone = false;
                                }
                            }else{
                                this.flag_t = true;
                            }
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            })                           
                        }
                    })
    },
    methods:{
        //观看记录下拉刷新
        async loadMoreMoney(){
            if(this.loading){
            this.loading = false;
            this.showone = false;
            this.page++
            // 请求下一页数据
            Axios.post('/index/index/wathch_history', 
                qs.stringify({authkey:this.authkey,page:this.page}) 
                ).then((res) => {
                    var data = res.data.list; 
                    if(data.length>=16){
                        this.watchList = this.watchList.concat(data);
                        this.loading = true;
                    }else{
                        this.showone = false;
                        this.isshow = false;
                    }   
                }).catch((error) => {
                        console.log(error);
                });
            }
         },
         //标签搜索
        searchforTag(id,tle){
            this.$router.push({
                path:"Search",
                query:{
                    "id":id,
                    "tit":tle
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
        MyItem
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/account.scss';
</style>
