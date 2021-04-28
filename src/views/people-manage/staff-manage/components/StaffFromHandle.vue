<!--
 * ......................................&&.........................
 * ....................................&&&..........................
 * .................................&&&&............................
 * ...............................&&&&..............................
 * .............................&&&&&&..............................
 * ...........................&&&&&&....&&&..&&&&&&&&&&&&&&&........
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............
 * ................&...&&&&&&&&&&&&&&&&&&&&&&&&&&&&.................
 * .......................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ...................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...............
 * ..................&&&   &&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ...............&&&&&@  &&&&&&&&&&..&&&&&&&&&&&&&&&&&&&...........
 * ..............&&&&&&&&&&&&&&&.&&....&&&&&&&&&&&&&..&&&&&.........
 * ..........&&&&&&&&&&&&&&&&&&...&.....&&&&&&&&&&&&&...&&&&........
 * ........&&&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&....&&&.......
 * .......&&&&&&&&.....................&&&&&&&&&&&&&&&&.....&&......
 * ........&&&&&.....................&&&&&&&&&&&&&&&&&&.............
 * ..........&...................&&&&&&&&&&&&&&&&&&&&&&&............
 * ................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&..&&&&&............
 * ..............&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&....&&&&&............
 * ...........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&......&&&&............
 * .........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........&&&&............
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&............
 * ......&&&&&&&&&&&&&&&&&&&...&&&&&&...............&&&.............
 * .....&&&&&&&&&&&&&&&&............................&&..............
 * ....&&&&&&&&&&&&&&&.................&&...........................
 * ...&&&&&&&&&&&&&&&.....................&&&&......................
 * ...&&&&&&&&&&.&&&........................&&&&&...................
 * ..&&&&&&&&&&&..&&..........................&&&&&&&...............
 * ..&&&&&&&&&&&&...&............&&&.....&&&&...&&&&&&&.............
 * ..&&&&&&&&&&&&&.................&&&.....&&&&&&&&&&&&&&...........
 * ..&&&&&&&&&&&&&&&&..............&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ..&&.&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&&&&&&&&&&&&.......
 * ...&&..&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&...&&&&&&&&&&&&......
 * ....&..&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&&&&&.....
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............&&&&&&&....
 * .......&&&&&.&&&&&&&&&&&&&&&&&&..&&&&&&&&...&..........&&&&&&....
 * ........&&&.....&&&&&&&&&&&&&.....&&&&&&&&&&...........&..&&&&...
 * .......&&&........&&&.&&&&&&&&&.....&&&&&.................&&&&...
 * .......&&&...............&&&&&&&.......&&&&&&&&............&&&...
 * ........&&...................&&&&&&.........................&&&..
 * .........&.....................&&&&........................&&....
 * ...............................&&&.......................&&......
 * ................................&&......................&&.......
 * .................................&&..............................
 * ..................................&..............................
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
     <el-form :model="addStaffForm" label-width="auto" :rules="addStaffRule" ref="addStaffFormRule" class="addStaffForm" :inline="true">
       <el-form-item label="创建人："><el-input v-model="addStaffForm.operator" class="w160" disabled></el-input></el-form-item>
       <el-form-item label="员工姓名：" prop="name"><el-input v-model.trim="addStaffForm.name" class="w160" maxlength="8" clearable></el-input></el-form-item>
       <el-form-item label="性别："><el-select class="w160" v-model.trim="addStaffForm.gender"><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
       <el-form-item label="电话：" prop="phone"><el-input class="w160" v-model.trim="addStaffForm.phone" clearable></el-input></el-form-item>
       <el-form-item label="职务："  prop="position"><el-input v-model.trim="addStaffForm.position" class="w160" clearable></el-input></el-form-item>
       <el-form-item label="入职时间：" prop="enrollTime">
        <el-date-picker class="w300" v-model.trim="addStaffForm.enrollTime" type="date" align="right" unlink-panels start-placeholder="创建日期" @change="changeDate"></el-date-picker>
        </el-form-item>
       <el-form-item label="住址：" prop="address"><el-input class="w300" v-model.trim="addStaffForm.address" clearable></el-input></el-form-item>
       <el-form-item label="身份证号：" prop="idNum"><el-input class="w300" v-model.trim="addStaffForm.idNum" clearable></el-input></el-form-item>
       <el-form-item label="邮箱：" prop="mail"><el-input class="w300" v-model.trim="addStaffForm.mail" clearable></el-input></el-form-item>
       <el-form-item label="工号：" prop="employeeNum"><el-input class="w300" v-model.trim.trim="addStaffForm.employeeNum" maxlength="30" clearable></el-input> </el-form-item>
       <el-form-item label="所属部门：">
         <el-select class="w300" v-model.trim="addStaffForm.region" placeholder="华捷艾米" disabled>
           <el-option label="人力组" value="shanghai"></el-option>
           <el-option label="行政组" value="beijing"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="IC卡号：" prop="icCardId"><el-input class="w300" v-model.trim.trim="addStaffForm.icCardId" maxlength="30" clearable></el-input></el-form-item>
      <el-form-item label="门禁卡号：" prop="gateCardId"><el-input class="w300" v-model.trim.trim="addStaffForm.gateCardId" maxlength="30" clearable></el-input></el-form-item>
      <el-form-item label="备注：" prop="description"><el-input class="w360" v-model.trim="addStaffForm.description" type="textarea" :rows="2" placeholder="请输入内容"> </el-input></el-form-item>
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
       <router-link to="/people-manage/staff-manage/staff-add/bulkImportStaff"><el-button type="primary" v-show="btn_el.includes('add')"><i class="el-icon-folder-add" /> 批量导入</el-button></router-link>
        <el-button class="ml10" @click="resetAddStaffForm" v-show="!btn_el.includes('edit')"><i class="el-icon-refresh"></i><span>重 置</span></el-button>
        <el-button type="primary" :loading="save_loading" @click="saveStaffHandle('addStaffFormRule')"><i class="el-icon-check"></i> &nbsp;{{ save_loading_text }}</el-button>
        <router-link to="/people-manage/staff-manage/staff-list/staffList" class="ml10"><el-button v-show="!btn_el.includes('edit')"><i class="el-icon-view"></i> 查看员工列表</el-button></router-link>
        <el-button @click="cancelEdit" v-show="!btn_el.includes('add')"><span>取 消</span></el-button>
     </el-form-item>
     </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { saveStaff, editStaff, editBatchStaff } from '@/api/people-manage/staffManage'
import moment from 'moment'
import Mock from '../../../../../mock/proxyUrl'
import { validPhone, validateIdCard, validName } from '@/utils/validate.js'
import { getGender, getFaceType} from '@/utils/business'
import {proxyUrl_1, imgUrl } from '@/api/public'
// import { pickerOptions } from '@/utils'

let vm

export default {
  name: 'staff-add',
  props: {
      addStaffForm: {
          type: Object
      },
      btn_el: {
          type: Array
      }
  },
  data() {
   let validPhoneTarget = (rule, value, callback) => {
     !validPhone(value) ? callback(new Error("请输入正确的手机号格式!")) : callback()
    },
    validateIdCardTarge = (rule, value, callback) => {
     !validateIdCard(value) ? callback(new Error("请输入正确格式的身份证号格式!")) : callback()
    },
    validateName = (rule, value, callback) => {
      !validName(value) ? callback(new Error('只能输入中文或英文')) :  callback()
    }
    
    function numbers (str) {
      return (rule, value, callback) => {
     !isNaN(value) ? callback() : callback(new Error(`${ str }号只能为数字组成！`))
    }
    }
    function notNull(notNullName) { return [{required: true, message: `请输入员工${ notNullName }`, trigger: "blur" }] }

    return {
      save_loading: false,
      addStaffFormVisible: true,
      imgUploading: false,
      save_loading_text: '保 存',
      proxyUrl: proxyUrl_1,
      genders: getGender(),
      faceTypes: getFaceType(),
      imageUrl: '',
      faceType: getFaceType()[0].name,
    //   addStaffForm: formHadleParam,
      addStaffRule: {
          name: [
            notNull('姓名')[0],
            { validator: validateName, trigger: "blur" },
          ],
          phone: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            { validator: validPhoneTarget, trigger: "blur" },
          ],
          mail: [
            notNull('邮箱')[0],
            {
              type: "email",
              message: "请输入正确的邮箱地址",
              trigger: ["blur", "change"],
            },
          ],
          position: notNull('职务'),
          address: notNull('住址'),
          idNum: [
             notNull('身份证号')[0],
             { validator: validateIdCardTarge, trigger: "blur" },
          ],
          employeeNum: [
              notNull('工号')[0],
              { validator: numbers('工'), trigger: "blur" },
          ],
           icCardId: [
              notNull('IC卡号')[0],
              // { validator: numbers('Ic卡'), trigger: "blur" },
          ],
           gateCardId: [
              notNull('门禁卡号')[0],
              // { validator: numbers('门禁卡'), trigger: "blur" },
          ],
          enrollTime: notNull('入职时间')
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
  async saveStaffHandle(el) {
    let a = this.addStaffForm
       this.$refs[el].validate((valid) => {
        if (valid) {
          a['files'] === null || imageIdHandle() ? this.$message.warning('请上传员工头像！') : this.httpRequest()

           /**
            * @description: 批量导入人员时，编辑时需要传imagdid用于服务端匹配导入失败的记录 故
            */
           function imageIdHandle() {
             if(a.hasOwnProperty('imageId')) {
               if(a.imageId === 'null') {
                 return true
               } else {
                 return false
               }
             } else {
               return false
             }
           }
      }
     })
  },
  changeDate() {
   let a = this.addStaffForm
       a['enrollTime'] =  moment(a['enrollTime']).format('YYYY-MM-DD')
  },
  changeImgType() {
    this.addStaffForm.faceType = this.faceType == 'id' ? 'id' : 'life'
  },
   resetAddStaffForm() { 
    this.$refs['addStaffFormRule'].resetFields()
    this.addStaffForm['files'] = this.imageUrl = null
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
          this.addStaffForm['files'] = file.raw

          if(this.addStaffForm.hasOwnProperty('imageId')) {
            delete this.addStaffForm['imageId']
          }
           }, 700)
      },
   async httpRequest(content){
        this.save_loading = true
         let a = this.addStaffForm,
          formData = new FormData()
          for(let item in a) { formData.append(item, a[item]) }
          if(this.btn_el.includes('add')) {
              add()
          } else if(this.btn_el.includes('editErrStaff')) {
            editErrStaff()
          } else {
            edit()
          }
           function add() {
               saveStaff(formData).then((res) => {
                if(res.code === 0 && res.data) {
                   vm.save_loading = false
                   vm.$message.success(`${ a?.['name'] } 保存成功！可在员工列表页面查看`, 4000)
                   vm.resetAddStaffForm()
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
               editStaff(vm.addStaffForm.id, formData).then((res) => {
                if(res.code === 0) {
                   vm.save_loading = false
                   vm.$message.success(`${ a?.['name'] } 修改成功！`, 4000)
                   vm.resetAddStaffForm()
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

// 修改批量导入错误的员工信息
             function editErrStaff() {
               editBatchStaff(vm.addStaffForm.id, formData).then((res) => {
                if(res.code === 0) {
                   vm.save_loading = false
                   vm.$message.success(`${ a?.['name'] } 修改成功！`, 4000)
                   vm.resetAddStaffForm()
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
  },
  created() {
    vm = this
   this.imageUrl = ''
   this.imageUrl = this.btn_el.includes('edit') || this.btn_el.includes('editErrStaff') ? `${ imgUrl() }${ this.addStaffForm.imageId }` : ''
  },
  mounted() {
  },
}
</script>
