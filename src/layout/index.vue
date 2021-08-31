<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-07-29 10:02:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\layout\index.vue
-->
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    // width: calc(100% - #{$sideBarWidth});
    width: 100%;
    transition: width 0.28s;
  }
  .breadcrumb {
    width: calc(100% - #{$sideBarWidth});
    position: fixed;
    right: 0;
  }

  .hideSidebar .fixed-header {
    // width: calc(100% - 54px);
    width: 100%;
  }
  .hideSidebar .breadcrumb {
     width: calc(100% - 54px);
   }
  .mobile .fixed-header {
    width: 100%;
  }
// 版权
.copyright {
  text-align: center;
  color: #999;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
}
</style>
<style lang="scss">
.warn {
  width: 260px;

  cursor: pointer;
  .el-notification__title {
    font-weight: normal!important;
  }
  .w {
    color: red!important;
  }
}
.warnSty {
  margin-top:15px;
  .fl {
    margin-right:10px;
    padding-top:10px;
    span {
      line-height: 20px;
    }
  }
  .flex {
    justify-content: flex-end;
    font-size: 12px;
    color: #999;
    &:hover {
      color: #7c14e6;
    }
  }
}
.breadcrumb {
  width: 100%;
height: 70px;
background: #ffffff;
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}
</style>
 
<template> 
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <!-- <tags-view v-if="needTagsView" /> -->
         <div class="breadcrumb">
           <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
         </div>
      </div>
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
    <p class="copyright">CopyRight © 2016-2021 华捷艾米 版权所有 京ICP备18040828号-1</p>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import Breadcrumb from '@/components/Breadcrumb'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { imgUrl } from '@/api/public'
import { mapState } from 'vuex'
let vm

export default {
  name: 'Layout',
  data() {
    return {
      lastId1: null,
      lastId2: null,
      blockListHtm: '',
      getImgUrl: imgUrl()

    }
  },
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Breadcrumb
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        websock: null,
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
     initWebSocket(){ //初始化weosocket
        const wsuri = "ws://192.168.10.148:31181/"
        this.websock = new WebSocket(wsuri)
        this.websock.onmessage = this.websocketonmessage
        this.websock.onopen = this.websocketonopen
        this.websock.onerror = this.websocketonerror
        this.websock.onclose = this.websocketclose
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        let actions = {"test":"12345"};
        this.websocketsend(JSON.stringify(actions))
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket()
        console.log('err')
      },
      websocketonmessage(e){ //数据接收
        const redata = JSON.parse(e.data)
        console.log("🚀 ~ file: index.vue ~ line 136 ~ websocketonmessage ~ redata", redata)
        
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data)
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e)
      },
  },
  created() {
    vm = this
    },
  mounted() {
  },
}
</script>
