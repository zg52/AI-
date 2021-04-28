/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-03-10 17:02:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'


const passing = 'passing/blocklist'

/**
 * @description: 添黑名单人员
 * @param {*}
 */
export function addBlockList(params) {
  return request({
     url: passing,
     method: 'POST',
     data: params
   })
  }

/**
 * @description: 查黑名单
 * @param {*}
 */
export function blockList(params) {
  return request({
     url: passing,
     method: 'GET',
     params
   })
 }

 /**
 * @description: 删黑名单
 * @param {*}
 */
export function deleteBlock(ids) {
  return request({
     url: passing,
     method: 'DELETE',
     data: { ids: ids }
   })
 }
