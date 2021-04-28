<!--
 * @Author: your name
 * @Date: 2021-02-07 18:19:07
 * @LastEditTime: 2021-03-12 11:22:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\views\people-manage\staff-manage\staff-add\staffAdd.vue
-->

<template>
  <div>
    <StaffFromHandle :btn_el="btn_el" :addStaffForm="addStaffForm" />
  </div>
</template>
<script>
import StaffFromHandle from '../components/StaffFromHandle'
// import { getGender, getFaceType} from '../components/index'
export default {
  components: { StaffFromHandle },
  data() {
    return {
      addStaffForm: {
           operator: this.$store.getters.username,
           name: null,
           gender: 'male', // 默认性别男
           faceType: 'id', // 默认证件照

           phone: null,
           address: null,
           idNum: null,
           mail: null,
           employee_num: null,
           companyId: 1,
           position: null,
           icCardId: null,
           gateCardId: null,
           enrollTime: null,
           files: null
         },
         btn_el: ['add']
    }
  },
  created() {
 
  }
}
</script>