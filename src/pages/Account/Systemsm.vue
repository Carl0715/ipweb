<template>
<div class="Gbox-content" v-scroll='loadMoreSystem'>
    <h3>系统消息</h3>
    <ul class="msg">
        <li v-for="(item,index) in systeMessage" :key="index">
            <span class="text">{{item.msg}}</span>
            <span class="time">{{item.create_time}}</span>
        </li>
    <div class="blanktip" v-show="flag_t" v-html="blankCollection"></div>
    <my-item v-show="blank==false" :lists="systeMessage" :isshow="isshow" :loading="loading" :showone='showone' /> 
    </ul>
</div>
</template>


<script>
import MyItem from "@/pages/header/MyItem"
import {getCookie} from '@/util/util.js'
import Axios from 'axios';
const qs = require('qs');
export default {
    name:'systemsg',
    data(){
        return{
            page:1,
            loading:false,
            isshow:true,
            showone:true,
            // flags:true,
            blankCollection:'暂时没有消息',
            //系统消息
            systeMessage:[],
            authkey:'',
            blank:true,
            flag_t:false,
        }
    },
    // props:{
    //     authkey:String
    // },
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
        //系统消息
        var authkey = this.authkey = getCookie('mykey');
        Axios.post('/index/index/get_system_msg',
            qs.stringify({
                authkey:this.authkey,
                page:1
            })).then((res)=>{
                if(res.data.code==1){
                    console.log(res.data.list)
                    if(res.data.list.length){
                        this.blank = false;
                        this.systeMessage = res.data.list;
                        if(res.data.list.length>=16){
                            this.loading= true;
                            setTimeout(()=>{
                                this.showone=true;
                            },1000)
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
                    });
                }
            })
    },
    methods:{
        async loadMoreSystem(){
            if(this.loading){
            this.loading = false;
            this.showone = false;
            this.page++
            // 请求下一页数据
            Axios.post('/index/index/get_system_msg', 
                qs.stringify({authkey:this.authkey,page:this.page}) 
                ).then((res) => {
                    var data = res.data.list; 
                    if(data.length>=16){
                        this.systeMessage = this.systeMessage.concat(data);
                        this.loading = true;
                    }else{
                        this.isshow = false;
                    }   
                }).catch((error) => {
                        console.log(error);
                });
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
