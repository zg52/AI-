/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-08-09 10:35:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\babel.config.js
 */
module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
// Babel-plugin-dynamic-import-node插件只做一件事，将所有import()转换为require()  
// 提高页面更新速度，路由懒加载
// https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      'plugins': ['dynamic-import-node'] 
    }
  },
  plugins: [
     [
       'import',
       { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
     ]
   ]
}