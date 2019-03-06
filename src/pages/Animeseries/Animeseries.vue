<template>
    <div>
        <Header ref="getAdList"></Header>
        <Content 
        ref="pagechange"
        :categorys="categorys"
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
    name:"Animeseriess",
    data(){
        return{
            videoList :[],
            categorys:"动漫系列"
        }
    },
    mounted(){
        this.$refs.pagechange.getVideolist("动漫系列");
    },
    methods:{},
    components:{
        Header,
        Footer,
        Content,
        Gotop
    },
}
</script>

