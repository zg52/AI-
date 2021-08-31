<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      required: true
		},
		barData: {
      type: Array,
      required: true
    },
    barTitle: {
      type: String,
      required: true
    },
    barDataArr: {
      type: Array,
      required: true
    },
    barHoverValue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
	},
	watch: {
    barData: {
      deep: true,
      handler(val) {
        this.setOptions(val, this.barTitle, this.barDataArr, this.barHoverValue)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
			// 初始化
			this.chart = echarts.init(this.$el, 'macarons')
			// 设置参数
			this.setOptions(this.barData, this.barTitle, this.barDataArr, this.barHoverValue)
		},
		setOptions(barData, barTitle, barDataArr, barHoverValue) {
			this.chart.setOption({
        title: {
					text: barTitle,
					left: 'center',
					top: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '10%',
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: barDataArr,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [
					{
						name: barHoverValue,
						type: 'bar',
						stack: 'vistors',
						barWidth: '60%',
						data: barData,
						animationDuration
					}
				]
      })
		}
  }
}
</script>