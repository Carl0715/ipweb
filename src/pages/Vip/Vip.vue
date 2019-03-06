<template>
    <div>
        <Header ref="getAdList"></Header>
        <div class="vip-content">
            <div class="vip-box">
                <p>共计<span>{{money}}</span><span>.00</span>元 (<i>{{price}}</i><i>元</i>/<b>{{date}}</b>)</p>
                <div class="vip-time">
                    <span>开通VIP :</span>
                    <input type="number"  v-model="value" >
                    <ul class="year">
                        <li :class="{active:ins==1}" @click="openVip(1)">天</li>
                        <li :class="{active:ins==2}" @click="openVip(2)">月</li>
                        <li :class="{active:ins==3}" @click="openVip(3)">年</li>
                    </ul>
                    <div class="open-vip">立即开通</div>
                </div>
            </div>
        </div>
        <Content 
        :categorys="categorys"
        :title="title"
        :vip="is_vip"
        ref="pagechange"
        ></Content>
        <Gotop></Gotop>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/pages/header/Header"
import Content from "@/pages/header/Content"
import Footer from "@/pages/footer/Footer"
import Gotop from "@/pages/header/Gotop"
export default {
    name:"vips",
    data(){
        return{
            videoList :[],
            ins:1,
            value:1,
            price:2,
            date:"天",
            title:"VIP专享",
            is_vip:1,
            categorys:''
        }
    },
    activated(){
        this.$refs.pagechange.busy = true;
        this.$refs.pagechange.getVideolist("",1,1);
    },
    deactivated(){
        this.$refs.pagechange.busy = false;
    },
    mounted(){
            
    },
    computed:{
        money: function () {
                var money = 2;
                money = this.value * this.price
                if(this.value<1){
                 this.$message({
                    message: '充值天数不能小于一天',
                    type: 'warning'
                });
                this.value=1;
                money = this.value * this.price
            }
                return money;
            }


    },
    methods:{
        openVip(ins){
            this.ins = ins;
            if(ins==1){
                this.price = 2;
                this.date = "天";
            }
            if(ins==2){
                this.price = 50;
                 this.date = "月";
            }
            if(ins==3){
                this.price = 680;
                 this.date = "年";
            }
        }
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
.vip-content{
    width: 100%;
    height: 450px;
    background: url("/static/image/vip/vip.png") center center no-repeat;
    padding-top: 145px;
    .vip-box{
        width: 607px;
        height: 162px;
        background-color: #ffffff;
        box-shadow: 0px 0px 16px 0px 
            rgba(64, 45, 119, 0.63);
        border-radius: 8px;
        margin: 0 auto ; 
        padding-left: 100px;
        p{
            font-size: 14px;
            color: #444444;
            padding-top: 40px;
            span{
                color: #fc2b90;
                font-size: 24px;
                line-height: 30px;
                font-weight: 550;
                &:first-child{
                    padding-left: 4px;
                }
                &:nth-child(2){
                    padding-right: 4px;
                }
            }
            i{
                font-style:normal;
                color: #fc2b90;
               &:nth-child(3){
                    padding-left: 4px;
                }
                &:nth-child(4){
                    padding-right: 4px;
                }
            }
        }
        .vip-time{
            width: 100%;
            padding-top: 25px;
            overflow: hidden;
            span{
                display: block;
                float: left;
                height: 30px;
                line-height: 30px;
                color: #444444;
            }
            input{
                display: block;
                float: left;
                width: 70px;
                height: 30px;
                background-color: #e9e9e9;
                border-radius: 4px;
                border: solid 1px #d2d2d2;
                padding-left: 15px;
                margin-right: 10px;
                margin-left: 5px;
            }
        }
        .year{
            width: 126px;
            height: 30px;
            float: left;
            background-color: #e9e9e9;
            border-radius: 4px;
            border: solid 1px #d2d2d2;
            li{
                float: left;
                width: 33%;
                line-height: 30px;
                color: #5f5d5d;
                font-size: 14px;
                text-align: center;
                cursor: pointer;
                &:nth-child(1){
                    border-right: solid 1px #d2d2d2;
                }
                &:nth-child(2){
                    border-right: solid 1px #d2d2d2;
                }
                &:hover{
                    color: #fc2b90;
                }
                &.active{
                     color: #fc2b90;
                }
            }
        }
        .open-vip{
            float: left;
            margin-left: 10px;
            width: 70px;
            height: 30px;
            background-color: #fc2b90;
            border-radius: 4px;
            text-align: center;
            line-height: 30px;
            color: #ffffff;
            cursor: pointer;
        }
    }
}
</style>

