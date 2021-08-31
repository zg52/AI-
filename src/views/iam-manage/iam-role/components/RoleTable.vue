<!--
 * @Author: long
 * @Date: 2021-08-10 14:30:26
 * @LastEditTime: 2021-08-27 11:29:52
 * @LastEditors: Please set LastEditors
 * @Description: 权限：
                 默认权限菜单id: [4,5,6,10,12,13,14,15]
                 默认按钮权限id: [4, 26, 30, 31]
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\iam-manage\iam-role\addRole.vue
-->
<style lang="less" scoped>
.p {
  padding: 30px 20px 0;
}
.npt {
  .p;
}
.table_data {
  margin-top: 30px;
  margin-left: 20px;
  margin-bottom: 30px;
}
.save_role {
  position: fixed;
  bottom: -12px;
  width: 100%;
  background: #fff;
  padding: 20px 0;
  z-index: 99;
  box-shadow: 0 0 10px #ccc;
  left: 0;
}
</style>
<template>
  <div class="app_container">
    <div class="box_style">
      <div class="table_tit_txt f_weight">基本信息</div>
      <a-form class="form" :form="form" :label-col="{ span: 1 }" :wrapper-col="{ span: 4 }" labelAlign="left" @submit="handleSubmit">
        <div class="npt">
          <a-form-item label="角色名："><a-input @focus="nptFocus($event)" :maxLength="15" placeholder="请输入角色名称"
           v-decorator="[ 'roleName', { rules: [{ required: true, message: '请输入角色名称' }] }, ]" 
           :allowClear="isDetails_elHide()"
            /></a-form-item>
          <a-form-item label="备注："><a-textarea @focus="nptFocus($event)" :maxLength="50" v-decorator="['roleDescribe']" placeholder="备注信息" :rows="3" :allowClear="isDetails_elHide()" /></a-form-item>
        </div>
        <div class="checked">
          <div class="table_tit_txt f_weight">权限信息</div>

          <div class="permission_lis">
            <el-checkbox-group v-model="checkList" @change="changeChecked">
            <el-table :data="tableData" :span-method="objectSpanMethod" border class="table_data" max-height="650" v-loading="loading">
              <el-table-column prop="id" label="一级菜单" width="180">
                <template v-slot="v">
                    <el-checkbox
                     @change="menu1Change" 
                     @click.native="stopDefault($event)" 
                     :label="v.row.menuId" 
                     :disabled="isDisabled(v.row.check1)">{{ v.row.name }}</el-checkbox>
                  </template>
              </el-table-column>
              <el-table-column prop="name" label="二级菜单" width="180">
                <template v-slot="v"><el-checkbox @change="menu1Change" @click.native="stopDefault($event)" :label="v.row.name2.menuId" :disabled="isDisabled(v.row.name2.check)">{{ v.row.name2.name }}</el-checkbox></template>
              </el-table-column>
              <el-table-column prop="amount1" label="操作权限">
                <template v-slot="v"><el-checkbox 
                v-for="(item, index) of v.row.name2.child" :key="index" :label="`${ btnPemis_mark }${ item.id }`" :name="item.check > 0 ? 'true' : 'false'"
                :disabled="isDisabled(item.check)" @change="menu3Change" @click.native="menu3ChangeHandle(v.row)">{{ item.name }}</el-checkbox></template>
              </el-table-column>
            </el-table>
            </el-checkbox-group>
          </div>
        </div>
        <a-form-item :wrapper-col="{ offset: 1 }" class="save_role"><div class="flex flex_center">
        <span v-show="editPermisNum_show" class="pr20">修改了{{ editPermisNum }}项</span>
        <a-button v-show="isDetails_elHide()" type="primary" html-type="submit" :loading="submit_loading">{{ savePermisTxt }}</a-button>
        <a-button class="ml20" @click.prevent="goRoleList">返回</a-button>
        <a-button class="ml20" v-show="editPermisNum_show" @click.prevent="refreshPage">还原</a-button>
        </div></a-form-item>
        
      </a-form>
    </div>
  </div>
</template>
<script>
import { defaultPermission, addRole, editRole, roleDetails } from "@/api/iam-manage/role";

 let vm

 function mergeTableRow(data, merge) {
  if (!merge || merge.length === 0) {
    return data
  }
  merge.forEach((m) => {
    const mList = {}
    data = data.map((v, index) => {
      const rowVal = v[m]
      if (mList[rowVal]) {
        mList[rowVal]++
        data[index - (mList[rowVal] - 1)][m + '-span'].rowspan ++
        v[m + '-span'] = {
          rowspan: 0,
          colspan: 0
        }
      } else {
        mList[rowVal] = 1
        v[m + '-span'] = {
          rowspan: 1,
          colspan: 1
        }
      }
      return v
    })
  })
  return data
}

export default {
  props: {
    submitType: {
      type: Array,
      default: ['add'] // 保存角色数据默认为新增
    },
     formParams: {
       type: Object,
       default() {
         return {
            roleName: '',
            roleDescribe: ''
         }
       }
      },
  },
  data() {
    return {
      loading: true,
      form: this.$form.createForm(this),
      checkList: [],
      chek1Default: [],
      btnPemis_mark: 'btn_',
      submit_loading: false,
      editPermisNum_show: false,
      
      rawTableData: [],
      permissionParam: {
        menuId: [],
        operationId: [],
      },
      defaultMenuId: [],
      defaultOperationId: [],
      tableData: [],
      btnIsCheck: null,
      editRawChecklis_length: 0,
      editPermisNum: 0,
      
      rowMenu: [], // table每行三模块id
      menu1: [], // 菜单1 
      menu2: [], // 菜单2
      menu3: [], // 菜单3 
    }
  },
  watch: {
     $route() {
      this.routeErrHandle()
    }
  },
  computed: {
    savePermisTxt() {
      return this.submitType.includes('edit') ? '保存权限修改' : '保存角色'
    }
  },
  methods: {
    stopDefault(e) {
        e.stopPropagation()
  },
    menu1Change(val, e) {
/**
 * @description: 以chegbox状态为准，按需添加菜单一模块和菜单二模块
 *               * 已默认勾选的菜单，不再执行操作
 */       
      let elVal = e.target.value
      
// 菜单一
      {
        menu1Handle(this.menu1[0], elVal, this.rowMenu[0])
      
      // menu1Handle(this.menu1[1], elVal, this.rowMenu[1])
      
       menu1Handle(this.menu1[2], elVal, this.rowMenu[3]), menu1Handle(this.menu1[2], elVal, this.rowMenu[4])
       
      //  menu1Handle(this.menu1[3], elVal, this.rowMenu[4]),  menu1Handle(this.menu1[3], elVal, this.rowMenu[5])
      //  menu1Handle(this.menu1[3], elVal, this.rowMenu[6])
      
       for(let i = 9; i < this.tableData.length; i++) { // 服务管理
         menu1Handle(this.menu1[5], elVal, this.rowMenu[i])
         menu1Handle(this.menu2[i], elVal, this.rowMenu[i], true)
       }
      }

// 菜单二
      {
        menu1Handle(this.menu2[0], elVal, this.rowMenu[0], true)

        menu1Handle(this.menu2[3], elVal, this.rowMenu[3], true), menu1Handle(this.menu2[4], elVal, this.rowMenu[4], true)

        menu1Handle(this.menu2[5], elVal, this.rowMenu[5], true)
        
      }
  
      function menu1Handle(rowMenuArr_id, value, rowMenuArr, isMenu1_id) {
        let isSliceMenu1_id = isMenu1_id ?? false //点击菜单二 过滤菜单一的id
        if(rowMenuArr_id == value) {
          if(val) {
            for(let i = 0; i < rowMenuArr.length; i++) {
              vm.checkList.push(rowMenuArr[i])
         }
        } else {
          for(let i = 0; i < rowMenuArr.length; i++) {
            if(vm.checkList.indexOf(rowMenuArr[i]) !== -1) {
              if(isSliceMenu1_id && vm.menu1.includes(rowMenuArr[i]))
              {
                
              } else {
                vm.checkList.splice(vm.checkList.indexOf(rowMenuArr[i]), 1)
              }
            }
         }
        }
      }
     }

    },
    menu3Change(isCheck, e) {
      this.btnIsCheck = isCheck ? true : false
    },
    async menu3ChangeHandle(row) {
      await new Promise((resolve) => {
        setTimeout(() => {
          if(this.btnIsCheck) resolve()
        }, 0)
      }).then(() => {
        
      let btnArr = new Proxy(
        {
            checkList: this.checkList,
            menu3: this.menu3
        },
        {  
           set(target, prop, value) {
             if(prop === 'checkList') {
              value = []
             }
            },
            get(target,key,prop) {
               return target[key]
            }
        }
    )
    btnArr.checkList.push(row.menuId), btnArr.checkList.push(row.name2['menuId'])
      })
    },

    changeChecked(val) {
      let p = this.permissionParam
      setTimeout(() => {
       this.checkList = [...new Set(this.checkList)]
       console.log("🚀 ~ file: RoleTable.vue ~ line 151 ~ menu1Change ~ this.checkList", this.checkList)
    
      p.menuId = [], p.operationId = [] // 每次勾选重置为默认菜单和按钮权限
      
// 处理check变更的数组赋值于菜单和按钮数组
    val.forEach(item => {
      if(item !== null) {
        if(item.toString().indexOf(this.btnPemis_mark) == -1) {
          p['menuId'].push(item)
        } else {
           p['operationId'].push(Number(item.substr(this.btnPemis_mark.length)))
        }
      }
    })
    p['menuId'] = [...new Set(p['menuId'])], p['operationId'] = [...new Set(p['operationId'])]
    console.log('menuId',p.menuId)
    console.log('operationId',p.operationId)
    
    if(this.submitType.includes('edit')) {
       this.editPermisNum_show = true
        let preEditCheck= (this.checkList.length - 1) - this.editRawChecklis_length // 上次选中的权限（除默认选中外）
        let resultNum = (this.checkList.length - 1) - this.editRawChecklis_length - 3
        if(resultNum > 0) {
          this.editPermisNum = resultNum
        } else {
          resultNum === 0 ? this.editPermisNum_show = false : this.editPermisNum = resultNum.toString().substr(1)
        }
        
      }
      }, 1)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    const span = column['property'] + '-span'
     if(row[span]){
         return row[span]
     }
    },
    handleSubmit(e) {
      let p = this.permissionParam
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submit_loading = true
          
          let params = { ...values }

          if(!params.roleDescribe) params.roleDescribe = '无';
           p.menuId = [...new Set(p.menuId)], p.operationId = [...new Set(p.operationId)]
  
          if(this.submitType.includes('add')) {
            addRoleHandle()
          } else if(this.submitType.includes('edit')) {
            editRoleHandle()
          }

         function addRoleHandle() {
          addRole(Object.assign(p, params)).then((res) => {
            if (res) {
              vm.$msg.success("新增成功"), vm.submit_loading = false, vm.$router.push('roleList')
            } else {
              vm.$msg.error(res.msg)
            }
          }).catch(() => {
            vm.submit_loading = false
          })
           }

            function editRoleHandle() {
            editRole(vm.$route.query.id, Object.assign(p, params)).then((res) => {
            if (res) {
              vm.$msg.success("修改成功"), vm.submit_loading = false, vm.goPrePage()
            } else {
              vm.$msg.error(res.msg)
            }
          }).catch(() => {
            vm.submit_loading = false
          })
           }
        } else {
          this.$msg.warning(err.roleName.errors[0].message)
        }
      })
    },
    setFormFields() {
      this.form.setFieldsValue({
        ...this.formParams,
      })
    },
    goRoleList() {
      this.goPrePage()
    },
    getDetaileRole() {
      this.getDefaultPermission()
    roleDetails(vm.$route.query.id).then(res => {
     if (res) {
      this.permissionsDataSwitch(res.data)
      } else {
        this.$msg.error(res.msg)
        
      }
    })
  },
  getDefaultPermission() {
    defaultPermission().then((res) => {
      if (res) {
      this.permissionsDataSwitch(res.data)
      } else {
        this.$msg.error(res.msg)
      }
    })
  },
  permissionsDataSwitch(data) {
    let p = this.permissionParam
    this.rawTableData = data
        
        let d = [...data], datalis = [], newArr = []
        this.menu1 = [], this.menu2 = [], this.menu3 = []

        d.forEach((item, index, arr1) => {
            item.child.forEach((item2, index2, arr2) => {
              newArr.push({
                id: item.id,
                name: item.name,
                menuId: item.menuId,
                name2: item.child[index2],
                authorityId: item.authorityId,
                check1: arr1[index].check
                // checkSwitch: item.check == 0 ? false : true,
              })
            })

            this.menu1.push(item.menuId)
        })
        
        this.tableData = [...datalis, ...newArr]

/**
 * @description:  获取默认勾选的菜单项及按钮、获取table每行3模块id
 * @return {Array} 
 */ 
        this.tableData.forEach((item, index1, tabeArr) => {
          this.checkList.push( (item.check1 > 0 ? item.menuId : null), item.name2.check > 0 ? item.name2.menuId : null )
          
          // if(!this.submitType.includes('edit', 'details') || !this.submitType.includes('details')) {
            if(item.check1 > 0 ) { // 默认菜单权限
              p.menuId.push(item.menuId), this.defaultMenuId.push(item.name2.menuId)
              if(item.name2.check > 0) {
                p.menuId.push(item.name2.menuId), this.defaultMenuId.push(item.name2.menuId)
              }
            }
          // }
          
          this.menu2.push(item.name2.menuId)
          this.rowMenu.push([]), this.rowMenu[index1].push(item.menuId, item.name2.menuId)
          
          item.name2.child.forEach((item3, index2, child2Arr) => {
            let btn3 = `${ this.btnPemis_mark }${ item3.id }`
            this.checkList.push( item3.check > 0 ? btn3 : null )
            
          // if(!this.submitType.includes('edit', 'details') || !this.submitType.includes('details')) { 
            if(item3.check > 0) { // 默认按钮权限
              p.operationId.push(item3.id), this.defaultOperationId.push(item3.id)
              Promise.resolve().then(() => { this.editRawChecklis_length = [...new Set(this.defaultOperationId)].length +  [...new Set(this.defaultMenuId)].length })
            }
            // }
            
            this.menu3.push(btn3)
            this.rowMenu[index1].push(btn3)
          })
          
        })
        
        this.checkList = [...new Set(this.checkList)]
        
        mergeTableRow(this.tableData, ['id']) // 合并相邻相同数据行
        console.log(this.checkList)
/* end */ 
  },
  nptFocus(e) {
    if(this.submitType[0] === 'details') e.target.blur()
  },
  isDetails_elHide() {
    return this.submitType[0] === 'details' ? false : true
  },
  goPrePage() {
    this.$router.go(-1)
  },
  isDisabled(target){
    if(this.submitType[0] === 'details') {
      return true
    }else if(target > 0) {
        return true
      } else {
        return false
      }
    // return target > 0 ? true : this.submitType[0] === 'details' ? true : false
  },
  routeErrHandle() {
    let querys = this.$route.query, submitType = this.submitType
      if(submitType.includes('edit') || submitType.includes('details')) {
        if(Object.keys(querys).length === 0) {
           this.$router.push({ path: 'roleList' })
        } else if((!querys.id && querys.id !== 0) || !querys.roleName || !querys.roleDescribe ) {
          this.goPrePage()
        } else if(querys.id === undefined || querys.id === null) {
          this.$router.push({ path: 'roleList' })
        }
      }
  },
  refreshPage() {
    this.$router.go(0)
  }
  },
  created() {
    vm = this
    
   this.routeErrHandle()
   
  /**
  * @description: 编辑角色或查看角色前，首先获取默认角色id -> this.getDefaultPermission()
  *               编辑角色前首先需依次获取默认角色和角色详情 ->  this.getDefaultPermission() -> this.getDetaileRole() -> this.getDefaultPermission()
  */
     this.getDefaultPermission()
      this.$forceUpdate()
     new Promise((resolve) => {
       if(this.checkList) resolve()
     }).then(() => {
     if(this.submitType.includes('edit', 'details') || this.submitType.includes('details')) {
         this.getDetaileRole()
       } else {
          this.getDefaultPermission()
       }
     }).catch(() => {
       this.$msg.error('默认角色获取失败！')
     })
    new Promise(resolve => { if(this.checkList) resolve() }).then(() => this.loading = false)
    
  /* end */
  },
  mounted() {
    this.$nextTick(() => {
      this.setFormFields()
      this.isDetails_elHide()

      this.$forceUpdate()
    })
  }
}
</script>