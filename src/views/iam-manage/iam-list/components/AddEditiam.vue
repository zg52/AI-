<!--
 * @Author: long
 * @Date: 2021-05-18 16:25:27
 * @LastEditTime: 2021-08-31 14:42:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\iam-manage\iamList\components\AddEditiam.vue
-->
<style lang="scss" scoped>
.form {
    width: 500px;
    margin: 0 auto;
}
.pass {
&::v-deep .el-form-item__content {
    display: flex;
}
::v-deep .el-input__inner {
    width: 400px;
}
.el-icon-info {
    position: relative;
    left: 5px;
    top:10px;
}
}
.get_pass {
  cursor: pointer;
  display:inline-block;
  margin-left: 30px;
}
.get_pass + span {
  em {
    color: #999;
    font-size: 12px;
  }
}
.anticon {
  color: #e6a23c;
  display: inline-block;
  margin-left: 40px;
  margin-right: 2px;
}
.success_cont {
  padding-top: 10px;
  h4 {
    padding-top: 20px;
    font-weight: bold;
    font-size: 25px;
  }
  .tip {
    color: #999;
    font-size: 14px;
    padding: 5px 0 10px 0
  }
  .tip + div {
    p {
      line-height: 20px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
<template>
    <div>
         <el-dialog
          :title="`${ isEdit(false) }IAM用户`"
          :visible.sync="addEdit_visible"
          :before-close="addEdit_hide"
          :close-on-click-modal="false"
          width="40%"
          >
        <el-form class="form" ref="form" :model="form" :rules="rules" label-width="104px" label-position="right">
           <el-form-item label="IAM用户名：" prop="username"><el-input v-model.trim="form.username" placeholder="4~20位数字和字母组合"  maxlength="20" clearable></el-input></el-form-item>
           <el-form-item label="初始密码：" class="pass" prop="password" :rules="{required:true, message: ''}">
             <span>{{ form.password }}</span>
             <span class="get_pass theme_col" @click="getPassHandle">重新生成</span>
             <span><a-icon type="info-circle" theme="filled" /><em>请提醒IAM用户尽快修改初始密码！</em></span>
           </el-form-item>
           <el-form-item label="手机号：" prop="mobile"><el-input maxLength="11" v-model.trim="form.mobile" placeholder="请输入手机号" clearable></el-input></el-form-item>
           <el-form-item label="邮箱：" prop="email"><el-input v-model.trim="form.email" placeholder="请输入邮箱" clearable></el-input></el-form-item>
           <el-form-item label="角色设置：">
          <el-select v-model="form.roleIds" placeholder="默认分配IAM用户（默认）角色" class="w400" multiple filterable clearable>
           <el-option v-for="(roleName, index) of getRoleNames.lis" :key="index" :label="roleName.roleName" :value="roleName.id"></el-option>
          </el-select>
           </el-form-item>
           <el-form-item label="联系人：" prop="contact"><el-input maxLength="11" v-model.trim="form.contact" placeholder="请输入联系人" clearable></el-input></el-form-item>
           <el-form-item label="备注：" prop="note"><el-input type="textarea" maxlength="30" v-model.trim="form.note" placeholder="备注信息" clearable></el-input></el-form-item>
      </el-form>
        <div class="flexcenter t_center mt40">
         <el-button @click="addEdit_hide" plain>取 消</el-button>
         <el-button plain @click="resetForm"><i class="el-icon-refresh"></i> 重 置</el-button>
         <el-button type="primary" @click="addIamHandle('form')" :loading="save_loading">确 认</el-button>
        </div>
         </el-dialog>
         
      <a-modal v-model="regSuccess_visible" title="新增IAM用户" width="40%">
      <div class="success_cont t_center">
        <div><a-icon type="check-circle" theme="filled" class="ml0" style="font-size:60px;color:#52C41A"/></div>
        <h4>新增IAM用户成功</h4>
        <p class="tip">用户信息如下，请提醒IAM用户尽快修改初始密码</p>
        <div class="iam_msg">
            <p>专属域名： {{ domain }} </p>
            <p>IAM用户名： {{ username[0] }} </p>
            <p>密码：{{ form.password }}</p>
            <span class="theme_col pointer pl5" @click.prevent="copyPassHandle">复制登录信息</span>
        </div>
      </div>
      <div slot="footer" class="t_center">
        <a-button key="submit" type="primary" @click="handleCancel">返回</a-button>
      </div>
    </a-modal>
    </div>
</template>
<script>
import { validPhone, validateNames } from '@/utils/validate.js'
import { createIam } from '@/api/iam-manage/iam'
import moment from 'moment'
import { copyTxtHandle } from '@/utils'
import { mapActions } from 'vuex'
// import md5 from 'js-md5'
let vm

export default {
  props: {
      editList: {
        type: Object
      },
      addEdit_visible: {
        type: Boolean
      },
      edit: {
        type: Boolean,
        default: false
      },
      getRoleNames: {
        type: Object,
        default: {
          lis: [],
          defaultId: null
        }
      }
  },
  data() {
   let validateName1 = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入用户名"))
        : !validateNames(value)
        ? callback(new Error("用户名必须为4~20位数字和字母组合"))
        : callback()
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
            props: { multiple: true },
            dateTime: null,
            save_loading: false,
            regSuccess_visible: false,
            domain: '',
            username: [],
            form: {
              username: '',
              mobile: '',
              password: 12345678,
              roleIds: [],
              email: '',
              note: '',
              contact: ''
            },
            rules: {
              username: [notNull('用户名')[0], { validator: validateName1, trigger: "blur"  }],
              mobile: [{required: true, validator: validatePhone, trigger: "blur" }],
              email: [
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    {
                      type: "email",
                      message: "请输入正确的邮箱地址",
                      trigger: ["blur", "change"],
                    },
                  ]
              },
        }
    },
    watch: {
      edit: function() {
        let editList = this.editList
        if(this.edit && editList.hasOwnProperty('iamUser')) {
             for(let key in editList['iamUser']) {
               if(this.form.hasOwnProperty(key)) {
                 this.form[key] = editList['iamUser'][key]
               }
             }
             this.form.products = editList.products
        }
      }
    },
    methods: {
        addIamHandle(el) {
          this.$refs[el].validate((valid) => {
            if (valid) {
            this.save_loading = true
            if(this.edit) {
              edit()
            } else {
              add()
            }
          function add() {
               let params = Object.assign({}, vm.form),
                 formData = new FormData()
                //  params.password =  md5(params.password).toUpperCase()
                 delete params.checkPsw
                 for(let item in params) {
                   if(params[item] !== null) formData.append(item, params[item]) 
                    }
                    
                createIam(formData).then((res) => {
                      if(res && res.data) {
                        vm.username.push(vm.form.username)
                        vm.$msg.success(res.msg), vm.save_loading = false, vm.addEdit_hide()
                        vm.$emit('refreshTable')
                        vm.regSuccess_visible = true
                        vm.getPersonalInfo().then(res => vm.domain = res.domain)
                        }
                      },() => {
                        vm.save_loading = false
                      })
                   }
                   function edit() {
                      }
        }
        })
        },
        resetForm() {
          this.$refs['form'].resetFields()
          vm.form.password = 12345678
         },
         dateTimeRule() {
           return {required: this.form.products.length !== 0 ? true : false, message: '请选择权限周期'}
         },
         changeDateTime() {
            let date = this.dateTime,
               _p = this.form,
                t = 'YYYY-MM-DD HH:mm:ss'
               date && date.length
                 ? ((_p.startTime = moment(date[0]).format(t)),
                   (_p.endTime = moment(date[1]).format(t)))
            :  _p.startTime = _p.endTime = null
       },
       addEdit_hide() {
         this.resetForm(), this.$emit('addEdit_hide')
         for(let key in this.form) {
           this.form[key] = null
         }
         this.getDefaultRoleId(), this.getPassHandle()
        
       },
       isEdit(x) {
         if(x) {
          return this.edit ? false : true
         } else {
           return this.edit ? '编辑' : '新增'
         }
       },
       getPassHandle() {
        this.form.password = ''
        for(let i = 0;i < 8; i++) {
          this.form.password += Math.floor(Math.random() * 10)
        } 
       },
       getDefaultRoleId() {
          this.form.roleIds = this.getRoleNames.defaultId
       },
       showModal() {
      this.regSuccess_visible = true
    },
    copyPassHandle() {
      let param = this.form
      copyTxtHandle(`专属域名：${ this.domain }  IAM用户名：${ this.username }  密码：${ param.password } `, true, () => vm.$msg.success('复制成功'))
    },
    handleCancel() {
      this.regSuccess_visible = false
     },
     ...mapActions('user',['getPersonalInfo'])
       },
    created() {
      vm = this
      this.getPassHandle()
      this.getDefaultRoleId()
    }
}
</script>