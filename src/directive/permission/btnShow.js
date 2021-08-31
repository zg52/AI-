/*
 * @Author: long
 * @Date: 2021-06-02 16:20:24
 * @LastEditTime: 2021-08-31 10:53:26
 * @LastEditors: Please set LastEditors
 * @Description: root和person用户切换按钮指令
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\directive\permission\btnShow.js
 */
import store from '../../store'
import Vue from 'vue'
import { getToken } from '@/utils/auth'
(async function () {
  if(getToken()) {
        setTimeout(() => {
         let category = store.state.user.roles
          if(category) {
            Vue.directive('personTypeShow',{
                inserted (el,binding) {
                 el.style = category == 'root' ? 'display: block' : 'display: none'
                }
              })
          }
        }, 0)
  }
})()