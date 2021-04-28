<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-30 11:21:59
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
  .import {
    margin-top:30px;
        width: 40%;
    .el-upload__tip {
      margin-top:20px;
    }
  }
</style>
<template>
  <div class="app-container pl0">
     <el-form :model="addVisitorForm" label-width="auto" :rules="addVisitorRule" ref="addVisitorFormRule" class="addVisitorForm" :inline="true">
       <el-form-item label="创建人："><el-input v-model="addVisitorForm.operator" class="w100" disabled></el-input></el-form-item>
       <el-form-item label="访客姓名：" prop="name"><el-input v-model.trim="addVisitorForm.name" maxlength="8" class="w120" clearable></el-input></el-form-item>
       <el-form-item label="性别："><el-select class="w100" v-model.trim="addVisitorForm.gender"><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
       <el-form-item label="电话：" prop="phone"><el-input class="w160" v-model.trim="addVisitorForm.phone" clearable></el-input></el-form-item>
        <el-form-item label="邮箱：" prop="email"><el-input class="w180" v-model.trim="addVisitorForm.email" clearable></el-input></el-form-item>
       <el-form-item label="访客所在公司："  prop="position"><el-input class="w240" v-model.trim="addVisitorForm.visitorCompany" clearable></el-input></el-form-item>
       <el-form-item label="身份证号：" prop="idNum"><el-input class="w200" v-model.trim="addVisitorForm.idNum" clearable></el-input></el-form-item>
       <el-form-item label="住址：" prop="address"><el-input class="w300" v-model.trim="addVisitorForm.address" clearable></el-input></el-form-item>
       <el-form-item label="被访人姓名：" prop="visitorName"><el-input class="w160" v-model.trim.trim="addVisitorForm.intervieweeName" maxlength="30" clearable></el-input> </el-form-item>
       <el-form-item label="被访人公司："  prop="position"><el-input v-model.trim="addVisitorForm.orgId" class="w160" clearable disabled></el-input></el-form-item>
      <el-form-item label="被访人电话：" prop="visitorPhone"><el-input class="w160" v-model.trim="addVisitorForm.intervieweePhone" clearable></el-input></el-form-item>
      <el-form-item label="来访事由：" prop="reason"><el-input class="w300" v-model.trim.trim="addVisitorForm.reason" maxlength="30" clearable></el-input></el-form-item>
      <el-form-item label="来访时间" prop="date">
        <el-date-picker
          v-model="addVisitorForm.date"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="来访时间"
          end-placeholder="结束时间"
          @change="changeDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注：" prop="remark"><el-input class="w360" v-model.trim="addVisitorForm.remark" type="textarea" :rows="2" placeholder="请输入内容"> </el-input></el-form-item> <br>
      <el-form-item label="头像类型：">
        <el-radio-group v-model="faceType" @change="changeImgType"><el-radio v-for="(faceType, index) of faceTypes" :key="index" :label="faceType.name">{{ faceType.name }}</el-radio></el-radio-group>
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
        <el-button type="primary" v-show="!btn_el.includes('edit')" @click.prevent="bulkImport" disabled><i class="el-icon-folder-add" /> 批量导入</el-button>
        <el-button @click="resetAddVisitorForm" v-show="!btn_el.includes('edit')"><i class="el-icon-refresh"></i><span>重 置</span></el-button>
        <el-button type="primary" :loading="save_loading" @click="saveVisitorHandle('addVisitorFormRule')"><i class="el-icon-check"></i> &nbsp;{{ save_loading_text }}</el-button>
        <router-link to="/people-manage/visitor-manage/visitor-list/visitorlist" class="ml10"><el-button v-show="!btn_el.includes('edit')"><i class="el-icon-view"></i> 查看访客列表</el-button></router-link>
        <el-button @click="cancelEdit" v-show="!btn_el.includes('add')"><span>取 消</span></el-button>
     </el-form-item>
     </el-form>

<!-- 批量导入 -->
    <el-dialog
      title="批量导入访客信息"
      :visible.sync="import_dialogVisible"
      width="44%"
      >
     <el-steps :active="importActive" align-center>
      <el-step v-for="(step, index) of steps" :key="index" :title="step.tit" :description="step.des"></el-step>
    </el-steps>
  <div class="import">
    <div class="zip" v-show="zipShow">
      <el-upload
        class="avatar-uploader"
        ref="uploadZip"
        :action="visitorZip"
         multiple
        :before-upload="beforeZipUpload"
        :on-error="zipError"
        :on-success="handleZipSuccess"
        >
      <el-button slot="trigger" size="small" type="primary"><svg-icon icon-class="zip" /> 上传 zip 文件</el-button>
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadZip">上传到服务器</el-button> -->
      <div slot="tip" class="el-upload__tip">zip文件列表：</div>
    </el-upload>
     </div>
     <div class="xls" v-show="excelShow">
      <el-upload
        class="importUpload"
        ref="uploadExcel"
        :action="visitorExcel"
         multiple
        :before-upload="beforeExcelUpload"
        :on-error="excelError"
        :on-success="handleExcelSuccess"
        >
      <el-button slot="trigger" size="small" type="primary"><svg-icon icon-class="excel" /> 上传表格文件</el-button>
      <el-button size="small" @click="getVisitorTemplate" class="ml10"><i class="el-icon-download"></i> 下载示例模板</el-button>
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadZip">上传到服务器</el-button> -->
      <div slot="tip" class="el-upload__tip">表格文件列表：</div>
    </el-upload>
     </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button class="xia" :disabled="this.zipShow ? true : false" @click.prevent="zipExcelToggle">{{ this.zipShow ? '下一步' : '上一步' }}</el-button>
    <el-button @click="import_dialogVisible = false">取 消</el-button>
    <!-- <el-button type="primary" @click="import_dialogVisible = false">确 定</el-button> -->
  </span>
</el-dialog>
 <el-button plain @click="open1" class="none"></el-button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { saveVisitor, editVisitor, visitorZip, visitorExcel, getVisitorTemplate, getImportStatus, getReslut } from '@/api/people-manage/visitorManage'
import moment from 'moment'
import Mock from '../../../../../mock/proxyUrl'
import { validPhone, validateIdCard, validName } from '@/utils/validate'
import { getGender, getFaceType} from '@/utils/business'
import {proxyUrl_1, imgUrl, downVisitorTemplate } from '@/api/public'
// import { pickerOptions } from '@/utils'

let vm

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
    },
    validateName = (rule, value, callback) => {
      !validName(value) ? callback(new Error('只能输入中文或英文')) :  callback()
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
      proxyUrl: proxyUrl_1,
      date: null,
      genders: getGender(),
      faceTypes: getFaceType(),
      imageUrl: '',
      faceType: getFaceType()[0].name,
    //   addVisitorForm: formHadleParam,
      addVisitorRule: {
           name: [
            notNull('访客姓名')[0],
            { validator: validateName, trigger: "blur" },
          ],
          phone: [
            notNull('访客手机号')[0],
            { validator: validPhoneTarget, trigger: "blur" },
          ],
          email: notNull('访客邮箱'),
          intervieweeName: notNull('访客姓名'),
          intervieweePhone: [
            notNull('被访人手机号')[0],
            { validator: validPhoneTarget, trigger: "blur" },
          ],
          address: notNull('住址'),
          idNum: [
             notNull('访客身份证号')[0],
             { validator: validateIdCardTarge, trigger: "blur" },
          ],
          date: notNull('来访时间')
        },

// 批量导入
        import_dialogVisible: false,
        importActive: 1,
        steps: [
          {
            tit: '步骤一',
            des: '图片命名格式为姓名（张三.jpg/png/bmp），批量压缩图片为zip格式上传'
          },
          {
            tit: '步骤二',
            des: '上传员工信息表格文件（xls、excel、xlsx）'
          }
        ],
        visitorZip: visitorZip(),
        visitorExcel: visitorExcel(),
        zipShow: true,
        excelShow: false
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    
// 提交访客信息
  async saveVisitorHandle(el) {
    let a = this.addVisitorForm
       this.$refs[el].validate((valid) => {
         this.httpRequest()
      //   if (valid) {
      //     a['files'] === null ? this.$message.warning('请上传访客头像！') : this.httpRequest()
      // }
     })
  },
  changeDate() {
   let a = this.addVisitorForm,
       date = a['date']
       date && date.length
        ? ((a['visitStartTime'] = moment(a.date[0]).format("YYYY-MM-DD HH:mm:ss")),
          (a['visitEndTime'] = moment(a.date[1]).format("YYYY-MM-DD HH:mm:ss")))
        :  (a['visitStartTime'] = a['visitEndTime'] = null)
  },
  changeImgType() {
    this.addVisitorForm.faceType = this.faceType == 0 ? 0 : 1
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
    //  delete this.addVisitorForm.date
        this.save_loading = true
        let a = this.addVisitorForm,
          formData = new FormData()
          for(let item in a) { formData.append(item, a[item]) }
          if(!this.btn_el.includes('edit')) {
              add()
          } else {
              edit()
          }
           function add() {
            if( vm.addVisitorForm['files'] == null) { //访客非必选上传头像（因为每个访客下发时有二维码）
              formData.delete('files')
            }
               saveVisitor(formData).then((res) => {
                if(res.code === 0 && res.data) {
                   vm.save_loading = false
                   vm.$message.success(`${ a?.['name'] } 保存成功！可在访客列表页面查看`, 4000)
                   vm.resetAddVisitorForm()
                     } else {
                       vm.$message.warning(res.msg, 4000)
                       vm.save_loading = false
                     }
                },(err) => {
                   vm.save_loading = false
                   vm.$message.error('保存失败，请重试！')
                  })
           }
           function edit() {
               editVisitor(vm.addVisitorForm.id, formData).then((res) => {
                if(res.code === 0 && res.data) {
                   vm.save_loading = false
                   vm.$message.success(`${ a?.['name'] } 保存成功！`, 4000)
                   vm.resetAddVisitorForm()
                   vm.cancelEdit()
                     } else {
                       vm.$message.warning(res.msg, 4000)
                       vm.save_loading = false
                     }
                },(err) => {
                   vm.save_loading = false
                   vm.$message.error('保存失败，请重试！')
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
        this.$emit('cacelEdit')
        
    },
    
// -----------------------------------------批量导入图片zip和xls----------------------------
   bulkImport() {
     this.import_dialogVisible = true
   },
   submitUploadZip() {
     this.$refs.uploadZip.submit();
   },
  beforeZipUpload(file) {
    return this.zipRule(file.type, file.size, file)
  },
   handleZipSuccess(res, file) {
     if(res === 'success') {
       this.open1(`${ file.raw.name } 上传成功`, '成功', 'success')
       this.zipExcelToggle()
     }
    },
  zipError(err, file, fileList) {
    if(file.raw.type ==  'application/zip') {
       this.open1(`${ file.raw.name } 上传失败，请重试`, '失败', 'error')
    }
  },
  zipRule(fileType, fileSize, fileRaw) {
     let zipFormat = (fileRaw.name).lastIndexOf('.')
     function zipType () { return fileType === 'application/zip' || (fileRaw.name).substr(zipFormat + 1).includes('zip') }
     const isLt1M = fileSize / 1024 / 1024 < 20;
        if (!zipType()) { 
          this.$message.error('上传压缩包只能是 zip 格式！', 4000)
          } else if (zipType() && !isLt1M) {
             this.$message.error('上传zip大小不能超过20MB！', 4000)
          } else if (!zipType() && !isLt1M) {
             this.$message.error('上传zip大小不能超过20MB,只能是 zip 格式！', 4000)
          }
        return zipType() && isLt1M
    },

// -----------------------------------------导入表格----------------------------------
  beforeExcelUpload(file) {
    return this.excelRule(file.type, file.size, file)
  },
  excelRule(fileType, fileSize, fileRaw) {
     function excelType () { return fileType.indexOf('sheet') !== -1 }
     const isLt1M = fileSize / 1024 / 1024 < 3;
        if (!excelType()) { 
          this.$message.error('上传表格文件只能是 xls、excel、xlsx 格式！', 4000)
          } else if (excelType() && !isLt1M) {
             this.$message.error('上传表格文件大小不能超过20MB！', 4000)
          } else if (!excelType() && !isLt1M) {
             this.$message.error('上传表格文件大小不能超过20MB,只能是 xls、excel、xlsx 格式！', 4000)
          }
        return excelType() && isLt1M
    },
   handleExcelSuccess(res, file) {
     console.log(res)
     if(res === 'going') {
       getImportStatus().then(res => {
         
       })
        this.open1(`${ file.raw.name } 上传成功`, '成功', 'success')
        this.cancelEdit()
     }
    },
  excelError(err, file, fileList) {
    if(file.raw.type.indexOf('sheet') !== -1) {
     this.open1(`${ file.raw.name } 上传失败，请重试`, '失败', 'error')
    }
  },

// 下载员工录入模板
  getVisitorTemplate() {
     getVisitorTemplate().then(res => {
        if(res) {
          downVisitorTemplate()
        }
      })
  },
   zipExcelToggle() {
     if(this.zipShow) {
       this.zipShow = false
       this.excelShow = true
       this.importActive = 2
     } else if(this.excelShow) {
       this.zipShow = true
       this.excelShow = false
       this.importActive = 1
     }
   },
  open1(zipName, statusName, status) {
        this.$notify({
          title: statusName,
          message: zipName,
          type: status
        })
      },
  },
  created() {
    vm = this
    let a = vm.addVisitorForm
    this.imageUrl = ''
    this.imageUrl = this.btn_el.includes('edit') ? `${ imgUrl() }${ this.addVisitorForm.imageId }` : ''

    if(this.btn_el.includes('edit')) {
     vm.$set(a,'date', [a['visitStartTime'], a['visitEndTime']])
   }
  },
  mounted() {
    // getReslut().then()
  },
};
</script>
