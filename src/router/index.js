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
        meta: { title: '总览', icon: 'home', affix: true},
        hidden: true
      }
    ]
  },
]

/**
 * @description: 动态路由切换表
 * 
 */
export const asyncRoutes = [
  {
    path: '/face-recognition/all-services',
    component: Layout,
    children: [
      {
        path: '',
        name: 'allSevices',
        component: () => import('@/views/face-recognition/all-services'),
        meta: { title: '服务概览', icon: 'el-icon-user', roles:'root, iam' },
      },
    ],
  },
  {
    path: '/face-recognition/resourceList',
    component: Layout,
    redirect: '/face-recognition/resource-manage/resource-list/resourceList',
    meta: { title: '资源管理', icon: 'sdk', roles:'root, iam' },
    children: [
      {
        path: '/face-recognition/resourceList',
        name: 'resourceList',
        component: () => import('@/views/face-recognition/resource-manage/resource-list/resourceList'),
        // meta: { title: '资源管理', icon: 'sdk', roles:'root, iam' },
        meta: { title: '资源列表'},
      },
      {
        hidden: true,
        path: '/face-recognition/usageDetails',
        name: 'usageDetails',
        component: () => import('@/views/face-recognition/resource-manage/usage-details/usageDetails'),
        meta: { title: '使用详情' },
      },
      {
        hidden: true,
        path: '/face-recognition/resourcePay',
        name: 'usageDetails',
        component: () => import('@/views/face-recognition/resource-manage/resource-pay/resourcePay'),
        meta: { title: '资源购买' },
      },
    ]
  },
  {
    path: '/face-recognition/faceLibrary-manage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'faceLibraryManage',
        component: () => import('@/views/face-recognition/faceLibrary-manage'),
        meta: { title: '脸库管理', icon: 'el-icon-user', roles:'root, iam' },
      },
    ]
  },
  {
    path: '/face-recognition/service-list',
    component: Layout,
    children: [
      {
        path: 'service-list',
        name: 'serviceList',
        component: () => import('@/views/face-recognition/service-list'),
        meta: { title: '服务列表', icon: 'el-icon-user', roles:'root, iam' },
      },
    ]
  },

  {
    path: '/iam-manage',
    component: Layout,
    meta: { title: 'IAM用户管理', icon: 'el-icon-user', roles:'root' },
    redirect: '/iam-manage/iamList',
    children: [
      {
        path: 'iamList',
        name: 'iamListt',
        component: () => import('@/views/iam-manage/iam-list/iamList'),
        meta: { title: 'IAM用户列表', icon: 'el-icon-user', roles:'root' },
      },
      {
        path: 'iamDetails',
        name: 'iamDetails',
        component: () => import('@/views/iam-manage/iam-details/iamDetails'),
        meta: { title: 'IAM用户详情', icon: 'el-icon-user', roles:'root' },
        hidden: true
      },
    ]
  },
  {
    path: '/iam-log',
    component: Layout,
    redirect: 'iamLog',
    children: [
      {
        path: 'iamLog',
        name: 'iamLog',
        component: () => import('@/views/iam-manage/iam-log/iamLog'),
        meta: { title: 'IAM操作日志', icon: 'el-icon-user', roles:'root, iam' },
      },
    ]
  },
  {
    path: '/iam-role',
    component: Layout,
    redirect: 'roleList',
    meta: { title: '角色管理', icon: 'el-icon-user', roles:'root, iam' },
    children: [
      {
        path: 'roleList',
        name: 'roleList',
        component: () => import('@/views/iam-manage/iam-role/roleList'),
        meta: { title: '角色列表', icon: 'el-icon-user', roles:'root, iam' },
      },
      {
        path: 'addRole',
        name: 'addRole',
        component: () => import('@/views/iam-manage/iam-role/addRole'),
        meta: { title: '新增角色', icon: 'el-icon-user', roles:'root' },
      },
      {
        path: 'roleDetails',
        name: 'roleDetails',
        component: () => import('@/views/iam-manage/iam-role/roleDetails'),
        meta: { title: '角色详情', roles:'root, iam' },
        hidden: true
      },
      {
        path: 'editRole',
        name: 'editRole',
        component: () => import('@/views/iam-manage/iam-role/editRole'),
        meta: { title: '编辑角色', roles:'root' },
        hidden: true
      }
    ]
  },
  {
    path: '/personal-data',
    component: Layout,
    children: [
      {
       path: 'personalData',
       name: 'personalData',
       component: () => import('@/views/personal-center/personal-data/personalData'),
       meta: { title: '账号中心-个人资料', icon: 'el-icon-user', roles:'root, iam' },
     }
    ]
  },
  {
    path: '/enterprise-data',
    component: Layout,
    children: [
      {
       path: 'enterpriseData',
       name: 'enterpriseData',
       component: () => import('@/views/personal-center/enterprise-data/enterpriseData'),
       meta: { title: '账号中心-企业资料', icon: 'el-icon-user', roles:'root' },
     }
    ]
  },
  {
    path: '/application-manage',
    component: Layout,
    redirect: 'applicationList',
    meta: { title: '应用中心-应用管理', icon: 'el-icon-user', roles:'root' },
    children: [
      {
        path: 'applicationList',
        name: 'applicationList',
        component: () => import('@/views/application-manage/applicationList'),
        meta: { title: '应用列表', icon: 'el-icon-user', roles:'root' },
      },
      {
        path: 'addApplication',
        name: 'addApplication',
        component: () => import('@/views/application-manage/addApplication'),
        meta: { title: '新增应用', icon: 'el-icon-user', roles:'root' },
      },
    ]
  },
  {
    path: '/application-log',
    component: Layout,
    redirect: '/application-manage/applicationList',
    meta: { title: '应用中心-应用管理', icon: 'el-icon-user', roles:'root, iam' },
    children: [
      {
        path: 'applicationLog',
        name: 'applicationLog',
        component: () => import('@/views/application-manage/application-log/applicationLog'),
        meta: { title: '应用中心-报表日志', icon: 'el-icon-user', roles:'root, iam' },
      }
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
        meta: { title: 'SasS服务', icon: 'sass' },
      },
      {
        path: 'sassDes',
        name: 'sassDes',
        component: () => import('@/views/sass-manage/sassList/sassDes'),
        meta: { title: 'SasS服务详情', icon: 'sass'},
        hidden: true 
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
        meta: { title: 'PasS服务', icon: 'sdk' },
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
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 全局配置TDK
const HEAD = document.getElementsByTagName('head')[0]
let meta_keywords = document.createElement('meta')
    meta_keywords.name = 'description'
    meta_keywords.content = '华捷艾米智能云服务平台'
    HEAD.appendChild(meta_keywords)


export default router