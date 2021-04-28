/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-04-09 10:47:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\filters\index.js
 */
// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * @description: 处理日期 'T'
 * @param {*} string
 */
export function filterDate(string) {
  if(string) {
    return string.replace('T', ' ')
  } else {
    return string
  }
}



// 业务数据过滤

import {
  getGender,
  getFaceType,
  getStaffStates,
  getVisitorAuthorized,
  passWay, 
  weekParams, 
  passWayArrHandle, 
  getDeviceNames, 
  get_issuePersonStatus, 
  getPersonTypes,
  getUserRoles,
  getUserStatus
} from '@/utils/business'

const businessData = [
  'success',
  'in'
]

/**
 * @description: 获取角色名称
 * @param {*} Array
 */
let roleId = []
getUserRoles.forEach(item => roleId.push(item.id))
 export function filterUserRoleName(arr) {
  if(arr && Array.isArray(arr) && arr.length !== 0) {
   if(roleId.includes(arr[0])) {
     let index = roleId.indexOf(arr[0])
     return getUserRoles[index].name
   }
}
 }

/**
 * @description: 处理通行结果
 * @param {*} string
 */
export function trafficRersultFilter(string, row) {
  if(string === businessData[0]) {
    return '已通过'
  } else {
    return `未通过`
  }  
}

/**
 * @description: 处理用户状态
 * @param {*} string
 */
 export function filterUserStatus(string) {
 if(string === getUserStatus[0].id) {
  return  '已' + getUserStatus[0].value
} else {
  return  '已' + getUserStatus[1].value
}
}

/**
 * @description: 处理访客授权状态
 * @param {*} string
 */
 export function filterVisitorAuthorized(string) {
  let authorized = null
  
    for(let i = 0; i < getVisitorAuthorized.length; i++) {
      if(getVisitorAuthorized[i].id === string) {
        authorized = getVisitorAuthorized[i].value
      }
    }
    return authorized
 }

/**
 * @description: 处理通行方向
 * @param {*} string
 */
export function trafficDirectionFilter(string) {
  if(string === businessData[1]) {
    return '进'
  } else {
    return '出'
  }
}

/**
 * @description: 处理通行方式
 * @param {*} string
 */
export function verificationModes_handle(value) {
  let modelArr
      if(Array.isArray(value)) {
        modelArr = [...value]
      } else {
        modelArr = value.split()
      }
    let [
      and, // 通行且（face,icCard）
      one, // 通行单（face）
    ] = [[], []]
    
    if(modelArr) {
       modelArr.forEach((item) => {
      if(item.includes(',')) {
        and.push(item)
      } else {
        one.push(item)
      }
    })
      let andOne = [], // 合并通行且与单
          txt = [],
          passArr = passWayArrHandle()
          
      for(let i = 0; i < passArr.length; i++) {
        modelArr.includes(passArr[i].value)
           ? (txt.push(passArr[i].label)
           ) : null
           
      }
      return txt.join(' / ')
      }
}

/**
 * @description: 处理设备下发人员状态
 */
  export function filter_issuePersonStatus(value) {
    if(value.includes(get_issuePersonStatus()[0].id)) {
      return get_issuePersonStatus()[0].value
    } else if(value.includes(get_issuePersonStatus()[1].id)) {
      return get_issuePersonStatus()[1].value
    } else {
      return get_issuePersonStatus()[2].value
    }
  }

/**
 * @description: 处理通行记录人员类型
 */
export function filterPesonType(value) {
  let personTypeName = ''
  getPersonTypes.map((item, index) => {
    if(item['id'] === value) {
      personTypeName = item.name
    }
  })
  return personTypeName
}

/**
 * @description: 处理性别
 */
export function filterGenter(value) {
 return value === getGender()[0].id ? '男' : '女'
}

/**
 * @description: 处理头像类型
 */
 export function filterFaceType(value) {
  return value === getFaceType()[0].id ? '证件照' : '生活照'
 }

 export function filterStaffStates(value, isDelete) {
   let state = null
   getStaffStates.forEach((item) => {
   if(item.ID == value) {
    state = item.value
  }
  if(item.ID == isDelete) {
    state = item.value
  }
})
return state
 }