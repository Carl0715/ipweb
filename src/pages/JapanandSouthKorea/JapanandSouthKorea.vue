<template>
    <div>
        <Header></Header>
        <Content    
        ref="pagechange"
        :categorys="categorys"
        :title="title"
        :vip="is_vip"
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
    name:"JapanandSouthKorea",
   data(){
        return{
            videoList :[],
             categorys:"日韩系列",
             title:"日韩精品",
             is_vip:0
        }
    },
    activated(){
        this.$refs.pagechange.getVideolist("日韩系列",1,0); 
        this.$refs.pagechange.busy = true;
    },
    deactivated(){
        this.$refs.pagechange.busy = false;
    },
    mounted(){
        // this.$refs.pagechange.getVideolist("日韩系列",1,0); 
    },
    methods:{
   
    },
    components:{
        Header,
        Footer,
        Content,
        Gotop
    },
}
</script>

