<!--
 * @Author: long
 * @Date: 2021-08-26 20:13:34
 * @LastEditTime: 2021-08-27 18:46:28
 * @LastEditors: Please set LastEditors
 * @Description: 密码修改成功
 * @FilePath: \ant-design-vue-jeecge:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\personal-center\personal-data\components\EditPaddSuccess.vue
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
       <p class="tip1" v-text="props.successTips_auth"></p>
       <p class="tip2"></p>
    </div>
</template>