<!--
 * @Author: long
 * @Date: 2021-08-26 20:56:38
 * @LastEditTime: 2021-08-31 17:20:35
 * @LastEditors: Please set LastEditors
 * @Description: 修改邮箱
 * @FilePath: \ant-design-vue-jeecge:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\personal-center\personal-data\components\editEmail.vue
-->
<style scoped lang="scss">
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
  <span class="col_black">当前邮箱：{{ email }}</span>
  <a-form-model :wrapper-col="{ span: 30 }" ref="editEmailForm" :model="editEmailForm" class="pt10" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback prop="email">
        <a-input type="email" v-model.trim="editEmailForm.email" placeholder="请输入新邮箱" allow-clear />
      </a-form-model-item>
      <a-form-model-item prop="verifyCode">
        <a-input v-model.trim="editEmailForm.verifyCode" placeholder="请填写验证码" />
         <a-button :loading="code_loading" class="get_code" :disabled="authCodeBtnStatus" @click="getauthCodeHandler">{{ authCodeTxt }}</a-button>
      </a-form-model-item>
    </a-form-model>
</div>
</template>
<script>
// import { getEmailCode_findPass } from '@/api/user'
import { personal_VerifyCode_email } from '@/api/personalCenter'
import { validateNotNull } from '@/utils/business'

let vm

export default {
  props: {
      email: {
       type: String,
       default: ''
      }
  },
  data() {
    return {
      authCodeBtnStatus: false,
      authCode_disabledTxt: "后重新获取",
      authCodeTxt: "获取验证码",
      authCodeTime: 60,
      code_loading: false,
      editEmailForm: {
        verifyCode: '',
        email: '',
      },
      rules: {
        verifyCode: validateNotNull('请输入验证码'),
        email: [
          validateNotNull('邮箱地址')[0],
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur'],
          },
        ],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    getauthCodeHandler(el) {
      this.code_loading = true
      let timeDecrease = this.authCodeTime
       personal_VerifyCode_email({
           email: this.editEmailForm.email
           }).then((res) => {
           if (res && res.data === 'success') {
            this.code_loading = false
             authCodeHandler()
           } else {
               vm.$msg.error('验证码发送失败，请稍后重试！')
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
  }
}
</script>