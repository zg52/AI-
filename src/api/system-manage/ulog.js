/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-03-01 16:58:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const log = 'passing/log'
// 设备操作日志

/**
 * @description: 日志列表
 */
export function logList(params) {
 return request({
    url: log,
    method: 'GET',
    params
  })
}