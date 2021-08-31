/*
 * @Author: your name
 * @Date: 2021-05-17 19:46:30
 * @LastEditTime: 2021-05-31 13:53:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\api\api-manage\index.js
 */
import request from '@/utils/request'
const IAM = 'api/iam-user'

/**
 * @description: 密钥列表
 */
export function passList(params) {
    return request({
        url: IAM,
        method: 'GET',
        params
    })
}


/**
 * @description: 重置密钥
 */
 export function setupSdk(params) {
    return request({
        url: IAM,
        method: 'GET',
        params
    })
}


/**
 * @description: 删除密钥
 */
 export function deleteSdk(params) {
    return request({
        url: IAM,
        method: 'DELETE',
        params
    })
}
