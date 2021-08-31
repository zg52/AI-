<!--
 * @Author: your name
 * @Date: 2021-08-12 20:37:47
 * @LastEditTime: 2021-08-12 21:07:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \workspace\hjimi2\facecloudwebsite\src\views\face-recognition\resource-manage\resource-pay\components\payInfo.vue
-->
<template>
  <div>
    <div class="table_tit_txt">订单信息</div>
    <div class="pay_info_box">
      <div class="item">
        <span>订单号：</span>
        <span class="item_content">eacsidejdiejdiejdiejdiejdiejdiejd</span>
      </div>
      <div class="item">
        <span>产品名称：</span>
        <span class="item_content">人脸识别、人脸检测</span>
      </div>
      <div class="item">
        <span>订单状态：</span>
        <span class="item_content">已支付</span>
      </div>
      <div class="item">
        <span>创建时间：</span>
        <span class="item_content">2021-6-29 15:36:59</span>
      </div>
      <div class="item">
        <span>支付时间：</span>
        <span class="item_content">2021-6-29 15:36:59</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayInfo'
}
</script>

<style lang="scss" scoped>
.pay_info_box {
  margin-top: 29px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .item {
    width: 380px;
    margin-right: 90px;
    font-size: 15px;
    height: 22px;
    line-height: 22px;
    margin-bottom: 15px;
    .item_content {
      margin-left: 36px;
      color: #000;
    }
  }
}
</style>
