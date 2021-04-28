<!--
 * @Author: your name
 * @Date: 2021-01-08 16:14:42
 * @LastEditTime: 2021-04-23 11:11:41
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

.el-steps--horizontal {
  width: 60%;
}
.import {
    margin-top:30px;
        width: 35%;
    .el-upload__tip {
      margin-top:20px;
    }
  }
  .importActive {
    margin-top:30px;
    .el-step {
      margin-bottom: 35px;
    }
   ::v-deep .el-step.is-vertical .el-step__line {
      height: 84px;
    }
  }
  .xia {
    margin-top: 50px;
  }
</style>
<template>
  <div class="app-container">
<el-page-header @back="goBack" content=""></el-page-header>
<!-- 批量导入 -->
<div>
  <el-steps :active="importActive" direction="vertical" class="importActive">
    <el-step v-for="(step, index) of steps" :key="index" :title="step.tit" :description="step.des"></el-step>
  </el-steps>
  <div class="import">
    <div class="zip" v-show="zipShow">
      <el-upload
        class="avatar-uploader"
        ref="uploadZip"
        :action="employeeZip"
        :file-list="zipList"
        :on-change="zipChange"
        :before-upload="beforeZipUpload"
        :on-error="zipError"
        :on-success="handleZipSuccess"
        >
      <el-button slot="trigger" size="small" type="primary"><svg-icon icon-class="zip" /> 上传 zip 文件</el-button>
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadZip">上传到服务器</el-button> -->

      <div slot="tip" class="el-upload__tip">zip文件列表：</div>
    </el-upload>
     </div>
     <div class="xls" v-show="excelShow">
      <el-upload
        class="importUpload"
        ref="uploadExcel"
        :action="employeeExcel"
        :before-upload="beforeExcelUpload"
        :on-error="excelError"
        :on-success="handleExcelSuccess"
        >
      <el-button slot="trigger" size="small" type="primary"><svg-icon icon-class="excel" /> 上传表格文件</el-button>
      <el-button size="small" @click="getEmployeeTemplate" class="ml10"><i class="el-icon-download"></i> 下载示例模板</el-button>
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadZip">上传到服务器</el-button> -->
      <div slot="tip" class="el-upload__tip">表格文件列表：</div>
    </el-upload>
     </div>
    <div class="xia">
      <el-button @click="searchFailRecodrs"><i class="el-icon-view"></i> 最近导入失败记录</el-button>
     <el-button :disabled="zipShow ? true : false" @click.prevent="zipExcelToggle">{{ this.zipShow ? '下一步' : '上一步' }}</el-button>
     <router-link to="/people-manage/staff-manage/staff-list/staffList" class="ml10"><el-button><i class="el-icon-view"></i> 查看员工列表</el-button></router-link>
    </div>
  </div>
 <el-button plain @click="open1" class="none"></el-button>
</div>

<!-- 导入出错的信息, 提出单个修改 -->
    <el-dialog
      title="员工导入失败记录"
      :visible.sync="dialogVisible_editStaff"
      width="76%"
      top="0"
     >
      <el-form :model="pagingQuery" :inline="true" ref="pagingQuery">
      <el-form-item label="员工姓名"><el-input v-model.trim="pagingQuery.name" clearable></el-input></el-form-item>
      <el-button type="success" @click="onSearch" class="search"> <i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button type="primary" @click="onExport"> <svg-icon icon-class="excel" /> <span>导出</span></el-button>
    </el-form>
    
    <el-table :data="tableData" class="people_list" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
      <el-table-column label="序列" width="60" align="center"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>

<!-- 详情 -->
       <el-table-column type="expand" label="详情" :width="60">
           <template slot-scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
               <div class="imgBox fl mr25"><el-form-item><div><img :src="`${ getImgUrl + props.row.imageId }`" alt="" width="120"></div></el-form-item></div>
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
                 <el-form-item label="备注："><span></span></el-form-item>
                <el-form-item label="创建人："><span>{{ props.row.operator }}</span></el-form-item>
           </el-form>
           </template>
     </el-table-column>

      <el-table-column align="center" label="员工姓名" width="80"> <template v-slot="scope"> {{ scope.row.name }} </template></el-table-column>
      <el-table-column align="center" label="已注册人脸" width="90">
        <template v-slot="scope"><img :src="`${ getImgUrl + scope.row.imageId}`" width="100%" /></template>
      </el-table-column>
     <el-table-column align="center" label="性别" width="50"> <template v-slot="scope"> {{ scope.row.gender | filterGenter }} </template></el-table-column>
      <el-table-column align="center" label="部门" width="100"> <template> 华捷艾米 </template></el-table-column>
      <el-table-column align="center" label="工号" width="180"> <template v-slot="scope">{{ scope.row.employeeNum }} </template></el-table-column>
      <el-table-column align="center" label="电话" width="108"> <template v-slot="scope">{{ scope.row.phone }} </template></el-table-column>
      <el-table-column align="center" label="邮箱" width="180"> <template v-slot="scope">{{ scope.row.mail }} </template></el-table-column>
      <el-table-column align="center" label="职务" width="108"> <template v-slot="scope">{{ scope.row.position }} </template></el-table-column>
      <el-table-column align="center" label="身份证号" width="auto"> <template v-slot="scope"> {{ scope.row.idNum }} </template></el-table-column>
      <el-table-column align="center" label="导入失败原因" width="200"> <template v-slot="scope"> <span class="red">{{ scope.row.errMsg }}</span> </template></el-table-column>
      <el-table-column align="left" label="操作" width="90" fixed="right">
        <template v-slot="scope">
          <el-button class="radius_45 mr10" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" ><i class="el-icon-edit"></i><span>修改</span></el-button>
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
           :modal="false"
          >
          <StaffFromHandle v-if="dialogVisible1" :btn_el="btn_el" :addStaffForm="addStaffForm" @cacelEdit="cacelEditHandle"/>
      </el-dialog>
      <div slot="footer">
        <el-button @click="dialogVisible_editStaff = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { downloadEmployee, employeeZip, employeeExcel, getEmployeeTemplate, getImportStatus, getReslut } from '@/api/people-manage/staffManage'
import {imgUrl, downEmployeeTemplate } from '@/api/public'
import { pickerOptions } from '@/utils'
import { getGender, getFaceType } from '@/utils/business'
import StaffFromHandle from '../components/StaffFromHandle'
import moment from 'moment'
 
let vm

export default {
  name: 'staff-list',
   components: { StaffFromHandle },
  data() {
    return {
// 批量导入
        zipList: [],
        import_dialogVisible: true,
        importActive: 1,
        steps: [
          {
            tit: '步骤一',
            des: '图片命名格式为姓名（张三.jpg/png/bmp），单个图片大小不能超过500KB，批量压缩图片为zip格式上传'
          },
          {
            tit: '步骤二',
            des: '上传员工信息表格文件（xls、excel、xlsx）'
          }
        ],
        employeeZip: employeeZip(),
        employeeExcel: employeeExcel(),
        zipShow: true,
        excelShow: false,

// --------------------------------------导入失败-------------------------
      expiredDateTip: false,
      table_loading:false,
      dialogVisible1: false,
      dialogVisible_editStaff: false,
      value: '华捷艾米',
      genders: getGender(),
      status: [],
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
        
        current: 1, 
        size: 20,
        total: null,
      },
      tableData: [],

// 编辑参数
      addStaffForm: {
          // id: null,
          operator: this.$store.getters.username,
          name: null,
          gender: null,
          phone: null,
          address: null,
          idNum: null,
          mail: null,
          employeeNum: null,
          companyId: null,
          position: null,
          icCardId: null,
          gateCardId: null,
          enrollTime: null,
          FaceType: null,
          files: null,
          imageId: null
         },
         btn_el: ['editErrStaff'],
         errMsg: '未找到对应照片！',

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

// -----------------------------------------批量导入图片zip和xls----------------------------
   bulkImport() {
     this.import_dialogVisible = true
   },
   submitUploadZip() {
     this.$refs.uploadZip.submit();
   },
  beforeZipUpload(file) {
    return this.zipRule(file.type, file.size, file)
  },
   handleZipSuccess(res, file) {
    //  console.log(this.zipList)
     if(res === 'success') {
       this.open1(`${ file.raw.name } 上传成功`, '成功', 'success')
       this.zipExcelToggle()
     } else{
       this.$message.error(res.msg)
       this.open1(`${ file.raw.name } 上传失败，请重试`, '失败', 'error')
     }
    },
  zipError(err, file, fileList) {
    if(this.zipType(file.raw.type, file.raw.name)) {
       this.open1(`${ file.raw.name } 上传失败，请重试`, '失败', 'error')
    }
  },
  zipType(fileName, fileType) {
     let zipFormat = (fileName).lastIndexOf('.')
   return fileType === 'application/zip' || (fileName).substr(zipFormat + 1).includes('zip')
  },
  zipRule(fileType, fileSize, fileRaw) {
     const isLt1M = fileSize / 1024 / 1024 < 500
        if (!this.zipType(fileType, fileRaw.name)) { 
          this.$message.error('上传压缩包只能是 zip 格式！', 4000)
          } else if (this.zipType(fileType, fileRaw.name) && !isLt1M) {
             this.$message.error('上传zip大小不能超过500MB！', 4000)
          } else if (!this.zipType(fileType, fileRaw.name) && !isLt1M) {
             this.$message.error('上传zip大小不能超过20MB,只能是 zip 格式！', 4000)
          }
        return this.zipType(fileType, fileRaw.name) && isLt1M
    },
  zipChange(file, fileList) {
  // console.log("🚀 ~ file: StaffFromHandle.vue ~ line 467 ~ zipChange ~ fileList", fileList)

  },

// 导入表格
  beforeExcelUpload(file) {
    return this.excelRule(file.type, file.size, file)
  },
  excelRule(fileType, fileSize, fileRaw) {
     function excelType () { return fileType.indexOf('sheet') !== -1 }
     const isLt1M = fileSize / 1024 / 1024 < 3
        if (!excelType()) { 
          this.$message.error('上传表格文件只能是 xls、excel、xlsx 格式！', 4000)
          } else if (excelType() && !isLt1M) {
             this.$message.error('上传表格文件大小不能超过20MB！', 4000)
          } else if (!excelType() && !isLt1M) {
             this.$message.error('上传表格文件大小不能超过20MB,只能是 xls、excel、xlsx 格式！', 4000)
          }
        return excelType() && isLt1M
    },
   handleExcelSuccess(res, file) {
     getImportStatus().then(res => {
     if(res.code === 0) {
       if(res.data.status === 'ok') {
          this.open1(`${ file.raw.name } 上传成功`, '成功', 'success')
          // getReslut(
          //   { serialNumber: res.serialNumber }
          // ).then((res) =>{})
          // getSerialList().then((res) =>{})
       }
      //  getReslut(
      //    { serialNumber: res.data.serialNumber }
      //  ).then((res) =>{})
       
      // getSerialList().then((res) =>{})
     } else {
       this.$message.error(res.msg)
     }
     })
    },
  excelError(err, file, fileList) {
    if(file.raw.type.indexOf('sheet') !== -1) {
     this.open1(`${ file.raw.name } 上传失败，请重试`, '失败', 'error')
    }
  },
  searchFailRecodrs() {
    this.dialogVisible_editStaff = true
    this.onSearch()
  },

// 下载员工录入模板
  getEmployeeTemplate() {
     getEmployeeTemplate().then(res => {
        if(res) {
          downEmployeeTemplate()
        }
      })
  },
   zipExcelToggle() {
     if(this.zipShow) {
       this.zipShow = false
       this.excelShow = true
       this.importActive = 2
     } else if(this.excelShow) {
       this.zipShow = true
       this.excelShow = false
       this.importActive = 1
     }
   },
  open1(zipName, statusName, status) {
        this.$notify({
          title: statusName,
          message: zipName,
          type: status
        })
      },
    getStaffList() {
      let [params] = [this.pagingQuery]
      this.table_loading = true
    getReslut(this.pagingQuery).then((res) => {
        this.tableData = []
     if(res.code === 0) {
        params.size = res.data.size
        params.current = res.data.current
        params.total = res.data.total
        if(res.data.records.length !== 0) {
          this.tableData = res.data.records
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
     if(y.errMsg.indexOf(this.errMsg) !== -1) {
       y.imageId = 'null'
       }

       this.addStaffForm = y
       this.addStaffForm.companyId = 1
       this.addStaffForm.departmentId = 1
      //  this.addStaffForm.FaceType = 'ID'

// 去除编辑无需字段
      let delEditParam = ['imgHeight', 'imgWidth']
          delEditParam.forEach((item, index) => {
            delete this.addStaffForm[item]
          })
    },
    onExport() {
      let p = this.pagingQuery
      downloadEmployee(p.current, p.size).then(res => {
        if(res) {
          downStaffXls(p.current, p.size)
        }
      })
    },
  changeExpiredDate() {
     this.expiredDateForm.expiredDate1 =  moment(this.expiredDateForm.expiredDate).format('YYYY-MM-DD')
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
  },
  goBack() {
    this.$router.go(-1)
  }
  },
  created() {
    vm = this
    this.onSearch()
  },
}
</script>
