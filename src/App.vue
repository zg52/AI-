<!--
 * @Author: long
 * @Date: 2021-04-23 11:47:42
 * @LastEditTime: 2021-08-05 09:37:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\App.vue
-->
<template>
<a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
moment.locale("zh-cn");
export default {
  name: 'App',
  data() {
    return {
      zh_CN,
    };
  },
}
</script>
