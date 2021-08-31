<!--
 * @Author: ying
 * @Date: 2021-08-04 13:53:24
 * @LastEditTime: 2021-08-04 13:54:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\face-recognition\resource-manage\usage-details\usageDetails.vue
-->
<template>
  <div class="details_box app_container">
    <div class="box_style">
      <!-- title -->
      <div class="table_tit_txt">API使用详情-人脸检测</div>
      <!-- date-picker -->
      <div class="details_date_picker_box">
        <div class="details_date_picker_title">请选择数据日期范围</div>
        <a-range-picker @change="onChange" />
      </div>
      <!-- 调用次数 -->
      <div class="details_action_box">
        <div class="details_action_title details_action_title_b">
          当前调用次数
        </div>
        <div class="details_action_content details_action_title_b">10000</div>
        <div class="details_action_title details_action_title_s">
          剩余调用次数
        </div>
        <div class="details_action_content details_action_title_b">10000</div>
        <div class="details_action_title details_action_title_b">
          资源有效期
        </div>
        <div class="details_action_content details_action_title_s">10000</div>
      </div>
      <!-- chart -->
      <div class="chart-wrapper">
        <histogram-chart />
      </div>
    </div>
  </div>
</template>

<script>
import HistogramChart from "./components/HistogramChart";

export default {
  name: "usageDetails",
  components: {
    HistogramChart,
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
};
</script>

<style lang="scss" scoped>
.details_box {
  .details_date_picker_box {
    margin-top: 16px;
    display: flex;
    align-items: center;
    height: 32px;
    .details_date_picker_title {
      line-height: 32px;
      margin-right: 16px;
    }
    .ant-calendar-picker {
      width: 256px;
    }
  }
  .details_action_box {
    margin-top: 24px;
    display: flex;
    align-items: center;
    height: 54px;
    line-height: 54px;
    margin-bottom: 32px;
    .details_action_title {
      background: #fafafa;
      border: 1px solid #f0f0f0;
      text-indent: 24px;
    }
    .details_action_content {
      background: #fff;
      border: 1px solid #f0f0f0;
      text-indent: 24px;
    }
    .details_action_title_b {
      width: 219px;
    }
    .details_action_title_s {
      width: 145px;
    }
  }
  // chart
  .chart-wrapper {
    background: #fff;
    padding: 5px 16px;
    margin-bottom: 32px;
  }
}
</style>