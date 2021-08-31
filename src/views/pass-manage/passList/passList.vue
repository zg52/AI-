<!--
 * @Author: your name
 * @Date: 2021-05-24 17:09:12
 * @LastEditTime: 2021-06-03 19:45:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\sass-manage\sassList\sassList.vue
-->
<style lang="scss" scoped>
.sdc_doc {
    margin:20px;
}
.box_style {
    padding: 20px;
    padding-bottom: 40px;
    h4 {
        font-size: 20px;
        color: #000;
        padding-top: 10px;
    }
    ul {
        padding-top: 15px;
        li {
            span {
                font-size: 16px;
            }
        }
    }
}
</style>
<template>
    <div>
      <div class="sdc_doc">
         <div class="box_style">
          <h4>SDK文档</h4>
          <ul>
              <li v-for="(sdk, index) of sdks" :key="index" class="flexbetween item_center mt20">
                  <span>{{ sdk.tit }}</span>
                  <div> 
                      <router-link :to="sdk.url" class="mr20"><el-button plain>查看接入说明</el-button></router-link>
                      <el-button type="primary" @click="downSdk(index)">下载</el-button>
                  </div>
              </li>
          </ul>
         <div class="sk mt50">
              <div class="flexbetween item_center">
                  <h4>基础密钥管理</h4>
              <div><el-button type="primary">生成密钥</el-button>
                   <el-dropdown @command="handleCommand" class="ml10" trigger="click">
                        <el-button plain><span class="el-dropdown-link more">. . .</span></el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">批量删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                  </div>
              </div>
              <el-table class="mt25" :data="painingQueryList" max-height="650" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-spinner="el-icon-loading" ref="multipleTable">
                      <template slot="empty"><svg-icon class="empty" icon-class="empty"/>暂无数据</template>
                      <el-table-column width="50" type="selection" fixed ></el-table-column>
                      <el-table-column label="序号" width="80"><template v-slot="scope">{{ (scope.$index + pagingQuery.size * (pagingQuery.current - 1)) + 1 }}</template></el-table-column>
                      <el-table-column label="Access Key"><template v-slot="v"> {{ v.row.ak }} </template></el-table-column>
                      <el-table-column label="Secret Key"><template v-slot="v"> {{ v.row.sk }} </template></el-table-column>
                      <el-table-column label="操作"><template v-slot="v"><span class="theme mr15 cursor inline_block" @click="resetAk(v.row.id)">重置密钥</span>
                      <el-popconfirm
                      confirmButtonText="确认"
                      cancelButtonText="取消"
                      title="确定要删除该密钥？"
                      @onConfirm="handleDelete(scope.row, scope.$index)">
                      <span slot="reference" class="danger cursor">删除</span>
                      </el-popconfirm>
                     </template></el-table-column>
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
         </div>
         </div>
      </div>
    </div>
</template>
<script>
import { passList, setupSdk, deleteSdk } from '@/api/pass-manage'
import { downSdk } from '@/api/public'

export default {
    data() {
        return {
            table_loading: false,
            sdks: [
                {
                tit: '人脸识别闸机SDk',
                url: '/documents/docList',
               },
                {
                tit: '人脸识别算法SDk',
                url: '../../documents/docList',
               }
            ],
            pagingQuery: {
            current: 1, 
            size: 20,
            total: null,
            },
            painingQueryList: [
                {
                    ak: 'fawfewafawdf832973287423434',
                    sk: 'fwaefewafhiur34273846r2784r834',
                },
                {
                    ak: 'fawfewafawdf832973287423434',
                    sk: 'fwaefewafhiur34273846r2784r834',
                },
                {
                    ak: 'fawfewafawdf832973287423434',
                    sk: 'fwaefewafhiur34273846r2784r834',
                },
                {
                    ak: 'fawfewafawdf832973287423434',
                    sk: 'fwaefewafhiur34273846r2784r834',
                },
            ]
        }
    },
    methods: {
    onSearch() {
        this.getTableList()
    },
    resetAk() {
        setupSdk().then(res => {
            
        })
    },
  handleCommand(command) {
      if(command === 'a') {
          this.onDeletes()
      }
    },
    getTableList() {
        passList(this.pagingQuery).then((res) => {
         if(res.code === 0) {
           let records = res.data.records
           this.painingQueryList = []
           this.table_loading = false
           params.size = res.data.size
           params.current = res.data.current
           params.total = res.data.total
           if(records) {
             if(records.length !== 0) {
             this.painingQueryList = res.data.records
           }
           }
         }
      })
    },
    handleDelete(row, index) {
      deleteSdk({ids: row.id}).then((res) => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.onSearch()
        } else {
          this.$message.error(res.msg)
          this.onSearch()
        }
      },(err) => {
          this.onSearch()
          })
    },
    onDeletes() {
      let _this = this
       if (this.multipleSelection.length !== 0) {
        this.$confirm("此操作将永久删除已选设备通行人员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.handleDeleteLoading('删除中', true)
          let personIds = []
          for (let i = 0; i < _this.multipleSelection.length; i++) {
            personIds.push(_this.multipleSelection[i].id)
          }
          deleteSdk({ids: personIds}).then((res) => {
              if(res.code == 0) {
                  this.onSearch()
                  this.$message.success(res.msg)
                    this.handleDeleteLoading(null, false)
                } else {
                  this.$message.error(res.msg, 4000)
                   this.handleDeleteLoading(null, false)
                }
             })
          }).catch(() => {
             this.$message.info({message: '已取消删除'})
             this.$refs.multipleTable.clearSelection()
          })
      } else {
        this.$message.warning('请在列表中勾选要删除的设备通行人员')
      }
    },
    downSdk(index) {
      downSdk(this.sdks[index]?.tit)
        },
    handleSizeChange(val) {
      this.pagingQuery.size = val
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.pagingQuery.current = val
      this.getTableList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    },
   created() {
    //    this.onSearch()
   },
}
</script>