import { login, logout, getInfo } from '@/api/user'
import { personal_msg, enterprise_msg } from '@/api/personalCenter'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
// import md5 from 'js-md5'

const state = {
  token: getToken(),
  username: '',
  mobile:'',
  email: '',
  avatar: '',
  introduction: '', // 产品应用列表
  roles: [], // 角色（只针对root用户和iam用户处理）
  userType: '' // 当前登录用户类型(两种：person、company)
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_TYPE: (state, userType) => {
    state.userType = userType
  }
}

const actions = {
// 登录
  login({ commit }, userInfo) {
    const {type, domain, username, password } = userInfo
    return new Promise((resolve, reject) => {
      let param = {
        type: type,
        domain: domain,
        username: username, 
        password: password
        // password: md5(password).toUpperCase()
      }
      if(type === 'USER') delete param.domain
      
      login(param).then(response => {
        const {code, msg, data } = response
        if(code === 0) {
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(data)
        } else {
          reject(msg)
          // message.error(msg, 5000)
        }
      }).catch(error => {
        resolve(null)
        // message.error(error)
      })
    })
  },

// 获取登录时的用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data, msg } = response
        if (!data) {
          message.error(msg)  // '验证失败，请重新登录！'
        } else {
          let {type, category, username, mobile, email, avatar, introduction } = data
        if (!category || category.length <= 0) {
          // reject('角色必须是一个非空数组!')
          message.error('该账户无权访问，请联系管理员!')
        }
        commit('SET_USERNAME', username)
        commit('SET_MOBILE', mobile)
        commit('SET_EMAIL', email)
        
        commit('SET_ROLES', [category])
        commit('SET_USER_TYPE', type)
        
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
        }
      }).catch(error => {
        removeToken()
      
      })
    })
  },

//  获取个人账号信息
  async getPersonalInfo({ commit, state, dispatch }) {
   return await personal_msg().then(res => {
     if(res && res.data.hasOwnProperty('username')){
       return res.data
     } else {
      message.error('个人资料信息获取失败！')
     }
   })
  },

//  获取个人账号对应的企业信息
  async getEnterpriseInfo({ commit, state, dispatch }) {
    return await enterprise_msg().then(res => {
      if(res && res.data){
        if(res.data.hasOwnProperty('companyName'))
        return res.data
      } else {
       message.error('企业资料信息获取失败！')
      }
    })
   },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        message.error(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}