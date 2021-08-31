<!--
 * @Author: long
 * @Date: 2021-08-25 10:21:13
 * @LastEditTime: 2021-08-31 17:23:44
 * @LastEditors: Please set LastEditors
 * @Description: 个人资料
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
                     <span class="idcard"><a-icon type="idcard" /> <em>个人认证</em></span>
                     <span class="is_approve" :class="autoInfo.name ? 'bg_theme' : 'bg_ccc'">{{ autoInfo.name ? '已认证' : '未认证' }}</span>
                </div>
                <div class="msg">
                    <h4>基本信息</h4>
                  <div class="npt_msg">
                      <ul>
                          <li v-for="(nptMsg, index) of nptMsgs" :key="index" v-if="nptMsgisShow(nptMsg.key)">
                              <span>{{ nptMsg.t }}：</span> 
                              <input
                               v-show="nptIsShow(index)" 
                               onkeydown="this.value=this.value.replaceAll(' ','')"
                               @blur.prevent="nptBlurHandle(index, nptMsg.key, nptMsg.val)"
                                :disabled="nptMsg.dis" id="userName" 
                                :maxlength="nptMsg.maxlength" 
                                :ref="nptMsg.key"
                                 v-model.trim="nptMsg.val"
                                 type="text" />
                              <span v-permission="['root']" v-show="nptMsg.key === 'userType' ? true : false" >
                                <a-popconfirm placement="right" ok-text="确认" cancel-text="取消" @confirm="confirm_up_firm">
                                      <template slot="title">
                                       <div class="up_pop_txt">
                                           <p>进行认证后账户类型变为企</p>
                                           <p>业，且不可变更为个人，确</p>
                                           <p>认进行认证=吗？</p>
                                       </div>
                                      </template>
                                  <span class="pointer">企业认证</span>
                               </a-popconfirm>
                              </span>
                              <em v-permission="['root']" @click.prevent="editUser(index, nptMsg.key)" class="pointer" v-show="index === 0 || index === 2 ? false : true"><a-icon type="edit" /></em>
                          </li>
                          <a-button class="edit_pass" @click="showModal_pass">修改密码</a-button>
                      </ul>
                  </div>
                </div>
            </div>
            <div class="fr">
                <h4>认证信息</h4>
                 <div class="npt_msg">
                     <ul v-if="this.autoInfo.name">
                         <li>
                             <span>真实姓名：<em>{{ autoInfo.name }}</em></span>
                         </li>
                          <li>
                             <span>身份证：<em>{{ autoInfo.identityCard }}</em></span>
                         </li>
                     </ul>
                     <p v-else class="t_center">还未认证</p>
                      <a-button v-permission="['root']" class="auto_Handle" @click="showModal_personalCertificate">{{ autoInfo.name ? '重新认证' : '去认证' }}</a-button>
                 </div>
            </div>
         </div>
        </div>
        
       <a-modal
        title="密码修改"
        :visible="visible_editPass"
        width="40%"
        @cancel="editPass_handleCancel"
        :maskClosable="false"
       >
        <EditPass v-if="passModule_isShow" :findFormParams="findFormParams" ref="EditPass" :username="username"/>
        <EditPaddSuccess v-if="!passModule_isShow" :successTips_pass="'登录密码修改成功，再次登录请使用新密码'" />
        <div slot="footer" class="t_center">
        <a-button v-show="passModule_isShow" type="primary" :loading="editPass_confirmLoading" @click="editPass_handleOk">确认</a-button>
        <a-button @click="editPass_handleCancel" :type="passModule_isShow ? 'default' : 'primary'">{{ passModule_isShow ? '取消' : '返回' }}</a-button>
      </div>
       </a-modal>

        <a-modal
        title="修改邮箱"
        :visible="visible_editEmail"
        width="16%"
        @cancel="editEamil_handleCancel"
        :maskClosable="false"
       >
       <EditEmail :email="email" ref="EditEmail" />
        <div slot="footer">
        <a-button @click="editEamil_handleCancel">取消</a-button>
        <a-button type="primary" :loading="editPass_confirmLoading" @click="editEmail_handleOk">确认</a-button>
      </div>
     </a-modal>

      <a-modal
        title="个人认证"
        :visible="visible_editPersonalCertificate"
        width="40%"
        @cancel="editPersonalCertificate_handleCancel"
        :maskClosable="false"
       >
       <PersonalCertificate v-if="authModule_isShow" ref="PersonalCertificate" />
       <PersonalCertificateSuccess v-if="!authModule_isShow" :successTips_auth="'个人认证资料提交成功'" />
        <div slot="footer" class="t_center">
        <a-button v-show="authModule_isShow" type="primary" :loading="editPersonalCertificate_confirmLoading" @click="editPersonalCertificate_handleOk">提交</a-button>
        <a-button :type="authModule_isShow ? 'default' : 'primary'" @click="editPersonalCertificate_handleCancel">{{ authModule_isShow ? '取消' : '返回' }}</a-button>
       </div>
      </a-modal>

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
import { personal_edit_msg, personal_edit_email, personAuthentication, enterpriseAuthentication } from '@/api/personalCenter'
import { validPhone, validateChars, validateNames  } from '@/utils/validate.js'
import { findPass } from '@/api/user'

import { createNamespacedHelpers, mapGetters } from 'vuex'
import { deepClone } from '@/utils'

// 修改密码、邮箱、认证、企业认证提交模块组件
import EditPass from './components/EditPass'
import EditPaddSuccess from './components/EditPaddSuccess'
import EditEmail from './components/EditEmail'
import PersonalCertificate from './components/PersonalCertificate'
import PersonalCertificateSuccess from './components/PersonalCertificateSuccess'
import EnterpriseCertificate from '../components/EnterpriseCertificate'
import EnterpriseCertificateSuccess from '../components/EnterpriseCertificateSuccess'

const { mapActions } = createNamespacedHelpers('user')
let vm

 export default {
     components: {
         EditPass,
         EditPaddSuccess,
         EditEmail,
         PersonalCertificate,
         PersonalCertificateSuccess,
         EnterpriseCertificate,
         EnterpriseCertificateSuccess
     },
     data() {
         return{
             fromParams: {},
             nptMsgs:[
                 { t: '用户名', key: 'username', val: '', dis: true, maxlength: '20' },
                 { t: '专属域名', key: 'domain', val: '', dis: true, maxlength: '12' },
                 { t: '变更账户类型', key: 'userType', val: 'userType', dis: true, maxlength: '' },
                 { t: '手机', key: 'mobile', val: '', dis: true, maxlength: '11' },
                 { t: '邮箱', key: 'email', val: '', dis: true, maxlength: '' },
                 { t: '联系人', key: 'contact', val: '', dis: true, maxlength: '20' }
             ],
             oldNptMsgs: [],
             
// 修改密码
             visible_editPass: false,
             editPass_confirmLoading: false,
             passModule_isShow: true,
             authModule_isShow: true,
             findFormParams: {
                  email: '',
                  verifyCode: '',
                  password: '',
                  checkPassword: ''
              },

// 修改邮箱
           visible_editEmail: false,
           editEmail_confirmLoading: false,

// 个人认证信息
           autoInfo: {
               name: '',
               identityCard: ''
           },
           visible_editPersonalCertificate: false,
           editPersonalCertificate_confirmLoading: false,
           
// 变更为企业信息
          visible_editEnterpriseCertificate: false,
          editEnterpriseCertificate_confirmLoading: false,
          authModule1_isShow: false
         }
     },
     computed: {
         ...mapGetters(['email', 'username', 'userType', 'roles'])
     },
    methods: {
    ...mapActions(['getPersonalInfo']),
    editUser(index, val) {
      this.nptMsgs[index]['dis'] = false
      new Promise((reslove) => {
        !this.nptMsgs[index][val] ? reslove() : false
      }).then(() => {
          this.$refs[val][0].focus()
          this.$refs[val][0].style.borderBottom = '1px #1890FF solid'
      })

       if(val === 'email') {
          this.visible_editEmail = true
       }

    },
    nptBlurHandle(index, key, val) {
      let infos = this.nptMsgs
          infos[index]['dis'] = true
          
         this.$refs[key][0].style.borderBottom = '1px transparent solid'
       if(key === 'domain') {
        editDomain()
       } else if(key === 'mobile') {
          editMobile()
       } else if(key === 'contact') {
           editContact()
       }
       
        function editDomain() {
          if(validateNames(val, 5, 12)) {
            if(vm.oldNptMsgs[index].val !== val) { // 修改值时需判断是否有改动
               personal_edit_msg({domain: val}).then((res) => {
               res.data ? vm.$msg.success('专属域名修改成功！') : vm.$msg.error('专属域名修改失败！')
               vm.getPersonalInfos()
              })
           }
         } else {
             vm.validateTips('格式错误，专属域名为5~12位数字和字母组合')
         }
       }
       
         function editMobile() {
         if(validPhone(val)) {
            if(vm.oldNptMsgs[index].val !== val) {
               personal_edit_msg({mobile: val}).then((res) => {
               res.data ? vm.$msg.success('手机号修改成功！') : vm.$msg.error('手机号修改失败！')
               vm.getPersonalInfos()
              })
           }
         } else {
           vm.validateTips('手机号格式错误')
         }
       }

     function editContact() {
        if(!validateChars(val)) {
            if(vm.oldNptMsgs[index].val !== val) {
               personal_edit_msg({contact: val}).then((res) => {
               res.data ? vm.$msg.success('联系人修改成功！') : vm.$msg.error('联系人修改失败！')
               vm.getPersonalInfos()
              })
           }
       } else {
           vm.validateTips('联系人不能包含特殊字符！')
         }
    }
    },
    validateTips(tipsCont) {
      this.$msg.warning(tipsCont)
      this.getPersonalInfos()
    },
   getInfos() {
       let infos = this.nptMsgs
       
       new Promise((resolve) => {
         infos ? resolve() : false
       }).then(() => {
          setInfo(0, 'username'), setInfo(1, 'mobile'), setInfo(2, 'email')
          function setInfo (i, key) {
            vm.$set(infos[i], 'val', vm.user?.[key])
          }
       }
       )
    },
    nptIsShow(index) {
        if(index === 2) {
            return false
        } else {
            return true
        }
    },
   async getPersonalInfos() {
        await this.getPersonalInfo().then((res) => {
         if(res) {
           let nptMsg = this.nptMsgs.filter((item) => item.key !== 'userType')
         
             nptMsg.forEach((item, index) => {
                 if(Object.keys(res).includes(item.key)) {
                     item.val = res[Object.keys(res)[index]]
                 }
             })
             Promise.resolve().then(() => { this.oldNptMsgs = deepClone([...this.nptMsgs]) })
             
             const { realName,  identityCard} = res
             this.autoInfo.name = realName, this.autoInfo.identityCard = identityCard
         }
    })
    },
    showModal_pass() {
      this.visible_editPass = true, this.passModule_isShow = true
      Promise.resolve().then(() => {this.findFormParams.email = this.email})
    },
    confirm_up_firm() {
        this.showModal_enterpriseCertificate()
    },

// 修改密码
    editPass_handleOk(e) {
      e.preventDefault()
      this.$refs.EditPass.findPassForm.validateFields((err, values) => {
          if (!err) {
          this.editPass_confirmLoading = true
          
          findPass({
           email: values.email,
           verifyCode: values.verifyCode,
           password: values.password
         }).then(res => {
            if(res) {
             this.passModule_isShow = false
             this.editPass_confirmLoading = false
             this.$msg.success('密码修改成功，请注意保管！', 4)
            } else {
             this.editPass_confirmLoading = false
            }
         })
        }
      })
    },
    editPass_handleCancel(e) {
      this.visible_editPass = false
    },

// 修改邮箱
    editEmail_handleOk(e) {
        e.preventDefault()
        this.$refs.EditEmail.$children[0].validate(valid => {
        if (valid) {
          this.editEmail_confirmLoading = true
          console.log(this.$refs.EditEmail)
          personal_edit_email(this.$refs.EditEmail.editEmailForm).then((res) => {
              if(res) {
                  this.getPersonalInfos()
                  this.$msg.success('邮箱修改成功！'), this.editEmail_confirmLoading = false, this.visible_editEmail = false 
              } else {
                  this.$msg.error('邮箱修改失败！'), this.editEmail_confirmLoading = false
              }
          })
        } else {
          return false
        }
      })
    },
    editEamil_handleCancel() {
      this.visible_editEmail = false
    },

// 修改认证
    showModal_personalCertificate() {
      this.visible_editPersonalCertificate = true, this.authModule_isShow = true
    },
    editPersonalCertificate_handleOk(e) {
        e.preventDefault()
        this.$refs.PersonalCertificate.$children[0].validate(valid => {
        if (valid) {
          this.editEmail_confirmLoading = true
          
          let params = this.$refs.PersonalCertificate.editPersonalCertificateForm
          Promise.resolve().then(() => {
              if(params.file) {
                  personAuthentication(this.$refs.PersonalCertificate.personalCertificateParams).then((res) => {
                      if(res) {
                          this.getPersonalInfos()
                          this.$msg.success('认证成功！'), this.editEmail_confirmLoading = false, this.visible_editEmail = false, this.authModule_isShow = false
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
    editPersonalCertificate_handleCancel() {
      this.visible_editPersonalCertificate = false
    },

// 更改为企业认证
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
                          this.getPersonalInfos()
                          this.$msg.success('认证成功！'), this.editEmail_confirmLoading = false, this.visible_editEmail = false, this.authModule1_isShow = false
                          this.$store.dispatch('user/getInfo')
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
    nptMsgisShow(key) {
/* 根据当前用户类型及权限判断能否操作为企业认证
 * 1. 根账户（个人、公司）有操作权限
 * 2. 须知根账户是否认证（认证为企业后不可逆）
 * 3. iam用户类型无操作权限
*/
    if(key === 'userType') {
      return !this.roles.includes('iam') && this.userType !== 'company' ? true : false
    } else {
      return true
    }
     },
    },
     created() {
       vm = this
       this.getPersonalInfos()
       this.$forceUpdate()
     },
     mounted() {

     }
 }
</script>