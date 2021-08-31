<!--
 * @Author: ying
 * @Date: 2021-08-05 13:53:24
 * @LastEditTime: 2021-08-24 15:41:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\face-recognition\resource-manage\resource-pay\resourcePay.vue
-->
<template>
  <div class="app_container">
    <div class="pay_step">
      <a-steps :current="stepValue" size="small">
        <a-step title="填写订单" />
        <a-step title="确认订单" />
        <a-step title="支付订单" />
        <a-step title="购买成功" />
      </a-steps>
    </div>
    <div class="pay_box box_style" v-if="stepValue == 0">
      <div class="pay_tit_txt">计费方式：</div>
      <div class="pay_type_radio">
        <a-radio-group
          v-model="typeRadioValue"
          button-style="solid"
          @change="handleToChangeTypeRadioValue"
        >
          <a-radio-button value="2">调用量计费</a-radio-button>
          <a-radio-button value="1">QPS计费</a-radio-button>
        </a-radio-group>
      </div>
      <div class="pay_type_content_box">
        <div v-if="typeRadioValue == '2'">
          <a-form :form="form" layout="vertical" class="pay_type_form">
            <a-form-item label="选择接口：">
              <a-select
                v-decorator="['baseService']"
                placeholder="请选择服务"
                style="width: 208px; margin-right: 24px"
              >
                <a-select-option
                  @click="changeBaseService"
                  v-for="(item, index) in billingForResourceData.selectObj
                    .baseList"
                  :value="item.key"
                  :key="index"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
              <a-select
                v-decorator="['baseService2']"
                style="width: 208px"
                placeholder="请选择服务"
              >
                <a-select-option
                  @click="changeBaseService2"
                  v-for="(item, index) in billingForResourceData.selectObj
                    .currentList"
                  :value="item.resourceId"
                  :key="index"
                >
                  {{ item.resourceName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="服务列表：">
              <a-table
                class="table_sty"
                :columns="columnsQPS"
                :data-source="billingForResourceData.billingInformationList"
                :pagination="pagination"
                :row-selection="rowSelection"
              >
                <span
                  slot="purchaseQuantity"
                  slot-scope="text, resource, index"
                >
                  <a-input-number
                    v-model="
                      billingForResourceData.billingInformationList[index][
                        'purchaseQuantity'
                      ]
                    "
                    :min="0"
                    :max="10"
                    @change="onChange"
                  />
                </span>
              </a-table>
            </a-form-item>
            <a-form-item label="购买费用：">
              <span>{{ totalPrice | rmbSymbol }}</span>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                icon="shopping-cart"
                @click="handleSubmit"
              >
                添加到购物车
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <div v-else-if="typeRadioValue == '1'">
          <div class="pay_tit_txt">购买方式：</div>
          <div class="pay_type_radio">
            <a-radio-group v-model="typeRadioValueByType" button-style="solid" @change="changePurchaseType">
              <a-radio-button value="1">按天购买</a-radio-button>
              <a-radio-button value="2">按月购买</a-radio-button>
            </a-radio-group>
          </div>
          <div v-if="typeRadioValueByType == '1'">
            <a-form
              :form="form2"
              layout="vertical"
              style="margin-top: 21px"
              class="pay_type_form"
            >
              <a-form-item label="选择接口：">
                <a-select
                  v-decorator="['baseService']"
                  placeholder="请选择服务"
                  style="width: 208px; margin-right: 24px"
                >
                  <a-select-option
                    @click="changeBaseServiceQPS"
                    v-for="(item, index) in billingForQPSResourceData.selectObj
                      .baseList"
                    :value="item.key"
                    :key="index"
                  >
                    {{ item.value }}
                  </a-select-option>
                </a-select>
                <a-select
                  v-decorator="['baseService2']"
                  style="width: 208px"
                  placeholder="请选择服务"
                >
                  <a-select-option
                    @click="changeBaseService2QPS"
                    v-for="(item, index) in billingForQPSResourceData.selectObj
                      .currentList"
                    :value="item.resourceId"
                    :key="index"
                  >
                    {{ item.resourceName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="服务单价：">
                <a-table
                  class="table_sty"
                  :columns="columnsDay"
                  :data-source="billingForQPSResourceData.billingInformationList"
                  :pagination="pagination"
                >
                </a-table>
              </a-form-item>
              <a-form-item label="购买天数：">
                <a-input-number
                  v-decorator="['qpsDayNumber']"
                  :min="0"
                />
              </a-form-item>
              <a-form-item label="起始日期：">
                <a-date-picker v-decorator="['qpsDayStatDate']" />
              </a-form-item>
              <a-form-item label="购买数量（QPS）：">
                <a-input-number
                  v-decorator="['qpsDayBuyNumber']"
                  :min="0"
                />
              </a-form-item>
              <a-form-item label="购买费用：">
                <span>{{ totalPrice | rmbSymbol }}</span>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  icon="shopping-cart"
                  @click="handleSubmitQPSDay"
                >
                  添加到购物车
                </a-button>
              </a-form-item>
            </a-form>
          </div>
          <div v-else>
            <a-form
              :form="form3"
              layout="vertical"
              style="margin-top: 21px"
              class="pay_type_form"
            >
              <a-form-item label="选择接口：">
                <a-select
                  v-decorator="['baseService']"
                  placeholder="请选择服务"
                  style="width: 208px; margin-right: 24px"
                >
                  <a-select-option
                    @click="changeBaseServiceQPSForMonth"
                    v-for="(item, index) in billingForQPSResourceData.selectObj
                      .baseList"
                    :value="item.key"
                    :key="index"
                  >
                    {{ item.value }}
                  </a-select-option>
                </a-select>
                <a-select
                  v-decorator="['baseService2']"
                  style="width: 208px"
                  placeholder="请选择服务"
                >
                  <a-select-option
                    @click="changeBaseService2QPS"
                    v-for="(item, index) in billingForQPSResourceData.selectObj
                      .currentList"
                    :value="item.resourceId"
                    :key="index"
                  >
                    {{ item.resourceName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="服务单价：">
                <a-table
                  class="table_sty"
                  :columns="columnsDay"
                  :data-source="billingForQPSResourceData.billingInformationList"
                  :pagination="pagination"
                >
                </a-table>
              </a-form-item>
              <a-form-item label="购买月数：">
                <a-input-number
                  v-decorator="['qpsMonthNumber']"
                  :min="0"
                />
              </a-form-item>
              <a-form-item label="起始日期：">
                <a-date-picker v-decorator="['qpsMonthStatDate']" />
              </a-form-item>
              <a-form-item label="购买数量（QPS）：">
                <a-input-number
                  v-decorator="['qpsMonthBuyNumber']"
                  :min="0"
                />
              </a-form-item>
              <a-form-item label="购买费用：">
                <span>{{ totalPrice | rmbSymbol }}</span>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  icon="shopping-cart"
                  @click="handleSubmitQPSMonth"
                >
                  添加到购物车
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <div class="pay_box box_style" v-else-if="stepValue == 1">
      <div class="pay_confirm_order">
        <a-table
          class="table_sty"
          :columns="columnsConfirmOrder"
          :data-source="shoppingList"
          :pagination="pagination"
        >
          <span slot="price" slot-scope="text">
            <span>￥{{ text }}</span>
          </span>
          <span slot="orderAmount" slot-scope="text">
            <span>￥{{ text }}</span>
          </span>
        </a-table>
        <div class="pay_confirm_money">
          <div class="product_money">
            <span>产品金额：</span>
            <span>￥{{ totalPrice }}</span>
          </div>
          <div class="product_discount">
            <span>折扣金额：</span>
            <span>-￥0.00</span>
          </div>
          <div class="product_actual">
            <span>折扣金额：</span>
            <span>￥{{totalPrice}}</span>
          </div>
        </div>
        <div class="pay_confirm_protocol">
          <span>《辨识云线上订购协议》</span>
        </div>
        <div class="pay_confirm_action">
          <div class="action_inner">
            <div class="back">返回修改</div>
            <a-button type="danger" @click="goToSubmitOrder">确认订单</a-button>
          </div>
        </div>
      </div>
    </div>
    <div class="pay_box box_style" v-else-if="stepValue == 2">
      <div class="pay_order">
        <!-- 订单支付 -->
        <a-alert
          message="您的订单已提交，请支付。"
          :closable="true"
          type="success"
          show-icon
        />
        <div class="table_tit_txt pay_order_title">订单详情</div>
        <a-table
          class="table_sty"
          :columns="columnsPayOrder"
          :data-source="shoppingList"
          :pagination="pagination"
        >
        </a-table>
        <div class="pay_confirm_money">
          <div class="product_money">
            <span>产品金额：</span>
            <span>￥{{ totalPrice }}</span>
          </div>
          <div class="product_discount">
            <span>折扣金额：</span>
            <span>-￥0.00</span>
          </div>
          <div class="product_actual">
            <span>折扣金额：</span>
            <span>￥{{ totalPrice }}</span>
          </div>
        </div>
        <div class="pay_type">
          <div class="table_tit_txt pay_type_title">支付方式</div>
          <a-radio-group v-model="payTypeValue" class="pay_type_radio">
            <img src="@/assets/image/wechatpay.png" />
            <a-radio :value="1">微信支付</a-radio>
            <img src="@/assets/image/alipay.png" />
            <a-radio :value="2">支付宝支付</a-radio>
          </a-radio-group>
          <div class="pay_type_action">
            <div class="pay_type_action_inner">
              <span class="back">返回订单列表</span>
              <span class="cancel">取消订单</span>
              <a-button type="danger" @click="goToPay"> 立即支付 </a-button>
            </div>
          </div>
        </div>
        <!-- <div class="pay_confirm_action">
          <div class="action_inner">
            <div class="back">返回修改</div>
            <a-button type="danger" @click="goToSubmitOrder">确认订单</a-button>
          </div>
        </div> -->
      </div>
    </div>
    <div class="pay_box box_style" v-else-if="stepValue == 3">
      <div class="pay_result">
        <a-result status="success" title="您已成功购买并开通服务！">
          <template #extra>
            <a-button key="console" type="primary">返回资源列表</a-button>
            <a-button key="buy">再次购买</a-button>
            <a-button key="see">查看订单列表</a-button>
          </template>
        </a-result>
        <a-divider>订单信息</a-divider>
        <pay-info></pay-info>
        <div class="table_tit_txt pay_result_info">订单详情</div>
        <a-table
          class="table_sty"
          :columns="columnsConfirmOrder"
          :data-source="dataConfirmOrder"
          :pagination="pagination"
        >
        <span slot="price" slot-scope="text">
          <span>￥{{ text }}</span>
        </span>
        </a-table>
        <div class="pay_confirm_money">
          <div class="product_money">
            <span>产品金额：</span>
            <span>￥6800.00</span>
          </div>
          <div class="product_discount">
            <span>折扣金额：</span>
            <span>-￥0.00</span>
          </div>
          <div class="product_actual">
            <span>折扣金额：</span>
            <span>￥6800.00</span>
          </div>
        </div>
      </div>
    </div>
    <a-drawer
      class="pay_drawer"
      placement="right"
      :closable="true"
      :visible="drawerVisible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <div slot="title">
        <span>购物车</span>
        <span class="drawer_title">共{{ drawerTitle }}项</span>
      </div>
      <div class="cart_item_fa">
        <div
          class="cart_item"
          v-for="(item, index) in shoppingList"
          :key="index"
        >
          <div class="cart_item_title">
            <span>{{ item.titleName }}</span>
            <span class="clear" @click="clearShoppingList(index)">清除</span>
          </div>
          <div class="cart_item_option">
            <span class="cart_item_option_left">购买规格</span>
            <span class="cart_item_option_right"
              >{{ item.quantity / 10000 }}万次</span
            >
          </div>
          <div class="cart_item_option">
            <span class="cart_item_option_left">购买数量</span>
            <span class="cart_item_option_right"
              >{{ item.purchaseQuantity }}个</span
            >
          </div>
          <div class="cart_item_option">
            <span class="cart_item_option_left">购买费用</span>
            <span class="cart_item_option_right"
              >￥ {{ item.price * item.purchaseQuantity }}</span
            >
          </div>
        </div>
      </div>
      <div class="cart_bottom">
        <span class="cart_bottom_total">总计：{{ totalPrice }}元</span>
        <a-button type="primary" @click="goToSettlement">去结算</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
import PayInfo from "./components/payInfo.vue";
import {
  billingForResourcePurchasesAndCalls,
  resourcePurchaseQpsBilling,
  resourceCallVolumeBillingInformation,
  resourceQpsChargingInformation,
  placeOrder,
  orderPayment
} from "@/api/face-recognition/resource-manage";

const columnsQPS = [
  {
    title: "资源包",
    dataIndex: "unitPriceName",
    key: "unitPriceName",
  },
  {
    title: "价格（元）",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "购买数量",
    dataIndex: "purchaseQuantity",
    key: "purchaseQuantity",
    scopedSlots: { customRender: "purchaseQuantity" },
  },
];

const columnsDay = [
  {
    title: "QPS数量",
    dataIndex: "qpsNumbers",
    key: "qpsNumbers",
  },
  {
    title: "0<n≤10",
    dataIndex: "from0to10",
    key: "from0to10",
  },
  {
    title: "10<n≤50",
    dataIndex: "from10to50",
    key: "from10to50",
  },
  {
    title: "50<n≤100",
    dataIndex: "from50to100",
    key: "from50to100",
  },
  {
    title: "100<n",
    dataIndex: "from100",
    key: "from100",
  },
];

const columnsConfirmOrder = [
  {
    title: "产品类型",
    dataIndex: "chargePlanIdTitle",
    key: "chargePlanIdTitle",
  },
  {
    title: "产品名称",
    dataIndex: "titleName",
    key: "titleName",
  },
  {
    title: "产品规格",
    dataIndex: "unitPriceName",
    key: "unitPriceName",
  },
  {
    title: "产品数量",
    dataIndex: "purchaseQuantity",
    key: "purchaseQuantity",
  },
  {
    title: "购买时长",
    dataIndex: "purchaseTime",
    key: "purchaseTime",
  },
  {
    title: "单价",
    dataIndex: "price",
    key: "price",
    scopedSlots: { customRender: "price" },
  },
  {
    title: "计费方式",
    dataIndex: "billingMethod",
    key: "billingMethod",
  },
  {
    title: "订单金额",
    dataIndex: "orderAmount",
    key: "orderAmount",
    scopedSlots: { customRender: "orderAmount" },
  },
];

const columnsPayOrder = [
  {
    title: "订单号",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "产品类型",
    dataIndex: "chargePlanIdTitle",
    key: "chargePlanIdTitle",
  },
  {
    title: "产品名称",
    dataIndex: "titleName",
    key: "titleName",
  },
  {
    title: "产品规格",
    dataIndex: "unitPriceName",
    key: "unitPriceName",
  },
  {
    title: "产品数量",
    dataIndex: "purchaseQuantity",
    key: "purchaseQuantity",
  },
  {
    title: "购买时长",
    dataIndex: "purchaseTime",
    key: "purchaseTime",
  },
  {
    title: "单价",
    dataIndex: "price",
    key: "price",
    scopedSlots: { customRender: "price" },
  },
  {
    title: "计费方式",
    dataIndex: "billingMethod",
    key: "billingMethod",
  },
  {
    title: "订单金额",
    dataIndex: "orderAmount",
    key: "orderAmount",
    scopedSlots: { customRender: "orderAmount" },
  },
];

export default {
  data() {
    return {
      shoppingList: [],
      payTypeValue: 1,
      stepValue: 0,
      drawerVisible: false,
      billingForResourceData: {
        selectObj: {
          baseList: [],
          specificList: [],
          currentList: null,
        },
      },
      billingForQPSResourceData: {
        selectObj: {
          baseList: [],
          specificList: [],
          currentList: null,
        },
      },
      qpsResource: {
        resourceId: '',
        purchaseType: ''
      },
      dataConfirmOrder: [
        {
          key: 1,
          productType: "按QPS计费",
          productName: "人脸检测",
          productSpecification: "期限：2021.07.01-2021.07.08",
          productCounts: "20QPS",
          purchaseTime: "10天",
          unitPrice: "￥150",
          billingMethod: "按月",
          orderAmount: "￥2500",
        },
      ],
      columnsQPS,
      columnsDay,
      columnsConfirmOrder,
      columnsPayOrder,
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
      pagination: false,
      typeRadioValue: "2",
      typeRadioValueByType: "1",
      orderNumber: ''
    };
  },
  components: {
    PayInfo,
  },
  watch: {},
  filters: {
    rmbSymbol(value) {
      return `￥${value}`;
    },
  },
  computed: {
    drawerTitle() {
      let { selectedRows } = this;
      let length = selectedRows.length;
      return length;
    },
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
          // console.log("selectedRowKeys changed: ", selectedRowKeys);
          this.selectedRowKeys = selectedRowKeys;
        },
        onSelect: (record, selected, selectedRows) => {
          // console.log(record, selected, selectedRows);
          this.selectedRows = selectedRows;
          this.selectedRows.forEach((item) => {
            item.titleName = this.form.getFieldsValue([
              "baseService2",
            ]).baseService2;
            item.chargePlanIdTitle = '按计量购买'
            item.chargePlanId = +this.typeRadioValue;
            item.startTime = new Date().getTime();
            item.endTime = new Date().getTime();
            item.purchaseTime = '--';
            item.billingMethod = '--';
            item.orderAmount = item.price * item.purchaseQuantity;
          });
          this.shoppingList = this.selectedRows;
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          // console.log(selected, selectedRows, changeRows);
          this.selectedRows = selectedRows;
          this.selectedRows.forEach((item) => {
            item.titleName = this.form.getFieldsValue([
              "baseService2",
            ]).baseService2;
            item.chargePlanIdTitle = '按计量购买'
            item.chargePlanId = +this.typeRadioValue;
            item.startTime = new Date().getTime();
            item.endTime = new Date().getTime();
            item.purchaseTime = '--';
            item.billingMethod = '--';
            item.orderAmount = item.price * item.purchaseQuantity;
          });
          this.shoppingList = this.selectedRows;
        },
      };
    },
    totalPrice() {
      let { selectedRows } = this;
      let total = 0;
      if (selectedRows.length != 0) {
        for (let i = 0; i < selectedRows.length; i++) {
          let selectedRow = selectedRows[i];
          let nowPrice = selectedRow.price * selectedRow.purchaseQuantity;
          total += nowPrice;
        }
        return total;
      }
      return total;
    },
  },
  methods: {
    // 修改购买方式 天 月
    async changePurchaseType(e) {
      if (e.target.value == '1') {
        this.qpsResource.purchaseType = 1;
        this.$nextTick(() => {
          this.form2.setFieldsValue({
            baseService:
              this.billingForQPSResourceData.selectObj.baseList[0]["value"],
            baseService2:
              this.billingForQPSResourceData.selectObj.currentList[0][
                "resourceName"
              ],
            qpsDayNumber: 1,
            qpsDayBuyNumber: 1
          });
        });
      } else {
        this.qpsResource.purchaseType = 2;
        this.$nextTick(() => {
          this.form3.setFieldsValue({
            baseService:
              this.billingForQPSResourceData.selectObj.baseList[0]["value"],
            baseService2:
              this.billingForQPSResourceData.selectObj.currentList[0][
                "resourceName"
              ],
            qpsMonthNumber: 1,
            qpsMonthBuyNumber: 1
          });
        });
      }
      await this.getResourceQpsChargingInformation(this.qpsResource.resourceId, this.qpsResource.purchaseType)
    },
    clearShoppingList(index) {
      this.shoppingList.splice(index, 1);
    },
    // select
    async changeBaseService(e) {
      let { key } = e;
      this.billingForResourceData.selectObj.currentList =
      this.billingForResourceData.selectObj.specificList[key];
      this.$nextTick(() => {
        this.form.setFieldsValue({
          baseService2:
            this.billingForResourceData.selectObj.currentList[0][
              "resourceName"
            ],
        });
      });
      let id =
        this.billingForResourceData.selectObj.currentList[0]["resourceId"];
      await this.getResourceCallVolumeBillingInformation(id);
    },
    async changeBaseService2(e) {
      this.getResourceCallVolumeBillingInformation(e.key);
    },
    // qps select
    async changeBaseServiceQPS(e) {
      let { key } = e;
      this.billingForQPSResourceData.selectObj.currentList =
      this.billingForQPSResourceData.selectObj.specificList[key];
      this.$nextTick(() => {
        this.form2.setFieldsValue({
          baseService2:
            this.billingForQPSResourceData.selectObj.currentList[0][
              "resourceName"
            ],
        });
      });
      this.qpsResource.resourceId = this.billingForQPSResourceData.selectObj.currentList[0]["resourceId"];
      await this.getResourceQpsChargingInformation(this.qpsResource.resourceId, this.qpsResource.purchaseType);
    },
    async changeBaseService2QPS(e) {
      this.qpsResource.resourceId = e.key;
      await this.getResourceQpsChargingInformation(this.qpsResource.resourceId, this.qpsResource.purchaseType);
    },
    // qps select for month
    async changeBaseServiceQPSForMonth(e) {
      let { key } = e;
      this.billingForQPSResourceData.selectObj.currentList =
      this.billingForQPSResourceData.selectObj.specificList[key];
      this.$nextTick(() => {
        this.form3.setFieldsValue({
          baseService2:
            this.billingForQPSResourceData.selectObj.currentList[0][
              "resourceName"
            ],
        });
      });
      this.qpsResource.resourceId = this.billingForQPSResourceData.selectObj.currentList[0]["resourceId"];
      await this.getResourceQpsChargingInformation(this.qpsResource.resourceId, this.qpsResource.purchaseType);
    },
    async handleToChangeTypeRadioValue(e) {
      if (e.target.value == "2") {
        await this.getBillingForResourcePurchasesAndCalls();
      } else {
        await this.getResourcePurchaseQpsBilling();
      }
    },
    // 获取调用量计费信息接口
    async getResourceCallVolumeBillingInformation(data) {
      let res;
      try {
        res = await resourceCallVolumeBillingInformation(data);
      } catch (e) {
        console.log(e);
      }
      console.log(res);
      if (res.code == 0) {
        res.data.forEach((item, index) => {
          item.purchaseQuantity = 1;
          item.key = index;
        });
        this.billingForResourceData.billingInformationList = res.data;
      }
    },
    // 获取调用量计费信息接口qps
    async getResourceQpsChargingInformation(id, type) {
      let res;
      try {
        res = await resourceQpsChargingInformation(id, type);
      } catch (e) {
        console.log(e);
      }
      console.log(res);
      if (res.code == 0) {
        let billingInformationListNew = {
          qpsNumbers: type == 1 ? '单价（元/天/QPS）' : '单价（元/月/QPS）',
        };
        res.data.forEach((item, index) => {
          if (index == 0) {
            billingInformationListNew.from0to10 = item.price
          } else if (index == 1) {
            billingInformationListNew.from10to50 = item.price
          } else if (index == 2) {
            billingInformationListNew.from50to100 = item.price
          } else if (index == 3) {
            billingInformationListNew.from100 = item.price
          }
        })
        this.billingForQPSResourceData.billingInformationList = [billingInformationListNew]
      }
    },
    // 获取计费方式信息
    async getBillingForResourcePurchasesAndCalls() {
      let res;
      try {
        res = await billingForResourcePurchasesAndCalls({
          resourceId: this.$route.query.resourceId,
          serviceId: 1,
        });
      } catch (e) {
        console.log(e);
      }
      if (res.code == 0) {
        res.data.billingInformationList.forEach((item, index) => {
          item.purchaseQuantity = 1;
          item.key = index;
        });
        res.data.selectObj = {
          baseList: [],
          specificList: [],
          currentList: null,
        };
        res.data.labelServiceResourceList.forEach((item, index) => {
          res.data.selectObj.baseList.push({
            value: item.labelName,
            key: index,
          });
          res.data.selectObj.specificList.push(item.resourceList);
        });
        res.data.selectObj.currentList = res.data.selectObj.specificList[0];
        this.billingForResourceData = res.data;
        console.log(res.data);
        this.$nextTick(() => {
          this.form.setFieldsValue({
            baseService:
              this.billingForResourceData.selectObj.baseList[0]["value"],
            baseService2:
              this.billingForResourceData.selectObj.currentList[0][
                "resourceName"
              ],
          });
        });
      }
    },
    // 获取QPS计费方式信息
    async getResourcePurchaseQpsBilling() {
      let res;
      try {
        res = await resourcePurchaseQpsBilling({
          resourceId: this.$route.query.resourceId,
          serviceId: 1,
        });
      } catch (e) {
        console.log(e);
      }
      console.log(res);
      if (res.code == 0) {
        res.data.selectObj = {
          baseList: [],
          specificList: [],
          currentList: null,
        };
        res.data.labelServiceResourceList.forEach((item, index) => {
          res.data.selectObj.baseList.push({
            value: item.labelName,
            key: index,
          });
          res.data.selectObj.specificList.push(item.resourceList);
        });
        res.data.selectObj.currentList = res.data.selectObj.specificList[0];
        let billingInformationListNew = {
          qpsNumbers: '单价（元/天/QPS）',
        };
        res.data.billingInformationList.forEach((item, index) => {
          if (index == 0) {
            billingInformationListNew.from0to10 = item.price
          } else if (index == 1) {
            billingInformationListNew.from10to50 = item.price
          } else if (index == 2) {
            billingInformationListNew.from50to100 = item.price
          } else if (index == 3) {
            billingInformationListNew.from100 = item.price
          }
        })
        res.data.billingInformationList = [billingInformationListNew];
        this.qpsResource.resourceId = res.data.selectObj.currentList[0].resourceId;
        this.billingForQPSResourceData = res.data;
        this.qpsResource.purchaseType = 1;
        
        this.$nextTick(() => {
          this.form2.setFieldsValue({
            baseService:
              this.billingForQPSResourceData.selectObj.baseList[0]["value"],
            baseService2:
              this.billingForQPSResourceData.selectObj.currentList[0][
                "resourceName"
              ],
            qpsDayNumber: 1,
            qpsDayBuyNumber: 1
          });
        });
      }
    },
    // 支付
    async orderPaymentService() {
      let res;
      try {
        res = await orderPayment({
          orderNumber: this.orderNumber,
          paymentMethod: this.payTypeValue
        });
      } catch (e) {
        console.log(e);
      }
      console.log(res);
      if (res.code == 0) {

      }
    },
    async goToPay() {
      await this.orderPaymentService()
      // const modal = Modal.info();
      // modal.update({
      //   title: "付款完成前不要关闭页面",
      //   content: "请在页面完成付款，如付款遇到问题请致电：4008-777-xxx",
      //   okText: "已付款",
      //   onOk: () => {
      //     this.stepValue = 3;
      //   },
      // });
    },
    async goToSubmitOrder() {
      // 提交订单
      let data = JSON.parse(JSON.stringify(this.shoppingList));
      data.forEach(item => {
        item.quantity = item.purchaseQuantity;
        item.serviceId = '1';
      })
      let newData = {
        orderDetailList: data,
        "userId": "admin",
        "whetherReceipt": 0
      }
      let res;
      try {
        res = await placeOrder(newData);
      } catch (e) {
        console.log(e);
      }
      console.log(res);
      if (res.code == 0) {
        this.stepValue = 2;
        this.orderNumber = res.data;
        this.shoppingList.forEach(item => {
          item.orderNumber = res.data;
        })
      }
    },
    goToSettlement() {
      // 结算
      this.stepValue = 1;
      this.drawerVisible = false;
      console.log(this.shoppingList)
    },
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    onClose() {
      this.drawerVisible = false;
    },
    onChange(e) {
      console.log("changed", e);
    },
    handleSubmit(e) {
      // https://www.cnblogs.com/dafei4/p/13424918.html
      // console.log(
      //   "xxxxx",
      //   this.form.getForm("validate_other").getFieldsValue()
      // );
      // console.log("xxxx", this.selectedRowKeys, this.selectedRows);
      let selectRes = this.form.getForm("validate_other").getFieldsValue();
      let checkSelect = true;
      Object.keys(selectRes).forEach((select) => {
        if (selectRes[select] == undefined) {
          checkSelect = false;
        }
      });
      if (!this.selectedRowKeys.length || !checkSelect) {
        this.$message.warning("请添加服务以及数量！");
      } else {
        this.drawerVisible = true;
      }
      //   e.preventDefault();
      //   this.form.validateFields((err, values) => {
      //     if (!err) {
      //       console.log('Received values of form: ', values);
      //     }
      //   });
    },
    handleSubmitQPSDay(e) {},
    handleSubmitQPSMonth(e) {},
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "validate_other" });
    this.form2 = this.$form.createForm(this, { name: "validate_qps_day" });
    this.form3 = this.$form.createForm(this, { name: "validate_qps_month" });
  },
  async mounted() {
    // 进入页面后获取计费方式等信息
    await this.getBillingForResourcePurchasesAndCalls();
  },
};
</script>

<style lang="scss" scoped>
.pay_step {
  position: fixed;
  height: 60px;
  top: 120px;
  background: #fff;
  width: 100%;
  margin: 0 -20px;
  z-index: 100;

  .ant-steps {
    width: 400px;
    position: absolute;
    right: 230px;
    bottom: 24px;
  }
}

.pay_box {
  // position: fixed;
  // top: 140px;
  margin-top: 60px;
  .pay_tit_txt {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
  .pay_type_radio {
    margin-top: 8px;
    .ant-radio-button-wrapper {
      height: 40px;
      line-height: 40px;
    }
  }
  .pay_type_content_box {
    margin-top: 28px;
    ::v-deep .ant-form {
      .ant-form-item {
        .ant-form-item-label {
          .ant-form-item-required {
            &::before {
              display: none;
            }
          }
        }
      }
    }
  }

  // confirm
  .pay_confirm_order {
    overflow: hidden;
    .pay_confirm_money {
      float: right;
      .product_money,
      .product_discount,
      .product_actual {
        font-size: 14px;
        line-height: 25px;
      }
      .product_money {
        margin-top: 25px;
      }
    }
    .pay_confirm_protocol {
      margin-top: 100px;
      span {
        margin-top: 29px;
        height: 14px;
        float: right;
        font-size: 14px;
        color: #1890ff;
        margin-right: -5px;
      }
    }
    .pay_confirm_action {
      float: right;
      width: 100%;
      margin-top: 20px;
      .action_inner {
        width: 160px;
        float: right;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .back {
          color: #1890ff;
          font-size: 14px;
        }
      }
    }
  }
  // order
  .pay_order {
    overflow: hidden;
    .pay_order_title {
      margin-top: 24px;
      margin-bottom: 24px;
    }
    .pay_confirm_money {
      float: right;
      .product_money,
      .product_discount,
      .product_actual {
        font-size: 14px;
        line-height: 25px;
      }
      .product_money {
        margin-top: 25px;
      }
    }
    .pay_type {
      margin-top: 165px;
      position: relative;
      height: 120px;

      ::v-deep .ant-radio-group {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        .ant-radio-wrapper {
          margin-right: 40px;
        }
      }

      .pay_type_action {
        position: absolute;
        bottom: 0px;
        right: 0px;
        .pay_type_action_inner {
          display: flex;
          align-items: center;
          width: 300px;
          justify-content: space-between;
          .back {
            color: #1890ff;
            cursor: pointer;
          }
          .cancel {
            color: #bcbcbc;
            cursor: pointer;
          }
        }
      }
    }
  }
  // result
  .pay_result {
    ::v-deep .ant-result {
      padding-top: 10px;
      padding-bottom: 20px;
      .ant-divider {
        &::before,
        &::after {
          transform: translateY(0%);
        }
      }
    }
  }
  .pay_result_info {
    margin-top: 5px;
    margin-bottom: 24px;
  }
  overflow: hidden;
  .pay_confirm_money {
    float: right;
    .product_money,
    .product_discount,
    .product_actual {
      font-size: 14px;
      line-height: 25px;
    }
    .product_money {
      margin-top: 25px;
    }
  }
}

.pay_drawer {
  ::v-deep .ant-drawer-mask {
    background: rgba(256, 256, 256, 0) !important;
  }
  ::v-deep .ant-drawer-content-wrapper {
    width: 270px !important;
    position: absolute;
    top: 180px;
    right: 0px;
    .ant-drawer-content {
      background: #fafafa;
      .ant-drawer-body {
        padding: 0 !important;
        .cart_item_fa {
          height: 680px;
          overflow-y: auto;
          .cart_item {
            width: 270px;
            height: 160px;
            background: #fff;
            margin-top: 24px;
            padding: 24px 16px;
            .cart_item_title {
              font-size: 14px;
              color: #000;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              .clear {
                height: 21px;
                line-height: 21px;
                color: #1890ff;
                font-size: 12px;
                margin-left: 75px;
                cursor: pointer;
              }
            }
            .cart_item_option {
              margin-bottom: 5px;
              font-size: 13px;
              .cart_item_option_left {
                color: #a7a3a3;
                margin-right: 24px;
              }
              .cart_item_option_right {
                color: #000;
              }
            }
          }
        }

        .cart_bottom {
          position: absolute;
          height: 52px;
          bottom: 180px;
          width: 100%;
          border-top: 1px solid #e8e8e8;
          left: 0;
          right: 0;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .cart_bottom_total {
            font-size: 16px;
            color: #faad14;
          }
        }
      }
    }
    .ant-drawer-title {
      .drawer_title {
        margin-left: 10px;
        color: #a7a3a3;
      }
    }
  }
}
</style>