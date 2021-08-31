/*
 * @Author: long
 * @Date: 2021-04-23 11:47:43
 * @LastEditTime: 2021-08-31 10:57:33
 * @LastEditors: Please set LastEditors
 * @Description: 按钮权限（具体权限一览表，请对照产品原型）
 * @FilePath: \ant-design-vue-jeecge:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\directive\permission\index.js
 */
import permission from './permission'

const install = function(Vue) {
  Vue.directive('permission', permission)
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install) // eslint-disable-line
}

permission.install = install
export default permission
