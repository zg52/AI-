<!--
 * @Author: your name
 * @Date: 2021-08-10 14:30:26
 * @LastEditTime: 2021-08-20 09:59:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\iam-manage\iam-role\addRole.vue
-->
<template>
        <RoleTable :submitType="submitType" />
</template>
<script>
import RoleTable from './components/RoleTable.vue'
export default {
    data() {
        return {
            submitType: ['add'],
        }
    },
    components: {
        RoleTable,
    }
}
</script>