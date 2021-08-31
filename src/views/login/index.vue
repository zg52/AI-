
<style lang="scss">
.loginBox, .findPass {
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

background: #ffffff;
border-radius: 20px;
  }
  .con {
    padding: 16px 40px 40px 40px;
  }
  .title-container {
    position: relative;
    margin-bottom:50px;
    padding-top: 30px;
    .title {
      font-size: 24px;
    text-align: center;
    }
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
  .banner {
    margin-right: 280px;
    margin-top: 9%;
  }
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
position: relative;
    top: 9px;
span {
  cursor: pointer;
  color: #409EFF;
}
}
.admin {
  ::v-deep {
    .el-form-item__content {line-height: inherit!important;}
     .el-form-item__content {
      padding: 12px;
      padding-bottom:22px;
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
}
  .svg-icon {
    fill: #999;
  }

  .svg-container {
    padding: 4px 5px 4px 15px;
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
  padding-bottom: 14px;
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
::v-deep.el-dialog__wrapper {
  overflow-y: hidden;
}
}
.main {
  padding-top: 90px;
}
.findPass {
top: 80px;
}
.findInfo {
      position: relative;
    left: 30px;
}
.verifyCode_btn {
  padding: 12px 20px;
}
.email_mobile {
  display: flex;
  justify-content: space-between;
  .code_t {
    font-size: 14px;
    color: #409EFF;
    position: relative;
    top:15px;
    cursor: pointer;
    height: 0px;
    padding: 2px;
  }
.e {
  width: 280px;
}
}
</style>

<template>
  <div class="login-container">
  <Head />
 <div class="main">
      <div class="banner"> <img src="../../assets/image/banner.png" width="657"> </div>
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
      <el-form-item prop="username" v-if="iamNptShow()"><span class="svg-container"><svg-icon icon-class="domain" /></span>
      <el-input auto-complete="on" ref="username" v-model.trim="loginForm.domain" placeholder="请输入专属域名" name="username" type="text" clearable />
      </el-form-item>
      
      <el-form-item prop="username"><span class="svg-container"><svg-icon icon-class="user" /></span>
      <el-input auto-complete="on" ref="username" v-model.trim="loginForm.username" :placeholder="nameTipType()" name="username" type="text" clearable />
      </el-form-item>

      <el-form-item prop="password"> <span class="svg-container"><svg-icon icon-class="password" /></span> <el-input auto-complete="on" ref="password" v-model.trim="loginForm.password" placeholder="请输入密码" type="password" clearable /> </el-form-item>
       <div class="flex flexbetween"><el-checkbox v-model.trim="checked">记住我</el-checkbox><span class="forget" @click="loginShowHandle">忘记密码？</span></div>
      <el-button class="handle_login" :loading="loading" type="primary" @click.prevent="handleLogin">登录</el-button>
      <p class="wei">还未注册？</p>
      <router-link to="/reg"><el-button type="primary" class="creatRoot" plain @click="creatRootHandle">创建根账户</el-button></router-link>
       <el-checkbox v-model.trim="agreeChecked" class="agreeChecked"></el-checkbox><span @click="agreeHandle">阅读并同意《服务条款》《法律声明》《隐私政策》</span>
   </div>
      </div>
    </el-form>
    
<!-- ###########找回密码 ##########--> 
 <el-form ref="findPassRule" v-show="!loginShow ? true : false" :model="findPassForm" :rules="findPassRule" class="login-form findPass" autocomplete="on" label-position="left">
     <div class="con">
        <div class="title-container"><h3 class="title">忘记密码</h3></div>
      <el-form-item prop="username"><span class="svg-container"><svg-icon icon-class="user" /></span><el-input auto-complete="on" v-model.trim="findPassForm.username" placeholder="用户名" type="text" clearable /></el-form-item>
      <div class="email_mobile">
        <el-form-item prop="target" class="e" ref="target"><span class="svg-container"><svg-icon :icon-class="toogle_el.icon" /></span> <el-input auto-complete="on" v-model.trim="findPassForm.target" :placeholder="toogle_el.placeholder" type="text" clearable /></el-form-item>
        <span class="code_t" @click="toogle_email_phone">{{ toogle_el.tit }}验证</span><br>
      </div>
      <el-form-item prop="verifyCode" class="verify inline_block"><span class="svg-container"><svg-icon icon-class="authCode" /></span><el-input v-model.trim="findPassForm.verifyCode" placeholder="验证码" type="text" clearable/></el-form-item>
      <el-button type="primary" class="verifyCode_btn ml10 inline_block" :disabled="findPassForm.verifyCodeBtnStatus" @click.prevent="getMobileCodeHandler_psw('findPassRule')">{{ findPassForm.verifyCodeTxt }}</el-button>

      <el-form-item prop="password"> <span class="svg-container"><svg-icon icon-class="password" /></span><el-input auto-complete="on" :key="passwordType" minlength="6" maxlength="16" v-model.trim="findPassForm.password" :type="passwordType" placeholder="新密码" clearable />
          <el-tooltip class="item" effect="light" placement="top"> <div slot="content">设置的密码应为字母、数字和符号（仅限 ASCII 标准字符）<br/>组合，长度在12 ~ 18字符之间</div> <i class="findInfo el-icon-info"></i> </el-tooltip>
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
      </el-form-item>

      <el-form-item prop="checkPsw"> <span class="svg-container"><svg-icon icon-class="password" /></span><el-input auto-complete="on" :key="passwordType" v-model.trim="findPassForm.checkPsw"  :type="passwordType" placeholder="确认新密码" clearable />
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
        </el-form-item>
       <div class="flex flexbetween"><el-checkbox v-model.trim="checked">记住我</el-checkbox> <span class="forget" @click.prevent="goLoginHandle">去登录</span></div>
      <el-button class="handle_login" :loading="loading" type="primary" @click="changePswHandler('findPassRule')">确 认</el-button>
     </div>
    </el-form>
   </div>
  </div>
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
import { getMobileCode, findPass, getEmailCode_findPass } from "@/api/user"
import { validatePass, validPhone } from '@/utils/validate.js'
import privacy from '@/views/privacy/privacy'
import Head from './components/Head'
// import md5 from 'js-md5'
import Cookies from 'js-cookie'

let vm

export default {
  name: 'login',
  components: {
    privacy,
    Head
  },
  data() {
  let validatePsw_regist = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入密码"))
        : !validatePass(value)
        ? callback(new Error("请输入12~18位数字、字母和符号组合的密码"))
        : this.findPassForm.checkPsw !== ""
        ? this.$refs.findPassRule.validateField("checkPsw")
        : callback()
      callback()
    },
     validatePsw1_regist = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请再次输入密码"))
        : value !== this.findPassForm.password
        ? callback(new Error("两次输入密码不一致!"))
        : callback()
      callback()
    },
    validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("手机号格式错误"))
      } else {
        callback()
      }
     }

    function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }

    return {
      regShow: true,
      radio: '1',
      active0: true,
      active1: false,
      agreeChecked: true,
      dialogVisible: false,
      regDialog: true,
      loginShow: true,
      checked: false,
      checkedStatus: false,

      loginForm: {
        domain: '',
        username: 'zhanglong123',
        password: '12345qwe.',
        type: 'USER'
      },
      loginRules: {
        username:  notNull('用户名'),
        password:  notNull('密码'),
      },

      findPassForm: {
        username: '',
        target: '',
        verifyCode: '',
        password: '12345qweqwe.',
        checkPsw: '12345qweqwe.',
        verifyCodeTxt: "获取验证码",
        verifyCodeBtnStatus: false,
        verifyCodeTime: 60,
      },
      findPassRule: {
        username: notNull('用户名'),
        target: [],
        email: [
          notNull('邮箱地址')[0],
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [notNull('手机号')[0], { validator: validatePhone, trigger: "blur" }],
        verifyCode: notNull('验证码'),
        password: [{required: true, validator: validatePsw_regist, trigger: "blur" }],
        checkPsw: [{required: true,  validator: validatePsw1_regist, trigger: "blur" }]
      },
      toogle_el: {
        target: 'longaruI@163.com',
        icon: 'email',
        prop: 'email',
        placeholder: '邮箱',
        tit: '短信'
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {
      },
      toogle_status:true
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
    },
     radio() {
     this.loginForm.type = this.radio === '1' ? 'USER' : 'IAM' 
     this.loading = false
    }
  },
  methods: {
    regHide_loginShow() { this.regShow = false, this.loginBox = true },
    creatRootHandle() { this.regShow = true, this.loginBox = false },
    rootBox() { this.radio = '1', this.active0 = true, this.active1 = false },
    iamBox() { this.radio = '2', this.active0 = false, this.active1 = true },
    toogle_email_phone() {
      this.$msg.info('暂不支持手机号验证')
//       let findPassForm = this.findPassForm, findPassRule = this.findPassRule, _field = this.$refs['findPassRule'].fields
//       findPassForm['target'] =  null
//       this.toogle_status
//        ? (this.toogle_el = { icon: 'mobile', placeholder: '手机号', tit: '邮箱' }, findPassRule['target'] = findPassRule['mobile'], this.toogle_status = false)
//        : (this.toogle_el = { icon: 'email', placeholder: '邮箱', tit: '短信' }, findPassRule['target'] = findPassRule['email'], this.toogle_status = true)

//      _field.map(i => {
//     if(i.prop === 'target'){
//         i.clearValidate() 
//         // i.resetField() 
//     }
// })
    },
    agreeHandle() {
      this.dialogVisible = true
    },
    info() {
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
          this.$store.dispatch('user/login', user).then((res) => {
            if(res) {
              if(this.checked) {
                 Cookies.set('cloud_username',user['username'], {expires: 10})
                Cookies.set('cloud_password',user['password'], {expires: 10})
                Cookies.set('cloud_checkedStatus', true)
              } else {
                Cookies.remove('cloud_username')
                Cookies.remove('cloud_checkedStatus')
              }
               this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            }
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
         } else {
           this.$message.warning('请阅读并同意《服务条款》《法律声明》《隐私政策》', 4000)
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
    },
    goLoginHandle() {
      this.loginShow = true
      this.$refs['findPassRule'].clearValidate()
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
        _this.$msg.success("验证码已发送至邮箱，请注意查收", 5)
      })
    },

// 修改密码-发送短信/邮箱验证码
    getMobileCodeHandler_psw(findPassRule) {
       vm.$refs[findPassRule].validateField('target', (validEmail) => {
         this.toogle_el.tit === '短信' ? emailCode() : phoneCode()
         function phoneCode() {
        //  if (!validEmail) {
        //   getEmailCode_findPass({
        //     username: vm.findPassForm.username,
        //     email: vm.findPassForm.target
        //   }).then((res) => {
        //     if (res.code == 0 && res.data) {
        //       vm.verifyCodeHandler(vm.findPassForm, 'verifyCodeTime')
        //     }
        //   })
        // }
         }
         function emailCode() {
         if (!validEmail) {
          getEmailCode_findPass({
            email: vm.findPassForm.target,
            username: vm.findPassForm.username
          }).then((res) => {
            if (res.code == 0 && res.data) {
              vm.verifyCodeHandler(vm.findPassForm, 'verifyCodeTime')
            } else {
              vm.$mg.error('验证码发送失败，请重试！')
            }
          })
        }
         }
      })
    },

// 找回密码
    changePswHandler(findPassRule) {
      let _this = this,
      user = this.findPassForm
      this.$refs[findPassRule].validate((valid) => {
        if (valid) {
          startResetPsw()
          function startResetPsw() {
            findPass({
              email: user.target,
              verifyCode: user.verifyCode,
              password: user.password
              //  md5(user.password).toLocaleUpperCase()
            }).then((res) => {
              if (res) {
                if (_this.loading) { return }
                vm.$msg.success('密码修改成功，请登录', 4), vm.loginShow = true
              } else {
                vm.loginShow = false
              }
            })
          }
        }
      })
    },
    nameTipType() {
      let userType = this.radio
      return userType === '1' ? '请输入用户名/手机号/邮箱' : '请输入IAM用户名'
    },
    iamNptShow() {
      let userType = this.radio
      return userType === '1' ? false : true
    }
  },
  created() {
    vm = this
    this.findPassRule.target = this.findPassRule.email
  },
  mounted() {
  this.$nextTick(() => {
      if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  
   let user = this.loginForm
   if(Cookies.get('cloud_username') && Cookies.get('cloud_checkedStatus')) {
     user['username'] = Cookies.get('cloud_username')
     user['password'] = Cookies.get('cloud_password')
     this.checked = true
   }
    })
  },
}
</script>
