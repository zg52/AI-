<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-18 15:27:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
</style>
<template>
  <div class="app-container">

<el-form :model="pagingQuery" :inline="true">
<el-form-item label="选择设备名称">
        <el-select v-model="pagingQuery.deviceId" placeholder="请选择" filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
  <el-form-item label="告警类型"><el-select class="w140" v-model="pagingQuery.category" clearable><el-option v-for="(deviceCategory, index) of deviceCategorys" :key="index" :label="deviceCategory.name" :value="deviceCategory.id"></el-option></el-select></el-form-item>
    <el-form-item label="设备位置">
      <el-input v-model="pagingQuery.location" placeholder="输入设备位置"></el-input>
    </el-form-item>
    <el-form-item label="告警时间">
      <el-date-picker
        v-model="date"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="起止日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="changeDate">
      </el-date-picker>
    </el-form-item>
    <el-button type="success" @click="onSearch" class="search">
      <i class="el-icon-search"></i><span>查询</span>
    </el-button>
  </el-form>

  <el-table :data="tableData" max-height="650" ref="multipleTable" v-loading="table_loading" element-loading-spinner="el-icon-loading">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
    <el-table-column width="50" type="selection" fixed>
    </el-table-column>
     <el-table-column label="序列" :width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="姓名" width="auto"> <template v-slot="scope">{{ scope.row.name }}</template></el-table-column>
       <el-table-column align="center" label="头像" width="auto"> <template v-slot="scope">{{ scope.row.name }}</template></el-table-column>
    <el-table-column align="center" label="设备名称" width="auto">
      <template v-slot="scope"> {{ scope.row.deviceId | getDeviceId_name }} </template>
    </el-table-column>
    <el-table-column align="center" label="告警类型" width="auto"> <template v-slot="scope">{{ scope.row.category | filterCategory }}</template>
    </el-table-column>
    <el-table-column align="center" label="设备位置" width="auto">
      <template v-slot="scope">
        {{ scope.row.location }}
      </template>
    </el-table-column>
      <el-table-column align="center" label="告警时间" width="auto" sortable>
        <template v-slot="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagingQuery['current']"
      :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
      :page-size="pagingQuery['size']"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagingQuery['total']">
    </el-pagination> 

  </div>
</template>
<script>

import { deviceException } from '@/api/alarm'
import { getDeviceNames, getCategory } from '@/utils/business'
import { pickerOptions } from '@/utils'
import moment from 'moment'

let deviceCategory = [...getCategory()]
    deviceCategory = deviceCategory.slice(0, 2)

export default {
  name: 'device',
  data() {
    return {
      table_loading: false,
      getDeviceNames: [],
      checked: false,
      pickerOptions: pickerOptions(),
      deviceCategorys: deviceCategory,
      date: null,
      tableData: [],
      
      pagingQuery: {
        personType: 'employee',
        source: 'person',
        deviceId: null,
        category: null,
        createTimeFrom: null,
        createTimeTo: null,
        current: 1,
        size: 20,
        total: null,
      },
    };
  },
  filter: {
   getDeviceId_name(value) {
    let txt = null
      vm.getDeviceNames.map((item, index) => {
         item.id == value ? txt = item.name : null
      })
      return txt
  },
  filterCategory(value) {
    if(value === 'device_out_of_order') {
      return '设备故障'
    } else {
      return '设备升级失败'
    }
  }
  },
  methods: {
    onSearch() {
      this.pagingQuery.current = 1
     this.getDeviceException()
    },
    getDeviceException() {
       deviceException(this.pagingQuery).then((res) => {
        if(res.code === 0)  {
          this.tableData = []
          this.table_loading = false
          if(res.data.records.length !== 0) {
            this.tableData = res.data.records
          }
        } else {
          this.$message.error(res.msg)
          this.table_loading = false
        }
      })
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.onSearch()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.onSearch()
    },

    changeDate() {
      let _this = this,
          date = _this.date
      date && date.length
        ? ((_this.pagingQuery.createTimeFrom = moment(date[0]).format("YYYY-MM-DD HH:mm")),
          (_this.pagingQuery.createTimeTo = moment(date[1]).format("YYYY-MM-DD HH:mm")))
        :  _this.pagingQuery.createTimeFrom = _this.pagingQuery.createTimeTo = null
    },
  },
  created() {
      getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
   this.onSearch()
  }
}
</script>