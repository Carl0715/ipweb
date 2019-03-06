<template>
    <div>
        <Header></Header>
        <div class="contact-box">
            <p class="header-title">联系我们</p>
            <div class="content">
                <ul>
                    <li>
                        <label for="">您的邮箱：</label>
                        <input type="text" v-model="email" @blur="emails" placeholder="请输入邮箱">
                        <span class="pic">*</span>
                        <span class="tips">{{tips}}</span>
                    </li>
                    <li>
                        <label for="">具体事宜：</label>
                        <textarea name="" id="msg" v-model="msg" style="resize:none;" @blur="changeMsg" placeholder="有什么我们可以帮到您的"></textarea>
                        <span class="pic">*</span>
                        <span class="tips">{{tips_msg}}</span>
                    </li>
                    <li>
                        <label for="">验证码：</label>
                        <input class="code" v-model="code" type="text" @blur="changeCode" placeholder="请输入您的验证码" @keyup.enter='contactTous()'>
                        <img :src="codeImg" alt="" @click="getCodeImg">
                        <span class="pic">*</span>
                        <span class="tips">{{tips_code}}</span>
                    </li>
                </ul>
                <button type="button" class="btn" @click="contactTous()">联系我们</button>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>


<script>
import Header from "@/pages/header/Header"
import Footer from "@/pages/footer/Footer"
import {isUsername,isEmail,setCookie,getCookie} from '@/util/util.js'
import axios from "axios"
const qs = require('qs');
export default {
    name:'Contact',
    data(){
        return{
            email:'',
            msg:'',
            code:'',
            tips:'',
            tips_msg:'',
            tips_code:'',
            str:false,
            str2:false,
            str3:false,
            codeImg:'',
            save_code:''
        }
    },
    mounted(){
        
    },
    activated(){
        this.getCodeImg()
    },
    methods:{
        //邮箱
        emails(){
            if(this.email!=""){
                if(isEmail(this.email)){
                    this.tips = '';
                    this.str = true;
                }else{
                    this.tips = '请输入正确的邮箱';
                    this.str = false;
                }
            }else{
                this.tips = '邮箱不能为空';
                this.str = false;
            }
        },
        changeMsg(){
            if(this.msg==''){
                this.tips_msg = '内容不能为空'
                this.str2 = false;
            }else{
                this.tips_msg = '';
                this.str2 = true;
            }
        },
        changeCode(){
            if(this.code==''){
                this.tips_code = '验证码不能为空';
                this.str3 = false;
            }else{
                this.tips_code = '';
                this.str3 = true;
            }
        },
        contactTous(){
            if(this.str==true && this.str2==true && this.str3==true){
                axios.post('/index/index/feedback',
                    qs.stringify({
                        email:this.email,
                        content:this.msg,
                        code:this.code,
                        save_code:this.save_code
                    })).then((res)=>{
                        if(res.data.code==1){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.email = '';
                            this.msg = '';
                            this.code = '';
                            this.getCodeImg()
                        }else if(res.data.code==7){
                            this.tips_code = res.data.msg;
                            this.getCodeImg()
                            this.code = '';
                        }else{
                            this.$message.error(res.data.msg);
                            this.email = '';
                            this.msg = '';
                            this.code = '';
                            this.getCodeImg()
                        }
                    })
            }else{
                this.changeMsg();
                this.emails();
                this.changeCode();
            }
        },
        // 获取图片验证码
        getCodeImg(){
              axios.post('/index/index/captcha',
                ).
                 then((res)=>{
                   this.codeImg = res.data.data;
                   this.save_code = res.data.save_code;
                    // setCookie("code",res.data.save_code,1)
                    // localStorage.setItem("code",res.data.save_code)
                }).catch((err)=>{
                    console.log(err)
                })
        },
    },
    components:{
        Header,
        Footer
    }
}
</script>

<style lang="scss" scoped>

.contact-box{
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 45px;     
    .header-title{
        width: 1200px;
        height: 45px;
        font-family: MicrosoftYaHei;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 45px;
        letter-spacing: 0px;
        color: #ffffff;
        opacity: 0.5;
    }
    .content{
        width: 1200px;
        height: 671px;
        padding-top: 100px;
        background: #383847;
        ul{
            margin-left: 310px;
            li{
                margin-bottom: 20px;
                label{
                    width: 75px;
                    height: 40px;
                    text-align: right;
                    display: inline-block;
                    line-height: 40px;
                    margin-right: 18px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    float: left;
                }
                input{
                    width: 470px;
                    height: 40px;
                    line-height: 40px;
                    background: #ffffff;
                    border-radius: 0;
                    float: left;
                    &::placeholder{
                        font-family: MicrosoftYaHei;
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 35px;
                        letter-spacing: 0px;
                        color: #999999;
                    }
                }
                #msg{
                    width: 470px;
                    height: 165px;
                    vertical-align: top;
                    background: #ffffff;
                    border-radius: 0;
                    display: inline-block;
                    &::placeholder{
                        font-family: MicrosoftYaHei;
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #999999;
                    }
                }
                .code{
                    width: 380px;
                }
                .tips{
                    color: red;
                    font-size: 14px;
                    margin-left: 10px;
                }
                img{
                    width: 90px;
                    height: 40px;
                    float: left;
                    cursor: pointer;
                }
                .pic{
                    margin-left: 10px;
                    font-family: MicrosoftYaHei;
                    font-size: 22px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 35px;
                    letter-spacing: 0px;
                    color: #fc2b90;
                }
            }
        }
        .btn{
            width: 470px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            margin-left: 406px;
            background-color: #fc2b90;
            color: #ffffff;
            font-size: 16px;
            margin-top: 50px;
            border: 0;
            padding: 0;
        }
    }
}
</style>
