<!--
 * @Author: long
 * @Date: 2021-08-27 15:13:25
 * @LastEditTime: 2021-08-30 16:20:01
 * @LastEditors: Please set LastEditors
 * @Description: 个人认证
 * @FilePath: \ant-design-vue-jeecge:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\personal-center\personal-data\components\PersonalCertificate.vue
-->
<style scoped lang="less">
.avatar-uploader > .ant-upload {
width: 297px;
height: 148px;
}
.avatar-uploader ::v-deep.ant-upload.ant-upload-select-picture-card {
width: 297px;
height: 148px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.des {
    font-size: 12px;
    line-height: 18px;
    position: relative;
    top:-18px
  }
</style>
<template>
    <div class="auto_info">
     <a-form-model :labelCol="{ span: 8 }" :wrapper-col="{ span: 10 }" ref="PersonalCertificate" :model="editPersonalCertificateForm" class="pt10" :rules="rules">
      <a-form-model-item label="姓名：" has-feedback prop="name">
        <a-input v-model.trim="editPersonalCertificateForm.name" placeholder="请输入姓名" :maxLength=8 allow-clear />
      </a-form-model-item>
      
      <a-form-model-item label="身份证：" has-feedback prop="identityCard">
        <a-input v-model.trim="editPersonalCertificateForm.identityCard" :maxLength=18 placeholder="请输入身份证号码" allow-clear />
      </a-form-model-item>

      <a-form-model-item label="身份证正面照：" prop="file">
         <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="proxyUrl"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" class="w100" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击或拖拽至此处上传</div>
            </div>
          </a-upload>
          <p class="des"><a-icon type="info-circle" /> 上传图片文件支持PNG、JPG、JPEG、BMP，图片大小不超过2M</p>
      </a-form-model-item>
    </a-form-model>
    </div>
</template>
<script>
import { validateChars, validateIdCard } from '@/utils/validate'
import { validateNotNull } from '@/utils/business'

import Mock from '@/../mock/proxyUrl'
import { proxyUrl_1 } from '@/api/public'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
    data() {
       let validateName = (rule, value, callback) => {
           value === ""
             ? callback(new Error("请输入姓名"))
             : validateChars(value)
             ? callback(new Error("姓名名不能出现特殊符号"))
             : callback()
         },
          validateIdCardTarge = (rule, value, callback) => {
          !validateIdCard(value) ? callback(new Error("请输入正确格式的身份证号!")) : callback()
        }
        
        return {
            editPersonalCertificateForm: {
                name: '',
                identityCard: '',
                file: '',
            },
            personalCertificateParams: null,
            rules: {
              name: [validateNotNull('姓名')[0], { validator: validateName, trigger: "blur"  }],
              identityCard: [validateNotNull('身份证号')[0], { validator: validateIdCardTarge, trigger: "blur" }],
              file: [{ required: true, message: '', trigger: "blur" }]
             },
             
            loading: false,
            imageUrl: '',
            proxyUrl: proxyUrl_1,
        }
    },
    methods: {
     handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      function imageType () { return ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'].includes(file.type) }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!imageType()) {
        this.$mesg.error('上传人脸图片只能是四种格式（jpg/jpeg/png/bmp）!')
      } else if (!isLt2M) {
        this.$msg.error('上传人脸图片大小不能超过2MB!')
      } else {
          console.log(file)
          Promise.resolve().then(() => {
          this.editPersonalCertificateForm.file = file
          
          let formData = new FormData()
          for(let item in this.editPersonalCertificateForm) { formData.append(item, this.editPersonalCertificateForm[item]) }
          this.personalCertificateParams = formData
         })
      }
      return imageType() && isLt2M
    },
    }
}
</script>
