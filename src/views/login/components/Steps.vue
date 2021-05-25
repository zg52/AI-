<!--
 * @Author: your name
 * @Date: 2021-05-12 18:38:54
 * @LastEditTime: 2021-05-12 18:48:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\login\components\steps.vue
-->
<template>
    <div>
<el-steps :active="active" finish-status="success" align-center>
  <el-step title="填写账号信息"></el-step>
  <el-step title="填写公司信息"></el-step>
  <el-step title="提交信息进行审核"></el-step>
</el-steps>
    </div>
</template>
<script>
export default {
    props: {
        active: {
            type: Number
        }
    }
}
</script>