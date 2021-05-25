import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/explain',
    component: () => import('@/views/explain/index'),
    hidden: true
  },
  {
    path: '/reg',
    component: () => import('@/views/login/reg'),
    hidden: true
  },
  {
    path: '/regSuccess',
    component: () => import('@/views/login/regSuccess'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'home', affix: true, }
      }
    ]
  }, 
   {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true },
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/iam-manage',
    component: Layout,
    children: [
      {
        path: 'iamList',
        name: 'iamList',
        component: () => import('@/views/iam-manage/iamList/iamList'),
        meta: { title: 'IAM用户管理', icon: 'el-icon-user', roles:'root, iam' },
      },
    ]
  },
  {
    path: '/sass-manage',
    component: Layout,
    children: [
      {
        path: 'sassList',
        name: 'sassList',
        component: () => import('@/views/sass-manage/sassList/sassList'),
        meta: { title: 'Sass服务', icon: 'sass' },
      },
    ]
  },
  {
    path: '/pass-manage',
    component: Layout,
    children: [
      {
        path: 'passList',
        name: 'passList',
        component: () => import('@/views/pass-manage/passList/passList'),
        meta: { title: 'Pass服务', icon: 'sdk' },
      },
    ]
  },
  {
    path: '/documents',
    component: Layout,
    children: [
      {
        path: 'docList',
        name: 'docList',
        component: () => import('@/views/documents/docs/docList'),
        meta: { title: '文档中心', icon: 'docs' },
      },
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'about',
        component: () => import('@/views/about/index'),
        meta: { title: '关于', icon: 'about' }
      }
    ]
  },
  {
    path: '/system-manage',
    component: Layout,
    name: 'system-manage',
    meta: { title: '系统管理', icon: 'el-icon-setting', noCache: true, roles:'root' },
    redirect: '/system-manage/user',
    children: [
          {
            path: 'user',
            component: () => import('@/views/system-manage/user'),
            name: 'user',
            meta: { title: '用户管理', icon: 'user' }
          },
          {
            path: 'permission',
            component: () => import('@/views/system-manage/'),
            redirect: '/system-manage/permission/role',
            alwaysShow: true,
            name: 'permission',
            meta: { title: '权限管理', icon: 'lock' },
            children: [
              {
                path: 'role',
                component: () => import('@/views/system-manage/permission/role'),
                name: 'role',
                meta: { title: '角色权限' },
                hidden: true
              }
            ]
          },
          {
            path: 'ulog',
            component: () => import('@/views/system-manage/ulog'),
            name: 'ulog',
            meta: { title: '操作日志', icon: 'clipboard' },
          }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// // 全局配置TDK
const HEAD = document.getElementsByTagName('head')[0]
let meta_keywords = document.createElement('meta')
    meta_keywords.name = 'description'
    meta_keywords.content = '华捷艾米智能云服务平台'
    HEAD.appendChild(meta_keywords)


export default router