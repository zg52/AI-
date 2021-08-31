<!--
 * @Author: your name
 * @Date: 2021-08-30 15:57:48
 * @LastEditTime: 2021-08-30 16:40:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ant-design-vue-jeecge:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\personal-center\components\EnterpriseCertificateSuccess.vue
-->
<style scoped>
.theme_col {
    font-size: 60px;
}
.tip1 {padding-top: 20px; font-size: 24px;color: #000;}
    
</style>
<template functional>
    <div class="t_center">
       <a-icon type="exclamation-circle" theme="filled" class="theme_col" />
       <p class="tip1" v-text="props.successTips_auth1"></p>
       <p class="tip2">工作人员将于3个工作日之内为您审批，您可以查看个人资料页面认证状态</p>
    </div>
</template>