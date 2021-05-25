/*
 * @Author: your name
 * @Date: 2021-05-17 19:46:30
 * @LastEditTime: 2021-05-24 10:21:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\api\api-manage\index.js
 */
import request from '@/utils/request'
const IAM = 'api/iam-user'

/**
 * @description: iam用户列表
 */
export function iamList(params) {
    return request({
        url: IAM,
        method: 'GET',
        params
    })
}

/**
 * @description: 创建iam
 */
 export function createIam(params) {
    return request({
        url: IAM,
        method: 'POST',
        data: params
    })
}

/**
 * @description: 编辑iam
 */
 export function editIam(id, params) {
    return request({
        url: `${ IAM }/${ id }/audit`,
        method: 'POST',
        data: params
    })
}

/**
 * @description: 更改iam状态
 */
 export function changeIamState(id, params) {
    return request({
        url: `${ IAM }/${ id }/changeState`,
        method: 'POST',
        data: params
    })
}