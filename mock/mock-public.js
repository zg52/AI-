/*
 * @Author: your name
 * @Date: 2021-01-09 18:22:11
 * @LastEditTime: 2021-02-02 16:47:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\mock\public.js
 */
const { deepClone } = require('./utils')
const { asyncRoutes, constantRoutes } = require('./role/routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
    {
      key: 'admin',
      name: 'admin',
      description: 'Super Administrator. Have access to view all pages.',
      routes: routes
    },
    {
      key: 'editor',
      name: 'editor',
      description: 'Normal Editor. Can see all pages except permission page',
      routes: routes.filter(i => i.path !== '/permission')// just a mock
    },
    {
      key: 'visitor',
      name: 'visitor',
      description: 'Just a visitor. Can only see the home page and the document page',
      routes: [{
        path: '',
        redirect: 'dashboard',
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            meta: { title: 'dashboard', icon: 'dashboard' }
          }
        ]
      }]
    }
  ]
var Mock = require('mockjs')
// 登录
 Mock.mock('https://www.zg.com', {
    code: 0,
    data: {
        token: '',
    },
    msg: "操作成功",
})

// 用户权限信息
Mock.mock('http://www.xuefu.com/', {
    code: 0,
    data: {
                roles: ['admin','viewer'],
                introduction: '超管',
                avatar: '../../assets/image/user.png',
                name: 'Super Admin'
    },
    msg: "操作成功",
    
})

Mock.mock('http://xian.xuefu.com/', {
    code: 0,
    data: routes,
    msg: "操作成功",
    
})


Mock.mock('http://beijing.xuefu.com/', {
    code: 0,
    data: roles,
    msg: "操作成功",
    
})