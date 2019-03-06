<template>
    <div>
        <Header ref="getAdList" ></Header>
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
import { mapMutations } from 'Vuex'
export default {
    name:"StockResourcess",
    data(){
        return{
            videoList :[],
             categorys:"",
             title:"绝版资源",
             is_vip:0
        }
    },
    computed:{
       ...mapMutations([
           
       ]),
   },
    created() {
     
    },
    activated(){
        this.$refs.pagechange.getVideolist("",1,0);
        this.$refs.pagechange.busy = true;
    },
    deactivated(){
        this.$refs.pagechange.busy = false;
    },
    mounted(){
         
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

