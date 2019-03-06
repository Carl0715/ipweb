<template>
    <footer>
        <ul class="footer_box">
            <li>警告：</li>
            <li>此网站只适合十八岁或以上人士观看。此网站内容可能令人反感；</li>
            <li>不可将本网站的内容派发、传阅、出售、出租、交给或借予年龄未满18岁的人士或将本网站内容向该人士出示、播放或放映，</li>
            <li>如果你发现某些影片内容不合适，或者你是该影片的版权所有者而要求删除影片的，请 <router-link :to="{path:'/Contact'}" exact>联系我们</router-link>，我们会很快做出回复。</li>
            <li class="lastli">Copyright © 2018 seseda.vip, All Rights Reserved</li>
        </ul>
    </footer>
</template>
<script>
 import Gotop from "@/pages/header/Gotop"
export default {
    name:'footers',
    data () {
        return{
            
        }
    },
    mounted(){
         
    },
    methods:{

    },
    components:{
        Gotop
    }

}
</script>
<style lang="scss" scoped>

    footer{
        width: 100%;
        background-color: #292a30;
        padding-bottom: 14px;
        padding-top: 7px;
         .footer_box{
            width: 672px;
            margin: 0 auto;
            overflow: hidden;
            li{
                width: 100%;
                height: 29px;
                line-height: 29px;
                text-align: center;
                font-size: 12px;
                color: #999999;
               a{
                    font-size: 12px;
                    line-height: 29px;
                    color: #999999;
                    text-decoration: underline;
                }
                a:hover{
                    color: #fd2b90;
                    text-decoration: underline;
                }
            }
            .lastli{
                color: #666666;
            }
        }
    }
</style>
