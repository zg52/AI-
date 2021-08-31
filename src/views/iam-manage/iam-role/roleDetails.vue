<!--
 * @Author: long
 * @Date: 2021-08-10 14:23:30
 * @LastEditTime: 2021-08-20 10:06:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\iam-manage\iam-role\roleDetails.vue
-->
<template>
        <RoleTable :formParams="formParams" :submitType="submitType" />
</template>
<script>
import RoleTable from './components/RoleTable.vue'
export default {
    data() {
        return {
             submitType: ['details'],
             formParams: {
               roleName: '',
               roleDescribe: ''
              }
        }
    },
    components: {
        RoleTable,
    },
    created() {
        let querys = this.$route.query 
        if(querys.hasOwnProperty('roleName')) {
            this.formParams = {
                roleName: querys.roleName,
                roleDescribe: querys.roleDescribe
            }
        }
    }
}
</script>