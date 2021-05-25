<!--
 * @Author: your name
 * @Date: 2021-05-11 18:11:18
 * @LastEditTime: 2021-05-12 10:48:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\explain\index.vue
-->
<style lang="scss" scoped>
.explain {
    padding-top:140px;
    text-align: center;
}
    .tit {
        margin-top:40px;
        h2 {
            font-size: 30px;
        }
        h4 {
            color: #828282;
            font-size: 20px;
        }
    }
.con {
    width: 1110px;
    margin: 0 auto;
    margin-top: 60px;
    & > div {
        margin-top:40px;
        transition: all .4s;
        width: 320px;
        height: 558px;
        background: #fff;
        border-radius: 24px;
        box-shadow: 0px 15px 20px 0px rgba(0,0,0,0.15);
        .t {
            width: 272px;
            margin: 0 auto;
            border-bottom: 1px rgba(0,0,0,0.12) solid;
            padding-bottom: 16px;
            margin-top:-30px;
            h5 {
                color: #409eff;
                font-size: 40px;
                height: 0;
            }
            span {
                color: #000;
                font-size: 26px;
            }
        }
        &:hover {
            transform: translate(0 ,- 8px);
        }
        &:nth-child(2) {
            margin-top:-5px;
        }
    }
}
.des {
    font-size: 16px;
    color: #828282;
    line-height: 26px;
    text-align: center;
    padding:0 50px;
    padding-bottom: 20px;
}
.t+img {
    margin-top: 20px;
}
.x_des {
    color: #409eff;
    display: block;
    text-align: center;
    margin-top:25px;
    font-size: 16px;
    cursor: pointer;
}
.back {
    margin-left: 4%;
    margin-top:-50px;
}
</style>
<template>
    <div>
    <Head />
       <div class="explain">
        <div class="back"><el-page-header @back="goBack" content="云服务说明"></el-page-header></div>
            <div class="tit">
            <h2>领先人脸识别云服务开发平台</h2>
            <h4>轻松入门</h4>
            </div>
            <div class="con flex flexbetween">
                <div>
                    <div class="t">
                        <h5>1</h5>
                        <span>开通账号</span>
                    </div>
                    <img src="../../assets/image/explain.png" width="63">
                    <p class="des">
                        注册根用户，创建IAM用户，开通服务，注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务
                    </p>
                    <el-button type="primary">查看帮助</el-button>
                </div>
                 <div>
                    <div class="t">
                        <h5>2</h5>
                        <span>开通账号</span>
                    </div>
                    <img src="../../assets/image/explain.png" width="63">
                    <p class="des">
                        注册根用户，创建IAM用户，开通服务，注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务
                    </p>
                    <el-button type="primary">查看帮助</el-button>
                </div>
                 <div>
                    <div class="t">
                        <h5>3</h5>
                        <span>开通账号</span>
                    </div>
                    <img src="../../assets/image/explain.png" width="63">
                    <p class="des">
                        注册根用户，创建IAM用户，开通服务，注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务注册根用户，创建IAM用户，开通服务
                    </p>
                    <el-button type="primary">查看帮助</el-button>
                </div>
            </div>
            <span class="x_des" @click="dialogVisible = true">了解详细说明</span>
       </div>

       <el-dialog
           title=""
           :visible.sync="dialogVisible"
           width="50%"
           >
           <div><Xdes /></div>
           <div slot="footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
           </div>
       </el-dialog>
    </div>
</template>
<script>
import Head from '@/views/login/components/Head'
import Xdes from './components/Xdes'

export default {
    components: {
        Head,
        Xdes
    },
    data() {
        return {
         dialogVisible: false
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)

      }
    }
}
</script>