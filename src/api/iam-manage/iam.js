/*
 * @Author: long
 * @Date: 2021-05-17 19:46:30
 * @LastEditTime: 2021-08-09 17:35:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\api\api-manage\index.js
 */
import request from '@/utils/request'
const IAM = 'open-cloud-console/api/iam-user'

/**
 * @description: iam用户列表
 * @param {object}
 */
export function iamList(params) { return request({ url: IAM, method: 'GET', params }) }

/**
 * @description: iam详情
 * @param {object}
 */
 export function iamDetails(id,params) { return request({ url: `${  IAM }/${ id }`, method: 'GET', params }) }

/**
 * @description: 创建iam
 * @param {object}
 */
 export function createIam(params) { return request({ url: IAM, method: 'POST', data: params }) }
 
/**
 * @description: 编辑iam
 * @param {object}
 */
 export function editIam(id, params) { return request({ url: `${ IAM }/${ id }/audit`, method: 'POST', data: params }) }
 
/**
 * @description: 更改iam状态
 * @param {object}
 */
 export function changeIamState(id, params) { return request({ url: `${ IAM }/${ id }/changeState`, method: 'POST', data: params }) }
 
/**
 * @description: 删除iam
 * @param {object}
 */
 export function delIam(id, params) { return request({ url: `${ IAM }/${ id }`, method: 'DELETE', data: params }) }
 
 /**
 * @description: 重置密码
 * @param {string}
 */
  export function resetPass(id, params) { return request({ url: `${ IAM }/${ id }/resetPass`, method: 'POST', data: params }) }