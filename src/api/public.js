/*
 * @Author: long
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-08-30 17:55:16
 * @LastEditors: Please set LastEditors
 * @Description: 全局代理地址
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\api\article.js
 */
// import request from '@/utils/request'

  /**
 * @description: 公用代理地址
 */

let proxyUrl = 'http://www.hjimi.com'
export { proxyUrl as  proxyUrl_1}

  /**
 * @description: 公用图片地址
 */
export function imgUrl(target, imgId) {
   return `_api/api/v1/person/person-images?imageId=` // 海草上传
}

/**
 * @description: 导出列表
 */
let sdkUrl = 'person/downloadEmployee'
     
function downFile(fileName, target, fileType) {
   　　 if ('download' in document.createElement('a')) {
      　　let link = document.createElement('a')
      　　link.setAttribute('download', `${ fileName }.${ fileType }`);
      　　link.style.display = 'none'
     　　 link.href = `${ process.env.VUE_APP_BASE_API }${ target }`
     　　 document.body.appendChild(link)
      　　link.click()
     　　 document.body.removeChild(link)
   　　} else {
   　　   navigator.msSaveBlob(blob, fileName)
   　　}
   }
   
export function downSdk(fileName) {
   downFile(fileName, sdkUrl, 'sdk')
  }