/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-03-26 17:43:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\utils\request.js
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import qs from 'qs'
import router from "../router"

let hash = window.location.hash
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 60000
})

// request interceptor
service.interceptors.request.use(
  config => {
    
    const conType = config.headers.post['Content-Type']
    if (store.getters.token) {
    config.headers['Authorization'] = getToken()
    }

// 凡是post发送的请求一律序列化为formdata格式
    if (config.data !== undefined && config.data !== null && !config.data.append) {
      if (conType && (conType.indexOf('application/json') && conType.indexOf('multipart/form-data')) === -1) {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const {code, msg } = response.data
    
    if(code === 10009) {
      if(!hash.includes('/login')) removeToken(), router.go(0), router.push({path:'/login'})
    }
    return response.data
  },
  error => {
    
/**
 * @description: 处理http状态码————页面提示
 */
       if (error && error.response) {
        const errRes = error.response
        switch (errRes.status) {
          case 400:
            Message({
              message: "参数有误（400）,请重试",
              type: "warning",
              duration: 5 * 1000
            })
            break
          case 404:
            Message({
              message: `请求地址：${ errRes.data.path } 不存在（404）`,
              type: "error",
              duration: 5 * 1000
            })
            break
          case 401:
            router.push({path:'/login'}),  Message('请登录', 5000)
            break
          case 500:
            Message({
              message: `请求地址：${ errRes.data.path } 服务器异常（500）`,
              type: "error",
              duration: 10 * 1000
            })
            break
            default: Message.error(error.message, 5000)
        }
      }
      if (error.toString().indexOf('Error: timeout') !== -1) {  // 请求超时提示
        Message.error('请求超时，请刷新重试！', 60000)
      }
    return Promise.reject(error)
  }
)

export default service