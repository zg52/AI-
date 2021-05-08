<style lang="scss" scoped>

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;

opacity: 1;
background: #ffffff;
border-radius: 20px;
  }
  .con {
    padding: 16px 40px 40px 40px;
  }
  .title-container {
    position: relative;
    margin-bottom:50px;
    .title {
      font-size: 24px;
    text-align: center;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}

.container_tit {
  background: #002766;
  height: 64px;
  width: 100%;
  display: flex;
  img { 
    width: 115px; 
    margin-left: 75px;
    height: 44px;margin-top: 10px;
  }
  span {
    color: #aa92ff;
    line-height: 40px;
    padding-left: 10px;
    font-size: 14px;
  }
}
.base {
  color: #ccc;
  width: 100%;
  line-height: 30px;
  height: 30px;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
   font-size: 12px;
}
.main {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  align-items: center;
  .banner {
    margin-right: 280px;
  }
}

::v-deep .el-form-item--medium {
  margin-bottom: 30px;
}
.handle_login {
  width:100%;margin-top: 20px;
  padding: 15px 0!important;font-size: 16px!important;
}
// 

.admin p {
color: #999;
font-size: 12px;
padding-left: 26px;
span {
  cursor: pointer;
  color: #409EFF;
}
}
.admin {
  ::v-deep {
    .el-form-item__content {line-height: inherit!important;}
    .el-form-item--medium .el-form-item__content {
      padding: 12px;
      padding-bottom:0;
      cursor: pointer;
    }
    .el-form-item--medium {
      margin-bottom: 15px;
    }
    
  }
  ::v-deep .active {
      background: #E6F7FF!important;
      border:1px #1890FF solid;
      box-sizing: border-box;
      border-radius: 8px;

    }
    ::v-deep .el-radio__label {
      font-size: 16px;
    }
}
.loginBox {
  .t {
    display: inline-block;
      height: 1px;
      background: #dcdfe6;
      width: 100%;
      vertical-align: middle;
  }
  .svg-icon {
    fill: #999;
  }
}

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .forget {
    color: #999;
  font-size: 14px;
  cursor: pointer;
  display: block;
  &:hover {
    color: #409EFF;
  }
}
.wei {
  color: #999;
  padding-top: 14px;
  text-align: center;
}
.creatRoot {
  width: 100%;
  padding: 14px 0;
  font-size: 16px;
}
.agreeChecked {
  padding-top:10px;
}
.agreeChecked + span {
    color: #999!important;
    font-size: 14px;
    padding-left: 8px;
    cursor: pointer;
}
.loginTab {
display: flex;
justify-content: center;
border:1px #dcdfe6 solid;
width: 300px;
margin: 0 auto;
margin-bottom:20px;
margin-top: 20px;
box-sizing: border-box;
span {
  display: block;
  width: 150px;
  text-align: center;
  height: 40px;
  line-height: 40px;
cursor: pointer;
}
span.active {
  color: #fff;
  background: #409EFF;
}
span:last-child {
  cursor: not-allowed;
}
}
.reg {
::v-deep.el-dialog__title {
  color: #333;
  font-size: 26px;
  padding-top:40px;
  display: block;
  display: none;
}
::v-deep.el-dialog.is-fullscreen {
  // margin-top:60px;
  // background: #f8f8f8;
}
::v-deep.el-dialog__wrapper {
  overflow-y: hidden;
}
 
}
</style>

<template>
  <div class="login-container">
    <div class="container_tit"><img src="../../assets/image/home-logo.png"></div>

<div class="main" v-show="loginBox">
      <div class="banner">
       <img src="../../assets/image/banner.png" width="657">
       </div>
       <div>

<el-form ref="loginForm" v-if="loginShow" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="con">
      <div class="title-container"><h3 class="title">辨识云登录</h3></div>

<div class="admin">
       <el-form-item :class="{active: active0}" @click.native="rootBox"> <el-radio v-model="radio" label="1">根用户</el-radio> <p>执行需要无限制访问权限的任务的账户拥有者。<span @click="info">了解更多</span></p> </el-form-item>
      <el-form-item :class="{active: active1}" @click.native="iamBox"> <el-radio v-model="radio" label="2">IAM用户</el-radio> <p>在账户中执行日常任务的用户。<span @click="info">了解更多</span></p> </el-form-item>
</div>

<div class="loginBox">
<p class="t"></p>
     <div class="loginTab">
       <span class="active">账户密码登录</span>
       <span>短信登录</span>
     </div>
      <el-form-item prop="username"><span class="svg-container"><svg-icon icon-class="user" /></span><el-input ref="username" v-model.trim="loginForm.username" placeholder="请输入用户名/手机号/邮箱" name="username" type="text" clearable /></el-form-item>
      <el-form-item prop="password"> <span class="svg-container"><svg-icon icon-class="password" /></span> <el-input ref="password" v-model.trim="loginForm.password" placeholder="请输入密码" type="password" clearable /> </el-form-item>
       <div class="flex flexbetween"><el-checkbox v-model.trim="checked">记住我</el-checkbox><span class="forget" @click="loginShowHandle">忘记密码？</span></div>
      <el-button class="handle_login" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
      <p class="wei">还未注册？</p>
      <el-button type="primary" class="creatRoot" plain @click="creatRootHandle">创建根账户</el-button>
       <el-checkbox v-model.trim="agreeChecked" class="agreeChecked"></el-checkbox><span @click="agreeHandle">阅读并同意《服务条款》《法律声明》《隐私政策》</span>
</div>
      </div>
    </el-form>
    
<!-- ###########找回密码 ##########--> 
 <el-form ref="findPassRule" v-if="findPassShow" :model="findPassForm" :rules="findPassRule" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container"><h3 class="title">人脸辨识云·门禁系统</h3></div>
      <el-form-item prop="username"><span class="svg-container"><svg-icon icon-class="user" /></span><el-input v-model.trim="findPassForm.username" placeholder="用户名" type="text" clearable /></el-form-item>
      <el-form-item prop="email"><span class="svg-container"><svg-icon icon-class="emial" /></span><el-input v-model.trim="findPassForm.email" placeholder="邮箱" name="emial" type="text" clearable /></el-form-item>
      <el-form-item prop="verifyCode" class="verify inline_block"><span class="svg-container"><svg-icon icon-class="authCode" /></span><el-input v-model.trim="findPassForm.verifyCode" placeholder="邮箱验证码" type="text" clearable/></el-form-item>
      <el-button type="primary" class="verifyCode_btn ml10 inline_block" :disabled="findPassForm.verifyCodeBtnStatus" @click.prevent="getverifyCodeHandler_psw('findPassRule')">{{ findPassForm.verifyCodeTxt }}</el-button>
      <el-form-item prop="newPass"> <span class="svg-container"><svg-icon icon-class="password" /></span><el-input :key="passwordType" v-model.trim="findPassForm.newPass" :type="passwordType" placeholder="新密码" clearable />
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
        </el-form-item>
      <el-form-item prop="checkPsw"> <span class="svg-container"><svg-icon icon-class="password" /></span><el-input :key="passwordType" v-model.trim="findPassForm.checkPsw"  :type="passwordType" placeholder="确认新密码" clearable />
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
        </el-form-item>
       <div class="flex flexbetween"><el-checkbox v-model.trim="checked">记住密码</el-checkbox> <span class="forget" @click.prevent="goLoginHandle">去登录</span></div>
      <el-button class="handle_login" :loading="loading" type="primary" @click="changePswHandler('findPassRule')">确 认</el-button>
    </el-form>
   </div>
  </div>

  <Reg v-show="regShow" @regHide_loginShow="regHide_loginShow"/>

<!-- 服务条款 -->
  <el-dialog
    title="用户服务条款 / 法律声明 / 隐私政策"
    :visible.sync="dialogVisible"
    width="60%"
    top="0"
    >
    <div>
      <privacy />
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="agreeChecked = true, dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
    <footer class="base">{{ `版权信息： CopyRight © 2016-${ new Date().getFullYear() } 华捷艾米 版权所有 京ICP备18040828号-1` }}</footer>

  </div>
</template>
<script>

import Cookies from 'js-cookie'
import { getVerifyCode, findPass } from "@/api/user"
import privacy from '@/views/privacy/privacy'
import Reg from '@/views/login/components/Reg'
import md5 from 'js-md5'
import { filterAsyncRoutes } from '@/store/modules/permission'

export default {
  components: {
    privacy,
    Reg
  },
  name: 'login',
  data() {
  let validatePsw1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.findPassForm.newPass) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }
    return {
      loginBox: false,
      regShow: true,
      radio: '2',
      active0: false,
      active1: true,
      agreeChecked: true,
      dialogVisible: false,
      regDialog: true,

      loginShow: true,
      findPassShow: false,
      checked: false,
      checkedStatus: false,
      loginForm: {
        username: null,
        password: null
      },
      loginRules: {
        username:  notNull('用户名'),
        password:  notNull('密码'),
      },

      findPassForm: {
        username: null,
        email: null,
        verifyCode: null,
        newPass: null,
        checkPsw: null,
        verifyCodeTxt: "获取验证码",
        verifyCodeBtnStatus: false,
        verifyCodeTime: 60,
      },
      findPassRule: {
        username: notNull('用户名'),
        email: [
          notNull('邮箱地址')[0],
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        verifyCode:notNull('验证码'),
        newPass: [
          notNull('新密码')[0],
          {
            min: 6,
            message: "请输入大于6位数字和字母组合的密码",
            trigger: "blur",
          },
        ],
        checkPsw: [{required: true, validator: validatePsw1, trigger: 'blur' }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    regHide_loginShow() {
      this.regShow = false, this.loginBox = true
    },
    creatRootHandle() {
      this.regShow = true, this.loginBox = false
    },
    rootBox() {
      this.radio = '1'
      this.active0 = true
      this.active1 = false
    },
    iamBox() {
      this.radio = '2'
      this.active0 = false
      this.active1 = true
    },
    agreeHandle() {
      this.dialogVisible = true
    },
    info() {
      // alert(0)
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      let user = this.loginForm
      this.$refs.loginForm.validate(valid => {
        if (valid) {
         if(this.agreeChecked) {
            this.loading = true
          this.$store.dispatch('user/login',user).then(() => {
           if(this.checked) {
              Cookies.set('username',user['username'], {expires: 10})
             Cookies.set('password',user['password'], {expires: 10})
             Cookies.set('checkedStatus', true)
           } else {
             Cookies.remove('username')
             Cookies.remove('checkedStatus')
           }
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
         } else {
           this.$message('请阅读并同意《服务条款》《法律声明》《隐私政策》', 4000)
         }
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
     loginShowHandle() {
      this.loginShow = false
      this.findPassShow = true
    },
    goLoginHandle() {
      this.findPassShow = false
      this.loginShow = true
    },


// --------------------------找回密码---------------------------
    verifyCodeHandler(x, y) {
      let _this = this,
        updatedKey = x,
        timeDecrease = x[y]
      let timer = setInterval(() => {
        timeDecrease--
        if (!timeDecrease <= 0) {
          this.$set(updatedKey, "verifyCodeTxt", timeDecrease + "s后重新获取")
          this.$set(updatedKey, "verifyCodeBtnStatus", true)
        } else {
          clearInterval(timer)
          this.$set(updatedKey, "verifyCodeTxt", "获取验证码")
          this.$set(updatedKey, "verifyCodeBtnStatus", false)
        }
      }, 1000)
      new Promise((resolved) => {
        if (timeDecrease != 58) resolved()
      }).then(() => {
        _this.$message({
          message: "验证码已发送至邮箱，请注意查收",
          type: "success",
          duration: 5 * 1000,
        })
      })
    },
// 修改密码-发送邮箱验证码
    getverifyCodeHandler_psw(findPassRule) {
      this.$refs[findPassRule].validateField("email", (validEmail) => {
        if (!validEmail) {
          getVerifyCode({
            username: this.findPassForm.username,
            email: this.findPassForm.email
          }).then((res) => {
            if (res.code == 0 && res.data) {
              this.verifyCodeHandler(this.findPassForm, 'verifyCodeTime')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
// 找回密码-提交并登录
    changePswHandler(findPassRule) {
      let _this = this,
      user = this.findPassForm
      this.$refs[findPassRule].validate((valid) => {
        if (valid) {
          let changePswOld = {...this.findPassForm}
          startResetPsw()
          function startResetPsw() {
            findPass(Object.assign(changePswOld, { 
              newPass: md5(changePswOld.newPass).toUpperCase()
            })).then((res) => {
              if (res.code === 0) {

                if (_this.loading) { return }
                _this.loading = true
                let users = {
                  username: user['username'],
                  password: user['newPass']
                }
 
           _this.$store.dispatch('user/login',users).then(() => {
           _this.$router.push({ path: _this.redirect || '/', query: _this.otherQuery })
           _this.$message.success('密码修改成功，系统已为您自动登录！', 4000)
           _this.$refs.findPassRule.resetFields()
           if(_this.checked) {
              Cookies.set('username', users['username'], {expires: 10})
             Cookies.set('password', users['password'], {expires: 10})
             Cookies.set('checkedStatus', true)
           } else {
             Cookies.remove('username')
             Cookies.remove('checkedStatus')
           }
            }).finally(() => {
                    _this.loading = false
                  })
              } else {
               _this.$message.error(res.msg)
              }
            })
          }
        }
      })
    }
  },
  mounted() {
  this.$nextTick(() => {
      if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  
   let user = this.loginForm
   if(Cookies.get('username') && Cookies.get('checkedStatus')) {
     user['username'] = Cookies.get('username')
     user['password'] = Cookies.get('password')
     this.checked = true
   }
    })
  },
}
</script>
  <style lang="scss">

.loginBox {
    .el-input {
    display: inline-block;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: #333;
      caret-color: #333;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }
    .el-form-item {
    border-radius: 5px;
    color: #454545;
    border:1px #dcdfe6 solid;
  }
}
</style>