<!--
 * @Author: ying
 * @Date: 2021-07-29 13:53:24
 * @LastEditTime: 2021-08-10 16:25:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\face-recognition\resource-manage\resource-list\resourceList.vue
-->
<template>
  <div class="app_container">
    <resource-module
      v-for="(item, index) in resourceData"
      :key="index"
      :resourceData="item"
    ></resource-module>
  </div>
</template>

<script>
import resourceModule from "./components/resourceModule";
import { listServiceResourceList } from "@/api/face-recognition/resource-manage";

export default {
  data() {
    return {
      resourceData: [],
    };
  },
  components: {
    resourceModule,
  },
  methods: {
    async getListServiceResourceList() {
      let res;
      try {
        res = await listServiceResourceList();
      } catch (e) {
        console.log(e);
      }
      console.log(res)
      if (res.code == 0) {
        this.resourceData = res.data;
      }
    },
  },
  async mounted() {
    await this.getListServiceResourceList();
  },
};
</script>
