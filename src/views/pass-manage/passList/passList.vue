<!--
 * @Author: your name
 * @Date: 2021-05-24 17:09:12
 * @LastEditTime: 2021-05-28 15:44:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\sass-manage\sassList\sassList.vue
-->
<style lang="less" scoped>

</style>
<template>
    <div>
      <div class="sdc_doc">
          <h4>SDK文档</h4>
          <ul>
              <li v-for="(sdk, index) of sdks">
                  <span>{{ sdk.tit }}</span>
                  <div> 
                      <router-link :to="sdk.url"></router-link>
                  </div>
              </li>
          </ul>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sdks: {
                tit: '人脸识别闸机SDk',
                url: '/'
            }
        }
    }
}
</script>