<template>
  <!-- 柱状图 -->
  <div
    class="chart-original"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "445px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      // required: true,
    },
    yAxisName: {
      type: Array,
      default: ['QPS(次/秒)', '调用总量']
    },
    tooltipName: {
      // type: String,
    },
    titleName: {
      type: String,
      default: '日期'
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    },
    setOptions(expectedData) {
      console.log(this, '~~~')
      const { titleName, yAxisName } = this;
      this.chart.clear();
      this.chart.setOption({
        title: {
          text: titleName,
          left: "center",
          bottom: 0,
          textStyle: {
            fontSize: 14
          }
        },
        // toolbox: {
        //   show: false,
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross", // 默认为直线，可选为：'line' | 'shadow'
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["当天调用总量", "当天QPS峰值"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "QPS(次/秒)",
            min: 0,
            max: 250,
            interval: 50,
            axisTick: {
              show: true,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
              },
            },
            axisLabel: {
              // formatter: "{value} ml",
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "调用总量",
            min: 0,
            max: 25,
            interval: 5,
            axisTick: {
              show: true,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
              },
            },
            axisLabel: {
              // formatter: "{value} °C",
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "当天调用总量",
            itemStyle: {
              color: "#40a9ff",
              borderWidth: 5,
            },
            type: "bar",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
            barWidth: 45,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            // stack: "vistors",
          },
          {
            name: "当天QPS峰值",
            type: "line",
            itemStyle: {
              color: "#FA8C16",
            },
            yAxisIndex: 1,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
        ],
        grid: {
          left: 5,
          right: 15,
          bottom: 35,
          top: 65,
          containLabel: true,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-original {
  margin: 0 16px;
}
</style>