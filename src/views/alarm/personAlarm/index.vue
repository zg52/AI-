<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-23 18:49:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
</style>
<template>
  <div class="app-container">
 <el-form :model="pagingQuery" :inline="true">
 <el-form-item label="姓名"><el-input class="w100" v-model.trim="pagingQuery.personName" clearable></el-input></el-form-item>
 <el-form-item label="选择设备名称">
         <el-select v-model="pagingQuery.deviceId" placeholder="请选择" filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
  <el-form-item label="告警类型"><el-select class="w140" v-model="pagingQuery.category" clearable><el-option v-for="(deviceCategory, index) of deviceCategorys" :key="index" :label="deviceCategory.name" :value="deviceCategory.id"></el-option></el-select></el-form-item>
  <!-- <el-form-item label="人员类型"><el-select class="w140" v-model="pagingQuery.personType" clearable><el-option v-for="(personType, index) of personTypes" :key="index" :label="personType.name" :value="personType.id"></el-option></el-select></el-form-item> -->
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
    <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span> </el-button>
     <el-button type="primary" @click.prevent="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
  </el-form>

  <el-table border :data="tableData" max-height="650" ref="multipleTable" v-loading="table_loading" element-loading-spinner="el-icon-loading">
    <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
    <el-table-column label="序列" :width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
    <el-table-column align="center" label="姓名" width="auto"><template v-slot="scope">{{ scope.row.personName }}</template></el-table-column>
    <el-table-column align="center" label="头像" width="auto"><template v-slot="scope">
       <img :src="`${ getImgUrl + scope.row.imageId}`" width="100%" />
      </template></el-table-column>
    <el-table-column align="center" label="设备名称" width="auto"><template v-slot="scope"> {{ scope.row.deviceId | getDeviceId_name }} </template> </el-table-column>
    <el-table-column align="center" label="设备标识" width="auto"><template v-slot="scope"> {{ scope.row.uniqueDeviceIdentifier }} </template> </el-table-column>
    <el-table-column align="center" label="告警类型" width="auto"><template v-slot="scope">{{ scope.row.category | filterCategory }}</template></el-table-column>
    <el-table-column align="center" label="告警时间" width="auto" sortable><template v-slot="scope"> {{ scope.row.createTime | filterDate }} </template></el-table-column>
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
import { getDeviceNames, getCategory, getPersonTypes } from '@/utils/business'
import { pickerOptions } from '@/utils'
import { imgUrl } from '@/api/public'
import moment from 'moment'

let vm,
    deviceCategory = [...getCategory()]
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
      getImgUrl: imgUrl(),
      tableData: [],
      personTypes: getPersonTypes.slice(0,2),
      pagingQuery: {
        personName: null,
        personType: null,
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
  filters: {
   getDeviceId_name(value) {
    let txt = null
      vm.getDeviceNames.map((item, index) => {
         item.id == value ? txt = item.name : null
      })
      return txt
  },
  filterCategory(value) {
    if(value === 'blocklist') {
      return '黑名单人员'
    } else {
      return '体温异常'
    }
  }
  },
  methods: {
    onSearch() {
      this.pagingQuery.current = 1
      this.getDeviceException()
    },
    getDeviceException() {
        let params = this.pagingQuery
       deviceException(this.pagingQuery).then((res) => {
        this.table_loading = true
        if(res.code === 0)  {
         this.table_loading = false
         this.tableData = []
            params.size = res.data.size
            params.current = res.data.current
            params.total = res.data.total
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
      this.getDeviceException()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getDeviceException()
    },

    changeDate() {
      let _this = this,
          date = _this.date
      date && date.length
        ? ((_this.pagingQuery.createTimeFrom = moment(date[0]).format("YYYY-MM-DD HH:mm")),
          (_this.pagingQuery.createTimeTo = moment(date[1]).format("YYYY-MM-DD HH:mm")))
        :  _this.pagingQuery.createTimeFrom = _this.pagingQuery.createTimeTo = null
    },
     refreshPagingQuery() {
      this.pagingQuery = {}
        this.onSearch()
    }
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