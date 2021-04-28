<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-04-23 11:44:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>

</style>
<template>
  <div class="app-container">
    <el-form :model="pagingQuery" :inline="true">
    <el-form-item  label="操作人"><el-input v-model="pagingQuery.name" class="w100" clearable></el-input></el-form-item>
     <el-form-item label="选择设备名称">
        <el-select v-model="pagingQuery.deviceId" placeholder="请选择" filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="操作类型">
        <el-select v-model="pagingQuery.operationType" class="w150" placeholder="请选择" filterable clearable>
         <el-option v-for="(operation, index) of getOperations" :key="index" :label="operation.name" :value="operation.id"></el-option>
        </el-select>
      </el-form-item>
       <!-- <el-form-item label="操作结果">
        <el-select class="w150" v-model="pagingQuery.operationType" placeholder="请选择" filterable clearable>
         <el-option v-for="(operation, index) of getOperations" :key="index" :label="operation.name" :value="operation.id"></el-option>
        </el-select>
      </el-form-item> -->
    <el-form-item label="操作时间">
      <el-date-picker
        v-model="date"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="操作时间"
        end-placeholder="结束时间"
        :picker-options="pickerOptions"
        @change="changeDate">
      </el-date-picker>
    </el-form-item>
      <el-button type="success" @click="onSearch" class="search">
        <i class="el-icon-search"></i><span>查询</span></el-button>
    </el-form>

    <el-table :data="tableData" v-loading="table_loading" element-loading-spinner="el-icon-loading"  border max-height="650">
        <el-table-column width="50" type="selection" fixed></el-table-column>
        <el-table-column label="序列" :width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
        <el-table-column align="center" label="操作人"><template v-slot="scope">{{ scope.row.operator }}</template></el-table-column>
         <el-table-column align="center" label="设备名称"><template v-slot="scope">{{ scope.row.deviceId | getDeviceId_name }}</template></el-table-column>
        <el-table-column align="center" label="设备标识"><template v-slot="scope">{{ scope.row.uniqueDeviceIdentifier }}</template></el-table-column>
        <!-- <el-table-column align="center" label="设备位置"> <template v-slot="scope"> {{ scope.row.location }} </template> </el-table-column> -->
        <el-table-column align="center" label="操作类型"> <template v-slot="scope"> {{ scope.row.operationType }} </template> </el-table-column>
        <el-table-column align="center" label="操作结果"><template v-slot="scope">{{ scope.row.result == 'success' ? '成功' : '失败'}}</template></el-table-column>
      <el-table-column align="center" label="操作时间"><template v-slot="scope"> {{ scope.row.createTime | filterDate }} </template> </el-table-column>
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

import { logList } from'@/api/system-manage/ulog'
import { getDeviceNames, getDevice_handle_list } from '@/utils/business'
import { pickerOptions } from '@/utils'
import moment from 'moment'
let vm

export default {
  name: 'ulog',
  data() {
    return {
      table_loading: true,
      getDeviceNames: [],
      getOperations: getDevice_handle_list(),
      pickerOptions: pickerOptions(),
      date: null,
      props: { multiple: true },
      tableData: [],
      filter: {
       getDeviceId_name(value) {
        let txt = null
          vm.getDeviceNames.map((item, index) => {
             item.id == value ? txt = item.name : null
          })
          return txt
      },
      },

     pagingQuery: {
      operator: null,
      operationType: null,
      deviceId: null,
      createTimeFrom: null,
      createTimeTo: null,
      location: null,
      name: null,

      current: 1,
      size: 200,
      total: null,
      },
    }
  },
  filters: {
   getDeviceId_name(value) {
    let txt = null
      vm.getDeviceNames.map((item, index) => {
         item.id == value ? txt = item.name : null
      })
      return txt
  }
  },
  methods: {
    onSearch() {
      this.pagingQuery.current = 1
     this.getLogs()
    },
    getLogs() {
      let params = this.pagingQuery
       logList(this.pagingQuery).then((res) => {
        if(res.code === 0)  {
          this.tableData = []
          this.table_loading = false
           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total
          if(res.data.records.length !== 0) {
            this.tableData = res.data.records.reverse()
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
    vm = this
  getDeviceNames().then((res) => {
    this.getDeviceNames = res
    })
   this.onSearch()
  }
}
</script>
