/*
 * @Author: your name
 * @Date: 2021-02-09 18:33:47
 * @LastEditTime: 2021-04-22 15:12:38
 * @LastEditors: Please set LastEditors
 * @Description: 全局业务参数配置及信息获取
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\utils\business.js
 */
import { 
    searchDevice,  // 获取设备列表
   } from '@/api/device-manage'

   import {
      getRules //获取通行规则列表
   } from '@/api/traffic-rules'

   import {
    getStaffList //获取员工列表
 } from '@/api/people-manage/staffManage'
 
/**
 * @description: 全局业务数据字典
 */
   
const
  userRoles = [
    { id: 1, name: '超级管理员' }, //superAdmin
    { id: 2, name: '管理员' }, //admin
     ],
     userStatus = [
     { id:'VALID', value: '激活'},
     {id: 'INVALID', value: '禁用'}
     ], 
     visitorAuthorized = [
      { id:'auth', value: '已授权' },
      { id: 'unAuth', value: '未授权' },
      { id: 'refuse', value: '已拒绝' },
      { id: 'expire', value: '已过期' }
     ],
  passWayArr = [
    { label: '刷脸', value: 'face' },
    { label: '指纹', value: 'fingerprint' },
    { label: '二维码', value: 'qr_code' },
    {
      label: '刷卡', value: 'card',
        children: [
          { label: '门禁卡', value: 'wg_card' },
          { label: 'IC卡', value: 'ic_card' },
          { label: '身份证', value: 'identity_card' }
    ]
  },
  {
     label: '刷脸 + 刷卡', value: 'faceCard',
      children: [
        { label: '刷脸 + 门禁卡', value: 'face,wg_card' },
        { label: '刷脸 + IC卡', value: 'face,ic_card' },
        { label: '刷脸 + 身份证', value: 'face,identity_card' }
      ]
    }
    ],
    personTypes = [
      { id: 'employee', name: '员工' },
      { id: 'visitor', name: '访客' },
      { id: 'blocklist', name: '黑名单人员' },
      { id: 'stranger', name: '陌生人' }
    ],
    genders = [
      { id: 'male' , value: '男' },
      { id: 'female', value: '女'  }
    ],
    staffStates = [
      { ID: 0,  id: 0, value: '在职' }, 
      { ID: 1,  id: 1, value: '离职' },
      { ID: 2,  id: 'removing2', value: '删除中' },
    ],
   faceTypes = [
      { id: 'id', name: '证件照' },
      { id: 'life', name: '生活照' }
   ],
   directions = [
     { id: 'in', value: '进' },
     { id: 'out', value: '出' }
   ],
   trafficResult = [
     { id: 'success', value: '已通过'},
     { id: 'failure', value: '未通过'}
   ],
   categorys = [
     { id: 'blocklist', name: '黑名单人员' },
     { id: 'high_body_temperature', name: '体温异常' },
     { id: 'device_upgrade_failed', name: '设备升级失败' },
     { id: 'device_out_of_order', name: '设备故障' }
   ],
   deviceHandle = [
     { id: 'open', name: '开门' },
     { id: 'close', name: '关门' },
     { id: 'always_open', name: '常开' },
     { id: 'always_close', name: '常关' },
     { id: 'restart', name: '重启' },
     { id: 'shutdown', name: '关机' },
     { id: 'issue_person', name: '下发通行人员' },
     { id: 'remove_person', name: '移除通行人员' },
     { id: 'issue_rule', name: '下发通行规则' },
     { id: 'delete_rule', name: '移除通行规则' },
     { id: 'issue_blocklist', name: '添加黑名单人员' },
     { id: 'delete_blocklist', name: '删除黑名单人员' }
   ],
   deviceStates = {
     search: [
      { id: 'normal', value: '正常' },
      { id: 'out_of_order', value: '故障' },
      // { id: 'out_of_sync', value: '未同步' },
      { id: 'always_open', value: '常开门' },
      { id: 'always_close', value: '常关门' },
      { id: 'power_off', value: '已关机' },
      { id: 'statuses:removed', value: '已删除'},
    ],
    operate: [
      { id: 'open', value: '开门' },
      { id: 'close', value: '关门' },
      { id: 'update', value: '升级' },
      { id: 'restart', value: '重启' },
      { id: 'always_open', value: '常开门' },
      { id: 'always_close', value: '常关门' },
      { id: 'shutdown', value: '关机' },
   ]
   },
   deviceISOnline = [
    { id: true, value: '在线' },
    { id: false, value: '离线' }
   ],
   deviceTypes = [
    { id: 'entrance', value: '门禁' },
    { id: 'brake', value: '闸机' }
],
 issuePersonStatus = [
   { id: 'normal',value: '已下发' },
   { id: 'issuing', value: '下发中' },
   { id: 'removing', value: '删除中' }
 ]
 
/**
 * @description: 处理通行方式
 */
export function passWay() {
   return passWayArr
}

/**
 * @description: 通行方式转为一维数组
 */
export function passWayArrHandle() {
    let resultArr = []
    passWayArr.map((item, index) => {
        if('children' in item) {
            item.children.forEach((item1, index1) => {
                resultArr.push(item1)               
               })
           } else {
               resultArr.push(item)   
           }
       })
       return resultArr.length !== 0 ? resultArr : null
}

/**
 * @description: 星期制参数
 */
 export function weekParams() {
     return [
        { id: 1, value: '一' },
        { id: 2, value: '二' },
        { id: 3, value: '三' },
        { id: 4, value: '四' },
        { id: 5, value: '五' },
        { id: 6, value: '六' },
        { id: 0, value: '日' }
      ]
 }

/**
 * @description: 根据设备id获取默认设备名称
 */
 export async function getDeviceNames() {
    let deviceName = []
    return searchDevice({current: 1}).then((res) => {
      if(res.code === 0) {
       return searchDevice({size: res.data.total}).then((res) => {
          let data = res.data.records
          if(data) {
           data.map((x,y) => {
             if(x.status !== 'removed') {
               deviceName.push({
                  name: x.name,
                  id: x.id
               })
             }
          })
                   return deviceName
          } else {
           this.$message.warning('无可用设备，请添加设备')
          }
        })
     } else {
           this.$message.warning(res.msg)
        }
    }
    )
  }

/**
 * @description: 获取规则名称
 */
export async function getRuleNames() {
  let ruleName = []
  return getRules({current: 1}).then((res) => {
    if(res.code === 0) {
     return getRules({size: res.data.total}).then((res) => {
        let data = res.data.records
        if(data) {
         data.map((x,y) => {
              ruleName.push({
                 name: x.name,
                 id: x.id
              })
                 })
                 return ruleName
        } else {
        //  this.$message.warning('无可用规则，请添加规则')
        }
      })
   } else {
         this.$message.warning(res.msg)
      }
  }
  )
}

/**
 * @description: 获取员工姓名及id
 */
 export async function getStaff_name_id() {
  let staff_name_id = []
  return getStaffList({current: 1}).then((res) => {
    if(res.code === 0) {
     return getStaffList({size: res.data.total}).then((res) => {
        let data = res.data.records
        if(data) {
         data.map((x,y) => {
              staff_name_id.push({
                 name: x.name,
                 id: x.id
              })
                 })
                 return staff_name_id
        }
      })
   } else {
         this.$message.warning(res.msg)
      }
  }
  )
}

  /**
 * @description: 员工状态、性别、头像类型、人员类型、通行方向、通行结果、设备/人员告警、设备状态、设备操作、设备类型
 */
  export { userStatus as getUserStatus }
  export { userRoles as getUserRoles }
  export { staffStates as getStaffStates }
  export { visitorAuthorized as getVisitorAuthorized }
  export function getGender() { return genders }
  export function getFaceType() { return faceTypes }
  export function getDirection() { return directions }
  export function getTrafficResult() { return trafficResult } 
  export function getCategory() { return categorys }
  export function getDevice_handle_list() { return deviceHandle }
  export function getDeviceStates() { return deviceStates }
  export function getDeviceISOnline() { return deviceISOnline }
  export function getDeviceTypes() { return deviceTypes }
  export function get_issuePersonStatus() { return issuePersonStatus }
  
  export { personTypes as getPersonTypes }
  
  