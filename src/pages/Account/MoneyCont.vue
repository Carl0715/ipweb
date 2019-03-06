<template>
<div class="Gbox-content" v-scroll="loadMore">
    <ul class="money-top">
        <li>时间</li>
        <li>金币数量</li>
        <li>账户余额</li>
        <li>备注</li>
    </ul>
    <ul class="money-bottom" v-for="(item,idx) in moneyData" :key="idx">
        <li>{{item.create_time}}</li>
        <li>{{item.gold_value}}</li>
        <li>{{item.money}}</li>
        <li>{{item.type}}</li>
    </ul>
    <div class="blanktip" v-show="flag_t" v-html="blankMoney"></div>
    <my-item v-show="blank==false" :lists="moneyData" :isshow="isshow" :loading="loading" :showone='showone' /> 
</div> 
</template>
<script>
import MyItem from "@/pages/header/MyItem"
import {getCookie} from '@/util/util.js'
import Axios from 'axios';
const qs = require('qs');
export default {
    name:'moneycont',
    data(){
        return{
            //金币记录
            page:1,
            loading:false,
            isshow:true,
            showone:true,
            // flags:true,
            moneyData:[],
            blankMoney:'您暂时还没有消费记录',//空白提示
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
        //金币记录
        var authkey = this.authkey = getCookie('mykey');
        Axios.post('/index/index/get_gold_log',
                    qs.stringify({
                        authkey:this.authkey,
                        page:1
                    })).then((res)=>{
                        console.log(res.data)
                        if(res.data.code==1){
                            if(res.data.list.length){
                                this.blank = false;
                                this.moneyData = res.data.list;
                                if(this.moneyData.length>=16){
                                    this.loading = true;
                                    setTimeout(()=>{
                                        this.showone=true;
                                    },1000)
                                }else{
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
        //金币下拉刷新
        async loadMore(){
            if(this.loading){
            this.loading = false;
            this.showone = false;
            this.page++
            // 请求下一页数据
            Axios.post('/index/index/get_gold_log', 
                qs.stringify({authkey:this.authkey,page:this.page}) 
                ).then((res) => {
                    var data = res.data.list; 
                    if(data.length>=16){
                        this.moneyData = this.moneyData.concat(data);
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
