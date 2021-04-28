<!--
 * @Author: your name
 * @Date: 2021-01-21 10:35:12
 * @LastEditTime: 2021-03-23 17:41:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\views\dashboard\admin\components\Visitor.vue
-->
<template>
    <div :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { devicePersonNum } from '@/api/dashboard' 

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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      xValue: [],
      yValue: []
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
 
  this.chart.setOption({
    title: {
        text: '设备通行人数排行',
        textStyle: {
          color: '#FC7D02',
          fontSize: 14
        }
    },
    color:['#FC7D02'],
    textStyle: {
      color: '#FC7D02'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['人数']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
        toolbox: {
        show: true,
        feature: {
            dataView: {
              show: true, 
              readOnly: false,
               emphasis: {
                 iconStyle: {
                   borderColor: '#FC7D02'
                 }
               }
               },
            magicType: {
              show: true,
             type: ['line', 'bar', 'red'],
              emphasis: {
                 iconStyle: {
                   borderColor: '#FC7D02'
                 }
               }
             },
            restore: {
              show: true,
               emphasis: {
                 iconStyle: {
                   borderColor: '#FC7D02'
                 }
               }
            },
            saveAsImage: {
              show: true,
               emphasis: {
                 iconStyle: {
                   borderColor: '#FC7D02'
                 }
               }
            }
        },
        iconStyle: {
          borderColor:'#fc7d027a',
        }
    },
    xAxis: {
        type: 'value',
         name: '数量',
        boundaryGap: [0, 0.01],
          axisLine: {
            lineStyle: {
            color: '#FC7D02' ,
            }
       },
    },
    yAxis: {
        type: 'category',
         name: '设备名称',
        data: this.yValue,
            axisLine: {
            lineStyle: {
            color: '#FC7D02' ,
            }
       },
    },
    series: [
        {
            name: '人数',
            type: 'bar',
            data: this.xValue,
            barWidth: '58%',
        },
    ],
     grid: {
                left: '0%',
                right: '6%',
                bottom: '8%',
                top:'25%',
                containLabel: true
            },
}
)
    },
  onSearch() {
    devicePersonNum().then((res) => {
      if(res.hasOwnProperty('deviceNames')) {
        if(Array.isArray(res.deviceNames)) {
          if(res.deviceNames.length !== 0) {
            console.log(res.deviceNames)
            this.yValue = res.deviceNames
            this.xValue = res.counts
              this.initChart()
          }
        }
      }
    })
  }
  },
  created() {
    this.onSearch()
   setInterval(() => {
      this.onSearch()
      },(1000 * 60) * 30)
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
}
</script>
