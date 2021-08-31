<!--
 * @Author: long
 * @Date: 2021-08-25 10:21:13
 * @LastEditTime: 2021-08-31 17:51:32
 * @LastEditors: Please set LastEditors
 * @Description: 企业资料
 * @FilePath: \ant-design-vue-jeecge:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\personal-center\personal-data\index.vue
-->
<style lang="scss" scoped>
@import '../index.scss';
</style>
<style lang="scss">
.up_pop_txt {
    p {
    margin-bottom: 0;
    }
}
</style>
<template>
    <div class="app_container">
        <div class="box_style">
            <div class="flex">
            <div class="fl">
                <div class="photo">
                     <a-avatar :size="64" icon="user" />
                     <span class="idcard"><a-icon type="idcard" /> <em>企业认证</em></span>
                     <span class="is_approve bg_theme">已认证</span>
                </div>
                <div class="msg">
                    <h4>基本信息</h4>
                  <div class="npt_msg">
                      <ul>
                          <li v-for="(nptMsg, index) of nptMsgs" :key="index">
                              <span>{{ nptMsg.t }}：<em>{{ nptMsg.val }}</em></span>
                          </li>
                          <li>
                            <span>营业执照照片：</span>
                            <em><img :src="enterpriseImage" alt="图片异常"></em>
                          </li>
                           <a-button class="edit_pass" @click="showModal_enterpriseCertificate">重新认证</a-button>
                      </ul>
                  </div>
                </div>
            </div>
         </div>
        </div>
        
      <a-modal
        title="企业认证"
        :visible="visible_editEnterpriseCertificate"
        width="40%"
        @cancel="editEnterpriseCertificate_handleCancel"
        :maskClosable="false"
       >
       <EnterpriseCertificate v-if="authModule1_isShow" ref="EnterpriseCertificate" />
       <EnterpriseCertificateSuccess v-if="!authModule1_isShow" :successTips_auth1="'企业认证资料提交成功'" />
        <div slot="footer" class="t_center">
        <a-button v-show="authModule1_isShow" type="primary" :loading="editEnterpriseCertificate_confirmLoading" @click="editEnterpriseCertificate_handleOk">提交</a-button>
        <a-button :type="authModule1_isShow ? 'default' : 'primary'" @click="editEnterpriseCertificate_handleCancel">{{ authModule1_isShow ? '取消' : '返回' }}</a-button>
       </div>
      </a-modal>
    </div>
</template>

<script>
import { enterpriseAuthentication, enterprise_img } from '@/api/personalCenter'

import { createNamespacedHelpers, mapGetters } from 'vuex'

// 企业认证提交模块组件
import EnterpriseCertificate from '../components/EnterpriseCertificate'
import EnterpriseCertificateSuccess from '../components/EnterpriseCertificateSuccess'

const { mapActions } = createNamespacedHelpers('user')
let vm

 export default {
     components: {
         EnterpriseCertificate,
         EnterpriseCertificateSuccess
     },
     data() {
         return{
           nptMsgs:[
                 { t: '企业名称', key: 'companyName', val: '' },
                 { t: '统一社会信用代码', key: 'uscc', val: '' },
                 { t: '认证时间', key: 'createTime', val: '' },
             ],
           
  //企业认证信息
           autoInfo: {
               name: '',
               identityCard: ''
           },
// 变更为企业信息
          visible_editEnterpriseCertificate: false,
          editEnterpriseCertificate_confirmLoading: false,
          authModule1_isShow: false,
          enterpriseImage: null,
         }
         
     },
     computed: {
         ...mapGetters(['email', 'username'])
     },
    methods: {
    ...mapActions(['getEnterpriseInfo']),
    nptIsShow(index) {
        if(index === 2) {
            return false
        } else {
            return true
        }
    },
   async getEnterpriseInfos() {
        await this.getEnterpriseInfo().then((res) => {
          if(res) {
            let keysArr = Object.keys(res)
            this.nptMsgs.forEach((item, index) => {
                 if(keysArr.indexOf(item.key)) {
                     item.val = res[keysArr[keysArr.indexOf(item.key)]]
                 }
             })
           new Promise(resolve => {
             if(res.businessLicense) {
               resolve()
             }
           }).then(() => {
             enterprise_img(res.businessLicense).then(url => console.log(url))
           })
          }
    })
    },

// 企业认证
    showModal_enterpriseCertificate() {
      this.visible_editEnterpriseCertificate = true, this.authModule1_isShow = true
    },
    editEnterpriseCertificate_handleOk(e) {
        e.preventDefault()
        this.$refs.EnterpriseCertificate.$children[0].validate(valid => {
        if (valid) {
          this.editEmail_confirmLoading = true
          
          let params = this.$refs.EnterpriseCertificate.editEnterpriseCertificateForm
          Promise.resolve().then(() => {
              if(params.file) {
                  enterpriseAuthentication(this.$refs.EnterpriseCertificate.editEnterpriseCertificateParams).then((res) => {
                      if(res) {
                          this.getEnterpriseInfos()
                          this.$msg.success('认证成功！'), this.editEmail_confirmLoading = false, this.visible_editEmail = false, this.authModule1_isShow = false
                  } else {
                          this.$msg.error('认证失败，请稍后重试！'), this.editEmail_confirmLoading = false
                  }
              })
          } else {
              this.$msg.warning('请上传身份证正面照！')
          }
       })
        } else {
          return false
        }
      })
    },
    editEnterpriseCertificate_handleCancel() {
      this.visible_editEnterpriseCertificate = false
    },
  },
   created() {
     vm = this
     this.getEnterpriseInfos()
     this.$forceUpdate()
   },
 }
</script>