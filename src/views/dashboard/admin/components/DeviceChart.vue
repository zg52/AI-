<template>
    <div :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { bas } from '@/api/dashboard' 
import moment from 'moment'
import { getSystemTime } from '@/utils'
const animationDuration = 6000
let vm

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
      online: [],
      offline: [],
      fault: [],
      xValue: []
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

  this.chart.setOption({
    title: {
        text: '设备在线/离线/故障实时监控',
        textStyle: {
          color: '#8a16ff',
          fontSize: 14
        }
    },
    textStyle: {
      color: '#8a16ff'
    },
    color:['#8a16ff','#b572f9', '#dec9f3'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['在线', '离线', '故障']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {
              show: true, 
              readOnly: false,
               emphasis: {
                 iconStyle: {
                   borderColor: '#8a16ff'
                 }
               }
               },
            magicType: {
              show: true,
             type: ['line', 'bar', 'red'],
              emphasis: {
                 iconStyle: {
                   borderColor: '#8a16ff'
                 }
               }
             },
            restore: {
              show: true,
               emphasis: {
                 iconStyle: {
                   borderColor: '#8a16ff'
                 }
               }
            },
            saveAsImage: {
              show: true,
               emphasis: {
                 iconStyle: {
                   borderColor: '#8a16ff'
                 }
               }
            }
        },
        iconStyle: {
          borderColor:'#d1a9fb',
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            name: '日期',
            data: this.xValue,
            axisLine: {
            lineStyle: {
            color: '#8a16ff' ,
            }
        },
        axisPointer: {
              show: true,
            }
       },
      
    ],
    yAxis: [
        {
            type: 'value',
            name: '数量',
            minInterval: 1,
            axisLine: {
            lineStyle: {
            color: '#8a16ff' ,
            }
       },
        }
    ],
    series: [
        {
            name: '在线',
            type: 'bar',
            data: this.online,
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ]
            // }
        },
        {
            name: '离线',
            type: 'bar',
            data: this.offline,
        },
        {
            name: '故障',
            type: 'bar',
            data: this.fault,
        }
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
    let date = moment(new Date()).format('YYYY-MM-DD')
    let timer = null
    bas(date).then((res) => {
      if(res.hasOwnProperty('dates')) {
        if(Array.isArray(res.dates)) {
          if(res.dates.length !== 0) {
            this.xValue = res.dates.map((item, index) => {
              if(index !== 0 && index !== 1) { return item.substr(5) }
              else if(index === 1) {
                return '昨天'
              } else {
              let time = new Date(),
                  hour = checkTime(time.getHours()),
                 minite = checkTime(time.getMinutes())
              function checkTime(i){
               if(i<10) return "0"+i
               return i
            }
           return `现在 ( ${ hour+":"+minite} )`
              }
               })

           this.online = res.onlineCounts,
           this.offline = res.offlineCounts,
           this.fault = res.outOfOrderCounts

            this.initChart()
          }
        }
      }
    })
  },
  getTime() {}
  },
  created() {
    vm = this
     
  },
  mounted() {
  this.$nextTick(() => {
  this.initChart()
  this.onSearch()
  setInterval(() => {
     this.onSearch()
     xuanfu()
      },60_000)

xuanfu()
function xuanfu() {
    setTimeout(() => {
      vm.chart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0 ,
      dataIndex: 0,
      });
   },1000)
}
  })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
}
</script>
