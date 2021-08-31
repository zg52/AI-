<!--
 * @Author: ying
 * @Date: 2021-08-03 18:02:21
 * @LastEditTime: 2021-08-19 15:34:26
 * @LastEditors: Please set LastEditors
 * @Description: In Resource List
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\face-recognition\resource-manage\resource-list\components\resourceModule.vue
-->
<template>
  <div class="resource_module box_sm_style">
    <div class="resource_title table_tit_txt">
      {{ resourceData.resourceGroup }}
    </div>
    <div class="resource_table">
      <a-table
        class="table_sty"
        :columns="columns"
        :data-source="resourceData.resourceLimitList"
        :pagination="pagination"
      >
        <span slot="action" slot-scope="text" href="javascript:;">
          <a href="javascript:;" @click="goToRenew(text)">立即续费</a>
          <a style="margin-left: 10px" href="javascript:;" @click="goToDetail"
            >使用详情</a
          >
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "接口名称",
    dataIndex: "resourceName",
    key: "resourceName",
    width: "15%",
  },
  {
    title: "状态",
    dataIndex: "openState",
    key: "openState",
    width: "25%",
  },
  {
    title: "调用量剩余",
    dataIndex: "limitQuantity",
    key: "limitQuantity",
    width: "25%",
  },
  {
    title: "QPS限制",
    dataIndex: "limitQps",
    key: "limitQps",
    width: "15%",
  },
  {
    title: "操作",
    dataIndex: "",
    key: "x",
    scopedSlots: { customRender: "action" },
    width: "20%",
  },
];

const data = [
  {
    key: 1,
    name: "John Brown",
    status: "已开通",
    remaining: "无限制",
    qps: "100",
  },
];

export default {
  name: "ResourceModule",
  props: {
    resourceData: {
      require: true,
      type: Object,
    },
  },
  data() {
    return {
      data,
      columns,
      pagination: false,
    };
  },
  methods: {
    goToDetail() {
      this.$router.push("/face-recognition/usageDetails");
    },
    goToRenew(value) {
      const { resourceId } = value;
      this.$router.push({
        path: "/face-recognition/resourcePay",
        query: {
          resourceId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.resource_module {
  .resource_table {
    padding: 15px 0 0px;
  }
}
</style>