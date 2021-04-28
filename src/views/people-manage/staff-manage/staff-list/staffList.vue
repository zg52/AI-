<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-22 17:48:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8a16ff;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border:1px #8a16ff dashed;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .camera {
    margin-left: 30px;
    margin-top: 44px;
    i {
      font-size: 20px;
    }
  }
  .des {
   color: #999;
    font-size: 12px;
    padding-left: 30px;
    line-height: 16px;
  }

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
    .change_staff_status {
      position: relative;
      span {
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 30px;
        z-index: 999;
        cursor: pointer;
      }
    }
    .change_staff_btn {
      text-align: right;
    }
    .expireDateTip{
      color: #ff4949;
    font-size: 12px;
    line-height: 1;
    position: relative;
    top: -21px;
    background: #fff;
    padding-top: 5px;
    width: 100%;
    display: block;
    height: 20px;
    }
</style>
<template>
  <div class="app-container">
  <el-form :model="pagingQuery" :inline="true" ref="pagingQuery">
      <el-form-item label="创建人"><el-input v-model.trim="pagingQuery.operator" clearable></el-input></el-form-item>
      <el-form-item label="员工姓名"><el-input v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
      <el-form-item label="性别："><el-select class="w160" v-model="pagingQuery.gender" clearable><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
      <el-form-item label="工号"><el-input v-model.trim="pagingQuery.employeeNum" clearable></el-input></el-form-item>
      <el-form-item label="电话"><el-input v-model.trim="pagingQuery.phone" clearable></el-input></el-form-item>
      <el-form-item label="住址"><el-input v-model.trim="pagingQuery.address" clearable></el-input></el-form-item>
      <el-form-item label="邮箱"><el-input v-model.trim="pagingQuery.mail" clearable></el-input></el-form-item>
      <el-form-item label="部门"> <el-select disabled v-model="value" clearable></el-select></el-form-item> 
      <el-form-item label="职务" ><el-input v-model.trim="pagingQuery.position" clearable></el-input></el-form-item>
      <el-form-item label="入职日期：">
        <el-date-picker class="w300" v-model="pagingQuery.enrollTime" type="date" align="right" unlink-panels start-placeholder="创建日期" @change="changeDate1"></el-date-picker>
      </el-form-item>
      <el-form-item label="离职日期">
        <el-date-picker class="w300" v-model="pagingQuery.expiredTime" type="date" align="right" unlink-panels start-placeholder="创建日期" @change="changeDate2"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="getStates" class="w100" @change="changeStatus" clearable>
         <el-option v-for="(state, index) of states" :key="index" :label="state.value" :value="state.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门禁卡号"> <el-input v-model.trim="pagingQuery.gateCardId" clearable></el-input></el-form-item>
      <el-form-item label="IC卡号" ><el-input v-model.trim="pagingQuery.icCardId" clearable></el-input></el-form-item>
      <el-form-item label="创建日期">
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="截止日期"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate3"
          clearable
          >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="有无人脸">
        <el-select v-model="pagingQuery.state" class="w100">
          <el-option></el-option>
        </el-select>
      </el-form-item> -->

      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes"> <i class="el-icon-delete"></i><span>批量删除</span></el-button>
       <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
      <el-button type="primary" @click="onExport"> <svg-icon icon-class="excel" /> <span>导出</span></el-button>
      <router-link to="/people-manage/staff-manage/staff-add/staffAdd" class="ml10"><el-button type="primary"><svg-icon icon-class="edit" /> 新增员工</el-button></router-link>
    </el-form>
    
    <el-table :data="tableData" class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column width="50" type="selection" fixed ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>

<!-- 详情 -->
       <el-table-column type="expand" label="详情" :width="60">
           <template slot-scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
               <!-- <el-form-item label="创建人："><span>{{ props.row.name }}</span></el-form-item> -->
               <div class="imgBox fl mr25"><el-form-item><div><img :src="`${ getImgUrl + props.row.imageId }`" width="120"></div></el-form-item></div>
               <el-form-item label="姓名："><span>{{ props.row.name }}</span></el-form-item>
                <el-form-item label="性别："><span>{{ props.row.gender | filterGenter }} </span></el-form-item>
               <el-form-item label="头像类型："><span>{{ props.row.faceType | filterFaceType }} </span></el-form-item>
                 <el-form-item label="部门："> <span>华捷艾米 </span></el-form-item>
                 <el-form-item label="身份证号："><span>{{ props.row.idNum }} </span></el-form-item>
                 <el-form-item label="工号："><span>{{ props.row.employeeNum }} </span></el-form-item>
                 <el-form-item label="电话："><span>{{ props.row.phone }} </span></el-form-item>
                 <el-form-item label="住址："><span>{{ props.row.address }} </span></el-form-item>
                 <el-form-item label="邮箱："><span>{{ props.row.mail }} </span></el-form-item>
                 <el-form-item label="职务："><span>{{ props.row.position }} </span></el-form-item>
                 <el-form-item label="门禁卡："><span>{{ props.row.gateCardId }} </span></el-form-item>
                 <el-form-item label="IC卡："><span>{{ props.row.icCardId }} </span></el-form-item>
                 <el-form-item label="入职日期："><span>{{ props.row.enrollTime }} </span></el-form-item>
                 <el-form-item label="离职日期："><span>{{ props.row.status == 1 ? props.row.expiredTime : null }} </span></el-form-item>
                 <el-form-item label="创建时间："><span>{{ props.row.createTime | filterDate }} </span></el-form-item>
                 <el-form-item label="修改时间："><span>{{ props.row.lastUpdateTime | filterDate }} </span></el-form-item>
                  <el-form-item label="状态："><span>{{ props.row.status | filterStaffStates(props.row.isDelete) }}</span> </el-form-item>
                 <el-form-item label="备注："><span></span></el-form-item>
                <el-form-item label="创建人："><span>{{ props.row.operator }}</span></el-form-item>
           </el-form>
           </template>
     </el-table-column>
      
      <el-table-column align="center" label="员工姓名" width="80"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="已注册人脸" width="90">
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageId}`" width="100%" /></template>
      </el-table-column>
     <el-table-column align="center" label="性别" width="50"><template v-slot="scope"> {{ scope.row.gender | filterGenter }} </template></el-table-column>
      <el-table-column align="center" label="部门" width="100"><template> 华捷艾米 </template></el-table-column>
      <el-table-column align="center" label="工号" width="180"><template v-slot="scope"> {{ scope.row.employeeNum }} </template></el-table-column>
      <el-table-column align="center" label="电话" width="108"><template v-slot="scope"> {{ scope.row.phone }} </template></el-table-column>
      <el-table-column align="center" label="邮箱" width="180"><template v-slot="scope"> {{ scope.row.mail }} </template></el-table-column>
      <el-table-column align="center" label="职务" width="108"><template v-slot="scope"> {{ scope.row.position }} </template></el-table-column>
      <el-table-column align="center" label="门禁卡" width="230"><template v-slot="scope"> {{ scope.row.gateCardId }} </template></el-table-column>
      <el-table-column align="center" label="IC卡" width="230"><template v-slot="scope"> {{ scope.row.icCardId }} </template></el-table-column>
      <el-table-column align="center" label="状态" width="64" fixed="right"><template v-slot="scope">{{ scope.row.status | filterStaffStates(scope.row.isDelete) }}</template> </el-table-column>
     
      <el-table-column align="left" label="操作" width="190" fixed="right">
        <template v-slot="scope">
      <div v-show="scope.row.isDelete == 1 ? false : true">
             <el-popover :ref="scope.row.id" placement="left" width="260" v-show="scope.row.visible" >
              <el-form ref="expiredDateFormRule" :model="expiredDateForm" :rules="expiredDateFormRule">
                <el-form-item label="请选择离职日期：" prop="expiredDate">
                  <el-date-picker class="w300" v-model="expiredDateForm.expiredDate" type="date" align="right" unlink-panels start-placeholder="离职日期" @change="changeExpiredDate"></el-date-picker>
                </el-form-item>
                <sup v-show="expiredDateTip" class="expireDateTip">请选择离职日期</sup>
              </el-form>
            <div class="change_staff_btn mt10">
              <el-button v-show="scope.row.status == 1 ? true : false" size="mini" type="primary" @click="setStatusHadnle(scope.$index, scope.row)">设为在职</el-button>
              <el-button type="primary" size="mini" @click="submitExpiredDate(scope.row, 'expiredDateFormRule')">确定</el-button>
              <el-button size="mini" type="button" @click="cacelStatusHandle(scope.row.id)">取消</el-button>
            </div>
            <div class="change_staff_status" slot="reference">
              <span @click="handleStatus"></span>
              <el-switch class="mll5" size="mini" active-text="在职" inactive-text="离职" v-model="status[scope.$index].status" @change="changeStaffStatus(scope.$index, scope.row)"></el-switch>
            </div>
        </el-popover>

          <el-button class="radius_45 mr10" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" ><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除员工吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 ml0 mt10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
          </el-popconfirm>
      </div>
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
           title="修改员工信息"
           :visible.sync="dialogVisible1"
           width="80%"
           top="0"
          >
          <StaffFromHandle v-if="dialogVisible1" :btn_el="btn_el" :addStaffForm="addStaffForm" @cacelEdit="cacelEditHandle" />
      </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getStaffList, deleteStaff, StaffState, downloadEmployee } from '@/api/people-manage/staffManage'
import { imgUrl, downStaffXls } from '@/api/public'
import { pickerOptions } from '@/utils'
import { getGender, getFaceType, getStaffStates } from '@/utils/business'
import StaffFromHandle from '../components/StaffFromHandle'
import moment from 'moment'

let vm

export default {
  name: 'staff-list',
   components: { StaffFromHandle },
  data() {
    return {
      expiredDateTip: false,
      table_loading: true,
      dialogVisible1: false,
      value: '华捷艾米',
      genders: getGender(),
      status: [],
      states: getStaffStates,
      faceTypes: getFaceType(),
      pickerOptions: pickerOptions(),
      date: null,
      multipleSelection: [],
      getImgUrl: imgUrl(),
      expiredDateForm: {
        expiredDate: '',
        expiredDate1: ''
      },
      expiredDateFormRule: {
        expiredDate: [{type:'date', required: true, message: '请选择离职日期', trigger: ['blur', 'change'] }]
      },

      getStates: null,
      pagingQuery: {
        operator: null,
        name: null,
        gender: null,
        phone: null,
        address: null,
        idNum: null,
        mail: null,
        // companyId: null,
        employeeNum: null,
        position: null,
        icCardId: null,
        gateCardId: null,
        enrollTime: null,
        expiredTime: null,
        createTimeFrom: null,
        createTimeTo: null,
        status: null,
        isDelete: null, /// 0为正常 1为已删除 2为删除中
        states: null,
        
        current: 1, 
        size: 20,
        total: null,
      },
      tableData: [],

// 编辑参数
      addStaffForm: {
          id: null,
          operator: this.$store.getters.username,
          name: null,
          gender: '1',
          phone: null,
          address: null,
          idNum: null,
          mail: null,
          employeeNum:null,
          companyId: '1',
          position: null,
          icCardId: null,
          gateCardId: null,
          enrollTime: null,
          faceType: null,
          files: null
         },
         btn_el: ['edit']
    }
  },
  // filters: {
 
  // },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    changeStatus() {
      let p = this.pagingQuery
       p['states'] = vm['getStates']
       p['isDelete'] = null
        
      statesValue(2)
      function statesValue(i) {
        if(vm['getStates'] === getStaffStates[i].id) 
            p['isDelete'] = getStaffStates[i].id.substr(-1),
            p['states'] = null
      }
    },
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
          
// 设置visible解决elemenui pover 弹出异常缺陷
        this.tableData.forEach(function (item) {
         item.visible = true
        })

//  转换status为Boolean
        let satatusArr = []
        this.tableData.map((x, index) => {
          satatusArr.push({
            status: x.status == 1 ? false : true
          })
        })
        this.status = satatusArr
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
    handleEdit(x, y) {
      this.dialogVisible1 = true
      this.addStaffForm = y

// 去除编辑无需字段
      let delEditParam = ['departmentId', 'img_height', 'img_width']
          delEditParam.forEach((item, index) => {
            delete this.addStaffForm[item]
          })
    },
     handleDelete(x, y) {
      deleteStaff(y.id).then((res) => {
        if (res.code == 0 && res.data === null) {
          this.$message.success({message: res.msg})
          this.getStaffList()
        } else {
          this.$message.warning({message: res.msg})
        }
      })
    },
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选员工, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              deleteStaff(this.multipleSelection[i].id).then((res) => {
                if (res.code == 0) {
                  if(i + 1 >= this.multipleSelection.length) {
                  this.onSearch()
                  this.$message.success(res.msg)
                  }
                } else {
                  this.$message.error(res.msg)
                }
              })
            }
          }).catch(() => {
             this.$message.info('已取消删除')
             this.$refs.multipleTable.clearSelection()
          })
      } else {
        this.$message.warning('请在列表中勾选要删除的员工')
      }
    },
    onExport() {
      let p = this.pagingQuery
      downloadEmployee(p.current, p.size).then(res => {
        if(res) {
          downStaffXls(p.current, p.size)
        }
      })
    },
    handleStatus(row) {
      row.visible = true
      if(row.status == 0) {
      } else {
        
      }
    },
    
// 切换员工状态(在职)
    changeStaffStatus(index, row) {
      function state() {
        return row.status == 0 ? 1 : 0
      }
      StaffState(
          row.id,
          {
            status: 0,
            id: row.id
          }
      ).then((res) => {
        if (res.code == 0 && res.data === null) {
          this.$message.success(res.msg)
          this.getStaffList()
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    setStatusHadnle(index, row) {
      this.changeStaffStatus(index, row)
      this.$refs[row.id].doClose()
    },

// 设置离职时间
  submitExpiredDate (row, el) {
    let e = this.expiredDateForm
      this.$refs[el].validate((valid) => {
        if (valid) {
        valiExpiredDate()
      } else {
        this.expiredDateTip = true
        return false
      }
     })
      function valiExpiredDate() {
      function state() {
        return row.status == 0 ? 1 : 0
      }
      StaffState(
          row.id,
          {
            id: row.id,
            status: 1,
            expiredDate: e['expiredDate1']
          }
      ).then((res) => {
        if (res.code == 0 && res.data === null) {
          e['expiredDate'] = null
          vm.$message.success(res.msg)
          vm.getStaffList()
        } else {
          vm.$message.warning(res.msg)
        }
      })
     vm.$refs[row.id].doClose()
      }
    
    },
    cacelStatusHandle(id) {
      this.$refs[id].doClose()
      this.expiredDateTip = false
      this.expiredDateForm['expiredDate'] = null
    },
   changeDate(item) {
     let a = this.pagingQuery
         a[item] =  moment(a[item]).format('YYYY-MM-DD')
  },
  changeDate1() {
    this.changeDate('enrollTime')
  },
  changeDate2() {
    this.changeDate('expiredTime')
  },
  changeExpiredDate() {
     this.expiredDateForm.expiredDate1 =  moment(this.expiredDateForm.expiredDate).format('YYYY-MM-DD')
  },
  changeDate3() {
    let _p = this.pagingQuery
      this.date && this.date.length
        ? ((_p.createTimeFrom = moment( this.date[0]).format("YYYY-MM-DD")),
          (_p.createTimeTo = moment( this.date[1]).format("YYYY-MM-DD")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    },
    cacelEditHandle() {
      this.getStaffList()
      this.dialogVisible1 = false
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
    },
    refreshPagingQuery() {
      this.pagingQuery = {}
      this.onSearch()
    }
  },
  created() {
    vm = this
    this.onSearch()
  },
  mounted() {
  },
};
</script>
