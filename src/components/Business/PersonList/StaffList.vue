<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-22 17:51:25
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
    <div class="lis_tit"><i></i> <span>选择要下发的员工</span></div>
      <el-form :model="pagingQuery" :inline="true" ref="pagingQuery">
      <el-form-item label="员工姓名"><el-input class="w100" v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
      <el-form-item label="性别："><el-select class="w100" v-model="pagingQuery.gender" clearable><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
      <el-form-item label="部门"> <el-select disabled v-model="value" clearable></el-select></el-form-item> 
      <el-form-item label="职务" ><el-input v-model.trim="pagingQuery.position" clearable></el-input></el-form-item>
      <el-form-item label="入职时间：">
        <el-date-picker class="w300" v-model="pagingQuery.enrollTime" type="date" align="right" unlink-panels start-placeholder="创建日期" @change="changeDate1"></el-date-picker>
      </el-form-item>
      <el-form-item label="创建日期">
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="更新日期"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate3"
          clearable
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下发状态："><el-select class="w100" v-model.trim="pagingQuery.gender" disabled><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>

      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
       <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
       <!-- <router-link to="/device-manage/person-issued/issued-list/issuedList?tab=0" class="ml10"><el-button type="primary"><i class="el-icon-view"></i> 已下发员工</el-button></router-link> -->
       <!-- <el-button class="ml10" type="primary" :disabled="table_loading" @click="handleIssuedPerson"><svg-icon icon-class="guide" />  一键下发</el-button> -->
    </el-form>
    
    <el-table :data="tableData" max-height="650" @selection-change="handleSelectionChange" element-loading-spinner="el-icon-loading" v-loading="table_loading"  ref="multipleTable" border>
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column width="50" type="selection" fixed ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="员工姓名" width="80"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="已注册人脸" width="95">
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageId}`" width="100%" /></template>
      </el-table-column>
     <el-table-column align="center" label="性别" width="50"><template v-slot="scope"> {{ scope.row.gender | filterGenter }} </template></el-table-column>
      <el-table-column align="center" label="部门" width="100"><template> 华捷艾米 </template></el-table-column>
      <el-table-column align="center" label="职务" width="108"><template v-slot="scope">{{ scope.row.position }}</template></el-table-column>
      <el-table-column align="center" label="工号" width="190"> <template v-slot="scope"> {{ scope.row.employeeNum }} </template></el-table-column>
      <!-- <el-table-column align="center" label="下发状态" width="160"><template v-slot="scope">{{ scope.row.status == 0 ? '已下发' : '未下发' }}</template> </el-table-column> -->
      <el-table-column align="center" label="入职时间"><template v-slot="scope">{{ scope.row.enrollTime }}</template></el-table-column>
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
import { getStaffList } from '@/api/people-manage/staffManage'
import { getGender } from '@/utils/business'
import { imgUrl } from '@/api/public'
import { pickerOptions } from '@/utils'
import moment from 'moment'

let vm

export default {
  name: 'StaffList',
  components: {
  },
  props: {
    clearSelectionState1: {
      type: Boolean
    }
    
  },
  data() {
    return {
      pickerOptions: pickerOptions(),
      date: null,
      multipleSelection: [],
      getImgUrl: imgUrl(),
      genders: getGender(),
      value: '华捷艾米',
      table_loading: true,

      pagingQuery: {
        name: null,
        gender: null,
        position: null,
        icCardId: null,
        gateCardId: null,
        enrollTime: null,
        createTimeFrom: null,
        createTimeTo: null,
        states: 0,
        status: null,
        
        current: 1, 
        size: 20,
        total: null,
      },
      tableData: [],
    }
  },
  watch: {
    clearSelectionState(val) {
      this.$refs.multipleTable.clearSelection()
    }
  },
  methods: {
     getStaffList() {
      let [params] = [this.pagingQuery]
      this.table_loading = true
      getStaffList(this.pagingQuery).then((res) => {
        this.tableData = []
        if(res.code === 0) {
        params.size = res.data.size
        params.current = res.data.current
        params.total = res.data.total

        if(res.data.records.length !== 0) {
        this.tableData = res.data.records
        }
        this.table_loading = false
        } else {
          this.$message.error(res.msg)
          this.table_loading = false
        }
      })
    },
    onSearch() {
      let params = this.pagingQuery
      params.current = 1
      this.getStaffList()
    },
  changeDate(item) {
     let a = this.pagingQuery
         a[item] =  moment(a[item]).format('YYYY-MM-DD')
  },
  changeDate1() {
    this.changeDate('enrollTime')
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
      this.getStaffList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getStaffList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('employeeIds', this.multipleSelection)
    },
    refreshPagingQuery() {
      this.pagingQuery = {}
      this.date = null
      this.onSearch()
    },
  },
  created() {
    vm = this
  this.onSearch()

  },
  mounted() {
  },
  destroyed() {
  },
};
</script>
