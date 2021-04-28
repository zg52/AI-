/*
 * @Author: your name
 * @Date: 2021-02-03 19:56:03
 * @LastEditTime: 2021-04-09 11:05:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\api\people-manage\visitorManage.js
 */

import request from '@/utils/request'
const person = 'person/visitor/'
// 人员管理-访客

/**
 * @description: 访客-新增
 * @param {*}
 */
export function saveVisitor(params) {
 return request({
    url: person,
    method: 'POST',
    data: params,
    // headers: {"Content-Type": "application/json"}
  })
}

/**
 * @description: 访客-列表
 */
export function visitorList(params) {
  return request({
     url: person,
     method: 'GET',
     params
   })
 }

 /**
 * @description: 访客-修改
 * @param {*}
 */
export function editVisitor(id, params) {
  return request({
     url: `${ person }${ id }`,
     method: 'POST',
     data: params
   })
 }

  /**
 * @description: 访客-授权状态（已授权/未授权/已拒绝/已失效）
 * @param {{ id:'auth', value: '已授权' }, { id: 'unAuth', value: '未授权' }, { id: 'refuse', value: '已拒绝' }, { id: 'expire', value: '已过期' }}
 */
export function visitorState(id, params) {
  return request({
     url: `${ person }audit/${ id }`,
     method: 'POST',
     data: params
   })
 }

 /**
 * @description: 删除访客
 * @param {*}
 */
export function deleteVisitor(id) {
  return request({
     url: `${ person }${ id }`,
     method: 'DELETE',
   })
 }

   /**
 * @description: 导出列表
 */
export function downloadVisitor(current, size) {
  return request({
     url: 'person/visitor/downloadVisitor',
     method: 'GET',
     params: {
      current: current,
      size: size
     },
   })
 }

/**
 * @description: 批量导入访客（先导入图片zip，再导入表格）
 */

// 无参形式
export function visitorZip() {
  return `${ process.env.VUE_APP_BASE_API }${ person }importZip`
}
export function visitorExcel() {
  return `${ process.env.VUE_APP_BASE_API }${ person }batchImport`
}

// 查看当前表格导入状态
export function getImportStatus() {
  return request({
     url: `${ person }getImportStatus`,
     method: 'GET'
   })
 }
  /**
 * @description: 下载访客表格模板
 */
export function getVisitorTemplate() {
  return request({
     url: 'person/visitor/getVisitorTemplate',
     method: 'GET'
   })
 }

// 访客导入结果查询
export function getReslut() {
  return request({
     url: `${ person }getReslut`,
     method: 'GET'
   })
 }