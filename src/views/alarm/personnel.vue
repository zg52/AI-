<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-01-20 10:56:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\views\door-manage\people-manage\staff-manage\staff-list\index.vue
-->
<style lang="scss" scoped>
.people_list {
  // margin-top: 24px;
}
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
   .app-container1 {
       padding-top: 6px;
   }
  
</style>
<template>
  <div class="app-container">
    <el-form :model="roles" :inline="true">
 <el-form-item label="设备ID">
        <el-select v-model="value" placeholder="请选择">
          <el-option>
          </el-option> </el-select
      ></el-form-item>
 <el-form-item label="告警事件">
        <el-select v-model="value" placeholder="请选择">
          <el-option>体温超标</el-option> 
          <el-option>未知人员</el-option> 
          </el-select
      ></el-form-item>
      <el-form-item label="设备位置"
        ><el-input
          v-model.trim="roles.roleName"
          placeholder="输入姓名搜索"
        ></el-input
      ></el-form-item>

       <el-form-item label="告警时间">
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
    </el-form>
  <div class="lis_tit"><i></i> <span>员工告警列表</span></div>
 
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
      <el-table-column align="center" label="员工姓名" width="80">  
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
     <el-table-column align="center" label="告警信息" width="140">
        <template> <i class="dot_red"></i> 体温超标 -       
            40℃ </template>
      </el-table-column>
      <el-table-column align="center" label="已注册人脸" width="140">
        <template>
          <img src="../../assets/image/1.png" alt="" width="140" />
        </template>
      </el-table-column>
    <el-form-item label="性别">  <el-select class="w100" v-model="value" placeholder="请选择">
          <el-option
          >
          </el-option> </el-select></el-form-item>
      <el-table-column align="center" label="部门" width="100">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号" width="80">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工号" width="80">
        <template slot-scope="scope">
          {{ scope.row.dfs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
         <el-table-column align="center" label="住址" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" width="108">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="职务" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
     <el-table-column align="center" label="门禁卡" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="IC卡" width="108">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入职时间" width="108">
        <template slot-scope="scope">
          {{ scope.row.entryTime }}
        </template>
      </el-table-column>
            <el-table-column align="center" label="离职时间" width="108">
        <template slot-scope="scope">
          {{ scope.row.entryTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.updataTime }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="状态" width="140">
        <template>          
            在职 </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template> fff </template>
      </el-table-column>
     <el-table-column align="center" label="创建人">
        <template> fff </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="90" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="radius_45 mt10"
            type="danger"
            size="mini"
            ><i class="el-icon-delete"></i><span>删除</span></el-button
          ></template
        >
      </el-table-column>
    </el-table>
    <div class="lis_tit"><i></i> <span>未知人员告警列表</span></div>
 
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
 <el-table-column align="center" label="告警信息" width="140">
        <template> <i class="dot_red"></i>          
            未知人员 </template>
      </el-table-column>
      <el-table-column align="center" label="抓拍的人脸" width="140">
        <template>
          <img src="../../assets/image/1.png" alt="" width="140" />
        </template>
      </el-table-column>
 
      <el-table-column align="center" label="操作" width="90">
        <template>
          <el-button
            class="radius_45 mt10"
            type="danger"
            size="mini"
            ><i class="el-icon-delete"></i><span>删除</span></el-button
          ></template
        >
      </el-table-column>
    </el-table>
        <div class="lis_tit"><i></i> <span>访客告警列表</span></div>
 
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
 <el-table-column align="center" label="告警信息" width="140">
        <template> <i class="dot_red"></i>          
            未知人员 </template>
      </el-table-column>
      <el-table-column align="center" label="抓拍的人脸" width="140">
        <template>
          <img src="../../assets/image/1.png" alt="" width="140" />
        </template>
      </el-table-column>
 
      <el-table-column align="center" label="操作" width="90">
        <template>
          <el-button
            class="radius_45 mt10"
            type="danger"
            size="mini"
            ><i class="el-icon-delete"></i><span>删除</span></el-button
          ></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
         options: [
             {
          label: '设备告警',
          children: [
              {
               label: '失联',
             },
              {
               label: '损坏',
             }
          ],
         },
          {
          label: '人员告警',
          children: [
              {
               label: '体温超标',
             },
              {
               label: '未知人员',
             }
          ],
         },
         ],
      userFormVisible:true,
      value: 1,
      pickerOptions: [],
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
