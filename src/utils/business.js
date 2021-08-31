/*
 * @Author: long
 * @Date: 2021-02-09 18:33:47
 * @LastEditTime: 2021-08-27 11:32:33
 * @LastEditors: Please set LastEditors
 * @Description: 全局业务参数配置及数据获取
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\utils\business.js
 */
import { message } from 'ant-design-vue'
import { 
   roleList, // 角色列表（角色管理）
   iamRoleList // iam角色列表
    } from "@/api/iam-manage/role"

const userRoles = [
    { id: 1, name: '超级管理员' }, //superAdmin
    { id: 2, name: '管理员' }, //admin
  ],

// 角色列表
  roleNameLisArr = [
    { id: 0, value: '超级' },
    { id: 1, value: '普通' },
    { id: 3, value: '查看' }
  ],

//  iam用户状态
  iamStatus = [
    { key: 'normal', value: '已启用' },
    { key: 'disabled', value: '已停用' },
    // { key: 'pending', value: '待审核' },
    // { key: 'rejected', value: '已拒绝' },
  ]

/**
 * @description: 获取角色名称和id（角色管理）
 * @param
 */
 export async function getRoleName_id() {
   let lis = []
      return await roleList().then((res) => {
         const { data } = res
         if(res.code === 0) {
          data.map((x,y) => {
              lis.push({
                 roleName: x.roleName,
                 id: x.id,
              })
         })
        return lis
         } else {
          message.error(res.msg)
          return false
         }
       })
 }

 /**
 * @description: 获取角色名称和id（iam）
 * @param
 */
  export async function getIam_RoleName_id() {
    let lis = []
       return await iamRoleList().then((res) => {
          const { data } = res
          if(res.code === 0) {
           data.map((x,y) => {
               lis.push({
                  roleName: x.roleName,
                  id: x.id,
               })
          })
         return lis
          } else {
           message.error(res.msg)
           return false
          }
        })
  }

   /**
 * @description: 验证表单不能为空
 * @param { String }
 */
 export function validateNotNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }

export { roleNameLisArr as getRoleNameLis }
export { iamStatus as getIamStatus }