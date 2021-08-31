<!--
 * @Author: long
 * @Date: 2021-08-06 14:00:15
 * @LastEditTime: 2021-08-31 14:48:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\iam-manage\iamList\iamDetails.vue
-->
<style lang="less" scoped>
.form {
  margin-left: 40px;
  margin-top: 30px;
  display: block;
}
.edit_pass {
  cursor: pointer;
}
.pointer {
  position: absolute;
  left:280px;
  white-space: nowrap;
}
</style>
<template>
  <div class="app_container">
    <div class="box_style">
      <h4 class="table_tit_txt">基本信息</h4>
      <a-form class="form" :form="form" :label-col="{ span: 1}" :wrapper-col="{ span: 4 }" labelAlign="left" @submit="handleSubmit">
        <a-form-item label="用户名："><a-input name="username" :maxLength=20 v-decorator="[ 'username', { rules: [{ validator: validUsername }], }, ]" allowClear /></a-form-item>
        <a-form-item label="密码：">
            <a-input v-show="passShow" v-decorator="[ 'password']" class="border_none w100" /><span class="theme_col edit_pass" @click="getPassHandle">重置</span>
        </a-form-item>
      <a-form-item label="手机：">
      <a-input v-decorator="[ 'mobile', { rules: [{ validator: validatePhone }], }, ]" allowClear />
    </a-form-item>
     <a-form-item label="邮箱：">
      <a-input v-decorator="[ 'email', { rules: [{ type: 'email', message: '请输入正确格式的邮箱', }, {message: '请输入邮箱', },], }, ]" allowClear />
    </a-form-item>
    <a-form-item label="角色：" class="relative">
      <a-select v-decorator="['roleIds']" mode="multiple" :token-separators="[',']" @change="handleRoleChange" placeholder="默认分配IAM用户（默认）角色">
      <a-select-option v-for="(name, index) in getRoleNames" :key="name.id" :disabled="getRoleNames[index].id === 2 ? true : false">{{ name.roleName }}</a-select-option>
    </a-select>
    <span class="theme_col pointer"><router-link to="/iam-role/roleList">管理角色</router-link></span>
    </a-form-item>
    <a-form-item label="备注："><a-textarea :maxLength=50 v-decorator="['note']" placeholder="备注信息" :rows="3" allowClear /></a-form-item>
    <a-form-item label="联系人："><a-input name="contact" :maxLength=11 v-decorator="[ 'contact' ]" allowClear /></a-form-item>
    <a-form-item :wrapper-col="{ offset: 1 }"><a-button type="primary" html-type="submit">保存</a-button></a-form-item>
    </a-form>
    </div>
  </div>
</template>
<script>
import { validPhone, validateNames } from '@/utils/validate.js'
import { iamDetails, resetPass, editIam } from '@/api/iam-manage/iam'
import { copyTxtHandle } from '@/utils'
import { getIam_RoleName_id } from '@/utils/business'

let vm

export default {
  data() {
    return {
      passShow: false,
      form: this.$form.createForm(this),
      formParams: {},
      getRoleNames: [],
      DefaultValue: ''
    }
  },
  watch: {
    $route() {
      let querys = this.$route.query
     if(!querys.id) {
       this.$router.go(-1)
     }
    }
  },
  methods: {
    validUsername(rule,value, callback) {
     value === ""
        ? callback(new Error("请输入用户名"))
        : !validateNames(value)
        ? callback(new Error("用户名必须为4~20位数字和字母组合"))
        : callback() 
     },
    validatePhone(rule, value, callback) {
      if (!validPhone(value)) {
        callback(new Error("手机号格式错误"))
      } else {
        callback()
      }
     },
     
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
        let params = { ...values }
            delete params.password
           let formData = new FormData()
               for(let item in params) {
                   if(params[item] !== null) formData.append(item, params[item]) 
                    }
            editIam(this.$route.query.id, formData).then(res => {
              if(res) {
                this.$msg.success('修改成功')
              } else {
                this.$msg.error(res.msg)
              }
            })
        }
      })
    },
     getPassHandle() {
       this.passShow = true
      let password = ''
      resetPass(this.$route.query.id, { id: this.$route.query.id, password: getPass() }).then((res) => {
        if (res.code == 0 && res.data) {
          this.passTip(password)
        } else {
          this.$msg.error(res.msg)
        }
      })

      function getPass() {
       for(let i = 0; i < 8; i++) {
           password += Math.floor(Math.random() * 10)
        }
         vm.formParams.password =  password
         vm.setFormFields()
        return password
      }
       },
     passTip(password) {
       this.$success({
        title: '已重置为初始密码：',
        mask: false,
        closable: true,
        content: password,
        okText: '复制密码',
        cancelText: '取消',
        onOk(){
          copyTxtHandle(password, true, () => vm.$msg.success('复制成功'))
        }
      })
    },
    handleRoleChange(value) {
      console.log(value)
    },
    setFormFields() {
    this.form.setFieldsValue({
    ...this.formParams
   })
    },
   getIam_RoleName_id() {
    getIam_RoleName_id().then(res => {
    this.getRoleNames = res
})
    }
 
  },
  created() {
    vm = this
    this.getIam_RoleName_id()
  },
  mounted() {
   this.$nextTick(() => {
     iamDetails(this.$route.query.id).then( res => {
       const { data } = res
       let roleId = []
       if(Array.isArray(data.roles) && data.roles.length !== 0) {
         data.roles.forEach(item => {
           roleId.push(item.id)
         })
       } else {
         roleId = []
       }
       this.formParams = {
         username: data.username,
         email: data.email,
         contact: data.contact,
         note: data.note,
         mobile: data.mobile,
         roleIds: roleId
    }
   this.setFormFields()
    })
   })
  }
}
</script>