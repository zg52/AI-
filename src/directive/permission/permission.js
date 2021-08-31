/*
 * @Author: long
 * @Date: 2021-04-23 11:47:43
 * @LastEditTime: 2021-08-31 13:39:06
 * @LastEditors: Please set LastEditors
 * @Description: 按钮权限（具体权限一览表，请对照产品原型）
 * @FilePath: \ant-design-vue-jeecge:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\directive\permission\permission.js
 */
import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const roles = store.getters && store.getters.roles
  console.log("🚀 ~ file: permission.js ~ line 14 ~ checkPermission ~ roles", roles)

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['root','iam']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
