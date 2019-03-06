<template>
    <div>
        <Header ref="getAdList"></Header>
        <div class="box-shade">
             <div class="offer-content">
                <ul class="left-title">
                    <li :class="{active:ins==0}">金币任务</li>
                    <li :class="{active:ins==1}">关于金币</li>
                    <li :class="{active:ins==2}">优惠活动</li>
                </ul>
                <div class="right-content">
                    <div class="jbrw">
                        <p>分享好友，欢乐加倍，激情满满</p>
                        <div class="Introduction">
                            <p>独乐乐不如众乐乐,呼朋唤友来看片！</p>
                            <p>欢乐加倍，激情满满！</p>
                            <p>使用您的专属分享链接或二维码把本站分享给朋友，将获得金币奖励！</p>
                            <p>金币可用于观看VIP级别的精彩视频！</p>
                        </div>
                      
                        <p>分享专属链接到<span>微信</span><span>QQ好友</span><span>朋友圈</span><span>论坛</span>会得到更多金币哟</p>
                        <p>个朋友的点击系统会奖励<span>1个金币</span>,每个朋友通过你的专属链接注册系统会奖励<span>6个金币</span></p>
                        <div class="copy-box">
                            <span>专属分享链接 : </span>
                            <input type="text" name="" id="" v-model="value">
                            <span>复制链接</span>
                        </div>
                        <div class="two-code">
                            <img src="" alt="">
                            <p>下载二维码</p>
                        </div>
                    </div>
                    <div class="yyjb"></div>
                    <div class="yhhd"></div>
                </div>
            </div>
        </div>
       
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/pages/header/Header"
import Content from "@/pages/header/Content"
import Footer from "@/pages/footer/Footer"
export default {
    name:"offer",
    data(){
        return{
            ins:0,
            value:"http//:www.baidu.com/usernamewww.baidu.com/username"
        }
    },
    mounted(){
        
    },
    methods:{},
    components:{
        Header,
        Footer,
       
    },
}
</script>
<style lang="scss" scoped>
.box-shade{
    width: 100%;
    background-color: #24242e;
    padding-top: 18px;
    min-height: 776px;
    .offer-content{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        .left-title{
            width: 150px;
            height: 503px;
            float: left;
            margin-right: 20px;
            background-color: #3d3d4e;
            li{
                width: 150px;
                height: 50px;             
                line-height: 50px;
                text-align: center;
                color: #ffffff;
                font-size: 18px;
                cursor: pointer;
                &:hover{
                    background-color: #fc2b90;
                }
                &.active{
                    background-color: #fc2b90;
                }
            }
        }
        .right-content{
            float: right;
            width: 1030px;
            min-height: 503px;
            background-color: #3d3d4e;
        }
    }
}

</style>

