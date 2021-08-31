/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 判值法
 * 数组或对象深拷贝
 * @param {Object || Array} Obejct
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/** 递归法
 * 数组或对象深拷贝
 * @param {Object || Array} Obejct
 */
 export function deepCopy (obj) {
  var newobj = obj.constructor === Array ? [] : {}
  if(typeof obj !== 'object'){
      return
  }
  for(var i in obj){
     newobj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
  }
  return newobj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}



/**
 * @description: 日期查询参数
 */
export function pickerOptions(tomorrow) {
  let date1 = {
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", [new Date(), new Date()])
          },
        },
        {
          text: "昨天",
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            picker.$emit("pick", [start, start])
          },
        },
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit("pick", [start, end])
          },
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit("pick", [start, end])
          },
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit("pick", [start, end])
          },
        },
        {
          text: "最近六个月",
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 6)
            picker.$emit("pick", [start, end])
          },
        },
      ]
  }
  if(tomorrow !== undefined) {
    let t =  {
      text: "明天",
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() + 3600 * 1000 * 24)
        picker.$emit("pick", [start, start])
      },
    },
     t1 =  {
      text: "后天",
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() + (3600 * 1000 * 24) * 2)
        picker.$emit("pick", [start, start])
      },
    },
      date2_Shortcuts = [...date1.shortcuts]
      date2_Shortcuts.splice(1, 0, t)
      date2_Shortcuts.splice(2, 0, t1)
       return {
        shortcuts: date2_Shortcuts
       }
  } else {
    return date1
  }
 }

 /**
 * @description: 文件下载
 */
  class DownFile {

    // 此方法只针对浏览器不能解析的文件进行下载，若是带后缀名的图片和pdf等不支持
       parse_file(url, fileName) {
        if ('download' in document.createElement('a')) {
          　　let link = document.createElement('a')
          　　link.setAttribute('download', `${ fileName }`);
          　　link.style.display = 'none'
         　　 link.href = `${ process.env.VUE_APP_BASE_API }${ url }`
         　　 document.body.appendChild(link)
          　　link.click()
         　　 document.body.removeChild(link)
       　　} else {
       　　   navigator.msSaveBlob(blob, fileName)
       　　}
       }
    
//  支持所有文件下载(单文件)
       nslookup_file(url) {
        let domForm = document.createElement('form'),
        npt = document.createElement('input')
        domForm.appendChild(npt)
        // npt.setAttribute('name', 'imageId')
        // npt.setAttribute('value', value)
        domForm.setAttribute('method', 'get')
        domForm.setAttribute('action', `${ process.env.VUE_APP_BASE_API }${ url }`)
        domForm.style.display = 'none'
        document.body.appendChild(domForm)
          domForm.submit()
        document.body.removeChild(domForm)
       }
    
// 支持所有图片下载
       downloadIamge(imgsrc, name) {
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous")
        image.onload = function() {
          let canvas = document.createElement("canvas")
          canvas.width = image.width
          canvas.height = image.height
          let context = canvas.getContext("2d")
          context.drawImage(image, 0, 0, image.width, image.height)
          let url = canvas.toDataURL("image/png"), //得到图片的base64编码数据
              a = document.createElement("a"),
              event = new MouseEvent("click")
          a.download = name || "photo"
          a.href = url
          a.dispatchEvent(event)
        };
        image.src = `${ process.env.VUE_APP_BASE_API }${ imgsrc }`
      }
    
    // 将文本信息下载为文件
      downloadTxt(content, filename) {
        var link = document.createElement('a');
        link.download = filename;
        link.style.display = 'none';
        var blob = new Blob([content]);
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
     }
    export const DOWNFILE = new DownFile()
    
        
     /**
     * @description: 获取系统时分秒
     */
    export function getSystemTime() {
      let timer = null
     setInterval(function(){
        let time = new Date()
        let hour = checkTime(time.getHours())
        let minite = checkTime(time.getMinutes())
        let second = checkTime(time.getSeconds())
        function checkTime(i){
            if(i<10) return "0"+i
            return i
        }
        timer = hour+":"+minite+":"+second  
        return timer
       },1000)
    }
    
 /**
 * @description: 信息转为base64
 */
    export function encodes(str){
      var Base64 = {
          // private property
          _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      
          // public method for encoding
          encode: function(input) {
              var output = "";
              var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
              var i = 0;
      
              input = Base64._utf8_encode(input);
      
              while (i < input.length) {
      
                  chr1 = input.charCodeAt(i++);
                  chr2 = input.charCodeAt(i++);
                  chr3 = input.charCodeAt(i++);
      
                  enc1 = chr1 >> 2;
                  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                  enc4 = chr3 & 63;
      
                  if (isNaN(chr2)) {
                      enc3 = enc4 = 64;
                  } else if (isNaN(chr3)) {
                      enc4 = 64;
                  }
      
                  output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      
              }
      
              return output;
          },
      
          // public method for decoding
          decode: function(input) {
              var output = "";
              var chr1, chr2, chr3;
              var enc1, enc2, enc3, enc4;
              var i = 0;
      
              input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      
              while (i < input.length) {
      
                  enc1 = this._keyStr.indexOf(input.charAt(i++));
                  enc2 = this._keyStr.indexOf(input.charAt(i++));
                  enc3 = this._keyStr.indexOf(input.charAt(i++));
                  enc4 = this._keyStr.indexOf(input.charAt(i++));
      
                  chr1 = (enc1 << 2) | (enc2 >> 4);
                  chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                  chr3 = ((enc3 & 3) << 6) | enc4;
      
                  output = output + String.fromCharCode(chr1);
      
                  if (enc3 != 64) {
                      output = output + String.fromCharCode(chr2);
                  }
                  if (enc4 != 64) {
                      output = output + String.fromCharCode(chr3);
                  }
      
              }
      
              output = Base64._utf8_decode(output);
      
              return output;
      
          },
      
          // private method for UTF-8 encoding
          _utf8_encode: function(string) {
              string = string.replace(/\r\n/g, "\n");
              var utftext = "";
      
              for (var n = 0; n < string.length; n++) {
      
                  var c = string.charCodeAt(n);
      
                  if (c < 128) {
                      utftext += String.fromCharCode(c);
                  } else if ((c > 127) && (c < 2048)) {
                      utftext += String.fromCharCode((c >> 6) | 192);
                      utftext += String.fromCharCode((c & 63) | 128);
                  } else {
                      utftext += String.fromCharCode((c >> 12) | 224);
                      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                      utftext += String.fromCharCode((c & 63) | 128);
                  }
      
              }
      
              return utftext;
          },
      
          // private method for UTF-8 decoding
          _utf8_decode: function(utftext) {
              var string = "";
              var i = 0;
              var c = c1 = c2 = 0;
      
              while (i < utftext.length) {
      
                  c = utftext.charCodeAt(i);
      
                  if (c < 128) {
                      string += String.fromCharCode(c);
                      i++;
                  } else if ((c > 191) && (c < 224)) {
                      c2 = utftext.charCodeAt(i + 1);
                      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                      i += 2;
                  } else {
                      c2 = utftext.charCodeAt(i + 1);
                      c3 = utftext.charCodeAt(i + 2);
                      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                      i += 3;
                  }
      
              }
      
              return string;
          }
      
      }
      return Base64.encode(str)
      }
    
 /**
* @description 按需格式化 年月日分秒
* @param {obj, ...string}
* @returns {Date}
*/
      export function getDates(obj, rawDate, createTimeFrom, createTimeTo, switchParam, onece) {
        if(onece === 2) {
          rawDate && rawDate.length
            ? ( obj[createTimeFrom] = moment( rawDate[0]).format(`YYYY-MM-DD${ switchParam }`), (obj[createTimeTo] = moment( rawDate[1]).format(`YYYY-MM-DD${ switchParam }`)) )
            :  obj[createTimeFrom] = obj[createTimeTo] = null
        } else if(onece === 1) {
          obj[createTimeFrom] = moment(rawDate[0]).format(`YYYY-MM-DD${ switchParam }`)
        }
      }
    
 /**
* @description 复制文本信息
* @param {txt}
* @returns {Date}
*/
      export function copyTxtHandle(txt, isMsg, tipFun) {
        let isM = isMsg ?? false
        try {
          let npt = document.createElement('input')
            npt.value = txt
            document.body.appendChild(npt)
            npt.select()
            document.execCommand("Copy")
            document.body.removeChild(npt)
            if(isM) {
              // Message.success('复制成功')
              tipFun()
            }
        } catch {
          document.body.removeChild(npt)
        }
   }