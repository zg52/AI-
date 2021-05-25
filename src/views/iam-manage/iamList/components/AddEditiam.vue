<!--
 * @Author: your name
 * @Date: 2021-05-18 16:25:27
 * @LastEditTime: 2021-05-25 14:27:01
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
        <el-form class="form" ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
           <el-form-item label="用户名：" prop="username"><el-input v-model.trim="form.username" placeholder="4~20位数字和字母组合"  maxlength="20" clearable></el-input></el-form-item>
           <el-form-item v-if="isEdit(true)" label="密码：" prop="password" class="pass"><el-input type="password" v-model.trim="form.password" placeholder="12~18位数字、字母和符号组合" maxlength="18" clearable :show-password="true"></el-input>
             <el-tooltip class="item" effect="light" placement="top"> <div slot="content">提示: 请注意保存密码! IAM用户密码采用加密存储，无法再次查看，丢失后只能进行重置。</div> <i class="el-icon-info"></i> </el-tooltip>
           </el-form-item>
           <el-form-item v-if="isEdit(true)" label="确认密码：" prop="checkPsw"><el-input type="password" v-model.trim="form.checkPsw" placeholder="请再次输入密码" clearable :show-password="true"></el-input></el-form-item>
           <el-form-item label="手机号：" prop="contact"><el-input v-model.trim="form.contact" placeholder="请输入手机号" clearable></el-input></el-form-item>
           <!-- <el-form-item label="姓名：" prop="name"><el-input v-model.trim="form.name" placeholder="请输入姓名" clearable></el-input></el-form-item> -->
           <el-form-item label="开通服务：" prop="products">
             <el-cascader class="w400" :options="options" v-model="form.products" :props="props" @change="changeProductItem" clearable></el-cascader>
           </el-form-item>
           <!-- <el-form-item label="权限周期：" :rules="dateTimeRule()">
              <el-date-picker
               v-model="dateTime"
               type="datetimerange"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               @change="changeDateTime"
               >
            </el-date-picker>
           </el-form-item> -->
           <el-form-item label="备注：" prop="note"><el-input type="textarea" maxlength="30" v-model.trim="form.note" placeholder="备注信息" clearable></el-input></el-form-item>
      </el-form>
        <div class="flexcenter t_center mt40">
              <el-button @click="addEdit_hide" plain>取 消</el-button>
               <el-button v-show="isEdit(true)" plain @click="resetForm"><i class="el-icon-refresh"></i> 重 置</el-button>
              <el-button type="primary" @click="addIamHandle('form')" :loading="save_loading">确 认</el-button>
        </div>
         </el-dialog>
    </div>
</template>
<script>
import { validPhone, validatePass, validateRegName } from '@/utils/validate.js'
import { createIam, editIam } from '@/api/iam-manage'
import { productLists } from '@/utils/business'
import moment from 'moment'
import md5 from 'js-md5'
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
      }
  },
  data() {
   let validateName1 = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入用户名"))
        : !validateRegName(value)
        ? callback(new Error("用户名必须为4~20位数字和字母组合"))
        : callback()
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
        return {
            props: { multiple: true },
            options: productLists,
            dateTime: null,
            save_loading: false,
            form: {
              username: null,
              contact: null,
              products: 0,
              note: '',
              name: null,
              // startTime: null,
              // endTime: null,
              password: null,
              checkPsw: null
            },
            rules: {
              username: [notNull('用户名')[0], { validator: validateName1, trigger: "blur"  }],
              contact: [{required: true, validator: validatePhone, trigger: "blur" }],
              password: [{required: true, validator: validatePsw_regist, trigger: "blur" }],
              checkPsw: [{required: true,  validator: validatePsw1_regist, trigger: "blur" }]
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
                      if(res.code === 0 && res.data) {
                        vm.$message.success(res.msg), vm.save_loading = false, vm.resetForm(), vm.addEdit_hide()
                        vm.$emit('refreshTable')
                        }
                      },() => {
                        vm.save_loading = false
                      })
                   }
                function edit() {
                  let params = vm.editList
                  vm.form.products = vm.form.products.toString()
                   delete vm.form.name
                  delete vm.form.checkPsw
                  delete vm.form.password
                    editIam(
                      params.iamUser.id,{ ...vm.form }).then((res) => {
                      console.log(res)
                      if(res.code === 0) {
                        vm.addEdit_hide(), vm.$emit('refreshTable'), vm.$message.success(res.msg), vm.save_loading = false
                      } else {
                        vm.save_loading = false
                      }
                    },(err) => {
                      vm.save_loading = false
                    })
                   }
      }
      })
      },
     changeProductItem() {
          console.log(this.form.products)
             },
          resetForm() {
          this.$refs['form'].resetFields()
         },
         dateTimeRule() {
           return {required: this.form.products.length !== 0 ? true : false, message: '请选择权限周期'}
         },
         changeDateTime() {
           //  let _p = this.form,
           //     t = 'YYYY-MM-DD HH:mm:ss'
           //  _p.dateTime && _p.dateTime.length
           //   ? (_p.dateTime = moment(_p.dateTime[0]).format(t) +  ' ' + moment(_p.dateTime[1]).format(t))
           //   :  (_p.dateTime = null, _p.startTime = _p.endTime = null)
           //   console.log(moment(_p.dateTime[0]).format(t) +  moment(_p.dateTime[1]).format(t))
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
       },
       isEdit(x) {
         if(x) {
          return this.edit ? false : true
         } else {
           return this.edit ? '编辑' : '新增'
         }
       }
       },
    created() {
        vm = this
    }
}
</script>