/*
 * @Author: long
 * @Date: 2021-04-23 11:47:43
 * @LastEditTime: 2021-08-27 10:56:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\api\user.js
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import { userPermission } from './role'
// import Mock from '../.././mock/proxyUrl'
// import { proxyUrl_1 } from './public'
const USER = 'open-cloud-console/public/',
      CLOUD = 'open-cloud-console/'

/**
 * @description: 登录
 * @param {object} => {type, username, password}
 */
export function login(params) { return request({ url: `${ CLOUD }login/login`, method: 'POST', data: params }) }

/**
 * @description: 获取用户信息
 * @param {string}
 */
export function getInfo(token) { return request({ url: `${ CLOUD }api/user/info`, method: 'GET' })}

/**
 * @description: 获取手机验证码
 * @param {number} => phone 
 */
export function getMobileCode(params) { return request({ url: `${ USER }verification`, method: 'POST', data: params }) }

/**
 * @description: 获取邮箱验证码（注册）
 * @param {object} => email
 */
 export function getEmailCode_reg(params) { return request({ url:  `${ CLOUD }verify/sendEmailVerifyCodeUser`, method: 'GET', params }) }

/**
 * @description: 获取邮箱验证码（找回密码）
 * @param {object} => {username, email}
 */
 export function getEmailCode_findPass(params) { return request({ url:  `${ CLOUD }verify/forget/sendEmailVerifyCode`, method: 'GET', params }) }

/**
 * @description: 个人注册
 * @param {object}
 */
export function regPerson(params) { return request({ url: `${ CLOUD }register/register`, method: 'POST', data: params }) }

/**
 * @description: 企业注册
 * @param {object}
 */
 export function regCom(params) { return request({ url: `${ CLOUD }register/register/com`, method: 'POST', data: params }) }

/**
 * @description: 判断用户名是否可用
 * @param {string}
 */
 export function isUser(username) { return request({ url: `${ CLOUD }verify/existForUserName`, method: 'POST', data: { username: username, } }) }

/**
 * @description: 判断手机号是否可用
 * @param {number}
 */
 export function isPhone(mobile) { return request({ url: `${ CLOUD }verify/existForMobile`, method: 'POST', data: { mobile: mobile } }) }

/**
 * @description: 判断邮箱是否可用
 * @param {object}
 */
 export function isEmail(params) { return request({ url: ``, method: 'POST', data: params }) }

/**
 * @description: 登出
 * @param {string}
 */
export function logout() { return request({ url: `${ CLOUD }/login/logout`, method: 'POST', data: { token: getToken() } }) }

/**
 * @description: 修改密码
 * @param {object}
 */
export function updatePass(params) { return request({ url:  'user/user/updatePass', method: 'POST', data: params }) }

/**
 * @description: 找回密码
 * @param {object}
 */
 export function findPass(params) { return request({ url: `${ CLOUD }verify/forgotPasswordForEmail`, method: 'POST', data: params }) }

 /**
 * @description: 获取用户权限表
 * @param {object}
 */
  export function getUserPermission() { return userPermission() }