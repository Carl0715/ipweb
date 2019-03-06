<template>
<div>
    <div class="register" v-if="flag==2" :class="className">
        <div class="register-header">
            <font>注册</font>
            <div class="heaer-right" @click="close()">
                <img src="/static/image/index/x.png" alt="">
            </div>
        </div>
        <div class="register-bottom">
                <ul>
                    <li>
                        <label for="">用户名:</label><input type="text" placeholder="请输入用户名" :style="style" v-model="value" @blur="username">
                    </li>
                    <li>
                        <label for="">密码:</label><input type="password" placeholder="请输入用密码" :style="style2" v-model="passvalue" @blur="password">
                    </li>
                    <li>
                        <label for="">密码确认:</label><input type="password" placeholder="请确认密码" :style="style3" v-model="passvalue2" @blur="confirmPass">
                    </li>
                    <li>
                        <label for="">邮箱:</label><input type="text" placeholder="请输入邮箱地址" :style="style4" v-model="emailvalue" @blur="email">
                    </li>
                    <li>
                        <label for="">验证码:</label><input name="verCode" class="verCode" :style="style5" v-model="verCodeValue" type="text" placeholder="请输入验证码">
                        <el-container >
                              <el-button @click="getVerCode" type="primary" class="button" :disabled="isDisabled">{{buttonValue}}</el-button>
                        </el-container>
                    </li>
                </ul>
            <div class="tips">{{tips}}</div>
            <button class="reg" @click="register()">立即注册</button>
            <p class="toLogin"><a href="javascript:void(0)" @click="login(1)">已有账号？返回登录</a></p>
        </div>
    </div>
    <div class="login" v-if="flag==1" :class="className">
        <div class="login-header">
            <font>登录</font>
            <div class="heaer-right" @click="close()">
                <img src="/static/image/index/x.png" alt="">
            </div>
        </div>
        <div class="login-bottom">
                <ul>
                    <li>
                        <label for="">用户名:</label><input type="text" 
                        @keyup.enter="loginSucc()"  
                         autofocus="autofocus"
                        v-model="loginname" placeholder="请输入用户名"
                        >
                    </li>
                    <li>
                        <label for="">密码:</label><input type="password" @keyup.enter="loginSucc()" v-model="loginpassword" placeholder="请输入密码">
                    </li>
                    <li>
                        <label for="">验证码:</label><input name="verCode" @keyup.enter="loginSucc()" v-model="logincode" class="verCode" type="text" placeholder="请输入验证码">
                        <img @click="getCodeImg()" class="button" :src="this.codeImg" />
                    </li>
                </ul>
            <div class="tips">{{logintips}}</div>
            <button class="log"  @click="loginSucc()" >立即登录</button>
            <div class="bottom">
                <span class="left"><a href="javascript:void(0)" @click="login(2)">免费注册</a></span>
                <span class="right"><a href="javascript:void(0)" @click="login(3)">忘记密码</a></span>
            </div>
        </div>
    </div>
    <div class="find" v-if="flag==3" :class="className">
        <div class="login-header">
            <font>找回密码</font>
            <div class="heaer-right" @click="close()">
                <img src="/static/image/index/x.png" alt="">
            </div>
        </div>
        <div class="login-bottom">
            <ul>
                <li>
                    <label for="">邮箱:</label><input type="text" v-model="find_email"  :style="find_style_e" placeholder="请输入邮箱" @blur="find_emails">
                </li>
                <li>
                    <label for="">新密码:</label><input type="password" v-model="find_password" :style="find_style_p" placeholder="请输入新密码" @blur="find_word">
                </li>
                <li>
                    <label for="">验证码:</label><input name="verCode" class="verCode" :style="style5" v-model="find_verCodeValue" type="text" placeholder="请输入验证码">
                    <el-container >
                            <el-button @click="findVerCode" type="primary" class="button" :disabled="find_isDisabled">{{findWord}}</el-button>
                    </el-container>
                </li>
            </ul>
            <div class="tips">{{find_tips}}</div>
            <button class="log"  @click="find_code()">找回密码</button>
        </div>
    </div>
    <div id="cover" v-show="flag"></div>
</div>
</template>

<script>
import { Loading } from 'element-ui';
import {mapState,mapActions,mapGetters} from "Vuex"
import {isUsername,isEmail,setCookie,getCookie} from '@/util/util.js'
import axios from 'axios';
const qs = require('qs');
export default {
    name:'login',
    data(){
        return{
            flag:0,
            className:'',
            value:"",
            style:{},
            tips:'',
            loginname:"",
            loginpassword:"",
            logintips:"",
            logincode:"",
            value:"",//用户名
            passvalue:'',//密码
            passvalue2:'',//确认密码
            emailvalue:'',//邮箱
            verCodeValue:'',//验证码
            buttonValue:'发送验证码',
            buttonTime:60,
            isDisabled:false,
            findWord:'发送验证码',
            find_isDisabled:false,
            find_buttonTime:60,
            find_email:'',
            find_password:'',
            find_verCodeValue:'',
            find_tips:'',
            style:{},
            style2:{},
            style3:{},
            style4:{},
            style5:{},
            style6:{},
            find_style_e:{},
            find_style_p:{},
            tips:'',
            num1:false,//状态
            num2:false,
            num3:false,
            num4:false,
            num5:false,
            find_num:false,
            find_num2:false,
            codeImg:"",
            aaaa:0,
            count:false
        }
    },
    computed:{
        ...mapActions({
                gosucc:'gosucc',
                sign:'sign',
                user:'user',
                money:'money',
                msg:'msg',
                placeholder:'placeholder',
                setuid:'setuid'
             }),
        ...mapGetters([
            'loginSuss',
            'user',
            'SignIn',
            'other_uid'
         
        ])
    },
    mounted(){
         
    },
    methods:{
       close(){
            this.loginname = '';
            this.loginpassword="";
            this.logintips="";
            this.logincode="";
            this.value="";//用户名
            this.passvalue='';//密码
            this.passvalue2='';//确认密码
            this.emailvalue='';//邮箱
            this.verCodeValue='';//验证码
            this.flag = 0;
            this.find_email='';
            this.find_password='';
            this.find_verCodeValue='';
            this.find_tips='';
            this.style={};
            this.style2={};
            this.style3={};
            this.style4={};
            this.style5={};
            this.style6={};
            this.find_style_e={};
            this.find_style_p={};
            this.tips = ''
            document.body.style.overflow = 'auto';
        },
        // 控制登录页面显示隐藏
        login(num){
            this.className = 'animated bounceInDown';
            document.body.style.overflow = 'hidden';
            if(num==1){
                this.flag=1;
                this.getCodeImg()
            }else if(num==2){
                this.flag=2;
            }else{
                this.flag=3
            }
        },
    // 获取图片验证码
        getCodeImg(){
              axios.post('/index/index/captcha',
                ).
                 then((res)=>{
                   this.codeImg = res.data.data;
                    setCookie("code",res.data.save_code,1)
                    // localStorage.setItem("code",res.data.save_code)
                }).catch((err)=>{
                    console.log(err)
                })
        },
        // 登录接口
        loginSucc(){
            var that = this;
            var save_code = getCookie("code")
            // var save_code = localStorage.getItem("code")
            if(this.loginname === ""){
                this.logintips="请输入用户名"
            }
            else if(this.loginpassword === ""){
                this.logintips="请输入密码"
            }
            else if(this.logincode === ""){
                this.logintips="请输入验证码"
            }else{
                 axios.post('/index/index/login',
                 qs.stringify({
                     account:this.loginname,
                     password:this.loginpassword,
                     code:this.logincode,
                     save_code:save_code
                     })).
                 then((res)=>{
                    var data = res.data;
                    var url = window.location.pathname;
                     if(data.code==1){
                        this.$store.dispatch('gosucc', 'true');
                        this.$store.dispatch('user', this.loginname);
                        this.$store.dispatch('money', data.gold);
                        this.$store.dispatch('msg', data.msg_num);
                        this.$store.dispatch('placeholder',data.email);
                        setCookie('mykey',data.authkey,1)
                        var search = window.location.search;
                        if(url=='/Details'){
                            this.$router.push({ path:url+search});
                            this.$router.go(0);
                        }else{
                              this.$router.push({ path:url});
                               this.$router.go(0);
                        }
                        if(data.is_signin==1){
                            this.$store.dispatch('sign', "已签到");
                        }else{
                            this.$store.dispatch('sign', "签到");
                        }
                     }else{
                           this.logintips=data.msg;
                     }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },

     
        //用户名
        username(){
            if(this.value!=""){
                if(isUsername(this.value)){
                axios.post('/index/index/check_user_name',qs.stringify({user_name:this.value})).then((res)=>{
                        if(res.data.code==1){
                            this.style = {
                                border:"1px solid green"
                            }
                            this.tips = '';
                            this.num1 = true;
                        }
                        if(res.data.code==3){
                            this.tips = res.data.msg;
                            this.style = {
                                border:"1px solid red"
                            }
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    this.style = {
                        border:"1px solid red"
                    }
                    this.tips = '请确认用户名为6-16位字母或数字'
                }
            }else{
                this.style = {
                    border:"1px solid red"
                }
                this.tips = '用户名不能为空';
            }
        },
        //密码
        password(){
            if(this.passvalue!=""){
                if(isUsername(this.passvalue)){
                    this.style2 = {
                        border:"1px solid green"
                    }
                    this.tips = '';
                    this.num2 = true;
                }else{
                    this.style2 = {
                        border:"1px solid red"
                    }
                    this.tips = '请确认密码为6-16位字母或数字'
                }
            }else{
                this.style2 = {
                    border:"1px solid red"
                }
                this.tips = '密码不能为空'
            }
        },
        //确认密码
        confirmPass(){
            if(this.passvalue2!=""){
                if(this.passvalue2==this.passvalue){
                    this.style3 = {
                        border:"1px solid green"
                    }
                    this.tips = '';
                    this.num3 = true;
                }else{
                    this.style3 = {
                        border:"1px solid red"
                    }
                    this.tips = '两次输入的密码不一致，请确认'
                }
            }else{
                this.style3 = {
                    border:"1px solid red"
                }
                this.tips = '请确认密码'
            }
        },
        //邮箱
        email(){
            if(this.emailvalue!=""){
                if(isEmail(this.emailvalue)){
                    this.style4 = {
                        border:"1px solid green"
                    }
                   this.tips = '';
                   this.num4 = true;
                }else{
                    this.style4 = {
                        border:"1px solid red"
                    }
                    this.tips = '请输入正确的邮箱'
                }
            }else{
                this.style4 = {
                    border:"1px solid red"
                }
                this.tips = '请输入正确的邮箱'
            }
        },
        //发送验证码(注册)
        getVerCode(){
            if(this.emailvalue!='' && this.num4==true){
                if(this.count){
                    return false;
                }
                this.count = true;
                axios.post('/index/index/send_email_code',qs.stringify({email:this.emailvalue})).then((res)=>{
                    if(res.data.code==1){
                        console.log(res)
                        this.sendCode()
                    }
                })
            }else{
                if(this.num1!=true){
                    this.username()
                }else if(this.num2!=true){
                    this.password()
                }else if(this.num3!=true){
                    this.confirmPass()
                }else if(this.num4!=true){
                    this.email()
                }
            }
        },
        //发送验证码(找回密码)
        findVerCode(){
            axios.post('/index/index/send_email_code',qs.stringify({email:this.find_email})).then((res)=>{
                console.log(res)
                this.sendCode_find()
            })
        },
        //验证码(注册)
        sendCode(){
          let me = this;
            if (me.buttonTime == 0) {
                me.isDisabled = false;
                me.buttonTime = 60;
                me.buttonValue = '再次发送'
                return;
            } else {
                me.isDisabled = true;
                me.buttonValue="重新发送(" + me.buttonTime + ")";
                --me.buttonTime;
            }
            setTimeout(function() {
                me.sendCode() }
                ,1000)
        },
        //验证码(找回密码)
        sendCode_find(){
          let me = this;
          me.find_isDisabled = true;
          let interval = window.setInterval(function() {
            me.findWord = '再次发送(' + me.find_buttonTime + ')';
            --me.find_buttonTime;
            if(me.find_buttonTime < 0) {
              me.findWord = "再次发送";
              me.find_buttonTime = 60;
              me.find_isDisabled = false;
              window.clearInterval(interval);
            }
          }, 1000);
        },
        
        //注册
        register(){
            if(this.num1==true && this.num2==true && this.num3==true && this.num4){
                this.tips = ''
                if(this.verCodeValue!=""){
                    axios.post('/index/index/register',
                    qs.stringify(
                        {
                            user_name:this.value,
                            email:this.emailvalue,
                            password:this.passvalue,
                            code:this.verCodeValue,
                            level:1,
                            uid:this.other_uid
                        })).then((res)=>{
                            
                            var data = res.data;
                            if(res.data.code==1){
                                var url = window.location.pathname;
                                this.$store.dispatch('gosucc', 'true');
                                this.$store.dispatch('user', this.value);
                                this.$store.dispatch('money',res.data.gold);
                                this.$store.dispatch('msg', data.msg_num);
                                this.$store.dispatch('placeholder',this.emailvalue)
                                setCookie('mykey',res.data.authkey,1);
                                this.flag=0;
                                this.tips = '';
                                this.value = '';
                                this.emailvalue = '';
                                this.passvalue = '';
                                this.passvalue2 = '';
                                this.verCodeValue = '';
                                
                                  var search = window.location.search;
                                if(url=='/Details'){
                                    this.$router.push({ path:url+search});
                                    this.$router.go(0);
                                }else{
                                     this.$router.push({ path:url});
                                     this.$router.go(0);
                                }
                                if(data.is_signin==1){
                                    this.$store.dispatch('sign', "已签到");
                                }else{
                                    this.$store.dispatch('sign', "签到");
                                }
                            }else{
                                this.tips = res.data.msg;
                            }
                    })
                }else{
                    this.tips = '验证码不能为空'
                }

            }else{
                if(this.num1!=true){
                    this.username()
                }else if(this.num2!=true){
                    this.password()
                }else if(this.num3!=true){
                    this.confirmPass()
                }else if(this.num4!=true){
                    this.email()
                }
            }
        },
        //找回密码邮箱
        find_emails(){
            if(this.find_email!=""){
                if(isEmail(this.find_email)){
                    this.find_style_e = {
                        border:"1px solid green"
                    }
                    this.find_tips = '';
                    this.find_num = true;
                }else{
                    this.find_style_e = {
                        border:"1px solid red"
                    }
                    this.find_tips = '请输入正确的邮箱'
                }
            }else{
                this.find_style_e = {
                    border:"1px solid red"
                }
                this.find_tips = '请输入正确的邮箱'
            }
        },
        
        //设置新密码
        find_word(){
            if(this.find_password!=""){
                if(isUsername(this.find_password)){
                    this.find_style_p = {
                        border:"1px solid green"
                    }
                    this.find_tips = '';
                    this.find_num2 = true;
                }else{
                    this.find_style_p = {
                        border:"1px solid red"
                    }
                    this.find_tips = '请确认密码为6-16位字母或数字'
                }
            }else{
                this.find_style_p = {
                    border:"1px solid red"
                }
                this.find_tips = '密码不能为空'
            }
        },

        find_code(){
            if(this.find_num==true && this.find_num2==true){
                if(this.find_verCodeValue!=''){
                    axios.post('/index/index/reset_password',
                        qs.stringify({
                            email:this.find_email,
                            password:this.find_password,
                            code:this.find_verCodeValue
                        })).then((res)=>{
                            if(res.data.code==1){
                                this.flag=1;
                                this.find_tips = ''
                            }else if(res.data.code==2){
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                });
                                this.$router.push({ path:"/"});
                            }else if(res.data.code==7){
                                this.find_tips = '验证码错误'
                            }
                        })
                }else{
                    this.find_style_p = {
                        border:"1px solid red"
                    }
                    this.find_tips = '密码不能为空'
                }
            }else{
                if(this.find_num!=true){
                    this.find_emails()
                }else if(this.find_num2!=true){
                    this.find_word()
                }
            }
        }
    }


}

</script>


<style lang="scss" scoped>
.register{
        width: 580px;
        height: 460px;
        background: #24242e;
        border-radius: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -265px;
        margin-top: -230px;
        z-Index:1000; 
        .register-header{
            width: 580px;
            height: 58px;
            background: #fc2c90;
            border-radius: 8px 8px 0px 0px;
            font{
                width: 100px;
                height: 23px;
                margin-top: 19px;
                margin-left: 271px;
                display: inline-block;
                line-height: 23px;
                font-size: 24px;
                font-family: MicrosoftYaHei;
                font-weight: normal;
                font-stretch: normal;
                color: #ffffff;
                vertical-align: inherit;
            }
            .heaer-right{
                float: right;
                height: 48px;
                width: 38px;
                margin-right: 9px;
                background: url("/static/image/index/close-3.png") no-repeat 0 0;
                position: relative;
                cursor: pointer;
                img{
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    left: 11px;
                    top: 16px;
                    transition: all 0.8s;
                }
                img:hover{
                    transform: rotate(360deg)
                }
            }
        }
        .register-bottom{
            width: 580px;
            height: 402px;
            padding-top: 26px;
            padding-left: 52px;
            border: solid 1px #404051;
            border-top: 0;
            border-radius: 0px 0px 8px 8px;
            li{
                margin-bottom: 10px;
                label{
                    width: 60px;
                    height: 38px;
                    display: inline-block;
                    line-height: 38px;
                    text-align: right;
                    float: left;
                    font-size: 14px;
                    color: #ffffff;
                }
                input{
                    width: 350px;
                    height: 38px;
                    border: solid 1px rgba(255, 255, 255, 0.2);
                    margin-left: 20px;
                    background: #24242e;
                    color: #ffffff;
                    &::placeholder{
                        font-family: MicrosoftYaHei;
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 38px;
                        letter-spacing: 0px;
                        color: #f5f5f5;
                        opacity: 0.2;
                    }

                
                }
                input[name="verCode"]{
                    width: 256px;
                    float: left;
                }
                .button{
                    width: 93px;
                    height: 38px;
                    // line-height: 38px;
                    background: #fc2c90;
                    text-align: center;
                    font-size: 14px;
                    color: #ffffff;
                    border: none;
                    padding: 0;
                    border-radius:0;
                    cursor: pointer;
                }
                
            }
            .tips{
                height: 30px;
                line-height: 30px;
                margin-right: 52px;
                color: red;
                text-align: center;
            }
            .reg{
                width: 150px;
                height: 50px;
                border-radius: 4px;
                background: #fc2c90;
                border: none;
                margin-left: 163px;
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #f5f5f5;
            }
            .toLogin{
                margin-top: 11px;
                line-height: 13px;
                margin-right: 52px;
                text-align: center;
                font-family: MicrosoftYaHei;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                opacity: 0.5;
            }
        }
    }
    .login{
        // display: none;
        width: 580px;
        height: 380px;
        background: #24242e;
        border-radius: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -265px;
        margin-top: -230px;
        z-index: 1000;
        .login-header{
            width: 580px;
            height: 58px;
            background: #fc2c90;
            border-radius: 8px 8px 0px 0px;
            font{
                width: 100px;
                height: 23px;
                margin-top: 19px;
                margin-left: 271px;
                display: inline-block;
                line-height: 23px;
                font-size: 24px;
                font-family: MicrosoftYaHei;
                font-weight: normal;
                font-stretch: normal;
                color: #ffffff;
                // vertical-align: inherit;
            }
            .heaer-right{
                float: right;
                height: 48px;
                width: 38px;
                margin-right: 9px;
                background: url("/static/image/index/close-3.png") no-repeat 0 0;
                position: relative;
                cursor: pointer;
                img{
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    left: 11px;
                    top: 16px;
                    transition: all 0.8s;
                }
                img:hover{
                    transform: rotate(360deg)
                }
               
            }
        }
        .login-bottom{
            width: 580px;
            height: 322px;
            padding-top: 26px;
            li{
                margin-bottom: 10px;
                margin-left: 66px;
                label{
                    width: 48px;
                    height: 38px;
                    display: inline-block;
                    line-height: 38px;
                    text-align: right;
                    float: left;
                    font-size: 14px;
                    color: #ffffff;
                }
                input{
                    width: 350px;
                    height: 38px;
                     border: solid 1px rgba(255, 255, 255, 0.2);
                    margin-left: 20px;
                    background: #24242e;
                    color: #fff;
                    &::placeholder{
                        font-family: MicrosoftYaHei;
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 38px;
                        letter-spacing: 0px;
                        color: #f5f5f5;
                        opacity: 0.2;
                    }
                }
                input[name="verCode"]{
                    width: 256px;
                    float: left;
                }
                .button{
                    width: 93px;
                    height: 38px;
                    background: #fc2c90;
                    border: 0;
                    border-radius: 0;
                    cursor: pointer;
                }
            }
            .tips{
                width: 100%;
                height: 10px;
                line-height: 10px;
                margin-right: 52px;
                color: red;
                text-align: center;
            }
            .log{
                width: 150px;
                height: 50px;
                border-radius: 4px;
                background: #fc2c90;
                border: none;
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #f5f5f5;
                margin-left: 215px;
                margin-top: 10px;
            }
            .bottom{
                width: 100%;
                height: 20px;
                margin-top: 33px;
                overflow: hidden;
                .left{
                    margin-top: 33px;
                    margin-left: 58px;
                    width: 49px;
                    height: 13px;
                    font-family: MicrosoftYaHei;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    opacity: 0.5;
                }
                .right{
                    margin-right: 77px;
                    float: right;
                    width: 49px;
                    height: 13px;
                    font-family: MicrosoftYaHei;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    opacity: 0.5;
                }
            }
        }
    }

    .find{
        // display: none;
        width: 580px;
        height: 380px;
        background: #24242e;
        border-radius: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -265px;
        margin-top: -230px;
        z-index: 1000;
        .login-header{
            width: 580px;
            height: 58px;
            background: #fc2c90;
            border-radius: 8px 8px 0px 0px;
            font{
                width: 100px;
                height: 23px;
                margin-top: 19px;
                margin-left: 250px;
                display: inline-block;
                line-height: 23px;
                font-size: 24px;
                font-family: MicrosoftYaHei;
                font-weight: normal;
                font-stretch: normal;
                color: #ffffff;
                // vertical-align: inherit;
            }
            .heaer-right{
                float: right;
                height: 48px;
                width: 38px;
                margin-right: 9px;
                background: url("/static/image/index/close-3.png") no-repeat 0 0;
                position: relative;
                cursor: pointer;
                img{
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    left: 11px;
                    top: 16px;
                    transition: all 0.8s;
                }
                img:hover{
                    transform: rotate(360deg)
                }
               
            }
        }
        .login-bottom{
            width: 580px;
            height: 322px;
            padding-top: 26px;
            li{
                margin-bottom: 10px;
                margin-left: 66px;
                label{
                    width: 48px;
                    height: 38px;
                    display: inline-block;
                    line-height: 38px;
                    text-align: right;
                    float: left;
                    font-size: 14px;
                    color: #ffffff;
                }
                input{
                    width: 350px;
                    height: 38px;
                    border: solid 1px rgba(255, 255, 255, 0.2);
                    margin-left: 20px;
                    background: #24242e;
                    color: #fff;
                    &::placeholder{
                        font-family: MicrosoftYaHei;
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 38px;
                        letter-spacing: 0px;
                        color: #f5f5f5;
                        opacity: 0.2;
                    }
                   
                }
                  
                input[name="verCode"]{
                    width: 256px;
                    float: left;
                }
                .button{
                    width: 93px;
                    height: 38px;
                    background: #fc2c90;
                    border: 0;
                    border-radius: 0;
                    padding: 0;
                    cursor: pointer;
                }
            }
            .tips{
                width: 100%;
                height: 10px;
                line-height: 10px;
                margin-right: 52px;
                color: red;
                text-align: center;
            }
            .log{
                width: 150px;
                height: 50px;
                border-radius: 4px;
                background: #fc2c90;
                border: none;
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #f5f5f5;
                margin-left: 215px;
                margin-top: 10px;
            }
            .bottom{
                width: 100%;
                height: 20px;
                margin-top: 33px;
                overflow: hidden;
                .left{
                    margin-top: 33px;
                    margin-left: 58px;
                    width: 49px;
                    height: 13px;
                    font-family: MicrosoftYaHei;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    opacity: 0.5;
                }
                .right{
                    margin-right: 77px;
                    float: right;
                    width: 49px;
                    height: 13px;
                    font-family: MicrosoftYaHei;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    opacity: 0.5;
                }
            }
        }
    }
    #cover{
        position:absolute;
        left:0px;
        top:0px;
        background:rgba(0, 0, 0, 0.7);
        width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
        height:100%;
        opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
        // display:none; 
        z-Index:999;  
    }
</style>
