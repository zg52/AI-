<!--
 * @Author: your name
 * @Date: 2021-05-12 11:11:21
 * @LastEditTime: 2021-08-04 09:49:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\login\regSuccess.vue
-->
<style lang="scss" scoped>
 
.regSuccess {
  text-align: center;
  .el-icon-circle-check {
    color: #409EFF;
    font-weight: bold;
    font-size: 60px;
    margin-top: 40px;
  }
p {
  color: #999;
  font-size: 20px;
  padding-top:40px;
  line-height: 28px;
  padding-bottom: 10px;
}
span {
  color: #409EFF;
}
}
.autoLogin {
  margin-top: 90px;
}
.reg {
width: 1000px;
margin:0 auto;
background: #fff;
border-radius: 20px;
margin-top: 150px;
padding-top: 20px;
padding-bottom: 100px;
h4 {
  color: #333;
  font-size: 24px;
  display: block;
  text-align: center;
 padding-top: 40px;
  padding-bottom: 5px;
}
}
.comShow {
  width: 800px;
  margin:0 auto;
  margin-top: 20px;
}
</style>
<template>
    <div>
     <Head />
     
      <div class="comShow" v-if="isCom ? true : false">
     <Steps :active="active" />
    </div>
      <div class="reg">
         <div class="back"><a-page-header title="注册成功" @back="goLogin" /></div>
           <h4>{{ isCom ? '信息已提交' : '注册成功' }}</h4>

      <div class="regSuccess">
        <i class="el-icon-circle-check"></i>
        <p v-html="isCom ? '您的注册信息已提交，<br>请等待审核' : '恭喜，您已完成注册！'"></p>
        <span><router-link to="/explain">了解云平台使用说明</router-link></span>
        <div class="autoLogin">
          <!-- <el-button type="primary" @click="autoLogin">自动登录</el-button></el-button> -->
          <el-button type="primary" @click="goLogin">{{ isCom ? '返回登录页' : '返回登录' }}</el-button>
        </div>
    </div>
    </div>
 </div>
</template>
<script>
import Head from './components/Head'
import Steps from './components/Steps'
export default {
  components: {
    Steps,
    Head
  },
  data() {
    return {
      active: 3,
    }
  },
  watch: {
   
  },
  computed: {
    isCom() {
      return this.$route.query.type === 'com' ? true : false
    }
  },
    methods: {
    back() {
      this.$router.go(-1)
      },
    goLogin() {
        this.$router.push('./login')
      },
//       autoLogin() {
// // 注册成功自动登录
//       this.$store.dispatch('user/login', {
//             type: 'root',
//             username: this.form.username,
//             password: this.form.password
//         }).then(() => {
//              this.regShow = true, this.regSuccessShow = false, this.resetForm('form'), this.resetForm('firmRules')
//              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
//       })
//     },
    },
    created() {
    },
    mounted() {
    },
}
</script>