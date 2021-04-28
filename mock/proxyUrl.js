/*
 * @Author: your name
 * @Date: 2021-02-02 16:48:00
 * @LastEditTime: 2021-02-02 17:03:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\mock\proxyUrl.js
 */
var Mock = require('mockjs')

// 充当全局成功接口
 Mock.mock('http://www.zg.com', {
    code: 0,
    data: [],
    msg: "操作成功",
})