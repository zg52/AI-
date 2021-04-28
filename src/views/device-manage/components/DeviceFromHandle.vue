<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-16 10:13:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
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
    color: #8a16ff;
    width: 300px;
    height: 400px;
    line-height: 178px;
    text-align: center;
    border:1px #8a16ff dashed;
  }
  .camera {
margin-left: 30px;
    margin-top: 44px;
    i {
      font-size: 20px;
    }
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
    height: 400px;
    overflow: hidden;
    border: 1px #8a16ff dashed;
    background-size: contain;
    position: relative;
  }
  ::v-deep .el-loading-spinner i {
    font-size: 22px;
}
  ::v-deep .el-loading-text {
    margin-top: -18px;
  }
  .save_staff {
    justify-content: center;
    display: flex;
    margin-top: -22px;
  }
</style>
<template>
  <div class="app-container">
     <el-form :model="addVisitorForm" label-width="auto" :rules="addVisitorRule" ref="addVisitorFormRule" class="addVisitorForm" :inline="true">
       <el-form-item label="创建人："><el-input v-model="addVisitorForm.operator" class="w100" disabled></el-input></el-form-item>
       <el-form-item label="访客姓名：" prop="visitorName"><el-input v-model.trim="addVisitorForm.visitorName" class="w120" clearable></el-input></el-form-item>
       <el-form-item label="性别："><el-select class="w100" v-model.trim="addVisitorForm.gender"><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
       <el-form-item label="电话：" prop="visitorPhone"><el-input class="w160" v-model.trim="addVisitorForm.visitorPhone" clearable></el-input></el-form-item>
       <el-form-item label="访客所在公司："  prop="position"><el-input v-model.trim="addVisitorForm.position" class="w160" clearable></el-input></el-form-item>
       <el-form-item label="身份证号：" prop="idNum"><el-input class="w200" v-model.trim="addVisitorForm.idNum" clearable></el-input></el-form-item>
       <el-form-item label="住址：" prop="address"><el-input class="w300" v-model.trim="addVisitorForm.address" clearable></el-input></el-form-item>
       <el-form-item label="被访人姓名：" prop="name"><el-input class="w160" v-model.trim.trim="addVisitorForm.name" maxlength="30" clearable></el-input> </el-form-item>
       <el-form-item label="被访人公司："  prop="position"><el-input v-model.trim="addVisitorForm.position" class="w160" clearable></el-input></el-form-item>
      <el-form-item label="被访人电话：" prop="phone"><el-input class="w160" v-model.trim="addVisitorForm.phone" clearable></el-input></el-form-item>
      <el-form-item label="访问事由：" prop="reason"><el-input class="w300" v-model.trim.trim="addVisitorForm.reason" maxlength="30" clearable></el-input></el-form-item>
      <el-form-item label="来访时间">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="来访时间"
          end-placeholder="结束时间"
          @change="changeDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注：" prop="remark"><el-input class="w360" v-model.trim="addVisitorForm.remark" type="textarea" :rows="2" placeholder="请输入内容"> </el-input></el-form-item>
      <el-form-item label="头像类型：">
        <el-radio-group v-model="img_type" @change="changeImgType"><el-radio v-for="(faceType, index) of faceTypes" :key="index" :label="faceType.name">{{ faceType.name }}</el-radio></el-radio-group>
      </el-form-item><br>
      <el-form-item label="头像采集：" prop="files">
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
       <div class="fl">
           <el-button type="primary" class="camera"><i class="el-icon-camera-solid" /></el-button>
           <p class="des">上传图片文件支持PNG、JPG、JPEG、BMP，图片大小不超过2M</p>
       </div>
      </el-form-item><br>
     <el-form-item class="save_staff">
        <el-button type="primary" v-show="!btn_el.includes('edit')"><i class="el-icon-folder-add" /> 批量导入</el-button>
        <el-button @click="resetAddVisitorForm" v-show="!btn_el.includes('edit')"><i class="el-icon-refresh"></i><span>重 置</span></el-button>
        <el-button type="primary" :loading="save_loading" @click="saveVisitorHandle('addVisitorFormRule')"><i class="el-icon-check"></i> &nbsp;{{ save_loading_text }}</el-button>
        <el-button v-show="!btn_el.includes('edit')"><router-link to="/people-manage/visitor-manage/visitor-list"><i class="el-icon-view"></i> 查看访客列表</router-link></el-button>
        <el-button @click="cancelEdit" v-show="!btn_el.includes('add')"><span>取 消</span></el-button>
     </el-form-item>
     </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { saveVisitor, editVisitor } from '@/api/people-manage/visitorManage'
import moment from 'moment'
import Mock from '../../../../../mock/proxyUrl'
import { validPhone, validateIdCard } from '@/utils/validate'
import { getGender, getFaceType} from './index'
// import { pickerOptions } from '@/utils'

export default {
  name: 'staff-add',
  props: {
      addVisitorForm: {
          type: Object
      },
      btn_el: {
          type: Array
      }
  },
  data() {
   let validPhoneTarget = (rule, value, callback) => {
     !validPhone(value) ? callback(new Error("请输入正确格式的手机号!")) : callback()
    },
    validateIdCardTarge = (rule, value, callback) => {
     !validateIdCard(value) ? callback(new Error("请输入正确格式的身份证号!")) : callback()
    }
    function numbers (str) {
      return (rule, value, callback) => {
     !isNaN(value) ? callback() : callback(new Error(`${ str }号只能为数字组成！`))
    }
    }
   
    
    function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }
    return {
      save_loading: false,
      addVisitorFormVisible: true,
      imgUploading: false,
      save_loading_text: '保 存',
      proxyUrl: 'http://www.zg.com',
      date: null,
      genders: getGender(),
      faceTypes: getFaceType(),
      imageUrl: '',
      img_type: getFaceType()[0].name,
    //   addVisitorForm: formHadleParam,
      addVisitorRule: {
          name: notNull('被访人姓名'),
          phone: [
            notNull('被访人手机号')[0],
            { validator: validPhoneTarget, trigger: "blur" },
          ],
          visitorName: notNull('访客姓名'),
          visitorPhone: [
            notNull('访客手机号')[0],
            { validator: validPhoneTarget, trigger: "blur" },
          ],
          address: notNull('住址'),
          idNum: [
             notNull('访客身份证号')[0],
             { validator: validateIdCardTarge, trigger: "blur" },
          ],
          date: notNull('来访时间')
        },
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    
// 提交员工信息
  async saveVisitorHandle(el) {
    let _this = this,
        a = this.addVisitorForm
       this.$refs[el].validate((valid) => {
        if (valid) {
          a['files'] === null ? this.$message.warning('请上传访客头像！') : this.httpRequest()
      }
     })
  },
  changeDate() {
   let a = this.addVisitorForm,
       date = this.date
       date && date.length
        ? ((a.visitStartTime = moment(date[0]).format("YYYY-MM-DD HH:mm:ss")),
          (a.createTimeTo = moment(date[1]).format("YYYY-MM-DD HH:mm:ss")))
        :  a.visitStartTime = a.visitEndTime = null
  },
  changeImgType() {
    this.addVisitorForm.img_type = this.img_type == 0 ? 0 : 1
  },
   resetAddVisitorForm() { 
    this.$refs['addVisitorFormRule'].resetFields()
    this.addVisitorForm['files'] = this.imageUrl = null
   },

// --------------------------------人脸图上传-----------------------------
//  截取图片名
    cutImageName(filename) {
      let fileReg = /\.{1}[a-z]{1,}$/
        if (fileReg.exec(filename) !== null) {
            return (filename.slice(0, fileReg.exec(filename).index))
        } else {
            return filename
        }
    },
    
// 清空已传图片
    resetFaceList() {
     this.$refs.upload.clearFiles()
        },
    faceUploadOut() {
      this.faceUploladVisible = false
      this.resetFaceList()
      },
 
// 修改图片时
    imgChangeHandle(file,fileList) {
    },

// 上传图片前
    imgBeforeHandle(file, fileList) {
      let _this = this
        function imageType () { return ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'].includes(file.type) }
        const isLt2M = file.size / 1024 / 1024 < 2;
              if (!imageType()) { 
                this.$message.error('上传人脸图片只能是四种格式（jpg/jpeg/png/bmp）!')
                } else if (!isLt2M) {
                 this.$message.error('上传人脸图片大小不能超过2MB!')
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
          this.addVisitorForm['files'] = file.raw
           }, 700)
      },
   async httpRequest(content){
        this.save_loading = true
         let _this = this,
             a = this.addVisitorForm,
          formData = new FormData()
          for(let item in a) { formData.append(item, a[item]) }
          if(!this.btn_el.includes('edit')) {
              add()
          } else {
              edit()
          }
           function add() {
               saveVisitor(formData).then((res) => {
                if(res.code === 0 && res.data) {
                   _this.save_loading = false
                   _this.$message.success(`${ a?.['name'] } 保存成功！可在员工列表页面查看`, 4000)
                   _this.resetAddVisitorForm()
                     } else {
                       _this.$message.warning(res.msg, 4000)
                       _this.save_loading = false
                     }
                },(err) => {
                   _this.save_loading = false
                   _this.$message.error('保存失败，请重试！')
                  })
           }
           function edit() {
               editVisitor(_this.addVisitorForm.id, formData).then((res) => {
                if(res.code === 0 && res.data) {
                   _this.save_loading = false
                   _this.$message.success(`${ a?.['name'] } 保存成功！可在员工列表页面查看`, 4000)
                   _this.resetAddVisitorForm()
                     } else {
                       _this.$message.warning(res.msg, 4000)
                       _this.save_loading = false
                     }
                },(err) => {
                   _this.save_loading = false
                   _this.$message.error('保存失败，请重试！')
                  })
           }
            },
    async submitImg() {
      this.$refs.upload.submit()
    },
 
// 上传失败
     imgError(err, file, fileList) {
       this.$message({
                message: '上传失败，请重试',
                 type: "error"
            })
     },
     handlePictureCardPreview(file) {
             this.dialogImageUrl = file.url
               this.fdImageVisible = true
             },

// 取消编辑传给列表页
    cancelEdit() {
        this.$emit('cacel')
    }
  },
  created() {

  },
  mounted() {
  },
};
</script>
