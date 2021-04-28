<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-01-18 15:49:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\layout\components\Sidebar\Logo.vue
-->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
         <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
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
      title: '人 脸 辨 识 云 平 台 · 门 禁',
      logo: require('../../../assets/image/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  // height: 50px;
  background: #272c40;
  text-align: center;
  overflow: hidden;
    padding-top: 10px;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
    width: 45px;
    vertical-align: middle;
      margin-top: 8px;
    }
    & .sidebar-title {
      color: #fff;
      font-weight: 600;
      line-height: 25px;
      font-size: 12px;
      vertical-align: middle;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
