constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: 'views/redirect/index',
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }, 
   {
    path: '/profile',
    component: 'layout/Layout',
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: 'views/profile/index',
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true },
      }
    ]
  }
]


const asyncRoutes =
[
 {
    path: '/door-manage',
    component: 'layout/Layout',
    redirect: '/door-manage/people-manage/staff-manage/staff-list',
    name: 'door-manage',
    meta: { title: '门禁管理', icon: 'door4'},
    children: [
      {
        path: 'people-manage',
        component: '/views/door-manage/people-manage', // Parent router-view
        name: 'people-manage',
        meta: { title: '人员管理', icon: 'peoples' },
        redirect: '/door-manage/people-manage/staff-manage/staff-list',
        children: [
          {
            path: 'staff-manage',
            component: '/views/door-manage/people-manage/staff-manage',
            name: 'staff-manage',
            redirect: '/door-manage/people-manage/staff-manage/staff-list',
            meta: { title: '员工管理' },
            children: [  
              {
                path: 'staff-list',
                component: '/views/door-manage/people-manage/staff-manage/staff-list',
                name: 'staff-list',
                meta: { title: '员工列表', roles: ['viewer'] }
              },
              {
                path: 'staff-add',
                component: '/views/door-manage/people-manage/staff-manage/staff-add',
                name: 'staff-add',
                meta: { title: '员工新增' }
              }
            ]
          },
          {
            path: 'visitor-manage',
            component: '/views/door-manage/people-manage/visitor-manage',
            name: 'visitor-manage',
            meta: { title: '访客管理' },
            redirect: '/door-manage/people-manage/visitor-manage/list',
            children: [
              {
                path: 'list',
                component: '/views/door-manage/people-manage/visitor-manage/list',
                name: 'list',
                meta: { title: '访客列表' }
             },
             {
              path: 'mack',
              component: '/views/door-manage/people-manage/visitor-manage/mack',
              name: 'mack',
              meta: { title: '访客预约' }
           }
          ]
          }
        ]
      },
      {
        path: '/face-manage',
        name: 'face-manage',
        component: '/views/door-manage/face-manage',
        meta: { title: '脸库管理', icon: 'faceManage' }
      },
      {
        path: '/traffic-rules',
        name: 'traffic-rules',
        component: '/views/door-manage/traffic-rules',
        meta: { title: '通行规则', icon: 'trafficRules' },
        children: [
          {
            path: 'set',
            component: '/views/door-manage/traffic-rules/set',
            name: 'set',
            meta: { title: '设置规则' }
         },
         {
          path: 'rules',
          component: '/views/door-manage/traffic-rules/rules',
          name: 'rules',
          meta: { title: '已下发规则' }
       },
      ]
      },
      {
        path: '/traffic-records',
        name: 'traffic-records',
        component: '/views/door-manage/traffic-records',
        meta: { title: '通行记录', icon: 'trafficRecords' },
        redirect: '/traffic-records/list',
        children: [
          {
            path: 'list',
            component: '/views/door-manage/traffic-records/list',
            name: 'list',
            meta: { title: '记录列表' }
         },
         {
          path: 'alarm',
          component: '/views/door-manage/traffic-records/alarm',
          name: 'alarm',
          meta: { title: '告警列表' }
       },
      ]
      },
    ]
  },
  {
    path: '/device-manage',
    name: 'device-manag',
    component: 'layout/Layout',
    meta: { title: '设备管理', icon: 'el-icon-video-camera-solid' },
    redirect: '/device-manage/door',
    children: [
      {
        path: 'door',
        name: 'door',
        component: '/views/device-manage/door',
        meta: { title: '门禁机', icon: 'door' },
      },
      {
        path: 'camera',
        name: 'camera',
        component: '/views/device-manage/camera',
        meta: { title: '摄像头', icon: 'camera' },
      }
    ]
  },
  {
    path: '/system-manage',
    component: 'layout/Layout',
    name: 'system-manage',
    meta: { title: '系统管理', icon: 'el-icon-setting', noCache: true },
    redirect: '/system-manage/user',
    children: [
          {
            path: 'user',
            component: '/views/system-manage/user',
            name: 'user',
            meta: { title: '用户管理', icon: 'user', roles: ['admin','viewer'] }
          },
          {
            path: 'permission',
            component: '/views/system-manage/',
            redirect: '/system-manage/permission/role',
            alwaysShow: true,
            name: 'permission',
            meta: { title: '权限管理', icon: 'lock', roles: ['admin', 'editor'] },
            children: [
              {
                path: 'role',
                component: '/views/system-manage/permission/role',
                name: 'role',
                meta: { title: '角色权限', roles: ['admin'] } 
              }
            ]
          }
    ]
  },
  {
    path: '/pdf/download',
    component: '/views/pdf/download',
    hidden: true
  },
  {
    path: '/theme',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        component: '/views/theme/index',
        name: 'Theme',
        meta: { title: '换肤', icon: 'theme' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
