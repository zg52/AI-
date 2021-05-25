<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-05-25 17:34:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\layout\components\Sidebar\Logo.vue
-->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link style="position:relative;top:-1px;right: -5px;" v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo4" class="sidebar-logo4">
        <!-- <h1 v-else class="sidebar-title">{{ title }} </h1> -->
      </router-link>
      <router-link style="position:relative;top:-4px;" v-else key="expand" class="sidebar-logo-link" to="/">
         <img v-if="logo" :src="logo" class="sidebar-logo">
        <!-- <h1 class="sidebar-title">{{ title }} </h1> -->
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
      // title: '智能云服务',
      logo: require('../../../assets/image/logo3.png'),
      logo4: require('../../../assets/image/logo4.png')
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
.sidebar-logo4{width: 50px;padding-bottom: 7px;}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  // height: 50px;
  background: #213991;
  text-align: center;
  overflow: hidden;
    padding-top: 17px;    padding-bottom: 4px;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
    width: 115px;
    vertical-align: middle;
      // margin-top: 8px;
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
