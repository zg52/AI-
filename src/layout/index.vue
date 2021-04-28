<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-04-01 09:45:55
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
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
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
</style>
 
<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
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
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { exception_monitoring_blocklist, exception_monitoring_person } from '@/api/alarm'
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
    TagsView
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

// 监控黑名单人员
    get_exception_monitoring_blocklist() {
     exception_monitoring_blocklist(this.lastId1).then((res) => {
       if(res.code === 0 && res.data) {
         this.lastId1 = res.data.lastId
         let records = res.data.records
      if(records) {
       if(records.length !== 0) {
          this.$notify({
          title: '设备抓拍到黑名单人员',
          iconClass: 'el-icon-warning w',
          position: 'bottom-right',
         dangerouslyUseHTMLString: true,
         customClass:'warn',
         message: `<div class="warnSty"><div class="fl"><span>姓名：${ records[0].personName }</span>
         </div><img width="60" src="${ vm.getImgUrl }${records[0].imageId}"><br><span class="flex">详情</span></div>`,
         onClick() {
           vm.$router.push({path: '/traffic-records/index?tab=4'})
         }
        })
       }
       }
      }
    })
    },

// 监控未通行人员
    get_exception_monitoring_person() {
     exception_monitoring_person(this.lastId2).then((res) => {
       if(res.code === 0 && res.data) {
         this.lastId2 = res.data.lastId
         let records = res.data.records
      if(records) {
       if(records.length !== 0) {
          this.$notify({
          title: '设备抓拍到陌生人',
          type: 'warning',
          position: 'bottom-right',
         dangerouslyUseHTMLString: true,
         customClass:'warn',
         message: `<div class="warnSty"><div class="fl"><span>姓名：${ records[0].personName }</span>
         </div><img width="110" src="${ vm.getImgUrl }${records[0].imageId}"><br><span class="flex">详情</span></div>`,
         onClick() {
           vm.$router.push({path: '/traffic-records/index?tab=4'})
         }
        })
       }
       }
      }
    })
    },
  },
//   additionalInformation: null
// category: "blocklist"
// createTime: "2021-03-30T02:30:38"
// deviceId: 2
// id: 234
// imageId: null
// lastUpdateTime: null
// personId: 76
// personName: "zh"
// personType: null
// source: "person"
// uniqueDeviceIdentifier: "YGVE9CCPUS6QVQJ_"
// uuid: null
  created() {
    vm = this
    //  this.initWebSocket()
    },
  mounted() {
    // this.get_exception_monitoring_person()
    this.get_exception_monitoring_blocklist()
   setInterval(() => {
     this.get_exception_monitoring_blocklist()
   }, 10000)

  //  setInterval(() => {
  //     this.get_exception_monitoring_person()
  //  },5000)
  },
}
</script>