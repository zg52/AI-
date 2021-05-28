<!--
 * @Author: your name
 * @Date: 2021-05-27 17:55:58
 * @LastEditTime: 2021-05-28 14:31:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\sass-manage\sassDes.vue
-->
<style lang="scss" scoped>
.back {
    width: 100%;
    background: #fff;
    padding-left: 16px;
    padding-top: 20px;
    padding-bottom: 15px;

}
.des {
    margin:20px;
    .b {
        padding:20px 40px 40px 40px;
        h4 {
            font-size: 20px;
        }
    }
    .l {
        h5 {
            font-size: 20px;
            padding-top: 10px;
            padding-bottom: 20px;
        }
        p {
        color: #8C8C8C;
        font-size: 14px;
        }
        img + div {
        margin-left: 30px;
        }
    }
    .l + div {
        p {
            font-size: 20px;
            color: #8C8C8C;
            padding-top: 10px;
    padding-bottom: 20px;
        }
        span {
            font-size: 16px;
        }
    }

}    
.cont {
padding-top: 50px;
padding-bottom:40px;
p {
    font-size: 16px;
color: #595959;
line-height: 28px;
}
    }
.jia {
    margin-top: 53px;
}
</style>
<template>
    <div>
        <div class="back"><el-page-header @back="back" content="服务详情"></el-page-header></div>
        <div class="des box_style">
            <div class="b">
                <h4>服务详情</h4>
            <div class="jia flexbetween">
               <div class="l flex">
                <img :src="productDes.img" width="72">
                <div>
                    <h5>{{ productDes.tit }}</h5>
                    <p v-html="productDes.desCont"></p>
                </div>
               </div>
               <div>
                   <p>服务价格</p>
                   <span class="theme">{{ productDes.jia }}/年</span>
               </div>
            </div>
            <div class="cont">
                
            </div>
           <div class="text-center">
                <el-button type="primary" size="small"><a href="">咨询销售人员</a></el-button>
           </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            productDes: {
                tit: null,
                desCont: null,
                jia: null,
                img: null
            },
            faceAccess: {
                tit: '人脸通行闸机',
                desCont: '<p>人脸识别闸机系统基于人脸识别算法模型，实现人脸识别远程控制开门和人脸考勤，主要包含用户服务、人员服务，通行服务、监控告警服务，</p>',
                jia: '5999',
                img: require('../../../assets/image/sass1.png')
            },
             faceAlg: {
                tit: '人脸识别算法',
                desCont: '<p>人脸识别闸机系统基于人脸识别算法模型，实现人脸识别远程控制开门和人脸考勤，主要包含用户服务、人员服务，通行服务、监控告警服务，</p>',
                jia: '6999',
                img: require('../../../assets/image/sass1-1.png')
            }
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    },
    created() {
        let query = this.$route
        if(query.query?.faceAccess) {
            this.productDes = this.faceAccess
        } else if(query.query?.faceAlg) {
            this.productDes = this.faceAlg
        } else {
            this.$router.go(-1)
        }
    },
}
</script>