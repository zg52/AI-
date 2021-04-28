<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-04-22 15:14:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>

</style>
<template>
  <div class="app-container">
    <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="创建人"><el-input class="w100" v-model.trim="pagingQuery.operator"></el-input></el-form-item>
      <el-form-item label="选择设备名称">
        <el-select v-model="pagingQuery.deviceId" placeholder="请选择" filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="通行规则名称"><el-select v-model="pagingQuery.name" placeholder="请选择" filterable clearable>
         <el-option v-for="(ruleName, index) of getRulesName" :key="index" :label="ruleName.name" :value="ruleName.name"></el-option>
       </el-select></el-form-item>
       <!-- <el-form-item label="选择通行方式">
        <div class="block">
             <el-cascader class="w250" v-model="pagingQuery.verificationModes" :options="passWay" :props="passWayProps" clearable @change="changeRuleNode"></el-cascader>
         </div>
      </el-form-item> -->
     <el-form-item label="通行人员类型">
        <el-select v-model="pagingQuery.personType" class="w130" @change="personTypeHandle">
        <el-option v-for="(personType, index) of personTypes" :key="index" :label="personType.name" :value="personType.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通行时间-星期制">
        <div class="block">
             <el-cascader class="w250" v-model="pagingQuery.queryWeek" :options="queryWeek" :props="queryWeeksProps" clearable @change="changeRuleNode1"></el-cascader>
         </div>
      </el-form-item>
      <el-form-item label="通行时间-日期制">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions1"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate1">
           </el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="date1"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate2">
           </el-date-picker>
      </el-form-item>
 
      <el-form-item label="状态">
        <el-select v-model="pagingQuery.status" class="w120" disabled>
            <el-option v-for="(ruleState, index) of ruleStates" :key="index" :value="ruleState.state"></el-option>
        </el-select>
      </el-form-item>
      
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
      <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
      <router-link class="ml10" to="/traffic-rules/addRules"><el-button type="primary"><svg-icon icon-class="edit"/> 新建通行规则</el-button></router-link>
    </el-form>
      
    <el-table :data="ruleList" border class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <el-table-column width="50" type="selection" fixed></el-table-column>
      <el-table-column label="序列" width="50" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
      <el-table-column align="center" label="通行规则名称" width="110"><template v-slot="scope"> {{ scope.row.name }}</template></el-table-column>
      <el-table-column align="center" label="所在设备" width="120"><template v-slot="scope"> {{ scope.row.deviceId | getDeviceId_name}}</template></el-table-column>
        <el-table-column align="center" label="设备标识" width="120"><template v-slot="scope"> {{ scope.row.uniqueDeviceIdentifier}}</template></el-table-column>
      <el-table-column align="center" label="通行方式" width="180"><template v-slot="scope">{{ scope.row.verificationModes | verificationModes_handle }}</template></el-table-column>
      <el-table-column align="center" label="通行人员类型" width="125"> <template v-slot="scope">{{ scope.row.personType | personTypeFilter(scope.row)}}</template></el-table-column>
      <!-- <el-table-column align="center" label="通行人员数量" width="120"><template v-slot="scope"> {{ scope.row.dfs }} </template></el-table-column> -->
      <el-table-column align="center" label="通行星期" width="135"><template v-slot="scope">{{ scope.row.week | weekComput }}</template></el-table-column>
      <el-table-column align="center" label="通行时间" width="300"><template v-slot="scope">{{ `${ scope.row.startDate } ${ scope.row.startTime } ~ ${ scope.row.endDate } ${ scope.row.endTime }` | dateTime }}</template></el-table-column>
      <el-table-column align="center" label="规则描述"><template v-slot="scope">{{ scope.row.description }}</template> </el-table-column> 
      <el-table-column align="center" label="创建时间" width="152" fixed="right"><template v-slot="scope">{{ scope.row.createTime | filterDate }}</template></el-table-column>
      <!-- <el-table-column align="center" label="修改时间" width="108"><template v-slot="scope">{{ scope.row.lastUpdateTime | filterDate }}</template></el-table-column> -->

      <!-- <el-table-column align="center" label="创建人"><template v-slot="scope">{{ scope.row.userId }}</template></el-table-column> -->
      
      <el-table-column align="left" label="操作" width="220" fixed="right">
        <template v-slot="scope">
          <el-button class="radius_45 mr10" disabled type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <el-button @click="showRulePerson(scope.row)" v-show="scope.row.ruleType === 'by_person' ? true : false" class="radius_45 mt10 ml0" type="primary" size="mini"><i class="el-icon-view"></i><span>通行人员</span></el-button> 
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该规则？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 mt10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
          </el-popconfirm>
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
         :total="pagingQuery['total']"
    ></el-pagination>
    <el-dialog
      title="可通行人员"
      :visible.sync="dialogPesonVisible"
      width="60%"
      top="0">
     <BeenPersonRule v-if="dialogPesonVisible" :been_person_rule_param="been_person_rule_param" />
      <div slot="footer">
        <el-button @click="dialogPesonVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRules, deleteRules } from '@/api/traffic-rules'
// import { searchDevice } from '@/api/device-manage'
import { pickerOptions } from '@/utils'
import { passWay, weekParams, passWayArrHandle, getDeviceNames } from '@/utils/business'
import BeenPersonRule  from './components/BeenPersonRule'
import moment from 'moment'


let vm

export default {
  name: 'rulesList',
  components: {
    BeenPersonRule
  },
  data() {
    return {
      userFormVisible: true,
      dialogPesonVisible: false,
      value: 1,
      table_loading: false,
       pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        pickerOptions1: pickerOptions(),
        pickerOptions2:pickerOptions(),
        multipleSelection: [], //多选删除
        date: null,
        date1: null,
        props: { multiple: true },
        createTime: null,
        getDeviceNames: [],
        getRulesName: [],
         
// 规则名称
    // ruleName: '常客',
       ruleNames: [ '常客','访客' ],

//  通行方式
       verificationModes: [],
       passWayProps: { multiple: true },
       passWay: passWay(),

// 通行人员类型
      personType: null,
      personTypes: [
        {
          name: '员工',
          id: 'employee'
        },
        {
          name: '访客',
          id: 'vistor'
        }
      ],
      ruleStates: [
        {
          value: '正常'
        },
        {
          value: '禁用'
        }
       ],
       
      queryWeeksProps: { multiple: true },
      queryWeek: [],
      ruleList: [],
      
      pagingQuery: {
       operator: null,
       deviceId: null,
       name: null,
       verificationModes: null,
       ruleType: null,
       personType: null,
      //  value: null,
       createTimeFrom: null,
       createTimeTo: null,
       queryWeek: null,
       startDate: null,
       endDate: null,
       startTime: null,
       endTime: null,

       current: 1,
       size: 100,
       total: 10,
       status: ''
      },
      ops: null,
      been_person_rule_param: null
    }
  },
  filters: {
    weekComput(value) {
      if(value) {
        let weekStr = []
          weekParams().forEach((item, index) => {
            value.includes(item?.id) ? weekStr.push(`${ item?.value }`) : ''
            })
         if(value.length === 13) {
           return '周一至周日'
         } else if(value.includes('1,2,3,4,5,6') && value.length === 11) {
            return '周一 至 周六'
         } else if(value.includes('1,2,3,4,5') && value.length === 9) {
            return '周一 至 周五'
         } else if(value.includes('1,2,3,4') && value.length === 7) {
            return '周一 至 周四'
         } else if(value.includes('1,2,3') && value.length === 5) {
            return '周一 至 周三'
         } else {
            return '周' + weekStr.join('、')
         }
        } else {
          return ''
        }
  },
  dateTime(value) {
    return value.replace(new RegExp('null', 'img'), '')
  },
  getDeviceId_name(value) {
    let txt = null
      vm.getDeviceNames.map((item, index) => {
         item.id == value ? txt = item.name : null
      })
      return txt
  },
  personTypeFilter(value,row) {
    if(row.ruleType === 'by_person_type') {
      if(row.personType === 'employee') {
        return '全部员工'
      } else {
        return '全部访客'
      }
    } else if(row.ruleType === 'by_person') {
      if(row.personType === 'employee') {
        return '指定员工'
      } else if(row.personType === 'visitor') {
        return '指定访客'
      } else {
        return '指定员工 + 访客'
      }
    } 
  }
  },
  methods: {
    
 // 获取通行方式参数
    changeRuleNode() {
        let newArr = []
        this.verificationModes.map((x) => {
         x.forEach(() => newArr.push(x[x.length - 1]))
        })
      this.pagingQuery['verificationModes'] =  this.pagingQuery['verificationModes'] ?? Array.from(new Set(newArr))
    },

 // 获取通行星期参数
    changeRuleNode1() {
      let queryWeek = this.pagingQuery,
          querWeekStr = []
          if(queryWeek['queryWeek'].length !== 0) {
                queryWeek['queryWeek'].forEach((item, index) => {
                 querWeekStr.push(item[0])
              })
              querWeekStr = querWeekStr.join()
               queryWeek['queryWeek'] = querWeekStr
          }
    },

// 获取通行人员类型参数
    personTypeHandle() {
      let _p = this.personTypes,
          param = this.pagingQuery
          this.personType === _p[0]['name'] ? param.value = _p[0]['value'] : param.value = _p[1]['value']
    },
    
// 查规则列表
    onSearch(){
      this.pagingQuery.current = 1
      this.getRuleList()
    },
    getRuleList() {
      this.table_loading = true
      let params = this.pagingQuery
      getRules(this.pagingQuery).then((res) => {
         if(res.code === 0) {
           this.ruleList = []
           this.table_loading = false
           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total
           if(res.data.records.length != 0 ) {
           this.ruleList = res.data.records
               
// 获取查询所需规则名称
            new Promise((resolved) => {
                 if(this.ruleList.length !== 0) resolved()
               }).then((res1) => {
                 this.ruleList.map((item) => {
                   this.getRulesName.push({
                     name: item.name
                   })
                 })
               })             
           }
            } else {
               this.$message.error(res.msg)
               this.table_loading = false
            }
      })
    },
    handleDelete(x, y) {
      deleteRules({ids: y.id}).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success({message: res.msg})
          this.onSearch()
        } else {
          this.$message.error({message: res.msg})
        }
      })
    },

// 批量删规则
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选规则, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              deleteRules({ids:this.multipleSelection[i].id}).then((res) => {
                if (res.code == 0 && res.data) {
                  if(i + 1 >= this.multipleSelection.length) {
                  this.onSearch()
                  this.$message.success({message: res.msg})
                  } 
                }
              })
            }
          }).catch(() => {
             this.$message.info({message: '已取消删除'})
             this.$refs.multipleTable.clearSelection()
          })
      } else {
        this.$message.warning('请在列表中勾选要删除的规则')
      }
    },
// 修改规则
    handleEdit() {
      

},
// 查可通行人员
    showRulePerson(row) {
      this.dialogPesonVisible = true
      this.been_person_rule_param = row.id
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getRuleList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getRuleList()
    },
    handleSelectionChange(val) {
     this.multipleSelection = val
    },

// 转换通行时间
    changeDate1() {
      let _this = this,
          date = this.pagingQuery,
          dateItem = ['startDate', 'endDate', 'startTime', 'endTime']
          getDate()
          function getDate() {
           dateItem.map((item, index) => { 
             index <= 1 
             ? date[dateItem[index]] = moment(_this.date[index]).format('YYYY-MM-DD') : 
               (
                 date[dateItem[2]] =  moment(_this.date[0]).format('HH:mm'),
                 date[dateItem[3]] =  moment(_this.date[1]).format('HH:mm')
               )
            })
          }
    },
    changeDate2() {
      let _p = this.pagingQuery
      this.date1 && this.date1.length
        ? ((_p.createTimeFrom = moment( this.date1[0]).format("YYYY-MM-DD: HH:mm")),
          (_p.createTimeTo = moment( this.date1[1]).format("YYYY-MM-DD: HH:mm")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    },
    refreshPagingQuery() {
      this.pagingQuery = {}
      this.onSearch()
    }
  },
  beforeCreate() {
    vm = this
  },
  created() {
    getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
    this.onSearch()
    {
     weekParams().map((item, index) => {
         this.queryWeek.push({
          value: item.value === '日' ? 0 : index + 1,
          label: `周${ item.value }`
       })
     })
    }
  },
  mounted() {
    
  },
};
</script>
