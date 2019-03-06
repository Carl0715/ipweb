<template>
    <div>
        <Header ref="getAdList"></Header>
        <div class="box">
              <h4>套图写真</h4>
         
            <div class="container-water-fall">
                <waterfall :col='col'  :gutterWidth="gutterWidth"  :data="ImgList" @finish="finish" @loadmore="loadMore"  @scroll="scroll" >
                <template >
                    <div class="cell-item" v-for="(item,index) in ImgList" :key="index" @click="toPicdetails(item.id)">
                        <!-- <img :src="'https://'+item.server+item.img"  /> -->
                        <!-- <img v-lazy="'http://172.16.18.220:82'+item.source_img"/> -->
                        <img v-lazy="item.source_img"/>
                        <p>{{item.title}}</p>
                    </div>
                </template>
                </waterfall>
                <!-- <loading :show="loading" /> -->
                <my-item :lists="ImgList" :isshow="isshow" :loading="loading" :showone="showone"/> 
            </div>
        </div>
        <Gotop></Gotop> 
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/pages/header/Header"
import Footer from "@/pages/footer/Footer"
import Loading from "@/pages/header/loading"
import MyItem from "@/pages/header/MyItem"
import Gotop from "@/pages/header/Gotop"
import axios from "axios"
const qs = require('qs');
export default {
    name:"SexyPicturesS",
     props:{
      title:String
    },
    data(){
        return{
            ImgList:[],    
            loading: false,
            isshow:true,    
            page:2,
            col:4,
            loadstatus:null,
            showone:false,
            busy:false
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
    created(){
       
    },
    deactivated(){
        this.busy = false;
    },
    activated(){
        this.getImglist();
        this.busy = true;
    },
    mounted(){
          
    },
     components:{
        Header,
        Footer,
        MyItem,
        Loading,
        Gotop
    },
    computed:{
      itemWidth(){ 
        return (138*0.5*(document.documentElement.clientWidth/375))
      },
      gutterWidth(){
        return (9*0.5*(document.documentElement.clientWidth/375))
      }
    },
    methods:{
        
      mix(){
        this.$waterfall.mix()
      },
      switchCol(col){
        this.col = col
        console.log(this.col)
      },
      scroll(data){
        this.loadstatus = data
      },
      toPicdetails(id){
            var routeData= this.$router.resolve({
                path:"PictureDetails",
                query:{
                    "id":id
                }
            });
            window.open(routeData.href, '_blank');
      },
    //   loadmore(num){
    //     // Vue.set(this.data[index],'liked',true)
    //     console.log('loadmore')
    //     this.loading = true
    //     setTimeout(()=>{
    //       this.data = this.data.concat(this.originData)
    //       this.loading = false
    //       // console.log(this.data.length)
    //     },1000)
    //     // this.$waterfall.resize()
    //   },
    //   loadMore(){
    //     this.$waterfall.loadmore(this.originData)
    //   },
      finish(){
        console.log('finish')
      },




        // 下拉加载请求数据
        async loadMore(){
            if(this.busy){
                if(!this.loading){
                this.loading = true;
                this.showone = false;
                    // 请求下一页数据
                    setTimeout(()=>{
                    axios.post('/index/index/img_list', 
                    qs.stringify({pagesize:16,page:this.page++}) 
                    ).then((res) => {
                        if(res.data.list.length>0){
                            var data = res.data.list;
                            this.ImgList = this.ImgList.concat(data);
                            ImgList = this.map(item=>{
                                item.shows = true;
                                return item;
                            })                    
                            this.loading = false
                    

                        }else{
                            this.isshow = false;
                        }   
                    }).catch((error) => {
                        console.log(error);
                    });
                    this.loading = false


                },1000)
                
                }
            }
  },

        // 获取图片列表
         getImglist(){
            axios.post('/index/index/img_list', 
             qs.stringify({page_size:16,page:1}) 
            ).then((res) => {
                // console.log(res.data)
               var data = res.data.list;
               this.ImgList = data;
            }).catch((error) => {
                     console.log(error);
            });
            setTimeout(()=>{
                this.showone=true;
            },1000)
        },
        GoDetails(){

        },
    },
   
}
</script>
<style lang="scss" >
@import "../../assets/styles/mixins.scss";  
.box{
    width: 1200px;
    margin: 0 auto;
    h4{
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        margin-top: 42px;
        color: #ffffff;
        font-size: 26px;
    }
    .container-water-fall{
    // padding: 0 28px;
    width:1200px;
    margin: 0 auto;
    box-sizing:border-box;
    .cell-item{
            width: 290px;
            margin-right: 10px;
            margin-bottom: 10px;
            border: 1px solid #3d3d4e;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            &:hover{
                border: solid 1px #fc2b90;
            }
            img{
                // border-radius: 12px 12px 0 0;
                width: 100%;
                height: auto;
                display: block;
            }
            p{
                height: 32px;
                line-height: 32px;
                padding: 0 9px;
                width: 100%;
                position:absolute;
                left: 0;
                bottom: 0;
                background-color: #24242e;
                opacity: 0.8;
                color: #ffffff;
                font-size: 14px;
                @include ellipsis();
            }
        }
  }
}

 
</style>
