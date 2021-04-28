<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-04-14 10:56:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
// 详情
 .demo-table-expand {
    width: 1100px;
  }
 
  .demo-table-expand .el-form-item {
  margin-right: 0!important;
    margin-bottom: 0;
    width: 20%;
  }
  .demo-table-expand ::v-deep .el-form-item__label {
      padding-right: 0;
        font-weight: normal;
      .el-form-item__content {
    font-size: 12px!important;
        }
    }
</style>
<template>
  <div class="app-container1">
    <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="姓名"><el-input class="w100" v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
      <el-form-item label="通行设备">
        <el-select v-model="pagingQuery.deviceId" placeholder="请选择" filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="通行规则名称"><el-select v-model="pagingQuery.ruleName" placeholder="请选择" filterable clearable>
         <el-option v-for="(ruleName, index) of getRuleNames" :key="index" :label="ruleName.name" :value="ruleName.name"></el-option>
       </el-select></el-form-item> -->
      <el-form-item label="通行方向"><el-select v-model="pagingQuery.direction" placeholder="请选择" filterable clearable>
         <el-option v-for="(direction, index) of getDirections" :key="index" :label="direction.value" :value="direction.id"></el-option>
       </el-select></el-form-item>
      <el-form-item label="通行结果"><el-select v-model="pagingQuery.result" placeholder="请选择" filterable clearable>
         <el-option v-for="(result, index) of getTrafficResult" :key="index" :label="result.value" :value="result.id"></el-option>
       </el-select></el-form-item>
      <el-form-item label="门禁卡号"><el-input v-model.trim="pagingQuery.gateCardId" clearable></el-input></el-form-item>
      <el-form-item label="IC卡号"><el-input v-model.trim="pagingQuery.icCardId" clearable></el-input></el-form-item>
       <el-form-item label="身份证号"><el-input class="w200" v-model.trim="pagingQuery.idNum" clearable></el-input></el-form-item>
       <el-form-item label="通行时间">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="记录开始时间"
          end-placeholder="记录截止时间"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate"
          clearable
          >
        </el-date-picker>
      </el-form-item>
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
    </el-form>
    
    <el-table :data="painingQueryList" border class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="姓名" width="100"><template v-slot="scope">{{ scope.row.personName }}</template></el-table-column>
      <el-table-column align="center" label="已抓拍人脸" width="95" class="ppp"> 
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageId}`" width="100%" /></template>
      </el-table-column>
      <el-table-column align="center" label="通行设备" width="200"><template v-slot="scope"> {{ scope.row.deviceId | getDeviceId_name }} </template></el-table-column>
      <el-table-column align="center" label="设备标识" width="174"><template v-slot="scope"> {{ scope.row.uniqueDeviceIdentifier }} </template></el-table-column>
      <el-table-column align="center" label="通行结果" width="110"><template v-slot="scope"><span :class="scope.row.result !== 'success' ? 'red' : 'green'">{{ scope.row.result | trafficRersultFilter(scope.row) }}</span> <br>
      <span v-show="scope.row.result !== 'success'" class="red"><i v-if="scope.row.reason ? true : false">（{{ scope.row.reason }}）</i></span></template></el-table-column>
      <el-table-column align="center" label="体温" width="90"> <template v-slot="scope"><span :class="scope.row.temperature >= 37.5 ? 'red' : ''">{{ scope.row.temperature }}℃</span></template></el-table-column>
      <el-table-column align="center" label="身份证号" width="170"> <template v-slot="scope"> {{ scope.row.idNum }}</template></el-table-column>
      <el-table-column align="center" label="门禁卡" width="170"> <template v-slot="scope"> {{ scope.row.gateCardId }}</template></el-table-column>
      <el-table-column align="center" label="IC卡" width="170"> <template v-slot="scope"> {{ scope.row.icCardId }}</template></el-table-column>
      <el-table-column align="center" label="通行方向" width="90"> <template v-slot="scope"> {{ scope.row.direction | trafficDirectionFilter }}</template></el-table-column>
      <!-- <el-table-column align="center" label="通行规则" width="190"> <template v-slot="scope"> {{ scope.row.deviceId | getDeviceId_name }} </template></el-table-column> -->
      <el-table-column align="center" label="通行方式" width="180"><template v-slot="scope">{{ scope.row.verificationMode | verificationModes_handle }}</template></el-table-column>
      <el-table-column align="center" label="通行时间" width="160" fixed="right"> <template v-slot="scope"> {{ scope.row.accessTime | filterDate}} </template></el-table-column>
    </el-table>

    <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingQuery['current']"
         :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
         :page-size="pagingQuery['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingQuery['total']"
    ></el-pagination>
  </div>
</template>
<script>

import { getDirection, getTrafficResult, getDeviceNames, getStaff_name_id } from '@/utils/business'
import { trafficRecords } from '@/api/traffic-records'
import { pickerOptions } from '@/utils'
import { imgUrl } from '@/api/public'
import moment from 'moment'

let vm

export default {
  name: 'staffRecords',
  data() {
    return {
      date: null,
      table_loading: true,
      pickerOptions: pickerOptions(),
      getDeviceNames: [],
      getStaff_name_id: [],
      // getRuleNames: [],
      getDirections: getDirection(),
      getTrafficResult: getTrafficResult(),
      getImgUrl: imgUrl(),
      multipleSelection: [],
      
      pagingQuery: {
        name: null,
        deviceId: null,
        ruleName: null,
        direction: null,
        result: null,
        createTimeFrom: null,
        createTimeTo: null,
        gateCardId: null,
        icCardId: null,
        idNum: null,
        personType: 'employee',

        current: 1,
        size: 100,
        total: null,
      },
      painingQueryList: [],
    }
  },
  filters: {
   getDeviceId_name(value) {
    let txt = null
      vm.getDeviceNames.map((item, index) => {
         item.id == value ? txt = item.name : null
      })
      return txt
  },
  // getRuleId_name(value) {
  //   let txt = null
  //     vm.getRuleNames.map((item, index) => {
  //        item.id == value ? txt = item.name : null
  //     })
  //     return txt
  // },
  },
  methods: {
    onSearch(){
      this.pagingQuery.current = 1
      this.get_trafficRecordsList()
    },
    get_trafficRecordsList() {
      this.table_loading = true
      let params = this.pagingQuery
      trafficRecords(this.pagingQuery).then((res) => {
         if(res.code === 0) {
           this.painingQueryList = []
           this.table_loading = false
           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total
           this.painingQueryList = res.data.records
         } else {
            this.$message.error(res.msg)
            this.table_loading = false
         }
      })
    },
   changeDate() {
    let _p = this.pagingQuery
      this.date && this.date.length
        ? ((_p.createTimeFrom = moment( this.date[0]).format("YYYY-MM-DD HH:mm:ss")),
          (_p.createTimeTo = moment( this.date[1]).format("YYYY-MM-DD HH:mm:ss")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.get_trafficRecordsList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.get_trafficRecordsList()
    },
    handleSelectionChange(val) {
     this.multipleSelection = val
    },
    refreshPagingQuery() {
      this.pagingQuery = {}
      this.date = null
      this.onSearch()
    }
  },
  created() {
    vm = this
   getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
    getStaff_name_id().then(res => this.getStaff_name_id = res)
  //  getRuleNames().then((res) => {
  //      this.getRuleNames = res
  //   })
    this.onSearch()
    setInterval(() => {
      this.onSearch()
    },360_0000)
  },
  mounted() {
    console.log(this.getStaff_name_id)
  },
}
</script>