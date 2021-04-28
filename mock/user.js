/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-01-10 11:01:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\mock\user.js
 */
// /*
//  * @Author: your name
//  * @Date: 2021-01-07 18:28:14
//  * @LastEditTime: 2021-01-08 11:39:06
//  * @LastEditors: Please set LastEditors
//  * @Description: In User Settings Edit
//  * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\mock\user.js
//  */

// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }

// const users = {
//   'admin-token': {
//     roles: ['admin'],
//     introduction: 'I am a super administrator',
//     avatar: '../../assets/image/user.png',
//     name: 'Super Admin'
//   },
//   'editor-token': {
//     roles: ['editor'],
//     introduction: 'I am an editor',
//     avatar: '../../assets/image/user.png',
//     name: 'Normal Editor'
//   }
// }

// module.exports = [
//   // user login
//   {
//     url: '/vue-element-admin/user/login',
//     type: 'post',
//     response: config => {
//       const { username } = config.body
//       const token = tokens[username]

//       // mock error
//       if (!token) {
//         return {
//           code: 60204,
//           message: 'Account and password are incorrect.'
//         }
//       }

//       return {
//         code: 20000,
//         data: token
//       }
//     }
//   },

//   // get user info
//   {
//     url: '/vue-element-admin/user/info\.*',
//     type: 'get',
//     response: config => {
//       const { token } = config.query
//       const info = users[token]

//       // mock error
//       if (!info) {
//         return {
//           code: 50008,
//           message: 'Login failed, unable to get user details.'
//         }
//       }

//       return {
//         code: 20000,
//         data: info
//       }
//     }
//   },

//   // user logout
//   {
//     url: '/vue-element-admin/user/logout',
//     type: 'post',
//     response: _ => {
//       return {
//         code: 20000,
//         data: 'success'
//       }
//     }
//   }
// ]
