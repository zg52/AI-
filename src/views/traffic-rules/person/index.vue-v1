<!--
 * @Author: your name
 * @Date: 2021-01-19 17:06:12
 * @LastEditTime: 2021-03-04 14:09:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\views\traffic-rules\person\index.vue
-->
<style scoped>
.app-container {
  padding-top:10px;
}
</style>
<template>
<div class="app-container">
  <el-tabs v-model="activeName" :tab-position="tabPosition">
      <el-tab-pane v-for="(tab, index) of tabs" :label="tab.value" :key="index">
         <staffRule v-if="isShow1"/>
         <visitorRule v-if="isShow2"/>
    </el-tab-pane>
    <!-- <el-tab-pane label="其他" disabled>其他</el-tab-pane> -->
  </el-tabs>
</div>
</template>
<script>
import staffRule from './staffRule'
import visitorRule from './visitorRule';
  export default {
    components: {
      staffRule,
      visitorRule
    },
    data() {
      return {
        tabs: [
          {
            value: '可通行员工',
          },
          {
            value: '可通行访客',
          }
        ],
        tabPosition: 'top',
        activeName: 0,
        isShow1: true,
        isShow2: false
      };
    },
    watch: {
      activeName(val) {
         this.$router.push(`${ this.$route.path }?tab=${ val }`)
         sessionStorage.setItem('trafficPerson', val)
         val == 0 ? (this.isShow1 = true, this.isShow2 = false) : (this.isShow1 = false, this.isShow2 = true)
       }
    },
    created() {
      const tab = this.$route.query.tab
       if (tab) {
         this.activeName = tab
       }
    let getTabIndex = sessionStorage.getItem('trafficPerson')
        this.activeName = getTabIndex
        this.$router.push(`${ this.$route.path }?tab=${ getTabIndex }`)
    },
    mounted() {

    }
  };
</script>

