/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-03-05 18:54:03
 * @LastEditors: Please set LastEditors
 * @Description: 全局路由钩子
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\permission.js
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' // 从cookie中获取token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 加载条配置

const whiteList = ['/login', '/auth-redirect'] // 无需重定向白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  // 设置页标签标题
 document.title = getPageTitle(to.meta.title)

  // 确认用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') { // 若登陆去主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 通过getInfo判断用户是否获得了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          //获取用户信息
          //注意:role必须是一个对象数组!例如:['admin']或['developer'，'editor']
          const { roles } = await store.dispatch('user/getInfo')

          //根据角色生成可访问路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

            //点击方法，以确保地址路由是完整的
           //设置replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除令牌，然后转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 加载条
router.afterEach(() => {
  NProgress.done()
})