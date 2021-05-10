/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-05-10 17:20:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\user.js
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import { proxyUrl_1 } from '@/api/public'
import Mock from '../../mock/proxyUrl'
const user = 'user/account/'
export function login(params) {
  return request({
    url:proxyUrl_1,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 用户信息
 */
export function getInfo(token) {
  return request({
    url: `${ user }info`,
    method: 'POST',
    params: { token }
  })
}


/**
 * @description: 获取手机验证码
 */
export function getMobileCode(params) {
  return request({
    url: proxyUrl_1,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 注册
 */
export function reg(params) {
  return request({
    url: proxyUrl_1,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 判断用户名是否可用
 */
 export function isUser(params) {
  return request({
    url: proxyUrl_1,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 判断邮箱是否可用
 */
 export function isEmail(params) {
  return request({
    url: proxyUrl_1,
    method: 'POST',
    data: params
  })
}


/**
 * @description: 登出
 */
export function logout() {
  return request({
    url: `${ user }logout`,
    method: 'POST',
    data: {
      token: getToken()
    }
  })
}

/**
 * @description: 获取邮箱验证码
 */
export function getVerifyCode(params) {
  return request({
    url:  'user/user/verifyCode',
    method: 'GET',
    params
  })
}


/**
 * @description: 修改密码
 */
export function updatePass(params) { 
  return request({
    url:  'user/user/updatePass',
    method: 'POST',
    data: params
  })
}

/**
 * @description: 找回密码
 */
 export function findPass(params) { 
  return request({
    url:  'user/user/findPass',
    method: 'POST',
    data: params
  })
}