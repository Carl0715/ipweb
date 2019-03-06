<template>
    <div class="conent_box">
        <div class=" content_list">
            <div class="title_box">
                <div class="left-lable">
                    <h3>{{title}}</h3>
                    <ul v-for="(temp,i) of titleList" :key="i">
                       <li @click="searchforTag(temp.id,temp.title)"><span>{{temp.title}}</span><i v-if="i<4">/</i></li>
                    </ul>
                </div>
            </div>
            <ul class="pic_list content" v-scroll="loadMore">
                    <li class="" 
            v-for="(item,index) of videoList" 
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
                        <li v-for="(temp,i) in item.tags" :key="i"  @click="searchforTag(temp.id,temp.title)">{{temp.title}}</li>
                    </ul>   
                </div>      
                                                                                                
            </li>   
                <my-item :lists="videoList" :isshow="isshow" :loading="loading" :showone="showone"/>    
            </ul>
        </div>           
         <Gotop></Gotop>
    </div>
</template>
<script>
import axios from "axios"
import {baseURL} from "@/util/api.js"
import {getVideolist,getCookie} from '@/util/util.js'
import Gotop from "@/pages/header/Gotop"
import MyItem from "@/pages/header/MyItem"
const qs = require('qs');
import { mapGetters } from 'Vuex'
export default {
    name:"contents",
    props:{
        categorys:String,
        title:String,
        vip:Number
    },
    data(){
        return{
            videoList:[],
            titleList:[],
            currentPage4:1,
            page:1,
            loading: false,
            isshow:true,
            showone:false,
            busy:false,
            mykey:''
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
    computed:{
        ...mapGetters([
            'leftnav'
        ])
    },
    created(){
        this.mykey = getCookie('mykey')
    },
    methods:{
    async loadMore(){
        if(this.busy){
            if(!this.loading){  
                this.loading = true
                this.showone = false
                this.page++
                    // 请求下一页数据
                axios.post('/index/index/video_list', 
                qs.stringify(
                    {page:this.page,is_vip:this.vip,category:this.categorys,tags_num:5,authkey:this.mykey}
                    ) 
                    ).then((res) => {
                        var data = res.data.list;
                        if(data.length>1){
                            this.videoList = this.videoList.concat(data);
                            this.loading = false
                            // this.busy = false;
                        }else{
                            this.isshow = false;
                            
                        }   
                    }).catch((error) => {
                            console.log(error);
                    });
            }
        }
  },

    getVideolist (types,page,vip) {
        axios.post('/index/index/video_list', 
        qs.stringify(
            {page:page,is_vip:vip,category:types,authkey:this.mykey}
            ) 
        ).then((res) => {
        window.scrollTo(0,0)
        var data = res.data;
        if(data.code==1){
            this.videoList = data.list;
            this.titleList = data.top_tags;
        }else{
            alert("获取数据出错")
        }
     
        }).catch((error) => {
                console.log(error);
        });
         setTimeout(()=>{
            this.showone=true;
        },1000)
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
      
    },
    
    components:{
        MyItem,
        Gotop
    },
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/common.scss";

</style>

