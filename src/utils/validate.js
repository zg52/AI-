/*
 * @Author: long
 * @Date: 2021-04-23 11:47:43
 * @LastEditTime: 2021-08-27 16:13:41
 * @LastEditors: Please set LastEditors
 * @Description: 全局字段校验方法
 * @FilePath: \ant-design-vue-jeecge:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\utils\validate.js
 */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} str
 */
 export function validName(str) {
  const reg = /^[a-zA-Z\u4e00-\u9fa5]+$/
  return reg.test(str)
}


/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(phone) {
  const reg = /^1[3456789]\d{9}$/;
  return reg.test(phone)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 *  @description 数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
* @description 身份证
 * @param {string} str 
 * @returns {Boolean}
 */
export function validateIdCard(idCard){
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard) ? true : false
}

/**
 * @description 不能输入中文和特殊字符
 * @param {string} str 
 * @returns {Boolean}
 */
export function validateChinese(str){
  return /[^\w]/.test(str) ? true : false
}

/**
 * @description 不能输入特殊字符
 * @param {string} str
 * @returns {Boolean}
 */
 export function validateChars(str){
  return /[^\u4e00-\u9fa5\w]/.test(str) ? true : false
}

/**
 * @description 输入12~18位数字、字母和符号组合的密码
 * @param {string} str 
 * @returns {Boolean}
 */
export function validatePass(str) {
  return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{12,18}$/.test(str)
}

/**
 * @description 名称校验，数字和字母组合名称（默认 4~20位）
 * @param {string} str 
 * @returns {Boolean}
 */
 export function validateNames(str, num1, num2) {
   let startNum = num1 || 4, endNum = num2 || 20
   let nameReg = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{' + startNum + ',' + endNum + '}$', 'g')
   return nameReg.test(str)
}

/**
 * @description 社会统一信用代码
 * @param {string} str 
 * @returns {Boolean}
 */
 export function validateCreditCode(str) {
  return /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g.test(str)
}