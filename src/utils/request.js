/*
 * @Author: long
 * @Date: 2021-04-23 11:47:43
 * @LastEditTime: 2021-08-27 17:47:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\utils\request.js
 */

import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import qs from 'qs'
import router from "../router"

let hash = window.location.hash
const SERVICE = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 60000
})

SERVICE.interceptors.request.use(
  config => {
    const CONTYPE = config.headers.post['Content-Type']
    if (store.getters.token) {
    config.headers['Authorization'] = getToken()
    // config.headers['token'] = getToken()
    }

/**
 凡是post发送的请求一律序列化为formdata格式 
 规避 json数据类型和multipart复合数据类型（multipart/form-data; boundary=----WebKitFormBoundaryzH3fLs688r84bFB9）
 */
    if (config.data !== undefined && config.data !== null && !config.data.append) {
      if (CONTYPE && CONTYPE.indexOf('application/json') === -1 && CONTYPE.indexOf('multipart/form-data') === -1) {
        if(config.headers['Content-Type'].indexOf('application/json') === -1) {
          config.data = qs.stringify(config.data)
        } 
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

SERVICE.interceptors.response.use(
  response => {
    const {code, msg } = response.data
    
    if(code === 10009) {
      if(!hash.includes('/login')) removeToken(), router.go(0), router.push({path:'/login'})
    }

// 和后台约定 code === 0 为成功标识
    if(code !== 0) { 
      message.error(msg || '系统异常')
    } else {
      return response.data
    }
  },
  error => {
    
/**
 * @description: 处理http状态码————页面提示
 */
       if (error && error.response) {
        const errRes = error.response
        switch (errRes.status) {
          case 400:
            message.warning('参数有误（400）,请重试')
            break
          case 404:
            message.error( `请求地址：${ errRes.data.path } 不存在（404）`)
            break
          case 401:
            router.push({path:'/login'}),  message.info('请登录')
            break
          case 500:
            message.error( `请求地址：${ errRes.data.path } 服务器异常（500）`)
            break
            default: message.error(error.message)
        }
      }
      if (error.toString().indexOf('Error: timeout') !== -1) {  // 请求超时提示
        message.error('请求超时，请刷新重试！')
      }
    return Promise.reject(error)
  }
)

export default SERVICE