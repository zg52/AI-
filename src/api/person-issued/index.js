/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-03-03 10:34:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const passing = 'passing/person'

// 人员（员工访客）下发/查

/**
 * @description: 根据设备id下发人员（员工）
 * @param { deviceIds, employeeIds }
 */
export function issuedEmployee(deviceIds, employeeIds) {
  return request({
     url: passing,
     method: 'POST',
     data: {
        deviceIds: deviceIds,
        employeeIds: employeeIds
     }
   })
 }

 /**
 * @description: 根据设备id下发人员（访客）
 * @param { deviceIds, visitorIds }
 */
export function issuedVisitor(deviceIds, visitorIds) {
  return request({
     url: passing,
     method: 'POST',
     data: {
        deviceIds: deviceIds,
        visitorIds: visitorIds
     }
   })
 }

    /**
 * @description: 查已下发员工
 */
export function beenIssuedEmployee(params) {
  return request({
     url: `${ passing }?personType=employee`,
     method: 'GET',
     params
   })
 }

     /**
 * @description: 查已下发访客
 */
export function beenIssuedVisitor(params) {
  return request({
     url: `${ passing }?personType=visitor`,
     method: 'GET',
     params
   })
 }

 /**
 * @description: 查看某个设备的通行人员
 */
export function beenDevicePerson(id) {
  return request({
     url: `${ passing }/device/${ id }`,
     method: 'GET'
   })
 }

  /**
 * @description: 移除设备通行人员
 */
export function deleteDevicePerson(params) {
  return request({
     url: passing,
     method: 'DELETE',
     data: params
   })
 }