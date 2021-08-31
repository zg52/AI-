/*
 * @Author: your name
 * @Date: 2021-08-10 14:49:42
 * @LastEditTime: 2021-08-24 15:11:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \workspace\hjimi2\facecloudwebsite\src\api\face-recognition\resource-manage.js
 */

import request from '@/utils/request'

const resource = 'cloud-platform-charge/'

/**
 * @description: 服务可用资源列表
 */
export function listServiceResourceList(params) {
  return request({
    url: `${resource}listServiceResourceList`,
    method: 'POST',
    data: {
      identityType: 1,
      serviceId: 1,
      userId: "admin"
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * @description: 资源购买调用量计费
 */
 export function billingForResourcePurchasesAndCalls(data) {
  return request({
    url: `${resource}billingForResourcePurchasesAndCalls`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * @description: 资源购买QPS计费
 */
 export function resourcePurchaseQpsBilling(data) {
  return request({
    url: `${resource}resourcePurchaseQpsBilling`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * @description: 资源调用按量计费信息
 */
 export function resourceCallVolumeBillingInformation(id) {
  return request({
    method: 'GET',
    url: `${resource}resourceCallVolumeBillingInformation/${id}`,
  })
}

/**
 * @description: 资源调用按QPS计费信息
 */
 export function resourceQpsChargingInformation(id, type) {
  return request({
    method: 'GET',
    url: `${resource}resourceQpsChargingInformation/${id}/${type}`,
  })
}

/**
 * @description: 提交订单
 */
 export function placeOrder(data) {
  return request({
    url: `${resource}placeOrder`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * @description: 支付订单付款
 */
 export function orderPayment(data) {
  return request({
    url: `${resource}orderPayment`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}