<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-03-18 16:00:45
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
</style>
<template>
  <div class="app-container1">
    <el-form :model="roles" :inline="true">
 
  <el-form-item label="通行规则">  <el-select  v-model="value" placeholder="请选择">
          <el-option>
          </el-option> </el-select></el-form-item>
        <el-form-item label="通行方式">
       <div class="block">
  <el-cascader
    :options="options"
    :props="props"
    clearable></el-cascader>
 </div>
           </el-form-item>
     
      <el-form-item label="加入通行规则时间">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-button type="success" @click="onSearch" class="search">
        <i class="el-icon-search"></i><span>查询</span></el-button
      >
      <el-button type="warning" @click="onDelete">
        <i class="el-icon-delete"></i><span>批量删除</span></el-button
      >
      <el-button type="primary" @click="onExport">
        <svg-icon icon-class="excel" /> <span>导出</span></el-button
      >
      <el-button type="primary" @click="handleAddRole"
        ><svg-icon icon-class="edit" /> 新增通行人员</el-button>
    </el-form>
 <el-table :data="rolesList" border class="people_list" max-height="650">
      <el-table-column
        width="50"
        type="selection"
        fixed
      ></el-table-column>
      <el-table-column label="序列" width="60" align="center">
        <template>1</template></el-table-column
      >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="来访人姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
     <el-table-column align="center" label="来访人头像" width="140">
        <template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
        <el-table-column align="center" label="通行规则" width="140">
        <template>
         访客
        </template>
      </el-table-column>
      <el-table-column align="center" label="通行方式" width="140">
        <template>
         刷脸+刷卡
        </template>
      </el-table-column>
         <el-table-column align="center" label="加入通行规则时间" width="140">
        <template>
         刷脸+刷卡
        </template>
      </el-table-column>
            <el-table-column align="center" label="所在公司" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
            <el-table-column align="center" label="电话" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
         <el-table-column align="center" label="住址" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="身份证号" width="80">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="被访人姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="被访人电话" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="来访事由" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
 
     <el-table-column align="center" label="来访时间" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约时间" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.updataTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="140">
        <template>
           已授权
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template> fff </template>
      </el-table-column>
            <el-table-column align="center" label="访客创建人" width="100">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="90" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="radius_45 mt10"
            type="danger"
            size="mini"
            ><i class="el-icon-delete"></i><span>删除</span></el-button></template>
      </el-table-column>
    </el-table>

      <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagingParams['current']"
         :page-sizes="[10, 20, 40, 60, 80, 100, 200, 300, 400]"
         :page-size="pagingParams['size']"
         layout="total, sizes, prev, pager, next, jumper"
         :total="pagingParams['total']"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      value: 1,
      pickerOptions: [],
      props: { multiple: true },
      roles: [
        {
          roleName: "",
        },
      ],
      addUserForm: [
        
      ],
      rolesList: [
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
        },
        {
          name: "阿龙",
          description: "超管",
          createTime: "2020 01.12",
          updataTime: "2020 02.13",
          switch: 1,
        },
      ],
       options: [
         {
          label: '刷脸',
       },
       {
          label: '二维码',
       },
         {
          label: '刷卡',
          children: [
            {
            value: 'shejiyuanze',
            label: '门禁卡',
           },
           {
            value: 'shejiyuanze',
            label: 'IC卡',
           },
           {
            value: 'shejiyuanze',
            label: '身份证',
           }
          ]
       },
       ],
     pagingParams: {
        username: "",
        email: "",
        // appkey: "",
        // secret:"",
        createDateFrom: "",
        createDateTo: "",
        current: 1, //默认当前页数为1
        size: 10,
        total: 0,
        status: "",
        // type:'0',
      },
    };
  },
  methods: {
    onSearch(){

    },
    onDelete() {

    },
    onExport() {

    }
  },
  created() {
    addList({ username: "yang", password: "12345678" }).then(() => {});
  },
  mounted() {},
};
</script>
