<template>
    <div :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { inDoorWay } from '@/api/dashboard'
import moment from 'moment'
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
     face_swiping: [],
     swiping_card: [],
     qr_code: [],
     fingerprint: []
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

  this.chart.setOption({
    color: ['#6EA5FF', '#F75B77', '#71D088', '#FFBC6E'],
    title: {
        text: '近30天进门人数实时监控',
        textStyle: {
          fontSize: 14
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        },
    },
    legend: {
        data: ['刷脸', '刷卡', '二维码', '指纹']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
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
                  //  borderColor: '#8a16ff'
                 }
               }
               },
            magicType: {
              show: true,
             type: ['line', 'bar', 'red'],
              emphasis: {
                 iconStyle: {
                  //  borderColor: '#8a16ff'
                 }
               }
             },
            restore: {
              show: true,
               emphasis: {
                 iconStyle: {
                  //  borderColor: '#8a16ff'
                 }
               }
            },
            saveAsImage: {
              show: true,
               emphasis: {
                 iconStyle: {
                  //  borderColor: '#8a16ff'
                 }
               }
            }
        },
        iconStyle: {
          // borderColor:'#d1a9fb',
        }
    },
    xAxis: [
        {
            type: 'category',
            name: '日期',
            boundaryGap: false,
            data: this.xValue,
            axisPointer: {
              show: true,
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '数量',
            minInterval: 1,
        }
    ],
    series: [
        {
            name: '刷脸',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#6EA5FF'
                }, {
                    offset: 1,
                    color: '#6EA5FF'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: this.face_swiping
        },
        {
            name: '刷卡',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#F75B77'
                }, {
                    offset: 1,
                    color: '#F75B77'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: this.swiping_card
        },
        {
            name: '二维码',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#71D088'
                }, {
                    offset: 1,
                    color: '#71D088'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: this.qr_code
        },
        {
            name: '指纹',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FFBC6E'
                }, {
                    offset: 1,
                    color: '#FFBC6E'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: this.fingerprint
        }
    ],
      grid: {
              left: '0%',
              right: '3%',
              bottom: '8%',
              top:'25%',
              containLabel: true
            },
  }
  )
    },
 onSearch() {
   let date = moment(new Date()).format('YYYY-MM-DD')
    inDoorWay(date).then((res) => {
      if(res.hasOwnProperty('dates')) {
        if(Array.isArray(res.dates)) {
          if(res.dates.length !== 0) {
            this.xValue = res.dates.map((item, index) => {
              if(index === 0) { return item = '今日' }
               return item.substr(5) 
               })
            this.face_swiping = res.counts
              this.initChart()
          }
        }
      }
    })
  }
  },
  created() {
   let num = 29
   this.swiping_card = this.qr_code = this.fingerprint =  Array.from({ length: num }).map(() => 0 )
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      this.onSearch()
      setInterval(() => {
         this.onSearch()
      },(1000 * 60) * 30)
    })

  setTimeout(() => {
    this.chart.dispatchAction({
    type: 'showTip',
    seriesIndex:0 ,
    dataIndex: 0,
    });
  },1000)
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