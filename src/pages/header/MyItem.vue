<template>
<div class="loading">
    <div v-if="isshow==false" class="loader-inner1">下面没有了哦…</div>
    <!-- <div v-if="flags==false" class="loader-inner1">下面没有了哦…</div> -->
    <!-- <div v-if="showone==true && flags==true" class="loader-inner1">再往下面一点，就快要出来了～</div> -->
    <div v-if="showone==true" class="loader-inner1">再往下面一点，就快要出来了～</div>
    <div v-if="isshow==true && showone==false" class="loader-inner line-scale">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
</template>
<script>
export default {
    name:"myitem",
    props:{
        isshow:Boolean,
        showone:Boolean,
        // flags:Boolean
    },
    data(){
        return{
        }

    }
}
</script>

<style lang="scss" scoped>
.loading {
    text-align: center;
    display: block;
    float: left;
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
}
.loader-inner {
  display: inline-block;
}
.loader-inner1 {
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    display: inline-block;
    opacity: 0.5;
}
@-webkit-keyframes line-scale {
  0% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }

  50% {
    -webkit-transform: scaley(0.4);
    transform: scaley(0.4);
  }

  100% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
}

@keyframes line-scale {
  0% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }

  50% {
    -webkit-transform: scaley(0.4);
    transform: scaley(0.4);
  }

  100% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
}

.line-scale > div:nth-child(1) {
  -webkit-animation: line-scale 1s 0.1s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s 0.1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div:nth-child(2) {
  -webkit-animation: line-scale 1s 0.2s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s 0.2s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div:nth-child(3) {


  -webkit-animation: line-scale 1s 0.3s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s 0.3s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div:nth-child(4) {
  -webkit-animation: line-scale 1s 0.4s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s 0.4s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div:nth-child(5) {
  -webkit-animation: line-scale 1s 0.5s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s 0.5s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div {
  background-color: #fe0061;
  width: 4px;
  height: 30px;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
}
</style>