<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-07-29 18:27:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\layout\components\Sidebar\Logo.vue
-->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
   <span class="slidbar_tit">人脸辨识云</span>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // title: '智能云服务',
      logo: require('../../../assets/image/logo3.png'),
      logo4: require('../../../assets/image/logo4.png')
    }
  }
}
</script>

<style scoped>
.sidebar-logo-container {
  padding-top: 20px;
  padding-bottom: 20px;
}
.slidbar_tit {
    font-size: 14px;
    padding-left: 22px;
    font-weight: bold;
}
</style>
