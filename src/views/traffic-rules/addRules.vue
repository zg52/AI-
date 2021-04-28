<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-17 15:20:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
.p_num {
  color: #999;
  font-size: 12px;
}
</style>
<style lang="scss">
.dialog__body {
  .el-dialog__body {
  padding-top: 0!important;
}
 .el-dialog__footer {
    margin-top:-50px
  }
  }
</style>
<template>
  <div class="app-container">
    <el-form :model="addRules" label-width="120px" ref="el_addRules">
      
       <el-form-item label="选择设备名称：" prop="deviceIds" :rules="{ required: true,message: '请选择设备名称', trigger: 'change' }">
        <el-select v-model="deviceIds" placeholder="请选择" @change="changeDeviceIds" multiple filterable clearable>
         <el-option v-for="(deviceName, index) of getDeviceNames" :key="index" :label="deviceName.name" :value="deviceName.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择通行方式：" prop="getVerificationModes" :rules="{ required: true,message: '请选择通行方式', trigger: 'change' }">
       <div class="block">
            <el-cascader class="w250" v-model="addRules.getVerificationModes" :options="passWay" :props="passWayProps" clearable @change="changeRuleNode" @getCheckedNodes="getCheckedNodes"></el-cascader>
        </div>
      </el-form-item>
      <el-form-item label="通行规则名称：" prop="name" :rules="{ required: true, message: '通行规则名称不能为空', trigger: 'blur' }"><el-input class="w200" v-model.trim="addRules.name" placeholder="通行规则名称"></el-input></el-form-item>
      <el-form-item label="通行规则描述：" prop="description" :rules=" { required: true, message: '请输入描述信息', trigger: 'blur' }"><el-input class="w200" type="textarea" placeholder="请输入描述信息" v-model="addRules.description" maxlength="50" show-word-limit></el-input></el-form-item>
      <el-form-item label="通行人员类型：">
      <el-radio-group v-model="personTypeRadio" @change="personTypeHandle">
         <el-radio :label="personTypeList[0]" @click.native="allStaffHandle" border>全部员工</el-radio>
         <el-radio :label="personTypeList[2]" @click.native="allVisitorHandle" border>全部访客</el-radio>
          
         <!-- <el-radio :label="personTypeList[1]" @click.native="staffHandle" border>指定员工
           <sub class="p_num" v-show="Array.isArray(addRules.employeeIds) && addRules.employeeIds.length > 0"> 已选 {{ Array.isArray(addRules.employeeIds) ? addRules.employeeIds.length : null }} 人</sub>
            </el-radio> -->
            <!-- <div class="mt10">
             <el-radio :label="personTypeList[2]" border>全部访客</el-radio>
            <el-radio :label="personTypeList[3]" @click.native="visitorHandle" border>指定访客
              <sub class="p_num" v-show="Array.isArray(addRules.visitorIds) && addRules.visitorIds.length > 0"> 已选 {{ Array.isArray(addRules.visitorIds) ? addRules.visitorIds.length : null }} 人</sub>
            </el-radio>
         </div> -->

        </el-radio-group>
<!-- 指定人员 -->
        <div class="mt10">
          <el-checkbox v-model="checked1" @click.native="staffHandle" :label="personTypeList[1]" border>
            <template><span>指定员工</span><sub class="p_num" v-show="Array.isArray(addRules.employeeIds) && addRules.employeeIds.length > 0"> 已选 {{ Array.isArray(addRules.employeeIds) ? addRules.employeeIds.length : null }} 人</sub></template>
          </el-checkbox>
           <el-checkbox v-model="checked2" @click.native="visitorHandle" :label="personTypeList[3]" border>
            <template><span>指定访客</span><sub class="p_num" v-show="Array.isArray(addRules.visitorIds) && addRules.visitorIds.length > 0"> 已选 {{ Array.isArray(addRules.visitorIds) ? addRules.visitorIds.length : null }} 人</sub></template>
          </el-checkbox>
        </div>
      </el-form-item>  
     <el-form-item label="选择通行时间：">
      <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="星期制" name="week">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

            <el-checkbox-group v-model="checkedWeeks" @change="handleWeekChange">
            <el-checkbox v-for="(week, index) in weeks" :label="weeks[index]" :key="week.name">{{ week.name }}</el-checkbox>
          </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="日期时间制" name="dateTime">
             <el-date-picker
               v-model="dateTime"
               type="datetimerange"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               @change="changeDateTime"
               >
            </el-date-picker>
          </el-tab-pane>
      </el-tabs>
    </el-form-item>
    <el-button type="primary" @click="handleAddRule" :disabled="issueSateLoading" v-loading="issueSateLoading"><svg-icon icon-class="guide" />  一键下发</el-button>
    <router-link to="/traffic-rules/rules" class="ml10"><el-button><i class="el-icon-view"></i> 查看已下发规则</el-button></router-link>
    </el-form>

    <el-dialog title="选择通行员工" :visible.sync="staff_dialogVisible" top="0" width="68%" class="dialog__body">
      <StaffList @employeeIds="getemployeeIds" v-if="staff_dialogVisible" :clearSelectionState1.sync="clearSelectionState1" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="staff_dialogVisible_handle">取 消</el-button>
        <el-button type="primary" @click="staffHandleTo">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog title="选择通行访客" :visible.sync="visitor_dialogVisible" top="0" width="72%" class="dialog__body">
      <VisitorList @visitorIds="getVisitorIds" v-if="visitor_dialogVisible" :clearSelectionState2.sync="clearSelectionState2" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="visitor_dialogVisible_handle">取 消</el-button>
        <el-button type="primary" @click="visitorHandleTo">确 定</el-button>
      </span>
    </el-dialog>
 
  </div>
</template>
<script>
import { addRules } from'@/api/traffic-rules'
import { passWay, weekParams, getDeviceNames } from '@/utils/business'
import StaffList from '@/components/Business/PersonList/StaffList'
import VisitorList from '@/components/Business/PersonList/VisitorList'
import moment from 'moment'

let vm
 var weekOptions = []
      weekParams().map((item, index) => {
         weekOptions.push({
          id: item.value === '日' ? 0 : index + 1,
          name: `星期${ item.value }`
       })
     })

//  通行人员类型字段
const personTypeList = [
      'ruleType-by_person_type-employee', //全部员工
      'ruleType-by_person-employeeIds', //指定员工
      
      'ruleType-by_person_type-visitor', //全部访客
      'ruleType-by_person-visitorIds' ////指定访客
      ]
const personTypeParam = ['by_person_type', 'by_person', 'employee', 'visitor']

export default {
  name: 'addRules',
  components: {
    StaffList,
    VisitorList
  },
  data() {
    return {
        checkAll: false,
        issueSateLoading: false,
        staff_dialogVisible: false,
        visitor_dialogVisible: false,
        checkedWeeks: weekOptions.slice(0, 5),
        weeks: weekOptions,
        isIndeterminate: true,
        dialogVisible: false,
        activeName: 'week',
        multipleSelection: [],
        personTypeRadio: personTypeList[0], //默认指定全员工
        personTypeList: personTypeList,
        dateTime: null,
        clearSelectionState1: false,
        clearSelectionState2: false,
        //  [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]

//  设备名称
        deviceIds: [],
        getDeviceNames: [],
         verificationModes: [],
         addRules: {
           deviceIds: [],
           getVerificationModes: [],
           verificationModes: [], // 发给后台转换后的参数
           name: null,
           description: null,
          //  ruleType: 'personType', 

// 指定员工id/或访客id
           personType: 'employee', // 默认为全员工
           
// 指定全部人员（全部员工和全部访客————后台自动添加人员id）或手动指定人员（指定员工id和全访客id）=== by_person_type -> employee/visitor || person_type -> employee(指定id)/visitor(指定id)
           ruleType: 'by_person_type', // 默认为人员类型

           employeeIds: null, //  指定人员（员工）的id
           visitorIds: null,  //  指定人员（访客）的id
           week: '1,2,3,4,5', // 默认通行星期为周一到周五
           startDate: null,
           endDate: null,
           startTime: null,
           endTime: null
         },
         checked1: false,
         checked2: false,

// 通行方式
       passWayProps: { multiple: true },
       passWay: passWay(),
      userFormVisible:true,
      value: 1,
      pickerOptions: [],
 
      addUserForm: [
        
      ],
      staffLis: [
        {
          name: "阿娃",
          description: "算法应用院",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
          dfs: 9988983,
          phone: 15652655412,
          job: "打杂专员",
          sex: "女",
          entryTime: "2023-12-12",
          id:21
        },
        {
          name: "阿龙",
          description: "超管",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
        },
      ],
     deiveParams: {
        current: 1,
        size: 10,
      },
      employeeIdNum: null,
      visitorIdNum: null,

      
    }
  },
  watch: {
    staff_dialogVisible(val) {
      if(!val) {
        if(!this.employeeIdNum) {
          this.checked1 = false
          this.addRules.employeeIds = null
        }
      }
    },
   visitor_dialogVisible(val) {
     if(!val) {
        if(!this.visitorIdNum) {
          this.checked2 = false
          this.addRules.visitorIds = null
        }
      }
    }
  },
  methods: {

// 获取设备id参数
    changeDeviceIds() {
       this.addRules.deviceIds = this.deviceIds
    },

// 获取通行方式参数
    changeRuleNode() {
        let newArr = [],
            a = this.addRules
            a['getVerificationModes'].map((x) => {
              x.forEach(() => newArr.push(x[x.length - 1]))
            })
           a['verificationModes'] = Array.from(new Set(newArr))

    },

// 获取通行人员类型参数
    personTypeHandle() {
     let p = this.personTypeRadio,
         pLis =  this.personTypeList,
         a = this.addRules
         function personType(TYPE, PERSONID) { return (a['ruleType'] = TYPE, a['personType'] = PERSONID) }
           switch(p) {
             case pLis[0] : (personType(personTypeParam[0], personTypeParam[2])); break
            //  case pLis[1] :(personType(personTypeParam[1], personTypeParam[2])); break
             case pLis[2] : (personType(personTypeParam[0],personTypeParam[3])); break
            //  case pLis[3] : (personType(personTypeParam[1],personTypeParam[3])); break
             default : personType(personTypeParam[0], personTypeParam[2])
           }
    },

// 处理下发全部人员
    allStaffHandle() { this.allPersonHandle() },
    allVisitorHandle() { this.allPersonHandle() },

// 处理下发指定人员
    staffHandle() {
      this.personHandle('employeeIds', 'staff_dialogVisible', personTypeParam[1], personTypeParam[2], 'checked1', 'clearSelectionState1')
    },
    visitorHandle() {
      this.personHandle('visitorIds', 'visitor_dialogVisible', personTypeParam[1], personTypeParam[3], 'checked2', 'clearSelectionState2')
    },
    
// 取消人员  checked1 = checked2 = false
    staff_dialogVisible_handle() {
      this.person_dialogVisible_handle('staff_dialogVisible', 'employeeIds', 'checked1')
    },
    visitor_dialogVisible_handle() {
      this.person_dialogVisible_handle('visitor_dialogVisible', 'visitorIds', 'checked2')
    },

// 下发判断是否已有人员id
    staffHandleTo() {
        this.handleTo('employeeIds', 'staff_dialogVisible', '请勾选要下发的员工', 'employeeIdNum')
    },
    visitorHandleTo() {
        this.handleTo('visitorIds', 'visitor_dialogVisible', '请勾选要下发的访客', 'visitorIdNum')
    },

// 获取人员ids
  getPersonIds(x, y) {
     let personIdsArr = []
         x.map(item => personIdsArr.push(item.id))
         this.addRules[y] = personIdsArr
    },


  allPersonHandle() {
     vm.clearSelectionState1 = true
      vm.clearSelectionState2 = true
      vm.addRules['employeeIds'] = vm.addRules['visitorIds'] = null
      vm.checked1 = vm.checked2 = false
  },
  personHandle(x, y, z, m, n, q) {
      let a = this.addRules
          a[x] = null
          if(this[n]) {
            this[y] = false
            this[q] = false
          } else {
            this[y] = true
          }

          a['ruleType'] = z
          a['personType'] = m
          this.personTypeRadio = null
    },
    person_dialogVisible_handle(x, y, z) {
      let a = this.addRules
      this[x] = false
      a[y] = null
      this[z] = false
      // if(Array.isArray(a[y])) {
      //   if(a[y].length === 0) {
      //   this[z] = false
      // }
      // } else if(a[y] === null) {
      //   this[z] = false
      // }
    },
    handleTo(x, y, z, m) {
      let a = this.addRules
         if (a[x] !== null) {
           if(a[x].length !== 0) {
             this[y] = false
             this[m] = true
             }
          } else {
            this.$message.warning(z)
            this[m] = null
          }
       },
    getemployeeIds(employeeIds) {
      this.getPersonIds(employeeIds, 'employeeIds')
    },
    getVisitorIds(VisitorIds) {
      this.getPersonIds(VisitorIds, 'visitorIds')
    },

  // 选择通行时间
    handleCheckAllChange(val) {
       this.checkedWeeks = val ? weekOptions : []
       this.isIndeterminate = false
       if(this.checkedWeeks.length === 0) {
         this.addRules.week = null
       }
    },
    handleWeekChange(value) {
        let [checkedCount, weekId] = [value.length, []]
        this.checkAll = checkedCount === this.weeks.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.weeks.length
        value.map(item =>  weekId.push(item.id))
        let weekSort = weekId.sort()
        this.addRules.week = weekSort.join(',')
      },
    getCheckedNodes(leafOnly) {
    },

// 提交规则
    handleAddRule() {
      let [a, _this, getVerificationModes] = [this.addRules, this, this.addRules.getVerificationModes]
      function setVerificationModes () {return _this.$set(_this.addRules, 'getVerificationModes', getVerificationModes)}
      this.$refs['el_addRules'].validate((valid) => {
          if (valid) {
            // this.addRules.getVerificationModes = 'null'

// 同时下发员工和访客 ruleType = null
            if(a['visitorIds'] && a['employeeIds']) {
              a['personType'] = null
            } else if(a['visitorIds']) {
              a['personType'] = 'visitor'
            } else if(a['employeeIds']) {
              a['personType'] = 'employee'
            }
            
            this.issueSateLoading = true
            addRules(this.addRules).then((res) => {
              // setVerificationModes()
              if(res.code === 0) {
                this.$message.success(`${ res.msg } 可在已下发规则页面查看`, 4000)
                this.issueSateLoading = false
              } else {
                this.$message.error(res.msg)
                this.issueSateLoading = false
              }
            this.clearSelectionState1 = true
            this.clearSelectionState2 = true
            this.employeeIdNum = this.visitorIdNum = null
            })
          } else {
            return false
          }
        })
    },
   changeDateTime() {
       let addDate = this.addRules,
       d = ['startDate', 'endDate', 'startTime', 'endTime']
        for(let i = 0; i < d.length; i++) {
           if(i <= 1) {
             addDate[d[i]] = dataTimeHandle('YYYY-MM-DD', i)
           } else {
             addDate[d[2]] = dataTimeHandle('HH:mm:ss', 0)
              addDate[d[3]] = dataTimeHandle('HH:mm:ss', 1)
           }
        }
        function dataTimeHandle(conversionMode, num) {
          if(vm.dateTime !== null) {
            return moment(vm.dateTime[num]).format(conversionMode)
          }
        }
        },
    handleSizeChange(val) {
      this.pagingParams.size = val
      this.getDeviceList()
    },
    handleCurrentChange(val) {
      this.pagingParams.size = val
      this.getDeviceList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
  created() {
    vm = this
   getDeviceNames().then((res) => {
       this.getDeviceNames = res
    })
  },
  mounted() {
  },
}
</script>
