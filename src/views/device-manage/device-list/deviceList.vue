<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-04-22 18:14:23
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
   .demo-table-expand {
    width: 1100px;
    
  }
 
  .demo-table-expand .el-form-item {
  margin-right: 0!important;
    margin-bottom: 0;
    width: 27%;
  }
    .demo-table-expand ::v-deep .el-form-item__label {
      padding-right: 0;
        font-weight: normal;
      .el-form-item__content {
    font-size: 12px!important;
        }
    }

.device_num {
    width: 100%;
   display: flex;
   justify-content: space-between;
   margin-bottom:25px;
& > div {
    width: 300px;
  height: 82px;
  border-radius: 20px;
   border:1.5px #8a16ff solid;
   color: #949494;
}
.device_num2 {
 border-color: #13ce66;
 
}
.device_num4 {
  border-color:#ff4949
}
.device_num3 {border-color: #ffba00;}
.lis {
& > div:first-child {  padding:22px; }
& > div + div {padding-top: 10px;padding-right: 22px;}
  display: flex;
  justify-content: space-between;
  .num {
    text-align: center;
    line-height: 20px;
  }
}
}
.device {
  fill: #8a16ff;
  font-size: 45px;
}
.pt15{padding-top: 15px!important;}
</style>

<template>
  <div class="app-container">
    <div class="device_num">
      <div class="lis">
        <div class="num"><span>设备总数</span><div>{{ deviceNum }}</div></div>
        <div class="p15 pt15"> <svg-icon icon-class="device" class="device" /></div>
        </div>
      <div class="lis device_num2">
        <div class="num"><span>在线设备</span><div>{{ lineDeviceNum }}</div></div>
        <div><el-progress type="circle" :percentage="lineDeviceNum" color="#13ce66" :stroke-width="2" :width="60"></el-progress></div>
        </div>
      <div class="lis device_num3">
        <div class="num"><span>离线设备</span><div>{{ offLineDeviceNum }}</div></div>
       <div><el-progress type="circle" :percentage="offLineDeviceNum" color="#ffba00" :stroke-width="2" :width="60"></el-progress></div>
        </div>
         <div class="lis device_num4">
        <div class="num"><span>故障设备</span><div>{{ outDeviceNum }}</div></div>
        <div><el-progress type="circle" :percentage="outDeviceNum" color="#ff4949" :stroke-width="2" :width="60"></el-progress></div>
        </div>
    </div>
    
    <div class="lis_tit"><i></i> <span>设备详情列表</span></div>
    <el-form :model="pagingQuery" :inline="true">
      <!-- <el-form-item label="创建人"><el-input v-model.trim="roles.roleName" placeholder="输入姓名搜索" clearable></el-input></el-form-item> -->
      <el-form-item label="设备名称"><el-input v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
      <el-form-item label="设备类型"><el-select v-model="pagingQuery.type"><el-option v-for="(deviceType, index) of deviceTypes" :key="index" :label="deviceType.value" :value="deviceType.id"></el-option></el-select></el-form-item>
      <el-form-item label="设备型号"><el-input v-model.trim="pagingQuery.model" clearable></el-input></el-form-item>
      <el-form-item label="设备厂商"><el-input v-model="pagingQuery.manufacturer" clearable></el-input></el-form-item>
      <el-form-item label="设备SN"><el-input v-model.trim="pagingQuery.sn" clearable></el-input></el-form-item>
      <el-form-item label="设备位置"><el-input v-model.trim="pagingQuery.location" clearable></el-input></el-form-item>
      <!-- <el-form-item label="已下发人数" ><el-input class="w120" v-model.trim="pagingQuery.num" clearable></el-input></el-form-item> -->
      <el-form-item label="在线 / 离线"><el-select class="w100" v-model="pagingQuery.online" clearable><el-option v-for="(isOnline, index) of deviceISOnline" :key="index" :label="isOnline.value" :value="isOnline.id"></el-option></el-select></el-form-item>
       <!-- <el-form-item label="方向">  <el-select class="w100"  v-model="value" placeholder="请选择"> <el-option>进</el-option><el-option>出</el-option> </el-select></el-form-item> -->
      <el-form-item label="创建日期">
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
          @change="changeDate">
        </el-date-picker>
      </el-form-item>
     <el-form-item label="设备状态"><el-select class="w100" v-model="states" clearable @change="changeStates"><el-option v-for="(deviceState, index) of deviceStates" :key="index" :label="deviceState.value" :value="deviceState.id"></el-option></el-select></el-form-item>
     
      <el-button type="success" @click="onSearch" class="search"><i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="warning" @click="onDeletes"><i class="el-icon-delete"></i><span>批量删除</span></el-button>
        <el-button type="primary" @click="refreshPagingQuery" class="search"> <i class="el-icon-refresh"></i><span>重置</span></el-button>
      <el-button type="primary" @click="addDeviceVisible = true"><svg-icon icon-class="edit"/> <span>新增设备</span></el-button>
      <router-link class="ml10" to="/device-manage/person-issued/issued-add/issuedAdd?tab=0"><el-button type="primary"><svg-icon icon-class="guide"/> <span>下发人员</span></el-button></router-link>
    </el-form>
    
    <el-table :data="deviceList" class="device_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column :width="50" type="selection" fixed></el-table-column>
      <el-table-column label="序列" :width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>

<!-- 详情 -->
       <el-table-column type="expand" label="详情" :width="60">
           <template slot-scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
               <!-- <el-form-item label="创建人："><span>{{ props.row.name }}</span></el-form-item> -->
               <el-form-item label="设备名称："><span>{{ props.row.name }}</span></el-form-item>
                <el-form-item label="设备标识："><span>{{ props.row.uniqueDeviceIdentifier }}</span></el-form-item>
               <el-form-item label="设备类型："><span>{{ props.row.type | filterDiveType}}</span></el-form-item>
               <el-form-item label="设备型号："><span>{{ props.row.model }}</span></el-form-item>
               <el-form-item label="设备厂商："><span>{{ props.row.manufacturer }}</span></el-form-item>
               <el-form-item label="设备SN："><span>{{ props.row.sn }}</span></el-form-item>
               <el-form-item label="设备版本："><span>{{ props.row.firmwareVersion }}</span></el-form-item>
               <el-form-item label="设备位置："><span>{{ props.row.location }}</span></el-form-item>
               <!-- <el-form-item label="方向："><span>{{ props.row.name }}</span></el-form-item> -->
               <el-form-item label="在线状态："><span>{{ props.row.online | filterOnline}}</span></el-form-item>
               <el-form-item label="设备状态："><span>{{ props.row.state | filterDeivceState(props.row)}}</span></el-form-item>
               <el-form-item label="设备密钥："><span>{{ props.row.secret }}</span></el-form-item>
               <el-form-item label="设备信息："><span>{{ props.row.information }}</span></el-form-item>
               <el-form-item label="设备末次心跳同步时间："><span>{{ props.row.astHeartbeatTime | filterDate }}</span></el-form-item>
               <el-form-item label="创建时间："><span>{{ props.row.createTime | filterDate }}</span></el-form-item>
               <el-form-item label="修改时间："><span>{{ props.row.lastUpdateTime | filterDate}}</span></el-form-item>
               <el-form-item label="描述："><span>{{ props.row.description }}</span></el-form-item>
           </el-form>
           </template>
     </el-table-column>
      <el-table-column align="center" label="设备名称" :width="100"><template v-slot="scope">{{ scope.row.name }}</template></el-table-column>
       <el-table-column align="center" label="设备标识" :width="100"><template v-slot="scope">{{ scope.row.uniqueDeviceIdentifier }}</template></el-table-column>
      <el-table-column align="center" label="设备类型" :width="80"><template v-slot="scope">{{ scope.row.type | filterDiveType}}</template></el-table-column>
      <el-table-column align="center" label="设备型号" :width="80"><template v-slot="scope">{{ scope.row.model }}</template></el-table-column>
      <el-table-column align="center" label="设备厂商" :width="80"><template v-slot="scope">{{ scope.row.manufacturer }}</template></el-table-column>
      <el-table-column align="center" label="设备SN" :width="80"><template v-slot="scope">{{ scope.row.sn }}</template></el-table-column>
      <el-table-column align="center" label="设备版本" :width="80"><template v-slot="scope">{{ scope.row.firmwareVersion }}</template></el-table-column>
      <el-table-column align="center" label="设备位置" :width="100"><template v-slot="scope"> {{ scope.row. location }} </template></el-table-column>
      <!-- <el-table-column align="center" label="已下发人数" :width="115" sortable><template v-slot="scope"> {{ scope.row.name }} </template></el-table-column> -->
      <!-- <el-table-column align="center" label="方向" :width="100"> <template v-slot="scope"> {{ scope.row.description }} </template> </el-table-column> -->
      <el-table-column align="center" label="在线状态" :width="140"><template v-slot="scope">
        <!-- <i class="dot_red"></i> -->
        <span :class="scope.row.online ? 'green' : 'red'">{{ scope.row.online | filterOnline}}</span></template> </el-table-column>
      <el-table-column align="center" label="设备状态" :width="140"><template v-slot="scope"><span>{{ scope.row.state | filterDeivceState(scope.row)}}</span></template> </el-table-column>
      <el-table-column align="center" label="设备信息" :width="140"><template v-slot="scope">{{ scope.row.information }} </template> </el-table-column>
      <el-table-column align="center" label="创建时间" :width="150"><template v-slot="scope">{{scope.row.createTime | filterDate }}</template> </el-table-column>

      <el-table-column align="center" label="操作" :width="300" fixed="right">
        <template v-slot="scope">
         <div v-show="scope.row.status !== 'removed' ? true : false">
            <el-button class="radius_45" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" ><i class="el-icon-edit"></i><span>编辑</span></el-button >
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该设备？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 ml10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
          </el-popconfirm>
            <el-dropdown class="ml10" @command="handleCommand">
               <el-button type="primary" class="radius_45" size="mini">更多操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item v-for="(command, index) of commandes" :key="index" :command="command.id" @click.prevent.native="hanlecommandData(scope.row)">{{ command.value }}</el-dropdown-item>
               </el-dropdown-menu>
              </el-dropdown>
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
     :total="pagingQuery['total']">
  </el-pagination>

  <el-dialog title="新增设备" :visible.sync="addDeviceVisible" width="1000px">
     <div v-loading="addSave_loading" element-loading-text="保存中.." element-loading-spinner="el-icon-loading">
      <el-form :model="addDeviceData" :inline="true" :rules="addDeviceDataRule" ref="addDeviceData">
        <!-- <el-form-item label="创建人："><el-input v-model.trim="addDeviceData.username" disabled> clearable</el-input></el-form-item> -->
        <el-form-item label="设备名称：" prop="name"><el-input v-model.trim="addDeviceData.name" placeholder="输入设备名称" clearable></el-input></el-form-item>
         <el-form-item label="设备类型"><el-select v-model="addDeviceData.type"><el-option v-for="(deviceType, index) of deviceTypes" :key="index" :label="deviceType.value" :value="deviceType.id"></el-option></el-select></el-form-item>
        <el-form-item label="设备型号：" prop="model"><el-input v-model.trim="addDeviceData.model" placeholder="输入设备型号" clearable></el-input></el-form-item>
        <el-form-item label="设备厂商：" prop="manufacturer"><el-input v-model.trim="addDeviceData.manufacturer" placeholder="输入设备厂商" clearable></el-input></el-form-item>
        <el-form-item label="设备SN：" prop="sn"><el-input v-model.trim="addDeviceData.sn" placeholder="输入设备SN" clearable></el-input></el-form-item>
        <el-form-item label="设备位置：" prop="location"><el-input v-model.trim="addDeviceData.location" placeholder="输入设备位" clearable></el-input></el-form-item>
        <el-form-item label="描述：" prop="description"><el-input class="w400" v-model.trim="addDeviceData.description" placeholder="输入设备位" clearable></el-input></el-form-item>
        <!-- <el-form-item label="设备版本：" ><el-input v-model.trim="roles.roleName" placeholder="输入工号搜索" > clearable</el-input></el-form-item> -->
        <!-- <el-form-item label="方向："><el-select class="w100" v-model="value" placeholder="请选择"><el-option>进</el-option><el-option>出</el-option></el-select></el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer t_right">
      <el-button @click="resetAddDeviceData('addDeviceData')">重 置</el-button>
      <el-button @click="addDeviceVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveAddDeviceData('addDeviceData')">保 存</el-button>
    </div>
     </div>
  </el-dialog>

    <el-dialog title="编辑设备" :visible.sync="editDeviceVisible" width="1000px">
     <div v-loading="editSave_loading" element-loading-text="保存中.." element-loading-spinner="el-icon-loading">
      <el-form :model="editDeviceData" :inline="true" :rules="addDeviceDataRule" ref="editDeviceData">
        <!-- <el-form-item label="创建人："><el-input v-model.trim="editDeviceData.username" disabled> clearable</el-input></el-form-item> -->
        <el-form-item label="设备名称：" prop="name"><el-input v-model.trim="editDeviceData.name" placeholder="输入设备名称" clearable></el-input></el-form-item>
        <el-form-item label="设备型号：" prop="model"><el-input v-model.trim="editDeviceData.model" placeholder="输入设备型号" clearable></el-input></el-form-item>
        <el-form-item label="设备厂商：" prop="manufacturer"><el-input v-model.trim="editDeviceData.manufacturer" placeholder="输入设备厂商" clearable></el-input></el-form-item>
        <el-form-item label="设备SN：" prop="sn"><el-input v-model.trim="editDeviceData.sn" placeholder="输入设备SN" clearable></el-input></el-form-item>
        <el-form-item label="设备位置：" prop="location"><el-input v-model.trim="editDeviceData.location" placeholder="输入设备位" clearable></el-input></el-form-item>
        <el-form-item label="设备密钥：" prop="secret"><el-input v-model.trim="editDeviceData.secret" placeholder="输入设备位" clearable></el-input></el-form-item>
        <el-form-item label="描述：" prop="description"><el-input class="w400" v-model.trim="editDeviceData.description" placeholder="输入设备位" clearable></el-input></el-form-item>
        <!-- <el-form-item label="设备版本：" ><el-input v-model.trim="roles.roleName" placeholder="输入工号搜索" > clearable</el-input></el-form-item> -->
        <!-- <el-form-item label="方向："><el-select class="w100" v-model="value" placeholder="请选择"><el-option>进</el-option><el-option>出</el-option></el-select></el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer t_right">
      <el-button @click="cancelEdit('editDeviceData')">取 消</el-button>
      <el-button type="primary" @click="saveEditDeviceData('editDeviceData')">保 存</el-button>
    </div>
     </div>
  </el-dialog>

  </div>
</template>
<script>
import { 
  addDevice,  // 增设备
  editDevice, // 编辑设备
  searchDevice,  // 查设备列表
  // getDeviceDetails, // 查设备详情
  deleteDevice,  // 删设备
  instructDevice // 操作设备
 } from '@/api/device-manage'
import { pickerOptions } from '@/utils'
import { getDeviceStates, getDeviceISOnline, getDeviceTypes } from '@/utils/business'
import moment from "moment"
// import { filterDate } from '@/filters'
const notNull = [{required: true, message:'不能为空', trigger: "blur" }]
let vm

export default {
  name: "deviceList",
  data() {
    return {
      table_loading: false,
      addSave_loading: false,
      editSave_loading: false,
      addDeviceVisible: false,
      editDeviceVisible: false,
      value: 1,
      pickerOptions: pickerOptions(),
      deviceTypes: getDeviceTypes(),
      deviceISOnline: getDeviceISOnline(),
      deviceStates: getDeviceStates().search,
      multipleSelection: [], //多选删除
      date: null,
      states: null,
      instructDeviceId: null,
      offLineDeviceNum: 0,
      lineDeviceNum: 0,
      outDeviceNum: 0,


// 新增设备
      addDeviceData: {
       name: '',
       type: getDeviceTypes()[0].id,
       model: '',
       manufacturer: '',
       sn: '',
       location: '',
       description: '',
      //  typeValue: deviceType
       },
       
 // 编辑设备
      editDeviceData: {
       name: null,
       model: null,
       manufacturer: null,
       sn: null,
       location: null,
       description: null,
       secret:null,
       },
       editParam: null, // 编辑参数
       
// 设备查询/分页参数
     pagingQuery: {
       name: null,
       type: null,
       online: null,
       states: null,
       status: null,
       model: null,
       manufacturer: null,
       sn: null,
       location: null,
       description: null,
       date: null,
       createTimeFrom: null,
       createTimeTo: null,
       
       current: 1, 
       size: 20,
       total: null,
      },

// 设备列表
      deviceList: [],

// 设备提交验证
    addDeviceDataRule: {
       name: notNull,
       model: notNull,
       manufacturer: notNull,
       sn: notNull,
       location: notNull,
       secret: notNull
    },

// 设备操作字段
    commandes: getDeviceStates().operate
  }
  },
  filters: {
    filterDiveType(value) {
      return value === vm.deviceTypes[0].id ? vm.deviceTypes[0].value : vm.deviceTypes[1].value
    },
    filterOnline(value) {
      return value == vm.deviceISOnline[0].id ? vm.deviceISOnline[0].value : vm.deviceISOnline[1].value
    },
    filterDeivceState(value, row) {
      if(row.status === 'removed') {
        return '已删除'
      } else {
        for(let i = 0; i < vm.deviceStates.length; i++) {
        if(vm.deviceStates[i].id === value) {
          return vm.deviceStates[i].value
        }
      }
      }
    },
  },
  computed: {
     deviceNum(value) {
     return this.pagingQuery.total
    }
  },
  watch: {
    editDeviceVisible:{
      handler(val) {
       !val ? this.$refs['editDeviceData'].resetFields() : null
      }
    }
  },
  methods: {
// 新增设备
    saveAddDeviceData(el) {
       this.$refs[el].validate((valid) => {
          if (valid) {
              this.addSave_loading = true
            addDevice(this.addDeviceData).then((res) => {
             if(res.code === 0 && res.data && res.data != 0) {
               this.$message.success(res.msg)
               this.resetAddDeviceData('addDeviceData')
               this.addSave_loading = this.addDeviceVisible = false
               this.getDeviceList()
             } else { 
               this.$message.error(res.msg)
               this.addSave_loading = false
             }
            })
         }})
    },
    
// 编辑设备
    saveEditDeviceData(el) {
       this.$refs[el].validate((valid) => {
          if (valid) {
            this.editSave_loading = true
            editDevice(this.editParam ? this.editParam : null, this.editDeviceData).then((res) => {
             if(res.code === 0) {
               this.editSave_loading = this.editDeviceVisible = false
               this.$message.success(`设备 ${ this.editDeviceData.name }信息修改成功`)
               this.getDeviceList()
             } else {
               this.$message.error(res.msg)
               this.editSave_loading = false
             }
            })
         }})
    },
    handleEdit(x, y) {
      this.editParam = y.id
      this.editDeviceVisible = true
      this.editDeviceData = JSON.parse(JSON.stringify(y))
    },
    
// 取消编辑
    cancelEdit(e) {
      this.editDeviceVisible = false
      this.editDeviceData = []
       this.$refs[e].resetFields()
      this.editDeviceData = this.addDeviceData
    },
    
// 查设备列表
    onSearch(){
      this.pagingQuery.current = 1
      this.getDeviceList()
    },
    getDeviceList() {
      let params = this.pagingQuery
      this.table_loading = true
      searchDevice(this.pagingQuery).then((res) => {
        if(res.code === 0 && res.data) {
          this.deviceList = []
             this.table_loading = false
           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total
           if(res.data.records.length !== 0) {
             this.deviceList = res.data.records

// 在线/离线/故障设备个数
          searchDevice({size: params.total}).then((res1) => {
            var [onlineArr, offLineArr, outArr] = [[], [], []]
            if(res1.code == 0 && res1.data) {
             res1.data.records.map((item, index) => {
            if(item.online == false) {
              offLineArr.push(item.online)
              this.offLineDeviceNum = offLineArr.length
            } 
            if(item.online == true) {
              onlineArr.push(item.online)
              this.lineDeviceNum = onlineArr.length
            }
            if(item.value == 'out_of_order') 
              outArr.push(item.state)
              this.outDeviceNum = outArr.length
          })
          }
        })
           } 
        } else {
              this.$message.error(res.msg)
               this.table_loading = false
            }
      })
    },
    changeStates() {
      let p = this.pagingQuery
      if(this['states'] === 'statuses:removed') {
        let i = this['states'].indexOf(':')
        p['statuses'] = this['states'].substr(i + 1)
        p['states'] = null
      } else {
        p['states'] = this['states']
        p['statuses'] = null
      }
    },
    changeDate() {
      let date = this.date,
          _p = this.pagingQuery
      date && date.length
        ? ((_p.createTimeFrom = moment(date[0]).format("YYYY-MM-DD")),
          (_p.createTimeTo = moment(date[1]).format("YYYY-MM-DD")))
        :  _p.createTimeFrom = _p.createTimeTo = null
    },

// 单删设备
    handleDelete(x, y) {
      deleteDevice(y.id).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this.getDeviceList()
        } else {
          this.$message.warning(res.msg)
        }
      })
    },

// 批量删设备
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选设备, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              deleteDevice(this.multipleSelection[i].id).then((res) => {
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
        this.$message.warning('请在列表中勾选要删除的设备')
      }
    },
    
// 操作设备
     handleCommand(command) {
       setTimeout(()=> {
         instructDevice(command, {deviceIds: this.instructDeviceId}).then((res) => {
       res.code === 0 ? this.$message.success(res.msg) : this.$message.error(res.msg, 5000)
      })
       })
      },
    hanlecommandData(x) {
        this.instructDeviceId = x.id
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getDeviceList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getDeviceList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
   refreshPagingQuery() {
      this.pagingQuery = {}
      this.date = null
      this.onSearch()
    },
    resetAddDeviceData(e) { 
    this.$refs[e].resetFields()
   },
   
  },
  created() {
    vm = this
    this.onSearch()
  },
}
</script>