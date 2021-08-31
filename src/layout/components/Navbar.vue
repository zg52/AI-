<!--
 * @Author: long
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-08-10 14:38:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\layout\components\Navbar.vue
-->
<style lang="scss" scoped>
.navbar {
  height: 50px;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background: #002766;
  display: flex;
  justify-content: space-between;

  .hamburger-container {
    fill: #fff;
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
     display: flex;
     justify-content: space-between;
    height: 100%;
    line-height: 50px;
    padding-right: 15px;

    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
      .user-avatar {
        cursor: pointer;
        width: 30px;
        border-radius: 10px;
      }
  }
}
.name {
  color: #fff;
  display: inline-block;
  margin-left: 10px;
  vertical-align: text-bottom;
  position: relative;
  right: 5px;
}
.logo {
  line-height: 44px;
  margin-left: 10px;
}
.downlis .lis {
  left:-87px;
}
.anticon {
  position: relative;
  top:10px;
  left: 1px;
}
</style>

<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <div class="logo"><img src="../../assets/image/logo3.png" alt=""></div>
    <BusinessNav />
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        
        <News class="right-menu-item" />

        <search id="header-search" class="right-menu-item" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <!-- <lang-select class="right-menu-item hover-effect" /> -->

      </template>
      <span class="name">{{ username }}</span>
      <ul class="flex downlis">
      <li class="ml0">
        <div class="down_t">
          <span class=""> <img src="../../assets/image/user.png" class="user-avatar"></span> <a-icon type="caret-down" />
        </div>
        <div class="lis">
          <div class="t1">
            <div class="t_route">
             <router-link v-for="(nav, index) of navs" :key="index" :to="nav.href"><span>{{ nav.name }}</span></router-link>
             <a @click.prevent="logout">退出</a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import News from '@/components/News'
import BusinessNav from './BusinessNav'

export default {
  components: {
    Screenfull,
    SizeSelect,
    Search,
    News,
    BusinessNav
  },
  data() {
    return {
      navs: [
        {
          name: '账号中心',
          href: '?'
        },
        {
          name: '多用户管理',
          href: '?'
        },
        {
          name: '财务中心',
          href: '?'
        },
        // {
        //   name: '服务信息',
        //   href: '/profile/index?SeviceInfo=true'
        // },
        // {
        //   name: '修改密码',
        //   href: '/profile/index?ChangePasswd=true'
        // },
        // {
        //   name: '个人信息',
        //   href: '/profile/index?UserInfo=true'
        // },
        // {
        //   name: '企业信息',
        //   href: '/profile/index?Company=true'
        // },
      ]  
    }
  },
  computed: {
    ...mapGetters([
      // 'sidebar',
      'avatar',
      'device',
      'username'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
  created() {
  }
}
</script>