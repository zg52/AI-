/*
 * @Author: long
 * @Date: 2021-08-03 18:57:19
 * @LastEditTime: 2021-08-19 19:26:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\api\iam-manage\role.js
 */
import request from '@/utils/request'
const ROLE = 'open-cloud-console/api/role/'
const CLOUD = 'open-cloud-console/'

/**
 * @description: 添加角色
 * @param {object}
 */
export function addRole(params) { return request({ url: `${ ROLE }createRole`, method: 'POST', data: params, headers: {"Content-Type": "application/json"} }) }

 /**
 * @description: 角色列表（角色管理）
 * @param {object}
 */
export function roleList(params) { return request({ url: `${ ROLE }getRole`, method: 'GET', params }) }

/**
* @description: 角色列表（IAM角色列表）
* @param {object}
*/
export function iamRoleList(params) { return request({ url: `${ ROLE }getRoleAim`, method: 'GET', params }) }

/**
* @description: 获取默认权限列表(创建角色)
* @param {object}
*/
export function defaultPermission(params) { return request({ url: `${ ROLE }getDefaultPermission`, method: 'GET', params }) }

 /**
 * @description: 删除角色（角色管理）
 * @param {object}
 */
  export function delRole(id, params) { return request({ url: `${ ROLE }deleteRole/${ id }`, method: 'DELETE', params }) }

   /**
 * @description: 角色详情
 * @param {object}
 */
  export function roleDetails(id, params) { return request({ url: `${ ROLE }getRoleInfo/${ id }`, method: 'GET', params }) }

   /**
 * @description: 修改角色
 * @param {object}
 */
    export function editRole(id, params) { return request({ url: `${ ROLE }updateRoleInfo/${ id }`, method: 'PUT', data: params, headers: {"Content-Type": "application/json"} }) }

/**
 * @description: 获取用户权限表
 * @param {object}
 */
  export function userPermission(params) { return request({ url: `${ ROLE }userPermission`, method: 'GET', params }) }