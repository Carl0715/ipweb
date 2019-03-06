<template>
<div class="Gbox-content">
    <div class="safety-top">
        <ul>
            <li>
                <label for="">旧密码：</label>
                <input v-model="old_password" type="password" placeholder="请输入旧密码" @blur="find_old">
            </li>
            <li class="tip" :style="old_style">{{old_tip}}</li>
            <li>
                <label for="">新密码：</label>
                <input v-model="new_password" type="password" placeholder="请输入新密码" @blur="find_new">
            </li>
            <li class="tip" :style="new_style">
                {{new_tip}}
            </li>
            <li>
                <label for="">确认新密码:</label>
                <input v-model="new_password2" type="password" placeholder="请再次输入新密码">
            </li>
            <li class="tip" :style="new_style2">{{new_tip_s}}</li>
        </ul>
        <el-button type="primary" @click="changeMsg" class="changeMsg">确认修改</el-button>
    </div>
    <div class="safety-bottom">
        <label for="">绑定邮箱：</label>
        <input v-model="new_email" type="text" :placeholder="this.new_placeholder">
        <p :style="email_style">{{email_tip}}</p>
        <el-button type="primary" @click="changeEmail" class="changeEmail">确认修改</el-button>
    </div>
</div>  
</template>

<script>
import {mapGetters,mapActions} from "Vuex"
import {isUsername,isEmail,getCookie} from '@/util/util.js'
import Axios from 'axios';
const qs = require('qs');
export default {
    name:'safety',
    data(){
        return{
            old_password:'',        //旧密码
            new_password:'',        //新密码
            new_password2:'',       //新密码
            new_email:'',           //新邮箱
            newplaceholder:'',     //新邮箱
            old_tip:'',
            new_tip:'6-16位字母和数字的组合',
            new_tip_s:'',
            old_style:{},
            new_style:{},
            new_style2:{},
            str:false,
            str2:false,

            email_tip:'忘记密码，可通过绑定邮箱找回',
            email_style:{},
            authkey:''
        }
    },
    mounted(){
        var authkey = this.authkey = getCookie('mykey');
    },
    computed:{
        ...mapGetters([
            'new_placeholder'
        ]),
        ...mapActions([
            'placeholder'
        ])
    },
    methods:{
        //修改密码一系列验证
         find_old(){
             if(this.old_password!=''){
                 this.old_tip = '';
                 this.str = true;
             }else{
                 this.old_tip = '密码不能为空';
                 this.old_style = {
                     color:'red'
                 }
             }
         },
         find_new(){
             if(this.new_password!=''){
                 if(isUsername(this.new_password)){
                     this.new_tip = '6-16位字母和数字的组合';
                     this.new_style = {
                         color:'#b0b0b5'
                     }
                     this.str2 = true;
                 }else{
                    this.new_tip = '请确认密码为6-16位字母或数字';
                    this.new_style = {
                        color:'red'
                    }
                 }
             }else{
                 this.new_tip = '密码不能为空';
                 this.new_style = {
                     color:'red'
                 }
             }
         },

         //修改密码
         changeMsg(){
            if(this.str==true && this.str2==true){
                if(this.new_password==this.new_password2){
                    Axios.post('/index/index/update',
                        qs.stringify({
                            authkey:this.authkey,
                            name:['old_password','new_password'],
                            param:[this.old_password,this.new_password],
                            type:3
                        })).then((res)=>{
                            if(res.data.code==1){
                                this.new_tip_s = '修改成功'
                                this.new_style2 = {
                                    color:'green'
                                }
                                this.old_password = '';
                                this.new_password = '';
                                this.new_password2 = '';
                                setTimeout(()=>{
                                    this.new_tip_s = ''
                                },3000)
                            }else{
                                this.new_tip_s = res.data.msg;
                                this.new_style2 = {
                                    color:'red'
                                }
                            }
                        })
                }else{
                    this.new_tip_s = '两次输入的密码不一致，请确认'
                    this.new_style2 = {
                        color:'red'
                    }
                }
            }else{
                this.find_old()
                this.find_new()
                // if(this.str!=true){
                // }else if(this.str2!=true){
                // }
            }
             
         },
         //修改邮箱
        changeEmail(){
            if(this.new_email!=''){
                if(isEmail(this.new_email)){
                    Axios.post('/index/index/update',
                        qs.stringify({
                            authkey:this.authkey,
                            name:['email'],
                            param:[this.new_email],
                            type:2
                        })).then((res)=>{
                            console.log(res.data)
                            if(res.data.code==1){
                                this.$store.dispatch('placeholder',this.new_email)
                                this.email_tip = '恭喜您邮箱绑定成功！';
                                this.email_style = {
                                    color:'green'
                                }
                                this.new_email = '';
                                setTimeout(()=>{
                                    this.email_tip = '忘记密码，可通过绑定邮箱找回';
                                    this.email_style = {
                                        color:'#b0b0b5'
                                        }
                                },5000)
                            }else{
                                this.email_tip = res.data.msg;
                                this.email_style = {
                                    color:'red'
                                }
                            }
                        })
                }else{
                    this.email_tip = '请输入正确邮箱';
                    this.email_style = {
                        color:'red'
                    }

                }
            }else{
                this.email_tip = '请输入正确邮箱';
                this.email_style = {
                        color:'red'
                    }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/account.scss';
</style>
