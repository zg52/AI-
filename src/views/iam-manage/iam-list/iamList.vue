<!--
 * @Author: long
 * @Date: 2021-05-17 10:18:44
 * @LastEditTime: 2021-08-27 11:29:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\iam-manage\iamList\iamList.vue
-->
<style scoped>

</style>
 
<template>
    <div class="app_container">
      <el-row>
        <el-col :span="24">
          <div class="tableList bg_fff p24 radius_10">
            <div class="table_t flexbetween item_center">
              <h4 class="table_tit_txt">IAM用户列表</h4>
              <div>
                 <el-form :model="pagingQuery" :inline="true" class="flexbetween">
                <el-form-item label="用户名："><el-input v-model.trim="pagingQuery.userName" placeholder="输入用户名自动搜索" clearable></el-input></el-form-item>
                 <div><el-button type="primary" @click="onSearch"><i class="el-icon-search"></i> 搜索</el-button></div>
              <div class="ml10">
                <el-button type="primary" @click="addUser"> <i class="el-icon-plus"></i> 新增IAM用户</el-button>
              </div>
            </el-form>
              </div>
            </div>
            <el-table
              class="device_list"
              :data="tableList"
              max-height="650"
              :loading="table_loading"
              element-loading-spinner="el-icon-loading"
              ref="multipleTable"
              style="width: 100%"
            >
              <el-table-column label="序号" :width="60" align="center">
                <template v-slot="scope">{{ scope.$index + pagingQuery.size * (pagingQuery.current - 1) + 1 }}</template></el-table-column>
              <template slot="empty"><svg-icon class="empty" icon-class="empty" />暂无数据</template>
              <el-table-column label="用户名" prop="username" width="200"></el-table-column>
              <!-- <el-table-column label="密码" width="100">
                <template v-slot="v">
                <el-popconfirm
                       confirmButtonText="重置"
                       cancelButtonText="取消"
                       title="确定要重置该用户登录密码？"
                       @onConfirm="resetPassHandle(v.row)">
                 <span class="theme_col pointer" type="danger" slot="reference">重置</span></el-popconfirm>
                 </template>
               </el-table-column> -->
              <el-table-column label="角色"><template v-slot="v"><el-tag class="ml10" v-for="(name, index) of v.row.roles" :key="index" v-show="v.row.roles === null ? false : true">{{ name.roleName }}</el-tag></template></el-table-column>
              <el-table-column label="状态" width="100"><template v-slot="v"><i :class="v.row.status === 'disabled' ? 'dot_danger' : 'dot_success'"></i> <span class="pl5">{{ v.row.status | filterIamStatus}}</span></template></el-table-column>
              <el-table-column label="创建时间" width="200"><template v-slot="v">{{ v.row.createTime }}</template></el-table-column>
              <el-table-column label="操作" width="210">
                <template v-slot="v">
                  <div class="caozuo">
                    <span @click="editHandle(v.row)">编辑</span>
                    <span @click="toogleIamState(v.row)">{{ v.row.status === 'disabled' ? '启用' : '停用' }}</span>
                    <el-popconfirm
                       confirmButtonText="重置"
                       cancelButtonText="取消"
                       title="确定要重置该用户登录密码？"
                       @onConfirm="resetPassHandle(v.row)">
                  <span class="warning_col pointer" type="danger" slot="reference">重置密码</span></el-popconfirm>
                    <el-popconfirm
                       confirmButtonText="确认"
                       cancelButtonText="取消"
                       title="确定要删除该用户？"
                       @onConfirm="handleDelete(v.row)">
                   <span class="danger_col" type="danger" slot="reference">删除</span>
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
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      <AddEditiam :addEdit_visible="addEdit_visible" :edit="edit" :editList="editList" :getRoleNames="getRoleNames" @refreshTable="getTableList" @addEdit_hide="addEdit_hide"/>
  </div>
</template>
<script>
import AddEditiam from './components/AddEditiam'
import { iamList, changeIamState, delIam, resetPass } from '@/api/iam-manage/iam'
import { getRoleNameLis, getIamStatus, getIam_RoleName_id } from '@/utils/business'
import { copyTxtHandle } from '@/utils'
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
        current: 1,
        size: 30,
        total: null,
      },
      tableList: [],

      getRoleNames: {
        lis: [],
        defaultId: []
      },

      edit: false,
      editList: {},
      resetPass: '34322321'
    }
  },
  filters: {
    filterRoleName(value) {
      let name
     getRoleNameLis.forEach((val, index) => {
        if(val.id == value) {
          name = val.value
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
  computed: {
    userName() {
      return this.pagingQuery.userName
    }
  },
  watch: {
    userName() {
     this.onSearch()
    }
  },
  methods: {
    passTip(passworld) {
       this.$success({
        title: '已重置为初始密码：',
        mask: false,
        // icon: 'check-circle',
        closable: true,
        content: passworld,
        okText: '复制密码',
        cancelText: '取消',
        onOk(){
          copyTxtHandle(passworld, true, () => vm.$msg.success('复制成功'))
        }
      })
    },
   onSearch(){
      this.pagingQuery.current = 1
      this.getTableList()
    },
     getTableList() {
      let params = this.pagingQuery
      iamList(this.pagingQuery).then((res) => {
        if(res && res.data) {
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
      this.getIam_RoleName_id()
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
    toogleIamState(row) {
    changeIamState(row.id,{
       id: row.id,
       status: status(true)
     }).then(res => {
       res.data ? (this.$msg.success(`用户：${ row.username } 已${ status(false) }` ), this.getTableList()) : ''
     })
     function status(x) {
       return row.status === 'normal' ? x ? 'disabled' : '停用' : x ? 'normal' : '启用'
     }
    },
    resetPassHandle(row) {
      let passworld = ''
      resetPass(row.id, { id: row.id, password: getPass()}).then((res) => {
        if (res.code == 0 && res.data) {
          this.passTip(passworld)
          this.onSearch()
        } else {
          this.$msg.error(res.msg)
        }
      })

      function getPass() {
       for(let i = 0;i < 8; i++) {
          passworld += Math.floor(Math.random() * 10)
        }
        return passworld
      }
    },
    handleDelete(row) {
      delIam(row.id, { id: row.id }).then((res) => {
        if (res.code == 0 && res.data) {
          this.$msg.success(res.msg)
          this.onSearch()
        } else {
          this.$msg.error(res.msg)
        }
      })
    },
    editHandle(row) {
      this.$router.push({
        path: 'iamDetails',
        query: {
          id: row.id
        }
      })
    },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getTableList()
    },
  getIam_RoleName_id() {
    this.getRoleNames.defaultId = []
    getIam_RoleName_id().then(res => {
    this.getRoleNames.lis = res
    res.forEach(item => {
      if(item.roleName === 'IAM用户(默认)') {
        this.getRoleNames.defaultId.push(item.id)
      }
    })
})
    }
  },
  created() {
    vm = this
    this.onSearch()
    this.getIam_RoleName_id()
  },
}
</script>