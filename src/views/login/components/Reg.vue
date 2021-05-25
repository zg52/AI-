<!--
 * @Author: your name
 * @Date: 2021-05-08 15:49:00
 * @LastEditTime: 2021-05-11 11:17:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitee\pc\faceCloudWebsite\src\views\login\reg.vue
-->
<style lang="scss" scoped>
.reg {
width: 1000px;
margin:0 auto;
background: #fff;
border-radius: 20px;
margin-top: 80px;
padding-top: 20px;
padding-bottom: 50px;
h4 {
      color: #333;
  font-size: 24px;
  display: block;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
}
.form {width: 400px;
    margin: 0 auto;}
.pass {
&::v-deep .el-form-item__content {
    display: flex;
}
::v-deep .el-input__inner {
    width: 300px;
}
.el-icon-info {
    position: relative;
    left: 5px;
    top:10px;
}
}
.authCode {
  width: 160px;
  ::v-deep.el-input__inner {
    width: 160px;
  }
}
.authCode_btn {margin-left: 5px;}
</style>
<template>
<div>
    <div class="reg" v-show="regShow">
        <h4>请填写账号信息</h4>
      <el-form class="form" ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
           <el-form-item label="用户类型："><el-radio-group v-model.trim="form.type"> <el-radio label="user">个人</el-radio><el-radio label="com">公司</el-radio></el-radio-group></el-form-item>
           <el-form-item label="用户名：" prop="username"><el-input v-model.trim="form.username" placeholder="4~20位数字和字母组合"  maxlength="20" clearable></el-input></el-form-item>
           <el-form-item label="手机号：" prop="mobile"><el-input v-model.trim="form.mobile" placeholder="请输入手机号" clearable></el-input></el-form-item>
           <el-form-item label="验证码：" prop="verifyCode"><el-input v-model.trim="form.verifyCode" placeholder="请输入验证码"  class="authCode" clearable></el-input>
           <el-button type="primary" class="authCode_btn" :disabled="authCodeBtnStatus" @click="getauthCodeHandler('form')">{{ authCodeTxt }}</el-button>
           </el-form-item>
           <el-form-item label="邮箱：" prop="email"><el-input type="email" v-model.trim="form.email" placeholder="请输入邮箱" clearable></el-input></el-form-item>
           <el-form-item label="密码：" prop="password" class="pass"><el-input type="password" v-model.trim="form.password" placeholder="12~18位数字、字母和符号组合" maxlength="18" clearable :show-password="true"></el-input>
             <el-tooltip class="item" effect="light" placement="top"> <div slot="content">设置的密码应为字母、数字和符号（仅限 ASCII 标准字符）<br/>组合，长度在12~18字符之间</div> <i class="el-icon-info"></i> </el-tooltip>
           </el-form-item>
           <el-form-item label="确认密码：" prop="checkPsw"><el-input type="password" v-model.trim="form.checkPsw" placeholder="请再次输入密码" clearable :show-password="true"></el-input></el-form-item>
           <el-form-item><el-button plain @click="regHide_loginShow">返 回</el-button> <el-button type="primary" @click="submitHandle('form')">确认注册</el-button></el-form-item>
      </el-form>
    </div>
    <div class="regSuccess" v-show="regSuccessShow">
        
    </div>
    </div>
</template>
<script>
import {validPhone, validatePass, validateRegName } from '@/utils/validate.js'
import {reg, isUser, isEmail, getMobileCode, login } from '@/api/user'

let vm

export default {
 data() {

 // 注册判断用户名是否可用
   let validateName1 = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入用户名"))
        : !validateRegName(value)
        ? callback(new Error("用户名必须为4~20位数字和字母组合"))
        : this.isUserHandler().then((res) => {
            !res
              ? callback(
                  new Error("用户名已存在"),
                  this.$message({
                    message: "用户名已存在",
                    type: "warning",
                    duration: 3 * 1000,
                  })
                )
              : callback()
          })
    },
    
 // 注册判断邮箱是否可用
    validate_registerEmail = (rule, value, callback) => {
      this.isEmail().then((res) => {
        !res
          ? callback(
              new Error("邮箱已存在"),
              this.$message({
                message: "邮箱已存在",
                type: "warning",
                duration: 3 * 1000,
              })
            )
          : callback()
      })
    },
    validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("手机号格式错误"))
      } else {
        callback()
      }
     },
    validatePsw_regist = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入密码"))
        : !validatePass(value)
        ? callback(new Error("请输入12~18位数字、字母和符号组合的密码"))
        : this.form.checkPsw !== ""
        ? this.$refs.form.validateField("checkPsw")
        : callback()
      callback()
    },
     validatePsw1_regist = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请再次输入密码"))
        : value !== this.form.password
        ? callback(new Error("两次输入密码不一致!"))
        : callback()
      callback()
    }
    function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }

     return  {
            form: {
                type: 'user',
                username: 'zhanglong123',
                mobile: '15652970369',
                verifyCode: null,
                email: 'longarui@163.com',
                password: '12345qwe...ewq',
                checkPsw: '12345qwe...ewq'
            },
            authCodeBtnStatus: false,
            authCode_disabledTxt: "后重新获取",
            authCodeTxt: "获取验证码",
            authCodeTime: 60,
            rules: {
            username: [notNull('用户名')[0], { validator: validateName1, trigger: "blur"  }],
            mobile: [notNull('手机号')[0], {validator: validatePhone, trigger: "blur"}],
            verifyCode: notNull('验证码'),
            email: [
                  { required: true, message: "请输入邮箱地址", trigger: "blur" },
                  {
                    type: "email",
                    message: "请输入正确的邮箱地址",
                    trigger: ["blur", "change"],
                  },
                  { validator: validate_registerEmail, trigger: "blur" },
                ],
            password: [{required: true, validator: validatePsw_regist, trigger: "blur" }],
            checkPsw: [{required: true,  validator: validatePsw1_regist, trigger: "blur" }]
            },
        regSuccessShow: false,
        regShow: true
        }
    },
  methods: {
    isEmail() {
        return isEmail(this.form.email).then((res) => {
          return res.data ? true : false
        })
      },

    isUserHandler() {
      return isUser(this.form.username).then((res) => {
        return res.data ? true : false
      })
    },
    regHide_loginShow() {
       this.$emit('regHide_loginShow')
        },
    submitHandle(el) {
       this.$refs[el].validate((valid) => {
          if (valid) {
           delete this.form.checkPsw
           reg(this.form).then(res => {
               if(res.code === 0) {
                this.regShow = false, this.regSuccessShow = true
// 注册成功自动登录
            // this.$store.dispatch('user/login',{
            //       type: 'root',
            //       username: this.form.username,
            //       password: this.password
            //   }).then(() => {
            //        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            // })
               } else {
                   this.$message.success('注册成功，请登录', 4000)
                   this.regHide_loginShow()
               }
           })
      }})
    },
    getauthCodeHandler(el) {
      let timeDecrease = this.authCodeTime
      this.$refs[el].validateField("mobile", (validPhone) => {
        if (!validPhone) {
              getMobileCode({mobile: vm.form.mobile}).then((res) => {
                if (res.code == 0) {
                  authCodeHandler()
                } 
                // else {
                //   vm.$message.warning('验证码发送失败，请稍后重试', 5000)
                // }
              })
        }
      })
      function authCodeHandler() {
        let timer = setInterval(() => {
          timeDecrease--
          if (!timeDecrease <= 0) {
            vm.authCodeTxt =
              timeDecrease + "s" + vm.authCode_disabledTxt
            vm.authCodeBtnStatus = true
          } else {
            clearInterval(timer)
            vm.authCodeTxt = "获取验证码"
            vm.authCodeBtnStatus = false
          }
        }, 1000)
        new Promise((resolved) => {
          if (timeDecrease != 58) resolved()
        }).then(() => {
            vm.$message.success('验证码已发送至您的手机，请注意查收', 5000)
        })
      }
    },
    },
    created() {
        vm = this
    },
}
</script>