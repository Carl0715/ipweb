<template>
    <div class="gotop scrollTop "  
    ref="rightnum"
    v-show="showTop" @click="toTop()">
    </div>
</template>
<script>
// import $ from 'jquery'
export default {
    name:"top",
    data(){
        return{
            txt:"返回顶部",
             scrollTop: 0,
            time: 0,
            dParams: 20,
            scrollState: 0,
        }
    },
    computed:{
      showTop: function(){
        let value = this.scrollTop>200?true:false;
        return value;
      },
    },

    mounted() {
      window.addEventListener('scroll', this.getScrollTop);
      this.changeWidth()
      window.onresize = ()=> {
            this.changeWidth();
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.getScrollTop); 
     
    },
 
    methods:{
      toTop(e) {
        if(!!this.scrollState){
          return;
        }
        this.scrollState = 1;
        // e.preventDefault();
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let _this = this;
        this.time = setInterval(function(){ _this.gotoTop(_this.scrollTop-_this.dParams) }, 30);
      },
        gotoTop(distance){
          this.dParams += 20;
          distance = distance>0 ? distance : 0;
          document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
        if(this.scrollTop < 10){
          clearInterval(this.time);
          this.dParams = 20;
          this.scrollState = 0;
        }
      },
       getScrollTop() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      },
       changeWidth(){
          var topwidth = (document.body.clientWidth-1200)/2;
          this.$refs.rightnum.style.position='fixed';
          this.$refs.rightnum.style.right=(topwidth-95)+"px";
          this.$refs.rightnum.style.bottom=50+'px';
          }
    }
}
</script>

<style lang="scss" scoped>
.compuretu{color:white;background: red}
    .gotop{
       width: 50px;
      height: 50px;
      background-color: #ffffff;
      border-radius: 8px;
     
      position: fixed;
      right: 50px;
      bottom: 50px;
      cursor: pointer;
    background: rgba(255, 255, 255, 0.1) url("/static/image/index/top.png") center center no-repeat;
    }
</style>
