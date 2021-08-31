<style lang="scss" scoped>
</style>

<template>
  <div class="business_nav">
    <ul class="flex downlis">
      <li><router-link to="#" class="down_t">总览</router-link></li>
      <li
        @mouseenter.prevent="navLisShow_handle"
        @mouseleave.prevent="navLisHide_handle"
      >
        <div class="down_t">
          <span>产品服务</span> <a-icon type="caret-down" />
        </div>
        <div class="lis" v-show="navLisShow">
          <h4><a-icon type="pic-center" />算法服务</h4>
          <div class="t1">
            <span class="_t">• 人脸识别</span>
            <div class="t_route">
              <router-link to="#"><span>2D人脸识别</span></router-link>
              <router-link to="#"><span>3D人脸识别</span></router-link>
            </div>
            <span class="_t">• 人体分析</span>
            <div class="t_route">
              <router-link to="#"><span>3D人体建模</span></router-link>
              <router-link to="#"><span>人体骨架识别</span></router-link>
              <router-link to="#"><span>手势识别</span></router-link>
            </div>
            <span class="_t">• 人体分析</span>
            <div class="t_route">
              <router-link to="#"><span>场景识别</span></router-link>
              <router-link to="#"><span>VR场景建模</span></router-link>
            </div>
          </div>
          <div class="t1 pt10">
            <h4><a-icon type="pic-center" />数据统计服务</h4>
            <div class="t_route">
              <router-link to="#"><span>Andriod</span> 统计分析SDK</router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="flex downlis">
      <li><router-link to="#" class="down_t">应用管理</router-link></li>
      <li>
        <div class="down_t"><span>支持</span> <a-icon type="caret-down" /></div>
        <div class="lis">
          <div class="t1">
            <div class="t_route">
              <router-link to="#"><span>工单系统</span></router-link>
              <router-link to="#"><span>客户服务</span></router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navLisShow: false,
    };
  },
  methods: {
    navLisShow_handle() {
      this.navLisShow = true
    },
    navLisHide_handle() {
      this.navLisShow = false
    },
    ops() {
      alert(0)
    }
  },
};
</script>