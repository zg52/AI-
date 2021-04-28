/*
 * @Author: your name
 * @Date: 2021-02-05 16:15:56
 * @LastEditTime: 2021-02-22 17:56:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\views\people-manage\staff-manage\components\index.js
 */
let genders = [
    { id: 'male' , value: '男' },
    { id: 'female', value: '女'  }
  ],
 faceTypes = [
    { id: 'id', name: '证件照' },
    { id: 'life', name: '生活照' }
 ]

 export function getGender() {
    return genders
 }
 export function getFaceType() {
    return faceTypes
 }

