<!--
 * @Author: your name
 * @Date: 2021-01-15 17:56:08
 * @LastEditTime: 2021-02-23 14:35:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\device-manage\personnel\index.vue
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
         <issuedStaffLIst v-if="isShow1"/>
         <issuedVisitorList v-if="isShow2"/>
    </el-tab-pane>
    <!-- <el-tab-pane label="其他" disabled>其他</el-tab-pane> -->
  </el-tabs>
</div>
</template>
<script>
import issuedStaffLIst from './issuedStaffLIst'
import issuedVisitorList from './issuedVisitorList'
  export default {
    components: {
      issuedStaffLIst,
      issuedVisitorList
    },
    data() {
      return {
        tabs: [
          {
            value: '已下发员工',
          },
          {
            value: '已下发访客',
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
         sessionStorage.setItem('issuePerson', val)
         val == 0 ? (this.isShow1 = true, this.isShow2 = false) : (this.isShow1 = false, this.isShow2 = true)
       }
    },
    created() {
      const tab = this.$route.query.tab
       if (tab) {
         this.activeName = tab
       }
    let getTabIndex = sessionStorage.getItem('issuePerson')
        this.activeName = getTabIndex
        this.$router.push(`${ this.$route.path }?tab=${ getTabIndex }`)
    },
    mounted() {
    }
  };
</script>
