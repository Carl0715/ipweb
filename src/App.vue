<template >
  <div id="app"  @click="isDo()">
    <keep-alive>
         <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import axios from "axios"
import {mapMutations} from "Vuex"
import {getCookie,setCookie,delCookie} from "@/util/util.js"
const qs = require('qs');
export default {
  name: 'App',
  data(){
      return{
            lastTime: null, //最后一次点击的时间
            currentTime: null, //当前点击的时间
            timeOut: 4 * 60 * 60 * 1000 //设置超时时间： 10分钟
      }
  },
  created(){
      this.createTime();
  },
  mounted(){
    
  },
  methods: {
            isDo() {
                 var authkey = getCookie("mykey");
                 if(authkey!=null  && authkey!=undefined ){
                      this.currentTime = new Date().getTime(); //记录这次点击的时间
                    if(this.currentTime - this.lastTime > this.timeOut) {  //判断上次最后一次点击的时间和这次点击的时间间隔是否大于10分钟
                        // 这里写状态已过期后执行的操作
                        this.$message({
                            type: 'warning',
                            message: '登录过期,请重新登录!'
                        });
                        this.$store.dispatch('gosucc', 'false');
                        delCookie("username");
                        delCookie("mykey");
                        delCookie("code");
                        this.$router.push({ path:"/"});
                    } else {
                        this.lastTime = new Date().getTime(); //如果在10分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
                        
                    }
                 }else{
                    // this.$store.dispatch('gosucc', 'false');
                    delCookie("username");
                    delCookie("mykey");
                 }
               
            },
            createTime(){
                   var authkey = getCookie("mykey");
                   if(authkey!=null  && authkey!=undefined){
                        this.lastTime = new Date().getTime();   //网页第一次打开时，记录当前时间
                   }
            }
        },
}

</script>

<style>

</style>
