/*
 * @Author: long
 * @Date: 2021-06-03 11:47:23
 * @LastEditTime: 2021-08-26 20:50:12
 * @LastEditors: Please set LastEditors
 * @Description: 文本提示
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\utils\txtTip.js
 */


class Tip {
    pass() {
        return '设置的密码应为字母、数字和符号（仅限 ASCII 标准字符）组合，长度在12~18字符之间'
    }
}

const TIP = new Tip()

export function passTip () {
    return TIP.pass()
}