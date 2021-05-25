<!--
 * @Author: your name
 * @Date: 2021-05-17 10:18:44
 * @LastEditTime: 2021-05-24 17:52:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\iam-manage\iamList\iamList.vue
-->
<style lang="scss" scoped>
.more {
  position: relative;
  top: -3px;
}
</style>
 
<template>
    <div class="app-container">
      <el-row>
        <el-col :span="24">
          <div class="search bg_fff p24_pb8 radius_10">
            <el-form :model="pagingQuery" :inline="true" class="flexbetween">
              <div>
                <el-form-item label="用户名："><el-input v-model.trim="pagingQuery.userName" clearable ></el-input></el-form-item>
                <el-form-item label="备注："><el-input v-model.trim="pagingQuery.note" clearable ></el-input></el-form-item>
              </div>
              <div>
                <el-button plain @click="refreshPagingQuery">清除</el-button>
                <el-button type="primary" @click="onSearch">搜索</el-button>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row class="mt24">
        <el-col :span="24">
          <div class="tableList bg_fff p24 radius_10">
            <div class="table_t flexbetween item_center">
              <h4>用户列表</h4>
              <div>
                <el-button type="primary" @click="addUser"> <i class="el-icon-plus"></i> 新增IAM用户</el-button>
                <el-button plain><span class="more">. . .</span></el-button>
              </div>
            </div>
            <el-table
              :data="tableList"
              class="device_list"
              max-height="650"
              v-loading="table_loading"
              element-loading-spinner="el-icon-loading"
              ref="multipleTable"
              style="width: 100%"
            >
              <el-table-column label="序号" :width="60" align="center"
                ><template v-slot="scope">{{
                  scope.$index +
                  pagingQuery.size * (pagingQuery.current - 1) +
                  1
                }}</template></el-table-column
              >
              <template slot="empty"
                ><svg-icon class="empty" icon-class="empty" />暂无数据</template
              >
              <el-table-column label="用户名"><template v-slot="v">{{ v.row.iamUser.username }}</template></el-table-column>
              <el-table-column label="手机"><template v-slot="v">{{ v.row.iamUser.contact }}</template></el-table-column>
              <el-table-column label="开通服务" width="300"><template v-slot="v"><el-tag class="ml10" v-for="(name, index) of v.row.products" :key="index" v-show="!(Number(name)) ? false : true">{{ name | filterProductName }}</el-tag></template></el-table-column>
              <el-table-column label="状态"><template v-slot="v"><span :class="IamStatusCls(v.row.iamUser.status)">{{ v.row.iamUser.status | filterIamStatus}}</span></template></el-table-column>
              <el-table-column label="创建时间"><template v-slot="v">{{ v.row.iamUser.createTime }}</template></el-table-column>
              <el-table-column label="修改时间"><template v-slot="v">{{ v.row.iamUser.lastUpdateTime }}</template></el-table-column>
              <el-table-column label="备注"><template v-slot="v">{{ v.row.iamUser.note }}</template></el-table-column>
              <el-table-column label="操作" width="140" fixed="right">
                <template v-slot="v">
                  <div class="caozuo">
                    <span>查看</span>
                    <span @click="editHandle(v.row)">编辑</span>
                    <div class="more">
                      <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link theme">...</span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a"
                            >重置密码</el-dropdown-item
                          >
                          <el-dropdown-item @click.native="cahangeIamState(v.row.iamUser)" command="b" v-show="v.row.iamUser.status === 'rejected' ? false : true"><span :class="v.row.iamUser.status !== 'disabled' ? 'danger' : ''">{{ v.row.iamUser.status === 'disabled' ? '启用' : '禁用' }}</span></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
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
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      
      <AddEditiam :addEdit_visible="addEdit_visible" :edit="edit" :editList="editList" @refreshTable="getTableList" @addEdit_hide="addEdit_hide"/>
  </div>
</template>
<script>
import AddEditiam from './components/AddEditiam'
import { iamList, changeIamState } from '@/api/iam-manage'
import { productLists, getIamStatus } from '@/utils/business'
let vm

export default {
    components: {
        AddEditiam
    },
  data() {
    return {
      table_loading: true,
      addEdit_visible: false,
      pagingQuery: {
        userName: null,
        note: null,
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
        size: 30,
        total: null,
      },
      tableList: [],

      edit: false,
      editList: {},
    }
  },
  filters: {
    filterProductName(value) {
      let name
     productLists.forEach((val, index) => {
        if(val.value == value) {
          name = val.label
        }
      })
      
      return name
    },
    filterIamStatus(value) {
      let status
      getIamStatus.forEach((val, index) => {
         if(val.key == value) {
          status = val.value
        }
      })
      return status
    }
  },
  methods: {
   onSearch(){
      this.pagingQuery.current = 1
      this.getTableList()
    },
     getTableList() {
      let params = this.pagingQuery
      iamList(this.pagingQuery).then((res) => {
        if(res.code === 0 && res.data) {
          this.tableList = []
           this.table_loading = false
           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total
           if(res.data.records.length !== 0) {
             this.tableList = res.data.records
           } 
        }
      })
    },
    addUser() {
      this.addEdit_visible = true
    },
    addEdit_hide() {
      this.addEdit_visible = false, this.edit = false
    },
    IamStatusCls(row) {
      if(row === 'normal') {
        return 'success'
      } else if(row === 'danger') {
        return 'dager'
      } else if(row === 'disabled') {
        return 'warning'
      } else {
        return ''
      }
    },
    editHandle(row) {
      this.addEdit_visible = true, this.edit = true, this.editList = row
      
    },
    handleCommand(command) {
      // this.$message("click on item " + command)
    },
    cahangeIamState(row) {
     changeIamState(row.id,{
       id: row.id,
       status: status(true)
     }).then(res => {
       res.data ? (this.$message.success(`用户：${ row.username } 已${ status(false) }` ), this.getTableList()) : ''
     })
     function status(x) {
       return row.status === 'normal' ? x ? 'disabled' : '禁用' : x ? 'normal' : '启用'
     }
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getTableList()
    },
    refreshPagingQuery() {
      this.pagingQuery.userName = this.pagingQuery.note = null
    }
  },
  created() {
    vm = this
    this.onSearch()
  },
};
</script>