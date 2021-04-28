<!--
 * @Author: your name
 * @Date: 2021-02-03 19:56:03
 * @LastEditTime: 2021-03-24 18:25:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\views\people-manage\visitor-manage\visitor-add\index.vue
-->

<template>
  <div>
    <VisitorFromHandle :btn_el="btn_el" :addVisitorForm="addVisitorForm" />
  </div>
</template>
<script>
import VisitorFromHandle from '../components/VisitorFromHandle'
// import { getGender, getFaceType} from '../components/index'
export default {
  components: { VisitorFromHandle },
  data() {
    return {
      addVisitorForm: {
           operator: this.$store.getters.username,
           gender: 'male', // 默认性别男
           faceType: 'id', // 默认证件照
           phone: null,
           email: null,
           intervieweePhone: null,
           name: null,
           intervieweeName:null,
           idNum: null,
           address: null,
           reason: null,
           remark: null,
           orgId: 1,
           visitorCompany: null,
           status: 'auth',

           visitStartTime: null,
           visitEndTime: null,
           files: null,
         },
         btn_el: ['add']
    }
  },
  created() {
 
  }
}
</script>