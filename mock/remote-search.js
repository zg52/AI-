/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-01-10 11:00:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\mock\remote-search.js
 */
// const Mock = require('mockjs')

// const NameList = []
// const count = 100

// for (let i = 0; i < count; i++) {
//   NameList.push(Mock.mock({
//     name: '@first'
//   }))
// }
// NameList.push({ name: 'mock-Pan' })

// module.exports = [
//   // username search
//   {
//     url: '/vue-element-admin/search/user',
//     type: 'get',
//     response: config => {
//       const { name } = config.query
//       const mockNameList = NameList.filter(item => {
//         const lowerCaseName = item.name.toLowerCase()
//         return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
//       })
//       return {
//         code: 20000,
//         data: { items: mockNameList }
//       }
//     }
//   },

//   // transaction list
//   {
//     url: '/vue-element-admin/transaction/list',
//     type: 'get',
//     response: _ => {
//       return {
//         code: 20000,
//         data: {
//           total: 20,
//           'items|20': [{
//             order_no: '@guid()',
//             timestamp: +Mock.Random.date('T'),
//             username: '@name()',
//             price: '@float(1000, 15000, 0, 2)',
//             'status|1': ['success', 'pending']
//           }]
//         }
//       }
//     }
//   }
// ]
