<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-04-09 16:59:56
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

</style>
<template>
  <div class="app-container">
  <el-form :model="pagingQuery" :inline="true">
      <el-form-item label="创建人"><el-input v-model.trim="pagingQuery.operator" clearable></el-input></el-form-item>
      <el-form-item label="来访人姓名"><el-input v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
      <el-form-item label="性别："><el-select class="w160" v-model="pagingQuery.gender" clearable><el-option v-for="(gender, index) of genders" :key="index" :label="gender.value" :value="gender.id"></el-option></el-select></el-form-item>
      <el-form-item label="所在公司"><el-input v-model.trim="pagingQuery.visitorCompany" clearable></el-input></el-form-item>
      <el-form-item label="电话"><el-input v-model.trim="pagingQuery.phone" clearable></el-input></el-form-item>
      <el-form-item label="住址"><el-input v-model.trim="pagingQuery.address" clearable></el-input></el-form-item>
      <el-form-item label="身份证号"><el-input v-model.trim="pagingQuery.idNum" clearable></el-input></el-form-item>
      <el-form-item label="被访人姓名"><el-input v-model.trim="pagingQuery.intervieweeName" clearable></el-input></el-form-item> 
      <el-form-item label="被访人电话"><el-input v-model.trim="pagingQuery.intervieweePhone" clearable></el-input></el-form-item>
      <el-form-item label="来访事由"><el-input v-model.trim="pagingQuery.reason" clearable></el-input></el-form-item>
      <el-form-item label="来访时间">
        <el-date-picker
          v-model="date1"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="来访日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          @change="changeDate1">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
           v-model="date2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions1"
          @change="changeDate2">
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="授权状态">
        <el-select v-model="pagingQuery.status" clearable><el-option v-for="(authorized, index) of visitorAuthorized" :key="index" :label="authorized.value" :value="authorized.id"></el-option></el-select>
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
      <router-link to="/people-manage/visitor-manage/visitor-add/visitorAdd" class="ml10"><el-button type="primary"><svg-icon icon-class="edit" /> 新增访客</el-button></router-link>
    </el-form>
    
    <el-table :data="tableData" class="people_list" border max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column width="50" type="selection" fixed ></el-table-column>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>

<!-- 详情 -->
       <el-table-column type="expand" label="详情" :width="60">
           <template slot-scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
              <div class="fl mr25 imgBox"><el-form-item><div><img :src="`${ getImgUrl + props.row.imageId }`" alt="" width="120"></div></el-form-item></div>
               <el-form-item label="姓名："><span>{{ props.row.name }}</span></el-form-item>
               <el-form-item label="性别："><span>{{ props.row.gender | filterGenter }} </span></el-form-item>
                 <el-form-item label="授权状态："><span>{{ props.row.status | filterVisitorAuthorized }} </span></el-form-item>
               <el-form-item label="头像类型："><span>{{ props.row.faceType | filterFaceType }} </span></span></el-form-item>
                 <el-form-item label="所在公司："> <span>{{ props.row.visitorCompany }} </span></el-form-item>
                 <el-form-item label="电话："><span>{{ props.row.phone }} </span></el-form-item>
                   <el-form-item label="邮箱："><span>{{ props.row.email }} </span></el-form-item>
                   <el-form-item label="住址："><span>{{ props.row.address }} </span></el-form-item>
                 <el-form-item label="身份证号："><span>{{ props.row.idNum }} </span></el-form-item>
                   <el-form-item label="来访事由："><span>{{ props.row.reason }} </span></el-form-item>
                 <el-form-item label="被访人姓名："><span>{{ props.row.intervieweeName }} </span></el-form-item>
                  <el-form-item label="被访人电话："><span>{{ props.row.intervieweePhone }} </span></el-form-item>
                 <el-form-item label="创建时间："><span>{{ props.row.createTime }} </span></el-form-item>
                 <el-form-item label="修改时间："><span>{{ props.row.lastUpdateTime }} </span></el-form-item>
                  <!-- <el-form-item label="状态："><span>{{ props.row.isDelete == 0 ? '正常' : '已删除' }}</span> </el-form-item> -->
                 <el-form-item label="备注："><span>{{ props.row.remark }}</span></el-form-item>
                <el-form-item label="创建人："><span>{{ props.row.operator }}</span></el-form-item>
                <el-form-item label="来访时间：" class="nowap"><span>{{ props.row.visitStartTime }} ~ {{ props.row.visitEndTime }}</span></el-form-item>
           </el-form>
           </template>
     </el-table-column>
      
      <el-table-column align="center" label="来访人姓名" width="100"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="来访人头像" width="95">
        <template v-slot="scope"><span v-show="scope.row.imageId ? false : true">无</span><img v-show="scope.row.imageId ? true : false" :src="`${ getImgUrl + scope.row.imageId}`" width="100%" /></template>
      </el-table-column>
     <el-table-column align="center" label="性别" width="50"> <template v-slot="scope">{{ scope.row.gender | filterGenter }} </template></el-table-column>
      <el-table-column align="center" label="所在公司" width="100"> <template v-slot="scope">{{ scope.row.visitorCompany }}</template></el-table-column>
      <el-table-column align="center" label="电话" width="108"><template v-slot="scope">{{ scope.row.phone }} </template></el-table-column>
        <el-table-column align="center" label="邮箱" width="115"><template v-slot="scope">{{ scope.row.email }} </template></el-table-column>
      <el-table-column align="center" label="身份证号" width="164"> <template v-slot="scope">{{ scope.row.idNum }} </template></el-table-column>
       <el-table-column align="center" label="被访人姓名" width="108"><template v-slot="scope">{{ scope.row.intervieweeName }} </template></el-table-column>
      <el-table-column align="center" label="被访人电话" width="108"><template v-slot="scope">{{ scope.row.intervieweePhone }} </template></el-table-column>
       <el-table-column align="center" label="来访事由" width="120"><template v-slot="scope">{{ scope.row.reason }} </template></el-table-column>
        <el-table-column align="center" label="来访时间" width="300"><template v-slot="scope">{{ scope.row.visitStartTime }} ~ {{ scope.row.visitEndTime }}</template></el-table-column>
       <!-- <el-table-column align="center" label="状态" width="60"> <template v-slot="scope">{{ scope.row.isDelete == 0 ? '正常' : '已删除' }}</template> </el-table-column> -->
      <el-table-column align="center" label="授权状态" width="80" fixed="right"><template v-slot="scope"><span :class="scope.row.status == 'auth' ? 'green' : ''">{{ scope.row.status | filterVisitorAuthorized }}</span></template></el-table-column>
      <el-table-column align="center" label="操作" width="190" fixed="right">
        <template v-slot="scope">
          <el-switch v-show="expireHandle(scope.row)" class="mll5" size="mini" active-text="授权" :inactive-text="statusText(scope.row)" v-model="isAuthorized[scope.$index].status" @change="changeAuthorized(scope.$index, scope.row)"></el-switch>
          <el-button v-show="expireHandle(scope.row)" class="radius_45 mr10" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" ><i class="el-icon-edit"></i><span>编辑</span></el-button>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            title="确定要删除该访客吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button  class="radius_45 ml0 mt10" size="mini" type="danger" slot="reference"><i class="el-icon-delete"></i><span>删除</span></el-button>
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
           title="修改访客信息"
           :visible.sync="dialogVisible1"
           width="80%"
           top="0"
          >
          <VisitorFromHandle v-if="dialogVisible1" :btn_el="btn_el" :addVisitorForm="addVisitorForm" @cacelEdit="cacelEditHandle" />
      </el-dialog>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { visitorList, deleteVisitor, downloadVisitor, visitorState } from '@/api/people-manage/visitorManage'
import { imgUrl, downVisitorXls } from '@/api/public'
import { pickerOptions } from '@/utils'
import { getGender, getFaceType, getVisitorAuthorized} from '@/utils/business'
import VisitorFromHandle from '../components/VisitorFromHandle'
import moment from 'moment'

let vm

export default {
  name: 'visitorList',
  components: { VisitorFromHandle },
  data() {
    return {
      table_loading:false,
      dialogVisible1: false,
      value: '华捷艾米',
      genders: getGender(),
      isAuthorized: [],
      faceTypes: getFaceType(),
      visitorAuthorized: getVisitorAuthorized,
      pickerOptions: pickerOptions(true),
      pickerOptions1: pickerOptions(),
      date1: null,
      date2: null,
      multipleSelection: [],
      getImgUrl: imgUrl(),
      
      pagingQuery: {
        operator: null,
        name: null,
        gender: null,
        phone: null,
        address: null,
        idNum: null,
        intervieweeName: null,
        intervieweePhone: null,
        visitorCompany: null,
        createStartTime:null,
        createEndTime: null,
        visitStartTime: null,
        visitEndTime: null,
        isDelete: null,
        
        current: 1, 
        size: 20,
        total: null,
      },
      tableData: [],

// 编辑参数
      addVisitorForm: {
          //  id: null,
           operator: this.$store.getters.username,
          //  name: 'null',
          //  gender: '1',
          //  phone: '15652970356',
          //  address: 'w',
          //  idNum: '622826199811192711',
          //  mail: '2@163.com',
          //  employeeNum: '32',
          //  companyId: '1',
          //  img_type: '1',
           files: null
         },
         btn_el: ['edit']
    }
  },
  filters: {
    splice_t(value) {
    return value.replace('T', ' ')
    },
  },
  computed: {
    ...mapGetters([
      'username'
    ]),
  },
  methods: {
    getVisitorList() {
      let params = this.pagingQuery
      this.table_loading = true
      visitorList(this.pagingQuery).then((res) => {
       if(res.code === 0) {
         this.tableData = []
         this.table_loading = false
        params.size = res.data.size
        params.current = res.data.current
        params.total = res.data.total
        this.tableData = res.data.records
      
//  转换state为Boolean
        let satatusArr = []
        this.tableData.map((x, index) => {
          satatusArr.push({
            status: x.status == 'refuse' ||  x.status == 'unAuth' ? false : true
          })
        })
        this.isAuthorized = satatusArr
      this.tableData = this.tableData
       } else {
          this.$message.error(res.msg)
          this.table_loading = false
        }
      })
    },
    onSearch() {
      let params = this.pagingQuery
      params.current = 1
      this.getVisitorList()
    },
    handleEdit(x, y) {
      this.dialogVisible1 = true
      this.addVisitorForm = y

// 新增访客字段和列表字段不一所以：
      this.addVisitorForm.visitorName = y.intervieweeName
      this.addVisitorForm.visitorPhone = y.intervieweePhone
    },
     handleDelete(x, y) {
      deleteVisitor(y.id).then((res) => {
        if (res.code == 0 && res.data) {
          this.$message.success({message: res.msg})
          this.getVisitorList()
        } else {
          this.$message.warning({message: res.msg})
        }
      })
    },
    onDeletes() {
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选访客, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
       }).then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              deleteVisitor(this.multipleSelection[i].id).then((res) => {
                if (res.code == 0 && res.data) {
                  if(i + 1 >= this.multipleSelection.length) {
                    this.$message.success(res.msg)
                    this.onSearch()
                  }
                }
              })
            }
          }).catch(() => {
             this.$message.info('已取消删除')
             this.$refs.multipleTable.clearSelection()
          })
      } else {
        this.$message.warning('请在列表中勾选要删除的访客')
      }
    },
    onExport() {
      let p = this.pagingQuery
      downloadVisitor(p.current, p.size).then(res => {
        if(res) {
          downVisitorXls(p.current, p.size)
        }
      })
    },
    
// 更改访客授权状态
    changeAuthorized(x ,y) {
      function state() {
        // if(y.status == 'unAuth') {
        //   return 'refuse'
        // } else {
          return y.status == 'auth' ? 'refuse' : 'auth'
        // }
      }
    visitorState(
          y.id,
          {
            status:state(),
            id: y.id
          }
      ).then((res) => {
        if (res.code == 0) {
          this.$message.success({message: res.msg})
          this.getVisitorList()
        } else {
          this.$message.error({message: res.msg})
        }
      })
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
  changeDate2() {
    this.changeDate('date2', 'createStartTime', 'createEndTime', 'YYYY-MM-DD')
  },
   cacelEditHandle() {
      this.getVisitorList()
      this.dialogVisible1 = false
    },
    statusText(row) {
     let txt = null
     switch(row.status) {
        case 'unAuth' : txt = '未授权';break;
        case 'refuse' : txt = '拒绝';break;
        default : txt = '拒绝'
      }
      return txt
 
    },
    expireHandle(row) {
     return row.status === 'expire' ? false : true
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
