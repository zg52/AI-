<!--
 * @Author: your name
 * @Date: 2021-01-15 17:56:08
 * @LastEditTime: 2021-03-17 10:46:13
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
         <allPersonRecords v-if="isShow0"/>
         <staffRecords v-if="isShow1"/>
         <visitorRecords v-if="isShow2"/>
         <strangerRecords v-if="isShow3"/>
         <blockListRecords v-if="isShow4"/>
    </el-tab-pane>
    <!-- <el-tab-pane label="其他" disabled>其他</el-tab-pane> -->
  </el-tabs>
</div>
</template>
<script>
import allPersonRecords from './allPersonRecords'
import staffRecords from './staffRecords'
import visitorRecords from './visitorRecords'
import strangerRecords from './strangerRecords'
import blockListRecords from './blockListRecords'

  export default {
    components: {
      allPersonRecords,
      staffRecords,
      visitorRecords,
      strangerRecords,
      blockListRecords
    },
    data() {
      return {
        tabs: [
          { value: '全部', },
          { value: '员工', },
          { value: '访客', },
          { value: '陌生人', },
          { value: '黑名单人员', }
        ],
        tabPosition: 'top',
        activeName: 0,
        
        isShow0: true,
        isShow1: false,
        isShow2: false,
        isShow3: false,
        isShow4: false
      };
    },
    watch: {
      activeName(val) {
         this.$router.push(`${ this.$route.path }?tab=${ val }`)
         sessionStorage.setItem('personRecords', val)
         if(val == 0) {
           this.isShow1 = false, this.isShow2 = false, this.isShow3 = false,this.isShow4 = false, this.isShow0 = true
         } else if(val == 1) {
           this.isShow0 = false,this.isShow2 = false, this.isShow3 = false,this.isShow4 = false, this.isShow1 = true
         } else if(val == 2) {
           this.isShow0 = false, this.isShow1 = false, this.isShow3 = false,this.isShow4 = false, this.isShow2 = true
         } else if(val == 3) {
           this.isShow0 = false, this.isShow1 = false, this.isShow2 = false,this.isShow4 = false, this.isShow3 = true
         } else {
           this.isShow0 = false, this.isShow1 = false, this.isShow2 = false, this.isShow3 = false, this.isShow4 = true
         }
       }
    },
    created() {
      const tab = this.$route.query.tab
       if (tab) {
         this.activeName = tab
       }
    let getTabIndex = sessionStorage.getItem('personRecords')
        this.activeName = getTabIndex
        this.$router.push(`${ this.$route.path }?tab=${ getTabIndex }`)
    },
    mounted() {
    }
  }
</script>
