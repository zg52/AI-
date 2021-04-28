/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-04-13 17:46:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const passing = 'passing/'
// 设备管理

/**
 * @description: 新增设备
 * @param {name,description,manufacturer,model,sn,location}
 */
export function addDevice(params) {
 return request({
    url: `${ passing }device`,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 修改设备
 * @param {id}
 */
export function editDevice(id, params) {
  return request({
     url: `${ passing }device/${ id }`,
     method: 'POST',
     data: params
   })
 }

/**
 * @description: 查设备列表
 */
export function searchDevice(params) {
  return request({
     url: `${ passing }device`,
     method: 'GET',
     params
   })
 }

 /**
 * @description: 查设备详情
 */
export function getDeviceDetails() {
  return request({
     url: `${ passing }device/${ id }`,
     method: 'GET',
   })
 }

 /**
 * @description: 删除设备
 */
export function deleteDevice(id) {
  return request({
     url: `${ passing }device/${ id }`,
     method: 'DELETE',
   })
 }

  /**
 * @description: 操作设备
 * @param {deviceIds}
 */
export function instructDevice(type, params) {
  return request({
     url: `${ passing }device/instruct/${ type }`,
     method: 'POST',
     params,
    //  headers: {"Content-Type": "application/json"}
   })
 }

   /**
 * @description: 操作设备
 * @param {deviceIds}
 */
export function instructDevice1(type, params) {
  return request({
     url: `${ passing }device/instruct/${ type }`,
     method: 'PUT',
     params,
   })
 }
 