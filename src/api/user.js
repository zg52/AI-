/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-05-24 18:57:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\user.js
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import Mock from '../.././mock/proxyUrl'
import { proxyUrl_1 } from './public'
const user = 'public/'

/**
 * @description: 登录
 */
export function login(params) {
  return request({
    url: `${ user }login`,
    method: 'POST',
    data: params
  })
}


/**
 * @description: 用户信息
 */
export function getInfo(token) {
  return request({
    url: 'api/user/info',
    // url:proxyUrl_1,
    method: 'GET',
    params: { token }
  })
}


/**
 * @description: 获取手机验证码
 */
export function getMobileCode(params) {
  return request({
    url: `${ user }verification`,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 注册
 */
export function reg(params) {
  return request({
    url: `${ user }register`,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 判断用户名是否可用
 */
 export function isUser(username, mobile) {
  return request({
    url: `${ user }/exist`,
    method: 'POST',
    data: {
      username: username,
      mobile: mobile
    }
  })
}

/**
 * @description: 判断邮箱是否可用
 */
 export function isEmail(params) {
  return request({
    url: ``,
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
    url:  `${ user }/forgot`,
    method: 'POST',
    data: params
  })
}