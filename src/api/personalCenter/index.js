/*
 * @Author: long
 * @Date: 2021-06-02 11:10:56
 * @LastEditTime: 2021-08-31 17:44:20
 * @LastEditors: Please set LastEditors
 * @Description: 账号中心（包含个人资料和企业资料）
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\api\personalCenter\index.js
 */


import request from '@/utils/request'
const CENTER = 'open-cloud-console/api/user/'

// --------------------------------------------------- 个人资料 -----------------------------------------------------
/**
 * @description: 查看个人资料
 * @param {object}
 */
 export function personal_msg(params) { return request({ url: `${ CENTER }showPeronInfos`, method: 'GET', params }) }
 
/**
 * @description: 邮箱验证码
 * @param {object}
 */
 export function personal_VerifyCode_email(params) { return request({ url: `${ CENTER }sendEmailVerifyCodeForUpdateEmail`, method: 'GET', params }) }

 /**
 * @description: 修改邮箱
 * @param {object}
 */
  export function personal_edit_email(params) { return request({ url: `${ CENTER }updateEmail`, method: 'POST', data: params }) }

/**
 * @description: 修改个人资料（手机、专属域名、用户名）
 * @param {object}
 */
 export function personal_edit_msg(params) { return request({ url: `${ CENTER }updateInfo`, method: 'POST', data: params }) }

  /**
 * @description: 修改个人认证
 * @param {object}
 */
 export function personAuthentication(params) { return request({ url: `${ CENTER }personAuthentication`, method: 'POST', data: params }) }
 

 // --------------------------------------------------- 企业资料 -----------------------------------------------------
   /**
 * @description: 修改企业认证认证
 * @param {object}
 */
 export function enterpriseAuthentication(params) { return request({ url: `${ CENTER }enterpriseAuthentication`, method: 'POST', data: params }) }
 
/**
 * @description: 查看个人资料
 * @param {object}
 */
 export function enterprise_msg(params) { return request({ url: `${ CENTER }enterpriseInfo`, method: 'GET', params }) }

 /**
 * @description: 查看企业执照
 * @param {object}
 */
  export function enterprise_img(fileName) { return request({ url: `${ CENTER }readImg?fileName=${ fileName }`, method: 'GET' }) }