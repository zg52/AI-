/*
 * @Author: your name
 * @Date: 2021-02-05 16:15:56
 * @LastEditTime: 2021-02-23 14:51:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\views\people-manage\staff-manage\components\index.js
 */
let genders = [
    { value: '男', id: 'male' },
    { value: '女', id: 'female' }
  ],
 faceTypes = [
    { id: '0', name: '证件照' },
    { id: '1', name: '生活照' }
 ]

 export function getGender() {
    return genders
 }
 export function getFaceType() {
    return faceTypes
 }