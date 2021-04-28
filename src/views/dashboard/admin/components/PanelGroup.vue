<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-03-22 15:59:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\views\dashboard\admin\components\PanelGroup.vue
-->

<style lang="scss" scoped>
.panel-group {
  margin-top: 5px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
.card-panel-icon2 {color: red;}
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #8a16ff;
        .card-panel-icon1 {color: #fff;}
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: red;
      }

      .icon-shopping {
        background: red;
        .card-panel-icon2 {color: #fff;}
      }
    }

    .icon-people {
      color: #40c9c6;
    }
    .card-panel-icon1 {
      color: #8a16ff;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: red;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
    margin-left: 6px;
    position: absolute;
    left: 48%;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.offline {
  color: #ffba00;
}
.offlineBox:hover {
 .offline {
   color: #fff;
 }
 .icon-offline {
  background: #ffba00;
}
}
.icon-face_swiping {
  .face_swipingNum {
    color:#13ce66;
    font-size: 54px!important;
  }
  :hover {
    .card-panel-icon-wrapper {
    background: #13ce66;
    .face_swipingNum {
    color: #fff;
    }
    }
  }
}
</style>
<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col">
     <router-link to="/traffic-records/index?tab=1">
        <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon card-panel-icon1" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
           今日进门人数
          </div>
          <count-to :start-val="1000" :end-val="in_a_few" :duration="2600" class="card-panel-num" />
        </div>
      </div>
     </router-link>
    </el-col>
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col">
     <router-link to="/people-manage/visitor-manage/visitor-list/visitorlist">
        <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日访客预约
          </div>
          <count-to :start-val="500" :end-val="reservation_number" :duration="3000" class="card-panel-num" />
        </div>
      </div>
     </router-link>
    </el-col>
     <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col icon-face_swiping">
      <router-link to="/traffic-records/index?tab=1">
         <div class="card-panel">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="face_swipingNum" class-name="card-panel-icon face_swipingNum" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日刷脸人数
          </div>
          <count-to :start-val="600" :end-val="faceNum" :duration="3600" class="card-panel-num" />
        </div>
      </div>
      </router-link>
    </el-col>
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col offlineBox">
     <router-link to="/device-manage/deviceList">
        <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-offline">
          <svg-icon icon-class="device" class-name="card-panel-icon offline" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日离线设备
          </div>
          <count-to :start-val="50" :end-val="offline_device" :duration="3200" class="card-panel-num" />
        </div>
      </div>
     </router-link>
    </el-col>
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col">
     <router-link to="/alarm/deviceAlarm">
        <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="device" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日故障设备
          </div>
          <count-to :start-val="50" :end-val="temperature_number" :duration="3200" class="card-panel-num" />
        </div>
      </div>
     </router-link>
    </el-col>
    <el-col :md="8" :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <router-link to="/alarm/personAlarm">
         <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="peoples" class-name="card-panel-icon card-panel-icon2" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日体温异常
          </div>
          <count-to :start-val="400" :end-val="temperature_number" :duration="3600" class="card-panel-num" />
        </div>
      </div>
      </router-link>
    </el-col>
  </el-row>
</template>
<script>
import CountTo from 'vue-count-to'
import { in_a_few, reservation_number, faceNum, offline_device, failure_device, temperature_number } from '@/api/dashboard' 

export default {
  components: {
    CountTo
  },
  data() {
    return {
      in_a_few: 0,
      reservation_number: 0,
      faceNum: 0,
      offline_device: 0,
      failure_device: 0,
      temperature_number: 0
    }
  },
  methods: {
  onSearch() {
    in_a_few().then((res) => { this.in_a_few = res }),
    reservation_number().then((res) => { this.reservation_number = res }),
    faceNum().then((res) => { this.faceNum = res }),
    offline_device().then((res) => { this.offline_device = res }),
    failure_device().then((res) => { this.failure_device = res })
    temperature_number().then((res) => { this.temperature_number = res })
  },
  },
  created() {
    this.onSearch()

// 每30分刷新
  setInterval(() => {
      this.onSearch()
      },(1000 * 60) * 30)
  }
}
</script>