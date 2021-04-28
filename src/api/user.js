/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-03-26 17:52:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\user.js
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const user = 'user/account/'
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
    url: `${ user }info`,
    method: 'POST',
    params: { token }
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