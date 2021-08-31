<!--
 * @Author: long
 * @Date: 2021-08-06 19:12:43
 * @LastEditTime: 2021-08-31 12:13:57
 * @LastEditors: Please set LastEditors
 * @Description: 角色列表
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\iam-manage\iam-role\iamRole.vue
-->
<style lang="less" scoped>
</style>
<template>
  <div class="app_container">
    <div class="box_style">
     <div class="flexbetween pb25"><span class="table_tit_txt">角色列表</span> 
     <div><a-button type="primary" class="mr10" @click="getTableList">刷新</a-button><a-button v-permission="['root']" type="primary" @click="goAddRole"><a-icon type="plus" /> 新增角色</a-button></div>
     </div>
      <a-table
        :columns="columns"
        :scroll="{ y: 500 }"
        :dataSource="tableData"
        :loading="loading"
        :rowKey="(tableDatas) => tableDatas.id"
        :pagination="paginationHandle"
      >
      <span slot="roleType" slot-scope="text">{{ text | filterRoleType }}</span>
      <div slot="action" slot-scope="text, row">
       <span class="theme_col pointer pr10" @click="goEdit(row)" v-show="row.roleType !== 'default'">修改</span>
       <span class="theme_col pointer pr10" @click="goRoleDetails(row)">查看</span> 
        <a-popconfirm placement="bottom" v-show="row.roleType !== 'default'" ok-text="删除" cancel-text="取消" @confirm="confirm(row)">
        <template slot="title">
          <p>确认删除此角色吗？</p>
        </template>
        <span class="pointer danger_col">删除</span>
      </a-popconfirm>
      </div>
      </a-table>
      <!-- <a-pagination
        right
        show-quick-jumper
        hideOnSinglePage
        showSizeChanger
        :default-current="pagingQuery['current']"
        :defaultPageSize="pagingQuery['size']"
        :total="pagingQuery['total']"
        :page-size-options="['10', '20', '40', '60', '80']"
        @change="handleCurrentChange"
        @showSizeChange="handleSizeChange"
      /> -->
    </div>
  </div>
</template>
<script>
import { roleList, delRole } from "@/api/iam-manage/role"
export default {
  data() {
    return {
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) =>
            `${(this.paginationHandle.defaultCurrent - 1) * this.paginationHandle.defaultPageSize + index + 1}`,
        },
        { title: "角色", dataIndex: "roleName" },
        { title: "类型", dataIndex: "roleType", scopedSlots: { customRender: 'roleType' }},
        { title: "备注", dataIndex: "roleDescribe" },
        { title: "创建时间", dataIndex: "createTime" },
        { title: "操作", dataIndex: "action", width: 140, scopedSlots: { customRender: 'action' }}
      ],
      tableData: [],
      loading: true,
      paginationHandle: {
        defaultCurrent: 1,
        defaultPageSize: 20,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["20", "30", "40", "50", '60', '70'],
        showTotal: (total) => `共 ${total} 条`,
        onShowSizeChange: (current, pageSize) => {
          this.paginationHandle.defaultCurrent = 1
          this.paginationHandle.defaultPageSize = pageSize
          this.getTableList()
        },
        onChange: (current, size) => {
          this.paginationHandle.defaultCurrent = current
          this.paginationHandle.defaultPageSize = size
          this.getTableList()
        },
      },
      pagingQuery: {
        current: 1,
        size: 20,
        total: 20,
      },
    }
  },
  filters: {
      filterRoleType(val) {
          return val === 'default' ? '默认' : '自定义'
   },
 },
  methods: {
    getTableList() {
      this.loading = true
      roleList(this.pagingQuery).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.reverse()
        } else {
          this.$msg.error(res.msg)
        }
        this.loading = false
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
    confirm(row) {
      delRole(row.id).then(res => {
        if(res) {
         this.$msg.success(`角色：${ row.roleName }已删除`), this.getTableList()
        } else {
          this.$msg.success(res.msg)
        }
      })
    },
    goRoleDetails(row) {
      this.addRouterQuery('roleDetails', {
        id: row.id,
        roleName: row.roleName,
        roleDescribe: row.roleDescribe
        })
    },
     goEdit(row) {
      this.addRouterQuery('editRole', {
        id: row.id,
        roleName: row.roleName,
        roleDescribe: row.roleDescribe
        })
    },
    addRouterQuery(path, params) {
      this.$router.push({
        path: path,
        query: params
      })
    },
    goAddRole() {
      this.$router.push({path: 'addRole'})
    }
  },
  created() {
    this.getTableList()
  },
  mounted() {
     this.getTableList()
  }
};
</script>