<template>
<div class="Gbox-content" v-scroll='loadMoreMine'>
    <h3 class="look-top">收藏中心</h3>
    <ul class="content index-twolist">
        <li class="" 
            v-for="(item,index) in mineList" 
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
        <div class="blanktip" v-show="flag_t" v-html="blankCollection"></div>
        <my-item v-show="blank==false" :lists="mineList" :isshow="isshow" :loading="loading" :showone='showone' /> 
    </ul>
</div>   
</template>

<script>
import MyItem from "@/pages/header/MyItem"
import {getCookie} from '@/util/util.js'
import Axios from 'axios';
const qs = require('qs');
export default {
    name:'minecont',
    data(){
        return{
            authkey:'',
            blankCollection:'您暂时还没收藏过',
            mineList:[],
            blank:true,
            page:1,
            loading:false,
            isshow:true,
            showone:true,
            // flags:true,
            flag_t:false,
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
    mounted(){
        //收藏中心
        var authkey = this.authkey = getCookie('mykey');
        Axios.post('/index/index/collect_list',
                    qs.stringify({
                        authkey:this.authkey,
                        page:1
                    })).then((res)=>{
                        if(res.data.code==1){
                            if(res.data.list.length){
                                this.blank = false;
                                this.mineList = res.data.list;
                                if(this.mineList.length>=16){
                                    this.loading = true;
                                    setTimeout(()=>{
                                        this.showone=true;
                                    },2000)
                                }else{
                                    this.isshow = false;
                                    this.showone = false;
                                }
                            }else{
                                this.flag_t = true;
                            }
                        }else{
                            this.message({
                                message: res.data.msg,
                                type: 'warning'
                            })
                        }
                    })
    },
    methods:{
        //下拉刷新
        async loadMoreMine(){
            if(this.loading){
            this.loading = false;
            this.showone = false;
            this.page++
            // 请求下一页数据
            Axios.post('/index/index/collect_list', 
                qs.stringify({authkey:this.authkey,page:this.page}) 
                ).then((res) => {
                    var data = res.data.list; 
                    if(data.length>=16){
                        this.mineList = this.mineList.concat(data);
                        this.loading = true;
                    }else{
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
