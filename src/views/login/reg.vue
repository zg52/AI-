<style lang="scss" scoped>
.reg {
width: 1000px;
margin:0 auto;
background: #fff;
border-radius: 20px;

padding-top: 18px;
padding-bottom: 20px;
h4 {
  color: #333;
  font-size: 24px;
  display: block;
  text-align: center;
  padding-bottom: 40px;
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
    left: 15px;
    top:10px;
}
}
.authCode {
  width: 150px;
  ::v-deep.el-input__inner {
    width: 150px;
  }
}
.authCode_btn {margin-left: 5px;}

 .steps {
   height: 100px;
 }
.comShow {
  width: 800px;
  margin:0 auto;
  margin-top: 7%;
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
.a_box {
  width: 350px;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #409EFF;
    width: 300px;
    height: 150px;
    line-height: 178px;
    text-align: center;
    border:1px #409EFF dashed;
  }
    .el-icon-plus {
position: absolute;
    top: 50%;
    font-size: 60px;
    margin-left: -30px;
    margin-top: -32px;
    color: #d7dae2;
}
  .des {
   color: #999;
    font-size: 12px;
    padding-left: 30px;
    line-height: 16px;
  }
  .img {position: absolute;left:0;top:0;}
    .photo {
    width: 300px;
    height: 150px;
    overflow: hidden;
    border: 1px #DCDFE6 dashed;
    background-size: contain;
    position: relative;
  }
 
</style>
<template>
  <div>
    <Head />

  <div class="steps">
        <div class="comShow" v-show="form.type === 'COMPANY' ? true : false">
     <Steps :active="active" />
      </div>
  </div>
    <div class="reg">
          <div class="back">
      <a-page-header title="注册" @back="goLogin" />
      </div>
        <h4 v-text="regTit"></h4>
      <el-form class="form" ref="form" :model="form" :rules="rules" label-width="110px" label-position="right" v-show="regShow">
           <el-form-item label="用户类型："><el-radio-group v-model.trim="form.type"> <el-radio label="PERSON">个人</el-radio><el-radio label="COMPANY">公司</el-radio></el-radio-group></el-form-item>
           <el-form-item label="用户名：" prop="username"><el-input v-model.trim="form.username" placeholder="4~20位" minlength="4"  maxlength="20" clearable></el-input></el-form-item>
           <el-form-item label="手机号：" prop="mobile"><el-input v-model.trim="form.mobile" placeholder="请输入手机号" clearable></el-input></el-form-item>
           <el-form-item label="邮箱：" prop="email"><el-input type="email" v-model.trim="form.email" placeholder="请输入邮箱" clearable></el-input></el-form-item>
           <el-form-item label="邮箱验证码：" prop="verifyCode"><el-input v-model.trim="form.verifyCode" placeholder="请输入验证码"  class="authCode" clearable></el-input>
           <el-button type="primary" class="authCode_btn" :disabled="authCodeBtnStatus" @click="getauthCodeHandler('form')">{{ authCodeTxt }}</el-button>
           </el-form-item>
           <el-form-item label="密码：" prop="password" class="pass"><el-input type="password" v-model.trim="form.password" placeholder="12~18位数字、字母和符号组合" maxlength="18" clearable :show-password="true"></el-input>
             <el-tooltip class="item" effect="light" placement="top"> <div slot="content" v-html="passTip"></div> <i class="el-icon-info"></i> </el-tooltip>
           </el-form-item>
           <el-form-item label="确认密码：" prop="checkPsw"><el-input type="password" v-model.trim="form.checkPsw" placeholder="请再次输入密码" clearable :show-password="true"></el-input></el-form-item>
           <el-form-item label="专属域名：" prop="domain" class="pass"><el-input v-model.trim="form.domain" placeholder="5~12位数字和字母组合" maxlength="12" clearable></el-input>
             <el-tooltip class="item" effect="light" placement="top"> <div slot="content">IAM用户登录时需要输入，用以区分所属根用户</div> <i class="el-icon-info"></i> </el-tooltip>
           </el-form-item><br>
           <el-form-item><el-button type="primary" @click="submitHandle('form')" v-show="form.type === 'PERSON' ? true : false">确认注册</el-button>
           <el-button plain @click="resetForm('form')"><i class="el-icon-refresh"></i> 重 置</el-button>
           <el-button plain @click="next('form')" v-show="form.type === 'COMPANY' ? true : false">下一步</el-button>
           <div class="a_box"><el-checkbox v-model.trim="agreeChecked" class="agreeChecked"></el-checkbox><span @click="agreeHandle">阅读并同意《服务条款》《法律声明》《隐私政策》</span></div>
           </el-form-item>
      </el-form>

<!-- 公司注册 -->
       <el-form class="form" :model="formFirm" :rules="firmRules" ref="firmRules" label-width="155px" label-position="right" v-show="!regShow ? true : false">
         <el-form-item label="公司名称：" prop="companyName"><el-input v-model.trim="formFirm.companyName" maxlength="20" placeholder="请输入公司名称" clearable></el-input></el-form-item>
         <el-form-item label="统一社会信用代码：" prop="uscc"><el-input v-model.trim="formFirm.uscc" placeholder="请输入统一社会信用代码" clearable></el-input></el-form-item>
         <el-form-item label="公司营业执照照片：" prop="file" :rules="[{required : true, message: '请上传公司营业执照照片'}]">
            <el-upload
            class="avatar-uploader fl"
            :action="proxyUrl"
            :show-file-list="false"
            :on-change="imgChangeHandle"
            :on-success="fileSuccess"
            :before-upload="imgBeforeHandle"
            :on-error="imgError"
            :multiple="true"
            >
            <div class="photo" v-loading="imgUploading" element-loading-text="正在上传中..." element-loading-spinner="el-icon-loading">
           <i class="el-icon-plus"></i>
          <img class="img" v-if="imageUrl" :src="imageUrl" width="100%">
          </div>
       </el-upload>
         </el-form-item>
         
        <el-form-item style="width: 470px;margin-top:40px;"><el-button :loading="save_loading" type="primary" @click="submitHandle_firm('firmRules')">确认注册</el-button>
        <el-button plain @click="resetForm('firmRules'), formFirm.file = null, imageUrl = ''"><i class="el-icon-refresh"></i> 重 置</el-button>
        <el-button plain @click="prev">上一步</el-button>
        </el-form-item>
      </el-form>
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
   
    </div>
</template>

<script>
import { validPhone, validatePass, validateChinese, validateCreditCode, validateNames } from '@/utils/validate.js'
import { regPerson, regCom, isUser, isPhone, getMobileCode, getEmailCode_reg } from '@/api/user'
import { proxyUrl_1 } from '@/api/public'
import privacy from '@/views/privacy/privacy'
import Head from './components/Head'
import Steps from './components/Steps'
import { passTip } from '@/utils/txtTip'
import Mock from '@/../mock/proxyUrl'
// import md5 from 'js-md5'
let vm

export default {
  components: {
    Head,
    privacy,
    Steps
  },
 data() {

   let validateName1 = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入用户名"))
        : validateChinese(value)
        ? callback(new Error("用户名不能出现符号或汉字"))
        : this.isUserHandler().then((res) => {
            res
              ? callback(
                  new Error(" "),
                  this.$msg.error('该用户名已存在')
                )
              : callback()
          })
    },
    validatePhone = (rule, value, callback) => {
        if (!validPhone(value)) {
          callback(new Error("手机号格式错误"))
        } else {
          this.isPhoneHandler().then((res) => {
            res
              ? callback(
                  new Error(" "),
                  this.$msg.error('该手机号已存在')
                )
              : callback()
          })
        }
       },
      validateCredit = (rule, value, callback) => {
       value === ''
        ? callback(new Error("请输入社会统一信用代码"))
        : !validateCreditCode(value)
        ? callback(new Error("信用代码格式不正确"))
        : String
          callback()
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
    },
    validateDomain = (rule, value, callback) => {
      value === ""
        ? callback(new Error("请输入专属域名"))
        : !validateNames(value, 5, 12)
        ? callback(new Error("5~12位数字和字母组合"))
        : callback()
    }
    
    function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }

     return  {
       regTit: '请填写账号信息',
       active: 0,
       regShow: true,
       regSuccessShow: false,
       comShow: true,
       dialogVisible: false,
       agreeChecked: true,
       firmShow: false,
       proxyUrl: proxyUrl_1,
       imageUrl: '',
       imgUploading: false,
       save_loading: false,
       passTip: passTip(),
        
       form: {
            type: 'PERSON',
            username: 'zhanglong123',
            mobile: '15652970369',
            verifyCode: null,
            email: 'longarui@163.com',
            password: '12345qweqwe.',
            checkPsw: '12345qweqwe.',
            domain: 'qwer123'
            },
            rules: {
              username: [notNull('用户名')[0], { validator: validateName1, trigger: "blur"  }],
              mobile: [notNull('手机号')[0], { validator: validatePhone, trigger: "blur" }],
              verifyCode: notNull('验证码'),
              email: [
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    {
                      type: "email",
                      message: "请输入正确的邮箱地址",
                      trigger: ["blur", "change"],
                    },
                  ],
              password: [{required: true, validator: validatePsw_regist, trigger: "blur" }],
              checkPsw: [{required: true,  validator: validatePsw1_regist, trigger: "blur" }],
              domain: [{required: true, validator: validateDomain, trigger: "blur"  }],
              },
            formFirm: {
              companyName: null,
              uscc: 913101175821220588,
              file: null
            },
             firmRules: {
              companyName: notNull('公司名称'),
              uscc:  { required: true, validator: validateCredit, trigger: 'blur' }
              },
            authCodeBtnStatus: false,
            authCode_disabledTxt: "后重新获取",
            authCodeTxt: "获取验证码",
            authCodeTime: 60,
        }
    },
  methods: {
    isUserHandler() {
     let form = this.form
      return isUser(form.username).then((res) => {
        return res.data ? true : false
      })
    },
    isPhoneHandler() {
     let form = this.form
      return isPhone(form.mobile).then((res) => {
        return res.data ? true : false
      })
    },

// 个人注册
    submitHandle(el) {
       this.$refs[el].validate((valid) => {
          if (valid) {
           if(this.agreeChecked) {
             let params = Object.assign({}, this.form)
            //  params.password =  md5(params.password).toUpperCase()
             delete params.checkPsw
             regPerson(params).then(res => {
               if(res) {
                 this.$router.push({
                   path: './regSuccess',
                   query: {
                     type: 'PERSON'
                   }
                 })
               } 
              //  else {
              //      this.$message.success('注册成功，请登录', 4000)
              //     this.$router.push('./login')
              //  }
           })
           } else {
             this.$msg.warning('请阅读并同意《服务条款》《法律声明》《隐私政策》', 4)
           }
      }})
    },

// 企业注册
    submitHandle_firm(el) {
    this.$refs[el].validate((valid) => {
          if (valid) {
            this.save_loading = true
            let params = Object.assign({}, this.form, this.formFirm)
            // params.password =  md5(params.password).toUpperCase()
            delete params.checkPsw
           let formData = new FormData()
          for(let item in params) { formData.append(item, params[item]) }

          regCom(formData).then((res) => {
                if(res && res.data) {
                   vm.save_loading = false
                   vm.resetForms()
                   this.$router.push({
                   path: './regSuccess',
                   query: {
                     type: 'company'
                   }
                 })
                  } else {
                    vm.save_loading = false
                  }
                },(err) => {
                   vm.save_loading = false
                   vm.$msg.error('注册失败，请重试！')
               })
          
      }})
    },
    getauthCodeHandler(el) {
      let timeDecrease = this.authCodeTime
      this.$refs[el].validateField("username", (validName) => {
         this.$refs[el].validateField("mobile", (validPhone) => {
           this.$refs[el].validateField("email", (validPhone) => {
           if (!validPhone && !validName) {
              // getMobileCode({mobile: vm.form.mobile}).then((res) => {
              //      if (res.code == 0) {
              //        authCodeHandler()
              //        this.form.verifyCode = res?.data
              //      } 
              //    })
               getEmailCode_reg({email: vm.form.email}).then((res) => {
                   if (res) {
                     authCodeHandler()
                   } 
                 })
           }
         })
         })
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

// 公司
    imgChangeHandle(file,fileList) {
    },
    imgBeforeHandle(file, fileList) {
        function imageType () { return ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'].includes(file.type) }
        const isLt2M = file.size / 1024 / 1024 < 3;
              if (!imageType()) { 
                this.$message.error('上传人脸图片只能是四种格式（jpg/jpeg/png/bmp）!')
                } else if (!isLt2M) {
                 this.$message.error('上传人脸图片大小不能超过3MB!')
              } else { 
                  let format = file.type.substr(file.type.indexOf('/') + 1)
              }
            return imageType() && isLt2M
    },
     fileSuccess(res, file) {
       this.imgUploading = true
        setTimeout(() => {
          this.imgUploading = false
          this.imageUrl = URL.createObjectURL(file.raw)
          this.formFirm['file'] = file.raw
           }, 700)
      },
     imgError(err, file, fileList) {
        this.$msg.error('上传失败，请重试')
     },
    goLogin() {
      this.$router.go(-1)
    },
    resetForm(el) {
      this.$refs[el].resetFields()
    },
    resetForms() {
     this.$refs['form'].resetFields()
     this.$refs['firmRules'].resetFields()
    },
     next(el) {
        this.$refs[el].validate((valid) => {
          if (valid) {
           if(this.agreeChecked) {
             this.regTit = '请填写公司信息'
             this.regShow = false
             if (this.active++ > 2) this.active = 0
           } else {
             this.$msg.warning('请阅读并同意《服务条款》《法律声明》《隐私政策》', 4)
           }
      }})
      },
      prev() {
      this.regShow = true
      this.active --
      },
 
      agreeHandle() {
      this.dialogVisible = true
    },
    },
    created() {
        vm = this
    },
    mounted() {

    }
}
</script>