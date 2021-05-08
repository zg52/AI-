<!--
 * @Author: your name
 * @Date: 2021-05-08 15:49:00
 * @LastEditTime: 2021-05-08 18:20:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitee\pc\faceCloudWebsite\src\views\login\reg.vue
-->
<style lang="scss" scoped>
.reg {text-align: center;
width: 1000px;
margin:0 auto;
background: #fff;
border-radius: 20px;
margin-top: 80px;
padding-top: 20px;
padding-bottom: 50px;
h4 {
      color: #333;
  font-size: 24px;
  display: block;
}
}
.form {width: 400px;
    margin: 0 auto;}
    
</style>
<template>
    <div class="reg">
        <h4>请填写账号信息</h4>
      <el-form class="form" ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
          <el-form-item label="用户类型：">
              <el-radio-group v-model="model">
                  <el-radio :label="label">个人</el-radio><el-radio :label="label">公司</el-radio>
              </el-radio-group>
          </el-form-item>
           <el-form-item label="用户名："><el-input v-model="form.username" placeholder="请输入用户名"></el-input></el-form-item>
           <el-form-item label="手机号："><el-input v-model="form.mobile" placeholder="手机号"></el-input></el-form-item>
           <el-form-item label="验证码："><el-input v-model="form.verifyCode" placeholder="请输入用户名"></el-input></el-form-item>
           <el-form-item label="邮箱："><el-input v-model="form.email" placeholder="请输入验证码"></el-input></el-form-item>
           <el-form-item label="密码："><el-input v-model="form.password" placeholder="请输入密码"></el-input></el-form-item>
           <el-form-item label="确认密码："><el-input v-model="form.checkPsw" placeholder="请再次输入密码"></el-input></el-form-item>
           <el-form-item><el-button plain @click="regHide_loginShow">返回</el-button> <el-button type="primary">确认注册</el-button></el-form-item>
      </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return  {
            form: {
                
            },
            rules: {}
        }
    },
    methods: {
        regHide_loginShow() {
            this.$emit('regHide_loginShow')
        }
    }
}
</script>