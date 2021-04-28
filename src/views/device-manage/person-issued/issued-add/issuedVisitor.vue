<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-04-09 16:16:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
   .app-container1 {
       padding-top: 6px;
   }
</style>
<template>
  <div class="app-container1">
    <div class="lis_tit"><i></i> <span>选择设备</span></div>
    <DeviceNames @getDeviceIds="getDeviceIds1"/>
    <div class="lis_tit"><i></i> <span>选择要下发的访客</span></div>
      <el-form :model="pagingQuery" :inline="true" ref="pagingQuery">
      <el-form-item label="访客姓名"><el-input class="w100" v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
      <el-form-item label="性别："><el-select class="w100" v-model="pagingQuery.gender" clearable><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
       <el-form-item label="被访人姓名"><el-input class="w100" v-model.trim="pagingQuery.intervieweeName" clearable></el-input></el-form-item>
       <el-form-item label="来访事由"><el-input v-model.trim="pagingQuery.reason" clearable></el-input></el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate3"
          clearable
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下发状态："><el-select class="w100" v-model.trim="pagingQuery.gender" disabled><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
      <el-form-item label="来访日期">
        <el-date-picker
          v-model="date1"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="来访日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions1"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate1">
        </el-date-picker>
      </el-form-item>

      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
       <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
       <router-link to="/device-manage/person-issued/issued-list/issuedList?tab=1" class="ml10"><el-button type="primary"><i class="el-icon-view"></i> 已下发访客</el-button></router-link>
       <el-button class="ml10" type="primary" :disabled="table_loading" @click="handleIssuedPerson"><svg-icon icon-class="guide" />  一键下发</el-button>
    </el-form>
    
    <el-table :data="tableData" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" :element-loading-text="loadingTip1" element-loading-spinner="el-icon-loading" ref="multipleTable" border>
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column width="50" type="selection" fixed ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="访客姓名" width="80"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="已注册人脸" width="95">
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageId}`" width="100%" /></template>
      </el-table-column>
     <el-table-column align="center" label="性别" width="50"><template v-slot="scope"> {{ scope.row.gender | filterGenter }} </template></el-table-column>
      <el-table-column align="center" label="被访人姓名" width="100"> <template v-slot="scope"> {{ scope.row.intervieweeName }} </template></el-table-column>
      <!-- <el-table-column align="center" label="下发状态" width="160"><template v-slot="scope">{{ scope.row.status == 0 ? '已下发' : '未下发' }}</template> </el-table-column> -->
       <el-table-column align="center" label="来访时间"><template v-slot="scope">{{ scope.row.visitStartTime }} ~ {{ scope.row.visitEndTime }}</template></el-table-column>
      <el-table-column align="center" label="来访事由"><template v-slot="scope">{{ scope.row.reason }}</template></el-table-column>
      <el-table-column align="center" label="创建时间"><template v-slot="scope">{{ scope.row.createTime | filterDate }}</template></el-table-column>
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
import DeviceNames from '@/components/Business/DeviceNames'
import { getDeviceNames, getGender } from '@/utils/business'
import { visitorList } from '@/api/people-manage/visitorManage'
import { imgUrl } from '@/api/public'
import { pickerOptions } from '@/utils'
import { issuedVisitor } from '@/api/person-issued'
import moment from 'moment'

let vm

export default {
  name: 'issuedStaff',
  components: {
    DeviceNames
  },
  data() {
    return {
      getDeviceNames: [],
      deviceIds: null,
      pickerOptions: pickerOptions(),
      pickerOptions1: pickerOptions(true),
      date: null,
      date1: null,
      multipleSelection: [],
      getImgUrl: imgUrl(),
      genders: getGender(),
      value: '华捷艾米',
      table_loading: true,
      loadingTip1: null,

      pagingQuery: {
        name: null,
        gender: null,
        intervieweeName: null,
        reason: null,
        createTimeFrom: null, //初始查询默认参数，必填
        createTimeTo: null, //初始查询默认参数，必填
        status: 'auth',
        
        current: 1, 
        size: 20,
        total: null,
      },
      tableData: [],
    }
  },
  methods: {
    getDeviceIds1(deviceIds) {
    this.deviceIds = deviceIds
    },
     getVisitorList() {
      let [params, filterData,isDeleteNum] = [this.pagingQuery, [], []]
      this.table_loading = true
      visitorList(this.pagingQuery).then((res) => {
        this.tableData = []
        params.size = res.data.size
        params.current = res.data.current
        params.total = res.data.total
         res.data.records.map((item, index) => {
           if(item.isDelete != 1) {
              filterData.push(item)
              this.tableData = filterData.reverse()
           } else {
             isDeleteNum.push(item.isDelete)
           }
         })
        this.table_loading = false
      
//  转换state为Boolean
        let satatusArr = []
        this.tableData.map((x, index) => {
          satatusArr.push({
            status: x.status == 1 ? false : true
          })
        })
        this.status = satatusArr
      })
    },
    onSearch() {
      let params = this.pagingQuery
      params.current = 1
      this.getVisitorList()
    },
    handleIssuedPerson() {
      let _this = this
     return Array.isArray(this.deviceIds) && this.deviceIds !== null ? HandleIssued() : this.$message.warning('请先选择设备！')
     function HandleIssued() {
      if (_this.multipleSelection.length !== 0) {
          _this.$confirm("此操作将下发已选访客至设备, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          _this.table_loading = true
          _this.loadingTip1 = '正在下发中'
          let personIds = []
          for (let i = 0; i < _this.multipleSelection.length; i++) {
            personIds.push(_this.multipleSelection[i].id)
          }
          if(personIds.length !== 0) {
             issuedVisitor(_this.deviceIds, personIds).then((res) => {
                if (res.code == 0) {
                  _this.table_loading = true
                  _this.loadingTip1 = null
                  _this.onSearch()
                  _this.$message.success(res.msg +' 可在已下发人员页面查看', 4000)
                } else {
                   _this.$message.warning(res.msg, 4000)
                   _this.table_loading = false
                   _this.loadingTip1 = null
                    _this.$refs.multipleTable.clearSelection()
                }
              },(err) => {
                _this.table_loading = false
                _this.loadingTip1 = null
                _this.$refs.multipleTable.clearSelection()
              })         
          }
          }).catch(() => {
             _this.$message.info('已取消下发')
             _this.$refs.multipleTable.clearSelection()
          })
      } else {
        _this.$message.warning('请在列表中勾选要下发的访客！')
      }
    }
    
    },
changeDate(x, y, z, m) {
     let _p = this.pagingQuery
      this[x] && this[x].length
      ? ((_p[y] = moment(this[x][0]).format(m)),
        (_p[z] = moment(this[x][1]).format(m)))
      :  _p[y] = _p[z] = null
  },
  changeDate1() {
    this.changeDate('date1', 'visitStartTime', 'visitEndTime', 'YYYY-MM-DD HH:mm:ss')
  },
  changeDate3() {
    let _p = this.pagingQuery
      this.date && this.date.length
        ? ((_p.createTimeFrom = moment( this.date[0]).format("YYYY-MM-DD")),
          (_p.createTimeTo = moment( this.date[1]).format("YYYY-MM-DD")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getVisitorList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getVisitorList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    refreshPagingQuery() {
      this.pagingQuery = {}
      this.date = null, this.date1 = null
      this.onSearch()
    },
  },
  created() {
    vm = this
  this.onSearch()
  getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
  },
  mounted() {
  },
};
</script>
