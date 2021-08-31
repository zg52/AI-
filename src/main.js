/*
 * @Author: long
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-08-31 12:12:08
 * @LastEditors: Please set LastEditors
 * @Description: 全局入口文件
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\main.js
 */
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // 替代CSS重置

import Element from 'element-ui'
import './styles/element-variables.scss'


import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // 权限控制
// import './utils/error-log' // 错误日志
import '../mock/mock-public'
import * as filters from './filters' // 全局过滤

/**
 * 按钮权限指令
 * 该指令分为俩种
 * 1.按照用户类型（root、iam） 2.按照产品原型自定义 
 */
import './directive/permission/btnShow' 
import permission from './directive/permission/index'
Vue.use(permission)
/* end */

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * 目前，MockJs将用于生产环境  ,
 * 请在上线前将其删除 ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
  //   const { mockXHR } = require('../mock')
  //   mockXHR()
  // }
  
  Vue.use(Element, {
    size: Cookies.get('size') || 'medium',
    i18n: (key, value) => i18n.t(key, value)
  })
  import './antd.js'
  import '@/styles/index.scss' // 全局样式

// 注册全局实用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app")