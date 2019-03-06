<template>
    <div>
        <Header></Header>
        <div class="pic-box">
            <ul class="her-nav">
                <router-link :to="{path:'/'}" tag="li" exact>爱啪网站</router-link>
                <li>/</li>
                <router-link :to="{path:'SexyPictures'}" tag="li" exact>情色文学</router-link>
                <li>/</li>
                <li>{{title}}</li>
            </ul>
            <div class="pic-content">
                <p class="tit">{{title}}</p>
                <ul class="pic">
                    <li v-for="(item,idx) in picdata" :key="idx">
                        <!-- <img v-lazy="'http://172.16.18.220:82'+item"> -->
                        <img v-lazy="item">
                    </li>
                </ul>
            </div>
            <ul class="cont-foot">
                <li @click="topre">上一篇： {{pretitle}}</li>
                <li @click="tonext" class="next">下一篇： {{nexttitle}}</li>
            </ul>
        </div>
        <Gotop></Gotop>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/pages/header/Header"
import Footer from "@/pages/footer/Footer"
import Loading from "@/pages/header/loading"
import Gotop from "@/pages/header/Gotop"
import axios from "axios"
const qs = require('qs');
export default {
    name:'PictureDetails',
    data(){
        return{
            id:'',
            title:'',
            picdata:[],
            pretitle:'',
            nexttitle:'',
            perId:'',
            nextId:''
        }
    },
    mounted(){
        
    },
    deactivated(){

    },
    activated(){
        this.getPicture()
    },
    created(){

    },
    methods:{
        getPicture(){
            this.picdata = [];
            this.id = this.$route.query.id;
            axios.post('/index/index/img_detail',
                qs.stringify({
                    id:this.id
                })).then((res)=>{
                    if(res.data.code==1){
                        var data  = res.data.data;
                        this.title = data.title;
                        this.picdata = data.imgs;
                        this.perId = res.data.pre.id;
                        this.nextId = res.data.next.id;
                        this.pretitle = res.data.pre.title;
                        this.nexttitle = res.data.next.title;
                    }
                })
        },
        topre(){
            this.$router.push({ 
                path: 'PictureDetails',
                query:{
                    id:this.perId
                } 
            });
            this.picdata = [];
            axios.post('/index/index/img_detail',
                qs.stringify({
                    id:this.perId
                })).then((res)=>{
                    console.log(res)
                    if(res.data.code==1){
                        var data  = res.data.data;
                        this.title = data.title;
                        this.picdata = data.imgs;
                        this.perId = res.data.pre.id;
                        this.nextId = res.data.next.id;
                        this.pretitle = res.data.pre.title;
                        this.nexttitle = res.data.next.title;
                    }
                })
        },
        tonext(){
            this.$router.push({ 
                path: 'PictureDetails',
                query:{
                    id:this.nextId
                } 
            });
            this.picdata = [];
            axios.post('/index/index/img_detail',
                qs.stringify({
                    id:this.nextId
                })).then((res)=>{
                    console.log(res.data.data)
                    if(res.data.code==1){
                        var data  = res.data.data;
                        this.title = data.title;
                        this.picdata = data.imgs;
                        this.perId = res.data.pre.id;
                        this.nextId = res.data.next.id;
                        this.pretitle = res.data.pre.title;
                        this.nexttitle = res.data.next.title;
                    }
                })
        }
    },
    components:{
        Header,
        Footer,
        Loading,
        Gotop
    }
}
</script>

<style lang="scss" scoped>
    .pic-box{
        width: 1200px;
        margin: 0 auto;
        .her-nav{
            width: 100%;
            height: 60px;
            li{
                margin-right: 10px;
                float: left;
                text-align: center;
                line-height: 60px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                opacity: 0.5;
                cursor: pointer;
                &:hover{
                    color: #fc2b90;
                }
            }
        }
        .pic-content{
            width: 100%;
            background: #383847;
            padding-top: 21px;
            padding-bottom: 30px;
            .tit{
                width: 100%;
                height: 35px;
                line-height: 35px;
                text-align: center;
                color: #ffffff;
                font-size: 18px;
            }
            .pic{
                width: 100%;
                text-align: center;
                vertical-align: middle;
                li{
                    vertical-align: middle;
                    margin-top: 40px;
                    margin-bottom: 40px;
                }
            }
        }
        .cont-foot{
            width: 100%;
            height: 40px;
            li{
                width: 50%;
                float: left;
                line-height: 40px;
                color: #ffffff;
                font-size: 12px;
                cursor: pointer;
                &:hover{
                    color: #fc2b90;
                }
            }
            .next{
                text-align: right;
            }
        }
    }
</style>

