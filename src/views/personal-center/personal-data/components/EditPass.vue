<!--
 * @Author: long
 * @Date: 2021-08-26 14:09:08
 * @LastEditTime: 2021-08-31 18:06:18
 * @LastEditors: Please set LastEditors
 * @Description: 修改密码
 * @FilePath: \ant-design-vue-jeecge:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\personal-center\personal-data\components\EditPass.vue
-->
<style lang="scss" scoped>
.code {
    width: 300px;
}
.get_code {
    position: absolute;
    right: 0;
    top: -6px;
    border-radius: 0 4px 4px 0!important;
    border:none;
    background: transparent;
    border-left: 1px solid #d9d9d9;
    color: #1890ff;
    &:hover {
        background: transparent!important;
    }
}
</style>
<template>
  <div>
    <a-form
      :form="findPassForm"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 10 }"
      class="form"
    >
      <a-form-item label="邮箱">
        <a-input @focus="nptFocus($event)" class="border_none"  v-decorator="['email']" />
      </a-form-item>
       <a-form-item label="验证码" class="relative">
        <a-input class="code" placeholder="请填写验证码" :maxLength=10 v-decorator="['verifyCode', { rules: [
              {
                required: true,
                message: '请输入验证码',
              }
            ]}]"></a-input>
            <a-button :loading="code_loading" class="get_code" :disabled="authCodeBtnStatus" @click="getauthCodeHandler">{{ authCodeTxt }}</a-button>
      </a-form-item>
       <a-form-item has-feedback>
       <span slot="label">
        新密码&nbsp;
        <a-tooltip :title="passTip" :destroyTooltipOnHide="true">
          <a-icon type="info-circle" />
        </a-tooltip>
      </span>
           <a-input-password type="password" allow-clear placeholder="请输入新密码" :maxLength=18  v-decorator="['password', { rules: [
           {
             required: true, 
             validator: validatePsw 
           }
           ]}]" /></a-form-item>
       <a-form-item label="再次输入密码" has-feedback><a-input-password type="password" allow-clear placeholder="请输入新密码" :maxLength=18  v-decorator="['checkPassword', { rules: [
           {
             required: true, 
             validator: validateCheckPsw 
            }
            ]}]" /></a-form-item>
    </a-form>
  </div>
</template>
<script>
import { validatePass } from '@/utils/validate.js'
import { personal_VerifyCode_email } from '@/api/personalCenter'
import { getEmailCode_findPass } from '@/api/user'
import { passTip } from '@/utils/txtTip'

let vm

export default {
 props: {
      findFormParams: {
          type: Object,
          default() {
              return null
          }
      },
      username: {
          type: String,
          default: ''
      }
    },
  data() {
    return {
      findPassForm: this.$form.createForm(this),
      password: null,
      authCodeBtnStatus: false,
      authCode_disabledTxt: "后重新获取",
      authCodeTxt: "获取验证码",
      authCodeTime: 60,
      code_loading: false,

      passTip: passTip()
    }
  },
  methods: {
    validatePsw(rule, value, callback) {
      value === ''
        ? callback(new Error("请输入密码"))
        : !validatePass(value)
        ? callback(new Error("请输入12~18位数字、字母和符号组合的密码"))
        : this.findFormParams.password !== ''
        ? this.$refs.findPassForm.validateField("checkPassword")
        : callback()
        this.password = value
    },
    validateCheckPsw(rule, value, callback){
      value === ''
        ? callback(new Error("请再次输入密码"))
        : value !== this.password
        ? callback(new Error("两次输入密码不一致!"))
        : callback()
    },
    nptFocus(e) {
     e.target.blur()
  },
  setFormFields() {
      this.findPassForm.setFieldsValue({
        ...this.findFormParams,
      })
    },
    getauthCodeHandler(el) {
      this.code_loading = true
      let timeDecrease = this.authCodeTime
       getEmailCode_findPass({
           username: this.username,
           email: this.findFormParams.email
           }).then((res) => {
           if (res) {
             if(res.data === 'success') {
               this.code_loading = false
               authCodeHandler()
             } else {
               vm.$msg.error('验证码发送失败，请稍后重试！'), this.code_loading = false
           }
           } else {
             this.code_loading = false
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
            vm.$msg.success('验证码已发送至您的邮箱，请注意查收', 5)
        })
      }
    },
  },
  created() {
    vm = this
  },
  mounted() {
    this.$nextTick(() => {
    this.setFormFields() 
    this.$forceUpdate()
    })
  }
}
</script>