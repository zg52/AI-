/*
 * @Author: your name
 * @Date: 2021-01-29 17:49:54
 * @LastEditTime: 2021-03-05 11:28:19
 * @LastEditors: Please set LastEditors
 * @Description: 通行规则
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\api\traffic-rules\index.js
 */
import request from '@/utils/request'

const passing = 'passing/rule'
/**
 * @description: 新增通行规则
 * @param {deviceIds,name,description,verificationModes,ruleType,personType,visitorIds,week,startDate,endDate,startTime,startTime,endTime}
 */
export function addRules(params) {
  return request({
    url: passing,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 查通规则
 */
export function getRules(params) {
  return request({
    url: passing,
    method: 'GET',
    params
  })
}

/**
 * @description: 删规则
 * @param {ids}
 */
export function deleteRules(params) {
  return request({
    url: passing,
    method: 'DELETE',
    data: params
  })
}

/**
 * @description: 查看已在规则中的人员
 * @param {ids}
 */
export function beenRulePeson(id) {
  return request({
    url: `${ passing }/${ id }/person`,
    method: 'GET'
  })
}