<!--
 * @Author: your name
 * @Date: 2021-05-24 17:09:12
 * @LastEditTime: 2021-05-28 10:32:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\views\sass-manage\sassList\sassList.vue
-->
<style lang="scss" scoped>
  h4 {
    font-size: 20px;
  }
  .box_style {
    padding: 20px 0 30px 40px;
  }
   .yet {
    li {
      margin-right: 60px;
      transition: all .4s;
        width: 206px;
height: 234px;
opacity: 1;
background: #ffffff;
border-radius: 12px;
box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
text-align: center;
.img {padding-top: 24px;}
.t {
font-size: 14px;
display: block;
padding-top: 15px;
padding-bottom: 19px;
text-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25); 
}
p {
  color: #8C8C8C;
  font-size: 12px;    padding-top: 20px;
}
a{display: block;}
&:hover {
  transform: translate(0,- 4px);
}
    }
    }
    .list {
      margin-top: 30px;
    }
    .no {
      li {
        width: 206px;
height: 199px;
opacity: 1;
background: #e0e0e0;
border-radius: 12px;
box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
text-align: center;
      }
    }
</style>
<template>
  <div class="app-container sass">
    <div class="box_style yet">
      <h4>已开通服务</h4>
      <el-row>
        <el-col :span="24"> 
          <ul class="list flex">
            <li v-for="(yetProduct, index) of yetProducts" :key="index">
               <div class="img"><img :src="yetProduct.img" width="72" alt=""></div>
               <div class="t">{{ yetProduct.tit }}</div>
               <a :href="yetProduct.url"><el-button type="primary" size="small">进入</el-button></a>
               <p>有效期至：{{ yetProduct.time }}</p>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="box_style yet no mt25">
      <h4>未开通服务</h4>
      <el-row>
        <el-col :span="24"> 
          <ul class="list flex">
            <li v-for="(noProduct, index) of noProducts" :key="index">
               <div class="img"><img :src="noProduct.img" width="72" alt=""></div>
                <div class="t">{{ noProduct.tit }}</div>
               <router-link :to="noProduct.url"><el-button type="info" plain size="small">了解详情</el-button></router-link>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yetProducts: [
        {
          id: 1,
          img: require('../../../assets/image/sass1.png'),
          tit: '人脸通行闸机',
          url: 'https://cloud.hjimi.com/faceAccess',
          time: '2021-09-08'
        },
        {
          id: 2,
          img: require('../../../assets/image/sass1.png'),
          tit: '人脸通行闸机',
          url: 'https://cloud.hjimi.com/faceAlg',
          time: '2021-09-08'
        },
      ],
       noProducts: [
        {
          id: 1,
          img: require('../../../assets/image/sass1-1.png'),
          tit: '人脸通行闸机',
          url: './sassDes?faceAccess=true',
          time: '2021-09-08'
        },
        {
          id: 2,
          img: require('../../../assets/image/sass1-1.png'),
          tit: '人脸识别算法',
          url: './sassDes?faceAlg=true',
          time: '2021-09-08'
        },
       ]
    }
  }
}
</script>