/*
 * @Author: your name
 * @Date: 2021-02-09 18:33:47
 * @LastEditTime: 2021-05-24 11:15:50
 * @LastEditors: Please set LastEditors
 * @Description: 全局业务参数配置及信息获取
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\utils\business.js
 */

/**
 * @description: 全局业务数据字典
 */
   
const
  userRoles = [
    { id: 1, name: '超级管理员' }, //superAdmin
    { id: 2, name: '管理员' }, //admin
     ],
     
// 产品列表
    productList = [
      { value: 1, label: '人脸识别算法' },
      { value: 2, label: '人脸识别闸机/门禁'}
     ],
     
//  iam用户状态
     iamStatus = [
       { key: 'normal', value: '已启用' },
       { key: 'pending', value: '待审核' },
       { key: 'rejected', value: '已拒绝' },
       { key: 'disabled', value: '已禁用' },
     ]

  /**
 * @description:  
 */
  export { productList as productLists }
  export { iamStatus as getIamStatus }